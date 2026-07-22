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
  onClick?: () => void;
}

function OrbitCard({ label, sublabel, icon, x, y, delay, duration = 5, onClick }: OrbitCardProps) {
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
      onClick={onClick}
      className="absolute z-30 cursor-pointer"
      style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
    >
      <div className="vision-glass px-4 py-3 rounded-2xl flex items-center gap-3 border border-white/50 backdrop-blur-xl shadow-lg w-[170px] hover:border-accent-blue/35 transition-colors group">
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
  const handleNodeClick = (tabId: string, elementId?: string) => {
    // Dispatch dashboard tab switcher event
    window.dispatchEvent(new CustomEvent("switch-dashboard-tab", { detail: tabId }));
    
    // Smooth scroll to element anchor
    const target = document.getElementById(elementId || "macos-dashboard-widget");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const cards = [
    { 
      label: "Projects", 
      sublabel: "24 Active", 
      icon: <Folder className="w-3.5 h-3.5" />, 
      x: -250, 
      y: -130, 
      delay: 1, 
      duration: 4.8,
      onClick: () => handleNodeClick("projects")
    },
    { 
      label: "Documentation", 
      sublabel: "362 Docs", 
      icon: <FileText className="w-3.5 h-3.5" />, 
      x: 230, 
      y: -110, 
      delay: 2, 
      duration: 5.2,
      onClick: () => handleNodeClick("docs")
    },
    { 
      label: "Analytics", 
      sublabel: "Real-time", 
      icon: <Activity className="w-3.5 h-3.5" />, 
      x: -270, 
      y: 15, 
      delay: 3, 
      duration: 4.5,
      onClick: () => handleNodeClick("analytics")
    },
    { 
      label: "AI Assistant", 
      sublabel: "Online", 
      icon: <Sparkles className="w-3.5 h-3.5" />, 
      x: 250, 
      y: 35, 
      delay: 4, 
      duration: 5.0,
      onClick: () => handleNodeClick("ai")
    },
    { 
      label: "Deployments", 
      sublabel: "99.9% Health", 
      icon: <Cloud className="w-3.5 h-3.5" />, 
      x: -200, 
      y: 150, 
      delay: 5, 
      duration: 5.5,
      onClick: () => handleNodeClick("overview")
    },
    { 
      label: "CMS", 
      sublabel: "Content Studio", 
      icon: <Database className="w-3.5 h-3.5" />, 
      x: 180, 
      y: 130, 
      delay: 6, 
      duration: 4.7,
      onClick: () => {
        const target = document.getElementById("featured-products-section");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  ];

  return (
    <div className="relative w-full max-w-[720px] h-[520px] mx-auto flex items-center justify-center select-none overflow-visible">
      {/* Background Orbits & Particle Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50%" cy="50%" rx="290" ry="145" fill="none" stroke="currentColor" strokeWidth="1" className="text-black/20 dark:text-white/45" />
        <ellipse cx="50%" cy="50%" rx="250" ry="195" fill="none" stroke="currentColor" strokeWidth="1" className="text-black/20 dark:text-white/45" strokeDasharray="4 4" />
        <ellipse cx="50%" cy="50%" rx="190" ry="255" fill="none" stroke="currentColor" strokeWidth="1" className="text-black/20 dark:text-white/45" />
        
        {/* Glowing Orbs Particle Paths */}
        <circle r="3.5" fill="rgba(59, 130, 246, 0.55)" className="shadow-lg">
          <animateMotion dur="11s" repeatCount="indefinite" path="M 70,260 A 290,145 0 1,0 650,260 A 290,145 0 1,0 70,260" />
        </circle>
        <circle r="3" fill="rgba(167, 139, 250, 0.55)">
          <animateMotion dur="15s" repeatCount="indefinite" path="M 110,260 A 250,195 0 1,1 610,260 A 250,195 0 1,1 110,260" />
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
          onClick={card.onClick}
        />
      ))}

      {/* Central Refracting 3D-Like Glass Sphere (UPSCALED TO 56x56) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="relative w-56 h-56 rounded-full z-20 flex items-center justify-center select-none"
      >
        {/* Sphere Outer Glass reflection ring */}
        <div className="absolute inset-0 rounded-full border border-white/60 bg-gradient-to-tr from-white/25 via-white/5 to-transparent backdrop-blur-3xl shadow-2xl [box-shadow:0_30px_70px_-12px_rgba(0,0,0,0.15),inset_0_1px_3px_rgba(255,255,255,0.85)]" />

        {/* Sphere Iridescent Gradient Layer */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-blue-500/15 via-purple-500/20 to-teal-500/15 opacity-80 mix-blend-overlay animate-pulse" />

        {/* Sphere Specular Inner Highlight */}
        <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.7),transparent_55%)] pointer-events-none" />

        {/* Floating Logo Inside Sphere */}
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 2, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 5.5,
            ease: "easeInOut"
          }}
          className="relative z-30 w-28 h-28 flex flex-col items-center justify-center"
        >
          <img src="/logo.png" alt="Kiwik OS Refraction Logo" className="w-20 h-20 object-contain" />
          <span className="text-[11px] font-mono tracking-widest text-text-primary/80 mt-1.5 uppercase font-bold select-none">
            KIWIK.1
          </span>
        </motion.div>

        {/* Sphere Bottom Ambient Shadow */}
        <div className="absolute bottom-[-20px] w-[80%] h-5 bg-black/15 blur-lg rounded-full pointer-events-none z-10" />
      </motion.div>
    </div>
  );
}
