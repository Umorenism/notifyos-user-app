import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute"; // Adjust path as needed
import DashboardLayout from "./component/Dashboard/Dashboard";

// Auth Components
import Login from "./component/Auth/Login"; 
import RegisterPage from "./component/Auth/Register"; // Adjust path as needed
import VerifyOTP from "./component/Auth/VerifyOTP"; // Adjust path as needed
import ForgetPassword from "./component/Auth/Forget"; // Adjust path as needed
import ResetPassword from "./component/Auth/ResetPassword"; // Adjust path as needed

// Dashboard Views
import MessagingOverviewDashboard from "./pages/Overview";
import MessagesPage from "./pages/Messaging";
import SenderIds from "./pages/SenderIds";
import Wallet from "./pages/Wallet";
import BillingPage from "./pages/Billing";
import Settings from "./pages/Settings";
import APIKeys from "./pages/APIKeys";
import TemplatesAndWebhooks from "./pages/Templates";

export default function App() {
  return (
    <AuthProvider>
      {/* <Router> */}
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }  
          >
            {/* Nested Dashboard Views */}
            <Route index element={<MessagingOverviewDashboard />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="sender-ids" element={<SenderIds />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="templetes" element={<TemplatesAndWebhooks />} />
            <Route path="api-keys" element={<APIKeys />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      {/* </Router> */}
    </AuthProvider>
  );
}