import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import StaffDashboard from "./pages/StaffDashboard";
import UserDashboard from "./pages/UserDashboard";

import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";

import Vet from './pages/Vet';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Yükleniyor...</p>;

  if (!user) return <Navigate to="/" replace />;

  return children;
}
<Route path="/" element={<Login />} />

// 🚀 Route yapısı
function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/user"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/staff"
        element={
          <PrivateRoute>
            <StaffDashboard />
          </PrivateRoute>
        }
      />



      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />

      <Route path="/vet" element={<Vet />} />

      {/* ❗ Hatalı route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

  );
}

// 🔥 App
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}