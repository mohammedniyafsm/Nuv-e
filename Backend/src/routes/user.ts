import express from "express";
import { Signup } from "../controller/userController";

const router = express.Router();

router.post('/auth/signup', Signup);


export default router;