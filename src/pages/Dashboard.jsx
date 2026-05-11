import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <p>Welcome: {user?.email}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
