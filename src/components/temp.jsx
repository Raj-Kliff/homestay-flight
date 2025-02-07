import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FlightDateRangeInput = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);

  const handleDepartureChange = (date) => {
    setDepartureDate(date);
    // If the return date is before the new departure date, reset it.
    if (returnDate && date > returnDate) {
      setReturnDate(null);
    }
  };

  const handleReturnChange = (date) => {
    setReturnDate(date);
  };

  return (
    <div>
      <div className="date-picker-container">
        <h3>Departure Date</h3>
        <DatePicker
          selected={departureDate}
          onChange={handleDepartureChange}
          minDate={new Date()} 
          dateFormat="yyyy/MM/dd"
          placeholderText="Select departure date"
        />
      </div>

      <div className="date-picker-container">
        <h3>Return Date</h3>
        <DatePicker
          selected={returnDate}
          onChange={handleReturnChange}
          minDate={departureDate} 
          dateFormat="yyyy/MM/dd"
          placeholderText="Select return date"
          disabled={!departureDate}
        />
      </div>

      <div>
        {departureDate && <p>Departure Date: {departureDate.toLocaleDateString()}</p>}
        {returnDate && <p>Return Date: {returnDate.toLocaleDateString()}</p>}
      </div>
    </div>
  );
};

export default FlightDateRangeInput;
