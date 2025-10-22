import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Box from "../icons/Box";
import Cart from "../icons/Cart";
import Users from "../icons/Users";
import DashboardIcon from "../icons/Dashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";


interface IUser {
  _id: string;
  username: string;
}

interface IOrder {
  _id: string;
  userId: IUser;
  paymentMethod: string;
  placedAt: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
}

interface DashboardData {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
  avgOrderValue: number;
  ordersByStatus: { _id: string; count: number }[];
  topProducts: { productName: string; totalQty: number; revenue: number }[];
  revenueLast30Days: { _id: string; totalSales: number; orders: number }[];
}

const COLORS = [
  "#2196F3",
  "#FFC107",
  "#4CAF50",
  "#FF5722",
  "#9C27B0",
  "#795548",
  "#9E9E9E",
];

const DashboardAdmin: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"7days" | "month" | "year">("7days");
  const [revenueData, setRevenueData] = useState<{ _id: string; totalSales: number; orders: number }[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);

  // Fetch main dashboard data
  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`, { withCredentials: true });
      setData({
        totalOrders: res.data.totalOrders ?? 0,
        totalUsers: res.data.totalUsers ?? 0,
        totalProducts: res.data.totalProducts ?? 0,
        totalRevenue: res.data.totalRevenue ?? 0,
        avgOrderValue: res.data.avgOrderValue ?? 0,
        ordersByStatus: res.data.ordersByStatus ?? [],
        topProducts: res.data.topProducts ?? [],
        revenueLast30Days: res.data.revenueLast30Days ?? [],
      });
      setRevenueData(res.data.revenueLast30Days ?? []);
    } catch (err) {
      toast.error("Failed to fetch dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch revenue by period
  const fetchRevenueByPeriod = async (periodValue: string) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/revenue`, {
        params: { period: periodValue },
        withCredentials: true,
      });
      setRevenueData(res.data.revenue);
    } catch (err) {
      toast.error("Failed to fetch revenue data");
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        { withCredentials: true }
      );
      console.log(data.orders);
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchOrders();
  }, []);

  useEffect(() => {
    // Update revenue chart when period changes
    let periodQuery: string;
    if (period === "7days") periodQuery = "week";
    else if (period === "month") periodQuery = "month";
    else periodQuery = "year";
    fetchRevenueByPeriod(periodQuery);
  }, [period]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-200 text-yellow-800";
      case "Processing": return "bg-blue-200 text-blue-800";
      case "Shipped": return "bg-purple-200 text-purple-800";
      case "Out for Delivery": return "bg-orange-200 text-orange-800";
      case "Delivered": return "bg-green-200 text-green-800";
      case "Cancelled": return "bg-red-200 text-red-800";
      case "Returned": return "bg-gray-200 text-gray-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;
  if (!data) return <div className="text-center py-10 text-red-500">No data available</div>;

  const overviewCards = [
    { title: "Total Products", value: data.totalProducts, change: "Products in store", icon: <Box className="text-white" /> },
    { title: "Total Orders", value: data.totalOrders, change: "Orders placed", icon: <Cart className="text-white h-6 w-6" /> },
    { title: "Total Users", value: data.totalUsers, change: "Registered users", icon: <Users className="text-white h-6 w-6" /> },
    { title: "Total Revenue", value: `$${data.totalRevenue.toLocaleString()}`, change: `Avg Order: $${data.avgOrderValue.toFixed(2)}`, icon: <DashboardIcon className="text-white" /> },
  ];

  return (
    <div className="px-4 md:px-8 py-4">
      <h1 className="text-xl font-neogrotesk-bold">Overview</h1>
      <h2 className="text-[#6b6b6b] font-neogrotesk-ultralight pt-2 text-sm sm:text-base">Welcome back to your admin dashboard</h2>

      {/* Overview Cards */}
      <div className="pt-8 flex flex-wrap justify-start gap-6">
        {overviewCards.map((card, i) => (
          <div key={i} className="h-42 w-full sm:w-60 bg-white rounded-2xl border border-[#dbdada]">
            <div className="px-6 pt-8 flex justify-between items-center">
              <h1 className="text-[#887e7e]">{card.title}</h1>
              <div className="bg-[#dbdada] flex items-center justify-center rounded-full h-12 w-12">{card.icon}</div>
            </div>
            <div className="px-6 pb-4">
              <h1 className="text-lg sm:text-xl font-semibold">{card.value}</h1>
              <p className="text-sm text-muted-foreground">{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart with period selector */}
      <section className="bg-white rounded-2xl border border-[#dbdada] p-6 mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <div className="flex gap-2">
            <button onClick={() => setPeriod("7days")} className={`px-2 py-1 rounded ${period === "7days" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>Last 7 Days</button>
            <button onClick={() => setPeriod("month")} className={`px-2 py-1 rounded ${period === "month" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>This Month</button>
            <button onClick={() => setPeriod("year")} className={`px-2 py-1 rounded ${period === "year" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>This Year</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSales" fill="#4CAF50" name="Sales ($)" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Orders by Status Pie Chart */}
      <section className="bg-white rounded-2xl border border-[#dbdada] p-6 mt-10">
        <h2 className="text-lg font-semibold mb-4">Orders by Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data.ordersByStatus} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={100} label>
              {data.ordersByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Recent Orders Table */}
      <section className="mt-6 w-full pb-10">
        <div className="bg-white rounded-2xl border border-[#dbdada] overflow-hidden">
          <div className="py-6 px-4"><h1 className="font-neogrotesk-regular text-[#6d6363]">Recent Orders</h1></div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="min-w-[700px] px-4 pb-4">
              <div className="flex gap-4 font-neogrotesk-regular border-b pb-3 border-[#dbdada] items-center text-xs">
                <p className="w-24 ml-2">Order ID</p>
                <p className="w-32 ml-2">Customer</p>
                <p className="w-24 ml-2">Payment</p>
                <p className="w-24 ml-2">Date</p>
                <p className="w-24 ml-2">Total</p>
                <p className="w-28 ml-2">Order Status</p>
                <p className="w-28 ml-2">Payment Status</p>
              </div>
              {orders.slice(10).map((item) => (
                <div key={item._id} className="flex items-center border-b pb-3 pt-2 text-xs border-[#dbdada]">
                  <p className="w-24 ml-2 truncate">{item._id}</p>
                  <p className="w-32 ml-2 truncate">{item.userId._id }</p>
                  <p className="w-24 ml-2 lg:ml-12 truncate">{item.paymentMethod ?? "N/A"}</p>
                  <p className="w-24 ml-2">{item.placedAt ? new Date(item.placedAt).toLocaleDateString() : "N/A"}</p>
                  <p className="w-24 ml-2 lg:ml-8">${item.totalAmount ?? 0}</p>
                  <button className={`h-6 w-28 rounded-md text-xs font-medium ${getStatusColor(item.orderStatus ?? "")}`}>{item.orderStatus ?? "Unknown"}</button>
                  <button className="h-6 w-28 ml-6 rounded-md bg-green-200 text-green-800 text-xs">{item.paymentStatus ?? "Unknown"}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardAdmin;
