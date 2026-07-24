"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSiteCMSStore } from "@/stores/site-cms-store";

// Default High-Resolution Art-Directed Image Pool
const FALLBACK_GALLERY_POOL = [
  { url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop", title: "Porcelain Roses", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop", title: "Liquid Chroma", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop", title: "Patent Gloss", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", title: "Holographic Waves", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop", title: "Crimson Velvet", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&auto=format&fit=crop", title: "Botanical Specimen", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=600&auto=format&fit=crop", title: "Luminous Jellyfish", linkUrl: "/projects" },
  { url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop", title: "Emerald Canopy", linkUrl: "/projects" }
];

interface EmitterCardState {
  id: string;
  lane: "left" | "right";
  progress: number;
  imageUrl: string;
  title: string;
  linkUrl: string;
  rotation: number;
}

export function ImageRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const poolIndexRef = useRef<number>(0);
  const activeImageUrlsRef = useRef<Set<string>>(new Set());

  const cmsGallery = useSiteCMSStore((state) => state.cms.floatingGallery);
  const poolItems = (cmsGallery && cmsGallery.length > 0) ? cmsGallery : FALLBACK_GALLERY_POOL;

  // Shuffle array helper
  const shufflePool = () => {
    const arr = [...poolItems];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const poolRef = useRef(shufflePool());

  // Get next UNIQUE image from pool
  const getNextUniqueImage = () => {
    let attempts = 0;
    while (attempts < poolItems.length) {
      const item = poolRef.current[poolIndexRef.current % poolRef.current.length] || poolItems[0];
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
    const fallback = poolItems[Math.floor(Math.random() * poolItems.length)];
    activeImageUrlsRef.current.add(fallback.url);
    return fallback;
  };

  const createInitialCards = (): EmitterCardState[] => {
    const cards: EmitterCardState[] = [];
    const countPerLane = 7;
    let cardIdCounter = 0;

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
        rotation: (Math.random() - 0.5) * 12,
      });
    }

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
        rotation: (Math.random() - 0.5) * 12,
      });
    }

    return cards;
  };

  const [cards, setCards] = useState<EmitterCardState[]>(createInitialCards);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const updateLoop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setCards((prevCards) =>
        prevCards.map((card) => {
          const speed = 0.12;
          let newProgress = card.progress + speed * deltaTime;

          if (newProgress >= 1.0) {
            activeImageUrlsRef.current.delete(card.imageUrl);
            const nextImg = getNextUniqueImage();
            return {
              ...card,
              progress: 0.02,
              imageUrl: nextImg.url,
              title: nextImg.title,
              linkUrl: nextImg.linkUrl || "/projects",
              rotation: (Math.random() - 0.5) * 12,
            };
          }

          return { ...card, progress: newProgress };
        })
      );

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [poolItems]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1700px] h-[360px] sm:h-[440px] md:h-[480px] mx-auto flex items-center justify-center overflow-hidden select-none transform-gpu my-2 sm:my-6"
    >
      <div className="relative w-full h-full flex items-center justify-center transform-gpu z-10">
        {cards.map((card) => {
          const p = Math.max(0, Math.min(1, card.progress));
          const scale = 0.28 + Math.pow(p, 1.15) * (1.35 - 0.28);
          const direction = card.lane === "left" ? -1 : 1;
          const maxDistancePx = 780;
          const translateX = direction * Math.pow(p, 1.35) * maxDistancePx;
          const zIndex = Math.floor(p * 100) + 10;
          const opacity = 0.85 + p * 0.15;
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
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover transform-gpu pointer-events-none group-hover:scale-105 transition-transform"
                loading="eager"
                decoding="async"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none" />

              {card.title && (
                <div className="absolute bottom-3 left-3 right-3 text-white text-left opacity-0 group-hover:opacity-100 transition-opacity">
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
