"use client";
// ─────────────────────────────────────────────────────────────
// Kiwik.1 — Projects Store (Zustand + Persist)
// ─────────────────────────────────────────────────────────────

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import type { Project } from "@/types";
import { projects as defaultProjects } from "@/data/projects";

const categoryFallbacks: Record<string, string> = {
  ai: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  devops: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  payments: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
  research: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  automation: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
  saas: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
  web: "/images/kiwik-cover.jpg",
};

interface ProjectsState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (newOrder: Project[]) => void;
  movePriority: (id: string, direction: "up" | "down") => void;
  duplicateProject: (id: string) => void;
  resetToDefaults: () => void;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: defaultProjects,

      setProjects: (projects) => set({ projects }),

      addProject: (newProject) =>
        set((state) => ({
          projects: [newProject, ...state.projects],
        })),

      updateProject: (id, updated) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updated, lastUpdated: new Date().toISOString().split("T")[0] } : p
          ),
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),

      reorderProjects: (newOrder) => set({ projects: newOrder }),

      movePriority: (id, direction) =>
        set((state) => {
          const index = state.projects.findIndex((p) => p.id === id);
          if (index === -1) return state;

          const targetIndex = direction === "up" ? index - 1 : index + 1;
          if (targetIndex < 0 || targetIndex >= state.projects.length) return state;

          const updated = [...state.projects];
          const [movedItem] = updated.splice(index, 1);
          updated.splice(targetIndex, 0, movedItem);

          return { projects: updated };
        }),

      duplicateProject: (id) =>
        set((state) => {
          const target = state.projects.find((p) => p.id === id);
          if (!target) return state;

          const timestamp = Date.now();
          const duplicated: Project = {
            ...target,
            id: `proj-${timestamp}`,
            slug: `${target.slug}-copy-${timestamp.toString().slice(-4)}`,
            name: `${target.name} (Copy)`,
            createdAt: new Date().toISOString().split("T")[0],
            lastUpdated: new Date().toISOString().split("T")[0],
          };

          const index = state.projects.findIndex((p) => p.id === id);
          const updated = [...state.projects];
          updated.splice(index + 1, 0, duplicated);

          return { projects: updated };
        }),

      resetToDefaults: () => set({ projects: defaultProjects }),
    }),
    {
      name: "kiwik-projects-store-v2",
    }
  )
);

// SSR Hydration Helper Hook
export function useProjects() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const storeProjects = useProjectsStore((s) => s.projects);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const sanitizedProjects = (hasHydrated ? storeProjects : defaultProjects).map(p => {
    // If coverImage is empty, a broken local path, or invalid, auto-fix with valid default
    if (!p.coverImage || p.coverImage.startsWith("/images/criska-") || !p.coverImage.includes(".")) {
      const defaultP = defaultProjects.find(dp => dp.id === p.id || dp.slug === p.slug);
      return {
        ...p,
        coverImage: defaultP?.coverImage || categoryFallbacks[p.category] || "/images/kiwik-cover.jpg"
      };
    }
    return p;
  });

  return sanitizedProjects;
}
