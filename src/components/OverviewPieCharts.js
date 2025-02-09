import React from 'react';
import TotalOverviewNumberChart from './TotalOverviewNumberChart';
import TeamsOverviewCrateriaChart from './TeamsOverviewCrateriaChart';


const OverviewPieCharts = ({ totals }) => {
    // Prepare data for the chart
  const [improvedFlag,setImprovedFlag] = React.useState(false);
  const [regressedFlag,setRegressedFlag] = React.useState(false);
  const [failedFlag,setFailedFlag] = React.useState(false);
  //console.log("overviewData :"+ overviewData);
  
  const handleBarClick = (data, index) => {
    switch (index) {
      case 0:
        setImprovedFlag(true);
        break;
      case 1:
        setRegressedFlag(true);
        break;
      case 2:
        setFailedFlag(true);
        break;
      default:
        break;
    }
  };
  const handleCloseClick = (chartType) => {
    if (chartType === 'improved') {
      setImprovedFlag(false);
    } else if (chartType === 'regressed') {
      setRegressedFlag(false);
    } else if (chartType === 'failed') {
      setFailedFlag(false);
    }
  };
  return (
    <div className="flex flex-row items-center w-full">
      <TotalOverviewNumberChart totals={totals} handleBarClick={handleBarClick}/>
      {improvedFlag && (
        <div className="w-full">
          <div className="text-center mb-0"><span className='bg-blue-200 text-black p-1 cursor-pointer rounded border border-black' onClick={() => handleCloseClick('improved')}>Improved ❌</span></div>
          <div className="mt-0">
            <TeamsOverviewCrateriaChart indexToPrint={5} />
          </div>
        </div>
      )}
      {regressedFlag && (
        <div className="w-full">
          <div className="text-center mb-0  p-2"><span className='bg-blue-200 text-black p-1 cursor-pointer rounded border border-black' onClick={() => handleCloseClick('regressed')}>Regressed ❌</span></div>
          <div className="mt-0">
            <TeamsOverviewCrateriaChart indexToPrint={4} />
          </div>
        </div>
      )}
      {failedFlag && (
        <div className="w-full">
          <div className="text-center mb-0 p-2"><span className='bg-blue-200 text-black p-1 cursor-pointer rounded border border-black' onClick={() => handleCloseClick('failed')}>Failed ❌</span></div>
          <div className="mt-0">
            <TeamsOverviewCrateriaChart indexToPrint={11} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewPieCharts;