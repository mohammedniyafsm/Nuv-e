import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import Button from "../components/ui/Button";
import OtpInput from "../components/ui/OtpInput";

function Otp() {

  const [otp, setOtp] = useState<string[]>(Array(5).fill(""));
  const navigate = useNavigate();

  // -------------------- Send OTP on Mount --------------------
  useEffect(() => {
    const requestOtp = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/otp/send`,
          {},
          { withCredentials: true }
        );

        console.log(response);
        toast.success("OTP sent successfully");
      } catch (error) {
        console.error("OTP request failed:", error);
        toast.error("Failed to send OTP");
      }
    };

    requestOtp();
  }, []);

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const otpCode = otp.join("");
      console.log("Entered OTP:", otpCode);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/otp/verify`,
        { otp: otpCode },
        { withCredentials: true }
      );

      toast.success("OTP verified successfully");
      navigate("/");
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error("Invalid or expired OTP");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#F2F2F2] px-4 md:px-12 py-8">
      <div className="px-2 md:px-10">
        <img
          src="./public/images/logo.png"
          alt="Logo"
          className="w-20 h-10 md:w-24 md:h-12"
        />
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
            confirm it’s you and continue enjoying effortless shopping, order
          </span>
          <span className="block">tracking, and saved addresses.</span>
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
          <h1 className="font-neogroteskessalt-light text-sm md:text-base cursor-pointer hover:underline mt-1">
            Resend Code
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Otp;
