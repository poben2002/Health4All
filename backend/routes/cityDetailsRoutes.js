const express = require('express');
const { getCityDetails } = require('../controllers/cityDetailsController');

const router = express.Router();

router.get('/', getCityDetails);

module.exports = router;
