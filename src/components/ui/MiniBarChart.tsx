import React from 'react';

interface BarChartProps {
  data: { label: string; value: number; value2?: number }[];
  height?: number;
  color?: string;
  color2?: string;
  showLabels?: boolean;
}

export function MiniBarChart({ data, height = 80, color = '#007be8', color2, showLabels = true }: BarChartProps) {
  const max = Math.max(...data.flatMap(d => [d.value, d.value2 ?? 0]));

  return (
    <div className="w-full" style={{ height: height + 24 }}>
      <div className="flex items-end gap-1 h-full pb-6 relative">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end relative group">
            <div className="w-full flex items-end gap-0.5 justify-center" style={{ height }}>
              {color2 && d.value2 !== undefined && (
                <div
                  className="flex-1 rounded-t transition-all duration-300 opacity-50"
                  style={{ height: `${(d.value2 / max) * 100}%`, backgroundColor: color2 }}
                />
              )}
              <div
                className="flex-1 rounded-t transition-all duration-300"
                style={{ height: `${(d.value / max) * 100}%`, backgroundColor: color }}
              />
            </div>
            {showLabels && (
              <span className="absolute bottom-0 text-2xs text-neutral-600 font-medium" style={{ fontSize: '10px' }}>
                {d.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}

export function MiniLineChart({ data, height = 60, color = '#007be8' }: LineChartProps) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  const w = 200;
  const h = height;
  const pad = 8;
  const points = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((d.value - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `M ${points[0]} L ${points.join(' L ')} L ${points[points.length - 1].split(',')[0]},${h - pad} L ${points[0].split(',')[0]},${h - pad} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#lineGrad)" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => {
        const [x, y] = points[i].split(',');
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}
