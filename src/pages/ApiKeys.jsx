import React, { useState } from "react";
import { Plus, Copy, Check, X, KeyRound } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function APIKeys() {
  const [copiedHeader, setCopiedHeader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form input state for creating a new key
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyEnvironment, setNewKeyEnvironment] = useState("Production");

  // Initial API Keys state matching the UI screenshot
  const [apiKeys] = useState([]);

  const authHeaderSnippet = "Authorization: Bearer YOUR_API_KEY";

  const handleCopyHeader = () => {
    navigator.clipboard.writeText(authHeaderSnippet);
    setCopiedHeader(true);
    toast.success("Authorization header copied!");
    setTimeout(() => setCopiedHeader(false), 2000);
  };

  const handleRevoke = () => {
    toast.error("Not available in provided API functions.");
  };

  const handleCreateKeySubmit = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) {
      toast.error("Please enter a key name.");
      return;
    }

    toast.error("Not available in provided API functions.");
  };

  return (
    <div className="max-w-6xl mx-auto font-sans text-[#1c2333] select-none pb-12">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Page Header & Create Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0a194f] tracking-tight">
            API Keys
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Manage Your API Keys For Accessing The NotifyOS API
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#0a194f] hover:bg-blue-900 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-sm w-full md:w-auto"
        >
          <Plus className="w-4 h-4" /> Create Key
        </button>
      </div>

      {/* Using Your API Keys Section */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-[#0a194f] mb-1">
          Using Your API Keys
        </h2>
        <p className="text-xs text-gray-500 font-medium mb-3">
          Include Your API Key In The Authorization Header Of All Requests:
        </p>

        <div className="relative flex items-center max-w-lg">
          <input
            type="text"
            readOnly
            value={authHeaderSnippet}
            className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-xs font-mono text-[#0a194f] focus:outline-none shadow-xs"
          />
          <button
            onClick={handleCopyHeader}
            className="absolute right-3.5 text-gray-400 hover:text-[#0a194f] transition-colors focus:outline-none"
            title="Copy Header"
          >
            {copiedHeader ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* API Keys Table Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f0dce0] text-[#1c2333] text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Key</th>
                <th className="py-3 px-4">Environment</th>
                <th className="py-3 px-4">Last Used</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700 font-medium">
              {apiKeys.length > 0 ? (
                apiKeys.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#1c2333]">{item.name}</td>
                    <td className="py-4 px-4 font-mono text-gray-500">{item.key}</td>
                    <td className="py-4 px-4 text-gray-600">{item.environment}</td>
                    <td className="py-4 px-4 text-gray-500">{item.lastUsed}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${
                          item.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-500">{item.created}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={handleRevoke}
                        className="px-3 py-1 rounded-lg border border-red-200 text-[#DC2626] hover:bg-red-50 text-xs font-semibold transition-colors"
                      >
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-400 italic">
                    No API key data available from provided API functions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Creating New API Key */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0a194f] flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0a194f] tracking-tight">
                  Create API Key
                </h3>
                <p className="text-xs text-gray-500">
                  Generate a new token for programmatic access
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateKeySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Key Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Staging Server Integration"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-[#0a194f] focus:outline-none focus:border-[#0a194f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Environment
                </label>
                <select
                  value={newKeyEnvironment}
                  onChange={(e) => setNewKeyEnvironment(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-[#0a194f] focus:outline-none focus:border-[#0a194f]"
                >
                  <option value="Production">Production</option>
                  <option value="Sandbox">Sandbox</option>
                  <option value="Live">Live</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0a194f] hover:bg-blue-900 text-white rounded-xl text-xs font-semibold transition shadow-sm"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}