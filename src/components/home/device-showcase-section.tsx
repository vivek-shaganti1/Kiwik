"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Cpu, Cloud, CreditCard, Terminal, Sparkles, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeviceItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  author: string;
  role: string;
  status: string;
  category: string;
  accentGradient: string;
  layoutType: "ai" | "cloud" | "pm" | "botanist" | "pay";
  rotate: number;
  scale: number;
  yOffset: number;
  floatDuration: number;
  floatDelay: number;
}

const DEVICES: DeviceItem[] = [
  {
    id: "criska-bot",
    slug: "criska-ai",
    name: "CriskaBot",
    tagline: "Viral marketer & Discord AI Companion for growth teams.",
    author: "John Richardson",
    role: "Angel Investor & AI Lead",
    status: "LIVE",
    category: "AI Marketing",
    accentGradient: "from-slate-800 via-neutral-900 to-black",
    layoutType: "ai",
    rotate: -6,
    scale: 0.86,
    yOffset: 16,
    floatDuration: 14,
    floatDelay: 0,
  },
  {
    id: "criska-ai",
    slug: "criska-ai",
    name: "CriskaAI",
    tagline: "Product Designer & UI UX Expert powered by neural agents.",
    author: "Jet Hawken",
    role: "Product Designer & UI/UX Expert",
    status: "PRIVATE BETA",
    category: "AI Ops",
    accentGradient: "from-blue-600/30 via-indigo-900/40 to-sky-950",
    layoutType: "pm",
    rotate: -3,
    scale: 0.94,
    yOffset: 4,
    floatDuration: 12,
    floatDelay: 2,
  },
  {
    id: "criska-cloud",
    slug: "criska-cloud",
    name: "CriskaCloud",
    tagline: "Product Manager with 15 years of experience built into autonomous infrastructure.",
    author: "Leslie Putnam",
    role: "Senior Product Manager",
    status: "PILOT",
    category: "Cloud OS",
    accentGradient: "from-blue-600 via-indigo-600 to-purple-800",
    layoutType: "cloud",
    rotate: 0,
    scale: 1.05,
    yOffset: -12,
    floatDuration: 10,
    floatDelay: 1,
  },
  {
    id: "criska-pay",
    slug: "criska-pay",
    name: "CriskaPay",
    tagline: "Encrypted instant settlement, billing engine & automated ledger.",
    author: "Taylor Brown",
    role: "Financial Systems Lead",
    status: "PROTOTYPE",
    category: "Fintech",
    accentGradient: "from-emerald-800 via-teal-900 to-slate-950",
    layoutType: "botanist",
    rotate: 3,
    scale: 0.94,
    yOffset: 4,
    floatDuration: 13,
    floatDelay: 3,
  },
  {
    id: "kiwik-hub",
    slug: "kiwik-1",
    name: "Kiwik Hub",
    tagline: "Viral marketer, helping founders grow their apps exponentially.",
    author: "Jason Markus",
    role: "Growth Engineer",
    status: "LIVE PLATFORM",
    category: "Developer OS",
    accentGradient: "from-lime-800 via-emerald-950 to-black",
    layoutType: "pay",
    rotate: 6,
    scale: 0.86,
    yOffset: 16,
    floatDuration: 15,
    floatDelay: 2,
  },
];

export function DeviceShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Scroll 3D Perspective Rotation Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const springRotateX = useSpring(scrollRotateX, { damping: 25, stiffness: 120 });

  // Mouse Parallax Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 18, y: y * 18 });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="device-showcase-section"
      className="py-32 md:py-44 px-4 sm:px-6 md:px-8 max-w-[1550px] mx-auto relative z-20 select-none overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          SECTION HEADER (Apple / Linear Showcase Style)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-20 space-y-4"
      >
        <span className="text-[12px] font-mono font-bold uppercase tracking-[0.35em] text-neutral-500 dark:text-[#A1A1AA]">
          FEATURED PRODUCTS
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-neutral-900 dark:text-white tracking-tight leading-[1.05]">
          Products crafted for modern businesses
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-[#A1A1AA] font-sans font-medium max-w-[680px] mx-auto leading-relaxed">
          Every platform is designed as a world-class software product with enterprise engineering excellence.
        </p>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          5 FLOATING DEVICE SHOWCASE LAYER (Matching Screenshot 1)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          rotateX: springRotateX,
          y: scrollTranslateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full min-h-[640px] sm:min-h-[720px] flex items-center justify-center gap-3 sm:gap-6 perspective-[1200px] transform-gpu px-2"
      >
        {DEVICES.map((device, idx) => {
          const isHovered = hoveredId === device.id;
          const isCenter = device.id === "criska-cloud";

          return (
            <motion.div
              key={device.id}
              onMouseEnter={() => setHoveredId(device.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                zIndex: isHovered ? 50 : isCenter ? 30 : 20 - Math.abs(idx - 2) * 5,
              }}
              className="relative flex-1 max-w-[260px] sm:max-w-[290px] transform-gpu transition-all duration-500"
            >
              {/* Infinite Subtle Floating Animation */}
              <motion.div
                animate={{
                  y: isHovered ? -12 : [device.yOffset, device.yOffset - 10, device.yOffset],
                  rotate: isHovered ? 0 : [device.rotate, device.rotate + 0.8, device.rotate],
                  x: mousePos.x * (idx === 2 ? 0.4 : 0.7),
                }}
                transition={{
                  y: isHovered
                    ? { duration: 0.3 }
                    : { repeat: Infinity, duration: device.floatDuration, ease: "easeInOut", delay: device.floatDelay },
                  rotate: isHovered
                    ? { duration: 0.3 }
                    : { repeat: Infinity, duration: device.floatDuration + 2, ease: "easeInOut", delay: device.floatDelay },
                  x: { type: "spring", damping: 25, stiffness: 120 },
                }}
                className={cn(
                  "relative rounded-[44px] bg-[#090A0F] border-[8px] sm:border-[10px] border-[#1C1D24] p-3.5 shadow-[0_30px_90px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between h-[520px] sm:h-[580px] transition-all duration-500 cursor-pointer group",
                  isHovered ? "scale-[1.04] shadow-[0_40px_120px_rgba(59,130,246,0.35)] border-white/30" : ""
                )}
              >
                <Link href={`/projects/${device.slug}`} className="block h-full flex flex-col justify-between">
                  
                  {/* Dynamic Island Notch Frame Header */}
                  <div className="relative w-full flex items-center justify-between pb-3 z-20">
                    <div className="w-16 h-4 mx-auto rounded-full bg-black/80 border border-white/10 flex items-center justify-center gap-1.5 shadow-inner">
                      <div className="w-2 h-2 rounded-full bg-[#101116]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse" />
                    </div>
                  </div>

                  {/* ── SCREEN VISUAL CONTENT (Actual Kiwik Products) ── */}
                  <div className="relative w-full flex-1 rounded-[32px] overflow-hidden bg-neutral-950 p-4 text-white flex flex-col justify-between shadow-inner">
                    
                    {/* Background Shader Gradient */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80", device.accentGradient)} />

                    {/* Top Screen Author Avatar & Header */}
                    <div className="relative z-10 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-xs font-serif text-white shadow-md">
                        {device.author[0]}
                      </div>
                      <div className="text-left">
                        <h4 className="text-[11px] font-bold font-sans text-white leading-tight">{device.author}</h4>
                        <span className="text-[9px] font-mono text-white/60">{device.role}</span>
                      </div>
                    </div>

                    {/* Main Screen Headline & Interactive Product UI */}
                    <div className="relative z-10 my-auto space-y-2 pt-4">
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight leading-snug">
                        {device.name}
                      </h3>
                      <p className="text-[11px] font-sans text-white/80 leading-relaxed line-clamp-3">
                        {device.tagline}
                      </p>
                    </div>

                    {/* Interactive Animated Widgets on Device Screens */}
                    <div className="relative z-10 pt-3 space-y-2">
                      {device.layoutType === "ai" && (
                        <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-white/80">Neural Assistant</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">● Active</span>
                        </div>
                      )}

                      {device.layoutType === "cloud" && (
                        <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-mono text-white/70">
                            <span>Cluster Status</span>
                            <span className="text-emerald-400 font-bold">99.98%</span>
                          </div>
                          <div className="h-8 w-full flex items-end gap-1">
                            {[40, 70, 55, 90, 65, 100, 80, 60, 85].map((h, i) => (
                              <div key={i} className="flex-1 bg-blue-400 rounded-t-sm" style={{ height: `${h}%` }} />
                            ))}
                          </div>
                        </div>
                      )}

                      {device.layoutType === "pay" && (
                        <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-white/70">Total Volume</span>
                          <span className="text-emerald-300 font-bold">$1.4M</span>
                        </div>
                      )}

                      {device.layoutType === "botanist" && (
                        <div className="p-2.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-white/70">Instant Settlement</span>
                          <span className="text-emerald-400 font-bold">✓ Verified</span>
                        </div>
                      )}

                      {/* Action Pill Button inside Screen */}
                      <div className="w-full py-2 rounded-full bg-white text-black font-sans font-bold text-[11px] flex items-center justify-center gap-1 shadow-lg group-hover:bg-blue-50 transition-colors">
                        <span>Explore Product</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>

                  </div>

                </Link>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
