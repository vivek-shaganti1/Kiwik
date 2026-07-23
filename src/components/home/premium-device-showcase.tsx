"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, ShieldCheck, Terminal, CreditCard, Cloud, ArrowUpRight, Activity, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PremiumDeviceShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Motion Values (Max 18px shift)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-18, 18]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="enterprise-device-showcase"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-32 md:py-40 px-4 sm:px-6 md:px-8 max-w-[1550px] mx-auto relative z-20 select-none overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          SUBTLE DOT PATTERN BACKGROUND (3% Opacity)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION HEADER (Apple / Linear Showcase Style)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-[0.35em] text-neutral-500 dark:text-[#A1A1AA]">
          FEATURED PRODUCTS
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-neutral-900 dark:text-white tracking-tight leading-[1.05]">
          Products Crafted for Modern Businesses
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-[#A1A1AA] font-sans font-medium max-w-2xl mx-auto leading-relaxed">
          Engineered from the ground up for high-performance teams. Experience the future of autonomous intelligence, cloud infrastructure, and instant payments.
        </p>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          5 OVERLAPPING REALISTIC DEVICE SHOWCASE (MacBook, iPhones, Tablet, Browser)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-[520px] sm:min-h-[640px] flex items-center justify-center perspective-[1400px] z-10"
      >
        
        {/* ── 1. BACK-LEFT DEVICE: Floating macOS Browser (CriskaCloud) ── */}
        <Link href="/projects/criska-cloud" className="absolute -left-4 sm:left-4 top-4 z-10 hidden md:block group">
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="w-[320px] lg:w-[380px] rounded-2xl bg-[#0C0D14] border border-white/15 p-4 shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-3 group-hover:z-50"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono text-white/50">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span>cloud-telemetry.kiwik.app</span>
              <Cloud className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/70 font-semibold">Cluster Nodes</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">● 47 ONLINE</span>
              </div>
              <div className="h-12 w-full pt-1">
                <svg className="w-full h-full" viewBox="0 0 200 40">
                  <path d="M 0 30 Q 40 10, 80 25 T 160 10 L 200 5" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="text-[10px] font-mono text-white/40 flex justify-between pt-2 border-t border-white/10">
                <span>LATENCY: 14ms</span>
                <span>CPU: 12%</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* ── 2. LEFT FRONT DEVICE: iPhone 16 Pro (CriskaAI Assistant) ── */}
        <Link href="/projects/criska-ai" className="absolute left-6 sm:left-24 lg:left-36 top-16 z-30 group">
          <motion.div
            animate={{ y: [6, -6, 6], rotate: [-6, -4, -6] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="w-[200px] sm:w-[240px] h-[400px] sm:h-[480px] rounded-[44px] bg-[#000000] p-3 border-[4px] border-neutral-800 shadow-[0_35px_80px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-4 group-hover:z-50"
          >
            {/* Dynamic Island Notch */}
            <div className="relative w-full h-full rounded-[36px] bg-[#0A0B10] overflow-hidden p-4 flex flex-col justify-between border border-white/10">
              <div className="w-20 h-4 bg-black rounded-full mx-auto mb-4 border border-white/10 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              </div>
              
              {/* iPhone AI Content */}
              <div className="space-y-3 my-auto">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-amber-500 mx-auto flex items-center justify-center shadow-lg animate-pulse">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider">CriskaAI Mobile</span>
                  <h4 className="text-sm font-serif font-bold text-white">Voice Assistant</h4>
                  <p className="text-[10px] text-white/60 leading-tight">Listening for operational commands...</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-[10px] font-mono text-white/90 flex items-center justify-between">
                <span>02:04 Audio Session</span>
                <span className="text-emerald-400 font-bold">● Active</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* ── 3. CENTER HERO DEVICE: MacBook Pro 16" (Kiwik Central Dashboard) ── */}
        <Link href="/projects" className="relative z-40 group">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="w-[340px] sm:w-[560px] lg:w-[720px] rounded-t-3xl bg-[#14151D] border-[5px] border-neutral-700 shadow-[0_45px_120px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-3"
          >
            {/* Laptop Camera Notch */}
            <div className="w-full h-6 bg-[#0B0C10] rounded-t-2xl flex items-center justify-center px-4 border-b border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-black border border-white/20" />
            </div>

            {/* Display Canvas */}
            <div className="p-5 sm:p-6 bg-[#08090E] min-h-[260px] sm:min-h-[380px] flex flex-col justify-between font-mono text-xs text-white">
              
              {/* Header Nav */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px] text-white/70">
                <div className="flex items-center gap-2">
                  <span className="font-bold font-serif text-white">Kiwik.1 Enterprise Hub</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">v2.4 Live</span>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span>LATENCY: 14ms</span>
                  <span>STATUS: GREEN</span>
                </div>
              </div>

              {/* Central Grid Mockup */}
              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] text-white/50">ACTIVE PIPELINES</span>
                  <h4 className="text-xl font-bold text-white">47 / 47</h4>
                  <div className="w-full h-1.5 rounded-full bg-emerald-500/30 overflow-hidden">
                    <div className="w-full h-full bg-emerald-400" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] text-white/50">SETTLED VOLUME</span>
                  <h4 className="text-xl font-bold text-emerald-400">$1.42M</h4>
                  <span className="text-[9px] text-emerald-300 font-bold">+18.5% today</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] text-white/50">AI VOICE AGENTS</span>
                  <h4 className="text-xl font-bold text-purple-400">12 Active</h4>
                  <span className="text-[9px] text-purple-300 font-bold">Sub-sec latency</span>
                </div>
              </div>

              {/* Console Output Footer */}
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-[10px] text-white/60 flex items-center justify-between">
                <span>→ Syncing operational parameters with Admin CMS...</span>
                <span className="text-sky-400 font-bold">● Synchronized</span>
              </div>

            </div>

            {/* Laptop Base Lip */}
            <div className="w-[108%] -ml-[4%] h-4 bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 rounded-b-xl shadow-md flex items-center justify-center">
              <div className="w-16 h-1 rounded-full bg-neutral-900" />
            </div>
          </motion.div>
        </Link>

        {/* ── 4. RIGHT FRONT DEVICE: iPhone 16 Pro (CriskaPay Checkout) ── */}
        <Link href="/projects/criska-pay" className="absolute right-6 sm:right-24 lg:right-36 top-16 z-30 group">
          <motion.div
            animate={{ y: [-6, 6, -6], rotate: [6, 4, 6] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-[200px] sm:w-[240px] h-[400px] sm:h-[480px] rounded-[44px] bg-[#000000] p-3 border-[4px] border-neutral-800 shadow-[0_35px_80px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-4 group-hover:z-50"
          >
            <div className="relative w-full h-full rounded-[36px] bg-[#090A0F] overflow-hidden p-4 flex flex-col justify-between border border-white/10">
              <div className="w-20 h-4 bg-black rounded-full mx-auto mb-4 border border-white/10 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <div className="space-y-3 my-auto">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">CriskaPay Instant</span>
                  <h4 className="text-sm font-serif font-bold text-white">Settlement Engine</h4>
                  <p className="text-[11px] font-mono font-bold text-emerald-400">$1,420.00 Settled</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300 flex items-center justify-between font-bold">
                <span>Encrypted Ledger</span>
                <span>✓ Verified</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* ── 5. BACK-RIGHT DEVICE: Raycast Floating Terminal (CriskaBot) ── */}
        <Link href="/projects/criska-bot" className="absolute -right-4 sm:right-4 top-4 z-10 hidden md:block group">
          <motion.div
            animate={{ y: [8, -8, 8], rotate: [1, -1, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="w-[300px] lg:w-[360px] rounded-2xl bg-[#0A0C14] border border-white/15 p-4 shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-3 group-hover:z-50"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono text-white/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>criskabot-terminal</span>
              </div>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div className="pt-3 space-y-2 font-mono text-[11px] text-white/80">
              <p className="text-sky-300">⚡ Discord Bot Instance #4 active</p>
              <p className="text-emerald-400">✓ 12,450 Commands processed</p>
              <p className="text-white/40">→ Listening on WebSocket port 8080</p>
            </div>
          </motion.div>
        </Link>

      </motion.div>
    </section>
  );
}
