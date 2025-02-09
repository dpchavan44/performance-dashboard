import React from 'react'
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomLegend from './CustomLegent';
import { CustomTooltip } from '../utils/helperFunction';
const TeamsOverviewCrateriaChart = ({indexToPrint}) => {
    const overviewData = useSelector((store) => store?.overviewSummaryData?.data);
    //console.log("overviewData :"+ overviewData);
    const COLORS = ['#D2691E', '#800000', '#2F4F4F','#008B8B', '#556B2F', '#800080','#483D8B', '#B22222']; 
    // Construct the data array
    const data = overviewData
    .filter((data) => data[indexToPrint] !== 0) // Filter out rows where data[indexToPrint] is zero
    .map((data) => ({
      name: data[0], // Module name from the 0th index
      value: data[indexToPrint], // Number from the passed index
    }));
    console.log("data :"+data);
    return (
      <ResponsiveContainer width="100%" height={400} className="m-0 p-0">
        <PieChart className="m-0 p-0">
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            className='cursor-pointer outline-none inset-0'
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))} {/*Will get display cell of charts with given info*/}
            {/*<LabelList dataKey="value" position="inside" style={{ fill: 'white' }}/>*/}
          </Pie>
          <Tooltip content={<CustomTooltip />}/> {/*When hover then this info will get disply*/}
          <Legend content={<CustomLegend />} /> {/*This will get dipsly at the bottom level information*/}
        </PieChart>
      </ResponsiveContainer>
    );
}

export default TeamsOverviewCrateriaChart