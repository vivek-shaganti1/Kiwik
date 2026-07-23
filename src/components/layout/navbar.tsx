'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command, Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './theme-switcher';
import { useSiteCMSStore } from '@/stores/site-cms-store';

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const pathname = usePathname();

  const navCMS = useSiteCMSStore((state) => state.cms.navigation);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = (navCMS.items || []).filter(item => item.visible !== false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      if (pathname === '/') {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <div className="fixed top-3 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'pointer-events-auto w-[92%] max-w-[1650px] h-[68px] sm:h-[72px] rounded-full transition-all duration-500 border flex items-center justify-between px-4 sm:px-6 relative select-none',
          scrolled 
            ? 'scale-[0.99] bg-white/95 dark:bg-[#07080B]/95 backdrop-blur-[28px] backdrop-saturate-[180%] border-black/[0.08] dark:border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.7)]' 
            : 'bg-white/95 dark:bg-[#07080B]/95 backdrop-blur-[24px] backdrop-saturate-[180%] border-black/[0.06] dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]'
        )}
      >
        {/* ─────────────────────────────────────────────────────────────
            DEDICATED LOGO CAPSULE SECTION ([ Rounded Icon ] Kiwik.1)
           ───────────────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-3 group relative z-10">
          <motion.div
            whileHover={{ scale: 1.04, rotate: 2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 border border-black/8 dark:border-white/15 shadow-sm flex items-center justify-center p-2.5 group-hover:border-blue-500/40 group-hover:shadow-md transition-all"
          >
            <img 
              src={navCMS.logoUrl || "/logo.png"} 
              alt="Kiwik Logo" 
              className="w-7 h-7 object-contain drop-shadow-sm group-hover:scale-105 transition-transform" 
            />
          </motion.div>
          <span className="text-2xl sm:text-[30px] font-serif font-bold text-[#111111] dark:text-white tracking-[-0.03em] group-hover:opacity-90 transition-opacity">
            {navCMS.logoText || "Kiwik.1"}
          </span>
        </Link>

        {/* ─────────────────────────────────────────────────────────────
            CENTER NAVIGATION LINKS (Inter 500, 15px, 48px Spacing)
           ───────────────────────────────────────────────────────────── */}
        <nav 
          onMouseLeave={() => setHoveredIndex(null)}
          className="hidden xl:flex items-center gap-8 lg:gap-10 z-10 px-4 flex-1 justify-center max-w-2xl mx-auto relative"
        >
          {navItems.map((item, idx) => {
            const normalizedHref = item.href.startsWith('#')
              ? (pathname === '/' ? item.href : `/${item.href}`)
              : item.href;

            const isActive = item.href === '/' 
              ? pathname === '/' 
              : item.href !== '/' && !item.href.startsWith('#') && pathname.startsWith(item.href);

            return (
              <motion.div
                key={item.id || item.href}
                whileHover={{ y: -2 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="relative"
              >
                <Link
                  href={normalizedHref}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative text-[15px] font-medium font-sans px-3 py-1.5 transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap select-none",
                    isActive 
                      ? "text-[#111111] dark:text-white font-semibold" 
                      : "text-[#444444] dark:text-neutral-300 hover:text-[#111111] dark:hover:text-white"
                  )}
                >
                  {/* Sliding Rounded Glass Hover Highlight */}
                  {hoveredIndex === idx && (
                    <motion.span
                      layoutId="hoverNavPill"
                      className="absolute inset-0 bg-neutral-200/60 dark:bg-white/10 rounded-full z-[-1] border border-black/5 dark:border-white/10 shadow-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}

                  {/* Active Page Tiny Glowing Dot Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {item.badge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT SIDE: SEARCH CAPSULE & PRIMARY "ASK KIWIK AI" CTA
           ───────────────────────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-3 relative z-10 flex-shrink-0">
          
          {/* Merged Search Capsule (Expands on Hover/Focus 200px -> 240px) */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
            className="w-[180px] lg:w-[200px] hover:w-[240px] focus:w-[240px] transition-all duration-300 h-10 px-3.5 rounded-full bg-neutral-100/90 dark:bg-white/10 border border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white group cursor-pointer shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-500 transition-colors" />
              <span className="font-sans font-medium text-[13px]">Search projects...</span>
            </div>
            <kbd className="hidden sm:flex items-center gap-0.5 font-sans text-[10px] font-bold bg-white dark:bg-white/10 px-1.5 py-0.5 rounded-md border border-black/5 dark:border-white/10 text-neutral-500 dark:text-neutral-300 shadow-2xs">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </motion.button>
          
          {/* Theme Switcher Button */}
          <ThemeSwitcher />

          {/* Primary CTA Button: Ask Kiwik AI */}
          {navCMS.ctaButtonVisible !== false && (
            <motion.div 
              whileHover={{ y: -2, scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href={navCMS.ctaButtonHref || "#ai"}
                onClick={(e) => handleNavClick(e, navCMS.ctaButtonHref || "#ai")}
                className="h-[46px] px-6 rounded-full bg-gradient-to-b from-white to-neutral-100 dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 border border-black/10 dark:border-white/20 text-[#111111] dark:text-white text-xs font-bold font-sans flex items-center gap-2 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(59,130,246,0.35)] hover:shadow-blue-500/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-200 animate-pulse" />
                <span>{navCMS.ctaButtonText || "Ask Kiwik AI"}</span>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Hamburger Drawer Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2.5 rounded-full hover:bg-neutral-200/50 dark:hover:bg-white/10 transition-colors relative z-10 cursor-pointer text-neutral-800 dark:text-white"
          aria-label="Toggle Navigation Drawer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute top-full inset-x-0 mt-3 p-5 rounded-3xl bg-white/95 dark:bg-[#0A0C12]/95 border border-black/10 dark:border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 xl:hidden overflow-hidden z-50"
            >
              {navItems.map((item) => {
                const normalizedHref = item.href.startsWith('#')
                  ? (pathname === '/' ? item.href : `/${item.href}`)
                  : item.href;

                return (
                  <Link
                    key={item.id || item.href}
                    href={normalizedHref}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, item.href);
                    }}
                    className="px-4 py-3 rounded-2xl hover:bg-neutral-100 dark:hover:bg-white/10 text-sm font-bold text-neutral-900 dark:text-white flex items-center justify-between transition-colors"
                  >
                    <span>{item.label}</span>
                    {item.badge && <span className="text-[10px] font-mono font-bold text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full">{item.badge}</span>}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.header>
    </div>
  );
}
