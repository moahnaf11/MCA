import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  ShoppingCart,
  Users,
  Settings,
  FileText,
  BarChart3,
  Bell,
  CreditCard,
  Package,
  UserCheck,
  Archive,
  Clock,
  RefreshCw
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Auction Dashboard' },
    { path: '/sold-vehicles', icon: Car, label: 'Sold Vehicles' },
  ];

  const additionalItems = [
    { icon: ShoppingCart, label: 'Auctions' },
    { icon: Package, label: 'Inventory' },
    { icon: Users, label: 'Users' },
    { icon: CreditCard, label: 'Payments' },
    { icon: FileText, label: 'Reports' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Bell, label: 'Notifications' },
    { icon: UserCheck, label: 'Consigners' },
    { icon: Archive, label: 'Archive' },
    { icon: Clock, label: 'History' },
    { icon: RefreshCw, label: 'Sync' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="bg-white w-64 shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Marhaba</h2>
            <p className="text-xs text-gray-500">Auctions</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-red-50 text-red-700 border-r-2 border-red-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
        
        <div className="pt-4 border-t border-gray-200 mt-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
            Other
          </p>
          {additionalItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 cursor-pointer"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-3">
          <p className="text-xs font-medium text-red-800">Need Help?</p>
          <p className="text-xs text-red-600 mt-1">Contact Support</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;