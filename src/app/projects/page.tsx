"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, List, Clock, Filter, Search } from "lucide-react";
import { useProjects } from "@/stores/projects-store";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectStatus, ProjectCategory, SortMode } from "@/types";
import { cn } from "@/lib/utils";

import { KiwikWindow, KiwikToolbar, KiwikSearch, KiwikBadge, KiwikButton, KiwikCard } from "@/components/ui/kiwik-primitives";

type LayoutMode = "grid" | "rows" | "timeline";

export default function ProjectsPage() {
  const projects = useProjects();
  const [layout, setLayout] = useState<LayoutMode>("grid");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | "all">("all");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach(p => cats.add(p.category));
    return ["all", ...Array.from(cats)] as (ProjectCategory | "all")[];
  }, []);
  
  const filteredAndSorted = useMemo(() => {
    let result = projects.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.tagline.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
    
    result.sort((a, b) => {
      switch (sortMode) {
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "recently-updated": return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case "alphabetical": return a.name.localeCompare(b.name);
        case "most-viewed": return (b.views || 0) - (a.views || 0);
        case "popularity": return (b.stars || 0) - (a.stars || 0);
        default: return 0;
      }
    });
    
    return result;
  }, [search, statusFilter, categoryFilter, sortMode]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-6">
      {/* Workspace Header Window */}
      <KiwikWindow title="Kiwik OS — Projects Workspace">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Projects Ecosystem</h1>
            <p className="mt-1 text-xs text-text-secondary">
              Indexed {filteredAndSorted.length} system module{filteredAndSorted.length !== 1 ? 's' : ''} across edge nodes.
            </p>
          </div>
          <KiwikSearch
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
          />
        </div>
      </KiwikWindow>
      
      {/* Toolbar Controls */}
      <KiwikToolbar
        leftActions={
          <div className="flex items-center gap-1 bg-bg-tertiary/60 p-1 rounded-xl border border-glass-border">
            <button
              onClick={() => setLayout("grid")}
              className={cn("p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer", layout === "grid" ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary")}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout("rows")}
              className={cn("p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer", layout === "rows" ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary")}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout("timeline")}
              className={cn("p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer", layout === "timeline" ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary")}
            >
              <Clock className="w-4 h-4" />
            </button>
          </div>
        }
        rightActions={
          <select 
            value={sortMode} 
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="bg-bg-secondary/80 border border-glass-border rounded-xl px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-accent appearance-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="recently-updated">Recently Updated</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="most-viewed">Most Viewed</option>
            <option value="popularity">Popularity</option>
          </select>
        }
      >
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-hide">
          {(["all", "live", "completed", "in-progress", "archived"] as const).map(status => (
            <KiwikButton
              key={status}
              variant={statusFilter === status ? "primary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter(status as any)}
              className="capitalize text-[11px]"
            >
              {status.replace("-", " ")}
            </KiwikButton>
          ))}
        </div>
      </KiwikToolbar>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <span className="text-xs font-medium text-text-tertiary">Category:</span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border capitalize cursor-pointer",
              categoryFilter === cat
                ? "bg-accent text-white border-accent shadow-sm"
                : "bg-bg-secondary/60 border-glass-border text-text-secondary hover:border-accent/40 hover:text-text-primary"
            )}
          >
            {cat.replace("-", " ")}
          </button>
        ))}
      </div>
      
      {/* Projects Grid / Empty state */}
      {filteredAndSorted.length === 0 ? (
        <KiwikCard padding="lg" className="text-center py-20">
          <Filter className="w-10 h-10 text-text-tertiary mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-text-primary">No module matching filters</h3>
          <p className="text-xs text-text-secondary mt-1">Try resetting your search query or status filter criteria.</p>
          <KiwikButton variant="secondary" size="sm" onClick={() => { setSearch(""); setStatusFilter("all"); setCategoryFilter("all"); }} className="mt-4">
            Reset Filters
          </KiwikButton>
        </KiwikCard>
      ) : (
        <motion.div 
          layout
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          animate="show"
          className={cn(
            "grid gap-6",
            layout === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "",
            layout === "rows" ? "grid-cols-1" : "",
            layout === "timeline" ? "grid-cols-1 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-divider before:to-transparent" : ""
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSorted.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "h-full",
                  layout === "rows" ? "w-full" : "",
                  layout === "timeline" ? cn(
                    "relative md:w-[calc(50%-2rem)]", 
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  ) : ""
                )}
              >
                {layout === "timeline" && (
                  <div className={cn(
                    "absolute top-10 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent)] z-10 hidden md:block",
                    index % 2 === 0 ? "-right-[2.1rem]" : "-left-[2.1rem]"
                  )} />
                )}
                {layout === "timeline" && (
                  <div className="absolute top-10 left-5 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent)] z-10 -translate-x-1/2 md:hidden" />
                )}
                <div className={cn("h-full", layout === "timeline" ? "pl-12 md:pl-0" : "")}>
                  <ProjectCard project={project} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
