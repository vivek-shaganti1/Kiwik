"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  FileText, 
  Search, 
  Cloud, 
  FileCode, 
  MessageSquare,
  ChevronRight,
  Terminal,
  Cpu,
  CornerDownLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAction {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export function AiRaycastPanel() {
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [simulatedResponse, setSimulatedResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const actions: AIAction[] = [
    { id: "summarize", label: "Summarize Project", sublabel: "Compress README parameters", icon: <FileText className="w-3.5 h-3.5 text-accent-blue" /> },
    { id: "find_doc", label: "Find Documentation", sublabel: "Query platform manuals", icon: <Search className="w-3.5 h-3.5 text-purple-400" /> },
    { id: "health", label: "Check Deployments", sublabel: "Query edge health status", icon: <Cloud className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: "readme", label: "Generate README", sublabel: "Draft codebase documentation", icon: <FileCode className="w-3.5 h-3.5 text-amber-400" /> },
    { id: "ask", label: "Ask Anything", sublabel: "Ask about Criska systems", icon: <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> }
  ];

  const handleActionClick = (id: string, label: string) => {
    setActiveQuery(label);
    setLoading(true);
    setSimulatedResponse("");

    // Simulate AI thinking and streaming response
    setTimeout(() => {
      setLoading(false);
      switch (id) {
        case "summarize":
          setSimulatedResponse("🤖 Kiwik.1 summaries: 6 platform projects index active. Top stats average 14ms global edge latency across 47 production deployments.");
          break;
        case "find_doc":
          setSimulatedResponse("🤖 Query found: 362 documents parsed. Core frameworks listed are Next.js 16, React 19, Tailwind CSS v4, and Zustand state storage.");
          break;
        case "health":
          setSimulatedResponse("🤖 Deployments check: All Vercel serverless edge nodes report 100% operational. Active edge node aliases map directly to the main production pipeline.");
          break;
        case "readme":
          setSimulatedResponse("🤖 Draft generated: # Kiwik.1 OS \\n The operating control deck for all Criska ecosystem deployments. Powered by frosted glassmorphism sheets.");
          break;
        case "ask":
          setSimulatedResponse("🤖 Criska AI assistant initialized. Ask about project status, team profiles, edge metrics, or system config templates!");
          break;
        default:
          setSimulatedResponse("🤖 Query processed successfully.");
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-[340px] select-none mx-auto lg:mx-0">
      <div className="vision-glass border border-white/50 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl flex flex-col gap-4 min-h-[580px] justify-between relative overflow-hidden">
        
        {/* Header Title */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-secondary uppercase tracking-widest font-bold">
              <Sparkles className="w-3 h-3 text-accent-blue" />
              <span>KIWIK AI</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ready</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-text-primary">
            How can I help you today?
          </h3>
        </div>

        {/* Panel Main Display */}
        <div className="flex-1 flex flex-col justify-between mt-2 gap-4">
          <AnimatePresence mode="wait">
            {!activeQuery ? (
              // Actions list
              <motion.div 
                key="actions-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-1.5"
              >
                {actions.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => handleActionClick(act.id, act.label)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-200/40 dark:hover:bg-white/5 border border-transparent hover:border-glass-border transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-bg-secondary/60 border border-glass-border text-text-secondary group-hover:scale-105 transition-transform">
                        {act.icon}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-text-primary tracking-tight leading-tight">
                          {act.label}
                        </div>
                        <div className="text-[9px] text-text-secondary font-mono mt-0.5 leading-none">
                          {act.sublabel}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </motion.div>
            ) : (
              // Active simulated interaction panel output
              <motion.div
                key="response-screen"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col justify-between p-3.5 rounded-2xl bg-bg-secondary/20 border border-glass-border font-mono text-[10px] leading-relaxed relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-text-muted pb-2 border-b border-divider/60">
                    <span className="font-bold uppercase tracking-wider">Active Search</span>
                    <button 
                      onClick={() => setActiveQuery(null)}
                      className="hover:text-text-primary font-bold uppercase transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="text-text-primary font-semibold">
                    &gt; {activeQuery}
                  </div>

                  {loading ? (
                    <div className="flex items-center gap-2 text-accent-blue py-4">
                      <Cpu className="w-3.5 h-3.5 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  ) : (
                    <div className="text-text-secondary whitespace-pre-wrap select-text selection:bg-accent-blue/20">
                      {simulatedResponse}
                    </div>
                  )}
                </div>

                <div className="text-[9px] text-text-muted mt-4 text-right flex items-center justify-end gap-1 select-none">
                  <span>Press Esc to exit</span>
                  <CornerDownLeft className="w-2.5 h-2.5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer shortcuts */}
        <div className="pt-3 border-t border-divider/60 flex items-center justify-between font-mono text-[9px] text-text-secondary select-none">
          <span>Search documentation...</span>
          <div className="flex items-center gap-0.5 bg-black/5 dark:bg-white/5 border border-glass-border px-1.5 py-0.5 rounded text-[8px] font-bold">
            ⌘K
          </div>
        </div>

      </div>
    </div>
  );
}
