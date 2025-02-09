const xlsx = require('xlsx');
// Function to read performance timing data from an Excel file
const  getPerformanceTimingData = (Baseline, RTM,filePath) => {

    const workbook = xlsx.readFile(filePath);
    // removing all space from string and replacing / with empty string
    const trimmedSheets = {};
    Object.keys(workbook.Sheets).forEach(sheetName => {
        const trimmedName = sheetName.trim().replace(/\s+/g, '');
        trimmedSheets[trimmedName] = workbook.Sheets[sheetName];
    });
    const cleanedRTM = RTM.trim().replace(/\//g, '').replace(/\s+/g, '');
    const cleanedBaseline = Baseline.trim().replace(/\//g, '').replace(/\s+/g, '');

    const baselineSheet = trimmedSheets[cleanedBaseline];
    const rtmSheet = trimmedSheets[cleanedRTM];

    if (!baselineSheet || !rtmSheet) {
        throw new Error('One or both sheets not found in the Excel file');
    }
    const baselineData = xlsx.utils.sheet_to_json(baselineSheet, { header: 1,raw: true,defval: "" });
    const rtmData = xlsx.utils.sheet_to_json(rtmSheet, { header: 1,raw: true ,defval: ""});
    // Remove the last column from each row
    const removeLastColumn = (data) => {
        return data.map(row => row.slice(0, -1));
    };

    const cleanedBaselineData = removeLastColumn(baselineData);
    const cleanedRtmData = removeLastColumn(rtmData);
    return [cleanedRtmData, cleanedBaselineData,Object.keys(workbook.Sheets)];
}

module.exports = getPerformanceTimingData;