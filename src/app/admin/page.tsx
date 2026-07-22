"use client";

import React, { useState } from "react";
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
  Activity
} from "lucide-react";

import { useProjectsStore, useProjects } from "@/stores/projects-store";
import { useSiteCMSStore } from "@/stores/site-cms-store";
import { GlassCard } from "@/components/glass/glass-card";
import { GlassButton } from "@/components/glass/glass-button";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type AdminTab =
  | "dashboard"
  | "visual-editor"
  | "hero"
  | "projects"
  | "media"
  | "navigation"
  | "theme"
  | "seo"
  | "audit-snapshots";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const projects = useProjects();
  const {
    addProject,
    updateProject,
    deleteProject,
    duplicateProject,
    resetToDefaults
  } = useProjectsStore();

  const cms = useSiteCMSStore((state) => state.cms);
  const {
    updateSettings,
    updateHero,
    updateHeroRotatingWords,
    updateHeroMetric,
    updateNavigation,
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
    resetCMSToDefaults
  } = useSiteCMSStore();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [newRotatingWord, setNewRotatingWord] = useState("");
  const [snapshotName, setSnapshotName] = useState("");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewMode, setPreviewMode] = useState<"dark" | "light">("dark");
  const [jsonBackupInput, setJsonBackupInput] = useState("");
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // New Project Form Modal
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Partial<Project> | null>(null);

  const showSaveSuccess = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(null), 3000);
  };

  const handleAddRotatingWord = () => {
    if (!newRotatingWord.trim()) return;
    const updated = [...cms.hero.rotatingWords, newRotatingWord.trim()];
    updateHeroRotatingWords(updated);
    setNewRotatingWord("");
    showSaveSuccess("Added rotating headline phrase!");
  };

  const handleRemoveRotatingWord = (index: number) => {
    const updated = cms.hero.rotatingWords.filter((_, i) => i !== index);
    updateHeroRotatingWords(updated);
    showSaveSuccess("Removed rotating headline phrase!");
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportJSONBackup());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kiwik_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showSaveSuccess("CMS Backup exported successfully!");
  };

  const handleImportBackup = () => {
    if (!jsonBackupInput.trim()) return;
    const success = importJSONBackup(jsonBackupInput);
    if (success) {
      showSaveSuccess("CMS Backup imported and restored!");
      setJsonBackupInput("");
    } else {
      alert("Invalid JSON Backup format.");
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-16 px-4 sm:px-6 md:px-8 max-w-[1500px] mx-auto select-none">
      
      {/* Toast Save Notification */}
      <AnimatePresence>
        {saveNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-full bg-emerald-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 border border-emerald-400/40"
          >
            <CheckCircle2 className="w-4 h-4" />
            {saveNotification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-divider pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary tracking-tight">
              Kiwik.1 Enterprise Website CMS
            </h1>
          </div>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            Database-Driven Content Engine. Edit text, headlines, rotating phrases, navigation, theme, and projects live.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => {
              createSnapshot(`Snapshot-${new Date().toLocaleTimeString()}`, "Manual snapshot backup");
              showSaveSuccess("Created version snapshot!");
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-xs font-semibold shadow-sm transition-all"
          >
            <History className="w-3.5 h-3.5 text-accent-blue" />
            Save Snapshot
          </button>
          <button
            onClick={handleExportBackup}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-xs font-semibold shadow-sm transition-all"
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

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-divider/60">
        {[
          { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
          { id: "visual-editor", label: "Visual Editor", icon: <Eye className="w-3.5 h-3.5" /> },
          { id: "hero", label: "Hero CMS", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { id: "projects", label: "Projects CMS", icon: <Layers className="w-3.5 h-3.5" /> },
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
          TAB 1: DASHBOARD OVERVIEW
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "dashboard" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Active Projects", val: projects.length, icon: <Layers className="w-5 h-5 text-accent-blue" /> },
              { label: "Rotating Phrases", val: cms.hero.rotatingWords.length, icon: <Sparkles className="w-5 h-5 text-indigo-400" /> },
              { label: "Media Assets", val: cms.media.length, icon: <ImageIcon className="w-5 h-5 text-cyan-400" /> },
              { label: "Audit Log Trail", val: cms.auditLogs.length, icon: <History className="w-5 h-5 text-amber-400" /> }
            ].map((st, i) => (
              <GlassCard key={i} className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-text-secondary font-bold">{st.label}</p>
                  <h3 className="text-2xl font-bold text-text-primary font-mono mt-1">{st.val}</h3>
                </div>
                <div className="p-3 rounded-2xl bg-bg-secondary border border-glass-border">{st.icon}</div>
              </GlassCard>
            ))}
          </div>

          {/* Quick Edit Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-6 text-left space-y-4">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-blue" /> Current Hero Headline
              </h3>
              <div className="p-4 rounded-xl bg-bg-secondary/60 border border-glass-border font-serif text-lg text-text-primary">
                "{cms.hero.headlinePrefix} <span className="italic text-accent-blue">{cms.hero.headlineHighlightWord}</span> [Rotating Phrases]"
              </div>
              <p className="text-xs text-text-secondary">
                Description: {cms.hero.description}
              </p>
              <button
                onClick={() => setActiveTab("hero")}
                className="px-4 py-2 rounded-full bg-accent-blue text-white text-xs font-bold shadow-md hover:bg-blue-600 transition-colors"
              >
                Edit Hero Content
              </button>
            </GlassCard>

            <GlassCard className="p-6 text-left space-y-4">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-400" /> Recent Audit Activity
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
          TAB 2: VISUAL WEBSITE EDITOR & DEVICE PREVIEW
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "visual-editor" && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-glass-bg border border-glass-border">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-text-primary">Device Viewport:</span>
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={cn("p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors", previewDevice === "desktop" ? "bg-accent-blue text-white" : "bg-bg-secondary text-text-secondary")}
              >
                <Monitor className="w-4 h-4" /> Desktop
              </button>
              <button
                onClick={() => setPreviewDevice("tablet")}
                className={cn("p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors", previewDevice === "tablet" ? "bg-accent-blue text-white" : "bg-bg-secondary text-text-secondary")}
              >
                <Tablet className="w-4 h-4" /> Tablet
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={cn("p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors", previewDevice === "mobile" ? "bg-accent-blue text-white" : "bg-bg-secondary text-text-secondary")}
              >
                <Smartphone className="w-4 h-4" /> Mobile
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-text-primary">Theme:</span>
              <button
                onClick={() => setPreviewMode(previewMode === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-bg-secondary text-text-primary text-xs font-bold flex items-center gap-1.5 border border-glass-border"
              >
                {previewMode === "dark" ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                {previewMode === "dark" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>
          </div>

          {/* Device Frame */}
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
              <iframe
                src="/"
                className="w-full h-full border-none"
                title="Live Website Preview"
              />
            </div>
          </div>
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
                <Sparkles className="w-4 h-4 text-accent-blue" /> Hero Headlines & Copy
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">Version Pill Badge Text</label>
                  <input
                    type="text"
                    value={cms.hero.versionBadge}
                    onChange={(e) => updateHero({ versionBadge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold text-text-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-text-secondary block mb-1.5">Headline Prefix</label>
                    <input
                      type="text"
                      value={cms.hero.headlinePrefix}
                      onChange={(e) => updateHero({ headlinePrefix: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold text-text-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-text-secondary block mb-1.5">Highlight Connecting Word</label>
                    <input
                      type="text"
                      value={cms.hero.headlineHighlightWord}
                      onChange={(e) => updateHero({ headlineHighlightWord: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold text-text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">Hero Description Copy</label>
                  <textarea
                    rows={3}
                    value={cms.hero.description}
                    onChange={(e) => updateHero({ description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-medium text-text-primary"
                  />
                </div>
              </div>
            </GlassCard>

            {/* Rotating Phrases Manager */}
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
                  className="px-5 py-2 rounded-xl bg-accent-blue text-white text-xs font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
                {cms.hero.rotatingWords.map((word, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-bg-secondary/60 border border-glass-border">
                    <span className="text-xs font-bold font-serif italic text-accent-blue">{word}</span>
                    <button
                      onClick={() => handleRemoveRotatingWord(idx)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Telemetry Metrics & CTAs */}
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
                      onChange={(e) => updateHeroMetric(m.id, { val: parseFloat(e.target.value) || 0 })}
                      className="px-2.5 py-1.5 rounded-lg bg-bg-primary border border-glass-border text-xs font-mono"
                    />
                    <input
                      type="text"
                      value={m.suffix}
                      onChange={(e) => updateHeroMetric(m.id, { suffix: e.target.value })}
                      className="px-2.5 py-1.5 rounded-lg bg-bg-primary border border-glass-border text-xs font-mono"
                    />
                    <input
                      type="text"
                      value={m.label}
                      onChange={(e) => updateHeroMetric(m.id, { label: e.target.value })}
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
          TAB 4: PROJECTS CMS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "projects" && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-primary">Projects CMS Repository ({projects.length})</h3>
            <button
              onClick={() => {
                setSelectedProject({ name: "New Kiwik Project", slug: `project-${Date.now()}`, tagline: "", description: "", tags: ["new"] });
                setIsEditingProject(true);
              }}
              className="px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs shadow-md transition-all hover:scale-102 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <GlassCard key={proj.id} className="p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full">
                      {proj.category}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">{proj.version}</span>
                  </div>
                  <h4 className="text-base font-bold text-text-primary tracking-tight">{proj.name}</h4>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">{proj.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-divider">
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">● {proj.deploymentStatus}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => duplicateProject(proj.id)}
                      className="p-2 rounded-lg bg-bg-secondary hover:bg-glass-bg-hover text-text-secondary transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: MEDIA LIBRARY
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
                  showSaveSuccess("Added asset to Media Library!");
                }
              }}
              className="px-5 py-2.5 rounded-full bg-accent-blue text-white font-bold text-xs shadow-md transition-all hover:bg-blue-600 flex items-center gap-2"
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
                    className="p-1 text-rose-500 hover:bg-rose-500/10 rounded transition-colors"
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
          TAB 6: NAVIGATION & FOOTER
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "navigation" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          <GlassCard className="p-6 space-y-5">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Compass className="w-4 h-4 text-accent-blue" /> Navbar Navigation Items ({cms.navigation.items.length})
            </h3>
            <div className="space-y-3">
              {cms.navigation.items.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-bg-secondary/60 border border-glass-border flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-text-muted">#{item.order}</span>
                    <span className="text-xs font-bold text-text-primary">{item.label}</span>
                    <span className="text-[10px] font-mono text-accent-blue">{item.href}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">Visible</span>
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
                  onChange={(e) => updateFooter({ newsletterHeadline: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-1">Copyright Text</label>
                <input
                  type="text"
                  value={cms.footer.copyrightText}
                  onChange={(e) => updateFooter({ copyrightText: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
                />
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 7: THEME & STYLING
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
                <div key={c.key} className="p-3 rounded-xl bg-bg-secondary border border-glass-border space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary block">{c.label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={c.val}
                      onChange={(e) => updateTheme({ colors: { ...cms.theme.colors, [c.key]: e.target.value } })}
                      className="w-8 h-8 rounded cursor-pointer border-none"
                    />
                    <span className="text-xs font-mono font-bold text-text-primary">{c.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 8: SEO ENGINE
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
                onChange={(e) => updateSEO({ defaultTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-semibold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-text-secondary block mb-1">Default Meta Description</label>
              <textarea
                rows={3}
                value={cms.seo.defaultDescription}
                onChange={(e) => updateSEO({ defaultDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-glass-border text-xs font-medium"
              />
            </div>
          </div>
        </GlassCard>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 9: AUDIT LOGS & VERSION SNAPSHOTS
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
                        showSaveSuccess(`Rolled back to [${snap.versionName}]`);
                      }}
                      className="px-3 py-1.5 rounded-full bg-accent-blue text-white text-[10px] font-bold hover:bg-blue-600 transition-colors"
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
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors"
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
