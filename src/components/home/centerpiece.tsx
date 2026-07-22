"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Folder, 
  FileText, 
  Activity, 
  Sparkles, 
  Cloud, 
  Database 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrbitCardProps {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  delay: number;
  duration?: number;
}

function OrbitCard({ label, sublabel, icon, x, y, delay, duration = 5 }: OrbitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x,
        y: [y, y - 8, y]
      }}
      transition={{
        opacity: { duration: 0.6, delay: delay * 0.2 },
        scale: { duration: 0.6, delay: delay * 0.2 },
        y: {
          repeat: Infinity,
          duration,
          ease: "easeInOut",
          delay: delay * 0.4
        }
      }}
      whileHover={{ scale: 1.05, y: y - 12, transition: { type: "spring", stiffness: 350, damping: 20 } }}
      className="absolute z-30 cursor-pointer"
      style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
    >
      <div className="vision-glass px-4 py-3 rounded-2xl flex items-center gap-3 border border-white/50 backdrop-blur-xl shadow-lg w-[160px] hover:border-accent-blue/35 transition-colors group">
        <div className="p-2 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-left select-none">
          <div className="text-xs font-bold text-text-primary tracking-tight leading-tight">{label}</div>
          <div className="text-[9px] text-text-secondary font-mono mt-0.5 tracking-wider uppercase">{sublabel}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Centerpiece() {
  const cards = [
    { label: "Projects", sublabel: "24 Active", icon: <Folder className="w-3.5 h-3.5" />, x: -210, y: -110, delay: 1, duration: 4.8 },
    { label: "Documentation", sublabel: "362 Docs", icon: <FileText className="w-3.5 h-3.5" />, x: 190, y: -90, delay: 2, duration: 5.2 },
    { label: "Analytics", sublabel: "Real-time", icon: <Activity className="w-3.5 h-3.5" />, x: -230, y: 10, delay: 3, duration: 4.5 },
    { label: "AI Assistant", sublabel: "Online", icon: <Sparkles className="w-3.5 h-3.5" />, x: 210, y: 30, delay: 4, duration: 5.0 },
    { label: "Deployments", sublabel: "99.9% Health", icon: <Cloud className="w-3.5 h-3.5" />, x: -160, y: 130, delay: 5, duration: 5.5 },
    { label: "CMS", sublabel: "Content Studio", icon: <Database className="w-3.5 h-3.5" />, x: 140, y: 110, delay: 6, duration: 4.7 }
  ];

  return (
    <div className="relative w-full max-w-[620px] h-[460px] mx-auto flex items-center justify-center select-none overflow-visible">
      {/* Background Orbits & Particle Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50%" cy="50%" rx="240" ry="120" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20 dark:text-white/5" />
        <ellipse cx="50%" cy="50%" rx="210" ry="160" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20 dark:text-white/5" strokeDasharray="4 4" />
        <ellipse cx="50%" cy="50%" rx="160" ry="220" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20 dark:text-white/5" />
        
        {/* Glowing Orbs Particle Paths */}
        <circle r="3" fill="rgba(59, 130, 246, 0.4)" className="shadow-lg">
          <animateMotion dur="12s" repeatCount="indefinite" path="M 110,230 A 240,120 0 1,0 510,230 A 240,120 0 1,0 110,230" />
        </circle>
        <circle r="2.5" fill="rgba(167, 139, 250, 0.4)">
          <animateMotion dur="16s" repeatCount="indefinite" path="M 140,230 A 210,160 0 1,1 480,230 A 210,160 0 1,1 140,230" />
        </circle>
      </svg>

      {/* Orbiting Glass Cards */}
      {cards.map((card, index) => (
        <OrbitCard
          key={card.label}
          label={card.label}
          sublabel={card.sublabel}
          icon={card.icon}
          x={card.x}
          y={card.y}
          delay={card.delay}
          duration={card.duration}
        />
      ))}

      {/* Central Refracting 3D-Like Glass Sphere */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.04 }}
        className="relative w-48 h-48 rounded-full z-20 flex items-center justify-center select-none"
      >
        {/* Sphere Outer Glass reflection ring */}
        <div className="absolute inset-0 rounded-full border border-white/50 bg-gradient-to-tr from-white/20 via-white/5 to-transparent backdrop-blur-2xl shadow-2xl [box-shadow:0_25px_60px_-15px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.7)]" />

        {/* Sphere Iridescent Gradient Layer */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-blue-500/10 via-purple-500/15 to-teal-500/10 opacity-70 mix-blend-overlay animate-pulse" />

        {/* Sphere Specular Inner Highlight */}
        <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.65),transparent_60%)] pointer-events-none" />

        {/* Floating Logo Inside Sphere */}
        <motion.div
          animate={{ 
            y: [0, -4, 0],
            rotate: [0, 1.5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut"
          }}
          className="relative z-30 w-24 h-24 flex flex-col items-center justify-center"
        >
          <img src="/logo.png" alt="Kiwik OS Refraction Logo" className="w-16 h-16 object-contain" />
          <span className="text-[10px] font-mono tracking-widest text-text-primary/70 mt-1 uppercase font-bold select-none">
            KIWIK.1
          </span>
        </motion.div>

        {/* Sphere Bottom Ambient Shadow */}
        <div className="absolute bottom-[-16px] w-[80%] h-4 bg-black/10 blur-md rounded-full pointer-events-none z-10" />
      </motion.div>
    </div>
  );
}
