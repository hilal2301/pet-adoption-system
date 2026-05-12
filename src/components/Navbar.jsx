import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const navItems = [
  { label: "🐾 Animals", path: "/user" },
  { label: "📋 Requests", path: "/staff" },
  { label: "👤 My Profile", path: "/profile" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  if (isMobile) {
    return (
      <>
        {/* Top bar */}
        <div style={mobileTopBarStyle}>
          <div style={logoStyle}>
            <span style={{ fontSize: "22px" }}>🐾</span>
            <span style={{ fontSize: "17px", fontWeight: "700", color: "white" }}>PetAdopt</span>
          </div>
          <button style={hamburgerStyle} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Dropdown menu */}
        {menuOpen && (
          <div style={mobileMenuStyle}>
            <p style={menuLabelStyle}>MENU</p>
            {navItems.map((item) => (
              <div
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                style={
                  location.pathname === item.path
                    ? mobileActiveNavItemStyle
                    : mobileNavItemStyle
                }
              >
                {item.label}
              </div>
            ))}
            <p style={menuLabelStyle}>SYSTEM</p>
            <div onClick={handleLogout} style={mobileNavItemStyle}>
              🚪 Sign Out
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>
        <span style={{ fontSize: "28px" }}>🐾</span>
        <span style={{ fontSize: "20px", fontWeight: "700", color: "white" }}>PetAdopt</span>
      </div>

      <div style={{ marginTop: "30px" }}>
        <p style={menuLabelStyle}>MENU</p>
        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={
              location.pathname === item.path ? activeNavItemStyle : navItemStyle
            }
          >
            {item.label}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <p style={menuLabelStyle}>SYSTEM</p>
        <div onClick={handleLogout} style={navItemStyle}>
          🚪 Sign Out
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
  zIndex: 100,
};

const mobileTopBarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "56px",
  backgroundColor: "#1a1f2e",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 16px",
  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  zIndex: 200,
};

const mobileMenuStyle = {
  position: "fixed",
  top: "56px",
  left: 0,
  right: 0,
  backgroundColor: "#1a1f2e",
  padding: "12px 16px 20px",
  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  zIndex: 199,
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
};

const hamburgerStyle = {
  background: "none",
  border: "none",
  color: "white",
  fontSize: "22px",
  cursor: "pointer",
  padding: "4px 8px",
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
  backgroundColor: "#2d3348",
  color: "white",
  fontWeight: "600",
  borderLeft: "3px solid #f97316", 
};

const mobileNavItemStyle = {
  ...navItemStyle,
  fontSize: "16px",
  padding: "14px 16px",
};

const mobileActiveNavItemStyle = {
  ...mobileNavItemStyle,
  backgroundColor: "#f97316",
  color: "white",
  fontWeight: "600",
};