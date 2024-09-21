import React from 'react';

const ResetPosition = ({ value, onReset }) => {
  const handleResetClick = () => {
    console.log("here the reset");
    if (onReset) {
      onReset(); // Trigger the reset action passed as a prop
    console.log("here we are in the reset");
    
    }
  };

  return (
    <div style={{ maxWidth: '200px' }}>
      <div className="relative">
        <div className="bg-red-500 rounded-md p-1 flex items-center">
          <p className="text-white text-xs mr-2">Reset Position</p>
          <button
            className="bg-white text-red-500 rounded-md p-1 text-xs border-none flex-1"
            onClick={handleResetClick}
          >
            Reset
          </button>
        </div>
        <div className="absolute bottom-6 left-0 h-5 w-10 bg-red-500 transform rounded-all rounded-lg"></div>
      </div>
    </div>
  );
};

export default ResetPosition;
