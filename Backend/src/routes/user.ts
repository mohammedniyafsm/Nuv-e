import express from "express";
import { userProtect } from "../middleware/Auth";
import { forgotPassword, getUserProfile, loginUser, logoutUser, resendOtp, sendOtp, signupUser, updatePassword, updateUserProfile, verifyOtp } from "../controller/userController";
import { filterProducts, getAllProducts, getPaginatedProducts, getProductById, searchProducts } from "../controller/productController";
import { addAddress, deleteAddress, getAddresses, updateAddress } from "../controller/addressController";
import { addItemToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controller/cartController";
import { addToWishlist, getWishlist, moveWishlistToCart, removeFromWishlist } from "../controller/wishlistController";
import { cancelOrder, getOrderById, getUserOrders, placeOrder, returnOrder } from "../controller/orderController";
import { applyCoupon, removeCoupon } from "../controller/couponController";

const router = express.Router();

router.post('/auth/signup', signupUser);
router.post('/auth/login', loginUser);
router.post('/auth/otp/send',userProtect,sendOtp);
router.post('/auth/otp/verify',userProtect,verifyOtp);
router.post('/auth/otp/resend',userProtect,resendOtp);
router.post('/auth/password',userProtect,updatePassword);
router.post('/auth/forgot-password',forgotPassword);
router.post('/auth/logout', userProtect, logoutUser);

router.get('/user/profile',userProtect,getUserProfile);
router.put('/user/profile',userProtect,updateUserProfile);

router.get('/user/address',userProtect,getAddresses);
router.post('/user/address',userProtect,addAddress);
router.put('/user/address/:id',userProtect,updateAddress);
router.delete('/user/address/:id',userProtect,deleteAddress);


//Public Api -->
router.get('/user/products',getAllProducts);
router.get('/user/products/search',searchProducts);
router.get('/user/products/filter',filterProducts);
router.get('/user/products/products',getPaginatedProducts);
router.get('/user/products/:id',getProductById);


//cart 
router.get('/cart',userProtect,getCart);
router.post('/cart',userProtect,addItemToCart);
router.put('/cart/:itemId',userProtect,updateCartItem)
router.delete('/cart/:itemId',userProtect,removeCartItem);
router.delete('/cart/',userProtect,clearCart)

//wishlist 
router.get('/wishlist',userProtect,getWishlist);
router.post('/wishlist',userProtect,addToWishlist );
router.delete('/wishlist/:productId',userProtect,removeFromWishlist );
router.post('/wishlist/:productId/move-to-cart',userProtect,moveWishlistToCart );

//order 
router.get('/orders',userProtect,getUserOrders);
router.post('/orders',userProtect,placeOrder);
router.get('/orders/:id',userProtect,getOrderById );
router.put('/orders/:id/cancel',userProtect,cancelOrder );
router.put('/orders/:id/return',userProtect,returnOrder );



router.post("/apply", userProtect, applyCoupon);
router.post("/remove", userProtect, removeCoupon);


export default router;
