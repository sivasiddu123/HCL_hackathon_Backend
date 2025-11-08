const wellnessHistoryModel = require('../Models/willness_history');
const moment = require('moment')

const getDashBoardData = async (req, res) => {
    try {

        const wellnessData = await wellnessHistoryModel.aggregate([{ $match: { userId: req.user.id, createdAt: { $gt: moment().startOf('day').unix() } } },
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
module.exports = { getDashBoardData };
