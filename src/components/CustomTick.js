import React,{ useState } from 'react';

const CustomTick = ({ x, y, payload }) => {
    const [isHovered, setIsHovered] = useState(false);
  const maxLength = 14;
  const truncatedLabel = payload.value.length > maxLength ? `${payload.value.substring(0, maxLength)}...` : payload.value;

  return (
    <g transform={`translate(${x},${y})`}>
      <title className="font-bold">{payload.value}</title>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-30)"
        className="font-medium"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {truncatedLabel}
        {isHovered && (
          <foreignObject x={0} y={-40} width="120" height="40">
            <div className="bg-white p-1 border border-gray-300 rounded shadow-lg font-bold">
              <span className="font-bold">{payload.value}</span>
            </div>
          </foreignObject>
        )}
      </text>
    </g>
  );
};

export default CustomTick;