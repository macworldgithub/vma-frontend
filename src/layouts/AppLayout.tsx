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
  'service-control': 'Service Control',
  login: 'Sign In',
};

export function AppLayout({ currentPage, onNavigate, children, isDark, onToggleTheme, onLogout }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #090e1a 0%, #0f172a 50%, #0c1220 100%)' }}>
      {/* Sidebar Overlay for Mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed(v => !v)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopNav
          onNavigate={handleNavigate}
          isDark={isDark}
          onToggleTheme={onToggleTheme}
          onLogout={onLogout}
          pageTitle={pageTitles[currentPage]}
          onMenuClick={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
