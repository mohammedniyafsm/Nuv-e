import { parseAsync, z } from "zod";

//user Signup Validation Using Zod
export const signupSchema = z.object({
    username: z
        .string()
        .trim()
        .min(4, { message: "Username must be at least 3 characters" })
        .max(50, { message: "Username must not exceed  least 50 characters" }),
    email: z
        .string()
        .trim()
        .email({ message: "Invalid Email Format" }),
    password: z
        .string()
        .min(5, { message: "Password must be at least 5 characters" })
        .max(50, { message: "Password must not exceed least 50 character" }),

    role: z.enum(["user", "admin"]).default('user'),
    isVerified: z.boolean().default(false),
    status: z.enum(['active', 'inactive', 'banned']).default('active'),
})


//user Signup Validation Using Zod
export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: "Invalid Email Format" }),
    password: z
        .string()
        .min(5, { message: "Password must be at least 5 characters" })
        .max(50, { message: "Password must not exceed least 50 character" })
})