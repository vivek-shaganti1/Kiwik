"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// 12 Curated art-directed images matching Melius reference screenshot proportions
const CURVED_RIBBON_ITEMS = [
  // FAR LEFT (Large, Tilted Inward towards user)
  {
    id: "img-1",
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
    title: "Abstract Neon Palms",
    aspect: "w-[240px] sm:w-[280px] h-[340px] sm:h-[380px]",
    rotateY: -22,
    scale: 1.35,
    offsetY: 0
  },
  {
    id: "img-2",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    title: "Minimal Architecture",
    aspect: "w-[200px] sm:w-[230px] h-[300px] sm:h-[340px]",
    rotateY: -16,
    scale: 1.2,
    offsetY: -5
  },
  {
    id: "img-3",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    title: "Liquid Chroma",
    aspect: "w-[170px] sm:w-[195px] h-[250px] sm:h-[285px]",
    rotateY: -10,
    scale: 1.05,
    offsetY: 4
  },
  {
    id: "img-4",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    title: "Portrait Studio Light",
    aspect: "w-[145px] sm:w-[165px] h-[210px] sm:h-[235px]",
    rotateY: -5,
    scale: 0.95,
    offsetY: -2
  },
  {
    id: "img-5",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    title: "Red Roses",
    aspect: "w-[125px] sm:w-[140px] h-[160px] sm:h-[185px]",
    rotateY: -2,
    scale: 0.85,
    offsetY: 0
  },

  // CENTER BOWTIE ANCHOR PAIR (Small 1:1 Square Cards)
  {
    id: "img-center-1",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    title: "Quantum Motion",
    aspect: "w-[100px] sm:w-[115px] h-[105px] sm:h-[120px]",
    rotateY: 0,
    scale: 0.75,
    offsetY: 0
  },
  {
    id: "img-center-2",
    url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop",
    title: "White Porcelain Roses",
    aspect: "w-[100px] sm:w-[115px] h-[105px] sm:h-[120px]",
    rotateY: 0,
    scale: 0.75,
    offsetY: 0
  },

  // RIGHT FLANKING (Increasing height & scale outwards)
  {
    id: "img-7",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop",
    title: "Offroad Expedition",
    aspect: "w-[125px] sm:w-[140px] h-[160px] sm:h-[185px]",
    rotateY: 2,
    scale: 0.85,
    offsetY: 0
  },
  {
    id: "img-8",
    url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop",
    title: "Deep Tunnel Forest",
    aspect: "w-[145px] sm:w-[165px] h-[210px] sm:h-[235px]",
    rotateY: 5,
    scale: 0.95,
    offsetY: -2
  },
  {
    id: "img-9",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    title: "Amber Glass Droplets",
    aspect: "w-[170px] sm:w-[195px] h-[250px] sm:h-[285px]",
    rotateY: 10,
    scale: 1.05,
    offsetY: 4
  },
  {
    id: "img-10",
    url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop",
    title: "Ocean Waves",
    aspect: "w-[200px] sm:w-[230px] h-[300px] sm:h-[340px]",
    rotateY: 16,
    scale: 1.2,
    offsetY: -5
  },
  // FAR RIGHT (Large, Tilted Inward towards user)
  {
    id: "img-11",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    title: "Wildflower Meadow",
    aspect: "w-[240px] sm:w-[280px] h-[340px] sm:h-[380px]",
    rotateY: 22,
    scale: 1.35,
    offsetY: 0
  }
];

export function ImageRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Mouse Parallax Motion Trackers
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

  // Double array to create seamless loop without gaps
  const infiniteRibbon = [...CURVED_RIBBON_ITEMS, ...CURVED_RIBBON_ITEMS];

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
          3D PERSPECTIVE CURVED RIBBON CONVEYOR STREAM
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
            duration: 32,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="flex items-center gap-3.5 sm:gap-5 w-max px-4 will-change-transform"
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
                  rotateY: isHovered ? 0 : img.rotateY,
                  z: isHovered ? 90 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22
                }}
                className={cn(
                  "relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 transition-all cursor-pointer shrink-0 group transform-gpu bg-black/40",
                  img.aspect
                )}
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: isHovered 
                    ? "0 30px 60px -15px rgba(0,0,0,0.85), 0 0 30px rgba(255,255,255,0.4)"
                    : "0 20px 40px -10px rgba(0,0,0,0.6)"
                }}
              >
                {/* High-Resolution Artwork Image */}
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />

                {/* Specular Highlight Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 opacity-50 group-hover:opacity-10 transition-opacity" />

                {/* Title Badge on Hover */}
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
