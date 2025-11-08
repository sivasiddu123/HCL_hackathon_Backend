const express = require('express')
const router = express.Router();
const {verifyJWT,verifyRole} = require('../Common/common_functions');
const { getDashBoardData } = require('../controller/wellness_controller');
const { protect, authorizeRoles } = require('./middleware/authMiddleware.js');



router.get('/getdashboarddata',protect,getDashBoardData);

module.exports = router;