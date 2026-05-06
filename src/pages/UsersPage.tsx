import { useState } from 'react';
import { UserPlus, Upload, Search, MoreHorizontal, CreditCard as Edit2, Trash2, UserX, UserCheck, Download, Mail, ShieldCheck, Users, Zap } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Modal } from '../components/ui/Modal';
import { mockUsers } from '../data/mockData';
import { roleLabel, formatDateTime } from '../utils/format';
import type { User, UserRole, UserStatus } from '../types';



const roleColors: Record<UserRole, string> = {
  super_admin: '#ef4444',
  dept_admin: '#007be8',
  read_only: '#94a3b8',
};

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter] = useState<UserStatus | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'read_only' as UserRole, department: '' });

  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  function toggleStatus(id: string) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
    setMenuOpenId(null);
  }

  function deleteUser(id: string) {
    if (confirm('Are you sure you want to remove this user? This action cannot be undone.')) {
      setUsers(prev => prev.filter(u => u.id !== id));
      setMenuOpenId(null);
    }
  }

  function addUser() {
    const user: User = {
      id: `u${Date.now()}`,
      ...newUser,
      status: 'active',
      lastActive: new Date().toISOString(),
      meetingsJoined: 0,
      botEnabled: true,
      platforms: ['teams'],
      group: newUser.department
    };
    setUsers(prev => [...prev, user]);
    setNewUser({ name: '', email: '', role: 'read_only', department: '' });
    setShowAddModal(false);
  }

  const activeCount = users.filter(u => u.status === 'active').length;

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-7xl">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Total Users</p>
            <p className="text-2xl font-bold text-neutral-100">{users.length}</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Active Seats</p>
            <p className="text-2xl font-bold text-neutral-100">{activeCount} / 100</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Mail size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Pending Invites</p>
            <p className="text-2xl font-bold text-neutral-100">3</p>
          </div>
        </div>
      </div>

      {/* Actions & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
            <input
              type="text"
              placeholder="Search by name, email or department..."
              className="input pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value as UserRole | 'all')}
            className="input w-auto min-w-[140px]"
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="dept_admin">Department Admin</option>
            <option value="read_only">Read Only</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setShowBulkModal(true)} className="btn-secondary">
            <Upload size={16} /> Bulk Import
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            <UserPlus size={16} /> Add User
          </button>
        </div>
      </div>

      {/* Seat Utilisation Bar */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-neutral-400">Seat Utilisation</span>
          <span className="text-xs font-bold text-neutral-200">{activeCount}% used</span>
        </div>
        <div className="progress-bar">
          <div
            className={`progress-bar-fill ${activeCount > 90 ? 'danger' : activeCount > 70 ? 'warning' : ''}`}
            style={{ width: `${activeCount}%` }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(51,65,85,0.25)', background: 'rgba(30,41,59,0.2)' }}>
                <th className="text-left text-xs font-medium text-neutral-500 px-5 py-4">User Details</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4 hidden sm:table-cell">Role</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4 hidden md:table-cell">Department</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4 hidden lg:table-cell">Status</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4 hidden xl:table-cell">Bot Access</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4 hidden xl:table-cell">Last Active</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4 hidden lg:table-cell">Usage</th>
                <th className="text-right text-xs font-medium text-neutral-500 px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {filtered.map(user => (
                <tr key={user.id} className="table-row-hover group/row">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} url={user.avatarUrl} size="md" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-neutral-200 truncate">{user.name}</p>
                        <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: roleColors[user.role] }} />
                      <span className="text-xs font-medium text-neutral-300">{roleLabel(user.role)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-neutral-400 hidden md:table-cell">{user.department}</td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <Badge variant={user.status === 'active' ? 'success' : 'neutral'} dot={user.status === 'active'}>
                      {user.status === 'active' ? 'Active' : 'Suspended'}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 hidden xl:table-cell">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.botEnabled ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                      <span className="text-[11px] text-neutral-300">{user.botEnabled ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-neutral-500 hidden xl:table-cell">
                    {formatDateTime(user.lastActive)}
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500/50" style={{ width: `${Math.min((user.meetingsJoined / 150) * 100, 100)}%` }} />
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">{user.meetingsJoined}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right relative">
                    <button
                      onClick={() => setMenuOpenId(menuOpenId === user.id ? null : user.id)}
                      className="btn-ghost p-1.5 rounded-lg hover:bg-neutral-800"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {menuOpenId === user.id && (
                      <div className="absolute right-12 top-4 z-20 w-48 animate-scale-in rounded-xl overflow-hidden glass-panel shadow-2xl"
                        style={{ border: '1px solid rgba(51,65,85,0.4)' }}
                      >
                        <button className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-neutral-300 hover:bg-neutral-800 transition-colors">
                          <Edit2 size={14} /> Edit Profile
                        </button>
                        <button onClick={() => toggleStatus(user.id)} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-neutral-300 hover:bg-neutral-800 transition-colors">
                          {user.status === 'active' ? <UserX size={14} className="text-amber-400" /> : <UserCheck size={14} className="text-emerald-400" />}
                          {user.status === 'active' ? 'Suspend User' : 'Activate User'}
                        </button>
                        <button
                          onClick={() => {
                            setUsers(prev => prev.map(u => u.id === user.id ? { ...u, botEnabled: !u.botEnabled } : u));
                            setMenuOpenId(null);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-neutral-300 hover:bg-neutral-800 transition-colors"
                        >
                          <Zap size={14} className={user.botEnabled ? 'text-amber-400' : 'text-neutral-500'} />
                          {user.botEnabled ? 'Disable Assistant' : 'Enable Assistant'}
                        </button>
                        <div className="h-px bg-neutral-800" />
                        <button onClick={() => deleteUser(user.id)} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors">
                          <Trash2 size={14} /> Remove User
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-20">
                    <Users size={40} className="mx-auto text-neutral-800 mb-4" />
                    <p className="text-neutral-500">No users found matching your search</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-neutral-900/30 flex items-center justify-between" style={{ borderTop: '1px solid rgba(51,65,85,0.2)' }}>
          <p className="text-xs text-neutral-500">
            Showing <span className="text-neutral-300 font-bold">{filtered.length}</span> of {users.length} total users
          </p>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs px-4 py-1.5"><Download size={14} /> Export CSV</button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Provision New User" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input className="input" placeholder="Jane Smith" value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="label">Department</label>
              <input className="input" placeholder="Sales" value={newUser.department} onChange={e => setNewUser(p => ({ ...p, department: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="label">Work Email (Microsoft Entra ID)</label>
            <input className="input" type="email" placeholder="jane.smith@pattersoncheyney.com.au" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div>
            <label className="label">Access Role</label>
            <div className="grid grid-cols-3 gap-3">
              {(['read_only', 'dept_admin', 'super_admin'] as UserRole[]).map(role => (
                <button
                  key={role}
                  onClick={() => setNewUser(p => ({ ...p, role }))}
                  className={`p-3 rounded-xl border text-center transition-all ${newUser.role === role ? 'bg-blue-600/10 border-blue-500 text-white' : 'border-neutral-700 text-neutral-500 hover:border-neutral-600'}`}
                >
                  <p className="text-xs font-bold capitalize">{role.replace('_', ' ').replace('dept', 'Department')}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button onClick={() => setShowAddModal(false)} className="btn-ghost">Cancel</button>
            <button onClick={addUser} disabled={!newUser.name || !newUser.email} className="btn-primary px-8">Create Account</button>
          </div>
        </div>
      </Modal>

      {/* Bulk Import Modal */}
      <Modal open={showBulkModal} onClose={() => setShowBulkModal(false)} title="Bulk User Import" size="md">
        <div className="space-y-6">
          <div className="border-2 border-dashed border-neutral-800 rounded-2xl p-10 text-center hover:border-blue-500/50 transition-all cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-neutral-800 mx-auto mb-4 flex items-center justify-center text-neutral-600 group-hover:text-blue-400 transition-colors">
              <Upload size={32} />
            </div>
            <h3 className="text-sm font-bold text-neutral-200 mb-1">Upload CSV File</h3>
            <p className="text-xs text-neutral-500 mb-6">Drag and drop your user directory file here</p>
            <button className="btn-secondary text-xs px-6">Browse Files</button>
          </div>

          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
            <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-3">CSV Format Guide</p>
            <code className="text-[10px] text-neutral-500 font-mono block leading-relaxed">
              name, email, department, role<br />
              Jane Smith, jane@pattersoncheyney.com.au, Sales, dept_admin<br />
              John Doe, john@pattersoncheyney.com.au, HR, read_only
            </code>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowBulkModal(false)} className="btn-ghost">Cancel</button>
            <button className="btn-primary px-8" disabled>Process Import</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
