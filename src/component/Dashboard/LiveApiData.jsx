import React, { useEffect, useState } from "react";

function getErrorMessage(error) {
  const responseData = error?.response?.data;
  if (responseData?.message) return responseData.message;
  if (typeof responseData === "string") return responseData;
  if (responseData) return JSON.stringify(responseData, null, 2);
  return error?.message || "The request failed.";
}

function isEmptyData(data) {
  return (
    data === null ||
    data === undefined ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === "object" &&
      !Array.isArray(data) &&
      Object.keys(data).length === 0)
  );
}

export default function LiveApiData({
  resources,
  refreshToken = 0,
  title,
  description,
  dataTitle = "Live data",
}) {
  const [results, setResults] = useState({});
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    let active = true;
    setResults((current) => {
      const next = { ...current };
      resources.forEach(({ key }) => {
        next[key] = { status: "loading" };
      });
      return next;
    });

    resources.forEach(async (resource) => {
      try {
        const data = await resource.load();
        if (active) {
          setResults((current) => ({
            ...current,
            [resource.key]: { status: "success", data },
          }));
        }
      } catch (error) {
        if (active) {
          setResults((current) => ({
            ...current,
            [resource.key]: {
              status: "error",
              message: getErrorMessage(error),
            },
          }));
        }
      }
    });

    return () => {
      active = false;
    };
  }, [resources, refreshToken, refreshCount]);

  return (
    <div className="max-w-6xl mx-auto font-sans text-[#1c2333] pb-8">
      {title && (
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#0a194f] tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}
      <section className="space-y-4 mb-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-[#0a194f]">{dataTitle}</h2>
          <button
            type="button"
            onClick={() => setRefreshCount((count) => count + 1)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0a194f] hover:bg-slate-50"
          >
            Refresh data
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {resources.map((resource) => {
            const result = results[resource.key];

            return (
              <article
                key={resource.key}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs"
              >
                <h3 className="text-sm font-bold text-[#0a194f] mb-3">
                  {resource.label}
                </h3>
                {!result || result.status === "loading" ? (
                  <p className="text-xs text-gray-500">Loading live data...</p>
                ) : result.status === "error" ? (
                  <p
                    role="alert"
                    className="text-xs text-rose-700 whitespace-pre-wrap"
                  >
                    {result.message}
                  </p>
                ) : isEmptyData(result.data) ? (
                  <p className="text-xs text-gray-500">No data available.</p>
                ) : (
                  <pre className="max-h-96 overflow-auto rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700 whitespace-pre-wrap break-words">
                    {JSON.stringify(result.data, null, 2) ??
                      "The endpoint returned no response body."}
                  </pre>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
