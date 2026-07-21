"use client";
// ─────────────────────────────────────────────────────────────
// Kiwik.1 — Favorites Store
// ─────────────────────────────────────────────────────────────

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (projectId: string) => void;
  isFavorite: (projectId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (projectId) =>
        set((state) => ({
          favorites: state.favorites.includes(projectId)
            ? state.favorites.filter((id) => id !== projectId)
            : [...state.favorites, projectId],
        })),
      isFavorite: (projectId) => get().favorites.includes(projectId),
    }),
    {
      name: "kiwik-favorites",
    }
  )
);
