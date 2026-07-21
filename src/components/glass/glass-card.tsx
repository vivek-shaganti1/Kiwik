"use client";

import { useRef, MouseEvent, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  tilt = true,
  glow = true,
  ...props
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    // Calculate mouse position relative to the center of the card (-0.5 to 0.5)
    const clientX = e.clientX;
    const clientY = e.clientY;

    const relX = (clientX - rect.left) / rect.width - 0.5;
    const relY = (clientY - rect.top) / rect.height - 0.5;

    x.set(relX);
    y.set(relY);

    // Update CSS vars for specular highlight
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    ref.current.style.setProperty("--mouse-x", `${px}px`);
    ref.current.style.setProperty("--mouse-y", `${py}px`);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={hover ? { y: -4, transition: { type: "spring", stiffness: 300, damping: 24 } } : {}}
      style={{
        rotateX: tilt && isHovered ? rotateX : 0,
        rotateY: tilt && isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-2xl p-6 transition-colors duration-300",
        "glass glass-noise",
        hover && "glass-hover",
        glow && "glass-glow",
        "glass-specular overflow-hidden",
        className
      )}
      {...(props as any)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered && glow ? 1 : 0,
          background: `radial-gradient(circle 300px at var(--mouse-x, 0) var(--mouse-y, 0), hsl(var(--accent-h) var(--accent-s) var(--accent-l) / 0.15), transparent 80%)`,
        }}
      />
      <div className="relative z-10" style={{ transform: tilt && isHovered ? "translateZ(30px)" : "none" }}>
        {children}
      </div>
    </motion.div>
  );
}
