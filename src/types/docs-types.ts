// ─────────────────────────────────────────────────────────────
// Kiwik.1 — Documentation Center Types
// ─────────────────────────────────────────────────────────────

export interface DocTocItem {
  id: string;
  title: string;
  level: number;
}

export interface ComponentPropSpec {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface ComponentVariantSpec {
  name: string;
  code: string;
  previewType: "button" | "badge" | "card" | "switch" | "slider" | "input" | "avatar" | "progress";
}

export interface ApiEndpointSpec {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  summary: string;
  description: string;
  headers?: { key: string; value: string; description?: string }[];
  params?: { name: string; type: string; required: boolean; description: string }[];
  requestBody?: string;
  responseBody: string;
  curlExample: string;
}

export interface DatabaseTableSpec {
  name: string;
  description: string;
  columns: { name: string; type: string; pk?: boolean; fk?: string; nullable?: boolean; description: string }[];
  indexes?: string[];
}

export interface ArchitectureDiagramNode {
  id: string;
  label: string;
  layer: "frontend" | "backend" | "database" | "auth" | "edge" | "ai";
  description: string;
  tech: string[];
}

export interface DocArticleSection {
  id: string;
  heading: string;
  bodyMarkdown: string;
  callout?: {
    type: "note" | "warning" | "tip" | "important";
    title?: string;
    message: string;
  };
  codeBlock?: {
    language: string;
    filename?: string;
    code: string;
  };
}

export interface DocArticle {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  subtitle: string;
  iconName?: string;
  badge?: string;
  readingTimeMinutes: number;
  lastUpdated: string;
  author: string;
  tags: string[];
  toc: DocTocItem[];
  sections: DocArticleSection[];
  apiEndpoints?: ApiEndpointSpec[];
  componentSpec?: {
    componentName: string;
    description: string;
    props: ComponentPropSpec[];
    variants: ComponentVariantSpec[];
  };
  databaseTables?: DatabaseTableSpec[];
  architectureDiagrams?: ArchitectureDiagramNode[];
}

export interface DocCategory {
  id: string;
  name: string;
  iconName: string;
  badge?: string;
  articles: {
    id: string;
    slug: string;
    title: string;
    iconName?: string;
    badge?: string;
  }[];
}
