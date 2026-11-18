import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://support.adegroup.tech/api/v1";

export default function VerifyOTP() {
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve email from state, with a fallback if accessed directly
  const email = location.state?.email || "";

  const handleChange = (index, value) => {
    setError("");
    // Allow only numbers
    const digit = value.replace(/\D/g, "").slice(-1);

    const newOtpArray = [...otpArray];
    newOtpArray[index] = digit;
    setOtpArray(newOtpArray);

    // Auto-focus next input if digit is entered
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on Backspace if current box is empty
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (!pastedData) return;

    const newOtpArray = ["", "", "", "", "", ""];
    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newOtpArray[i] = pastedData[i];
    }
    setOtpArray(newOtpArray);

    // Focus the next empty box or the last box
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccessMsg("");

    const fullOtp = otpArray.join("");
    if (fullOtp.length < 6) {
      return setError("Please enter the complete 6-digit verification code.");
    }
    if (!email) {
      return setError("Session email missing. Please restart verification.");
    }

    try {
      setLoading(true);
      const payload = {
        email: email.trim(),
        code: fullOtp,
      };

      const response = await axios.post(`${BASE_URL}/auth/verify-email`, payload);
      const resData = response.data;

      if (response.status === 200 || resData?.success) {
        setSuccessMsg("Email verified successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      } else {
        throw new Error(resData?.message || "Invalid verification code.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Verification failed. Please check your code and try again.";
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

      {/* Main Centered Verification Box */}
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-[440px] bg-white rounded-[16px] px-6 py-8 sm:px-8 sm:py-9 shadow-[0_4px_20px_rgba(15,23,42,0.04)] border border-gray-100">
          <div className="text-center mb-6">
            <h2
              className="text-[22px] sm:text-[24px] font-bold text-[#081252] mb-1.5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Verify OTP
            </h2>
            <p className="text-[12.5px] font-medium text-gray-600">
              Enter the verification code sent to <br />
              <span className="font-bold text-[#081252]">{email || "your email"}</span>
            </p>
          </div>

          {error && (
            <div className="mb-4 px-3.5 py-2.5 rounded-[8px] bg-[#FADAD8] text-[#D44338] text-[12px] font-medium text-center">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 px-3.5 py-2.5 rounded-[8px] bg-[#D3F3DF] text-[#288B4B] text-[12px] font-medium text-center">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            {/* 6 Digit Input Boxes */}
            <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
              {otpArray.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  disabled={loading}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-12 sm:w-12 sm:h-14 rounded-[10px] bg-white border border-[#9CA3AF] focus:border-[#081252] focus:outline-none transition-all text-[#081252] text-center text-lg sm:text-xl font-bold disabled:opacity-50 shadow-sm"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#081252] hover:bg-[#101f7a] text-white text-[13.5px] font-semibold rounded-[10px] shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        </div>
      </main>

      {/* Footer space balancer */}
      
    </div>
  );
}