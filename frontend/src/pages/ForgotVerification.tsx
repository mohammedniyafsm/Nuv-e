import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import OtpInput from "../components/ui/OtpInput";

interface OTPErrorResponse {
    message: string;
}

function ForgotVerification() {

    const [otp, setOtp] = useState<string[]>(Array(5).fill(""));
    const navigate = useNavigate();

    const location = useLocation();
    const email = (location.state as { email?: string })?.email;


    const requestOtp = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`,
                { email },
                { withCredentials: true }
            );

            console.log(response);
            toast.success("OTP sent successfully");
        } catch (error: unknown) {
            const axiosError = error as AxiosError<OTPErrorResponse>;
            const message = axiosError.response?.data?.message || "Unknown error";
            console.error("OTP request failed:", message);
            toast.error("Failed to send OTP: " + message);
        }
    }



    const handleOtpSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const otpCode = otp.join("");
            console.log("Entered OTP:", otpCode);

            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-forgot-password`,
                { otp: otpCode },
                { withCredentials: true }
            );

            toast.success("OTP verified successfully");
            navigate("/changePassword ",{state : {email ,otp : otpCode}});
        } catch (error: unknown) {
            console.log(error)
            const axiosError = error as AxiosError<OTPErrorResponse>;
            const message = axiosError.response?.data?.message || "Unknown error";
            console.error("OTP request failed:", message);
            toast.error("Failed to send OTP: " + message);
        }
    };

    return (
        <div className="w-screen min-h-screen bg-[#F2F2F2] px-4 md:px-12 py-8">
            <div className="px-2 md:px-10">
                <Link to="/">
                <img
                    src="https://res.cloudinary.com/djbawwbzi/image/upload/v1761751553/logo_zidtnt.png"
                    alt="Logo"
                    className="w-20 h-10 md:w-24 md:h-12"
                />
                </Link>
            </div>

            <div className="flex flex-col justify-center items-center mt-12 md:mt-20">
                <h1 className="text-4xl md:text-6xl text-center text-[#3B3B3B] font-neogrotesk-regular">
                    OTP VERIFICATION
                </h1>

                <p className="font-neogrotesk-regular text-[#8E8888] mt-4 text-center text-sm md:text-base px-2 md:px-40">
                    <span className="block">
                        Secure your Nuvée experience with a quick verification —
                    </span>
                    <span className="block">
                        Confirm it’s you to reset your password and continue enjoying effortless shopping,</span>
                    <span className="block">order tracking, and saved addresses..</span>
                </p>

                <form
                    onSubmit={handleOtpSubmit}
                    className="flex flex-col gap-4 items-center mt-8 w-full md:w-auto"
                >
                    <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
                        <OtpInput length={5} value={otp} setValue={setOtp} />
                    </div>

                    <Button
                        type="submit"
                        name="SUBMIT"
                        className="mt-6 md:mt-8 w-48 md:w-56 text-sm md:text-base"
                    />
                </form>

                <div className="flex flex-col items-center mt-8 md:mt-12 text-center">
                    <h1 className="text-[#8E8888] font-neogrotesk-regular text-sm md:text-base">
                        Didn’t Receive OTP?
                    </h1>
                    <h1 onClick={() => { requestOtp() }} className="font-neogroteskessalt-light text-sm md:text-base cursor-pointer hover:underline mt-1">
                        Resend Code
                    </h1>
                </div>
            </div>
        </div>
    );
}


export default ForgotVerification;


