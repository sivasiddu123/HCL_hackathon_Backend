// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controller/profileController.js');
const { protect, authorizeRoles } = require('./middleware/authMiddleware.js');

router.get('/me', protect, getProfile);
router.put('/update', protect, authorizeRoles('patient'), updateProfile);

module.exports = router;
