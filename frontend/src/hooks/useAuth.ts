import axios from "axios";
import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  loggedIn: boolean;
  loading: boolean;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    loggedIn: false,
    loading: true,
  });

  const checkAuth = async () => {
    try {
      const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/logged`, {
        withCredentials : true,
      });

      

      if (response.data.loggedIn && response.data.user) {
        setAuth({ user: response.data.user, loggedIn: true, loading: false });
      } else {
        setAuth({ user: null, loggedIn: false, loading: false });
      }
    } catch (err) {
      setAuth({ user: null, loggedIn: false, loading: false });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { ...auth, checkAuth };
};

