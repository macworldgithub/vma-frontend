export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function roleLabel(role: string): string {
  const map: Record<string, string> = {
    super_admin: 'Super Admin',
    dept_admin: 'Department Admin',
    read_only: 'Read Only',
  };
  return map[role] ?? role;
}

export function platformLabel(p: string): string {
  const map: Record<string, string> = { teams: 'MS Teams', zoom: 'Zoom', google_meet: 'Google Meet' };
  return map[p] ?? p;
}

export function initials(name: string): string {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}
