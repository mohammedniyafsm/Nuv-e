import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface OrderItem {
  productId: {
    _id: string;
    name: string;
    images: string[];
  };
  quantity: number;
  price: number;
  subtotal: number;
}

interface ShippingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type?: string;
}

interface OrderDetail {
  _id: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  items: OrderItem[];
  shippingAddress?: ShippingAddress;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  discountAmount: number;
  subtotal: number;
  totalAmount: number;
  placedAt: string;
  trackingId?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const handleshow = () => {
    console.log(order)
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
          { withCredentials: true }
        );

        const { orderDetail, shippingAddress } = res.data;

        // Merge shippingAddress into orderDetail
        const enrichedOrder = {
          ...orderDetail,
          shippingAddress: shippingAddress || null,
        };

        setOrder(enrichedOrder);
        console.log("Enriched Order:", enrichedOrder);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load order");
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (!order) {
    return <div className="text-center text-gray-500 mt-10">Order not found.</div>;
  }

  const addr = order.shippingAddress;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h2>

      {/* User Info */}
      <section className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">👤 User Information</h3>
        <div className="space-y-2 text-gray-600">
          <p><strong>Name:</strong> {order.userId.username}</p>
          <p><strong>Email:</strong> {order.userId.email}</p>
        </div>
      </section>

      <div onClick={handleshow} className="">
        csvsvvf
      </div>

      {/* Shipping Info */}
      <section className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">📦 Shipping Address</h3>
        {addr ? (
          <div className="space-y-1 text-gray-600">
            <p><strong>Type:</strong> {addr.type || "N/A"}</p>
            <p>{addr.addressLine1}</p>
            {addr.addressLine2 && <p>{addr.addressLine2}</p>}
            <p>
              {addr.city}, {addr.state.trim()} - {addr.postalCode}, {addr.country}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No shipping address available.</p>
        )}
      </section>

      {/* Order Info */}
      <section className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">🧾 Order Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Tracking ID:</strong> {order.trackingId || "N/A"}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p>
            <strong>Payment Status:</strong>{" "}
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-white text-sm ${order.paymentStatus === "Paid" ? "bg-green-500" : "bg-yellow-500"}`}>
              {order.paymentStatus}
            </span>
          </p>
          <p>
            <strong>Order Status:</strong>{" "}
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-100 text-blue-700 text-sm">
              {order.orderStatus}
            </span>
          </p>
          <p><strong>Placed At:</strong> {new Date(order.placedAt).toLocaleString()}</p>
          <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
        </div>
      </section>

      {/* Order Items */}
      <section className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">🛒 Items</h3>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.productId.images?.[0] || "/placeholder.jpg"}
                  alt={item.productId.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.productId.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-700 mt-2 sm:mt-0">₹{item.subtotal}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Total */}
      <section className="bg-gray-50 rounded-lg p-6 text-right text-gray-700">
        <p className="mb-1">Subtotal: ₹{order.subtotal}</p>
        <p className="mb-1">Discount: ₹{order.discountAmount}</p>
        <p className="text-xl font-bold">Total: ₹{order.totalAmount}</p>
      </section>
    </div>
  );
}
