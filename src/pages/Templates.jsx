import React, { useState } from "react";
import { Plus, Copy, Check, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function TemplatesAndWebhooks() {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("template"); // 'template' or 'webhook'

  // State for dynamic items
  const [templates] = useState([]);
  const [webhooks] = useState([]);

  // Form states
  const [formState, setFormState] = useState({
    title: "",
    channel: "SMS",
    body: "",
    webhookUrl: "",
  });

  const webhookEndpoint = webhooks[0]?.url || "—";

  const handleCopy = () => {
    if (webhookEndpoint === "—") {
      toast.error("Not available in provided API functions.");
      return;
    }
    navigator.clipboard.writeText(webhookEndpoint);
    setCopied(true);
    toast.success("Webhook URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setFormState({ title: "", channel: "SMS", body: "", webhookUrl: "" });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "template") {
      if (!formState.title || !formState.body) {
        toast.error("Please fill in all required fields.");
        return;
      }
    } else {
      if (!formState.webhookUrl) {
        toast.error("Webhook URL is required.");
        return;
      }
    }
    toast.error("Not available in provided API functions.");
  };

  return (
    <div className="max-w-6xl mx-auto font-sans text-[#1c2333] select-none pb-12">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#0a194f] tracking-tight flex items-center gap-2">
          Templates &amp; Webhooks
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          Reusable Message Templates, And Receive Real-Time Notifications For Message Events
        </p>
      </div>

      {/* Templates Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#0a194f]">Templates</h2>
        <button
          onClick={() => handleOpenModal("template")}
          className="flex items-center gap-2 bg-[#0a194f] hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> New Template
        </button>
      </div>

      {/* Templates List */}
      <div className="space-y-4 mb-10">
        {templates.length ? templates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#1c2333]">
                {tpl.title}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-red-100 text-[#DC2626] uppercase tracking-wider">
                {tpl.channel}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 items-center bg-gray-50/70 border border-gray-100 rounded-xl p-3">
              {tpl.variables.length > 0 ? (
                tpl.variables.map((variable, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#d8d8eb]/70 text-[#0a194f] text-xs font-mono font-medium rounded-lg shadow-2xs"
                  >
                    {variable}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 italic">No variables defined</span>
              )}
            </div>
          </div>
        )) : (
          <p className="text-xs text-gray-400 italic">No template data available.</p>
        )}
      </div>

      {/* Webhooks Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#0a194f]">Webhooks</h2>
        <button
          onClick={() => handleOpenModal("webhook")}
          className="flex items-center gap-2 bg-[#0a194f] hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Create Webhook
        </button>
      </div>

      {/* Webhooks Content */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Endpoint URL
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            readOnly
            value={webhookEndpoint}
            className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200/80 rounded-xl text-xs font-mono text-[#0a194f] focus:outline-none shadow-sm"
          />
          <button
            onClick={handleCopy}
            className="absolute right-3.5 text-gray-400 hover:text-[#0a194f] transition-colors focus:outline-none"
            title="Copy URL"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Modal for Creating Template or Webhook */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-[#0a194f] mb-1">
              {modalType === "template" ? "Create New Template" : "Update Webhook Endpoint"}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              {modalType === "template"
                ? "Configure a reusable message layout for your alerts."
                : "Set your target server payload destination."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {modalType === "template" ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Template Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Password Reset"
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-[#0a194f] focus:outline-none focus:border-[#0a194f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Channel
                    </label>
                    <select
                      value={formState.channel}
                      onChange={(e) => setFormState({ ...formState, channel: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-[#0a194f] focus:outline-none focus:border-[#0a194f]"
                    >
                      <option value="SMS">SMS</option>
                      <option value="Email">Email</option>
                      <option value="Whatsapp">Whatsapp</option>
                      <option value="OTP">OTP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Message Body (use {"{{variable}}"} syntax)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Hello {{first_name}}, your code is {{code}}."
                      value={formState.body}
                      onChange={(e) => setFormState({ ...formState, body: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-[#0a194f] focus:outline-none focus:border-[#0a194f]"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Endpoint URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://api.yourdomain.com/webhook"
                    value={formState.webhookUrl}
                    onChange={(e) => setFormState({ ...formState, webhookUrl: e.target.value })}
                    className="w-full px-4 py-5 bg-white border border-gray-200 rounded-xl text-xs text-[#0a194f] focus:outline-none focus:border-[#0a194f]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0a194f] hover:bg-blue-900 text-white rounded-xl text-xs font-semibold transition shadow-sm mt-4"
              >
                {modalType === "template" ? "Save Template" : "Save Webhook"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}