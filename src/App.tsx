import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { PricingModal } from './components/landing/PricingModal';
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

export function App() {
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

  // Pro status from entitlement service
  const [isPro, setIsPro] = useState<boolean>(() => isFullAccess());

  // Modals & Pricing Config
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [pricingConfig, setPricingConfig] = useState<{
    isOpen: boolean;
    featureName?: string;
    headline?: string;
    reason?: string;
  }>({
    isOpen: false
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Helper to open pricing modal with contextual details
  const handleOpenPricing = (featureName?: string, headline?: string, reason?: string) => {
    setPricingConfig({
      isOpen: true,
      featureName,
      headline,
      reason
    });
  };

  const handleStartOnboarding = () => {
    if (!canPerformNewAnalysis()) {
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
    localStorage.setItem('jobhunt_ai_is_pro', String(isPro));
  }, [isPro]);

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
    // Record analysis count
    incrementAnalysesCount();

    // Run AI Engine pipeline
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
      atsChecks,
      interviewQuestions: interviewQs,
      applicationPack: appPack
    };

    setAppState(newState);

    // Auto-add to tracker
    const newTrackEntry: JobTrackerEntry = {
      id: `track-${Date.now()}`,
      company: data.company,
      role: data.jobTitle,
      jobUrl: data.jobUrl,
      dateSaved: new Date().toISOString().slice(0, 10),
      status: 'Preparing',
      resumeVersion: 'v1.0 (In-Progress)',
      notes: `Target Goal: ${data.targetGoal}. Initial Alignment: ${score.overallScore}%`,
      matchScore: score.overallScore
    };
    setTrackedApplications(prev => [newTrackEntry, ...prev]);

    // Navigate to Blueprint
    setCurrentTab('blueprint');
  };

  // Reset to Demo
  const handleLoadDemo = () => {
    setAppState(DEMO_APPLICATION_STATE);
    setEvidenceBank(INITIAL_EVIDENCE_BANK);
    setTrackedApplications(INITIAL_TRACKED_APPLICATIONS);
    setCurrentTab('blueprint');
  };

  // Clear all workspace data (Start Blank)
  const handleClearData = () => {
    localStorage.removeItem('jobhunt_ai_app_state');
    localStorage.removeItem('jobhunt_ai_evidence_bank');
    localStorage.removeItem('jobhunt_ai_tracked_apps');
    resetAnalysesCount();
    setAppState(EMPTY_APPLICATION_STATE);
    setEvidenceBank([]);
    setTrackedApplications([]);
    setCurrentTab('blueprint');
  };

  // Requirement Matrix Updates
  const handleUpdateRequirement = (updatedReq: JobRequirement) => {
    const updatedReqs = appState.requirements.map(r => r.id === updatedReq.id ? updatedReq : r);
    const newScore = calculateReadinessScore(updatedReqs, appState.rawResumeText, appState.jobDescription);
    setAppState(prev => ({
      ...prev,
      requirements: updatedReqs,
      readinessScore: newScore
    }));
  };

  // Resume Tailor Bullet Updates
  const syncTailoredResumeText = (originalText: string, changes: BulletChange[]): string => {
    let text = originalText;
    changes.forEach(change => {
      if (change.status === 'approved') {
        const targetText = change.customDraft || change.proposed;
        if (text.includes(change.original)) {
          text = text.replace(change.original, targetText);
        }
      }
    });
    return text;
  };

  const handleUpdateBulletChange = (updatedChange: BulletChange) => {
    const updatedChanges = appState.bulletChanges.map(c => c.id === updatedChange.id ? updatedChange : c);
    const newClaimAudit = runClaimGuardAudit(updatedChanges, appState.rawResumeText, evidenceBank);
    const syncedResume = syncTailoredResumeText(appState.rawResumeText, updatedChanges);

    setAppState(prev => ({
      ...prev,
      bulletChanges: updatedChanges,
      claimGuardItems: newClaimAudit,
      applicationPack: {
        ...prev.applicationPack,
        tailoredResume: syncedResume
      }
    }));
  };

  const handleApproveAllBullets = () => {
    const approved = appState.bulletChanges.map(c => ({ ...c, status: 'approved' as const }));
    const syncedResume = syncTailoredResumeText(appState.rawResumeText, approved);

    setAppState(prev => ({
      ...prev,
      bulletChanges: approved,
      applicationPack: {
        ...prev.applicationPack,
        tailoredResume: syncedResume
      }
    }));
  };

  // Claim Guard Resolutions
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
        isFullAccess={isPro}
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
            isFullAccess={isPro}
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
            isFullAccess={isPro}
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
            isFullAccess={isPro}
            onOpenPricing={handleOpenPricing}
          />
        )}

      </main>

      {/* Modals */}
      <OnboardingWizard
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSubmit={handleOnboardingSubmit}
        onLoadDemo={handleLoadDemo}
      />

      <PricingModal
        isOpen={pricingConfig.isOpen}
        onClose={() => setPricingConfig(prev => ({ ...prev, isOpen: false }))}
        onUpgradeSuccess={() => setIsPro(true)}
        isPro={isPro}
        featureName={pricingConfig.featureName}
        headline={pricingConfig.headline}
        reason={pricingConfig.reason}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetToDemo={handleLoadDemo}
        onClearData={handleClearData}
        onEntitlementChange={() => setIsPro(isFullAccess())}
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

export default App;
