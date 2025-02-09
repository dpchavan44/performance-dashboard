import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { IndividualCrateria } from './IndividualCrateria';
import PerformanceTimingLink from './PerformanceTimingLink';
import RadioButtonTargetAndRTM from './RadioButtonTargetAndRTM';
import ModuleTableHeader from './ModuleTableHeader';
import ModuleTableRow from './ModuleTableRow';
import NoDataFoundMsg from './NoDataFoundMsg';
import ModuleBarChart from './ModulebarChart';
import { ExportModuleDataToExcel } from '../utils/helperFunction';

const ModuleTable = () => {
  const { moduleName } = useParams();
  const moduleData = useSelector((store) => store?.dashboardData?.data[moduleName]);
  const [selectedOption, setSelectedOption] = useState('rtm');
  // State to store selected option for radio button
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  //if data is not found then return message
  if (!moduleData) return <NoDataFoundMsg />;
  // Access the last index from the rtmColumnIndices array
  //console.log("Module Data :"+ moduleData);
  const lastRtmColumnIndex = moduleData?.[1]?.findLastIndex(columnName => columnName.includes("RTM")) ?? -1;
  const RTM = moduleData[1]?.[lastRtmColumnIndex];
  // Last baseline column index
  const lastBaselineIndex = moduleData?.[1]?.length - 2;
  const lastBaseline = moduleData[1]?.[lastBaselineIndex];
  const lastOneBaselineValue = moduleData[1]?.[lastBaselineIndex-1];
  const isLastBaselineIsRTM = RTM === lastOneBaselineValue;
  //comment index
  const commentIndex = moduleData?.[1]?.length - 1;
  //console.log("moduleData :"+ moduleData.slice(2));
  return (
    <div className='bg-white p-4 m-4 shadow-lg rounded-lg flex flex-col items-center justify-start min-h-screen'>
      <div className="w-full">
        <ModuleBarChart moduleData={moduleData.slice(2)} lastRtmColumnIndex={lastRtmColumnIndex} lastBaselineIndex={lastBaselineIndex} RTM={RTM} lastBaseline={lastBaseline} lastOneBaselineValue={lastOneBaselineValue}/>
      </div>
      <div className="w-full md:w-full">
        <h2 className="text-xl font-bold my-2">Module: {moduleName}</h2>
        <div className="flex justify-between">
          <div className='flex'>
            <RadioButtonTargetAndRTM selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
            <PerformanceTimingLink moduleName={moduleName} lastBaseline={lastBaseline} RTM={RTM} />
          </div>
          <div className="">
            <Link to={`https://chromewebstore.google.com/detail/local-explorer-open-file/eokekhgpaakbkfkmjjcbffibkencdfkl`} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 mr-4">
              <button className='text-blue-600'>Download chrome extension</button>
            </Link>
            <button onClick={() => ExportModuleDataToExcel(moduleData,lastRtmColumnIndex,lastBaselineIndex,moduleName,commentIndex,selectedOption)} className="px-2 py-0.5 bg-green-900 hover:animate-pulse text-white rounded">Export</button>
          </div>
        </div>
        <div className="overflow-hidden shadow-right rounded">
          <table className="min-w-full border-collapse">
            <ModuleTableHeader moduleData={moduleData} RTM={RTM} lastBaselineIndex={lastBaselineIndex} lastBaseline={lastBaseline} selectedOption={selectedOption} isLastBaselineIsRTM={isLastBaselineIsRTM}/>
            <tbody>
              {moduleData?.slice(2).map((module, index) => (
                <ModuleTableRow key={index} module={module} index={index} lastRtmColumnIndex={lastRtmColumnIndex} lastBaselineIndex={lastBaselineIndex} selectedOption={selectedOption} commentIndex={commentIndex} moduleName={moduleName} isLastBaselineIsRTM={isLastBaselineIsRTM} RTM={RTM} lastBaselineValue={lastOneBaselineValue} latestBaseline={lastBaseline}/>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <IndividualCrateria />
        </div>
      </div>
    </div>
  );
};

export default ModuleTable;