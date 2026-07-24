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

export interface FloatingGalleryImage {
  id: string;
  url: string;
  title: string;
  linkUrl?: string;
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
  galleryImages: FloatingGalleryImage[];
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

export interface DeviceShowcaseCard {
  id: string;
  name: string;
  role: string;
  quote: string;
  tag: string;
  avatarUrl: string;
  frameOverlayUrl: string;
  accentColor: string;
  inputFields?: string[];
  ctaText?: string;
}

export interface DeviceShowcaseCMS {
  topBadgeText: string;
  cards: DeviceShowcaseCard[];
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface EarthShowcaseCMS {
  headline: string;
  description: string;
  earthImageUrl: string;
  stats: StatItem[];
}

export interface AIKnowledgeArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  lastUpdated: string;
}

export interface AIKnowledgeCMS {
  articles: AIKnowledgeArticle[];
}

export interface AnalyticsData {
  totalVisitors: number;
  projectClicks: Record<string, number>;
  searches: Array<{ query: string; count: number; timestamp: string }>;
  aiQueries: Array<{ prompt: string; count: number; timestamp: string }>;
  countryBreakdown: Array<{ country: string; flag: string; count: number }>;
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
  usedIn?: string[];
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

export interface ArchitectureNodeCMS {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  border: string;
  glow: string;
  badgeColor: string;
  badgeText: string;
  order: number;
}

export interface WhyCriskaPillCMS {
  id: string;
  text: string;
  iconName: string;
  order: number;
  visible: boolean;
}

export interface DashboardShowcaseCMS {
  sectionTitle: string;
  searchPlaceholder: string;
  kernelStatusText: string;
  systemCoreTechs: string[];
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
  deviceShowcase: DeviceShowcaseCMS;
  earthShowcase: EarthShowcaseCMS;
  architectureNodes: ArchitectureNodeCMS[];
  whyCriskaPills: WhyCriskaPillCMS[];
  dashboardShowcase: DashboardShowcaseCMS;
  aiKnowledge: AIKnowledgeCMS;
  analytics: AnalyticsData;
  pages: PageCMS[];
  media: MediaItem[];
  theme: ThemeCMS;
  seo: SEOMetadata;
  auditLogs: AuditLogEntry[];
  snapshots: VersionSnapshot[];
}
