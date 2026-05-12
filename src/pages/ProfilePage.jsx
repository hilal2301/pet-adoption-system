import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorScreen from "../components/ErrorScreen";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p style={pageMessageStyle}>Loading...</p>;
  if (!user) return <p style={pageMessageStyle}>Please sign in to continue.</p>;

 const mainStyle = {
  ...mainContentStyle,
  marginLeft: isMobile ? "0" : "270px",
  padding: isMobile ? "20px 16px" : "40px",
  paddingTop: isMobile ? "76px" : "40px", 
};

  return (
    <div style={pageWrapperStyle}>
      <Navbar />
      <main style={mainStyle}>
        <div style={headerSectionStyle}>
          <h2 style={titleStyle}>👤 My Profile</h2>
          <p style={subtitleStyle}>Your account information.</p>
        </div>

        <div style={cardStyle}>
          <div style={avatarStyle}>
            {user.email.charAt(0).toUpperCase()}
          </div>

          <div style={infoRowStyle}>
            <span style={labelStyle}>Email</span>
            <span style={valueStyle}>{user.email}</span>
          </div>

          <div style={infoRowStyle}>
            <span style={labelStyle}>User ID</span>
            <span style={{ ...valueStyle, fontSize: "13px", color: "#95a5a6", wordBreak: "break-all" }}>
              {user.uid}
            </span>
          </div>

          <div style={infoRowStyle}>
            <span style={labelStyle}>Role</span>
            <span style={roleBadgeStyle}>User</span>
          </div>
        </div>
      </main>
    </div>
  );
};

const pageWrapperStyle = {
  backgroundColor: "#f4f6f9",
  minHeight: "100vh",
  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const pageMessageStyle = {
  padding: "24px",
  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const mainContentStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const headerSectionStyle = {
  borderBottom: "2px solid #f97316",
  paddingBottom: "20px",
};

const titleStyle = {
  margin: 0,
  fontSize: "28px",
  color: "#f97316", 
  fontWeight: "700",
};

const subtitleStyle = {
  margin: "10px 0 0 0",
  fontSize: "16px",
  color: "#7f8c8d",
};

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  padding: "30px",
  maxWidth: "500px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  boxSizing: "border-box",
};

const avatarStyle = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  backgroundColor: "#f97316",
  color: "white",
  fontSize: "32px",
  fontWeight: "700",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const infoRowStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  borderBottom: "1px solid #e1e8ed",
  paddingBottom: "14px",
};

const labelStyle = {
  fontSize: "12px",
  color: "#7f8c8d",
  textTransform: "uppercase",
  letterSpacing: "1px",
  fontWeight: "600",
};

const valueStyle = {
  fontSize: "16px",
  color: "#2c3e50",
};

const roleBadgeStyle = {
  padding: "5px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase",
  backgroundColor: "#fff4ee",
  color: "#f97316",
  border: "1px solid #f97316",
  display: "inline-block",
  width: "fit-content",
};

export default ProfilePage;