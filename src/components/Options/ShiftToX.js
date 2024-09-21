import React, { useState } from 'react';

const ShiftX = (value) => {
  const [steps, setSteps] = useState(0);



  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Use a regular expression to check if it's a valid integer or a valid negative integer
    if (/^-?\d+$/.test(inputValue)) {
      setSteps(parseInt(inputValue));
    } else {
      setSteps(0);
    }
  };

  return (
    <div style={{
      maxWidth: '200px',
    }}>
      <div className="relative">

        <div className="bg-blue-500 rounded-md p-1 z-0 flex items-center relative">
          <p className="text-white text-xs mr-2">Steps in the X axis {" "}</p>
          <div className="flex-1">
            <input
              id='movex'
              name='movex'
              type="text"
              placeholder="Enter Steps"
              className={`p-1 rounded-md w-full text-xs border-none ${value.value}`}
              value={steps}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="absolute bottom-6 left-0 h-5 w-10 bg-blue-500 transform rounded-all rounded-lg"></div>
      </div>
    </div>
  );
};

export default ShiftX;
