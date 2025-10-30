import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { fetchUser } from '../features/User/UserSlice';
import Exit from './icons/Exit';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../features/User/UserSlice"; 

function UserProfileHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      // Clear Redux state (optional, but good practice)
      dispatch(logout());

      // Redirect to login or homepage
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { username, email } = useSelector((state: RootState) => state.user);

  return (
    <div className="bg-[#ffff] w-full flex justify-between px-4 py-8 rounded-xl border border-[#dbdada]">
      <div className="pl-10 flex gap-8 items-center">
        <div className="h-16 w-16 rounded-full flex justify-center items-center bg-gray-500">
          <h1 className="text-white text-2xl font-neogrotesk-regular">
            {username?.charAt(0)?.toUpperCase()}
          </h1>
        </div>
        <div>
          <h1>{username}</h1>
          <h1 className="text-[#8a7a7aed]">{email}</h1>
          <h1 className="text-[#8a7a7aed]">Member since March 2024</h1>
        </div>
      </div>

      <div
        onClick={Logout}
        className="h-10 w-full sm:w-28 bg-gray-900 rounded-xl text-white font-neogrotesk-regular text-sm flex justify-center items-center gap-2 cursor-pointer"
      >
        <Exit className="h-4 w-4 mr-2 sm:mr-0 text-white" />
        <button>Logout</button>
      </div>
    </div>
  );
}

export default UserProfileHeader;

