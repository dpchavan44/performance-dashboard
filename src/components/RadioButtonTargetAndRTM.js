import React from 'react';

const RadioButtonTargetAndRTM = ({ selectedOption, handleOptionChange }) => (
  <div className="mb-4">
    <label className="mr-4 font-medium">
      <input
        type="radio"
        value="rtm"
        checked={selectedOption === "rtm"}
        onChange={handleOptionChange}
        className="mr-2"
      />
      % Deviation with RTM (Master)
    </label>
    <label className="font-medium">
      <input
        type="radio"
        value="release"
        checked={selectedOption === "release"}
        onChange={handleOptionChange}
        className="mr-2"
      />
      % Deviation with Release/Final Target
    </label>
  </div>
);

export default RadioButtonTargetAndRTM;