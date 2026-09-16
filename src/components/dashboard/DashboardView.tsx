import React, { useState } from 'react';
import { 
  Briefcase, 
  ShieldCheck, 
  Compass, 
  FileText, 
  Layers, 
  CheckSquare, 
  MessageSquare, 
  Send, 
  Database, 
  Sparkles, 
  DownloadCloud, 
  TrendingUp, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Star,
  LogOut,
  Zap,
  Clock,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LinkedInIcon } from '../icons/LinkedInIcon';

interface DashboardViewProps {
  onNavigateTab: (tab: string) => void;
  onStartOnboarding: () => void;
  onLoadDemo: () => void;
  onOpenPricing: () => void;
  onOpenReviewModal: () => void;
  isAnalyzed: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateTab,
  onStartOnboarding,
  onLoadDemo,
  onOpenPricing,
  onOpenReviewModal,
  isAnalyzed
}) => {
  const { user, isPaid, logout, proceedToCheckout } = useAuth();

  const workspaceModules = [
    {
      id: 'blueprint',
      title: 'Application Blueprint',
      desc: 'Strategic overview of strengths, priority gaps, and alignment score.',
      icon: Compass,
      category: 'Core Strategy',
      requiresAnalysis: true
    },
    {
      id: 'evidence',
      title: 'Requirement Matrix',
      desc: 'Line-by-line evidence mapping of job requirements to verified facts.',
      icon: Layers,
      category: 'Analysis & Matching',
      requiresAnalysis: true
    },
    {
      id: 'xray',
      title: 'JD X-Ray',
      desc: 'Deconstruct seniority signals, must-haves, tools, and repeated terms.',
      icon: Briefcase,
      category: 'Analysis & Matching',
      requiresAnalysis: true
    },
    {
      id: 'tailor',
      title: 'Resume Tailoring & Diff',
      desc: 'Controlled proposal builder with side-by-side visual diff comparison.',
      icon: FileText,
      category: 'Resume & Documents',
      requiresAnalysis: true
    },
    {
      id: 'claimguard',
      title: 'Claim Guard™ Anti-Hallucination',
      desc: 'Verify every proposed bullet against real evidence to prevent fake claims.',
      icon: ShieldCheck,
      category: 'Trust & Verification',
      requiresAnalysis: true
    },
    {
      id: 'achievement',
      title: 'Achievement Builder',
      desc: 'STAR framework builder transforming raw duties into quantitative statements.',
      icon: Sparkles,
      category: 'Resume & Documents',
      requiresAnalysis: false
    },
    {
      id: 'ats',
      title: 'ATS Safety Scanner',
      desc: 'Verify formatting, typography, column structure, and section readability.',
      icon: CheckSquare,
      category: 'Trust & Verification',
      requiresAnalysis: true
    },
    {
      id: 'apppack',
      title: 'Application Pack Exporter',
      desc: 'Download tailored PDF, DOCX, Plain Text, and Markdown bundles.',
      icon: Send,
      category: 'Export & Packaging',
      requiresAnalysis: true
    },
    {
      id: 'interview',
      title: 'Interview Copilot & Practice',
      desc: '10 job-specific behavioral questions, STAR outlines, and practice scoring.',
      icon: MessageSquare,
      category: 'Interview Prep',
      requiresAnalysis: true
    },
    {
      id: 'linkedin',
      title: 'LinkedIn & Outreach',
      desc: 'Optimized headlines, custom About sections, and recruiter DM scripts.',
      icon: LinkedInIcon,
      category: 'Outreach & Profile',
      requiresAnalysis: true
    },
    {
      id: 'followup',
      title: 'Follow-Up System',
      desc: '7 milestone communication templates for post-interview touchpoints.',
      icon: Send,
      category: 'Outreach & Profile',
      requiresAnalysis: true
    },
    {
      id: 'tracker',
      title: 'Job Tracker Pipeline',
      desc: 'Kanban board and pipeline tracking your active target applications.',
      icon: TrendingUp,
      category: 'Pipeline Management',
      requiresAnalysis: false
    },
    {
      id: 'evidencebank',
      title: 'Career Evidence Bank',
      desc: 'Your persistent vault of verified career projects, metrics, and tools.',
      icon: Database,
      category: 'Memory & Vault',
      requiresAnalysis: false
    },
    {
      id: 'starterkit',
      title: 'Digital Starter Kit',
      desc: 'All 10 comprehensive markdown guides, workbooks, and prompt frameworks.',
      icon: DownloadCloud,
      category: 'Resources & Guides',
      requiresAnalysis: false
    }
  ];

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Application Workspace
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs text-slate-300 font-medium">Cross-Device Synchronized</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-mono">
              {user?.email || 'Logged In Account'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Badge */}
            <div className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 border shadow-sm ${
              isPaid
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}>
              {isPaid ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>FULL ACCESS (LIFETIME)</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>FREE PREVIEW ACCOUNT</span>
                </>
              )}
            </div>

            {/* Logout button */}
            <button
              onClick={() => logout()}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition flex items-center space-x-1.5 border border-slate-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      </div>

      {/* Upgrade Banner for Unpaid Users */}
      {!isPaid && (
        <div className="bg-gradient-to-r from-amber-500/15 via-brand-500/10 to-amber-500/15 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Unlock Unlimited Access on All Your Devices</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Upgrade to Full JOBHUNT AI — $14.99 One-Time
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
              Unlock unlimited job analyses, full diff exports, interview simulator practice, and career evidence bank syncing. Attached permanently to your email <strong>{user?.email}</strong>.
            </p>
          </div>

          <button
            onClick={proceedToCheckout}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl shadow-lg hover:shadow-xl transition flex items-center space-x-2 border border-amber-500 flex-shrink-0 text-sm"
          >
            <span>Get Full Access — $14.99</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Action Bar: New Analysis & Review Trigger */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Active Job Application</h2>
          <p className="text-xs text-slate-500">
            {isAnalyzed 
              ? 'Analysis loaded. Click any module below to inspect your tailored application.' 
              : 'No active job analyzed yet. Start a new analysis or load demo data.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onStartOnboarding}
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>New Job Analysis</span>
          </button>

          {!isAnalyzed && (
            <button
              onClick={onLoadDemo}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Load Demo Data</span>
            </button>
          )}

          {/* Review submission for verified purchasers */}
          {isPaid && (
            <button
              onClick={onOpenReviewModal}
              className="px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs rounded-xl transition flex items-center space-x-1.5"
            >
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>Write Review</span>
            </button>
          )}
        </div>
      </div>

      {/* Workspace Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">Workspace Modules</h2>
          <span className="text-xs font-semibold text-slate-400">14 Active Workspaces</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaceModules.map((module) => {
            const Icon = module.icon;
            const isLocked = module.requiresAnalysis && !isAnalyzed;

            return (
              <div
                key={module.id}
                onClick={() => {
                  if (isLocked) {
                    onStartOnboarding();
                  } else {
                    onNavigateTab(module.id);
                  }
                }}
                className="bg-white rounded-2xl border border-slate-200 hover:border-brand-500/50 p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {module.category}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-brand-600 transition">
                    {module.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {module.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-600">
                  <span>{isLocked ? 'Analyze Job to Open' : 'Open Workspace'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};