const express = require('express')
const router = express.Router();
const {verifyJWT,verifyRole} = require('../Common/common_functions');
const { getDashBoardData,createGoals } = require('../controller/wellness_controller');
const { protect, authorizeRoles } = require('./middleware/authMiddleware.js');



router.get('/getdashboarddata',getDashBoardData);
router.get('/getdashboarddata',protect,getDashBoardData);
router.post('/creategoals',protect,createGoals);
module.exports = router;