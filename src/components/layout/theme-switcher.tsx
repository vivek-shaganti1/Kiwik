'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette, Check } from 'lucide-react';
import { useThemeStore } from '@/stores/theme-store';
import { cn } from '@/lib/utils';
import { AccentColor } from '@/types';

const accents: { value: AccentColor; label: string; colorClass: string }[] = [
  { value: 'blue', label: 'Blue', colorClass: 'bg-blue-500' },
  { value: 'violet', label: 'Violet', colorClass: 'bg-violet-500' },
  { value: 'emerald', label: 'Emerald', colorClass: 'bg-emerald-500' },
  { value: 'orange', label: 'Orange', colorClass: 'bg-orange-500' },
  { value: 'crimson', label: 'Crimson', colorClass: 'bg-rose-600' },
  { value: 'cyan', label: 'Cyan', colorClass: 'bg-cyan-500' },
  { value: 'white', label: 'White', colorClass: 'bg-white border border-neutral-200 dark:border-neutral-800' },
];

export function ThemeSwitcher() {
  const { mode, accent, toggleMode, setAccent } = useThemeStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={toggleMode}
        className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {mode === 'dark' ? (
            <motion.div
              key="dark"
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="light"
              initial={{ y: -20, opacity: 0, rotate: 90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Choose accent color"
        >
          <Palette className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)} 
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute right-0 top-full mt-2 p-3 w-48 rounded-2xl bg-glass-bg border border-glass-border z-50 flex flex-wrap gap-2 justify-center shadow-xl backdrop-blur-xl"
              >
                {accents.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setAccent(item.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110",
                      item.colorClass,
                      accent === item.value && "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-black ring-neutral-400 dark:ring-neutral-500"
                    )}
                    aria-label={`Select ${item.label} accent`}
                  >
                    {accent === item.value && (
                      <Check className={cn("w-4 h-4", item.value === 'white' ? 'text-black' : 'text-white')} />
                    )}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
