import { useState } from 'react';
import { Bell, Search, Sun, Moon, LogOut, ChevronDown, Shield, HelpCircle, Menu } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface TopNavProps {
  onNavigate: (page: import('../../types').Page) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  pageTitle: string;
  onMenuClick?: () => void;
}

const notifications = [
  { id: 1, text: 'Q2 Sales meeting summary ready', time: '2m ago', unread: true, type: 'success' as const },
  { id: 2, text: 'New user bulk import completed (8 users)', time: '1h ago', unread: true, type: 'info' as const },
  { id: 3, text: 'System uptime: 99.7% — 30 days', time: '2h ago', unread: false, type: 'neutral' as const },
  { id: 4, text: 'Zoom SDK connection refreshed', time: '3h ago', unread: false, type: 'info' as const },
];

export function TopNav({ isDark, onToggleTheme, onLogout, pageTitle, onMenuClick }: TopNavProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header
      className="h-16 flex items-center px-4 md:px-6 gap-2 md:gap-4 flex-shrink-0 sticky top-0 z-30"
      style={{
        background: 'rgba(9,14,26,0.85)',
        borderBottom: '1px solid rgba(51,65,85,0.25)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Mobile Menu Toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-white transition-colors"
      >
        <Menu size={20} />
      </button>
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-neutral-100 truncate">{pageTitle}</h1>
        <p className="text-neutral-600 truncate hidden sm:block" style={{ fontSize: '10px' }}>
          Patterson Cheney Automotive Group — Admin Console
        </p>
      </div>

      {/* Search */}
      <div className="hidden xl:flex items-center gap-2 rounded-lg px-3 py-1.5 w-60 transition-all duration-200 group"
        style={{
          background: 'rgba(30,41,59,0.5)',
          border: '1px solid rgba(71,85,105,0.3)',
        }}
      >
        <Search size={14} className="text-neutral-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search users, meetings..."
          className="bg-transparent text-sm text-neutral-300 placeholder-neutral-600 outline-none w-full"
        />
        <kbd className="hidden lg:inline-flex items-center px-1.5 rounded text-neutral-600 font-mono"
          style={{ fontSize: '9px', background: 'rgba(51,65,85,0.3)', border: '1px solid rgba(71,85,105,0.3)' }}
        >⌘K</kbd>
      </div>

      {/* RBAC indicator */}
      <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
        style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.15)' }}
      >
        <Shield size={12} className="text-rose-400" />
        <span className="text-rose-400 font-semibold" style={{ fontSize: '10px' }}>Super Admin</span>
      </div>

      {/* Help */}
      <button className="btn-ghost p-2 rounded-lg hidden sm:flex">
        <HelpCircle size={16} />
      </button>

      {/* Theme */}
      <button onClick={onToggleTheme} className="btn-ghost p-2 rounded-lg">
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => { setShowNotifs(v => !v); setShowUser(false); }}
          className="btn-ghost p-2 rounded-lg relative"
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center"
              style={{
                width: '16px', height: '16px',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                borderRadius: '50%', fontSize: '9px',
                color: 'white', fontWeight: 700,
                boxShadow: '0 0 8px rgba(239,68,68,0.4)',
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>
        {showNotifs && (
          <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] md:w-96 animate-scale-in z-50 rounded-xl overflow-hidden"
            style={{
              background: 'rgba(15,23,42,0.95)',
              border: '1px solid rgba(51,65,85,0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px -10px rgba(0,0,0,0.6)',
            }}
          >
            <div className="px-4 py-3 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(51,65,85,0.3)' }}
            >
              <span className="text-sm font-semibold text-neutral-100">Notifications</span>
              <Badge variant="info">{unreadCount} new</Badge>
            </div>
            <div>
              {notifications.map(n => (
                <div key={n.id}
                  className="px-4 py-3 flex gap-3 items-start transition-colors cursor-pointer"
                  style={{
                    background: n.unread ? 'rgba(0,123,232,0.04)' : 'transparent',
                    borderBottom: '1px solid rgba(51,65,85,0.15)',
                  }}
                >
                  {n.unread && <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#007be8', boxShadow: '0 0 6px rgba(0,123,232,0.4)' }} />}
                  {!n.unread && <span className="w-2 h-2 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-200 leading-relaxed">{n.text}</p>
                    <p className="text-neutral-600 mt-0.5" style={{ fontSize: '10px' }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 text-center" style={{ borderTop: '1px solid rgba(51,65,85,0.2)' }}>
              <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">View all notifications</button>
            </div>
          </div>
        )}
      </div>

      {/* User */}
      <div className="relative">
        <button
          onClick={() => { setShowUser(v => !v); setShowNotifs(false); }}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200"
          style={{ background: showUser ? 'rgba(30,41,59,0.5)' : 'transparent' }}
        >
          <Avatar name="Sarah Mitchell" url="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=80&h=80&fit=crop" size="sm" />
          <div className="hidden md:block text-left">
            <p className="text-xs font-medium text-neutral-200 leading-tight">Sarah Mitchell</p>
            <p className="text-neutral-500" style={{ fontSize: '10px' }}>Super Admin</p>
          </div>
          <ChevronDown size={14} className={`text-neutral-500 hidden md:block transition-transform duration-200 ${showUser ? 'rotate-180' : ''}`} />
        </button>
        {showUser && (
          <div className="absolute right-0 mt-2 w-52 animate-scale-in z-50 rounded-xl overflow-hidden"
            style={{
              background: 'rgba(15,23,42,0.95)',
              border: '1px solid rgba(51,65,85,0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px -10px rgba(0,0,0,0.6)',
            }}
          >
            <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(51,65,85,0.2)' }}>
              <p className="text-xs font-medium text-neutral-200">Sarah Mitchell</p>
              <p className="text-neutral-500" style={{ fontSize: '10px' }}>sarah.mitchell@pattersoncheyney.com.au</p>
            </div>
            <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors">
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
