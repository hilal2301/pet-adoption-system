import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import UserDashboard from "./pages/UserDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import Vet from "./pages/Vet";

// Role'e göre doğru sayfaya yönlendir
function RoleRedirect() {
  const { user, loading } = useAuth();

  if (loading) return <p>Yükleniyor...</p>;
  if (!user) return <Navigate to="/" replace />;

  if (user.role === "admin") return <Navigate to="/admin" replace />;
  if (user.role === "vet") return <Navigate to="/vet" replace />;
  return <Navigate to="/user" replace />;
}

// Sadece giriş yapmış + doğru role sahip kullanıcıları geçir
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Yükleniyor...</p>;
  if (!user) return <Navigate to="/" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Yetkisi yok — kendi paneline at
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "vet") return <Navigate to="/vet" replace />;
    return <Navigate to="/user" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
<Routes>

  {/* Public */}
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Login sonrası */}
  <Route path="/redirect" element={<RoleRedirect />} />

  {/* Admin */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/users"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <UserManagement />
      </ProtectedRoute>
    }
  />

  {/* Vet */}
  <Route
    path="/vet"
    element={
      <ProtectedRoute allowedRoles={["vet"]}>
        <Vet />
      </ProtectedRoute>
    }
  />

  {/* User */}
  <Route
    path="/user"
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <UserDashboard />
      </ProtectedRoute>
    }
  />

  {/* Profile */}
  <Route
    path="/profile"
    element={
      <ProtectedRoute allowedRoles={["admin", "vet", "user"]}>
        <ProfilePage />
      </ProtectedRoute>
    }
  />

  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}