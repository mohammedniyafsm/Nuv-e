import { z } from "zod";

export const adminSignupSchema = z.object({
    username: z
        .string()
        .min(4, { message: "Username must be at least 4 characters" })
        .max(50, { message: "Username must not exceed 50 characters" }),
    email: z
        .string()
        .trim()
        .email({ message: "Invalid Email Format" }),
    password: z
        .string()
        .min(5, { message: "Password must be at least 5 characters" })
        .max(50, { message: "Password must not exceed 50 characters" }),
    role: z.literal("admin").default("admin"),
});

export const adminLoginSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: "Invalid Email Format" }),
    password: z
        .string()
        .min(5, { message: "Password must be at least 5 characters" })
        .max(50, { message: "Password must not exceed 50 characters" }),
});
