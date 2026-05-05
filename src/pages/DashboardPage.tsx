import React from 'react';
import { Video, Users, CheckSquare, Activity, ArrowRight, Clock } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { MiniBarChart, MiniLineChart } from '../components/ui/MiniBarChart';
import { mockMeetings, mockUsers, usageChartData, weeklyTrendData } from '../data/mockData';
import { formatDateTime, platformLabel } from '../utils/format';
import type { Page } from '../types';

interface DashboardPageProps {
  onNavigate: (page: Page, extra?: string) => void;
}

const platformBadge: Record<string, { variant: 'info' | 'success' | 'warning'; label: string }> = {
  teams:       { variant: 'info',    label: 'MS Teams' },
  zoom:        { variant: 'warning', label: 'Zoom' },
  google_meet: { variant: 'success', label: 'Google Meet' },
};

const statusBadge: Record<string, 'active' | 'success' | 'warning' | 'neutral'> = {
  active:    'active',
  completed: 'success',
  scheduled: 'warning',
  cancelled: 'neutral',
};

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const activeMeetings = mockMeetings.filter(m => m.status === 'active');
  const completedToday = mockMeetings.filter(m => m.status === 'completed').length;
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;
  const recentMeetings = [...mockMeetings].sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()).slice(0, 6);

  const barData = usageChartData.map(d => ({ label: d.day, value: d.meetings, value2: d.summaries }));
  const lineData = weeklyTrendData.map(d => ({ label: d.week, value: d.seats }));

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Meetings" value={activeMeetings.length} subtext="Right now" icon={Video} iconColor="text-accent-400" trend="up" trendLabel="+2 vs yesterday" />
        <StatCard label="Active Seats" value={`${activeUsers}/100`} subtext="Named user seats" icon={Users} iconColor="text-brand-400" trend="stable" trendLabel="83% utilisation" />
        <StatCard label="Processed Today" value={completedToday + activeMeetings.length} subtext="Meetings handled by VMA" icon={CheckSquare} iconColor="text-success-400" trend="up" trendLabel="+18% this week" />
        <StatCard label="System Uptime" value="99.7%" subtext="Last 30 days" icon={Activity} iconColor="text-warning-400" trend="stable" trendLabel="Target: 99.5%" />
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active meetings */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-neutral-100">Active Meetings</h2>
              <p className="text-xs text-neutral-500 mt-0.5">VMA bot is currently joined</p>
            </div>
            <button onClick={() => onNavigate('monitoring')} className="btn-ghost text-xs gap-1">
              View all <ArrowRight size={12} />
            </button>
          </div>
          {activeMeetings.length === 0 ? (
            <div className="text-center py-8 text-neutral-600 text-sm">No active meetings right now</div>
          ) : (
            <div className="space-y-3">
              {activeMeetings.map(m => {
                const pb = platformBadge[m.platform];
                return (
                  <div
                    key={m.id}
                    onClick={() => onNavigate('meeting-detail', m.id)}
                    className="flex items-start gap-4 p-3 rounded-lg bg-neutral-800/40 hover:bg-neutral-800/80 cursor-pointer transition-colors border border-neutral-700/30"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-medium text-neutral-100 truncate">{m.title}</span>
                        <Badge variant="active" dot>Live</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <Badge variant={pb.variant}>{pb.label}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {new Date(m.startTime).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span>{m.participants.length} participants</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Seat utilisation */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-neutral-100 mb-1">Seat Utilisation</h2>
          <p className="text-xs text-neutral-500 mb-4">Weekly peak active seats</p>
          <MiniLineChart data={lineData} height={80} color="#007be8" />
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-neutral-500">Active seats</span>
              <span className="text-neutral-200 font-medium">83 / 100</span>
            </div>
            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full" style={{ width: '83%' }} />
            </div>
            <div className="flex justify-between mt-2 text-2xs text-neutral-600" style={{ fontSize: '10px' }}>
              <span>0</span><span>50</span><span>100 seats</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Usage chart */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-neutral-100">Meeting Activity — This Week</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Meetings processed vs summaries delivered</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-brand-500 inline-block" />Meetings</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-brand-500/40 inline-block" />Summaries</span>
            </div>
          </div>
          <MiniBarChart data={barData} height={100} color="#007be8" color2="#007be8" showLabels={true} />
        </div>

        {/* Recent meetings */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-100">Recent Meetings</h2>
            <button onClick={() => onNavigate('meetings')} className="btn-ghost text-xs gap-1">All <ArrowRight size={12} /></button>
          </div>
          <div className="space-y-3">
            {recentMeetings.slice(0, 5).map(m => {
              const pb = platformBadge[m.platform];
              return (
                <div key={m.id} onClick={() => onNavigate('meeting-detail', m.id)} className="flex items-center gap-3 cursor-pointer group">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-neutral-200 truncate group-hover:text-neutral-100">{m.title}</p>
                    <p className="text-2xs text-neutral-600 mt-0.5" style={{ fontSize: '10px' }}>{formatDateTime(m.startTime)}</p>
                  </div>
                  <Badge variant={statusBadge[m.status]}>{m.status}</Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-neutral-100">All Meetings — Overview</h2>
          <button onClick={() => onNavigate('meetings')} className="btn-ghost text-xs gap-1">View all <ArrowRight size={12} /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left text-xs font-medium text-neutral-500 pb-3 pr-4">Meeting</th>
                <th className="text-left text-xs font-medium text-neutral-500 pb-3 pr-4 hidden md:table-cell">Platform</th>
                <th className="text-left text-xs font-medium text-neutral-500 pb-3 pr-4 hidden lg:table-cell">Organiser</th>
                <th className="text-left text-xs font-medium text-neutral-500 pb-3 pr-4">Status</th>
                <th className="text-left text-xs font-medium text-neutral-500 pb-3 hidden md:table-cell">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {recentMeetings.map(m => {
                const pb = platformBadge[m.platform];
                return (
                  <tr key={m.id} onClick={() => onNavigate('meeting-detail', m.id)} className="table-row-hover cursor-pointer">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center flex-shrink-0">
                          <Video size={14} className="text-neutral-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-neutral-200 truncate max-w-xs">{m.title}</p>
                          <p className="text-2xs text-neutral-600" style={{ fontSize: '10px' }}>{m.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 hidden md:table-cell"><Badge variant={pb.variant}>{pb.label}</Badge></td>
                    <td className="py-3 pr-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar name={m.organizer} size="sm" />
                        <span className="text-xs text-neutral-400">{m.organizer}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4"><Badge variant={statusBadge[m.status]} dot={m.status === 'active'}>{m.status}</Badge></td>
                    <td className="py-3 hidden md:table-cell text-xs text-neutral-500">
                      {new Date(m.startTime).toLocaleString('en-AU', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
