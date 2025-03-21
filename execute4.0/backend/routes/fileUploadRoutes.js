const express = require('express');
const { uploadFile } = require('../controllers/fileUploadController');
const router = express.Router();

router.post('/', uploadFile);

module.exports = router;
