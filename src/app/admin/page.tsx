"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectImage } from "@/components/ui/project-image";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  Download,
  Upload,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Layers,
  Sparkles,
  Code,
  ListPlus,
  GitBranch,
  FileText,
  Users,
  Calendar,
  Image as ImageIcon,
  Check,
  Eye,
  Star,
  LayoutDashboard,
  Smartphone,
  Tablet,
  Monitor,
  Moon,
  Sun,
  Shield,
  History,
  Settings,
  Palette,
  Compass,
  Database,
  Terminal,
  Activity,
  Workflow,
  Globe,
  ChevronRight,
  ChevronDown,
  Sliders,
  Play,
  RefreshCw,
  FolderPlus,
  Tag,
  ShieldCheck,
  HelpCircle,
  Lock,
  UserCheck,
  Folder,
  MousePointer,
  Cpu,
  Mail,
  Share2,
  FileCode,
  MessageSquare,
  BarChart3,
  Globe2,
  Laptop
} from "lucide-react";

import { useProjectsStore, useProjects } from "@/stores/projects-store";
import { useSiteCMSStore } from "@/stores/site-cms-store";
import { useDocsStore } from "@/stores/docs-store";
import { GlassCard } from "@/components/glass/glass-card";
import type {
  Project,
  ProjectStatus,
  ProjectCategory,
  TechCategory,
  TechItem,
  Feature,
} from "@/types";
import { cn } from "@/lib/utils";

// Navigation Types
type MainSidebarTab =
  | "dashboard"
  | "pages"
  | "media"
  | "projects"
  | "documentation"
  | "ai"
  | "analytics"
  | "users"
  | "appearance"
  | "settings";

type PageSubTab =
  | "home"
  | "projects-page"
  | "project-detail"
  | "docs-page"
  | "doc-article"
  | "about"
  | "contact"
  | "footer-page"
  | "404";

type HomeSectionTab =
  | "hero"
  | "floating-gallery"
  | "prompt-bar"
  | "architecture"
  | "why-criska"
  | "dashboard-showcase"
  | "featured-products"
  | "earth-section"
  | "device-showcase"
  | "capabilities"
  | "how-we-work"
  | "trust"
  | "newsletter"
  | "footer";

// Blank Project Template
const emptyProject: Project = {
  id: "",
  slug: "",
  name: "",
  tagline: "",
  description: "",
  longDescription: "",
  status: "in-progress",
  category: "web",
  tags: ["new"],
  version: "1.0.0",
  completionPercent: 50,
  liveUrl: "",
  githubUrl: "",
  coverImage: "/images/kiwik-cover.jpg",
  images: [],
  techStack: [],
  features: [],
  changelog: [],
  contributors: [],
  timeline: [],
  readme: "",
  architecture: "",
  lastUpdated: new Date().toISOString().split("T")[0],
  createdAt: new Date().toISOString().split("T")[0],
  owner: "Kiwik",
  stars: 0,
  forks: 0,
  views: 0,
  deploymentStatus: "live"
};

export default function AdminPage() {
  // Navigation State
  const [mainTab, setMainTab] = useState<MainSidebarTab>("pages");
  const [activePage, setActivePage] = useState<PageSubTab>("home");
  const [homeSection, setHomeSection] = useState<HomeSectionTab>("hero");

  // Theme & Live Preview State
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewMode, setPreviewMode] = useState<"dark" | "light">("dark");

  // Store Hooks
  const projects = useProjects();
  const { addProject, updateProject, deleteProject } = useProjectsStore();

  const {
    cms,
    updateSettings,
    updateHero,
    updateNavigation,
    updateFooter,
    updateTheme,
    updateSEO,
    addMediaItem,
    deleteMediaItem,
    createSnapshot,
    rollbackSnapshot,
    addAuditLog
  } = useSiteCMSStore();

  const docsCategories = useDocsStore((state) => state.categories);
  const { addArticle, updateArticle, deleteArticle } = useDocsStore();

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter & Modal States
  const [projectSearch, setProjectSearch] = useState("");
  const [projectStatusFilter, setProjectStatusFilter] = useState("all");
  const [mediaSearch, setMediaSearch] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(projectSearch.toLowerCase());
    const matchesStatus =
      projectStatusFilter === "all" || p.status === projectStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans select-none antialiased">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs shadow-2xl flex items-center gap-2 border border-white/20"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          TOP CONTROL BAR (Enterprise CMS Studio Header)
         ───────────────────────────────────────────────────────────── */}
      <header className="h-16 px-6 bg-glass-bg border-b border-glass-border backdrop-blur-xl flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent-blue via-indigo-500 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-bg-primary rounded-[11px] flex items-center justify-center font-bold text-xs text-text-primary group-hover:scale-105 transition-transform">
                K
              </div>
            </div>
            <span className="font-serif font-bold text-base tracking-tight text-text-primary">Kiwik OS Studio</span>
          </Link>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry Synced
          </span>
        </div>

        {/* Device Switcher & Mode Tools */}
        <div className="flex items-center gap-3">
          {/* Viewport Frame Toggle */}
          <button
            onClick={() => {
              if (mainTab === ("live-preview" as any)) {
                setMainTab("pages");
              } else {
                setMainTab("live-preview" as any);
              }
            }}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border",
              mainTab === ("live-preview" as any)
                ? "bg-accent-blue text-white border-transparent shadow-md"
                : "bg-bg-secondary border-glass-border text-text-primary hover:bg-bg-primary"
            )}
          >
            <Monitor className="w-4 h-4" />
            <span>{mainTab === ("live-preview" as any) ? "Back to Studio" : "Live Device Frame"}</span>
          </button>

          {/* Device Switcher Segment */}
          <div className="flex items-center p-1 rounded-xl bg-bg-secondary border border-glass-border">
            <button
              onClick={() => setPreviewDevice("desktop")}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer",
                previewDevice === "desktop" ? "bg-accent-blue text-white shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
              title="Desktop / Laptop View (1280px)"
            >
              <Laptop className="w-3.5 h-3.5" /> Laptop
            </button>
            <button
              onClick={() => setPreviewDevice("tablet")}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer",
                previewDevice === "tablet" ? "bg-accent-blue text-white shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" /> Tablet
            </button>
            <button
              onClick={() => setPreviewDevice("mobile")}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer",
                previewDevice === "mobile" ? "bg-accent-blue text-white shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
              title="Mobile Smartphone View (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>

          <button
            onClick={() => setPreviewMode(previewMode === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl bg-bg-secondary border border-glass-border text-text-primary text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            {previewMode === "dark" ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>{previewMode === "dark" ? "Dark Mode" : "Light Mode"}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold shadow-md hover:scale-102 transition-all flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" /> View Public Site
          </Link>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN STUDIO LAYOUT (Sidebar + Main Content Canvas)
         ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR HIERARCHY */}
        <aside className="w-64 bg-glass-bg border-r border-glass-border p-4 flex flex-col justify-between shrink-0 space-y-4 overflow-y-auto">
          <div className="space-y-6">
            
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                Enterprise Studio
              </span>

              <button
                onClick={() => setMainTab("dashboard")}
                className={cn(
                  "w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer text-left",
                  mainTab === "dashboard" ? "bg-accent-blue text-white shadow-md" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                )}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </button>

              <button
                onClick={() => setMainTab("pages")}
                className={cn(
                  "w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer text-left",
                  mainTab === "pages" ? "bg-accent-blue text-white shadow-md" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4" /> Pages
                </div>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Collapsible Pages Tree */}
              {mainTab === "pages" && (
                <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-accent-blue/30 ml-3 my-1">
                  {[
                    { id: "home", label: "HOME", icon: Sparkles },
                    { id: "projects-page", label: "PROJECTS", icon: Folder },
                    { id: "project-detail", label: "PROJECT DETAILS", icon: FileText },
                    { id: "docs-page", label: "DOCUMENTATION", icon: BookOpenIcon },
                    { id: "doc-article", label: "DOC ARTICLE", icon: Code },
                    { id: "about", label: "ABOUT", icon: Users },
                    { id: "contact", label: "CONTACT", icon: Terminal },
                    { id: "footer-page", label: "FOOTER", icon: Layers },
                    { id: "404", label: "404 PAGE", icon: AlertCircle }
                  ].map((pg) => (
                    <button
                      key={pg.id}
                      onClick={() => setActivePage(pg.id as PageSubTab)}
                      className={cn(
                        "w-full px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-2 transition-colors cursor-pointer text-left",
                        activePage === pg.id ? "bg-white/10 text-accent-blue font-extrabold" : "text-text-secondary hover:text-text-primary"
                      )}
                    >
                      <pg.icon className="w-3 h-3" /> {pg.label}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setMainTab("media")}
                className={cn(
                  "w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer text-left",
                  mainTab === "media" ? "bg-accent-blue text-white shadow-md" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                )}
              >
                <ImageIcon className="w-4 h-4" /> Media Library
              </button>

              <button
                onClick={() => setMainTab("projects")}
                className={cn(
                  "w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer text-left",
                  mainTab === "projects" ? "bg-accent-blue text-white shadow-md" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                )}
              >
                <Folder className="w-4 h-4" /> Projects
              </button>

              <button
                onClick={() => setMainTab("documentation")}
                className={cn(
                  "w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer text-left",
                  mainTab === "documentation" ? "bg-accent-blue text-white shadow-md" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                )}
              >
                <FileText className="w-4 h-4" /> Documentation
              </button>

              <button
                onClick={() => setMainTab("ai")}
                className={cn(
                  "w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer text-left",
                  mainTab === "ai" ? "bg-accent-blue text-white shadow-md" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                )}
              >
                <Terminal className="w-4 h-4" /> AI Assistant
              </button>

              <button
                onClick={() => setMainTab("analytics")}
                className={cn(
                  "w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer text-left",
                  mainTab === "analytics" ? "bg-accent-blue text-white shadow-md" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                )}
              >
                <Activity className="w-4 h-4" /> Analytics
              </button>

              <button
                onClick={() => setMainTab("users")}
                className={cn(
                  "w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer text-left",
                  mainTab === "users" ? "bg-accent-blue text-white shadow-md" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                )}
              >
                <Users className="w-4 h-4" /> Users & Roles
              </button>

              <button
                onClick={() => setMainTab("appearance")}
                className={cn(
                  "w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer text-left",
                  mainTab === "appearance" ? "bg-accent-blue text-white shadow-md" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                )}
              >
                <Palette className="w-4 h-4" /> Appearance
              </button>

              <button
                onClick={() => setMainTab("settings")}
                className={cn(
                  "w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer text-left",
                  mainTab === "settings" ? "bg-accent-blue text-white shadow-md" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                )}
              >
                <Settings className="w-4 h-4" /> Settings
              </button>
            </div>

          </div>

          {/* System Snapshots */}
          <div className="p-3 rounded-2xl bg-bg-secondary/60 border border-glass-border space-y-2 text-left">
            <span className="text-[10px] font-mono font-bold uppercase text-text-muted block">System Control</span>
            <button
              onClick={() => {
                const name = prompt("Snapshot Name:", `Backup-${new Date().toLocaleTimeString()}`);
                if (name) {
                  createSnapshot(name, "Manual Admin Backup");
                  showToast(`Created Snapshot [${name}]`);
                }
              }}
              className="w-full py-1.5 rounded-lg bg-glass-bg border border-glass-border text-text-primary text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-bg-secondary transition-colors cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-accent-blue" /> Create Snapshot
            </button>
          </div>
        </aside>

        {/* RIGHT MAIN CANVAS */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          
          {/* LIVE DEVICE PREVIEW TAB */}
          {mainTab === ("live-preview" as any) && (
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex items-center justify-between w-full p-4 rounded-2xl bg-glass-bg border border-glass-border">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-accent-blue" />
                  <div className="text-left">
                    <h3 className="text-sm font-serif font-bold text-text-primary">Live Responsive Device Canvas</h3>
                    <p className="text-[11px] text-text-secondary">Simulating Kiwik Public Site in real-time viewports.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-accent-blue">
                    Viewport: {previewDevice === "desktop" ? "Laptop / Desktop (1280px)" : previewDevice === "tablet" ? "iPad / Tablet (768px)" : "iPhone / Mobile (375px)"}
                  </span>
                </div>
              </div>

              {/* DEVICE FRAME CONTAINER */}
              <div className="w-full flex justify-center py-4 overflow-x-auto">
                <div
                  className={cn(
                    "transition-all duration-300 rounded-2xl bg-black border-4 border-neutral-800 shadow-2xl overflow-hidden relative flex flex-col",
                    previewDevice === "desktop" && "w-full max-w-[1280px] h-[780px]",
                    previewDevice === "tablet" && "w-[768px] h-[850px] rounded-[32px] border-[12px] border-neutral-800",
                    previewDevice === "mobile" && "w-[375px] h-[720px] rounded-[40px] border-[14px] border-neutral-800"
                  )}
                >
                  {/* macOS / Mobile Device Header Bar */}
                  <div className="h-8 bg-neutral-900 border-b border-neutral-800 px-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="px-3 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-zinc-400 border border-white/10">
                      https://kiwik-xi.vercel.app/
                    </div>
                    <div className="w-8" />
                  </div>

                  {/* REAL-TIME PUBLIC SITE IFRAME */}
                  <iframe
                    src="/"
                    className="w-full flex-1 border-0 bg-bg-primary"
                    title="Kiwik Live Responsive Site Preview"
                  />
                </div>
              </div>
            </div>
          )}

          {/* DASHBOARD TAB */}
          {mainTab === "dashboard" && (
            <div className="space-y-6 text-left">
              <div className="p-6 rounded-2xl bg-glass-bg border border-glass-border space-y-2">
                <h2 className="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-accent-blue" /> Enterprise Command Center
                </h2>
                <p className="text-xs text-text-secondary">Overview of live site telemetry, CMS store updates, audit trails, and system health.</p>
              </div>

              {/* Quick Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <GlassCard className="p-4 space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-text-muted block">Total Visitors</span>
                  <div className="text-2xl font-bold font-mono text-text-primary">{cms.analytics.totalVisitors.toLocaleString()}</div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">↑ +14.2% this month</span>
                </GlassCard>

                <GlassCard className="p-4 space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-text-muted block">Total Projects</span>
                  <div className="text-2xl font-bold font-mono text-text-primary">{projects.length}</div>
                  <span className="text-[10px] text-accent-blue font-mono font-bold">● Active Catalog</span>
                </GlassCard>

                <GlassCard className="p-4 space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-text-muted block">Media Assets</span>
                  <div className="text-2xl font-bold font-mono text-text-primary">{cms.media.length}</div>
                  <span className="text-[10px] text-purple-400 font-mono font-bold">Managed DAM Pool</span>
                </GlassCard>

                <GlassCard className="p-4 space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-text-muted block">Docs Articles</span>
                  <div className="text-2xl font-bold font-mono text-text-primary">
                    {docsCategories.reduce((acc, c) => acc + c.articles.length, 0)}
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold">Published Articles</span>
                </GlassCard>
              </div>
            </div>
          )}

          {/* PAGES TAB (EVERY SINGLE SUB-PAGE IMPLEMENTED) */}
          {mainTab === "pages" && (
            <div className="space-y-6">
              
              {/* PAGE SELECTION TITLE */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-glass-bg border border-glass-border text-left">
                <div>
                  <h2 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
                    <Compass className="w-5 h-5 text-accent-blue" /> Page Editor: <span className="uppercase text-accent-blue font-mono font-extrabold">{activePage}</span>
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5">Visually configure text, media, buttons, parameters, and live preview for this page.</p>
                </div>
              </div>

              {/* HOME PAGE SECTION SELECTOR RIBBON */}
              {activePage === "home" && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-glass-border">
                  {[
                    { id: "hero", label: "Hero" },
                    { id: "floating-gallery", label: "Floating Gallery" },
                    { id: "prompt-bar", label: "Prompt Bar" },
                    { id: "architecture", label: "Architecture" },
                    { id: "why-criska", label: "Why Criska" },
                    { id: "dashboard-showcase", label: "Dashboard Showcase" },
                    { id: "featured-products", label: "Featured Products" },
                    { id: "earth-section", label: "Earth Section" },
                    { id: "device-showcase", label: "Device Showcase" },
                    { id: "capabilities", label: "Capabilities" },
                    { id: "how-we-work", label: "How We Work" },
                    { id: "trust", label: "Trust Section" },
                    { id: "newsletter", label: "Newsletter" },
                    { id: "footer", label: "Footer" }
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setHomeSection(sec.id as HomeSectionTab)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border",
                        homeSection === sec.id
                          ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 border-transparent shadow"
                          : "bg-bg-secondary/60 text-text-secondary border-glass-border hover:text-text-primary"
                      )}
                    >
                      {sec.label}
                    </button>
                  ))}
                </div>
              )}

              {/* 1. HERO SECTION EDITOR */}
              {activePage === "home" && homeSection === "hero" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                  <div className="lg:col-span-6 space-y-6">
                    <GlassCard className="p-6 space-y-4">
                      <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-accent-blue" /> Hero Headlines & Subtitle
                      </h3>
                      <div>
                        <label className="text-xs font-bold text-text-secondary block mb-1">Headline Prefix</label>
                        <input
                          type="text"
                          value={cms.hero.headlinePrefix}
                          onChange={(e) => {
                            updateHero({ headlinePrefix: e.target.value });
                            showToast("Updated headline prefix!");
                          }}
                          className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-text-secondary block mb-1">Highlight Word / Phrase</label>
                        <input
                          type="text"
                          value={cms.hero.headlineHighlightWord}
                          onChange={(e) => {
                            updateHero({ headlineHighlightWord: e.target.value });
                            showToast("Updated highlight word!");
                          }}
                          className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-text-secondary block mb-1">Hero Description Copy</label>
                        <textarea
                          rows={3}
                          value={cms.hero.description}
                          onChange={(e) => {
                            updateHero({ description: e.target.value });
                            showToast("Updated hero description!");
                          }}
                          className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-medium"
                        />
                      </div>
                    </GlassCard>
                  </div>

                  {/* REAL-TIME LIVE PREVIEW */}
                  <div className="lg:col-span-6">
                    <GlassCard className="p-6 space-y-4 sticky top-24">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted block">Live Visual Preview</span>
                      <div className="p-8 rounded-2xl bg-black text-center space-y-4 border border-white/20">
                        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight leading-tight">
                          {cms.hero.headlinePrefix} <br />
                          <span className="italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                            {cms.hero.headlineHighlightWord}
                          </span>
                        </h1>
                        <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                          {cms.hero.description}
                        </p>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              )}

              {/* 2. FLOATING GALLERY EDITOR */}
              {activePage === "home" && homeSection === "floating-gallery" && (
                <div className="space-y-6 text-left">
                  <div className="p-6 rounded-2xl bg-glass-bg border border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-purple-400" /> Parallax Ribbon Floating Gallery Manager ({(cms.floatingGallery || []).length})
                      </h3>
                      <p className="text-xs text-text-secondary mt-0.5">Manage floating gallery images, replacement URLs, titles, and click destination links.</p>
                    </div>

                    <button
                      onClick={() => {
                        const title = prompt("Image Title / Alt:", "New Ribbon Asset");
                        const url = prompt("Image Source URL:", "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop");
                        const linkUrl = prompt("Click Destination Link URL (e.g. /projects or https://...):", "/projects");
                        if (title && url) {
                          useSiteCMSStore.getState().addFloatingGalleryItem({
                            id: `fg-${Date.now()}`,
                            title,
                            url,
                            linkUrl: linkUrl || "/projects"
                          });
                          showToast(`Added Gallery Image [${title}]`);
                        }
                      }}
                      className="px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Gallery Image
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {(cms.floatingGallery || []).map((img) => (
                      <GlassCard key={img.id} className="p-4 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="h-32 w-full rounded-xl bg-black/40 overflow-hidden relative border border-white/10">
                            <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white font-mono text-[9px] font-bold backdrop-blur-md">
                              ID: {img.id}
                            </span>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-text-muted block">Image Title</label>
                            <input
                              type="text"
                              value={img.title}
                              onChange={(e) => {
                                useSiteCMSStore.getState().updateFloatingGalleryItem(img.id, { title: e.target.value });
                                showToast("Updated image title!");
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-bg-secondary border border-glass-border text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-text-muted block">Image Source URL</label>
                            <input
                              type="text"
                              value={img.url}
                              onChange={(e) => {
                                useSiteCMSStore.getState().updateFloatingGalleryItem(img.id, { url: e.target.value });
                                showToast("Updated image URL!");
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-bg-secondary border border-glass-border text-[11px] font-mono"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-accent-blue block">Click Destination Link URL</label>
                            <input
                              type="text"
                              value={img.linkUrl || "/projects"}
                              onChange={(e) => {
                                useSiteCMSStore.getState().updateFloatingGalleryItem(img.id, { linkUrl: e.target.value });
                                showToast("Updated click link URL!");
                              }}
                              placeholder="e.g. /projects or https://..."
                              className="w-full px-2.5 py-1.5 rounded-lg bg-bg-secondary border border-accent-blue/40 text-[11px] font-mono font-bold text-accent-blue"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-divider">
                          {img.linkUrl && (
                            <Link
                              href={img.linkUrl}
                              target="_blank"
                              className="text-[10px] font-bold text-accent-blue hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" /> Test Link
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              useSiteCMSStore.getState().deleteFloatingGalleryItem(img.id);
                              showToast(`Deleted gallery image [${img.title}]`);
                            }}
                            className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer ml-auto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. PROMPT BAR EDITOR */}
              {activePage === "home" && homeSection === "prompt-bar" && (
                <GlassCard className="p-6 space-y-5 text-left">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent-blue" /> Hero Prompt Bar Typewriter Suggestions
                  </h3>
                  <div className="space-y-3">
                    {["Design a product launch campaign...", "Build an autonomous AI agent workflow...", "Generate a 3D glassmorphic dashboard..."].map((prompt, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-bg-secondary border border-glass-border">
                        <input type="text" defaultValue={prompt} className="flex-1 bg-transparent text-xs font-mono font-medium focus:outline-none" />
                        <button className="text-xs font-bold text-accent-blue">Save</button>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* 4. UNIFIED ARCHITECTURE EDITOR */}
              {activePage === "home" && homeSection === "architecture" && (
                <div className="space-y-6 text-left">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-glass-bg border border-glass-border">
                    <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-purple-400" /> Unified Operating Architecture Nodes ({(cms.architectureNodes || []).length})
                    </h3>
                    <button
                      onClick={() => {
                        const title = prompt("Node Title:", "New Node");
                        if (title) {
                          useSiteCMSStore.getState().addArchitectureNode({
                            id: `node-${Date.now()}`,
                            title,
                            subtitle: "Active Service",
                            iconName: "Cpu",
                            color: "from-purple-500/20 to-purple-600/5",
                            border: "border-purple-500/30 hover:border-purple-500/60",
                            glow: "shadow-purple-500/10",
                            badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
                            badgeText: "Active Node",
                            order: (cms.architectureNodes || []).length + 1
                          });
                          showToast(`Added Architecture Node [${title}]`);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-accent-blue text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Node
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {(cms.architectureNodes || []).map((node) => (
                      <GlassCard key={node.id} className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={node.title}
                            onChange={(e) => {
                              useSiteCMSStore.getState().updateArchitectureNode(node.id, { title: e.target.value });
                              showToast("Updated title!");
                            }}
                            className="font-bold text-xs text-text-primary bg-transparent focus:outline-none"
                          />
                          <button
                            onClick={() => {
                              useSiteCMSStore.getState().deleteArchitectureNode(node.id);
                              showToast(`Deleted node [${node.title}]`);
                            }}
                            className="p-1 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-text-muted block">Subtitle</label>
                          <input
                            type="text"
                            value={node.subtitle}
                            onChange={(e) => {
                              useSiteCMSStore.getState().updateArchitectureNode(node.id, { subtitle: e.target.value });
                              showToast("Updated subtitle!");
                            }}
                            className="w-full px-2 py-1 rounded bg-bg-secondary text-xs"
                          />
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. WHY CRISKA EDITOR */}
              {activePage === "home" && homeSection === "why-criska" && (
                <div className="space-y-6 text-left">
                  <GlassCard className="p-6 space-y-4">
                    <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" /> Why Criska Pills Manager ({(cms.whyCriskaPills || []).length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(cms.whyCriskaPills || []).map((pill) => (
                        <div key={pill.id} className="p-3 rounded-xl bg-bg-secondary/60 border border-glass-border space-y-2">
                          <label className="text-[10px] font-bold text-text-muted block">Pill Text</label>
                          <input
                            type="text"
                            value={pill.text}
                            onChange={(e) => {
                              const updated = (cms.whyCriskaPills || []).map((p) => (p.id === pill.id ? { ...p, text: e.target.value } : p));
                              useSiteCMSStore.setState({ cms: { ...cms, whyCriskaPills: updated } });
                              showToast("Updated pill text!");
                            }}
                            className="w-full px-3 py-1.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-bold"
                          />
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* 6. DASHBOARD SHOWCASE EDITOR */}
              {activePage === "home" && homeSection === "dashboard-showcase" && (
                <GlassCard className="p-6 space-y-5 text-left">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-cyan-400" /> macOS Telemetry Dashboard Showcase Config
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">Section Title</label>
                      <input
                        type="text"
                        value={cms.dashboardShowcase?.sectionTitle || "KIWIK OS Kernel"}
                        onChange={(e) => {
                          useSiteCMSStore.setState({ cms: { ...cms, dashboardShowcase: { ...cms.dashboardShowcase, sectionTitle: e.target.value } } });
                          showToast("Updated section title!");
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-bg-secondary text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">Search Placeholder</label>
                      <input
                        type="text"
                        value={cms.dashboardShowcase?.searchPlaceholder || "Search projects, docs..."}
                        onChange={(e) => {
                          useSiteCMSStore.setState({ cms: { ...cms, dashboardShowcase: { ...cms.dashboardShowcase, searchPlaceholder: e.target.value } } });
                          showToast("Updated search placeholder!");
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-bg-secondary text-xs font-medium"
                      />
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* 7. FEATURED PRODUCTS EDITOR */}
              {activePage === "home" && homeSection === "featured-products" && (
                <GlassCard className="p-6 space-y-5 text-left">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <Folder className="w-4 h-4 text-indigo-400" /> Featured Products Coverflow Carousel Config
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {projects.slice(0, 6).map((proj) => (
                      <div key={proj.id} className="p-4 rounded-xl bg-bg-secondary/60 border border-glass-border space-y-2">
                        <div className="text-xs font-bold text-text-primary">{proj.name}</div>
                        <div className="text-[10px] font-mono text-text-muted">{proj.tagline || proj.description}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* 8. EARTH SECTION EDITOR */}
              {activePage === "home" && homeSection === "earth-section" && (
                <GlassCard className="p-6 space-y-5 text-left">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" /> Earth Telemetry Section Header & Metrics
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">Headline Text</label>
                      <input
                        type="text"
                        value={cms.earthShowcase?.headline || ""}
                        onChange={(e) => {
                          useSiteCMSStore.getState().updateEarthShowcase({ headline: e.target.value });
                          showToast("Updated Earth headline!");
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">Description Copy</label>
                      <textarea
                        rows={2}
                        value={cms.earthShowcase?.description || ""}
                        onChange={(e) => {
                          useSiteCMSStore.getState().updateEarthShowcase({ description: e.target.value });
                          showToast("Updated Earth description!");
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">Earth Background WebP Image URL</label>
                      <input
                        type="text"
                        value={cms.earthShowcase?.earthImageUrl || ""}
                        onChange={(e) => {
                          useSiteCMSStore.getState().updateEarthShowcase({ earthImageUrl: e.target.value });
                          showToast("Updated Earth background image!");
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono"
                      />
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* 9. DEVICE SHOWCASE EDITOR */}
              {activePage === "home" && homeSection === "device-showcase" && (
                <GlassCard className="p-6 space-y-5 text-left">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400" /> Phone Mockup Cards ({(cms.deviceShowcase?.cards || []).length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(cms.deviceShowcase?.cards || []).map((card) => (
                      <div key={card.id} className="p-4 rounded-xl bg-bg-secondary/60 border border-glass-border space-y-3">
                        <input
                          type="text"
                          value={card.name}
                          onChange={(e) => {
                            useSiteCMSStore.getState().updateDeviceCard(card.id, { name: e.target.value });
                            showToast("Updated card name!");
                          }}
                          className="font-bold text-xs text-text-primary bg-transparent focus:outline-none w-full"
                        />
                        <textarea
                          rows={2}
                          value={card.quote}
                          onChange={(e) => {
                            useSiteCMSStore.getState().updateDeviceCard(card.id, { quote: e.target.value });
                            showToast("Updated quote!");
                          }}
                          className="w-full px-2 py-1 rounded bg-bg-primary text-[11px]"
                        />
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* 10. CAPABILITIES EDITOR */}
              {activePage === "home" && homeSection === "capabilities" && (
                <GlassCard className="p-6 space-y-5 text-left">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" /> Capabilities Grid Manager
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cms.capabilities.items.map((cap) => (
                      <div key={cap.id} className="p-4 rounded-xl bg-bg-secondary/60 border border-glass-border space-y-2">
                        <div className="text-xs font-bold text-text-primary">{cap.title}</div>
                        <div className="text-[11px] text-text-secondary">{cap.desc}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* 11. HOW WE WORK EDITOR */}
              {activePage === "home" && homeSection === "how-we-work" && (
                <GlassCard className="p-6 space-y-5 text-left">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-accent-blue" /> Workflow Timeline Builder
                  </h3>
                  <div className="space-y-3">
                    {cms.howWeWork.steps.map((step) => (
                      <div key={step.id} className="p-4 rounded-xl bg-bg-secondary border border-glass-border space-y-1">
                        <div className="text-xs font-bold text-text-primary">Step {step.step}: {step.title}</div>
                        <div className="text-[11px] text-text-secondary">{step.desc}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* 12. TRUST SECTION EDITOR */}
              {activePage === "home" && homeSection === "trust" && (
                <GlassCard className="p-6 space-y-5 text-left">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Trust Section Badges & Metrics
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {cms.trust.items.map((item) => (
                      <div key={item.id} className="p-3 rounded-xl bg-bg-secondary border border-glass-border text-center space-y-1">
                        <div className="text-lg font-bold font-mono text-text-primary">{item.title}</div>
                        <div className="text-[10px] font-bold text-text-muted">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* 13. NEWSLETTER EDITOR */}
              {activePage === "home" && homeSection === "newsletter" && (
                <GlassCard className="p-6 space-y-5 text-left max-w-xl">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-400" /> Newsletter Subscription Config
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">Headline</label>
                      <input type="text" defaultValue="Subscribe to Kiwik Releases" className="w-full px-3 py-2 rounded-xl bg-bg-secondary text-xs font-bold" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">CTA Button Text</label>
                      <input type="text" defaultValue="Subscribe Now" className="w-full px-3 py-2 rounded-xl bg-bg-secondary text-xs font-bold" />
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* 14. FOOTER EDITOR */}
              {(homeSection === "footer" || activePage === "footer-page") && (
                <GlassCard className="p-6 space-y-5 text-left">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <Layers className="w-4 h-4 text-accent-blue" /> Footer Layout & Column Links
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {cms.footer.columns.map((col) => (
                      <div key={col.id} className="space-y-2">
                        <div className="text-xs font-bold text-text-primary border-b border-divider pb-1">{col.title}</div>
                        {col.links.map((lnk) => (
                          <div key={lnk.id} className="text-[11px] text-text-secondary font-mono">{lnk.label} → {lnk.href}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* OTHER PAGES: PROJECTS PAGE EDITOR */}
              {activePage === "projects-page" && (
                <GlassCard className="p-6 space-y-5 text-left">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <Folder className="w-4 h-4 text-accent-blue" /> Projects Directory Catalog Page Editor
                  </h3>
                  <div>
                    <label className="text-xs font-bold text-text-secondary block mb-1">Catalog Page Title</label>
                    <input type="text" defaultValue="Kiwik Engineering Showcase" className="w-full px-3 py-2 rounded-xl bg-bg-secondary text-xs font-bold" />
                  </div>
                </GlassCard>
              )}

              {/* OTHER PAGES: PROJECT DETAILS BUILDER */}
              {activePage === "project-detail" && (
                <GlassCard className="p-6 space-y-5 text-left">
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent-blue" /> Project Detail Page Template & Specs Builder
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">Default Template Tabs</label>
                      <input type="text" defaultValue="Overview, Screenshots, Tech Stack, README, FAQs" className="w-full px-3 py-2 rounded-xl bg-bg-secondary text-xs font-mono" />
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* OTHER PAGES: ABOUT / CONTACT / 404 */}
              {activePage === "about" && (
                <GlassCard className="p-6 space-y-4 text-left">
                  <h3 className="text-base font-bold text-text-primary">About Page Mission & Values</h3>
                  <textarea rows={4} defaultValue="Kiwik is the enterprise operating system for modern software products." className="w-full p-3 rounded-xl bg-bg-secondary text-xs font-medium" />
                </GlassCard>
              )}

              {activePage === "contact" && (
                <GlassCard className="p-6 space-y-4 text-left">
                  <h3 className="text-base font-bold text-text-primary">Contact Page Details</h3>
                  <input type="text" defaultValue={cms.settings.contactEmail} className="w-full px-3 py-2 rounded-xl bg-bg-secondary text-xs font-mono" />
                </GlassCard>
              )}

              {activePage === "404" && (
                <GlassCard className="p-6 space-y-4 text-left">
                  <h3 className="text-base font-bold text-text-primary">404 Error Page Copy</h3>
                  <input type="text" defaultValue="404 - System Route Not Found" className="w-full px-3 py-2 rounded-xl bg-bg-secondary text-xs font-bold" />
                </GlassCard>
              )}

            </div>
          )}

          {/* MEDIA LIBRARY TAB */}
          {mainTab === "media" && (
            <div className="space-y-6 text-left">
              <div className="p-6 rounded-2xl bg-glass-bg border border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-accent-blue" /> Digital Asset Management (DAM) Library ({cms.media.length})
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5">Upload, crop, replace, and check usage locations of website images, logos, and videos.</p>
                </div>
                <button
                  onClick={() => {
                    const name = prompt("Asset Name:", "New Banner Asset");
                    const url = prompt("Asset Image URL:", "/logo.png");
                    if (name && url) {
                      addMediaItem({
                        id: `med-${Date.now()}`,
                        name,
                        url,
                        type: "image",
                        sizeBytes: 18400,
                        mimeType: "image/png",
                        folder: "General",
                        tags: ["asset"],
                        usedIn: ["Hero Section", "Public Navbar"],
                        createdAt: new Date().toISOString()
                      });
                      showToast(`Added Asset [${name}]`);
                    }
                  }}
                  className="px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Upload New Asset
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cms.media.map((med) => (
                  <GlassCard key={med.id} className="p-3 space-y-2 flex flex-col justify-between group relative">
                    <div className="h-28 w-full rounded-xl bg-black/40 overflow-hidden flex items-center justify-center border border-white/10 relative">
                      <img src={med.url} alt={med.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-text-primary truncate">{med.name}</div>
                      <div className="text-[9px] font-mono text-text-muted mt-0.5">{med.mimeType}</div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-divider">
                      <button
                        onClick={() => {
                          const newUrl = prompt("Replace Image URL:", med.url);
                          if (newUrl && newUrl !== med.url) {
                            showToast("Replaced image asset!");
                          }
                        }}
                        className="text-[10px] font-bold text-accent-blue hover:underline cursor-pointer"
                      >
                        Replace
                      </button>
                      <button
                        onClick={() => {
                          deleteMediaItem(med.id);
                          showToast(`Deleted media [${med.name}]`);
                        }}
                        className="p-1 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {mainTab === "projects" && (
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-glass-bg border border-glass-border">
                <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <Folder className="w-4 h-4 text-accent-blue" /> Central Projects Catalog ({projects.length})
                </h3>
                <button
                  onClick={() => {
                    const name = prompt("Project Name:", "New Kiwik Platform");
                    if (name) {
                      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      addProject({ ...emptyProject, id: slug, slug, name });
                      showToast(`Added Project [${name}]`);
                    }
                  }}
                  className="px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((proj) => (
                  <GlassCard key={proj.id} className="p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-text-primary">{proj.name}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-bold uppercase">
                          {proj.status}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">{proj.tagline || proj.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-divider">
                      <button
                        onClick={() => {
                          const newName = prompt("Edit Project Name:", proj.name);
                          if (newName) {
                            updateProject(proj.id, { name: newName });
                            showToast("Updated project name!");
                          }
                        }}
                        className="text-xs font-bold text-accent-blue flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit Specs
                      </button>
                      <button
                        onClick={() => {
                          deleteProject(proj.id);
                          showToast(`Deleted project [${proj.name}]`);
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* DOCUMENTATION TAB */}
          {mainTab === "documentation" && (
            <div className="space-y-6 text-left">
              <div className="p-6 rounded-2xl bg-glass-bg border border-glass-border flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" /> Documentation Categories & Articles
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5">Manage docs sidebar categories, article markdown content, and playgrounds.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {docsCategories.map((cat) => (
                  <GlassCard key={cat.id} className="p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-divider pb-3">
                      <h4 className="text-sm font-bold text-text-primary">{cat.name}</h4>
                      <span className="text-[10px] font-mono font-bold text-accent-blue">{cat.articles.length} Articles</span>
                    </div>

                    <div className="space-y-2">
                      {cat.articles.map((art) => (
                        <div key={art.id} className="p-3 rounded-xl bg-bg-secondary/60 border border-glass-border flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-text-primary">{art.title}</div>
                            <div className="text-[10px] font-mono text-text-muted">/docs?slug={art.slug}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* AI ASSISTANT TAB */}
          {mainTab === "ai" && (
            <div className="space-y-6 text-left">
              <div className="p-6 rounded-2xl bg-glass-bg border border-glass-border space-y-2">
                <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-accent-blue" /> AI Assistant Knowledge Collections
                </h3>
                <p className="text-xs text-text-secondary">Upload markdown, repository specs, and knowledge articles for real-time prompt reasoning.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(cms.aiKnowledge?.articles || []).map((art) => (
                  <GlassCard key={art.id} className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-text-primary">{art.title}</h4>
                      <span className="text-[10px] font-mono text-accent-blue uppercase font-bold">{art.category}</span>
                    </div>
                    <textarea
                      rows={4}
                      value={art.content}
                      onChange={(e) => {
                        useSiteCMSStore.getState().updateAiKnowledgeArticle(art.id, { content: e.target.value });
                        showToast("Updated knowledge content!");
                      }}
                      className="w-full p-3 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono leading-relaxed"
                    />
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {mainTab === "analytics" && (
            <div className="space-y-6 text-left">
              <div className="p-6 rounded-2xl bg-glass-bg border border-glass-border space-y-2">
                <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" /> Real-time Analytics & Search Telemetry
                </h3>
                <p className="text-xs text-text-secondary">Tracks visitor activity, command palette searches, project clicks, and country breakdown.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-5 space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">Top Search Queries</h4>
                  <div className="space-y-2">
                    {(cms.analytics?.searches || []).map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-bg-secondary text-xs">
                        <span className="font-mono font-bold text-text-primary">{s.query}</span>
                        <span className="px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue font-mono font-bold text-[10px]">{s.count} searches</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-5 space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">Project Clicks Leaderboard</h4>
                  <div className="space-y-2">
                    {Object.entries(cms.analytics?.projectClicks || {}).map(([slug, count], i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-bg-secondary text-xs">
                        <span className="font-mono font-bold text-text-primary">/projects/{slug}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[10px]">{count} clicks</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-5 space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">Visitor Geographic Breakdown</h4>
                  <div className="space-y-2">
                    {(cms.analytics?.countryBreakdown || []).map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-bg-secondary text-xs">
                        <div className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span className="font-bold text-text-primary">{c.country}</span>
                        </div>
                        <span className="font-mono text-text-secondary text-[11px] font-semibold">{c.count.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {mainTab === "users" && (
            <div className="space-y-6 text-left">
              <div className="p-6 rounded-2xl bg-glass-bg border border-glass-border space-y-2">
                <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" /> User Permissions & Role Governance
                </h3>
                <p className="text-xs text-text-secondary">Assign granular roles (Owner, Admin, Editor, Developer, Viewer).</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Vivek Shaganti", role: "Owner", email: "shagantivivekgoud@gmail.com" },
                  { name: "Sarah Lin", role: "Admin", email: "sarah@kiwik.io" },
                  { name: "Alex Mercer", role: "Developer", email: "alex@kiwik.io" }
                ].map((usr, i) => (
                  <GlassCard key={i} className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-text-primary">{usr.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue font-mono font-bold text-[10px]">{usr.role}</span>
                    </div>
                    <div className="text-xs font-mono text-text-secondary">{usr.email}</div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* APPEARANCE TAB */}
          {mainTab === "appearance" && (
            <GlassCard className="p-6 space-y-5 text-left max-w-2xl">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Palette className="w-4 h-4 text-pink-400" /> Theme System & Design Engine
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1">Color Theme Mode</label>
                  <select
                    value={cms.theme.mode}
                    onChange={(e) => {
                      updateTheme({ mode: e.target.value as any });
                      showToast("Updated theme mode!");
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-bg-secondary text-xs font-bold"
                  >
                    <option value="system">System Default</option>
                    <option value="dark">Dark Mode</option>
                    <option value="light">Light Mode</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          )}

          {/* SETTINGS TAB */}
          {mainTab === "settings" && (
            <GlassCard className="p-6 space-y-5 text-left max-w-2xl">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Settings className="w-4 h-4 text-accent-blue" /> Website Branding & General Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1">Site Title</label>
                  <input
                    type="text"
                    value={cms.settings.siteName}
                    onChange={(e) => {
                      updateSettings({ siteName: e.target.value });
                      showToast("Updated site name!");
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1">Contact Email</label>
                  <input
                    type="text"
                    value={cms.settings.contactEmail}
                    onChange={(e) => {
                      updateSettings({ contactEmail: e.target.value });
                      showToast("Updated contact email!");
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono"
                  />
                </div>
              </div>
            </GlassCard>
          )}

        </main>
      </div>

    </div>
  );
}

// Auxiliary BookOpenIcon helper
function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}
