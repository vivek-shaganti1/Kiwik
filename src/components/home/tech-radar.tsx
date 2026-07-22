"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Code, Database, Cloud, Sparkles, Layers, Zap } from "lucide-react";
import { GlassSpotlightCard } from "@/components/glass/glass-spotlight-card";
import { cn } from "@/lib/utils";

interface TechCategoryItem {
  id: string;
  name: string;
  items: { name: string; icon?: string; color: string; desc: string }[];
}

const techCategories: TechCategoryItem[] = [
  {
    id: "frontend",
    name: "Frontend & UI Engine",
    items: [
      { name: "Next.js 15", color: "#FFFFFF", desc: "React 19 Server Components & App Router" },
      { name: "React 19", color: "#61DAFB", desc: "Concurrent rendering engine" },
      { name: "TypeScript", color: "#3178C6", desc: "Strict end-to-end type safety" },
      { name: "Tailwind CSS v4", color: "#06B6D4", desc: "Cascade Layers & CSS custom properties" },
      { name: "Framer Motion", color: "#FF0055", desc: "Layout animations & spring physics" },
    ]
  },
  {
    id: "backend",
    name: "Backend & Database",
    items: [
      { name: "Node.js", color: "#339933", desc: "Serverless runtime engine" },
      { name: "Prisma ORM", color: "#2D3748", desc: "Type-safe database client" },
      { name: "PostgreSQL", color: "#4169E1", desc: "Relational database storage" },
      { name: "JWT Auth", color: "#F59E0B", desc: "Stateless security tokens" },
    ]
  },
  {
    id: "ai",
    name: "AI & Automation",
    items: [
      { name: "Gemini AI API", color: "#8B5CF6", desc: "Multimodal intelligence & structured output" },
      { name: "LangChain", color: "#10B981", desc: "Autonomous agent orchestration" },
      { name: "Vector DB", color: "#EC4899", desc: "Semantic embedding retrieval" },
    ]
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    items: [
      { name: "Vercel Edge", color: "#FFFFFF", desc: "Global CDN serverless deployment" },
      { name: "Docker", color: "#2496ED", desc: "Containerized reproducible builds" },
      { name: "GitHub Actions", color: "#2088FF", desc: "Automated CI/CD pipelines" },
    ]
  }
];

export function TechRadar() {
  const [selectedCat, setSelectedCat] = useState<string>("frontend");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const currentCategory = techCategories.find(c => c.id === selectedCat) || techCategories[0];

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 md:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" /> Tech Ecosystem
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Powered by Next-Generation Stack
        </h2>
        <p className="text-text-secondary text-sm sm:text-base">
          Click a category to explore the modern architecture powering the Criska project ecosystem.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {techCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2",
              selectedCat === cat.id
                ? "bg-accent-blue text-white shadow-lg shadow-blue-500/20"
                : "bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/5"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Interactive Tech Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCategory.items.map((tech) => (
          <GlassSpotlightCard
            key={tech.name}
            spotlightColor={`${tech.color}25`}
            className="p-5 flex flex-col justify-between group cursor-pointer"
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-bold text-white group-hover:text-accent-blue transition-colors">
                {tech.name}
              </span>
              <span
                className="w-3 h-3 rounded-full shadow-lg transition-transform group-hover:scale-125"
                style={{ backgroundColor: tech.color }}
              />
            </div>
            <p className="text-xs text-text-secondary">{tech.desc}</p>
          </GlassSpotlightCard>
        ))}
      </div>
    </div>
  );
}
