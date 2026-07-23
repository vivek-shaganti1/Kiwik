"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// 60+ Curated high-resolution art-directed image pool
const GALLERY_IMAGE_POOL = [
  { url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=500&auto=format&fit=crop", title: "Neon Palms" },
  { url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=500&auto=format&fit=crop", title: "Liquid Chroma" },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop", title: "Studio Lighting" },
  { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop", title: "Red Velvet Roses" },
  { url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop", title: "Quantum Motion" },
  { url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=500&auto=format&fit=crop", title: "Porcelain Roses" },
  { url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=500&auto=format&fit=crop", title: "Desert Safari" },
  { url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=500&auto=format&fit=crop", title: "Deep Emerald Forest" },
  { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop", title: "Amber Glass Droplets" },
  { url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=500&auto=format&fit=crop", title: "Alpine Meadow" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500&auto=format&fit=crop", title: "Modernist Villa" },
  { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500&auto=format&fit=crop", title: "Yosemite Valley" },
  { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500&auto=format&fit=crop", title: "Architectural Symmetry" },
  { url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500&auto=format&fit=crop", title: "Cosmic Nebula" },
  { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop", title: "Hyper Crimson Footwear" },
  { url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500&auto=format&fit=crop", title: "Vintage Camera Macro" },
  { url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=500&auto=format&fit=crop", title: "Glacial Ice Cavern" },
  { url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=500&auto=format&fit=crop", title: "Cyberpunk Arcade" },
  { url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=500&auto=format&fit=crop", title: "Spring Botanical" },
  { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop", title: "Maldives Horizon" }
];

export function ImageRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 220, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [-0.5, 0.5], ["-16px", "16px"]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], ["-10px", "10px"]);

  // Continuous Emitter Stream Motion
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animateEmitter = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isPaused) {
        // Continuous horizontal scroll speed (24px/sec)
        setOffset((prev) => prev + delta * 28);
      }

      animationFrameId = requestAnimationFrame(animateEmitter);
    };

    animationFrameId = requestAnimationFrame(animateEmitter);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Passive mouse position tracker
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          mouseX.set(e.clientX / window.innerWidth - 0.5);
          mouseY.set(e.clientY / window.innerHeight - 0.5);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // 12 Visible Emitter Cards distributed across panorama width
  const totalCards = 12;
  const spacing = 185; // Distance between card anchors in px
  const totalSpan = totalCards * spacing;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-[1550px] h-[340px] sm:h-[400px] mx-auto flex items-center justify-center overflow-visible select-none transform-gpu my-2 sm:my-4"
    >
      {/* Ultra-subtle floating center guide line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent pointer-events-none z-0" />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* ─────────────────────────────────────────────────────────────
          INFINITE EMITTER GALLERY STREAM
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="relative w-full h-full flex items-center justify-center transform-gpu will-change-transform z-10"
      >
        {Array.from({ length: totalCards }).map((_, idx) => {
          // Calculate infinite wrapped horizontal position
          const basePos = (idx * spacing + offset) % totalSpan;
          const centeredX = basePos - totalSpan / 2 + spacing / 2;

          // Normalized distance from screen center (-1 to 1)
          const normDist = centeredX / (totalSpan / 2);
          const absNorm = Math.abs(normDist);

          // Card image assignment based on position
          const imgIndex = Math.abs(Math.floor((offset + idx * 45) / 100)) % GALLERY_IMAGE_POOL.length;
          const imgData = GALLERY_IMAGE_POOL[imgIndex];

          // ── Composition & Cinematic Depth Scaling ──
          // Center remains tighter (smaller cards, 14px radius)
          // Edges become wider & larger (larger cards, 22px radius)
          const isCenter = absNorm < 0.25;
          const isMedium = absNorm >= 0.25 && absNorm < 0.65;

          const cardHeight = isCenter
            ? "h-[130px] sm:h-[150px] w-[130px] sm:w-[150px]"
            : isMedium
            ? "h-[210px] sm:h-[250px] w-[150px] sm:w-[180px]"
            : "h-[300px] sm:h-[350px] w-[210px] sm:w-[260px]";

          const borderRadius = isCenter
            ? "rounded-[14px]"
            : isMedium
            ? "rounded-[18px]"
            : "rounded-[22px]";

          // Rotation curves outwards towards edges (-12deg to +12deg)
          const rotateZ = normDist * 13;

          // Vertical Sine Wave Floating
          const floatY = Math.sin((basePos * 0.015) + (offset * 0.05)) * 8;

          // Layering & Opacity Fade out near viewport edges
          const opacity = absNorm > 0.88 ? Math.max(0, 1 - (absNorm - 0.88) * 8) : 1;
          const zIndex = Math.round((1 - absNorm) * 20) + 10;

          return (
            <motion.div
              key={`emitter-card-${idx}`}
              style={{
                position: "absolute",
                x: centeredX,
                y: floatY,
                rotateZ: `${rotateZ}deg`,
                opacity,
                zIndex,
              }}
              whileHover={{
                scale: 1.1,
                rotateZ: 0,
                y: floatY - 12,
                zIndex: 60,
                transition: { type: "spring", stiffness: 350, damping: 22 }
              }}
              className={cn(
                "relative overflow-hidden cursor-pointer group shrink-0 transition-all duration-300 transform-gpu will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.14)] border border-black/[0.08]",
                cardHeight,
                borderRadius
              )}
            >
              {/* Native Image Element */}
              <img
                src={imgData.url}
                alt={imgData.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu"
                loading="eager"
                decoding="async"
              />

              {/* Soft Specular Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 opacity-40 group-hover:opacity-10 transition-opacity" />

              {/* Title Badge on Hover */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-[10px] font-sans font-semibold text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 truncate block text-center">
                  {imgData.title}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
