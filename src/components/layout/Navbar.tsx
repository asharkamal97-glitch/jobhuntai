import React, { useState, useRef } from 'react';
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
  Settings, 
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Lock,
  X,
  ChevronRight
} from 'lucide-react';
import { LinkedInIcon } from '../icons/LinkedInIcon';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isAnalyzed: boolean;
  onOpenOnboarding: () => void;
  onOpenPricing: () => void;
  onOpenStarterKit: () => void;
  onOpenSettings: () => void;
  onLoadDemo: () => void;
  isFullAccess?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  isAnalyzed,
  onOpenOnboarding,
  onOpenPricing,
  onOpenStarterKit,
  onOpenSettings,
  onLoadDemo,
  isFullAccess = false
}) => {
  const [lockedNotice, setLockedNotice] = useState<{ title: string; reason: string } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const mainNavItems = [
    { id: 'blueprint', label: 'Application Blueprint', icon: Compass, requiresAnalysis: true, badge: 'Core', lockReason: 'Analyze a job description first to activate Application Blueprint.' },
    { id: 'evidence', label: 'Requirement Matrix', icon: Layers, requiresAnalysis: true, highlight: true, lockReason: 'Analyze a job description first to activate the Requirement Matrix.' },
    { id: 'xray', label: 'JD X-Ray', icon: Briefcase, requiresAnalysis: true, lockReason: 'Analyze a job description first to activate Job Description X-Ray.' },
    { id: 'tailor', label: 'Resume Tailoring & Diff', icon: FileText, requiresAnalysis: true, lockReason: 'Add your resume and job description first to activate Resume Tailoring.' },
    { id: 'claimguard', label: 'Claim Guard™', icon: ShieldCheck, requiresAnalysis: true, badge: 'Guard', lockReason: 'Add a resume and analyze a job first to activate Claim Guard.' },
    { id: 'achievement', label: 'Achievement Builder', icon: Sparkles, requiresAnalysis: false },
    { id: 'ats', label: 'ATS Safety Check', icon: CheckSquare, requiresAnalysis: true, lockReason: 'Add your resume and analyze a job first to activate ATS Safety Check.' },
    { id: 'apppack', label: 'Application Pack', icon: Send, requiresAnalysis: true, lockReason: 'Analyze a job description first to activate the Application Pack.' },
    { id: 'interview', label: 'Interview Copilot', icon: MessageSquare, requiresAnalysis: true, lockReason: 'Analyze a job description first to activate Interview Copilot.' },
    { id: 'linkedin', label: 'LinkedIn Optimizer', icon: LinkedInIcon, requiresAnalysis: true, lockReason: 'Analyze a job description first to activate LinkedIn Optimizer.' },
    { id: 'followup', label: 'Follow-Up System', icon: Send, requiresAnalysis: true, lockReason: 'Analyze a job description first to activate the Follow-Up System.' },
    { id: 'tracker', label: 'Job Tracker', icon: TrendingUp, requiresAnalysis: false },
    { id: 'evidencebank', label: 'Evidence Bank', icon: Database, requiresAnalysis: false, badge: 'Store' },
    { id: 'starterkit', label: 'Digital Starter Kit', icon: DownloadCloud, requiresAnalysis: false }
  ];

  const handleTabClick = (item: typeof mainNavItems[0]) => {
    if (item.requiresAnalysis && !isAnalyzed) {
      setLockedNotice({
        title: item.label,
        reason: item.lockReason || `Analyze a job description first to activate ${item.label}.`
      });
    } else {
      setLockedNotice(null);
      setCurrentTab(item.id);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Top utility bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">JOBHUNT</span>
                <span className="px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-brand-50 text-brand-600 rounded border border-brand-200">AI</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">One job. One workflow. One stronger application.</p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {!isAnalyzed ? (
              <button
                onClick={onLoadDemo}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Try Demo (Alex Morgan)</span>
                <span className="sm:hidden">Demo</span>
              </button>
            ) : (
              <div className="hidden lg:flex items-center space-x-2 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Evidence-First Active</span>
              </div>
            )}

            <button
              onClick={onOpenOnboarding}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition"
            >
              <span>New Job Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenStarterKit}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              title="Downloadable Starter Kit"
            >
              <DownloadCloud className="w-4 h-4 text-brand-500" />
              <span className="hidden sm:inline">Starter Kit</span>
            </button>

            {/* Get Full Access $14.99 Button */}
            {isFullAccess ? (
              <button
                onClick={onOpenPricing}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition border border-amber-300 shadow-subtle"
                title="Full Access Active (Lifetime)"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Full Access</span>
              </button>
            ) : (
              <button
                onClick={onOpenPricing}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-sm transition border border-amber-500/80"
                title="Get Full JOBHUNT AI Access ($14.99)"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                <span>Get Full Access — $14.99</span>
              </button>
            )}

            <button
              onClick={onOpenSettings}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
              title="Settings & Engine"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Notice when user clicks a locked workspace */}
      {lockedNotice && !isAnalyzed && (
        <div className="bg-amber-50 border-t border-b border-amber-200 px-4 py-2 text-xs text-amber-950 flex items-center justify-between animate-in fade-in duration-150">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>{lockedNotice.title} is locked.</strong> {lockedNotice.reason}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setLockedNotice(null);
                onOpenOnboarding();
              }}
              className="px-2.5 py-1 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-md transition shadow-subtle flex items-center space-x-1"
            >
              <span>Start Analysis (60s)</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setLockedNotice(null)}
              className="p-1 text-amber-700 hover:text-amber-900 rounded"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Workflow Navigation Tabs with Mobile Scroll Cues */}
      <div className="relative border-t border-slate-100 bg-slate-50/70 overflow-hidden">
        
        {/* Mobile Horizontal Scroll Indicator Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-slate-100/90 to-transparent pointer-events-none sm:hidden z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-200/90 to-transparent pointer-events-none sm:hidden z-10" />

        <div 
          ref={scrollContainerRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 py-1.5 overflow-x-auto scrollbar-none"
        >
          <button
            onClick={() => {
              setLockedNotice(null);
              setCurrentTab('landing');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition flex items-center space-x-1.5 ${
              currentTab === 'landing' 
                ? 'bg-white text-brand-700 shadow-sm border border-slate-200 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>Overview</span>
          </button>

          {mainNavItems.map(item => {
            const Icon = item.icon;
            const disabled = item.requiresAnalysis && !isAnalyzed;
            const active = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                title={disabled ? item.lockReason : item.label}
                className={`px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition flex items-center space-x-1.5 relative ${
                  active
                    ? 'bg-white text-brand-700 shadow-sm border border-slate-200 font-semibold'
                    : disabled
                    ? 'text-slate-400 opacity-60 hover:opacity-100 hover:bg-slate-100/80 cursor-pointer'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                }`}
              >
                {disabled && <Lock className="w-3 h-3 text-slate-400 mr-0.5" />}
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1 py-0.2 rounded font-bold uppercase tracking-wider ${
                    item.badge === 'Guard' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-brand-100 text-brand-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
