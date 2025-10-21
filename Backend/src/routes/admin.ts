import express from "express";
import { adminProtect, protect, userProtect } from "../middleware/Auth";
import { addProduct, deleteProduct, getAdminProducts, getProductByIdAdmin, updateProduct } from "../controller/productController";
import { adminProfile, getAllUsers, getPresignedUrl, getUserById, loginAdmin, Logout, sendOtp, signupAdmin, updateUserStatus, verifyOtp } from "../controller/adminController";
import { bulkUpdateOrderStatus, deleteOrder, getAllOrders, getOrderByIdAdmin, updateOrderStatus } from "../controller/orderController";
import { createCoupon, deleteCoupon, getCoupons, updateCoupon } from "../controller/couponController";

const router = express.Router();

//  AUTH ROUTES (Admin)
router.post('/admin/signup', signupAdmin); // Register a new admin
router.post('/admin/login', loginAdmin); // Login admin
router.post('/admin/requestOtp', sendOtp); // Request OTP for admin login
router.post('/admin/verifyOtp', verifyOtp); // Verify OTP for admin login
router.get('/admin/profile', adminProtect, protect, adminProfile); // Get admin profile (protected)
router.get('/admin/logout', adminProtect, protect, Logout); // Logout

//  PRODUCT MANAGEMENT (Admin)
router.post('/admin/products', adminProtect, protect, addProduct); // Add new product
router.get('/admin/products', adminProtect, protect, getAdminProducts); // Get all products (admin view)
router.get('/admin/s3-presign', adminProtect, protect, getPresignedUrl); // Get S3 presigned URL for image upload
router.put('/admin/products/:id', adminProtect, protect, updateProduct); // Update product by ID
router.delete('/admin/products/:id', adminProtect, protect, deleteProduct); // Delete product by ID
router.get('/admin/products/:id', adminProtect, protect, getProductByIdAdmin); // Get product details by ID (admin view)

//  USER MANAGEMENT (Admin)
router.get('/admin/users', adminProtect, protect, getAllUsers); // Get all users
router.get('/admin/users/:id', adminProtect, protect, getUserById); // Get user details by ID
router.put('/admin/users/:id', adminProtect, protect, updateUserStatus); // Update user status (e.g., block/unblock)

//  ORDER MANAGEMENT (Admin)
router.get('/admin/orders', adminProtect, protect, getAllOrders); // Get all orders
router.put('/admin/orders/bulk-update', adminProtect, protect, bulkUpdateOrderStatus); // Bulk update order statuses
router.put('/admin/orders/:id/status', adminProtect, protect, updateOrderStatus); // Update status of a specific order
router.delete('/admin/orders/:id', adminProtect, protect, deleteOrder); // Delete an order
router.get('/admin/orders/:id', adminProtect, protect, getOrderByIdAdmin); // Get order details by ID

//  COUPON MANAGEMENT (Admin)
router.post("/admin/create", adminProtect, protect, createCoupon); // Create a new coupon
router.get("/admin/all", adminProtect, protect, getCoupons); // Get all coupons
router.delete("/admin/:couponId", adminProtect, protect, deleteCoupon); // Delete coupon by ID
router.put("/admin/:couponId", adminProtect, protect, updateCoupon); // Update coupon by ID

export default router;
