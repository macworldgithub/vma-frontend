import { useState } from 'react';
import { Search, Video, Clock, Users, Filter, Calendar, ChevronRight, Play, FileText, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockMeetings } from '../data/mockData';
import { formatDateTime, formatDuration, platformLabel } from '../utils/format';
import type { Page, MeetingStatus, MeetingPlatform } from '../types';

interface MeetingsPageProps {
  onNavigate: (page: Page, extra?: string) => void;
}

const statusBadge: Record<MeetingStatus, 'active' | 'success' | 'warning' | 'neutral'> = {
  active: 'active',
  completed: 'success',
  scheduled: 'warning',
  cancelled: 'neutral',
};

const platformColors: Record<MeetingPlatform, string> = {
  teams: '#7B83EB',
  zoom: '#2D8CFF',
  google_meet: '#00AC47',
};

export function MeetingsPage({ onNavigate }: MeetingsPageProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<MeetingStatus | 'all'>('all');
  const [platformFilter, setPlatformFilter] = useState<MeetingPlatform | 'all'>('all');

  const filtered = mockMeetings.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.organizer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    const matchPlatform = platformFilter === 'all' || m.platform === platformFilter;
    return matchSearch && matchStatus && matchPlatform;
  });

  const getStatusCount = (s: MeetingStatus) => mockMeetings.filter(m => m.status === s).length;

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-7xl">
      {/* Platform Status Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(['active', 'scheduled', 'completed', 'cancelled'] as MeetingStatus[]).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
            className={`card p-5 text-left transition-all relative overflow-hidden group ${statusFilter === s ? 'ring-1 ring-blue-500/50 bg-blue-500/10' : 'hover:bg-neutral-800/30'}`}
          >
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${s === 'active' ? 'text-cyan-400' : ''}`}>
              {s === 'active' && <Play size={40} />}
              {s === 'completed' && <CheckCircle2 size={40} />}
              {s === 'scheduled' && <Calendar size={40} />}
            </div>
            <p className="text-2xl font-bold text-neutral-100 mb-1">{getStatusCount(s)}</p>
            <div className="flex items-center gap-2">
              <Badge variant={statusBadge[s]} dot={s === 'active'}>
                <span className="capitalize">{s}</span>
              </Badge>
            </div>
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          <input
            type="text"
            placeholder="Search meeting titles, organizers, or departments..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-12 h-12 bg-neutral-900/50"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={platformFilter}
            onChange={e => setPlatformFilter(e.target.value as MeetingPlatform | 'all')}
            className="input w-auto min-w-[160px] h-12"
          >
            <option value="all">All Platforms</option>
            <option value="teams">Microsoft Teams</option>
            <option value="zoom">Zoom Video</option>
            <option value="google_meet">Google Meet</option>
          </select>
          <button className="btn-secondary h-12 px-6">
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      {/* Meeting Session Cards */}
      <div className="space-y-4">
        {filtered.map(m => {
          const color = platformColors[m.platform];
          return (
            <div
              key={m.id}
              onClick={() => onNavigate('meeting-detail', m.id)}
              className="card p-0 group cursor-pointer transition-all hover:scale-[1.005] hover:shadow-2xl overflow-hidden"
              style={{ borderLeft: `4px solid ${color}` }}
            >
              <div className="p-5 flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, color }}
                >
                  <Video size={28} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-base font-bold text-neutral-100 group-hover:text-blue-400 transition-colors">{m.title}</h3>
                    <Badge variant={statusBadge[m.status]} dot={m.status === 'active'}>
                      <span className="capitalize">{m.status}</span>
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                      {platformLabel(m.platform)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <Clock size={14} className="text-neutral-600" />
                      {formatDateTime(m.startTime)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <Users size={14} className="text-neutral-600" />
                      {m.participants.length} Participants
                    </div>
                    {m.duration && (
                      <div className="text-xs text-neutral-600 font-mono">
                        {formatDuration(m.duration)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden lg:flex flex-col items-end gap-1">
                    <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Organized By</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-neutral-300">{m.organizer}</span>
                      <Avatar name={m.organizer} size="sm" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {m.summary && (
                      <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400" title="Summary Ready">
                        <FileText size={18} />
                      </div>
                    )}
                    <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Participants Strip */}
              <div className="px-5 py-2.5 bg-neutral-900/40 border-t border-neutral-800/50 flex items-center justify-between">
                <div className="flex -space-x-1.5">
                  {m.participants.slice(0, 6).map((p, i) => (
                    <Avatar key={i} name={p} size="sm" />
                  ))}
                  {m.participants.length > 6 && (
                    <div className="w-7 h-7 rounded-full bg-neutral-800 border-2 border-neutral-950 flex items-center justify-center text-[9px] font-bold text-neutral-500">
                      +{m.participants.length - 6}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{m.department}</span>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="card p-20 text-center">
            <Video size={48} className="text-neutral-800 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-neutral-300">No sessions found</h3>
            <p className="text-neutral-500">Try adjusting your filters or search terms</p>
            <button
              onClick={() => { setSearch(''); setStatusFilter('all'); setPlatformFilter('all'); }}
              className="btn-secondary mt-6 text-xs px-6"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
