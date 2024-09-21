import React, { useState } from 'react'
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TurnCounterclockwise = (value) => {

  const [steps, setSteps] = useState(0);



  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value);
    if (!isNaN(inputValue)) {

      setSteps(inputValue);
    } else {

      setSteps(0);
    }
  };

  return (
    <div style={{
      maxWidth: '200px',
    }}>
      <div className="relative">

        <div className="bg-blue-500 rounded-md p-1 flex items-center">
          <p className="text-white text-xs mr-2">Turn <FontAwesomeIcon icon={faRotateLeft} /> for {" "}</p>
          <div className="flex-1">
            <input
              id='turnanti'
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

export default TurnCounterclockwise
