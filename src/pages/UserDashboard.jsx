import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorScreen from "../components/ErrorScreen";
import { useAuth } from "../context/useAuth";
import { db } from "../firebase";

const petCollections = ["Evcil hayvanlar", "Evcil Hayvanlar", "pets"];

const getPetValue = (pet, keys, fallback = "") => {
  for (const key of keys) {
    if (pet[key] !== undefined && pet[key] !== null && pet[key] !== "") {
      return pet[key];
    }
  }
  return fallback;
};

const PET_IMAGES = {
  kedi: [
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=300&h=200&fit=crop",
  ],
  köpek: [
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=200&fit=crop",
  ],
  default: [
    "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&h=200&fit=crop",
  ],
};

const getPetImage = (petType, petId) => {
  const normalized = petType?.toLowerCase();
  let images;
  if (normalized === "kedi" || normalized === "cat") {
    images = PET_IMAGES["kedi"];
  } else if (normalized === "köpek" || normalized === "kopek" || normalized === "dog") {
    images = PET_IMAGES["köpek"];
  } else {
    images = PET_IMAGES["default"];
  }
  const index = petId ? petId.charCodeAt(petId.length - 1) % images.length : 0;
  return images[index];
};

const getPetEmoji = (petType) => {
  const n = petType?.toLowerCase();
  if (n === "kedi" || n === "cat") return "🐱";
  if (n === "köpek" || n === "kopek" || n === "dog") return "🐶";
  return "🐾";
};

const getPetLabel = (petType) => {
  const n = petType?.toLowerCase();
  if (n === "kedi" || n === "cat") return "CAT";
  if (n === "köpek" || n === "kopek" || n === "dog") return "DOG";
  return petType?.toUpperCase() || "ANIMAL";
};

const SkeletonCard = () => (
  <div style={petCardStyle}>
    <div style={{ ...skeletonBase, height: "140px", borderRadius: "0" }} />
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ ...skeletonBase, height: "14px", width: "50%", margin: "0 auto" }} />
      <div style={{ ...skeletonBase, height: "20px", width: "70%", margin: "0 auto" }} />
      <div style={{ ...skeletonBase, height: "12px", width: "40%", margin: "0 auto" }} />
      <div style={{ ...skeletonBase, height: "36px", borderRadius: "8px" }} />
    </div>
  </div>
);

if (!document.getElementById("dashboard-keyframes")) {
  const style = document.createElement("style");
  style.id = "dashboard-keyframes";
  style.textContent = `
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    @keyframes slideIn { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
  `;
  document.head.appendChild(style);
}

const UserDashboard = () => {
  const { user, loading } = useAuth();
  const [pets, setPets] = useState([]);
  const [petsLoading, setPetsLoading] = useState(true);
  const [petsError, setPetsError] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [toast, setToast] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const fetchPetsRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      setPetsLoading(true);
      setPetsError("");
      let lastError = null;

      for (const collectionName of petCollections) {
        try {
          const snapshot = await getDocs(collection(db, collectionName));
          const data = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
          if (data.length > 0 || collectionName === petCollections[petCollections.length - 1]) {
            setPets(data);
            setPetsLoading(false);
            return;
          }
        } catch (error) {
          lastError = error;
        }
      }

      if (lastError) {
        setPetsError("Could not load animals. Please check your connection and try again.");
      }
      setPetsLoading(false);
    };

    fetchPetsRef.current = fetchPets;
    fetchPets();
  }, [retryCount]);

  const showToast = (petName) => {
    setToast(petName);
    setTimeout(() => setToast(null), 3500);
  };

  const mainStyle = {
    ...mainContentStyle,
    marginLeft: isMobile ? "0" : "270px",
    padding: isMobile ? "20px 16px" : "40px",
    paddingTop: isMobile ? "76px" : "40px",
  };

  if (loading) return (
    <div style={pageWrapperStyle}>
      <Navbar />
      <main style={mainStyle}><LoadingSpinner message="Loading your account..." /></main>
    </div>
  );

  if (!user) return (
    <div style={pageWrapperStyle}>
      <Navbar />
      <main style={mainStyle}><ErrorScreen message="You need to sign in to view this page." /></main>
    </div>
  );

  return (
    <div style={pageWrapperStyle}>
      <Navbar />

      <main style={mainStyle}>
        <div style={headerSectionStyle}>
          <h2 style={titleStyle}>🐾 Pets Available for Adoption</h2>
          <p style={subtitleStyle}>
            Welcome back, <strong>{user.email}</strong>! Find your new best friend below.
          </p>
        </div>

        <div style={cardGridStyle}>
          {petsLoading && [1, 2, 3].map((i) => <SkeletonCard key={i} />)}

          {!petsLoading && petsError && (
            <div style={{ width: "100%" }}>
              <ErrorScreen message={petsError} onRetry={() => setRetryCount((c) => c + 1)} />
            </div>
          )}

          {!petsLoading && !petsError && pets.length === 0 && (
            <div style={emptyStateStyle}>
              <span style={{ fontSize: "36px" }}>🐾</span>
              <p style={{ margin: 0, fontWeight: "600", color: "#2c3e50" }}>No pets listed yet</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#7f8c8d" }}>Check back soon for new arrivals!</p>
            </div>
          )}

          {!petsLoading && !petsError && pets.map((pet) => {
            const petName = getPetValue(pet, ["isim", "name", "ad"], "Unnamed");
            const petType = getPetValue(pet, ["tur", "tür", "type"], "Animal");
            const petAge = getPetValue(pet, ["yas", "yaş", "age"], "?");
            const imageUrl = getPetImage(petType, pet.id);
            const emoji = getPetEmoji(petType);
            const label = getPetLabel(petType);

            return (
              <div key={pet.id} style={petCardStyle}>
                <div style={petImageWrapperStyle}>
                  <img
                    src={imageUrl}
                    alt={petName}
                    style={petImageStyle}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div style={petImageFallbackStyle}>{emoji}</div>
                </div>
                <div style={petCardBodyStyle}>
                  <div style={petTypeBadgeStyle}>{emoji} {label}</div>
                  <h3 style={petNameStyle}>{petName}</h3>
                  <p style={petMetaStyle}>{petAge} years old</p>
                  <button
                    style={adoptButtonStyle}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = "#ea6c00"; e.target.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = "#f97316"; e.target.style.transform = "translateY(0)"; }}
                    onClick={() => showToast(petName)}
                  >
                    Adopt Me
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {toast && (
        <div style={toastStyle}>
          <span style={{ fontSize: "22px" }}>🐾</span>
          <div style={{ flex: 1 }}>
            <p style={toastTitleStyle}>Request Received!</p>
            <p style={toastMessageStyle}>Your adoption request for <strong>{toast}</strong> has been sent.</p>
          </div>
          <button style={toastCloseStyle} onClick={() => setToast(null)}>✕</button>
        </div>
      )}
    </div>
  );
};

const skeletonBase = { backgroundColor: "#e8eaed", borderRadius: "6px", animation: "pulse 1.4s ease-in-out infinite" };
const pageWrapperStyle = { backgroundColor: "#f4f6f9", minHeight: "100vh", fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' };
const mainContentStyle = { display: "flex", flexDirection: "column", gap: "30px" };
const headerSectionStyle = { borderBottom: "2px solid #f97316", paddingBottom: "20px" };
const titleStyle = {
  margin: 0,
  fontSize: "28px",
  color: "#f97316", // #2c3e50 yerine
  fontWeight: "700",
};
const subtitleStyle = { margin: "10px 0 0 0", fontSize: "16px", color: "#7f8c8d" };
const cardGridStyle = { display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" };
const petCardStyle = { backgroundColor: "white", borderRadius: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.07)", overflow: "hidden", flex: "1 1 180px", maxWidth: "220px", minWidth: "160px", border: "1px solid #e8eaed" };
const petImageWrapperStyle = { width: "100%", height: "140px", overflow: "hidden", backgroundColor: "#f0f2f5" };
const petImageStyle = { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" };
const petImageFallbackStyle = { display: "none", alignItems: "center", justifyContent: "center", fontSize: "48px", width: "100%", height: "100%", backgroundColor: "#f0f2f5" };
const petCardBodyStyle = { padding: "16px", textAlign: "center" };
const petTypeBadgeStyle = { display: "inline-block", backgroundColor: "#fff4ee", color: "#f97316", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "999px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" };
const petNameStyle = { margin: "0 0 4px 0", color: "#2c3e50", fontSize: "17px", fontWeight: "700" };
const petMetaStyle = { margin: "0 0 14px 0", color: "#7f8c8d", fontSize: "13px" };
const adoptButtonStyle = { backgroundColor: "#f97316", color: "white", border: "none", padding: "9px 22px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "700", letterSpacing: "0.02em", transition: "background-color 0.2s ease, transform 0.15s ease", width: "100%" };
const emptyStateStyle = { backgroundColor: "white", borderRadius: "12px", border: "1px solid #e8eaed", padding: "40px 24px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" };
const toastStyle = { position: "fixed", bottom: "28px", right: "28px", backgroundColor: "#1a1f2e", color: "white", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 999, maxWidth: "320px", borderLeft: "4px solid #f97316", animation: "slideIn 0.3s ease" };
const toastTitleStyle = { margin: 0, fontSize: "14px", fontWeight: "700", color: "#f97316" };
const toastMessageStyle = { margin: "4px 0 0 0", fontSize: "13px", color: "#adb5bd", lineHeight: "1.4" };
const toastCloseStyle = { background: "none", border: "none", color: "#6c757d", cursor: "pointer", fontSize: "14px", padding: "0", marginLeft: "4px", alignSelf: "flex-start" };

export default UserDashboard;