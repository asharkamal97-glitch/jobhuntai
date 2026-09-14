import React from 'react';
import { 
  Compass, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  FileText, 
  MessageSquare, 
  Send, 
  ArrowRight, 
  Info,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  DownloadCloud
} from 'lucide-react';
import { ApplicationState } from '../../types';

interface ApplicationBlueprintProps {
  state: ApplicationState;
  onNavigateTab: (tab: string) => void;
  onOpenStarterKit: () => void;
  onOpenOnboarding?: () => void;
  onLoadDemo?: () => void;
}

export const ApplicationBlueprint: React.FC<ApplicationBlueprintProps> = ({
  state,
  onNavigateTab,
  onOpenStarterKit,
  onOpenOnboarding,
  onLoadDemo
}) => {
  // Empty State for First-Time Users
  if (!state.isAnalyzed) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-inner border border-brand-100">
            <Compass className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Application Copilot</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Your Application Blueprint is Ready to Build
            </h1>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              Analyze your target job description alongside your real experience to generate a grounded application strategy without fabricating qualifications or stuffing keywords.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenOnboarding}
              className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-500/20 transition flex items-center justify-center space-x-2"
            >
              <span>New Job Analysis (60s)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onLoadDemo && (
              <button
                onClick={onLoadDemo}
                className="w-full sm:w-auto px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Try Demo (Alex Morgan)</span>
              </button>
            )}
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-6 border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <Layers className="w-4 h-4 text-brand-500" />
                <span>1. Requirement Matrix</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Maps stated job requirements to your verified work history with honest match classifications.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <FileText className="w-4 h-4 text-brand-500" />
                <span>2. Resume Tailoring</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sentence-by-sentence rewriting with explicit Approve/Reject controls and zero hallucinations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <Send className="w-4 h-4 text-brand-500" />
                <span>3. 8-Piece Pack</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tailored resume, 4-tone cover letters, LinkedIn copy, interview prep, and follow-up templates.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { readinessScore, requirements, jobTitle, company, jobXRay } = state;

  const supportedCount = requirements.filter(r => r.confidence === 'SUPPORTED').length;
  const partialCount = requirements.filter(r => r.confidence === 'PARTIALLY_SUPPORTED').length;
  const unsupportedCount = requirements.filter(r => r.confidence === 'NOT_SUPPORTED').length;
  const verificationCount = requirements.filter(r => r.confidence === 'USER_VERIFICATION_REQUIRED').length;

  const dimensions = [
    { label: 'Experience Alignment', score: readinessScore.experienceAlignment, weight: '25%', desc: 'Overlap between proven work history and JD core requirements' },
    { label: 'Skill Alignment', score: readinessScore.skillAlignment, weight: '20%', desc: 'Match with essential hard & soft competencies' },
    { label: 'Evidence Strength', score: readinessScore.evidenceStrength, weight: '20%', desc: 'Presence of verifiable facts, projects, and verified scale' },
    { label: 'Keyword Alignment', score: readinessScore.keywordAlignment, weight: '15%', desc: 'Natural contextual presence of target terminology' },
    { label: 'Resume Clarity', score: readinessScore.resumeClarity, weight: '10%', desc: 'Action-verb hierarchy, brevity, and ATS layout readability' },
    { label: 'Requirement Coverage', score: readinessScore.requirementCoverage, weight: '10%', desc: 'Percentage of verifiable JD requirements supported' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner: Target Role Context */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Target Application Blueprint</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {jobTitle} <span className="text-slate-400 font-normal">at</span> {company}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Evidence-First Application Strategy • Optimized without fabricating qualifications
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onNavigateTab('evidence')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition flex items-center space-x-1.5"
          >
            <span>Requirement Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigateTab('apppack')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Pack</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Score Overview + Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Readiness Score (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Application Readiness Score
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Verified Alignment
              </span>
            </div>

            {/* Big Score Display */}
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-6xl font-extrabold text-slate-900 tracking-tight">
                {readinessScore.overallScore}
              </span>
              <span className="text-xl font-bold text-slate-400">/ 100</span>
            </div>

            {/* Crucial Disclaimer */}
            <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-start space-x-2">
              <Info className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Application Alignment Score:</strong>
                <p className="mt-0.5 text-[11px] text-slate-500 leading-relaxed">
                  This score measures how well your verified background aligns with the stated requirements of this specific posting. It is <em>not</em> a hiring probability prediction.
                </p>
              </div>
            </div>

            {/* Requirement Status Pills */}
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900">
                <span className="block font-bold text-base">{supportedCount}</span>
                <span className="text-[11px] font-medium text-emerald-700">Supported Requirements</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-900">
                <span className="block font-bold text-base">{partialCount}</span>
                <span className="text-[11px] font-medium text-amber-700">Partially Supported</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800">
                <span className="block font-bold text-base">{unsupportedCount}</span>
                <span className="text-[11px] font-medium text-slate-600">Unsupported Gaps</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-900">
                <span className="block font-bold text-base">{verificationCount}</span>
                <span className="text-[11px] font-medium text-blue-700">User Confirmation</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Powered by Claim Guard™</span>
            <button 
              onClick={() => onNavigateTab('claimguard')}
              className="text-brand-600 hover:text-brand-700 font-semibold flex items-center space-x-1"
            >
              <span>View Claim Audit</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Col: 6 Breakdown Dimensions (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Score Dimension Breakdown</h3>
              <span className="text-[11px] text-slate-400">Weighted Assessment</span>
            </div>

            <div className="space-y-3.5">
              {dimensions.map((dim, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">{dim.label}</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-slate-900">{dim.score}</span>
                      <span className="text-[10px] text-slate-400">({dim.weight})</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        dim.score >= 80 
                          ? 'bg-emerald-500' 
                          : dim.score >= 65 
                          ? 'bg-brand-500' 
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">{dim.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* "Your Biggest Opportunity" Callout */}
      <div className="bg-gradient-to-r from-brand-900 to-navy-900 rounded-2xl p-6 text-white shadow-elevated relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-brand-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Your Biggest Opportunity</span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-white">
            {readinessScore.biggestOpportunity.title}
          </h3>

          <p className="text-xs sm:text-sm text-brand-100 mt-1.5 font-medium">
            {readinessScore.biggestOpportunity.highlight}
          </p>

          <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
            {readinessScore.biggestOpportunity.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('tailor')}
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-brand-50 rounded-xl shadow transition flex items-center space-x-1.5"
            >
              <span>{readinessScore.biggestOpportunity.recommendedAction}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('evidence')}
              className="px-3.5 py-2 text-xs font-semibold text-brand-200 hover:text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 transition"
            >
              View Requirement Map
            </button>
          </div>
        </div>
      </div>

      {/* 4 Quick Strategy Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => onNavigateTab('evidence')}
          className="bg-white rounded-xl border border-slate-200 p-4.5 hover:border-brand-400 hover:shadow-card cursor-pointer transition group"
        >
          <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Requirement → Evidence</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Map every job qualification directly against your verified background with confidence tags.
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('tailor')}
          className="bg-white rounded-xl border border-slate-200 p-4.5 hover:border-brand-400 hover:shadow-card cursor-pointer transition group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
            <FileText className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Controlled Tailoring</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Review sentence-by-sentence proposed changes with full Approve, Edit, and Reject control.
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('interview')}
          className="bg-white rounded-xl border border-slate-200 p-4.5 hover:border-brand-400 hover:shadow-card cursor-pointer transition group"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Interview Copilot</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Rehearse top 10 targeted questions with evidence-anchored STAR outlines and live practice scoring.
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('claimguard')}
          className="bg-white rounded-xl border border-slate-200 p-4.5 hover:border-brand-400 hover:shadow-card cursor-pointer transition group"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Claim Guard™</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Pre-export audit to guarantee zero fabricated numbers, fake credentials, or keyword stuffing.
          </p>
        </div>

      </div>

    </div>
  );
};
