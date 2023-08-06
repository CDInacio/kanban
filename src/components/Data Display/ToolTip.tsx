interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

import React, { useState } from "react";

const Tooltip = ({ text, children }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="relative inline-block">
      <div
        className="p-2 text-white rounded cursor-pointer"
        onMouseEnter={handleToggleTooltip}
        onMouseLeave={handleToggleTooltip}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute p-2 text-white transform -translate-x-1/2 bg-gray-800 rounded min-w-[150px] text-center top-full left-1/2">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
