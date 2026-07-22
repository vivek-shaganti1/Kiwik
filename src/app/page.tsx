"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Layers, 
  Play, 
  Terminal as TerminalIcon,
  Activity,
  Cpu,
  Zap,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { Centerpiece } from "@/components/home/centerpiece";
import { MacosDashboard } from "@/components/home/macos-dashboard";
import { AiRaycastPanel } from "@/components/home/ai-raycast-panel";
import { useCounter } from "@/hooks/use-counter";

export default function HomePage() {
  const [bootStep, setBootStep] = useState(0);
  const bootMessages = [
    "Connecting to Criska edge...",
    "Loading Kiwik.1 core projects...",
    "Synchronizing workspace telemetry...",
    "Vercel serverless deployments ready...",
    "Kiwik OS v1.0.0-beta ONLINE."
  ];

  useEffect(() => {
    // Record visitor session
    fetch("/api/visitors", { method: "POST" }).catch((err) =>
      console.error("Error logging visitor session", err)
    );

    // Boot terminal sequence animation
    const interval = setInterval(() => {
      setBootStep((prev) => {
        if (prev < bootMessages.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-text-primary overflow-x-hidden relative">
      <AuroraBackground intensity="medium" />

      {/* Hero Section: Full Viewport 12-Column Layout */}
      <section className="relative min-h-[95svh] flex items-center pt-28 pb-12 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto overflow-visible">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT PANEL: Cinematic Headline & Call-to-Actions */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="col-span-1 lg:col-span-6 flex flex-col justify-center space-y-6 text-left"
          >
            {/* Version Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glass-bg border border-glass-border shadow-sm w-fit select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-wider">
                Kiwik.1 v1.0.0-beta
              </span>
            </div>

            {/* Title Header with animated gradients */}
            <h1 className="text-4xl sm:text-5xl md:text-[62px] font-serif font-semibold leading-[1.08] tracking-tight text-text-primary">
              The Operating System <br />
              for <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-indigo-500 to-accent-cyan bg-[size:200%_auto] animate-[aurora-text_6s_linear_infinite] font-serif font-bold italic">Digital Products.</span>
            </h1>

            {/* Paragraph Description */}
            <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium max-w-[480px]">
              Build. Ship. Document. Scale. Everything.
              Unified workspace for projects, documentation, deployments, analytics, and AI assistant layers.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link 
                href="/projects" 
                className="flex items-center gap-2 px-6 py-3 text-xs font-semibold rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border border-neutral-800 dark:border-white/20 shadow-md hover:scale-102 transition-all duration-300"
              >
                Explore Projects
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
                className="flex items-center gap-2 px-6 py-3 text-xs font-semibold rounded-full bg-glass-bg hover:bg-glass-bg-hover border border-glass-border shadow-sm transition-all duration-300"
              >
                <Play className="w-3.5 h-3.5 text-accent-blue fill-accent-blue/20" />
                Watch Overview
              </button>
            </div>

            {/* Core telemetry stats list */}
            <div className="grid grid-cols-4 gap-3 pt-8 border-t border-divider/60 max-w-[500px]">
              {[
                { val: "24+", label: "Projects" },
                { val: "1.2M+", label: "Visitors" },
                { val: "99.9%", label: "Uptime" },
                { val: "42ms", label: "Response" }
              ].map((st, i) => (
                <div key={i} className="text-left select-none">
                  <div className="text-sm sm:text-base font-bold text-text-primary tracking-tight font-mono">
                    {st.val}
                  </div>
                  <div className="text-[9px] text-text-secondary uppercase tracking-widest font-bold mt-0.5">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT PANEL: Centerpiece and Floating Boot Terminal */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center relative min-h-[460px] overflow-visible">
            {/* Holographic Centerpiece */}
            <Centerpiece />

            {/* Dark glass boot terminal overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-[-10px] right-2 sm:right-6 w-[230px] rounded-xl bg-black/85 border border-white/10 p-3.5 shadow-2xl font-mono text-[9px] text-emerald-400/90 leading-relaxed text-left z-30 select-none shadow-emerald-950/20"
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5 mb-2 text-white/50 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                <span className="ml-1 text-[8px]">kiwik-os-boot.sh</span>
              </div>

              <div className="space-y-1 min-h-[70px]">
                {bootMessages.slice(0, bootStep + 1).map((msg, i) => (
                  <div key={i} className={cn(
                    i === bootStep && bootStep < bootMessages.length - 1 ? "animate-pulse" : "",
                    i === bootMessages.length - 1 ? "text-accent-cyan font-bold" : ""
                  )}>
                    {i === bootMessages.length - 1 ? "✔" : "●"} {msg}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* LOWER GRID SECTION: macOS Control Dashboard & Raycast AI Panel */}
      <section className="relative z-20 py-8 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col xl:flex-row gap-6 items-stretch justify-center">
          {/* Interactive Desktop Workspace Dashboard */}
          <div className="flex-1">
            <MacosDashboard />
          </div>

          {/* Floating Raycast AI side panel */}
          <div className="xl:mt-12 flex-shrink-0">
            <AiRaycastPanel />
          </div>
        </div>
      </section>
    </div>
  );
}
