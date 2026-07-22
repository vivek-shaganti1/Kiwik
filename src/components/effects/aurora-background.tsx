"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  intensity?: "low" | "medium" | "high";
  className?: string;
}

export function AuroraBackground({ intensity = "medium", className }: AuroraBackgroundProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 100, mass: 1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const parallaxX1 = useTransform(springX, [-1, 1], ["-2%", "2%"]);
  const parallaxY1 = useTransform(springY, [-1, 1], ["-2%", "2%"]);
  
  const parallaxX2 = useTransform(springX, [-1, 1], ["3%", "-3%"]);
  const parallaxY2 = useTransform(springY, [-1, 1], ["3%", "-3%"]);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) * 2 - 1);
      mouseY.set((e.clientY / innerHeight) * 2 - 1);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const intensityOpacity = {
    low: "opacity-30",
    medium: "opacity-50",
    high: "opacity-80",
  };

  if (!isMounted) return null;

  return (
    <div className={cn("fixed inset-0 overflow-hidden pointer-events-none z-[-1]", className)}>
      <div className={cn("absolute inset-0 filter blur-[80px]", intensityOpacity[intensity])}>
        {/* Blob 1 - Rich Teal/Cyan Wave */}
        <motion.div
          style={{ x: parallaxX1, y: parallaxY1 }}
          className="absolute top-[-15%] left-[-15%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-teal-400/30 via-cyan-500/25 to-blue-600/20 mix-blend-screen opacity-70 animate-aurora-blob will-change-transform"
        />
        {/* Blob 2 - Deep Royal Blue Wave */}
        <motion.div
          style={{ x: parallaxX2, y: parallaxY2, animationDelay: "2.5s" }}
          className="absolute top-[15%] right-[-15%] w-[80%] h-[80%] rounded-full bg-gradient-to-bl from-blue-500/25 via-indigo-600/20 to-cyan-400/15 mix-blend-screen opacity-65 animate-aurora-blob-alt will-change-transform"
        />
        {/* Blob 3 - Radiant Violet Wave */}
        <motion.div
          style={{ x: parallaxX1, y: parallaxY2, animationDelay: "4.5s" }}
          className="absolute bottom-[-25%] left-[15%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-600/25 to-pink-500/15 mix-blend-screen opacity-75 animate-aurora-blob will-change-transform"
        />
        {/* Blob 4 - Ambient Gold/Cyan Accent */}
        <motion.div
          style={{ x: parallaxX2, y: parallaxY1, animationDelay: "6.5s" }}
          className="absolute bottom-[5%] right-[5%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-400/15 to-teal-500/20 mix-blend-screen opacity-55 animate-aurora-blob-alt will-change-transform"
        />
      </div>
      <div className="absolute inset-0 glass-noise opacity-20" />
    </div>
  );
}
