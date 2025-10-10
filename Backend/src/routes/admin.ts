import express from "express";
import { adminProtect, protect, userProtect } from "../middleware/Auth";
import { addProduct, deleteProduct, getAdminProducts, getProductByIdAdmin, updateProduct } from "../controller/productController";
import { adminProfile, getAllUsers, getPresignedUrl, getUserById, loginAdmin, sendOtp, signupAdmin, updateUserStatus, verifyOtp } from "../controller/adminController";
import { bulkUpdateOrderStatus, deleteOrder, getAllOrders, getOrderByIdAdmin, updateOrderStatus } from "../controller/orderController";
import { createCoupon, deleteCoupon, getCoupons } from "../controller/couponController";

const router = express.Router();

//admin 
router.post('/admin/signup', signupAdmin );
router.post('/admin/login', loginAdmin );
router.post('/admin/requestOtp',sendOtp);
router.post('/admin/verifyOtp',verifyOtp);
router.get('/admin/profile',adminProtect,protect,adminProfile);

//admin Product
router.post('/admin/products',adminProtect,protect,addProduct);
router.get('/admin/products',adminProtect,protect,getAdminProducts);
router.get('/admin/s3-presign',adminProtect,protect,getPresignedUrl);
router.put('/admin/products/:id',adminProtect,protect,updateProduct);
router.delete('/admin/products/:id',adminProtect,protect,deleteProduct);
router.get('/admin/products/:id',adminProtect,protect,getProductByIdAdmin);

//admin users controller
router.get('/admin/users',adminProtect,protect,getAllUsers);
router.get('/admin/users/:id',adminProtect,protect,getUserById);
router.put('/admin/users/:id',adminProtect,protect,updateUserStatus);

//admin orders
router.get('/admin/orders',adminProtect,protect,getAllOrders);
router.put('/admin/orders/bulk-update',adminProtect,protect,bulkUpdateOrderStatus)
router.put('/admin/orders/:id/status',adminProtect,protect,updateOrderStatus);
router.delete('/admin/orders/:id',adminProtect,protect,deleteOrder);
router.get('/admin/orders/:id',adminProtect,protect,getOrderByIdAdmin);
// router.get('/admin/dashboard',adminProtect,protect,getAdminDashboard);


// Admin routes
router.post("/admin/create", adminProtect,protect, createCoupon);
router.get("/admin/all", adminProtect,protect, getCoupons);
router.delete("/admin/:couponId", adminProtect,protect, deleteCoupon);

export default router;