"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DocCategory, DocArticle } from "@/types/docs-types";
import { docCategories as initialDocCategories, docArticles as initialDocArticles } from "@/data/docs-data";

interface DocsState {
  categories: DocCategory[];
  articles: Record<string, DocArticle>;
  
  // Category Actions
  setCategories: (categories: DocCategory[]) => void;
  addCategory: (category: DocCategory) => void;
  updateCategory: (id: string, updated: Partial<DocCategory>) => void;
  deleteCategory: (id: string) => void;
  reorderCategories: (newOrder: DocCategory[]) => void;
  
  // Article Actions
  setArticles: (articles: Record<string, DocArticle>) => void;
  addArticle: (article: DocArticle, categoryId: string) => void;
  updateArticle: (slug: string, updated: Partial<DocArticle>) => void;
  deleteArticle: (slug: string) => void;
  
  // Reset
  resetToDefaults: () => void;
}

export const useDocsStore = create<DocsState>()(
  persist(
    (set, get) => ({
      categories: initialDocCategories,
      articles: initialDocArticles,

      setCategories: (categories) => set({ categories }),

      addCategory: (newCategory) =>
        set((state) => ({
          categories: [...state.categories, newCategory],
        })),

      updateCategory: (id, updated) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === id ? { ...cat, ...updated } : cat
          ),
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== id),
        })),

      reorderCategories: (newOrder) => set({ categories: newOrder }),

      setArticles: (articles) => set({ articles }),

      addArticle: (newArticle, categoryId) =>
        set((state) => {
          const updatedArticles = { ...state.articles, [newArticle.slug]: newArticle };
          const updatedCategories = state.categories.map((cat) => {
            if (cat.id === categoryId) {
              const exists = cat.articles.some((a) => a.slug === newArticle.slug);
              if (!exists) {
                return {
                  ...cat,
                  articles: [
                    ...cat.articles,
                    {
                      id: newArticle.id,
                      slug: newArticle.slug,
                      title: newArticle.title,
                      iconName: newArticle.iconName || "FileText",
                      badge: newArticle.badge,
                    },
                  ],
                };
              }
            }
            return cat;
          });
          return { articles: updatedArticles, categories: updatedCategories };
        }),

      updateArticle: (slug, updated) =>
        set((state) => {
          const existing = state.articles[slug];
          if (!existing) return state;
          const merged = { ...existing, ...updated };
          const newSlug = updated.slug || slug;
          
          const updatedArticles = { ...state.articles };
          if (newSlug !== slug) {
            delete updatedArticles[slug];
          }
          updatedArticles[newSlug] = merged;

          const updatedCategories = state.categories.map((cat) => ({
            ...cat,
            articles: cat.articles.map((art) =>
              art.slug === slug
                ? { ...art, slug: newSlug, title: merged.title, iconName: merged.iconName || "FileText", badge: merged.badge }
                : art
            ),
          }));

          return { articles: updatedArticles, categories: updatedCategories };
        }),

      deleteArticle: (slug) =>
        set((state) => {
          const updatedArticles = { ...state.articles };
          delete updatedArticles[slug];

          const updatedCategories = state.categories.map((cat) => ({
            ...cat,
            articles: cat.articles.filter((art) => art.slug !== slug),
          }));

          return { articles: updatedArticles, categories: updatedCategories };
        }),

      resetToDefaults: () =>
        set({
          categories: initialDocCategories,
          articles: initialDocArticles,
        }),
    }),
    {
      name: "kiwik-docs-store-v1",
    }
  )
);
