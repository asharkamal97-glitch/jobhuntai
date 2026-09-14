import React from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  HelpCircle, 
  Code, 
  Users, 
  TrendingUp, 
  FileSearch,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { JobDescriptionXRayData } from '../../types';

interface JobDescriptionXRayProps {
  xray: JobDescriptionXRayData;
  onNavigateTab: (tab: string) => void;
}

export const JobDescriptionXRay: React.FC<JobDescriptionXRayProps> = ({
  xray,
  onNavigateTab
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            <FileSearch className="w-4 h-4" />
            <span>Deep Deconstruction</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Job Description X-Ray
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Synthesized breakdown of hiring signals, non-negotiable requirements, technical stack, and likely interview focus areas.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl font-medium">
          <span className="font-semibold text-slate-900">{xray.seniorityLevel}</span>
          <span>•</span>
          <span>{xray.location}</span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (7 cols): Must-Haves, Nice-to-Haves, Responsibilities */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* MUST-HAVES */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Must-Have Requirements (Non-Negotiables)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Based on posting wording</span>
            </div>
            <div className="space-y-2">
              {xray.mustHaves.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* KEY RESPONSIBILITIES */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-brand-600" />
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Core Responsibilities & Ownership
              </h3>
            </div>
            <div className="space-y-2">
              {xray.keyResponsibilities.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NICE-TO-HAVES */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Nice-to-Have / Value-Add Qualifications
              </h3>
            </div>
            <div className="space-y-2">
              {xray.niceToHaves.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-xs text-amber-950 flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col (5 cols): Tools, Soft Skills, Signals, Terminology */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* TOOLS & TECHNOLOGIES */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-brand-600" />
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Tools & Technology Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {xray.toolsAndTech.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-brand-50 text-brand-700 border border-brand-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* REPEATED TERMINOLOGY HEATMAP */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-rose-500" />
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Repeated Terminology & Emphasis
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">Likely team emphasis</span>
            </div>
            <div className="space-y-2">
              {xray.repeatedTerminology.map((term, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs">
                  <span className="font-semibold text-slate-800">{term.term}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-slate-500">{term.count} mentions</span>
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                      term.importance === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {term.importance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SENIORITY SIGNALS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Seniority Signals & Expectations
              </h3>
            </div>
            <div className="space-y-2">
              {xray.senioritySignals.map((signal, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                  {signal}
                </div>
              ))}
            </div>
          </div>

          {/* AMBIGUOUS REQUIREMENTS WARNING */}
          {xray.ambiguousRequirements.length > 0 && (
            <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm space-y-3 bg-amber-50/20">
              <div className="flex items-center space-x-2 text-amber-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider">
                  Potentially Ambiguous Phrasing
                </h3>
              </div>
              <div className="space-y-2">
                {xray.ambiguousRequirements.map((amb, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-amber-200 text-xs space-y-1">
                    <strong className="text-slate-900 block">"{amb.text}"</strong>
                    <p className="text-slate-500 text-[11px]">{amb.note}</p>
                    <p className="text-brand-700 text-[11px] font-medium">
                      <strong>Suggestion:</strong> {amb.suggestedClarification}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* POSSIBLE INTERVIEW TOPICS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Anticipated Interview Themes
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('interview')}
                className="text-xs text-brand-600 hover:text-brand-700 font-semibold"
              >
                Rehearse →
              </button>
            </div>
            <div className="space-y-2">
              {xray.possibleInterviewTopics.map((topic, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-purple-950">
                  {topic}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
