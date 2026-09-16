import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { PricingModal } from './components/landing/PricingModal';
import { AuthModal } from './components/auth/AuthModal';
import { DashboardView } from './components/dashboard/DashboardView';
import { ReviewModal } from './components/reviews/ReviewModal';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { ApplicationBlueprint } from './components/blueprint/ApplicationBlueprint';
import { RequirementEvidenceEngine } from './components/evidence/RequirementEvidenceEngine';
import { JobDescriptionXRay } from './components/xray/JobDescriptionXRay';
import { ResumeTailor } from './components/tailor/ResumeTailor';
import { ClaimGuard } from './components/claimguard/ClaimGuard';
import { AchievementBuilder } from './components/achievement/AchievementBuilder';
import { AtsSafetyCheck } from './components/ats/AtsSafetyCheck';
import { ApplicationPack } from './components/apppack/ApplicationPack';
import { InterviewCopilot } from './components/interview/InterviewCopilot';
import { LinkedInOptimizer } from './components/linkedin/LinkedInOptimizer';
import { FollowUpGenerator } from './components/followup/FollowUpGenerator';
import { JobTracker } from './components/tracker/JobTracker';
import { EvidenceBank } from './components/evidencebank/EvidenceBank';
import { StarterKitViewer } from './components/starterkit/StarterKitViewer';
import { SettingsModal } from './components/settings/SettingsModal';

import { 
  ApplicationState, 
  EvidenceBankEntry, 
  JobTrackerEntry, 
  JobRequirement, 
  BulletChange 
} from './types';

import { 
  EMPTY_APPLICATION_STATE,
  DEMO_APPLICATION_STATE, 
  INITIAL_EVIDENCE_BANK, 
  INITIAL_TRACKED_APPLICATIONS 
} from './data/demoData';

import { 
  parseJobDescription, 
  matchRequirementsToEvidence, 
  calculateReadinessScore, 
  generateBulletProposals, 
  runClaimGuardAudit, 
  runAtsSafetyCheck, 
  generateInterviewQuestions, 
  generateApplicationPack 
} from './services/aiEngine';

import {
  getEntitlement,
  isFullAccess,
  setEntitlement,
  canPerformNewAnalysis,
  incrementAnalysesCount,
  resetAnalysesCount
} from './services/entitlement';

import { api } from './services/apiClient';
import { Sparkles, X } from 'lucide-react';

function syncTailoredResumeText(originalResumeText: string, bulletChanges: BulletChange[]): string {
  let synced = originalResumeText;
  bulletChanges.forEach(b => {
    const textToUse = b.status === 'approved' ? (b.customDraft || b.proposed) : b.original;
    if (b.original && synced.includes(b.original)) {
      synced = synced.replace(b.original, textToUse);
    }
  });
  return synced;
}

function MainAppContent() {
  const { user, isAuthenticated, isPaid, refreshEntitlement } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('landing');
  
  // Application State — clean empty state by default for new users
  const [appState, setAppState] = useState<ApplicationState>(() => {
    const saved = localStorage.getItem('jobhunt_ai_app_state');
    return saved ? JSON.parse(saved) : EMPTY_APPLICATION_STATE;
  });

  // Evidence Bank State — clean for new users
  const [evidenceBank, setEvidenceBank] = useState<EvidenceBankEntry[]>(() => {
    const saved = localStorage.getItem('jobhunt_ai_evidence_bank');
    return saved ? JSON.parse(saved) : [];
  });

  // Tracker State — clean for new users
  const [trackedApplications, setTrackedApplications] = useState<JobTrackerEntry[]>(() => {
    const saved = localStorage.getItem('jobhunt_ai_tracked_apps');
    return saved ? JSON.parse(saved) : [];
  });

  // Pro status from entitlement service & live AuthContext
  const [localPro, setLocalPro] = useState<boolean>(() => isFullAccess());
  const effectivePro = isPaid || localPro;

  // Modals & Config
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [paymentSuccessNotice, setPaymentSuccessNotice] = useState<{
    show: boolean;
    orderId?: string;
  }>({ show: false });

  const [pricingConfig, setPricingConfig] = useState<{
    isOpen: boolean;
    featureName?: string;
    headline?: string;
    reason?: string;
  }>({
    isOpen: false
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Check URL query parameters for payment return (?payment=success, ?order_id=...)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const isPaymentSuccess = urlParams.get('payment') === 'success' || urlParams.get('checkout') === 'success';
      const orderId = urlParams.get('order_id') || urlParams.get('whop_order_id') || urlParams.get('payment_id');

      if (isPaymentSuccess || orderId) {
        setPaymentSuccessNotice({ show: true, orderId: orderId || undefined });
        if (orderId) {
          api.verifyPayment(orderId, user?.email).then(() => {
            refreshEntitlement();
          }).catch(console.warn);
        }
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    } catch {
      // Browser navigation fallback
    }
  }, [user, refreshEntitlement]);

  const handleOpenPricing = (featureName?: string, headline?: string, reason?: string) => {
    setPricingConfig({
      isOpen: true,
      featureName,
      headline,
      reason
    });
  };

  const handleStartOnboarding = () => {
    if (!effectivePro && !canPerformNewAnalysis()) {
      handleOpenPricing(
        'Unlimited Job Analyses',
        "You've completed your free job analysis",
        'Unlock unlimited job analyses and the complete application workflow for $14.99 one-time.'
      );
      return;
    }
    setIsOnboardingOpen(true);
  };

  // Persistence
  useEffect(() => {
    localStorage.setItem('jobhunt_ai_app_state', JSON.stringify(appState));
  }, [appState]);

  useEffect(() => {
    localStorage.setItem('jobhunt_ai_evidence_bank', JSON.stringify(evidenceBank));
  }, [evidenceBank]);

  useEffect(() => {
    localStorage.setItem('jobhunt_ai_tracked_apps', JSON.stringify(trackedApplications));
  }, [trackedApplications]);

  useEffect(() => {
    localStorage.setItem('jobhunt_ai_is_pro', String(effectivePro));
  }, [effectivePro]);

  // Handle New Job Analysis from Onboarding
  const handleOnboardingSubmit = (data: {
    jobTitle: string;
    company: string;
    jobDescription: string;
    jobUrl: string;
    targetGoal: 'improve_match' | 'tailor_resume' | 'prep_interview' | 'improve_linkedin' | 'complete_pack';
    rawResumeText: string;
    linkedinProfileText?: string;
    additionalNotes?: string;
  }) => {
    if (!effectivePro) {
      incrementAnalysesCount();
    }

    const xray = parseJobDescription(data.jobDescription, data.jobTitle, data.company);
    const reqs = matchRequirementsToEvidence(xray, data.rawResumeText, evidenceBank);
    const score = calculateReadinessScore(reqs, data.rawResumeText, data.jobDescription);
    const bulletProposals = generateBulletProposals(data.rawResumeText, reqs);
    const claimGuard = runClaimGuardAudit(bulletProposals, data.rawResumeText, evidenceBank);
    const atsChecks = runAtsSafetyCheck(data.rawResumeText);
    const interviewQs = generateInterviewQuestions(reqs, xray, data.rawResumeText);
    const appPack = generateApplicationPack(data.jobTitle, data.company, data.rawResumeText, reqs, xray);

    const newState: ApplicationState = {
      jobTitle: data.jobTitle,
      company: data.company,
      jobDescription: data.jobDescription,
      jobUrl: data.jobUrl,
      targetGoal: data.targetGoal,
      rawResumeText: data.rawResumeText,
      linkedinProfileText: data.linkedinProfileText,
      additionalNotes: data.additionalNotes,
      isAnalyzed: true,
      readinessScore: score,
      jobXRay: xray,
      requirements: reqs,
      bulletChanges: bulletProposals,
      claimGuardItems: claimGuard,
      atsChecks: atsChecks,
      interviewQuestions: interviewQs,
      applicationPack: appPack
    };

    setAppState(newState);
    setIsOnboardingOpen(false);
    setCurrentTab('blueprint');
  };

  // Load Demo Data for Trial
  const handleLoadDemo = () => {
    setAppState(DEMO_APPLICATION_STATE);
    setEvidenceBank(INITIAL_EVIDENCE_BANK);
    setTrackedApplications(INITIAL_TRACKED_APPLICATIONS);
    setIsOnboardingOpen(false);
    setCurrentTab('blueprint');
  };

  // Clear user data
  const handleClearData = () => {
    setAppState(EMPTY_APPLICATION_STATE);
    setEvidenceBank([]);
    setTrackedApplications([]);
    resetAnalysesCount();
    setCurrentTab('landing');
  };

  // Requirement Matrix updates
  const handleUpdateRequirement = (updated: JobRequirement) => {
    const updatedReqs = appState.requirements.map(r => r.id === updated.id ? updated : r);
    const newScore = calculateReadinessScore(updatedReqs, appState.rawResumeText, appState.jobDescription);
    const newPack = generateApplicationPack(appState.jobTitle, appState.company, appState.rawResumeText, updatedReqs, appState.jobXRay);
    
    setAppState(prev => ({
      ...prev,
      requirements: updatedReqs,
      readinessScore: newScore,
      applicationPack: newPack
    }));
  };

  // Bullet change status updates
  const handleUpdateBulletChange = (updated: BulletChange) => {
    const updatedBullets = appState.bulletChanges.map(b => b.id === updated.id ? updated : b);
    const syncedResume = syncTailoredResumeText(appState.rawResumeText, updatedBullets);
    
    setAppState(prev => ({
      ...prev,
      bulletChanges: updatedBullets,
      applicationPack: {
        ...prev.applicationPack,
        tailoredResume: syncedResume
      }
    }));
  };

  const handleApproveAllBullets = () => {
    const updatedBullets = appState.bulletChanges.map(b => ({
      ...b,
      status: 'approved' as const
    }));
    const syncedResume = syncTailoredResumeText(appState.rawResumeText, updatedBullets);
    
    setAppState(prev => ({
      ...prev,
      bulletChanges: updatedBullets,
      applicationPack: {
        ...prev.applicationPack,
        tailoredResume: syncedResume
      }
    }));
  };

  const handleResolveClaimItem = (
    itemId: string, 
    resolution: 'add_evidence' | 'remove_number' | 'keep_original', 
    note?: string
  ) => {
    let updatedBullets = [...appState.bulletChanges];

    // If remove number, strip number from corresponding proposed bullet
    if (resolution === 'remove_number') {
      const targetItem = appState.claimGuardItems.find(i => i.id === itemId);
      if (targetItem?.originalNumber) {
        updatedBullets = updatedBullets.map(b => {
          if (b.proposed.includes(targetItem.originalNumber!)) {
            const qualitative = b.proposed.replace(targetItem.originalNumber!, 'significantly').replace('by significantly', 'significantly');
            return {
              ...b,
              proposed: qualitative,
              customDraft: qualitative
            };
          }
          return b;
        });
      }
    } else if (resolution === 'keep_original') {
      // Revert to original
      const targetItem = appState.claimGuardItems.find(i => i.id === itemId);
      if (targetItem) {
        updatedBullets = updatedBullets.map(b => {
          if (b.section.toLowerCase() === targetItem.location.toLowerCase()) {
            return { ...b, status: 'rejected' as const };
          }
          return b;
        });
      }
    }

    const updatedItems = appState.claimGuardItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          status: 'SUPPORTED' as const,
          userResolution: resolution,
          resolutionNote: note || `Resolved with ${resolution}`
        };
      }
      return item;
    });

    const syncedResume = syncTailoredResumeText(appState.rawResumeText, updatedBullets);

    setAppState(prev => ({
      ...prev,
      bulletChanges: updatedBullets,
      claimGuardItems: updatedItems,
      applicationPack: {
        ...prev.applicationPack,
        tailoredResume: syncedResume
      }
    }));
  };

  // Evidence Bank CRUD
  const handleAddEvidence = (entry: Omit<EvidenceBankEntry, 'id' | 'dateAdded' | 'usedCount' | 'usedInCurrentApplication'>) => {
    const newEntry: EvidenceBankEntry = {
      ...entry,
      id: `ev-${Date.now()}`,
      dateAdded: new Date().toISOString().slice(0, 10),
      usedCount: 0,
      usedInCurrentApplication: false
    };
    setEvidenceBank(prev => [newEntry, ...prev]);
  };

  const handleUpdateEvidence = (updated: EvidenceBankEntry) => {
    setEvidenceBank(prev => prev.map(e => e.id === updated.id ? updated : e));
  };

  const handleDeleteEvidence = (id: string) => {
    setEvidenceBank(prev => prev.filter(e => e.id !== id));
  };

  // Tracker CRUD
  const handleAddTrackedApp = (entry: Omit<JobTrackerEntry, 'id'>) => {
    const newApp: JobTrackerEntry = {
      ...entry,
      id: `track-${Date.now()}`
    };
    setTrackedApplications(prev => [newApp, ...prev]);
  };

  const handleUpdateTrackedApp = (updated: JobTrackerEntry) => {
    setTrackedApplications(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const handleDeleteTrackedApp = (id: string) => {
    setTrackedApplications(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      
      {/* Payment Success Banner */}
      {paymentSuccessNotice.show && (
        <div className="bg-emerald-600 text-white px-4 py-3 shadow-md animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 text-amber-300 animate-bounce" />
              <div className="text-xs sm:text-sm font-bold">
                Payment successful 🎉 Your JOBHUNT AI Full Access is ready!
                {paymentSuccessNotice.orderId && (
                  <span className="ml-2 font-mono text-emerald-100 text-[11px]">
                    (Order: {paymentSuccessNotice.orderId})
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setPaymentSuccessNotice({ show: false });
                  setCurrentTab('dashboard');
                }}
                className="px-3 py-1 bg-white text-emerald-800 text-xs font-extrabold rounded-lg hover:bg-emerald-50 transition"
              >
                OPEN JOBHUNT AI
              </button>
              <button
                onClick={() => setPaymentSuccessNotice({ show: false })}
                className="p-1 hover:bg-emerald-700 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isAnalyzed={appState.isAnalyzed}
        onOpenOnboarding={handleStartOnboarding}
        onOpenPricing={() => handleOpenPricing()}
        onOpenStarterKit={() => setCurrentTab('starterkit')}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLoadDemo={handleLoadDemo}
        isFullAccess={effectivePro}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {currentTab === 'landing' && (
          <LandingPage
            onStartOnboarding={handleStartOnboarding}
            onLoadDemo={handleLoadDemo}
            onOpenPricing={() => handleOpenPricing()}
            onOpenStarterKit={() => setCurrentTab('starterkit')}
            onNavigateTab={setCurrentTab}
            onOpenReviewModal={() => setIsReviewModalOpen(true)}
            isAnalyzed={appState.isAnalyzed}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            onNavigateTab={setCurrentTab}
            onStartOnboarding={handleStartOnboarding}
            onLoadDemo={handleLoadDemo}
            onOpenPricing={() => handleOpenPricing()}
            onOpenReviewModal={() => setIsReviewModalOpen(true)}
            isAnalyzed={appState.isAnalyzed}
          />
        )}

        {currentTab === 'blueprint' && (
          <ApplicationBlueprint
            state={appState}
            onNavigateTab={setCurrentTab}
            onOpenStarterKit={() => setCurrentTab('starterkit')}
            onOpenOnboarding={handleStartOnboarding}
            onLoadDemo={handleLoadDemo}
          />
        )}

        {currentTab === 'evidence' && (
          <RequirementEvidenceEngine
            requirements={appState.requirements}
            onUpdateRequirement={handleUpdateRequirement}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'xray' && (
          <JobDescriptionXRay
            xray={appState.jobXRay}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'tailor' && (
          <ResumeTailor
            bulletChanges={appState.bulletChanges}
            originalResumeText={appState.rawResumeText}
            onUpdateBulletChange={handleUpdateBulletChange}
            onApproveAll={handleApproveAllBullets}
            onNavigateTab={setCurrentTab}
            candidateName={appState.company ? 'Alex Morgan' : 'Candidate'}
            targetJobTitle={appState.jobTitle}
            isFullAccess={effectivePro}
            onOpenPricing={handleOpenPricing}
          />
        )}

        {currentTab === 'claimguard' && (
          <ClaimGuard
            items={appState.claimGuardItems}
            onResolveItem={handleResolveClaimItem}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'achievement' && (
          <AchievementBuilder
            onSaveToEvidenceBank={handleAddEvidence}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'ats' && (
          <AtsSafetyCheck
            checks={appState.atsChecks}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'apppack' && (
          <ApplicationPack
            appPack={appState.applicationPack}
            company={appState.company}
            role={appState.jobTitle}
            candidateName="Alex Morgan"
            onUpdateAppPack={(updated) => setAppState(prev => ({ ...prev, applicationPack: updated }))}
            onNavigateTab={setCurrentTab}
            isFullAccess={effectivePro}
            onOpenPricing={handleOpenPricing}
          />
        )}

        {currentTab === 'interview' && (
          <InterviewCopilot
            questions={appState.interviewQuestions}
            company={appState.company}
            role={appState.jobTitle}
          />
        )}

        {currentTab === 'linkedin' && (
          <LinkedInOptimizer
            state={appState}
          />
        )}

        {currentTab === 'followup' && (
          <FollowUpGenerator
            state={appState}
          />
        )}

        {currentTab === 'tracker' && (
          <JobTracker
            applications={trackedApplications}
            onAddApplication={handleAddTrackedApp}
            onUpdateApplication={handleUpdateTrackedApp}
            onDeleteApplication={handleDeleteTrackedApp}
          />
        )}

        {currentTab === 'evidencebank' && (
          <EvidenceBank
            entries={evidenceBank}
            onAddEntry={handleAddEvidence}
            onUpdateEntry={handleUpdateEvidence}
            onDeleteEntry={handleDeleteEvidence}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'starterkit' && (
          <StarterKitViewer 
            isFullAccess={effectivePro}
            onOpenPricing={handleOpenPricing}
          />
        )}

      </main>

      {/* Modals */}
      <AuthModal />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      <OnboardingWizard
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSubmit={handleOnboardingSubmit}
        onLoadDemo={handleLoadDemo}
      />

      <PricingModal
        isOpen={pricingConfig.isOpen}
        onClose={() => setPricingConfig(prev => ({ ...prev, isOpen: false }))}
        onUpgradeSuccess={() => setLocalPro(true)}
        isPro={effectivePro}
        featureName={pricingConfig.featureName}
        headline={pricingConfig.headline}
        reason={pricingConfig.reason}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetToDemo={handleLoadDemo}
        onClearData={handleClearData}
        onEntitlementChange={() => setLocalPro(isFullAccess())}
      />

      {/* Footer */}
      <Footer
        onOpenPricing={() => handleOpenPricing()}
        onOpenStarterKit={() => setCurrentTab('starterkit')}
        onNavigateTab={setCurrentTab}
      />

    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

export default App;