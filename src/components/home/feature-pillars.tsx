"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Shield, Box, Cloud, Zap, Sparkles, Layers } from "lucide-react";
import { useSiteCMSStore } from "@/stores/site-cms-store";

export function FeaturePillars() {
  const whyCriskaPills = useSiteCMSStore((state) => state.cms.whyCriskaPills);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Shield": return <Shield className="w-4 h-4 text-emerald-400" />;
      case "Layers": return <Layers className="w-4 h-4 text-amber-400" />;
      case "Cloud": return <Cloud className="w-4 h-4 text-accent-blue" />;
      case "Zap": return <Zap className="w-4 h-4 text-cyan-400" />;
      case "Sparkles": return <Sparkles className="w-4 h-4 text-pink-400" />;
      default: return <Cpu className="w-4 h-4 text-purple-400" />;
    }
  };

  const pillars = (whyCriskaPills && whyCriskaPills.length > 0)
    ? whyCriskaPills.filter(p => p.visible !== false)
    : [
        { id: "w-1", text: "AI-Powered Intelligence", iconName: "Cpu" },
        { id: "w-2", text: "Security First", iconName: "Shield" },
        { id: "w-3", text: "Enterprise Ready", iconName: "Layers" },
        { id: "w-4", text: "Cloud Native", iconName: "Cloud" },
        { id: "w-5", text: "Scalable by Design", iconName: "Sparkles" }
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
              {getIcon(p.iconName)}
            </div>
            <span>{p.text || (p as any).title}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
