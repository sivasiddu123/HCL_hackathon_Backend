const wellnessHistoryModel = require('../Models/willness_history');
const moment = require('moment')

const getDashBoardData = async (req, res) => {
    try {
        console.log("req.user.id", req.user)

        const wellnessData = await wellnessHistoryModel.aggregate([{ $match: { userId: req.user.userEmail, createdAt: { $gt: moment().startOf('day').unix() } } },
        {
            $group: {
                _id: "$vitalType",
                data: { $push: "$$ROOT" } // optional: keep all docs in array
            }
        }
        ]);
        if (wellnessData.length > 0) {
            finalData = {};
            wellnessData.map((typeObj) => {
                const total = typeObj.data.filter(obj => obj.type == 'goal').reduce((sum, item) => sum + item.count, 0);
                const consumed = typeObj.data.filter(obj => obj.type == 'input').reduce((sum, item) => sum + item.count, 0);
                finalData[typeObj._id] = {
                    total,
                    consumed
                }
            });
            if (finalData.sleep) {
                finalData.activeTime = parseInt(finalData?.sleep?.total | 0) - parseInt(finalData?.sleep?.total | 0);
            }
            return res.status(200).json({
                message: "successfully fetched the data",
                data: finalData
            })
        } else {
            return res.json({
                message: "successfully fetched the data",
                data: {
                    activeTime: 0,
                    "sleep": {
                        "total": 0,
                        "consumed": 0
                    },
                    "steps": {
                        "total": 0,
                        "consumed": 0
                    },

                }

            })
        }
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message ? err.message : "Something went wrong"
        });
    }
}
const createGoals = async (req, res) => {
    try {
        const requiredParams= {
            steps:req.body.steps,
            sleep:req.body.sleep
        }
        const finalParams=[]
        for(let key in requiredParams){
            if(!requiredParams[key]){
                return res.json({
                    message:'Invalid parameters'
                })
            };
            finalParams.push({
                "userId": req.user.userEmail,
                "vitalType": key,
                "count": requiredParams[key],
                "type": "goal",
                "createdAt": moment(new Date()).unix()
            })
        }
         
        const wellnessData = await wellnessHistoryModel.create(finalParams);
        return res.status(200).json({
            message:'Successfully added'
        })

    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message ? err.message : "Something went wrong"
        });
    }
}
module.exports = { getDashBoardData ,createGoals};
