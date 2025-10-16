import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LeftArrowScroll from "./icons/LeftArrowScroll";
import RightArrowScroll from "./icons/RightArrowScroll";
import Delete from "./icons/Delete";

import type { AppDispatch, RootState } from "../app/store";
import { Carts, updateCart, deleteCart, applyCouponAction, removeCouponAction } from "../features/Cart/CartSlice";
import toast from "react-hot-toast";

function CartCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalAmount, subtotal, discountAmount, coupon, loading } = useSelector(
    (state: RootState) => state.cart
  );

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(Carts())
      .unwrap()
      .catch(() => navigate("/login"));
  }, [dispatch, navigate]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      await dispatch(applyCouponAction(couponCode)).unwrap()
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

  if (loading) return <div className="text-center mt-10">Loading cart...</div>;

  return (
    <div className="mt-22 flex flex-col lg:flex-row gap-12 lg:gap-36 px-4 lg:px-20">
      {/* Cart Items */}
      <div className="flex-1 mt-16">
        <div onClick={()=>navigate('/')} className="flex items-center gap-3 mb-6 cursor-pointer hover:text-green-600 transition-colors">
          <LeftArrowScroll className="h-5 w-5" />
          <h1 className="font-neogroteskessalt-light text-lg">Continue Shopping</h1>
        </div>

        <h1 className="text-2xl font-neogrotesk-bold mb-6">Shopping Cart</h1>

        {items.length === 0 ? (
          <p className="text-gray-500 mt-10 text-center">Your cart is empty.</p>
        ) : (
          items.map((item) => {
            const product = item.productId as any;
            return (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 bg-white rounded-2xl shadow-sm mb-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={product?.image || "/images/1i.png"}
                    alt={product?.name || "Product"}
                    className="h-24 w-24 rounded-xl object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[#2E2E2E] font-medium">{product?.name}</h1>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    className="h-8 w-8 flex justify-center items-center bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    onClick={() =>
                      item.quantity > 1 &&
                      dispatch(updateCart({ itemId: item._id, quantity: item.quantity - 1 }))
                    }
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    className="h-8 w-8 flex justify-center items-center bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    onClick={() =>
                      dispatch(updateCart({ itemId: item._id, quantity: item.quantity + 1 }))
                    }
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-lg font-semibold">${item.subtotal.toFixed(2)}</div>

                {/* Delete */}
                <button
                  className="p-2 hover:bg-red-100 rounded-full transition"
                  onClick={() => dispatch(deleteCart(item._id))}
                >
                  <Delete className="h-5 w-5 text-red-500" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-[400px] bg-gray-100 rounded-3xl p-8 flex flex-col mt-1 gap-6 shadow-md">
        <h1 className="text-2xl font-neogroteskessalt-light">Order Summary</h1>

        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>${subtotal?.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        {/* Coupon Input */}
        {!coupon ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="p-2 rounded-xl border border-gray-300 focus:outline-none"
            />
            {couponError && <span className="text-red-500 text-sm">{couponError}</span>}
            <button
              onClick={handleApplyCoupon}
              className="bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
            >
              Apply Coupon
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center bg-green-100 p-3 rounded-xl">
            <span>
              Coupon <strong>{coupon.code}</strong> applied
            </span>
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-green-700">-${discountAmount?.toFixed(2)}</span>
              <button
                className="text-red-500 font-bold hover:text-red-700"
                onClick={handleRemoveCoupon}
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <hr className="border-gray-300" />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <button className="mt-4 w-full bg-black text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition">
          PROCEED TO CHECKOUT
          <div className="bg-white rounded-full h-8 w-8 flex justify-center items-center">
            <RightArrowScroll className="h-4 w-4 text-black" />
          </div>
        </button>

        <p className="text-center text-gray-500 text-sm mt-2">
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  );
}

export default CartCard;
