import { ZodError } from "zod";
import Admin from "../models/Admin";
import { adminLoginSchema, adminSignupSchema } from "../validations/adminValidation";
import { Request, Response } from "express";
import { generateOtpToken, generateToken } from "../utils/jwt";
import { generateOtp } from "../utils/otpHelper";
import { sendOtpEmail } from "../utils/nodemailer";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken"
import User from "../models/User";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import s3Client from "../utils/s3Client";

export const signupAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const validateData = adminSignupSchema.parse(req.body);

        const existingUser = await Admin.findOne({ email: validateData.email });

        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        if (validateData) {
            const newUser = await Admin.create(validateData)
            res.status(201).json({ message: "Account created successfully" });

        }
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
}

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const validateData = adminLoginSchema.parse(req.body);
        const existingUser = await Admin.findOne({ email: validateData.email });

        if (!existingUser) {
            res.status(400).json({ message: "Email or Password Incorrect" });
            return;
        }
        const passwordValid = await existingUser.comparePassword(validateData.password);
        if (!passwordValid) {
            res.status(400).json({ message: "Email or Password Incorrect" });
            return;
        }
        const token = generateToken(existingUser._id.toString(), existingUser.role);
        res.cookie("acess_token", token, {
            httpOnly: true,
            secure: true
        })
            .status(200).json({ message: "Logged In Successfully" })
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
}


export const sendOtp = async (req: Request, res: Response): Promise<void> => {
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

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { otpToken, otp } = req.body;
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
                res.status(200).json({ message: "Verifyied" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Server error ", error })
    }
}

export const adminProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.admin.id;
        const userData = await Admin.findOne({ _id: id });
        if (!userData) {
            res.status(400).json({ message: "User Not Found" })
            return;
        }

        res.status(200).json(userData);
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}


export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const users = await User.findOne({ _id: id }).select("-password")
        res.status(200).json(users);
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

export const updateUserStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const update = await User.findByIdAndUpdate(id, {status}, {
            new: true,
            runValidators: true,
        })
        res.status(200).json(update);
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}


export const getPresignedUrl = async (req: Request, res: Response): Promise<void> => {
    try {
        const filename = req.query.filename as string;
        const contentType = req.query.contentType as string;

        const key = `products/${filename}_${Date.now()}`;

        if (!filename || !contentType) {
            res.status(400).json({ message: "Missing filename or contentType" });
            return;
        }

        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME as string,
            Key: key,
            ContentType: contentType
        })

        const url = await getSignedUrl(s3Client, command,{ expiresIn: 60 });
        res.json({ url, key, cloudfrontUrl: `https://${process.env.CLOUDFRONT_DOMAIN}/${key}` });
        return ;
    } catch (error) {
        res.status(500).json({ message: "Server Error ", error });
        return;
    }
}