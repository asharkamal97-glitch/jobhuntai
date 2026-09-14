import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Trash2, 
  RotateCcw, 
  HelpCircle,
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';
import { ClaimGuardItem } from '../../types';

interface ClaimGuardProps {
  items: ClaimGuardItem[];
  onResolveItem: (itemId: string, resolution: 'add_evidence' | 'remove_number' | 'keep_original', note?: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ClaimGuard: React.FC<ClaimGuardProps> = ({
  items,
  onResolveItem,
  onNavigateTab
}) => {
  const [addingEvidenceId, setAddingEvidenceId] = useState<string | null>(null);
  const [evidenceInput, setEvidenceInput] = useState('');

  const supportedItems = items.filter(i => i.status === 'SUPPORTED');
  const needsConfirmationItems = items.filter(i => i.status === 'NEEDS_USER_CONFIRMATION' || i.status === 'UNSUPPORTED');

  const handleSaveEvidence = (itemId: string) => {
    if (!evidenceInput.trim()) return;
    onResolveItem(itemId, 'add_evidence', `Verified with candidate note: ${evidenceInput}`);
    setAddingEvidenceId(null);
    setEvidenceInput('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Anti-Hallucination Firewall</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>Claim Guard™</span>
            <span className="text-xs uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold">Active</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Claim Guard™ scans every generated bullet and claim against your verified Career Evidence Bank to eliminate unsupported metrics, fake tools, or exaggerated scope.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-right hidden sm:block">
            <span className="block text-xs font-bold text-slate-900">
              {needsConfirmationItems.length === 0 ? '100% Verified' : `${needsConfirmationItems.length} Needs Review`}
            </span>
            <span className="text-[11px] text-slate-400">Zero Fabrications Allowed</span>
          </div>
        </div>
      </div>

      {/* Safety Status Callout */}
      {needsConfirmationItems.length === 0 ? (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start space-x-3.5 shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold">All Claims Are Verified & Truthful</h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Every numerical metric, timeline, and tool capability in your tailored resume is anchored to verifiable evidence in your history. You can confidently defend every bullet in interviews.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3.5 shadow-sm">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold">Action Required: {needsConfirmationItems.length} Unverified Claim(s) Flagged</h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              Claim Guard™ detected claims that lack direct factual evidence in your submitted materials. Resolve each item before final export to preserve 100% integrity.
            </p>
          </div>
        </div>
      )}

      {/* Items Needing User Confirmation */}
      {needsConfirmationItems.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Claims Requiring Verification ({needsConfirmationItems.length})
          </h3>

          <div className="space-y-3">
            {needsConfirmationItems.map((item) => {
              const isAdding = addingEvidenceId === item.id;

              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm space-y-4 text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-extrabold text-[10px] uppercase">
                          {item.claimType.replace('_', ' ')}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="font-semibold text-slate-600">{item.location}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {item.text}
                      </h4>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
                      Needs Verification
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
                    <strong className="text-slate-800 block mb-0.5">Flag Reason:</strong>
                    <p className="text-slate-500">{item.flagReason}</p>
                  </div>

                  {/* Add Evidence Input Field */}
                  {isAdding && (
                    <div className="p-3 rounded-xl bg-brand-50 border border-brand-200 space-y-2">
                      <label className="block text-xs font-bold text-brand-900">
                        Add Verified Evidence or Context:
                      </label>
                      <input
                        type="text"
                        value={evidenceInput}
                        onChange={(e) => setEvidenceInput(e.target.value)}
                        placeholder="e.g. Yes, I led this project in Q3 2024 and confirmed the metric in Mixpanel."
                        className="w-full px-3 py-2 text-xs border border-brand-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-brand-500"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleSaveEvidence(item.id)}
                          className="px-3 py-1 text-xs font-bold text-white bg-brand-600 rounded-lg hover:bg-brand-700"
                        >
                          Confirm & Add Evidence
                        </button>
                        <button
                          onClick={() => setAddingEvidenceId(null)}
                          className="px-3 py-1 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {!isAdding && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setAddingEvidenceId(item.id);
                          setEvidenceInput('');
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Evidence</span>
                      </button>

                      <button
                        onClick={() => onResolveItem(item.id, 'remove_number')}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Remove Number / Use Qualitative</span>
                      </button>

                      <button
                        onClick={() => onResolveItem(item.id, 'keep_original')}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center space-x-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Keep Original Wording</span>
                      </button>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Verified Claims History */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
          Verified Evidence Anchors ({supportedItems.length})
        </h3>

        <div className="space-y-2.5">
          {supportedItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-start justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-500">{item.location}</span>
                </div>
                <p className="font-semibold text-slate-900">{item.text}</p>
                <p className="text-[11px] text-slate-500">{item.flagReason}</p>
                {item.resolutionNote && (
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ✓ Resolution: {item.resolutionNote}
                  </p>
                )}
              </div>

              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                VERIFIED
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Educational Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white text-xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Claim Guard™ is locked to your personal Career Evidence Bank for persistent protection.</span>
        </div>
        <button
          onClick={() => onNavigateTab('evidencebank')}
          className="text-brand-300 hover:text-white font-bold flex items-center space-x-1 flex-shrink-0"
        >
          <span>Manage Bank</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
