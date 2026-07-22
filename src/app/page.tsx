"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjects } from "@/stores/projects-store";
import { useCounter } from "@/hooks/use-counter";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { ProjectCard } from "@/components/projects/project-card";

const stats = [
  { label: "Projects", value: 6 },
  { label: "Deployments", value: 47 },
  { label: "Visitors", value: "35.2K" },
  { label: "Clients", value: 12 },
  { label: "Open Source Stars", value: 1316 },
  { label: "Contributors", value: 8 },
];

function StatItem({ label, value }: { label: string; value: string | number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Only start counting when in view
  const displayValue = useCounter(isInView ? value : 0, 2000);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center border border-glass-border rounded-2xl bg-glass-bg backdrop-blur-md hover:bg-glass-bg-hover transition-colors shadow-lg">
      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-text-primary to-text-secondary mb-2">
        {displayValue}
      </div>
      <div className="text-sm font-medium text-text-secondary uppercase tracking-wider">
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
    <div className="min-h-screen text-text-primary">
      <AuroraBackground intensity="medium" />
      
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto mt-12 md:mt-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-glass-bg border border-glass-border backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-sm font-medium text-text-secondary">Introducing Kiwik.1</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-6 gradient-text"
          >
            Kiwik.1
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-text-secondary font-medium mb-12 max-w-2xl"
          >
            The Operating System of Criska Projects
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/projects"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--accent)] text-white font-bold hover:opacity-90 transition-opacity active:scale-95"
            >
              Explore Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="https://github.com/criska"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-glass-bg border border-glass-border font-bold hover:bg-glass-bg-hover transition-colors active:scale-95 backdrop-blur-sm text-text-primary"
            >
              View Source
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <StatItem key={i} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-black gradient-text">Featured Projects</h2>
            <Link 
              href="/projects" 
              className="hidden md:flex items-center gap-2 text-text-secondary hover:text-[var(--accent)] transition-colors font-medium"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-12 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar gap-6">
            {featuredProjects.map((project) => (
              <div key={project.id} className="flex-none w-[85vw] md:w-[400px] h-[500px] snap-center">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-center md:hidden">
            <Link 
              href="/projects" 
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-glass-bg border border-glass-border font-medium hover:bg-glass-bg-hover transition-colors text-text-primary"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
