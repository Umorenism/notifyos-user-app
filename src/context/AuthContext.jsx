import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Removed trailing slash so `${BASE_URL}/auth/logout` resolves cleanly
const BASE_URL = "https://support.adegroup.tech/api/v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearAuthStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("rememberMe");
    sessionStorage.removeItem("isSessionActive");
  };

  // Restore session on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const isSessionActive = sessionStorage.getItem("isSessionActive") === "true";

    if (storedUser && storedToken) {
      // If user chose NOT to be remembered and closed the tab/browser, clear session
      if (!rememberMe && !isSessionActive) {
        clearAuthStorage();
        setLoading(false);
        return;
      }

      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user");
        clearAuthStorage();
      }
    }

    setLoading(false);
  }, []);

  // Login
  const login = (userData, token, role, refreshToken, rememberMe = true) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("role", role || "user");
    localStorage.setItem("rememberMe", String(rememberMe));
    sessionStorage.setItem("isSessionActive", "true");

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    setUser(userData);
  };

  // Logout (API + cleanup)
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (token && refreshToken) {
        await axios.post(
          `${BASE_URL}/auth/logout`,
          { refreshToken },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.warn("Logout API failed (safe fallback logout)");
    } finally {
      clearAuthStorage();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}