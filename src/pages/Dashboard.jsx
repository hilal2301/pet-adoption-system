import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const { user, logout, loading, getDefaultRedirect } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(getDefaultRedirect(), { replace: true });
    }
  }, [getDefaultRedirect, loading, navigate, user]);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="route-loading" role="status" aria-live="polite">
        <span className="spinner" />
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>Welcome: {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
