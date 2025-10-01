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
