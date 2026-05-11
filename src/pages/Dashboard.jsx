import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

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

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
