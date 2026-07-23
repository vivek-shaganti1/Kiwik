"use client";

import React from "react";
import { motion } from "framer-motion";
import { MovableCardSlider } from "@/components/Hero/movable-card-slider";
import { cn } from "@/lib/utils";

export function FeaturedProductsGrid() {
  return (
    <section id="featured-products-section" className="py-20 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto relative z-20 select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION HEADER (Matching Reference Screenshot 2)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-10 space-y-3"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">
          FEATURED PRODUCTS
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-white tracking-tight leading-[1.05]">
          Next-Generation Enterprise Stack
        </h2>
        <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans font-medium max-w-xl mx-auto leading-relaxed">
          Explore world-class autonomous systems, managed cloud platforms, payment engines, and developer infrastructure powered by Kiwik.
        </p>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          MOVABLE 3D MODEL CARDS CONTAINER (Moves in on Scroll)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[32px] bg-[#0A0B10]/95 border border-white/10 p-4 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden relative"
      >
        {/* Soft Ambient Radial Backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Movable 3D Card Stream Slider */}
        <MovableCardSlider />
      </motion.div>

    </section>
  );
}
