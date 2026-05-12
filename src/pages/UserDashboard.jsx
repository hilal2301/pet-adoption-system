import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
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

const UserDashboard = () => {
  const { user, loading } = useAuth();
  const [pets, setPets] = useState([]);
  const [petsLoading, setPetsLoading] = useState(true);
  const [petsError, setPetsError] = useState("");

  useEffect(() => {
    let isMounted = true;

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

          if (!isMounted) return;

          if (data.length > 0 || collectionName === petCollections[petCollections.length - 1]) {
            setPets(data);
            return;
          }
        } catch (error) {
          lastError = error;
        }
      }

      if (isMounted && lastError) {
        setPetsError("Hayvanlar yuklenemedi. Firestore koleksiyon izinlerini kontrol edin.");
      }
    };

    fetchPets().finally(() => {
      if (isMounted) {
        setPetsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p style={pageMessageStyle}>Yukleniyor...</p>;
  if (!user) return <p style={pageMessageStyle}>Lutfen giris yapin.</p>;

  return (
    <div style={pageWrapperStyle}>
      <Navbar />

      <main style={mainContentStyle}>
        <div style={headerSectionStyle}>
          <h2 style={titleStyle}>Sahiplendirilebilir Hayvanlar</h2>
          <p style={subtitleStyle}>
            Hos geldin, {user.email}! Sahiplenmek istedigin hayvani sec.
          </p>
        </div>

        <div style={cardGridStyle}>
          {petsLoading && <p style={emptyStateStyle}>Hayvanlar yukleniyor...</p>}

          {!petsLoading && petsError && <p style={emptyStateStyle}>{petsError}</p>}

          {!petsLoading && !petsError && pets.length === 0 && (
            <p style={emptyStateStyle}>Henuz sahiplendirilebilir hayvan kaydi yok.</p>
          )}

          {!petsLoading &&
            !petsError &&
            pets.map((pet) => {
              const petName = getPetValue(pet, ["isim", "name", "ad"], "Isimsiz");
              const petType = getPetValue(pet, ["tur", "tür", "type"], "Hayvan");
              const petAge = getPetValue(pet, ["yas", "yaş", "age"], "?");

              return (
                <div key={pet.id} style={petCardStyle}>
                  <div style={petIconStyle}>{petType === "Kedi" ? "Kedi" : "Kopek"}</div>

                  <h3 style={petNameStyle}>{petName}</h3>

                  <p style={petMetaStyle}>
                    {petAge} yasinda · {petType}
                  </p>

                  <button
                    style={adoptButtonStyle}
                    onClick={() => alert(`${petName} icin basvurun alindi!`)}
                  >
                    Sahiplen
                  </button>
                </div>
              );
            })}
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

const petIconStyle = {
  backgroundColor: "#eef2ff",
  borderRadius: "999px",
  color: "#4f46e5",
  fontSize: "14px",
  fontWeight: "700",
  margin: "0 auto 12px",
  padding: "12px",
  width: "72px",
};

const petNameStyle = {
  margin: "0 0 6px 0",
  color: "#2c3e50",
  fontSize: "18px",
};

const petMetaStyle = {
  margin: "0 0 14px 0",
  color: "#7f8c8d",
  fontSize: "14px",
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

const emptyStateStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  color: "#7f8c8d",
  padding: "24px",
  width: "100%",
};

export default UserDashboard;
