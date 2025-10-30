import { Request, Response } from "express";
import User from "../models/User";
import { loginSchema, signupSchema } from "../validations/userValidation";
import jwt, { JwtPayload } from "jsonwebtoken"
import { ZodError } from "zod"
import { generateOtpToken, generateToken } from "../utils/jwt";
import { generateOtp } from "../utils/otpHelper";
import { ForgotPasswordOtpEmail, sendOtpEmail } from "../utils/nodemailer";

const isProduction = process.env.NODE_ENV === "production";

//USER SIGNUP (REGISTER NEW USER)
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

//USER lOGIN 
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

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
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

//SEND OTP USER TO VERIFY
export const sendOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const _id = req.user.id;

        const user = await User.findOne({ _id }, { email: 1, lastOtpSentAt: 1 });
        if (!user) {
            res.status(400).json({ message: "User Not Found" });
            return;
        }
        const now = new Date();
        const RESEND_COOLDOWN = 5 * 60 * 1000; // 5 minutes in milliseconds

        if ( user.lastOtpSentAt &&  (now.getTime() - user.lastOtpSentAt.getTime()) < RESEND_COOLDOWN ) { 
            const waitTime = Math.ceil(
                (RESEND_COOLDOWN - (now.getTime() - user.lastOtpSentAt.getTime())) / 1000
            );

            res.status(429).json({message: `Please wait ${waitTime} seconds before requesting a new OTP`});
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
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        })
        .status(200).json({ message: "OTP Sent Successfully" });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error });
    }
};

//VERIFY OTP 
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

//RESEND OTP
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
        console.log(error)
        res.status(500).json({ message: "Server Error", error });
        return;
    }
};

//FORGOT PASSWORD (RESET PASSWORD)
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
        res.cookie("forgot_password_otp_token", otptoken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        })
            .status(200).json({ message: "OTP sent to your email successfully" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}

//FORGOT PASSWORD ---OTP VERIFY
export const verifyForgotPasswordOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { otp } = req.body;
        const otpToken = req.cookies.forgot_password_otp_token;
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
                res.status(200).json({ message: "Verifyied" });
                return;
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Server error ", error });
        return;
    }
}

//CHANGE PASSWORD AFTER FORGOT PASSWORD OTP VERIFICATION DONE
export const changeForgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { newPassword, confirmPassword, email, otp } = req.body;
        const otpToken = req.cookies.forgot_password_otp_token;

        if (!otpToken) {
            res.status(401).json({ message: "Unauthorized or session expired" });
            return;
        }

        if (!newPassword || !confirmPassword) {
            res.status(400).json({ message: "Both password fields are required" });
            return;
        }

        if (newPassword !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }

        const otp_secret_key = process.env.OTP_SECRET_KEY as string;
        const decoded = jwt.verify(otpToken, otp_secret_key) as JwtPayload;
        console.log(decoded, otp)
        if (decoded.otp !== Number(otp)) {
            res.status(400).json({ message: "Invalid OTP" });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        user.password = newPassword;
        await user.save();

        // Clear OTP cookie
        res.clearCookie("forgot_password_otp_token");

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//UPDATE PASSWORD (USING LAST PASSWORD - CREATE NEW PASSWORD)
export const updatePassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.user.id;
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ _id: id });
        if (!user) {
            console.log(id);
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

//USER DETAILS
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

//UPDATE USER DETAILS - (USERNAME ,EMAIL)
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

//CHECK WHELTHER USER LOGGED IN OR NOT
export const Logged = async (req: Request, res: Response): Promise<void> => {
    try {
        const jwt_key = process.env.JWT_SECRET_KEY;
        if (!jwt_key) {
            res.status(500).json({ message: "Server configuration error" });
            return;
        }

        const token = req.cookies.access_token;

        if (!token) {
            res.status(200).json({ loggedIn: false });
            return;
        }

        let decoded: JwtPayload | null = null;
        try {
            decoded = jwt.verify(token, jwt_key) as JwtPayload;
        } catch (err) {
            res.status(200).json({ loggedIn: false });
            return;
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            res.status(200).json({ loggedIn: false });
            return;
        }

        res.status(200).json({
            loggedIn: true,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                isVerified: user.isVerified,
                status : user.status
            },
        });
    } catch (error) {
        console.error("Error in Logged route:", error);
        res.status(500).json({ message: "Server error" });
        return;
    }
};

//USER LOGOUT 
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: isProduction,
        })
        res.json({ message: "Logged Out Successfully" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
}