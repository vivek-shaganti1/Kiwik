/**
 * ═══════════════════════════════════════════════════════════════════════════
 * KIWIK OS MOTION DESIGN SYSTEM (Apple / Linear / Stripe / Framer Quality)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Variants, Transition } from "framer-motion";

// Standardized Spring & Easing Physics
export const physics = {
  springSmooth: { type: "spring", stiffness: 280, damping: 28, mass: 0.9 },
  springBouncy: { type: "spring", stiffness: 350, damping: 22, mass: 0.8 },
  springSnappy: { type: "spring", stiffness: 420, damping: 30, mass: 0.7 },
  easeApple: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeLinear: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

// Reusable Motion Presets for UI Components
export const motionPreset = {
  // Card & Element Hover Lift
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.25, ease: physics.easeApple },
  },

  // Button & Card Tap Compression
  tap: {
    scale: 0.97,
    transition: { duration: 0.12, ease: physics.easeApple },
  },

  // Universal Stagger Reveal Container
  revealContainer: (staggerChildren = 0.08, delayChildren = 0.05): Variants => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }),

  // Universal Stagger Reveal Item
  revealItem: {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)", scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.55, ease: physics.easeApple },
    },
  },

  // Hero Floating Device Perspective Transition
  heroDevice: (index: number): Transition => ({
    duration: 8 + index * 1.5,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  }),

  // Scroll Viewport Reveal
  scrollReveal: {
    initial: { opacity: 0, y: 32, filter: "blur(6px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: physics.easeApple },
  },

  // Floating Pill Navbar Scroll Compression
  navbarScroll: (scrolled: boolean) => ({
    scale: scrolled ? 0.98 : 1,
    backdropFilter: scrolled ? "blur(28px) saturate(180%)" : "blur(20px) saturate(160%)",
    boxShadow: scrolled
      ? "0 20px 50px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
      : "0 10px 30px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
    transition: { duration: 0.3, ease: physics.easeApple },
  }),
};
