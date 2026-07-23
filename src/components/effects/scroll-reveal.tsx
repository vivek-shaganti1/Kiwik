"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationVariant =
  | "fade-up"
  | "scale-up"
  | "blur-reveal"
  | "mask-reveal"
  | "slide-right"
  | "slide-left"
  | "stagger-container"
  | "stagger-item";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.7,
  className,
  viewportMargin = "-60px",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: viewportMargin as any });

  const getVariants = (): Variants => {
    const customEase = [0.16, 1, 0.3, 1] as const;

    switch (variant) {
      case "scale-up":
        return {
          hidden: { opacity: 0, scale: 0.9, y: 30, filter: "blur(8px)" },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration, delay, ease: customEase },
          },
        };

      case "blur-reveal":
        return {
          hidden: { opacity: 0, filter: "blur(16px)", y: 20 },
          visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: { duration, delay, ease: customEase },
          },
        };

      case "mask-reveal":
        return {
          hidden: { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" },
          visible: {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: duration * 1.2, delay, ease: customEase },
          },
        };

      case "slide-right":
        return {
          hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
          visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { duration, delay, ease: customEase },
          },
        };

      case "slide-left":
        return {
          hidden: { opacity: 0, x: 40, filter: "blur(6px)" },
          visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { duration, delay, ease: customEase },
          },
        };

      case "stagger-container":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: delay,
            },
          },
        };

      case "stagger-item":
        return {
          hidden: { opacity: 0, y: 25, scale: 0.95, filter: "blur(6px)" },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: { duration, ease: customEase },
          },
        };

      case "fade-up":
      default:
        return {
          hidden: { opacity: 0, y: 35, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration, delay, ease: customEase },
          },
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
