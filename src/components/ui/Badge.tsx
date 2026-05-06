import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'active';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
}

const styles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
  error:   'bg-rose-500/10 text-rose-400 ring-rose-500/20',
  info:    'bg-blue-500/10 text-blue-300 ring-blue-500/20',
  neutral: 'bg-slate-700/50 text-slate-400 ring-slate-700/50',
  active:  'bg-cyan-500/10 text-cyan-400 ring-cyan-500/20',
};

const dotStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  error:   'bg-rose-400',
  info:    'bg-blue-400',
  neutral: 'bg-slate-400',
  active:  'bg-cyan-400',
};

export function Badge({ variant, children, dot }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ring-1 ${styles[variant]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]} ${variant === 'active' ? 'animate-pulse' : ''}`} />}
      {children}
    </span>
  );
}
