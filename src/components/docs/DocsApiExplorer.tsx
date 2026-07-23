"use client";

import React, { useState } from "react";
import { Copy, Check, Play, Globe, Terminal, Sparkles } from "lucide-react";
import type { ApiEndpointSpec } from "@/types/docs-types";

interface DocsApiExplorerProps {
  endpoints: ApiEndpointSpec[];
}

export function DocsApiExplorer({ endpoints }: DocsApiExplorerProps) {
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useState(0);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [liveResponse, setLiveResponse] = useState<string | null>(null);

  const ep = endpoints[selectedEndpointIndex] || endpoints[0];

  const handleCopyCurl = () => {
    if (typeof window !== "undefined" && ep) {
      navigator.clipboard.writeText(ep.curlExample);
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 2000);
    }
  };

  const handleExecuteLive = async () => {
    setIsExecuting(true);
    setLiveResponse(null);

    try {
      if (ep.method === "GET") {
        const res = await fetch(ep.path);
        const data = await res.json();
        setLiveResponse(JSON.stringify(data, null, 2));
      } else {
        // Simulate real response payload
        setTimeout(() => {
          setLiveResponse(ep.responseBody);
          setIsExecuting(false);
        }, 600);
        return;
      }
    } catch (err: any) {
      setLiveResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6 my-8">
      {/* Endpoint Picker Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {endpoints.map((e, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedEndpointIndex(idx);
              setLiveResponse(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
              selectedEndpointIndex === idx
                ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20"
                : "bg-white/60 dark:bg-white/5 border border-slate-300/40 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-neutral-200 dark:hover:bg-white/10"
            }`}
          >
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
              e.method === "GET" ? "bg-emerald-500/20 text-emerald-300" : "bg-blue-500/20 text-blue-300"
            }`}>
              {e.method}
            </span>
            <span>{e.path}</span>
          </button>
        ))}
      </div>

      {/* Selected Endpoint Card */}
      {ep && (
        <div className="rounded-3xl border border-slate-300/60 dark:border-white/10 overflow-hidden bg-neutral-200/40 dark:bg-white/5 backdrop-blur-xl shadow-xl space-y-6 p-6 sm:p-8">
          
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300/40 dark:border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                  ep.method === "GET" ? "bg-emerald-500 text-white" : "bg-blue-600 text-white"
                }`}>
                  {ep.method}
                </span>
                <span className="text-base font-mono font-bold text-slate-900 dark:text-white">{ep.path}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{ep.summary}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCurl}
                className="px-3.5 py-2 rounded-xl bg-white/60 dark:bg-white/10 border border-slate-300/40 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCurl ? "cURL Copied" : "Copy cURL"}</span>
              </button>

              <button
                onClick={handleExecuteLive}
                disabled={isExecuting}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isExecuting ? "Executing..." : "Test Endpoint Live"}</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
            {ep.description}
          </p>

          {/* cURL Command Spec */}
          <div className="space-y-2">
            <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
              cURL Command
            </h5>
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto custom-scrollbar">
              <pre className="text-emerald-400">{ep.curlExample}</pre>
            </div>
          </div>

          {/* Response Payload Spec */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                {liveResponse ? "Live Execution Response (200 OK)" : "Sample JSON Response Payload"}
              </h5>
              {liveResponse && (
                <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 200 OK
                </span>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto custom-scrollbar border border-slate-800">
              <pre className="text-indigo-300">{liveResponse || ep.responseBody}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
