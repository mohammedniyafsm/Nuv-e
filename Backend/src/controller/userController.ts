import { Request, Response } from "express";
import User from "../models/User";
import { loginSchema, signupSchema } from "../validations/userValidation";
import { ZodError } from "zod"
import { generateToken } from "../utils/jwt";


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

        const user  = await User.findOne({ email: validatedData.email });
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
