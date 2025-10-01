import crypto from "crypto";

export const generateOtp = async (): Promise<number> => {
    try {
        const otp = crypto.randomInt(10000, 99999);
        return otp;
    } catch (error) {
        throw new Error("Error while generating OTP");
    }
};
