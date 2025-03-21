const multer = require('multer');
const UploadedFile = require('../models/UploadedFile');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage }).single('file');

exports.uploadFile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const file = new UploadedFile({ filename: req.file.filename, filepath: req.file.path });
        await file.save();

        res.status(201).json({ message: 'File uploaded successfully', file });
    });
};
