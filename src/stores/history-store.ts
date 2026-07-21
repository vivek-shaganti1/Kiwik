"use client";
// ─────────────────────────────────────────────────────────────
// Kiwik.1 — Recently Viewed Store
// ─────────────────────────────────────────────────────────────

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HistoryState {
  history: string[];
  addToHistory: (projectId: string) => void;
  clearHistory: () => void;
}

const MAX_HISTORY = 20;

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (projectId) =>
        set((state) => {
          const filtered = state.history.filter((id) => id !== projectId);
          return { history: [projectId, ...filtered].slice(0, MAX_HISTORY) };
        }),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "kiwik-history",
    }
  )
);
