import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleReturnToLogin = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <aside style={sidebarStyle}>
      <div style={logoContainerStyle}>
        <div style={logoIconStyle}>PA</div>
        <h2 style={logoTextStyle}>PetAdmin</h2>
      </div>

      <nav style={navStyle}>
        <p style={sectionTitleStyle}>MAIN MENU</p>

        <Link to="/admin" style={linkStyle(isActive("/admin"))}>
          Dashboard
        </Link>

        <Link to="/admin/users" style={linkStyle(isActive("/admin/users"))}>
          User Management
        </Link>

        <Link to="/admin/requests" style={linkStyle(isActive("/admin/requests"))}>
          Adoption Requests
        </Link>

        <div style={dividerStyle} />

        <p style={sectionTitleStyle}>SYSTEM</p>

        <button type="button" onClick={handleReturnToLogin} style={exitLinkStyle}>
          Uygulamaya Don
        </button>
      </nav>

      <div style={sidebarFooterStyle}>
        <div style={userAvatarStyle}>H</div>
        <div style={userInfoStyle}>
          <span style={userNameStyle}>Hilal</span>
          <span style={userRoleStyle}>Admin</span>
        </div>
      </div>
    </aside>
  );
};

const sidebarStyle = {
  width: "260px",
  height: "100vh",
  backgroundColor: "#1e293b",
  color: "#f8fafc",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  left: 0,
  top: 0,
  boxShadow: "4px 0 10px rgba(0,0,0,0.05)",
  fontFamily: '"Inter", "Segoe UI", sans-serif',
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "40px",
  paddingLeft: "10px",
};

const logoIconStyle = {
  fontSize: "14px",
  fontWeight: "800",
  background: "linear-gradient(135deg, #6366f1, #a855f7)",
  padding: "8px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
};

const logoTextStyle = {
  fontSize: "20px",
  fontWeight: "800",
  letterSpacing: "0.5px",
  margin: 0,
  color: "#fff",
};

const navStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  flex: 1,
};

const sectionTitleStyle = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#64748b",
  letterSpacing: "1.5px",
  marginBottom: "10px",
  marginTop: "20px",
  paddingLeft: "12px",
};

const linkStyle = (active) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: active ? "#fff" : "#94a3b8",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "500",
  padding: "12px 15px",
  borderRadius: "12px",
  backgroundColor: active ? "#334155" : "transparent",
  transition: "all 0.2s ease",
  borderLeft: active ? "4px solid #6366f1" : "4px solid transparent",
});

const exitLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  width: "100%",
  color: "#94a3b8",
  background: "transparent",
  border: "none",
  textDecoration: "none",
  fontSize: "14px",
  padding: "12px 15px",
  borderRadius: "12px",
  marginTop: "auto",
  transition: "color 0.2s",
  cursor: "pointer",
  fontFamily: "inherit",
};

const dividerStyle = {
  height: "1px",
  backgroundColor: "#334155",
  margin: "20px 10px",
};

const sidebarFooterStyle = {
  marginTop: "auto",
  padding: "15px",
  backgroundColor: "#334155",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const userAvatarStyle = {
  width: "35px",
  height: "35px",
  borderRadius: "10px",
  backgroundColor: "#6366f1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  color: "white",
};

const userInfoStyle = {
  display: "flex",
  flexDirection: "column",
};

const userNameStyle = {
  fontSize: "14px",
  fontWeight: "600",
};

const userRoleStyle = {
  fontSize: "11px",
  color: "#94a3b8",
};

export default AdminSidebar;
