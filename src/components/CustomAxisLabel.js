import React from 'react';

const CustomAxisLabel = ({ axisType, value }) => {
  const isXAxis = axisType === 'xAxis';
  const cx = isXAxis ? 600 : 25;
  const cy = isXAxis ? 455 : 200; 
  const rotate = isXAxis ? 0 : -90;
  return (
    <text
      x={cx}
      y={cy}
      transform={`rotate(${rotate}, ${cx}, ${cy})`}
      textAnchor="middle"
      className="text-blue-700 font-bold text-lg">
      {value}
    </text>
  );
};

export default CustomAxisLabel;