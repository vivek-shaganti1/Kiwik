"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  FolderGit2, 
  FileText, 
  Activity, 
  Cloud, 
  Database, 
  Workflow, 
  Globe, 
  ShieldCheck, 
  Terminal, 
  GitBranch, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Layers 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ─────────────────────────────────────────────────────────────
// 1. COUNT-UP ANIMATED NUMBER COMPONENT
// ─────────────────────────────────────────────────────────────
interface CountUpProps {
  end: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

function CountUpNumber({ end, suffix = "", decimals = 0, duration = 2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // EaseOutExpo curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = easeProgress * end;

      setDisplayValue(currentValue.toFixed(decimals));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, decimals, duration]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. MAGNETIC GLASS BUTTON COMPONENT
// ─────────────────────────────────────────────────────────────
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

function MagneticGlassButton({ children, onClick, href, variant = "primary", className }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 14, mass: 0.1 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.25;
    const distanceY = (e.clientY - centerY) * 0.25;
    x.set(Math.max(-10, Math.min(10, distanceX)));
    y.set(Math.max(-10, Math.min(10, distanceY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative group cursor-pointer inline-flex items-center justify-center rounded-full p-[1px] overflow-hidden transition-all duration-300 select-none",
        className
      )}
    >
      {/* Animated Gradient Border Overlay */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
      
      {/* Inner Button Glow & Reflection */}
      <span className={cn(
        "relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-xl backdrop-blur-2xl",
        variant === "primary"
          ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 border border-neutral-800 dark:border-white/30 group-hover:shadow-indigo-500/20"
          : "bg-glass-bg border border-glass-border text-text-primary hover:bg-glass-bg-hover group-hover:border-glass-border-hover"
      )}>
        {/* Reflection Highlight line */}
        <span className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:via-white/80 transition-all duration-500" />
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <div onClick={onClick}>{content}</div>;
}

// ─────────────────────────────────────────────────────────────
// 3. FLOATING GLASS CARD DATA & COMPONENT
// ─────────────────────────────────────────────────────────────
interface CardData {
  id: string;
  title: string;
  badge: string;
  subtext: string;
  metric: string;
  icon: React.ReactNode;
  position: string; // Tailwind absolute positions
  delay: number;
  floatDuration: number;
}

function FloatingEcosystemCard({ card, mouseX, mouseY }: { card: CardData; mouseX: any; mouseY: any }) {
  const [isHovered, setIsHovered] = useState(false);

  // Parallax subtle tilt based on global mouse position
  const tiltX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  return (
    <motion.div
      style={{ rotateX: tiltX, rotateY: tiltY }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: card.delay, ease: "easeOut" }}
      className={cn("absolute z-20 pointer-events-auto perspective-1000", card.position)}
    >
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 1.5, -1.5, 0],
        }}
        transition={{
          duration: card.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: card.delay,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group relative p-3.5 sm:p-4 rounded-2xl border border-glass-border bg-glass-bg/75 backdrop-blur-2xl shadow-xl transition-all duration-500 cursor-pointer select-none",
          "hover:border-accent-blue/40 hover:bg-glass-bg-hover hover:shadow-2xl hover:shadow-indigo-500/15 hover:scale-105",
          isHovered ? "z-30 min-w-[210px]" : "min-w-[170px] sm:min-w-[185px]"
        )}
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/20 dark:via-white/30 to-transparent group-hover:via-accent-blue/60 transition-all duration-500" />
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-bg-secondary/60 border border-glass-border text-accent-blue group-hover:scale-110 group-hover:border-accent-blue/40 transition-all duration-300 shrink-0">
            {card.icon}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between gap-1">
              <h4 className="text-xs font-bold text-text-primary tracking-tight truncate">{card.title}</h4>
              <span className="text-[9px] font-mono font-bold text-accent-blue bg-accent-blue/10 px-1.5 py-0.5 rounded-full shrink-0">
                {card.badge}
              </span>
            </div>
            <p className="text-[10px] text-text-secondary font-medium truncate mt-0.5">{card.subtext}</p>
          </div>
        </div>

        {/* Hover Expandable Extra Telemetry Info */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 10 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-divider pt-2 text-left"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-text-muted">Telemetry:</span>
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {card.metric}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. MAIN ANIMATED HERO COMPONENT
// ─────────────────────────────────────────────────────────────
export interface AnimatedHeroProps {
  onWatchOverview?: () => void;
  className?: string;
}

export function AnimatedHero({ onWatchOverview, className }: AnimatedHeroProps) {
  // Rotating headline words
  const rotatingWords = [
    "Digital Products.",
    "AI Platforms.",
    "Enterprise Apps.",
    "Automation.",
    "Research.",
    "Innovation.",
    "Developer Tools.",
    "Cloud Infrastructure.",
  ];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [rotatingWords.length]);

  // Global Mouse tracking for ambient parallax
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  // Cards placement around the centerpiece sphere
  const ecosystemCards: CardData[] = [
    {
      id: "projects",
      title: "Projects",
      badge: "24 Active",
      subtext: "+2 Added Today",
      metric: "Health 98%",
      icon: <FolderGit2 className="w-4 h-4" />,
      position: "-top-4 left-2 sm:left-4",
      delay: 0.1,
      floatDuration: 5.5,
    },
    {
      id: "docs",
      title: "Documentation",
      badge: "362 Docs",
      subtext: "v2.4 Live Specs",
      metric: "Updated 10m ago",
      icon: <FileText className="w-4 h-4" />,
      position: "top-14 -right-2 sm:-right-6",
      delay: 0.2,
      floatDuration: 6.2,
    },
    {
      id: "analytics",
      title: "Analytics",
      badge: "Real-Time",
      subtext: "1.2M Visitor Hits",
      metric: "+18% Peak Rate",
      icon: <Activity className="w-4 h-4" />,
      position: "top-[42%] -left-6 sm:-left-10",
      delay: 0.3,
      floatDuration: 5.8,
    },
    {
      id: "deployments",
      title: "Deployments",
      badge: "99.9% Uptime",
      subtext: "Vercel Edge Nodes",
      metric: "42ms Latency",
      icon: <Cloud className="w-4 h-4" />,
      position: "bottom-12 left-8 sm:left-12",
      delay: 0.4,
      floatDuration: 6.5,
    },
    {
      id: "cms",
      title: "CMS Studio",
      badge: "Synced",
      subtext: "Content Studio DB",
      metric: "Live Store Link",
      icon: <Database className="w-4 h-4" />,
      position: "bottom-2 -right-4 sm:-right-8",
      delay: 0.5,
      floatDuration: 5.2,
    },
    {
      id: "ai",
      title: "AI Assistant",
      badge: "Online",
      subtext: "Gemini 1.5 Context",
      metric: "34ms Query Speed",
      icon: <Sparkles className="w-4 h-4" />,
      position: "top-[48%] -right-8 sm:-right-12",
      delay: 0.6,
      floatDuration: 6.8,
    },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative min-h-[90svh] flex items-center pt-28 pb-16 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto overflow-visible select-none",
        className
      )}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* ─────────────────────────────────────────────────────────────
            LEFT PANEL: TYPOGRAPHY, ROTATING HEADLINE, CTAS & METRICS
           ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="col-span-1 lg:col-span-6 flex flex-col justify-center space-y-7 text-left relative z-20"
        >
          {/* Version Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-glass-bg border border-glass-border shadow-sm w-fit group cursor-pointer hover:border-glass-border-hover transition-colors">
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-widest group-hover:text-text-primary transition-colors">
              Kiwik.1 v1.0.0-beta
            </span>
          </div>

          {/* Headline with Vertical Sliding Rotating Phrase */}
          <h1 className="text-4xl sm:text-5xl md:text-[60px] font-serif font-semibold leading-[1.08] tracking-tight text-text-primary">
            The Operating System <br />
            <span className="text-text-secondary font-serif">for </span>
            <span className="inline-block relative min-h-[1.25em] min-w-[280px] sm:min-w-[340px] vertical-align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 35, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -35, opacity: 0, filter: "blur(4px)" }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 24,
                    mass: 0.8,
                  }}
                  className="absolute left-0 top-0 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-indigo-500 to-cyan-400 font-serif font-bold italic drop-shadow-sm whitespace-nowrap"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium max-w-[500px]">
            Build. Ship. Document. Scale. Everything.
            Unified workspace for projects, documentation, deployments, analytics, and AI assistant layers.
          </p>

          {/* CTA Buttons with Magnetic & Spring Micro-interactions */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <MagneticGlassButton href="/projects" variant="primary">
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticGlassButton>

            <MagneticGlassButton
              onClick={() => onWatchOverview && onWatchOverview()}
              variant="secondary"
            >
              <Play className="w-4 h-4 text-accent-blue fill-accent-blue/30 group-hover:scale-110 transition-transform" />
              <span>Watch Overview</span>
            </MagneticGlassButton>
          </div>

          {/* Core Telemetry Metrics Grid with CountUp Rollers */}
          <div className="grid grid-cols-4 gap-3 pt-8 border-t border-divider max-w-[520px]">
            {[
              { val: 24, suffix: "+", label: "Projects", decimals: 0 },
              { val: 1.2, suffix: "M+", label: "Visitors", decimals: 1 },
              { val: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
              { val: 42, suffix: "ms", label: "Latency", decimals: 0 },
            ].map((st, i) => (
              <div key={i} className="text-left select-none group">
                <div className="text-base sm:text-lg font-bold text-text-primary tracking-tight font-mono group-hover:text-accent-blue transition-colors">
                  <CountUpNumber end={st.val} suffix={st.suffix} decimals={st.decimals} />
                </div>
                <div className="text-[9px] text-text-secondary uppercase tracking-widest font-bold mt-0.5">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT PANEL: INTERACTIVE ECOSYSTEM, SPHERE ORB & ORBIT RINGS
           ───────────────────────────────────────────────────────────── */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center relative min-h-[520px] sm:min-h-[560px] overflow-visible">
          
          {/* Volumetric Center Glow Bloom */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-cyan-400/15 blur-[90px] pointer-events-none animate-pulse" />
          <div className="absolute w-[220px] h-[220px] rounded-full bg-indigo-500/30 blur-[50px] pointer-events-none" />

          {/* SVG Orbit Lines with Rotating Glowing Particle Light Nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.2)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.4)" />
              </linearGradient>
            </defs>

            {/* Orbit 1: Solid Subtle Ring */}
            <ellipse cx="50%" cy="50%" rx="290" ry="145" fill="none" stroke="currentColor" strokeWidth="1" className="text-black/15 dark:text-white/20" />
            
            {/* Orbit 2: Dashed Animated Stroke Ring */}
            <ellipse cx="50%" cy="50%" rx="245" ry="190" fill="none" stroke="currentColor" strokeWidth="1" className="text-black/20 dark:text-white/30" strokeDasharray="6 6" />

            {/* Orbit 3: Glowing Gradient Ring */}
            <ellipse cx="50%" cy="50%" rx="185" ry="245" fill="none" stroke="url(#orbitGlow)" strokeWidth="1.5" />
          </svg>

          {/* Orbit Light Particle Nodes orbiting around the center */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute w-[580px] h-[290px] rounded-full pointer-events-none z-10"
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent-blue shadow-[0_0_12px_#3b82f6]" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute w-[490px] h-[380px] rounded-full pointer-events-none z-10"
          >
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
              PREMIUM IRIDESCENT GLASS SPHERE ORB (CENTER)
             ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer group"
          >
            {/* Outer Fresnel Edge Glow Ring */}
            <div className="absolute inset-0 rounded-full border border-white/40 dark:border-white/20 shadow-[0_0_50px_rgba(99,102,241,0.25)] group-hover:shadow-[0_0_80px_rgba(59,130,246,0.4)] transition-all duration-700" />
            
            {/* Sphere Glass Body with Fresnel Gradient & Iridescence */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-white/10 to-indigo-950/40 dark:from-white/20 dark:via-white/5 dark:to-indigo-950/80 backdrop-blur-3xl shadow-2xl border border-white/30 dark:border-white/15 overflow-hidden">
              
              {/* Animated Shimmer Highlight Layer */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                  y: ["-100%", "200%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-1/2 h-1/2 bg-gradient-to-br from-white/40 via-cyan-400/20 to-transparent blur-md"
              />

              {/* Internal Refraction Shadow */}
              <div className="absolute inset-2 rounded-full border border-white/20 dark:border-white/10 bg-gradient-to-tl from-indigo-600/20 via-transparent to-white/20 pointer-events-none" />
            </div>

            {/* Inner Core: Floating Logo Branding */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotateY: [0, 360],
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
              className="relative z-20 flex flex-col items-center justify-center space-y-1.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 dark:bg-white/10 border border-white/40 dark:border-white/20 shadow-xl backdrop-blur-xl flex items-center justify-center p-2.5">
                <img src="/logo.png" alt="Kiwik Logo" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <span className="text-xs font-serif font-bold text-text-primary tracking-wider uppercase drop-shadow-sm">
                Kiwik.1
              </span>
            </motion.div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
              FLOATING ECOSYSTEM GLASS CARDS AROUND THE ORB
             ───────────────────────────────────────────────────────────── */}
          {ecosystemCards.map((card) => (
            <FloatingEcosystemCard key={card.id} card={card} mouseX={mouseX} mouseY={mouseY} />
          ))}

        </div>

      </div>
    </section>
  );
}
