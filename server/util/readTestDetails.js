const xlsx = require('xlsx');


const readTestDetails = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const result = {};

    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1, raw: true,defval: "" });
        // Store the sheet data as-is with the sheet name
        result[sheetName] = jsonData;
    });

    return result;
};

module.exports = readTestDetails;