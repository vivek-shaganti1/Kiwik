"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Cpu, Cloud, CreditCard, Layers, ShieldCheck, Terminal, StopCircle } from "lucide-react";
import { useProjects } from "@/stores/projects-store";
import { cn } from "@/lib/utils";

// Category Ambient Color Config for Morphing Background
const CATEGORY_COLORS: Record<string, { glow: string; text: string; badge: string }> = {
  ai: {
    glow: "rgba(168, 85, 247, 0.22)",
    text: "text-purple-400",
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  },
  cloud: {
    glow: "rgba(59, 130, 246, 0.22)",
    text: "text-blue-400",
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  },
  payments: {
    glow: "rgba(16, 185, 129, 0.22)",
    text: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  automation: {
    glow: "rgba(249, 115, 22, 0.22)",
    text: "text-orange-400",
    badge: "bg-orange-500/10 text-orange-300 border-orange-500/30",
  },
  web: {
    glow: "rgba(14, 165, 233, 0.22)",
    text: "text-sky-400",
    badge: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  },
  saas: {
    glow: "rgba(99, 102, 241, 0.22)",
    text: "text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
  },
};

const DEFAULT_COLOR = {
  glow: "rgba(148, 163, 184, 0.22)",
  text: "text-slate-300",
  badge: "bg-slate-500/10 text-slate-300 border-slate-500/30",
};

export function AppleCoverflowCarousel() {
  const projects = useProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayProjects = projects.length > 0 ? projects : [
    {
      id: "criska-ai",
      slug: "criska-ai",
      name: "CriskaAI",
      category: "ai",
      status: "private-beta",
      tagline: "Autonomous knowledge assistant and operational intelligence engine.",
      description: "AI knowledge assistant for support and operations teams.",
      techStack: [{ name: "Next.js" }, { name: "Python" }, { name: "PyTorch" }],
    },
    {
      id: "criska-cloud",
      slug: "criska-cloud",
      name: "CriskaCloud",
      category: "cloud",
      status: "pilot",
      tagline: "Managed cloud infrastructure, telemetry, and automated deployment platform.",
      description: "Managed infrastructure and deployment platform.",
      techStack: [{ name: "Kubernetes" }, { name: "Go" }, { name: "Docker" }],
    },
    {
      id: "criska-pay",
      slug: "criska-pay",
      name: "CriskaPay",
      category: "payments",
      status: "prototype",
      tagline: "Encrypted instant settlement, billing engine, and automated digital ledger.",
      description: "Secure payment and billing for digital businesses.",
      techStack: [{ name: "Stripe" }, { name: "PostgreSQL" }, { name: "Rust" }],
    },
    {
      id: "kiwik",
      slug: "kiwik-1",
      name: "Kiwik Hub",
      category: "automation",
      status: "live",
      tagline: "Central command hub, live documentation, and real-time edge telemetry engine.",
      description: "Central hub for products, documentation and demos.",
      techStack: [{ name: "React" }, { name: "TypeScript" }, { name: "Tailwind" }],
    },
  ];

  const total = displayProjects.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Keyboard Navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  // Autoplay every 7 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Mouse Wheel Navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 30) {
      if (e.deltaX > 0) handleNext();
      else handlePrev();
    }
  };

  const activeProject = displayProjects[activeIndex];
  const colorStyle = CATEGORY_COLORS[activeProject.category.toLowerCase()] || DEFAULT_COLOR;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onWheel={handleWheel}
      className="relative w-full max-w-[1400px] min-h-[680px] sm:min-h-[740px] mx-auto flex flex-col items-center justify-center select-none overflow-hidden transform-gpu py-8"
    >
      {/* ─────────────────────────────────────────────────────────────
          MORPHING AMBIENT BACKGROUND BACKLIGHT (Crossfades 600ms)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[480px] rounded-full blur-[120px] pointer-events-none z-0"
        animate={{ background: colorStyle.glow }}
        transition={{ duration: 0.6 }}
      />

      {/* ─────────────────────────────────────────────────────────────
          3D COVER-FLOW CAROUSEL CONTAINER
         ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[520px] sm:h-[600px] flex items-center justify-center perspective-[1200px] z-10 overflow-visible">
        {displayProjects.map((project, idx) => {
          // Calculate offset position relative to active card
          let offset = idx - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCenter = offset === 0;
          const isLeft = offset === -1 || (offset < 0 && Math.abs(offset) < total / 2);
          const isRight = offset === 1 || (offset > 0 && Math.abs(offset) < total / 2);

          // 3D Perspective Calculations for Cover Flow
          const translateX = offset * 420; // Distance between side cards
          const scale = isCenter ? 1 : 0.82;
          const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.45 : 0;
          const rotateY = offset * -20; // Cover-Flow tilt angle (-20deg left, +20deg right)
          const zIndex = 30 - Math.abs(offset) * 10;
          const blur = isCenter ? "blur(0px)" : "blur(4px)";

          return (
            <motion.div
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              animate={{
                x: translateX,
                scale,
                rotateY: `${rotateY}deg`,
                opacity,
                zIndex,
                filter: blur,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 25 }}
              style={{ transformStyle: "preserve-3d" }}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-[1150px] h-[480px] sm:h-[560px] rounded-[32px] bg-[#0A0C12] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col lg:flex-row cursor-pointer transition-all duration-500 transform-gpu",
                isCenter ? "pointer-events-auto" : "pointer-events-auto hover:opacity-75"
              )}
            >
              {/* ── 70% CINEMATIC PRODUCT VISUAL AREA ── */}
              <div className="relative w-full lg:w-[68%] h-[55%] lg:h-full bg-[#0E1017] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden flex items-center justify-center p-6 group">
                
                {/* Background Specular Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.04] pointer-events-none" />

                {/* ── Visual Variant per Category ── */}
                {project.category.toLowerCase() === "ai" && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-purple-600 via-rose-600 to-amber-500 opacity-80 blur-2xl animate-pulse" />
                    <div className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-purple-500 via-rose-500 to-amber-400 shadow-[0_0_90px_rgba(168,85,247,0.7)] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <Cpu className="w-12 h-12 text-purple-300 animate-pulse" />
                      </div>
                    </div>
                    {/* Audio Bar Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-between shadow-2xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-white/90 font-semibold">02:04 Neural Operations Assistant</span>
                        <div className="flex items-end gap-1 h-4">
                          {[50, 80, 60, 100, 70, 90, 45, 85].map((h, i) => (
                            <div key={i} className="w-1 bg-purple-400 rounded-full animate-pulse" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-[10px] font-mono text-purple-300 font-bold">● Active Agent</span>
                    </div>
                  </div>
                )}

                {project.category.toLowerCase() === "cloud" && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-950 via-slate-900 to-slate-950 opacity-90" />
                    <div className="w-56 h-56 rounded-3xl bg-gradient-to-br from-blue-600/30 to-indigo-900/40 border border-blue-500/20 rotate-12 blur-sm" />
                    <div className="relative z-10 w-[88%] p-6 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 shadow-2xl space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white/60">Cluster Telemetry</span>
                        <span className="text-emerald-400 font-bold">99.98% UPTIME</span>
                      </div>
                      <div className="text-3xl font-bold font-mono text-white tracking-tight">47 Active Nodes</div>
                      <div className="h-16 w-full pt-2">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40">
                          <path d="M 0 30 Q 30 10, 60 25 T 120 15 T 180 5 L 200 2" fill="none" stroke="#3B82F6" strokeWidth="3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {project.category.toLowerCase() === "payments" && (
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <div className="w-full h-full p-5 rounded-2xl bg-[#090A0F] border border-white/15 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-xs font-mono text-white/50">criskapay-settlement.enc</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono text-white/50 uppercase">Total Settled Volume</span>
                          <h4 className="text-2xl font-bold font-mono text-white">$1,420,890.00</h4>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">● Active Ledger</span>
                      </div>
                    </div>
                  </div>
                )}

                {project.category.toLowerCase() !== "ai" && project.category.toLowerCase() !== "cloud" && project.category.toLowerCase() !== "payments" && (
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <div className="w-full h-full p-5 rounded-2xl bg-[#0B0C10] border border-white/15 font-mono text-xs text-white/80 flex flex-col justify-between">
                      <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-white/40">
                        <Terminal className="w-4 h-4 text-sky-400" />
                        <span>kiwik-command-hub</span>
                      </div>
                      <div className="space-y-2 my-auto">
                        <p className="text-emerald-400">✓ All pipelines operational</p>
                        <p className="text-sky-300">⚡ Real-time edge latency: 14ms</p>
                        <p className="text-white/60">→ Synchronized with Admin CMS</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Glass Specular Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-white/5 opacity-60 pointer-events-none" />
              </div>

              {/* ── 30% EDITORIAL CONTENT AREA ── */}
              <div className="w-full lg:w-[32%] p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-[#0A0C12]">
                <div className="space-y-3">
                  
                  {/* Status & Category Badge */}
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border", colorStyle.badge)}>
                      ● {project.status.replace("-", " ")}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-white/40">
                      {project.category}
                    </span>
                  </div>

                  {/* Large Editorial Headline */}
                  <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-white tracking-tight leading-tight">
                    {project.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-sans line-clamp-3">
                    {project.tagline || project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 3).map((t) => (
                      <span key={t.name} className="px-2.5 py-1 text-[10px] font-mono font-medium rounded-full bg-white/10 border border-white/10 text-white/80">
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dynamic CTA Action Links */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-sans font-bold text-xs hover:bg-white/90 transition-all shadow-md group-hover:scale-105"
                  >
                    <span>Explore Platform</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </motion.div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FLOATING NAVIGATION CONTROLS (← Dots Progress →)
         ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-6 mt-6 z-20">
        
        {/* Left Arrow Glass Button (48px) */}
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
          aria-label="Previous project"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Interactive Progress Step Indicators (01 / 04) */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-xs font-mono text-white">
          {displayProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-500 cursor-pointer",
                activeIndex === i ? "w-7 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
          <span className="ml-2 text-[10px] text-white/60 font-bold">
            0{activeIndex + 1} / 0{total}
          </span>
        </div>

        {/* Right Arrow Glass Button (48px) */}
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
          aria-label="Next project"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
}
