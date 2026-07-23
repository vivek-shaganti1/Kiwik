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
import { AnimatedHero } from "@/components/ui/animated-hero";
import { Centerpiece } from "@/components/home/centerpiece";
import { MacosDashboard } from "@/components/home/macos-dashboard";
import { AiRaycastPanel } from "@/components/home/ai-raycast-panel";
import { AIChatbot } from "@/components/home/ai-chatbot";
import { EcosystemPipeline } from "@/components/home/ecosystem-pipeline";
import { FeaturePillars } from "@/components/home/feature-pillars";
import { FeaturedProductsGrid } from "@/components/home/featured-products-grid";
import { FutureVision } from "@/components/home/future-vision";
import { useProjects } from "@/stores/projects-store";
import { useSiteCMSStore } from "@/stores/site-cms-store";
import { GlassCard } from "@/components/glass/glass-card";

export default function HomePage() {
  const [bootStep, setBootStep] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const projects = useProjects();
  
  const cms = useSiteCMSStore((state) => state.cms);
  const featuredSection = cms.featuredSection || {
    title: "Explore Kiwik Products",
    subtitle: "Understand what each product does, who it helps, its current status, and request real-time access. Fully synchronised with the Admin CMS panel."
  };
  const capabilities = cms.capabilities || { sectionTitle: "Our Capabilities", items: [] };
  const trust = cms.trust || { sectionTitle: "Trust & Delivery", items: [] };
  const howWeWork = cms.howWeWork || { badge: "Execution Workflow", sectionTitle: "How We Work", steps: [] };

  // Dynamic Projects loaded from the CMS database store to reflect edits immediately
  const featuredCMS = projects.slice(0, 3);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles": return <Sparkles className="w-4 h-4 text-purple-400" />;
      case "Shield": return <Shield className="w-4 h-4 text-rose-400" />;
      case "Workflow": return <Workflow className="w-4 h-4 text-amber-400" />;
      case "Cloud": return <Cloud className="w-4 h-4 text-accent-blue" />;
      default: return <Cpu className="w-4 h-4 text-accent-blue" />;
    }
  };

  useEffect(() => {
    // Record visitor session
    fetch("/api/visitors", { method: "POST" }).catch((err) =>
      console.error("Error logging visitor session", err)
    );
  }, []);

  return (
    <div className="min-h-screen text-text-primary overflow-x-hidden relative">
      <AuroraBackground intensity="medium" />

      {/* Premium Animated Operating System Hero Component */}
      <AnimatedHero onWatchOverview={() => setIsVideoModalOpen(true)} />

      {/* THE CRISKA ECOSYSTEM PIPELINE (Matching Reference Image) */}
      <EcosystemPipeline />

      {/* WHY CRISKA FEATURE PILLARS (Matching Reference Image) */}
      <FeaturePillars />

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

      {/* FEATURED PRODUCTS GRID (Matching 2x2 Reference Image) */}
      <FeaturedProductsGrid />

      {/* SECTION A: FEATURED PRODUCTS GRID */}
      <section id="featured-products-section" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 border-t border-divider/60 max-w-[1400px] mx-auto relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Featured Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary tracking-tight">
            {featuredSection.title}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed font-medium">
            {featuredSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCMS.map((p) => (
            <GlassCard 
              key={p.id} 
              className="flex flex-col justify-between p-0 border border-glass-border hover:border-accent-blue/40 transition-all select-none hover:-translate-y-1.5 duration-300 h-full text-left overflow-hidden group shadow-xl"
            >
              {/* Browser Window Chrome Top */}
              <div className="px-4 py-2.5 bg-bg-secondary/60 border-b border-divider flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] font-mono text-text-muted truncate max-w-[140px]">
                  kiwik.one/{p.slug}
                </span>
                <span className={cn(
                  "text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                  p.status === "completed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                )}>
                  {p.status}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-600/20 flex items-center justify-center border border-accent-blue/30 font-serif font-bold text-accent-blue text-sm shadow-sm group-hover:scale-110 transition-transform">
                      {p.name[0]}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text-primary tracking-tight group-hover:text-accent-blue transition-colors">
                        {p.name}
                      </h3>
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                        {p.category} Domain
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed font-medium line-clamp-3">
                    {p.tagline || p.description}
                  </p>
                </div>

                {/* Progress & Tech Bar */}
                <div className="space-y-3 pt-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono font-bold text-text-secondary">
                      <span>Completion Score</span>
                      <span className="text-accent-blue">{p.completionPercent || 100}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-bg-secondary rounded-full overflow-hidden p-0.5 border border-glass-border">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000" 
                        style={{ width: `${p.completionPercent || 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-divider">
                    <Link href={`/projects/${p.slug}`} className="flex-1 text-center py-2.5 rounded-xl bg-glass-bg hover:bg-glass-bg-hover border border-glass-border text-[11px] font-bold text-text-primary transition-all flex items-center justify-center gap-1">
                      <span>View Specs</span>
                      <ArrowUpRight className="w-3 h-3 text-text-secondary" />
                    </Link>
                    <button 
                      onClick={() => alert(`Demonstration requested for: ${p.name}`)}
                      className="flex-1 text-center py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-[11px] font-bold text-white transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
                    >
                      Request Demo
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION B: HOW WE WORK (5-Step Engineering Pipeline) */}
      <section id="how-we-work" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 border-t border-divider/60 max-w-[1400px] mx-auto relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Workflow className="w-3.5 h-3.5" />
            <span>{howWeWork.badge || "Execution Workflow"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary tracking-tight">
            {howWeWork.sectionTitle || "How We Work"}
          </h2>
        </div>

        {/* Timeline Grid with Glowing Connecting Line */}
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/40 to-cyan-500/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 relative z-10">
            {(howWeWork.steps || []).map((item, idx) => (
              <GlassCard key={item.id || idx} className="p-6 border border-glass-border relative hover:border-accent-blue/40 transition-all select-none text-left shadow-lg group">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-mono font-bold text-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                    0{idx + 1}
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-text-muted">
                    Phase {idx + 1}
                  </span>
                </div>
                
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-primary group-hover:text-accent-blue transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-medium mt-2">
                  {item.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C: CAPABILITIES & TRUST ASSURANCE */}
      <section id="capabilities" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 border-t border-divider/60 max-w-[1400px] mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Capabilities Grid */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary tracking-tight">
                {capabilities.sectionTitle || "Our Capabilities"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(capabilities.items || []).map((cap, i) => (
                <div key={cap.id || i} className="p-5 rounded-2xl bg-bg-secondary/40 border border-glass-border hover:border-accent-blue/30 transition-all flex gap-4 select-none backdrop-blur-xl group">
                  <div className="p-2.5 rounded-xl bg-bg-primary border border-glass-border text-accent-blue flex-shrink-0 h-fit group-hover:scale-110 transition-transform">
                    {getIcon(cap.iconName)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-text-primary tracking-tight leading-tight group-hover:text-accent-blue transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-[11px] text-text-secondary font-medium leading-relaxed mt-1">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust & Delivery Panel */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary tracking-tight">
                {trust.sectionTitle || "Trust & Delivery"}
              </h2>
            </div>

            <GlassCard className="p-6 border border-glass-border space-y-5 select-none shadow-xl">
              {(trust.items || []).map((item, i) => (
                <div key={item.id || i} className="flex gap-3 text-left group">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary leading-tight group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-text-secondary leading-relaxed mt-1 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>

        </div>
      </section>

      {/* THE FUTURE WE ARE BUILDING (Cosmic Horizon reference section) */}
      <FutureVision />

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
