"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Curated high-res art-directed imagery matching the reference screenshots
const RIBBON_IMAGES = [
  {
    id: "img-1",
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
    title: "Abstract Neon Palms",
    aspect: "w-[240px] sm:w-[280px] h-[340px] sm:h-[380px]",
    rotate: -20,
    scale: 1.35,
    offsetY: 0
  },
  {
    id: "img-2",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    title: "Liquid Chroma",
    aspect: "w-[190px] sm:w-[220px] h-[280px] sm:h-[320px]",
    rotate: -12,
    scale: 1.15,
    offsetY: -10
  },
  {
    id: "img-3",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    title: "Portrait Studio Light",
    aspect: "w-[160px] sm:w-[190px] h-[240px] sm:h-[270px]",
    rotate: -6,
    scale: 1.0,
    offsetY: 5
  },
  {
    id: "img-4",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    title: "Red Roses",
    aspect: "w-[140px] sm:w-[160px] h-[190px] sm:h-[220px]",
    rotate: -2,
    scale: 0.85,
    offsetY: 0
  },

  // CENTER SPLIT PAIR (Center Bowtie Anchor)
  {
    id: "img-center-left",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    title: "Quantum Motion",
    aspect: "w-[110px] sm:w-[130px] h-[125px] sm:h-[145px]",
    rotate: 0,
    scale: 0.75,
    offsetY: 0
  },
  {
    id: "img-center-right",
    url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop",
    title: "White Porcelain Roses",
    aspect: "w-[110px] sm:w-[130px] h-[125px] sm:h-[145px]",
    rotate: 0,
    scale: 0.75,
    offsetY: 0
  },

  {
    id: "img-7",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop",
    title: "Offroad Expedition",
    aspect: "w-[140px] sm:w-[160px] h-[190px] sm:h-[220px]",
    rotate: 2,
    scale: 0.85,
    offsetY: 0
  },
  {
    id: "img-8",
    url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop",
    title: "Deep Tunnel Forest",
    aspect: "w-[160px] sm:w-[190px] h-[240px] sm:h-[270px]",
    rotate: 6,
    scale: 1.0,
    offsetY: -5
  },
  {
    id: "img-9",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    title: "Amber Glass Droplets",
    aspect: "w-[190px] sm:w-[220px] h-[280px] sm:h-[320px]",
    rotate: 12,
    scale: 1.15,
    offsetY: 10
  },
  {
    id: "img-10",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    title: "Wildflower Meadow",
    aspect: "w-[240px] sm:w-[280px] h-[340px] sm:h-[380px]",
    rotate: 20,
    scale: 1.35,
    offsetY: 0
  }
];

export function ImageRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 180 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 180 });

  const cameraParallaxX = useTransform(smoothX, [-0.5, 0.5], ["-16px", "16px"]);
  const cameraParallaxY = useTransform(smoothY, [-0.5, 0.5], ["-8px", "8px"]);
  const cameraRotateY = useTransform(smoothX, [-0.5, 0.5], ["-2.5deg", "2.5deg"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Double-buffered stream for seamless infinite motion
  const infiniteRibbon = [...RIBBON_IMAGES, ...RIBBON_IMAGES];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-[100vw] py-10 flex items-center justify-center overflow-hidden select-none"
      style={{ perspective: "1800px" }}
    >
      {/* ─────────────────────────────────────────────────────────────
          ORGANIC BLACK CAPSULE / BOWTIE BACKDROP (Center Anchor)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "95%", opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 sm:h-24 bg-[#000000] z-0 opacity-95 shadow-2xl pointer-events-none"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 93% 50%, 100% 100%, 0% 100%, 7% 50%)"
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          PARALLAX 3D CURVED HORIZONTAL CONVEYOR STREAM
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          x: cameraParallaxX,
          y: cameraParallaxY,
          rotateY: cameraRotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 w-full overflow-hidden py-6"
      >
        <motion.div
          animate={{
            x: ["0%", "-50%"]
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="flex items-center gap-3 sm:gap-4 w-max px-4 will-change-transform"
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          {infiniteRibbon.map((img, index) => {
            const itemKey = `${img.id}-${index}`;
            const isHovered = hoveredId === itemKey;

            return (
              <motion.div
                key={itemKey}
                onMouseEnter={() => setHoveredId(itemKey)}
                onMouseLeave={() => setHoveredId(null)}
                animate={{
                  y: isHovered ? img.offsetY - 20 : img.offsetY,
                  scale: isHovered ? img.scale * 1.15 : img.scale,
                  rotateY: isHovered ? 0 : img.rotate,
                  z: isHovered ? 80 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22
                }}
                className={cn(
                  "relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 transition-shadow cursor-pointer shrink-0 group transform-gpu backdrop-blur-none bg-black/40",
                  img.aspect
                )}
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: isHovered 
                    ? "0 30px 60px -15px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.4)"
                    : "0 20px 40px -10px rgba(0,0,0,0.6)"
                }}
              >
                {/* Native High-Res Image with 100% Opacity */}
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />

                {/* Ambient Specular Highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 opacity-50 group-hover:opacity-10 transition-opacity" />

                {/* Micro Title Badge on Hover */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-[10px] font-mono font-bold text-white bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 truncate block">
                    {img.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
