import React, { useState } from 'react';
import { 
  FileText, 
  Check, 
  X, 
  Edit3, 
  Save, 
  CheckCircle2, 
  RotateCcw, 
  ShieldCheck, 
  Split, 
  Eye, 
  Download, 
  Sparkles,
  Info
} from 'lucide-react';
import { BulletChange } from '../../types';
import { exportResumeAsPDF, exportResumeAsDocx, exportTextFile } from '../../services/exportService';

interface ResumeTailorProps {
  bulletChanges: BulletChange[];
  originalResumeText: string;
  onUpdateBulletChange: (change: BulletChange) => void;
  onApproveAll: () => void;
  onNavigateTab: (tab: string) => void;
  candidateName?: string;
  targetJobTitle?: string;
  isFullAccess?: boolean;
  onOpenPricing?: (feature?: string) => void;
}

export const ResumeTailor: React.FC<ResumeTailorProps> = ({
  bulletChanges,
  originalResumeText,
  onUpdateBulletChange,
  onApproveAll,
  onNavigateTab,
  candidateName = 'Alex Morgan',
  targetJobTitle = 'Senior Product Marketing Manager',
  isFullAccess = false,
  onOpenPricing
}) => {
  const [viewMode, setViewMode] = useState<'review_cards' | 'side_by_side_diff' | 'final_preview'>('review_cards');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');

  const approvedCount = bulletChanges.filter(c => c.status === 'approved').length;
  const pendingCount = bulletChanges.filter(c => c.status === 'pending').length;
  const rejectedCount = bulletChanges.filter(c => c.status === 'rejected').length;

  const handleStartEdit = (change: BulletChange) => {
    setEditingId(change.id);
    setEditedText(change.customDraft || change.proposed);
  };

  const handleSaveEdit = (change: BulletChange) => {
    onUpdateBulletChange({
      ...change,
      customDraft: editedText,
      proposed: editedText,
      status: 'approved'
    });
    setEditingId(null);
  };

  // Construct tailored resume version from approved changes
  const buildTailoredResume = () => {
    let text = originalResumeText;
    bulletChanges.forEach(change => {
      if (change.status === 'approved') {
        const targetText = change.customDraft || change.proposed;
        // Replace in text
        if (text.includes(change.original)) {
          text = text.replace(change.original, targetText);
        }
      }
    });
    return text;
  };

  const tailoredResumeOutput = buildTailoredResume();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Controlled Rewriting System</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Resume Tailoring Engine & Diff
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Review proposed sentence refinements with clear rationale and evidence anchors. No change is applied until you approve it.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('review_cards')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              viewMode === 'review_cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Review Changes ({bulletChanges.length})
          </button>
          <button
            onClick={() => setViewMode('side_by_side_diff')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center space-x-1 ${
              viewMode === 'side_by_side_diff' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>Application Diff</span>
          </button>
          <button
            onClick={() => setViewMode('final_preview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center space-x-1 ${
              viewMode === 'final_preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Final Export</span>
          </button>
        </div>
      </div>

      {/* Progress & Quick Actions Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3 text-xs">
          <span className="font-bold text-slate-900">Review Status:</span>
          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold border border-emerald-200">
            {approvedCount} Approved
          </span>
          <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md font-semibold border border-amber-200">
            {pendingCount} Pending
          </span>
          {rejectedCount > 0 && (
            <span className="text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md font-semibold">
              {rejectedCount} Kept Original
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {pendingCount > 0 && (
            <button
              onClick={() => {
                if (!isFullAccess && onOpenPricing) {
                  onOpenPricing('Bulk Bullet Approvals & Full Export');
                  return;
                }
                onApproveAll();
              }}
              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition flex items-center space-x-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Approve All Verified ({pendingCount})</span>
            </button>
          )}
          <button
            onClick={() => onNavigateTab('claimguard')}
            className="px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition flex items-center space-x-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Verify with Claim Guard™</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Review Cards (Bullet by Bullet) */}
      {viewMode === 'review_cards' && (
        <div className="space-y-4">
          {bulletChanges.map((change, idx) => {
            const isEditing = editingId === change.id;

            return (
              <div 
                key={change.id}
                className={`bg-white rounded-2xl border transition shadow-sm overflow-hidden ${
                  change.status === 'approved' 
                    ? 'border-emerald-200 bg-emerald-50/10' 
                    : change.status === 'rejected'
                    ? 'border-slate-200 opacity-75'
                    : 'border-slate-200 hover:border-brand-300'
                }`}
              >
                {/* Card Header */}
                <div className="px-5 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{change.section}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {change.status === 'approved' && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>Approved for Tailored Resume</span>
                      </span>
                    )}
                    {change.status === 'rejected' && (
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                        Original Kept
                      </span>
                    )}
                    {change.status === 'pending' && (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        Needs Approval
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 text-xs">
                  
                  {/* CURRENT */}
                  <div className="space-y-1">
                    <span className="font-extrabold uppercase tracking-wider text-[10px] text-slate-400">Current Original</span>
                    <div className="p-3 rounded-xl bg-slate-50 text-slate-700 font-normal leading-relaxed border border-slate-100">
                      {change.original}
                    </div>
                  </div>

                  {/* PROPOSED */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold uppercase tracking-wider text-[10px] text-brand-600">Proposed Refinement</span>
                      <span className="text-[10px] text-slate-400">Preserves original facts</span>
                    </div>

                    {isEditing ? (
                      <div className="space-y-2">
                        <textarea
                          rows={3}
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="w-full p-3 text-xs border border-brand-500 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 outline-none leading-relaxed"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleSaveEdit(change)}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg shadow-sm hover:bg-emerald-700"
                          >
                            Save & Approve
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-brand-50/40 text-slate-900 font-semibold leading-relaxed border border-brand-200">
                        {change.customDraft || change.proposed}
                      </div>
                    )}
                  </div>

                  {/* WHY & EVIDENCE SOURCE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <strong className="text-slate-700 block mb-0.5">Why we recommend this:</strong>
                      <p className="text-slate-500 leading-relaxed">{change.why}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <strong className="text-slate-700 block mb-0.5">Evidence Source:</strong>
                      <p className="text-slate-500 leading-relaxed">{change.evidenceSource}</p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  {!isEditing && (
                    <div className="pt-2 flex items-center justify-end space-x-2 border-t border-slate-100">
                      <button
                        onClick={() => handleStartEdit(change)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Wording</span>
                      </button>

                      <button
                        onClick={() => onUpdateBulletChange({ ...change, status: 'rejected' })}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center space-x-1 ${
                          change.status === 'rejected'
                            ? 'bg-slate-300 text-slate-800'
                            : 'text-slate-600 hover:text-red-700 hover:bg-red-50 bg-slate-100'
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Keep Original</span>
                      </button>

                      <button
                        onClick={() => onUpdateBulletChange({ ...change, status: 'approved' })}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg shadow-sm transition flex items-center space-x-1 ${
                          change.status === 'approved'
                            ? 'bg-emerald-700 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Change</span>
                      </button>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: Side-by-Side Application Diff */}
      {viewMode === 'side_by_side_diff' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Application Diff: Original vs Tailored</h3>
              <p className="text-xs text-slate-500">Visual comparison showing approved wording refinements.</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1 text-slate-600">
                <span className="w-2.5 h-2.5 bg-slate-200 rounded" />
                <span>Original</span>
              </span>
              <span className="flex items-center space-x-1 text-emerald-700">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded" />
                <span>Tailored (Approved)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Resume Side */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono leading-relaxed whitespace-pre-wrap text-slate-700 overflow-y-auto max-h-[600px]">
              <div className="font-sans font-bold text-slate-900 pb-2 mb-2 border-b border-slate-200">
                ORIGINAL RESUME (UNTOUCHED)
              </div>
              {originalResumeText}
            </div>

            {/* Tailored Resume Side */}
            <div className="p-4 rounded-xl bg-emerald-50/30 border border-emerald-200 text-xs font-mono leading-relaxed whitespace-pre-wrap text-slate-900 overflow-y-auto max-h-[600px]">
              <div className="font-sans font-bold text-emerald-900 pb-2 mb-2 border-b border-emerald-200 flex justify-between items-center">
                <span>TAILORED RESUME ({approvedCount} APPROVED MODS)</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Ready</span>
              </div>
              {tailoredResumeOutput}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Final Export Preview */}
      {viewMode === 'final_preview' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Tailored Resume Ready for Export</h3>
              <p className="text-xs text-slate-500">
                ATS-compatible format • Single column • Zero fabricated qualifications
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  if (!isFullAccess && onOpenPricing) {
                    onOpenPricing('PDF Resume Export');
                    return;
                  }
                  exportResumeAsPDF(tailoredResumeOutput, candidateName, targetJobTitle);
                }}
                className="px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
              <button
                onClick={() => {
                  if (!isFullAccess && onOpenPricing) {
                    onOpenPricing('DOCX Resume Export');
                    return;
                  }
                  exportResumeAsDocx(tailoredResumeOutput, candidateName, targetJobTitle);
                }}
                className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export DOCX</span>
              </button>
              <button
                onClick={() => exportTextFile(tailoredResumeOutput, `${candidateName.replace(/\s+/g, '_')}_Resume.txt`)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition"
              >
                Export TXT
              </button>
            </div>
          </div>

          {/* Clean Resume Paper Container */}
          <div className="max-w-3xl mx-auto bg-white border border-slate-300 p-8 rounded-xl shadow-elevated text-slate-800 text-xs font-sans leading-relaxed whitespace-pre-wrap">
            {tailoredResumeOutput}
          </div>
        </div>
      )}

    </div>
  );
};
