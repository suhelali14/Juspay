import React, { useState } from 'react'
const ModifySize = (value) => {
  const [steps, setSteps] = useState(0);



  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Use a regular expression to check if it's a valid integer or a valid negative integer
    if (/^-?\d+$/.test(inputValue)) {
      setSteps(inputValue);
    } else {
      setSteps(0);
    }
  };


  return (
    <div style={{
      maxWidth: '200px',
    }}>
      <div className='relative'>
        <div className="bg-purple-700 rounded-md p-1 flex items-center"
        >
          <p className="text-white text-xs mr-2">Change Size to {" "}</p>
          <div className="flex-1">
            <input
              id='changesize'
              type="text"
              placeholder="Enter Steps"
              className={`p-1 rounded-md w-full text-xs border-none ${value.value}`}
              value={steps}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="absolute bottom-6 left-0 h-5 w-10 bg-purple-700 transform rounded-all rounded-lg"></div>

      </div>
    </div>
  );
};

export default ModifySize
