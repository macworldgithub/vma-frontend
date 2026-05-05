import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopNav } from '../components/layout/TopNav';
import type { Page } from '../types';

interface AppLayoutProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
}

const pageTitles: Record<Page, string> = {
  dashboard: 'Dashboard',
  users: 'User Management',
  meetings: 'Meeting Management',
  'meeting-detail': 'Meeting Detail',
  monitoring: 'Real-Time Monitor',
  branding: 'Branding & Configuration',
  'audit-logs': 'Audit Logs',
  settings: 'Settings',
  login: 'Sign In',
};

export function AppLayout({ currentPage, onNavigate, children, isDark, onToggleTheme, onLogout }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed(v => !v)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav
          onNavigate={onNavigate}
          isDark={isDark}
          onToggleTheme={onToggleTheme}
          onLogout={onLogout}
          pageTitle={pageTitles[currentPage]}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
