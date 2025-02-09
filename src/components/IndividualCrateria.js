import React from 'react';

export const IndividualCrateria = () => {
  return (
    <div className="flex space-x-4">
      <div className="bg-green-800 text-white p-2">
      </div>
      <h5 className="text-lg font-bold">Improvement (&gt;10% and diff&gt;1 Second)</h5>
      <div className="bg-green-400 text-white p-2">
      </div>
      <h5 className="text-lg font-bold">Improvement (&lt;10% and diff&lt;1 Second)</h5>
      <div className="bg-red-500 text-white p-2">
      </div>
      <h5 className="text-lg font-bold">Regression (&gt;10% and diff&gt;1 Second)</h5>
      <div className="bg-yellow-400 text-white p-2">
      </div>
      <h5 className="text-lg font-bold">Regression (&lt;10% and diff&lt;1 Second)</h5>
    </div>
  );
};