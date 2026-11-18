import React, { useState } from "react";

const INITIAL_SENDER_IDS = [
  {
    id: 1,
    senderId: "GraceFin",
    type: "SMS",
    status: "Approved",
  },
  {
    id: 2,
    senderId: "NotifyOS",
    type: "SMS",
    status: "Pending",
  },
  {
    id: 3,
    senderId: "Billing@Notifyos.Africa",
    type: "Email domain",
    status: "Approved",
  },
  {
    id: 4,
    senderId: "VerifyNow",
    type: "SMS",
    status: "Approved",
  },
  {
    id: 5,
    senderId: "Production – Mobile App",
    type: "ntfy_live_Ux7Dm1Ke5Vs2Rp0q",
    status: "Approved",
  },
];

export default function SenderIdsPage() {
  const [senderList, setSenderList] = useState(INITIAL_SENDER_IDS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Form State
  const [newSenderId, setNewSenderId] = useState("");
  const [newType, setNewType] = useState("SMS");
  const [sampleMessage, setSampleMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-[#D3F3DF] text-[#288B4B]";
      case "Pending":
        return "bg-[#FBEAD1] text-[#D48A27]";
      case "Rejected":
        return "bg-[#FADAD8] text-[#D44338]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    const trimmed = newSenderId.trim();

    if (!trimmed) {
      setErrorMsg("Please enter a Sender ID or domain.");
      return;
    }

    if (newType === "SMS" && trimmed.length > 11) {
      setErrorMsg("SMS Sender IDs cannot exceed 11 alphanumeric characters.");
      return;
    }

    if (newType === "Email domain" && !trimmed.includes("@") && !trimmed.includes(".")) {
      setErrorMsg("Please enter a valid email address or domain.");
      return;
    }

    const created = {
      id: Date.now(),
      senderId: trimmed,
      type: newType,
      status: "Pending",
    };

    setSenderList((prev) => [created, ...prev]);
    setNewSenderId("");
    setNewType("SMS");
    setSampleMessage("");
    setErrorMsg("");
    setIsModalOpen(false);
  };

  const handleCopyKey = (text, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
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
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Header Bar */}
        <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <h1
              className="text-[24px] sm:text-[26px] font-bold text-[#0A1344] leading-tight tracking-[-0.01em]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Sender IDs
            </h1>
            <p className="text-[12.5px] font-medium text-[#1F2937] mt-1">
              Names And Domains Your Messages Are Sent From, Subject To Carrier Approval.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setErrorMsg("");
              setIsModalOpen(true);
            }}
            className="self-start inline-flex items-center justify-center gap-2 bg-[#081252] hover:bg-[#101f7a] text-white text-[13px] font-medium px-4 h-[40px] rounded-[8px] shadow-sm transition cursor-pointer shrink-0"
          >
            {/* Plus Circle Icon */}
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span>Request sender ID</span>
          </button>
        </header>

        {/* Sender IDs Table */}
        <section className="bg-white rounded-[16px] shadow-[0_3px_12px_rgba(15,23,42,0.04)] border border-[#D1D5E6] p-4 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="bg-[#EADCE3] text-[#111827] text-[12px] font-bold">
                <th className="py-2.5 px-3.5 w-[38%] rounded-l-[8px]">Sender ID</th>
                <th className="py-2.5 px-3.5 w-[42%]">Type</th>
                <th className="py-2.5 px-3.5 text-center w-[20%] rounded-r-[8px]">Status</th>
              </tr>
            </thead>
            <tbody className="text-[12.5px] divide-y divide-gray-100">
              {senderList.map((item) => {
                const isApiKeyType = item.type.startsWith("ntfy_live_");
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-3.5 font-semibold text-[#111827]">
                      {item.senderId}
                    </td>
                    <td className="py-4 px-3.5 font-medium text-[#1F2937]">
                      {isApiKeyType ? (
                        <button
                          type="button"
                          onClick={() => handleCopyKey(item.type, item.id)}
                          title="Click to copy key"
                          className="inline-flex items-center gap-1.5 hover:text-[#081252] transition cursor-pointer"
                        >
                          <span>{item.type}</span>
                          {copiedId === item.id && (
                            <span className="text-[10.5px] font-semibold text-[#288B4B] bg-[#D3F3DF] px-1.5 py-0.5 rounded">
                              Copied
                            </span>
                          )}
                        </button>
                      ) : (
                        <span>{item.type}</span>
                      )}
                    </td>
                    <td className="py-4 px-3.5 text-center">
                      <span
                        className={`inline-flex items-center justify-center min-w-[116px] px-4 py-1 rounded-full text-[12px] font-semibold ${getStatusBadgeStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>

      {/* Request Sender ID Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-[16px] max-w-md w-full p-6 shadow-xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-[19px] font-bold text-[#0A1344]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Request sender ID
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="mb-3 px-3 py-2 rounded-lg bg-[#FADAD8] text-[#D44338] text-[12px] font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-[12.5px] font-semibold text-[#111827] mb-1">
                  Channel Type
                </label>
                <select
                  value={newType}
                  onChange={(e) => {
                    setNewType(e.target.value);
                    setErrorMsg("");
                  }}
                  className="w-full h-[38px] px-3 rounded-[8px] border border-[#9CA3AF] text-[13px] text-[#111827] bg-white focus:outline-none focus:border-[#081252]"
                >
                  <option value="SMS">SMS</option>
                  <option value="Email domain">Email domain</option>
                  <option value="Whatsapp">Whatsapp</option>
                </select>
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-[#111827] mb-1">
                  {newType === "Email domain" ? "Sender Email / Domain" : "Sender ID"}
                </label>
                <input
                  type="text"
                  value={newSenderId}
                  onChange={(e) => {
                    setNewSenderId(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder={
                    newType === "Email domain"
                      ? "e.g. Support@YourDomain.Africa"
                      : "e.g. MyBrand (max 11 chars)"
                  }
                  className="w-full h-[38px] px-3 rounded-[8px] border border-[#9CA3AF] text-[13px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#081252]"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-[#111827] mb-1">
                  Sample Message (For Carrier Approval)
                </label>
                <textarea
                  rows={2}
                  value={sampleMessage}
                  onChange={(e) => setSampleMessage(e.target.value)}
                  placeholder="Your verification code is 123456"
                  className="w-full p-3 rounded-[8px] border border-[#9CA3AF] text-[13px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#081252] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 h-[36px] rounded-[8px] bg-gray-100 hover:bg-gray-200 text-[#374151] text-[12.5px] font-medium transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 h-[36px] rounded-[8px] bg-[#081252] hover:bg-[#101f7a] text-white text-[12.5px] font-medium transition cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}