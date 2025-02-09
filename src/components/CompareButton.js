import React from 'react';

const CompareButton = ({ onClick }) => {
  return (
    <div className="mb-4 flex items-center">
      <button
        onClick={onClick}
        className="bg-[#0f0f44] text-white p-2 rounded h-[34px] flex items-center justify-center"
      >
        Compare
      </button>
    </div>
  );
};

export default CompareButton;