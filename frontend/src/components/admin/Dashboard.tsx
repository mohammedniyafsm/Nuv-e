import { useEffect, useState } from 'react';
import Box from '../icons/Box';
import Cart from '../icons/Cart';
import Dashboard from '../icons/Dashboard';
import Users from '../icons/Users';
import axios from 'axios';
import toast from 'react-hot-toast';

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

function DashboardAdmin() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        { withCredentials: true }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch orders.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'Processing':
        return 'bg-blue-200 text-blue-800';
      case 'Shipped':
        return 'bg-purple-200 text-purple-800';
      case 'Out for Delivery':
        return 'bg-orange-200 text-orange-800';
      case 'Delivered':
        return 'bg-green-200 text-green-800';
      case 'Cancelled':
        return 'bg-red-200 text-red-800';
      case 'Returned':
        return 'bg-gray-200 text-gray-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <>
      {/* Overview Section */}
      <section className="px-8 py-1">
        <div className="mt-10">
          <h1 className="text-xl font-neogrotesk-bold">Overview</h1>
          <h1 className="text-[#6b6b6b] font-neogrotesk-ultralight pt-2">
            Welcome back to your admin dashboard
          </h1>
        </div>
        <div className="pt-8 flex justify-start gap-6">
          {/* Total Products */}
          <div className="h-42 w-60 bg-white rounded-2xl border border-[#dbdada]">
            <div className="px-6 pt-8 flex justify-between items-center">
              <h1 className="text-[#887e7e] font-neogrotesk-regular text-sm">
                Total Products
              </h1>
              <div className="bg-[#dbdada] flex items-center justify-center rounded-full h-12 w-12">
                <Box className="text-white" />
              </div>
            </div>
            <div className="px-6">
              <h1>24</h1>
              <div className="flex gap-1 pt-2">
                <p className="text-sm text-green-600">↑</p>
                <p className="text-sm text-muted-foreground">+3 this month</p>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="h-42 w-60 bg-white rounded-2xl border border-[#dbdada]">
            <div className="px-6 pt-8 flex justify-between items-center">
              <h1 className="text-[#887e7e] font-neogrotesk-regular text-sm">
                Total Orders
              </h1>
              <div className="bg-[#dbdada] flex items-center justify-center rounded-full h-12 w-12">
                <Cart className="text-white h-6 w-6" />
              </div>
            </div>
            <div className="px-6">
              <h1>156</h1>
              <div className="flex gap-1 pt-2">
                <p className="text-sm text-green-600">↑</p>
                <p className="text-sm text-muted-foreground">+12 this week</p>
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className="h-42 w-60 bg-white rounded-2xl border border-[#dbdada]">
            <div className="px-6 pt-8 flex justify-between items-center">
              <h1 className="text-[#887e7e] font-neogrotesk-regular text-sm">
                Total Users
              </h1>
              <div className="bg-[#dbdada] flex items-center justify-center rounded-full h-12 w-12">
                <Users className="text-white h-6 w-6" />
              </div>
            </div>
            <div className="px-6">
              <h1>89</h1>
              <div className="flex gap-1 pt-2">
                <p className="text-sm text-green-600">↑</p>
                <p className="text-sm text-muted-foreground">+8 new users</p>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="h-42 w-60 bg-white rounded-2xl border border-[#dbdada]">
            <div className="px-6 pt-8 flex justify-between items-center">
              <h1 className="text-[#887e7e] font-neogrotesk-regular text-sm">
                Total Revenue
              </h1>
              <div className="bg-[#dbdada] flex items-center justify-center rounded-full h-12 w-12">
                <Dashboard className="text-white" />
              </div>
            </div>
            <div className="px-6">
              <h1>$18,345</h1>
              <div className="flex gap-1 pt-2">
                <p className="text-sm text-green-600">↑</p>
                <p className="text-sm text-muted-foreground">+15% from last month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Orders Section */}
      <section className="mt-6 mx-8 w-[1040px] pb-10">
        <div className="bg-white rounded-2xl border border-[#dbdada] px-4">
          <div className="py-6">
            <h1 className="font-neogrotesk-regular text-[#6d6363]">
              Recent Orders
            </h1>
          </div>

          {/* Header */}
          <div className="flex gap-4 font-neogrotesk-regular border-b pb-3 pl-2 border-[#dbdada] items-center text-xs">
            <p className="w-24 ml-8">Order ID</p>
            <p className="w-32 ml-18">Customer</p>
            <p className="w-24">Payment</p>
            <p className="w-24">Date</p>
            <p className="w-24">Total</p>
            <p className="w-28">Order Status</p>
            <p className="w-28">Payment Status</p>
          </div>

          {/* Orders */}
          {orders.slice(-10).map((item) => (
            <div
              key={item._id}
              className="flex items-center border-b pb-3 pt-2 text-xs border-[#dbdada]"
            >
              <p className="w-24 ml-2">{item._id}</p>
              <p className="w-32 ml-18">{item.userId.username}</p>
              <p className="w-24 ml-18">{item.paymentMethod}</p>
              <p className="w-24">
                {new Date(item.placedAt).toLocaleDateString()}
              </p>
              <p className="w-24 ml-6">${item.totalAmount}</p>
              <button
                className={`h-6 w-28 rounded-md text-xs font-medium ${getStatusColor(
                  item.orderStatus
                )}`}
              >
                {item.orderStatus}
              </button>
              <button className="h-6 w-28 ml-6 rounded-md bg-green-200 text-green-800 text-xs">
                {item.paymentStatus}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default DashboardAdmin;
