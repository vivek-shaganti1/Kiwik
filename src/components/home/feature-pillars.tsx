"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Shield, Box, Cloud, Zap } from "lucide-react";

export function FeaturePillars() {
  const pillars = [
    {
      id: "ai-intelligence",
      title: "AI-Powered Intelligence",
      icon: <Cpu className="w-4 h-4 text-purple-400" />
    },
    {
      id: "security-first",
      title: "Security First",
      icon: <Shield className="w-4 h-4 text-emerald-400" />
    },
    {
      id: "enterprise-ready",
      title: "Enterprise Ready",
      icon: <Box className="w-4 h-4 text-amber-400" />
    },
    {
      id: "cloud-native",
      title: "Cloud Native",
      icon: <Cloud className="w-4 h-4 text-accent-blue" />
    },
    {
      id: "scalable-design",
      title: "Scalable by Design",
      icon: <Zap className="w-4 h-4 text-cyan-400" />
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto relative z-20">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-mono font-bold text-accent-blue uppercase tracking-widest">
          WHY CRISKA
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {pillars.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-5 py-3 rounded-full bg-glass-bg border border-glass-border hover:border-accent-blue/40 backdrop-blur-xl flex items-center gap-3 text-xs font-bold text-text-primary shadow-lg transition-all cursor-pointer group"
          >
            <div className="p-1.5 rounded-full bg-bg-secondary border border-glass-border group-hover:scale-110 transition-transform">
              {p.icon}
            </div>
            <span>{p.title}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
