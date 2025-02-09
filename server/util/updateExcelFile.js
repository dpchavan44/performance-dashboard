const ExcelJS = require('exceljs');
const fs = require('fs');

const updateExcelFile = async (filePath, module, ID, useCase, newComment) => {

    try {
        // Check if the file is accessible and not locked or not open if yes then wil throw error
        fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(module);
        //console.log('Module :', module);
        //console.log('Id :', ID);
        //console.log('Use Case :', useCase);
        //console.log('New Comment :', newComment);

        // Find the row that matches the use case
        let useCaseRow;
        worksheet.eachRow((row, rowNumber) => {
            if (row.getCell(1).value === ID && row.getCell(3).value === useCase) {
                useCaseRow = row;
            }
        });

        if (!useCaseRow) {
            throw new Error('Use case not found');
        }

        // Update the comment in the appropriate column (assuming the comment is in the last column)
        const commentColumn = worksheet.columns.length;
        const cell = useCaseRow.getCell(commentColumn);

        // Preserve existing cell properties and update only the value
        cell.value = newComment;

        // Write the updated workbook back to the file
        await workbook.xlsx.writeFile(filePath);
    } catch (error) {
        if (error.code === 'EBUSY') {
            console.error('The file is currently open in another application and cannot be updated.');
            return { success: false, message: 'The file is currently open in another application and cannot be updated.' };
        } else if (error.code === 'EACCES') {
            console.error('The file is currently open in another application and cannot be accessed.');
            return { success: false, message: 'The file is currently open in another application and cannot be accessed.' };
        } else {
            console.error('An error occurred:', error.message);
            return { success: false, message: error.message };
        }
    }
    return { success: true, message: 'Comment updated successfully' };
};

module.exports = updateExcelFile;