"use client";

import React, { useEffect, useState, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { 
  ExternalLink, 
  Star, 
  GitFork, 
  Eye, 
  CheckCircle, 
  X, 
  ArrowLeft, 
  Code,
  Clock,
  BookOpen,
  Menu,
  ChevronRight,
  Sparkles,
  Layers,
  Calendar,
  Users
} from "lucide-react";

import { useProjects } from "@/stores/projects-store";
import { GlassCard } from "@/components/glass/glass-card";
import { GlassButton } from "@/components/glass/glass-button";
import { useHistoryStore } from "@/stores/history-store";
import { cn } from "@/lib/utils";

export default function ProjectDetailPage() {
  const projects = useProjects();
  const params = useParams();
  const slug = params?.slug as string;
  const project = projects.find(p => p.slug === slug);
  const { addToHistory } = useHistoryStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    if (project) {
      addToHistory(project.id);
    }
  }, [project, addToHistory]);

  // Handle reading progress bar tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!project) {
    notFound();
  }

  // Calculate word count and estimated reading time
  const docsText = `${project.longDescription || ""} ${project.readme || ""} ${project.features?.map(f => `${f.title} ${f.description}`).join(" ") || ""}`;
  const wordCount = docsText.trim().split(/\s+/).filter(Boolean).length;
  const readTimeMins = Math.max(1, Math.ceil(wordCount / 200));

  const sections = [
    { id: "overview", label: "Overview", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "features", label: "Key Features", icon: <Sparkles className="w-3.5 h-3.5" />, condition: project.features && project.features.length > 0 },
    { id: "tech-stack", label: "Tech Stack", icon: <Layers className="w-3.5 h-3.5" />, condition: project.techStack && project.techStack.length > 0 },
    { id: "readme", label: "Documentation", icon: <Code className="w-3.5 h-3.5" />, condition: !!project.readme },
    { id: "gallery", label: "Gallery Preview", icon: <Eye className="w-3.5 h-3.5" />, condition: project.images && project.images.length > 0 },
    { id: "timeline", label: "Timeline", icon: <Calendar className="w-3.5 h-3.5" />, condition: project.timeline && project.timeline.length > 0 },
    { id: "contributors", label: "Team / Contributors", icon: <Users className="w-3.5 h-3.5" />, condition: project.contributors && project.contributors.length > 0 }
  ].filter(s => s.condition !== false);

  const categoryGradients: Record<string, string> = {
    ai: "from-violet-500/10 via-purple-500/5 to-transparent",
    web: "from-blue-500/10 via-cyan-500/5 to-transparent",
    mobile: "from-emerald-500/10 via-teal-500/5 to-transparent",
  };
  const gradient = categoryGradients[project.category] || "from-gray-500/10 via-slate-500/5 to-transparent";

  const handleSectionScroll = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // Fixed navbar space offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen pb-32 bg-bg-primary/30 relative">
      {/* Absolute top linear reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-800/40 z-[60]">
        <motion.div 
          className="h-full bg-accent-blue origin-left"
          style={{ scaleX: scrollProgress / 100 }}
        />
      </div>

      {/* Hero Header Area */}
      <div className={cn("relative pt-32 pb-16 px-4 sm:px-6 md:px-8 bg-gradient-to-b", gradient)}>
        <div className="absolute inset-0 bg-bg-primary/90 opacity-95 -z-10" />
        <div className="max-w-[1400px] mx-auto">
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors mb-6 uppercase tracking-wider">
            <ArrowLeft className="w-3 h-3" /> Back to systems
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-glass-bg border border-glass-border">
                  <div className={cn("w-1.5 h-1.5 rounded-full", {
                    "bg-emerald-500 animate-pulse": project.status === "completed",
                    "bg-amber-500 animate-pulse": project.status === "in-progress",
                    "bg-rose-500": project.status === "archived",
                  })} />
                  <span className="text-[10px] font-mono font-bold capitalize text-text-primary">{project.status.replace('-', ' ')}</span>
                </div>
                {project.version && (
                  <div className="px-2.5 py-1 rounded-full bg-glass-bg border border-glass-border text-[10px] font-mono font-medium text-text-secondary">
                    {project.version}
                  </div>
                )}
                <div className="px-2.5 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-[10px] font-mono font-bold text-accent-blue uppercase tracking-wider">
                  {project.category}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-3 tracking-tight">
                {project.name}
              </h1>
              <p className="text-base text-text-secondary max-w-2xl font-medium leading-relaxed">
                {project.tagline}
              </p>
            </div>
            
            <div className="flex items-center gap-3 relative z-10">
              {project.githubUrl && (
                <GlassButton variant="secondary" size="sm" className="gap-2 text-xs font-semibold border-glass-border" onClick={() => window.open(project.githubUrl, '_blank')}>
                  <Code className="w-3.5 h-3.5" /> Source Code
                </GlassButton>
              )}
              {project.liveUrl && (
                <GlassButton variant="primary" size="sm" className="gap-2 text-xs font-semibold" onClick={() => window.open(project.liveUrl, '_blank')}>
                  <ExternalLink className="w-3.5 h-3.5" /> Live Deploy
                </GlassButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Documentation portal grid layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Sticky directory navigation tree */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-[100px] space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto pr-2 scrollbar-none">
            <div className="text-[10px] uppercase font-mono tracking-widest text-text-muted select-none font-bold px-3">
              Documentation Map
            </div>
            <div className="flex flex-col gap-0.5 border-l border-divider/60 ml-3.5 pl-3">
              {sections.map((sec) => {
                const isCurrent = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleSectionScroll(sec.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all relative",
                      isCurrent 
                        ? "text-accent-blue bg-accent-blue/5 border-l-2 border-accent-blue -ml-[15px] pl-3.5" 
                        : "text-text-secondary hover:text-text-primary hover:bg-neutral-200/20 dark:hover:bg-white/5"
                    )}
                  >
                    {sec.icon}
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Center Panel: Full details content sections */}
          <main className="col-span-1 lg:col-span-6 space-y-16">
            
            {/* 1. Overview */}
            <section id="overview" className="scroll-mt-28">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-serif font-bold text-text-primary tracking-tight">Overview</h2>
                </div>
                <GlassCard className="p-6 sm:p-8 bg-glass-bg border border-glass-border [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <div className="text-text-secondary leading-relaxed text-sm font-medium whitespace-pre-line">
                    {project.longDescription}
                  </div>
                </GlassCard>
              </motion.div>
            </section>

            {/* 2. Key Features */}
            {project.features && project.features.length > 0 && (
              <section id="features" className="scroll-mt-28">
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <h2 className="text-xl font-serif font-bold text-text-primary tracking-tight mb-4">Key Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feature, i) => (
                      <GlassCard key={i} className="p-5 flex flex-col gap-1 border border-glass-border hover:border-glass-border-hover">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">{feature.title}</h3>
                        <p className="text-xs text-text-secondary leading-relaxed mt-1 font-medium">{feature.description}</p>
                      </GlassCard>
                    ))}
                  </div>
                </motion.div>
              </section>
            )}

            {/* 3. Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <section id="tech-stack" className="scroll-mt-28">
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <h2 className="text-xl font-serif font-bold text-text-primary tracking-tight mb-4">Tech Stack</h2>
                  <GlassCard className="p-6 border border-glass-border">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <div key={i} className="px-3 py-1.5 rounded-lg bg-glass-bg border border-glass-border text-xs font-mono font-semibold text-text-primary hover:border-glass-border-hover transition-colors select-none">
                          {tech.name}
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              </section>
            )}

            {/* 4. README Markdown Experience */}
            {project.readme && (
              <section id="readme" className="scroll-mt-28">
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-serif font-bold text-text-primary tracking-tight">README.md Documentation</h2>
                  </div>
                  <GlassCard className="p-6 sm:p-8 overflow-x-auto border border-glass-border relative">
                    {/* Copy Markdown shortcut */}
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(project.readme || "");
                        alert("README Markdown copied to clipboard!");
                      }}
                      className="absolute top-4 right-4 px-2.5 py-1 rounded bg-bg-secondary hover:bg-glass-bg border border-glass-border text-[10px] font-mono font-bold text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Copy Raw
                    </button>
                    <div className="markdown-body text-sm font-medium leading-relaxed max-w-full">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                        {project.readme}
                      </ReactMarkdown>
                    </div>
                  </GlassCard>
                </motion.div>
              </section>
            )}

            {/* 5. Gallery Grid */}
            {project.images && project.images.length > 0 && (
              <section id="gallery" className="scroll-mt-28">
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <h2 className="text-xl font-serif font-bold text-text-primary tracking-tight mb-4">System Previews</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((img, i) => (
                      <div 
                        key={i} 
                        className="aspect-video relative rounded-xl overflow-hidden cursor-zoom-in bg-glass-bg border border-glass-border group" 
                        onClick={() => setLightboxImage(img.src)}
                      >
                        <img 
                          src={img.src} 
                          alt={img.alt || `Preview ${i}`} 
                          className="w-full h-full object-cover opacity-70 group-hover:scale-102 group-hover:opacity-95 transition-all duration-500" 
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </section>
            )}

            {/* 6. Timeline */}
            {project.timeline && project.timeline.length > 0 && (
              <section id="timeline" className="scroll-mt-28">
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <h2 className="text-xl font-serif font-bold text-text-primary tracking-tight mb-4">Timeline</h2>
                  <div className="relative pl-6 border-l border-divider/60 ml-2 space-y-6">
                    {project.timeline.map((item, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-bg-primary border-2 border-accent-blue" />
                        <div className="text-[10px] font-mono text-text-muted font-bold uppercase">{new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                        <h3 className="text-sm font-bold text-text-primary mt-0.5">{item.title}</h3>
                        <p className="text-xs text-text-secondary mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </section>
            )}

            {/* 7. Team & Contributors */}
            {project.contributors && project.contributors.length > 0 && (
              <section id="contributors" className="scroll-mt-28">
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <h2 className="text-xl font-serif font-bold text-text-primary tracking-tight mb-4">Contributors</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {project.contributors.map((user, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-glass-bg border border-glass-border flex items-center gap-3">
                        <img 
                          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0b0f19&color=fff`} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full border border-divider" 
                        />
                        <div>
                          <div className="text-xs font-bold text-text-primary">{user.name}</div>
                          <div className="text-[10px] font-mono text-text-secondary mt-0.5 uppercase tracking-wider">{user.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </section>
            )}

          </main>

          {/* Right Panel: Sticky telemetry overview & read times */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-[100px] space-y-6">
            
            {/* Docs Telemetry Card */}
            <div className="text-[10px] uppercase font-mono tracking-widest text-text-muted select-none font-bold px-3">
              System Telemetry
            </div>

            <GlassCard className="p-5 border border-glass-border space-y-4">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-divider/60">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock className="w-3.5 h-3.5 text-accent-blue" />
                  <span className="font-semibold">Reading Time</span>
                </div>
                <span className="font-mono font-bold text-text-primary">{readTimeMins} min read</span>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-text-secondary flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-500" /> Stars</span>
                  <span className="font-bold text-text-primary">{project.stars || 0}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-text-secondary flex items-center gap-1.5"><GitFork className="w-3.5 h-3.5 text-text-muted" /> Forks</span>
                  <span className="font-bold text-text-primary">{project.forks || 0}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-text-secondary flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-accent-cyan" /> Views</span>
                  <span className="font-bold text-text-primary">{project.views || 0}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-text-secondary flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Completion</span>
                  <span className="font-mono font-bold text-emerald-400">{project.completionPercent}%</span>
                </div>
              </div>
            </GlassCard>

            {/* Platform Quick links */}
            <div className="p-4 rounded-xl bg-bg-secondary/40 border border-glass-border space-y-2">
              <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest select-none font-bold">Quick Actions</p>
              <div className="flex flex-col gap-1.5 pt-1">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-text-secondary hover:text-accent-blue transition-colors flex items-center justify-between py-1 border-b border-divider/40">
                    <span>Inspect Codebase</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-text-secondary hover:text-accent-blue transition-colors flex items-center justify-between py-1 border-b border-divider/40">
                    <span>Monitor Operations</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

          </aside>

        </div>
      </div>

      {/* Full Screen Lightbox Render */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <button className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" onClick={() => setLightboxImage(null)}>
              <X className="w-5 h-5" />
            </button>
            <img src={lightboxImage} alt="Fullscreen view" className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl border border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
