import { Request, Response } from "express";
import User from "../models/User";
import { loginSchema, signupSchema } from "../validations/userValidation";
import jwt, { JwtPayload } from "jsonwebtoken"
import { ZodError } from "zod"
import { generateOtpToken, generateToken } from "../utils/jwt";
import { generateOtp } from "../utils/otpHelper";
import { ForgotPasswordOtpEmail, sendOtpEmail } from "../utils/nodemailer";


export const signupUser = async (req: Request, res: Response): Promise<void> => {
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


export const loginUser = async (req: Request, res: Response): Promise<void> => {
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

        const token = generateToken(user._id.toString(), user.role);

        res.cookie("acess_token", token, {
            httpOnly: true,
            secure: false
        })
            .status(200).json({ message: "Logged in successfully" });
        return;
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


export const sendOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const _id = req.user.id;

        const user = await User.findOne({ _id }, { email: 1 ,lastOtpSentAt: 1 });
        if (!user) {
            res.status(400).json({ message: "User Not Found" });
            return;
        }
        const now = new Date();
        const RESEND_COOLDOWN = 5 * 60 * 1000; // 5 minutes in milliseconds

        if (
            user.lastOtpSentAt &&
            (now.getTime() - user.lastOtpSentAt.getTime()) < RESEND_COOLDOWN
        ) {
            const waitTime = Math.ceil(
                (RESEND_COOLDOWN - (now.getTime() - user.lastOtpSentAt.getTime())) / 1000
            );

            res.status(429)
                .json({
                    message: `Please wait ${waitTime} seconds before requesting a new OTP`
                });
            return;
        }


        const otp = await generateOtp();
        const otpToken = await generateOtpToken(otp);
        await sendOtpEmail(user.email, otp);

        await User.findOneAndUpdate(
            { email: user.email },
            { lastOtpSentAt: now, }
        );
        res.cookie("otp_token", otpToken, {
            httpOnly: true,
            secure: false
        })
            .status(200).json({ message: "OTP Sent Successfully" });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error });
    }
};


export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { otp } = req.body;
        const otpToken = req.cookies.otp_token;
        const userId = req.user.id;
        const otp_secret_key = process.env.OTP_SECRET_KEY as string;
        if (otpToken) {
            const decoded = await jwt.verify(otpToken, otp_secret_key) as JwtPayload;
            console.log(decoded, otp)
            const verify = decoded.otp == otp;
            if (!verify) {
                res.status(400).json({ message: "Invalid OTP" });
                return;
            }
            else {
                await User.findByIdAndUpdate({ _id: userId }, { isVerified: true });
                res.status(200).json({ message: "Verifyied" });
                return;
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Server error ", error });
        return;
    }
}

export const resendOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User Not Found" });
            return;
        }

        //  2-minute cooldown
        const now = new Date();
        if (user.lastOtpSentAt && (now.getTime() - user.lastOtpSentAt.getTime()) < 2 * 60 * 1000) {
            const waitTime = Math.ceil(
                (2 * 60 * 1000 - (now.getTime() - user.lastOtpSentAt.getTime())) / 1000
            );
            res.status(429).json({ message: `Please wait ${waitTime} seconds before requesting a new OTP` });
            return;
        }

        //  Generate OTP & send email
        const otp = await generateOtp();
        const otpToken = await generateOtpToken(otp);
        await sendOtpEmail(email, otp);

        // Update user document
        await User.findOneAndUpdate(
            { email },
            { lastOtpSentAt: new Date() }
        );

        res.status(200).json({ message: "OTP Sent Successfully", otpToken });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
};


export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User Not Found" });
            return;
        }
        const now = new Date();
        if (user.lastOtpSentAt && (now.getTime() - user.lastOtpSentAt.getTime()) < 2 * 60 * 1000) {
            const waitTime = Math.ceil(
                (2 * 60 * 1000 - (now.getTime() - user.lastOtpSentAt.getTime())) / 1000
            );
            res.status(429).json({ message: `Please wait ${waitTime} seconds before requesting a new OTP` });
            return;
        }
        const otp = await generateOtp();
        const otptoken = generateOtpToken(otp);
        await ForgotPasswordOtpEmail(email, otp);
        await User.findByIdAndUpdate(user._id, { lastOtpSentAt: new Date() });
        res.status(200).json({ message: "OTP sent to your email successfully", otptoken })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

export const updatePassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.user.id;
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ _id: id });
        if (!user) {
            res.status(400).json({ message: "User Not Found" });
            return;
        }
        const verifyPassword = await user.comparePassword(oldPassword);
        if (!verifyPassword) {
            res.status(400).json({ message: "Invalid Password" });
            return;
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: "Password Updated" })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.user.id;
        const userData = await User.findOne({ _id: id }).select("-password");
        if (!userData) {
            res.status(400).json({ message: "User Not Found" })
            return;
        }

        res.status(200).json(userData);
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}


export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = req.user.id;
        const { username, email } = req.body;
        console.log(username, email)
        const updateData = await User.findByIdAndUpdate(userID, { username, email },
            { new: true, }
        )
        res.status(200).json({ message: "User Data Updated", updateData });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("acess_token", {
            httpOnly: true,
            secure: false,
        })
        res.json({ message: "Logged Out Successfully" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}