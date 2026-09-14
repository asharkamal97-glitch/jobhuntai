import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  X, 
  Lock,
  DownloadCloud,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Key,
  HelpCircle,
  Zap
} from 'lucide-react';
import { WHOP_CHECKOUT_URL, LEMON_SQUEEZY_CHECKOUT_URL, activateLicense, isFullAccess } from '../../services/entitlement';

export { WHOP_CHECKOUT_URL, LEMON_SQUEEZY_CHECKOUT_URL };

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess?: () => void;
  isPro?: boolean;
  featureName?: string;
  headline?: string;
  reason?: string;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onUpgradeSuccess,
  isPro,
  featureName,
  headline,
  reason
}) => {
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [licenseInput, setLicenseInput] = useState('');
  const [activateMsg, setActivateMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleGetFullAccess = () => {
    window.open(WHOP_CHECKOUT_URL, '_blank', 'noopener,noreferrer');
  };

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseInput.trim()) return;
    const success = activateLicense(licenseInput.trim());
    if (success) {
      setActivateMsg({ type: 'success', text: 'Full Access activated successfully!' });
      if (onUpgradeSuccess) onUpgradeSuccess();
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setActivateMsg({ type: 'error', text: 'Please enter a valid key or order receipt.' });
    }
  };

  const includedFeatures = [
    'Unlimited Job Analyses & JD X-Ray',
    'Requirement Matrix & Custom Mapping',
    'Evidence Engine & Confidence Badges',
    'Application Blueprint & Alignment Scoring',
    'Resume Tailoring & Full Diff Exporter',
    'Claim Guardâ„¢ Anti-Hallucination Guard',
    'Achievement Builder (STAR Framework)',
    'ATS Compatibility & Safety Scanner',
    'Cover Letter Generator (4 Tone Variants)',
    'LinkedIn Optimizer & Outreach Scripts',
    'Interview Copilot & 10 STAR Briefs',
    'Interview Practice Simulator & Scoring',
    'Follow-Up Generator (7 Milestones)',
    'Job Application Pipeline Tracker',
    'Career Evidence Bank Persistent Memory',
    'Application Pack Exports (PDF/DOCX/MD)',
    '10-Module Digital Download Starter Kit'
  ];

  const modalHeadline = headline || (featureName 
    ? `Unlock ${featureName}` 
    : 'Ready to build your complete application?');

  const modalSub = reason || 'Unlock the full JOBHUNT AI workflow for $14.99 one-time.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{featureName ? 'Feature Preview' : 'Full Access'}</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">{modalHeadline}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Context callout if opened from a specific feature limit */}
          {featureName && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2.5">
              <Zap className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-950">You're viewing a free preview of {featureName}.</p>
                <p className="text-amber-800 text-[11px] mt-0.5">{modalSub}</p>
              </div>
            </div>
          )}

          {/* Main Pricing Offer Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-brand-50/70 to-slate-50 border-2 border-brand-500 shadow-sm relative space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-100 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700 block">
                  FULL JOBHUNT AI ACCESS
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  Lifetime Complete Application Suite
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <div className="flex items-baseline space-x-1 sm:justify-end">
                  <span className="text-3xl font-black text-slate-900">$14.99</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">ONE-TIME</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  Instant Access via Whop
                </span>
              </div>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Everything Unlocked in Full Access:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 font-medium">
                {includedFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span className="leading-tight">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-1">
            <button
              onClick={handleGetFullAccess}
              className="w-full py-3.5 text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-md transition flex items-center justify-center space-x-2 border border-amber-500"
            >
              <span>Get Full Access â€” $14.99</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center justify-center space-x-1.5"
            >
              <span>Continue with Free Preview</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center space-x-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secure 256-bit SSL Checkout powered by Whop â€¢ Evidence-First Architecture</span>
            </p>
          </div>

          {/* Already purchased / License Key activation accordion */}
          <div className="pt-2 border-t border-slate-100">
            {!showKeyInput ? (
              <button
                type="button"
                onClick={() => setShowKeyInput(true)}
                className="text-xs text-brand-600 hover:text-brand-800 font-medium flex items-center space-x-1 mx-auto"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Already purchased? Activate Full Access / Enter Order Key</span>
              </button>
            ) : (
              <form onSubmit={handleActivate} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <label className="block font-bold text-slate-700">
                  Enter your Order Receipt or Activation Key:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={licenseInput}
                    onChange={(e) => setLicenseInput(e.target.value)}
                    placeholder="e.g. Order ID or License Key"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition"
                  >
                    Activate
                  </button>
                </div>
                {activateMsg && (
                  <p className={`text-[11px] font-semibold ${activateMsg.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {activateMsg.text}
                  </p>
                )}
                <p className="text-[10px] text-slate-400">
                  Tip: After completing purchase on Whop, check your email receipt for your order ID or access link.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
