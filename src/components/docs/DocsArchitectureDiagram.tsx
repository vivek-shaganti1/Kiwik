"use client";

import React, { useState } from "react";
import { Cpu, Layers, Database, Shield, Globe, Bot, Sparkles } from "lucide-react";
import type { ArchitectureDiagramNode } from "@/types/docs-types";

interface DocsArchitectureDiagramProps {
  nodes?: ArchitectureDiagramNode[];
}

export function DocsArchitectureDiagram({ nodes }: DocsArchitectureDiagramProps) {
  const defaultNodes: ArchitectureDiagramNode[] = [
    { id: "fe", label: "Presentation Layer", layer: "frontend", description: "Next.js 16 App Router, React 19, Framer Motion UI", tech: ["Next.js 16", "React 19", "Tailwind v4"] },
    { id: "st", label: "State & CMS Store", layer: "frontend", description: "Zustand store with persistent localStorage sync", tech: ["Zustand", "LocalStorage"] },
    { id: "api", label: "Telemetry & API Routes", layer: "backend", description: "/api/visitors, /api/cms, /api/chat endpoints", tech: ["Serverless API"] },
    { id: "ai", label: "Groq LLM Engine", layer: "ai", description: "Contextual query stream + Fuse.js fuzzy index", tech: ["Groq API", "Llama-3"] },
    { id: "edge", label: "Global Edge Nodes", layer: "edge", description: "Vercel Serverless Edge CDN with 14ms latency", tech: ["Vercel Edge"] }
  ];

  const diagramNodes = nodes && nodes.length > 0 ? nodes : defaultNodes;
  const [activeNodeId, setActiveNodeId] = useState(diagramNodes[0]?.id || "fe");

  const activeNode = diagramNodes.find(n => n.id === activeNodeId) || diagramNodes[0];

  return (
    <div className="space-y-6 my-8">
      {/* Blueprint Diagram Card */}
      <div className="rounded-3xl border border-slate-300/60 dark:border-white/10 overflow-hidden bg-neutral-200/40 dark:bg-white/5 backdrop-blur-xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-300/40 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-500" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Interactive System Blueprint</h4>
          </div>
          <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            Click nodes to inspect specs
          </span>
        </div>

        {/* Nodes Grid Canvas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {diagramNodes.map((node) => {
            const isSelected = node.id === activeNodeId;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "bg-gradient-to-br from-indigo-600 to-blue-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20 scale-[1.02]"
                    : "bg-white/60 dark:bg-white/5 border-slate-300/40 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-neutral-200/60 dark:hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                    isSelected ? "text-indigo-200" : "text-indigo-500 dark:text-indigo-400"
                  }`}>
                    {node.layer}
                  </span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />}
                </div>
                <h5 className="text-sm font-bold leading-snug">{node.label}</h5>
                <p className={`text-[11px] mt-1 line-clamp-2 font-semibold ${
                  isSelected ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"
                }`}>
                  {node.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Node Details Box */}
        {activeNode && (
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h5 className="text-xs font-mono uppercase font-bold text-emerald-400 tracking-wider">
                Node Inspection: {activeNode.label}
              </h5>
              <span className="text-[10px] font-mono text-slate-400">Layer: {activeNode.layer}</span>
            </div>

            <p className="text-xs text-slate-300 font-semibold leading-relaxed">
              {activeNode.description}
            </p>

            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Tech Stack:</span>
              {activeNode.tech.map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-indigo-300 font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
