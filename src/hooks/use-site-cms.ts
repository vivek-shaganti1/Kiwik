"use client";

import { useSiteCMSStore } from "@/stores/site-cms-store";

export function useSiteCMSData() {
  return useSiteCMSStore((state) => state.cms);
}

export function useHeroCMS() {
  return useSiteCMSStore((state) => state.cms.hero);
}

export function useNavigationCMS() {
  return useSiteCMSStore((state) => state.cms.navigation);
}

export function useFooterCMS() {
  return useSiteCMSStore((state) => state.cms.footer);
}

export function useThemeCMS() {
  return useSiteCMSStore((state) => state.cms.theme);
}

export function useSEOCMS() {
  return useSiteCMSStore((state) => state.cms.seo);
}

export function useMediaCMS() {
  return useSiteCMSStore((state) => state.cms.media);
}

export function useAuditLogs() {
  return useSiteCMSStore((state) => state.cms.auditLogs);
}

export function useSnapshots() {
  return useSiteCMSStore((state) => state.cms.snapshots);
}
