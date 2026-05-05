import React, { useState } from 'react';
import { Shield, Database, Bell, AlertTriangle, Check, Lock, Globe, Clock } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

type Tab = 'security' | 'data' | 'notifications' | 'service';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  desc?: string;
  danger?: boolean;
}

function Toggle({ checked, onChange, label, desc, danger }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${danger ? 'text-error-400' : 'text-neutral-200'}`}>{label}</p>
        {desc && <p className="text-xs text-neutral-500 mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex w-10 h-6 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none ${
          checked ? (danger ? 'bg-error-600' : 'bg-brand-600') : 'bg-neutral-700'
        }`}
      >
        <span className={`inline-block w-4 h-4 mt-1 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

export function SettingsPage() {
  const [tab, setTab] = useState<Tab>('security');
  const [saved, setSaved] = useState(false);

  // Security
  const [mfaRequired, setMfaRequired] = useState(true);
  const [ssoOnly, setSsoOnly] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('8');

  // Data
  const [transcriptRetention, setTranscriptRetention] = useState('60');
  const [audioAutoDelete, setAudioAutoDelete] = useState(true);
  const [encryptionAtRest, setEncryptionAtRest] = useState(true);
  const [dataResidency] = useState('AU (ap-southeast-2)');

  // Notifications
  const [emailOnComplete, setEmailOnComplete] = useState(true);
  const [emailOnError, setEmailOnError] = useState(true);
  const [slackNotifs, setSlackNotifs] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);

  // Service
  const [botEnabled, setBotEnabled] = useState(true);
  const [autoJoin, setAutoJoin] = useState(true);
  const [consentPrompt, setConsentPrompt] = useState(true);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 space-y-5 animate-fade-in max-w-4xl">
      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-900 border border-neutral-800 rounded-xl p-1 flex-wrap w-fit">
        {([
          { key: 'security',      label: 'Security',       icon: Shield },
          { key: 'data',          label: 'Data & Privacy', icon: Database },
          { key: 'notifications', label: 'Notifications',  icon: Bell },
          { key: 'service',       label: 'Service Control',icon: Globe },
        ] as { key: Tab; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === key ? 'bg-brand-600 text-white' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {tab === 'security' && (
        <div className="animate-fade-in space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Lock size={16} className="text-brand-400" />
              <h3 className="text-sm font-semibold text-neutral-100">Authentication & Access</h3>
            </div>
            <p className="text-xs text-neutral-500 mb-4">Configure how users authenticate and access the admin console.</p>
            <div className="divide-y divide-neutral-800/50">
              <Toggle checked={mfaRequired} onChange={setMfaRequired} label="Require Multi-Factor Authentication" desc="All users must complete MFA before accessing the admin console. Strongly recommended." />
              <Toggle checked={ssoOnly} onChange={setSsoOnly} label="Microsoft Entra ID SSO Only" desc="Disable password login — only allow authentication via Microsoft SSO." />
              <Toggle checked={ipWhitelist} onChange={setIpWhitelist} label="IP Allowlist" desc="Restrict admin console access to approved IP address ranges." />
            </div>
            <div className="pt-4 border-t border-neutral-800">
              <label className="label">Session timeout (hours)</label>
              <div className="flex items-center gap-3">
                <select className="input w-32" value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)}>
                  <option value="1">1 hour</option>
                  <option value="4">4 hours</option>
                  <option value="8">8 hours</option>
                  <option value="24">24 hours</option>
                </select>
                <p className="text-xs text-neutral-500">Users will be signed out after this period of inactivity.</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-3 flex items-center gap-2">
              <Shield size={15} className="text-success-400" /> Compliance Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Privacy Act 1988',       status: 'Compliant',    variant: 'success' as const },
                { label: 'ISO 27001 Alignment',    status: 'In Progress',  variant: 'warning' as const },
                { label: 'SOC 2 Type II',          status: 'In Progress',  variant: 'warning' as const },
                { label: 'AU Data Residency',      status: 'Enforced',     variant: 'success' as const },
                { label: 'TLS 1.3 Encryption',    status: 'Active',       variant: 'success' as const },
                { label: 'Pen Testing (last)',     status: 'Apr 2026',     variant: 'info' as const },
              ].map(({ label, status, variant }) => (
                <div key={label} className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/40">
                  <span className="text-xs text-neutral-400">{label}</span>
                  <Badge variant={variant}>{status}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={save} className={saved ? 'btn-secondary' : 'btn-primary'}>
              {saved ? <><Check size={15} /> Saved</> : 'Save Security Settings'}
            </button>
          </div>
        </div>
      )}

      {tab === 'data' && (
        <div className="animate-fade-in space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Database size={16} className="text-brand-400" />
              <h3 className="text-sm font-semibold text-neutral-100">Data Retention & Storage</h3>
            </div>
            <p className="text-xs text-neutral-500 mb-4">Control how long data is retained and where it is stored.</p>

            <div className="mb-4">
              <label className="label">Transcript retention period</label>
              <div className="flex items-center gap-3">
                <select className="input w-40" value={transcriptRetention} onChange={e => setTranscriptRetention(e.target.value)}>
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                </select>
                <p className="text-xs text-neutral-500">Transcripts are automatically deleted after this period.</p>
              </div>
            </div>

            <div className="divide-y divide-neutral-800/50">
              <Toggle checked={audioAutoDelete} onChange={setAudioAutoDelete} label="Auto-delete audio recordings after processing" desc="Raw audio is deleted immediately after transcript generation. Recommended for privacy compliance." />
              <Toggle checked={encryptionAtRest} onChange={setEncryptionAtRest} label="Encryption at rest" desc="All stored data is encrypted using AES-256. This cannot be disabled." />
            </div>

            <div className="mt-4 p-3 rounded-lg bg-neutral-800/40 flex items-center gap-3">
              <Globe size={14} className="text-success-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-neutral-300">Data Residency</p>
                <p className="text-2xs text-neutral-500" style={{ fontSize: '10px' }}>All data is processed and stored exclusively in: <span className="text-success-400 font-medium">{dataResidency}</span>. This cannot be changed.</p>
              </div>
            </div>
          </div>

          <div className="card p-5 border-error-500/20 bg-error-500/5">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={16} className="text-error-400" />
              <h3 className="text-sm font-semibold text-error-400">Danger Zone</h3>
            </div>
            <p className="text-xs text-neutral-500 mb-4">Irreversible actions that permanently delete data.</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-error-500/20">
                <div>
                  <p className="text-sm font-medium text-neutral-200">Delete all transcripts</p>
                  <p className="text-xs text-neutral-500">Permanently remove all stored transcripts. Cannot be undone.</p>
                </div>
                <button className="btn-danger text-xs">Delete All</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-error-500/20">
                <div>
                  <p className="text-sm font-medium text-neutral-200">Export & delete account data</p>
                  <p className="text-xs text-neutral-500">Export all data then remove from our systems. GDPR/APPs compliant.</p>
                </div>
                <button className="btn-danger text-xs">Export & Delete</button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={save} className={saved ? 'btn-secondary' : 'btn-primary'}>
              {saved ? <><Check size={15} /> Saved</> : 'Save Data Settings'}
            </button>
          </div>
        </div>
      )}

      {tab === 'notifications' && (
        <div className="animate-fade-in space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Bell size={16} className="text-brand-400" />
              <h3 className="text-sm font-semibold text-neutral-100">Email Notifications</h3>
            </div>
            <p className="text-xs text-neutral-500 mb-4">Configure which events trigger email notifications to admins.</p>
            <div className="divide-y divide-neutral-800/50">
              <Toggle checked={emailOnComplete} onChange={setEmailOnComplete} label="Meeting summary delivered" desc="Notify admin when a post-meeting summary is successfully delivered." />
              <Toggle checked={emailOnError} onChange={setEmailOnError} label="Bot join failure" desc="Alert when VMA bot fails to join a scheduled meeting." />
              <Toggle checked={weeklyReport} onChange={setWeeklyReport} label="Weekly usage digest" desc="Receive a weekly summary of meetings processed, seat utilisation, and system health." />
              <Toggle checked={slackNotifs} onChange={setSlackNotifs} label="Slack integration" desc="Post notifications to a configured Slack channel (webhook URL required)." />
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-4 flex items-center gap-2">
              <Clock size={15} className="text-brand-400" /> Notification Recipients
            </h3>
            <div className="space-y-3">
              <div>
                <label className="label">Admin notification email</label>
                <input className="input" type="email" defaultValue="admin@pattersoncheyney.com.au" />
              </div>
              <div>
                <label className="label">Slack webhook URL (optional)</label>
                <input className="input" type="url" placeholder="https://hooks.slack.com/services/..." />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={save} className={saved ? 'btn-secondary' : 'btn-primary'}>
              {saved ? <><Check size={15} /> Saved</> : 'Save Notification Settings'}
            </button>
          </div>
        </div>
      )}

      {tab === 'service' && (
        <div className="animate-fade-in space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Globe size={16} className="text-brand-400" />
              <h3 className="text-sm font-semibold text-neutral-100">VMA Bot Service Control</h3>
            </div>
            <p className="text-xs text-neutral-500 mb-4">Control the global meeting bot behaviour and platform integrations.</p>
            <div className="divide-y divide-neutral-800/50">
              <Toggle checked={botEnabled} onChange={setBotEnabled} label="VMA Bot Service" desc="Master switch. Disabling this prevents the bot from joining any meetings globally." />
              <Toggle checked={autoJoin} onChange={setAutoJoin} label="Auto-join scheduled meetings" desc="Bot automatically joins meetings where it has been invited or enabled per user." />
              <Toggle checked={consentPrompt} onChange={setConsentPrompt} label="Consent announcement on join" desc="Bot announces its presence and recording intent when joining. Required for compliance." />
            </div>
          </div>

          <div className="card p-5 border-error-500/30">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={16} className="text-error-400" />
              <h3 className="text-sm font-semibold text-error-300">Emergency Stop</h3>
            </div>
            <p className="text-xs text-neutral-500 mb-4">Immediately halt all VMA bot activity across all meetings. Use in the event of a security incident or compliance concern.</p>
            <div className="flex items-center justify-between p-4 rounded-xl border border-error-500/30 bg-error-500/5">
              <div>
                <p className="text-sm font-semibold text-neutral-100">Stop all active bots now</p>
                <p className="text-xs text-neutral-500">This will immediately disconnect the VMA bot from all active meetings and suspend the service. Requires Super Admin role.</p>
              </div>
              <button className="btn-danger flex-shrink-0 ml-4">
                <AlertTriangle size={15} /> Emergency Stop
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={save} className={saved ? 'btn-secondary' : 'btn-primary'}>
              {saved ? <><Check size={15} /> Saved</> : 'Save Service Settings'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
