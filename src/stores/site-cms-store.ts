import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  SiteCMSData,
  WebsiteSettings,
  HeroCMS,
  NavigationCMS,
  NavigationItem,
  FooterCMS,
  FooterColumn,
  FeaturedSectionCMS,
  CapabilitiesCMS,
  CapabilityItem,
  TrustCMS,
  TrustItem,
  HowWeWorkCMS,
  WorkflowStep,
  PageCMS,
  MediaItem,
  ThemeCMS,
  SEOMetadata,
  AuditLogEntry,
  VersionSnapshot,
  HeroMetric
} from "@/types/site-cms-types";

const defaultCMSData: SiteCMSData = {
  settings: {
    siteName: "Kiwik.1",
    tagline: "The Operating System for Digital Products",
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    copyrightText: "© 2026 Kiwik Inc. All rights reserved.",
    contactEmail: "shagantivivekgoud@gmail.com",
    contactPhone: "+1 (800) 555-KIWIK",
    address: "San Francisco, CA & Remote Global",
    version: "1.0.0-beta",
    defaultLanguage: "en",
    availableLanguages: ["en", "es", "fr", "de", "ja"]
  },
  hero: {
    versionBadge: "Kiwik.1 v1.0.0-beta",
    headlinePrefix: "The Operating System",
    headlineHighlightWord: "for",
    rotatingWords: [
      "Digital Products.",
      "AI Platforms.",
      "Enterprise Apps.",
      "Automation.",
      "Research.",
      "Innovation.",
      "Developer Tools.",
      "Cloud Infrastructure."
    ],
    description:
      "Build. Ship. Document. Scale. Everything. Unified workspace for projects, documentation, deployments, analytics, and AI assistant layers.",
    primaryButton: {
      id: "btn-primary",
      text: "Explore Projects",
      link: "/projects",
      variant: "primary",
      iconName: "ArrowRight",
      visible: true
    },
    secondaryButton: {
      id: "btn-secondary",
      text: "Watch Overview",
      link: "#overview",
      variant: "secondary",
      iconName: "Play",
      visible: true
    },
    metrics: [
      { id: "m1", val: 24, suffix: "+", label: "Projects", decimals: 0 },
      { id: "m2", val: 1.2, suffix: "M+", label: "Visitors", decimals: 1 },
      { id: "m3", val: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
      { id: "m4", val: 42, suffix: "ms", label: "Latency", decimals: 0 }
    ],
    orbLogoUrl: "/logo.png",
    orbTitle: "KIWIK.1",
    backgroundIntensity: "medium",
    animationSpeedSeconds: 2.5
  },
  navigation: {
    logoText: "Kiwik.1",
    logoUrl: "/logo.png",
    items: [
      { id: "nav-1", label: "Projects", href: "/projects", iconName: "Folder", order: 1, visible: true },
      { id: "nav-2", label: "Capabilities", href: "#capabilities", iconName: "Cpu", order: 2, visible: true },
      { id: "nav-3", label: "How We Work", href: "#how-we-work", iconName: "Workflow", order: 3, visible: true },
      { id: "nav-4", label: "Docs", href: "/docs", iconName: "FileText", order: 4, visible: true },
      { id: "nav-5", label: "Admin CMS", href: "/admin", iconName: "Shield", badge: "CMS", order: 5, visible: true }
    ],
    ctaButtonText: "Ask Kiwik AI",
    ctaButtonHref: "#ai",
    ctaButtonVisible: true
  },
  featuredSection: {
    title: "Explore Kiwik Products",
    subtitle: "Understand what each product does, who it helps, its current status, and request real-time access. Fully synchronised with the Admin CMS panel."
  },
  capabilities: {
    sectionTitle: "Our Capabilities",
    items: [
      { id: "cap-1", title: "AI & Knowledge Systems", desc: "Semantic context vector indexing and voice transcription mappings.", iconName: "Sparkles" },
      { id: "cap-2", title: "Identity & Security Services", desc: "Secure OAuth authorization hooks and granular serverless database access rules.", iconName: "Shield" },
      { id: "cap-3", title: "Automation & Workflows", desc: "Event-driven edge action pipelines and cron automation routines.", iconName: "Workflow" },
      { id: "cap-4", title: "Cloud & DevOps Infrastructure", desc: "High-performance CDN setups, edge caching rules, and serverless builds.", iconName: "Cloud" }
    ]
  },
  trust: {
    sectionTitle: "Trust & Delivery",
    items: [
      { id: "tr-1", title: "Real products, real deployments", desc: "No vaporware. Complete and functional static components linked live." },
      { id: "tr-2", title: "Security first architecture", desc: "Built-in sanitization, credentials protection, and secure data routing." },
      { id: "tr-3", title: "Scalable systems designed for growth", desc: "Edge functions and database structures designed to handle production spikes." },
      { id: "tr-4", title: "Ongoing support and optimization", desc: "Continuous profiling of latency, edge cache ratios, and framework migrations." }
    ]
  },
  howWeWork: {
    badge: "Execution Workflow",
    sectionTitle: "How We Work",
    steps: [
      { id: "sw-1", step: "01", title: "Discover", desc: "We understand your goals, target architecture, and edge constraints." },
      { id: "sw-2", step: "02", title: "Design", desc: "We design high-fidelity components, micro-interactions, and interface flows." },
      { id: "sw-3", step: "03", title: "Build", desc: "We build with extreme quality, component reusability, and Next.js static engine speeds." },
      { id: "sw-4", step: "04", title: "Secure", desc: "We secure telemetry endpoints, Firestore rule configurations, and credentials." },
      { id: "sw-5", step: "05", title: "Operate", desc: "We monitor production latency, optimize edge hits, and provide continuous support." }
    ]
  },
  footer: {
    columns: [
      {
        id: "col-1",
        title: "Product",
        links: [
          { id: "fl-1", label: "Projects Ecosystem", href: "/projects" },
          { id: "fl-2", label: "Desktop Dashboard", href: "/#macos-dashboard-widget" },
          { id: "fl-3", label: "AI Assistant Panel", href: "/#ai" },
          { id: "fl-4", label: "Telemetry Engine", href: "/admin" }
        ]
      },
      {
        id: "col-2",
        title: "Documentation",
        links: [
          { id: "fl-5", label: "Getting Started", href: "/#docs" },
          { id: "fl-6", label: "Architecture Spec", href: "/#docs" },
          { id: "fl-7", label: "Kiwik CLI v2.0", href: "/#docs" },
          { id: "fl-8", label: "API Reference", href: "/#docs" }
        ]
      },
      {
        id: "col-3",
        title: "Company & Legal",
        links: [
          { id: "fl-9", label: "About Kiwik", href: "/#about" },
          { id: "fl-10", label: "Privacy Policy", href: "/privacy" },
          { id: "fl-11", label: "Terms of Service", href: "/terms" },
          { id: "fl-12", label: "Security & SOC 2", href: "/security" }
        ]
      }
    ],
    socialLinks: [
      { id: "soc-1", platform: "GitHub", url: "https://github.com/shagantivivekgoud", iconName: "Github" },
      { id: "soc-2", platform: "Twitter / X", url: "https://twitter.com", iconName: "Twitter" },
      { id: "soc-3", platform: "LinkedIn", url: "https://linkedin.com", iconName: "Linkedin" }
    ],
    copyrightText: "© 2026 Kiwik Inc. All rights reserved.",
    newsletterHeadline: "Stay Updated with Kiwik Releases",
    newsletterDescription: "Subscribe for new project updates, AI telemetry enhancements, and OS features.",
    newsletterButtonText: "Subscribe",
    policyBadges: ["SOC 2 TYPE II CERTIFIED", "256-BIT ENCRYPTION", "EDGE ACCELERATED"]
  },
  pages: [
    {
      id: "page-home",
      slug: "/",
      title: "Kiwik.1 - The Operating System for Digital Products",
      description: "Unified workspace for projects, documentation, deployments, analytics, and AI assistant layers.",
      sections: [
        {
          id: "sec-hero",
          type: "hero",
          title: "The Operating System for Digital Products",
          content: "Build. Ship. Document. Scale. Everything.",
          visible: true,
          order: 1
        }
      ],
      metaTitle: "Kiwik.1 | Operating System for Digital Products",
      metaDescription: "Unified workspace for projects, documentation, deployments, analytics, and AI assistant layers.",
      ogImage: "/images/og-kiwik.jpg",
      published: true,
      lastUpdated: new Date().toISOString()
    }
  ],
  media: [
    {
      id: "med-1",
      name: "Kiwik Logo",
      url: "/logo.png",
      type: "image",
      sizeBytes: 12400,
      mimeType: "image/png",
      folder: "Branding",
      tags: ["logo", "brand", "icon"],
      createdAt: new Date().toISOString()
    }
  ],
  theme: {
    mode: "system",
    colors: {
      primary: "#06070a",
      secondary: "#f2f5f9",
      accentBlue: "#3b82f6",
      accentCyan: "#06b6d4",
      accentIndigo: "#6366f1",
      glassBgLight: "rgba(255, 255, 255, 0.75)",
      glassBorderLight: "rgba(0, 0, 0, 0.08)",
      glassBgDark: "rgba(18, 20, 29, 0.75)",
      glassBorderDark: "rgba(255, 255, 255, 0.12)"
    },
    typography: {
      headingFont: "Playfair Display",
      bodyFont: "Inter",
      monoFont: "JetBrains Mono",
      baseFontSizePx: 16
    },
    glassBlurPx: 20,
    borderRadiusPx: 16,
    glowIntensity: "vibrant"
  },
  seo: {
    defaultTitle: "Kiwik.1 | Operating System for Digital Products",
    titleTemplate: "%s | Kiwik.1",
    defaultDescription: "Unified workspace for projects, documentation, deployments, analytics, and AI assistant layers.",
    defaultKeywords: ["Kiwik", "Operating System", "Developer Tools", "AI", "Projects"],
    openGraphImage: "/images/og-kiwik.jpg",
    twitterHandle: "@shagantivivekgoud",
    canonicalDomain: "https://kiwik-xi.vercel.app",
    robotsTxt: "User-agent: *\nAllow: /",
    jsonLdSchema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Kiwik.1 OS",
      operatingSystem: "Web",
      applicationCategory: "DeveloperApplication"
    })
  },
  auditLogs: [
    {
      id: "log-1",
      timestamp: new Date().toISOString(),
      userRole: "Super Admin",
      action: "INITIALIZE_CMS",
      section: "System",
      details: "Initialized Kiwik.1 Enterprise Website Content Management System"
    }
  ],
  snapshots: []
};

interface SiteCMSStoreState {
  cms: SiteCMSData;

  // Mutator functions
  updateSettings: (settings: Partial<WebsiteSettings>) => void;
  updateHero: (hero: Partial<HeroCMS>) => void;
  updateHeroRotatingWords: (words: string[]) => void;
  updateHeroMetric: (id: string, metric: Partial<HeroMetric>) => void;
  
  // Navigation Mutators
  updateNavigation: (nav: Partial<NavigationCMS>) => void;
  addNavItem: (item: NavigationItem) => void;
  updateNavItem: (id: string, item: Partial<NavigationItem>) => void;
  deleteNavItem: (id: string) => void;

  // Sections Mutators
  updateFeaturedSection: (sec: Partial<FeaturedSectionCMS>) => void;
  updateCapabilities: (cap: Partial<CapabilitiesCMS>) => void;
  addCapabilityItem: (item: CapabilityItem) => void;
  updateCapabilityItem: (id: string, item: Partial<CapabilityItem>) => void;
  deleteCapabilityItem: (id: string) => void;

  updateTrust: (tr: Partial<TrustCMS>) => void;
  addTrustItem: (item: TrustItem) => void;
  updateTrustItem: (id: string, item: Partial<TrustItem>) => void;
  deleteTrustItem: (id: string) => void;

  updateHowWeWork: (hww: Partial<HowWeWorkCMS>) => void;
  updateWorkflowStep: (id: string, step: Partial<WorkflowStep>) => void;

  // Footer & Theme Mutators
  updateFooter: (footer: Partial<FooterCMS>) => void;
  updateTheme: (theme: Partial<ThemeCMS>) => void;
  updateSEO: (seo: Partial<SEOMetadata>) => void;
  
  // Media Mutators
  addMediaItem: (item: MediaItem) => void;
  deleteMediaItem: (id: string) => void;
  
  // Snapshots & Rollback
  createSnapshot: (name: string, note?: string) => void;
  rollbackSnapshot: (snapshotId: string) => void;
  deleteSnapshot: (snapshotId: string) => void;
  
  // Audit Trail
  addAuditLog: (action: string, section: string, details: string) => void;

  // Import / Export JSON Backup
  exportJSONBackup: () => string;
  importJSONBackup: (jsonString: string) => boolean;
  resetCMSToDefaults: () => void;
}

export const useSiteCMSStore = create<SiteCMSStoreState>()(
  persist(
    (set, get) => ({
      cms: defaultCMSData,

      updateSettings: (partialSettings) => {
        set((state) => ({
          cms: { ...state.cms, settings: { ...state.cms.settings, ...partialSettings } }
        }));
        get().addAuditLog("UPDATE_SETTINGS", "Website Settings", "Updated website branding & general settings");
      },

      updateHero: (partialHero) => {
        set((state) => ({
          cms: { ...state.cms, hero: { ...state.cms.hero, ...partialHero } }
        }));
        get().addAuditLog("UPDATE_HERO", "Hero Section", "Updated Hero headlines, buttons, or parameters");
      },

      updateHeroRotatingWords: (words) => {
        set((state) => ({
          cms: { ...state.cms, hero: { ...state.cms.hero, rotatingWords: words } }
        }));
        get().addAuditLog("UPDATE_HERO_WORDS", "Hero Section", `Updated rotating phrases list (${words.length} phrases)`);
      },

      updateHeroMetric: (id, partialMetric) => {
        set((state) => ({
          cms: {
            ...state.cms,
            hero: {
              ...state.cms.hero,
              metrics: state.cms.hero.metrics.map((m) => (m.id === id ? { ...m, ...partialMetric } : m))
            }
          }
        }));
        get().addAuditLog("UPDATE_METRIC", "Hero Section", `Updated metric [${id}]`);
      },

      updateNavigation: (partialNav) => {
        set((state) => ({
          cms: { ...state.cms, navigation: { ...state.cms.navigation, ...partialNav } }
        }));
        get().addAuditLog("UPDATE_NAVIGATION", "Navigation", "Updated navbar settings");
      },

      addNavItem: (item) => {
        set((state) => ({
          cms: {
            ...state.cms,
            navigation: { ...state.cms.navigation, items: [...state.cms.navigation.items, item] }
          }
        }));
        get().addAuditLog("ADD_NAV_ITEM", "Navigation", `Added nav item [${item.label}]`);
      },

      updateNavItem: (id, partialItem) => {
        set((state) => ({
          cms: {
            ...state.cms,
            navigation: {
              ...state.cms.navigation,
              items: state.cms.navigation.items.map((item) => (item.id === id ? { ...item, ...partialItem } : item))
            }
          }
        }));
        get().addAuditLog("UPDATE_NAV_ITEM", "Navigation", `Updated nav item [${id}]`);
      },

      deleteNavItem: (id) => {
        set((state) => ({
          cms: {
            ...state.cms,
            navigation: {
              ...state.cms.navigation,
              items: state.cms.navigation.items.filter((item) => item.id !== id)
            }
          }
        }));
        get().addAuditLog("DELETE_NAV_ITEM", "Navigation", `Deleted nav item [${id}]`);
      },

      updateFeaturedSection: (sec) => {
        set((state) => ({
          cms: { ...state.cms, featuredSection: { ...state.cms.featuredSection, ...sec } }
        }));
        get().addAuditLog("UPDATE_FEATURED_SECTION", "Featured Products", "Updated section headline/subtitle");
      },

      updateCapabilities: (cap) => {
        set((state) => ({
          cms: { ...state.cms, capabilities: { ...state.cms.capabilities, ...cap } }
        }));
        get().addAuditLog("UPDATE_CAPABILITIES", "Capabilities", "Updated capabilities header");
      },

      addCapabilityItem: (item) => {
        set((state) => ({
          cms: {
            ...state.cms,
            capabilities: {
              ...state.cms.capabilities,
              items: [...state.cms.capabilities.items, item]
            }
          }
        }));
        get().addAuditLog("ADD_CAPABILITY", "Capabilities", `Added capability [${item.title}]`);
      },

      updateCapabilityItem: (id, item) => {
        set((state) => ({
          cms: {
            ...state.cms,
            capabilities: {
              ...state.cms.capabilities,
              items: state.cms.capabilities.items.map((c) => (c.id === id ? { ...c, ...item } : c))
            }
          }
        }));
        get().addAuditLog("UPDATE_CAPABILITY", "Capabilities", `Updated capability [${id}]`);
      },

      deleteCapabilityItem: (id) => {
        set((state) => ({
          cms: {
            ...state.cms,
            capabilities: {
              ...state.cms.capabilities,
              items: state.cms.capabilities.items.filter((c) => c.id !== id)
            }
          }
        }));
        get().addAuditLog("DELETE_CAPABILITY", "Capabilities", `Deleted capability [${id}]`);
      },

      updateTrust: (tr) => {
        set((state) => ({
          cms: { ...state.cms, trust: { ...state.cms.trust, ...tr } }
        }));
        get().addAuditLog("UPDATE_TRUST", "Trust & Delivery", "Updated trust header");
      },

      addTrustItem: (item) => {
        set((state) => ({
          cms: {
            ...state.cms,
            trust: {
              ...state.cms.trust,
              items: [...state.cms.trust.items, item]
            }
          }
        }));
        get().addAuditLog("ADD_TRUST", "Trust & Delivery", `Added trust item [${item.title}]`);
      },

      updateTrustItem: (id, item) => {
        set((state) => ({
          cms: {
            ...state.cms,
            trust: {
              ...state.cms.trust,
              items: state.cms.trust.items.map((t) => (t.id === id ? { ...t, ...item } : t))
            }
          }
        }));
        get().addAuditLog("UPDATE_TRUST_ITEM", "Trust & Delivery", `Updated trust item [${id}]`);
      },

      deleteTrustItem: (id) => {
        set((state) => ({
          cms: {
            ...state.cms,
            trust: {
              ...state.cms.trust,
              items: state.cms.trust.items.filter((t) => t.id !== id)
            }
          }
        }));
        get().addAuditLog("DELETE_TRUST_ITEM", "Trust & Delivery", `Deleted trust item [${id}]`);
      },

      updateHowWeWork: (hww) => {
        set((state) => ({
          cms: { ...state.cms, howWeWork: { ...state.cms.howWeWork, ...hww } }
        }));
        get().addAuditLog("UPDATE_HOW_WE_WORK", "How We Work", "Updated workflow header");
      },

      updateWorkflowStep: (id, step) => {
        set((state) => ({
          cms: {
            ...state.cms,
            howWeWork: {
              ...state.cms.howWeWork,
              steps: state.cms.howWeWork.steps.map((s) => (s.id === id ? { ...s, ...step } : s))
            }
          }
        }));
        get().addAuditLog("UPDATE_WORKFLOW_STEP", "How We Work", `Updated step [${id}]`);
      },

      updateFooter: (partialFooter) => {
        set((state) => ({
          cms: { ...state.cms, footer: { ...state.cms.footer, ...partialFooter } }
        }));
        get().addAuditLog("UPDATE_FOOTER", "Footer", "Updated footer columns, links, or copyright");
      },

      updateTheme: (partialTheme) => {
        set((state) => ({
          cms: { ...state.cms, theme: { ...state.cms.theme, ...partialTheme } }
        }));
        get().addAuditLog("UPDATE_THEME", "Theme Engine", "Updated colors, glass blur, or typography");
      },

      updateSEO: (partialSEO) => {
        set((state) => ({
          cms: { ...state.cms, seo: { ...state.cms.seo, ...partialSEO } }
        }));
        get().addAuditLog("UPDATE_SEO", "SEO Manager", "Updated SEO meta tags & schemas");
      },

      addMediaItem: (item) => {
        set((state) => ({
          cms: { ...state.cms, media: [item, ...state.cms.media] }
        }));
        get().addAuditLog("ADD_MEDIA", "Media Library", `Added asset [${item.name}]`);
      },

      deleteMediaItem: (id) => {
        set((state) => ({
          cms: { ...state.cms, media: state.cms.media.filter((m) => m.id !== id) }
        }));
        get().addAuditLog("DELETE_MEDIA", "Media Library", `Deleted media asset [${id}]`);
      },

      createSnapshot: (name, note = "") => {
        const snapshot: VersionSnapshot = {
          id: `snap-${Date.now()}`,
          timestamp: new Date().toISOString(),
          versionName: name,
          author: "Super Admin",
          note,
          data: JSON.stringify(get().cms)
        };
        set((state) => ({
          cms: { ...state.cms, snapshots: [snapshot, ...state.cms.snapshots] }
        }));
        get().addAuditLog("CREATE_SNAPSHOT", "Version Control", `Created snapshot [${name}]`);
      },

      rollbackSnapshot: (snapshotId) => {
        const snapshot = get().cms.snapshots.find((s) => s.id === snapshotId);
        if (!snapshot) return;
        try {
          const restoredCMS: SiteCMSData = JSON.parse(snapshot.data);
          set((state) => ({
            cms: {
              ...restoredCMS,
              snapshots: state.cms.snapshots,
              auditLogs: [
                {
                  id: `log-${Date.now()}`,
                  timestamp: new Date().toISOString(),
                  userRole: "Super Admin",
                  action: "ROLLBACK_SNAPSHOT",
                  section: "Version Control",
                  details: `Rolled back site to snapshot [${snapshot.versionName}]`
                },
                ...state.cms.auditLogs
              ]
            }
          }));
        } catch (err) {
          console.error("Failed to restore snapshot:", err);
        }
      },

      deleteSnapshot: (snapshotId) => {
        set((state) => ({
          cms: { ...state.cms, snapshots: state.cms.snapshots.filter((s) => s.id !== snapshotId) }
        }));
      },

      addAuditLog: (action, section, details) => {
        const log: AuditLogEntry = {
          id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          timestamp: new Date().toISOString(),
          userRole: "Super Admin",
          action,
          section,
          details
        };
        set((state) => ({
          cms: { ...state.cms, auditLogs: [log, ...state.cms.auditLogs.slice(0, 100)] }
        }));
      },

      exportJSONBackup: () => JSON.stringify(get().cms, null, 2),

      importJSONBackup: (jsonString) => {
        try {
          const parsed = JSON.parse(jsonString);
          if (parsed && parsed.settings && parsed.hero) {
            set({ cms: parsed });
            get().addAuditLog("IMPORT_BACKUP", "System Backup", "Restored site CMS from JSON backup");
            return true;
          }
        } catch (err) {
          console.error("Invalid backup JSON format", err);
        }
        return false;
      },

      resetCMSToDefaults: () => set({ cms: defaultCMSData })
    }),
    {
      name: "kiwik-site-cms-v1",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const useSiteCMS = () => useSiteCMSStore((state) => state.cms);
