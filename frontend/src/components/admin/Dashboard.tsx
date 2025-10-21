import { useEffect, useState } from "react";
import Box from "../icons/Box";
import Cart from "../icons/Cart";
import Dashboard from "../icons/Dashboard";
import Users from "../icons/Users";
import axios from "axios";
import toast from "react-hot-toast";

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

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        { withCredentials: true }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Processing":
        return "bg-blue-200 text-blue-800";
      case "Shipped":
        return "bg-purple-200 text-purple-800";
      case "Out for Delivery":
        return "bg-orange-200 text-orange-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      case "Returned":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <>
      {/* Overview Section */}
      <section className="px-4 md:px-8 py-1 w-full overflow-hidden">
        <div className="mt-10">
          <h1 className="text-xl font-neogrotesk-bold">Overview</h1>
          <h1 className="text-[#6b6b6b] font-neogrotesk-ultralight pt-2 text-sm sm:text-base">
            Welcome back to your admin dashboard
          </h1>
        </div>

        {/* Overview Cards */}
        <div className="pt-8 flex flex-wrap justify-start gap-6">
          {/* Card Template */}
          {[
            {
              title: "Total Products",
              value: "24",
              change: "+3 this month",
              icon: <Box className="text-white" />,
            },
            {
              title: "Total Orders",
              value: "156",
              change: "+12 this week",
              icon: <Cart className="text-white h-6 w-6" />,
            },
            {
              title: "Total Users",
              value: "89",
              change: "+8 new users",
              icon: <Users className="text-white h-6 w-6" />,
            },
            {
              title: "Total Revenue",
              value: "$18,345",
              change: "+15% from last month",
              icon: <Dashboard className="text-white" />,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="h-42  w-full sm:w-60 bg-white rounded-2xl border border-[#dbdada]"
            >
              <div className="px-6 pt-8 flex justify-between items-center">
                <h1 className="text-[#887e7e] font-neogrotesk-regular text-sm">
                  {card.title}
                </h1>
                <div className="bg-[#dbdada] flex items-center justify-center rounded-full h-12 w-12">
                  {card.icon}
                </div>
              </div>
              <div className="px-6 pb-4">
                <h1 className="text-lg sm:text-xl font-semibold">
                  {card.value}
                </h1>
                <div className="flex gap-1 pt-2">
                  <p className="text-sm text-green-600">↑</p>
                  <p className="text-sm text-muted-foreground">{card.change}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Orders Section */}
      <section className="mt-6 mx-4 md:mx-8 w-full pb-10">
        <div className="bg-white rounded-2xl border border-[#dbdada] overflow-hidden">
          <div className="py-6 px-4">
            <h1 className="font-neogrotesk-regular text-[#6d6363]">
              Recent Orders
            </h1>
          </div>

          {/* Responsive scroll container */}
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="min-w-[700px] px-4 pb-4">
              {/* Header */}
              <div className="flex gap-4 font-neogrotesk-regular border-b pb-3 border-[#dbdada] items-center text-xs">
                <p className="w-24 ml-2">Order ID</p>
                <p className="w-32 ml-2">Customer</p>
                <p className="w-24 ml-2">Payment</p>
                <p className="w-24 ml-2">Date</p>
                <p className="w-24 ml-2">Total</p>
                <p className="w-28 ml-2">Order Status</p>
                <p className="w-28 ml-2">Payment Status</p>
              </div>

              {/* Orders */}
              {orders.slice(-10).map((item) => (
                <div
                  key={item._id}
                  className="flex items-center border-b pb-3 pt-2 text-xs border-[#dbdada]"
                >
                  <p className="w-24 ml-2 truncate">{item._id}</p>
                  <p className="w-32 ml-2 truncate">{item.userId.username}</p>
                  <p className="w-24 ml-2 lg:ml-12 truncate">{item.paymentMethod}</p>
                  <p className="w-24 ml-2">
                    {new Date(item.placedAt).toLocaleDateString()}
                  </p>
                  <p className="w-24 ml-2 lg:ml-8">${item.totalAmount}</p>
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
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardAdmin;
