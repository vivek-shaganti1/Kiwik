"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles, Terminal, Activity, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjects } from "@/stores/projects-store";
import { useCounter } from "@/hooks/use-counter";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { ProjectCard } from "@/components/projects/project-card";
import { HeroCockpit } from "@/components/home/hero-cockpit";
import { BentoGrid } from "@/components/effects/bento-grid";
import { TechRadar } from "@/components/home/tech-radar";

const stats = [
  { label: "Active Projects", value: 6 },
  { label: "Deployments", value: 47 },
  { label: "Global Visitors", value: "35.2K" },
  { label: "Enterprise Clients", value: 12 },
  { label: "GitHub Stars", value: 1316 },
  { label: "Contributors", value: 8 },
];

function StatItem({ label, value }: { label: string; value: string | number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const displayValue = useCounter(isInView ? value : 0, 2000);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center border border-white/10 rounded-2xl bg-neutral-900/40 backdrop-blur-xl hover:border-white/20 transition-all shadow-xl group">
      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-400 group-hover:scale-105 transition-transform mb-2">
        {displayValue}
      </div>
      <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function HomePage() {
  const projects = useProjects();
  const featuredProjects = projects.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen text-text-primary overflow-x-hidden">
      <AuroraBackground intensity="high" />

      {/* Hero Section */}
      <section className="relative min-h-[90svh] flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* Version Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/15 backdrop-blur-xl mb-8 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-medium text-neutral-300">
              Kiwik.1 v1.0.0-beta • Next.js 15 & React 19 Engine
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-500"
          >
            Kiwik.1
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-2xl text-text-secondary font-medium mb-8 max-w-3xl leading-relaxed"
          >
            The Operating System of Criska Projects. Designed with linear precision, cinematic glassmorphism, and enterprise-grade architecture.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link
              href="/projects"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-blue text-white font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/25"
            >
              Explore Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-neutral-900/80 border border-white/15 font-bold hover:bg-white/10 transition-all active:scale-95 backdrop-blur-xl text-white"
            >
              <Layers className="w-5 h-5 text-emerald-400" />
              Open Admin CMS
            </Link>
          </motion.div>

          {/* Interactive Cockpit Window */}
          <motion.div variants={itemVariants} className="w-full">
            <HeroCockpit />
          </motion.div>
        </motion.div>
      </section>

      {/* Live Metrics Ticker Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8 relative z-10 border-t border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, i) => (
              <StatItem key={i} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid 2.0 Superpowers Section */}
      <section className="relative z-10">
        <BentoGrid />
      </section>

      {/* Tech Ecosystem Radar */}
      <section className="relative z-10 bg-neutral-950/60 border-t border-b border-white/5">
        <TechRadar />
      </section>

      {/* Featured Showcase Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Handcrafted Works
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">Featured Showcase</h2>
            </div>

            <Link
              href="/projects"
              className="flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors font-semibold text-sm"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Carousel */}
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar gap-6">
            {featuredProjects.map((project) => (
              <div key={project.id} className="flex-none w-[85vw] sm:w-[380px] h-[480px] snap-center">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
