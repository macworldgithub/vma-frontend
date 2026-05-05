import React, { useState } from 'react';
import { Search, Video, Clock, Users, ArrowRight, Filter } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockMeetings } from '../data/mockData';
import { formatDateTime, formatDuration, platformLabel } from '../utils/format';
import type { Page, MeetingStatus, MeetingPlatform } from '../types';

interface MeetingsPageProps {
  onNavigate: (page: Page, extra?: string) => void;
}

const platformBadge: Record<MeetingPlatform, { variant: 'info' | 'success' | 'warning' }> = {
  teams:       { variant: 'info' },
  zoom:        { variant: 'warning' },
  google_meet: { variant: 'success' },
};

const statusBadge: Record<MeetingStatus, 'active' | 'success' | 'warning' | 'neutral'> = {
  active:    'active',
  completed: 'success',
  scheduled: 'warning',
  cancelled: 'neutral',
};

const platformIcon: Record<MeetingPlatform, string> = {
  teams: '#005A9E',
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

  const byStatus = (s: MeetingStatus) => mockMeetings.filter(m => m.status === s).length;

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['active', 'scheduled', 'completed', 'cancelled'] as MeetingStatus[]).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
            className={`card p-4 text-left hover:border-neutral-700 transition-all ${statusFilter === s ? 'border-brand-500/50 bg-brand-500/5' : ''}`}
          >
            <div className="text-xl font-bold text-neutral-100 mb-1">{byStatus(s)}</div>
            <Badge variant={statusBadge[s]} dot={s === 'active'}>{s.charAt(0).toUpperCase() + s.slice(1)}</Badge>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-neutral-800/70 border border-neutral-700/50 rounded-lg px-3 py-2">
          <Search size={14} className="text-neutral-500" />
          <input
            type="text"
            placeholder="Search meetings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-neutral-300 placeholder-neutral-600 outline-none w-full"
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as MeetingStatus | 'all')} className="input w-auto text-xs">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
        </select>
        <select value={platformFilter} onChange={e => setPlatformFilter(e.target.value as MeetingPlatform | 'all')} className="input w-auto text-xs">
          <option value="all">All Platforms</option>
          <option value="teams">MS Teams</option>
          <option value="zoom">Zoom</option>
          <option value="google_meet">Google Meet</option>
        </select>
      </div>

      {/* Meeting cards */}
      <div className="space-y-3">
        {filtered.map(m => {
          const pb = platformBadge[m.platform];
          return (
            <div
              key={m.id}
              onClick={() => onNavigate('meeting-detail', m.id)}
              className="card p-5 hover:border-neutral-700 cursor-pointer transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: platformIcon[m.platform] + '20' }}>
                  <Video size={18} style={{ color: platformIcon[m.platform] }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-neutral-100 group-hover:text-white">{m.title}</h3>
                    <Badge variant={statusBadge[m.status]} dot={m.status === 'active'}>{m.status.charAt(0).toUpperCase() + m.status.slice(1)}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
                    <Badge variant={pb.variant}>{platformLabel(m.platform)}</Badge>
                    <span className="flex items-center gap-1"><Clock size={11} />{formatDateTime(m.startTime)}</span>
                    {m.duration && <span className="flex items-center gap-1"><Clock size={11} />{formatDuration(m.duration)}</span>}
                    <span className="flex items-center gap-1"><Users size={11} />{m.participants.length} participants</span>
                    <span className="text-neutral-600">{m.department}</span>
                  </div>

                  {/* Participants */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex -space-x-2">
                      {m.participants.slice(0, 4).map(p => (
                        <Avatar key={p} name={p} size="sm" />
                      ))}
                      {m.participants.length > 4 && (
                        <div className="w-7 h-7 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-2xs text-neutral-500 font-medium" style={{ fontSize: '9px' }}>
                          +{m.participants.length - 4}
                        </div>
                      )}
                    </div>
                    <span className="text-2xs text-neutral-600" style={{ fontSize: '10px' }}>{m.organizer} (organiser)</span>
                  </div>
                </div>

                <div className="flex-shrink-0 hidden sm:flex items-center gap-2">
                  {m.summary && <Badge variant="success">Summary ready</Badge>}
                  {m.actionItems && m.actionItems.length > 0 && (
                    <Badge variant="info">{m.actionItems.length} actions</Badge>
                  )}
                  <ArrowRight size={16} className="text-neutral-600 group-hover:text-neutral-400 transition-colors ml-1" />
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="card p-12 text-center">
            <Video size={32} className="text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-500 text-sm">No meetings match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
