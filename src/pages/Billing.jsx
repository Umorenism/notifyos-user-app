import React, { useState } from "react";

const INITIAL_PRICING = [
  {
    id: "email",
    channel: "Email",
    price: 52,
    description: "Transactional Emails",
  },
  {
    id: "sms",
    channel: "SMS",
    price: 20,
    description: "Standard SMS Messages",
  },
  {
    id: "whatsapp",
    channel: "Whatsapp",
    price: 30,
    description: "WhatsApp Business Messages",
  },
  {
    id: "otp",
    channel: "OTP",
    price: 40,
    description: "One-Time Password Delivery",
  },
];

const INITIAL_CHANNEL_COSTS = [
  {
    id: "sms",
    name: "SMS",
    cost: 482300,
    maxBudget: 570000,
    color: "bg-[#E09100]",
  },
  {
    id: "email",
    name: "Email",
    cost: 201150,
    maxBudget: 340000,
    color: "bg-[#051052]",
  },
  {
    id: "otp",
    name: "OTP",
    cost: 93600,
    maxBudget: 315000,
    color: "bg-[#3B06D1]",
  },
  {
    id: "whatsapp",
    name: "Whatsapp",
    cost: 183600,
    maxBudget: 420000,
    color: "bg-[#147A0C]",
  },
];

export default function BillingPage() {
  const [messagesSent] = useState(24118);
  const [avgCost] = useState(32);
  const [totalCost] = useState(777050);
  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <div
      className="min-h-screen bg-[#EEF0F9] text-[#0D163A] px-4 py-6 sm:px-8 sm:py-8 selection:bg-[#081252] selection:text-white"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Header */}
        <header className="mb-6">
          <h1
            className="text-[24px] sm:text-[26px] font-bold text-[#0A1344] leading-tight tracking-[-0.01em]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Billing
          </h1>
          <p className="text-[12.5px] font-medium text-[#1F2937] mt-0.5">
            Track Your Message Usage And Costs
          </p>
        </header>

        {/* Top 3 Metric Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-7">
          {/* Card 1: MESSAGES SENT */}
          <div className="bg-white rounded-[16px] px-5 py-5 shadow-[0_3px_10px_rgba(15,23,42,0.06)] border-b-[2px] border-[#D8DCEB] flex flex-col justify-center">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#4B5563]">
              MESSAGES SENT
            </p>
            <p className="text-[20px] font-bold text-[#0A1344] mt-1.5 tabular-nums">
              {messagesSent.toLocaleString()}
            </p>
          </div>

          {/* Card 2: AVG COST/MESSAGE */}
          <div className="bg-white rounded-[16px] px-5 py-5 shadow-[0_3px_10px_rgba(15,23,42,0.06)] border-b-[2px] border-[#D8DCEB] flex flex-col justify-center">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#4B5563]">
              AVG COST/MESSAGE
            </p>
            <p className="text-[20px] font-bold text-[#147A0C] mt-1.5 tabular-nums">
              ₦{avgCost}
            </p>
          </div>

          {/* Card 3: TOTAL COST */}
          <div className="bg-white rounded-[16px] px-5 py-5 shadow-[0_3px_10px_rgba(15,23,42,0.06)] border-b-[2px] border-[#D8DCEB] flex items-center justify-between">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#4B5563]">
                TOTAL COST
              </p>
              <p className="text-[20px] font-bold text-[#E09100] mt-1.5 tabular-nums">
                ₦{totalCost.toLocaleString()}
              </p>
            </div>
            {/* Money Bag Icon */}
            <div className="shrink-0">
              <svg
                className="w-6 h-6 text-[#D99B26]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 4h6l-1.5 3h-3L9 4z" />
                <path d="M7 10c-1.5 2-2 4.5-2 6.5C5 18.985 7.5 20 12 20s7-1.015 7-3.5c0-2-.5-4.5-2-6.5-1-1.333-2.5-3-5-3s-4 1.667-5 3z" />
                <text
                  x="12"
                  y="15.5"
                  textAnchor="middle"
                  fontSize="7"
                  fill="currentColor"
                  stroke="none"
                  fontWeight="bold"
                >
                  $
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-8">
          <h2
            className="text-[18px] sm:text-[19px] font-bold text-[#0A1344] mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Pricing
          </h2>

          <div className="overflow-x-auto bg-white rounded-[16px] shadow-[0_3px_12px_rgba(15,23,42,0.04)] border border-[#D1D5E6] p-4">
            <table className="w-full min-w-[540px] border-collapse text-left">
              <thead>
                <tr className="bg-[#EADCE3] text-[#111827] text-[12px] font-bold">
                  <th className="py-2.5 px-3.5 w-[31%] rounded-l-[8px]">Channel</th>
                  <th className="py-2.5 px-3.5 w-[38%]">Price per message</th>
                  <th className="py-2.5 px-3.5 w-[31%] rounded-r-[8px]">Description</th>
                </tr>
              </thead>
              <tbody className="text-[13px] divide-y divide-gray-100">
                {INITIAL_PRICING.map((item) => {
                  const isHighlighted = selectedChannel === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() =>
                        setSelectedChannel(isHighlighted ? null : item.id)
                      }
                      className={`cursor-pointer transition-colors ${
                        isHighlighted ? "bg-indigo-50/60" : "hover:bg-gray-50/50"
                      }`}
                    >
                      <td className="py-4 px-3.5 font-semibold text-[#111827]">
                        {item.channel}
                      </td>
                      <td className="py-4 px-3.5 font-semibold text-[#111827] tabular-nums">
                        ₦{item.price}
                      </td>
                      <td className="py-4 px-3.5 font-medium text-[#1F2937]">
                        {item.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cost By Channel Section */}
        <section>
          <h2
            className="text-[18px] sm:text-[19px] font-bold text-[#0A1344] mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Cost By Channel
          </h2>

          <div className="bg-white rounded-[16px] p-5 sm:px-6 sm:py-5 shadow-[0_3px_12px_rgba(15,23,42,0.04)] border border-[#D1D5E6] space-y-4">
            {INITIAL_CHANNEL_COSTS.map((ch) => {
              const widthPercent = Math.min(
                100,
                Math.round((ch.cost / ch.maxBudget) * 100)
              );
              const isHighlighted = selectedChannel === ch.id;

              return (
                <div
                  key={ch.id}
                  onClick={() =>
                    setSelectedChannel(isHighlighted ? null : ch.id)
                  }
                  className={`cursor-pointer rounded-lg transition p-2 ${
                    isHighlighted
                      ? "ring-2 ring-[#081252]/20 bg-[#F8F9FD]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between text-[13.5px] mb-1.5">
                    <span className="font-medium text-[#0A1344]">
                      {ch.name}
                    </span>
                    <span className="font-bold text-[#111827] tabular-nums">
                      ₦{ch.cost.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-[9px] bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${ch.color}`}
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}