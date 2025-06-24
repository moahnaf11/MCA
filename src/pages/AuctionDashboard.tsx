import React from 'react';
import StatCard from '../components/StatCard';
import { 
  Gavel, 
  CheckCircle, 
  Radio, 
  Clock,
  Car,
  CreditCard,
  Package,
  Users,
  UserCheck,
  UserX,
  FileSignature
} from 'lucide-react';

const AuctionDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Auction Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Export Data
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            New Auction
          </button>
        </div>
      </div>

      {/* Auction Stats */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Auction Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Auctions"
            value={1033}
            icon={Gavel}
            color="red"
            trend={{ value: 5.2, isPositive: true }}
          />
          <StatCard
            title="Completed Auctions"
            value={1030}
            icon={CheckCircle}
            color="red"
            trend={{ value: 3.1, isPositive: true }}
          />
          <StatCard
            title="Live Auctions"
            value={0}
            icon={Radio}
            color="red"
          />
          <StatCard
            title="Upcoming Auctions"
            value={3}
            icon={Clock}
            color="red"
            trend={{ value: 1.5, isPositive: true }}
          />
        </div>
      </div>

      {/* Sales Stats */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Sold Vehicles"
            value={69414}
            icon={Car}
            color="blue"
            trend={{ value: 8.7, isPositive: true }}
          />
          <StatCard
            title="Sold Unpaid"
            value={7097}
            icon={CreditCard}
            color="blue"
            trend={{ value: 2.3, isPositive: false }}
          />
          <StatCard
            title="Sold Partial Paid"
            value={276}
            icon={CreditCard}
            color="blue"
          />
          <StatCard
            title="Sold Full Paid"
            value={62041}
            icon={CheckCircle}
            color="blue"
            trend={{ value: 12.4, isPositive: true }}
          />
        </div>
      </div>

      {/* Inventory Stats */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Inventory Total"
            value={4196}
            icon={Package}
            color="green"
            trend={{ value: 6.8, isPositive: true }}
          />
          <StatCard
            title="Marhaba Used Cars"
            value={0}
            icon={Car}
            color="green"
          />
          <StatCard
            title="Marhaba Auction Inventory"
            value={1550}
            icon={Package}
            color="green"
            trend={{ value: 4.2, isPositive: true }}
          />
          <StatCard
            title="Consigners Inventory"
            value={2646}
            icon={UserCheck}
            color="green"
            trend={{ value: 7.1, isPositive: true }}
          />
        </div>
      </div>

      {/* User Stats */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">User Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Registered Users"
            value={94250}
            icon={Users}
            color="orange"
            trend={{ value: 15.3, isPositive: true }}
          />
          <StatCard
            title="With NsID"
            value={50358}
            icon={UserCheck}
            color="orange"
            trend={{ value: 9.2, isPositive: true }}
          />
          <StatCard
            title="Without NsID"
            value={43892}
            icon={UserX}
            color="orange"
            trend={{ value: 1.8, isPositive: false }}
          />
          <StatCard
            title="Signed Buyer Agreement"
            value={7950}
            icon={FileSignature}
            color="orange"
            trend={{ value: 22.7, isPositive: true }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg hover:bg-red-100 transition-colors">
            <Gavel className="h-5 w-5" />
            <span>Create New Auction</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors">
            <Car className="h-5 w-5" />
            <span>Add Vehicle</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg hover:bg-green-100 transition-colors">
            <Users className="h-5 w-5" />
            <span>Manage Users</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionDashboard;