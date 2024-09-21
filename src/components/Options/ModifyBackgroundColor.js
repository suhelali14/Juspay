import React, { useState } from 'react'
const ModifyBackgroundColor = (value) => {
    const [steps, setSteps] = useState("");
    const RainbowColors = [
        { label: 'Red', value: '#FF0000' },
        { label: 'Orange', value: '#FFA500' },
        { label: 'Yellow', value: '#FFFF00' },
        { label: 'Green', value: '#008000' },
        { label: 'Blue', value: '#0000FF' },
        { label: 'Indigo', value: '#4B0082' },
        { label: 'Violet', value: '#EE82EE' },
    ]

    const handleInputChange = (e) => {
        setSteps(e.target.value);
    };

    return (
        <div style={{
            maxWidth: '200px',
        }}>
            <div className='relative'>
                <div className="bg-purple-700 rounded-md p-1 flex items-center">
                    <p className="text-white text-xs mr-2">Choose Background {" "}</p>
                    <div className="flex-1">
                        <input
                            id="changebackgroundcolor"
                            type="text"
                            placeholder="Choose Background"
                            className={`p-1 rounded-md w-full text-xs border-none ${value.value}`}
                            value={steps}
                            onChange={handleInputChange}
                            list="color-options"
                        />
                        <datalist id="color-options">
                            {RainbowColors.map((color) => (
                                <option key={color.value} value={color.value}>
                                    {color.label}
                                </option>
                            ))}
                        </datalist>
                    </div>
                </div>
                <div className="absolute bottom-6 left-0 h-5 w-10 bg-purple-700 transform rounded-all rounded-lg"></div>

            </div>
        </div>
    );
};

export default ModifyBackgroundColor
