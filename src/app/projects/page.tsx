"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, List, Clock, Filter, Search } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectStatus, ProjectCategory, SortMode } from "@/types";
import { cn } from "@/lib/utils";

type LayoutMode = "grid" | "rows" | "timeline";

export default function ProjectsPage() {
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
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
        <p className="text-text-secondary text-lg">Showing {filteredAndSorted.length} project{filteredAndSorted.length !== 1 ? 's' : ''}</p>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-glass-bg border border-glass-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-text-primary placeholder:text-text-secondary/50"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex bg-glass-bg border border-glass-border rounded-xl p-1 shrink-0">
            <button onClick={() => setLayout("grid")} className={cn("p-2 rounded-lg transition-colors", layout === "grid" ? "bg-glass-bg-hover text-text-primary" : "text-text-secondary hover:text-text-primary")} aria-label="Grid layout"><Grid3X3 className="w-4 h-4" /></button>
            <button onClick={() => setLayout("rows")} className={cn("p-2 rounded-lg transition-colors", layout === "rows" ? "bg-glass-bg-hover text-text-primary" : "text-text-secondary hover:text-text-primary")} aria-label="Rows layout"><List className="w-4 h-4" /></button>
            <button onClick={() => setLayout("timeline")} className={cn("p-2 rounded-lg transition-colors", layout === "timeline" ? "bg-glass-bg-hover text-text-primary" : "text-text-secondary hover:text-text-primary")} aria-label="Timeline layout"><Clock className="w-4 h-4" /></button>
          </div>
          
          <select 
            value={sortMode} 
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="bg-glass-bg border border-glass-border rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer shrink-0"
            style={{ backgroundColor: "var(--glass-bg)" }}
          >
            <option value="newest" className="bg-bg-elevated text-text-primary">Newest</option>
            <option value="oldest" className="bg-bg-elevated text-text-primary">Oldest</option>
            <option value="recently-updated" className="bg-bg-elevated text-text-primary">Recently Updated</option>
            <option value="alphabetical" className="bg-bg-elevated text-text-primary">Alphabetical</option>
            <option value="most-viewed" className="bg-bg-elevated text-text-primary">Most Viewed</option>
            <option value="popularity" className="bg-bg-elevated text-text-primary">Popularity</option>
          </select>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-sm font-medium text-text-secondary whitespace-nowrap">Status:</span>
          <div className="flex gap-2">
            {(["all", "live", "completed", "in-progress", "archived"] as const).map(status => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border",
                  statusFilter === status 
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]" 
                    : "bg-glass-bg border-glass-border text-text-secondary hover:border-glass-border-hover hover:text-text-primary"
                )}
              >
                {status.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-sm font-medium text-text-secondary whitespace-nowrap">Category:</span>
          <div className="flex gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border capitalize",
                  categoryFilter === cat 
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]" 
                    : "bg-glass-bg border-glass-border text-text-secondary hover:border-glass-border-hover hover:text-text-primary"
                )}
              >
                {cat.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Projects */}
      {filteredAndSorted.length === 0 ? (
        <div className="text-center py-20 bg-glass-bg border border-glass-border rounded-2xl">
          <Filter className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-text-secondary">Try adjusting your filters or search query.</p>
        </div>
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
                <div className={layout === "timeline" ? "pl-12 md:pl-0" : ""}>
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
