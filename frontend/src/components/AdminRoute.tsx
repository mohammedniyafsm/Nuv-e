import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";

const AdminRoute = () => {
  const { loggedIn, loading, admin } = useAdminAuth();

  if (loading) return <div>Loading...</div>;
  if (!loggedIn) return <Navigate to="/admin" replace />;
  if (admin !== "admin") return <Navigate to="/admin" replace />;

  return <Outlet />;
};

export default AdminRoute;