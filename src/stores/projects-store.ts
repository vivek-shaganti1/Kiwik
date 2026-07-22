"use client";
// ─────────────────────────────────────────────────────────────
// Kiwik.1 — Projects Store (Zustand + Persist)
// ─────────────────────────────────────────────────────────────

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import type { Project } from "@/types";
import { projects as defaultProjects } from "@/data/projects";

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
      name: "kiwik-projects-store",
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

  return hasHydrated ? storeProjects : defaultProjects;
}
