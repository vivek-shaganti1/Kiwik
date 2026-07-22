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
  Star
} from "lucide-react";

import { useProjectsStore, useProjects } from "@/stores/projects-store";
import { GlassCard } from "@/components/glass/glass-card";
import { GlassButton } from "@/components/glass/glass-button";
import type {
  Project,
  ProjectStatus,
  ProjectCategory,
  TechCategory,
  TechItem,
  Feature,
  ChangelogEntry,
  TimelineEntry,
  Contributor,
  ProjectImage
} from "@/types";
import { cn } from "@/lib/utils";

// Initial blank project template
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
  owner: "Criska",
  stars: 0,
  forks: 0,
  views: 0,
  deploymentStatus: "live"
};

export default function AdminPage() {
  const projects = useProjects();
  const {
    addProject,
    updateProject,
    deleteProject,
    movePriority,
    duplicateProject,
    resetToDefaults,
    setProjects
  } = useProjectsStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Modal states
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>(emptyProject);
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [visitorStats, setVisitorStats] = useState({ total: 35247, active: 4 });

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => setVisitorStats(data))
      .catch((err) => console.error("Error loading visitors telemetry", err));

    // Poll every 10 seconds for real-time live active updates
    const interval = setInterval(() => {
      fetch("/api/visitors")
        .then((res) => res.json())
        .then((data) => setVisitorStats(data))
        .catch((err) => console.error("Error polling visitors telemetry", err));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Stats calculation
  const totalProjects = projects.length;
  const inProgressCount = projects.filter(p => p.status === "in-progress").length;
  const completedCount = projects.filter(p => p.status === "completed").length;
  const avgCompletion = totalProjects > 0
    ? Math.round(projects.reduce((acc, p) => acc + (p.completionPercent || 0), 0) / totalProjects)
    : 0;

  // Filtered projects
  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Open modal for new project
  const handleCreateNew = () => {
    const newId = `proj-${Date.now()}`;
    setCurrentProject({
      ...emptyProject,
      id: newId,
      slug: `project-${Date.now().toString().slice(-4)}`
    });
    setActiveTab("basic");
    setIsEditing(true);
  };

  // Open modal for editing existing project
  const handleEditProject = (proj: Project) => {
    setCurrentProject(JSON.parse(JSON.stringify(proj)));
    setActiveTab("basic");
    setIsEditing(true);
  };

  // Save Project (Create or Update)
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject.name || !currentProject.slug) {
      showToast("Please provide both a Name and a Slug!");
      return;
    }

    const exists = projects.some(p => p.id === currentProject.id);
    if (exists) {
      updateProject(currentProject.id, currentProject);
      showToast(`Updated project "${currentProject.name}"`);
    } else {
      addProject(currentProject);
      showToast(`Added new project "${currentProject.name}"`);
    }

    setIsEditing(false);
  };

  // Duplicate handler
  const handleDuplicate = (id: string, name: string) => {
    duplicateProject(id);
    showToast(`Duplicated "${name}"`);
  };

  // Delete handler
  const handleDelete = (id: string) => {
    deleteProject(id);
    setDeleteConfirmId(null);
    showToast("Project deleted.");
  };

  // Priority move handler
  const handleMovePriority = (id: string, dir: "up" | "down") => {
    movePriority(id, dir);
    showToast(`Priority adjusted.`);
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kiwik_projects_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Exported projects JSON file!");
  };

  // Import JSON
  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed)) {
        setProjects(parsed);
        setShowJsonModal(false);
        setJsonInput("");
        showToast("Successfully imported projects JSON!");
      } else {
        alert("JSON must be an array of Project objects.");
      }
    } catch {
      alert("Invalid JSON format.");
    }
  };

  return (
    <div className="min-h-screen text-text-primary pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 backdrop-blur-xl shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-medium text-sm">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-glass-border">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-accent-blue/10 border border-accent-blue/30 text-accent-blue">
              <Layers className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold bg-clip-text text-transparent bg-gradient-to-r from-text-primary via-text-primary/95 to-text-secondary">
              Admin Project CMS
            </h1>
          </div>
          <p className="text-text-secondary text-sm md:text-base">
            Add, edit, duplicate, and reorder projects by priority. Changes persist instantly across the entire platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <GlassButton onClick={handleCreateNew} variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </GlassButton>
          <GlassButton onClick={() => setShowJsonModal(true)} variant="secondary" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </GlassButton>
          <GlassButton onClick={handleExportJson} variant="secondary" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </GlassButton>
          <button
            onClick={() => {
              if (confirm("Reset all projects to default sample data?")) {
                resetToDefaults();
                showToast("Reset projects to default data.");
              }
            }}
            className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-colors"
            title="Reset to Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <GlassCard className="p-4 flex flex-col justify-between">
          <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Total Projects</span>
          <span className="text-2xl font-bold text-text-primary mt-2">{totalProjects}</span>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col justify-between">
          <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">In Progress</span>
          <span className="text-2xl font-bold text-amber-400 mt-2">{inProgressCount}</span>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col justify-between">
          <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Completed</span>
          <span className="text-2xl font-bold text-emerald-400 mt-2">{completedCount}</span>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col justify-between">
          <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Avg Completion</span>
          <span className="text-2xl font-bold text-accent-blue mt-2">{avgCompletion}%</span>
        </GlassCard>

        {/* Visitors Analytics Dashboard Cards */}
        <GlassCard className="p-4 flex flex-col justify-between border-accent-blue/30 bg-accent-blue/5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Live Visitors</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="text-2xl font-bold text-text-primary mt-2">{visitorStats.active} active</span>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col justify-between border-violet-500/30 bg-violet-500/5">
          <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Total Visits</span>
          <span className="text-2xl font-bold text-text-primary mt-2">{visitorStats.total.toLocaleString()}</span>
        </GlassCard>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search by name, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-glass-bg border border-glass-border focus:outline-none focus:border-accent-blue text-sm transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-glass-bg border border-glass-border text-xs font-bold text-text-primary focus:outline-none hover:bg-glass-bg-hover transition-colors cursor-pointer"
          >
            <option value="all" className="bg-neutral-900">All Statuses</option>
            <option value="completed" className="bg-neutral-900">Completed</option>
            <option value="in-progress" className="bg-neutral-900">In Progress</option>
            <option value="archived" className="bg-neutral-900">Archived</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-glass-bg border border-glass-border text-xs font-bold text-text-primary focus:outline-none hover:bg-glass-bg-hover transition-colors cursor-pointer"
          >
            <option value="all" className="bg-neutral-900">All Categories</option>
            <option value="web" className="bg-neutral-900">Web</option>
            <option value="ai" className="bg-neutral-900">AI</option>
            <option value="mobile" className="bg-neutral-900">Mobile</option>
            <option value="devops" className="bg-neutral-900">DevOps</option>
            <option value="saas" className="bg-neutral-900">SaaS</option>
            <option value="research" className="bg-neutral-900">Research</option>
          </select>
        </div>
      </div>

      {/* Projects Management List */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <p className="text-text-secondary">No projects match your filter or query.</p>
          </GlassCard>
        ) : (
          filteredProjects.map((proj, idx) => {
            const actualIndex = projects.findIndex(p => p.id === proj.id);
            return (
              <GlassCard key={proj.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  {/* Priority & Reorder Controls */}
                  <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-neutral-900/60 border border-white/5 gap-1">
                    <button
                      disabled={actualIndex === 0}
                      onClick={() => handleMovePriority(proj.id, "up")}
                      className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                      title="Move Priority Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-accent-blue px-1">
                      #{actualIndex + 1}
                    </span>
                    <button
                      disabled={actualIndex === projects.length - 1}
                      onClick={() => handleMovePriority(proj.id, "down")}
                      className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                      title="Move Priority Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Project Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-glass-border overflow-hidden flex items-center justify-center flex-shrink-0">
                      {proj.logo ? (
                        <img src={proj.logo} alt={proj.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg font-bold text-accent-blue">{proj.name[0]}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-text-primary text-base">{proj.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-glass-bg border border-glass-border text-text-secondary capitalize">
                          {proj.category}
                        </span>
                        <span
                          className={cn("text-xs px-2 py-0.5 rounded-full font-medium capitalize", {
                            "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20": proj.status === "completed",
                            "bg-amber-500/10 text-amber-400 border border-amber-500/20": proj.status === "in-progress",
                            "bg-rose-500/10 text-rose-400 border border-rose-500/20": proj.status === "archived",
                          })}
                        >
                          {proj.status.replace("-", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5 line-clamp-1 max-w-xl">
                        {proj.tagline || proj.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress & Quick Actions */}
                <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-glass-border">
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-accent-blue h-full rounded-full transition-all"
                        style={{ width: `${proj.completionPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-text-secondary w-8">{proj.completionPercent}%</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/projects/${proj.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg bg-glass-bg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors border border-glass-border"
                      title="View Public Page"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDuplicate(proj.id, proj.name)}
                      className="p-2 rounded-lg bg-glass-bg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors border border-glass-border"
                      title="Duplicate Project"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleEditProject(proj)}
                      className="p-2 rounded-lg bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue transition-colors border border-accent-blue/20"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    {deleteConfirmId === proj.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(proj.id)}
                          className="px-2 py-1 rounded bg-rose-600 text-white text-xs font-semibold"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="p-1 text-neutral-400 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(proj.id)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors border border-rose-500/20"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </GlassCard>
            );
          })
        )}
      </div>

      {/* Edit / Create Comprehensive Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl bg-neutral-900 border border-glass-border rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-glass-border flex items-center justify-between bg-neutral-900/90">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent-blue" />
                  <h2 className="text-lg font-bold text-white">
                    {projects.some(p => p.id === currentProject.id) ? "Edit Project" : "Create New Project"}
                  </h2>
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Tabs Header */}
              <div className="px-6 pt-3 bg-black/40 border-b border-glass-border flex items-center gap-2 overflow-x-auto">
                {[
                  { id: "basic", label: "Basic Info", icon: Sparkles },
                  { id: "media", label: "Media & Links", icon: ImageIcon },
                  { id: "tech", label: "Tech Stack", icon: Code },
                  { id: "features", label: "Features", icon: ListPlus },
                  { id: "timeline", label: "Timeline", icon: Calendar },
                  { id: "changelog", label: "Changelog", icon: GitBranch },
                  { id: "contributors", label: "Team", icon: Users },
                  { id: "readme", label: "README Docs", icon: FileText },
                ].map(t => {
                  const IconComp = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={cn(
                        "px-3 py-2 rounded-t-xl text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap",
                        activeTab === t.id
                          ? "border-accent-blue text-accent-blue bg-white/5"
                          : "border-transparent text-neutral-400 hover:text-white"
                      )}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleSaveProject} className="p-6 overflow-y-auto space-y-6 flex-1">
                {/* TAB 1: BASIC INFO */}
                {activeTab === "basic" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">Project ID</label>
                      <input
                        type="text"
                        value={currentProject.id}
                        onChange={(e) => setCurrentProject({ ...currentProject, id: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">URL Slug</label>
                      <input
                        type="text"
                        value={currentProject.slug}
                        onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-text-secondary mb-1">Project Name</label>
                      <input
                        type="text"
                        value={currentProject.name}
                        onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-text-secondary mb-1">Tagline</label>
                      <input
                        type="text"
                        value={currentProject.tagline}
                        onChange={(e) => setCurrentProject({ ...currentProject, tagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">Category</label>
                      <select
                        value={currentProject.category}
                        onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value as ProjectCategory })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                      >
                        {["web", "ai", "mobile", "automation", "blockchain", "ml", "devops", "research", "saas", "open-source"].map(c => (
                          <option key={c} value={c} className="bg-neutral-900">{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">Status</label>
                      <select
                        value={currentProject.status}
                        onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value as ProjectStatus })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                      >
                        {["completed", "in-progress", "archived", "private"].map(s => (
                          <option key={s} value={s} className="bg-neutral-900">{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">Version</label>
                      <input
                        type="text"
                        value={currentProject.version}
                        onChange={(e) => setCurrentProject({ ...currentProject, version: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">Completion %</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={currentProject.completionPercent}
                        onChange={(e) => setCurrentProject({ ...currentProject, completionPercent: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-text-secondary mb-1">Short Description</label>
                      <textarea
                        rows={3}
                        value={currentProject.description}
                        onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: MEDIA & LINKS */}
                {activeTab === "media" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={currentProject.coverImage}
                        onChange={(e) => setCurrentProject({ ...currentProject, coverImage: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">Live Site URL</label>
                      <input
                        type="text"
                        value={currentProject.liveUrl || ""}
                        onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">GitHub Repo URL</label>
                      <input
                        type="text"
                        value={currentProject.githubUrl || ""}
                        onChange={(e) => setCurrentProject({ ...currentProject, githubUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all font-semibold"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: TECH STACK */}
                {activeTab === "tech" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Tech Stack Items</h4>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentProject({
                            ...currentProject,
                            techStack: [...currentProject.techStack, { name: "New Tech", category: "frontend" }]
                          })
                        }
                        className="px-3 py-1.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Tech
                      </button>
                    </div>

                    {currentProject.techStack.map((tech, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-glass-border flex items-center gap-3">
                        <input
                          type="text"
                          value={tech.name}
                          placeholder="Name"
                          onChange={(e) => {
                            const updated = [...currentProject.techStack];
                            updated[idx].name = e.target.value;
                            setCurrentProject({ ...currentProject, techStack: updated });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-black/50 border border-glass-border text-xs text-white"
                        />
                        <select
                          value={tech.category}
                          onChange={(e) => {
                            const updated = [...currentProject.techStack];
                            updated[idx].category = e.target.value as TechCategory;
                            setCurrentProject({ ...currentProject, techStack: updated });
                          }}
                          className="px-2 py-1.5 rounded-lg bg-black/50 border border-glass-border text-xs text-white"
                        >
                          {["frontend", "backend", "database", "cloud", "ai", "devops", "auth", "payments"].map(c => (
                            <option key={c} value={c} className="bg-neutral-900">{c}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = currentProject.techStack.filter((_, i) => i !== idx);
                            setCurrentProject({ ...currentProject, techStack: updated });
                          }}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 4: FEATURES */}
                {activeTab === "features" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Features List</h4>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentProject({
                            ...currentProject,
                            features: [...currentProject.features, { title: "New Feature", description: "Description..." }]
                          })
                        }
                        className="px-3 py-1.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Feature
                      </button>
                    </div>

                    {currentProject.features.map((feat, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-glass-border space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={feat.title}
                            placeholder="Title"
                            onChange={(e) => {
                              const updated = [...currentProject.features];
                              updated[idx].title = e.target.value;
                              setCurrentProject({ ...currentProject, features: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-glass-border text-xs font-bold text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = currentProject.features.filter((_, i) => i !== idx);
                              setCurrentProject({ ...currentProject, features: updated });
                            }}
                            className="ml-2 p-1.5 text-rose-400 hover:bg-rose-500/10 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={feat.description}
                          placeholder="Description"
                          onChange={(e) => {
                            const updated = [...currentProject.features];
                            updated[idx].description = e.target.value;
                            setCurrentProject({ ...currentProject, features: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-glass-border text-xs text-white"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 5: TIMELINE */}
                {activeTab === "timeline" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Timeline Milestones</h4>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentProject({
                            ...currentProject,
                            timeline: [
                              ...currentProject.timeline,
                              { date: new Date().toISOString().split("T")[0], title: "Milestone", description: "", status: "completed" }
                            ]
                          })
                        }
                        className="px-3 py-1.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Milestone
                      </button>
                    </div>

                    {currentProject.timeline.map((entry, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-glass-border flex items-center gap-3">
                        <input
                          type="text"
                          value={entry.date}
                          placeholder="Date"
                          onChange={(e) => {
                            const updated = [...currentProject.timeline];
                            updated[idx].date = e.target.value;
                            setCurrentProject({ ...currentProject, timeline: updated });
                          }}
                          className="w-28 px-2 py-1 rounded bg-black/50 border border-glass-border text-xs text-white"
                        />
                        <input
                          type="text"
                          value={entry.title}
                          placeholder="Title"
                          onChange={(e) => {
                            const updated = [...currentProject.timeline];
                            updated[idx].title = e.target.value;
                            setCurrentProject({ ...currentProject, timeline: updated });
                          }}
                          className="flex-1 px-2 py-1 rounded bg-black/50 border border-glass-border text-xs font-bold text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = currentProject.timeline.filter((_, i) => i !== idx);
                            setCurrentProject({ ...currentProject, timeline: updated });
                          }}
                          className="p-1 text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 6: CHANGELOG */}
                {activeTab === "changelog" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Changelog Releases</h4>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentProject({
                            ...currentProject,
                            changelog: [
                              ...currentProject.changelog,
                              { version: "1.0.0", date: new Date().toISOString().split("T")[0], title: "Release", changes: [], type: "minor" }
                            ]
                          })
                        }
                        className="px-3 py-1.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Release
                      </button>
                    </div>

                    {currentProject.changelog.map((change, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-glass-border flex items-center gap-3">
                        <input
                          type="text"
                          value={change.version}
                          placeholder="Version"
                          onChange={(e) => {
                            const updated = [...currentProject.changelog];
                            updated[idx].version = e.target.value;
                            setCurrentProject({ ...currentProject, changelog: updated });
                          }}
                          className="w-24 px-2 py-1 rounded bg-black/50 border border-glass-border text-xs text-white"
                        />
                        <input
                          type="text"
                          value={change.title}
                          placeholder="Title"
                          onChange={(e) => {
                            const updated = [...currentProject.changelog];
                            updated[idx].title = e.target.value;
                            setCurrentProject({ ...currentProject, changelog: updated });
                          }}
                          className="flex-1 px-2 py-1 rounded bg-black/50 border border-glass-border text-xs font-bold text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = currentProject.changelog.filter((_, i) => i !== idx);
                            setCurrentProject({ ...currentProject, changelog: updated });
                          }}
                          className="p-1 text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 7: CONTRIBUTORS */}
                {activeTab === "contributors" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Team & Contributors</h4>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentProject({
                            ...currentProject,
                            contributors: [...currentProject.contributors, { name: "Name", role: "Role" }]
                          })
                        }
                        className="px-3 py-1.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Member
                      </button>
                    </div>

                    {currentProject.contributors.map((contrib, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-glass-border flex items-center gap-3">
                        <input
                          type="text"
                          value={contrib.name}
                          placeholder="Name"
                          onChange={(e) => {
                            const updated = [...currentProject.contributors];
                            updated[idx].name = e.target.value;
                            setCurrentProject({ ...currentProject, contributors: updated });
                          }}
                          className="flex-1 px-2 py-1 rounded bg-black/50 border border-glass-border text-xs font-bold text-white"
                        />
                        <input
                          type="text"
                          value={contrib.role}
                          placeholder="Role"
                          onChange={(e) => {
                            const updated = [...currentProject.contributors];
                            updated[idx].role = e.target.value;
                            setCurrentProject({ ...currentProject, contributors: updated });
                          }}
                          className="flex-1 px-2 py-1 rounded bg-black/50 border border-glass-border text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = currentProject.contributors.filter((_, i) => i !== idx);
                            setCurrentProject({ ...currentProject, contributors: updated });
                          }}
                          className="p-1 text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 8: README DOCS */}
                {activeTab === "readme" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">README Markdown Content</label>
                      <textarea
                        rows={12}
                        value={currentProject.readme || ""}
                        placeholder="# Project Title..."
                        onChange={(e) => setCurrentProject({ ...currentProject, readme: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-xs text-text-primary font-mono focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Modal Actions Footer */}
                <div className="pt-4 border-t border-glass-border flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <GlassButton type="submit" variant="primary">
                    Save Changes
                  </GlassButton>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* JSON Backup / Import Modal */}
      <AnimatePresence>
        {showJsonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-neutral-900 border border-glass-border rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Import Projects JSON</h3>
                <button onClick={() => setShowJsonModal(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Paste a JSON array of `Project` objects below to bulk import or overwrite current projects.
              </p>
              <textarea
                rows={10}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="[ { 'id': '1', 'name': '...' } ]"
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg-secondary/60 border border-glass-border text-xs font-mono text-text-primary mb-4 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 transition-all"
              />
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-text-secondary"
                >
                  Cancel
                </button>
                <GlassButton onClick={handleImportJson} variant="primary">
                  Import & Save
                </GlassButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
