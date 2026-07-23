"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Curated art-directed images for circular orbit carousel
const RIBBON_IMAGES = [
  {
    id: "img-1",
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=400&auto=format&fit=crop",
    title: "Abstract Neon Palms",
    aspect: "w-[180px] sm:w-[220px] h-[260px] sm:h-[300px]"
  },
  {
    id: "img-2",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400&auto=format&fit=crop",
    title: "Liquid Chroma",
    aspect: "w-[160px] sm:w-[190px] h-[240px] sm:h-[270px]"
  },
  {
    id: "img-3",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    title: "Portrait Studio Light",
    aspect: "w-[150px] sm:w-[180px] h-[220px] sm:h-[250px]"
  },
  {
    id: "img-4",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
    title: "Red Roses",
    aspect: "w-[140px] sm:w-[160px] h-[190px] sm:h-[220px]"
  },
  {
    id: "img-5",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop",
    title: "Quantum Motion",
    aspect: "w-[130px] sm:w-[150px] h-[170px] sm:h-[200px]"
  },
  {
    id: "img-6",
    url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=400&auto=format&fit=crop",
    title: "White Porcelain Roses",
    aspect: "w-[130px] sm:w-[150px] h-[170px] sm:h-[200px]"
  },
  {
    id: "img-7",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400&auto=format&fit=crop",
    title: "Offroad Expedition",
    aspect: "w-[140px] sm:w-[160px] h-[190px] sm:h-[220px]"
  },
  {
    id: "img-8",
    url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=400&auto=format&fit=crop",
    title: "Deep Tunnel Forest",
    aspect: "w-[150px] sm:w-[180px] h-[220px] sm:h-[250px]"
  },
  {
    id: "img-9",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
    title: "Amber Glass Droplets",
    aspect: "w-[160px] sm:w-[190px] h-[240px] sm:h-[270px]"
  },
  {
    id: "img-10",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400&auto=format&fit=crop",
    title: "Wildflower Meadow",
    aspect: "w-[180px] sm:w-[220px] h-[260px] sm:h-[300px]"
  }
];

export function ImageRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [-0.5, 0.5], ["-15px", "15px"]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], ["-10px", "10px"]);

  // Continuous Circular Motion RequestAnimationFrame Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animateCircularOrbit = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isPaused) {
        // Orbit speed: 0.15 radians per second
        setRotationAngle((prev) => (prev + delta * 0.25) % (Math.PI * 2));
      }

      animationFrameId = requestAnimationFrame(animateCircularOrbit);
    };

    animationFrameId = requestAnimationFrame(animateCircularOrbit);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Mouse move handler
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

  const numImages = RIBBON_IMAGES.length;
  const radiusX = 520; // Horizontal radius of circular ellipse
  const radiusY = 45;  // Vertical curve height of circular ellipse

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-[1400px] h-[360px] sm:h-[420px] mx-auto flex items-center justify-center overflow-visible select-none transform-gpu"
    >
      {/* ─────────────────────────────────────────────────────────────
          ORGANIC BLACK CAPSULE / BOWTIE BACKDROP
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "92%", opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 sm:h-20 bg-[#000000] rounded-full z-0 opacity-90 shadow-2xl pointer-events-none transform-gpu"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 92% 50%, 100% 100%, 0% 100%, 8% 50%)"
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          CIRCULAR ORBIT STREAM OF CARDS
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="relative w-full h-full flex items-center justify-center transform-gpu will-change-transform"
      >
        {RIBBON_IMAGES.map((img, idx) => {
          // Circular angle offset for each image in the orbit
          const angle = rotationAngle + (idx * (Math.PI * 2)) / numImages;

          // 3D Circular Orbit Trigonometry
          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY;
          const zDepth = Math.sin(angle); // -1 (back) to +1 (front)

          // Dynamic scale, opacity, and rotateY based on circular depth position
          const scale = 0.72 + (zDepth + 1) * 0.22; // 0.72 -> 1.16
          const opacity = 0.55 + (zDepth + 1) * 0.225; // 0.55 -> 1.0
          const zIndex = Math.round((zDepth + 1) * 20); // Z-index layering
          const rotateY = -Math.cos(angle) * 22; // Tilt outward into circle
          const rotateZ = Math.sin(angle) * 6;   // Dynamic subtle roll angle

          return (
            <motion.div
              key={img.id}
              style={{
                position: "absolute",
                x,
                y,
                scale,
                opacity,
                zIndex,
                rotateY: `${rotateY}deg`,
                rotateZ: `${rotateZ}deg`,
              }}
              whileHover={{
                scale: scale * 1.18,
                rotateY: 0,
                rotateZ: 0,
                zIndex: 50,
                transition: { type: "spring", stiffness: 350, damping: 20 }
              }}
              className={cn(
                "relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/30 transition-shadow duration-300 cursor-pointer group shrink-0 transform-gpu will-change-transform",
                img.aspect
              )}
            >
              {/* Image Asset */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu"
                loading="eager"
                decoding="async"
              />

              {/* Specular Highlight Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/20 opacity-60 group-hover:opacity-10 transition-opacity" />

              {/* Title Badge on Hover */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-[9px] font-mono font-bold text-white bg-black/70 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 truncate block">
                  {img.title}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
