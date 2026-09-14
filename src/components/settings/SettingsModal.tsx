import React, { useState } from 'react';
import { 
  Settings, 
  X, 
  Cpu, 
  RotateCcw, 
  Check, 
  ShieldCheck, 
  Save,
  HelpCircle,
  Database,
  Lock,
  Sparkles,
  Key,
  ExternalLink
} from 'lucide-react';
import { 
  getEntitlement, 
  isFullAccess, 
  activateLicense, 
  getMaskedLicenseKey,
  WHOP_CHECKOUT_URL 
} from '../../services/entitlement';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetToDemo: () => void;
  onClearData?: () => void;
  onEntitlementChange?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onResetToDemo,
  onClearData,
  onEntitlementChange
}) => {
  const [tier, setTier] = useState(getEntitlement());
  const [licenseInput, setLicenseInput] = useState('');
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseInput.trim()) return;
    const ok = activateLicense(licenseInput.trim());
    if (ok) {
      setTier('FULL_ACCESS');
      setMsg({ type: 'success', text: 'Full Access unlocked successfully!' });
      if (onEntitlementChange) onEntitlementChange();
    } else {
      setMsg({ type: 'error', text: 'Invalid order receipt format. Please enter your order key or license key (min 6 characters).' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-slate-700" />
            <h3 className="text-base font-bold text-slate-900">Application Settings & Engine</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">

          {/* Section 0: License & Access Tier */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                License & Access Tier
              </label>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                tier === 'FULL_ACCESS' 
                  ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {tier === 'FULL_ACCESS' ? 'FULL ACCESS ($14.99)' : 'FREE PREVIEW ($0)'}
              </span>
            </div>

            {tier === 'FULL_ACCESS' ? (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-amber-950 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Full Lifetime Access Active</span>
                  </div>
                  {getMaskedLicenseKey() && (
                    <span className="text-[10px] text-amber-800 font-mono bg-amber-100/80 px-2 py-0.5 rounded">
                      {getMaskedLicenseKey()}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-amber-900">
                  All 17 modules, unlimited job analyses, full diff exports, and the 10-module Starter Kit are fully unlocked.
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-800 block">Upgrade to Full Access</span>
                    <span className="text-[11px] text-slate-500">$14.99 one-time payment • Lifetime access</span>
                  </div>
                  <a
                    href={WHOP_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition text-xs border border-amber-500 flex-shrink-0"
                  >
                    <span>Buy ($14.99)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Manual Order Receipt activation */}
                <form onSubmit={handleActivate} className="pt-2 border-t border-slate-200/80 space-y-1.5">
                  <label className="block text-[10px] font-semibold text-slate-600">
                    Already purchased? Enter your order receipt or license key:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={licenseInput}
                      onChange={(e) => setLicenseInput(e.target.value)}
                      placeholder="e.g. LS-ORD-12345 or license key"
                      className="flex-1 px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded text-xs transition"
                    >
                      Activate
                    </button>
                  </div>
                  {msg && (
                    <p className={`text-[10px] font-semibold ${msg.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {msg.text}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
          
          {/* Section 1: Current Engine */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Current Engine
            </label>
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-950">Evidence-First Intelligence Engine</span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
                  Active
                </span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Fast, private, browser-based analysis. Runs 100% locally in your browser. No API key required.
              </p>
              <div className="pt-1 flex flex-wrap gap-2 text-[10px] text-emerald-700 font-medium">
                <span>? Zero Data Transmission</span>
                <span>•</span>
                <span>? Instant Latency (0ms)</span>
                <span>•</span>
                <span>? Zero Cost</span>
              </div>
            </div>
          </div>

          {/* Section 2: Advanced AI Models (Roadmap) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Advanced AI Models
              </label>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                Roadmap
              </span>
            </div>
            
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-600">
              <div className="flex items-center space-x-2 text-slate-800 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                <span>Optional Cloud Model Bridges (OpenAI, Claude, Gemini)</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Direct external API integrations for multi-model synthesis are planned for a future update. The application currently operates with complete fidelity using the built-in local engine.
              </p>
            </div>
          </div>

          {/* Section 3: Data Management & Reset */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="block font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Workspace Data Management
            </label>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="font-semibold text-slate-800 block">Load Demo Profile (Alex Morgan)</span>
                  <span className="text-[10px] text-slate-400">Populates sample job, requirements, tailored resume, and tracker.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onResetToDemo();
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition shadow-subtle flex-shrink-0"
                >
                  Load Demo
                </button>
              </div>

              {onClearData && (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-semibold text-slate-800 block">Clear All Data (Start Blank)</span>
                    <span className="text-[10px] text-slate-400">Removes all stored local data and returns to clean initial state.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClearData();
                      onClose();
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg transition shadow-subtle flex-shrink-0"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-black rounded-lg transition"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
