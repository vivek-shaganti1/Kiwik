"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Grid3X3, 
  List, 
  Clock, 
  Filter, 
  Search, 
  Folder, 
  Archive,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";
import { useProjects } from "@/stores/projects-store";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectStatus, ProjectCategory, SortMode } from "@/types";
import { cn } from "@/lib/utils";

type LayoutMode = "grid" | "rows" | "timeline";

export default function ProjectsPage() {
  const projects = useProjects();
  const [layout, setLayout] = useState<LayoutMode>("grid");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | "all">("all");
  const [sortMode, setSortMode] = useState<SortMode>("recently-updated");
  const [showFiltersPanel, setShowFiltersPanel] = useState(true);
  
  // Calculate dynamic stats from projects store
  const stats = useMemo(() => {
    const total = projects.length;
    const live = projects.filter(p => p.status === "completed").length;
    const inProgress = projects.filter(p => p.status === "in-progress").length;
    const archived = projects.filter(p => p.status === "archived").length;
    return { total, live, inProgress, archived };
  }, [projects]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach(p => cats.add(p.category));
    return ["all", ...Array.from(cats)] as (ProjectCategory | "all")[];
  }, [projects]);
  
  const filteredAndSorted = useMemo(() => {
    let result = projects.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.tagline.toLowerCase().includes(search.toLowerCase()) ||
                          p.category.toLowerCase().includes(search.toLowerCase());
      
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
    
    result.sort((a, b) => {
      switch (sortMode) {
        case "newest": return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
        case "oldest": return new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime();
        case "recently-updated": return new Date(b.lastUpdated || "").getTime() - new Date(a.lastUpdated || "").getTime();
        case "alphabetical": return a.name.localeCompare(b.name);
        case "most-viewed": return (b.views || 0) - (a.views || 0);
        case "popularity": return (b.stars || 0) - (a.stars || 0);
        default: return 0;
      }
    });
    
    return result;
  }, [projects, search, statusFilter, categoryFilter, sortMode]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title & Stats Block Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 select-none">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">Projects</span>
          </h1>
          <p className="text-text-secondary text-sm md:text-base max-w-md leading-relaxed">
            Explore the complete suite of products, platforms, and experiments built by Criska.
          </p>
        </div>

        {/* Stats row widgets */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:min-w-[500px]">
          {/* Total Projects */}
          <div className="vision-glass border border-white/50 dark:border-white/5 bg-white/40 dark:bg-bg-secondary/40 p-3.5 rounded-2xl flex flex-col justify-between min-h-[76px] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-text-primary leading-none">{stats.total}</span>
              <div className="p-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500">
                <Folder className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-[9px] font-mono text-text-secondary uppercase tracking-wider font-bold">Total Projects</span>
          </div>
          
          {/* Live */}
          <div className="vision-glass border border-white/50 dark:border-white/5 bg-white/40 dark:bg-bg-secondary/40 p-3.5 rounded-2xl flex flex-col justify-between min-h-[76px] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-text-primary leading-none">{stats.live}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[9px] font-mono text-text-secondary uppercase tracking-wider font-bold">Live</span>
          </div>

          {/* In Progress */}
          <div className="vision-glass border border-white/50 dark:border-white/5 bg-white/40 dark:bg-bg-secondary/40 p-3.5 rounded-2xl flex flex-col justify-between min-h-[76px] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-text-primary leading-none">{stats.inProgress}</span>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <span className="text-[9px] font-mono text-text-secondary uppercase tracking-wider font-bold">In Progress</span>
          </div>

          {/* Archived */}
          <div className="vision-glass border border-white/50 dark:border-white/5 bg-white/40 dark:bg-bg-secondary/40 p-3.5 rounded-2xl flex flex-col justify-between min-h-[76px] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-text-primary leading-none">{stats.archived}</span>
              <div className="p-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-500">
                <Archive className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-[9px] font-mono text-text-secondary uppercase tracking-wider font-bold">Archived</span>
          </div>
        </div>
      </div>
      
      {/* Search and Layout Control Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search projects, tech stack, or keywords..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-12 py-2.5 bg-glass-bg border border-glass-border rounded-2xl focus:outline-none focus:border-accent-blue text-xs font-medium text-text-primary placeholder:text-text-secondary/50 shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-0.5 bg-black/5 dark:bg-white/5 border border-glass-border px-1.5 py-0.5 rounded text-[8px] font-mono text-text-secondary select-none font-bold">
            ⌘K
          </div>
        </div>
        
        {/* Actions Button Group */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Grid Layout Toggle */}
          <div className="flex bg-glass-bg border border-glass-border rounded-2xl p-1 shrink-0 shadow-sm">
            <button onClick={() => setLayout("grid")} className={cn("p-2 rounded-xl transition-all", layout === "grid" ? "bg-white/80 dark:bg-white/10 text-text-primary shadow-sm border border-glass-border" : "text-text-secondary hover:text-text-primary")} aria-label="Grid layout">
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setLayout("rows")} className={cn("p-2 rounded-xl transition-all", layout === "rows" ? "bg-white/80 dark:bg-white/10 text-text-primary shadow-sm border border-glass-border" : "text-text-secondary hover:text-text-primary")} aria-label="Rows layout">
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
          
          {/* Sort Selector Dropdown */}
          <div className="relative shrink-0 select-none">
            <select 
              value={sortMode} 
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="bg-glass-bg border border-glass-border rounded-2xl pl-4 pr-9 py-2.5 text-xs font-semibold text-text-primary focus:outline-none focus:border-accent-blue appearance-none cursor-pointer shadow-sm min-w-[130px]"
            >
              <option value="recently-updated">Recently Updated</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="most-viewed">Most Viewed</option>
              <option value="popularity">Popularity</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary pointer-events-none" />
          </div>

          {/* Filters toggle triggers */}
          <button 
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            className={cn(
              "px-4 py-2.5 rounded-2xl shadow-sm text-xs font-bold transition-all flex items-center gap-2 border active:scale-95",
              showFiltersPanel 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-transparent text-white" 
                : "bg-glass-bg border-glass-border text-text-secondary hover:text-text-primary"
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            { (statusFilter !== "all" || categoryFilter !== "all") && (
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            )}
          </button>
        </div>
      </div>
      
      {/* Expandable Filters Panel */}
      <AnimatePresence>
        {showFiltersPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-10 select-none"
          >
            <div className="p-5 rounded-2xl bg-glass-bg border border-glass-border flex flex-col gap-4 shadow-inner">
              {/* Status pills filter */}
              <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-0.5">
                <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-wider shrink-0 min-w-[70px]">Status:</span>
                <div className="flex gap-2">
                  {(["all", "live", "completed", "in-progress", "archived"] as const).map(status => (
                    <button 
                      key={status}
                      onClick={() => setStatusFilter(status === "completed" ? "completed" : status as any)}
                      className={cn(
                        "px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border",
                        (statusFilter === status || (status === "live" && statusFilter === "completed"))
                          ? "bg-accent-blue border-accent-blue text-white shadow-sm" 
                          : "bg-white/30 dark:bg-white/5 border-glass-border text-text-secondary hover:border-glass-border-hover hover:text-text-primary"
                      )}
                    >
                      {status === "completed" ? "Completed" : status.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Category pills filter */}
              <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-0.5 border-t border-divider/60 pt-4">
                <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-wider shrink-0 min-w-[70px]">Category:</span>
                <div className="flex gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={cn(
                        "px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border capitalize",
                        categoryFilter === cat 
                          ? "bg-accent-blue border-accent-blue text-white shadow-sm" 
                          : "bg-white/30 dark:bg-white/5 border-glass-border text-text-secondary hover:border-glass-border-hover hover:text-text-primary"
                      )}
                    >
                      {cat.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Projects list grid */}
      {filteredAndSorted.length === 0 ? (
        <div className="text-center py-20 bg-glass-bg border border-glass-border rounded-2xl">
          <Filter className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-50 animate-bounce" />
          <h3 className="text-lg font-bold mb-2 text-text-primary">No projects found</h3>
          <p className="text-text-secondary text-xs">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <motion.div 
          layout
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
