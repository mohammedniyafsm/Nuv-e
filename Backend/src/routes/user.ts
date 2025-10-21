import express from "express";
import { userProtect } from "../middleware/Auth";
import { changeForgotPassword, forgotPassword, getUserProfile, Logged, loginUser, logoutUser, resendOtp, sendOtp, signupUser, updatePassword, updateUserProfile, verifyForgotPasswordOtp, verifyOtp } from "../controller/userController";
import { filterProducts, getAllProducts, getPaginatedProducts, getProductById, searchProducts } from "../controller/productController";
import { addAddress, deleteAddress, getAddresses, updateAddress } from "../controller/addressController";
import { addItemToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controller/cartController";
import { addToWishlist, getWishlist, moveWishlistToCart, removeFromWishlist } from "../controller/wishlistController";
import { cancelOrder, createPayementOrder, getOrderById, getUserOrders, placeOrder, returnOrder, verifyPaymentOrder } from "../controller/orderController";
import { applyCoupon, removeCoupon } from "../controller/couponController";

const router = express.Router();

//  AUTH ROUTES
router.post('/auth/signup', signupUser); // Register a new user
router.post('/auth/login', loginUser); // Login existing user
router.post('/auth/otp/send', userProtect, sendOtp); // Send OTP for verification (protected)
router.post('/auth/otp/verify', userProtect, verifyOtp); // Verify OTP (protected)
router.post('/auth/otp/resend', userProtect, resendOtp); // Resend OTP (protected)
router.post('/auth/password', userProtect, updatePassword); // Update password (logged-in user)
router.post('/auth/forgot-password', forgotPassword); // Initiate forgot password flow
router.post('/auth/verify-forgot-password', verifyForgotPasswordOtp); // Verify OTP for forgot password
router.post("/change-forgot-password", changeForgotPassword); // Change password after OTP verification
router.post('/auth/logout', userProtect, logoutUser); // Logout user (invalidate session/token)

//  USER PROFILE ROUTES
router.get('/user/profile', userProtect, getUserProfile); // Get logged-in user's profile
router.put('/user/profile', userProtect, updateUserProfile); // Update profile info
router.get("/logged", Logged); // Check if user is logged in (session status)

//  ADDRESS ROUTES
router.get('/user/address', userProtect, getAddresses); // Get all saved addresses
router.post('/user/address', userProtect, addAddress); // Add a new address
router.put('/user/address/:id', userProtect, updateAddress); // Update address by ID
router.delete('/user/address/:id', userProtect, deleteAddress); // Delete address by ID

// PRODUCT ROUTES (Public)
router.get('/user/products', getAllProducts); // Get all products
router.get('/user/products/search', searchProducts); // Search products by keyword
router.get('/user/products/filter', filterProducts); // Filter products by category, price, etc.
router.get('/user/products/products', getPaginatedProducts); // Get paginated product list
router.get('/user/products/:id', getProductById); // Get product details by ID

//  CART ROUTES
router.get('/cart', userProtect, getCart); // Get user's cart items
router.post('/cart', userProtect, addItemToCart); // Add item to cart
router.put('/cart/:itemId', userProtect, updateCartItem); // Update quantity or details of a cart item
router.delete('/cart/:itemId', userProtect, removeCartItem); // Remove item from cart
router.delete('/cart/', userProtect, clearCart); // Clear entire cart

//  WISHLIST ROUTES
router.get('/wishlist', userProtect, getWishlist); // Get wishlist items
router.post('/wishlist', userProtect, addToWishlist); // Add product to wishlist
router.delete('/wishlist/:productId', userProtect, removeFromWishlist); // Remove product from wishlist
router.post('/wishlist/:productId/move-to-cart', userProtect, moveWishlistToCart); // Move wishlist item to cart

//  ORDER ROUTES
router.get('/orders', userProtect, getUserOrders); // Get all orders of logged-in user
router.post('/create-order', userProtect, createPayementOrder); // Create payment order (e.g., Razorpay)
router.post('/verify-payment', userProtect, verifyPaymentOrder); // Verify payment after checkout
router.post('/orders', userProtect, placeOrder); // Place an order after payment
router.get('/orders/:id', userProtect, getOrderById); // Get order details by ID
router.put('/orders/:id/cancel', userProtect, cancelOrder); // Cancel an order
router.put('/orders/:id/return', userProtect, returnOrder); // Return an order

//  COUPON ROUTES
router.post("/apply", userProtect, applyCoupon); // Apply a coupon to cart/order
router.delete("/remove", userProtect, removeCoupon); // Remove applied coupon

export default router;
