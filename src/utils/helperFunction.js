import { useRef } from "react";
import { clearOverviewSummaryData, setOverviewSummaryData } from "./OverviewSummaryData";
import { clearDashboardData, setDashboardData } from "./dashboardData";
import * as XLSX from 'xlsx';
import { clearFilterTimingData, setFilterTimingData } from "./filterTimingData";
import { clearTestCaseDetails, setTestCaseDetails } from "./testCaseDetailsSlice";

// Create a context for images
const images = require.context('../assets/images', false, /\.(png|jpe?g|svg)$/);
// Function to get image path
export let getImagePath = (iconName) => {
  try {
    return images(`./${iconName}.jpg`);
  } catch (error) {
    console.error(`Error loading image: ${iconName}`, error);
    return null;
  }
};
function addElementAfterEveryTwo(originalArray, newElement) {
  const newArray = [];
  for (let i = 0; i < originalArray.length; i++) {
    newArray.push(originalArray[i]);
    if ((i + 1) % 2 === 0) {
      newArray.push(newElement);
    }
  }
  return newArray;
}
export function calculateDeviation(benchmark, release) {
  //add check for benchmark 0
  if (benchmark === 0 || release === 0) {
    return { deviation: 0, color: '' };
  }
  let diff = release - benchmark;
  let deviation = (diff / benchmark) * 100;
  let color = ''; // Default color
  diff = parseFloat(diff.toFixed(2));
  deviation = parseFloat(deviation.toFixed(2));
  if(deviation < -10.00 && diff < -1.00) {
    color = 'bg-green-800';
  } else if(deviation > 10.00 && diff > 1.0) {
    color = 'bg-red-500';
  } else if((deviation > -10.00 && deviation < 0.00) || (diff > -1.00 && diff < 0.00)) {
    color = 'bg-green-400';
  } else if((deviation > 0.00 && deviation < 10.00) || (diff > 0.00 && diff < 1.00)) {
    color = 'bg-yellow-400';
  }
   return { deviation: Math.abs(deviation.toFixed(2)), color };
}
// Function to calculate deviation
function getDeviation(row) {
  const deviation = [];
  for (let i = 0; i < row.length; i += 2) {
    if (row[i] && row[i + 1]) {
      const deviationValue = calculateDeviation(row[i], row[i + 1]);
      //push original value and deviation value to deviation array
      deviation.push(row[i]);
      deviation.push(row[i + 1]); 
      deviation.push(deviationValue);
    } else {
      //if row value is 0 or not present then push original one
      deviation.push(row[i]);
      deviation.push(row[i + 1]); 
      deviation.push({ deviation: 0, color: '' });
    }
  }
  return deviation;
}
// Function to render performance table
export let RenderPerformanceTable = (performanceData,selectedHeaders,dispatch) => {
    const tableContainerRef = useRef(null);
    if (!performanceData || performanceData.length < 2) return null;

    const RTMData = performanceData[0];
    const baselineData = performanceData[1];
    // Extract headers from both RTMData and baselineData
    const RTMHeaders = Object.values(RTMData[0]);
    const baselineHeaders = Object.values(baselineData[0]);
    // Merge headers and remove duplicates
    let headers = [...RTMHeaders, ...baselineHeaders.slice(1)];//removing comment from headers which is last column
    var combinedataObj = RTMData.map((item, index) => {
      return [...RTMData[index], ...baselineData[index].slice(1)];
    });
    let formattedData = combinedataObj.slice(1).map((row) => {
      return row.map((item, index) => {
        if (typeof item === 'number' && !Number.isInteger(item)) {
          return item.toFixed(2); // Format to 2 decimal points if it's a floating-point number
        } else {
          return item; // Return as it is if it's not a floating-point number
        }
      });
    });
    if (selectedHeaders && selectedHeaders.length !== 0) {
        const filteredDataHeaderIndex = { //read index from original headers (merged from RTM and Baseline)
          "Total (TTI)": [1, 7],
          "Server (Network)": [2, 8],
          "Client": [3, 9],
          "Call count (Request count)": [4, 10],
          "Component Renders": [5, 11],
          "Response Size": [6, 12],
        };
        // Filter headers and data based on filteredDataHeaderIndex
        console.log("Selected Headers:", selectedHeaders);
        let filteredIndexes = selectedHeaders.map(
          (header) => filteredDataHeaderIndex[header]
        );
        //merge the filteredIndexes array
        filteredIndexes = filteredIndexes.reduce(
          (acc, val) => acc.concat(val),
          []
        );
        //console.log("filteredIndexes:", filteredIndexes);
        const filHeader = filteredIndexes.map((row) => {
          return headers[row];
        });
        //console.log("filteredHeader:", filHeader);
        const headerDeviation = addElementAfterEveryTwo(filHeader, "% Deviation");
        //console.log("New header:", headerDeviation);
        headers = [headers[0], ...headerDeviation];
        //console.log("final Header:", headers);
        //get the filtered data from formattedData where each inner array contains index from filteredIndexes
        const FilteredData = formattedData.map((row) => {
          //return the filteredIndexes array from each row in same order value as in filteredIndexes
          return filteredIndexes.map((index) => {
            return row[index];
          });
        });
        //call getDeviation function to get deviation data by passing every two elements from FilteredData
        const deviationData = FilteredData.map((row) => {
          return getDeviation(row);
        });
        
        //console.log("deviationData:", deviationData);
        //console.log("FilteredData:", FilteredData);
        //pass use case name as first element in each row read from originnal formattedData
        formattedData = formattedData.map((row, index) => {
          return [row[0], ...deviationData[index]];
        });
        //console.log("filteredData:", formattedData);
    }
    
    const handleMouseDown = (e) => {
      const tableContainer = tableContainerRef.current;
      tableContainer.isMouseDown = true;
      tableContainer.startX = e.pageX - tableContainer.offsetLeft;
      tableContainer.scrollLeft = tableContainer.scrollLeft;
    };
  
    const handleMouseMove = (e) => {
      const tableContainer = tableContainerRef.current;
      if (!tableContainer.isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - tableContainer.offsetLeft;
      const walk = (x - tableContainer.startX) * 2; // Scroll speed
      tableContainer.scrollLeft = tableContainer.scrollLeft - walk;
    };
  
    const handleMouseUp = () => {
      const tableContainer = tableContainerRef.current;
      tableContainer.isMouseDown = false;
    };
    console.log("Final Headers:", headers);
    console.log("Final Data:", formattedData);
    const dataToExport = formattedData.map((row,rowIndex) => {
      const formatRow = {};
      headers.forEach((header, index) => {
        if (selectedHeaders && selectedHeaders.length > 0 && index > 0 && index % 3 === 0) {
          //console.log("Row Index:", row[index]," index :", index);
          formatRow[`${header}_${index}`] = row[index]?.deviation;
        } else {
          formatRow[`${header}_${index}`] = row[index];
        }
      });
      //console.log("Format Row:", formatRow);
      return formatRow;
    });
    dispatch(clearFilterTimingData());
    dispatch(setFilterTimingData(dataToExport));
    return (
      <div className="w-full overflow-x-auto cursor-pointer rounded" ref={tableContainerRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <table className="min-w-full w-full border-collapse overflow-x-auto">
          <thead>
            <tr className="bg-[#006387bb] text-base">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`border border-gray-400 px-2 py-0.5 font-medium text-left text-white`}
                  style={index === 0 ? { width: '18rem' } : {}}
                >
                  {index===0 ? `${header} (${formattedData?.length})`: header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formattedData.map((row, index) => (
              <tr key={index} className={`hover:bg-[#cad9f8] ${index % 2 ===0 ? 'bg-slate-50' : 'bg-slate-100'}`}>
                {row.map((cell, index) => (
                  <td key={index} className={` border border-gray-400 px-2 py-0.5 font-medium ${selectedHeaders && selectedHeaders.length > 0 && index > 0 && index % 3 === 0 ? cell?.color : ''}`}>
                    {selectedHeaders && selectedHeaders.length > 0 && index > 0 && index % 3 === 0? cell.deviation : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export let getOverviewSummaryData = async (dispatch) => {
  try {
    const response = await fetch("/api/overviewsummary");
    if (!response.ok) {
      dispatch(clearOverviewSummaryData());
      dispatch(clearDashboardData());
      dispatch(clearTestCaseDetails());
      throw new Error(`HTTP while calling api/overviewsummary: ${response.status}`);
    }
    const data = await response.json();
    dispatch(setOverviewSummaryData(data));
  } catch (error) {
    dispatch(clearOverviewSummaryData());
    dispatch(clearDashboardData());
    dispatch(clearTestCaseDetails());
    throw new Error(error);
  }
};
export let getDashboardData = async (dispatch) => {
  try {
    const response = await fetch("/api/dashboard");
    if (!response.ok) {
      throw new Error(`HTTP while calling api/dashboard: ${response.status}`);
    }
    const data = await response.json();
    dispatch(setDashboardData(data));
  } catch (error) {
    dispatch(clearDashboardData());
    throw new Error(error);
  }
};

// Function to construct URL parameters based on cell index and value
export let constructUrlParams = (cellIndex, cellValue, moduleName) => {
  let params = new URLSearchParams();
  params.append('moduleName', moduleName);
  if (cellIndex === 3 || cellIndex === 100) {
    params.append('improved', cellValue);
    params.append('regressed', 0);
    params.append('failed', 0);
    params.append('new', 0);
  } else if (cellIndex === 4 || cellIndex === 101) {
    params.append('improved', 0);
    params.append('regressed', cellValue);
    params.append('failed', 0);
    params.append('new', 0);
  } else if (cellIndex === 5 || cellIndex === 102) {
    params.append('improved', 0);
    params.append('regressed', 0);
    params.append('failed', cellValue);
    params.append('new', 0);
  } else if (cellIndex === 6 || cellIndex === 103) {
    params.append('improved', 0);
    params.append('regressed', 0);
    params.append('failed', 0);
    params.append('new', cellValue);
  }
  return params.toString();
};
export let getMasterData = async (lastBaseline, RTM, moduleName, setPerformanceData) => {
  try {
    const response = await fetch(`/api/performance-timing?Baseline=${lastBaseline}&RTM=${RTM}&Module=${moduleName}`);
    if (!response.ok) {
      throw new Error(`HTTP while calling api/overviewsummary: ${response.status}`);
    }
    const data = await response.json();
    setPerformanceData(data);
    //console.log('Performance Data:', data);
  } catch (error) {
    console.error('Error fetching performance timing data:', error);
  }
};
export const handleCompare = async (baselineValue, RTMValue, moduleName, setPerformanceData) => {
  try {
    await fetch(
      `/api/performance-timing?Baseline=${baselineValue}&RTM=${RTMValue}&Module=${moduleName}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPerformanceData(data);
        //console.log("Performance Data:", data);
      })
      .catch((error) => {
        console.error("Error fetching performance timing data:", error);
      });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
function createExcelSheet(data, sheetName) {
  // Create a worksheet and a workbook
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  // Write the workbook to a file
  XLSX.writeFile(wb, `${sheetName}.xlsx`);
}
export let ExportOverviewDataToExcel = (header,totals,overviewData) => {
  //console.log("Header:", header);
  //console.log("Overview Data:", overviewData);
  //console.log("Totals:", totals);
  // Indices to extract from overviewData
  const indices = [0, 1, 2, 5, 4, 11, 6, 7, 3];
  // Filter and format the data
  const filteredData = overviewData.map(row => {
    const filteredRow = {};
    indices.forEach((index, i) => {
      filteredRow[header[i]] = row[index];
    });
    console.log("Filtered Row:", filteredRow);
    return filteredRow;
  });
  console.log("Filtered Data:", filteredData);
  // Convert header into one JSON object
  let headerObj = {};
  header.forEach((item,index) => {
    if(index > 2){
      headerObj[item] = totals[index-3];
    } else if (index === 0) {
      headerObj[item] = 'Quality Planning';
    } else{
      headerObj[item] = '';
    }
  });
  console.log("Header Object:", headerObj);
  // Add header to the filtered data
  const dataToExport = [headerObj, ...filteredData];
  createExcelSheet(dataToExport, 'OverviewSummary');
};
export let ExportModuleDataToExcel = (moduleData,lastRtmColumnIndex,lastBaselineIndex,moduleName,commentIndex,selectedOption) => {
  const indices = [0,lastRtmColumnIndex,lastBaselineIndex-1,lastBaselineIndex,commentIndex ];
  const headers = ["Scenario Name",moduleData[1]?.[lastRtmColumnIndex],moduleData[1]?.[lastBaselineIndex-1],moduleData[1]?.[lastBaselineIndex],"Comment"];

  const filteredData = moduleData.slice(2).map((row, rowIndex) => {
    const filteredRow = {};
    indices.forEach((index,i) => {
      //console.log(`Row ${rowIndex}, Header: ${headers[i]}, Index: ${index}, Value: ${row[index]}`);
      if(i === 1 || i === 2 || i === 3){
        filteredRow[headers[i]] = parseFloat(row[index]).toFixed(2);
      } else {
        filteredRow[headers[i]] = row[index];
      }
    });
    return filteredRow;
  });
  //add string Deviation with RTM in header before comment
  headers.splice(4,0,"Deviation with RTM");
  const deviationData = filteredData.map(row => {
    const deviation = calculateDeviation(row[headers[1]], row[headers[3]]);
    // Read all elements from row except the last one (comment)
    const rowWithoutLast = Object.keys(row).slice(0, -1).reduce((result, key) => {
      result[key] = row[key];
      return result;
    }, {});
    return {...rowWithoutLast, [headers[4]]: deviation.deviation,Comment: row.Comment};
  });
  createExcelSheet(deviationData, moduleName);
};
export let ExportTotalTimingToExcel = (exportData,moduleName) => {
    console.log("Export Data:", exportData);
    const name = `${moduleName}_TotalTiming`;
    createExcelSheet(exportData, name);
};

export let fetchTeams = async (setTeams) => {
  try {
    const response = await fetch("/api/teams");
    if (!response.ok) {
      throw new Error(`HTTP error in fetchTeams! Status: ${response.status}`);
    }
    const data = await response.json();
    setTeams(data);
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};
export let CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-1 border border-gray-600 font-semibold rounded">
        <p className="">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};
export let openLogPath = (moduleName,Baseline,usecase) => {
  const logPath = `C:\\apps\\data\\Results\\${moduleName}\\${Baseline}\\Logs\\${usecase}`;
  const formattedPath = logPath.replace(/\\/g, '/'); // Convert backslashes to forward slashes
  const encodedPath = encodeURI(`localexplorer:${formattedPath}`); // Encode the URI
  window.location.href = encodedPath;
}
export const fetchTestDetailsData = async (dispatch) => {
  try {
    const response = await fetch('/api/fetch-test-details');
    const data = await response.json();
    //console.log('Test details data:', data);
    dispatch(setTestCaseDetails(data));
  } catch (error) {
    console.error('Error fetching background data:', error);
    dispatch(clearTestCaseDetails());
  }
};
export default {
  RenderPerformanceTable,
  getOverviewSummaryData,
  getDashboardData,
  constructUrlParams,
  calculateDeviation,
  getMasterData,
  handleCompare,
  ExportOverviewDataToExcel,
  ExportModuleDataToExcel,
  ExportTotalTimingToExcel,
  fetchTeams,
  CustomTooltip,
  openLogPath,
  fetchTestDetailsData
}