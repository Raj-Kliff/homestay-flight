import React, { useState } from 'react';

const requestTypes = [
  { value: 0, label: 'Not Set' },
  { value: 1, label: 'Full Cancellation' },
  { value: 2, label: 'Partial Cancellation' },
  { value: 3, label: 'Reissuance' }
];

const cancellationTypes = [
  { value: 0, label: 'Not Set' },
  { value: 1, label: 'No Show' },
  { value: 2, label: 'Flight Cancelled' },
  { value: 3, label: 'Others' }
];

const ChangeFlight = () => {
  const [formData, setFormData] = useState({
    requestType: 0,
    cancellationType: 0,
    origin: '',
    destination: '',
    ticketIds: '',
    remarks: ''
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
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Change Flight Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Request Type */}
          <div>
            <label className="block font-medium text-gray-700">Request Type *</label>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {requestTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Cancellation Type */}
          <div>
            <label className="block font-medium text-gray-700">Cancellation Type *</label>
            <select
              name="cancellationType"
              value={formData.cancellationType}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {cancellationTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Origin */}
          <div>
            <label className="block font-medium text-gray-700">Origin *</label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Origin"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block font-medium text-gray-700">Destination *</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Destination"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ticket IDs */}
          <div>
            <label className="block font-medium text-gray-700">Ticket ID(s) *</label>
            <input
              type="text"
              name="ticketIds"
              value={formData.ticketIds}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter IDs (comma-separated)"
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block font-medium text-gray-700">Remarks *</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Add your remarks here"
            ></textarea>
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

export default ChangeFlight;
