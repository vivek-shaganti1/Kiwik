"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, X, Circle, ChevronRight, Sparkles } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   1. KiwikGlass — Low-level Frosted Glass Surface
   ───────────────────────────────────────────────────────────── */
export interface KiwikGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
  interactive?: boolean;
}

export const KiwikGlass = React.forwardRef<HTMLDivElement, KiwikGlassProps>(
  ({ className, blur = "md", glow = false, interactive = false, children, ...props }, ref) => {
    const blurClasses = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-bg-secondary/60 dark:bg-bg-secondary/70 border border-glass-border shadow-glass transition-all duration-300",
          blurClasses[blur],
          glow && "shadow-[0_0_30px_rgba(99,102,241,0.15)] border-accent/30",
          interactive && "hover:border-accent/40 hover:shadow-glass-lg hover:-translate-y-0.5",
          className
        )}
        {...props}
      >
        {/* Subtle top specular edge highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
        {children}
      </div>
    );
  }
);
KiwikGlass.displayName = "KiwikGlass";

/* ─────────────────────────────────────────────────────────────
   2. KiwikCard — OS Module Card
   ───────────────────────────────────────────────────────────── */
export interface KiwikCardProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: "default" | "success" | "warning" | "accent";
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  glowOnHover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export const KiwikCard = React.forwardRef<HTMLDivElement, KiwikCardProps>(
  (
    {
      className,
      title,
      subtitle,
      badge,
      badgeVariant = "default",
      headerAction,
      footer,
      glowOnHover = true,
      padding = "md",
      children,
      ...props
    },
    ref
  ) => {
    const paddingClasses = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={glowOnHover ? { y: -2, transition: { duration: 0.2 } } : undefined}
        className={cn(
          "group relative overflow-hidden rounded-2xl bg-bg-secondary/50 dark:bg-bg-secondary/75 border border-glass-border shadow-glass backdrop-blur-xl transition-all duration-300 hover:border-accent/35 hover:shadow-glass-lg",
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {/* Specular border accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {(title || badge || headerAction) && (
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-glass-border/60 pb-3">
            <div>
              {title && (
                <h3 className="text-base font-bold tracking-tight text-text-primary flex items-center gap-2">
                  {title}
                  {badge && <KiwikBadge variant={badgeVariant}>{badge}</KiwikBadge>}
                </h3>
              )}
              {subtitle && <p className="mt-0.5 text-xs text-text-secondary">{subtitle}</p>}
            </div>
            {headerAction && <div className="shrink-0">{headerAction}</div>}
          </div>
        )}

        {children}

        {footer && <div className="mt-4 border-t border-glass-border/60 pt-3">{footer}</div>}
      </motion.div>
    );
  }
);
KiwikCard.displayName = "KiwikCard";

/* ─────────────────────────────────────────────────────────────
   3. KiwikButton — Interactive OS Action Trigger
   ───────────────────────────────────────────────────────────── */
export interface KiwikButtonProps extends HTMLMotionProps<"button"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  glow?: boolean;
}

export const KiwikButton = React.forwardRef<HTMLButtonElement, KiwikButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      glow = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary:
        "bg-accent text-white font-semibold shadow-md shadow-accent/20 hover:brightness-110 active:brightness-95 border border-white/20",
      secondary:
        "bg-bg-tertiary/90 text-text-primary border border-glass-border hover:border-glass-border-hover hover:bg-bg-elevated",
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5 dark:hover:bg-white/10",
      outline:
        "bg-transparent text-text-primary border border-glass-border hover:border-accent hover:text-accent",
      danger:
        "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40",
      glass:
        "bg-white/10 dark:bg-white/5 backdrop-blur-md text-text-primary border border-white/15 hover:border-white/30 hover:bg-white/15",
    };

    const sizeClasses = {
      sm: "h-8 px-3 text-xs rounded-xl gap-1.5",
      md: "h-10 px-4 text-xs font-semibold rounded-xl gap-2",
      lg: "h-12 px-6 text-sm font-semibold rounded-2xl gap-2.5",
      icon: "h-9 w-9 p-0 rounded-xl flex items-center justify-center shrink-0",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center justify-center font-sans tracking-wide transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          variantClasses[variant],
          sizeClasses[size],
          glow && "shadow-[0_0_20px_rgba(99,102,241,0.4)]",
          className
        )}
        {...props}
      >
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      </motion.button>
    );
  }
);
KiwikButton.displayName = "KiwikButton";

/* ─────────────────────────────────────────────────────────────
   4. KiwikBadge — Status & Category Indicator
   ───────────────────────────────────────────────────────────── */
export interface KiwikBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "accent" | "danger" | "neutral";
  pulse?: boolean;
  icon?: React.ReactNode;
}

export const KiwikBadge: React.FC<KiwikBadgeProps> = ({
  className,
  variant = "default",
  pulse = false,
  icon,
  children,
  ...props
}) => {
  const variantClasses = {
    default: "bg-accent/10 text-accent border-accent/20",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    accent: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    danger: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    neutral: "bg-white/5 text-text-secondary border-glass-border",
  };

  const dotClasses = {
    default: "bg-accent",
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    accent: "bg-purple-400",
    danger: "bg-rose-400",
    neutral: "bg-slate-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border backdrop-blur-md select-none",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              dotClasses[variant]
            )}
          />
          <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", dotClasses[variant])} />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

/* ─────────────────────────────────────────────────────────────
   5. KiwikPanel — Section / Module Surface Container
   ───────────────────────────────────────────────────────────── */
export interface KiwikPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const KiwikPanel: React.FC<KiwikPanelProps> = ({
  className,
  badge,
  title,
  subtitle,
  action,
  children,
  ...props
}) => {
  return (
    <section className={cn("relative py-8 sm:py-12", className)} {...props}>
      {(title || badge) && (
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {badge && (
              <KiwikBadge variant="accent" pulse className="mb-2">
                {badge}
              </KiwikBadge>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1.5 text-sm text-text-secondary max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   6. KiwikInput — OS Form Field
   ───────────────────────────────────────────────────────────── */
export interface KiwikInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export const KiwikInput = React.forwardRef<HTMLInputElement, KiwikInputProps>(
  ({ className, icon, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full h-10 rounded-xl bg-bg-secondary/70 border border-glass-border px-3.5 text-xs text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 backdrop-blur-md",
            icon && "pl-10",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-[11px] font-medium text-red-400">{error}</p>}
      </div>
    );
  }
);
KiwikInput.displayName = "KiwikInput";

/* ─────────────────────────────────────────────────────────────
   7. KiwikSearch — Command Search Input Bar
   ───────────────────────────────────────────────────────────── */
export interface KiwikSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  shortcut?: string;
}

export const KiwikSearch = React.forwardRef<HTMLInputElement, KiwikSearchProps>(
  ({ className, value, onChange, onClear, shortcut = "⌘K", ...props }, ref) => {
    return (
      <div className={cn("relative w-full max-w-md", className)}>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder="Search projects, stack, docs..."
          className="w-full h-10 rounded-xl bg-bg-secondary/80 border border-glass-border pl-10 pr-16 text-xs text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition-all duration-200 backdrop-blur-xl"
          {...props}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {value && onClear ? (
            <button
              onClick={onClear}
              className="p-1 rounded-md text-text-tertiary hover:text-text-primary hover:bg-white/10 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-medium text-text-tertiary bg-white/5 border border-glass-border rounded-md select-none">
              {shortcut}
            </kbd>
          )}
        </div>
      </div>
    );
  }
);
KiwikSearch.displayName = "KiwikSearch";

/* ─────────────────────────────────────────────────────────────
   8. KiwikWindow — OS Desktop Window Shell Frame
   ───────────────────────────────────────────────────────────── */
export interface KiwikWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: React.ReactNode;
  controls?: boolean;
  statusBar?: React.ReactNode;
}

export const KiwikWindow: React.FC<KiwikWindowProps> = ({
  className,
  title = "Kiwik OS Workspace",
  icon,
  controls = true,
  statusBar,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-bg-secondary/70 border border-glass-border shadow-glass-lg backdrop-blur-2xl transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Titlebar */}
      <div className="h-10 px-4 bg-bg-tertiary/60 border-b border-glass-border flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          {controls && (
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
            </div>
          )}
          <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
            {icon && <span className="text-accent">{icon}</span>}
            <span>{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <KiwikBadge variant="neutral" className="text-[9px] py-0 px-2 font-mono">
            SYS OK
          </KiwikBadge>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-6">{children}</div>

      {/* Optional Statusbar */}
      {statusBar && (
        <div className="h-8 px-4 bg-bg-tertiary/40 border-t border-glass-border flex items-center justify-between text-[10px] text-text-tertiary">
          {statusBar}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   9. KiwikToolbar — Filter / Action Capsule Bar
   ───────────────────────────────────────────────────────────── */
export interface KiwikToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
}

export const KiwikToolbar: React.FC<KiwikToolbarProps> = ({
  className,
  leftActions,
  rightActions,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "p-2 rounded-2xl bg-bg-secondary/60 border border-glass-border backdrop-blur-xl shadow-glass flex flex-wrap items-center justify-between gap-3",
        className
      )}
      {...props}
    >
      {leftActions && <div className="flex items-center gap-2">{leftActions}</div>}
      {children}
      {rightActions && <div className="flex items-center gap-2">{rightActions}</div>}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   10. KiwikSidebar — OS Navigation Item
   ───────────────────────────────────────────────────────────── */
export interface KiwikSidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

export const KiwikSidebarItem: React.FC<KiwikSidebarItemProps> = ({
  icon,
  label,
  active = false,
  badge,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full h-10 px-3.5 rounded-xl flex items-center justify-between text-xs font-semibold transition-all duration-200 select-none cursor-pointer",
        active
          ? "bg-accent/15 text-accent border border-accent/25 shadow-sm"
          : "text-text-secondary hover:text-text-primary hover:bg-white/5 dark:hover:bg-white/10"
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className={cn("shrink-0", active ? "text-accent" : "text-text-tertiary")}>{icon}</span>
        <span>{label}</span>
      </div>
      {badge && <KiwikBadge variant={active ? "accent" : "neutral"}>{badge}</KiwikBadge>}
    </button>
  );
};

/* ─────────────────────────────────────────────────────────────
   11. KiwikStat — Telemetry KPI Metric Card
   ───────────────────────────────────────────────────────────── */
export interface KiwikStatProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  subtext?: string;
  className?: string;
}

export const KiwikStat: React.FC<KiwikStatProps> = ({
  label,
  value,
  change,
  trend = "up",
  icon,
  subtext,
  className,
}) => {
  return (
    <KiwikCard padding="sm" glowOnHover={false} className={cn("text-left", className)}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-text-secondary">{label}</span>
        {icon && <span className="p-1.5 rounded-lg bg-accent/10 text-accent">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-extrabold tracking-tight text-text-primary">{value}</span>
        {change && (
          <span
            className={cn(
              "text-[10px] font-semibold px-1.5 py-0.5 rounded-md",
              trend === "up" && "bg-emerald-500/10 text-emerald-400",
              trend === "down" && "bg-rose-500/10 text-rose-400",
              trend === "neutral" && "bg-white/5 text-text-tertiary"
            )}
          >
            {change}
          </span>
        )}
      </div>
      {subtext && <p className="mt-1 text-[11px] text-text-tertiary">{subtext}</p>}
    </KiwikCard>
  );
};
