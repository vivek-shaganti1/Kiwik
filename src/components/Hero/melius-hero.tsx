"use client";

import React from "react";
import { motion } from "framer-motion";
import { PaperBackground } from "./paper-background";
import { ImageRibbon } from "./ribbon";
import { PromptCTA } from "./prompt-cta";
import { cn } from "@/lib/utils";

export function MeliusHero() {
  return (
    <PaperBackground className="min-h-screen flex flex-col justify-between pt-12 pb-12 overflow-hidden">
      {/* Hero Center Section */}
      <main className="flex-1 flex flex-col items-center justify-center space-y-6 sm:space-y-10 my-auto text-center px-4 relative z-10">
        
        {/* ─────────────────────────────────────────────────────────────
            HEADLINE (Large Editorial Serif, Canela / Playfair style)
           ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 sm:space-y-2 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tight leading-[0.95] text-[#18181B] dark:text-[#F4F4F5]">
            One platform. <br />
            <span className="italic font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#18181B] via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400">
              Every creative outcome.
            </span>
          </h1>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE PARALLAX INFINITE IMAGE EMITTER GALLERY
           ───────────────────────────────────────────────────────────── */}
        <ImageRibbon />

        {/* ─────────────────────────────────────────────────────────────
            SUBTITLE & DESCRIPTION
           ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto text-center"
        >
          <p className="text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans font-medium">
            Be the creative director. Let agents be your team. <br className="hidden sm:block" />
            Brief our agent Mel, watch the work assemble, and steer any prompt until the output lands exactly as you imagined.
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE PROMPT INPUT CTA
           ───────────────────────────────────────────────────────────── */}
        <PromptCTA />

      </main>
    </PaperBackground>
  );
}
