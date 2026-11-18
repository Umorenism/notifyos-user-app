import React, { useState } from "react";

async function getErrorMessage(error) {
  const responseData = error?.response?.data;
  if (responseData instanceof Blob) return responseData.text();
  if (typeof responseData === "string") return responseData;
  if (responseData) return JSON.stringify(responseData, null, 2);
  return error?.message || "The request failed.";
}

export default function AdminApiConsole({
  title,
  description,
  operations,
  onSuccess,
  hideHeader = false,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [identifier, setIdentifier] = useState("");
  const [payload, setPayload] = useState("{}");
  const [response, setResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const operation = operations[selectedIndex];

  const handleOperationChange = (event) => {
    setSelectedIndex(Number(event.target.value));
    setIdentifier("");
    setPayload("{}");
    setResponse("");
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse("");
    setErrorMessage("");

    if (operation.requiresIdentifier && !identifier.trim()) {
      setErrorMessage(`Enter ${operation.identifierLabel.toLowerCase()}.`);
      return;
    }

    let requestBody;
    if (operation.requiresPayload) {
      try {
        requestBody = JSON.parse(payload);
      } catch {
        setErrorMessage("Request body must be valid JSON.");
        return;
      }
    }

    setLoading(true);
    try {
      const result = await operation.run(identifier.trim(), requestBody);
      if (result instanceof Blob && operation.downloadFilename) {
        const downloadUrl = URL.createObjectURL(result);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = operation.downloadFilename;
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
        setResponse("File download started.");
      } else {
        setResponse(JSON.stringify(result, null, 2) ?? "Request completed.");
      }
      onSuccess?.();
    } catch (error) {
      setErrorMessage(await getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto font-sans text-[#1c2333] pb-12">
      {!hideHeader && (
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#0a194f] tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {description}
          </p>
        </div>
      )}

      <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor={`${title}-operation`}
              className="block text-xs font-semibold text-gray-700 mb-1.5"
            >
              API operation
            </label>
            <select
              id={`${title}-operation`}
              value={selectedIndex}
              onChange={handleOperationChange}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#0a194f] focus:outline-none focus:border-[#0a194f]"
            >
              {operations.map((item, index) => (
                <option key={item.label} value={index}>
                  {item.method} - {item.label}
                </option>
              ))}
            </select>
          </div>

          {operation.requiresIdentifier && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {operation.identifierLabel}
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#0a194f] focus:outline-none focus:border-[#0a194f]"
              />
            </div>
          )}

          {operation.requiresPayload && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Request body (JSON)
              </label>
              <textarea
                rows={7}
                value={payload}
                onChange={(event) => setPayload(event.target.value)}
                spellCheck="false"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-mono text-[#0a194f] focus:outline-none focus:border-[#0a194f]"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#0a194f] hover:bg-blue-900 disabled:opacity-60 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            {loading ? "Working..." : "Run request"}
          </button>
        </form>

        {errorMessage && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 whitespace-pre-wrap"
          >
            {errorMessage}
          </div>
        )}

        {response && (
          <div className="mt-5">
            <h2 className="text-sm font-bold text-[#0a194f] mb-2">Response</h2>
            <pre className="max-h-[32rem] overflow-auto rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700 whitespace-pre-wrap break-words">
              {response}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}
