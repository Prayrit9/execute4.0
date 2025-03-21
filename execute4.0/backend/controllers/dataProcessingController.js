const { parseExcel } = require('../utils/excelParser');

exports.processData = async (req, res) => {
    try {
        const { filePath } = req.body;
        const data = parseExcel(filePath);
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
