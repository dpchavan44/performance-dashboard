import React from 'react';
import { Link } from 'react-router-dom';

const PerformanceTimingLink = ({ moduleName, lastBaseline, RTM }) => (
  <div className="mb-4 ml-6">
    <Link
      to={`/${moduleName}/performancetiming?Baseline=${lastBaseline}&RTM=${RTM}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 font-bold"
    >
      Performance Timings
    </Link>
  </div>
);

export default PerformanceTimingLink;