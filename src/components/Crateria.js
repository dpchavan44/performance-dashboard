import React from 'react'
import TooltipInfo from './TooltipInfo';

const Crateria = () => {
  return (
    <div>
      <table className="bg-white border border-black">
        <thead>
          <tr>
            <td className="py-1 px-4 border border-black text-green-800 font-medium">
              <TooltipInfo message="Improvement details: Latest baseline value is greater than RTM-Value and difference greater than 1 Second along with deviation greater than 10%.">
                Improvement (&gt;10% and diff&gt;1)
              </TooltipInfo>
            </td>
            <td className="py-1 px-4 border border-black text-red-500 font-medium">
              <TooltipInfo message="Improvement details: RTM-Value value is greater than Latest baseline value and difference greater than 1 Second along with deviation greater than 10%.">
                Regression (&gt;10% and diff&gt;1)
              </TooltipInfo>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default Crateria