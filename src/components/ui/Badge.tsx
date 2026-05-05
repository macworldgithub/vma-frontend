import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'active';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
}

const styles: Record<BadgeVariant, string> = {
  success: 'bg-success-500/10 text-success-400 ring-success-500/20',
  warning: 'bg-warning-500/10 text-warning-400 ring-warning-500/20',
  error:   'bg-error-500/10 text-error-400 ring-error-500/20',
  info:    'bg-brand-500/10 text-brand-300 ring-brand-500/20',
  neutral: 'bg-neutral-700/50 text-neutral-400 ring-neutral-700/50',
  active:  'bg-accent-500/10 text-accent-400 ring-accent-500/20',
};

const dotStyles: Record<BadgeVariant, string> = {
  success: 'bg-success-400',
  warning: 'bg-warning-400',
  error:   'bg-error-400',
  info:    'bg-brand-400',
  neutral: 'bg-neutral-400',
  active:  'bg-accent-400',
};

export function Badge({ variant, children, dot }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ring-1 ${styles[variant]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]} ${variant === 'active' ? 'animate-pulse' : ''}`} />}
      {children}
    </span>
  );
}
