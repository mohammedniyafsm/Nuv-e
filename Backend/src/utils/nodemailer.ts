import nodemailer from "nodemailer";

interface MailOptions {
    to: string;
    subject: string;
    html: string;
}

// Configure Nodemailer
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Helper: Generate HTML email with Cloudinary logo
const generateEmailHTML = (otp: number, purpose: string): string => {
    // ✅ Use your Cloudinary public URL directly
    const logoUrl =
        "https://res.cloudinary.com/djbawwbzi/image/upload/v1761562973/Screenshot_2025-10-12_143402_r4ewrd.png";

    let title = "";
    let description = "";

    if (purpose === "verify") {
        title = "Verify Your Email Address";
        description = `
            Thank you for joining <strong>Nuvée</strong>!<br/>
            Use the following code to verify your email and start enjoying our luxury fragrance experience.
        `;
    } else {
        title = "Reset Your Password";
        description = `
            We received a request to reset your password.<br/>
            Use the following code to proceed. This code will expire in 5 minutes.
        `;
    }

    return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 30px;">
        <div style="max-width: 500px; background: white; border-radius: 12px; padding: 25px; margin: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <div style="text-align: center;">
                <img src="${logoUrl}" alt="Nuvée Logo" style="width: 120px; margin-bottom: 15px;" />
                <h2 style="color: #222;">${title}</h2>
            </div>

            <p style="font-size: 15px; color: #555; text-align: center;">${description}</p>

            <div style="background-color: #222; color: white; text-align: center; font-size: 24px; letter-spacing: 2px; border-radius: 8px; padding: 10px; margin: 20px 0;">
                ${otp}
            </div>

            <p style="font-size: 13px; color: #777; text-align: center;">
                If you didn’t request this, please ignore this email.<br/>
                <br/>— The Nuvée Team
            </p>
        </div>
    </div>
    `;
};

// 📩 Send OTP for verification
export const sendOtpEmail = async (to: string, otp: number): Promise<void> => {
    const mailOptions: MailOptions = {
        to,
        subject: "Nuvée: Email Verification",
        html: generateEmailHTML(otp, "verify"),
    };

    try {
        await transporter.sendMail({
            from: `"Nuvée" <${process.env.EMAIL_USER}>`,
            ...mailOptions,
        });
        console.log("✅ OTP email sent to:", to);
    } catch (error) {
        console.error("❌ Error sending OTP email:", error);
        throw error;
    }
};

// 📩 Send OTP for forgot password
export const ForgotPasswordOtpEmail = async (to: string, otp: number): Promise<void> => {
    const mailOptions: MailOptions = {
        to,
        subject: "Nuvée: Password Reset OTP",
        html: generateEmailHTML(otp, "forgot"),
    };

    try {
        await transporter.sendMail({
            from: `"Nuvée" <${process.env.EMAIL_USER}>`,
            ...mailOptions,
        });
        console.log("✅ Forgot Password OTP email sent to:", to);
    } catch (error) {
        console.error("❌ Error sending Forgot Password OTP email:", error);
        throw error;
    }
};
