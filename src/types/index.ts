export type UserRole = 'super_admin' | 'dept_admin' | 'read_only';
export type UserStatus = 'active' | 'suspended';
export type MeetingPlatform = 'teams' | 'zoom' | 'google_meet';
export type MeetingStatus = 'scheduled' | 'active' | 'completed' | 'cancelled';
export type AuditEventType = 'user_action' | 'system' | 'security' | 'config';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  lastActive: string;
  meetingsJoined: number;
  avatarUrl?: string;
  botEnabled?: boolean;
  platforms?: MeetingPlatform[];
  group?: string;
}

export interface Meeting {
  id: string;
  title: string;
  platform: MeetingPlatform;
  status: MeetingStatus;
  participants: string[];
  startTime: string;
  endTime?: string;
  duration?: number;
  organizer: string;
  transcript?: TranscriptEntry[];
  summary?: string;
  actionItems?: ActionItem[];
  department: string;
}

export interface TranscriptEntry {
  id: string;
  speaker: string;
  text: string;
  timestamp: string;
}

export interface ActionItem {
  id: string;
  description: string;
  owner: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'done';
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  eventType: AuditEventType;
  timestamp: string;
  details: string;
  ipAddress: string;
}

export interface SystemMetric {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

export interface PlatformStatus {
  platform: MeetingPlatform;
  status: 'connected' | 'degraded' | 'disconnected';
  activeMeetings: number;
  latency: string;
  lastSync: string;
  version?: string;
}

export type Page =
  | 'dashboard'
  | 'users'
  | 'meetings'
  | 'meeting-detail'
  | 'monitoring'
  | 'branding'
  | 'audit-logs'
  | 'settings'
  | 'service-control'
  | 'login';
