const xlsx = require('xlsx');

const readExcelFile = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    //header: 1 option. This will return the data as an array of arrays, where each inner array represents a row.
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1,raw: true,defval: "" });
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

    return jsonData;
};

module.exports = readExcelFile;