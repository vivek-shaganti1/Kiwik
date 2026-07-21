"use client";

import { forwardRef, useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "secondary", size = "md", children, onClick, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
    
    // Magnetic effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Max displacement 8px
      const strength = 0.2;
      x.set(Math.max(-8, Math.min(8, distanceX * strength)));
      y.set(Math.max(-8, Math.min(8, distanceY * strength)));
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      const btn = buttonRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const xPos = e.clientX - rect.left;
        const yPos = e.clientY - rect.top;
        const newRipple = { x: xPos, y: yPos, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
      }
      if (onClick) {
        onClick(e);
      }
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const variantClasses = {
      primary: "bg-[var(--accent)] text-white border border-white/20 shadow-lg hover:opacity-90",
      secondary: "glass glass-noise hover:bg-white/10 dark:hover:bg-white/5 border border-white/10 text-text-primary",
      ghost: "hover:bg-black/5 dark:hover:bg-white/5 text-text-primary",
    };

    return (
      <motion.button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        style={{ x: mouseXSpring, y: mouseYSpring }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden transition-colors duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...(props as any)}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        
        {/* Ripples */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-current pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "100px",
              height: "100px",
              marginLeft: "-50px",
              marginTop: "-50px",
            }}
          />
        ))}
      </motion.button>
    );
  }
);
GlassButton.displayName = "GlassButton";
