import React, { useState, useEffect } from 'react';
import { Activity, Video, Users, Zap, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockMeetings, mockAuditLogs } from '../data/mockData';
import { formatDateTime, platformLabel } from '../utils/format';
import type { Page } from '../types';

interface MonitoringPageProps {
  onNavigate: (page: Page, extra?: string) => void;
}

export function MonitoringPage({ onNavigate }: MonitoringPageProps) {
  const [uptimeSecs, setUptimeSecs] = useState(2592000); // ~30 days
  const [processingCount, setProcessingCount] = useState(2);

  useEffect(() => {
    const t = setInterval(() => setUptimeSecs(v => v + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const days = Math.floor(uptimeSecs / 86400);
  const hours = Math.floor((uptimeSecs % 86400) / 3600);
  const mins = Math.floor((uptimeSecs % 3600) / 60);
  const secs = uptimeSecs % 60;

  const activeMeetings = mockMeetings.filter(m => m.status === 'active');
  const activeUsers = 83;
  const recentLogs = [...mockAuditLogs].slice(0, 8);

  const systemServices = [
    { name: 'VMA Bot Service',         status: 'healthy', latency: '42ms' },
    { name: 'Transcription Pipeline',  status: 'healthy', latency: '128ms' },
    { name: 'AI Summary Engine',       status: 'healthy', latency: '890ms' },
    { name: 'Email Delivery',          status: 'healthy', latency: '215ms' },
    { name: 'PDF Generation',          status: 'healthy', latency: '340ms' },
    { name: 'Auth (Microsoft Entra)',  status: 'healthy', latency: '65ms' },
    { name: 'Database (PostgreSQL)',   status: 'healthy', latency: '12ms' },
    { name: 'Storage (Encrypted Blob)',status: 'healthy', latency: '88ms' },
  ];

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      {/* System status banner */}
      <div className="card p-4 border-success-500/20 bg-success-500/5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-success-500/20 flex items-center justify-center">
              <CheckCircle size={16} className="text-success-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-100">All Systems Operational</p>
              <p className="text-xs text-neutral-500">All 8 services running normally · AU data residency enforced</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-neutral-500 mb-1">System uptime</p>
              <p className="font-mono text-sm font-semibold text-success-400">
                {days}d {String(hours).padStart(2,'0')}:{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-neutral-500 uppercase tracking-wider">Active Meetings</span>
            <Video size={14} className="text-accent-400" />
          </div>
          <div className="text-3xl font-bold text-neutral-100">{activeMeetings.length}</div>
          <div className="flex gap-1 mt-2">
            {activeMeetings.map(m => (
              <Badge key={m.id} variant="active" dot>Live</Badge>
            ))}
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-neutral-500 uppercase tracking-wider">Online Users</span>
            <Users size={14} className="text-brand-400" />
          </div>
          <div className="text-3xl font-bold text-neutral-100">{activeUsers}</div>
          <div className="text-xs text-neutral-600 mt-1">of 100 seats</div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-neutral-500 uppercase tracking-wider">Processing</span>
            <Zap size={14} className="text-warning-400" />
          </div>
          <div className="text-3xl font-bold text-neutral-100">{processingCount}</div>
          <div className="text-xs text-neutral-600 mt-1">summaries in queue</div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-neutral-500 uppercase tracking-wider">Uptime</span>
            <Activity size={14} className="text-success-400" />
          </div>
          <div className="text-3xl font-bold text-neutral-100">99.7%</div>
          <div className="text-xs text-neutral-600 mt-1">last 30 days</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Active meetings panel */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-100">Active Meetings</h2>
            <button onClick={() => onNavigate('meetings')} className="btn-ghost text-xs gap-1">All meetings <ArrowRight size={12} /></button>
          </div>
          {activeMeetings.length === 0 ? (
            <div className="text-center py-10 text-neutral-600">
              <Video size={28} className="mx-auto mb-2" />
              <p className="text-sm">No meetings currently active</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeMeetings.map(m => (
                <div key={m.id} onClick={() => onNavigate('meeting-detail', m.id)} className="p-4 rounded-xl bg-neutral-800/40 border border-accent-500/20 cursor-pointer hover:bg-neutral-800/60 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-neutral-100">{m.title}</span>
                        <Badge variant="active" dot>Live</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span>{platformLabel(m.platform)}</span>
                        <span>Started {new Date(m.startTime).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {m.participants.slice(0, 5).map(p => <Avatar key={p} name={p} size="sm" />)}
                      </div>
                      <span className="text-xs text-neutral-500">{m.participants.length} in call</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-success-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-success-400 animate-pulse" />
                      Transcribing
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Seat utilisation */}
          <div className="mt-5 pt-5 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="text-neutral-500 font-medium">Seat utilisation</span>
              <span className="text-neutral-200 font-semibold">{activeUsers} / 100 seats</span>
            </div>
            <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full transition-all duration-500" style={{ width: `${activeUsers}%` }} />
            </div>
            <div className="flex justify-between mt-1 text-2xs text-neutral-700" style={{ fontSize: '10px' }}>
              <span>0</span><span>50</span><span>100</span>
            </div>
          </div>
        </div>

        {/* Service health */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-neutral-100 mb-4">Service Health</h2>
          <div className="space-y-2.5">
            {systemServices.map(svc => (
              <div key={svc.name} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-success-400 flex-shrink-0" />
                  <span className="text-xs text-neutral-400 truncate">{svc.name}</span>
                </div>
                <span className="text-2xs text-neutral-600 flex-shrink-0 font-mono" style={{ fontSize: '10px' }}>{svc.latency}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="text-neutral-500">Avg response</span>
              <span className="text-neutral-300 font-mono">223ms</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Errors (24h)</span>
              <span className="text-success-400 font-mono">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* System logs */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-neutral-100">System Log — Recent Events</h2>
          <button onClick={() => onNavigate('audit-logs')} className="btn-ghost text-xs gap-1">View full logs <ArrowRight size={12} /></button>
        </div>
        <div className="space-y-1">
          {recentLogs.map(log => (
            <div key={log.id} className="flex items-start gap-4 py-2.5 px-3 rounded-lg hover:bg-neutral-800/40 transition-colors group">
              <span className="font-mono text-2xs text-neutral-700 flex-shrink-0 w-32 pt-0.5" style={{ fontSize: '10px' }}>
                {new Date(log.timestamp).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-xs font-medium text-neutral-300">{log.action}</span>
                  <Badge variant={
                    log.eventType === 'security' ? 'error' :
                    log.eventType === 'system' ? 'info' :
                    log.eventType === 'config' ? 'warning' : 'neutral'
                  }>{log.eventType}</Badge>
                </div>
                <p className="text-2xs text-neutral-600 truncate" style={{ fontSize: '10px' }}>{log.details}</p>
              </div>
              <span className="text-2xs text-neutral-700 flex-shrink-0 font-mono" style={{ fontSize: '10px' }}>{log.userName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
