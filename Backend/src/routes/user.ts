import express from "express";
import { userProtect } from "../middleware/Auth";
import { forgotPassword, getUserProfile, loginUser, resendOtp, sendOtp, signupUser, updatePassword, updateUserProfile, verifyOtp } from "../controller/userController";
import { getAllProducts, getProductById } from "../controller/productController";
import { addAddress, deleteAddress, getAddresses, updateAddress } from "../controller/addressController";

const router = express.Router();

router.post('/auth/signup', signupUser);
router.post('/auth/login', loginUser);
router.post('/auth/otp/send',userProtect,sendOtp);
router.post('/auth/otp/verify',userProtect,verifyOtp);
router.post('/auth/otp/resend',userProtect,resendOtp);
router.post('/auth/password',userProtect,updatePassword);
router.post('/auth/forgot-password',forgotPassword);

router.get('/user/profile',userProtect,getUserProfile);
router.put('/user/profile',userProtect,updateUserProfile);

router.get('/user/address',userProtect,getAddresses);
router.post('/user/address',userProtect,addAddress);
router.put('/user/address/:id',userProtect,updateAddress);
router.delete('/user/address/:id',userProtect,deleteAddress);


//Public Api -->
router.get('/user/products',getAllProducts);
router.get('/user/products/:id',getProductById);


export default router;
