"use client";

import React, { useState } from "react";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { motion } from "framer-motion";
import { X, Play, Shield, Activity, Cpu, Layers } from "lucide-react";

export function HeroDemo() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg-primary text-text-primary">
      {/* Background Layer */}
      <AuroraBackground intensity="medium" />

      {/* Main Animated Hero Component */}
      <AnimatedHero onWatchOverview={() => setIsVideoModalOpen(true)} />

      {/* Simulated Diagnostic Telemetry Modal (for Watch Overview CTA) */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-3xl rounded-2xl bg-glass-bg border border-glass-border backdrop-blur-3xl shadow-2xl overflow-hidden text-left"
          >
            {/* macOS Chrome Header */}
            <div className="px-4 py-3 bg-bg-secondary/60 border-b border-divider flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors"
                />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono text-text-secondary">
                  kiwik_telemetry_overview.mp4
                </span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Mockup Area */}
            <div className="p-8 sm:p-12 aspect-video bg-gradient-to-br from-indigo-950/80 via-black to-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center text-accent-blue animate-pulse">
                <Play className="w-6 h-6 fill-accent-blue ml-1" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white tracking-tight">
                Kiwik.1 Operating System Telemetry Overview
              </h3>
              <p className="text-xs text-slate-400 max-w-md font-medium leading-relaxed">
                Demonstrating real-time project store sync, Next.js static engine speeds, AI context routing, and Vercel edge deployment status.
              </p>

              <div className="flex items-center gap-6 pt-4 text-slate-300 text-xs font-mono">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400" /> 100% Edge Health
                </span>
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-amber-400" /> 42ms Latency
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-indigo-400" /> SOC 2 Secure
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default HeroDemo;
