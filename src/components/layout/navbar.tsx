'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './theme-switcher';

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Capabilities', href: '/#capabilities' },
    { label: 'How We Work', href: '/#how-we-work' },
    { label: 'Admin', href: '/admin', isBadge: true }
  ];

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 transition-all duration-500 pt-4">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          'w-full transition-all duration-500 border border-glass-border backdrop-blur-xl flex items-center justify-between px-6 relative',
          scrolled 
            ? 'max-w-[950px] h-[58px] rounded-full bg-glass-bg/90 shadow-lg border-white/10' 
            : 'max-w-[1250px] h-[64px] rounded-2xl bg-glass-bg/65 shadow-md border-white/5'
        )}
      >
        {/* Left Side: Brand Logo and Title */}
        <Link href="/" className="flex items-center gap-2.5 group relative z-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-7 h-7 flex items-center justify-center overflow-hidden rounded-lg bg-bg-secondary/40 border border-glass-border group-hover:border-glass-border-hover transition-colors"
          >
            <img src="/logo.png" alt="Kiwik Logo" className="w-5 h-5 object-contain" style={{ imageRendering: "auto" }} />
          </motion.div>
          <span className="text-base font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary via-text-primary to-text-secondary group-hover:opacity-85 transition-opacity tracking-tight">
            Kiwik.1
          </span>
        </Link>

        {/* Center: Desktop Menu Navigation with Layout Animation */}
        <nav className="hidden md:flex items-center gap-1.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          {navItems.map((item) => {
            const isActive = item.href === '/' 
              ? pathname === '/' 
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[11px] font-semibold px-3 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5",
                  isActive 
                    ? "text-text-primary" 
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-neutral-200/50 dark:bg-white/10 rounded-full z-[-1] border border-black/5 dark:border-white/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.isBadge && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Search and ThemeSwitcher Actions */}
        <div className="hidden md:flex items-center gap-3 relative z-10">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-200/20 dark:bg-white/5 border border-glass-border hover:bg-neutral-200/40 dark:hover:bg-white/10 transition-all duration-300 text-xs text-text-secondary hover:text-text-primary group"
          >
            <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>Search...</span>
            <kbd className="ml-2 hidden sm:flex items-center gap-0.5 font-sans text-[10px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded border border-black/5 dark:border-white/5">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
          
          <ThemeSwitcher />

          <button
            onClick={() => alert("Demonstration requested successfully. We will follow up shortly!")}
            className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-blue hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-sm"
          >
            <span>Request a Demo</span>
          </button>
        </div>

        {/* Mobile menu triggers */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-neutral-200/20 dark:hover:bg-white/5 transition-colors relative z-10 border border-transparent hover:border-glass-border"
          aria-label="Toggle Navigation Drawer"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Mobile Menu Slide-out Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-[110%] left-0 right-0 p-4 rounded-2xl bg-glass-bg border border-glass-border backdrop-blur-2xl md:hidden flex flex-col gap-2 shadow-2xl z-50"
            >
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl hover:bg-neutral-200/40 dark:hover:bg-white/5 transition-colors text-xs font-semibold text-text-primary flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  {item.isBadge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </Link>
              ))}
              <div className="px-4 py-2 border-t border-divider mt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary">Theme</span>
                <ThemeSwitcher />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
