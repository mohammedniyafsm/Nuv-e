import nodemailer from "nodemailer";

interface MailOptions {
    to: string;
    subject: string;
    text: string;
}

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOtpEmail = async (to: string, otp: number): Promise<void> => {
    const mailOptions: MailOptions = {
        to,
        subject: "Nuvée: Email Verification",
        text: `${otp} is your Nuvée verification code.\n\nPlease enter this code to verify your email and continue enjoying the exquisite fragrance experience.\n\nThank you, \nThe Nuvée Team.`,
    };

    try {
        await transporter.sendMail({
            from: `"Nuvée" <${process.env.EMAIL_USER}>`,
            ...mailOptions,
        });
        console.log("OTP email sent to:", to);
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
};

export const ForgotPasswordOtpEmail = async (to: string, otp: number): Promise<void> => {
    const mailOptions: MailOptions = {
        to,
        subject: "Nuvée: Password Reset OTP",
        text:
            `${otp} is your Nuvée password reset verification code.\n\n` +
            `Please enter this code in the app or website to reset your password.\n` +
            `This code will expire in 5 minutes.\n\n` +
            `If you did not request a password reset, please ignore this email.\n\n` +
            `Thank you,\nThe Nuvée Team.`
    };

    try {
        await transporter.sendMail({
            from: `"Nuvée" <${process.env.EMAIL_USER}>`,
            ...mailOptions,
        });
        console.log("Forgot Password OTP email sent to:", to);
    } catch (error) {
        console.error("Error sending Forgot Password OTP email:", error);
        throw error;
    }
};