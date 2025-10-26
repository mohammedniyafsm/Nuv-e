import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, cancelOrder, returnOrder } from "../../features/Order/Order";
import type { AppDispatch, RootState } from "../../app/store";
import type { ProductInfo } from "../../features/Order/OrderApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Status badge color mapping
const statusColors: { [key: string]: string } = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-indigo-100 text-indigo-700",
  Shipped: "bg-teal-100 text-teal-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
  Returned: "bg-gray-100 text-gray-700",
};

// Helper to safely get product info
const getProductInfo = (product: string | ProductInfo | null | undefined) => {
  if (!product || typeof product === "string") {
    return { name: "Product", images: [{ url: "/images/placeholder.jpg" }] };
  }

  // Ensure images is always an array with at least one object
  const imagesArray = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [{ url: "/images/placeholder.jpg" }];

  return {
    ...product,
    images: imagesArray,
  };
};

function Order() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Handle Cancel Order
  const handleCancelOrder = (orderId: string | undefined) => {
    if (!orderId) return;
    dispatch(cancelOrder(orderId))
      .unwrap()
      .then(() => {
        toast.success("Order canceled successfully!", { position: "top-right", autoClose: 3000 });
        dispatch(fetchOrders());
      })
      .catch((err: any) => {
        toast.error(`Failed to cancel order: ${err.message || "Unknown error"}`, { position: "top-right", autoClose: 5000 });
      });
  };

  // Handle Return Order
  const handleReturnOrder = (orderId: string | undefined) => {
    if (!orderId) return;
    dispatch(returnOrder(orderId))
      .unwrap()
      .then(() => {
        toast.success("Order returned successfully!", { position: "top-right", autoClose: 3000 });
        dispatch(fetchOrders());
      })
      .catch((err: any) => {
        toast.error(`Failed to return order: ${err.message || "Unknown error"}`, { position: "top-right", autoClose: 5000 });
      });
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-gray-50">
      <ToastContainer />

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Your Order History</h1>
        <p className="mt-2 text-base sm:text-lg text-gray-500">Track and review all your past orders</p>
      </header>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
          <p className="text-gray-500 text-lg font-medium">Loading orders...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
          <p className="text-rose-500 text-lg font-medium">Error: {error}</p>
        </div>
      )}

      {/* No Orders */}
      {!loading && !error && orders.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
          <p className="text-gray-500 text-lg font-medium">No orders found.</p>
          <p className="text-gray-400 text-sm mt-2">Start shopping to see your orders here!</p>
        </div>
      )}

      {/* Orders List */}
      {!loading && !error && orders.length > 0 &&
        orders.map((order) => {
          const firstItem = order.items[0];
          const firstProduct = getProductInfo(firstItem?.productId);

          return (
            <div
              key={order._id || Math.random()}
              className="bg-white w-full rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8 mb-8 hover:shadow-lg transition-shadow duration-300"
              role="region"
              aria-labelledby={`order-${order._id}`}
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-gray-200 pb-4">
                <div className="flex gap-4 items-center">
                  <img
                    className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                    src={firstProduct.images[0]?.url || "/images/placeholder.jpg"}
                    alt={firstProduct.name || "Product"}
                    loading="lazy"
                  />
                  <div>
                    <h2 id={`order-${order._id}`} className="text-base sm:text-lg font-semibold text-gray-900">
                      Order #{order._id?.slice(-8) || "N/A"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Placed on {order.placedAt ? new Date(order.placedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusColors[order.orderStatus || ""] || "bg-gray-100 text-gray-700"} hover:opacity-80 transition-opacity duration-200`}>
                    {order.orderStatus || "Unknown"}
                  </div>
                  {["Pending", "Processing"].includes(order.orderStatus || "") && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="px-4 py-1.5 rounded-full text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      disabled={loading}
                      aria-label={`Cancel order ${order._id}`}
                    >
                      Cancel Order
                    </button>
                  )}
                  {order.orderStatus === "Delivered" && (
                    <button
                      onClick={() => handleReturnOrder(order._id)}
                      className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      disabled={loading}
                      aria-label={`Return order ${order._id}`}
                    >
                      Return Order
                    </button>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-6 space-y-6">
                {order.items.map((item, index) => {
                  const product = getProductInfo(item.productId);
                  return (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          className="h-12 w-12 sm:h-14 sm:w-14 rounded-md object-cover border border-gray-200"
                          src={product.images[0]?.url || "/images/placeholder.jpg"}
                          alt={product.name || "Product"}
                          loading="lazy"
                        />
                        <div>
                          <h3 className="text-base font-medium text-gray-900">{product.name || "Product"}</h3>
                          <p className="text-sm text-gray-500">
                            {item.quantity} × ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="text-base font-semibold text-gray-900">
                        ₹{item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div className="space-y-2">
                    <p className="text-base font-medium text-gray-900">Subtotal</p>
                    {order.discountAmount ? (
                      <p className="text-sm text-emerald-600">
                        Discount {order.discountAmount > 0 ? `(-₹${order.discountAmount.toFixed(2)})` : "N/A"}
                      </p>
                    ) : null}
                    <p className="text-base font-medium text-gray-900">Total</p>
                  </div>
                  <div className="space-y-2 text-right">
                    <p className="text-base font-semibold text-gray-900">₹{(order.subtotal || 0).toFixed(2)}</p>
                    {order.discountAmount ? (
                      <p className="text-sm text-emerald-600">{order.discountAmount > 0 ? `-₹${order.discountAmount.toFixed(2)}` : "N/A"}</p>
                    ) : null}
                    <p className="text-lg font-bold text-indigo-700">₹{(order.totalAmount || 0).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }
    </section>
  );
}

export default Order;
