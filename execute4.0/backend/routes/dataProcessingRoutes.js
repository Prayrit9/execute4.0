const express = require('express');
const { processData } = require('../controllers/dataProcessingController');
const router = express.Router();

router.post('/', processData);

module.exports = router;
