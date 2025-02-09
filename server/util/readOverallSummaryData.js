const xlsx = require('xlsx');


const readOverallSummaryData = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const result = {};

    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1, raw: true,defval: "" });
        // Convert Excel date serial numbers to JavaScript Date objects
        const convertExcelDate = (excelDate) => {
            const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
            return date;
        };
        // Iterate over the rows and convert date values
        for (let i = 0; i < jsonData.length; i++) {
            for (let j = 0; j < jsonData[i].length; j++) {
                if (typeof jsonData[i][j] === 'number' && jsonData[i][j] > 25567) {
                    jsonData[i][j] = convertExcelDate(jsonData[i][j]);
                }
            }
        }
        // Store the sheet data as-is with the sheet name
        result[sheetName] = jsonData;
    });

    return result;
};

module.exports = readOverallSummaryData;