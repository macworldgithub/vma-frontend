import React from 'react';
import {
  LayoutDashboard, Users, Video, Activity, Palette, FileText,
  Settings, ChevronLeft, ChevronRight, Zap, Shield
} from 'lucide-react';
import type { Page } from '../../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems: { page: Page; label: string; icon: React.ElementType; group?: string }[] = [
  { page: 'dashboard',   label: 'Dashboard',     icon: LayoutDashboard },
  { page: 'monitoring',  label: 'Live Monitor',   icon: Activity },
  { page: 'meetings',    label: 'Meetings',       icon: Video },
  { page: 'users',       label: 'User Management',icon: Users },
  { page: 'branding',    label: 'Branding & Config', icon: Palette },
  { page: 'audit-logs',  label: 'Audit Logs',     icon: FileText },
  { page: 'settings',    label: 'Settings',       icon: Settings },
];

export function Sidebar({ currentPage, onNavigate, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`
        flex flex-col h-full bg-neutral-950 border-r border-neutral-800/80
        transition-all duration-300 ease-in-out flex-shrink-0
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-neutral-800/80 gap-3 flex-shrink-0`}>
        <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white leading-tight whitespace-nowrap">Patterson Cheney</div>
            <div className="text-2xs text-neutral-500 font-medium whitespace-nowrap" style={{ fontSize: '10px' }}>Virtual Meeting Assistant</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`w-full ${active ? 'sidebar-link-active' : 'sidebar-link'} ${collapsed ? 'justify-center px-2' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Compliance badge */}
      {!collapsed && (
        <div className="mx-3 mb-3 px-3 py-2.5 rounded-lg bg-success-500/5 border border-success-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={12} className="text-success-400 flex-shrink-0" />
            <span className="text-2xs font-semibold text-success-400 uppercase tracking-wide" style={{ fontSize: '10px' }}>AU Compliant</span>
          </div>
          <p className="text-2xs text-neutral-600 leading-tight" style={{ fontSize: '10px' }}>
            Privacy Act 1988 · SOC 2 aligned · Data hosted AU
          </p>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-10 border-t border-neutral-800/80 text-neutral-600 hover:text-neutral-400 hover:bg-neutral-800/50 transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
