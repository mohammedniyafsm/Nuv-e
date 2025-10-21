import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

interface PasswordErrorResponse {
  message: string;
}

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

   const location = useLocation();
    const email = (location.state as { email?: string })?.email;
    const otp = (location.state as { otp?: string })?.otp;

    useEffect(()=>{
        console.log(email,otp)
    },[])


  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword.trim() || !confirmPassword.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/change-forgot-password`,
        { newPassword, confirmPassword ,email,otp},
        { withCredentials: true }
      );

      toast.success(response.data.message);
      navigate("/login");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<PasswordErrorResponse>;
      const message = axiosError.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#F2F2F2] px-4 py-10 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-neogrotesk-regular text-[#3B3B3B]">
          Change Password
        </h1>
        <form
          onSubmit={handleChangePassword}
          className="flex flex-col gap-4 items-center"
        >
          <Input
            type="password"
            name="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-72 px-4 md:w-[400px] h-12"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            name="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-72 px-4 md:w-[400px] h-12"
          />
          <Button
            type="submit"
            name="Update"
            className="mt-4 w-48   h-12 md:w-56 text-sm md:text-base"
          />
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
