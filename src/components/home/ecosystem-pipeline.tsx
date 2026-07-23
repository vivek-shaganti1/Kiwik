"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Layers, Cloud, Shield, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function EcosystemPipeline() {
  const nodes = [
    {
      id: "criska-ai",
      title: "CriskaAI",
      subtitle: "Enterprise Intelligence",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      color: "from-purple-500/20 to-purple-600/5",
      border: "border-purple-500/30 hover:border-purple-500/60",
      glow: "shadow-purple-500/10",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30"
    },
    {
      id: "kiwik",
      title: "Kiwik",
      subtitle: "Product & Knowledge Hub",
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      color: "from-cyan-500/20 to-blue-600/5",
      border: "border-cyan-500/30 hover:border-cyan-500/60",
      glow: "shadow-cyan-500/10",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
    },
    {
      id: "criska-cloud",
      title: "CriskaCloud",
      subtitle: "Cloud & Infrastructure Platform",
      icon: <Cloud className="w-5 h-5 text-blue-400" />,
      color: "from-blue-500/20 to-indigo-600/5",
      border: "border-blue-500/30 hover:border-blue-500/60",
      glow: "shadow-blue-500/10",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30"
    },
    {
      id: "security-identity",
      title: "Security & Identity",
      subtitle: "Secure Access & Governance",
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      color: "from-emerald-500/20 to-teal-600/5",
      border: "border-emerald-500/30 hover:border-emerald-500/60",
      glow: "shadow-emerald-500/10",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto relative z-20">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono font-bold text-accent-blue uppercase tracking-widest">
          THE CRISKA ECOSYSTEM
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary tracking-tight">
          Unified Operating Architecture
        </h2>
      </div>

      {/* Horizontal Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative items-center">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={cn(
                "p-6 rounded-2xl bg-gradient-to-b border backdrop-blur-xl transition-all duration-300 select-none shadow-xl relative group",
                node.color,
                node.border,
                node.glow
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-bg-primary/80 border border-white/10 shadow-inner">
                  {node.icon}
                </div>
                <span className={cn("text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border", node.badgeColor)}>
                  Active Node
                </span>
              </div>

              <h3 className="text-lg font-bold text-text-primary tracking-tight group-hover:text-accent-blue transition-colors">
                {node.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed font-medium mt-1">
                {node.subtitle}
              </p>
            </motion.div>

            {/* Connecting Arrow for larger screens */}
            {index < nodes.length - 1 && (
              <div className="hidden md:flex items-center justify-center absolute z-30 pointer-events-none" style={{ left: `${(index + 1) * 25 - 1.5}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="w-8 h-8 rounded-full bg-bg-secondary border border-glass-border flex items-center justify-center text-accent-blue shadow-md">
                  <ArrowRight className="w-4 h-4 animate-pulse" />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="text-center mt-10">
        <p className="text-xs font-mono text-text-muted tracking-wider uppercase font-semibold">
          Seamlessly connected. Built for scale. Secured by design.
        </p>
      </div>
    </section>
  );
}
