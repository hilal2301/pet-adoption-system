import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, authPersistenceReady, db } from "../firebase";
import { getFriendlyAuthError } from "../utils/authErrors";
import { AuthContext } from "./AuthContextStore";

const roleRedirects = {
  admin: "/admin",
  staff: "/staff",
  user: "/user",
};

const normalizeRole = (role) => {
  if (["admin", "staff", "user"].includes(role)) return role;
  return "user";
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setAuthError("");

      if (!currentUser) {
        setUser(null);
        setUserProfile(null);
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        await authPersistenceReady;
        const profileRef = doc(db, "users", currentUser.uid);
        const profileSnap = await getDoc(profileRef);

        let profile = {
          uid: currentUser.uid,
          email: currentUser.email,
          role: "user",
        };

        // Existing Auth accounts may predate Firestore profiles; create the
        // minimum role document so route guards never rely on UI-only state.
        if (profileSnap.exists()) {
          profile = { ...profile, ...profileSnap.data() };
        } else {
          await setDoc(profileRef, {
            ...profile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }

        const safeRole = normalizeRole(profile.role);
        setUser(currentUser);
        setUserProfile({ ...profile, role: safeRole });
        setRole(safeRole);
      } catch (error) {
        setUser(null);
        setUserProfile(null);
        setRole(null);
        setAuthError(getFriendlyAuthError(error));
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setAuthError("");
    await authPersistenceReady;
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const profileSnap = await getDoc(doc(db, "users", credential.user.uid));
    const nextRole = normalizeRole(profileSnap.data()?.role);
    return { user: credential.user, role: nextRole };
  }, []);

  const register = useCallback(async ({ email, password, fullName }) => {
    setAuthError("");
    await authPersistenceReady;
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", credential.user.uid), {
      uid: credential.user.uid,
      email,
      fullName,
      role: "user",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { user: credential.user, role: "user" };
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
    setRole(null);
  }, []);

  const getDefaultRedirect = useCallback(
    (nextRole = role) => roleRedirects[nextRole] || "/user",
    [role]
  );

  const value = useMemo(
    () => ({
      user,
      userProfile,
      role,
      loading,
      authError,
      login,
      register,
      logout,
      getDefaultRedirect,
    }),
    [user, userProfile, role, loading, authError, login, register, logout, getDefaultRedirect]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
