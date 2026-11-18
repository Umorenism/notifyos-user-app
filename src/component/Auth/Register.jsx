import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://support.adegroup.tech/api/v1";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!formData.businessName.trim()) {
      setError("Please enter your business name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.businessName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: "developer",
        phone: formData.phone.trim(),
        country: formData.country.trim(),
      };

      const response = await axios.post(`${BASE_URL}/auth/register`, payload);
      const resData = response.data;

      if (resData && (resData.success || resData.token || resData.data)) {
        setSuccessMsg("Account created! Sending verification code...");
        setTimeout(() => {
          // Redirect to verify-otp page and pass the user's email via state
          navigate("/verify-otp", { state: { email: formData.email.trim() } });
        }, 1500);
      } else {
        throw new Error(resData?.message || "Registration failed.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "An error occurred during registration. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#EEF0F9] text-[#0D163A] flex flex-col px-4 py-5 sm:px-8 sm:py-6 selection:bg-[#081252] selection:text-white"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top-Left NotifyOs Brand Logo */}
      <header className="w-full max-w-[1200px] mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2.5 select-none">
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

      {/* Centered Registration Card */}
      <main className="flex-1 flex items-center justify-center pb-8">
        <div className="w-full max-w-[440px] bg-white rounded-[12px] px-6 py-7 sm:px-8 sm:py-8 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <div className="mb-6">
            <h1
              className="text-[22px] sm:text-[24px] font-bold text-[#081252] leading-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Create your account
            </h1>
            <p className="text-[12.5px] font-medium text-[#1F2937] mt-1">
              Start Sending messages in minutes
            </p>
          </div>

          {error && (
            <div className="mb-4 px-3 py-2 rounded-[8px] bg-[#FADAD8] text-[#D44338] text-[12px] font-medium">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 px-3 py-2.5 rounded-[8px] bg-[#D3F3DF] text-[#288B4B] text-[12px] font-medium">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Business Name */}
            <div>
              <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                disabled={loading}
                value={formData.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                placeholder="Emee Ltd."
                className="w-full h-[38px] px-3.5 rounded-[8px] border border-[#9CA3AF] text-[12.5px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#081252] transition disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
                Email
              </label>
              <input
                type="email"
                disabled={loading}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="emee@gmail.com"
                className="w-full h-[38px] px-3.5 rounded-[8px] border border-[#9CA3AF] text-[12.5px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#081252] transition disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  disabled={loading}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="• • • • • • •"
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
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  placeholder="• • • • • • •"
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

            {/* Phone & Country Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  disabled={loading}
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+234 459 456 6745"
                  className="w-full h-[38px] px-3.5 rounded-[8px] border border-[#9CA3AF] text-[12px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#081252] transition disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  disabled={loading}
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  placeholder="Nigeria"
                  className="w-full h-[38px] px-3.5 rounded-[8px] border border-[#9CA3AF] text-[12px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#081252] transition disabled:opacity-50"
                />
              </div>
            </div>

            {/* Remember me Checkbox */}
            <div className="pt-0.5">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleChange("rememberMe", e.target.checked)}
                  className="w-3.5 h-3.5 rounded-[3px] border-[#6B7280] accent-[#081252] cursor-pointer"
                />
                <span className="text-[12px] font-semibold text-[#1F2937]">
                  Remember me
                </span>
              </label>
            </div>

            {/* Continue Button */}
            <div className="pt-3 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full max-w-[205px] h-[38px] rounded-[8px] bg-[#081252] hover:bg-[#101f7a] text-white text-[12.5px] font-medium shadow-sm transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}