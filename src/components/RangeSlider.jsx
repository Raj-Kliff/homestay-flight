import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const RangeSliderr = () => {
  const [value, setValue] = useState([30, 60]);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>

      
      {/* Slider component */}
      <RangeSlider
        min={0}
        max={100}
        step={1}
        value={value}
        onInput={handleSliderChange}
      />

      {/* Display the values of the left and right thumbs */}
      <div>
        <span>Left Thumb: {value[0]}</span>
        <span> Right Thumb: {value[1]}</span>
      </div>
    </>
  );
}

export default RangeSliderr;
