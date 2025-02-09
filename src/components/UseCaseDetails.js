import React from 'react';
import { useLocation } from 'react-router-dom';
import TeamsUseCases from './TeamsUseCases';
import { useSelector } from 'react-redux';
import NoDataFoundMsg from './NoDataFoundMsg';

const UseCaseDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const overviewData = useSelector((store) => store?.overviewSummaryData?.data);

  const moduleName = params.get('moduleName');
  const improved = params.get('improved');
  const regressed = params.get('regressed');
  const failed = params.get('failed');
  const newUseCases = params.get('new');

  //out off improved use cases, regressed use cases and failed use cases, which one non zero value
  let inputCrateria = {};
  if(improved > 0) {
    inputCrateria.header = "Improved Use Cases";
    inputCrateria.type = "IMPROVED";
    inputCrateria.indexToCheckNonZero = 5; //index of improved use cases in overviewData
  } else if(regressed > 0) {
    inputCrateria.header = "Regressed Use Cases";
    inputCrateria.type = "REGRESSED";
    inputCrateria.indexToCheckNonZero = 4; //index of regressed use cases in overviewData
  } else if(failed > 0) {
    inputCrateria.header = "Failed Use Cases";
    inputCrateria.type = "FAILED";
    inputCrateria.indexToCheckNonZero = 11; //index of failed use cases in overviewData
  } else if(newUseCases > 0) {
    inputCrateria.header = "New Use Cases";
    inputCrateria.type = "NEW";
    inputCrateria.indexToCheckNonZero = 7; //index of failed use cases in overviewData
  }
  //check if inputCrateria is empty then return null (if all value is zero then this will handle printing empty table)
  if(!inputCrateria.header) return <NoDataFoundMsg />;

  const renderAllTeamsUseCases = () => {
    return overviewData.map((data) => {
      //console.log("data :" + data);
      //.log("inputCrateria.indexToCheckNonZero :" + inputCrateria.indexToCheckNonZero);
      if (data[inputCrateria.indexToCheckNonZero] !== 0) {
        return (
          <TeamsUseCases moduleName={data[0]} inputCrateria={inputCrateria} />
        );
      }
    });
  };
  return (
    <div className='bg-[#e2f0f7] min-h-screen flex items-start justify-center'>
      <div className="bg-white p-2 m-2 w-full shadow-lg rounded-lg">
        <div className='w-full flex justify-center items-center flex-col'>
          <h1 className='text-3xl'>{inputCrateria.header} Details</h1>
        </div>
        {moduleName==='TCQ'? renderAllTeamsUseCases() : <TeamsUseCases moduleName={moduleName} inputCrateria={inputCrateria} />}
      </div>
    </div>
  );
};

export default UseCaseDetails;