import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const normalizeRole = (role) => role?.toLowerCase().replace(/_/g, "").trim();
  const userRole = normalizeRole(
    user?.role || user?.user_type || localStorage.getItem("role")
  );

  // 1. Show NotifyOs-themed loader while checking session
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#EEF0F9]">
        <div className="w-8 h-8 border-4 border-[#081252] border-t-transparent rounded-full animate-spin mb-3" />
        <div className="text-sm font-semibold text-[#081252]">
          Verifying your session...
        </div>
      </div>
    );
  }

  // 2. Redirect to login if token or user is missing
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Optional role check (only enforces if allowedRoles prop is passed)
  if (allowedRoles.length > 0) {
    const normalizedAllowed = allowedRoles.map(normalizeRole);
    if (!normalizedAllowed.includes(userRole)) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
}