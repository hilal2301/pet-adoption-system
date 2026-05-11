import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function PublicOnlyRoute({ children }) {
  const { user, loading, getDefaultRedirect } = useAuth();

  if (loading) {
    return (
      <div className="route-loading" role="status" aria-live="polite">
        <span className="spinner" />
        Checking your session...
      </div>
    );
  }

  if (user) {
    return <Navigate to={getDefaultRedirect()} replace />;
  }

  return children;
}
