import React from 'react';
import { useSelector } from 'react-redux';

const TestCaseDetails = ({ isOpen, onClose, moduleName,testID }) => {
  const details = useSelector((store) => store?.testCaseDetails?.testDetails[moduleName]);
  if (!isOpen || details?.length === 0) return null;
  // Find the specific detail object where the testID matches
  const matchingDetail = details?.find(detail => detail[1] === testID);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg relative flex flex-row">
        <button onClick={onClose} className="absolute top-0 right-0 text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        {matchingDetail ? (
          <table className="border border-black border-collapse w-full mt-4">
            <tbody>
              <tr className="border border-black">
                <td className="border border-black p-1">Use Case Name</td>
                <td className="border border-black p-1">{matchingDetail[2]}</td>
              </tr>
              <tr className="border border-black">
                <td className="border border-black p-1">Feature File Name</td>
                <td className="border border-black p-1">{matchingDetail[3]}</td>
              </tr>
              <tr className="border border-black">
                <td className="border border-black p-1">Performance Measuring Step</td>
                <td className="border border-black p-1">{matchingDetail[4]}</td>
              </tr>
              <tr className="border border-black">
                <td className="border border-black p-1">Test Data</td>
                <td className="border border-black p-1">{matchingDetail[5]}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className='font-medium'>No details found for the Test ID.</p>
        )}
      </div>
    </div>
  );
};

export default TestCaseDetails;