import React, { useState } from 'react';
import { 
  ChevronDown,
  Home,
  Users,
  Settings,
  FileText,
  Mail,
  ChevronRight,
  CopyX,
  Plane,
  Ticket,
  Album 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    title: 'Dashboard',
    icon: <Home className="w-5 h-5" />,
    path: '/user/dashboard'
  },
  {
    title: 'Profile',
    icon: <Users className="w-5 h-5" />,
    path: '/user/profile'
  },
  {
    title: 'Cancellation',
    icon: <CopyX className="w-5 h-5" />,
    path: '/user/cancellation'
  },
  {
    title: 'Change Flight',
    icon: <Plane className="w-5 h-5" />,
    path: '/user/change-flight'
  },
  {
    title: 'Print Ticket',
    icon: <Ticket className="w-5 h-5" />,
    path: '/user/print-ticket'
  },
  {
    title: 'My Bookings',
    icon: <Album className="w-5 h-5" />,
    path: '/user/my-bookings'
  },
];

const Sidebar = ({ isOpen }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (title) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className={`bg-gray-800 text-white h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} fixed left-0 top-16`}>
      <div className="py-4">
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link to={item.path}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-700 transition-colors ${
                isOpen ? 'justify-between' : 'justify-center'
              }`}
              onClick={() => item.submenu && isOpen && toggleSubmenu(item.title)}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {isOpen && <span>{item.title}</span>}
              </div>
              {isOpen && item.submenu && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedMenus[item.title] ? 'rotate-180' : ''
                  }`}
                />
              )}
            </Link>
            {isOpen && item.submenu && expandedMenus[item.title] && (
              <div className="bg-gray-700">
                {item.submenu.map((subItem) => (
                  <Link to={subItem.path}
                    key={subItem.title}
                    className="flex items-center gap-2 px-8 py-2 cursor-pointer hover:bg-gray-600"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-sm">{subItem.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;