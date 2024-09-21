import React, { useState } from 'react'
const JumpToX = (value) => {
  const [stepsX, setStepsX] = useState(0);
  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value);
    if (!isNaN(inputValue)) {

      setStepsX(inputValue);
    } else {

      setStepsX(0);
    }
  };

  return (
    <div style={{
      maxWidth: '200px',
    }}>
      <div className="relative">

        <div className="bg-blue-500 rounded-md p-1 flex items-center">
          <p className="text-white text-xs mr-2">Go to {"X"}</p>
          <div className="flex-1">
            <input
              id='jumptoX'
              type="text"
              placeholder="Enter X"
              className={`p-1 rounded-md w-full text-xs border-none ${value.value}`}
              value={stepsX}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="absolute bottom-6 left-0 h-5 w-10 bg-blue-500 transform rounded-all rounded-lg"></div>

      </div>
    </div>
  );
};

export default JumpToX
