import { useState, useEffect } from 'react';
import { Activity, Video, CheckCircle, Server, Database, ShieldCheck, Globe, Cpu, Network } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockMeetings, mockAuditLogs } from '../data/mockData';
import { platformLabel } from '../utils/format';
import type { Page } from '../types';

interface MonitoringPageProps {
  onNavigate: (page: Page, extra?: string) => void;
}

export function MonitoringPage({ onNavigate }: MonitoringPageProps) {
  const [uptimeSecs, setUptimeSecs] = useState(2592000);
  const [cpuUsage, setCpuUsage] = useState(24);
  const [memoryUsage, setMemoryUsage] = useState(42);

  useEffect(() => {
    const t = setInterval(() => {
      setUptimeSecs(v => v + 1);
      setCpuUsage(Math.floor(Math.random() * 15) + 20);
      setMemoryUsage(Math.floor(Math.random() * 5) + 40);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const activeMeetings = mockMeetings.filter(m => m.status === 'active');
  const recentLogs = [...mockAuditLogs].slice(0, 10);

  const systemServices = [
    { name: 'VMA Bot Orchestrator', status: 'healthy', latency: '38ms', load: '12%' },
    { name: 'Neural Transcription Engine', status: 'healthy', latency: '115ms', load: '65%' },
    { name: 'GPT Summary Processor', status: 'healthy', latency: '820ms', load: '48%' },
    { name: 'Teams Webhook Listener', status: 'healthy', latency: '22ms', load: '5%' },
    { name: 'Zoom SDK Relay', status: 'healthy', latency: '45ms', load: '18%' },
    { name: 'AU Data Residency Guard', status: 'healthy', latency: '8ms', load: '1%' },
    { name: 'Secure Blob Storage', status: 'healthy', latency: '52ms', load: '22%' },
    { name: 'Audit Log Archiver', status: 'healthy', latency: '14ms', load: '3%' },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl">
      {/* System Status Banner */}
      <div className="card-glow p-5 border-emerald-500/20 bg-emerald-500/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 relative">
              <CheckCircle size={28} />
              <div className="absolute inset-0 rounded-2xl animate-ping bg-emerald-500/20 opacity-40" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-neutral-100">Core Infrastructure Operational</h2>
                <Badge variant="success" dot>Global Live</Badge>
              </div>
              <p className="text-xs text-neutral-500">All services performing within target latency (SLA: 99.5%) · Region: ap-southeast-2 (Sydney)</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">System Uptime</p>
              <p className="font-mono text-lg font-bold text-emerald-400">{formatUptime(uptimeSecs)}</p>
            </div>
            <div className="text-right border-l border-neutral-800 pl-8">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Current SLA</p>
              <p className="text-lg font-bold text-neutral-100">99.98%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Hardware Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-blue-400" />
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">CPU Usage</span>
            </div>
            <span className="text-xs font-mono text-blue-400">{cpuUsage}%</span>
          </div>
          <div className="progress-bar h-1.5 mb-3">
            <div className="progress-bar-fill" style={{ width: `${cpuUsage}%` }} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-neutral-600">
            <span>Peak: 48%</span>
            <span>Scale: Auto</span>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-cyan-400" />
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Memory Pool</span>
            </div>
            <span className="text-xs font-mono text-cyan-400">{memoryUsage}%</span>
          </div>
          <div className="progress-bar h-1.5 mb-3">
            <div className="progress-bar-fill" style={{ width: `${memoryUsage}%`, backgroundColor: '#22d3ee' }} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-neutral-600">
            <span>Pool: 128GB</span>
            <span>Type: High-Speed</span>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Network size={16} className="text-emerald-400" />
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Network IO</span>
            </div>
            <span className="text-xs font-mono text-emerald-400">12.4 Gbps</span>
          </div>
          <div className="h-6 flex items-end gap-0.5">
            {[40, 60, 45, 80, 55, 70, 90, 65, 50, 75, 40, 60].map((v, i) => (
              <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-sm" style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-rose-400" />
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Security State</span>
            </div>
            <span className="text-xs font-bold text-emerald-400 uppercase">Secure</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-neutral-300 font-medium">Compliance Guard Active</span>
          </div>
          <p className="text-[10px] text-neutral-600 mt-2">Zero trust verified · AU residency active</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Meetings Monitor */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Video size={20} />
              </div>
              <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wider">Live Bot Sessions ({activeMeetings.length})</h3>
            </div>
            <button onClick={() => onNavigate('meetings')} className="btn-ghost text-xs">View History</button>
          </div>

          <div className="space-y-4">
            {activeMeetings.map(m => (
              <div key={m.id}
                onClick={() => onNavigate('meeting-detail', m.id)}
                className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-blue-500/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-neutral-100">{m.title}</span>
                      <Badge variant="active" dot>Streaming</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span className="capitalize">{platformLabel(m.platform)}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span>Dept: {m.department}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span>Started {new Date(m.startTime).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {m.participants.slice(0, 3).map((p, i) => <Avatar key={i} name={p} size="sm" />)}
                    {m.participants.length > 3 && (
                      <div className="w-7 h-7 rounded-full bg-neutral-800 border-2 border-neutral-950 flex items-center justify-center text-[9px] font-bold text-neutral-400">
                        +{m.participants.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800/50">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-blue-400" />
                    <span className="text-[10px] font-medium text-neutral-400 uppercase">Transcribing...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-emerald-400" />
                    <span className="text-[10px] font-medium text-neutral-400 uppercase">AU Region: ap-se2</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-neutral-600">BOT_ID: {m.id.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Grid Health */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Server size={20} />
            </div>
            <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wider">Service Grid</h3>
          </div>

          <div className="space-y-4">
            {systemServices.map(svc => (
              <div key={svc.name} className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/30 border border-neutral-800/50">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <p className="text-xs font-bold text-neutral-300 truncate">{svc.name}</p>
                  </div>
                  <p className="text-[10px] text-neutral-500 font-mono pl-3">{svc.latency} · Load: {svc.load}</p>
                </div>
                <Badge variant="success">OK</Badge>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-800 flex items-center justify-between">
            <div className="text-center flex-1 border-r border-neutral-800">
              <p className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Queue</p>
              <p className="text-sm font-bold text-neutral-100">0 Items</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Failures</p>
              <p className="text-sm font-bold text-emerald-400">0 / 24h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Logs Stream */}
      <div className="card overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-neutral-800/50">
          <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wider">Real-time Activity Stream</h3>
          <button onClick={() => onNavigate('audit-logs')} className="btn-ghost text-xs">Full Audit Log</button>
        </div>
        <div className="p-2">
          {recentLogs.map((log, i) => (
            <div key={log.id}
              className={`flex items-start gap-4 p-3 rounded-lg hover:bg-neutral-800/30 transition-all ${i === 0 ? 'bg-blue-500/5 animate-pulse' : ''}`}
            >
              <div className="w-20 pt-0.5">
                <span className="text-[10px] font-mono text-neutral-600">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-neutral-300 mb-0.5">{log.action}</p>
                <p className="text-[10px] text-neutral-500 truncate">{log.details}</p>
              </div>
              <div className="w-32 text-right">
                <Badge variant={log.eventType === 'security' ? 'error' : log.eventType === 'system' ? 'info' : 'neutral'}>
                  {log.eventType}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
