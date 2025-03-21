const xlsx = require('xlsx');
const fs = require('fs');

exports.parseExcel = (filePath) => {
    const file = xlsx.readFile(filePath);
    const sheetName = file.SheetNames[0];
    return xlsx.utils.sheet_to_json(file.Sheets[sheetName]);
};
