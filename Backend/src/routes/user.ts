import express from "express";
import { Login, RequestOtp, Signup, VerifyOtp } from "../controller/userController";

const router = express.Router();

router.post('/auth/signup', Signup);
router.post('/auth/login', Login);
router.post('/auth/requestOtp',RequestOtp);
router.post('/auth/verifyOtp',VerifyOtp);


export default router;