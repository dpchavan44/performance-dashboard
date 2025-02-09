import React from 'react';
import { Link } from 'react-router-dom';

import { constructUrlParams, ExportOverviewDataToExcel } from '../utils/helperFunction';
import { headers, QUALITY_PLANNING } from '../utils/constants';

const OverviewSummary = ({overviewData,totals,indexToPrint}) => {
  //console.log("Overview data :" + JSON.stringify(overviewData));
  
  return (
    <div className="overflow-x-auto max-w-full shadow-right rounded md:mx-4">
      <div className="overflow-auto">
        <div className="flex justify-end mt-1">
          <button onClick={() => ExportOverviewDataToExcel(headers,totals,overviewData)} className="px-2 py-0.5 bg-green-900 hover:animate-pulse text-white rounded">Export</button>
        </div>
        <table className="min-w-full table-fixed border-collapse">
          <thead className="">
            <tr className="bg-[#006387bb] text-base">
              {headers.map((header) => ( //printing the headers in the first row
                <th
                  className="border border-gray-400 px-2 py-1 text-left text-white font-medium"
                  key={header}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-[#cad9f8] cursor-pointer">
              <td
                className="border border-gray-400 px-2 py-1 text-left font-bold"
                colSpan={3}
              >
                {QUALITY_PLANNING}
              </td>
              {totals.map((total, index) => ( //printing TCQ level counts in the second row
                <td className={`border border-gray-400 px-2 py-1 text-left font-bold ${index === 0? "text-green-800 underline" : index === 1 ? "text-red-600 underline" : index === 2 ? "text-red-300 underline" : index === 3 ? "text-blue-400 underline" : ""}`} key={index}>
                  {index === 0 || index === 1 || index === 2 || index === 3? 
                    ( //routing to the use case pages when click on counts (TCQ level)
                      <Link to={`/use-case-details?${constructUrlParams((index+100),total,"TCQ")}`} target="_blank" rel="noopener noreferrer"> {/*we are adding 100 to index to distinguish index of otl and  indexToPrint*/}
                        {total}
                      </Link>
                    ) : (total)
                  }
                </td>
              ))}
            </tr>
            {overviewData?.map((row, rowIndex) => ( //printing team level data
              <tr key={rowIndex} className={`hover:bg-[#cad9f8] cursor-pointer ${rowIndex % 2 === 0 ? "bg-gray-200" : "bg-gray-50"}`}>
                {indexToPrint.map((indxValue, cellIndex) => (
                  <td className={`border border-gray-400 px-2 py-1 text-left font-medium ${cellIndex === 3? "text-green-800 underline" : cellIndex === 4 ? "text-red-600 underline": cellIndex === 5 ?"text-red-300 underline" : cellIndex === 6 ?"text-blue-400 underline" : ""}`} key={cellIndex}>
                    {cellIndex === 0 ? ( //for first Column routing to Module page
                      <Link className="link underline" to={`/${row[indxValue]}`} target="_blank" rel="noopener noreferrer"> 
                        {row[indxValue]}
                      </Link>
                    ) : cellIndex === 3 || cellIndex === 4 || cellIndex === 5 || cellIndex === 6? ( // routing to the Use case pages when click on counts
                      <Link to={`/use-case-details?${constructUrlParams(cellIndex,row[indxValue],row[0])}`} target="_blank" rel="noopener noreferrer">
                        {row[indxValue]}
                      </Link>
                    ) : (
                      row[indxValue]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverviewSummary;