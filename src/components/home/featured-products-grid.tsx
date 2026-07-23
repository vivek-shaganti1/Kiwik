"use client";

import React from "react";
import { motion } from "framer-motion";
import { AppleCoverflowCarousel } from "./apple-coverflow-carousel";

export function FeaturedProductsGrid() {
  return (
    <section id="featured-products-section" className="py-20 md:py-28 px-4 sm:px-6 md:px-8 max-w-[1500px] mx-auto relative z-20 select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION HEADER (Apple / Obsidian Keynote Style)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-10 space-y-4"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">
          FEATURED PRODUCTS
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-white tracking-tight leading-[1.05]">
          The Enterprise Operating System
        </h2>
        <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans font-medium max-w-xl mx-auto leading-relaxed">
          One featured platform at a time. Every project is showcased as a cinematic Apple-class software launch.
        </p>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          3D APPLE COVER-FLOW CENTER CAROUSEL
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <AppleCoverflowCarousel />
      </motion.div>

    </section>
  );
}
