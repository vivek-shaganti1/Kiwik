"use client";

import React from "react";
import { motion } from "framer-motion";

export function OSWorkspaceWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary antialiased selection:bg-accent/30 selection:text-accent overflow-x-hidden font-sans">
      {/* Background Animated Gradient Mesh Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] left-[15%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 dark:bg-indigo-500/12 blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[35%] -right-[10%] w-[700px] h-[700px] rounded-full bg-violet-600/10 dark:bg-purple-500/10 blur-[160px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 15, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] left-[25%] w-[550px] h-[550px] rounded-full bg-blue-600/10 dark:bg-cyan-500/10 blur-[130px]"
        />

        {/* System Grid Overlay Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 dark:opacity-60" />
      </div>

      {/* Main Page Workspace Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
