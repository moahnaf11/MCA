import { MetricCard } from "../components/MetricCard";
import { BarChart } from "../components/charts/BarChart";
import { LineChart } from "../components/charts/LineChart";
import { DonutChart } from "../components/charts/DonutChart";
import { LiveAuctions } from "../components/LiveAuctions";
import {
  DollarSign,
  TrendingUp,
  Users,
  Car,
  Gavel,
  Clock,
  Package,
  UserCheck,
  FileText,
  ShoppingCart,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import {
  auctionReportData,
  fullAuctionReportData,
  branchSalesData,
  marhabaInventoryData,
  consignersInventoryData,
  customerData,
} from "../data/chartData";

function AuctionDashboard() {
  const metrics = [
    // First Row - Red Cards (Auction Data)
    {
      title: "Total Auctions",
      value: "1,040",
      change: "+2.5%",
      trend: "up" as const,
      icon: Gavel,
      gradient: "bg-gradient-to-r from-red-500 to-red-600",
    },
    {
      title: "Completed Auctions",
      value: "1,037",
      change: "+1.8%",
      trend: "up" as const,
      icon: FileText,
      gradient: "bg-gradient-to-r from-red-500 to-red-600",
    },
    {
      title: "Live Auctions",
      value: "0",
      change: "0%",
      trend: "up" as const,
      icon: Clock,
      gradient: "bg-gradient-to-r from-red-500 to-red-600",
    },
    {
      title: "Upcoming Auctions",
      value: "3",
      change: "+50%",
      trend: "up" as const,
      icon: TrendingUp,
      gradient: "bg-gradient-to-r from-red-500 to-red-600",
    },

    // Second Row - Blue Cards (Vehicle Sales Data)
    {
      title: "Total Sold Vehicles",
      value: "69,723",
      change: "+5.2%",
      trend: "up" as const,
      icon: Car,
      gradient: "bg-gradient-to-r from-blue-600 to-blue-700",
    },
    {
      title: "Sold Unpaid",
      value: "7,154",
      change: "+3.1%",
      trend: "up" as const,
      icon: AlertCircle,
      gradient: "bg-gradient-to-r from-blue-600 to-blue-700",
    },
    {
      title: "Sold Partial Paid",
      value: "268",
      change: "-1.2%",
      trend: "down" as const,
      icon: CreditCard,
      gradient: "bg-gradient-to-r from-blue-600 to-blue-700",
    },
    {
      title: "Sold Full Paid",
      value: "62,301",
      change: "+4.8%",
      trend: "up" as const,
      icon: DollarSign,
      gradient: "bg-gradient-to-r from-blue-600 to-blue-700",
    },

    // Third Row - Green Cards (Inventory Data)
    {
      title: "Inventory Total",
      value: "4,147",
      change: "+2.3%",
      trend: "up" as const,
      icon: Package,
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      title: "Marhaba Used Cars",
      value: "0",
      change: "0%",
      trend: "up" as const,
      icon: Car,
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      title: "Marhaba Auction Inventory",
      value: "1,575",
      change: "+1.8%",
      trend: "up" as const,
      icon: ShoppingCart,
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      title: "Consigners Inventory",
      value: "2,572",
      change: "+3.2%",
      trend: "up" as const,
      icon: Users,
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
    },

    // Fourth Row - Orange Cards (User Data)
    {
      title: "Total Registered Users",
      value: "94,379",
      change: "+8.5%",
      trend: "up" as const,
      icon: Users,
      gradient: "bg-gradient-to-r from-orange-500 to-orange-600",
    },
    {
      title: "With NsID",
      value: "50,487",
      change: "+6.2%",
      trend: "up" as const,
      icon: UserCheck,
      gradient: "bg-gradient-to-r from-orange-500 to-orange-600",
    },
    {
      title: "Without NsId",
      value: "43,892",
      change: "+4.1%",
      trend: "up" as const,
      icon: AlertCircle,
      gradient: "bg-gradient-to-r from-orange-500 to-orange-600",
    },
    {
      title: "Signed Buyer Agreement",
      value: "8,009",
      change: "+12.3%",
      trend: "up" as const,
      icon: FileText,
      gradient: "bg-gradient-to-r from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <main className="p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <BarChart
              title="Auction Report - Monthly Comparison"
              data={auctionReportData}
            />
          </div>

          <DonutChart
            title="Marhaba Inventory Distribution"
            data={marhabaInventoryData}
          />

          <div className="xl:col-span-3">
            <BarChart
              title="Full Auction Report - All Categories"
              data={fullAuctionReportData}
            />
          </div>

          <div className="xl:col-span-3">
            <LineChart
              title="Branch Wise - Monthly Sales Report"
              data={branchSalesData}
            />
          </div>

          <DonutChart title="Customer Data Distribution" data={customerData} />
          <DonutChart
            title="Consigners Inventory Status"
            data={consignersInventoryData}
          />
          <LiveAuctions />
        </div>

        {/* Bottom Charts */}
        {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6"> */}
        {/* <DonutChart title="Customer Data Distribution" data={customerData} />
          <DonutChart
            title="Consigners Inventory Status"
            data={consignersInventoryData}
          /> */}
        {/* </div> */}
      </main>
    </div>
  );
}

export default AuctionDashboard;
