"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Command,
  Layers,
  Globe,
  Palette,
  FileCode,
  Check,
  Copy,
  Terminal,
  Zap,
  ArrowRight,
  Shield
} from "lucide-react";
import { GlassSpotlightCard } from "@/components/glass/glass-spotlight-card";
import { cn } from "@/lib/utils";

export function BentoGrid() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"ts" | "prisma" | "tailwind">("ts");

  const sampleCode = {
    ts: `import { useProjects } from "@/stores/projects-store";

export function Portfolio() {
  const projects = useProjects();
  return <Showcase items={projects} priority="high" />;
}`,
    prisma: `model Project {
  id               String   @id @default(uuid())
  name             String
  slug             String   @unique
  completionPercent Int      @default(0)
  status           Status   @default(IN_PROGRESS)
}`,
    tailwind: `@import "tailwindcss";

@layer theme {
  --color-glass-bg: rgba(255, 255, 255, 0.05);
  --color-glass-border: rgba(255, 255, 255, 0.1);
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCode[activeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 md:px-8">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Platform Superpowers
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold bg-clip-text text-transparent bg-gradient-to-r from-text-primary via-text-primary/95 to-text-secondary">
          Engineered for Visual Excellence & Speed
        </h2>
        <p className="text-text-secondary text-base sm:text-lg">
          Every component in Kiwik.1 is built from the ground up to deliver a $100M startup visual experience.
        </p>
      </div>

      {/* Bento Grid 2.0 (6 Blocks) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* BLOCK 1: GLASSMORPHISM 2.0 SPECULAR ENGINE (Span 2) */}
        <GlassSpotlightCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between min-h-[320px] group">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">Glassmorphism 2.0 Engine</h3>
                <p className="text-xs text-text-secondary">Specular lighting, mouse-reactive spotlights & depth layers</p>
              </div>
            </div>

            <p className="text-sm text-text-secondary max-w-lg mb-6">
              Features multi-layered glass cards with backdrop blurs, dynamic specular cursor highlights, and noise reduction designed specifically for high-density OLED displays.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-bg-secondary/40 border border-glass-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-text-secondary">Backdrop-Blur: 24px</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-glass-bg border border-glass-border text-text-secondary font-mono">
                Specular Spotlight: Active
              </span>
            </div>
          </div>
        </GlassSpotlightCard>

        {/* BLOCK 2: COMMAND PALETTE ⌘K */}
        <GlassSpotlightCard className="p-6 sm:p-8 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 w-fit mb-4">
              <Command className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">⌘K Command Palette</h3>
            <p className="text-sm text-text-secondary">
              Instant fuzzy search across projects, documentation, tech stack, and theme settings.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-bg-secondary/40 border border-glass-border flex items-center justify-between text-xs text-text-secondary">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" /> Fuzzy Search
            </span>
            <kbd className="px-2 py-1 rounded bg-glass-bg border border-glass-border text-text-primary font-mono text-[11px]">
              ⌘ + K
            </kbd>
          </div>
        </GlassSpotlightCard>

        {/* BLOCK 3: INSTANT ADMIN CMS */}
        <GlassSpotlightCard className="p-6 sm:p-8 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Instant Admin CMS</h3>
            <p className="text-sm text-text-secondary">
              Add, edit, duplicate, and reorder projects by priority with real-time state persistence.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-bg-secondary/40 border border-glass-border flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Priority Ranking
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
              /admin Active
            </span>
          </div>
        </GlassSpotlightCard>

        {/* BLOCK 4: GLOBAL EDGE INFRASTRUCTURE (Span 2) */}
        <GlassSpotlightCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">Global Edge Deployment</h3>
                <p className="text-xs text-text-secondary">Sub-20ms response times served from 300+ global edge locations</p>
              </div>
            </div>

            <p className="text-sm text-text-secondary max-w-lg mb-6">
              Deployed on serverless edge nodes ensuring instant page transitions, zero layout shifts, and perfect 100/100 Core Web Vitals score.
            </p>
          </div>

          {/* Region Node Latency Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { region: "IAD1 (US East)", latency: "12ms" },
              { region: "SFO1 (US West)", latency: "18ms" },
              { region: "LHR1 (London)", latency: "24ms" },
              { region: "TYO1 (Tokyo)", latency: "42ms" },
            ].map((node, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-bg-secondary/40 border border-glass-border flex items-center justify-between text-xs">
                <span className="text-text-secondary font-mono">{node.region}</span>
                <span className="text-cyan-400 font-bold font-mono">{node.latency}</span>
              </div>
            ))}
          </div>
        </GlassSpotlightCard>

        {/* BLOCK 5: DYNAMIC THEMES */}
        <GlassSpotlightCard className="p-6 sm:p-8 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit mb-4">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Dynamic Theme Engine</h3>
            <p className="text-sm text-text-secondary">
              Seamless Dark & Light modes paired with 7 curated accent color presets.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-4">
            {["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#06B6D4"].map((color, i) => (
              <span key={i} className="w-6 h-6 rounded-full border border-glass-border shadow-md" style={{ backgroundColor: color }} />
            ))}
          </div>
        </GlassSpotlightCard>

        {/* BLOCK 6: CODE & README DOCS ENGINE (Span 3) */}
        <GlassSpotlightCard className="md:col-span-3 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <FileCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">Full Markdown & Code Engine</h3>
                <p className="text-xs text-text-secondary">Built-in syntax highlighting, ToC, and Mermaid diagram support</p>
              </div>
            </div>

            {/* Code Tabs */}
            <div className="flex items-center gap-2">
              {(["ts", "prisma", "tailwind"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-semibold transition-colors",
                    activeTab === tab
                      ? "bg-accent-blue text-white"
                      : "bg-glass-bg border border-glass-border text-text-secondary hover:text-text-primary"
                  )}
                >
                  {tab}
                </button>
              ))}
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-glass-bg border border-glass-border text-text-secondary hover:text-text-primary transition-colors"
                title="Copy Code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-bg-secondary/60 border border-glass-border font-mono text-xs text-text-primary overflow-x-auto">
            <code>{sampleCode[activeTab]}</code>
          </pre>
        </GlassSpotlightCard>
      </div>
    </div>
  );
}
