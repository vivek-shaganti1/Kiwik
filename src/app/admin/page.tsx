"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Workflow
} from "lucide-react";

import { useProjectsStore, useProjects } from "@/stores/projects-store";
import { useSiteCMSStore } from "@/stores/site-cms-store";
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

type AdminTab =
  | "dashboard"
  | "visual-editor"
  | "hero"
  | "sections"
  | "projects"
  | "media"
  | "navigation"
  | "theme"
  | "seo"
  | "audit-snapshots";

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
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");
  const projects = useProjects();
  const {
    addProject,
    updateProject,
    deleteProject,
    movePriority,
    duplicateProject,
    resetToDefaults,
  } = useProjectsStore();

  const cms = useSiteCMSStore((state) => state.cms);
  const {
    updateSettings,
    updateHero,
    updateHeroRotatingWords,
    updateHeroMetric,
    updateNavigation,
    addNavItem,
    updateNavItem,
    deleteNavItem,
    updateFeaturedSection,
    updateCapabilities,
    addCapabilityItem,
    updateCapabilityItem,
    deleteCapabilityItem,
    updateTrust,
    addTrustItem,
    updateTrustItem,
    deleteTrustItem,
    updateHowWeWork,
    updateFooter,
    updateTheme,
    updateSEO,
    addMediaItem,
    deleteMediaItem,
    createSnapshot,
    rollbackSnapshot,
    deleteSnapshot,
    exportJSONBackup,
    importJSONBackup,
  } = useSiteCMSStore();

  // Search & Filter States for Projects
  const [projectSearch, setProjectSearch] = useState("");
  const [projectStatusFilter, setProjectStatusFilter] = useState<string>("all");
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>("all");

  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project>(emptyProject);
  const [modalSubTab, setModalSubTab] = useState<"basic" | "details" | "tech" | "features" | "readme">("basic");

  // Form Inputs
  const [newRotatingWord, setNewRotatingWord] = useState("");
  const [newNavLabel, setNewNavLabel] = useState("");
  const [newNavHref, setNewNavHref] = useState("");

  const [newCapTitle, setNewCapTitle] = useState("");
  const [newCapDesc, setNewCapDesc] = useState("");
  const [newCapIcon, setNewCapIcon] = useState("Sparkles");

  const [newTrustTitle, setNewTrustTitle] = useState("");
  const [newTrustDesc, setNewTrustDesc] = useState("");

  // Sub-items for project modal
  const [newTechName, setNewTechName] = useState("");
  const [newTechCat, setNewTechCat] = useState<TechCategory>("frontend");
  const [newFeatureTitle, setNewFeatureTitle] = useState("");
  const [newFeatureDesc, setNewFeatureDesc] = useState("");

  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewMode, setPreviewMode] = useState<"dark" | "light">("dark");
  const [jsonBackupInput, setJsonBackupInput] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Visitor Stats Telemetry
  const [visitorStats, setVisitorStats] = useState({ total: 1, active: 1 });

  useEffect(() => {
    const fetchVisitorStats = () => {
      fetch("/api/visitors")
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data.total === "number") {
            setVisitorStats({ total: data.total, active: data.active });
          }
        })
        .catch((err) => console.error("Error fetching visitor telemetry:", err));
    };

    fetchVisitorStats();
    const interval = setInterval(fetchVisitorStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered Projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(projectSearch.toLowerCase());
    const matchesStatus = projectStatusFilter === "all" || p.status === projectStatusFilter;
    const matchesCategory = projectCategoryFilter === "all" || p.category === projectCategoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleOpenNewProjectModal = () => {
    setEditingProject({
      ...emptyProject,
      id: `proj-${Date.now()}`,
      slug: `project-${Date.now()}`,
      name: "New Kiwik Project",
      createdAt: new Date().toISOString().split("T")[0]
    });
    setModalSubTab("basic");
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProjectModal = (proj: Project) => {
    setEditingProject({ ...proj });
    setModalSubTab("basic");
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = () => {
    if (!editingProject.name.trim() || !editingProject.slug.trim()) return;
    
    const exists = projects.some((p) => p.id === editingProject.id);
    if (exists) {
      updateProject(editingProject.id, editingProject);
      showToast(`Updated project "${editingProject.name}"!`);
    } else {
      addProject(editingProject);
      showToast(`Added project "${editingProject.name}"!`);
    }
    setIsProjectModalOpen(false);
  };

  const handleAddTechItem = () => {
    if (!newTechName.trim()) return;
    const item: TechItem = {
      name: newTechName.trim(),
      category: newTechCat
    };
    setEditingProject({
      ...editingProject,
      techStack: [...(editingProject.techStack || []), item]
    });
    setNewTechName("");
  };

  const handleRemoveTechItem = (idx: number) => {
    setEditingProject({
      ...editingProject,
      techStack: (editingProject.techStack || []).filter((_, i) => i !== idx)
    });
  };

  const handleAddFeatureItem = () => {
    if (!newFeatureTitle.trim()) return;
    const feat: Feature = {
      title: newFeatureTitle.trim(),
      description: newFeatureDesc.trim()
    };
    setEditingProject({
      ...editingProject,
      features: [...(editingProject.features || []), feat]
    });
    setNewFeatureTitle("");
    setNewFeatureDesc("");
  };

  const handleRemoveFeatureItem = (title: string) => {
    setEditingProject({
      ...editingProject,
      features: (editingProject.features || []).filter((f) => f.title !== title)
    });
  };

  const handleAddRotatingWord = () => {
    if (!newRotatingWord.trim()) return;
    const updated = [...cms.hero.rotatingWords, newRotatingWord.trim()];
    updateHeroRotatingWords(updated);
    setNewRotatingWord("");
    showToast("Added rotating phrase!");
  };

  const handleRemoveRotatingWord = (index: number) => {
    const updated = cms.hero.rotatingWords.filter((_, i) => i !== index);
    updateHeroRotatingWords(updated);
    showToast("Removed phrase!");
  };

  const handleAddNavItem = () => {
    if (!newNavLabel.trim() || !newNavHref.trim()) return;
    addNavItem({
      id: `nav-${Date.now()}`,
      label: newNavLabel.trim(),
      href: newNavHref.trim(),
      order: cms.navigation.items.length + 1,
      visible: true
    });
    setNewNavLabel("");
    setNewNavHref("");
    showToast("Added navigation item!");
  };

  const handleAddCapability = () => {
    if (!newCapTitle.trim()) return;
    addCapabilityItem({
      id: `cap-${Date.now()}`,
      title: newCapTitle.trim(),
      desc: newCapDesc.trim() || "Capability description.",
      iconName: newCapIcon
    });
    setNewCapTitle("");
    setNewCapDesc("");
    showToast("Added capability card!");
  };

  const handleAddTrust = () => {
    if (!newTrustTitle.trim()) return;
    addTrustItem({
      id: `tr-${Date.now()}`,
      title: newTrustTitle.trim(),
      desc: newTrustDesc.trim() || "Trust item description."
    });
    setNewTrustTitle("");
    setNewTrustDesc("");
    showToast("Added trust assurance item!");
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportJSONBackup());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kiwik_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("CMS Backup exported!");
  };

  const handleImportBackup = () => {
    if (!jsonBackupInput.trim()) return;
    const success = importJSONBackup(jsonBackupInput);
    if (success) {
      showToast("CMS Backup restored!");
      setJsonBackupInput("");
    } else {
      alert("Invalid JSON Backup format.");
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-16 px-4 sm:px-6 md:px-8 max-w-[1500px] mx-auto select-none">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-full bg-emerald-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 border border-emerald-400/40"
          >
            <CheckCircle2 className="w-4 h-4" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-divider pb-6 text-left">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary tracking-tight">
              Kiwik.1 Enterprise Website CMS
            </h1>
          </div>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            Full Interactive Edit Access. Priority ordering, duplicate, status filters, markdown READMEs, rotating phrases, navigation, theme, and projects live.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => {
              createSnapshot(`Snapshot-${new Date().toLocaleTimeString()}`, "Manual snapshot backup");
              showToast("Saved version snapshot!");
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-accent-blue" />
            Save Snapshot
          </button>
          <button
            onClick={handleExportBackup}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            Export JSON
          </button>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs shadow-md transition-all hover:scale-102"
          >
            <Eye className="w-3.5 h-3.5" />
            Live Website
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-divider/60">
        {[
          { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
          { id: "visual-editor", label: "Visual Editor", icon: <Eye className="w-3.5 h-3.5" /> },
          { id: "hero", label: "Hero CMS", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { id: "sections", label: "Page Sections", icon: <Layers className="w-3.5 h-3.5" /> },
          { id: "projects", label: "Projects CMS", icon: <Database className="w-3.5 h-3.5" /> },
          { id: "media", label: "Media Library", icon: <ImageIcon className="w-3.5 h-3.5" /> },
          { id: "navigation", label: "Nav & Footer", icon: <Compass className="w-3.5 h-3.5" /> },
          { id: "theme", label: "Theme & Styling", icon: <Palette className="w-3.5 h-3.5" /> },
          { id: "seo", label: "SEO Engine", icon: <Search className="w-3.5 h-3.5" /> },
          { id: "audit-snapshots", label: "Audit & Versioning", icon: <History className="w-3.5 h-3.5" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AdminTab)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer",
              activeTab === tab.id
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-md font-bold"
                : "bg-glass-bg border border-glass-border text-text-secondary hover:text-text-primary hover:bg-glass-bg-hover"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: DASHBOARD
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "dashboard" && (
        <div className="space-y-8 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {[
              { 
                label: "Live Visitors", 
                val: visitorStats.active, 
                icon: <Users className="w-5 h-5 text-emerald-400" />,
                isLive: true 
              },
              { 
                label: "Total Site Visits", 
                val: visitorStats.total, 
                icon: <Eye className="w-5 h-5 text-cyan-400" /> 
              },
              { label: "Active Projects", val: projects.length, icon: <Layers className="w-5 h-5 text-accent-blue" /> },
              { label: "Rotating Phrases", val: cms.hero.rotatingWords.length, icon: <Sparkles className="w-5 h-5 text-indigo-400" /> },
              { label: "Nav Items", val: cms.navigation.items.length, icon: <Compass className="w-5 h-5 text-cyan-400" /> },
              { label: "Audit Logs", val: cms.auditLogs.length, icon: <History className="w-5 h-5 text-amber-400" /> }
            ].map((st, i) => (
              <GlassCard key={i} className="p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    {st.isLive && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                    <p className="text-[10px] uppercase font-mono tracking-wider text-text-secondary font-bold">{st.label}</p>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary font-mono">{st.val}</h3>
                </div>
                <div className="p-3 rounded-2xl bg-bg-secondary border border-glass-border">{st.icon}</div>
              </GlassCard>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-6 text-left space-y-4">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-blue" /> Current Hero Headline
              </h3>
              <div className="p-4 rounded-xl bg-bg-secondary/60 border border-glass-border font-serif text-lg text-text-primary">
                "{cms.hero.headlinePrefix} <span className="italic text-accent-blue">{cms.hero.headlineHighlightWord}</span> [Rotating Phrases]"
              </div>
              <p className="text-xs text-text-secondary">{cms.hero.description}</p>
              <button
                onClick={() => setActiveTab("hero")}
                className="px-4 py-2 rounded-full bg-accent-blue text-white text-xs font-bold shadow-md hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Edit Hero Content
              </button>
            </GlassCard>

            <GlassCard className="p-6 text-left space-y-4">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-400" /> Recent Audit Trail
              </h3>
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2">
                {cms.auditLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="text-xs p-2.5 rounded-lg bg-bg-secondary border border-glass-border flex items-center justify-between">
                    <div>
                      <span className="font-bold text-accent-blue">{log.section}: </span>
                      <span className="text-text-secondary">{log.details}</span>
                    </div>
                    <span className="text-[10px] font-mono text-text-muted shrink-0 ml-2">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: VISUAL EDITOR
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "visual-editor" && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-glass-bg border border-glass-border flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-text-primary">Device Viewport:</span>
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={cn("p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer", previewDevice === "desktop" ? "bg-accent-blue text-white" : "bg-bg-secondary text-text-secondary")}
              >
                <Monitor className="w-4 h-4" /> Desktop
              </button>
              <button
                onClick={() => setPreviewDevice("tablet")}
                className={cn("p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer", previewDevice === "tablet" ? "bg-accent-blue text-white" : "bg-bg-secondary text-text-secondary")}
              >
                <Tablet className="w-4 h-4" /> Tablet
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={cn("p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer", previewDevice === "mobile" ? "bg-accent-blue text-white" : "bg-bg-secondary text-text-secondary")}
              >
                <Smartphone className="w-4 h-4" /> Mobile
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-text-primary">Theme Mode:</span>
              <button
                onClick={() => setPreviewMode(previewMode === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-bg-secondary text-text-primary text-xs font-bold flex items-center gap-1.5 border border-glass-border cursor-pointer"
              >
                {previewMode === "dark" ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                {previewMode === "dark" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>
          </div>

          <div className="flex justify-center w-full py-4 bg-black/40 rounded-3xl border border-glass-border overflow-hidden">
            <div
              className={cn(
                "transition-all duration-500 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-bg-primary",
                previewDevice === "desktop" && "w-full max-w-[1300px] h-[720px]",
                previewDevice === "tablet" && "w-[768px] h-[720px]",
                previewDevice === "mobile" && "w-[375px] h-[680px]",
                previewMode === "dark" ? "dark" : ""
              )}
            >
              <iframe src="/" className="w-full h-full border-none" title="Live Website Preview" />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: PROJECTS CMS (RESTORED PRIORITY REORDERING, FILTERS, DUPLICATE & MULTI-TAB MODAL)
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "projects" && (
        <div className="space-y-6 text-left">
          
          {/* Header Controls & Filters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-2xl bg-glass-bg border border-glass-border">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search projects by name, slug, or tech..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-medium text-text-primary focus:outline-none focus:border-accent-blue"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-1 bg-bg-secondary p-1 rounded-xl border border-glass-border overflow-x-auto">
                {["all", "completed", "in-progress", "planning"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setProjectStatusFilter(st)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap",
                      projectStatusFilter === st
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleOpenNewProjectModal}
              className="px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs shadow-md transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" /> Add New Project
            </button>
          </div>

          {/* Project List Grid with Priority Up/Down Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj, idx) => (
              <GlassCard key={proj.id} className="p-5 space-y-4 flex flex-col justify-between group relative">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full">
                        #{idx + 1} Priority
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase text-text-muted">
                        {proj.category}
                      </span>
                    </div>

                    {/* Priority Move Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => movePriority(proj.id, "up")}
                        disabled={idx === 0}
                        className="p-1 rounded bg-bg-secondary hover:bg-glass-bg-hover text-text-secondary disabled:opacity-30 cursor-pointer"
                        title="Move Priority Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => movePriority(proj.id, "down")}
                        disabled={idx === projects.length - 1}
                        className="p-1 rounded bg-bg-secondary hover:bg-glass-bg-hover text-text-secondary disabled:opacity-30 cursor-pointer"
                        title="Move Priority Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-text-primary tracking-tight">{proj.name}</h4>
                  <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">{proj.tagline || proj.description}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-divider">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className={cn(
                      "font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                      proj.status === "completed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    )}>
                      ● {proj.status}
                    </span>
                    <span className="text-text-muted">{proj.version}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditProjectModal(proj)}
                      className="p-2 rounded-lg bg-bg-secondary hover:bg-glass-bg-hover text-accent-blue transition-colors cursor-pointer"
                      title="Edit Full Project Specs"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        duplicateProject(proj.id);
                        showToast(`Duplicated ${proj.name}!`);
                      }}
                      className="p-2 rounded-lg bg-bg-secondary hover:bg-glass-bg-hover text-text-secondary transition-colors cursor-pointer"
                      title="Duplicate Project"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        deleteProject(proj.id);
                        showToast(`Deleted ${proj.name}`);
                      }}
                      className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Full Multi-Tab Edit Project Modal */}
          {isProjectModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-3xl rounded-2xl bg-glass-bg border border-glass-border p-6 shadow-2xl space-y-5 text-left max-h-[90vh] flex flex-col my-auto"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-divider pb-3 shrink-0">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">{editingProject.name || "Project Specs"}</h3>
                    <p className="text-xs text-text-secondary font-mono">ID: {editingProject.id || "new"}</p>
                  </div>
                  <button onClick={() => setIsProjectModalOpen(false)} className="p-1 rounded-lg hover:bg-white/10 text-text-secondary hover:text-text-primary">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Sub-Tabs */}
                <div className="flex items-center gap-2 border-b border-divider pb-2 shrink-0 overflow-x-auto">
                  {[
                    { id: "basic", label: "Basic Info" },
                    { id: "details", label: "Metadata & Stats" },
                    { id: "tech", label: "Tech Stack" },
                    { id: "features", label: "Features" },
                    { id: "readme", label: "README Markdown" }
                  ].map((tb) => (
                    <button
                      key={tb.id}
                      onClick={() => setModalSubTab(tb.id as any)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                        modalSubTab === tb.id ? "bg-accent-blue text-white" : "bg-bg-secondary text-text-secondary hover:text-text-primary"
                      )}
                    >
                      {tb.label}
                    </button>
                  ))}
                </div>

                {/* Modal Body Scroll */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  
                  {/* Basic Info Tab */}
                  {modalSubTab === "basic" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-text-secondary block mb-1">Project Name</label>
                          <input
                            type="text"
                            value={editingProject.name}
                            onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-text-secondary block mb-1">Slug (URL Path)</label>
                          <input
                            type="text"
                            value={editingProject.slug}
                            onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-text-secondary block mb-1">Tagline</label>
                        <input
                          type="text"
                          value={editingProject.tagline}
                          onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-bold text-text-secondary block mb-1">Category</label>
                          <select
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold text-text-primary"
                          >
                            <option value="web">Web</option>
                            <option value="ai">AI</option>
                            <option value="devops">DevOps</option>
                            <option value="saas">SaaS</option>
                            <option value="research">Research</option>
                            <option value="automation">Automation</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-text-secondary block mb-1">Status</label>
                          <select
                            value={editingProject.status}
                            onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold text-text-primary"
                          >
                            <option value="completed font-bold">Completed (Live)</option>
                            <option value="in-progress">In Progress (Beta)</option>
                            <option value="planning">Planning</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-text-secondary block mb-1">Version</label>
                          <input
                            type="text"
                            value={editingProject.version}
                            onChange={(e) => setEditingProject({ ...editingProject, version: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-text-secondary block mb-1">Short Description</label>
                        <textarea
                          rows={3}
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {/* Metadata Tab */}
                  {modalSubTab === "details" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-text-secondary block mb-1">Live URL</label>
                          <input
                            type="text"
                            value={editingProject.liveUrl || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-text-secondary block mb-1">GitHub Repo URL</label>
                          <input
                            type="text"
                            value={editingProject.githubUrl || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-text-secondary block mb-1">Cover Image URL</label>
                        <input
                          type="text"
                          value={editingProject.coverImage || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Tab */}
                  {modalSubTab === "tech" && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Tech Name (e.g. Next.js 15)"
                          value={newTechName}
                          onChange={(e) => setNewTechName(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                        />
                        <button
                          onClick={handleAddTechItem}
                          className="px-4 py-2 rounded-xl bg-accent-blue text-white text-xs font-bold shadow-md hover:bg-blue-600 transition-colors"
                        >
                          Add Tech
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(editingProject.techStack || []).map((t, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-secondary border border-glass-border text-xs font-semibold">
                            {t.name}
                            <button onClick={() => handleRemoveTechItem(idx)} className="text-rose-500 hover:text-rose-600">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features Tab */}
                  {modalSubTab === "features" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Feature Title"
                          value={newFeatureTitle}
                          onChange={(e) => setNewFeatureTitle(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Feature Description"
                          value={newFeatureDesc}
                          onChange={(e) => setNewFeatureDesc(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                        />
                      </div>
                      <button
                        onClick={handleAddFeatureItem}
                        className="w-full py-2 rounded-xl bg-accent-blue text-white text-xs font-bold shadow-md hover:bg-blue-600 transition-colors"
                      >
                        + Add Feature
                      </button>

                      <div className="space-y-2">
                        {(editingProject.features || []).map((f, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-bg-secondary border border-glass-border flex items-center justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-text-primary">{f.title}</h4>
                              <p className="text-[10px] text-text-secondary">{f.description}</p>
                            </div>
                            <button onClick={() => handleRemoveFeatureItem(f.title)} className="text-rose-500 p-1 cursor-pointer">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* README Tab */}
                  {modalSubTab === "readme" && (
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-text-secondary block mb-1">Markdown Documentation / README</label>
                      <textarea
                        rows={10}
                        value={editingProject.readme || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, readme: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono leading-relaxed"
                        placeholder="# Project Documentation..."
                      />
                    </div>
                  )}

                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 pt-3 border-t border-divider shrink-0">
                  <button
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-5 py-2 rounded-full bg-glass-bg border border-glass-border text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProject}
                    className="px-6 py-2 rounded-full bg-accent-blue text-white text-xs font-bold shadow-md hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    Save Project Specs
                  </button>
                </div>
              </motion.div>
            </div>
          )}

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: HERO CMS EDITOR
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "hero" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="p-6 space-y-5">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-blue" /> Hero Headlines & Subheadings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">Version Pill Badge Text</label>
                  <input
                    type="text"
                    value={cms.hero.versionBadge}
                    onChange={(e) => {
                      updateHero({ versionBadge: e.target.value });
                      showToast("Updated version badge!");
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold text-text-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-text-secondary block mb-1.5">Headline Prefix</label>
                    <input
                      type="text"
                      value={cms.hero.headlinePrefix}
                      onChange={(e) => {
                        updateHero({ headlinePrefix: e.target.value });
                        showToast("Updated headline prefix!");
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold text-text-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-text-secondary block mb-1.5">Highlight Connecting Word</label>
                    <input
                      type="text"
                      value={cms.hero.headlineHighlightWord}
                      onChange={(e) => {
                        updateHero({ headlineHighlightWord: e.target.value });
                        showToast("Updated highlight word!");
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold text-text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">Hero Description Copy</label>
                  <textarea
                    rows={3}
                    value={cms.hero.description}
                    onChange={(e) => {
                      updateHero({ description: e.target.value });
                      showToast("Updated hero description!");
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-medium text-text-primary"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 space-y-4">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-indigo-400" /> Animated Rotating Phrases ({cms.hero.rotatingWords.length})
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new phrase (e.g. AI Agents.)"
                  value={newRotatingWord}
                  onChange={(e) => setNewRotatingWord(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold text-text-primary"
                />
                <button
                  onClick={handleAddRotatingWord}
                  className="px-5 py-2 rounded-xl bg-accent-blue text-white text-xs font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
                {cms.hero.rotatingWords.map((word, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-bg-secondary/60 border border-glass-border gap-3">
                    <input
                      type="text"
                      value={word}
                      onChange={(e) => {
                        const updated = [...cms.hero.rotatingWords];
                        updated[idx] = e.target.value;
                        updateHeroRotatingWords(updated);
                        showToast("Updated phrase!");
                      }}
                      className="flex-1 bg-transparent text-xs font-bold font-serif italic text-accent-blue focus:outline-none"
                    />
                    <button
                      onClick={() => handleRemoveRotatingWord(idx)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="p-6 space-y-4">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" /> Telemetry Metrics Grid
              </h3>

              {cms.hero.metrics.map((m) => (
                <div key={m.id} className="p-3.5 rounded-xl bg-bg-secondary/60 border border-glass-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-text-secondary">{m.label}</span>
                    <span className="text-xs font-mono font-bold text-accent-blue">{m.val}{m.suffix}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      value={m.val}
                      onChange={(e) => {
                        updateHeroMetric(m.id, { val: parseFloat(e.target.value) || 0 });
                        showToast(`Updated ${m.label} value!`);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-bg-primary border border-glass-border text-xs font-mono"
                    />
                    <input
                      type="text"
                      value={m.suffix}
                      onChange={(e) => {
                        updateHeroMetric(m.id, { suffix: e.target.value });
                        showToast(`Updated ${m.label} suffix!`);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-bg-primary border border-glass-border text-xs font-mono"
                    />
                    <input
                      type="text"
                      value={m.label}
                      onChange={(e) => {
                        updateHeroMetric(m.id, { label: e.target.value });
                        showToast(`Updated metric label!`);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-bg-primary border border-glass-border text-xs font-mono"
                    />
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: SECTIONS CMS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "sections" && (
        <div className="space-y-8 text-left">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent-blue" /> Featured Products Headings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Section Title</label>
                <input
                  type="text"
                  value={cms.featuredSection.title}
                  onChange={(e) => {
                    updateFeaturedSection({ title: e.target.value });
                    showToast("Updated Featured Title!");
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Section Subtitle</label>
                <input
                  type="text"
                  value={cms.featuredSection.subtitle}
                  onChange={(e) => {
                    updateFeaturedSection({ subtitle: e.target.value });
                    showToast("Updated Featured Subtitle!");
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" /> Capabilities ({cms.capabilities.items.length})
              </h3>
              <input
                type="text"
                value={cms.capabilities.sectionTitle}
                onChange={(e) => {
                  updateCapabilities({ sectionTitle: e.target.value });
                  showToast("Updated Capabilities Title!");
                }}
                className="px-3 py-1 rounded-lg bg-bg-secondary border border-glass-border text-xs font-bold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Capability Title"
                value={newCapTitle}
                onChange={(e) => setNewCapTitle(e.target.value)}
                className="px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
              />
              <input
                type="text"
                placeholder="Description"
                value={newCapDesc}
                onChange={(e) => setNewCapDesc(e.target.value)}
                className="px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
              />
              <button
                onClick={handleAddCapability}
                className="px-4 py-2 rounded-xl bg-accent-blue text-white text-xs font-bold shadow-md hover:bg-blue-600 transition-colors cursor-pointer"
              >
                + Add Capability
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cms.capabilities.items.map((cap) => (
                <div key={cap.id} className="p-4 rounded-xl bg-bg-secondary/60 border border-glass-border space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={cap.title}
                      onChange={(e) => {
                        updateCapabilityItem(cap.id, { title: e.target.value });
                        showToast("Updated capability title!");
                      }}
                      className="bg-transparent font-bold text-xs text-text-primary focus:outline-none"
                    />
                    <button
                      onClick={() => deleteCapabilityItem(cap.id)}
                      className="p-1 text-rose-500 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={cap.desc}
                    onChange={(e) => {
                      updateCapabilityItem(cap.id, { desc: e.target.value });
                      showToast("Updated capability description!");
                    }}
                    className="w-full bg-bg-primary px-3 py-1.5 rounded-lg border border-glass-border text-[11px] text-text-secondary focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 6: MEDIA LIBRARY
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "media" && (
        <div className="space-y-6 text-left">
          <div className="p-6 rounded-2xl bg-glass-bg border border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-text-primary">Media Library Assets ({cms.media.length})</h3>
              <p className="text-xs text-text-secondary mt-0.5">Upload images, icons, SVGs, and videos for website content blocks.</p>
            </div>
            <button
              onClick={() => {
                const name = prompt("Enter asset name (e.g. Hero Banner):", "Custom Asset");
                const url = prompt("Enter image/video URL:", "/logo.png");
                if (name && url) {
                  addMediaItem({
                    id: `med-${Date.now()}`,
                    name,
                    url,
                    type: "image",
                    sizeBytes: 15400,
                    mimeType: "image/png",
                    folder: "General",
                    tags: ["custom"],
                    createdAt: new Date().toISOString()
                  });
                  showToast("Added asset to Media Library!");
                }
              }}
              className="px-5 py-2.5 rounded-full bg-accent-blue text-white font-bold text-xs shadow-md transition-all hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" /> Upload Asset
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cms.media.map((item) => (
              <GlassCard key={item.id} className="p-3 text-left space-y-2 group relative">
                <div className="w-full aspect-square rounded-xl bg-bg-secondary border border-glass-border overflow-hidden flex items-center justify-center p-2">
                  <img src={item.url} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary truncate">{item.name}</span>
                  <button
                    onClick={() => deleteMediaItem(item.id)}
                    className="p-1 text-rose-500 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 7: NAV & FOOTER
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "navigation" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          <GlassCard className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Compass className="w-4 h-4 text-accent-blue" /> Navbar Navigation Items ({cms.navigation.items.length})
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Link Label (e.g. Pricing)"
                value={newNavLabel}
                onChange={(e) => setNewNavLabel(e.target.value)}
                className="px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
              />
              <input
                type="text"
                placeholder="Href (e.g. /pricing)"
                value={newNavHref}
                onChange={(e) => setNewNavHref(e.target.value)}
                className="px-3 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono"
              />
            </div>
            <button
              onClick={handleAddNavItem}
              className="w-full py-2 rounded-xl bg-accent-blue text-white text-xs font-bold shadow-md hover:bg-blue-600 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Navigation Link
            </button>

            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
              {cms.navigation.items.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-bg-secondary/60 border border-glass-border flex items-center justify-between gap-3">
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => {
                        updateNavItem(item.id, { label: e.target.value });
                        showToast("Updated nav label!");
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-bg-primary border border-glass-border text-xs font-semibold"
                    />
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => {
                        updateNavItem(item.id, { href: e.target.value });
                        showToast("Updated nav link!");
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-bg-primary border border-glass-border text-xs font-mono"
                    />
                  </div>
                  <button
                    onClick={() => deleteNavItem(item.id)}
                    className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-5">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" /> Footer Newsletter & Copyright
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Newsletter Headline</label>
                <input
                  type="text"
                  value={cms.footer.newsletterHeadline}
                  onChange={(e) => {
                    updateFooter({ newsletterHeadline: e.target.value });
                    showToast("Updated Newsletter Headline!");
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Newsletter Subtitle Description</label>
                <textarea
                  rows={2}
                  value={cms.footer.newsletterDescription}
                  onChange={(e) => {
                    updateFooter({ newsletterDescription: e.target.value });
                    showToast("Updated Newsletter Description!");
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Copyright Text</label>
                <input
                  type="text"
                  value={cms.footer.copyrightText}
                  onChange={(e) => {
                    updateFooter({ copyrightText: e.target.value });
                    showToast("Updated Copyright Text!");
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                />
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 8: THEME & STYLING
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "theme" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          <GlassCard className="p-6 space-y-5">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Palette className="w-4 h-4 text-accent-blue" /> Color Palette Engine
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Accent Blue", key: "accentBlue", val: cms.theme.colors.accentBlue },
                { label: "Accent Cyan", key: "accentCyan", val: cms.theme.colors.accentCyan },
                { label: "Accent Indigo", key: "accentIndigo", val: cms.theme.colors.accentIndigo }
              ].map((c) => (
                <div key={c.key} className="p-3 rounded-xl bg-bg-secondary border border-glass-border space-y-2">
                  <label className="text-xs font-bold text-text-secondary block">{c.label}</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={c.val}
                      onChange={(e) => {
                        updateTheme({ colors: { ...cms.theme.colors, [c.key]: e.target.value } });
                        showToast(`Updated ${c.label} color!`);
                      }}
                      className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                    />
                    <input
                      type="text"
                      value={c.val}
                      onChange={(e) => {
                        updateTheme({ colors: { ...cms.theme.colors, [c.key]: e.target.value } });
                        showToast(`Updated ${c.label} hex!`);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-bg-primary border border-glass-border text-xs font-mono w-24"
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-5">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Glass & Border Controls
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Glass Backdrop Blur (px)</label>
                <input
                  type="number"
                  value={cms.theme.glassBlurPx}
                  onChange={(e) => {
                    updateTheme({ glassBlurPx: parseInt(e.target.value) || 20 });
                    showToast("Updated Glass Blur!");
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Card Border Radius (px)</label>
                <input
                  type="number"
                  value={cms.theme.borderRadiusPx}
                  onChange={(e) => {
                    updateTheme({ borderRadiusPx: parseInt(e.target.value) || 16 });
                    showToast("Updated Border Radius!");
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono"
                />
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 9: SEO ENGINE
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "seo" && (
        <GlassCard className="p-6 text-left space-y-5 max-w-3xl">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Search className="w-4 h-4 text-accent-blue" /> Global SEO Metadata
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-text-secondary block mb-1">Default Meta Title</label>
              <input
                type="text"
                value={cms.seo.defaultTitle}
                onChange={(e) => {
                  updateSEO({ defaultTitle: e.target.value });
                  showToast("Updated Meta Title!");
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-text-secondary block mb-1">Default Meta Description</label>
              <textarea
                rows={3}
                value={cms.seo.defaultDescription}
                onChange={(e) => {
                  updateSEO({ defaultDescription: e.target.value });
                  showToast("Updated Meta Description!");
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-medium"
              />
            </div>
          </div>
        </GlassCard>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 10: AUDIT & VERSION SNAPSHOTS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "audit-snapshots" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          <div className="lg:col-span-6 space-y-6">
            <GlassCard className="p-6 space-y-4">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-400" /> Version Snapshots ({cms.snapshots.length})
              </h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {cms.snapshots.map((snap) => (
                  <div key={snap.id} className="p-3.5 rounded-xl bg-bg-secondary/60 border border-glass-border flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-text-primary">{snap.versionName}</h4>
                      <p className="text-[10px] text-text-secondary font-mono">{new Date(snap.timestamp).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => {
                        rollbackSnapshot(snap.id);
                        showToast(`Rolled back to [${snap.versionName}]`);
                      }}
                      className="px-3 py-1.5 rounded-full bg-accent-blue text-white text-[10px] font-bold hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      Rollback
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <GlassCard className="p-6 space-y-4">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" /> Import JSON Backup
              </h3>
              <textarea
                rows={5}
                placeholder="Paste CMS Backup JSON string here..."
                value={jsonBackupInput}
                onChange={(e) => setJsonBackupInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-mono"
              />
              <button
                onClick={handleImportBackup}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                Restore from JSON Backup
              </button>
            </GlassCard>
          </div>
        </div>
      )}

    </div>
  );
}
