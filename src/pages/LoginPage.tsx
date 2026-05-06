import React, { useState } from 'react';
import { Zap, ArrowRight, Shield, Lock, Globe, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #090e1a 0%, #0f172a 50%, #0c1220 100%)' }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-1/2 relative overflow-hidden"
        style={{ borderRight: '1px solid rgba(51,65,85,0.2)' }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,123,232,0.08) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,123,232,0.04) 0%, transparent 60%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #007be8, #005fb8)', boxShadow: '0 4px 14px rgba(0,123,232,0.3)' }}
            >
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <div className="text-base font-bold text-white">Patterson Cheney</div>
              <div className="text-xs text-neutral-500">Virtual Meeting Assistant</div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
                style={{ background: 'rgba(0,123,232,0.08)', border: '1px solid rgba(0,123,232,0.15)' }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 8px rgba(34,197,94,0.5)', animation: 'emergencyPulse 2s ease-in-out infinite' }} />
                <span className="text-xs text-blue-300 font-medium">All systems operational</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
                Enterprise Meeting<br />
                <span className="gradient-text">Intelligence Platform</span>
              </h2>
              <p className="text-neutral-400 text-base leading-relaxed">
                AI-powered transcription, intelligent summaries, and automated action items across Microsoft Teams, Zoom, and Google Meet.
              </p>
            </div>

            {/* Platform integrations */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              {[
                { name: 'Microsoft Teams', color: '#5B5FC7', sub: 'Bot Framework' },
                { name: 'Zoom', color: '#2D8CFF', sub: 'Meeting SDK' },
                { name: 'Google Meet', color: '#00AC47', sub: 'Calendar API' },
              ].map(p => (
                <div key={p.name} className="p-3 rounded-xl text-center"
                  style={{ background: `${p.color}08`, border: `1px solid ${p.color}20` }}
                >
                  <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
                    style={{ background: `${p.color}15` }}
                  >
                    <CheckCircle size={14} style={{ color: p.color }} />
                  </div>
                  <p className="text-xs font-medium text-neutral-300">{p.name}</p>
                  <p className="text-neutral-600" style={{ fontSize: '9px' }}>{p.sub}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                { icon: Shield, label: 'Privacy Act 1988 compliant · SOC 2 aligned' },
                { icon: Lock, label: 'End-to-end AES-256 encryption · AU data residency' },
                { icon: Globe, label: '99.5% uptime SLA · Hosted in ap-southeast-2' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-neutral-400">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,123,232,0.1)' }}
                  >
                    <Icon size={12} className="text-blue-400" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-neutral-700">
            Powered by OmniSuiteAI · ABN 39 626 001 081
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-sm animate-slide-up">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #007be8, #005fb8)' }}
            >
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight">Patterson Cheney</div>
              <div className="text-neutral-500" style={{ fontSize: '10px' }}>Virtual Meeting Assistant</div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Admin Console</h1>
            <p className="text-sm text-neutral-500 leading-relaxed">Sign in with your Microsoft Entra ID credentials to access the secure admin console.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Work email address</label>
              <input
                type="email"
                className="input"
                placeholder="name@pattersoncheyney.com.au"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="btn-primary w-full justify-center py-2.5"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" style={{ animation: 'spin 0.6s linear infinite' }} />
                  Authenticating...
                </>
              ) : (
                <>
                  Continue with Microsoft SSO
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'rgba(51,65,85,0.4)' }} />
            <span className="text-xs text-neutral-600">or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(51,65,85,0.4)' }} />
          </div>

          <button
            onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 800); }}
            className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm text-neutral-300"
            style={{ border: '1px solid rgba(71,85,105,0.4)', background: 'rgba(30,41,59,0.3)' }}
          >
            <svg width="16" height="16" viewBox="0 0 21 21" fill="none">
              <path d="M10 0H0v10h10V0z" fill="#F25022" />
              <path d="M21 0H11v10h10V0z" fill="#7FBA00" />
              <path d="M10 11H0v10h10V11z" fill="#00A4EF" />
              <path d="M21 11H11v10h10V11z" fill="#FFB900" />
            </svg>
            Sign in with Microsoft Entra ID
          </button>

          {/* RBAC info */}
          <div className="mt-6 p-3 rounded-lg" style={{ background: 'rgba(30,41,59,0.3)', border: '1px solid rgba(51,65,85,0.2)' }}>
            <p className="text-neutral-500 mb-2" style={{ fontSize: '10px', fontWeight: 600 }}>ACCESS ROLES</p>
            <div className="space-y-1.5">
              {[
                { role: 'Super Admin', desc: 'Full access · Emergency stop', color: '#ef4444' },
                { role: 'Department Admin', desc: 'Manage team · View reports', color: '#007be8' },
                { role: 'Read Only', desc: 'View dashboards only', color: '#64748b' },
              ].map(r => (
                <div key={r.role} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                  <span className="text-neutral-400" style={{ fontSize: '11px' }}><span className="text-neutral-300 font-medium">{r.role}</span> — {r.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-neutral-700" style={{ fontSize: '10px' }}>
            By signing in you agree to OmniSuiteAI's Terms of Service.<br />All data is processed in Australian jurisdictions only.
          </p>
        </div>
      </div>
    </div>
  );
}
