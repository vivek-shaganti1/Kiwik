// Kiwik.1 Enterprise Website CMS Data Types & Schemas

export interface WebsiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  copyrightText: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  version: string;
  defaultLanguage: string;
  availableLanguages: string[];
}

export interface HeroMetric {
  id: string;
  val: number;
  suffix: string;
  label: string;
  decimals: number;
}

export interface HeroButton {
  id: string;
  text: string;
  link: string;
  variant: "primary" | "secondary" | "glass" | "outline";
  iconName: string;
  visible: boolean;
}

export interface HeroCMS {
  versionBadge: string;
  headlinePrefix: string;
  headlineHighlightWord: string;
  rotatingWords: string[];
  description: string;
  primaryButton: HeroButton;
  secondaryButton: HeroButton;
  metrics: HeroMetric[];
  orbLogoUrl: string;
  orbTitle: string;
  backgroundIntensity: "low" | "medium" | "high";
  animationSpeedSeconds: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  iconName?: string;
  badge?: string;
  target?: "_self" | "_blank";
  order: number;
  visible: boolean;
}

export interface NavigationCMS {
  logoText: string;
  logoUrl: string;
  items: NavigationItem[];
  ctaButtonText: string;
  ctaButtonHref: string;
  ctaButtonVisible: boolean;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
  badge?: string;
  target?: "_self" | "_blank";
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName: string;
}

export interface FooterCMS {
  columns: FooterColumn[];
  socialLinks: SocialLink[];
  copyrightText: string;
  newsletterHeadline: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  policyBadges: string[];
}

export interface FeaturedSectionCMS {
  title: string;
  subtitle: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface CapabilitiesCMS {
  sectionTitle: string;
  items: CapabilityItem[];
}

export interface TrustItem {
  id: string;
  title: string;
  desc: string;
}

export interface TrustCMS {
  sectionTitle: string;
  items: TrustItem[];
}

export interface WorkflowStep {
  id: string;
  step: string;
  title: string;
  desc: string;
}

export interface HowWeWorkCMS {
  badge: string;
  sectionTitle: string;
  steps: WorkflowStep[];
}

export interface SectionBlock {
  id: string;
  type: "hero" | "features" | "stats" | "text" | "gallery" | "cta" | "custom";
  title: string;
  subtitle?: string;
  content: string;
  imageUrl?: string;
  buttonText?: string;
  buttonHref?: string;
  visible: boolean;
  order: number;
}

export interface PageCMS {
  id: string;
  slug: string;
  title: string;
  description: string;
  sections: SectionBlock[];
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  published: boolean;
  lastUpdated: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "svg" | "pdf" | "audio" | "document";
  sizeBytes: number;
  mimeType: string;
  dimensions?: { width: number; height: number };
  folder: string;
  tags: string[];
  createdAt: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accentBlue: string;
  accentCyan: string;
  accentIndigo: string;
  glassBgLight: string;
  glassBorderLight: string;
  glassBgDark: string;
  glassBorderDark: string;
}

export interface TypographyCMS {
  headingFont: string;
  bodyFont: string;
  monoFont: string;
  baseFontSizePx: number;
}

export interface ThemeCMS {
  mode: "system" | "light" | "dark";
  colors: ThemeColors;
  typography: TypographyCMS;
  glassBlurPx: number;
  borderRadiusPx: number;
  glowIntensity: "soft" | "medium" | "vibrant";
}

export interface SEOMetadata {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  openGraphImage: string;
  twitterHandle: string;
  canonicalDomain: string;
  robotsTxt: string;
  jsonLdSchema: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userRole: string;
  action: string;
  section: string;
  details: string;
  previousSnapshotId?: string;
}

export interface VersionSnapshot {
  id: string;
  timestamp: string;
  versionName: string;
  author: string;
  note: string;
  data: string;
}

export interface SiteCMSData {
  settings: WebsiteSettings;
  hero: HeroCMS;
  navigation: NavigationCMS;
  footer: FooterCMS;
  featuredSection: FeaturedSectionCMS;
  capabilities: CapabilitiesCMS;
  trust: TrustCMS;
  howWeWork: HowWeWorkCMS;
  pages: PageCMS[];
  media: MediaItem[];
  theme: ThemeCMS;
  seo: SEOMetadata;
  auditLogs: AuditLogEntry[];
  snapshots: VersionSnapshot[];
}
