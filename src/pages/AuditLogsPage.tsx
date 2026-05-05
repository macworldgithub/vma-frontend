import React, { useState } from 'react';
import { Search, Download, Filter, Shield, Settings, User, Zap } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockAuditLogs } from '../data/mockData';
import { formatDateTime } from '../utils/format';
import type { AuditEventType } from '../types';

const eventBadge: Record<AuditEventType, 'error' | 'warning' | 'info' | 'neutral'> = {
  security:    'error',
  config:      'warning',
  system:      'info',
  user_action: 'neutral',
};

const eventIcon: Record<AuditEventType, React.ElementType> = {
  security:    Shield,
  config:      Settings,
  user_action: User,
  system:      Zap,
};

export function AuditLogsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<AuditEventType | 'all'>('all');
  const [dateFilter, setDateFilter] = useState('');

  const filtered = mockAuditLogs.filter(log => {
    const matchSearch = log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || log.eventType === typeFilter;
    const matchDate = !dateFilter || log.timestamp.startsWith(dateFilter);
    return matchSearch && matchType && matchDate;
  });

  const countByType = (t: AuditEventType) => mockAuditLogs.filter(l => l.eventType === t).length;

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {([
          { type: 'user_action' as AuditEventType, label: 'User Actions' },
          { type: 'system' as AuditEventType,      label: 'System Events' },
          { type: 'config' as AuditEventType,      label: 'Config Changes' },
          { type: 'security' as AuditEventType,    label: 'Security Events' },
        ]).map(({ type, label }) => {
          const Icon = eventIcon[type];
          return (
            <button
              key={type}
              onClick={() => setTypeFilter(typeFilter === type ? 'all' : type)}
              className={`card p-4 text-left hover:border-neutral-700 transition-all ${typeFilter === type ? 'border-brand-500/50 bg-brand-500/5' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={14} className="text-neutral-500" />
                <Badge variant={eventBadge[type]}>{type.replace('_', ' ')}</Badge>
              </div>
              <div className="text-xl font-bold text-neutral-100">{countByType(type)}</div>
              <div className="text-2xs text-neutral-600 mt-0.5" style={{ fontSize: '10px' }}>{label}</div>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-neutral-800/70 border border-neutral-700/50 rounded-lg px-3 py-2">
          <Search size={14} className="text-neutral-500" />
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-neutral-300 placeholder-neutral-600 outline-none w-full"
          />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as AuditEventType | 'all')} className="input w-auto text-xs">
          <option value="all">All Event Types</option>
          <option value="user_action">User Actions</option>
          <option value="system">System</option>
          <option value="config">Config</option>
          <option value="security">Security</option>
        </select>
        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="input w-auto text-xs" />
        <button className="btn-secondary text-xs"><Download size={14} /> Export CSV</button>
      </div>

      {/* Logs table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/80">
                <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3">Timestamp</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">User</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Action</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden md:table-cell">Type</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden lg:table-cell">Details</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden lg:table-cell">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {filtered.map(log => {
                const Icon = eventIcon[log.eventType];
                return (
                  <tr key={log.id} className="table-row-hover">
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs text-neutral-400">{formatDateTime(log.timestamp)}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {log.userId !== 'system' ? (
                          <Avatar name={log.userName} size="sm" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center">
                            <Zap size={12} className="text-neutral-500" />
                          </div>
                        )}
                        <span className="text-xs text-neutral-400">{log.userName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <Icon size={13} className={
                          log.eventType === 'security' ? 'text-error-400' :
                          log.eventType === 'config' ? 'text-warning-400' :
                          log.eventType === 'system' ? 'text-brand-400' : 'text-neutral-500'
                        } />
                        <span className="text-xs text-neutral-200">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <Badge variant={eventBadge[log.eventType]}>{log.eventType.replace('_', ' ')}</Badge>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-neutral-500 max-w-xs truncate block">{log.details}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="font-mono text-2xs text-neutral-600" style={{ fontSize: '10px' }}>{log.ipAddress}</span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-neutral-600 text-sm">No logs match your filters</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-neutral-800 text-xs text-neutral-600">
          Showing {filtered.length} of {mockAuditLogs.length} log entries · Audit logs retained for 90 days
        </div>
      </div>
    </div>
  );
}
