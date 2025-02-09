// src/components/PerformanceTiming.js
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getMasterData, handleCompare, RenderPerformanceTable } from '../utils/helperFunction';
import { IndividualCrateria } from './IndividualCrateria';
import DropdownComponent from './DropdownComponent';
import CompareButton from './CompareButton';
import { useDispatch } from 'react-redux';
import ExportButtonTTI from './ExportButtonTTI';

const PerformanceTiming = () => {
  const { moduleName } = useParams();
  const [RTMValue, setRTM] = useState(null);
  const [baselineValue, setBaseline] = useState(null);
  const [performanceData, setPerformanceData] = useState(null); // State for API response data
  const [selectedHeaders, setSelectedHeaders] = useState([]); // State for selected headers
  const [tempSelectedHeaders, setTempSelectedHeaders] = useState([]); // Temporary state for header selection
  const [filterTrigger, setFilterTrigger] = useState(false); // State for filter trigger
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lastBaseline = queryParams.get('Baseline');
  const RTM = queryParams.get('RTM');
  var headers;
  if(performanceData && performanceData.length > 0){
    headers = Object.values(performanceData[0][0]);
    //remove first and last value from headers array
    headers = headers.slice(1,-1);
  }

  const handleHeaderChange = (header) => {
    setTempSelectedHeaders((prevTempSelectedHeaders) =>
      prevTempSelectedHeaders.includes(header)
        ? prevTempSelectedHeaders.filter((h) => h !== header)
        : [...prevTempSelectedHeaders, header]
    );
  };
  const sortHeaders = (headers) => {
    const order = ['Total (TTI)', 'Server (Network)', 'Client','Call count (Request count)','Component Renders','Response Size'];
    return headers.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  };
  const handleFilter = () => {
    // Update selected headers and trigger re-rendering of the table
    let sortHeader = sortHeaders(tempSelectedHeaders);
    setSelectedHeaders(sortHeader);
    setFilterTrigger(!filterTrigger);
  };
  const baselines = performanceData && performanceData.length === 3 ? performanceData[2].map((item) =>{
    return {label:item,value:item}
  }) : [];

  useEffect(() => {
    if (lastBaseline && RTM) {
      getMasterData(lastBaseline,RTM,moduleName,setPerformanceData);
    }
  }, [RTM, lastBaseline]);
  //console.log('Performance Data:', performanceData);
  //check if the performanceData is empty then return null
  //if (performanceData === null) return <NoDataFoundMsg />; //check for condition
  return (
    <div className="bg-[#e2f0f7] min-h-screen w-full flex items-start justify-center overflow-hidden">
      <div className="bg-white p-2 shadow-lg rounded-lg w-full md:w-full overflow-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold mt-2 underline">
            Performance Timing for Module: {moduleName}
          </h1>
          <div className="flex flex-wrap items-center justify-center w-full">
            <DropdownComponent
              label="Master Baseline:"
              value={RTMValue}
              options={baselines}
              onChange={(e) => setRTM(e.value)}
            />
            <DropdownComponent
              label="Current Baseline:"
              value={baselineValue}
              options={baselines}
              onChange={(e) => setBaseline(e.value)}
            />
            <div className="mb-4 flex items-center">
            <CompareButton
                onClick={() => handleCompare(baselineValue, RTMValue, moduleName, setPerformanceData)}
              />
            </div>
          </div>
          <div className="mb-2 flex items-center border border-opacity-95 p-2 bg-blue-100 rounded">
            {headers?.map((header, index) => (
              <label key={index} className="mr-4 font-normal">
                <input
                  type="checkbox"
                  value={header}
                  checked={tempSelectedHeaders.includes(header)}
                  onChange={() => handleHeaderChange(header)}
                  className="mr-2"
                />
                {header}
              </label>
            ))}
            <div className="flex items-center">
              <button
                onClick={handleFilter}
                className="bg-[#0f0f44] text-white p-2 rounded h-[30px] flex items-center justify-center"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='font-bold'>Master Baseline:<span className='text-blue-600'>{RTMValue || RTM}</span></div>
          <div className='font-bold ml-4'>Current Baseline: <span className='text-blue-600'>{baselineValue || lastBaseline}</span></div>
        </div>
        <ExportButtonTTI moduleName={moduleName}/>
        <div className="w-full overflow-x-auto">
          {RenderPerformanceTable(performanceData, selectedHeaders,dispatch)}
        </div>
        {selectedHeaders && selectedHeaders.length > 0 && (
          <div className="mt-4">
            <IndividualCrateria />
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceTiming;