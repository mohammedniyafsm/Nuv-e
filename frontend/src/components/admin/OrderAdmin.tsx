import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IUser {
  _id: string;
  username: string;
  // add email if you have it on the backend
  email?: string;
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
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  // ────── FETCH ORDERS ──────
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        { withCredentials: true }
      );
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ────── SINGLE UPDATE ──────
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}/status`,
        { orderStatus: newStatus },
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, orderStatus: newStatus } : o
        )
      );
      toast.success("Status updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  // ────── BULK UPDATE ──────
  const handleBulkUpdate = async () => {
    if (!selectedOrders.length || !bulkStatus) {
      toast.error("Select orders & status first");
      return;
    }
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/bulk-update`,
        { orderIds: selectedOrders, status: bulkStatus },
        { withCredentials: true }
      );
      toast.success(`${data.modifiedCount} orders updated`);
      setOrders((prev) =>
        prev.map((o) =>
          selectedOrders.includes(o._id)
            ? { ...o, orderStatus: bulkStatus }
            : o
        )
      );
      setSelectedOrders([]);
      setBulkStatus("");
    } catch (err) {
      console.error(err);
      toast.error("Bulk update failed");
    }
  };

  // ────── HELPERS ──────
  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getStatusColor = (s: string) => {
    const map: Record<string, string> = {
      Pending: "bg-yellow-200 text-yellow-800",
      Processing: "bg-blue-200 text-blue-800",
      Shipped: "bg-purple-200 text-purple-800",
      "Out for Delivery": "bg-orange-200 text-orange-800",
      Delivered: "bg-green-200 text-green-800",
      Cancelled: "bg-red-200 text-red-800",
      Returned: "bg-gray-200 text-gray-800",
    };
    return map[s] || "bg-gray-200 text-gray-800";
  };

  const toggleSelect = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // ────── FILTER ──────
  const filtered = orders.filter(
    (o) =>
      o.userId.username.toLowerCase().includes(search.toLowerCase()) ||
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.placedAt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="px-4 py-6 md:px-8">
      {/* ── PAGE TITLE ── */}
      <header className="mb-8">
        <h1 className="text-2xl font-neogrotesk-bold">Orders</h1>
        <p className="text-[#6b6b6b] font-neogrotesk-ultralight">
          View and manage all customer orders
        </p>
      </header>

      {/* ── SEARCH + BULK ── */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full xl:w-[75%] rounded-xl bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <select
          value={bulkStatus}
          onChange={(e) => setBulkStatus(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">Bulk Update Status</option>
          {[
            "Pending",
            "Processing",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
            "Returned",
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={handleBulkUpdate}
          className="rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-800"
        >
          Update Selected
        </button>
      </div>

      {/* ── TABLE ── */}
      <div className="overflow-x-auto rounded-2xl border border-[#dbdada] bg-white">
        {/* Sticky Header */}
        <div className="sticky top-0 grid grid-cols-[min-content_140px_160px_110px_110px_90px_130px_110px_130px] gap-2 bg-white px-4 py-3 text-sm font-neogrotesk-semibold text-[#6d6363] border-b border-[#dbdada]">
          <div className="flex items-center">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedOrders(filtered.map((o) => o._id));
                } else {
                  setSelectedOrders([]);
                }
              }}
              checked={
                filtered.length > 0 &&
                filtered.every((o) => selectedOrders.includes(o._id))
              }
              className="rounded"
            />
          </div>
          <div>Order ID</div>
          <div>Customer</div>
          <div>Payment</div>
          <div>Date</div>
          <div>Total</div>
          <div>Order Status</div>
          <div>Payment Status</div>
          <div>Actions</div>
        </div>

        {/* Rows */}
        {filtered.map((order) => (
          <div 
            key={order._id}
            className="grid grid-cols-[min-content_140px_160px_110px_110px_90px_130px_110px_130px_130px] gap-2 border-b border-[#dbdada] px-4 py-3 text-sm"
          >
            {/* Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedOrders.includes(order._id)}
                onChange={() => toggleSelect(order._id)}
                className="rounded"
              />
            </div>

            {/* Order ID */}
            <div className="truncate font-mono text-xs">{order._id}</div>

            {/* Customer – name + email */}
            <div className="flex flex-col">
              <span className="font-medium">{order.userId.username}</span>
              {order.userId.email && (
                <span className="text-xs text-[#9c9c9c]">
                  {order.userId.email}
                </span>
              )}
            </div>

            {/* Payment Method */}
            <div className="capitalize">{order.paymentMethod}</div>

            {/* Date */}
            <div className="text-xs">{formatDate(order.placedAt)}</div>

            {/* Total */}
            <div>₹{order.totalAmount.toFixed(2)}</div>

            {/* Order Status Badge */}
            <div>
              <span
                className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Payment Status Badge */}
            <div>
              <span className="inline-block rounded-md bg-green-200 px-2 py-1 text-xs font-medium text-green-800">
                {order.paymentStatus}
              </span>
            </div>

            {/* Action Select */}
            <div className="flex  gap-2">
              <select
                value={order.orderStatus}
                onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                className="w-full rounded border px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-black"
              >
                {[
                  "Pending",
                  "Processing",
                  "Shipped",
                  "Out for Delivery",
                  "Delivered",
                  "Cancelled",
                  "Returned",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            <div onClick={()=>navigate(`/admin/orders/${order._id}`)} className="bg-black text-amber-50 w-20 h-10 flex justify-center items-center rounded-xl"> View</div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="mt-6 text-center text-gray-500">
          {search ? "No orders match your search." : "No orders found."}
        </p>
      )}
    </section>
  );
}

export default OrderAdmin;