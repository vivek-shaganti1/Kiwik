"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  
  const springConfig = { damping: 40, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if it's a touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) {
      setIsDesktop(true);
    }
    
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isDesktop) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        opacity: isVisible ? 1 : 0,
      }}
      className="fixed top-0 left-0 w-[600px] h-[600px] -ml-[300px] -mt-[300px] rounded-full pointer-events-none z-50 mix-blend-screen transition-opacity duration-500 will-change-transform"
    >
      <div
        className="w-full h-full rounded-full"
        style={{ background: "radial-gradient(circle at center, hsl(var(--accent-h) var(--accent-s) var(--accent-l) / 0.15) 0%, transparent 50%)" }}
      />
    </motion.div>
  );
}
