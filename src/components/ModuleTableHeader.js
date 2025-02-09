import React from 'react';

const ModuleTableHeader = ({ moduleData, RTM, lastBaselineIndex, lastBaseline, selectedOption,isLastBaselineIsRTM }) => (
  <thead>
    <tr className="bg-[#006387bb] text-base">
      <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-72">
        Scenario Name (No. Use Cases: {moduleData?.length - 2})
      </th>
      {selectedOption === "release" && (
        <>
          <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14">
            Release Target
          </th>
          <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14">
            Final Target
          </th>
        </>
      )}
      <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14">
        {RTM}
      </th>
      {!isLastBaselineIsRTM && <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14">
        {moduleData[1]?.[lastBaselineIndex - 1]}
      </th>}
      <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14">
        {lastBaseline}
      </th>
      <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14">
        Deviation with RTM
      </th>
      {selectedOption === "release" && (
        <>
          <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14">
            % Deviation with Release Target
          </th>
          <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14">
            % Deviation with Final Target
          </th>
        </>
      )}
      <th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14">
        Comment
      </th>
      {/*<th className="border border-gray-400 px-2 py-0.5 font-medium text-left text-white w-14">
        Logs
      </th>*/}
    </tr>
  </thead>
);

export default ModuleTableHeader;