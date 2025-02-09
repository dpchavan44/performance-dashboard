import React from 'react';

const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="mr-4">
          <span
            className="inline-block w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-sm">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default CustomLegend;