import express from "express";
import { adminProtect, protect, userProtect } from "../middleware/Auth";
import { addProduct, deleteProduct, getAdminProducts, getProductByIdAdmin, updateProduct } from "../controller/productController";
import { adminProfile, getAllUsers, getUserById, loginAdmin, sendOtp, signupAdmin, updateUserStatus, verifyOtp } from "../controller/adminController";

const router = express.Router();

router.post('/admin/signup', signupAdmin );
router.post('/admin/login', loginAdmin );
router.post('/admin/requestOtp',sendOtp);
router.post('/admin/verifyOtp',verifyOtp);
router.get('/admin/profile',adminProtect,protect,adminProfile);


router.post('/admin/products',adminProtect,protect,addProduct);
router.get('/admin/products',adminProtect,protect,getAdminProducts);
router.put('/admin/products/:id',adminProtect,protect,updateProduct);
router.delete('/admin/products/:id',adminProtect,protect,deleteProduct);
router.get('/admin/products/:id',adminProtect,protect,getProductByIdAdmin);


router.get('/admin/users',adminProtect,protect,getAllUsers);
router.get('/admin/users/:id',adminProtect,protect,getUserById);
router.put('/admin/users/:id',adminProtect,protect,updateUserStatus);

export default router;