"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Cloud, Layers, CreditCard, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeaturedProductsGrid() {
  const products = [
    {
      id: "criska-ai",
      slug: "criska-ai",
      name: "CriskaAI",
      badge: "Private Beta",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      desc: "AI knowledge assistant for operations and support teams.",
      gradient: "from-purple-950/30 via-slate-900/60 to-purple-900/20",
      borderColor: "border-purple-500/25 hover:border-purple-500/50",
      accentColor: "text-purple-400"
    },
    {
      id: "criska-cloud",
      slug: "criska-cloud",
      name: "CriskaCloud",
      badge: "Pilot",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      icon: <Cloud className="w-5 h-5 text-blue-400" />,
      desc: "Managed infrastructure and deployment platform.",
      gradient: "from-blue-950/30 via-slate-900/60 to-blue-900/20",
      borderColor: "border-blue-500/25 hover:border-blue-500/50",
      accentColor: "text-blue-400"
    },
    {
      id: "kiwik",
      slug: "kiwik-1",
      name: "Kiwik",
      badge: "Live",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      desc: "Central hub for products, documentation and demos.",
      gradient: "from-cyan-950/30 via-slate-900/60 to-cyan-900/20",
      borderColor: "border-cyan-500/25 hover:border-cyan-500/50",
      accentColor: "text-cyan-400"
    },
    {
      id: "criska-pay",
      slug: "criska-pay",
      name: "CriskaPay",
      badge: "Prototype",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      icon: <CreditCard className="w-5 h-5 text-indigo-400" />,
      desc: "Secure payment and billing for digital businesses.",
      gradient: "from-indigo-950/30 via-slate-900/60 to-indigo-900/20",
      borderColor: "border-indigo-500/25 hover:border-indigo-500/50",
      accentColor: "text-indigo-400"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto relative z-20">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono font-bold text-accent-blue uppercase tracking-widest">
          FEATURED PRODUCTS
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary tracking-tight">
          Next-Generation Enterprise Stack
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className={cn(
              "p-7 rounded-3xl bg-gradient-to-br border backdrop-blur-2xl transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden relative group",
              p.gradient,
              p.borderColor
            )}
          >
            <div>
              {/* Header bar */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-bg-primary/90 border border-white/10 shadow-lg">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary tracking-tight group-hover:text-accent-blue transition-colors">
                      {p.name}
                    </h3>
                  </div>
                </div>

                <span className={cn("text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border", p.badgeColor)}>
                  {p.badge}
                </span>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed font-medium mb-6">
                {p.desc}
              </p>

              {/* Embedded ObsidianOS Dashboard Mockup Frame */}
              <div className="rounded-2xl bg-neutral-950/90 border border-white/10 p-4 shadow-inner mb-6 space-y-3 font-mono text-[11px] select-none">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[9px] text-text-muted">system-telemetry.io</span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-1">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 space-y-1">
                    <div className="text-[9px] text-text-muted">LATENCY</div>
                    <div className="text-emerald-400 font-bold">14ms</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 space-y-1">
                    <div className="text-[9px] text-text-muted">NODES</div>
                    <div className="text-cyan-400 font-bold">47 Active</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 space-y-1">
                    <div className="text-[9px] text-text-muted">UPTIME</div>
                    <div className="text-purple-400 font-bold">99.98%</div>
                  </div>
                </div>

                {/* Simulated visual waveform graph */}
                <div className="h-12 w-full flex items-end gap-1 pt-2">
                  {[35, 55, 40, 70, 60, 90, 75, 45, 80, 100, 65, 85, 95, 110, 70, 60].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-blue-600/30 to-cyan-400 rounded-t-sm"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <Link 
                href={`/projects/${p.slug}`}
                className={cn("text-xs font-bold font-mono inline-flex items-center gap-2 hover:underline", p.accentColor)}
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
