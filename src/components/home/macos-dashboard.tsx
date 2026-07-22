"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, 
  FileText, 
  Activity, 
  Sparkles, 
  Settings,
  LayoutGrid,
  Search,
  Bell,
  ChevronRight,
  ExternalLink,
  Monitor,
  Heart,
  Globe,
  Database,
  Code2
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarTab = "overview" | "projects" | "docs" | "analytics" | "ai" | "settings";

interface DashboardProject {
  name: string;
  tagline: string;
  status: "live" | "beta" | "in-progress";
  percent: number;
  category: string;
  image: string;
  github?: string;
  liveUrl?: string;
  tech: string[];
}

export function MacosDashboard() {
  const [activeTab, setActiveTab] = useState<SidebarTab>("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["Criska AI"]);

  const projects: DashboardProject[] = [
    {
      name: "Criska AI",
      tagline: "State-of-the-art AI orchestration platform.",
      status: "live",
      percent: 100,
      category: "ai",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com",
      liveUrl: "https://vercel.app"
    },
    {
      name: "InterviewAI",
      tagline: "SaaS automation workflow engine.",
      status: "live",
      percent: 95,
      category: "saas",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80",
      tech: ["React", "Prisma", "PostgreSQL"],
      github: "https://github.com",
      liveUrl: "https://vercel.app"
    },
    {
      name: "RAN Fitness",
      tagline: "Real-time edge telemetry application.",
      status: "live",
      percent: 92,
      category: "mobile",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=80",
      tech: ["TypeScript", "Next.js", "Prisma"],
      github: "https://github.com",
      liveUrl: "https://vercel.app"
    },
    {
      name: "Trading AI",
      tagline: "Algorithmic execution control script.",
      status: "beta",
      percent: 89,
      category: "ml",
      image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=400&q=80",
      tech: ["React", "PostgreSQL", "Vercel"],
      github: "https://github.com",
      liveUrl: "https://vercel.app"
    }
  ];

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (name: string) => {
    setFavorites(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: <Globe className="w-3.5 h-3.5" /> },
    { id: "projects", label: "Projects", icon: <Folder className="w-3.5 h-3.5" /> },
    { id: "docs", label: "Documentation", icon: <FileText className="w-3.5 h-3.5" /> },
    { id: "analytics", label: "Analytics", icon: <Activity className="w-3.5 h-3.5" /> },
    { id: "ai", label: "AI Assistant", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-3.5 h-3.5" /> }
  ] as const;

  const stack = [
    { name: "Next.js", icon: "▲" },
    { name: "React", icon: "⚛" },
    { name: "TypeScript", icon: "TS" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Prisma", icon: "⏵" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Vercel", icon: "▲" }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mt-12 mb-16 relative z-30 select-none">
      {/* Outer macOS chrome wrapper */}
      <div className="vision-glass border border-white/50 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[580px]">
        
        {/* Sidebar Left panel */}
        <aside className="w-full md:w-[220px] bg-bg-secondary/40 border-r border-divider/60 p-4 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            {/* macOS Chrome Close minimize restore buttons */}
            <div className="flex items-center gap-1.5 px-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 cursor-pointer hover:opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 cursor-pointer hover:opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 cursor-pointer hover:opacity-80" />
              <span className="ml-3 text-[10px] font-mono text-text-secondary select-none font-bold uppercase tracking-wider">
                Kiwik OS
              </span>
            </div>

            <div className="space-y-0.5">
              {sidebarItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all text-left relative",
                      isActive 
                        ? "text-text-primary bg-neutral-200/50 dark:bg-white/10 shadow-sm" 
                        : "text-text-secondary hover:text-text-primary hover:bg-neutral-200/20 dark:hover:bg-white/5"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="dashboardActiveTabPill"
                        className="absolute inset-0 bg-neutral-200/40 dark:bg-white/5 border border-white/5 rounded-xl z-[-1]"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                    <span className={cn(isActive ? "text-accent-blue" : "text-text-secondary")}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-bg-primary/40 border border-glass-border select-none">
            <span className="text-[9px] font-mono text-text-secondary uppercase tracking-widest font-bold block mb-1">Telemetry Status</span>
            <div className="flex items-center gap-1.5 text-xs text-text-primary font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>OS Kernel Active</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-between min-h-[500px]">
          
          {/* Header search controls */}
          <div className="px-6 py-4 bg-bg-secondary/20 border-b border-divider/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search projects, docs, commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-neutral-200/40 dark:bg-white/5 border border-glass-border focus:outline-none focus:border-accent-blue text-xs font-semibold transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-xl bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-text-secondary hover:text-text-primary transition-colors">
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button className="p-2 rounded-xl bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-text-secondary hover:text-text-primary transition-colors relative">
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
              </button>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                alt="Profile Avatar" 
                className="w-7 h-7 rounded-full border border-glass-border" 
              />
            </div>
          </div>

          {/* Main content body view tabs switch */}
          <div className="p-6 flex-1">
            <AnimatePresence mode="wait">
              {activeTab === "projects" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-mono uppercase tracking-widest text-text-secondary font-bold">Featured Projects</h2>
                    <span className="text-xs text-accent-blue hover:underline cursor-pointer flex items-center gap-1 font-semibold">
                      View All <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {filteredProjects.map((p) => {
                      const fav = favorites.includes(p.name);
                      return (
                        <div 
                          key={p.name} 
                          className="vision-glass border border-white/50 bg-white/45 dark:bg-bg-secondary/40 rounded-2xl overflow-hidden hover:border-accent-blue/35 transition-all group flex flex-col"
                        >
                          {/* Image area */}
                          <div className="relative h-28 overflow-hidden border-b border-divider">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-glass-bg border border-glass-border backdrop-blur-md">
                              <span className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                p.status === "live" ? "bg-emerald-500" : "bg-amber-500"
                              )} />
                              <span className="text-[8px] font-mono font-bold capitalize text-text-primary">{p.status}</span>
                            </div>

                            {/* Favorite Button */}
                            <button 
                              onClick={() => toggleFavorite(p.name)}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-text-secondary transition-colors"
                            >
                              <Heart className={cn("w-3 h-3", fav ? "fill-rose-500 text-rose-500" : "text-text-secondary")} />
                            </button>
                          </div>

                          {/* Body area */}
                          <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                            <div>
                              <h3 className="text-xs font-bold text-text-primary tracking-tight">{p.name}</h3>
                              <p className="text-[10px] text-text-secondary mt-1 line-clamp-2 leading-relaxed">{p.tagline}</p>
                            </div>

                            <div className="pt-2 border-t border-divider flex items-center justify-between text-[9px] font-mono font-bold text-text-secondary select-none">
                              <span>COMPLETION</span>
                              <span className="text-accent-blue">{p.percent}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 text-left p-4 rounded-2xl bg-bg-secondary/20 border border-glass-border max-w-xl"
                >
                  <h3 className="text-sm font-bold text-text-primary">Kiwik OS Control Console</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    This operating cockpit connects all CriskaAI, CriskaCloud, and FlowEngine platforms. Use the left menu tab switcher to explore documentation libraries, deployment logs, and system settings files.
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-glass-bg border border-glass-border text-center">
                      <div className="text-lg font-bold text-accent-blue">24</div>
                      <div className="text-[9px] text-text-secondary uppercase">Projects</div>
                    </div>
                    <div className="p-3 rounded-xl bg-glass-bg border border-glass-border text-center">
                      <div className="text-lg font-bold text-emerald-500">99.9%</div>
                      <div className="text-[9px] text-text-secondary uppercase">Uptime</div>
                    </div>
                    <div className="p-3 rounded-xl bg-glass-bg border border-glass-border text-center">
                      <div className="text-lg font-bold text-purple-500">14ms</div>
                      <div className="text-[9px] text-text-secondary uppercase">Latency</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab !== "projects" && activeTab !== "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center p-12 text-xs text-text-secondary font-mono"
                >
                  📡 Section active inside central Kiwik.1 kernel.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Technology stack footer bar */}
          <footer className="px-6 py-4 bg-bg-secondary/40 border-t border-divider/60 flex flex-wrap items-center gap-3">
            <span className="text-[9px] font-mono text-text-secondary uppercase tracking-widest font-bold select-none mr-2">
              System Core:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {stack.map((item) => (
                <span 
                  key={item.name} 
                  className="px-2.5 py-1 rounded-lg bg-glass-bg border border-glass-border text-[9px] font-mono font-semibold text-text-secondary flex items-center gap-1 hover:border-glass-border-hover transition-colors"
                >
                  <span className="text-accent-blue font-bold">{item.icon}</span>
                  <span>{item.name}</span>
                </span>
              ))}
              <span className="px-2.5 py-1 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-[9px] font-mono font-bold text-accent-blue">
                + 20 More
              </span>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
