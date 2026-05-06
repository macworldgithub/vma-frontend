import { useState } from 'react';
import { Shield, Database, Bell, AlertTriangle, Check, Globe, Server, Fingerprint, Key, HardDrive, Share2 } from 'lucide-react';
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
    <div className="flex items-start justify-between gap-4 py-5">
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold ${danger ? 'text-rose-400' : 'text-neutral-200'}`}>{label}</p>
        {desc && <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? (danger ? 'bg-rose-600' : 'bg-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.4)]') : 'bg-neutral-800'
          }`}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('security');
  const [isSaving, setIsSaving] = useState(false);
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

  // Notifications
  const [emailOnComplete, setEmailOnComplete] = useState(true);
  const [emailOnError, setEmailOnError] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  // Service
  const [autoJoin, setAutoJoin] = useState(true);
  const [consentPrompt, setConsentPrompt] = useState(true);

  function handleSave() {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-100">System Settings</h1>
          <p className="text-sm text-neutral-500 mt-1">Global configuration for Patterson Cheney Enterprise instance.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`min-w-[160px] ${saved ? 'btn-secondary border-emerald-500/50 text-emerald-400' : 'btn-primary'}`}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Applying...
            </span>
          ) : saved ? (
            <span className="flex items-center gap-2">
              <Check size={16} /> Changes Saved
            </span>
          ) : (
            'Save All Settings'
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-3 flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {[
            { id: 'security', label: 'Security & Access', icon: Shield },
            { id: 'data', label: 'Data & Privacy', icon: Database },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'service', label: 'Service Policy', icon: Globe },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as Tab)}
              className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === t.id
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.05)]'
                  : 'text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/40'
                }`}
            >
              <t.icon size={18} />
              <span className="whitespace-nowrap">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === 'security' && (
            <div className="space-y-6 animate-slide-up">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Fingerprint size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-widest">Authentication</h3>
                    <p className="text-xs text-neutral-500">Configure zero-trust access policies</p>
                  </div>
                </div>

                <div className="divide-y divide-neutral-800/50">
                  <Toggle checked={mfaRequired} onChange={setMfaRequired} label="Require Multi-Factor Authentication" desc="All users must complete MFA before accessing the admin console. Strongly recommended." />
                  <Toggle checked={ssoOnly} onChange={setSsoOnly} label="Microsoft Entra ID SSO Only" desc="Disable password login — only allow authentication via Microsoft SSO." />
                  <Toggle checked={ipWhitelist} onChange={setIpWhitelist} label="IP Allowlist" desc="Restrict admin console access to approved corporate IP address ranges." />
                </div>

                <div className="mt-4 pt-6 border-t border-neutral-800">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <label className="label">Session Duration (Auto-Signout)</label>
                      <p className="text-[11px] text-neutral-600">Users will be signed out after this period of inactivity.</p>
                    </div>
                    <select className="input w-full md:w-48 h-11" value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)}>
                      <option value="1">1 hour</option>
                      <option value="4">4 hours</option>
                      <option value="8">8 hours</option>
                      <option value="24">24 hours</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Shield size={14} className="text-emerald-400" /> Compliance Hardening
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Privacy Act 1988', status: 'Compliant', variant: 'success' as const },
                    { label: 'SOC 2 Type II', status: 'In Progress', variant: 'warning' as const },
                    { label: 'AU Data Residency', status: 'Enforced', variant: 'success' as const },
                    { label: 'TLS 1.3 Encryption', status: 'Active', variant: 'success' as const },
                  ].map(({ label, status, variant }) => (
                    <div key={label} className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800/50">
                      <span className="text-xs font-medium text-neutral-400">{label}</span>
                      <Badge variant={variant}>{status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6 animate-slide-up">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <HardDrive size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-widest">Retention Policy</h3>
                    <p className="text-xs text-neutral-500">Manage data lifecycle and storage limits</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <label className="label">Meeting Intelligence Retention</label>
                      <p className="text-[11px] text-neutral-600">Transcripts and summaries are automatically purged after this period.</p>
                    </div>
                    <select className="input w-full md:w-48 h-11" value={transcriptRetention} onChange={e => setTranscriptRetention(e.target.value)}>
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>

                  <div className="divide-y divide-neutral-800/50">
                    <Toggle checked={audioAutoDelete} onChange={setAudioAutoDelete} label="Auto-delete raw audio files" desc="Raw media is deleted immediately after AI processing. Recommended for privacy." />
                    <Toggle checked={encryptionAtRest} onChange={setEncryptionAtRest} label="Hardware-level AES-256 GCM" desc="Immutable encryption for all stored data. This is an enterprise-wide requirement." />
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4">
                  <Globe size={18} className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-neutral-200">Regional Residency: AU East (Sydney)</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Instance strictly bound to Australian jurisdiction. No data leaves the territory.</p>
                  </div>
                </div>
              </div>

              <div className="card p-6 border-rose-500/10 bg-rose-500/5">
                <div className="flex items-center gap-2 mb-4 text-rose-400">
                  <AlertTriangle size={16} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Danger Zone</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-rose-500/20 bg-neutral-950/50">
                    <div>
                      <p className="text-sm font-bold text-neutral-200">Purge Instance Data</p>
                      <p className="text-xs text-neutral-500 mt-1">Irreversibly delete all historical meeting data across the organization.</p>
                    </div>
                    <button className="btn-danger text-xs px-6 py-2">Purge All</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-slide-up">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-widest">System Alerts</h3>
                    <p className="text-xs text-neutral-500">Configure administrative notification channels</p>
                  </div>
                </div>

                <div className="divide-y divide-neutral-800/50">
                  <Toggle checked={emailOnComplete} onChange={setEmailOnComplete} label="Meeting Processing Complete" desc="Receive an email when AI has finished generating meeting intelligence." />
                  <Toggle checked={emailOnError} onChange={setEmailOnError} label="Bot Join Exceptions" desc="Immediate alert if a bot is blocked or fails to connect to a session." />
                  <Toggle checked={weeklyReport} onChange={setWeeklyReport} label="Weekly Executive Digest" desc="High-level usage and compliance report delivered every Monday." />
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Share2 size={14} /> External Integration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="label">Slack / Teams Webhook URL</label>
                    <input className="input h-11" placeholder="https://hooks.slack.com/..." />
                    <p className="text-[10px] text-neutral-600 mt-2 italic">Format: JSON payload over HTTPS POST</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'service' && (
            <div className="space-y-6 animate-slide-up">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Server size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-widest">Service Behavior</h3>
                    <p className="text-xs text-neutral-500">Global bot interaction settings</p>
                  </div>
                </div>

                <div className="divide-y divide-neutral-800/50">
                  <Toggle checked={autoJoin} onChange={setAutoJoin} label="Auto-join calendar invitations" desc="VMA will automatically process invitations sent to the bot service account." />
                  <Toggle checked={consentPrompt} onChange={setConsentPrompt} label="Recording Consent Announcement" desc="Bots will verbally announce that the session is being transcribed upon joining." />
                </div>
              </div>

              <div className="card p-6 border-blue-500/10 bg-blue-500/5">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Key size={14} /> Platform Credentials
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {['Teams', 'Zoom', 'Meet'].map(p => (
                    <div key={p} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center text-center">
                      <p className="text-xs font-bold text-neutral-200 mb-2">{p}</p>
                      <Badge variant="success">Active</Badge>
                      <button className="text-[10px] text-neutral-600 mt-4 hover:text-blue-400 transition-colors uppercase font-bold">Rotate API Key</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
