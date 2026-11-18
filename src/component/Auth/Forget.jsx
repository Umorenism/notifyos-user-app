// import React, { useState } from "react";
// import noodles from "../../assets/noodles.svg";
// import wave from "../../assets/wave.svg";
// import logo from "../../assets/adminlogo.svg";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// export default function ForgetPassword() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Function to handle password update
//   const handleChangePassword = async () => {
//     setError("");
//     setSuccess("");

//     // Validation
//     if (!email || !password || !confirmPassword) {
//       return setError("All fields are required");
//     }
//     if (password !== confirmPassword) {
//       return setError("Passwords do not match");
//     }

//     try {
//       // Simulate API call delay
//       await new Promise((res) => setTimeout(res, 800));

//       // Dummy success (replace with real API call later)
//       console.log("Password changed for:", email);

//       setSuccess("Password updated successfully!");
//       setPassword("");
//       setConfirmPassword("");
//       setEmail("");

//       // Optionally redirect to login
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1200);
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#e8d5b7] flex items-center justify-center overflow-hidden">
//       <div className="relative w-full h-screen bg-[#e8d5b7] overflow-hidden mx-auto">
//         {/* Wave Background */}
//         <img
//           src={wave}
//           alt="wave"
//           className="absolute bottom-0 left-0 w-full h-[440px] object-cover z-[1]"
//         />

//         {/* Noodles Image */}
//         <div className="absolute left-0 bottom-10 z-10">
//           <img
//             src={noodles}
//             alt="noodles"
//             className="w-[528px] h-[528px] object-cover"
//           />
//         </div>

//         {/* Logo */}
//         <div className="absolute top-0 left-16 z-20">
//           <img src={logo} alt="Logo" className="w-[140px] object-contain" />
//         </div>

//         {/* Change Password Section */}
//         <div className="absolute right-24 top-1/2 -translate-y-1/2 z-20 w-full max-w-[520px]">
//           <div className="p-10 ">
//             <h2 className="text-[28px] font-[900] font-dm text-[#3A3A3A] text-center mb-10">
//               Change Password
//             </h2>

//             <div className="space-y-5">
//               {/* Email */}
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-6 py-4 rounded-[40px] rounded-tl-[5px] bg-gray-100 border border-gray-200 
//                            focus:border-[#a61c2f] focus:bg-white outline-none transition-all text-gray-700"
//               />

//               {/* New Password */}
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="New Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-6 py-4 rounded-[40px] rounded-tl-[5px] bg-gray-100 border border-gray-200 
//                              focus:border-[#a61c2f] focus:bg-white outline-none transition-all text-gray-700 pr-12"
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//                 >
//                   {showPassword ? <FaEye /> : <FaEyeSlash />}
//                 </span>
//               </div>

//               {/* Confirm Password */}
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full px-6 py-4 rounded-[40px] rounded-tl-[5px] bg-gray-100 border border-gray-200 
//                              focus:border-[#a61c2f] focus:bg-white outline-none transition-all text-gray-700 pr-12"
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//                 >
//                   {showPassword ? <FaEye /> : <FaEyeSlash />}
//                 </span>
//               </div>

//               {/* Error / Success */}
//               {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//               {success && <p className="text-green-500 text-sm text-center">{success}</p>}

//               {/* Update Button */}
//               <button
//                 onClick={handleChangePassword}
//                 type="button"
//                 className="w-full py-3 bg-[#a61c2f] hover:bg-[#8d1828] 
//                            text-white text-lg font-medium rounded-[12px] 
//                            shadow-lg transition-all duration-200 mt-4"
//               >
//                 Submit
//               </button>

//               {/* Optional Forgot Password Link */}
//               {/* <Link to="/forget-password" className="w-full flex justify-end mt-2">
//                 <p className="text-sm text-red-500 hover:text-gray-700 transition-colors cursor-pointer">
//                   Forgot password?
//                 </p>
//               </Link> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://support.adegroup.tech/api/v1";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !email.includes("@")) {
      return setError("Please enter a valid email address.");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/auth/forgot-password`, { email: email.trim() });
      const resData = res.data;

      if (res.status === 200 || resData?.success) {
        setSuccess(resData?.message || "Verification code sent to your email.");
        setStep(2);
      } else {
        throw new Error(resData?.message || "Failed to send reset code.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Could not process request. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp.trim()) {
      return setError("Verification code is required.");
    }

    try {
      setLoading(true);
      const payload = {
        email: email.trim(),
        code: otp.trim(),
      };

      const res = await axios.post(`${BASE_URL}/auth/verify-email`, payload);
      const resData = res.data;

      if (res.status === 200 || resData?.success) {
        // Move to Reset Password page and pass data
        navigate("/reset-password", { state: { email, otp } });
      } else {
        throw new Error(resData?.message || "Invalid verification code.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Verification failed. Please check your code.";
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

      {/* Main Centered Forgot/OTP Card */}
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-[440px] bg-white rounded-[16px] px-6 py-8 sm:px-8 sm:py-9 shadow-[0_4px_20px_rgba(15,23,42,0.04)] border border-gray-100">
          <div className="text-center mb-6">
            <h2
              className="text-[22px] sm:text-[24px] font-bold text-[#081252] mb-1.5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {step === 1 ? "Forgot Password" : "Verify OTP"}
            </h2>
            <p className="text-[12.5px] font-medium text-gray-600">
              {step === 1
                ? "Enter your account email to receive a reset code."
                : `Enter the code sent to ${email}`}
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

          <form
            onSubmit={step === 1 ? handleRequestOtp : handleVerifyOtp}
            className="space-y-4"
          >
            {step === 1 ? (
              <div>
                <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled={loading}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[38px] px-3.5 rounded-[8px] border border-[#9CA3AF] text-[12.5px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#081252] transition disabled:opacity-50"
                />
              </div>
            ) : (
              <div>
                <label className="block text-[12px] font-semibold text-[#1F2937] mb-1.5">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="375027"
                  maxLength={6}
                  disabled={loading}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 rounded-[10px] bg-white border border-[#9CA3AF] focus:border-[#081252] focus:outline-none transition-all text-[#081252] text-center text-xl sm:text-2xl tracking-[8px] font-bold placeholder:tracking-normal placeholder:font-normal placeholder:text-gray-400 disabled:opacity-50"
                />
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[38px] bg-[#081252] hover:bg-[#101f7a] text-white text-[12.5px] font-medium rounded-[8px] shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : step === 1
                  ? "Send Code"
                  : "Verify Code"}
              </button>
            </div>

            {step === 2 && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp("");
                    setError("");
                    setSuccess("");
                  }}
                  className="text-[12px] font-medium text-[#081252] hover:underline cursor-pointer"
                >
                  ← Back to email input
                </button>
              </div>
            )}
          </form>
        </div>
      </main>

     
    </div>
  );
}