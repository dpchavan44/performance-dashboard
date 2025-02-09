import React from 'react'
import { useSelector } from 'react-redux';
import NoDataFoundMsg from './NoDataFoundMsg';
import CommentCell from './CommentCell';

const TeamsUseCases = ({moduleName,inputCrateria}) => {
  console.log("moduleName " + moduleName);
  console.log("inputCrateria " + inputCrateria);
  const moduleData = useSelector((store) => store?.dashboardData?.data[moduleName]);
  //if data is not found then return message
  if (!moduleData) return <NoDataFoundMsg />;
  // Find all column indices that contain "RTM" in the second element (index 1) of each module
  const rtmColumnIndices = moduleData?.[1]?.reduce((indices, columnName, index) => {
    if (columnName.includes("RTM")) {
      indices.push(index);
    }
    return indices;
  }, []);
  //read last index from rtmColumnIndices array
  const lastRtmColumnIndex = rtmColumnIndices.length > 0 ? rtmColumnIndices[rtmColumnIndices.length - 1] : -1;
  const RTMStr = moduleData[1]?.[lastRtmColumnIndex];
  // Last but one baseline column index
  const lastBaselineIndex = moduleData?.[1]?.length - 2;
  const lastOneBaselineValue = moduleData[1]?.[lastBaselineIndex - 1];
  const isLastBaselineIsRTM = RTMStr === lastOneBaselineValue;
  const latestBaselineStr = moduleData[1]?.[lastBaselineIndex];
  const commentIndex = moduleData?.[1]?.length - 1;
  const getDeviation = (benchmark, release) => {
    let deviation = {
        displayFlag: false,
        color: "",
        devValue: 0.0
    };
    if (inputCrateria.type === "IMPROVED" && benchmark !== 0) {
      let diff = benchmark - release;
      let devValue = (diff / benchmark) * 100;
      if (diff / benchmark > 0.1 && diff >= 1 && release !== 0) {
        deviation.devValue = Math.abs(devValue.toFixed(2));
        deviation.color = "bg-green-800";
        deviation.displayFlag = true;
        return deviation;
      }
    } else if (inputCrateria.type === "REGRESSED" && benchmark !== 0) {
      let diff = release - benchmark;
      let devValue = (diff / benchmark) * 100;
      if (diff / benchmark > 0.1 && diff >= 1) {
        deviation.devValue = Math.abs(devValue.toFixed(2));
        deviation.color = "bg-red-500";
        deviation.displayFlag = true;
        return deviation;
      }
    } else if (inputCrateria.type === "FAILED") {
      if (typeof release === 'number' && (release === 0.0 || release === 0)) { //if current baseline value is 0 then its failed use case
        deviation.devValue = 0;
        deviation.color = "bg-yellow-400";
        deviation.displayFlag = true;
        return deviation;
      }
    } else if (inputCrateria.type === "NEW") {
      if (typeof benchmark === 'number' && benchmark === 0 && release !== 0) { //if last RTM time is 0 and current use is not failed then we are saying its new use case
        deviation.devValue = 0;
        deviation.color = "bg-blue-400";
        deviation.displayFlag = true;
        return deviation;
      }
    }
    return deviation;
  };
  
  return (
    <table className='table-fixed w-full border-collapse my-4 '>
        <thead>
            <tr className="bg-[#006387bb] text-base">
                <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-72 whitespace-normal break-words">{moduleName} - Use cases</th>
                <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14 whitespace-normal break-words">Final Target</th>
                <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14 whitespace-normal break-words">Release target</th>
                <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14 whitespace-normal break-words">{RTMStr}</th>
                {!isLastBaselineIsRTM && <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14 whitespace-normal break-words">{moduleData[1]?.[lastBaselineIndex - 1]}</th>}
                <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14 whitespace-normal break-words">{latestBaselineStr}</th>
                <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14 whitespace-normal break-words">% Deviation with RTM</th>
                <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14 whitespace-normal break-words">Comments</th>
                {/*inputCrateria.type === "REGRESSED" && <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14 whitespace-normal break-words">Logs</th> */}
            </tr>
        </thead>
        <tbody>
            {moduleData?.slice(2).map((module, index) => {
                const deviation = getDeviation(module[lastRtmColumnIndex], module[lastBaselineIndex]);
                //console.log("Module Data :"+ module);
                //check if deviation.diaplayFlag is true then only print the row, we are using this flag in case of 
                //console.log("Deviation :"+ deviation + " index :"+ index + ' displayFlag :'+ deviation.displayFlag);
                if (!deviation.displayFlag) {
                    return null;
                }
                return (
                  <tr key={index} className="border border-gray-400">
                    <td className="border border-gray-400 px-2 py-0.5 font-medium text-left w-72">
                      {module[2]}
                    </td>
                    <td className="border border-gray-400 px-2 py-0.5 font-medium text-left w-14">
                      {module[3].toFixed(2)}
                    </td>
                    <td className="border border-gray-400 px-2 py-0.5 font-medium text-left w-14">
                      {module[4].toFixed(2)}
                    </td>
                    <td
                      style={{ width: "3.5rem" }}
                      className="border border-gray-400 px-2 py-0.5 font-medium text-left w-14"
                    >
                      {parseFloat(module[lastRtmColumnIndex]).toFixed(2)}
                    </td>
                    {!isLastBaselineIsRTM && <td className="border border-gray-400 px-2 py-0.5 font-medium text-left w-14">
                      {parseFloat(module[lastBaselineIndex - 1]).toFixed(2)}
                    </td>}
                    <td className="border border-gray-400 px-2 py-0.5 font-medium text-left w-14">
                      {parseFloat(module[lastBaselineIndex]).toFixed(2)}
                    </td>
                    <td
                      className={`border border-gray-400 px-2 py-0.5 font-medium text-left w-14 ${deviation.color}`}
                    >
                      {deviation.devValue}
                    </td>
                    <CommentCell module={module} commentIndex={commentIndex} moduleName={moduleName}/>
                  </tr>
                );
            })}
        </tbody>
    </table>
  )
}

export default TeamsUseCases