export type EvidenceConfidence = 
  | 'SUPPORTED'
  | 'PARTIALLY_SUPPORTED'
  | 'NOT_SUPPORTED'
  | 'USER_VERIFICATION_REQUIRED';

export type RequirementCategory = 
  | 'must_have'
  | 'nice_to_have'
  | 'responsibility'
  | 'technology'
  | 'soft_skill'
  | 'seniority_signal';

export interface JobRequirement {
  id: string;
  requirementText: string;
  category: RequirementCategory;
  matchedEvidence: string;
  confidence: EvidenceConfidence;
  recommendation: string;
  isCustomized?: boolean;
  userNotes?: string;
}

export interface JobDescriptionXRayData {
  jobTitle: string;
  company: string;
  industry: string;
  seniorityLevel: string;
  location: string;
  salaryRange?: string;
  mustHaves: string[];
  niceToHaves: string[];
  keyResponsibilities: string[];
  toolsAndTech: string[];
  softSkills: string[];
  senioritySignals: string[];
  industryTerms: string[];
  possibleInterviewTopics: string[];
  repeatedTerminology: { term: string; count: number; importance: 'high' | 'medium' | 'contextual' }[];
  ambiguousRequirements: { text: string; note: string; suggestedClarification: string }[];
  verificationNeeded: string[];
}

export interface BulletChange {
  id: string;
  section: string;
  original: string;
  proposed: string;
  why: string;
  evidenceSource: string;
  status: 'pending' | 'approved' | 'edited' | 'rejected';
  customDraft?: string;
  targetRequirement?: string;
}

export interface ClaimGuardItem {
  id: string;
  text: string;
  location: string;
  claimType: 'unsupported_metric' | 'unverified_tool' | 'inflated_scope' | 'unconfirmed_certification';
  flagReason: string;
  status: 'SUPPORTED' | 'NEEDS_USER_CONFIRMATION' | 'UNSUPPORTED';
  originalNumber?: string;
  userResolution?: 'add_evidence' | 'remove_number' | 'keep_original' | 'custom_clarified';
  resolutionNote?: string;
}

export interface ReadinessScoreBreakdown {
  overallScore: number;
  experienceAlignment: number;
  skillAlignment: number;
  evidenceStrength: number;
  keywordAlignment: number;
  resumeClarity: number;
  requirementCoverage: number;
  biggestOpportunity: {
    title: string;
    highlight: string;
    description: string;
    recommendedAction: string;
  };
}

export interface AtsCheckResult {
  id: string;
  category: string;
  checkTitle: string;
  status: 'PASS' | 'REVIEW' | 'FIX';
  explanation: string;
  fixRecommendation: string;
}

export interface EvidenceBankEntry {
  id: string;
  title: string;
  category: 'Experience' | 'Project' | 'Metric' | 'Skill' | 'Responsibility' | 'Certification' | 'Tool' | 'Education' | 'Volunteer' | 'Achievement';
  description: string;
  metric?: string;
  sourceContext: string;
  verified: boolean;
  dateAdded: string;
  usedInCurrentApplication: boolean;
  usedCount: number;
  tags: string[];
}

export interface InterviewQuestionItem {
  id: string;
  question: string;
  category: 'Behavioral' | 'Technical' | 'Leadership' | 'Situational' | 'Evidence Gap';
  whyTheyMayAsk: string;
  whatYourExperienceSupports: string;
  answerStructure: string;
  starBuilder: {
    situation: string;
    task: string;
    action: string;
    result: string;
    resultProvided: boolean;
  };
  practiceAnswerSample: string;
  followUpQuestions: string[];
}

export interface InterviewPracticeReview {
  clarity: number;
  specificity: number;
  evidence: number;
  structure: number;
  relevance: number;
  conciseness: number;
  oneThingDoneWell: string;
  oneThingToImprove: string;
  betterStructureGuide: string;
  overallScore: number;
  userAnswer: string;
  timestamp: string;
}

export interface ApplicationPackData {
  tailoredResume: string;
  coverLetter: {
    professional: string;
    warm: string;
    direct: string;
    confident: string;
  };
  linkedinHeadline: string[];
  linkedinAbout: string;
  recruiterMessage: string;
  interviewPrepBrief: string;
  followUpMessage: string;
  jobSpecificChecklist: {
    id: string;
    task: string;
    completed: boolean;
    stage: 'pre_apply' | 'apply' | 'post_apply' | 'interview';
  }[];
}

export interface JobTrackerEntry {
  id: string;
  company: string;
  role: string;
  jobUrl?: string;
  dateSaved: string;
  dateApplied?: string;
  status: 'Saved' | 'Preparing' | 'Applied' | 'Recruiter Contact' | 'Interview' | 'Final Round' | 'Offer' | 'Rejected' | 'Withdrawn';
  recruiterName?: string;
  recruiterContact?: string;
  followUpDate?: string;
  interviewDate?: string;
  salaryRange?: string;
  resumeVersion: string;
  notes: string;
  matchScore: number;
}

export interface ApplicationState {
  // Step 1: Target Job
  jobTitle: string;
  company: string;
  jobDescription: string;
  jobUrl?: string;
  targetGoal: 'improve_match' | 'tailor_resume' | 'prep_interview' | 'improve_linkedin' | 'complete_pack';
  
  // Step 2: Experience / Resume
  rawResumeText: string;
  fileName?: string;
  fileType?: string;
  linkedinProfileText?: string;
  additionalNotes?: string;

  // Analysis Outputs
  isAnalyzed: boolean;
  readinessScore: ReadinessScoreBreakdown;
  jobXRay: JobDescriptionXRayData;
  requirements: JobRequirement[];
  bulletChanges: BulletChange[];
  claimGuardItems: ClaimGuardItem[];
  atsChecks: AtsCheckResult[];
  interviewQuestions: InterviewQuestionItem[];
  applicationPack: ApplicationPackData;
}
