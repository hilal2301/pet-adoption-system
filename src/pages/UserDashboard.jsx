import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const pets = [
  { id: 1, name: "Kabuş", age: 2, type: "Kedi" },
  { id: 2, name: "Pamuk", age: 1, type: "Köpek" },
  { id: 3, name: "Zeytin", age: 3, type: "Kedi" },
];

const UserDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Yükleniyor...</p>;
  if (!user) return <p>Lütfen giriş yapın.</p>;

  return (
    <div style={pageWrapperStyle}>
      <Navbar />
      <main style={mainContentStyle}>
        <div style={headerSectionStyle}>
          <h2 style={titleStyle}>🐾 Sahiplendirilebilir Hayvanlar</h2>
          <p style={subtitleStyle}>Hoş geldin, {user.email}! Sahiplenmek istediğin hayvanı seç.</p>
        </div>
        <div style={cardGridStyle}>
          {pets.map(pet => (
            <div key={pet.id} style={petCardStyle}>
              <div style={{ fontSize: "52px", marginBottom: "10px" }}>
                {pet.type === "Kedi" ? "🐱" : "🐶"}
              </div>
              <h3 style={{ margin: "0 0 6px 0", color: "#2c3e50", fontSize: "18px" }}>{pet.name}</h3>
              <p style={{ margin: "0 0 14px 0", color: "#7f8c8d", fontSize: "14px" }}>
                {pet.age} yaşında · {pet.type}
              </p>
              <button
                style={adoptButtonStyle}
                onClick={() => alert(`${pet.name} için başvurun alındı! ✅`)}
              >
                Sahiplen
              </button>
            </div>
          ))}
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

const cardGridStyle = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const petCardStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  padding: "24px",
  textAlign: "center",
  width: "180px",
};

const adoptButtonStyle = {
  backgroundColor: "#1cc88a",
  color: "white",
  border: "none",
  padding: "8px 20px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
};

export default UserDashboard;