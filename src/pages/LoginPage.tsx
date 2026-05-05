import React, { useState } from 'react';
import { Zap, ArrowRight, Shield, Lock } from 'lucide-react';

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
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-r border-neutral-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-600/8 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent-500/6 blur-3xl" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <div className="text-base font-bold text-white">Patterson Cheney</div>
              <div className="text-xs text-neutral-500">Virtual Meeting Assistant</div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-3 py-1 mb-6">
                <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
                <span className="text-xs text-brand-300 font-medium">All systems operational</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                AI-powered meeting<br />intelligence for your team
              </h2>
              <p className="text-neutral-400 text-base leading-relaxed">
                Automated transcription, smart summaries, and action item extraction across Teams, Zoom, and Google Meet.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { icon: Shield, label: 'Privacy Act 1988 compliant' },
                { icon: Lock, label: 'End-to-end encrypted · AU data residency' },
                { icon: Zap, label: '99.5% uptime SLA · Auto-scaling' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-neutral-400">
                  <Icon size={14} className="text-brand-400 flex-shrink-0" />
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
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm animate-slide-in">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Patterson Cheney VMA</div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Console</h1>
            <p className="text-sm text-neutral-500">Sign in with your Microsoft Entra ID credentials to access the admin console.</p>
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
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
            <div className="flex-1 h-px bg-neutral-800" />
            <span className="text-xs text-neutral-600">or</span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

          <button
            onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 800); }}
            className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/50 transition-all text-sm text-neutral-300"
          >
            <svg width="16" height="16" viewBox="0 0 21 21" fill="none">
              <path d="M10 0H0v10h10V0z" fill="#F25022"/>
              <path d="M21 0H11v10h10V0z" fill="#7FBA00"/>
              <path d="M10 11H0v10h10V11z" fill="#00A4EF"/>
              <path d="M21 11H11v10h10V11z" fill="#FFB900"/>
            </svg>
            Sign in with Microsoft
          </button>

          <p className="mt-8 text-center text-2xs text-neutral-700" style={{ fontSize: '10px' }}>
            By signing in you agree to OmniSuiteAI's Terms of Service. All data is processed in Australian jurisdictions only.
          </p>
        </div>
      </div>
    </div>
  );
}
