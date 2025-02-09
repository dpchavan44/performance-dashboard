import React, { useState } from 'react';

const TooltipInfo = ({ message, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isVisible && (
        <div className="absolute bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
};

export default TooltipInfo;