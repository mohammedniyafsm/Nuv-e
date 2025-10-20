import axios from "axios";
import { useEffect, useState } from "react";

export const useAdminAuth = () => {
  const [auth, setAuth] = useState({ user: null, loggedIn: false, loading: true });

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/profile`, {
        withCredentials: true,
      });
      setAuth({ user: res.data, loggedIn: true, loading: false });
    } catch {
      setAuth({ user: null, loggedIn: false, loading: false });
    }
  };

  useEffect(() => { checkAuth(); }, []);

  return { ...auth, checkAuth };
};
