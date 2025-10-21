import axios from "axios";
import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  isVerified: boolean;
  status: string;
}

interface AuthState {
  user: User | null;
  loggedIn: boolean;
  loading: boolean;
  status: string | null;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    loggedIn: false,
    loading: true,
    status: null,
  });

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/logged`,
        { withCredentials: true }
      );

      if (data.loggedIn && data.user) {
        setAuth({
          user: data.user,
          loggedIn: true,
          loading: false,
          status: data.user.status, // ✅ safer
        });
      } else {
        setAuth({ user: null, loggedIn: false, loading: false, status: null });
      }
    } catch (err) {
      setAuth({ user: null, loggedIn: false, loading: false, status: null });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { ...auth, checkAuth };
};
