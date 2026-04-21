import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Yükleniyor...</p>;
  if (!user) return <p>Lütfen giriş yapın.</p>;

  return (
    <div style={pageWrapperStyle}>
      <Navbar />
      <main style={mainContentStyle}>
        <div style={headerSectionStyle}>
          <h2 style={titleStyle}>👤 Profilim</h2>
          <p style={subtitleStyle}>Hesap bilgileriniz.</p>
        </div>
        <div style={cardStyle}>
          <div style={avatarStyle}>
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div style={infoRowStyle}>
            <span style={labelStyle}>E-posta</span>
            <span style={valueStyle}>{user.email}</span>
          </div>
          <div style={infoRowStyle}>
            <span style={labelStyle}>Kullanıcı ID</span>
            <span style={valueStyle}>{user.uid}</span>
          </div>
          <div style={infoRowStyle}>
            <span style={labelStyle}>Rol</span>
            <span style={roleBadgeStyle}>Kullanıcı</span>
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

const mainContentStyle = {
  marginLeft: "270px",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const headerSectionStyle = {
  borderBottom: "2px solid #e1e8ed",
  paddingBottom: "20px",
};

const titleStyle = {
  margin: 0,
  fontSize: "28px",
  color: "#2c3e50",
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
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const avatarStyle = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  backgroundColor: "#6f42c1",
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
  backgroundColor: "#f6c23e",
  color: "#34495e",
  display: "inline-block",
  width: "fit-content",
};

export default ProfilePage;