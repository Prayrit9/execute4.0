const mongoose = require('mongoose');

const UploadedFileSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UploadedFile', UploadedFileSchema);
