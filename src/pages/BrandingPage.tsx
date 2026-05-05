import React, { useState } from 'react';
import { Upload, Palette, Type, Eye, Check, RefreshCw } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

type Tab = 'assets' | 'colours' | 'fonts' | 'preview';

export function BrandingPage() {
  const [tab, setTab] = useState<Tab>('assets');
  const [primaryColor, setPrimaryColor] = useState('#003087');
  const [secondaryColor, setSecondaryColor] = useState('#C8102E');
  const [accentColor, setAccentColor] = useState('#00A0D2');
  const [fontHeading, setFontHeading] = useState('Inter');
  const [fontBody, setFontBody] = useState('Inter');
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-900 border border-neutral-800 rounded-xl p-1 w-fit flex-wrap">
        {([
          { key: 'assets',  label: 'Brand Assets',  icon: Upload },
          { key: 'colours', label: 'Colours',        icon: Palette },
          { key: 'fonts',   label: 'Typography',     icon: Type },
          { key: 'preview', label: 'Live Preview',   icon: Eye },
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

      {tab === 'assets' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-in">
          {/* Logo upload */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-1">Primary Logo</h3>
            <p className="text-xs text-neutral-500 mb-4">Recommended: SVG or PNG, min 400×120px, transparent background</p>
            <div className="border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center hover:border-brand-500/50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-xl bg-neutral-800 mx-auto mb-3 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                <Upload size={24} className="text-neutral-500" />
              </div>
              <p className="text-sm text-neutral-400 mb-1">Drop logo here or click to browse</p>
              <p className="text-xs text-neutral-600">SVG, PNG, JPG up to 5MB</p>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-neutral-800/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-neutral-300">patterson-cheney-logo.svg</p>
                <p className="text-2xs text-neutral-600" style={{ fontSize: '10px' }}>Uploaded 4 May 2026 · 18KB</p>
              </div>
              <Badge variant="success"><Check size={10} /> Active</Badge>
            </div>
          </div>

          {/* Avatar upload */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-1">VMA Bot Avatar</h3>
            <p className="text-xs text-neutral-500 mb-4">Square image shown in meeting platforms as bot profile. Min 200×200px.</p>
            <div className="border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center hover:border-brand-500/50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-brand-600/20 mx-auto mb-3 flex items-center justify-center border-2 border-brand-600/40 group-hover:border-brand-500/60 transition-colors">
                <span className="text-brand-400 font-bold text-lg">PC</span>
              </div>
              <p className="text-sm text-neutral-400 mb-1">Upload bot avatar</p>
              <p className="text-xs text-neutral-600">PNG, JPG · Min 200×200px</p>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-neutral-800/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-neutral-300">pc-bot-avatar.png</p>
                <p className="text-2xs text-neutral-600" style={{ fontSize: '10px' }}>Uploaded 4 May 2026 · 42KB</p>
              </div>
              <Badge variant="success"><Check size={10} /> Active</Badge>
            </div>
          </div>

          {/* Email header */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-1">Email Header Banner</h3>
            <p className="text-xs text-neutral-500 mb-4">Used in post-meeting summary emails. Recommended: 600×120px.</p>
            <div className="border-2 border-dashed border-neutral-700 rounded-xl p-6 text-center hover:border-brand-500/50 transition-colors cursor-pointer">
              <Upload size={20} className="text-neutral-500 mx-auto mb-2" />
              <p className="text-sm text-neutral-400">Upload email header</p>
              <p className="text-xs text-neutral-600">PNG, JPG · 600×120px recommended</p>
            </div>
          </div>

          {/* PDF footer */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-1">PDF Report Footer</h3>
            <p className="text-xs text-neutral-500 mb-4">Appears at the bottom of branded PDF meeting reports.</p>
            <div className="border-2 border-dashed border-neutral-700 rounded-xl p-6 text-center hover:border-brand-500/50 transition-colors cursor-pointer">
              <Upload size={20} className="text-neutral-500 mx-auto mb-2" />
              <p className="text-sm text-neutral-400">Upload PDF footer</p>
              <p className="text-xs text-neutral-600">PNG, JPG · 1200×80px recommended</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'colours' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-in">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-4">Brand Colour Palette</h3>
            <div className="space-y-5">
              {[
                { label: 'Primary Colour', desc: 'Main brand colour — headers, buttons, accents', value: primaryColor, onChange: setPrimaryColor },
                { label: 'Secondary Colour', desc: 'Supporting colour — highlights, tags', value: secondaryColor, onChange: setSecondaryColor },
                { label: 'Accent Colour', desc: 'Call-to-action and interactive elements', value: accentColor, onChange: setAccentColor },
              ].map(({ label, desc, value, onChange }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="relative">
                    <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-12 h-12 rounded-xl cursor-pointer border-0 bg-transparent p-0" />
                    <div className="w-12 h-12 rounded-xl border border-neutral-700 pointer-events-none absolute inset-0" style={{ backgroundColor: value }} />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-neutral-300 block mb-1">{label}</label>
                    <p className="text-2xs text-neutral-600 mb-2" style={{ fontSize: '10px' }}>{desc}</p>
                    <input
                      type="text"
                      value={value.toUpperCase()}
                      onChange={e => onChange(e.target.value)}
                      className="input text-xs font-mono w-28"
                      maxLength={7}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <button onClick={save} className={saved ? 'btn-secondary' : 'btn-primary'}>
                {saved ? <><Check size={15} /> Saved</> : 'Save Colours'}
              </button>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-4">Colour Preview</h3>
            <div className="rounded-xl overflow-hidden border border-neutral-800">
              <div className="p-4" style={{ backgroundColor: primaryColor }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PC</span>
                  </div>
                  <span className="text-white font-bold text-sm">Patterson Cheney VMA</span>
                </div>
              </div>
              <div className="bg-white p-5">
                <p className="font-bold mb-2" style={{ color: primaryColor }}>Meeting Summary</p>
                <p className="text-gray-600 text-sm mb-4">Your Q2 Sales Strategy meeting summary is ready.</p>
                <div className="flex gap-2">
                  <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: primaryColor }}>
                    View Summary
                  </div>
                  <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: secondaryColor }}>
                    Download PDF
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: accentColor + '20', color: accentColor }}>Action Item</span>
                  <span className="text-xs text-gray-400">Contact supplier re: lead times</span>
                </div>
              </div>
              <div className="p-3 text-center" style={{ backgroundColor: primaryColor + '15' }}>
                <p className="text-xs" style={{ color: primaryColor }}>Patterson Cheney Automotive Group · Confidential</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'fonts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-in">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-4">Typography Settings</h3>
            <div className="space-y-5">
              <div>
                <label className="label">Heading Font</label>
                <select className="input" value={fontHeading} onChange={e => setFontHeading(e.target.value)}>
                  <option value="Inter">Inter (default)</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Lato">Lato</option>
                </select>
              </div>
              <div>
                <label className="label">Body Font</label>
                <select className="input" value={fontBody} onChange={e => setFontBody(e.target.value)}>
                  <option value="Inter">Inter (default)</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Source Sans Pro">Source Sans Pro</option>
                </select>
              </div>
              <div>
                <label className="label">Tone of Voice</label>
                <select className="input">
                  <option>Professional &amp; Concise</option>
                  <option>Formal &amp; Detailed</option>
                  <option>Friendly &amp; Direct</option>
                </select>
              </div>
              <div>
                <label className="label">Email Signature Template</label>
                <textarea
                  className="input resize-none text-xs"
                  rows={3}
                  defaultValue="Patterson Cheney Automotive Group | Virtual Meeting Assistant&#10;Powered by OmniSuiteAI | All data stored in Australia"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button onClick={save} className={saved ? 'btn-secondary' : 'btn-primary'}>
                {saved ? <><Check size={15} /> Saved</> : 'Save Typography'}
              </button>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-4">Typography Preview</h3>
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <h1 className="font-bold text-xl mb-1 text-gray-900" style={{ fontFamily: fontHeading }}>Meeting Summary Report</h1>
              <p className="text-sm text-gray-400 mb-4" style={{ fontFamily: fontBody }}>5 May 2026 — Patterson Cheney Automotive Group</p>
              <h2 className="font-semibold text-base mb-2 text-gray-800" style={{ fontFamily: fontHeading }}>Executive Summary</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4" style={{ fontFamily: fontBody }}>
                The Q2 Sales Strategy meeting covered vehicle fleet review, hybrid model positioning, and updated finance packages for the mid-year sale campaign.
              </p>
              <h3 className="font-semibold text-sm mb-2 text-gray-800" style={{ fontFamily: fontHeading }}>Action Items</h3>
              <ul className="space-y-1">
                <li className="text-sm text-gray-600 flex items-start gap-2" style={{ fontFamily: fontBody }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                  Update CRM with new 2026 SUV model codes — Tom Bradley — Due 7 May
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {tab === 'preview' && (
        <div className="animate-fade-in space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-400">Live preview of branded outputs using your current configuration</p>
            <button className="btn-secondary text-xs"><RefreshCw size={13} /> Refresh Preview</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Email preview */}
            <div className="card overflow-hidden">
              <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-300">Email Template Preview</span>
                <Badge variant="info">Email</Badge>
              </div>
              <div className="bg-gray-100 p-4">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm max-w-md mx-auto">
                  <div className="p-5" style={{ backgroundColor: primaryColor }}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">PC</span>
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Patterson Cheney VMA</p>
                        <p className="text-white/70 text-xs">Virtual Meeting Assistant</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-800 font-bold text-base mb-1">Your meeting summary is ready</p>
                    <p className="text-gray-500 text-sm mb-4">Service Department Ops Review · 4 May 2026</p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-800 text-sm font-semibold mb-2">Summary</p>
                      <p className="text-gray-600 text-xs leading-relaxed">The team reviewed service bay throughput for April 2026. Key highlight: 12% increase in customer satisfaction...</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 py-2 rounded-lg text-center text-white text-xs font-medium" style={{ backgroundColor: primaryColor }}>View Full Summary</div>
                      <div className="py-2 px-3 rounded-lg text-center text-xs font-medium border" style={{ color: primaryColor, borderColor: primaryColor }}>PDF</div>
                    </div>
                  </div>
                  <div className="px-5 py-3 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">Patterson Cheney Automotive Group</p>
                    <p className="text-xs text-gray-400">Powered by OmniSuiteAI · Data stored in Australia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PDF preview */}
            <div className="card overflow-hidden">
              <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-300">PDF Report Preview</span>
                <Badge variant="warning">PDF</Badge>
              </div>
              <div className="bg-gray-100 p-4">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm max-w-md mx-auto p-6">
                  <div className="flex items-center justify-between mb-5 pb-4 border-b-2" style={{ borderColor: primaryColor }}>
                    <div>
                      <p className="font-bold text-xl" style={{ color: primaryColor }}>Meeting Report</p>
                      <p className="text-xs text-gray-400">Patterson Cheney Automotive Group</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                      <span className="text-white font-bold">PC</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Meeting</p>
                      <p className="text-sm font-semibold text-gray-800">Service Department Ops Review</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div><span className="text-gray-400">Date:</span> <span className="text-gray-700">4 May 2026</span></div>
                      <div><span className="text-gray-400">Duration:</span> <span className="text-gray-700">65 minutes</span></div>
                      <div><span className="text-gray-400">Platform:</span> <span className="text-gray-700">Google Meet</span></div>
                      <div><span className="text-gray-400">Participants:</span> <span className="text-gray-700">3</span></div>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Action Items</p>
                      <div className="space-y-1.5">
                        {['Contact supplier re: lead time', 'Publish updated SOP', 'Review staffing for peak'].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-2xs font-bold flex-shrink-0" style={{ backgroundColor: i === 0 ? secondaryColor : primaryColor, fontSize: '8px' }}>{i + 1}</span>
                            <span className="text-gray-600">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                    <p className="text-2xs text-gray-400" style={{ fontSize: '9px' }}>CONFIDENTIAL — Patterson Cheney Automotive Group · Powered by OmniSuiteAI · ABN 39 626 001 081</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
