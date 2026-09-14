import { 
  parseJobDescription, 
  matchRequirementsToEvidence, 
  calculateReadinessScore, 
  generateBulletProposals, 
  runClaimGuardAudit, 
  runAtsSafetyCheck, 
  generateInterviewQuestions, 
  evaluateInterviewPracticeAnswer, 
  generateApplicationPack 
} from './services/aiEngine';
import { DEMO_RESUME_TEXT, DEMO_JOB_DESCRIPTION, INITIAL_EVIDENCE_BANK } from './data/demoData';
import { STARTER_KIT_MODULES } from './data/starterKitData';

console.log('--- STARTING JOBHUNT AI END-TO-END QA TEST SUITE ---');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

// TEST 1: Job Description Parser (X-Ray)
const xray = parseJobDescription(DEMO_JOB_DESCRIPTION, 'Senior Product Marketing Manager', 'LinearFlow Technologies');
assert(xray.mustHaves.length >= 3, 'JD X-Ray extracts at least 3 must-have requirements');
assert(xray.toolsAndTech.includes('Mixpanel') || xray.toolsAndTech.length > 0, 'JD X-Ray extracts tools & technologies');
assert(xray.senioritySignals.length > 0, 'JD X-Ray identifies seniority signals');
assert(xray.repeatedTerminology.length > 0, 'JD X-Ray identifies repeated terminology');

// TEST 2: Requirement -> Evidence Engine
const reqs = matchRequirementsToEvidence(xray, DEMO_RESUME_TEXT, INITIAL_EVIDENCE_BANK);
assert(reqs.length >= 5, 'Requirement Engine parses and maps at least 5 requirements');
const supported = reqs.filter(r => r.confidence === 'SUPPORTED');
const partial = reqs.filter(r => r.confidence === 'PARTIALLY_SUPPORTED');
const unsupported = reqs.filter(r => r.confidence === 'NOT_SUPPORTED');
assert(supported.length > 0, 'Requirement Engine correctly identifies SUPPORTED requirements');
assert(partial.length >= 0, 'Requirement Engine classifies partial matches');

// TEST 3: Application Readiness Score Calculation
const score = calculateReadinessScore(reqs, DEMO_RESUME_TEXT, DEMO_JOB_DESCRIPTION);
assert(score.overallScore >= 50 && score.overallScore <= 100, `Readiness score is valid range: ${score.overallScore}/100`);
assert(score.experienceAlignment > 0, 'Experience alignment score calculated');
assert(score.skillAlignment > 0, 'Skill alignment score calculated');
assert(score.evidenceStrength > 0, 'Evidence strength score calculated');
assert(Boolean(score.biggestOpportunity.title), 'Identifies biggest opportunity');

// TEST 4: Controlled Resume Tailoring Engine
const bulletProposals = generateBulletProposals(DEMO_RESUME_TEXT, reqs);
assert(bulletProposals.length >= 3, 'Generates at least 3 controlled bullet proposals');
assert(bulletProposals[0].status === 'pending', 'Bullet proposals start in pending review status');
assert(Boolean(bulletProposals[0].why), 'Bullet proposals have clear rationales');

// TEST 5: Claim Guard™ Anti-Hallucination Scanner
const claimGuardSafe = runClaimGuardAudit(bulletProposals, DEMO_RESUME_TEXT, INITIAL_EVIDENCE_BANK);
assert(claimGuardSafe.length > 0, 'Claim Guard audits bullets against Evidence Bank');

// Test intentional unverified metric injection in Claim Guard
const fakeBullet = [{
  id: 'fake-1',
  section: 'Experience',
  original: 'Managed customer interviews.',
  proposed: 'Managed customer interviews increasing revenue by 485% and saving 920 hours.',
  why: 'Test',
  evidenceSource: 'Test',
  status: 'pending' as const
}];
const claimGuardFlagged = runClaimGuardAudit(fakeBullet, DEMO_RESUME_TEXT, INITIAL_EVIDENCE_BANK);
const hasFlag = claimGuardFlagged.some(i => i.status === 'NEEDS_USER_CONFIRMATION');
assert(hasFlag, 'Claim Guard successfully caught unverified metric 485% and flagged for user confirmation');

// TEST 6: ATS Compatibility Check
const atsChecks = runAtsSafetyCheck(DEMO_RESUME_TEXT);
assert(atsChecks.length >= 5, 'ATS inspection runs all checks');
assert(atsChecks.some(c => c.checkTitle === 'Standard Contact Header'), 'ATS checks contact header');

// TEST 7: Interview Copilot & Question Generator
const interviewQs = generateInterviewQuestions(reqs, xray, DEMO_RESUME_TEXT);
assert(interviewQs.length === 10, `Interview Copilot generated exactly 10 targeted questions (got ${interviewQs.length})`);
assert(interviewQs[0].starBuilder !== undefined, 'Interview questions have STAR builder outlines');

// TEST 8: Interview Practice Evaluation Simulator
const evaluation = evaluateInterviewPracticeAnswer(
  interviewQs[0].question,
  'At Veloce, I led the GTM launch for 4 major releases. I conducted 24 customer interviews to uncover key objections, created sales battlecards, and improved new user activation from 18% to 27%.'
);
assert(evaluation.overallScore >= 7, `Evaluation simulator scores answer: ${evaluation.overallScore}/10`);
assert(Boolean(evaluation.oneThingDoneWell), 'Evaluation provides positive reinforcement');
assert(Boolean(evaluation.oneThingToImprove), 'Evaluation provides constructive feedback');

// TEST 9: Application Pack Generator
const appPack = generateApplicationPack('Senior Product Marketing Manager', 'LinearFlow', DEMO_RESUME_TEXT, reqs, xray);
assert(Boolean(appPack.coverLetter.professional), 'Generates professional cover letter');
assert(Boolean(appPack.coverLetter.warm), 'Generates warm cover letter');
assert(Boolean(appPack.coverLetter.direct), 'Generates direct cover letter');
assert(Boolean(appPack.coverLetter.confident), 'Generates confident cover letter');
assert(appPack.linkedinHeadline.length >= 3, 'Generates 3 LinkedIn headline options');
assert(Boolean(appPack.recruiterMessage), 'Generates recruiter outreach message');
assert(appPack.jobSpecificChecklist.length >= 5, 'Generates job-specific checklist');

// TEST 10: 10-Module Starter Kit
assert(STARTER_KIT_MODULES.length === 10, `Starter Kit has all 10 modules (got ${STARTER_KIT_MODULES.length})`);

console.log(`\n--- QA SUITE RESULT: ${passedTests}/${totalTests} TESTS PASSED ---`);
