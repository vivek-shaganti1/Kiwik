"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Curated high-res art-directed imagery array
const LEFT_STREAM_IMAGES = [
  { id: "L1", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop", title: "Abstract Neon Palms", aspect: "w-[220px] h-[320px]" },
  { id: "L2", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop", title: "Liquid Chroma", aspect: "w-[180px] h-[260px]" },
  { id: "L3", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", title: "Portrait Studio Light", aspect: "w-[160px] h-[220px]" },
  { id: "L4", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop", title: "Red Roses", aspect: "w-[140px] h-[180px]" },
  { id: "L5", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", title: "Quantum Motion", aspect: "w-[120px] h-[140px]" },
  { id: "L6", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", title: "Luxury Minimal Architecture", aspect: "w-[200px] h-[280px]" },
  { id: "L7", url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop", title: "Gradient Silk Texture", aspect: "w-[150px] h-[200px]" },
  { id: "L8", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop", title: "Northern Lights Horizon", aspect: "w-[190px] h-[270px]" }
];

const RIGHT_STREAM_IMAGES = [
  { id: "R1", url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop", title: "White Porcelain Roses", aspect: "w-[120px] h-[140px]" },
  { id: "R2", url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop", title: "Offroad Expedition", aspect: "w-[140px] h-[180px]" },
  { id: "R3", url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop", title: "Deep Tunnel Forest", aspect: "w-[160px] h-[220px]" },
  { id: "R4", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", title: "Amber Glass Droplets", aspect: "w-[180px] h-[260px]" },
  { id: "R5", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop", title: "Wildflower Meadow", aspect: "w-[220px] h-[320px]" },
  { id: "R6", url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop", title: "Golden Hour Ocean Waves", aspect: "w-[210px] h-[290px]" },
  { id: "R7", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop", title: "Editorial Vogue Portrait", aspect: "w-[160px] h-[230px]" },
  { id: "R8", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop", title: "Starry Night Alps", aspect: "w-[170px] h-[250px]" }
];

export function ImageRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Mouse Parallax Motion Trackers
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 180 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 180 });

  const cameraParallaxX = useTransform(smoothX, [-0.5, 0.5], ["-18px", "18px"]);
  const cameraParallaxY = useTransform(smoothY, [-0.5, 0.5], ["-10px", "10px"]);
  const cameraRotateY = useTransform(smoothX, [-0.5, 0.5], ["-3deg", "3deg"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Seamless double arrays for infinite center-outward flow
  const infiniteLeft = [...LEFT_STREAM_IMAGES, ...LEFT_STREAM_IMAGES];
  const infiniteRight = [...RIGHT_STREAM_IMAGES, ...RIGHT_STREAM_IMAGES];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-[100vw] py-12 flex items-center justify-center overflow-hidden select-none"
      style={{ perspective: "1800px" }}
    >
      {/* Central Squeezed Bowtie Capsule Backdrop */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "95%", opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 sm:h-28 bg-[#000000] rounded-full z-0 opacity-95 shadow-2xl pointer-events-none"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 93% 50%, 100% 100%, 0% 100%, 7% 50%)"
        }}
      />

      {/* Center 3D Dual Stream Conveyor Container */}
      <motion.div
        style={{
          x: cameraParallaxX,
          y: cameraParallaxY,
          rotateY: cameraRotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 flex items-center justify-center w-full overflow-hidden py-6"
      >
        {/* ─────────────────────────────────────────────────────────────
            LEFT STREAM: MOVES FROM CENTER OUTWARDS TO THE LEFT (←)
           ───────────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden flex justify-end">
          <motion.div
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              duration: 28,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="flex items-center gap-4 sm:gap-5 w-max pr-3"
            style={{
              willChange: "transform",
              transformStyle: "preserve-3d"
            }}
          >
            {infiniteLeft.map((img, index) => {
              const itemKey = `L-${img.id}-${index}`;
              const isHovered = hoveredId === itemKey;
              const positionRatio = (index % LEFT_STREAM_IMAGES.length) / LEFT_STREAM_IMAGES.length;
              const curveRotateY = -positionRatio * 14; 
              const depthZ = -positionRatio * 120;
              const offsetY = Math.sin(index * 1.8) * 20;

              return (
                <motion.div
                  key={itemKey}
                  onMouseEnter={() => setHoveredId(itemKey)}
                  onMouseLeave={() => setHoveredId(null)}
                  animate={{
                    y: isHovered ? [offsetY - 20] : [offsetY, offsetY - 5, offsetY],
                    rotateY: isHovered ? 0 : curveRotateY,
                    scale: isHovered ? 1.15 : 1,
                    z: isHovered ? 80 : depthZ
                  }}
                  transition={{
                    y: isHovered ? { duration: 0.2 } : { duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 0.3 },
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    z: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className={cn(
                    "relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 transition-all cursor-pointer shrink-0 group backdrop-blur-sm",
                    img.aspect
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 opacity-70 group-hover:opacity-20 transition-opacity" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 truncate block">
                      {img.title}
                    </span>
                  </div>
                </motion.div>
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
              x: ["0%", "50%"]
            }}
            transition={{
              duration: 28,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="flex items-center gap-4 sm:gap-5 w-max pl-3"
            style={{
              willChange: "transform",
              transformStyle: "preserve-3d"
            }}
          >
            {infiniteRight.map((img, index) => {
              const itemKey = `R-${img.id}-${index}`;
              const isHovered = hoveredId === itemKey;
              const positionRatio = (index % RIGHT_STREAM_IMAGES.length) / RIGHT_STREAM_IMAGES.length;
              const curveRotateY = positionRatio * 14; 
              const depthZ = -positionRatio * 120;
              const offsetY = Math.cos(index * 1.8) * 20;

              return (
                <motion.div
                  key={itemKey}
                  onMouseEnter={() => setHoveredId(itemKey)}
                  onMouseLeave={() => setHoveredId(null)}
                  animate={{
                    y: isHovered ? [offsetY - 20] : [offsetY, offsetY - 5, offsetY],
                    rotateY: isHovered ? 0 : curveRotateY,
                    scale: isHovered ? 1.15 : 1,
                    z: isHovered ? 80 : depthZ
                  }}
                  transition={{
                    y: isHovered ? { duration: 0.2 } : { duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 0.3 },
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    z: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className={cn(
                    "relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 transition-all cursor-pointer shrink-0 group backdrop-blur-sm",
                    img.aspect
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 opacity-70 group-hover:opacity-20 transition-opacity" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 truncate block">
                      {img.title}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
