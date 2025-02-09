import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OverviewSummary from "./OverviewSummary";
import OverviewPieCharts from './OverviewPieCharts';
import Crateria from "./Crateria";
import { fetchTestDetailsData, getDashboardData, getOverviewSummaryData } from "../utils/helperFunction";
import NoDataFoundMsg from "./NoDataFoundMsg";
import HomeShimmerUI from "./HomeShimmerUI";

const HomePage = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux store
  const overviewData = useSelector((store) => store?.overviewSummaryData?.data); // Access data from Redux store
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([ //it wil run all the promises in parallel
          getOverviewSummaryData(dispatch),
          getDashboardData(dispatch)
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or in case of error
      }
    };
    const fetchTestDetails = () => {
      fetchTestDetailsData(dispatch);
    };

    fetchData();
    fetchTestDetails(); // fetch test deatils data
  }, [dispatch]);
  if (loading) return <HomeShimmerUI />; // Show ShimmerUI while loading
  if (overviewData.length === 0) return <NoDataFoundMsg />; //check for condition
  /*Module Name-0, Execution Date -1, Baseline- 2, Total use cases- 3, Regressed from last release- 4, 
  Improved use cases - 5, Neutral use cases -6, New use cases- 7, URL -8, Failed use cases -11  */
  //index to print =>0-0 Module name, 1-1 Execution Date, 2-2 Baseline, 3-5(Improved use cases), 4-4(Regressed from last release), 5-11(Failed use cases), 
  //6-6(Neutral use cases), 7-7(New use cases), 8-3(Total use cases)
  const indexToPrint = [0, 1, 2, 5, 4, 11, 7, 6, 3];
 // Calculate totals (TCQ level data)
  const totals = indexToPrint.slice(3).map((index) => overviewData?.reduce((sum, row) => sum + (row[index] || 0), 0));
  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full flex-grow bg-white">
      <div className="p-1">
        <h1 className="font-bold text-lg">Performance Test Summary</h1>
      </div>
      <div className="flex justify-around items-center w-full overflow-y-auto my-2">
        <OverviewPieCharts totals={totals}/>
      </div>
      {overviewData && overviewData.length > 0 && (
        <OverviewSummary overviewData={overviewData} totals={totals} indexToPrint={indexToPrint}/>
      )}
      <div className="p-2">
        <Crateria />
      </div>
    </div>
  );
};

export default HomePage;
