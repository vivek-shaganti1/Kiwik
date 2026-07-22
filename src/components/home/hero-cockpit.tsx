"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Activity,
  Cpu,
  Server,
  Zap,
  Globe,
  Database,
  ShieldCheck,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Command,
  Layout,
  Layers,
  ArrowRight
} from "lucide-react";
import { GlassSpotlightCard } from "@/components/glass/glass-spotlight-card";
import { cn } from "@/lib/utils";

type CockpitMode = "preview" | "terminal" | "architecture";

interface TerminalLog {
  id: string;
  command: string;
  output: string | React.ReactNode;
  type: "info" | "success" | "warning" | "error";
}

export function HeroCockpit() {
  const [activeMode, setActiveMode] = useState<CockpitMode>("preview");

  // Terminal state
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: "1",
      command: "kiwik init",
      output: "✔ Connected to Criska OS Kernel v1.0.0-beta [Edge Nodes Active]",
      type: "success"
    },
    {
      id: "2",
      command: "kiwik status",
      output: "● 6 Active Projects | 47 Deployments | 14ms Global Latency | 99.98% Uptime",
      type: "info"
    }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (activeMode === "terminal") {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, activeMode]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode = "";
    let type: "info" | "success" | "warning" | "error" = "info";

    if (!trimmed) return;

    switch (trimmed) {
      case "help":
        response = (
          <div className="space-y-1">
            <p className="text-amber-400 font-bold">Available Commands:</p>
            <p>• <span className="text-accent-blue font-semibold">projects</span> - List all active platform projects</p>
            <p>• <span className="text-accent-blue font-semibold">stats</span> - View live performance metrics</p>
            <p>• <span className="text-accent-blue font-semibold">build</span> - Simulate Next.js 15 production build</p>
            <p>• <span className="text-accent-blue font-semibold">about</span> - Print Kiwik.1 architecture manifesto</p>
            <p>• <span className="text-accent-blue font-semibold">clear</span> - Clear terminal logs</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-bold">Active Kiwik Projects:</p>
            <p>1. <span className="text-white font-bold">Kiwik.1</span> [Web] - 72% Completed - In Progress</p>
            <p>2. <span className="text-white font-bold">CriskaAI</span> [AI] - 100% Completed - Live</p>
            <p>3. <span className="text-white font-bold">CriskaCloud</span> [DevOps] - 65% Completed - In Progress</p>
            <p>4. <span className="text-white font-bold">FlowEngine</span> [Automation] - 90% Completed - Live</p>
          </div>
        );
        type = "success";
        break;

      case "stats":
        response = "⚡ Serverless Latency: 14ms | Edge Hit Ratio: 99.4% | Memory: 68MB | CPU: 1.2%";
        type = "info";
        break;

      case "build":
        response = "🚀 [Webpack] Compiled 472 modules in 412ms. Route /admin & /projects built cleanly!";
        type = "success";
        break;

      case "about":
        response = "🔮 Kiwik.1 is the central operating system for Criska projects, crafted with Next.js 15, React 19, and Glassmorphism 2.0.";
        type = "info";
        break;

      case "clear":
        setLogs([]);
        return;

      default:
        response = `Command '${cmd}' not recognized. Type 'help' for available commands.`;
        type = "error";
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        command: cmd,
        output: response,
        type
      }
    ]);
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
    setInputVal("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      <GlassSpotlightCard className="overflow-hidden border border-white/15 bg-neutral-950/80 shadow-2xl">
        {/* Cockpit Window Header */}
        <div className="px-4 py-3 bg-neutral-900/90 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="ml-2 text-xs font-mono text-neutral-400">kiwik-os://cockpit-v1</span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-900 border border-white/10">
            <button
              onClick={() => setActiveMode("preview")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5",
                activeMode === "preview"
                  ? "bg-accent-blue/20 text-accent-blue border border-accent-blue/30 shadow-sm"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Live Monitor</span>
            </button>

            <button
              onClick={() => setActiveMode("terminal")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5",
                activeMode === "terminal"
                  ? "bg-accent-blue/20 text-accent-blue border border-accent-blue/30 shadow-sm"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI Terminal</span>
            </button>

            <button
              onClick={() => setActiveMode("architecture")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5",
                activeMode === "architecture"
                  ? "bg-accent-blue/20 text-accent-blue border border-accent-blue/30 shadow-sm"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture</span>
            </button>
          </div>
        </div>

        {/* Cockpit Window Content */}
        <div className="p-5 sm:p-8 min-h-[380px] flex flex-col justify-between bg-gradient-to-b from-neutral-950/90 to-black">
          {/* MODE 1: LIVE MONITOR */}
          {activeMode === "preview" && (
            <div className="space-y-6">
              {/* Top Banner Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">System Health</p>
                    <p className="text-sm font-bold text-white">100% Operational</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Global Edge Latency</p>
                    <p className="text-sm font-bold text-white">14ms Average</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Render Engine</p>
                    <p className="text-sm font-bold text-white">Next.js 15 + React 19</p>
                  </div>
                </div>
              </div>

              {/* Real-time Project Live Monitor Grid */}
              <div className="p-5 rounded-xl bg-neutral-900/40 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">Active Deployments</span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Live Telemetry
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Kiwik.1 OS", status: "In Progress", percent: 72, category: "Web OS", color: "from-blue-500 to-cyan-500" },
                    { name: "CriskaAI Platform", status: "Completed", percent: 100, category: "AI Assistant", color: "from-violet-500 to-purple-500" },
                    { name: "CriskaCloud", status: "In Progress", percent: 65, category: "DevOps", color: "from-emerald-500 to-teal-500" },
                    { name: "FlowEngine", status: "Completed", percent: 90, category: "Automation", color: "from-amber-500 to-orange-500" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-black/60 border border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{item.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
                            {item.category}
                          </span>
                        </div>
                        <div className="w-32 bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-2">
                          <div className={cn("h-full bg-gradient-to-r", item.color)} style={{ width: `${item.percent}%` }} />
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-neutral-300">{item.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: INTERACTIVE TERMINAL */}
          {activeMode === "terminal" && (
            <div className="flex flex-col justify-between h-full space-y-4 font-mono text-xs">
              <div className="space-y-3 overflow-y-auto max-h-[260px] pr-2">
                <p className="text-neutral-500">Type <span className="text-accent-blue font-bold">'help'</span> or click preset pills below:</p>

                {logs.map((log) => (
                  <div key={log.id} className="space-y-1">
                    <div className="flex items-center gap-2 text-neutral-400">
                      <span className="text-emerald-400">guest@kiwik:~$</span>
                      <span className="text-white font-semibold">{log.command}</span>
                    </div>
                    <div className={cn("pl-4 text-neutral-300", {
                      "text-emerald-400": log.type === "success",
                      "text-amber-400": log.type === "warning",
                      "text-rose-400": log.type === "error",
                    })}>
                      {log.output}
                    </div>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Command Presets & Input */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Presets:</span>
                  {["projects", "stats", "build", "about", "help", "clear"].map((p) => (
                    <button
                      key={p}
                      onClick={() => handleCommand(p)}
                      className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors text-[11px]"
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <form onSubmit={onFormSubmit} className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">guest@kiwik:~$</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="type command (e.g. 'projects')..."
                    className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-xs"
                  />
                  <button type="submit" className="p-1 rounded bg-accent-blue text-white hover:bg-blue-600 transition-colors">
                    <Play className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* MODE 3: ARCHITECTURE BLUEPRINT */}
          {activeMode === "architecture" && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h4 className="text-sm font-bold text-white">System Architecture & Data Flow</h4>
                <p className="text-xs text-text-secondary">High-performance serverless pipeline with client hydration safety.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-center">
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-white/10">
                  <Globe className="w-5 h-5 text-accent-blue mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Client</p>
                  <p className="text-[10px] text-neutral-400">React 19 Hydration</p>
                </div>

                <div className="hidden sm:flex justify-center text-neutral-600">
                  <ArrowRight className="w-4 h-4 animate-pulse text-accent-blue" />
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/80 border border-accent-blue/30 bg-accent-blue/5">
                  <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Next.js 15</p>
                  <p className="text-[10px] text-neutral-400">App Router Edge</p>
                </div>

                <div className="hidden sm:flex justify-center text-neutral-600">
                  <ArrowRight className="w-4 h-4 animate-pulse text-accent-blue" />
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/80 border border-white/10">
                  <Database className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">State Store</p>
                  <p className="text-[10px] text-neutral-400">Zustand + Persist</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </GlassSpotlightCard>
    </div>
  );
}
