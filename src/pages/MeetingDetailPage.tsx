import React, { useState } from 'react';
import { ArrowLeft, Video, Clock, Users, CheckSquare, FileText, MessageSquare, Download, Send } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockMeetings } from '../data/mockData';
import { formatDateTime, formatDuration, platformLabel } from '../utils/format';
import type { Page } from '../types';

interface MeetingDetailPageProps {
  meetingId: string;
  onNavigate: (page: Page) => void;
}

type Tab = 'summary' | 'transcript' | 'actions';

const platformIcon: Record<string, string> = {
  teams: '#005A9E',
  zoom: '#2D8CFF',
  google_meet: '#00AC47',
};

const priorityBadge: Record<string, 'error' | 'warning' | 'neutral'> = {
  high: 'error', medium: 'warning', low: 'neutral',
};

const actionStatusBadge: Record<string, 'success' | 'info' | 'neutral'> = {
  done: 'success', in_progress: 'info', open: 'neutral',
};

export function MeetingDetailPage({ meetingId, onNavigate }: MeetingDetailPageProps) {
  const [tab, setTab] = useState<Tab>('summary');
  const meeting = mockMeetings.find(m => m.id === meetingId);

  if (!meeting) {
    return (
      <div className="p-6">
        <button onClick={() => onNavigate('meetings')} className="btn-ghost mb-4"><ArrowLeft size={16} /> Back</button>
        <p className="text-neutral-500">Meeting not found.</p>
      </div>
    );
  }

  const statusBadge = { active: 'active', completed: 'success', scheduled: 'warning', cancelled: 'neutral' } as const;

  return (
    <div className="p-6 space-y-5 animate-fade-in max-w-5xl">
      {/* Back */}
      <button onClick={() => onNavigate('meetings')} className="btn-ghost -ml-1">
        <ArrowLeft size={16} /> Back to Meetings
      </button>

      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: platformIcon[meeting.platform] + '25' }}>
            <Video size={22} style={{ color: platformIcon[meeting.platform] }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-lg font-bold text-neutral-100">{meeting.title}</h1>
              <Badge variant={statusBadge[meeting.status] as 'active' | 'success' | 'warning' | 'neutral'} dot={meeting.status === 'active'}>
                {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
              <Badge variant={meeting.platform === 'teams' ? 'info' : meeting.platform === 'zoom' ? 'warning' : 'success'}>
                {platformLabel(meeting.platform)}
              </Badge>
              <span className="flex items-center gap-1"><Clock size={11} /> {formatDateTime(meeting.startTime)}</span>
              {meeting.duration && <span className="flex items-center gap-1"><Clock size={11} /> {formatDuration(meeting.duration)}</span>}
              <span className="flex items-center gap-1"><Users size={11} /> {meeting.participants.length} participants</span>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button className="btn-secondary text-xs"><Download size={14} /> Download PDF</button>
            <button className="btn-primary text-xs"><Send size={14} /> Send Summary</button>
          </div>
        </div>

        {/* Participants */}
        <div className="mt-5 pt-5 border-t border-neutral-800">
          <p className="text-xs font-medium text-neutral-500 mb-3">Participants</p>
          <div className="flex flex-wrap gap-2">
            {meeting.participants.map(p => (
              <div key={p} className="flex items-center gap-2 bg-neutral-800/60 rounded-full px-3 py-1.5">
                <Avatar name={p} size="sm" />
                <span className="text-xs text-neutral-300">{p}</span>
                {p === meeting.organizer && <span className="text-2xs text-neutral-600" style={{ fontSize: '9px' }}>(org)</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-900 border border-neutral-800 rounded-xl p-1 w-fit">
        {([
          { key: 'summary',    label: 'Summary',     icon: FileText },
          { key: 'transcript', label: 'Transcript',  icon: MessageSquare },
          { key: 'actions',    label: 'Action Items', icon: CheckSquare },
        ] as { key: Tab; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === key
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'summary' && (
        <div className="animate-fade-in space-y-4">
          {meeting.summary ? (
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-neutral-100 mb-3 flex items-center gap-2">
                <FileText size={15} className="text-brand-400" /> Executive Summary
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">{meeting.summary}</p>
            </div>
          ) : (
            <div className="card p-10 text-center">
              <FileText size={32} className="text-neutral-700 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">
                {meeting.status === 'scheduled' ? 'Summary will be generated after the meeting ends.' :
                 meeting.status === 'active' ? 'Summary will be ready within 10 minutes of meeting end.' :
                 'No summary available for this meeting.'}
              </p>
            </div>
          )}
          {meeting.actionItems && meeting.actionItems.length > 0 && (
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-neutral-100 mb-4 flex items-center gap-2">
                <CheckSquare size={15} className="text-success-400" /> Action Items ({meeting.actionItems.length})
              </h3>
              <div className="space-y-3">
                {meeting.actionItems.map(ai => (
                  <div key={ai.id} className="flex items-start gap-4 p-3 rounded-lg bg-neutral-800/40">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-200 mb-1">{ai.description}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                        <span className="flex items-center gap-1"><Users size={11} /> {ai.owner}</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> Due {ai.deadline}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <Badge variant={priorityBadge[ai.priority]}>{ai.priority}</Badge>
                      <Badge variant={actionStatusBadge[ai.status]}>{ai.status.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'transcript' && (
        <div className="card p-6 animate-fade-in">
          <h3 className="text-sm font-semibold text-neutral-100 mb-4 flex items-center gap-2">
            <MessageSquare size={15} className="text-brand-400" /> Meeting Transcript
          </h3>
          {meeting.transcript && meeting.transcript.length > 0 ? (
            <div className="space-y-4">
              {meeting.transcript.map(entry => (
                <div key={entry.id} className="flex gap-4">
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="text-2xs text-neutral-600 font-mono" style={{ fontSize: '10px' }}>{entry.timestamp}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar name={entry.speaker} size="sm" />
                      <span className="text-xs font-semibold text-neutral-300">{entry.speaker}</span>
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed pl-9">{entry.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare size={28} className="text-neutral-700 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">
                {meeting.status === 'scheduled' ? 'Transcript will be captured during the meeting.' :
                 meeting.status === 'active' ? 'Transcription in progress...' :
                 'No transcript available.'}
              </p>
            </div>
          )}
        </div>
      )}

      {tab === 'actions' && (
        <div className="card p-6 animate-fade-in">
          <h3 className="text-sm font-semibold text-neutral-100 mb-4 flex items-center gap-2">
            <CheckSquare size={15} className="text-success-400" /> Action Items
          </h3>
          {meeting.actionItems && meeting.actionItems.length > 0 ? (
            <div className="space-y-3">
              {meeting.actionItems.map(ai => (
                <div key={ai.id} className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-800 hover:border-neutral-700 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-200 mb-2">{ai.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
                        <span className="flex items-center gap-1.5">
                          <Avatar name={ai.owner} size="sm" />
                          {ai.owner}
                        </span>
                        <span className="flex items-center gap-1"><Clock size={11} /> Due {ai.deadline}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <Badge variant={priorityBadge[ai.priority]}>{ai.priority} priority</Badge>
                      <Badge variant={actionStatusBadge[ai.status]}>{ai.status.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckSquare size={28} className="text-neutral-700 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">No action items recorded for this meeting.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
