import React from 'react'
import { ExportTotalTimingToExcel } from '../utils/helperFunction'
import { useSelector } from 'react-redux'

const ExportButtonTTI = ({moduleName}) => {
    const exportData = useSelector((store) => store?.filterTimingData?.filterData);
    if (exportData === null) return null;
    return (
        <div className="flex justify-end">
        <button onClick={() => ExportTotalTimingToExcel(exportData,moduleName)} className="px-4 py-0.5 mb-0.5 bg-green-900 hover:animate-pulse text-white rounded">Export</button>
        </div>
    )
}

export default ExportButtonTTI