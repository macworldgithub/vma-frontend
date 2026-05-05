import React, { useState } from 'react';
import { Bell, Search, Sun, Moon, LogOut, ChevronDown } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface TopNavProps {
  onNavigate: (page: import('../../types').Page) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  pageTitle: string;
}

const notifications = [
  { id: 1, text: 'Q2 Sales meeting summary ready', time: '2m ago', unread: true },
  { id: 2, text: 'New user bulk import completed (8 users)', time: '1h ago', unread: true },
  { id: 3, text: 'System uptime: 99.7% — 30 days', time: '2h ago', unread: false },
];

export function TopNav({ isDark, onToggleTheme, onLogout, pageTitle }: TopNavProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-neutral-950/95 border-b border-neutral-800/80 flex items-center px-6 gap-4 flex-shrink-0 backdrop-blur-sm sticky top-0 z-30">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-neutral-100 truncate">{pageTitle}</h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-neutral-800/70 border border-neutral-700/50 rounded-lg px-3 py-1.5 w-56 focus-within:border-brand-500/50 transition-colors">
        <Search size={14} className="text-neutral-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm text-neutral-300 placeholder-neutral-600 outline-none w-full"
        />
      </div>

      {/* Theme */}
      <button onClick={onToggleTheme} className="btn-ghost p-2 rounded-lg">
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Notifications */}
      <div className="relative">
        <button onClick={() => { setShowNotifs(v => !v); setShowUser(false); }} className="btn-ghost p-2 rounded-lg relative">
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-error-500 text-white text-2xs rounded-full flex items-center justify-center font-bold" style={{ fontSize: '9px' }}>
              {unreadCount}
            </span>
          )}
        </button>
        {showNotifs && (
          <div className="absolute right-0 mt-2 w-80 bg-neutral-900 border border-neutral-800 rounded-xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] animate-slide-in z-50">
            <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-100">Notifications</span>
              <Badge variant="info">{unreadCount} new</Badge>
            </div>
            <div className="divide-y divide-neutral-800">
              {notifications.map(n => (
                <div key={n.id} className={`px-4 py-3 flex gap-3 items-start ${n.unread ? 'bg-brand-500/5' : ''}`}>
                  {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />}
                  {!n.unread && <span className="w-1.5 h-1.5 flex-shrink-0" />}
                  <div>
                    <p className="text-xs text-neutral-200">{n.text}</p>
                    <p className="text-2xs text-neutral-600 mt-0.5" style={{ fontSize: '10px' }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User */}
      <div className="relative">
        <button
          onClick={() => { setShowUser(v => !v); setShowNotifs(false); }}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Avatar name="Sarah Mitchell" url="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=80&h=80&fit=crop" size="sm" />
          <div className="hidden md:block text-left">
            <p className="text-xs font-medium text-neutral-200 leading-tight">Sarah Mitchell</p>
            <p className="text-2xs text-neutral-500" style={{ fontSize: '10px' }}>Super Admin</p>
          </div>
          <ChevronDown size={14} className="text-neutral-500 hidden md:block" />
        </button>
        {showUser && (
          <div className="absolute right-0 mt-2 w-44 bg-neutral-900 border border-neutral-800 rounded-xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] animate-slide-in z-50 overflow-hidden">
            <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-error-400 hover:bg-error-500/10 transition-colors">
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
