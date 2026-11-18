// import React, { useState, useRef } from "react";

// const INITIAL_LOGS = [
//   {
//     id: "Msg_8f2a91",
//     recipient: "+234 803 220 66221",
//     channel: "SMS",
//     provider: "Termii",
//     status: "Delivered",
//     sent: "Today, 11:42 AM",
//     date: "2026-11-17",
//   },
//   {
//     id: "Msg_7c19b0",
//     recipient: "sadeadeleke@gmail.com",
//     channel: "Email",
//     provider: "Amazon SES",
//     status: "Delivered",
//     sent: "Today, 11:41 AM",
//     date: "2026-11-17",
//   },
//   {
//     id: "Msg_3b7712",
//     recipient: "+234 809 003 2214",
//     channel: "OTP",
//     provider: "Akuuk",
//     status: "Pending",
//     sent: "Today, 11:41 AM",
//     date: "2026-11-17",
//   },
//   {
//     id: "Msg_9d41c4",
//     recipient: "chikaobi@yahoo.com",
//     channel: "Email",
//     provider: "SendGrid",
//     status: "Failed",
//     sent: "Today, 11:39 AM",
//     date: "2026-11-17",
//   },
//   {
//     id: "Msg_1a9077",
//     recipient: "+234 815 667 0093",
//     channel: "Whatsapp",
//     provider: "Termii",
//     status: "Delivered",
//     sent: "Today, 11:35 AM",
//     date: "2026-11-17",
//   },
//   {
//     id: "Msg_5e22aa",
//     recipient: "+234 706 441 8820",
//     channel: "SMS",
//     provider: "Twilio",
//     status: "Delivered",
//     sent: "Today, 11:30 AM",
//     date: "2026-11-17",
//   },
//   {
//     id: "Msg_6f10bd",
//     recipient: "tunde.oye@outlook.com",
//     channel: "Email",
//     provider: "Mailgun",
//     status: "Pending",
//     sent: "Today, 11:22 AM",
//     date: "2026-11-17",
//   },
//   {
//     id: "Msg_2c88e1",
//     recipient: "+234 802 118 5540",
//     channel: "SMS",
//     provider: "Termii",
//     status: "Failed",
//     sent: "Today, 11:15 AM",
//     date: "2026-11-17",
//   },
// ];

// const CHANNELS = ["SMS", "Email", "Whatsapp", "OTP"];

// const CHANNEL_CONFIG = {
//   SMS: {
//     senderLabel: "From (Sender ID)",
//     senderPlaceholder: "Your app",
//     recipientPlaceholder: "+234 800 000 0000",
//     contentPlaceholder: "Your one-time password is 124567",
//     defaultProvider: "Termii",
//   },
//   Email: {
//     senderLabel: "From (Sender Email)",
//     senderPlaceholder: "noreply@yourapp.com",
//     recipientPlaceholder: "user@example.com",
//     contentPlaceholder: "Welcome to our platform! Your verification code is 124567",
//     defaultProvider: "Amazon SES",
//   },
//   Whatsapp: {
//     senderLabel: "From (Sender ID)",
//     senderPlaceholder: "Your app",
//     recipientPlaceholder: "+234 800 000 0000",
//     contentPlaceholder: "Hello! Your order #124567 has been confirmed.",
//     defaultProvider: "Termii",
//   },
//   OTP: {
//     senderLabel: "From (Sender ID)",
//     senderPlaceholder: "Your app",
//     recipientPlaceholder: "+234 800 000 0000",
//     contentPlaceholder: "Your one-time password is 124567",
//     defaultProvider: "Akuuk",
//   },
// };

// export default function MessagesPage() {
//   const [selectedChannel, setSelectedChannel] = useState("SMS");
//   const [senderId, setSenderId] = useState("");
//   const [recipients, setRecipients] = useState("");
//   const [messageContent, setMessageContent] = useState("");
//   const [logs, setLogs] = useState(INITIAL_LOGS);

//   // Filter States
//   const [channelFilter, setChannelFilter] = useState("All Channels");
//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [dateFilter, setDateFilter] = useState("");
//   const [feedback, setFeedback] = useState(null);

//   const fileInputRef = useRef(null);
//   const dateInputRef = useRef(null);

//   const activeConfig = CHANNEL_CONFIG[selectedChannel];

//   // Handle CSV Upload to populate recipients
//   const handleCsvUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const text = event.target?.result;
//       if (typeof text === "string") {
//         const parsed = text
//           .split(/[\r\n,]+/)
//           .map((item) => item.trim())
//           .filter(
//             (item) =>
//               item &&
//               !["phone", "email", "recipient", "recipients", "number"].includes(
//                 item.toLowerCase()
//               )
//           );

//         if (parsed.length > 0) {
//           setRecipients((prev) =>
//             prev ? `${prev}, ${parsed.join(", ")}` : parsed.join(", ")
//           );
//           showFeedback(`Imported ${parsed.length} recipient(s) from ${file.name}`);
//         } else {
//           showFeedback("No valid recipients found in CSV.", true);
//         }
//       }
//     };
//     reader.readAsText(file);
//     e.target.value = "";
//   };

//   const showFeedback = (msg, isError = false) => {
//     setFeedback({ msg, isError });
//     setTimeout(() => setFeedback(null), 3500);
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();

//     const parsedRecipients = recipients
//       .split(/[\r\n,]+/)
//       .map((r) => r.trim())
//       .filter(Boolean);

//     if (parsedRecipients.length === 0) {
//       showFeedback("Please enter at least one recipient.", true);
//       return;
//     }

//     if (!messageContent.trim()) {
//       showFeedback("Please enter message content.", true);
//       return;
//     }

//     const now = new Date();
//     const formattedTime = now.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const isoDate = now.toISOString().split("T")[0];

//     const newEntries = parsedRecipients.map((recipient) => {
//       const randomHex = Math.floor(0x100000 + Math.random() * 0x8fffff).toString(16);
//       return {
//         id: `Msg_${randomHex}`,
//         recipient,
//         channel: selectedChannel,
//         provider: activeConfig.defaultProvider,
//         status: "Delivered",
//         sent: `Today, ${formattedTime}`,
//         date: isoDate,
//       };
//     });

//     setLogs((prev) => [...newEntries, ...prev]);
//     setRecipients("");
//     setMessageContent("");
//     showFeedback(
//       `Sent ${newEntries.length} ${selectedChannel} message${
//         newEntries.length > 1 ? "s" : ""
//       } successfully.`
//     );
//   };

//   const getStatusBadgeStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//         return "bg-[#D3F3DF] text-[#288B4B]";
//       case "Pending":
//         return "bg-[#FBEAD1] text-[#D48A27]";
//       case "Failed":
//         return "bg-[#FADAD8] text-[#D44338]";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const filteredLogs = logs.filter((log) => {
//     const matchesChannel =
//       channelFilter === "All Channels" || log.channel === channelFilter;
//     const matchesStatus =
//       statusFilter === "All Status" || log.status === statusFilter;
//     const matchesDate = !dateFilter || log.date === dateFilter;
//     return matchesChannel && matchesStatus && matchesDate;
//   });

//   return (
//     <div
//       className="min-h-screen bg-[#EEF0F9] text-[#0D163A] px-4 py-6 sm:px-8 sm:py-8 selection:bg-[#081252] selection:text-white"
//       style={{
//         fontFamily:
//           "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//       }}
//     >
//       <div className="max-w-[920px] mx-auto">
//         {/* Page Header[cite: 2] */}
//         <header className="mb-5">
//           <h1
//             className="text-[24px] sm:text-[26px] font-bold text-[#0A1344] leading-tight tracking-[-0.01em]"
//             style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//           >
//             Messages[cite: 2]
//           </h1>
//           <p className="text-[12.5px] font-medium text-[#1F2937] mt-0.5">
//             View All Sent Messages And Their Delivery Status[cite: 2]
//           </p>
//         </header>

//         {/* Send a New Message Card[cite: 2] */}
//         <section className="bg-white rounded-[16px] p-5 sm:p-7 shadow-[0_3px_12px_rgba(15,23,42,0.04)] mb-8">
//           <h2
//             className="text-[19px] sm:text-[21px] font-bold text-[#0A1344] mb-5"
//             style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//           >
//             Send a new message[cite: 2]
//           </h2>

//           {/* Channel Selector Tabs[cite: 2] */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
//             {CHANNELS.map((channel) => {
//               const isActive = selectedChannel === channel;
//               return (
//                 <button
//                   key={channel}
//                   type="button"
//                   onClick={() => setSelectedChannel(channel)}
//                   className={`h-[38px] rounded-[8px] text-[13px] font-medium transition cursor-pointer ${
//                     isActive
//                       ? "bg-[#081252] text-white shadow-sm"
//                       : "bg-[#D5D3DF] text-[#3F4156] hover:bg-[#c8c6d4]"
//                   }`}
//                 >
//                   {channel}[cite: 2]
//                 </button>
//               );
//             })}
//           </div>

//           {/* Feedback Toast */}
//           {feedback && (
//             <div
//               className={`mb-4 px-3.5 py-2 rounded-lg text-[12.5px] font-medium ${
//                 feedback.isError
//                   ? "bg-[#FADAD8] text-[#D44338]"
//                   : "bg-[#D3F3DF] text-[#288B4B]"
//               }`}
//             >
//               {feedback.msg}
//             </div>
//           )}

//           {/* Form[cite: 2] */}
//           <form onSubmit={handleSendMessage} className="space-y-4">
//             {/* From (Sender ID)[cite: 2] */}
//             <div>
//               <label className="block text-[13px] font-semibold text-[#111827] mb-1.5">
//                 {activeConfig.senderLabel}[cite: 2]
//               </label>
//               <input
//                 type="text"
//                 value={senderId}
//                 onChange={(e) => setSenderId(e.target.value)}
//                 placeholder={activeConfig.senderPlaceholder}
//                 className="w-full h-[38px] px-3.5 rounded-[8px] border border-[#9CA3AF] text-[13px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#081252] transition"
//               />
//             </div>

//             {/* Recipient (s)[cite: 2] */}
//             <div>
//               <label className="block text-[13px] font-semibold text-[#111827] mb-1.5">
//                 Recipient (s)[cite: 2]
//               </label>
//               <textarea
//                 rows={3}
//                 value={recipients}
//                 onChange={(e) => setRecipients(e.target.value)}
//                 placeholder={activeConfig.recipientPlaceholder}
//                 className="w-full p-3.5 rounded-[8px] border border-[#9CA3AF] text-[13px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#081252] transition resize-y"
//               />
//               <div className="mt-1">
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept=".csv,.txt"
//                   onChange={handleCsvUpload}
//                   className="hidden"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => fileInputRef.current?.click()}
//                   className="text-[12.5px] font-medium text-[#081252] underline underline-offset-2 hover:text-[#1e2d8f] cursor-pointer"
//                 >
//                   Import CSV[cite: 2]
//                 </button>
//               </div>
//             </div>

//             {/* Message Content[cite: 2] */}
//             <div>
//               <label className="block text-[13px] font-semibold text-[#111827] mb-1.5">
//                 Message Content[cite: 2]
//               </label>
//               <textarea
//                 rows={3}
//                 value={messageContent}
//                 onChange={(e) => setMessageContent(e.target.value)}
//                 placeholder={activeConfig.contentPlaceholder}
//                 className="w-full p-3.5 rounded-[8px] border border-[#9CA3AF] text-[13px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#081252] transition resize-y"
//               />
//             </div>

//             {/* Send Message Submit Button[cite: 2] */}
//             <div className="pt-1">
//               <button
//                 type="submit"
//                 className="inline-flex items-center justify-center gap-2 bg-[#081252] hover:bg-[#101f7a] text-white text-[13px] font-medium px-6 h-[38px] rounded-[8px] shadow-sm transition cursor-pointer"
//               >
//                 {/* Paper Plane Icon[cite: 2] */}
//                 <svg
//                   className="w-4 h-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <line x1="22" y1="2" x2="11" y2="13" />
//                   <polygon points="22 2 15 22 11 13 2 9 22 2" />
//                 </svg>
//                 <span>Send Message[cite: 2]</span>
//               </button>
//             </div>
//           </form>
//         </section>

//         {/* Message Log Section[cite: 2] */}
//         <section>
//           {/* Header & Filter Controls[cite: 2] */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
//             <h2
//               className="text-[19px] sm:text-[20px] font-bold text-[#0A1344]"
//               style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//             >
//               Message Log[cite: 2]
//             </h2>

//             <div className="flex flex-wrap items-center gap-2.5">
//               {/* All Channels Dropdown[cite: 2] */}
//               <div className="relative">
//                 <select
//                   value={channelFilter}
//                   onChange={(e) => setChannelFilter(e.target.value)}
//                   className="appearance-none bg-white border border-[#9CA3AF] rounded-[8px] pl-3.5 pr-8 h-[32px] text-[12px] font-medium text-[#1F2937] focus:outline-none focus:border-[#081252] cursor-pointer"
//                 >
//                   <option value="All Channels">All Channels[cite: 2]</option>
//                   <option value="SMS">SMS[cite: 2]</option>
//                   <option value="Email">Email[cite: 2]</option>
//                   <option value="Whatsapp">Whatsapp[cite: 2]</option>
//                   <option value="OTP">OTP[cite: 2]</option>
//                 </select>
//                 <svg
//                   className="w-3.5 h-3.5 text-[#1F2937] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <polyline points="6 9 12 15 18 9" />
//                 </svg>
//               </div>

//               {/* All Status Dropdown[cite: 2] */}
//               <div className="relative">
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="appearance-none bg-white border border-[#9CA3AF] rounded-[8px] pl-3.5 pr-8 h-[32px] text-[12px] font-medium text-[#1F2937] focus:outline-none focus:border-[#081252] cursor-pointer"
//                 >
//                   <option value="All Status">All Status[cite: 2]</option>
//                   <option value="Delivered">Delivered[cite: 2]</option>
//                   <option value="Pending">Pending[cite: 2]</option>
//                   <option value="Failed">Failed[cite: 2]</option>
//                 </select>
//                 <svg
//                   className="w-3.5 h-3.5 text-[#1F2937] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <polyline points="6 9 12 15 18 9" />
//                 </svg>
//               </div>

//               {/* Date Filter Input (dd/mm/yy)[cite: 2] */}
//               <div
//                 onClick={() => dateInputRef.current?.showPicker?.()}
//                 className="relative flex items-center justify-between bg-white border border-[#9CA3AF] rounded-[8px] px-3 h-[32px] min-w-[125px] text-[12px] font-medium text-[#1F2937] cursor-pointer"
//               >
//                 <span>
//                   {dateFilter
//                     ? new Date(dateFilter).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "2-digit",
//                       })
//                     : "dd/mm/yy[cite: 2]"}
//                 </span>
//                 <input
//                   ref={dateInputRef}
//                   type="date"
//                   value={dateFilter}
//                   onChange={(e) => setDateFilter(e.target.value)}
//                   className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
//                   aria-label="Filter by date"
//                 />
//                 {dateFilter ? (
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setDateFilter("");
//                     }}
//                     className="relative z-10 text-gray-500 hover:text-gray-800 ml-1 text-[11px]"
//                     title="Clear date"
//                   >
//                     ✕
//                   </button>
//                 ) : (
//                   <svg
//                     className="w-3.5 h-3.5 text-[#1F2937] ml-2 shrink-0"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//                     <line x1="16" y1="2" x2="16" y2="6" />
//                     <line x1="8" y1="2" x2="8" y2="6" />
//                     <line x1="3" y1="10" x2="21" y2="10" />
//                   </svg>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Responsive Log Table[cite: 2] */}
//           <div className="overflow-x-auto rounded-[8px]">
//             <table className="w-full min-w-[740px] border-collapse text-left">
//               <thead>
//                 <tr className="bg-[#DFDBE5] text-[#111827] text-[11px] font-bold uppercase tracking-[0.03em]">
//                   <th className="py-2.5 px-4 rounded-tl-[6px]">MESSAGE ID[cite: 2]</th>
//                   <th className="py-2.5 px-4">RECIPIENT[cite: 2]</th>
//                   <th className="py-2.5 px-4">CHANNEL[cite: 2]</th>
//                   <th className="py-2.5 px-4">PROVIDER[cite: 2]</th>
//                   <th className="py-2.5 px-4 text-center">STATUS[cite: 2]</th>
//                   <th className="py-2.5 px-4 rounded-tr-[6px]">SENT[cite: 2]</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-transparent text-[12.5px]">
//                 {filteredLogs.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="py-8 text-center text-[#4B5563] bg-white/60 rounded-b-[8px]"
//                     >
//                       No messages match the selected filters.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredLogs.map((log) => (
//                     <tr
//                       key={log.id}
//                       className="hover:bg-white/60 transition-colors"
//                     >
//                       <td className="py-3 px-4 font-semibold text-[#111827] tabular-nums">
//                         {log.id}[cite: 2]
//                       </td>
//                       <td className="py-3 px-4 font-semibold text-[#111827]">
//                         {log.recipient}[cite: 2]
//                       </td>
//                       <td className="py-3 px-4 font-semibold text-[#1F2937]">
//                         {log.channel}[cite: 2]
//                       </td>
//                       <td className="py-3 px-4 font-semibold text-[#1F2937]">
//                         {log.provider}[cite: 2]
//                       </td>
//                       <td className="py-3 px-4 text-center">
//                         <span
//                           className={`inline-flex items-center justify-center min-w-[92px] px-3.5 py-0.5 rounded-full text-[11.5px] font-semibold ${getStatusBadgeStyle(
//                             log.status
//                           )}`}
//                         >
//                           {log.status}[cite: 2]
//                         </span>
//                       </td>
//                       <td className="py-3 px-4 font-semibold text-[#1F2937] whitespace-nowrap">
//                         {log.sent}[cite: 2]
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }







import React, { useState, useRef } from "react";
import axios from "axios";

const BASE_URL = "https://support.adegroup.tech/api/v1";

const INITIAL_LOGS = [
  {
    id: "Msg_8f2a91",
    recipient: "+234 803 220 66221",
    channel: "SMS",
    provider: "Termii",
    status: "Delivered",
    sent: "Today, 11:42 AM",
    date: "2026-11-17",
  },
  {
    id: "Msg_7c19b0",
    recipient: "sadeadeleke@gmail.com",
    channel: "Email",
    provider: "Amazon SES",
    status: "Delivered",
    sent: "Today, 11:41 AM",
    date: "2026-11-17",
  },
  {
    id: "Msg_3b7712",
    recipient: "+234 809 003 2214",
    channel: "OTP",
    provider: "Akuuk",
    status: "Pending",
    sent: "Today, 11:41 AM",
    date: "2026-11-17",
  },
  {
    id: "Msg_9d41c4",
    recipient: "chikaobi@yahoo.com",
    channel: "Email",
    provider: "SendGrid",
    status: "Failed",
    sent: "Today, 11:39 AM",
    date: "2026-11-17",
  },
  {
    id: "Msg_1a9077",
    recipient: "+234 815 667 0093",
    channel: "Whatsapp",
    provider: "Termii",
    status: "Delivered",
    sent: "Today, 11:35 AM",
    date: "2026-11-17",
  },
  {
    id: "Msg_5e22aa",
    recipient: "+234 706 441 8820",
    channel: "SMS",
    provider: "Twilio",
    status: "Delivered",
    sent: "Today, 11:30 AM",
    date: "2026-11-17",
  },
  {
    id: "Msg_6f10bd",
    recipient: "tunde.oye@outlook.com",
    channel: "Email",
    provider: "Mailgun",
    status: "Pending",
    sent: "Today, 11:22 AM",
    date: "2026-11-17",
  },
  {
    id: "Msg_2c88e1",
    recipient: "+234 802 118 5540",
    channel: "SMS",
    provider: "Termii",
    status: "Failed",
    sent: "Today, 11:15 AM",
    date: "2026-11-17",
  },
];

const CHANNELS = ["SMS", "Email", "Whatsapp", "OTP"];

const CHANNEL_CONFIG = {
  SMS: {
    senderLabel: "From (Sender ID)",
    senderPlaceholder: "Your app",
    recipientPlaceholder: "+234 800 000 0000",
    contentPlaceholder: "Your one-time password is 124567",
    defaultProvider: "Termii",
  },
  Email: {
    senderLabel: "From (Sender Email)",
    senderPlaceholder: "noreply@yourapp.com",
    recipientPlaceholder: "user@example.com",
    contentPlaceholder: "Welcome to our platform! Your verification code is 124567",
    defaultProvider: "Amazon SES",
  },
  Whatsapp: {
    senderLabel: "From (Sender ID)",
    senderPlaceholder: "Your app",
    recipientPlaceholder: "+234 800 000 0000",
    contentPlaceholder: "Hello! Your order #124567 has been confirmed.",
    defaultProvider: "Termii",
  },
  OTP: {
    senderLabel: "From (Sender ID)",
    senderPlaceholder: "Your app",
    recipientPlaceholder: "+234 800 000 0000",
    contentPlaceholder: "Your one-time password is 124567",
    defaultProvider: "Akuuk",
  },
};

export default function MessagesPage() {
  const [selectedChannel, setSelectedChannel] = useState("SMS");
  const [senderId, setSenderId] = useState("");
  const [recipients, setRecipients] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [channelFilter, setChannelFilter] = useState("All Channels");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("");
  const [feedback, setFeedback] = useState(null);

  const fileInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const activeConfig = CHANNEL_CONFIG[selectedChannel];

  // Handle CSV Upload to populate recipients
  const handleCsvUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        const parsed = text
          .split(/[\r\n,]+/)
          .map((item) => item.trim())
          .filter(
            (item) =>
              item &&
              !["phone", "email", "recipient", "recipients", "number"].includes(
                item.toLowerCase()
              )
          );

        if (parsed.length > 0) {
          setRecipients((prev) =>
            prev ? `${prev}, ${parsed.join(", ")}` : parsed.join(", ")
          );
          showFeedback(`Imported ${parsed.length} recipient(s) from ${file.name}`);
        } else {
          showFeedback("No valid recipients found in CSV.", true);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const showFeedback = (msg, isError = false) => {
    setFeedback({ msg, isError });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const parsedRecipients = recipients
      .split(/[\r\n,]+/)
      .map((r) => r.trim())
      .filter(Boolean);

    if (parsedRecipients.length === 0) {
      showFeedback("Please enter at least one recipient.", true);
      return;
    }

    if (!messageContent.trim()) {
      showFeedback("Please enter message content.", true);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const payload = {
        channel: selectedChannel.toLowerCase(),
        recipients: parsedRecipients,
        content: messageContent.trim(),
        type: "text",
      };

      await axios.post(`${BASE_URL}/messages`, payload, { headers });

      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const isoDate = now.toISOString().split("T")[0];

      const newEntries = parsedRecipients.map((recipient) => {
        const randomHex = Math.floor(0x100000 + Math.random() * 0x8fffff).toString(16);
        return {
          id: `Msg_${randomHex}`,
          recipient,
          channel: selectedChannel,
          provider: activeConfig.defaultProvider,
          status: "Delivered",
          sent: `Today, ${formattedTime}`,
          date: isoDate,
        };
      });

      setLogs((prev) => [...newEntries, ...prev]);
      setRecipients("");
      setMessageContent("");
      showFeedback(
        `Sent ${newEntries.length} ${selectedChannel} message${
          newEntries.length > 1 ? "s" : ""
        } successfully.`
      );
    } catch (err) {
      showFeedback(
        err.response?.data?.message || err.message || "Failed to send message.",
        true
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-[#D3F3DF] text-[#288B4B]";
      case "Pending":
        return "bg-[#FBEAD1] text-[#D48A27]";
      case "Failed":
        return "bg-[#FADAD8] text-[#D44338]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesChannel =
      channelFilter === "All Channels" || log.channel === channelFilter;
    const matchesStatus =
      statusFilter === "All Status" || log.status === statusFilter;
    const matchesDate = !dateFilter || log.date === dateFilter;
    return matchesChannel && matchesStatus && matchesDate;
  });

  return (
    <div
      className="min-h-screen bg-[#EEF0F9] text-[#0D163A] px-4 py-6 sm:px-8 sm:py-8 selection:bg-[#081252] selection:text-white"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Page Header */}
        <header className="mb-5">
          <h1
            className="text-[24px] sm:text-[26px] font-bold text-[#0A1344] leading-tight tracking-[-0.01em]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Messages
          </h1>
          <p className="text-[12.5px] font-medium text-[#1F2937] mt-0.5">
            View All Sent Messages And Their Delivery Status
          </p>
        </header>

        {/* Send a New Message Card */}
        <section className="bg-white rounded-[16px] p-5 sm:p-7 shadow-[0_3px_12px_rgba(15,23,42,0.04)] border border-[#D1D5E6] mb-8">
          <h2
            className="text-[19px] sm:text-[21px] font-bold text-[#0A1344] mb-5"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Send a new message
          </h2>

          {/* Channel Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
            {CHANNELS.map((channel) => {
              const isActive = selectedChannel === channel;
              return (
                <button
                  key={channel}
                  type="button"
                  disabled={loading}
                  onClick={() => setSelectedChannel(channel)}
                  className={`h-[38px] rounded-[8px] text-[13px] font-medium transition cursor-pointer ${
                    isActive
                      ? "bg-[#081252] text-white shadow-sm"
                      : "bg-[#D5D3DF] text-[#3F4156] hover:bg-[#c8c6d4]"
                  }`}
                >
                  {channel}
                </button>
              );
            })}
          </div>

          {/* Feedback Toast */}
          {feedback && (
            <div
              className={`mb-4 px-3.5 py-2 rounded-lg text-[12.5px] font-medium ${
                feedback.isError
                  ? "bg-[#FADAD8] text-[#D44338]"
                  : "bg-[#D3F3DF] text-[#288B4B]"
              }`}
            >
              {feedback.msg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSendMessage} className="space-y-4">
            {/* From (Sender ID) */}
            <div>
              <label className="block text-[13px] font-semibold text-[#111827] mb-1.5">
                {activeConfig.senderLabel}
              </label>
              <input
                type="text"
                disabled={loading}
                value={senderId}
                onChange={(e) => setSenderId(e.target.value)}
                placeholder={activeConfig.senderPlaceholder}
                className="w-full h-[38px] px-3.5 rounded-[8px] border border-[#9CA3AF] text-[13px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#081252] transition disabled:opacity-50"
              />
            </div>

            {/* Recipient (s) */}
            <div>
              <label className="block text-[13px] font-semibold text-[#111827] mb-1.5">
                Recipient (s)
              </label>
              <textarea
                rows={3}
                disabled={loading}
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder={activeConfig.recipientPlaceholder}
                className="w-full p-3.5 rounded-[8px] border border-[#9CA3AF] text-[13px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#081252] transition resize-y disabled:opacity-50"
              />
              <div className="mt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleCsvUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[12.5px] font-medium text-[#081252] underline underline-offset-2 hover:text-[#1e2d8f] cursor-pointer"
                >
                  Import CSV
                </button>
              </div>
            </div>

            {/* Message Content */}
            <div>
              <label className="block text-[13px] font-semibold text-[#111827] mb-1.5">
                Message Content
              </label>
              <textarea
                rows={3}
                disabled={loading}
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder={activeConfig.contentPlaceholder}
                className="w-full p-3.5 rounded-[8px] border border-[#9CA3AF] text-[13px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#081252] transition resize-y disabled:opacity-50"
              />
            </div>

            {/* Send Message Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-[#081252] hover:bg-[#101f7a] text-white text-[13px] font-medium px-6 h-[38px] rounded-[8px] shadow-sm transition cursor-pointer disabled:opacity-50"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <span>{loading ? "Sending..." : "Send Message"}</span>
              </button>
            </div>
          </form>
        </section>

        {/* Message Log Section */}
        <section>
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2
              className="text-[19px] sm:text-[20px] font-bold text-[#0A1344]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Message Log
            </h2>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* All Channels Dropdown */}
              <div className="relative">
                <select
                  value={channelFilter}
                  onChange={(e) => setChannelFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#9CA3AF] rounded-[8px] pl-3.5 pr-8 h-[32px] text-[12px] font-medium text-[#1F2937] focus:outline-none focus:border-[#081252] cursor-pointer"
                >
                  <option value="All Channels">All Channels</option>
                  <option value="SMS">SMS</option>
                  <option value="Email">Email</option>
                  <option value="Whatsapp">Whatsapp</option>
                  <option value="OTP">OTP</option>
                </select>
                <svg
                  className="w-3.5 h-3.5 text-[#1F2937] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* All Status Dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#9CA3AF] rounded-[8px] pl-3.5 pr-8 h-[32px] text-[12px] font-medium text-[#1F2937] focus:outline-none focus:border-[#081252] cursor-pointer"
                >
                  <option value="All Status">All Status</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
                <svg
                  className="w-3.5 h-3.5 text-[#1F2937] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Date Filter Input (dd/mm/yy) */}
              <div
                onClick={() => dateInputRef.current?.showPicker?.()}
                className="relative flex items-center justify-between bg-white border border-[#9CA3AF] rounded-[8px] px-3 h-[32px] min-w-[125px] text-[12px] font-medium text-[#1F2937] cursor-pointer"
              >
                <span>
                  {dateFilter
                    ? new Date(dateFilter).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })
                    : "dd/mm/yy"}
                </span>
                <input
                  ref={dateInputRef}
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  aria-label="Filter by date"
                />
                {dateFilter ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDateFilter("");
                    }}
                    className="relative z-10 text-gray-500 hover:text-gray-800 ml-1 text-[11px]"
                    title="Clear date"
                  >
                    ✕
                  </button>
                ) : (
                  <svg
                    className="w-3.5 h-3.5 text-[#1F2937] ml-2 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Responsive Log Table */}
          <div className="bg-white rounded-[16px] shadow-[0_3px_12px_rgba(15,23,42,0.04)] border border-[#D1D5E6] p-4 overflow-x-auto">
            <table className="w-full min-w-[740px] border-collapse text-left">
              <thead>
                <tr className="bg-[#DFDBE5] text-[#111827] text-[11px] font-bold uppercase tracking-[0.03em]">
                  <th className="py-2.5 px-4 rounded-tl-[8px]">MESSAGE ID</th>
                  <th className="py-2.5 px-4">RECIPIENT</th>
                  <th className="py-2.5 px-4">CHANNEL</th>
                  <th className="py-2.5 px-4">PROVIDER</th>
                  <th className="py-2.5 px-4 text-center">STATUS</th>
                  <th className="py-2.5 px-4 rounded-tr-[8px]">SENT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[12.5px]">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-[#4B5563]"
                    >
                      No messages match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-[#111827] tabular-nums">
                        {log.id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#111827]">
                        {log.recipient}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#1F2937]">
                        {log.channel}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#1F2937]">
                        {log.provider}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center min-w-[92px] px-3.5 py-0.5 rounded-full text-[11.5px] font-semibold ${getStatusBadgeStyle(
                            log.status
                          )}`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#1F2937] whitespace-nowrap">
                        {log.sent}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}