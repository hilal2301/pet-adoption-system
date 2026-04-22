import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      if (!user) return;

      const userDoc = await getDoc(doc(db, "Kullanıcılar", user.uid));

      if (userDoc.exists()) {
        const role = userDoc.data().Rol;
        if (role === "admin") navigate("/admin");
        else if (role === "veteriner") navigate("/staff");
        else navigate("/user");
      } else {
        navigate("/user");
      }
    };

    if (!loading) checkRole();
  }, [user, loading]);

  return <p>Yönlendiriliyor...</p>;
}