"use client";

import React, { useState } from "react";
import { 
  Rocket, Cpu, Folder, Box, Palette, Sliders, Globe, Database, 
  Compass, ChevronRight, Search, Bookmark, Command, Terminal, Sparkles
} from "lucide-react";
import type { DocCategory } from "@/types/docs-types";

interface DocsSidebarProps {
  categories: DocCategory[];
  activeSlug: string;
  onSelectArticle: (slug: string) => void;
  bookmarksCount: number;
}

const iconMap: Record<string, any> = {
  Rocket, Cpu, Folder, Box, Palette, Sliders, Globe, Database, Compass, Terminal, Sparkles
};

export function DocsSidebar({ categories, activeSlug, onSelectArticle, bookmarksCount }: DocsSidebarProps) {
  const [sidebarFilter, setSidebarFilter] = useState("");

  const filteredCategories = categories.map(cat => ({
    ...cat,
    articles: cat.articles.filter(art => 
      art.title.toLowerCase().includes(sidebarFilter.toLowerCase()) ||
      cat.name.toLowerCase().includes(sidebarFilter.toLowerCase())
    )
  })).filter(cat => cat.articles.length > 0);

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto pr-2 custom-scrollbar select-none text-left">
      {/* Search Filter Box */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
        <input
          type="text"
          placeholder="Filter navigation..."
          value={sidebarFilter}
          onChange={(e) => setSidebarFilter(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-black/60 border border-neutral-200/80 dark:border-white/15 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-white shadow-xs"
        />
      </div>

      {/* Bookmarks Quick Bar */}
      {bookmarksCount > 0 && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
          <div className="flex items-center gap-2">
            <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Saved Bookmarks</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-[10px]">{bookmarksCount}</span>
        </div>
      )}

      {/* Navigation Groups */}
      <div className="space-y-6">
        {filteredCategories.map((category) => {
          const CategoryIcon = iconMap[category.iconName] || Folder;

          return (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between px-2 text-xs font-mono font-bold tracking-wider text-neutral-900 dark:text-white uppercase">
                <div className="flex items-center gap-2">
                  <CategoryIcon className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                  <span>{category.name}</span>
                </div>
                {category.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 font-sans font-bold border border-neutral-200/80 dark:border-white/10">
                    {category.badge}
                  </span>
                )}
              </div>

              <div className="space-y-0.5 pl-2 border-l border-neutral-200/80 dark:border-white/10">
                {category.articles.map((art) => {
                  const isActive = art.slug === activeSlug;

                  return (
                    <button
                      key={art.id}
                      onClick={() => onSelectArticle(art.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold shadow-xs"
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium"
                      }`}
                    >
                      <span>{art.title}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-80" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Keyboard Shortcuts Legend */}
      <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-300/40 dark:border-white/10 space-y-2 text-left backdrop-blur-xl">
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          <Command className="w-3 h-3 text-indigo-500" />
          <span>Keyboard Shortcuts</span>
        </div>

        <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-semibold">
          <div className="flex justify-between items-center">
            <span>Focus Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-white/10 font-mono text-[10px] font-bold">/</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span>Command Palette</span>
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-white/10 font-mono text-[10px] font-bold">⌘K</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span>Projects</span>
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-white/10 font-mono text-[10px] font-bold">G P</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span>Documentation</span>
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-white/10 font-mono text-[10px] font-bold">G D</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span>Admin CMS</span>
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-white/10 font-mono text-[10px] font-bold">G A</kbd>
          </div>
        </div>
      </div>
    </aside>
  );
}
