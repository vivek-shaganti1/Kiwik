"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Project } from "@/types";
import { GlassSpotlightCard } from "@/components/glass/glass-spotlight-card";
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
    <Link href={`/projects/${project.slug}`} className="block h-full outline-none group rounded-2xl">
      <GlassSpotlightCard className="h-full flex flex-col p-0 overflow-hidden border border-white/10 group-hover:border-white/25 transition-all">
        {/* Cover Image & Category Gradient Overlay */}
        <div className={cn("relative h-[190px] w-full bg-gradient-to-br overflow-hidden border-b border-white/10", gradient)}>
          {project.coverImage && (
            <img
              src={project.coverImage}
              alt={project.name}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

          {/* Status & Version Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
              <div
                className={cn("w-2 h-2 rounded-full", {
                  "bg-emerald-500": project.status === "completed",
                  "bg-amber-500": project.status === "in-progress",
                  "bg-rose-500": project.status === "archived",
                })}
              />
              <span className="text-[11px] font-semibold text-white capitalize">{project.status.replace("-", " ")}</span>
            </div>

            {project.version && (
              <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                <span className="text-[11px] font-mono font-medium text-neutral-300">{project.version}</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h3 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors line-clamp-1">
                {project.name}
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
                {project.category}
              </span>
            </div>

            <p className="text-xs text-text-secondary line-clamp-2 mb-4 leading-relaxed">
              {project.tagline || project.description}
            </p>
          </div>

          <div>
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech.name} className="px-2 py-0.5 text-[10px] font-mono rounded bg-black/40 border border-white/10 text-neutral-300">
                  {tech.name}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-black/40 border border-white/10 text-neutral-400">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Progress Bar & Favorite Button */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
              <div className="flex-1">
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${project.completionPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-accent-blue rounded-full"
                  />
                </div>
                <div className="mt-1.5 text-[10px] text-text-secondary flex justify-between font-mono">
                  <span>{project.completionPercent}% Complete</span>
                  <span>{relativeTime(project.lastUpdated)}</span>
                </div>
              </div>

              <button
                onClick={handleFavoriteClick}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              >
                <motion.div animate={favorite ? { scale: [1, 1.2, 1] } : {}}>
                  <Heart className={cn("w-4 h-4 transition-colors", favorite ? "fill-rose-500 text-rose-500" : "text-neutral-400")} />
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </GlassSpotlightCard>
    </Link>
  );
}
