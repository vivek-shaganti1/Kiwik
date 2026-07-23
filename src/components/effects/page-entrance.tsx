"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageEntrance({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 900ms entrance protocol completion signal
    const timer = setTimeout(() => setIsLoaded(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[999] bg-bg-primary flex flex-col items-center justify-center pointer-events-none select-none"
          >
            <div className="relative flex flex-col items-center gap-4">
              {/* Pulsing Kiwik OS Kernel Symbol */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-accent-blue via-indigo-500 to-accent-cyan p-[1px] animate-pulse">
                  <div className="w-full h-full rounded-2xl bg-bg-primary flex items-center justify-center font-serif font-bold text-accent-blue text-xl shadow-2xl">
                    Kiwik
                  </div>
                </div>
                <div className="absolute -inset-2 rounded-3xl bg-accent-blue/20 blur-xl animate-ping" />
              </div>

              {/* System Boot Status Line */}
              <div className="space-y-1 text-center">
                <div className="text-[11px] font-mono font-bold text-text-primary tracking-widest uppercase">
                  Kiwik.1 Kernel Init
                </div>
                <div className="text-[9px] font-mono text-accent-blue font-bold tracking-wider">
                  Synchronizing Motion System v2 ... 900ms
                </div>
              </div>

              {/* Progress shimmer line */}
              <div className="w-48 h-1 bg-bg-secondary rounded-full overflow-hidden border border-glass-border">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
