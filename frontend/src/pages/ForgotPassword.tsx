import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

function ForgotPassword() {
    const navigate = useNavigate();

    interface OTPErrorResponse {
        message: string;
    }

    const [email, setEmail] = useState("");

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const SubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Enter Email Address");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, { email: email },
                { withCredentials : true}
            )
            toast.success(response.data.message);
            navigate('/verify_forgot_password',{state : {email }})
        } catch (error: unknown) {
            const axiosError = error as AxiosError<OTPErrorResponse>;
            const message = axiosError.response?.data?.message || "Unknown error";
            console.error("OTP request failed:", message);
            toast.error("Failed to send OTP: " + message);
        }
    }

    return (
        <div className="w-screen min-h-screen bg-[#F2F2F2] md:px-12 md:py-8">
            {/* Logo */}
            <div className="px-4 py-4 md:px-10">
                <Link to="/">
                <img
                    className="h-10 md:w-24 md:h-12"
                    src="https://res.cloudinary.com/djbawwbzi/image/upload/v1761751553/logo_zidtnt.png"
                    alt="Logo"
                />
                </Link>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center items-center">
                {/* Heading */}
                <h1 className="text-4xl md:text-4xl text-[#3B3B3B] font-neogrotesk-regular pt-8 md:pt-10">
                    Enter Email Address
                </h1>

                {/* Subtext */}
                <p className="text-[#8E8888] text-center mt-2 md:mt-4 px-2 md:px-[440px]">
                    <span className="font-semibold block text-[9px] md:text-base">
                        Enter your registered email address and we’ll send you a secure one-time password (OTP) to reset your account.
                    </span>
                </p>

                {/* Form */}
                <form onSubmit={SubmitEmail} className="flex flex-col items-center gap-2 mt-8 md:mt-8">
                    <Input
                        type="email"
                        value={email}
                        name="email"
                        placeholder="Email"
                        onChange={handleEmail}
                        className="text-xs md:text-base h-10 w-72 px-4 md:px-10 md:h-16 md:w-[550px]"
                    />
                    <h1
                        onClick={() => navigate('/login')}
                        className="text-[#3B3B3B] cursor-pointer font-neogroteskessalt-light underline"
                    >
                        Back to Login
                    </h1>
                        <Button
                            type="submit"
                            name="Submit"
                            className="mt-3 lg:mt-6 text-[10px] md:text-base h-10 w-36 px-4 md:px-10 md:h-16 md:w-[200px]"
                        />
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;