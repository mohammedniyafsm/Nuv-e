import jwt from "jsonwebtoken";

const jwtKey = process.env.JWT_SECRET_KEY as string;

if (!jwtKey) {
    throw new Error("JWT_SECRET_KEY is not defined in .env");
}

export const generateToken = (id: string): string => {
    try {
        const payload = { id };
        return jwt.sign(payload, jwtKey, { expiresIn: "30d" });
    } catch (error) {
        console.error("Error while generating JWT token", error);
        throw error;
    }
};


export const generateOtpToken = (otp: number ): string => {
    const otp_key = process.env.OTP_SECRET_KEY;
    if (!otp_key) {
        throw new Error("OTP_SECRET_KEY is not defined in .env");
    }
    try {
        const payload = { otp }
        const otpToken = jwt.sign(payload, otp_key,{expiresIn : "5min"});
        return otpToken
    } catch (error) {
        console.error("Error while generating JWT token", error);
        throw error;
    }
}