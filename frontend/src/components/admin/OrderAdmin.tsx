import axios from "axios";
import { useEffect, useState } from "react";
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

function OrderAdmin() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<string>("");
  const [search,setSearch] = useState("");

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
        withCredentials: true,
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update single order status
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}/status`,
        { orderStatus: newStatus },
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      toast.success("Order status updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status.");
    }
  };

  // Bulk update
  const handleBulkUpdate = async () => {
    if (selectedOrders.length === 0 || !bulkStatus) {
      toast.error("Select orders and status first!");
      return;
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/bulk-update`,
        { orderIds: selectedOrders, status: bulkStatus },
        { withCredentials: true }
      );
      toast.success(`${response.data.modifiedCount} orders updated!`);
      // Update locally
      setOrders((prev) =>
        prev.map((order) =>
          selectedOrders.includes(order._id)
            ? { ...order, orderStatus: bulkStatus }
            : order
        )
      );
      setSelectedOrders([]);
      setBulkStatus("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to bulk update orders.");
    }
  };

  // Format date
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // Map order status to button color
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

  // Toggle checkbox selection
  const toggleSelect = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const filterOrder = orders.filter((f)=>
    f.userId.username.toLowerCase().includes(search.toLowerCase()) ||
    f._id.toLowerCase().includes(search.toLowerCase()) ||
    f.placedAt.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="px-8 py-1">
      <div className="mt-10">
        <h1 className="text-xl font-neogrotesk-bold">Orders</h1>
        <h1 className="text-[#6b6b6b] font-neogrotesk-ultralight pt-2">
          View and manage all customer orders
        </h1>
        <div className="w-full mt-6 flex gap-4">
          <input
            className="bg-white px-6 h-10 w-full rounded-xl"
            type="text"
            placeholder="Search Orders..."
            onChange={(e)=>setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 px-2 py-1 bg-white rounded-md"
            value={bulkStatus}
            onChange={(e) => setBulkStatus(e.target.value)}
          >
            <option value="">Bulk Update Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>
          <button
            className="bg-black text-white  px-4 rounded-md"
            onClick={handleBulkUpdate}
          >
            <h1 className="">Update Selected</h1>
          </button>
        </div>
      </div>

      <section className="mt-6 pb-10">
        <div className="bg-white rounded-2xl border border-[#dbdada] px-10">
          <div className="py-6">
            <h1 className="font-neogrotesk-regular text-[#6d6363]">
              Recent Orders
            </h1>
          </div>

          <div className="flex gap-[50px] font-neogrotesk-regular border-b pb-3 pl-2 border-[#dbdada] items-center">
            <h1>Select</h1>
            <h1 className="ml-4">Order ID</h1>
            <h1 className="ml-22">Customer</h1>
            <h1 className="ml-10">Payment</h1>
            <h1 className="ml-6">Date</h1>
            <h1 className="ml-4">Total</h1>
            <h1 className="ml-10">Order Status</h1>
            <h1 className="ml-10">Payment Status</h1>
            <h1 className="ml-8">Actions</h1>
          </div>

          {filterOrder.map((item) => (
            <div
              key={item._id}
              className="flex items-center border-b pb-3 text-sm border-[#dbdada] pt-2"
            >
              <input
                type="checkbox"
                checked={selectedOrders.includes(item._id)}
                onChange={() => toggleSelect(item._id)}
                className="ml-2"
              />
              <h1 className="ml-12">{item._id}</h1>
              <h1 className="ml-12">{item.userId.username}</h1>
              <h1 className="ml-12">{item.paymentMethod}</h1>
              <h1 className="ml-20">{formatDate(item.placedAt)}</h1>
              <h1 className="ml-14">{item.totalAmount}</h1>

              <button
                className={`h-6 w-28 rounded-md ml-22 text-xs font-medium ${getStatusColor(
                  item.orderStatus
                )}`}
              >
                {item.orderStatus}
              </button>

              <button className="h-6 w-20 rounded-md bg-green-200 ml-26 text-green-800 text-xs">
                {item.paymentStatus}
              </button>

              <select
                onChange={(e) =>
                  handleUpdateStatus(item._id, e.target.value)
                }
                className="ml-20 border px-2 py-1 rounded-md"
                value={item.orderStatus}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default OrderAdmin;
