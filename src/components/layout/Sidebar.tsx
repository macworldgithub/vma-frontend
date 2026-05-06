import {
  LayoutDashboard, Users, Video, Activity, Palette, FileText,
  Settings, ChevronLeft, ChevronRight, Zap, Shield, Power
} from 'lucide-react';
import type { Page } from '../../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const navSections = [
  {
    title: 'Overview',
    items: [
      { page: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
      { page: 'monitoring' as Page, label: 'Live Monitor', icon: Activity },
    ],
  },
  {
    title: 'Management',
    items: [
      { page: 'meetings' as Page, label: 'Meetings', icon: Video },
      { page: 'users' as Page, label: 'User Management', icon: Users },
      { page: 'service-control' as Page, label: 'Service Control', icon: Power },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { page: 'branding' as Page, label: 'Branding & Config', icon: Palette },
      { page: 'audit-logs' as Page, label: 'Audit Logs', icon: FileText },
      { page: 'settings' as Page, label: 'Settings', icon: Settings },
    ],
  },
];

export function Sidebar({ currentPage, onNavigate, collapsed, onToggle, mobileOpen }: SidebarProps) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 flex flex-col h-full flex-shrink-0
        transition-all duration-300 ease-in-out lg:relative
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${collapsed ? 'lg:w-[68px]' : 'lg:w-[260px]'}
        w-[260px]
      `}
      style={{
        background: 'linear-gradient(180deg, rgba(9,14,26,0.98) 0%, rgba(15,23,42,0.95) 100%)',
        borderRight: '1px solid rgba(51,65,85,0.3)',
      }}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 gap-3 flex-shrink-0`}
        style={{ borderBottom: '1px solid rgba(51,65,85,0.2)' }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #007be8, #005fb8)' }}
        >
          <Zap size={17} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white leading-tight whitespace-nowrap">Patterson Cheney</div>
            <div className="text-neutral-500 font-medium whitespace-nowrap" style={{ fontSize: '10px' }}>Virtual Meeting Assistant</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {navSections.map(section => (
          <div key={section.title}>
            {!collapsed && (
              <div className="px-3 mb-2">
                <span className="text-neutral-600 font-semibold uppercase tracking-wider" style={{ fontSize: '10px' }}>
                  {section.title}
                </span>
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map(item => {
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
            </div>
          </div>
        ))}
      </nav>

      {/* Platform status */}
      {!collapsed && (
        <div className="mx-3 mb-2">
          <div className="px-3 py-2.5 rounded-lg" style={{ background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(51,65,85,0.2)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-neutral-500 font-semibold uppercase tracking-wider" style={{ fontSize: '9px' }}>Platforms</span>
            </div>
            <div className="space-y-1.5">
              {[
                { name: 'MS Teams', color: '#7B83EB' },
                { name: 'Zoom', color: '#2D8CFF' },
                { name: 'Google Meet', color: '#00AC47' },
              ].map(p => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}60` }} />
                  <span className="text-neutral-400 truncate" style={{ fontSize: '11px' }}>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Compliance badge */}
      {!collapsed && (
        <div className="mx-3 mb-3 px-3 py-2.5 rounded-lg"
          style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Shield size={12} className="text-emerald-400 flex-shrink-0" />
            <span className="text-emerald-400 font-semibold uppercase tracking-wide" style={{ fontSize: '10px' }}>AU Compliant</span>
          </div>
          <p className="text-neutral-600 leading-tight" style={{ fontSize: '10px' }}>
            Privacy Act 1988 · SOC 2 aligned · Data hosted AU
          </p>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="hidden lg:flex items-center justify-center h-10 text-neutral-600 hover:text-neutral-400 transition-colors"
        style={{ borderTop: '1px solid rgba(51,65,85,0.2)' }}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
