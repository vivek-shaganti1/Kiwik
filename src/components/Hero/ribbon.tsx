"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// 50+ Curated high-res art-directed image catalog across 10 categories
const ARTWORK_CATALOG = [
  { url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop", title: "Abstract Neon Palms", aspect: "w-[240px] h-[340px]" },
  { url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop", title: "Liquid Chroma", aspect: "w-[200px] h-[280px]" },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", title: "Portrait Studio Light", aspect: "w-[170px] h-[230px]" },
  { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop", title: "Red Roses", aspect: "w-[140px] h-[180px]" },
  { url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", title: "Quantum Motion", aspect: "w-[130px] h-[150px]" },
  { url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop", title: "White Porcelain Roses", aspect: "w-[130px] h-[150px]" },
  { url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop", title: "Offroad Expedition", aspect: "w-[150px] h-[190px]" },
  { url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop", title: "Deep Tunnel Forest", aspect: "w-[180px] h-[240px]" },
  { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", title: "Amber Glass Droplets", aspect: "w-[210px] h-[290px]" },
  { url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop", title: "Wildflower Meadow", aspect: "w-[250px] h-[350px]" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", title: "Luxury Minimal Architecture", aspect: "w-[220px] h-[300px]" },
  { url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop", title: "Cyberpunk Alley Light", aspect: "w-[170px] h-[240px]" },
  { url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop", title: "Gradient Silk Texture", aspect: "w-[150px] h-[200px]" },
  { url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop", title: "Northern Lights Horizon", aspect: "w-[190px] h-[270px]" },
  { url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop", title: "Golden Hour Ocean Waves", aspect: "w-[230px] h-[320px]" },
  { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop", title: "Editorial Vogue Portrait", aspect: "w-[160px] h-[230px]" },
  { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", title: "Yosemite Valley Mist", aspect: "w-[210px] h-[290px]" },
  { url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop", title: "Starry Night Alps", aspect: "w-[170px] h-[250px]" },
  { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop", title: "Retro Tech Setup", aspect: "w-[200px] h-[280px]" }
];

interface EmittedCard {
  instanceId: string;
  url: string;
  title: string;
  aspect: string;
  direction: "left" | "right";
  spawnTime: number;
  duration: number; // 25s - 32s travel time
  targetX: number; // Final position in px (-750px or +750px)
  offsetY: number; // Random vertical offset (-40px to +40px)
  rotateY: number; // Outward perspective tilt (-18deg to +18deg)
  rotateZ: number; // Subtle tilt (-4deg to +4deg)
  maxScale: number; // Corner scale (1.2 to 1.35)
}

export function ImageRibbon() {
  const [cards, setCards] = useState<EmittedCard[]>([]);
  const nextCatalogIdx = useRef(0);
  const sideToggle = useRef(true);

  // Initialize initial active cards spread across the lanes
  useEffect(() => {
    const initialBatch: EmittedCard[] = [];
    const now = Date.now();

    // Pre-populate 16 cards at various stages of travel to start populated
    for (let i = 0; i < 16; i++) {
      const dir: "left" | "right" = i % 2 === 0 ? "left" : "right";
      const art = ARTWORK_CATALOG[i % ARTWORK_CATALOG.length];
      const travelProgress = (i / 16); // 0 to 1 progress
      const duration = 28000 + Math.random() * 6000;
      
      initialBatch.push({
        instanceId: `init-${i}-${now}`,
        url: art.url,
        title: art.title,
        aspect: art.aspect,
        direction: dir,
        spawnTime: now - (travelProgress * duration),
        duration: duration,
        targetX: dir === "left" ? -850 : 850,
        offsetY: (Math.random() - 0.5) * 70,
        rotateY: dir === "left" ? -(10 + Math.random() * 12) : (10 + Math.random() * 12),
        rotateZ: (Math.random() - 0.5) * 8,
        maxScale: 1.25 + Math.random() * 0.15
      });
    }

    setCards(initialBatch);
  }, []);

  // Continuous Emitter Loop: Spawns a new card every 450ms
  useEffect(() => {
    const emitterInterval = setInterval(() => {
      const now = Date.now();
      const dir: "left" | "right" = sideToggle.current ? "left" : "right";
      sideToggle.current = !sideToggle.current;

      const art = ARTWORK_CATALOG[nextCatalogIdx.current % ARTWORK_CATALOG.length];
      nextCatalogIdx.current++;

      const newCard: EmittedCard = {
        instanceId: `card-${now}-${Math.random()}`,
        url: art.url,
        title: art.title,
        aspect: art.aspect,
        direction: dir,
        spawnTime: now,
        duration: 26000 + Math.random() * 6000,
        targetX: dir === "left" ? -850 : 850,
        offsetY: (Math.random() - 0.5) * 70,
        rotateY: dir === "left" ? -(10 + Math.random() * 12) : (10 + Math.random() * 12),
        rotateZ: (Math.random() - 0.5) * 8,
        maxScale: 1.25 + Math.random() * 0.15
      };

      setCards((prev) => {
        // Clean up expired cards past duration
        const active = prev.filter((c) => now - c.spawnTime < c.duration);
        return [...active, newCard];
      });
    }, 450);

    return () => clearInterval(emitterInterval);
  }, []);

  return (
    <div 
      className="relative w-full max-w-[100vw] py-14 flex items-center justify-center overflow-hidden select-none"
      style={{ perspective: "2200px" }}
    >
      {/* Central Black Bowtie Capsule Origin */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "96%", opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 sm:h-24 bg-[#000000] z-0 opacity-95 shadow-2xl pointer-events-none"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 94% 50%, 100% 100%, 0% 100%, 6% 50%)"
        }}
      />

      {/* 3D Center-Out Emitter Viewport */}
      <div 
        className="relative z-10 w-full h-[420px] flex items-center justify-center overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        <AnimatePresence>
          {cards.map((card) => {
            const elapsed = Date.now() - card.spawnTime;
            const progress = Math.min(1, Math.max(0, elapsed / card.duration));

            // Continuous outwards trajectory calculation
            const currentX = card.direction === "left" 
              ? -progress * 850 
              : progress * 850;

            const scale = 0.65 + progress * (card.maxScale - 0.65);
            const opacity = progress < 0.08 ? progress / 0.08 : (progress > 0.88 ? (1 - progress) / 0.12 : 1);
            const zDepth = progress * 140; // Projects forward as it reaches edge

            return (
              <motion.div
                key={card.instanceId}
                initial={{
                  x: 0,
                  y: card.offsetY,
                  scale: 0.65,
                  opacity: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  z: 0
                }}
                animate={{
                  x: currentX,
                  y: card.offsetY,
                  scale: scale,
                  opacity: opacity,
                  rotateY: card.rotateY * progress,
                  rotateZ: card.rotateZ * progress,
                  z: zDepth
                }}
                transition={{
                  duration: (card.duration - elapsed) / 1000,
                  ease: "linear"
                }}
                className={cn(
                  "absolute rounded-2xl overflow-hidden shadow-2xl border border-white/20 cursor-pointer group transform-gpu backdrop-blur-sm",
                  card.aspect
                )}
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: `0 ${15 + progress * 20}px ${30 + progress * 30}px -10px rgba(0,0,0,0.6)`
                }}
              >
                <img
                  src={card.url}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 opacity-70 group-hover:opacity-20 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-[9px] font-mono font-bold text-white bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/15 truncate block">
                    {card.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
