"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Project } from "@/types";
import { GlassCard } from "@/components/glass/glass-card";
import { useFavoritesStore } from "@/stores/favorites-store";
import { cn, relativeTime } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

const categoryGradients: Record<string, string> = {
  ai: "from-violet-500/20 to-purple-500/20",
  web: "from-blue-500/20 to-cyan-500/20",
  mobile: "from-emerald-500/20 to-teal-500/20",
  automation: "from-orange-500/20 to-amber-500/20",
  devops: "from-cyan-500/20 to-blue-500/20",
  research: "from-rose-500/20 to-red-500/20",
  saas: "from-blue-500/20 to-indigo-500/20",
  "open-source": "from-emerald-500/20 to-green-500/20",
  blockchain: "from-orange-500/20 to-yellow-500/20",
  ml: "from-violet-500/20 to-fuchsia-500/20",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(project.id);
  const gradient = categoryGradients[project.category] || "from-gray-500/20 to-slate-500/20";
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(project.id);
  };

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl">
      <GlassCard hover tilt glow className="h-full flex flex-col p-0 overflow-hidden group">
        <div className={cn("relative h-[200px] w-full bg-gradient-to-br", gradient)}>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <div className={cn("w-2 h-2 rounded-full", {
                "bg-emerald-500": project.status === "completed",
                "bg-amber-500": project.status === "in-progress",
                "bg-rose-500": project.status === "archived",
              })} />
              <span className="text-xs font-medium text-white capitalize">{project.status.replace('-', ' ')}</span>
            </div>
            {project.version && (
              <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                <span className="text-xs font-medium text-white">{project.version}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-1 group-hover:text-[var(--accent)] transition-colors">
            {project.name}
          </h3>
          
          <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-grow">
            {project.tagline}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech.name} className="px-2 py-1 text-[10px] font-medium rounded bg-white/5 border border-white/10 text-text-secondary">
                {tech.name}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-[10px] font-medium rounded bg-white/5 border border-white/10 text-text-secondary">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.completionPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[var(--accent)] rounded-full"
                />
              </div>
              <div className="mt-2 text-[10px] text-text-secondary flex justify-between">
                <span>{project.completionPercent}% Complete</span>
                <span>{relativeTime(project.lastUpdated)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleFavoriteClick}
              className="p-2 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <motion.div animate={favorite ? { scale: [1, 1.2, 1] } : {}}>
                <Heart className={cn("w-5 h-5 transition-colors", favorite ? "fill-rose-500 text-rose-500" : "text-text-secondary")} />
              </motion.div>
            </button>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
