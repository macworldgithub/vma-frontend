import { Video, Users, CheckSquare, Activity, ArrowRight, Clock, Globe } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { MiniBarChart, MiniLineChart } from '../components/ui/MiniBarChart';
import { mockMeetings, mockUsers, usageChartData, weeklyTrendData, mockPlatformStatus } from '../data/mockData';
import { formatDateTime, platformLabel } from '../utils/format';
import type { Page } from '../types';

interface DashboardPageProps {
  onNavigate: (page: Page, extra?: string) => void;
}

const platformColors: Record<string, string> = {
  teams: '#5B5FC7',
  zoom: '#2D8CFF',
  google_meet: '#00AC47',
};

const platformBadge: Record<string, { variant: 'info' | 'success' | 'warning'; label: string }> = {
  teams: { variant: 'info', label: 'MS Teams' },
  zoom: { variant: 'warning', label: 'Zoom' },
  google_meet: { variant: 'success', label: 'Google Meet' },
};

const statusBadge: Record<string, 'active' | 'success' | 'warning' | 'neutral'> = {
  active: 'active',
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
    <div className="space-y-6 animate-fade-in">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Meetings" value={activeMeetings.length} subtext="Right now" icon={Video} iconColor="text-cyan-400" trend="up" trendLabel="+2 vs yesterday" />
        <StatCard label="Active Seats" value={`${activeUsers}/100`} subtext="Named user seats" icon={Users} iconColor="text-blue-400" trend="stable" trendLabel="83% utilisation" />
        <StatCard label="Processed Today" value={completedToday + activeMeetings.length} subtext="Meetings handled by VMA" icon={CheckSquare} iconColor="text-emerald-400" trend="up" trendLabel="+18% this week" />
        <StatCard label="System Uptime" value="99.7%" subtext="Last 30 days" icon={Activity} iconColor="text-amber-400" trend="stable" trendLabel="Target: 99.5%" />
      </div>

      {/* Platform Integration Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockPlatformStatus.map(ps => {
          const color = platformColors[ps.platform];
          return (
            <div key={ps.platform} className={`card-platform ${ps.platform === 'teams' ? 'teams' : ps.platform === 'zoom' ? 'zoom' : 'google-meet'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                    <Globe size={16} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-100">{platformLabel(ps.platform)}</p>
                    <p className="text-neutral-600" style={{ fontSize: '10px' }}>{ps.version}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="status-dot online" />
                  <span className="text-emerald-400 font-medium" style={{ fontSize: '11px' }}>Connected</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(30,41,59,0.4)' }}>
                  <p className="text-lg font-bold text-neutral-100">{ps.activeMeetings}</p>
                  <p className="text-neutral-500" style={{ fontSize: '10px' }}>Live</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(30,41,59,0.4)' }}>
                  <p className="text-lg font-bold text-neutral-100">{ps.latency}</p>
                  <p className="text-neutral-500" style={{ fontSize: '10px' }}>Latency</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(30,41,59,0.4)' }}>
                  <p className="text-lg font-bold text-emerald-400">✓</p>
                  <p className="text-neutral-500" style={{ fontSize: '10px' }}>Healthy</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card-glow p-5 lg:col-span-2">
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
                const color = platformColors[m.platform];
                return (
                  <div
                    key={m.id}
                    onClick={() => onNavigate('meeting-detail', m.id)}
                    className="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 group"
                    style={{ background: 'rgba(30,41,59,0.3)', border: '1px solid rgba(51,65,85,0.25)' }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                      <Video size={16} style={{ color }} />
                    </div>
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
                    <div className="flex items-center gap-2 text-xs text-emerald-400 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="hidden sm:inline">Transcribing</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold text-neutral-100 mb-1">Seat Utilisation</h2>
          <p className="text-xs text-neutral-500 mb-4">Weekly peak active seats</p>
          <MiniLineChart data={lineData} height={80} color="#3b82f6" />
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-neutral-500">Active seats</span>
              <span className="text-neutral-200 font-semibold">83 / 100</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '83%' }} />
            </div>
            <div className="flex justify-between mt-2 text-neutral-600" style={{ fontSize: '10px' }}>
              <span>0</span><span>50</span><span>100 seats</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-neutral-100">Meeting Activity — This Week</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Meetings processed vs summaries delivered</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-blue-500 inline-block" />Meetings</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-blue-500/40 inline-block" />Summaries</span>
            </div>
          </div>
          <MiniBarChart data={barData} height={100} color="#3b82f6" color2="#3b82f6" showLabels={true} />
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-100">Recent Meetings</h2>
            <button onClick={() => onNavigate('meetings')} className="btn-ghost text-xs gap-1">All <ArrowRight size={12} /></button>
          </div>
          <div className="space-y-3">
            {recentMeetings.slice(0, 5).map(m => (
              <div key={m.id} onClick={() => onNavigate('meeting-detail', m.id)} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${platformColors[m.platform]}12` }}>
                  <Video size={13} style={{ color: platformColors[m.platform] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-200 truncate group-hover:text-neutral-100 transition-colors">{m.title}</p>
                  <p className="text-neutral-600 mt-0.5" style={{ fontSize: '10px' }}>{formatDateTime(m.startTime)}</p>
                </div>
                <Badge variant={statusBadge[m.status]}>{m.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Meetings table */}
      <div className="card overflow-hidden">
        <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(51,65,85,0.25)' }}>
          <h2 className="text-sm font-semibold text-neutral-100">All Meetings — Overview</h2>
          <button onClick={() => onNavigate('meetings')} className="btn-ghost text-xs gap-1">View all <ArrowRight size={12} /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(51,65,85,0.2)' }}>
                <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3">Meeting</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden md:table-cell">Platform</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden lg:table-cell">Organiser</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden md:table-cell">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentMeetings.map(m => {
                const pb = platformBadge[m.platform];
                return (
                  <tr key={m.id} onClick={() => onNavigate('meeting-detail', m.id)} className="table-row-hover cursor-pointer" style={{ borderBottom: '1px solid rgba(51,65,85,0.1)' }}>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${platformColors[m.platform]}12` }}>
                          <Video size={14} style={{ color: platformColors[m.platform] }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-neutral-200 truncate max-w-xs">{m.title}</p>
                          <p className="text-neutral-600" style={{ fontSize: '10px' }}>{m.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell"><Badge variant={pb.variant}>{pb.label}</Badge></td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar name={m.organizer} size="sm" />
                        <span className="text-xs text-neutral-400">{m.organizer}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4"><Badge variant={statusBadge[m.status]} dot={m.status === 'active'}>{m.status}</Badge></td>
                    <td className="py-3 px-4 hidden md:table-cell text-xs text-neutral-500">
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
