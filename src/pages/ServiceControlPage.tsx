import { useState } from 'react';
import { Power, AlertTriangle, Shield, Search, Filter, MoreHorizontal, ToggleLeft, ToggleRight } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { mockUsers } from '../data/mockData';
import { Avatar } from '../components/ui/Avatar';

export function ServiceControlPage() {
  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [emergencyConfirm, setEmergencyConfirm] = useState(false);

  const toggleUserBot = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, botEnabled: !u.botEnabled } : u));
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.group?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl">
      {/* Global Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Power size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${globalEnabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                <Power size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-100">Global Service Status</h2>
                <p className="text-xs text-neutral-500">Master control for all VMA bot activity</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-800/30 border border-neutral-700/30 mb-6">
              <div>
                <p className="text-sm font-medium text-neutral-200">
                  Bot Service is {globalEnabled ? 'Active' : 'Disabled'}
                </p>
                <p className="text-xs text-neutral-500">
                  {globalEnabled ? 'Bots are currently permitted to join scheduled meetings.' : 'All bot activity is globally suspended.'}
                </p>
              </div>
              <button
                onClick={() => setGlobalEnabled(!globalEnabled)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none ${globalEnabled ? 'bg-blue-600' : 'bg-neutral-700'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ${globalEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-rose-400 mb-1">Global Emergency Stop</h3>
                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                    Immediately disconnect all active VMA bots from every meeting and prevent any new joins. This action is logged as a critical security event.
                  </p>

                  {!emergencyConfirm ? (
                    <button
                      onClick={() => setEmergencyConfirm(true)}
                      className="btn-emergency"
                    >
                      <Power size={16} /> Trigger Emergency Stop
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 animate-slide-in">
                      <button
                        onClick={() => { setGlobalEnabled(false); setEmergencyConfirm(false); }}
                        className="btn-danger text-xs px-6 py-2.5"
                      >
                        Confirm Stop All Bots
                      </button>
                      <button
                        onClick={() => setEmergencyConfirm(false)}
                        className="btn-ghost text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-blue-400" />
              <h2 className="text-sm font-bold text-neutral-100">Access Policy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-neutral-800/50">
                <span className="text-xs text-neutral-400">Auto-Join Enabled</span>
                <Badge variant="success">Yes</Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-neutral-800/50">
                <span className="text-xs text-neutral-400">Consent Required</span>
                <Badge variant="info">Enforced</Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-neutral-800/50">
                <span className="text-xs text-neutral-400">Max Concurrent Bots</span>
                <span className="text-xs font-mono text-neutral-200">50</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-neutral-400">Data Residency</span>
                <span className="text-xs text-blue-400 font-medium">AU (Sydney)</span>
              </div>
            </div>
          </div>
          <button className="btn-secondary w-full text-xs mt-6">
            Edit Global Policies
          </button>
        </div>
      </div>

      {/* Per-User / Group Controls */}
      <div className="card overflow-hidden">
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderBottom: '1px solid rgba(51,65,85,0.25)' }}>
          <div>
            <h2 className="text-sm font-semibold text-neutral-100">Granular Service Controls</h2>
            <p className="text-xs text-neutral-500 mt-1">Manage bot permissions per user or department</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={14} />
              <input
                type="text"
                placeholder="Search users or groups..."
                className="input pl-9 w-64 text-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn-secondary text-xs">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(51,65,85,0.2)' }}>
                <th className="text-left text-xs font-medium text-neutral-500 px-5 py-4">User & Group</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4 hidden sm:table-cell">Status</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4">Bot Permission</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4 hidden md:table-cell">Platforms</th>
                <th className="text-right text-xs font-medium text-neutral-500 px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="table-row-hover group/row" style={{ borderBottom: '1px solid rgba(51,65,85,0.1)' }}>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} url={user.avatarUrl} size="sm" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-neutral-200 truncate">{user.name}</p>
                        <p className="text-neutral-500" style={{ fontSize: '10px' }}>{user.group || user.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <Badge variant={user.status === 'active' ? 'success' : 'neutral'} dot={user.status === 'active'}>
                      {user.status === 'active' ? 'Online' : 'Suspended'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleUserBot(user.id)}
                      className="flex items-center gap-2 group"
                    >
                      {user.botEnabled ? (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <ToggleRight size={20} />
                          <span className="text-xs font-medium">Enabled</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-neutral-600">
                          <ToggleLeft size={20} />
                          <span className="text-xs font-medium">Disabled</span>
                        </div>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="flex gap-1">
                      {user.platforms?.map(p => (
                        <div
                          key={p}
                          className="w-5 h-5 rounded flex items-center justify-center bg-neutral-800 text-neutral-400"
                          title={p}
                        >
                          {p === 'teams' && <span className="text-[10px] font-bold text-[#7B83EB]">T</span>}
                          {p === 'zoom' && <span className="text-[10px] font-bold text-[#2D8CFF]">Z</span>}
                          {p === 'google_meet' && <span className="text-[10px] font-bold text-[#00AC47]">G</span>}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <button className="btn-ghost p-1.5 opacity-0 group-hover/row:opacity-100 transition-opacity">
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-neutral-900/50 flex items-center justify-between border-t border-neutral-800/50">
          <p className="text-xs text-neutral-500">
            Showing <span className="text-neutral-300 font-medium">{filtered.length}</span> users
          </p>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs px-3 py-1">Previous</button>
            <button className="btn-secondary text-xs px-3 py-1">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
