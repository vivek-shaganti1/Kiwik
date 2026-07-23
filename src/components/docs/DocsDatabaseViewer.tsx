"use client";

import React, { useState } from "react";
import { Database, Table, Key, Zap } from "lucide-react";
import type { DatabaseTableSpec } from "@/types/docs-types";

interface DocsDatabaseViewerProps {
  tables?: DatabaseTableSpec[];
}

export function DocsDatabaseViewer({ tables }: DocsDatabaseViewerProps) {
  const defaultTables: DatabaseTableSpec[] = [
    {
      name: "projects",
      description: "Stores portfolio project data, priority rank, status, tech stack, and markdown README.",
      columns: [
        { name: "id", type: "string", pk: true, description: "Unique project identifier" },
        { name: "slug", type: "string", description: "URL friendly slug (e.g. kiwik)" },
        { name: "name", type: "string", description: "Display title" },
        { name: "priority", type: "number", description: "Ordering priority rank integer" },
        { name: "status", type: "enum", description: "completed | in-progress | planned" },
        { name: "completionPercent", type: "number", description: "Progress 0-100%" },
        { name: "techStack", type: "jsonb", description: "Array of TechItem objects" }
      ],
      indexes: ["idx_slug_unique", "idx_priority_asc"]
    },
    {
      name: "site_cms_settings",
      description: "Stores website hero copy, navigation items, capabilities, and theme tokens.",
      columns: [
        { name: "id", type: "string", pk: true, description: "Single-row key 'global_cms'" },
        { name: "hero", type: "jsonb", description: "Hero badge, headline, rotating words" },
        { name: "navigation", type: "jsonb", description: "Navbar links and CTA buttons" },
        { name: "theme", type: "jsonb", description: "Color presets and glass blur specs" },
        { name: "updatedAt", type: "timestamp", description: "Last CMS edit timestamp" }
      ]
    }
  ];

  const dbTables = tables && tables.length > 0 ? tables : defaultTables;
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);

  const currentTable = dbTables[selectedTableIndex] || dbTables[0];

  return (
    <div className="space-y-6 my-8">
      {/* Table Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {dbTables.map((t, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTableIndex(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
              selectedTableIndex === idx
                ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20"
                : "bg-white/60 dark:bg-white/5 border border-slate-300/40 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-neutral-200 dark:hover:bg-white/10"
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>{t.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Table Schema Specs */}
      {currentTable && (
        <div className="rounded-3xl border border-slate-300/60 dark:border-white/10 overflow-hidden bg-neutral-200/40 dark:bg-white/5 backdrop-blur-xl shadow-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-300/40 dark:border-white/10 pb-4 space-y-1">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-500" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white font-mono">{currentTable.name}</h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{currentTable.description}</p>
          </div>

          {/* Columns Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-300/60 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl">
            <table className="w-full text-left text-xs font-semibold">
              <thead className="bg-slate-200/50 dark:bg-white/10 text-slate-900 dark:text-white uppercase font-mono text-[10px]">
                <tr>
                  <th className="px-4 py-3">Column Name</th>
                  <th className="px-4 py-3">Data Type</th>
                  <th className="px-4 py-3">Key</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300/40 dark:divide-white/10 text-slate-700 dark:text-slate-300">
                {currentTable.columns.map((c, idx) => (
                  <tr key={idx} className="hover:bg-neutral-200/40 dark:hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      {c.pk && <Key className="w-3 h-3 text-amber-500 shrink-0" />}
                      <span>{c.name}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-cyan-600 dark:text-cyan-400">{c.type}</td>
                    <td className="px-4 py-3 font-mono text-[10px] font-bold">
                      {c.pk ? <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">PRIMARY KEY</span> : "-"}
                    </td>
                    <td className="px-4 py-3">{c.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Indexes List */}
          {currentTable.indexes && currentTable.indexes.length > 0 && (
            <div className="space-y-2 pt-2">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Database Indexes
              </h5>
              <div className="flex gap-2 flex-wrap">
                {currentTable.indexes.map((idxName, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-slate-900 text-indigo-300 font-mono text-xs font-semibold">
                    {idxName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
