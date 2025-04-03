import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [filterText, setFilterText] = useState("");
  const [data, setData] = useState([
    { id: 1, bookingId: "BKG001", pnr: "PNR001", origin: "New York", destination: "London", date: "2023-04-10" },
    { id: 2, bookingId: "BKG002", pnr: "PNR002", origin: "Delhi", destination: "Dubai", date: "2023-04-12" },
    { id: 3, bookingId: "BKG003", pnr: "PNR003", origin: "Mumbai", destination: "Singapore", date: "2023-05-01" },
    { id: 4, bookingId: "BKG004", pnr: "PNR004", origin: "Bangkok", destination: "Tokyo", date: "2023-06-15" },
    { id: 5, bookingId: "BKG005", pnr: "PNR005", origin: "Paris", destination: "Rome", date: "2023-07-20" },
  ]);

  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate()

  // Filter data based on search input
  const filteredData = data.filter((item) =>
    item.bookingId.toLowerCase().includes(filterText.toLowerCase()) ||
    item.pnr.toLowerCase().includes(filterText.toLowerCase()) ||
    item.origin.toLowerCase().includes(filterText.toLowerCase()) ||
    item.destination.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleDelete = (booking) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete Booking ID: ${booking.bookingId}?`);
    if (confirmDelete) {
      setData(data.filter((item) => item.id !== booking.id));
    }
  };

  // Columns for the table
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Booking ID",
      selector: (row) => row.bookingId,
      sortable: true,
    },
    {
      name: "PNR",
      selector: (row) => row.pnr,
      sortable: true,
    },
    {
      name: "Origin",
      selector: (row) => row.origin,
      sortable: true,
    },
    {
      name: "Destination",
      selector: (row) => row.destination,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "View",
      cell: (row) => (
        <a href="#" className="text-blue-500 hover:underline">
          View
        </a>
      ),
      ignoreRowClick: true,
      button: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white px-2 py-1 text-xs cursor-pointer rounded"
            onClick={()=>navigate('/user/cancellation')}
          >
            Cancellation
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="bg-green-500 text-white px-2 text-xs cursor-pointer py-1 rounded"
            onClick={()=>navigate('/user/change-flight')}
          >
            Change Flight
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="Search by Booking ID, PNR, Origin, or Destination"
          className="w-64 px-4 py-1 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      {/* DataTable */}
      <DataTable
        title="My Bookings"
        columns={columns}
        data={filteredData}
        pagination
        onSelectedRowsChange={handleRowSelected}
        highlightOnHover
        striped
        responsive
        dense
        customStyles={{
            headRow: {
              style: {
                backgroundColor: '#1f2937',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              },
            },
            headCells: {
              style: {
                padding: '8px',
              },
            },
            rows: {
              style: {
                fontSize: '14px',
                padding: '5px',
                transition: 'all 0.3s',
              },
              highlightOnHoverStyle: {
                backgroundColor: '#e5e7eb',
                transition: 'background-color 0.3s',
              },
            },
          }}
      />
    </div>
  );
};

export default MyBookings;
