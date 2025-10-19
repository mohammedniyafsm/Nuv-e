import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function UserSetting() {
  const [password, setPassword] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleSubmit = async () => {
    const { CurrentPassword, NewPassword, ConfirmPassword } = password;

    if (!CurrentPassword || !NewPassword || !ConfirmPassword) {
      toast.error("Fill the form completely");
      return;
    }

    if (NewPassword !== ConfirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/password`,
        {
          oldPassword: CurrentPassword,
          newPassword: NewPassword,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response)
      toast.success("Password changed successfully");
      setPassword({
        CurrentPassword: "",
        NewPassword: "",
        ConfirmPassword: "",
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <section className="bg-white w-full rounded-2xl mt-10 border border-[#dbdada] px-6 py-8 transition-all duration-500">
      <h1 className="font-neogrotesk-regular">Change Password</h1>

      {/* Current Password */}
      <div className="mt-4">
        <label className="font-neogrotesk-regular">Current Password</label>
        <input
          className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
          type="password"
          value={password.CurrentPassword}
          onChange={(e) =>
            setPassword({ ...password, CurrentPassword: e.target.value })
          }
        />
      </div>

      {/* New Password */}
      <div className="mt-4">
        <label className="font-neogrotesk-regular">New Password</label>
        <input
          className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
          type="password"
          value={password.NewPassword}
          onChange={(e) =>
            setPassword({ ...password, NewPassword: e.target.value })
          }
        />
      </div>

      {/* Confirm Password */}
      <div className="mt-4">
        <label className="font-neogrotesk-regular">Confirm Password</label>
        <input
          className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
          type="password"
          value={password.ConfirmPassword}
          onChange={(e) =>
            setPassword({ ...password, ConfirmPassword: e.target.value })
          }
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-black h-8 w-full text-white font-neogrotesk-regular rounded-xl mt-4"
      >
        Update Password
      </button>
      <div className="flex justify-center">
        <Link to="/forgotPassword" className="text-sm underline py-2">Forgot Password</Link >
      </div>
    </section>
  );
}

export default UserSetting;