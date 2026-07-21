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
        {/* Blob 1 */}
        <motion.div
          style={{ x: parallaxX1, y: parallaxY1 }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--accent)] mix-blend-screen opacity-60 animate-aurora-blob will-change-transform"
        />
        {/* Blob 2 */}
        <motion.div
          style={{ x: parallaxX2, y: parallaxY2, animationDelay: "2s" }}
          className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/40 mix-blend-screen opacity-50 animate-aurora-blob-alt will-change-transform"
        />
        {/* Blob 3 */}
        <motion.div
          style={{ x: parallaxX1, y: parallaxY2, animationDelay: "4s" }}
          className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-purple-500/40 mix-blend-screen opacity-70 animate-aurora-blob will-change-transform"
        />
        {/* Blob 4 */}
        <motion.div
          style={{ x: parallaxX2, y: parallaxY1, animationDelay: "6s" }}
          className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-[var(--accent)] mix-blend-screen opacity-40 animate-aurora-blob-alt will-change-transform"
        />
      </div>
      <div className="absolute inset-0 glass-noise opacity-30" />
    </div>
  );
}
