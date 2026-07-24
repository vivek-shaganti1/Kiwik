"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useDocsStore } from "@/stores/docs-store";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsRightSidebar } from "@/components/docs/DocsRightSidebar";
import { DocsMarkdownRenderer } from "@/components/docs/DocsMarkdownRenderer";
import { DocsComponentPlayground } from "@/components/docs/DocsComponentPlayground";
import { DocsApiExplorer } from "@/components/docs/DocsApiExplorer";
import { DocsArchitectureDiagram } from "@/components/docs/DocsArchitectureDiagram";
import { DocsDatabaseViewer } from "@/components/docs/DocsDatabaseViewer";
import { DocsAiPanel } from "@/components/docs/DocsAiPanel";

function DocsMainContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const { categories, articles } = useDocsStore();
  
  // Default to 'introduction' if no slug query param is supplied
  const initialSlug = searchParams.get("slug") || "introduction";
  const [activeSlug, setActiveSlug] = useState(initialSlug);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Sync activeSlug from searchParams if query string changes
  useEffect(() => {
    const slugFromParam = searchParams.get("slug");
    if (slugFromParam && articles[slugFromParam]) {
      setActiveSlug(slugFromParam);
    }
  }, [searchParams, articles]);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("kiwik-docs-bookmarks");
        if (saved) setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed loading bookmarks:", e);
      }
    }
  }, []);

  // Keyboard Navigation Listeners ('/', 'G+P', 'G+D', 'G+A', etc.)
  useEffect(() => {
    let lastKey = "";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on '/'
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search documentation"]') as HTMLInputElement;
        searchInput?.focus();
        return;
      }

      // Quick Key combinations: G then P/D/A
      if (document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        const key = e.key.toLowerCase();
        if (lastKey === "g") {
          if (key === "p") {
            e.preventDefault();
            router.push("/projects");
          } else if (key === "d") {
            e.preventDefault();
            router.push("/docs");
          } else if (key === "a") {
            e.preventDefault();
            router.push("/admin");
          }
          lastKey = "";
          return;
        }
        if (key === "g") {
          lastKey = "g";
          setTimeout(() => { lastKey = ""; }, 1000);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const currentArticle = articles[activeSlug] || articles["introduction"] || Object.values(articles)[0];

  const handleSelectArticle = (slug: string) => {
    setActiveSlug(slug);
    router.push(`/docs?slug=${slug}`, { scroll: false });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleBookmark = () => {
    let updated: string[];
    if (bookmarks.includes(activeSlug)) {
      updated = bookmarks.filter(b => b !== activeSlug);
    } else {
      updated = [...bookmarks, activeSlug];
    }
    setBookmarks(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("kiwik-docs-bookmarks", JSON.stringify(updated));
    }
  };

  const handleScrollToSection = (id: string) => {
    setActiveSectionId(id);
    const elem = document.getElementById(id);
    elem?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenCommandPalette = () => {
    if (typeof window !== "undefined") {
      const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white px-4 sm:px-6 md:px-8 py-8 max-w-[1500px] mx-auto">
      
      {/* Top Hero Header */}
      <DocsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCommandPalette={handleOpenCommandPalette}
      />

      {/* Main 3-Column Desktop Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Navigation Sidebar */}
        <DocsSidebar
          categories={categories}
          activeSlug={activeSlug}
          onSelectArticle={handleSelectArticle}
          bookmarksCount={bookmarks.length}
        />

        {/* Center Main Content Deck */}
        <main className="flex-1 w-full min-w-0 bg-neutral-200/40 dark:bg-white/5 border border-slate-300/60 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-xl space-y-8">
          
          {/* Article Header */}
          <div className="space-y-3 border-b border-slate-300/40 dark:border-white/10 pb-6 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              {currentArticle.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold border border-indigo-500/20">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              {currentArticle.title}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-base font-semibold leading-relaxed">
              {currentArticle.subtitle}
            </p>
          </div>

          {/* Standard Markdown Content Sections */}
          <DocsMarkdownRenderer sections={currentArticle.sections} />

          {/* Interactive Component Playground (If Component Article) */}
          {currentArticle.componentSpec && (
            <DocsComponentPlayground
              componentName={currentArticle.componentSpec.componentName}
              description={currentArticle.componentSpec.description}
              props={currentArticle.componentSpec.props}
              variants={currentArticle.componentSpec.variants}
            />
          )}

          {/* Interactive API Explorer (If API Article) */}
          {currentArticle.apiEndpoints && (
            <DocsApiExplorer endpoints={currentArticle.apiEndpoints} />
          )}

          {/* Interactive Architecture Diagram (If Architecture Article) */}
          {currentArticle.architectureDiagrams && (
            <DocsArchitectureDiagram nodes={currentArticle.architectureDiagrams} />
          )}

          {/* Interactive Database Schema Browser (If Database Article) */}
          {currentArticle.databaseTables && (
            <DocsDatabaseViewer tables={currentArticle.databaseTables} />
          )}

        </main>

        {/* Right Info & Table of Contents Sidebar */}
        <DocsRightSidebar
          toc={currentArticle.toc}
          activeSectionId={activeSectionId}
          onSelectToc={handleScrollToSection}
          readingTimeMinutes={currentArticle.readingTimeMinutes}
          lastUpdated={currentArticle.lastUpdated}
          author={currentArticle.author}
          isBookmarked={bookmarks.includes(activeSlug)}
          onToggleBookmark={toggleBookmark}
          onOpenAiAssistant={() => setIsAiOpen(true)}
        />

      </div>

      {/* Embedded "Ask Kiwik AI" Panel Drawer */}
      <DocsAiPanel
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        currentArticle={currentArticle}
      />
    </div>
  );
}

export default function DocsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-sm font-mono text-indigo-400">
        Loading Documentation Deck...
      </div>
    }>
      <DocsMainContent />
    </Suspense>
  );
}
