import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import UserList from './UserList';
import ChangeFlight from './ChangeFlight';
import Cancellation from './Cancellation';
import PrintTickets from './PrintTickets';
import MyBookings from './MyBookings';

function AdminRoutes() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} pt-16 p-6`}>
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/profile' element={<UserList/>} />
            <Route path='/change-flight' element={<ChangeFlight/>} />
            <Route path='/cancellation' element={<Cancellation/>} />
            <Route path='/print-ticket' element={<PrintTickets/>} />
            <Route path='/my-bookings' element={<MyBookings/>} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminRoutes;
