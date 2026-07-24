"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSiteCMSStore } from "@/stores/site-cms-store";

// 60+ Curated Unique High-Resolution Art-Directed Image Pool (NO DUPLICATES)
const MASTER_GALLERY_POOL = [
  { url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop", title: "Porcelain Roses", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop", title: "Liquid Chroma", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop", title: "Patent Gloss", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", title: "Holographic Waves", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop", title: "Crimson Velvet", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&auto=format&fit=crop", title: "Botanical Specimen", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=600&auto=format&fit=crop", title: "Luminous Jellyfish", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop", title: "Emerald Canopy", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop", title: "Fluid 3D Prism", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop", title: "Owl Horizon", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop", title: "Modernist Form", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop", title: "Glacial Canyon", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop", title: "Architectural Grid", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop", title: "Starlight Void", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop", title: "Hyper Crimson", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&auto=format&fit=crop", title: "Vintage Glass Lens", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop", title: "Ice Cavern Light", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop", title: "Arcade Neon", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop", title: "Spring Bloom", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop", title: "Azure Coastline", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=600&auto=format&fit=crop", title: "Prismatic Dispersion", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop", title: "Cybernetic Grid", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop", title: "Silicon Wafer", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=600&auto=format&fit=crop", title: "AI Neural Core", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=600&auto=format&fit=crop", title: "Vivid Waveform", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=600&auto=format&fit=crop", title: "Abstract Clay", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop", title: "Glass Torus", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=600&auto=format&fit=crop", title: "3D Chrome Sphere", linkUrl: "/projects" }
];

interface EmitterCardState {
  id: string;
  lane: "left" | "right";
  progress: number; // 0.0 (center) -> 1.0 (viewport edge)
  imageUrl: string;
  title: string;
  linkUrl?: string;
  rotation: number; // Fixed random rotation between -6deg and +6deg
}

export function ImageRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const poolIndexRef = useRef<number>(0);
  const activeImageUrlsRef = useRef<Set<string>>(new Set());

  // Dynamically blend CMS Floating Gallery pool with Master Gallery Pool
  const cmsGallery = useSiteCMSStore((state) => state.cms.floatingGallery);
  const combinedPool = React.useMemo(() => {
    if (cmsGallery && cmsGallery.length > 0) {
      return [...cmsGallery, ...MASTER_GALLERY_POOL];
    }
    return MASTER_GALLERY_POOL;
  }, [cmsGallery]);

  // Shuffle array helper
  const shufflePool = () => {
    const arr = [...combinedPool];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const poolRef = useRef(shufflePool());

  // Get next UNIQUE image from pool that is not currently visible anywhere on screen
  const getNextUniqueImage = () => {
    let attempts = 0;
    while (attempts < combinedPool.length) {
      const item = poolRef.current[poolIndexRef.current % poolRef.current.length] || combinedPool[0];
      poolIndexRef.current++;

      if (poolIndexRef.current >= poolRef.current.length) {
        poolRef.current = shufflePool();
        poolIndexRef.current = 0;
      }

      if (!activeImageUrlsRef.current.has(item.url)) {
        activeImageUrlsRef.current.add(item.url);
        return item;
      }
      attempts++;
    }
    // Fallback if pool exhausted
    const fallback = combinedPool[Math.floor(Math.random() * combinedPool.length)];
    activeImageUrlsRef.current.add(fallback.url);
    return fallback;
  };

  // Release image URL when card recycles
  const releaseImage = (url: string) => {
    activeImageUrlsRef.current.delete(url);
  };

  // Generate initial evenly-spaced emitter cards (7 left, 7 right = 14 total on desktop)
  const createInitialCards = (): EmitterCardState[] => {
    const cards: EmitterCardState[] = [];
    const countPerLane = 7;
    let cardIdCounter = 0;

    // Left Lane Cards: Progress spaced from 0.05 to 0.9
    for (let i = 0; i < countPerLane; i++) {
      const progress = 0.05 + (i / countPerLane) * 0.85;
      const img = getNextUniqueImage();
      cards.push({
        id: `left-card-${cardIdCounter++}`,
        lane: "left",
        progress,
        imageUrl: img.url,
        title: img.title,
        linkUrl: img.linkUrl || "/projects",
        rotation: (Math.random() - 0.5) * 12, // -6deg to +6deg
      });
    }

    // Right Lane Cards: Progress offset by half-step
    for (let i = 0; i < countPerLane; i++) {
      const progress = 0.05 + ((i + 0.5) / countPerLane) * 0.85;
      const img = getNextUniqueImage();
      cards.push({
        id: `right-card-${cardIdCounter++}`,
        lane: "right",
        progress,
        imageUrl: img.url,
        title: img.title,
        linkUrl: img.linkUrl || "/projects",
        rotation: (Math.random() - 0.5) * 12, // -6deg to +6deg
      });
    }

    return cards;
  };

  const [cards, setCards] = useState<EmitterCardState[]>(createInitialCards);

  // 60 FPS Procedural Emitter RAF Loop (Restored Smooth Math)
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let cardIdCounter = 100;

    const updateEmitter = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05); // cap delta time
      lastTime = now;

      // Linear constant expansion speed (full transit in ~12.5 sec)
      const speed = 0.075;

      setCards((prevCards) =>
        prevCards.map((card) => {
          let nextProgress = card.progress + speed * dt;

          // When card travels past edge of viewport (progress >= 1.0)
          if (nextProgress >= 1.0) {
            releaseImage(card.imageUrl);
            const newImg = getNextUniqueImage();

            // Recycle card back to CENTER (progress = 0.0) with fresh unique image & new tilt
            return {
              id: `${card.lane}-card-${cardIdCounter++}`,
              lane: card.lane,
              progress: nextProgress - 1.0, // seamless wrap from 0
              imageUrl: newImg.url,
              title: newImg.title,
              linkUrl: newImg.linkUrl || "/projects",
              rotation: (Math.random() - 0.5) * 12, // -6deg to +6deg
            };
          }

          return {
            ...card,
            progress: nextProgress,
          };
        })
      );

      animId = requestAnimationFrame(updateEmitter);
    };

    animId = requestAnimationFrame(updateEmitter);
    return () => cancelAnimationFrame(animId);
  }, [combinedPool]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1700px] h-[360px] sm:h-[440px] md:h-[480px] mx-auto flex items-center justify-center overflow-hidden select-none transform-gpu my-2 sm:my-6"
    >
      {/* ─────────────────────────────────────────────────────────────
          PROCEDURAL PERSPECTIVE EMITTER CANVAS (CENTER → EDGES)
         ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-full flex items-center justify-center transform-gpu z-10">
        {cards.map((card) => {
          const p = Math.max(0, Math.min(1, card.progress));

          // ── CONTINUOUS PERSPECTIVE SCALE MATHEMATICS ──
          // Center (p = 0.0): scale = 0.28 (small)
          // Edge (p = 1.0): scale = 1.35 (large)
          const scale = 0.28 + Math.pow(p, 1.15) * (1.35 - 0.28);

          // ── CONTINUOUS HORIZONTAL EXPANSION DISTANCE ──
          // Left lane travels CENTER -> LEFT (-X)
          // Right lane travels CENTER -> RIGHT (+X)
          const direction = card.lane === "left" ? -1 : 1;
          const maxDistancePx = 780; // Max span distance in pixels from center
          const translateX = direction * Math.pow(p, 1.35) * maxDistancePx;

          // ── Z-INDEX LAYER ORDERING ──
          // Outer cards closer to edge appear ABOVE inner cards
          const zIndex = Math.floor(p * 100) + 10;

          // ── CONTINUOUS OPACITY FADE ──
          // Center = 0.85, Edges = 1.0
          const opacity = 0.85 + p * 0.15;

          // ── DYNAMIC CARD DIMENSIONS ──
          // Base card is 260px wide by 320px high, scaled dynamically by perspective
          const width = 260;
          const height = 320;

          return (
            <Link
              key={card.id}
              href={card.linkUrl || "/projects"}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: `${width}px`,
                height: `${height}px`,
                transform: `translate(-50%, -50%) translate3d(${translateX}px, 0px, 0px) scale(${scale}) rotate(${card.rotation}deg)`,
                zIndex,
                opacity,
                transformOrigin: "center center",
              }}
              className={cn(
                "overflow-hidden rounded-[20px] bg-neutral-900 border border-black/10 dark:border-white/15 transition-all duration-300 transform-gpu will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] cursor-pointer group hover:scale-105 hover:border-accent-blue/60"
              )}
            >
              {/* Native High-Res Image Element */}
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover transform-gpu pointer-events-none group-hover:scale-105 transition-transform"
                loading="eager"
                decoding="async"
              />

              {/* Specular Edge Highlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none" />

              {/* Title & Clickable Link Hint Overlay on Hover */}
              {card.title && (
                <div className="absolute bottom-3 left-3 right-3 text-white text-left opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="text-xs font-bold truncate">{card.title}</div>
                  <div className="text-[9px] font-mono text-accent-blue flex items-center gap-1 mt-0.5">
                    Click to view destination →
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
