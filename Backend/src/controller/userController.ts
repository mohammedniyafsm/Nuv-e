import { Request, Response } from "express";
import User from "../models/User";
import { loginSchema, signupSchema } from "../validations/userValidation";
import jwt, { JwtPayload } from "jsonwebtoken"
import { ZodError } from "zod"
import { generateOtpToken, generateToken } from "../utils/jwt";
import { generateOtp } from "../utils/otpHelper";
import { sendOtpEmail } from "../utils/nodemailer";


export const Signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = signupSchema.parse(req.body);

        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }

        await User.create(validatedData);
        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                message: "Validation failed",
                errors: error.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            });
        } else {
            res.status(500).json({ message: "Server error", error });
        }
    }
};


export const Login = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = loginSchema.parse(req.body);

        const user = await User.findOne({ email: validatedData.email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }

        const isPasswordValid = await user.comparePassword(validatedData.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({
            message: "Logged in successfully",
            token
        });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                message: "Validation failed",
                errors: error.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            });
        } else {
            res.status(500).json({ message: "Server error", error });
        }
    }
};


export const RequestOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const otp = await generateOtp();
        const otpToken = await generateOtpToken(otp);
        await sendOtpEmail(email, otp);
        res.status(200).json({ message: "OTP Sent Succeesfully", otpToken });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

export const VerifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { otpToken, otp } = req.body;
        const otp_secret_key = process.env.OTP_SECRET_KEY as string;
        if (otpToken) {
            const decoded = await jwt.verify(otpToken, otp_secret_key) as JwtPayload;
            console.log(decoded,otp)
            const verify = decoded.otp == otp;
            if (!verify) {
                res.status(400).json({ message: "Invalid OTP" });
                return;
            }
            else {
                res.status(200).json({ message: "Verifyied" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Server error ", error })
    }
}