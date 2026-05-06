import { useState } from "react";
import { AppLayout } from "./layouts/AppLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { UsersPage } from "./pages/UsersPage";
import { MeetingsPage } from "./pages/MeetingsPage";
import { MeetingDetailPage } from "./pages/MeetingDetailPage";
import { MonitoringPage } from "./pages/MonitoringPage";
import { BrandingPage } from "./pages/BrandingPage";
import { AuditLogsPage } from "./pages/AuditLogsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ServiceControlPage } from "./pages/ServiceControlPage";
import { useTheme } from "./hooks/useTheme";
import type { Page } from "./types";

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [meetingId, setMeetingId] = useState<string>("");
  const { isDark, toggleTheme } = useTheme();

  function navigate(p: Page, extra?: string) {
    if (p === "meeting-detail" && extra) setMeetingId(extra);
    setPage(p);
  }

  if (page === "login") {
    return <LoginPage onLogin={() => setPage("dashboard")} />;
  }

  function renderPage() {
    switch (page) {
      case "dashboard":
        return <DashboardPage onNavigate={navigate} />;
      case "users":
        return <UsersPage />;
      case "meetings":
        return <MeetingsPage onNavigate={navigate} />;
      case "meeting-detail":
        return (
          <MeetingDetailPage meetingId={meetingId} onNavigate={navigate} />
        );
      case "monitoring":
        return <MonitoringPage onNavigate={navigate} />;
      case "branding":
        return <BrandingPage />;
      case "audit-logs":
        return <AuditLogsPage />;
      case "settings":
        return <SettingsPage />;
      case "service-control":
        return <ServiceControlPage />;
      default:
        return <DashboardPage onNavigate={navigate} />;
    }
  }

  return (
    <AppLayout
      currentPage={page}
      onNavigate={navigate}
      isDark={isDark}
      onToggleTheme={toggleTheme}
      onLogout={() => setPage("login")}
    >
      {renderPage()}
    </AppLayout>
  );
}
