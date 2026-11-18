import React, { useState, useEffect } from "react";

// Custom SVG Icons matching the exact UI stroke styles and colors
const Icons = {
  MessagesSent: () => (
    <svg className="w-6 h-6 text-[#0A1344]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="13" y2="14" />
    </svg>
  ),
  Delivered: () => (
    <svg className="w-6 h-6 text-[#2B8A3E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12v8a2 2 0 0 0 2 2h8z" />
      <polyline points="8.5 12.5 11 15 16 9.5" />
    </svg>
  ),
  Failed: () => (
    <svg className="w-6 h-6 text-[#D9483B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="12" y1="7" x2="12" y2="11" />
      <line x1="12" y1="14" x2="12.01" y2="14" />
    </svg>
  ),
  Pending: () => (
    <svg className="w-6 h-6 text-[#D4B12A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  ),
  DeliveryRate: () => (
    <svg className="w-6 h-6 text-[#3B28CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <polyline points="7 14 10.5 10.5 13 13 17 9" />
      <polyline points="14 9 17 9 17 12" />
    </svg>
  ),
  MonthlyCost: () => (
    <svg className="w-6 h-6 text-[#C8963E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5h6l-1.5 3h-3L9 5z" />
      <path d="M7 11c-1.5 2-2 4.5-2 6.5C5 19.985 7.5 21 12 21s7-1.015 7-3.5c0-2-.5-4.5-2-6.5-1-1.333-2.5-3-5-3s-4 1.667-5 3z" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none" fontWeight="bold">$</text>
    </svg>
  ),
  Phone: () => (
    <svg className="w-[15px] h-[15px] text-[#1F2937]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-[15px] h-[15px] text-[#1F2937]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg className="w-[15px] h-[15px] text-[#1F2937]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
};

const INITIAL_STATS = {
  sent: 24118,
  delivered: 23304,
  failed: 412,
  pending: 402,
  deliveryRate: 81.2,
  monthlyCost: 777050,
};

const INITIAL_CHANNELS = [
  { id: "sms", name: "SMS", cost: 482300, maxBudget: 505000, color: "bg-[#F59E0B]" },
  { id: "email", name: "Email", cost: 201150, maxBudget: 350000, color: "bg-[#051052]" },
  { id: "otp", name: "OTP", cost: 93600, maxBudget: 325000, color: "bg-[#3B18D8]" },
  { id: "whatsapp", name: "Whatsapp", cost: 183600, maxBudget: 435000, color: "bg-[#1A8917]" },
];

const INITIAL_MESSAGES = [
  {
    id: "Msg_8f2a",
    type: "sms",
    recipient: "+234 803•••221",
    provider: "Via Termii",
    status: "Delivered",
    secondsAgo: 2,
    cost: 15,
  },
  {
    id: "Msg_7c19",
    type: "email",
    recipient: "sade••••@gmail.com",
    provider: "via Amazon SES",
    status: "Delivered",
    secondsAgo: 6,
    cost: 5,
  },
  {
    id: "Otp_4e02",
    type: "otp",
    recipient: "+234 701•••884",
    provider: "via Twilio",
    status: "Verified",
    secondsAgo: 11,
    cost: 25,
  },
  {
    id: "Msg_3b77",
    type: "sms",
    recipient: "+234 809•••032",
    provider: "Via Akuuk",
    status: "Pending",
    secondsAgo: 14,
    cost: 15,
  },
  {
    id: "Msg_9d41",
    type: "email",
    recipient: "chika•••@yahoo.com",
    provider: "via SendGrid",
    status: "Failed",
    secondsAgo: 22,
    cost: 0,
  },
  {
    id: "Msg_1a90",
    type: "sms",
    recipient: "+234 815•••667",
    provider: "Via Termii",
    status: "Delivered",
    secondsAgo: 27,
    cost: 15,
  },
];

export default function MessagingOverviewDashboard() {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [channels, setChannels] = useState(INITIAL_CHANNELS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [selectedChannelFilter, setSelectedChannelFilter] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isLive) return;
    const timer = setInterval(() => {
      setMessages((prev) =>
        prev.map((msg) => ({
          ...msg,
          secondsAgo: msg.secondsAgo + 1,
          status:
            msg.status === "Pending" && msg.secondsAgo > 18
              ? "Delivered"
              : msg.status,
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [isLive]);

  const handleSimulateNewMessage = () => {
    const samples = [
      { type: "sms", recipient: "+234 802•••914", provider: "Via Termii", status: "Delivered", cost: 15 },
      { type: "email", recipient: "tunde•••@gmail.com", provider: "via Amazon SES", status: "Delivered", cost: 5 },
      { type: "otp", recipient: "+234 905•••410", provider: "via Twilio", status: "Verified", cost: 25 },
      { type: "sms", recipient: "+234 706•••118", provider: "Via Akuuk", status: "Pending", cost: 15 },
    ];
    const pick = samples[Math.floor(Math.random() * samples.length)];
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16);
    const newMsg = {
      id: `${pick.type === "otp" ? "Otp" : "Msg"}_${randomHex}`,
      ...pick,
      secondsAgo: 1,
    };

    setMessages((prev) => [newMsg, ...prev.slice(0, 5)]);
    setStats((prev) => {
      const nextSent = prev.sent + 1;
      const nextDelivered =
        pick.status === "Delivered" || pick.status === "Verified"
          ? prev.delivered + 1
          : prev.delivered;
      const nextPending = pick.status === "Pending" ? prev.pending + 1 : prev.pending;
      return {
        ...prev,
        sent: nextSent,
        delivered: nextDelivered,
        pending: nextPending,
        monthlyCost: prev.monthlyCost + pick.cost,
      };
    });

    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === pick.type ? { ...ch, cost: ch.cost + pick.cost } : ch
      )
    );
  };

  const handleRetryFailed = (msgId) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, status: "Delivered", secondsAgo: 1 } : m
      )
    );
    setStats((prev) => ({
      ...prev,
      failed: Math.max(0, prev.failed - 1),
      delivered: prev.delivered + 1,
    }));
    setSelectedMessage(null);
  };

  const formatTimeAgo = (sec) => {
    if (sec < 60) return `${sec}s Ago`;
    const mins = Math.floor(sec / 60);
    return `${mins}m Ago`;
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-[#D3F3DF] text-[#288B4B]";
      case "Verified":
        return "bg-[#D3F3E4] text-[#288B4B]";
      case "Pending":
        return "bg-[#FBEAD1] text-[#D48A27]";
      case "Failed":
        return "bg-[#FADAD8] text-[#D44338]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getChannelIcon = (type) => {
    if (type === "email") return <Icons.Mail />;
    if (type === "otp") return <Icons.ShieldCheck />;
    return <Icons.Phone />;
  };

  const filteredMessages = selectedChannelFilter
    ? messages.filter((m) => m.type === selectedChannelFilter)
    : messages;

  return (
    <div
      className="min-h-screen bg-[#EEF0F9] text-[#0D163A] px-4 py-6 sm:px-8 sm:py-8 selection:bg-[#3B28CC] selection:text-white"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Increased Max Width Container */}
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Header Section */}
        <header className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <h1
              className="text-[24px] sm:text-[26px] font-bold text-[#0A1344] leading-tight tracking-[-0.01em]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Overview
            </h1>
            <p className="text-[12.5px] font-medium text-[#1F2937] mt-0.5">
              Your Messaging Summary
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedChannelFilter && (
              <button
                onClick={() => setSelectedChannelFilter(null)}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white text-[#3B28CC] shadow-sm hover:bg-indigo-50 transition cursor-pointer"
              >
                Filter: {selectedChannelFilter.toUpperCase()} ✕
              </button>
            )}
            <button
              onClick={() => setIsLive(!isLive)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition cursor-pointer ${
                isLive
                  ? "bg-[#D3F3DF] text-[#288B4B] border-[#288B4B]/20"
                  : "bg-white/80 text-[#4B5563] border-gray-200 hover:bg-white"
              }`}
              title="Toggle live timer"
            >
              {isLive ? "● Live" : "○ Static"}
            </button>
            <button
              onClick={handleSimulateNewMessage}
              className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#0A1344] text-white hover:bg-[#19266b] transition shadow-sm cursor-pointer"
            >
              + Send Test
            </button>
          </div>
        </header>

        {/* Top 6 Metric Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-7">
          {/* Card 1: MESSAGES SENT */}
          <div className="bg-white rounded-[16px] px-5 py-4 shadow-[0_3px_10px_rgba(15,23,42,0.06)] border border-[#D1D5E6] flex items-center justify-between transition hover:translate-y-[-1px]">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#4B5563]">
                MESSAGES SENT
              </p>
              <p className="text-[20px] font-bold text-[#0A1344] mt-1 tabular-nums">
                {stats.sent.toLocaleString()}
              </p>
            </div>
            <div className="shrink-0">
              <Icons.MessagesSent />
            </div>
          </div>

          {/* Card 2: DELIVERED */}
          <div className="bg-white rounded-[16px] px-5 py-4 shadow-[0_3px_10px_rgba(15,23,42,0.06)] border border-[#D1D5E6] flex items-center justify-between transition hover:translate-y-[-1px]">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#4B5563]">
                DELIVERED
              </p>
              <p className="text-[20px] font-bold text-[#2B8A3E] mt-1 tabular-nums">
                {stats.delivered.toLocaleString()}
              </p>
            </div>
            <div className="shrink-0">
              <Icons.Delivered />
            </div>
          </div>

          {/* Card 3: FAILED */}
          <div className="bg-white rounded-[16px] px-5 py-4 shadow-[0_3px_10px_rgba(15,23,42,0.06)] border border-[#D1D5E6] flex items-center justify-between transition hover:translate-y-[-1px]">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#4B5563]">
                FAILED
              </p>
              <p className="text-[20px] font-bold text-[#D9483B] mt-1 tabular-nums">
                {stats.failed.toLocaleString()}
              </p>
            </div>
            <div className="shrink-0">
              <Icons.Failed />
            </div>
          </div>

          {/* Card 4: PENDING */}
          <div className="bg-white rounded-[16px] px-5 py-4 shadow-[0_3px_10px_rgba(15,23,42,0.06)] border border-[#D1D5E6] flex items-center justify-between transition hover:translate-y-[-1px]">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#4B5563]">
                PENDING
              </p>
              <p className="text-[20px] font-bold text-[#D4B12A] mt-1 tabular-nums">
                {stats.pending.toLocaleString()}
              </p>
            </div>
            <div className="shrink-0">
              <Icons.Pending />
            </div>
          </div>

          {/* Card 5: DELIVERY RATE */}
          <div className="bg-white rounded-[16px] px-5 py-4 shadow-[0_3px_10px_rgba(15,23,42,0.06)] border border-[#D1D5E6] flex items-center justify-between transition hover:translate-y-[-1px]">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#4B5563]">
                DELIVERY RATE
              </p>
              <p className="text-[20px] font-bold text-[#3B28CC] mt-1 tabular-nums">
                {stats.deliveryRate}%
              </p>
            </div>
            <div className="shrink-0">
              <Icons.DeliveryRate />
            </div>
          </div>

          {/* Card 6: MONTHLY COST */}
          <div className="bg-white rounded-[16px] px-5 py-4 shadow-[0_3px_10px_rgba(15,23,42,0.06)] border border-[#D1D5E6] flex items-center justify-between transition hover:translate-y-[-1px]">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#4B5563]">
                MONTHLY COST
              </p>
              <p className="text-[20px] font-bold text-[#C8963E] mt-1 tabular-nums">
                ₦{stats.monthlyCost.toLocaleString()}
              </p>
            </div>
            <div className="shrink-0">
              <Icons.MonthlyCost />
            </div>
          </div>
        </section>

        {/* Cost By Channel Section */}
        <section className="mb-7">
          <h2
            className="text-[18px] sm:text-[19px] font-bold text-[#0A1344] mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Cost By Channel
          </h2>

          <div className="bg-white rounded-[16px] p-5 sm:px-6 sm:py-5 shadow-[0_3px_12px_rgba(15,23,42,0.04)] border border-[#D1D5E6] space-y-4">
            {channels.map((channel) => {
              const widthPercent = Math.min(
                100,
                Math.round((channel.cost / channel.maxBudget) * 100)
              );
              const isSelected = selectedChannelFilter === channel.id;

              return (
                <div
                  key={channel.id}
                  onClick={() =>
                    setSelectedChannelFilter(isSelected ? null : channel.id)
                  }
                  className={`cursor-pointer rounded-lg transition p-2 ${
                    isSelected ? "ring-2 ring-[#3B28CC]/30 bg-[#F8F9FD]" : "hover:bg-gray-50"
                  }`}
                  title={`Click to filter Recent Messages by ${channel.name}`}
                >
                  <div className="flex items-center justify-between text-[13.5px] mb-1.5">
                    <span className="font-medium text-[#1E293B]">
                      {channel.name}
                    </span>
                    <span className="font-bold text-[#0A1344] tabular-nums">
                      ₦{channel.cost.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-[9px] bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${channel.color}`}
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Messages Section */}
        <section>
          <h2
            className="text-[18px] sm:text-[19px] font-bold text-[#0A1344] mb-3.5"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Recent Messages
          </h2>

          <div className="bg-white rounded-[16px] shadow-[0_3px_12px_rgba(15,23,42,0.04)] border border-[#D1D5E6] p-4 space-y-3">
            {filteredMessages.length === 0 ? (
              <div className="py-8 text-center text-[13px] text-[#4B5563]">
                No recent messages for this channel.
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-2 px-3 rounded-xl hover:bg-gray-50 transition cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  {/* Left Info Group */}
                  <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-[13px]">
                    <div className="flex items-center gap-3 min-w-[100px]">
                      <span className="shrink-0">{getChannelIcon(msg.type)}</span>
                      <span className="font-medium text-[#111827] tabular-nums">
                        {msg.id}
                      </span>
                    </div>

                    <span className="font-semibold text-[#111827] min-w-[140px] sm:min-w-[165px]">
                      {msg.recipient}
                    </span>

                    <span className="font-medium text-[#1F2937]">
                      {msg.provider}
                    </span>
                  </div>

                  {/* Right Status & Timestamp Group */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 pl-7 sm:pl-0">
                    <span
                      className={`inline-flex items-center justify-center min-w-[112px] px-4 py-1 rounded-full text-[12.5px] font-semibold ${getStatusBadgeStyle(
                        msg.status
                      )}`}
                    >
                      {msg.status}
                    </span>

                    <span className="text-[12.5px] font-medium text-[#1F2937] min-w-[54px] text-right tabular-nums">
                      {formatTimeAgo(msg.secondsAgo)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Message Detail Modal on Row Click */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getChannelIcon(selectedMessage.type)}
                <h3 className="font-bold text-[15px] text-[#0A1344]">
                  {selectedMessage.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-[13px] text-[#1F2937] border-t border-b border-gray-100 py-3 my-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Recipient:</span>
                <span className="font-semibold">{selectedMessage.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gateway:</span>
                <span className="font-medium">{selectedMessage.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold ${getStatusBadgeStyle(
                    selectedMessage.status
                  )}`}
                >
                  {selectedMessage.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Timestamp:</span>
                <span>{formatTimeAgo(selectedMessage.secondsAgo)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-3">
              {selectedMessage.status === "Failed" && (
                <button
                  onClick={() => handleRetryFailed(selectedMessage.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0A1344] text-white text-[12px] font-semibold hover:bg-[#19266b] transition cursor-pointer"
                >
                  Retry Message
                </button>
              )}
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-3.5 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-[12px] font-semibold hover:bg-gray-200 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}