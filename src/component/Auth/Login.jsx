






// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";
// import { Link, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { useAuth } from "../../context/AuthContext";
// import { loginUser } from "../../api/apiServices"; // Converted from loginAdmin to loginUser
// import logo from "../../assets/logoicon.svg";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
  
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async (e) => {
//     if (e) e.preventDefault();

//     const trimmedEmail = email.trim();
//     if (!trimmedEmail || !password) {
//       return toast.error("Email and password are required.");
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(trimmedEmail)) {
//       return toast.error("Please enter a valid email address.");
//     }

//     setLoading(true);

//     try {
//       // Converted API service call from loginAdmin to loginUser
//       const { user, token, refreshToken, role } = await loginUser({
//         email: trimmedEmail,
//         password,
//       });

//       login(user, token, role, refreshToken);

//       if (!rememberMe) {
//         sessionStorage.setItem("isSessionActive", "true");
//       }

//       toast.success("Login Successful!");
//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       const errorMsg = 
//         err.response?.data?.message || 
//         err.message || 
//         "Invalid credentials or network error.";
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#f7f9fc] flex items-center justify-center p-4 relative overflow-hidden select-none font-sans text-[#1c2333]">
//       <Toaster position="top-center" reverseOrder={false} />

//       {/* Main Form Container */}
//       <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative border border-gray-100">

//         {/* NotifyOs Brand Header */}
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-md mb-3 bg-[#0a194f]">
//             <img src={logo} alt="NotifyOs Logo" className="w-7 h-7" />
//           </div>
//           <span className="text-xl font-bold tracking-tight text-[#0a194f]">
//             NotifyOs
//           </span>
//         </div>

//         <div className="mb-6 text-center">
//           <h3 className="text-2xl md:text-3xl font-extrabold text-[#0a194f] tracking-tight mb-1">
//             Welcome back
//           </h3>
//           <p className="text-xs text-gray-500 font-medium">
//             Sign in to access your NotifyOs dashboard
//           </p>
//         </div>

//         {/* Form Inputs */}
//         <form onSubmit={handleLogin} className="space-y-4" autoComplete="on">
//           <div>
//             <label className="block text-xs font-semibold text-gray-700 mb-1.5">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               autoComplete="email"
//               placeholder="emee@gmail.com"
//               value={email}
//               disabled={loading}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#0a194f] placeholder:text-gray-400 focus:outline-none focus:border-[#0a194f] transition-colors disabled:opacity-50"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-gray-700 mb-1.5">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 autoComplete="current-password"
//                 placeholder="••••••"
//                 value={password}
//                 disabled={loading}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#0a194f] placeholder:text-gray-400 focus:outline-none focus:border-[#0a194f] transition-colors pr-10 disabled:opacity-50"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
//                 aria-label="Toggle password visibility"
//               >
//                 {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center justify-between pt-1">
//             <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-gray-600 select-none">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 className="w-4 h-4 rounded border-gray-300 text-[#0a194f] focus:ring-0 cursor-pointer"
//               />
//               Remember me
//             </label>
            
//             <Link
//               to="/forgot-password"
//               className="text-xs font-semibold text-[#0a194f] hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <div className="pt-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3.5 bg-[#0a194f] hover:bg-blue-900 text-white rounded-xl text-sm font-semibold transition shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
//             >
//               {loading ? "Authenticating..." : "Sign In"}
//             </button>
//           </div>

//           {/* Register Prompt */}
//           <div className="text-center pt-3 text-xs text-gray-500 font-medium">
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="font-bold text-[#0a194f] hover:underline"
//             >
//               Create an account
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }








import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/apiServices"; 
import logo from "../../assets/logoicon.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      return toast.error("Email and password are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return toast.error("Please enter a valid email address.");
    }

    setLoading(true);

    try {
      const { user, token, refreshToken, role } = await loginUser({
        email: trimmedEmail,
        password,
      });

      login(user, token, role, refreshToken);

      if (!rememberMe) {
        sessionStorage.setItem("isSessionActive", "true");
      }

      toast.success("Login Successful!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const errorMsg = 
        err.response?.data?.message || 
        err.message || 
        "Invalid credentials or network error.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Instant Dashboard Bypass for Development & Testing
  const handleBypassLogin = () => {
    const mockUser = { name: "NotifyOs Developer", email: "developer@adegroup.tech" };
    const mockToken = "mock_jwt_token_bypass_12345";
    const mockRole = "admin";
    const mockRefreshToken = "mock_refresh_token_12345";

    // Call your AuthContext login handler
    login(mockUser, mockToken, mockRole, mockRefreshToken);
    sessionStorage.setItem("isSessionActive", "true");

    toast.success("Bypassed Login Successfully!");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f9fc] flex items-center justify-center p-4 relative overflow-hidden select-none font-sans text-[#1c2333]">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Main Form Container */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative border border-gray-100">

        {/* NotifyOs Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-md mb-3 bg-[#0a194f]">
            <img src={logo} alt="NotifyOs Logo" className="w-7 h-7" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0a194f]">
            NotifyOs
          </span>
        </div>

        <div className="mb-6 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#0a194f] tracking-tight mb-1">
            Welcome back
          </h3>
          <p className="text-xs text-gray-500 font-medium">
            Sign in to access your NotifyOs dashboard
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="space-y-4" autoComplete="on">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="emee@gmail.com"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#0a194f] placeholder:text-gray-400 focus:outline-none focus:border-[#0a194f] transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="••••••"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#0a194f] placeholder:text-gray-400 focus:outline-none focus:border-[#0a194f] transition-colors pr-10 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-gray-600 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#0a194f] focus:ring-0 cursor-pointer"
              />
              Remember me
            </label>
            
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-[#0a194f] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0a194f] hover:bg-blue-900 text-white rounded-xl text-sm font-semibold transition shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>

            {/* QUICK BYPASS BUTTON FOR TESTING */}
            {/* <button
              type="button"
              onClick={handleBypassLogin}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <span>⚡ Quick Bypass to Dashboard</span>
            </button> */}
          </div>

          {/* Register Prompt */}
          <div className="text-center pt-3 text-xs text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#0a194f] hover:underline"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}