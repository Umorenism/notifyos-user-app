import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const MOCK_SETTINGS = {
  general: {
    appName: "NotifyOs",
    supportEmail: "support@adegroup.tech",
    timezone: "Africa/Lagos",
    maintenanceMode: false,
  },
  messaging: {
    defaultProvider: "Termii",
    autoRetry: true,
    maxRetries: 3,
  },
  wallet: {
    lowBalanceAlert: 5000,
    autoFundEnabled: false,
    autoFundThreshold: 1000,
  },
  security: {
    twoFactorAuth: true,
    sessionTimeoutMins: 30,
  },
};

const MOCK_ROLES = [
  { role: "admin", label: "Admin", description: "Full system access & administrative controls.", summary: "All permissions enabled", editable: false },
  { role: "developer", label: "Developer", description: "API integrations, message dispatch, and webhook management.", summary: "Messaging & API access", editable: true },
  { role: "finance", label: "Finance", description: "Wallet funding, billing, and transaction monitoring.", summary: "Wallet & Billing", editable: true },
];

const MOCK_PERMISSIONS = [
  { label: "Manage Users", group: "Administration", access: { admin: "full", developer: "none", finance: "none" } },
  { label: "Send Messages", group: "Messaging", access: { admin: "full", developer: "full", finance: "view" } },
  { label: "Fund Wallet", group: "Billing", access: { admin: "full", developer: "none", finance: "full" } },
  { label: "View Audit Logs", group: "Security", access: { admin: "full", developer: "view", finance: "view" } },
];

const MOCK_AUDIT_LOGS = [
  {
    id: "audit_101",
    action: "User Login",
    summary: "Successful authentication",
    actor: { name: "NotifyOS Developer", email: "developer@example.com" },
    category: "Security",
    device: "Chrome / Windows",
    ip: "192.168.1.10",
    at: new Date().toISOString(),
  },
  {
    id: "audit_102",
    action: "Wallet Funded",
    summary: "Added ₦50,000 via Card",
    actor: { name: "NotifyOS Developer", email: "developer@example.com" },
    category: "Billing",
    device: "Chrome / Windows",
    ip: "192.168.1.10",
    at: new Date(Date.now() - 3600000).toISOString(),
  },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("settings"); // "settings", "roles", "audit"
  const [loading, setLoading] = useState(false);

  // Settings state
  const [settingsData, setSettingsData] = useState(MOCK_SETTINGS);
  const [savingSettings, setSavingSettings] = useState(false);

  // Roles state
  const [rolesData] = useState(MOCK_ROLES);
  const [permissionsData] = useState(MOCK_PERMISSIONS);

  // Audit Logs state
  const [auditLogs] = useState(MOCK_AUDIT_LOGS);
  const [auditMeta] = useState({ total: MOCK_AUDIT_LOGS.length });
  const [selectedAuditLog, setSelectedAuditLog] = useState(null);

  const handleNestedChange = (section, key, value) => {
    setSettingsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setTimeout(() => {
      setSavingSettings(false);
      toast.success("Settings updated successfully (Mock Mode).");
    }, 600);
  };

  const handleExportAudit = () => {
    toast.success("Audit log export initiated (Mock Mode).");
  };

  const handleViewAuditDetail = (id) => {
    const found = auditLogs.find((log) => log.id === id);
    setSelectedAuditLog(found || null);
  };

  return (
    <div
      className="min-h-screen bg-[#EEF0F9] text-[#0D163A] px-4 py-6 sm:px-8 sm:py-8 selection:bg-[#081252] selection:text-white flex flex-col flex-1"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div className="max-w-[920px] mx-auto w-full">
        <Toaster position="top-center" reverseOrder={false} />
        
        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-[24px] sm:text-[26px] font-bold text-[#0A1344] leading-tight tracking-[-0.01em]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Settings & Administration
          </h1>
          <p className="text-[12.5px] font-medium text-[#1F2937] mt-0.5">
            Manage system settings, role permissions, and review audit logs.
          </p>
        </div>

        {/* Tabs - Scrollable on Mobile */}
        <div className="flex border-b border-slate-200 gap-6 overflow-x-auto no-scrollbar mb-6">
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "settings" ? "border-[#081252] text-[#081252]" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            General Settings
          </button>
          <button
            onClick={() => setActiveTab("roles")}
            className={`pb-3 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "roles" ? "border-[#081252] text-[#081252]" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Roles & Permissions
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`pb-3 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "audit" ? "border-[#081252] text-[#081252]" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Audit Logs
          </button>
        </div>

        {loading && <p className="text-xs text-gray-500">Loading settings...</p>}

        {/* Tab 1: General Settings */}
        {!loading && activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            {Object.entries(settingsData).map(([sectionKey, sectionObj]) => {
              if (!sectionObj || typeof sectionObj !== "object") return null;
              return (
                <div key={sectionKey} className="bg-white p-5 sm:p-6 rounded-[14px] shadow-[0_2px_10px_rgba(15,23,42,0.03)] border border-[#D1D5E6]">
                  <h2
                    className="text-[19px] sm:text-[20px] font-bold text-[#0A1344] mb-4 capitalize"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {sectionKey} Settings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(sectionObj).map(([fieldKey, val]) => {
                      const isBool = typeof val === "boolean";
                      return (
                        <div key={fieldKey} className="flex flex-col">
                          <label className="block text-[13px] font-semibold text-[#111827] mb-1.5 capitalize">
                            {fieldKey.replace(/([A-Z])/g, " $1")}
                          </label>
                          {isBool ? (
                            <select
                              value={val ? "true" : "false"}
                              onChange={(e) => handleNestedChange(sectionKey, fieldKey, e.target.value === "true")}
                              className="w-full h-[38px] px-3.5 bg-white border border-[#9CA3AF] rounded-[8px] text-[12.5px] text-[#111827] focus:outline-none focus:border-[#081252] transition cursor-pointer"
                            >
                              <option value="true">Enabled (True)</option>
                              <option value="false">Disabled (False)</option>
                            </select>
                          ) : (
                            <input
                              type={typeof val === "number" ? "number" : "text"}
                              value={val === null || val === undefined ? "" : val}
                              onChange={(e) => handleNestedChange(sectionKey, fieldKey, e.target.value)}
                              className="w-full h-[38px] px-3.5 bg-white border border-[#9CA3AF] rounded-[8px] text-[12.5px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#081252] transition"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingSettings}
                className="w-full sm:w-auto py-3 px-8 bg-[#081252] hover:bg-[#101f7a] text-white rounded-[8px] text-[12.5px] font-medium transition disabled:opacity-50 shadow-sm cursor-pointer"
              >
                {savingSettings ? "Saving Settings..." : "Save All Settings"}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Roles & Permissions */}
        {!loading && activeTab === "roles" && (
          <div className="bg-white p-5 sm:p-6 rounded-[14px] shadow-[0_2px_10px_rgba(15,23,42,0.03)] border border-[#D1D5E6] space-y-6">
            <div>
              <h2
                className="text-[19px] sm:text-[20px] font-bold text-[#0A1344]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Role Definitions
              </h2>
              <p className="text-[12.5px] font-medium text-[#1F2937] mt-0.5">Overview of system roles and their administrative scopes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rolesData.map((r, idx) => (
                <div key={idx} className="border border-slate-200 rounded-[10px] p-4 bg-slate-50/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[13.5px] text-[#0A1344]">{r.label}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${r.editable ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-600"}`}>
                      {r.editable ? "Editable" : "System / Locked"}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-600 mb-2">{r.description}</p>
                  <p className="text-[11.5px] font-semibold text-indigo-600">Summary: {r.summary}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h2
                className="text-[19px] sm:text-[20px] font-bold text-[#0A1344] mb-4"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Permissions Matrix
              </h2>
              <div className="overflow-x-auto rounded-[8px]">
                <table className="w-full min-w-[650px] text-left border-collapse">
                  <thead>
                    <tr className="bg-[#DFDBE5] text-[#111827] text-[11px] font-bold uppercase tracking-[0.03em]">
                      <th className="py-2.5 px-4 rounded-tl-[6px]">Permission</th>
                      <th className="py-2.5 px-4">Group</th>
                      {rolesData.map((r) => (
                        <th key={r.role} className="py-2.5 px-4 text-center">{r.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-[12.5px] text-gray-700 font-medium">
                    {permissionsData.map((perm, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="py-3 px-4 font-bold text-[#111827]">{perm.label}</td>
                        <td className="py-3 px-4 text-slate-500">{perm.group}</td>
                        {rolesData.map((r) => {
                          const level = perm.access?.[r.role] || "none";
                          return (
                            <td key={r.role} className="py-3 px-4 text-center">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                level === "full" ? "bg-emerald-100 text-emerald-700" : level === "view" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-400"
                              }`}>
                                {level}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Audit Logs */}
        {!loading && activeTab === "audit" && (
          <div className="bg-white p-5 sm:p-6 rounded-[14px] shadow-[0_2px_10px_rgba(15,23,42,0.03)] border border-[#D1D5E6] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2
                  className="text-[19px] sm:text-[20px] font-bold text-[#0A1344]"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Audit Trail
                </h2>
                <p className="text-[12.5px] font-medium text-[#1F2937]">Total {auditMeta.total} recorded events.</p>
              </div>
              <button
                onClick={handleExportAudit}
                className="self-start sm:self-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#081252] rounded-[8px] text-[12px] font-semibold transition cursor-pointer"
              >
                Export CSV
              </button>
            </div>
            
            <div className="overflow-x-auto rounded-[8px]">
              <table className="w-full min-w-[720px] text-left border-collapse">
                <thead>
                  <tr className="bg-[#DFDBE5] text-[#111827] text-[11px] font-bold uppercase tracking-[0.03em]">
                    <th className="py-2.5 px-4 rounded-tl-[6px]">Action</th>
                    <th className="py-2.5 px-4">Actor</th>
                    <th className="py-2.5 px-4">Category / Device</th>
                    <th className="py-2.5 px-4">Timestamp</th>
                    <th className="py-2.5 px-4 text-right rounded-tr-[6px]">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[12.5px] text-gray-700 font-medium">
                  {auditLogs.length ? (
                    auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/50">
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          {log.action}
                          {log.summary && <span className="block font-normal text-slate-400 text-[11px]">{log.summary}</span>}
                        </td>
                        <td className="py-3 px-4">
                          {log.actor?.name || "—"}
                          <span className="block text-[11px] text-slate-400">{log.actor?.email}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="capitalize">{log.category}</span>
                          <span className="block text-[11px] text-slate-400">{log.device} ({log.ip})</span>
                        </td>
                        <td className="py-3 px-4 text-slate-500">{new Date(log.at).toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleViewAuditDetail(log.id)}
                            className="text-[#081252] hover:underline font-semibold cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-400 italic">No audit records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {selectedAuditLog && (
              <div className="mt-6 p-4 bg-slate-50 rounded-[10px] border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-[12.5px] text-[#0A1344]">Audit Log Detail ({selectedAuditLog.id})</h3>
                  <button onClick={() => setSelectedAuditLog(null)} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer">Close</button>
                </div>
                <pre className="text-[11px] font-mono text-slate-700 overflow-x-auto bg-white p-3 rounded-[8px] border border-slate-200">
                  {JSON.stringify(selectedAuditLog, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}