import React, { useState } from 'react';
import { calculateDeviation, openLogPath } from '../utils/helperFunction';
import CommentCell from './CommentCell';
import TestCaseDetails from './TestCaseDetails';

const ModuleTableRow = ({ module, index, lastRtmColumnIndex, lastBaselineIndex, selectedOption, commentIndex,moduleName,isLastBaselineIsRTM,RTM,lastBaselineValue,latestBaseline }) => {
  const rtmBaseline = parseFloat(module[lastRtmColumnIndex]);
  const lastBaseline = parseFloat(module[lastBaselineIndex]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { deviation, color } = calculateDeviation(module[lastRtmColumnIndex], module[lastBaselineIndex]);
  const releaseTarget = parseFloat(module[3]);
  const finalTarget = parseFloat(module[4]);
  const releaseDeviation = selectedOption === "release" ? calculateDeviation(module[3], module[lastBaselineIndex]) : null;
  const finalDeviation = selectedOption === "release" ? calculateDeviation(module[4], module[lastBaselineIndex]) : null;

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };
  const handleDoubleClick = () => {
    setIsPopupOpen(true); // Open the popup
  };
  return (
    <>
      <tr className={index % 2 === 0 ? "bg-gray-200 hover:bg-[#cad9f8] cursor-pointer" : "bg-gray-50 hover:bg-[#cad9f8] cursor-pointer"}>
        <td className="border border-gray-400 px-2 py-0.5 font-medium w-72" onDoubleClick={handleDoubleClick}>{module[2]}</td> {/* Scenario Name */}
        {selectedOption === "release" && (
          <>
            <td className="border border-gray-400 px-2 py-0.5 font-medium w-14">{releaseTarget.toFixed(2)}</td> {/* Release Target */}
            <td className="border border-gray-400 px-2 py-0.5 font-medium w-14">{finalTarget.toFixed(2)}</td> {/* Final Target */}
          </>
        )}
        <td className="border border-gray-400 px-2 py-0.5 font-medium w-14 hover:underline hover:text-yellow-800" onDoubleClick={() => openLogPath(moduleName,RTM,module[0])}>{rtmBaseline.toFixed(2)}</td> {/* RTM */}
        {!isLastBaselineIsRTM && <td className="border border-gray-400 px-2 py-0.5 font-medium w-14 hover:underline hover:text-yellow-800" onDoubleClick={() => openLogPath(moduleName,lastBaselineValue,module[0])}>{parseFloat(module[lastBaselineIndex - 1]).toFixed(2)}</td>} {/* Last Baseline */}
        <td className="border border-gray-400 px-2 py-0.5 font-medium w-14 hover:underline hover:text-yellow-800" onDoubleClick={() => openLogPath(moduleName,latestBaseline,module[0])}>{lastBaseline.toFixed(2)}</td> {/* Latest Baseline */}
        <td className={`border border-gray-400 px-2 py-0.5 font-medium w-14 text-black ${color}`}>{deviation}</td> {/* Deviation with RTM */}
        {selectedOption === "release" && (
          <>
            <td className={`border border-gray-400 px-2 py-0.5 font-medium w-14 text-black ${releaseDeviation.color}`}>{releaseDeviation.deviation}</td> {/* % Deviation with Release Target */}
            <td className={`border border-gray-400 px-2 py-0.5 font-medium w-14 text-black ${finalDeviation.color}`}>{finalDeviation.deviation}</td> {/* % Deviation with Final Target */}
          </>
        )}
        <CommentCell module={module} commentIndex={commentIndex} moduleName={moduleName}/> {/* Comment */}
      </tr>
      <TestCaseDetails isOpen={isPopupOpen} onClose={handleClosePopup} moduleName={moduleName} testID={module[0]}/>
    </>
  );
};

export default ModuleTableRow;