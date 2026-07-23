"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, ShieldCheck, Zap, Globe } from "lucide-react";

export function FutureVision() {
  const pillars = [
    {
      id: "unified",
      title: "Unified Platform",
      icon: <Layers className="w-5 h-5 text-accent-blue" />
    },
    {
      id: "secure",
      title: "Secure Intelligence",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    },
    {
      id: "operational",
      title: "Operational Excellence",
      icon: <Zap className="w-5 h-5 text-purple-400" />
    },
    {
      id: "scale",
      title: "Limitless Scale",
      icon: <Globe className="w-5 h-5 text-cyan-400" />
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto relative z-20 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-mono font-bold text-accent-blue uppercase tracking-widest">
          THE FUTURE WE ARE BUILDING
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-text-primary tracking-tight">
          Next-Generation Enterprise OS
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {pillars.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -4, scale: 1.03 }}
            className="p-6 rounded-2xl bg-glass-bg border border-glass-border hover:border-accent-blue/30 backdrop-blur-xl flex flex-col items-center justify-center text-center space-y-3 shadow-xl"
          >
            <div className="p-3 rounded-xl bg-bg-secondary border border-glass-border shadow-inner">
              {item.icon}
            </div>
            <span className="text-xs sm:text-sm font-bold text-text-primary tracking-tight">
              {item.title}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Cosmic Planet/Horizon Curve Artwork */}
      <div className="relative w-full h-48 sm:h-64 rounded-3xl overflow-hidden bg-gradient-to-b from-transparent via-blue-950/40 to-indigo-950/80 border border-blue-500/20 flex flex-col items-center justify-end p-8 shadow-2xl">
        <div className="absolute inset-0 bg-radial-[circle_at_bottom,rgba(59,130,246,0.35)_0%,transparent_70%]" />
        
        {/* Curved planet edge line */}
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[140%] h-[300px] rounded-[50%] border-t-2 border-cyan-400/60 shadow-[0_-15px_60px_rgba(59,130,246,0.5)] bg-gradient-to-b from-blue-600/10 to-transparent" />
        
        <div className="relative z-10 text-center space-y-2">
          <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
            Kiwik.1 Enterprise Kernel v1.0.0
          </div>
          <p className="text-xs text-text-secondary max-w-md mx-auto font-medium">
            Architected for zero-trust compliance, sub-millisecond edge latency, and autonomous workflow orchestrations.
          </p>
        </div>
      </div>
    </section>
  );
}
