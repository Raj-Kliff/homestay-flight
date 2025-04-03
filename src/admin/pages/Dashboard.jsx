import React, { useState } from 'react';
import { CircleUserRound, BadgeIndianRupee, Ticket, Users, Album, CopyX, Plane } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-${color}-100 p-4 rounded-lg shadow-md flex items-center space-x-4`}>
    <div className={`p-4 bg-${color}-500 text-white rounded-full`}>
      {icon}
    </div>
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-500">{value}</p>
    </div>
  </div>
);

function Dashboard() {

  const [data, setData] = useState({
    totalBookings: 1245,
    cancellations: 325,
    flightChanged: 45,
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-5">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Bookings"
          value={`Rs ${data.totalBookings}`}
          icon={<Album className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Cancellations"
          value={data.cancellations}
          icon={<CopyX className="w-5 h-5" />}
          color="red"
        />
        <StatCard
          title="Flights Changed"
          value={data.flightChanged}
          icon={<Plane className="w-5 h-5" />}
          color="purple"
        />
      </div>
    </div>
  );
}

export default Dashboard;