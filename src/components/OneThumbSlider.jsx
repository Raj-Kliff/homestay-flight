import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const OneThumbSlider = () => {
  const [value, setValue] = useState(50); // Only one value for single thumb

  const handleSliderChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-lg font-semibold">Trip Time: {value}</div>
      <RangeSlider
        className="single-thumb w-64"
        defaultValue={[0, value]}
        onInput={handleSliderChange}
        thumbsDisabled={[true, false]}
        rangeSlideDisabled={true}
      />
    </div>
  );
};

export default OneThumbSlider;
