import { useState } from 'react';
import { Palette, Upload, RefreshCw, Eye, Layout, Type, Image as ImageIcon, Zap, Save, Undo } from 'lucide-react';

export function BrandingPage() {
  const [brandColor, setBrandColor] = useState('#3b82f6');
  const logoName = 'patterson-cheney-white.svg';
  const [fontFamily, setFontFamily] = useState('Inter');
  const [isSaving, setIsSaving] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-xl font-bold text-neutral-100">Enterprise Branding & Customization</h1>
          <p className="text-sm text-neutral-500 mt-1">Configure your organization's visual identity across the VMA platform.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Undo size={16} /> Reset
          </button>
          <button onClick={handleSave} className="btn-primary min-w-[140px]">
            {isSaving ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save size={16} /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Configuration Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card p-6">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <ImageIcon size={14} /> Brand Assets
            </h3>
            <div className="space-y-6">
              <div>
                <label className="label">Primary Logo (White/Inverse)</label>
                <div className="mt-2 border-2 border-dashed border-neutral-800 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 mx-auto mb-3 flex items-center justify-center text-neutral-600 group-hover:text-blue-400">
                    <Upload size={20} />
                  </div>
                  <p className="text-[11px] text-neutral-500 mb-1">{logoName}</p>
                  <p className="text-[10px] text-neutral-700 font-bold uppercase">PNG, SVG · Max 2MB</p>
                </div>
              </div>
              <div>
                <label className="label">Favicon</label>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center border border-neutral-700">
                    <Zap size={20} className="text-blue-400" />
                  </div>
                  <button className="btn-secondary text-xs">Replace Icon</button>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Palette size={14} /> Color Palette
            </h3>
            <div className="space-y-4">
              <div>
                <label className="label">Primary Brand Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={e => setBrandColor(e.target.value)}
                    className="w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer overflow-hidden"
                  />
                  <input
                    type="text"
                    value={brandColor}
                    onChange={e => setBrandColor(e.target.value)}
                    className="input font-mono text-xs flex-1 uppercase"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                {['#007be8', '#5B5FC7', '#00AC47', '#dc2626', '#1e293b'].map(c => (
                  <button
                    key={c}
                    onClick={() => setBrandColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${brandColor === c ? 'border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Type size={14} /> Typography
            </h3>
            <div>
              <label className="label">Display Font Family</label>
              <select
                value={fontFamily}
                onChange={e => setFontFamily(e.target.value)}
                className="input text-sm"
              >
                <option value="Inter">Inter (System Default)</option>
                <option value="Roboto">Roboto</option>
                <option value="Outfit">Outfit</option>
                <option value="Lexend">Lexend</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-8">
          <div className="card p-0 overflow-hidden sticky top-24">
            <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                </div>
                <div className="hidden sm:block ml-4 px-3 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-500 font-mono">
                  vma.pattersoncheyney.com.au
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${previewDevice === 'desktop' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    Desktop
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${previewDevice === 'mobile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    Mobile
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                  <Eye size={12} /> Live Platform Preview
                </div>
              </div>
            </div>

            <div className="p-4 md:p-12 bg-neutral-950 flex justify-center min-h-[400px] md:min-h-[500px]">
              {/* Mock Dashboard Preview */}
              <div className={`w-full transition-all duration-500 ease-in-out bg-[#090e1a] rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden origin-top ${previewDevice === 'mobile' ? 'max-w-[320px]' : 'max-w-2xl'}`}>
                <div className="h-14 border-b border-neutral-800 flex items-center px-6 gap-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: brandColor }}>
                    <Zap size={16} className="text-white" />
                  </div>
                  <div className="flex-1 h-2 bg-neutral-800 rounded-full w-32" />
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-neutral-800" />
                    <div className="w-2 h-2 rounded-full bg-neutral-800" />
                    <div className="w-6 h-6 rounded-full bg-neutral-800" />
                  </div>
                </div>
                <div className="p-8 space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="h-6 w-32 md:w-48 rounded-lg" style={{ backgroundColor: brandColor, opacity: 0.2 }} />
                      <div className="h-3 w-48 md:w-64 bg-neutral-800 rounded-lg" />
                    </div>
                    <div className="h-10 w-full sm:w-32 rounded-xl" style={{ backgroundColor: brandColor }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-24 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3 ${i > 1 && previewDevice === 'mobile' ? 'hidden' : ''}`}>
                        <div className="w-8 h-8 rounded-lg bg-neutral-800" />
                        <div className="h-2 w-16 bg-neutral-800 rounded-full" />
                        <div className="h-3 w-10 bg-neutral-800 rounded-full" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="h-16 bg-neutral-900 border border-neutral-800 rounded-2xl px-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-neutral-800" />
                          <div className="space-y-2">
                            <div className="h-3 w-32 bg-neutral-800 rounded-full" />
                            <div className="h-2 w-20 bg-neutral-800 rounded-full" />
                          </div>
                        </div>
                        <div className="h-6 w-16 rounded-full" style={{ backgroundColor: brandColor, opacity: 0.15 }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-neutral-900/50 border-t border-neutral-800">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Layout size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-100 mb-1">Platform Integration Mode</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Changes will apply to the Admin Console, Email Notifications, and the Virtual Assistant Bot's avatar across all platforms (Teams, Zoom, Google Meet).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
