const express = require('express');
const router = express.Router();
const { getDemographicData } = require('../controllers/demographicsController');

router.get('/', getDemographicData);

module.exports = router; 