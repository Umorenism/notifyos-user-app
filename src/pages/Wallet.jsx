// import React, { useState } from "react";

// const PRESET_AMOUNTS = [5000, 10000, 20000, 50000, 100000, 200000];

// const INITIAL_TRANSACTIONS = [
//   {
//     id: 1,
//     type: "fund",
//     title: "Fund Wallet",
//     subtitle: "NotifyOS Wallet",
//     amount: 20000,
//     time: "2:15 PM",
//   },
//   {
//     id: 2,
//     type: "withdrawal",
//     title: "Withdrawal",
//     subtitle: "Bank Transfer",
//     amount: 50000,
//     time: "2:15 PM",
//   },
// ];

// export default function WalletPage() {
//   const [balance, setBalance] = useState(480220);
//   const [selectedAmount, setSelectedAmount] = useState(50000);
//   const [customAmountInput, setCustomAmountInput] = useState("₦5,000");
//   const [isUsingCustom, setIsUsingCustom] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("Card");
//   const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
//   const [statusBanner, setStatusBanner] = useState(null);

//   const handleSelectPreset = (amount) => {
//     setSelectedAmount(amount);
//     setIsUsingCustom(false);
//   };

//   const handleCustomInputChange = (e) => {
//     const rawDigits = e.target.value.replace(/[^0-9]/g, "");
//     if (!rawDigits) {
//       setCustomAmountInput("");
//       setIsUsingCustom(true);
//       setSelectedAmount(0);
//       return;
//     }
//     const numeric = parseInt(rawDigits, 10);
//     setCustomAmountInput(`₦${numeric.toLocaleString()}`);
//     setSelectedAmount(numeric);
//     setIsUsingCustom(true);
//   };

//   const handleAddFunds = (e) => {
//     e.preventDefault();
//     if (!selectedAmount || selectedAmount <= 0) {
//       setStatusBanner({
//         text: "Please select or enter a valid amount to fund your wallet.",
//         isError: true,
//       });
//       setTimeout(() => setStatusBanner(null), 3000);
//       return;
//     }

//     const now = new Date();
//     const formattedTime = now.toLocaleTimeString([], {
//       hour: "numeric",
//       minute: "2-digit",
//     });

//     const newTx = {
//       id: Date.now(),
//       type: "fund",
//       title: "Fund Wallet",
//       subtitle: paymentMethod === "Card" ? "NotifyOS Wallet" : "Bank Transfer",
//       amount: selectedAmount,
//       time: formattedTime,
//     };

//     setBalance((prev) => prev + selectedAmount);
//     setTransactions((prev) => [newTx, ...prev]);
//     setStatusBanner({
//       text: `Successfully added ₦${selectedAmount.toLocaleString()} via ${paymentMethod}.`,
//       isError: false,
//     });
//     setTimeout(() => setStatusBanner(null), 3500);
//   };

//   return (
//     <div
//       className="min-h-screen bg-[#EEF0F9] text-[#0D163A] px-4 py-6 sm:px-8 sm:py-8 selection:bg-[#081252] selection:text-white"
//       style={{
//         fontFamily:
//           "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//       }}
//     >
//       <div className="max-w-[920px] mx-auto">
//         {/* Header[cite: 4] */}
//         <header className="mb-6">
//           <h1
//             className="text-[24px] sm:text-[26px] font-bold text-[#0A1344] leading-tight tracking-[-0.01em]"
//             style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//           >
//             Wallet[cite: 4]
//           </h1>
//           <p className="text-[12.5px] font-medium text-[#1F2937] mt-0.5">
//             Fund Your Wallet To Send Messages Across All Channels[cite: 4]
//           </p>
//         </header>

//         {/* Wallet Balance Banner[cite: 4] */}
//         <section className="bg-[#081252] text-white rounded-[14px] px-6 py-6 sm:px-8 sm:py-7 shadow-[0_4px_14px_rgba(8,18,82,0.16)] mb-7">
//           <div className="flex items-center gap-2 text-white/95 mb-2.5">
//             {/* Wallet Icon[cite: 4] */}
//             <svg
//               className="w-[18px] h-[18px]"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
//               <path d="M16 7V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" />
//               <circle cx="17" cy="14" r="1" fill="currentColor" />
//             </svg>
//             <span className="text-[13px] font-medium tracking-[0.01em]">
//               Wallet Balance[cite: 4]
//             </span>
//           </div>

//           <div className="text-[28px] sm:text-[32px] font-bold tracking-[-0.01em] tabular-nums">
//             ₦{balance.toLocaleString()}[cite: 4]
//           </div>
//         </section>

//         {/* Two-Column Main Grid[cite: 4] */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
//           {/* Left Card: Fund Your Wallet (7 cols on desktop)[cite: 4] */}
//           <section className="lg:col-span-7 bg-white rounded-[14px] border border-[#D1D5E6] p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
//             <h2
//               className="text-[19px] sm:text-[20px] font-bold text-[#0A1344] mb-5"
//               style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//             >
//               Fund Your Wallet[cite: 4]
//             </h2>

//             {statusBanner && (
//               <div
//                 className={`mb-4 px-3.5 py-2 rounded-lg text-[12.5px] font-medium ${
//                   statusBanner.isError
//                     ? "bg-[#FADAD8] text-[#D44338]"
//                     : "bg-[#D3F3DF] text-[#288B4B]"
//                 }`}
//               >
//                 {statusBanner.text}
//               </div>
//             )}

//             <form onSubmit={handleAddFunds}>
//               {/* Preset Amount Grid (3x2)[cite: 4] */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-5">
//                 {PRESET_AMOUNTS.map((amount) => {
//                   const isSelected = !isUsingCustom && selectedAmount === amount;
//                   return (
//                     <button
//                       key={amount}
//                       type="button"
//                       onClick={() => handleSelectPreset(amount)}
//                       className={`h-[44px] rounded-[10px] border text-[13.5px] font-semibold transition cursor-pointer tabular-nums ${
//                         isSelected
//                           ? "bg-[#E2E4F3] border-[#081252] text-[#081252]"
//                           : "bg-white border-[#8E95A9] text-[#111827] hover:border-[#081252]"
//                       }`}
//                     >
//                       ₦{amount.toLocaleString()}[cite: 4]
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Custom Amount (NGN)[cite: 4] */}
//               <div className="mb-5">
//                 <label className="block text-[13px] font-semibold text-[#111827] mb-2">
//                   Custom Amount (NGN)[cite: 4]
//                 </label>
//                 <textarea
//                   rows={3}
//                   value={customAmountInput}
//                   onChange={handleCustomInputChange}
//                   onFocus={() => {
//                     const digits = customAmountInput.replace(/[^0-9]/g, "");
//                     if (digits) {
//                       setSelectedAmount(parseInt(digits, 10));
//                       setIsUsingCustom(true);
//                     }
//                   }}
//                   placeholder="₦5,000"
//                   className={`w-full p-3.5 rounded-[10px] border text-[13.5px] font-medium text-[#111827] placeholder-[#6B7280] focus:outline-none transition resize-none ${
//                     isUsingCustom
//                       ? "border-[#081252] bg-[#FAFBFD]"
//                       : "border-[#8E95A9] bg-white focus:border-[#081252]"
//                   }`}
//                 />
//               </div>

//               {/* Payment Method[cite: 4] */}
//               <div className="mb-6">
//                 <label className="block text-[13px] font-semibold text-[#111827] mb-2.5">
//                   Payment Method[cite: 4]
//                 </label>
//                 <div className="flex flex-wrap items-center gap-3.5">
//                   {/* Card Button[cite: 4] */}
//                   <button
//                     type="button"
//                     onClick={() => setPaymentMethod("Card")}
//                     className={`flex-1 sm:flex-initial min-w-[165px] h-[42px] px-4 rounded-[10px] border inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold transition cursor-pointer ${
//                       paymentMethod === "Card"
//                         ? "bg-[#E2E4F3] border-[#081252] text-[#081252]"
//                         : "bg-white border-[#8E95A9] text-[#111827] hover:border-[#081252]"
//                     }`}
//                   >
//                     {/* Blue Card Icon[cite: 4] */}
//                     <svg
//                       className="w-4 h-4 text-[#4C9AFF]"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                     >
//                       <rect x="2" y="5" width="20" height="14" rx="2" />
//                       <rect x="2" y="8" width="20" height="2.5" fill="#1E40AF" />
//                       <rect x="5" y="14" width="5" height="2" rx="0.5" fill="#DBEAFE" />
//                     </svg>
//                     <span>Card[cite: 4]</span>
//                   </button>

//                   {/* Bank Transfer Button[cite: 4] */}
//                   <button
//                     type="button"
//                     onClick={() => setPaymentMethod("Bank Transfer")}
//                     className={`flex-1 sm:flex-initial min-w-[175px] h-[42px] px-4 rounded-[10px] border inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold transition cursor-pointer ${
//                       paymentMethod === "Bank Transfer"
//                         ? "bg-[#E2E4F3] border-[#081252] text-[#081252]"
//                         : "bg-white border-[#8E95A9] text-[#111827] hover:border-[#081252]"
//                     }`}
//                   >
//                     {/* Bank Icon[cite: 4] */}
//                     <svg
//                       className="w-4 h-4 text-[#6B7280]"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <polygon points="12 2 2 7 22 7 12 2" />
//                       <line x1="6" y1="10" x2="6" y2="18" />
//                       <line x1="10" y1="10" x2="10" y2="18" />
//                       <line x1="14" y1="10" x2="14" y2="18" />
//                       <line x1="18" y1="10" x2="18" y2="18" />
//                       <line x1="3" y1="21" x2="21" y2="21" />
//                     </svg>
//                     <span>Bank Transfer[cite: 4]</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Primary Submit Button[cite: 4] */}
//               <button
//                 type="submit"
//                 className="w-full h-[44px] rounded-[10px] bg-[#081252] hover:bg-[#101f7a] text-white text-[13.5px] font-semibold shadow-sm transition cursor-pointer tabular-nums"
//               >
//                 Add ₦{selectedAmount.toLocaleString()} to Wallet[cite: 4]
//               </button>
//             </form>
//           </section>

//           {/* Right Card: Recent Transactions (5 cols on desktop)[cite: 4] */}
//           <section className="lg:col-span-5 bg-white rounded-[14px] border border-[#D1D5E6] p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.03)] flex flex-col">
//             <h2
//               className="text-[19px] sm:text-[20px] font-bold text-[#0A1344] mb-4"
//               style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//             >
//               Recent Transactions[cite: 4]
//             </h2>

//             <p
//               className="text-[15px] font-medium text-[#111827] mb-3.5"
//               style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//             >
//               Today[cite: 4]
//             </p>

//             <div className="space-y-4">
//               {transactions.map((tx) => {
//                 const isFund = tx.type === "fund";
//                 return (
//                   <div
//                     key={tx.id}
//                     className="flex items-start justify-between gap-3"
//                   >
//                     {/* Left Icon & Details[cite: 4] */}
//                     <div className="flex items-start gap-2.5">
//                       <div className="mt-1 shrink-0">
//                         {isFund ? (
//                           /* Solid Green Down Arrow[cite: 4] */
//                           <svg
//                             className="w-4 h-4 text-[#16A34A]"
//                             viewBox="0 0 24 24"
//                             fill="currentColor"
//                           >
//                             <path d="M12 20l-7-7h4V4h6v9h4l-7 7z" />
//                           </svg>
//                         ) : (
//                           /* Solid Red Up Arrow[cite: 4] */
//                           <svg
//                             className="w-4 h-4 text-[#DC2626]"
//                             viewBox="0 0 24 24"
//                             fill="currentColor"
//                           >
//                             <path d="M12 4l7 7h-4v9H9v-9H5l7-7z" />
//                           </svg>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-[13px] font-semibold text-[#111827] leading-snug">
//                           {tx.title}[cite: 4]
//                         </p>
//                         <p className="text-[11px] font-medium text-[#4B5563] mt-0.5">
//                           {tx.subtitle}[cite: 4]
//                         </p>
//                       </div>
//                     </div>

//                     {/* Right Amount & Time[cite: 4] */}
//                     <div className="text-right shrink-0">
//                       <p className="text-[13px] font-bold text-[#111827] leading-snug tabular-nums">
//                         ₦{tx.amount.toLocaleString()}[cite: 4]
//                       </p>
//                       <p className="text-[11px] font-medium text-[#4B5563] mt-0.5 tabular-nums">
//                         {tx.time}[cite: 4]
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://support.adegroup.tech/api/v1";

const PRESET_AMOUNTS = [5000, 10000, 20000, 50000, 100000, 200000];

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(50000);
  const [customAmountInput, setCustomAmountInput] = useState("₦5,000");
  const [isUsingCustom, setIsUsingCustom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [transactions, setTransactions] = useState([]);
  const [statusBanner, setStatusBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Wallet Balance and Transactions on mount
  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // Get Wallet Balance & Transactions concurrently
      const [walletRes, txRes] = await Promise.all([
        axios.get(`${BASE_URL}/wallet`, { headers }),
        axios.get(`${BASE_URL}/wallet/transactions?page=1`, { headers }),
      ]);

      if (walletRes.data) {
        const bal =
          walletRes.data.balance ??
          walletRes.data.data?.balance ??
          walletRes.data.wallet?.balance;
        if (typeof bal === "number") setBalance(bal);
      }

      if (txRes.data) {
        const txList =
          txRes.data.transactions ||
          txRes.data.data?.transactions ||
          txRes.data.data ||
          [];
        if (Array.isArray(txList)) {
          const formatted = txList.map((tx, index) => ({
            id: tx.id || index,
            type: tx.type || (tx.amount > 0 ? "fund" : "withdrawal"),
            title: tx.title || tx.description || "Wallet Transaction",
            subtitle: tx.subtitle || tx.gateway || "NotifyOS Wallet",
            amount: Math.abs(Number(tx.amount) || 0),
            time: tx.time || new Date(tx.createdAt || Date.now()).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          }));
          setTransactions(formatted);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch wallet data from API, using fallback state.");
    }
  };

  const handleSelectPreset = (amount) => {
    setSelectedAmount(amount);
    setIsUsingCustom(false);
  };

  const handleCustomInputChange = (e) => {
    const rawDigits = e.target.value.replace(/[^0-9]/g, "");
    if (!rawDigits) {
      setCustomAmountInput("");
      setIsUsingCustom(true);
      setSelectedAmount(0);
      return;
    }
    const numeric = parseInt(rawDigits, 10);
    setCustomAmountInput(`₦${numeric.toLocaleString()}`);
    setSelectedAmount(numeric);
    setIsUsingCustom(true);
  };

  const handleAddFunds = async (e) => {
    e.preventDefault();
    if (!selectedAmount || selectedAmount <= 0) {
      setStatusBanner({
        text: "Please select or enter a valid amount to fund your wallet.",
        isError: true,
      });
      setTimeout(() => setStatusBanner(null), 3000);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const payload = {
        amount: Number(selectedAmount).toFixed(2),
        paymentMethod: paymentMethod.toLowerCase().replace(/\s+/g, ""),
      };

      const res = await axios.post(`${BASE_URL}/wallet/fund`, payload, { headers });
      const resData = res.data?.data || res.data;
      const reference = resData?.reference || resData?.ref || `wallet-${Math.random().toString(36).substring(2)}`;

      // Optional verification call to confirm funding transaction
      try {
        await axios.post(`${BASE_URL}/wallet/verify`, { reference }, { headers });
      } catch (verifyErr) {
        console.warn("Verification auto-call note:", verifyErr);
      }

      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      const newTx = {
        id: Date.now(),
        type: "fund",
        title: "Fund Wallet",
        subtitle: paymentMethod === "Card" ? "NotifyOS Wallet" : "Bank Transfer",
        amount: selectedAmount,
        time: formattedTime,
      };

      setBalance((prev) => prev + selectedAmount);
      setTransactions((prev) => [newTx, ...prev]);
      setStatusBanner({
        text: `Successfully added ₦${selectedAmount.toLocaleString()} via ${paymentMethod}.`,
        isError: false,
      });
      setTimeout(() => setStatusBanner(null), 3500);
    } catch (err) {
      setStatusBanner({
        text: err.response?.data?.message || err.message || "Failed to initiate wallet funding.",
        isError: true,
      });
      setTimeout(() => setStatusBanner(null), 3500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#EEF0F9] text-[#0D163A] px-4 py-6 sm:px-8 sm:py-8 selection:bg-[#081252] selection:text-white"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Increased Max Width Container */}
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Header */}
        <header className="mb-6">
          <h1
            className="text-[24px] sm:text-[26px] font-bold text-[#0A1344] leading-tight tracking-[-0.01em]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Wallet
          </h1>
          <p className="text-[12.5px] font-medium text-[#1F2937] mt-0.5">
            Fund Your Wallet To Send Messages Across All Channels
          </p>
        </header>

        {/* Wallet Balance Banner */}
        <section className="bg-[#081252] text-white rounded-[14px] px-6 py-6 sm:px-8 sm:py-7 shadow-[0_4px_14px_rgba(8,18,82,0.16)] mb-7">
          <div className="flex items-center gap-2 text-white/95 mb-2.5">
            {/* Wallet Icon */}
            <svg
              className="w-[18px] h-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              <path d="M16 7V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" />
              <circle cx="17" cy="14" r="1" fill="currentColor" />
            </svg>
            <span className="text-[13px] font-medium tracking-[0.01em]">
              Wallet Balance
            </span>
          </div>

          <div className="text-[28px] sm:text-[32px] font-bold tracking-[-0.01em] tabular-nums">
            ₦{balance.toLocaleString()}
          </div>
        </section>

        {/* Two-Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Fund Your Wallet */}
          <section className="lg:col-span-7 bg-white rounded-[14px] border border-[#D1D5E6] p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
            <h2
              className="text-[19px] sm:text-[20px] font-bold text-[#0A1344] mb-5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Fund Your Wallet
            </h2>

            {statusBanner && (
              <div
                className={`mb-4 px-3.5 py-2 rounded-lg text-[12.5px] font-medium ${
                  statusBanner.isError
                    ? "bg-[#FADAD8] text-[#D44338]"
                    : "bg-[#D3F3DF] text-[#288B4B]"
                }`}
              >
                {statusBanner.text}
              </div>
            )}

            <form onSubmit={handleAddFunds}>
              {/* Preset Amount Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-5">
                {PRESET_AMOUNTS.map((amount) => {
                  const isSelected = !isUsingCustom && selectedAmount === amount;
                  return (
                    <button
                      key={amount}
                      type="button"
                      disabled={loading}
                      onClick={() => handleSelectPreset(amount)}
                      className={`h-[44px] rounded-[10px] border text-[13.5px] font-semibold transition cursor-pointer tabular-nums ${
                        isSelected
                          ? "bg-[#E2E4F3] border-[#081252] text-[#081252]"
                          : "bg-white border-[#8E95A9] text-[#111827] hover:border-[#081252]"
                      }`}
                    >
                      ₦{amount.toLocaleString()}
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount (NGN) */}
              <div className="mb-5">
                <label className="block text-[13px] font-semibold text-[#111827] mb-2">
                  Custom Amount (NGN)
                </label>
                <textarea
                  rows={3}
                  disabled={loading}
                  value={customAmountInput}
                  onChange={handleCustomInputChange}
                  onFocus={() => {
                    const digits = customAmountInput.replace(/[^0-9]/g, "");
                    if (digits) {
                      setSelectedAmount(parseInt(digits, 10));
                      setIsUsingCustom(true);
                    }
                  }}
                  placeholder="₦5,000"
                  className={`w-full p-3.5 rounded-[10px] border text-[13.5px] font-medium text-[#111827] placeholder-[#6B7280] focus:outline-none transition resize-none ${
                    isUsingCustom
                      ? "border-[#081252] bg-[#FAFBFD]"
                      : "border-[#8E95A9] bg-white focus:border-[#081252]"
                  }`}
                />
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-[13px] font-semibold text-[#111827] mb-2.5">
                  Payment Method
                </label>
                <div className="flex flex-wrap items-center gap-3.5">
                  {/* Card Button */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setPaymentMethod("Card")}
                    className={`flex-1 sm:flex-initial min-w-[165px] h-[42px] px-4 rounded-[10px] border inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold transition cursor-pointer ${
                      paymentMethod === "Card"
                        ? "bg-[#E2E4F3] border-[#081252] text-[#081252]"
                        : "bg-white border-[#8E95A9] text-[#111827] hover:border-[#081252]"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-[#4C9AFF]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <rect x="2" y="8" width="20" height="2.5" fill="#1E40AF" />
                      <rect x="5" y="14" width="5" height="2" rx="0.5" fill="#DBEAFE" />
                    </svg>
                    <span>Card</span>
                  </button>

                  {/* Bank Transfer Button */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setPaymentMethod("Bank Transfer")}
                    className={`flex-1 sm:flex-initial min-w-[175px] h-[42px] px-4 rounded-[10px] border inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold transition cursor-pointer ${
                      paymentMethod === "Bank Transfer"
                        ? "bg-[#E2E4F3] border-[#081252] text-[#081252]"
                        : "bg-white border-[#8E95A9] text-[#111827] hover:border-[#081252]"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-[#6B7280]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 2 7 22 7 12 2" />
                      <line x1="6" y1="10" x2="6" y2="18" />
                      <line x1="10" y1="10" x2="10" y2="18" />
                      <line x1="14" y1="10" x2="14" y2="18" />
                      <line x1="18" y1="10" x2="18" y2="18" />
                      <line x1="3" y1="21" x2="21" y2="21" />
                    </svg>
                    <span>Bank Transfer</span>
                  </button>
                </div>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[44px] rounded-[10px] bg-[#081252] hover:bg-[#101f7a] text-white text-[13.5px] font-semibold shadow-sm transition cursor-pointer tabular-nums disabled:opacity-50"
              >
                {loading ? "Processing..." : `Add ₦${selectedAmount.toLocaleString()} to Wallet`}
              </button>
            </form>
          </section>

          {/* Right Card: Recent Transactions */}
          <section className="lg:col-span-5 bg-white rounded-[14px] border border-[#D1D5E6] p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.03)] flex flex-col">
            <h2
              className="text-[19px] sm:text-[20px] font-bold text-[#0A1344] mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Recent Transactions
            </h2>

            <p
              className="text-[15px] font-medium text-[#111827] mb-3.5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Today
            </p>

            <div className="space-y-4">
              {transactions.length === 0 ? (
                <p className="text-xs text-gray-500">No recent transactions found.</p>
              ) : (
                transactions.map((tx) => {
                  const isFund = tx.type === "fund" || tx.type === "credit";
                  return (
                    <div
                      key={tx.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-1 shrink-0">
                          {isFund ? (
                            <svg
                              className="w-4 h-4 text-[#16A34A]"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 20l-7-7h4V4h6v9h4l-7 7z" />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4 text-[#DC2626]"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 4l7 7h-4v9H9v-9H5l7-7z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#111827] leading-snug">
                            {tx.title}
                          </p>
                          <p className="text-[11px] font-medium text-[#4B5563] mt-0.5">
                            {tx.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-[13px] font-bold text-[#111827] leading-snug tabular-nums">
                          ₦{tx.amount.toLocaleString()}
                        </p>
                        <p className="text-[11px] font-medium text-[#4B5563] mt-0.5 tabular-nums">
                          {tx.time}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}