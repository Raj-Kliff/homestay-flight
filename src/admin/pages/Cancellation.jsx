import React, { useState } from 'react';

const requestTypes = [
  { value: 1, label: 'Full Cancellation' },
  { value: 2, label: 'Partial Cancellation' },
  { value: 3, label: 'Reissuance' }
];

const bookingModes = [
  { value: 5, label: 'API' },
  { value: 0, label: 'Manual' }
];

const Cancellation = () => {
  const [formData, setFormData] = useState({
    requestType: 1,
    bookingId: '',
    bookingMode: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="min-h-[100%] bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Flight Cancellation Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Request Type */}
          <div>
            <label className="block font-medium text-gray-700">Request Type *</label>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {requestTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Booking ID */}
          <div>
            <label className="block font-medium text-gray-700">Booking ID *</label>
            <input
              type="number"
              name="bookingId"
              value={formData.bookingId}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Unique Booking ID"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Booking Mode */}
          <div>
            <label className="block font-medium text-gray-700">Booking Mode (Optional)</label>
            <select
              name="bookingMode"
              value={formData.bookingMode}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {bookingModes.map(mode => (
                <option key={mode.value} value={mode.value}>{mode.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Cancellation;
