import { useState } from 'react';
import {
  ChevronLeft, Video, Clock, Calendar, Download,
  Share2, CheckSquare, MessageSquare, Shield,
  ArrowUpRight, PlayCircle, Search, ExternalLink, Sparkles
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockMeetings } from '../data/mockData';
import { formatDateTime, formatDuration, platformLabel } from '../utils/format';
import type { Page } from '../types';

interface MeetingDetailPageProps {
  meetingId: string;
  onNavigate: (page: Page) => void;
}

const platformColors: Record<string, string> = {
  teams: '#7B83EB',
  zoom: '#2D8CFF',
  google_meet: '#00AC47',
};

export function MeetingDetailPage({ meetingId, onNavigate }: MeetingDetailPageProps) {
  const meeting = mockMeetings.find(m => m.id === meetingId) || mockMeetings[0];
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'action-items'>('summary');
  const [searchTranscript, setSearchTranscript] = useState('');

  const color = platformColors[meeting.platform];

  return (
    <div className="animate-fade-in">
      {/* Header Area */}
      <div className="bg-neutral-900/40 border-b border-neutral-800/60 sticky top-0 z-20 backdrop-blur-xl">
        <div className="p-6 max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('meetings')}
            className="btn-ghost text-xs mb-6 -ml-2"
          >
            <ChevronLeft size={16} /> Back to Sessions
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex gap-5 min-w-0">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}15`, color }}
              >
                <Video size={32} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-neutral-100 truncate">{meeting.title}</h1>
                  <Badge variant={meeting.status === 'active' ? 'active' : 'success'} dot={meeting.status === 'active'}>
                    <span className="capitalize">{meeting.status}</span>
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-neutral-600" />
                    {formatDateTime(meeting.startTime)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-neutral-600" />
                    {meeting.duration ? formatDuration(meeting.duration) : 'Session in progress'}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    {platformLabel(meeting.platform)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="btn-secondary">
                <Download size={16} /> Export
              </button>
              <button className="btn-primary">
                <Share2 size={16} /> Share Report
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-1 p-1 bg-neutral-950/50 rounded-xl border border-neutral-800/50 w-full md:w-fit overflow-x-auto no-scrollbar">
            {[
              { id: 'summary', label: 'AI Summary', icon: Sparkles },
              { id: 'transcript', label: 'Transcript', icon: MessageSquare },
              { id: 'action-items', label: 'Action Items', icon: CheckSquare },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'summary' | 'transcript' | 'action-items')}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  <Icon size={16} className={activeTab === tab.id ? 'text-blue-400' : ''} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'summary' && (
            <div className="space-y-6 animate-slide-up">
              <div className="card p-6">
                <h3 className="text-lg font-bold text-neutral-100 mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-blue-400" />
                  Executive Summary
                </h3>
                <div className="prose prose-invert max-w-none text-neutral-400 leading-relaxed space-y-4">
                  {meeting.summary ? (
                    <p className="text-sm">{meeting.summary}</p>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 rounded-full border-4 border-neutral-800 border-t-blue-500 animate-spin mx-auto mb-4" />
                      <p>VMA is processing the meeting intelligence report...</p>
                    </div>
                  )}
                </div>
              </div>

              {meeting.actionItems && meeting.actionItems.length > 0 && (
                <div className="card p-6">
                  <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-widest mb-4">Key Takeaways</h3>
                  <div className="space-y-3">
                    {meeting.actionItems.map(ai => (
                      <div key={ai.id} className="flex gap-4 p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/50">
                        <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${ai.priority === 'high' ? 'bg-rose-500' : ai.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-neutral-200 font-medium mb-1">{ai.description}</p>
                          <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                            <span className="font-bold uppercase">{ai.priority} priority</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-800" />
                            <span>Assigned to {ai.owner}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="card p-0 overflow-hidden animate-slide-up">
              <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                  <input
                    type="text"
                    placeholder="Search transcript phrases..."
                    className="input pl-10 h-10 text-xs"
                    value={searchTranscript}
                    onChange={e => setSearchTranscript(e.target.value)}
                  />
                </div>
                <button className="btn-secondary h-10 text-xs"><PlayCircle size={14} /> Play Sync</button>
              </div>
              <div className="max-h-[600px] overflow-y-auto p-6 space-y-8">
                {meeting.transcript?.map((entry) => (
                  <div key={entry.id} className="flex gap-4">
                    <div className="mt-1">
                      <Avatar name={entry.speaker} size="sm" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-neutral-100">{entry.speaker}</span>
                        <span className="text-[10px] text-neutral-600 font-mono">{entry.timestamp}</span>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {entry.text}
                      </p>
                    </div>
                  </div>
                ))}
                {!meeting.transcript && (
                  <div className="text-center py-20 text-neutral-500">
                    <MessageSquare size={40} className="mx-auto mb-4 text-neutral-800" />
                    <p>No transcript available for this session.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'action-items' && (
            <div className="space-y-4 animate-slide-up">
              {meeting.actionItems?.map(ai => (
                <div key={ai.id} className="card p-5 flex items-center gap-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${ai.status === 'done' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-800 text-neutral-500'}`}>
                    <CheckSquare size={20} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${ai.status === 'done' ? 'text-neutral-500 line-through' : 'text-neutral-100'}`}>
                      {ai.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <Avatar name={ai.owner} size="xs" />
                        <span>{ai.owner}</span>
                      </div>
                      <span className="w-1 h-1 rounded-full bg-neutral-800" />
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>Due {new Date(ai.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={ai.status === 'done' ? 'success' : ai.status === 'in_progress' ? 'warning' : 'neutral'}>
                    {ai.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Participants ({meeting.participants.length})</h3>
            <div className="space-y-3">
              {meeting.participants.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={p} size="sm" />
                    <span className="text-sm font-medium text-neutral-200">{p}</span>
                  </div>
                  {p === meeting.organizer && <Badge variant="info">Host</Badge>}
                </div>
              ))}
            </div>
            <button className="btn-secondary w-full text-xs mt-6">Invite More</button>
          </div>

          <div className="card p-6 border-blue-500/10 bg-blue-500/5">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Shield size={14} /> Security Compliance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500">Data Residency</span>
                <span className="text-neutral-200">AU (Sydney)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500">Encryption</span>
                <span className="text-neutral-200">AES-256 GCM</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500">Retention Policy</span>
                <span className="text-neutral-200">60 Days</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-800/50">
              <button className="text-[11px] text-blue-400 flex items-center gap-1.5 hover:underline">
                View Audit Log <ArrowUpRight size={12} />
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Integration Details</h3>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-600">Session ID</span>
                <span className="text-neutral-400 font-mono text-[10px] uppercase">{meeting.id}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-600">Bot Instance</span>
                <span className="text-emerald-400">VMA-BOT-042</span>
              </div>
            </div>
            <button className="btn-ghost w-full text-xs mt-4 flex items-center justify-center gap-2">
              <ExternalLink size={14} /> Join Original Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
