"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Curated art-directed images matching the reference screenshots
const RIBBON_IMAGES = [
  {
    id: "img-1",
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
    title: "Abstract Neon Palms",
    aspect: "w-[240px] sm:w-[280px] h-[340px] sm:h-[380px]",
    rotate: -14,
    depth: -40
  },
  {
    id: "img-2",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    title: "Liquid Chroma",
    aspect: "w-[180px] sm:w-[220px] h-[280px] sm:h-[320px]",
    rotate: -8,
    depth: -20
  },
  {
    id: "img-3",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    title: "Portrait Studio Light",
    aspect: "w-[160px] sm:w-[190px] h-[240px] sm:h-[270px]",
    rotate: -4,
    depth: 0
  },
  {
    id: "img-4",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    title: "Red Roses",
    aspect: "w-[140px] sm:w-[160px] h-[190px] sm:h-[220px]",
    rotate: -2,
    depth: 10
  },

  // CENTER SPLIT PAIR (Center bowtie anchor)
  {
    id: "img-center-left",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    title: "Quantum Motion",
    aspect: "w-[100px] sm:w-[120px] h-[120px] sm:h-[140px]",
    rotate: 0,
    depth: 30
  },
  {
    id: "img-center-right",
    url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop",
    title: "White Porcelain Roses",
    aspect: "w-[100px] sm:w-[120px] h-[120px] sm:h-[140px]",
    rotate: 0,
    depth: 30
  },

  {
    id: "img-7",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop",
    title: "Offroad Expedition",
    aspect: "w-[140px] sm:w-[160px] h-[190px] sm:h-[220px]",
    rotate: 2,
    depth: 10
  },
  {
    id: "img-8",
    url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop",
    title: "Deep Tunnel Forest",
    aspect: "w-[160px] sm:w-[190px] h-[240px] sm:h-[270px]",
    rotate: 4,
    depth: 0
  },
  {
    id: "img-9",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    title: "Amber Glass Droplets",
    aspect: "w-[180px] sm:w-[220px] h-[280px] sm:h-[320px]",
    rotate: 8,
    depth: -20
  },
  {
    id: "img-10",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    title: "Wildflower Meadow",
    aspect: "w-[240px] sm:w-[280px] h-[340px] sm:h-[380px]",
    rotate: 14,
    depth: -40
  }
];

export function ImageRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 180, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const ribbonParallaxX = useTransform(smoothX, [-0.5, 0.5], ["-12px", "12px"]);
  const ribbonParallaxY = useTransform(smoothY, [-0.5, 0.5], ["-8px", "8px"]);
  const ribbonRotate = useTransform(smoothX, [-0.5, 0.5], ["-1.5deg", "1.5deg"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[1500px] mx-auto py-4 sm:py-8 flex items-center justify-center overflow-visible select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          ORGANIC BLACK CAPSULE / BOWTIE BACKDROP (Squeezed Capsule)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "90%", opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 sm:h-20 bg-[#000000] rounded-full z-0 opacity-90 shadow-2xl pointer-events-none"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 92% 50%, 100% 100%, 0% 100%, 8% 50%)"
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          PARALLAX HORIZONTAL RIBBON OF CURVED ARTWORK CARDS
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          x: ribbonParallaxX,
          y: ribbonParallaxY,
          rotate: ribbonRotate,
        }}
        className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-3 px-4 overflow-visible"
      >
        {RIBBON_IMAGES.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ 
              opacity: 0, 
              scale: 0.4, 
              y: 40,
              rotateZ: 0 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: [0, -4, 0],
              rotateZ: img.rotate 
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 + Math.abs(idx - 4.5) * 0.1 },
              scale: { duration: 0.8, delay: 0.4 + Math.abs(idx - 4.5) * 0.1 },
              y: {
                repeat: Infinity,
                duration: 4 + (idx % 3) * 0.8,
                ease: "easeInOut",
                delay: idx * 0.15
              }
            }}
            whileHover={{
              scale: 1.12,
              rotateZ: 0,
              z: 50,
              transition: { type: "spring", stiffness: 350, damping: 22 }
            }}
            className={cn(
              "relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/20 transition-all cursor-pointer group shrink-0",
              img.aspect
            )}
          >
            {/* Native Image Element */}
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />

            {/* Specular Highlight Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 opacity-60 group-hover:opacity-20 transition-opacity" />

            {/* Title Badge on Hover */}
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-[9px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 truncate block">
                {img.title}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
