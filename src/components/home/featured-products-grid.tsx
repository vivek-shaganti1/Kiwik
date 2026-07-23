"use client";

import React from "react";
import { motion } from "framer-motion";
import { EditorialProductPanel } from "./editorial-product-panel";

export function FeaturedProductsGrid() {
  const editorialProducts = [
    {
      id: "criska-ai",
      slug: "criska-ai",
      name: "CriskaAI",
      status: "Private Beta",
      category: "AI Operations",
      tagline: "AI knowledge assistant and autonomous ops agent for enterprise support teams.",
      ctaText: "Explore Product",
      layoutVariant: "orb" as const,
      glowColor: "rgba(168, 85, 247, 0.08)",
      accentText: "text-purple-400",
    },
    {
      id: "criska-cloud",
      slug: "criska-cloud",
      name: "CriskaCloud",
      status: "Pilot",
      category: "Infrastructure",
      tagline: "Managed cloud infrastructure, telemetry, and automated deployment platform.",
      ctaText: "View Platform",
      layoutVariant: "telemetry" as const,
      glowColor: "rgba(59, 130, 246, 0.08)",
      accentText: "text-blue-400",
    },
    {
      id: "criska-pay",
      slug: "criska-pay",
      name: "CriskaPay",
      status: "Prototype",
      category: "Financial Settlement",
      tagline: "Encrypted instant settlement, billing engine, and automated digital ledger.",
      ctaText: "Launch Demo",
      layoutVariant: "browser" as const,
      glowColor: "rgba(16, 185, 129, 0.08)",
      accentText: "text-emerald-400",
    },
    {
      id: "kiwik",
      slug: "kiwik-1",
      name: "Kiwik Ecosystem",
      status: "Live Platform",
      category: "Developer OS",
      tagline: "Central command hub, live documentation, and real-time edge telemetry engine.",
      ctaText: "Documentation",
      layoutVariant: "terminal" as const,
      glowColor: "rgba(249, 115, 22, 0.08)",
      accentText: "text-orange-400",
    },
  ];

  return (
    <section id="featured-products-section" className="py-24 md:py-32 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto relative z-20 select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION HEADER (Obsidian Editorial Style)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-16 space-y-4"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">
          FEATURED PRODUCTS
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-white tracking-tight leading-[1.05]">
          The Enterprise Operating System
        </h2>
        <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans font-medium max-w-xl mx-auto leading-relaxed">
          Products crafted for modern engineering teams. Every platform is designed as a world-class software launch.
        </p>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          2-COLUMN EDITORIAL SHOWCASE PANELS GRID (80px-100px Spacing)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
        {editorialProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <EditorialProductPanel {...product} />
          </motion.div>
        ))}
      </div>

    </section>
  );
}
