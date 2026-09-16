import React, { useState } from 'react';
import { 
  Briefcase, 
  ShieldCheck, 
  Layers, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  DownloadCloud, 
  Send, 
  Lock, 
  ChevronDown, 
  ChevronUp,
  Compass,
  Check,
  Zap,
  Split,
  Database,
  ExternalLink
} from 'lucide-react';
import { WHOP_CHECKOUT_URL } from './PricingModal';
import { useAuth } from '../../context/AuthContext';
import { CustomerReviewsSection } from '../reviews/CustomerReviewsSection';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onLoadDemo: () => void;
  onOpenPricing: () => void;
  onOpenStarterKit: () => void;
  onNavigateTab: (tab: string) => void;
  onOpenReviewModal?: () => void;
  isAnalyzed: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onLoadDemo,
  onOpenPricing,
  onOpenStarterKit,
  onNavigateTab,
  onOpenReviewModal,
  isAnalyzed
}) => {
  const { isAuthenticated, isPaid, openAuthModal, proceedToCheckout } = useAuth();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handlePurchase = () => {
    if (isAuthenticated) {
      if (isPaid) {
        onNavigateTab('dashboard');
      } else {
        proceedToCheckout();
      }
    } else {
      openAuthModal('signup', () => {
        proceedToCheckout();
      });
    }
  };

  const faqs = [
    {
      q: 'How is JOBHUNT AI different from generic AI resume generators?',
      a: 'Most AI tools hallucinate fake experience, invent numerical percentages, and stuff robotic keywords that recruiters instantly recognize. JOBHUNT AI enforces an Evidence-First architecture: every recommendation is mapped directly to verified facts from your work history, and Claim Guard™ prevents unverified claims from reaching your final export.'
    },
    {
      q: 'Does JOBHUNT AI invent metrics, tools, or dates if I don’t provide them?',
      a: 'Never. If a requirement is missing from your background, we classify it as NOT SUPPORTED or ask for verification. If you don’t have an exact numerical metric, our Achievement Builder crafts an honest, qualitative statement rather than generating a fictional number.'
    },
    {
      q: 'Can this product be used in the US, UK, Canada, Australia, and Europe?',
      a: 'Yes. JOBHUNT AI is designed specifically for English-speaking hiring standards across North America, the UK, Australia, and European tech ecosystems, adhering to standard single-column ATS conventions.'
    },
    {
      q: 'What is included in the Downloadable Starter Kit version?',
      a: 'The Starter Kit includes all 10 comprehensive markdown guides, structured Evidence-First prompt frameworks, interview workbooks, follow-up scripts, and the 30-day job search plan so you can execute the workflow anywhere.'
    },
    {
      q: 'Does the Readiness Score predict my hiring probability?',
      a: 'No. We strictly frame the score as an Application Alignment Score that measures how well your verified evidence matches the stated requirements. We never make false statistical promises about hiring outcomes.'
    }
  ];

  return (
    <div className="space-y-16 py-6 animate-in fade-in duration-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-center max-w-4xl mx-auto px-4 pt-6 pb-8 space-y-6">
        
        {/* Tagline Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold tracking-wide shadow-subtle">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Evidence-First Application Optimization</span>
        </div>

        {/* Hero Title & Tagline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            One job. One workflow.<br />
            <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
              One stronger application.
            </span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Turn a job description and your real experience into a focused application strategy — without inventing credentials, fabricating metrics, or stuffing keywords.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePurchase}
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-md transition flex items-center justify-center space-x-2 border border-amber-500 cursor-pointer"
          >
            <span>Get JOBHUNT AI — $14.99</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={onStartOnboarding}
            className="w-full sm:w-auto px-5 py-3.5 text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-subtle transition flex items-center justify-center space-x-2"
          >
            <span>Try Free Preview</span>
            <ArrowRight className="w-4 h-4 text-brand-600" />
          </button>

          <button
            onClick={onLoadDemo}
            className="w-full sm:w-auto px-4 py-3.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center justify-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Try Demo (Alex Morgan)</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Zero Hallucinations</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Claim Guard™ Audit</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>ATS Compatibility Check</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>US, UK, CA, AU & EU Ready</span>
          </span>
        </div>

      </section>

      {/* 2. THE PROBLEM VS THE EVIDENCE-FIRST SOLUTION */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Why Most AI Job Tools Fail</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            The Danger of Generative AI in Job Search
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Recruiters and hiring managers review hundreds of applications daily. Robotic buzzwords and unverified claims destroy candidate credibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Generic AI Box */}
          <div className="p-6 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-4">
            <div className="flex items-center space-x-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
              <XCircle className="w-4 h-4" />
              <span>Generic AI Resume Builders</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Fabricates fake metrics ("Increased sales by 320%") that you cannot defend in interviews.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Stuffs artificial keywords in invisible blocks that trigger spam filters in modern ATS.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Promises fake "98% hiring guarantees" based on marketing gimmicks.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Silently overwrites your original career accomplishments with generic corporate jargon.</span>
              </li>
            </ul>
          </div>

          {/* JOBHUNT AI Box */}
          <div className="p-6 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>JOBHUNT AI (Evidence-First Copilot)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-800">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Maps every job requirement directly to your proven work history with confidence ratings.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Claim Guard™ pre-export scanner flags unverified numbers, tools, or exaggerated scope.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Controlled tailoring gives you bullet-by-bullet [Approve], [Edit], and [Reject] veto control.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Synchronized 8-piece application pack including interview prep and recruiter follow-ups.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS (4 STEPS) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">The 4-Step Operating Workflow</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            From Job Posting to Verifiable Application Pack
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">Target Role Input</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Paste the target job description. We extract non-negotiables, nice-to-haves, stack, and seniority signals.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">Evidence Mapping</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pair your real resume and Evidence Bank. Classify every requirement into Supported or Gap.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">Controlled Tailoring</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Review sentence-by-sentence proposed refinements with rationale. Claim Guard™ audits every bullet.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center">
              4
            </div>
            <h3 className="text-sm font-bold text-slate-900">Application Suite</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Export your tailored resume, 4-tone cover letters, LinkedIn assets, and rehearse with Interview Copilot.
            </p>
          </div>

        </div>
      </section>

      {/* 4. CORE DIFFERENTIATOR SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Enterprise Standards</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Differentiated Features Built for Serious Candidates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Claim Guard™ Anti-Hallucination</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Before exporting, every generated claim is scanned. If a metric or tool isn't in your Evidence Bank, you get a 1-click warning to add evidence, remove the number, or keep original wording.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Interview Practice Simulator</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Rehearse top 10 targeted questions 1-by-1. Type or speak your response to receive structured objective scoring across 6 criteria with constructive improvements.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Career Evidence Bank</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Store your verified projects, verified metrics, tools, and STAR achievements in a permanent memory store. Track exactly which evidence was used in each job application.
            </p>
          </div>

        </div>
      </section>

      {/* 5. 30-DAY JOB SEARCH PLAN SUMMARY */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Quality Over Volume</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              The 30-Day Strategic Job Search Framework
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Applying to 5 high-alignment roles with verified evidence yields significantly higher interview rates than mass-spamming 200 generic applications.
            </p>
          </div>

          <button
            onClick={onOpenStarterKit}
            className="px-4 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-brand-50 rounded-xl transition flex items-center space-x-1.5 flex-shrink-0"
          >
            <DownloadCloud className="w-4 h-4 text-brand-600" />
            <span>View Full 30-Day Plan</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase text-brand-400">Week 1</span>
            <h4 className="font-bold text-white text-sm">Foundation & Audit</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Audit Evidence Bank, calibrate ATS-safe master format, and select 15 high-fit target companies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase text-brand-400">Week 2</span>
            <h4 className="font-bold text-white text-sm">Targeted Applications</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Execute 3–5 tailored applications with verified evidence matrices and Claim Guard™ audits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase text-brand-400">Week 3</span>
            <h4 className="font-bold text-white text-sm">Networking & Mock Prep</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Connect with 2 peers per company, rehearse STAR answers in simulator, and send 7-day follow-ups.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase text-brand-400">Week 4</span>
            <h4 className="font-bold text-white text-sm">Pipeline & Closing</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Review response metrics, execute final interview rounds, and prepare benchmarked salary scripts.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PRICING & MONETIZATION SECTION */}
      <section className="max-w-5xl mx-auto px-4 space-y-8" id="pricing">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Transparent Monetization</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Start Free. Upgrade When You're Ready.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Experience the evidence-first workflow risk-free, then unlock unlimited applications and full exports for a simple one-time payment.
          </p>
        </div>

        {/* 2-Column Pricing Tier Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          
          {/* TIER 1: FREE PREVIEW */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                  FREE PREVIEW
                </span>
                <span className="text-xs text-slate-400 font-semibold">Risk-Free</span>
              </div>
              
              <div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-black text-slate-900">$0</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Experience the workflow before you buy.
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Included in Free Preview:
                </span>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Start 1 complete job analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Analyze 1 target job description</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Preview Requirement Matrix & alignment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Preview Evidence Engine confidence matches</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Preview Claim Guard™ anti-hallucination scan</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Preview resume tailoring & diff suggestions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Explore complete interactive interface</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={onStartOnboarding}
                className="w-full py-3 text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center justify-center space-x-2"
              >
                <span>Try Free Preview</span>
                <ArrowRight className="w-4 h-4 text-brand-600" />
              </button>
            </div>
          </div>

          {/* TIER 2: FULL ACCESS */}
          <div className="bg-gradient-to-b from-brand-50/40 via-white to-white rounded-3xl border-2 border-brand-500 shadow-xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 right-6 bg-brand-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Lifetime Access • Most Popular
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-1 rounded-full">
                  FULL ACCESS
                </span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                  Available Now
                </span>
              </div>
              
              <div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-4xl font-black text-slate-900">$14.99</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">ONE-TIME</span>
                </div>
                <p className="text-xs text-brand-700 font-semibold mt-1">
                  One-time payment • Everything included
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Everything Unlocked in Full Access:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1.5 font-medium">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Unlimited Job Analyses</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Requirement Matrix</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Evidence Engine</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Application Blueprint</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Resume Tailor & Diff</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Claim Guard™ Guard</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Achievement Builder</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>ATS Compatibility</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Cover Letter (4 Tones)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>LinkedIn Optimizer</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Interview Copilot</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Practice Simulator</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Follow-Up Generator</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Pipeline Tracker</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Career Evidence Bank</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>Full Pack Exports</span>
                  </div>
                  <div className="flex items-center space-x-1.5 sm:col-span-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span>10-Module Digital Starter Kit</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <button
                onClick={handlePurchase}
                className="w-full py-3.5 text-xs sm:text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-md transition flex items-center justify-center space-x-2 border border-amber-500 cursor-pointer"
              >
                <span>Get Full Access — $14.99</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={onStartOnboarding}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition text-center"
              >
                Try Free Preview
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS SECTION */}
      <CustomerReviewsSection onOpenReviewModal={onOpenReviewModal} isPaid={isPaid} />

      {/* 8. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Common Questions</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. BOTTOM CALL TO ACTION */}
      <section className="bg-gradient-to-r from-brand-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 text-center max-w-5xl mx-auto space-y-6 shadow-elevated">
        <h2 className="text-2xl sm:text-4xl font-extrabold">
          Ready to Build a Verifiable, High-Impact Application?
        </h2>
        <p className="text-xs sm:text-sm text-brand-100 max-w-xl mx-auto leading-relaxed">
          AI doesn't know your career better than you do. Present the experience you actually have — tailored specifically for the job you want.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePurchase}
            className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow transition flex items-center justify-center space-x-2 border border-amber-400 cursor-pointer"
          >
            <span>Get Full Access — $14.99</span>
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={onStartOnboarding}
            className="w-full sm:w-auto px-5 py-3.5 text-xs sm:text-sm font-bold text-white bg-brand-800/80 hover:bg-brand-900 border border-white/20 rounded-xl transition"
          >
            Continue with Free Preview
          </button>
        </div>
      </section>

    </div>
  );
};
