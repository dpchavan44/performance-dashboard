import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTick from './CustomTick';
import CustomAxisLabel from './CustomAxisLabel';
import CustomModuleLegend from './CustomModuleLegend';

const ModuleBarChart = ({ moduleData,lastRtmColumnIndex,lastBaselineIndex,RTM,lastBaseline,lastOneBaselineValue }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 10; // Adjust this value based on your requirements
  /*moduleData.map((module,index) => {
    console.log("index :"+ index);
    console.log("Module :"+ module[2]);
    console.log("RTM :"+ module[lastRtmColumnIndex].toFixed(2));
    console.log("Latest Baseline :"+ module[lastBaselineIndex].toFixed(2));
    console.log("Last Baseline :"+ module[lastBaselineIndex-1].toFixed(2));
  });*/
  console.log(moduleData.length);
  const handleNext = () => {
    if (currentIndex + itemsPerPage < moduleData.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };
  const dataToShow = moduleData.slice(currentIndex, currentIndex + itemsPerPage).map(module => ({
    useCase: module[2],
    [RTM]: parseFloat(module[lastRtmColumnIndex]?.toFixed(2)),
    [lastOneBaselineValue]: parseFloat(module[lastBaselineIndex-1]?.toFixed(2)),
    [lastBaseline]: parseFloat(module[lastBaselineIndex]?.toFixed(2)),
  }));
  let CustomBarTooltip = ({ active, payload,label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-50 p-1 border border-gray-600 font-semibold rounded">
          <p className="label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <ResponsiveContainer width="100%" height={460}>
        <BarChart data={dataToShow} margin={{ bottom: 80 }}>
          <XAxis
            className='cursor-pointer'
            dataKey="useCase"
            tick={(props) => <CustomTick {...props} />}
            interval={0}
            label={{ content: (props) => <CustomAxisLabel {...props} axisType="xAxis" value={`Use Cases (${moduleData.length})`} />,
             position: 'insideBottom'}} //offset to plave up or down
          />
          <YAxis
            label={{ content: (props) => <CustomAxisLabel {...props} axisType="yAxis" value="Response Time (Sec)"/>,
             angle: -90, 
             position: 'insideLeft'}}
          />
          <Tooltip content={<CustomBarTooltip />}/>
          <Bar dataKey={RTM} fill="#685168" barSize={20}/>
          <Bar dataKey={lastOneBaselineValue} fill="#990099" barSize={20}/>
          <Bar dataKey={lastBaseline} fill="#2671c8" barSize={20}/>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-between mt-2">
        <div className='ml-6'>
            <button onClick={handlePrevious} disabled={currentIndex === 0} className="px-2 py-1 bg-gray-400 rounded font-medium">
            Previous
            </button>
            <button onClick={handleNext} disabled={currentIndex + itemsPerPage >= moduleData.length} className="ml-4 px-2 py-1 bg-gray-400 rounded font-medium w-20">
            Next
            </button>
        </div>
        <div>
            <CustomModuleLegend RTM={RTM} lastOneBaselineValue={lastOneBaselineValue} lastBaseline={lastBaseline}/>
        </div>
      </div>
      <div className="w-full h-0.5 mt-2 bg-gray-300 shadow-md"></div> {/* Full-width shadow line */}
    </>
  );
};

export default ModuleBarChart;