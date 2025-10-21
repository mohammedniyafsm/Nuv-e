import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { type AppDispatch, type RootState } from "../app/store";
import {
  Carts,
  updateCart,
  deleteCart,
  applyCouponAction,
  removeCouponAction,
  clearCartAction,
} from "../features/Cart/CartSlice";
import { FetchAddress, PostAddress, deleteAddresss, updatedAddress } from "../features/Address/Address";
import toast from "react-hot-toast";
import { placeOrder } from "../features/Order/Order";
import { createPaymentOrder, verifyPaymentOrder } from "../features/Order/OrderApi";
import { fetchUser } from "../features/User/UserSlice";


// Custom Icons
const LeftArrowScroll = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const RightArrowScroll = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Delete = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Edit = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

function CartCard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items,  subtotal, discountAmount, totalAmount, coupon, loading } = useSelector((state: RootState) => state.cart);
  const { _id ,username,email} = useSelector((state :RootState )=> state.user)
    
 
  const { address, loading: addressLoading } = useSelector((state: RootState) => state.address);

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<"COD" | "UPI" | "">("");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [addressForm, setAddressForm] = useState({
    _id: "",
    type: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    dispatch(Carts()).unwrap();
    dispatch(FetchAddress());
    dispatch(fetchUser())
  }, [dispatch]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const requiredFields = ["type", "addressLine1", "city", "state", "postalCode", "country"];
    requiredFields.forEach((field) => {
      if (!addressForm[field as keyof typeof addressForm]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code!");
      return;
    }
    try {
      await dispatch(applyCouponAction(couponCode)).unwrap();
      toast.success("Coupon applied successfully!");
      setCouponCode("");
      setCouponError("");
    } catch (error: any) {
      toast.error(error);
      setCouponError(error);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await dispatch(removeCouponAction()).unwrap();
      toast.success("Coupon removed successfully!");
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleAddressSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required address fields!");
      return;
    }
    try {
      if (isEditing) {
        await dispatch(updatedAddress({ id: addressForm._id, update: addressForm })).unwrap();
        toast.success("Address updated successfully!");
      } else {
        await dispatch(PostAddress({
          type: addressForm.type,
          addressLine1: addressForm.addressLine1,
          addressLine2: addressForm.addressLine2,
          city: addressForm.city,
          state: addressForm.state,
          postalCode: addressForm.postalCode,
          country: addressForm.country,
        })).unwrap();
        toast.success("Address added successfully!");
      }
      setIsAddressModalOpen(false);
      setAddressForm({
        _id: "",
        type: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
      setIsEditing(false);
      setFormErrors({});
    } catch (err) {
      toast.error(isEditing ? "Failed to update address." : "Failed to add address.");
    }
  };

  const handleEditAddress = (addr: any) => {
    setAddressForm(addr);
    setIsEditing(true);
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await dispatch(deleteAddresss(id)).unwrap();
      toast.success("Address deleted successfully!");
      if (selectedAddressId === id) setSelectedAddressId("");
    } catch (err) {
      toast.error("Failed to delete address.");
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a shipping address!");
      return;
    }
    if (!selectedPayment) {
      toast.error("Please select a payment method!");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    try {
      if(selectedPayment == "COD"){
        await dispatch(
          placeOrder({
            items,
            shippingAddressId: selectedAddressId,
            paymentMethod: selectedPayment,
            paymentStatus: selectedPayment === "COD" ? "Pending" : "Paid",
            discountAmount,
          })
        ).unwrap();
        await dispatch(clearCartAction())
        toast.success("Order placed successfully!");
        navigate("/account/orders");
      }else{
       handleRazorpayPayment();
      }
    } catch (err) {
      toast.error("Failed to place order.");
    }
  };

  const handleRazorpayPayment = async () => {
  try {
    const order = await createPaymentOrder(totalAmount);
    const options: any = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Nuvée",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response: any) => {
        const verification = await verifyPaymentOrder(response);
        if (verification.message === "Payment verified successfully") {
          toast.success("Payment Successful!");
          await dispatch(placeOrder({
            items,
            shippingAddressId: selectedAddressId,
            paymentMethod: "UPI",
            paymentStatus: "Paid",
            discountAmount,
          })).unwrap();
          await dispatch(clearCartAction());
          navigate("/account/orders");
        } else {
          toast.error("Payment verification failed!");
        }
      },
      prefill: {
        name: {username},
        email: {email},
        contact: {_id},
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    toast.error("Payment failed!");
  }
};


  if (loading) return (
    <div className="text-center mt-20 text-gray-600 text-lg animate-pulse">
      Loading cart...
    </div>
  );

  return (
    <div className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl bg-ivory-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <motion.div
          className="flex-1 lg:py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <motion.button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-teal-800 hover:text-teal-600 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LeftArrowScroll className="h-5 w-5" />
              <span className="text-lg font-medium">Continue Shopping</span>
            </motion.button>
          </div>

          <h1 className="text-3xl font-bold text-teal-900 mb-6">Your Cart</h1>

          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 max-h-[600px] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {items.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-gray-500 text-lg">Your cart is empty.</p>
                <motion.button
                  onClick={() => navigate("/")}
                  className="mt-4 bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </motion.button>
              </motion.div>
            ) : (
              <AnimatePresence>
                {items.map((item) => {
                  const product = item.productId as any;
                  return (
                    <motion.div
                      key={item._id}
                      className="flex items-center justify-between gap-6 p-4 border-b last:border-b-0 hover:bg-ivory-100 transition-colors duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={product?.image || "/images/product1.png"}
                          alt={product?.name || "Product"}
                          className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                          loading="lazy"
                        />
                        <div className="flex flex-col">
                          <h2 className="text-lg font-semibold text-teal-900">{product?.name}</h2>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <motion.button
                          className="h-8 w-8 flex items-center justify-center bg-ivory-200 rounded-full hover:bg-ivory-300 transition disabled:opacity-50"
                          disabled={item.quantity <= 1}
                          onClick={() => dispatch(updateCart({ itemId: item._id, quantity: item.quantity - 1 }))}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Decrease quantity"
                        >
                          <span className="text-lg">-</span>
                        </motion.button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <motion.button
                          className="h-8 w-8 flex items-center justify-center bg-ivory-200 rounded-full hover:bg-ivory-300 transition"
                          onClick={() => dispatch(updateCart({ itemId: item._id, quantity: item.quantity + 1 }))}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Increase quantity"
                        >
                          <span className="text-lg">+</span>
                        </motion.button>
                      </div>
                      <div className="text-lg font-semibold text-teal-900">
                        ${item.subtotal.toFixed(2)}
                      </div>
                      <motion.button
                        className="p-2 hover:bg-red-100 rounded-full transition"
                        onClick={() => dispatch(deleteCart(item._id))}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Remove item"
                      >
                        <Delete className="h-5 w-5 text-red-500" />
                      </motion.button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </motion.div>
        </motion.div>

        {/* Order Summary Section */}
        <motion.div
          className="lg:w-96 lg:h-min-[660px] mb-10 lg:sticky lg:top-4 bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-teal-900">Order Summary</h2>
            <motion.button
              className="lg:hidden text-gray-600 hover:text-gray-800 transition"
              onClick={() => setIsSummaryOpen(!isSummaryOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSummaryOpen ? "Collapse" : "Expand"}
            </motion.button>
          </div>

          <AnimatePresence>
            {isSummaryOpen || window.innerWidth >= 1024 ? (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Subtotal & Shipping */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Shipping</span>
                    <span className="text-teal-600">Free</span>
                  </div>
                </div>

                {/* Coupon Section */}
                {!coupon ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                      aria-label="Coupon code"
                    />
                    {couponError && (
                      <p className="text-red-500 text-sm">{couponError}</p>
                    )}
                    <motion.button
                      onClick={handleApplyCoupon}
                      className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply Coupon
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center bg-teal-50 p-3 rounded-lg">
                    <span className="text-sm font-medium">
                      Coupon <strong>{coupon.code}</strong> applied
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-teal-700">
                        -${discountAmount?.toFixed(2)}
                      </span>
                      <motion.button
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                        onClick={handleRemoveCoupon}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Remove
                      </motion.button>
                    </div>
                  </div>
                )}

                <hr className="border-gray-200" />

                {/* Address Selection */}
                {!selectedAddressId ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-teal-900">Shipping Address</h3>
                      <motion.button
                        onClick={() => {
                          setAddressForm({
                            _id: "",
                            type: "",
                            addressLine1: "",
                            addressLine2: "",
                            city: "",
                            state: "",
                            postalCode: "",
                            country: "",
                          });
                          setIsEditing(false);
                          setIsAddressModalOpen(true);
                        }}
                        className="text-sm text-teal-600 hover:underline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add New Address
                      </motion.button>
                    </div>
                    {addressLoading ? (
                      <p className="text-gray-500">Loading addresses...</p>
                    ) : address.length === 0 ? (
                      <p className="text-gray-500">No saved addresses. Add one below.</p>
                    ) : (
                      <div className="max-h-64 overflow-y-auto space-y-3">
                        <AnimatePresence>
                          {address.map((addr: any) => (
                            <motion.div
                              key={addr._id}
                              className={`p-4 rounded-lg border cursor-pointer transition flex justify-between items-center ${selectedAddressId === addr._id
                                ? "border-teal-500 bg-teal-50"
                                : "border-gray-200 hover:border-teal-500 hover:bg-teal-50"
                                }`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div onClick={() => setSelectedAddressId(addr._id)}>
                                <p className="font-medium text-teal-900">{addr.type}</p>
                                <p className="text-sm text-gray-600">
                                  {addr.addressLine1}
                                  {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}, {addr.city}, {addr.state} - {addr.postalCode}, {addr.country}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <motion.button
                                  onClick={() => handleEditAddress(addr)}
                                  className="p-2 hover:bg-gray-100 rounded-full transition"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  aria-label={`Edit address ${addr.type}`}
                                >
                                  <Edit className="h-5 w-5 text-gray-600" />
                                </motion.button>
                                <motion.button
                                  onClick={() => handleDeleteAddress(addr._id)}
                                  className="p-2 hover:bg-red-100 rounded-full transition"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  aria-label={`Delete address ${addr.type}`}
                                >
                                  <Delete className="h-5 w-5 text-red-500" />
                                </motion.button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <motion.div
                      className="p-4 rounded-lg border border-gray-200 bg-ivory-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {address
                        .filter((addr: any) => addr._id === selectedAddressId)
                        .map((addr: any) => (
                          <div key={addr._id}>
                            <p className="font-medium text-teal-900">{addr.type}</p>
                            <p className="text-sm text-gray-600">
                              {addr.addressLine1}
                              {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}, {addr.city}, {addr.state} - {addr.postalCode}, {addr.country}
                            </p>
                          </div>
                        ))}
                    </motion.div>

                    {/* Payment Options */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-teal-900">Payment Method</h3>
                      <div className="flex gap-3">
                        <motion.button
                          onClick={() => setSelectedPayment("COD")}
                          className={`flex-1 p-3 rounded-lg border text-sm font-medium transition ${selectedPayment === "COD"
                            ? "bg-teal-50 border-teal-500 text-teal-700"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-ivory-100"
                            }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Select Cash on Delivery"
                        >
                          Cash on Delivery
                        </motion.button>
                        <motion.button
                          onClick={() => setSelectedPayment("UPI")}
                          className={`flex-1 p-3 rounded-lg border text-sm font-medium transition ${selectedPayment === "UPI"
                            ? "bg-teal-50 border-teal-500 text-teal-700"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-ivory-100"
                            }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Select UPI/Online Payment"
                        >
                          UPI / Online
                        </motion.button>
                      </div>
                      <motion.button
                        onClick={() => {
                          setSelectedAddressId("");
                          setSelectedPayment("");
                        }}
                        className="text-sm text-teal-600 hover:underline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Change Address or Payment
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between text-lg font-bold text-teal-900">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-700 transition font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                  <RightArrowScroll className="h-5 w-5" />
                </motion.button>

                <p className="text-center text-gray-500 text-sm mt-3">
                  Secure checkout powered by <span className="font-semibold text-teal-600">Stripe</span>
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Address Modal */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md sm:max-w-2xl mx-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-teal-900 mb-4">
                {isEditing ? "Edit Address" : "Add New Address"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-teal-900">Address Type</label>
                  <select
                    value={addressForm.type}
                    onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value })}
                    className={`w-full p-2.5 rounded-lg border ${formErrors.type ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm mt-1`}
                    aria-label="Address type"
                  >
                    <option value="">Select Type</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.type && <p className="text-red-500 text-xs mt-1">{formErrors.type}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-teal-900">Address Line 1</label>
                  <input
                    type="text"
                    placeholder="Street, House no."
                    value={addressForm.addressLine1}
                    onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                    className={`w-full p-2.5 rounded-lg border ${formErrors.addressLine1 ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm mt-1`}
                    aria-label="Address Line 1"
                  />
                  {formErrors.addressLine1 && <p className="text-red-500 text-xs mt-1">{formErrors.addressLine1}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-teal-900">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    placeholder="Area, Landmark"
                    value={addressForm.addressLine2}
                    onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm mt-1"
                    aria-label="Address Line 2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-teal-900">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className={`w-full p-2.5 rounded-lg border ${formErrors.city ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm mt-1`}
                    aria-label="City"
                  />
                  {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-teal-900">State</label>
                  <input
                    type="text"
                    placeholder="State"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className={`w-full p-2.5 rounded-lg border ${formErrors.state ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm mt-1`}
                    aria-label="State"
                  />
                  {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-teal-900">Postal Code</label>
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    className={`w-full p-2.5 rounded-lg border ${formErrors.postalCode ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm mt-1`}
                    aria-label="Postal Code"
                  />
                  {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-teal-900">Country</label>
                  <input
                    type="text"
                    placeholder="Country"
                    value={addressForm.country}
                    onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                    className={`w-full p-2.5 rounded-lg border ${formErrors.country ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm mt-1`}
                    aria-label="Country"
                  />
                  {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <motion.button
                  onClick={() => {
                    setIsAddressModalOpen(false);
                    setIsEditing(false);
                    setAddressForm({
                      _id: "",
                      type: "",
                      addressLine1: "",
                      addressLine2: "",
                      city: "",
                      state: "",
                      postalCode: "",
                      country: "",
                    });
                    setFormErrors({});
                  }}
                  className="px-4 py-2 text-gray-600 rounded-lg hover:bg-ivory-200 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Cancel address form"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleAddressSubmit}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isEditing ? "Save edited address" : "Save new address"}
                >
                  {isEditing ? "Update Address" : "Save Address"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CartCard;