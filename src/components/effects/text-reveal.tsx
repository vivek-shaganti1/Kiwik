"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  delay?: number;
}

export function TextReveal({ text, className, highlightWords = [], delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.h2
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn("flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 select-none", className)}
    >
      {words.map((word, idx) => {
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
        );

        return (
          <motion.span
            key={idx}
            variants={wordVariants}
            className={cn(
              "inline-block",
              isHighlight &&
                "bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-indigo-500 to-accent-cyan font-bold italic"
            )}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h2>
  );
}
