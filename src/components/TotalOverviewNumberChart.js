import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomLegend from './CustomLegent';
import { CustomTooltip } from '../utils/helperFunction';
const TotalOverviewNumberChart = ({totals,handleBarClick}) => {
  const COLORS = ['#006400', '#FF0000', '#FF8C00','#4682B4','#BDB76B']; //Improved Use Cases, Regressed Use Cases, Failed Use Cases, New Use Cases, Neutral Use Cases
  const data = [
    { name: "Improved Use Cases", value: totals[0] },
    { name: "Regressed Use Cases", value: totals[1] },
    { name: "Failed Use Cases", value: totals[2] },
    { name: "New Use Cases", value: totals[3] },
    { name: "Neutral Use Cases", value: totals[4] }
  ];
  //console.log("data :"+ data);
  return (
    <ResponsiveContainer width="100%" height={350} className="m-0 p-0">
      <PieChart className="m-0 p-0">
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          onClick={handleBarClick}
          className="cursor-pointer outline-none inset-0 hover:bg-gray-500"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
          {/*Will get display cell of charts with given info*/}
        </Pie>
        <Tooltip content={<CustomTooltip />} /> {/*When hover then this info will get disply*/}
        <Legend content={<CustomLegend />} /> {/*This will get dipsly at the bottom level information*/}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default TotalOverviewNumberChart