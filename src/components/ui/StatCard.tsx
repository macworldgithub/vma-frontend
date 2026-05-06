import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: 'up' | 'down' | 'stable';
  trendLabel?: string;
}

const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };
const trendColor = { up: 'text-emerald-400', down: 'text-rose-400', stable: 'text-neutral-500' };

export function StatCard({ label, value, subtext, icon: Icon, iconColor = 'text-blue-400', trend, trendLabel }: StatCardProps) {
  const TrendIcon = trend ? trendIcon[trend] : null;
  return (
    <div className="card p-5 flex flex-col gap-3 hover:border-neutral-700 transition-colors duration-150">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{label}</span>
        <div className={`p-2 rounded-lg bg-neutral-800 ${iconColor}`}>
          <Icon size={16} />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-neutral-100">{value}</div>
        {subtext && <div className="text-xs text-neutral-500 mt-0.5">{subtext}</div>}
      </div>
      {trend && TrendIcon && trendLabel && (
        <div className={`flex items-center gap-1 text-xs ${trendColor[trend]}`}>
          <TrendIcon size={12} />
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
