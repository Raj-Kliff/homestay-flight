import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Search } from 'lucide-react';

const UserList = () => {
  const [filterText, setFilterText] = useState("");
  const [data, setData] = useState([
    { id: 1, name: "name1", email: "raj@email.com", role: "admin" },
    { id: 2, name: "name2", email: "ravi@email.com", role: "user" },
    { id: 3, name: "name3", email: "santohs@email.com", role: "admin" },
    { id: 4, name: "name4", email: "akash@email.com", role: "user" },
    { id: 5, name: "name5", email: "kanahiya@email.com", role: "manager" },
    { id: 6, name: "name6", email: "rajkishor@email.com", role: "user" },
    { id: 7, name: "name7", email: "rajnish@email.com", role: "user" },
  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAllModalOpen, setDeleteAllModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  // Filter data based on search input
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Handle row selection change
  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // Handle delete button click
  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // Confirm delete single user
  const confirmDelete = () => {
    setData(data.filter((user) => user.id !== selectedUser.id));
    setDeleteModalOpen(false);
  };

  // Handle "Delete All" button click
  const handleDeleteAll = () => {
    if (selectedRows.length > 0) {
      setDeleteAllModalOpen(true);
    }
  };

  // Confirm delete all selected users
  const confirmDeleteAll = () => {
    setData(data.filter(user => !selectedRows.some(selected => selected.id === user.id)));
    setSelectedRows([]); // Clear selection
    setDeleteAllModalOpen(false);
  };

  // Handle input change in edit modal
  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  // Save changes in edit modal
  const saveChanges = () => {
    setData(data.map((user) => (user.id === selectedUser.id ? selectedUser : user)));


    
    setEditModalOpen(false);
  };

  // Columns for the table
  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2 whitespace-nowrap">
          <button
            className="bg-blue-500 text-white px-2 py-1 w-fit rounded cursor-pointer text-center"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 w-fit rounded cursor-pointer text-center"
            onClick={() => handleDelete(row)}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="Search by Name..."
          className="w-64 px-4 py-1 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      {/* Delete All Button */}
      {selectedRows.length > 0 && (
        <button
          onClick={handleDeleteAll}
          className="bg-red-500 text-white px-3 cursor-pointer py-1 mb-3 rounded"
        >
          Delete All ({selectedRows.length})
        </button>
      )}

      {/* DataTable */}
      <DataTable
        title="User List"
        columns={columns}
        data={filteredData}
        pagination
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        highlightOnHover
        striped
        responsive
        dense
      />

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-[#00000091] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Edit User</h2>
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={selectedUser?.name}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={selectedUser?.email}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <label className="block mb-2">Role:</label>
            <input
              type="text"
              name="role"
              value={selectedUser?.role}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={() => setEditModalOpen(false)}>
                Cancel
              </button>
              <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={saveChanges}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-[#00000091] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete <strong>{selectedUser?.name}</strong>?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Confirmation Modal */}
      {deleteAllModalOpen && (
        <div className="fixed inset-0 bg-[#00000091] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Confirm Delete All</h2>
            <p>Are you sure you want to delete <strong>{selectedRows.length}</strong> users?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={() => setDeleteAllModalOpen(false)}>
                Cancel
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={confirmDeleteAll}>
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
