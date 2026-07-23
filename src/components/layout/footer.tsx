"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  MessageSquare, 
  Activity, 
  Cpu, 
  ShieldCheck, 
  Terminal,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.002 3.002 0 0 0-2.11 2.108C0 8.029 0 12 0 12s0 3.971.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.475 20.455 12 20.455 12 20.455s7.524 0 9.388-.51a3.002 3.002 0 0 0 2.11-2.108C24 15.971 24 12 24 12s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

import { useSiteCMSStore } from "@/stores/site-cms-store";

export function Footer() {
  const footerCMS = useSiteCMSStore((state) => state.cms.footer);
  const settingsCMS = useSiteCMSStore((state) => state.cms.settings);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full mt-20 pt-16 pb-8 px-4 sm:px-6 md:px-8 border-t border-slate-300/40 dark:border-white/10 bg-[#f2f5f9]/90 dark:bg-[#06070a]/95 text-slate-600 dark:text-slate-300 relative z-20 backdrop-blur-md transition-colors"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Newsletter Banner */}
        <div className="p-6 md:p-8 rounded-2xl bg-neutral-200/50 dark:bg-white/5 border border-slate-300/40 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-inner relative overflow-hidden backdrop-blur-2xl">
          <div className="flex items-center gap-4 text-left mr-auto">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-slate-300/40 dark:border-white/10 text-accent-blue shrink-0">
              <Mail className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">
                {footerCMS.newsletterHeadline || "Stay in the Loop"}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 max-w-md font-semibold">
                {footerCMS.newsletterDescription || "Get product updates, launch notes, and insights directly in your inbox."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-3 w-full md:w-auto relative min-w-full sm:min-w-[360px] md:min-w-[400px]">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/80 dark:bg-white/5 border border-slate-300/60 dark:border-white/10 focus:outline-none focus:border-indigo-500 text-xs font-semibold text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/10 shrink-0 cursor-pointer"
            >
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Main Sitemap Grid (xl:grid-cols-7 resolves column wrapping) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-10 xl:gap-6 pb-14 border-b border-slate-300/40 dark:border-white/10">
          
          {/* Brand block (Col 1 & Col 2 span) */}
          <div className="md:col-span-3 xl:col-span-2 space-y-5 text-left pr-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-serif font-bold text-slate-800 dark:text-white tracking-tight">Kiwik.1</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm font-semibold">
              The operating system for digital products. Build, ship, document, and scale your ideas with engineering excellence.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-3 pt-2">
              <Link href="https://github.com/kiwik" target="_blank" className="w-8 h-8 rounded-full bg-white/5 hover:bg-neutral-200/50 dark:hover:bg-white/10 border border-slate-300/40 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <GithubIcon className="w-4 h-4" />
              </Link>
              <Link href="https://x.com/kiwik" target="_blank" className="w-8 h-8 rounded-full bg-white/5 hover:bg-neutral-200/50 dark:hover:bg-white/10 border border-slate-300/40 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <XIcon className="w-4 h-4" />
              </Link>
              <Link href="https://discord.gg/kiwik" target="_blank" className="w-8 h-8 rounded-full bg-white/5 hover:bg-neutral-200/50 dark:hover:bg-white/10 border border-slate-300/40 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <DiscordIcon className="w-4 h-4" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="w-8 h-8 rounded-full bg-white/5 hover:bg-neutral-200/50 dark:hover:bg-white/10 border border-slate-300/40 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <LinkedInIcon className="w-4 h-4" />
              </Link>
              <Link href="https://youtube.com" target="_blank" className="w-8 h-8 rounded-full bg-white/5 hover:bg-neutral-200/50 dark:hover:bg-white/10 border border-slate-300/40 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <YoutubeIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Product links list */}
          <div className="text-left space-y-3.5 col-span-1">
            <h5 className="text-[11px] font-mono tracking-widest text-slate-900 dark:text-white uppercase font-bold">Product</h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <li><Link href="/projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="#macos-dashboard-widget" className="hover:text-slate-900 dark:hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#capabilities-section" className="hover:text-slate-900 dark:hover:text-white transition-colors">Capabilities</Link></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Integrations</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Changelog</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Roadmap</span></li>
            </ul>
          </div>

          {/* Resources links list */}
          <div className="text-left space-y-3.5 col-span-1">
            <h5 className="text-[11px] font-mono tracking-widest text-slate-900 dark:text-white uppercase font-bold">Resources</h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Guides</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">API Reference</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Blog</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Showcase</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Templates</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Help Center</span></li>
            </ul>
          </div>

          {/* Company links list */}
          <div className="text-left space-y-3.5 col-span-1">
            <h5 className="text-[11px] font-mono tracking-widest text-slate-900 dark:text-white uppercase font-bold">Company</h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">About Kiwik</span></li>
              <li><Link href="#timeline-section" className="hover:text-slate-900 dark:hover:text-white transition-colors">How We Work</Link></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Careers</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Partners</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Contact Us</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Press Kit</span></li>
            </ul>
          </div>

          {/* Legal links list */}
          <div className="text-left space-y-3.5 col-span-1">
            <h5 className="text-[11px] font-mono tracking-widest text-slate-900 dark:text-white uppercase font-bold">Legal</h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Privacy Policy</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Terms of Service</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Cookie Policy</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Security</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Licenses</span></li>
              <li><span className="opacity-45 cursor-not-allowed text-slate-400">Compliance</span></li>
            </ul>
          </div>

          {/* Get in Touch Card */}
          <div className="p-5 rounded-2xl bg-neutral-200/40 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 flex flex-col gap-4 text-left min-w-[245px] backdrop-blur-xl md:col-span-3 xl:col-span-1">
            <h5 className="text-[11px] font-mono tracking-widest text-slate-900 dark:text-white uppercase font-bold">Get in Touch</h5>
            
            <div className="space-y-3.5">
              <div className="flex gap-2.5 items-start">
                <Mail className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <a href="mailto:hello@kiwik.one" className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">hello@kiwik.one</a>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">We usually reply within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start border-t border-slate-300/40 dark:border-white/10 pt-3">
                <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Kiwik HQ</span>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">Internet, Everywhere</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start border-t border-slate-300/40 dark:border-white/10 pt-3">
                <MessageSquare className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Live Support</span>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">Available Mon - Fri, 9AM - 6PM UTC</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Row Copyright & Telemetry Metrics */}
        <div className="pt-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-10">
          
          {/* Copyright block */}
          <div className="text-left space-y-1 select-none">
            <div className="text-xs font-bold text-slate-800 dark:text-white">© {new Date().getFullYear()} Kiwik Inc. All rights reserved.</div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-relaxed">
              Kiwik.1 — The Operating System for Digital Products. <br />
              Built with precision by the Kiwik Engineering Team.
            </p>
          </div>

          {/* Metrics grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 select-none flex-1 max-w-4xl w-full xl:w-auto">
            
            {/* Status metric */}
            <div className="text-left space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                <span>System Status</span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">All services running smoothly</p>
              <Link href="#macos-dashboard-widget" className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-flex items-center gap-0.5">
                <span>View status page</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>

            {/* Performance metric */}
            <div className="text-left space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                <Cpu className="w-3.5 h-3.5 text-amber-500" />
                <span>Performance</span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">99.9% uptime this month</p>
              <Link href="#macos-dashboard-widget" className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-flex items-center gap-0.5">
                <span>View metrics</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>

            {/* Security metric */}
            <div className="text-left space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Security</span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">SOC 2 Type II Compliant</p>
              <Link href="#macos-dashboard-widget" className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-flex items-center gap-0.5">
                <span>View security</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>

            {/* Made for developers */}
            <div className="text-left space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Made for developers</span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-relaxed">
                Designed with precision. <br />
                Engineered for scale.
              </p>
            </div>

          </div>

        </div>

      </div>
    </motion.footer>
  );
}
