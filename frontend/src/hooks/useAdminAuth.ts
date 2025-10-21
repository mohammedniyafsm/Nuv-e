// hooks/useAdminAuth.ts
import axios from "axios";
import { useEffect, useState } from "react";

interface AdminAuth {
  admin: string | null;
  loggedIn: boolean;
  loading: boolean;
}

export const useAdminAuth = () => {
  const [auth, setAuth] = useState<AdminAuth>({
    admin: null,
    loggedIn: false,
    loading: true,
  });

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/profile`,
        { withCredentials: true }
      );

      console.log("Admin profile response:", res);

      if (res.data && res.data.role === "admin") {
        setAuth({
          admin: res.data.role,
          loggedIn: true,
          loading: false,
        });
      } else {
        setAuth({
          admin: null,
          loggedIn: false,
          loading: false,
        });
      }
    } catch (err: any) {
      console.error("Auth check failed:", err);
      setAuth({
        admin: null,
        loggedIn: false,
        loading: false,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { ...auth, checkAuth };
};