import React from 'react';
import * as XLSX from 'xlsx';

const useDashboardData = () => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                //setData(jsonData);
                //console.log(jsonData);
            };
            reader.readAsArrayBuffer(file);
        }
    };
    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
        </div>   
    );
};

export default useDashboardData;