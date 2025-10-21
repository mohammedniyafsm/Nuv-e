import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { loggedIn, loading, status } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!loggedIn) return <Navigate to="/login" replace />;

  if (status === "banned")
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        User account is currently blocked.
      </div>
    );

  return <Outlet />;
};

export default ProtectedRoute;
