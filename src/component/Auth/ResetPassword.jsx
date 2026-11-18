import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://support.adegroup.tech/api/v1";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      return setError("All fields are required.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (!email || !otp) {
      return setError("Session expired or missing verification details. Please restart.");
    }

    try {
      setLoading(true);
      const payload = {
        email: email.trim(),
        code: otp.trim(),
        password: password,
      };

      const res = await axios.post(`${BASE_URL}/auth/reset-password`, payload);
      const resData = res.data;

      if (res.status === 200 || resData?.success) {
        setSuccess("Password updated successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        throw new Error(resData?.message || "Failed to reset password.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while updating your password.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-[#EEF0F9] flex flex-col justify-between p-4 sm:p-8 select-none text-[#0D163A]"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top Brand Header */}
      <header className="w-full max-w-[1200px] mx-auto">
        <div className="inline-flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[8px] bg-gradient-to-br from-[#3720D8] to-[#1D0F9E] flex items-center justify-center shadow-sm p-1">
            <div className="w-full h-full rounded-[5px] border-[1.8px] border-white flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 19V5l12 14V5" />
                <line x1="4" y1="9" x2="20" y2="15" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
          <span
            className="text-[22px] sm:text-[24px] font-bold text-[#081252] tracking-[-0.01em]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            NotifyOs
          </span>
        </div>
      </header>

      {/* Main Centered Reset Card */}
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-[440px] bg-white rounded-[16px] px-6 py-8 sm:px-8 sm:py-9 shadow-[0_4px_20px_rgba(15,23,42,0.04)] border border-gray-100">
          <div className="text-center mb-6">
            <h2
              className="text-[22px] sm:text-[24px] font-bold text-[#081252] mb-1.5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Reset Password
            </h2>
            <p className="text-[12.5px] font-medium text-gray-600">
              Please enter your new password below.
            </p>
          </div>

          {error && (
            <div className="mb-4 px-3.5 py-2.5 rounded-[8px] bg-[#FADAD8] text-[#D44338] text-[12px] font-medium text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 px-3.5 py-2.5 rounded-[8px] bg-[#D3F3DF] text-[#288B4B] text-[12px] font-medium text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  disabled={loading}
                  placeholder="• • • • • • •"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[38px] pl-3.5 pr-10 rounded-[8px] border border-[#9CA3AF] text-[12.5px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#081252] transition disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827] cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  disabled={loading}
                  placeholder="• • • • • • •"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-[38px] pl-3.5 pr-10 rounded-[8px] border border-[#9CA3AF] text-[12.5px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#081252] transition disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[38px] bg-[#081252] hover:bg-[#101f7a] text-white text-[12.5px] font-medium rounded-[8px] shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
     
    </div>
  );
}