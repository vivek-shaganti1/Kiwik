"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Layers, 
  Play, 
  Terminal as TerminalIcon,
  Activity,
  Cpu,
  Zap,
  Globe,
  Sparkles,
  Shield,
  Workflow,
  Cloud,
  CheckCircle,
  Code,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { Centerpiece } from "@/components/home/centerpiece";
import { MacosDashboard } from "@/components/home/macos-dashboard";
import { AiRaycastPanel } from "@/components/home/ai-raycast-panel";
import { AIChatbot } from "@/components/home/ai-chatbot";
import { useProjects } from "@/stores/projects-store";
import { GlassCard } from "@/components/glass/glass-card";

export default function HomePage() {
  const [bootStep, setBootStep] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const projects = useProjects();
  
  // Dynamic Projects loaded from the CMS database store to reflect edits immediately
  const featuredCMS = projects.slice(0, 3);

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
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-text-primary overflow-x-hidden relative">
      <AuroraBackground intensity="medium" />

      {/* Hero Section: Full Viewport 12-Column Layout */}
      <section className="relative min-h-[85svh] flex items-center pt-28 pb-12 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto overflow-visible">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT PANEL: Headline & Call-to-Actions */}
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
                onClick={() => setIsVideoModalOpen(true)}
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
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center relative min-h-[520px] overflow-visible">
            {/* Holographic Centerpiece */}
            <Centerpiece />
          </div>

        </div>
      </section>

      {/* LOWER GRID SECTION: macOS Control Dashboard & Raycast AI Panel */}
      <section id="macos-dashboard-widget" className="relative z-20 py-8 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto">
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

      {/* ==========================================
          BOTTOM PAGES / EXTRA VISUAL GRID SECTIONS
          ========================================== */}
      
      {/* SECTION A: DYNAMIC FEATURED PRODUCTS (Editable via Admin CMS) */}
      <section id="featured-products-section" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-serif font-bold text-text-primary tracking-tight">
            Explore Criska Products
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed font-medium">
            Understand what each product does, who it helps, its current status, and request real-time access. Fully synchronised with the Admin CMS panel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCMS.map((p, i) => (
            <GlassCard 
              key={p.id} 
              className="flex flex-col justify-between p-6 sm:p-7 border border-glass-border hover:border-accent-blue/30 transition-all select-none hover:-translate-y-1 duration-300 h-full"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-bg-secondary flex items-center justify-center border border-glass-border font-serif font-bold text-accent-blue text-xs select-none">
                      {p.name[0]}
                    </div>
                    <span className="text-sm font-bold text-text-primary tracking-tight">{p.name}</span>
                  </div>
                  
                  <span className={cn(
                    "text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                    p.status === "completed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  )}>
                    {p.status}
                  </span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed font-medium mb-6">
                  {p.tagline || p.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="text-[9px] font-mono font-bold text-text-muted uppercase tracking-wider">Target Domain</div>
                  <div className="text-xs text-text-primary font-semibold capitalize flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                    {p.category} Development
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-divider">
                <Link href={`/projects/${p.slug}`} className="flex-1 text-center py-2 rounded-lg bg-glass-bg hover:bg-glass-bg-hover border border-glass-border text-[10px] font-bold text-text-primary transition-all">
                  View Product
                </Link>
                <button 
                  onClick={() => alert(`Demonstration requested for: ${p.name}`)}
                  className="flex-1 text-center py-2 rounded-lg bg-accent-blue hover:bg-blue-600 text-[10px] font-bold text-white transition-all shadow-sm"
                >
                  Request Demo
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION B: HOW WE WORK (5-Step Engineering Pipeline) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 border-t border-divider/60 max-w-[1400px] mx-auto relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-mono text-accent-blue uppercase tracking-widest font-bold">Execution Workflow</span>
          <h2 className="text-3xl font-serif font-bold text-text-primary tracking-tight">How We Work</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {[
            { step: "01", title: "Discover", desc: "We understand your goals, target architecture, and edge constraints." },
            { step: "02", title: "Design", desc: "We design high-fidelity components, micro-interactions, and interface flows." },
            { step: "03", title: "Build", desc: "We build with extreme quality, component reusability, and Next.js static engine speeds." },
            { step: "04", title: "Secure", desc: "We secure telemetry endpoints, Firestore rule configurations, and credentials." },
            { step: "05", title: "Operate", desc: "We monitor production latency, optimize edge hits, and provide continuous support." }
          ].map((item, idx) => (
            <GlassCard key={idx} className="p-5 border border-glass-border relative hover:border-accent-blue/20 transition-all select-none">
              <div className="text-xs font-mono font-bold text-accent-blue mb-3">{item.step}</div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">{item.title}</h3>
              <p className="text-[11px] text-text-secondary leading-relaxed font-medium mt-2">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION C: CAPABILITIES & TRUST ASSURANCE */}
      <section id="capabilities" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 border-t border-divider/60 max-w-[1400px] mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Capabilities Grid */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-text-primary tracking-tight mb-6">Our Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "AI & Knowledge Systems", icon: <Sparkles className="w-4 h-4 text-purple-400" />, desc: "Semantic context vector indexing and voice voice transcription mappings." },
                { title: "Identity & Security Services", icon: <Shield className="w-4 h-4 text-rose-400" />, desc: "Secure OAuth authorization hooks and granular serverless database access rules." },
                { title: "Automation & Workflows", icon: <Workflow className="w-4 h-4 text-amber-400" />, desc: "Event-driven edge action pipelines and cron automation routines." },
                { title: "Cloud & DevOps Infrastructure", icon: <Cloud className="w-4 h-4 text-accent-blue" />, desc: "High-performance CDN setups, edge caching rules, and serverless builds." }
              ].map((cap, i) => (
                <div key={i} className="p-4.5 rounded-2xl bg-bg-secondary/40 border border-glass-border flex gap-4 select-none">
                  <div className="p-2 rounded-lg bg-bg-primary border border-glass-border text-text-primary flex-shrink-0 h-fit">
                    {cap.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-text-primary tracking-tight leading-tight">{cap.title}</h3>
                    <p className="text-[10px] text-text-secondary font-medium leading-relaxed mt-1">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust & Delivery Panel */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-text-primary tracking-tight mb-6">Trust & Delivery</h2>
            <GlassCard className="p-6 border border-glass-border space-y-4 select-none">
              {[
                { title: "Real products, real deployments", desc: "No vaporware. Complete and functional static components linked live." },
                { title: "Security first architecture", desc: "Built-in sanitization, credentials protection, and secure data routing." },
                { title: "Scalable systems designed for growth", desc: "Edge functions and database structures designed to handle production spikes." },
                { title: "Ongoing support and optimization", desc: "Continuous profiling of latency, edge cache ratios, and framework migrations." }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-left">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-text-primary leading-tight">{item.title}</h4>
                    <p className="text-[10px] text-text-secondary leading-relaxed mt-1 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>

        </div>
      </section>

      {/* Floating AI voice search assistant */}
      <AIChatbot />

      {/* Interactive macOS styled Video Demo Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="vision-glass w-full max-w-3xl rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header bar chrome */}
              <div className="px-4 py-3 bg-bg-secondary/40 border-b border-divider flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span onClick={() => setIsVideoModalOpen(false)} className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer hover:opacity-85" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest font-bold">
                  Kiwik.1 Video Overview
                </span>
                <span className="w-10" />
              </div>

              {/* simulated video contents */}
              <div className="relative aspect-video bg-neutral-950 flex flex-col items-center justify-center p-8 select-none">
                <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%]" />
                
                {/* Simulated visual timeline waves */}
                <div className="flex items-end gap-1.5 h-32 mb-6">
                  {[40, 60, 45, 90, 75, 50, 110, 85, 60, 130, 95, 70, 120, 150, 80, 100, 50, 40].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [h * 0.4, h, h * 0.4] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5 + (i % 3) * 0.3,
                        ease: "easeInOut"
                      }}
                      className="w-2 bg-accent-blue/80 rounded-full"
                      style={{ height: h }}
                    />
                  ))}
                </div>

                <div className="relative z-10 text-center space-y-2">
                  <h3 className="text-sm font-bold text-white font-mono">
                    System Telemetry Diagnostic Playback
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    All pipelines synchronized. Real-time edge latency stable at 14ms.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
