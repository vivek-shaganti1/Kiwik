"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ExternalLink, Star, GitFork, Eye, CheckCircle, X, ArrowLeft, Code } from "lucide-react";

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
  
  useEffect(() => {
    if (project) {
      addToHistory(project.id);
    }
  }, [project, addToHistory]);

  if (!project) {
    notFound();
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "tech-stack", label: "Tech Stack" },
    { id: "readme", label: "README" },
    { id: "gallery", label: "Gallery" },
    { id: "timeline", label: "Timeline" },
    { id: "changelog", label: "Changelog" },
    { id: "contributors", label: "Contributors" }
  ];

  const categoryGradients: Record<string, string> = {
    ai: "from-violet-500/20 via-purple-500/10 to-transparent",
    web: "from-blue-500/20 via-cyan-500/10 to-transparent",
    mobile: "from-emerald-500/20 via-teal-500/10 to-transparent",
  };
  const gradient = categoryGradients[project.category] || "from-gray-500/20 via-slate-500/10 to-transparent";

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <div className={cn("relative pt-32 pb-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b", gradient)}>
        <div className="absolute inset-0 bg-[var(--bg-primary)] opacity-80 -z-10" />
        
        <div className="max-w-5xl mx-auto">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to projects
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-glass-bg border border-glass-border">
                  <div className={cn("w-2 h-2 rounded-full", {
                    "bg-emerald-500": project.status === "completed",
                    "bg-amber-500": project.status === "in-progress",
                    "bg-rose-500": project.status === "archived",
                  })} />
                  <span className="text-sm font-medium capitalize text-text-primary">{project.status.replace('-', ' ')}</span>
                </div>
                {project.version && (
                  <div className="px-3 py-1 rounded-full bg-glass-bg border border-glass-border text-sm font-medium text-text-primary">
                    {project.version}
                  </div>
                )}
                <div className="px-3 py-1 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-sm font-medium text-[var(--accent)] capitalize">
                  {project.category}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{project.name}</h1>
              <p className="text-xl text-text-secondary max-w-2xl">{project.tagline}</p>
            </div>
            
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <GlassButton variant="secondary" size="md" className="gap-2" onClick={() => window.open(project.githubUrl, '_blank')}>
                  <Code className="w-4 h-4" /> Code
                </GlassButton>
              )}
              {project.liveUrl && (
                <GlassButton variant="primary" size="md" className="gap-2" onClick={() => window.open(project.liveUrl, '_blank')}>
                  <ExternalLink className="w-4 h-4" /> Live Site
                </GlassButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Nav */}
      <div className="sticky top-[72px] z-40 backdrop-blur-md border-y border-divider bg-bg-primary/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex overflow-x-auto scrollbar-hide py-3 gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeTab === tab.id ? "bg-glass-bg-hover text-text-primary border border-glass-border" : "text-text-secondary hover:text-text-primary hover:bg-glass-bg"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mt-12 space-y-24">
        {/* Overview */}
        <section id="overview" className="scroll-mt-32">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <GlassCard className="p-6 h-full">
                  <div className="text-text-secondary leading-relaxed">
                    {project.longDescription}
                  </div>
                </GlassCard>
              </div>
              <div className="space-y-4">
                <GlassCard className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-text-secondary"><Star className="w-5 h-5 text-yellow-500" /> Stars</div>
                  <span className="text-xl font-bold">{project.stars?.toLocaleString() || 0}</span>
                </GlassCard>
                <GlassCard className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-text-secondary"><GitFork className="w-5 h-5 text-gray-400" /> Forks</div>
                  <span className="text-xl font-bold">{project.forks?.toLocaleString() || 0}</span>
                </GlassCard>
                <GlassCard className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-text-secondary"><Eye className="w-5 h-5 text-blue-400" /> Views</div>
                  <span className="text-xl font-bold">{project.views?.toLocaleString() || 0}</span>
                </GlassCard>
                <GlassCard className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-text-secondary"><CheckCircle className="w-5 h-5 text-emerald-400" /> Completion</div>
                  <span className="text-xl font-bold">{project.completionPercent}%</span>
                </GlassCard>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <section id="features" className="scroll-mt-32">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <GlassCard key={i} className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-text-primary">{feature.title}</h3>
                    <p className="text-text-secondary">{feature.description}</p>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <section id="tech-stack" className="scroll-mt-32">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
              <GlassCard className="p-8">
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech, i) => (
                    <div key={i} className="px-4 py-2 rounded-lg bg-glass-bg border border-glass-border text-sm font-medium text-text-primary">
                      {tech.name}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </section>
        )}

        {/* README */}
        {project.readme && (
          <section id="readme" className="scroll-mt-32">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6">README.md</h2>
              <GlassCard className="p-8 overflow-hidden">
                <div className="markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {project.readme}
                  </ReactMarkdown>
                </div>
              </GlassCard>
            </motion.div>
          </section>
        )}

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <section id="gallery" className="scroll-mt-32">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.images.map((img, i) => (
                  <div key={i} className="aspect-video relative rounded-xl overflow-hidden cursor-pointer bg-glass-bg border border-glass-border group" onClick={() => setLightboxImage(img.src)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt || `Image ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setLightboxImage(null)}
            >
              <button className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" onClick={() => setLightboxImage(null)}>
                <X className="w-6 h-6" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightboxImage} alt="Fullscreen view" className="max-w-full max-h-full rounded-xl object-contain" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline */}
        {project.timeline && project.timeline.length > 0 && (
          <section id="timeline" className="scroll-mt-32">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6">Timeline</h2>
              <div className="relative pl-6 border-l border-divider space-y-8">
                {project.timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[var(--bg-primary)] border-2 border-emerald-500" />
                    <div className="text-sm text-text-secondary mb-1">{new Date(item.date).toLocaleDateString()}</div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-text-secondary">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Changelog */}
        {project.changelog && project.changelog.length > 0 && (
          <section id="changelog" className="scroll-mt-32">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6">Changelog</h2>
              <div className="space-y-4">
                {project.changelog.map((log, i) => (
                  <GlassCard key={i} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-glass-bg border border-glass-border text-sm font-medium text-text-primary">{log.version}</span>
                        <span className="text-sm text-text-secondary">{new Date(log.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {log.changes.map((change, j) => (
                        <li key={j} className="text-text-secondary flex items-start gap-2">
                          <span className="text-text-muted mt-1.5 text-[10px]">●</span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Contributors */}
        {project.contributors && project.contributors.length > 0 && (
          <section id="contributors" className="scroll-mt-32">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6">Contributors</h2>
              <div className="flex flex-wrap gap-6">
                {project.contributors.map((user, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} alt={user.name} className="w-16 h-16 rounded-full border-2 border-divider" />
                    <div className="text-center">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-text-secondary">{user.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
