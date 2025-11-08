// routes/providerRoutes.js
const express = require('express');
const router = express.Router();
const {
  getPatients,
  getPatientDetails,
  getProviderOverview
} = require('../controllers/providerController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.use(protect); // all routes below are protected
router.use(authorizeRoles('provider')); // only providers allowed

router.get('/patients', getPatients);
router.get('/patients/:id', getPatientDetails);
router.get('/overview', getProviderOverview);

module.exports = router;