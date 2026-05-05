import React from 'react';
import { initials } from '../../utils/format';

interface AvatarProps {
  name: string;
  url?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClass = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-11 h-11 text-base' };

const colors = [
  'bg-brand-600', 'bg-accent-600', 'bg-success-600', 'bg-warning-600',
  'bg-error-600', 'bg-neutral-600',
];

function hashColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % colors.length;
  return colors[h];
}

export function Avatar({ name, url, size = 'md' }: AvatarProps) {
  if (url) {
    return <img src={url} alt={name} className={`${sizeClass[size]} rounded-full object-cover ring-1 ring-neutral-700`} />;
  }
  return (
    <div className={`${sizeClass[size]} ${hashColor(name)} rounded-full flex items-center justify-center font-semibold text-white ring-1 ring-neutral-700`}>
      {initials(name)}
    </div>
  );
}
