'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './theme-switcher';
import { Logo } from './logo';

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 h-[72px] flex items-center justify-center px-4 sm:px-6 md:px-8 transition-all duration-300',
        scrolled ? 'backdrop-blur-xl bg-glass-bg border-b border-glass-border shadow-sm' : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="w-full max-w-[1400px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-8 h-8 flex items-center justify-center overflow-hidden"
          >
            <img src="/logo.png" alt="Kiwik Logo" className="w-full h-full object-contain" style={{ imageRendering: "auto" }} />
          </motion.div>
          <span className="text-xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary group-hover:opacity-80 transition-opacity">
            Kiwik.1
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/projects" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/admin" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Admin
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors text-sm text-neutral-500 dark:text-neutral-400"
          >
            <Search className="w-4 h-4" />
            <span>Search...</span>
            <kbd className="ml-2 hidden sm:flex items-center gap-1 font-sans text-xs bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">
              <Command className="w-3 h-3" /> K
            </kbd>
          </button>
          
          <ThemeSwitcher />
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 p-4 sm:p-6 bg-glass-bg border-b border-glass-border backdrop-blur-xl md:hidden flex flex-col gap-4 shadow-xl"
          >
            <Link href="/" className="px-4 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors font-medium">
              Home
            </Link>
            <Link href="/projects" className="px-4 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors font-medium">
              Projects
            </Link>
            <Link href="/admin" className="px-4 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors font-medium flex items-center justify-between">
              <span>Admin Dashboard</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </Link>
            <div className="px-4 flex items-center justify-between">
              <span className="font-medium">Theme</span>
              <ThemeSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
