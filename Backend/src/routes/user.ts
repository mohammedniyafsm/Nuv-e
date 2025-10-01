import express from "express";
import { Login, Signup } from "../controller/userController";

const router = express.Router();

router.post('/auth/signup', Signup);
router.post('/auth/login', Login);


export default router;