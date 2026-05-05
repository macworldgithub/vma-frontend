import React, { useState } from 'react';
import { UserPlus, Upload, Search, MoreHorizontal, CreditCard as Edit2, Trash2, UserX, UserCheck } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Modal } from '../components/ui/Modal';
import { mockUsers } from '../data/mockData';
import { roleLabel, formatDateTime } from '../utils/format';
import type { User, UserRole, UserStatus } from '../types';

const roleBadge: Record<UserRole, 'error' | 'info' | 'neutral'> = {
  super_admin: 'error',
  admin:       'info',
  read_only:   'neutral',
};

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
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
    setUsers(prev => prev.filter(u => u.id !== id));
    setMenuOpenId(null);
  }

  function addUser() {
    const user: User = {
      id: `u${Date.now()}`,
      ...newUser,
      status: 'active',
      lastActive: new Date().toISOString(),
      meetingsJoined: 0,
    };
    setUsers(prev => [...prev, user]);
    setNewUser({ name: '', email: '', role: 'read_only', department: '' });
    setShowAddModal(false);
  }

  const activeCount = users.filter(u => u.status === 'active').length;

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-400">
            <span className="text-neutral-100 font-medium">{activeCount}</span> active seats ·{' '}
            <span className="text-neutral-100 font-medium">{100 - activeCount}</span> available of 100 total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowBulkModal(true)} className="btn-secondary">
            <Upload size={15} /> Bulk Import CSV
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            <UserPlus size={15} /> Add User
          </button>
        </div>
      </div>

      {/* Seat utilisation */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="text-neutral-500">Seat utilisation</span>
          <span className="text-neutral-200 font-medium">{activeCount}/100 seats active</span>
        </div>
        <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${activeCount > 90 ? 'bg-error-500' : activeCount > 70 ? 'bg-warning-500' : 'bg-brand-500'}`}
            style={{ width: `${activeCount}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-neutral-800/70 border border-neutral-700/50 rounded-lg px-3 py-2">
          <Search size={14} className="text-neutral-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-neutral-300 placeholder-neutral-600 outline-none w-full"
          />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value as UserRole | 'all')} className="input w-auto text-xs">
          <option value="all">All Roles</option>
          <option value="super_admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="read_only">Read Only</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as UserStatus | 'all')} className="input w-auto text-xs">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/80">
                <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3">User</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden md:table-cell">Department</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Role</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden lg:table-cell">Last Active</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden lg:table-cell">Meetings</th>
                <th className="w-10 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {filtered.map(user => (
                <tr key={user.id} className="table-row-hover">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} url={user.avatarUrl} size="sm" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-neutral-200 truncate">{user.name}</p>
                        <p className="text-2xs text-neutral-600 truncate" style={{ fontSize: '10px' }}>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell text-xs text-neutral-400">{user.department}</td>
                  <td className="px-4 py-3.5"><Badge variant={roleBadge[user.role]}>{roleLabel(user.role)}</Badge></td>
                  <td className="px-4 py-3.5">
                    <Badge variant={user.status === 'active' ? 'success' : 'error'} dot={user.status === 'active'}>
                      {user.status === 'active' ? 'Active' : 'Suspended'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell text-xs text-neutral-500">{formatDateTime(user.lastActive)}</td>
                  <td className="px-4 py-3.5 hidden lg:table-cell text-xs text-neutral-400">{user.meetingsJoined}</td>
                  <td className="px-4 py-3.5 relative">
                    <button onClick={() => setMenuOpenId(menuOpenId === user.id ? null : user.id)} className="btn-ghost p-1 rounded">
                      <MoreHorizontal size={14} />
                    </button>
                    {menuOpenId === user.id && (
                      <div className="absolute right-4 top-10 z-20 w-44 bg-neutral-900 border border-neutral-800 rounded-xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] animate-slide-in overflow-hidden">
                        <button className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-neutral-300 hover:bg-neutral-800 transition-colors">
                          <Edit2 size={13} /> Edit User
                        </button>
                        <button onClick={() => toggleStatus(user.id)} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-neutral-300 hover:bg-neutral-800 transition-colors">
                          {user.status === 'active' ? <UserX size={13} /> : <UserCheck size={13} />}
                          {user.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                        <div className="border-t border-neutral-800" />
                        <button onClick={() => deleteUser(user.id)} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-error-400 hover:bg-error-500/10 transition-colors">
                          <Trash2 size={13} /> Remove User
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-10 text-neutral-600 text-sm">No users match your filters</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-neutral-800 text-xs text-neutral-600">
          Showing {filtered.length} of {users.length} users
        </div>
      </div>

      {/* Add User Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add New User">
        <div className="space-y-4">
          <div>
            <label className="label">Full name</label>
            <input className="input" placeholder="Jane Smith" value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div>
            <label className="label">Work email</label>
            <input className="input" type="email" placeholder="jane.smith@pattersoncheyney.com.au" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div>
            <label className="label">Department</label>
            <input className="input" placeholder="e.g. Sales, Service, Finance" value={newUser.department} onChange={e => setNewUser(p => ({ ...p, department: e.target.value }))} />
          </div>
          <div>
            <label className="label">Role</label>
            <select className="input" value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value as UserRole }))}>
              <option value="read_only">Read Only</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
            <button onClick={addUser} disabled={!newUser.name || !newUser.email} className="btn-primary">Add User</button>
          </div>
        </div>
      </Modal>

      {/* Bulk Import Modal */}
      <Modal open={showBulkModal} onClose={() => setShowBulkModal(false)} title="Bulk Import Users (CSV)">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center hover:border-brand-500/50 transition-colors">
            <Upload size={24} className="text-neutral-600 mx-auto mb-3" />
            <p className="text-sm text-neutral-400 mb-1">Drop your CSV file here</p>
            <p className="text-xs text-neutral-600 mb-4">Required columns: name, email, department, role</p>
            <button className="btn-secondary text-xs">Browse file</button>
          </div>
          <div className="bg-neutral-800/50 rounded-lg p-3">
            <p className="text-xs font-medium text-neutral-400 mb-2">CSV format example:</p>
            <code className="text-2xs text-neutral-500 font-mono block" style={{ fontSize: '10px' }}>
              name,email,department,role<br />
              Jane Smith,jane@pattersoncheyney.com.au,Sales,read_only<br />
              John Doe,john@pattersoncheyney.com.au,Finance,admin
            </code>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowBulkModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary" disabled>Import Users</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
