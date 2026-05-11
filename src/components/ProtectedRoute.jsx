import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const { user, role, loading, authError } = useAuth();

  if (loading) {
    return (
      <div className="route-loading" role="status" aria-live="polite">
        <span className="spinner" />
        Restoring your session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (authError) {
    return <Navigate to="/unauthorized" replace state={{ message: authError }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(role)) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{ from: location, message: "You do not have access to that page." }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
