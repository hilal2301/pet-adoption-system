import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const navItems = [
  { label: "🐾 Hayvanlar", path: "/user" },
  { label: "📋 Talepler", path: "/staff" },
  { label: "👤 Profilim", path: "/profile" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>
        <span style={{ fontSize: "28px" }}>🐾</span>
        <span style={{ fontSize: "20px", fontWeight: "700", color: "white" }}>PetAdopt</span>
      </div>

      <div style={{ marginTop: "30px" }}>
        <p style={menuLabelStyle}>ANA MENÜ</p>
        {navItems.map(item => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={location.pathname === item.path ? activeNavItemStyle : navItemStyle}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <p style={menuLabelStyle}>SİSTEM</p>
        <div onClick={handleLogout} style={navItemStyle}>
          🚪 Çıkış Yap
        </div>
      </div>
    </div>
  );
}

const sidebarStyle = {
  width: "260px",
  minHeight: "100vh",
  backgroundColor: "#1a1f2e",
  padding: "24px 16px",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  top: 0,
  left: 0,
  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  marginBottom: "10px",
};

const menuLabelStyle = {
  fontSize: "11px",
  color: "#6c757d",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  padding: "0 10px",
  margin: "10px 0 6px 0",
};

const navItemStyle = {
  padding: "12px 16px",
  borderRadius: "8px",
  color: "#adb5bd",
  cursor: "pointer",
  fontSize: "15px",
  marginBottom: "4px",
};

const activeNavItemStyle = {
  ...navItemStyle,
  backgroundColor: "#6f42c1",
  color: "white",
  fontWeight: "600",
};