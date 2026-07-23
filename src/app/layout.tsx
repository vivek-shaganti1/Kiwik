import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/search/command-palette";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { IntroSplash } from "@/components/layout/intro-splash";

export const metadata: Metadata = {
  title: "Kiwik.1 — The Operating System for Digital Products",
  description:
    "Premium project showcase platform for Kiwik.1. Explore our portfolio of AI, web, mobile, and automation projects with immersive documentation and cinematic design.",
  keywords: ["Kiwik", "portfolio", "projects", "showcase", "glassmorphism", "system"],
  authors: [{ name: "Kiwik Engineering" }],
  openGraph: {
    title: "Kiwik.1 — The Operating System for Digital Products",
    description:
      "Premium project showcase platform for Kiwik.1. Explore our portfolio with cinematic design.",
    type: "website",
    url: "https://kiwik.one",
    siteName: "Kiwik.1",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiwik.1 — The Operating System for Digital Products",
    description:
      "Premium project showcase platform for Kiwik.1.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen flex flex-col"
        style={{
          fontFamily: "var(--font-sans)",
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <ThemeProvider>
          <IntroSplash />
          <CursorGlow />
          <Navbar />
          <CommandPalette />
          <main className="flex-1 pt-[72px]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
