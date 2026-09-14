import React from 'react';
import { Briefcase, ShieldCheck, DownloadCloud, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPricing: () => void;
  onOpenStarterKit: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPricing,
  onOpenStarterKit,
  onNavigateTab
}) => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-slate-900 tracking-tight">JOBHUNT AI</span>
              <span className="px-1.5 py-0.2 text-[10px] font-bold uppercase bg-brand-50 text-brand-600 rounded border border-brand-200">
                Evidence-First
              </span>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed max-w-md">
              "AI doesn't know your career better than you do. JOBHUNT AI helps you present the experience you actually have — specifically for the job you're applying to."
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero-hallucination architecture • Claim Guard™ Protected</span>
            </div>
          </div>

          {/* Col 2: Core Workflows */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Workflows</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button onClick={() => onNavigateTab('blueprint')} className="hover:text-brand-600 transition">
                  Application Blueprint
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('evidence')} className="hover:text-brand-600 transition">
                  Requirement → Evidence Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('tailor')} className="hover:text-brand-600 transition">
                  Controlled Resume Tailoring
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('claimguard')} className="hover:text-brand-600 transition">
                  Claim Guard™ Anti-Hallucination
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('interview')} className="hover:text-brand-600 transition">
                  Interview Practice Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Digital Product & Global Markets */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button onClick={onOpenStarterKit} className="hover:text-brand-600 transition flex items-center space-x-1">
                  <DownloadCloud className="w-3.5 h-3.5 text-brand-500" />
                  <span>10-Module Starter Kit</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenPricing} className="hover:text-brand-600 transition">
                  Full Access ($14.99)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('tracker')} className="hover:text-brand-600 transition">
                  Job Search Pipeline Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('evidencebank')} className="hover:text-brand-600 transition">
                  Career Evidence Bank
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} JOBHUNT AI. Built for job seekers in the US, UK, Canada, Australia, and Europe.
          </div>
          <div className="flex items-center space-x-4">
            <span>No Fake Credentials</span>
            <span>•</span>
            <span>No Keyword Stuffing</span>
            <span>•</span>
            <span>100% Verifiable Evidence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
