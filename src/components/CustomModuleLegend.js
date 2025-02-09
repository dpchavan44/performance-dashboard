import React from 'react';

const CustomModuleLegend = ({RTM,lastOneBaselineValue,lastBaseline}) => {
  const legendItems = [
    { color: '#685168', label: RTM },
    { color: '#990099', label: lastOneBaselineValue },
    { color: '#2671c8', label: lastBaseline },
  ];

  return (
    <div className="flex space-x-4 mt-2 ml-24">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="w-8 h-5" style={{ backgroundColor: item.color }}></div>
          <span className="ml-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomModuleLegend;