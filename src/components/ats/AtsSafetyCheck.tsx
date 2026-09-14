import React from 'react';
import { 
  CheckSquare, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';
import { AtsCheckResult } from '../../types';

interface AtsSafetyCheckProps {
  checks: AtsCheckResult[];
  onNavigateTab: (tab: string) => void;
}

export const AtsSafetyCheck: React.FC<AtsSafetyCheckProps> = ({
  checks,
  onNavigateTab
}) => {
  const passCount = checks.filter(c => c.status === 'PASS').length;
  const reviewCount = checks.filter(c => c.status === 'REVIEW').length;
  const fixCount = checks.filter(c => c.status === 'FIX').length;

  const getStatusBadge = (status: AtsCheckResult['status']) => {
    switch (status) {
      case 'PASS':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            PASS
          </span>
        );
      case 'REVIEW':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            REVIEW
          </span>
        );
      case 'FIX':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 mr-1" />
            FIX REQUIRED
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Parser Compatibility Inspection</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Resume Compatibility Check
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            We evaluate your resume structure against industry ATS parsing standards (Workday, Greenhouse, Lever, Taleo) to prevent parse errors without making false hiring guarantees.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
            {passCount} Pass
          </span>
          {reviewCount > 0 && (
            <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 font-bold border border-amber-200">
              {reviewCount} Review
            </span>
          )}
          {fixCount > 0 && (
            <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 font-bold border border-rose-200">
              {fixCount} Fix
            </span>
          )}
        </div>
      </div>

      {/* Honest Disclaimer Callout */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start space-x-3">
        <Info className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800">Realistic Compatibility Standards:</strong>
          <p className="mt-0.5 text-slate-500 text-[11px] leading-relaxed">
            No software can honestly guarantee "100% ATS score" because ATS platforms are database applicant trackers, not predictive algorithms. This check ensures your text format, contact headers, date chronology, and section hierarchy parse accurately into recruiter databases.
          </p>
        </div>
      </div>

      {/* 11 Compatibility Check Items */}
      <div className="space-y-3">
        {checks.map((chk) => (
          <div 
            key={chk.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {chk.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{chk.checkTitle}</h3>
              </div>
              <div>{getStatusBadge(chk.status)}</div>
            </div>

            <p className="text-slate-600 leading-relaxed">{chk.explanation}</p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
              <strong className="text-slate-900 block mb-0.5">Remediation Guidance:</strong>
              <p className="text-slate-500 leading-relaxed">{chk.fixRecommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Shortcut to Tailor */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-slate-900">Ready to export your ATS-compatible resume?</h4>
          <p className="text-[11px] text-slate-500">All tailored versions export in clean single-column PDF, DOCX, and TXT formats.</p>
        </div>
        <button
          onClick={() => onNavigateTab('tailor')}
          className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition flex items-center space-x-1"
        >
          <span>Open Resume Tailor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
