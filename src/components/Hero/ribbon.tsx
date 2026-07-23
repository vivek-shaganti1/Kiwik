"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Optimized art-directed image catalog
const LEFT_STREAM_IMAGES = [
  { id: "L1", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop", title: "Abstract Neon Palms", aspect: "w-[240px] h-[340px]", scale: "scale-125 hover:scale-135", rotate: "rotate-y-[22deg]" },
  { id: "L2", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop", title: "Liquid Chroma", aspect: "w-[200px] h-[280px]", scale: "scale-110", rotate: "rotate-y-[15deg]" },
  { id: "L3", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", title: "Portrait Studio Light", aspect: "w-[170px] h-[230px]", scale: "scale-100", rotate: "rotate-y-[8deg]" },
  { id: "L4", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop", title: "Red Roses", aspect: "w-[140px] h-[180px]", scale: "scale-90", rotate: "rotate-y-[4deg]" },
  { id: "L5", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", title: "Quantum Motion", aspect: "w-[120px] h-[140px]", scale: "scale-85", rotate: "rotate-y-0" },
  { id: "L6", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", title: "Luxury Minimal Architecture", aspect: "w-[210px] h-[290px]", scale: "scale-115", rotate: "rotate-y-[16deg]" }
];

const RIGHT_STREAM_IMAGES = [
  { id: "R1", url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop", title: "White Porcelain Roses", aspect: "w-[120px] h-[140px]", scale: "scale-85", rotate: "rotate-y-0" },
  { id: "R2", url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop", title: "Offroad Expedition", aspect: "w-[140px] h-[180px]", scale: "scale-90", rotate: "rotate-y-[-4deg]" },
  { id: "R3", url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop", title: "Deep Tunnel Forest", aspect: "w-[170px] h-[230px]", scale: "scale-100", rotate: "rotate-y-[-8deg]" },
  { id: "R4", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", title: "Amber Glass Droplets", aspect: "w-[200px] h-[280px]", scale: "scale-110", rotate: "rotate-y-[-15deg]" },
  { id: "R5", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop", title: "Wildflower Meadow", aspect: "w-[240px] h-[340px]", scale: "scale-125 hover:scale-135", rotate: "rotate-y-[-22deg]" },
  { id: "R6", url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop", title: "Golden Hour Ocean Waves", aspect: "w-[210px] h-[290px]", scale: "scale-115", rotate: "rotate-y-[-16deg]" }
];

export function ImageRibbon() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Triple-buffered arrays for silky smooth infinite loop
  const infiniteLeft = [...LEFT_STREAM_IMAGES, ...LEFT_STREAM_IMAGES, ...LEFT_STREAM_IMAGES];
  const infiniteRight = [...RIGHT_STREAM_IMAGES, ...RIGHT_STREAM_IMAGES, ...RIGHT_STREAM_IMAGES];

  return (
    <div 
      className="relative w-full max-w-[100vw] py-12 flex items-center justify-center overflow-hidden select-none"
      style={{ perspective: "1600px" }}
    >
      {/* Central Black Bowtie Capsule Line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "96%", opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 sm:h-24 bg-[#000000] z-0 opacity-95 shadow-2xl pointer-events-none"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 94% 50%, 100% 100%, 0% 100%, 6% 50%)"
        }}
      />

      {/* GPU Accelerated 3D Dual Stream Container */}
      <div className="relative z-10 flex items-center justify-center w-full overflow-hidden py-8">
        
        {/* ─────────────────────────────────────────────────────────────
            LEFT STREAM: MOVES FROM CENTER OUTWARDS TO THE LEFT (←)
           ───────────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden flex justify-end">
          <motion.div
            animate={{
              x: ["0%", "-33.333%"]
            }}
            transition={{
              duration: 22,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="flex items-center gap-5 sm:gap-6 w-max pr-2 will-change-transform"
            style={{
              transformStyle: "preserve-3d"
            }}
          >
            {infiniteLeft.map((img, index) => {
              const itemKey = `L-${img.id}-${index}`;
              const isHovered = hoveredId === itemKey;

              return (
                <div
                  key={itemKey}
                  onMouseEnter={() => setHoveredId(itemKey)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    "relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-300 cursor-pointer shrink-0 group transform-gpu",
                    img.aspect,
                    img.scale,
                    img.rotate,
                    isHovered && "z-50 scale-125 shadow-white/30 rotate-0"
                  )}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 opacity-60 group-hover:opacity-20 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-[9px] font-mono font-bold text-white bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/15 truncate block">
                      {img.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT STREAM: MOVES FROM CENTER OUTWARDS TO THE RIGHT (→)
           ───────────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden flex justify-start">
          <motion.div
            animate={{
              x: ["0%", "33.333%"]
            }}
            transition={{
              duration: 22,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="flex items-center gap-5 sm:gap-6 w-max pl-2 will-change-transform"
            style={{
              transformStyle: "preserve-3d"
            }}
          >
            {infiniteRight.map((img, index) => {
              const itemKey = `R-${img.id}-${index}`;
              const isHovered = hoveredId === itemKey;

              return (
                <div
                  key={itemKey}
                  onMouseEnter={() => setHoveredId(itemKey)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    "relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-300 cursor-pointer shrink-0 group transform-gpu",
                    img.aspect,
                    img.scale,
                    img.rotate,
                    isHovered && "z-50 scale-125 shadow-white/30 rotate-0"
                  )}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 opacity-60 group-hover:opacity-20 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-[9px] font-mono font-bold text-white bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/15 truncate block">
                      {img.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
