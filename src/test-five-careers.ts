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

interface TestCase {
  title: string;
  role: string;
  company: string;
  jd: string;
  resume: string;
  forbiddenStrings: string[];
}

const testCases: TestCase[] = [
  {
    title: '1. Software Engineer',
    role: 'Senior Backend Engineer',
    company: 'Stripe',
    jd: 'Senior Backend Engineer needed to build distributed payment pipelines in Go, PostgreSQL, and Kubernetes. Must have 5+ years building scalable microservices and gRPC APIs.',
    resume: 'David Chen\nSenior Software Engineer with 6 years building Go microservices, PostgreSQL databases, and Docker pipelines.\n• Built high-throughput payment ingestion pipeline in Go handling 12,000 requests/sec.\n• Designed PostgreSQL relational schemas and reduced query latency by 45%.\n• Maintained Kubernetes clusters and Docker containers in AWS.',
    forbiddenStrings: ['Content Strategy', 'Social Media', 'Marketing Analytics', 'digital marketing']
  },
  {
    title: '2. Registered Nurse',
    role: 'ICU Charge Nurse',
    company: 'Mayo Clinic',
    jd: 'Registered Nurse (RN) for Intensive Care Unit (ICU). Requirements: Active RN license, BLS, ACLS certifications, and 3+ years in critical care patient triage and EHR documentation.',
    resume: 'Sarah Jenkins, BSN, RN\nRegistered Nurse with 4 years critical care and ICU patient triage experience.\n• Administered acute clinical care and monitored life-support systems for 60+ critical patients.\n• Coordinated patient care plans with interdisciplinary physician and pharmacy teams in Epic EHR.\n• Maintained 100% compliance with Joint Commission and HIPAA safety protocols.',
    forbiddenStrings: ['Content Strategy', 'Social Media', 'Marketing Analytics', 'digital marketing', 'campaign']
  },
  {
    title: '3. Senior Accountant',
    role: 'Senior Accountant',
    company: 'Deloitte',
    jd: 'Senior Accountant to lead monthly general ledger reconciliations, GAAP financial reporting, and annual audit preparation. CPA preferred, strong NetSuite and Excel proficiency.',
    resume: 'Michael Zhang, CPA\nSenior Accountant with 5 years managing GAAP financial statements and general ledger closing.\n• Executed month-end close and balance sheet reconciliations across 14 operating entities in NetSuite.\n• Prepared quarterly GAAP financial reporting packages for external audit review with zero material variances.\n• Standardized automated Excel financial models reducing closing cycle from 10 days to 6 days.',
    forbiddenStrings: ['Content Strategy', 'Social Media', 'Marketing Analytics', 'digital marketing', 'campaign']
  },
  {
    title: '4. High School Teacher',
    role: 'High School STEM Teacher',
    company: 'Oakridge Academy',
    jd: 'High School STEM Teacher to design and deliver Physics and Mathematics curriculum. Requirements: State Teaching Credential, student assessment design, and LMS proficiency.',
    resume: 'Emily Rodriguez\nHigh School Educator with 4 years teaching Physics and Algebra.\n• Designed and delivered interactive STEM curriculum for 140+ students annually.\n• Implemented differentiated lesson plans and student assessments improving standardized pass rates by 18%.\n• Managed course modules and parent communication in Google Classroom and Canvas LMS.',
    forbiddenStrings: ['Content Strategy', 'Social Media', 'Marketing Analytics', 'digital marketing', 'campaign']
  },
  {
    title: '5. Marketing Specialist',
    role: 'Growth Marketing Manager',
    company: 'HubSpot',
    jd: 'Growth Marketing Manager to oversee SEO strategy, Google Analytics funnels, and email marketing lifecycle campaigns. 3+ years B2B SaaS experience.',
    resume: 'Elena Rostova\nMarketing Specialist with 3 years leading digital campaigns, SEO optimization, and GA4 analytics.\n• Managed multi-channel B2B marketing campaigns generating 4,200 marketing qualified leads.\n• Optimized organic SEO content strategy lifting organic search traffic by 38% over 9 months.\n• Automated lifecycle email sequences in HubSpot improving lead activation rate by 14%.',
    forbiddenStrings: []
  },
  {
    title: '6. Product Designer',
    role: 'Senior Product Designer',
    company: 'Figma',
    jd: 'Senior Product Designer to lead design systems, user research, and interactive prototyping in Figma. 5+ years UI/UX design experience.',
    resume: 'Marcus Vance\nProduct Designer with 5 years crafting scalable design systems and mobile UI/UX.\n• Built and maintained company-wide design system in Figma used across 12 product squads.\n• Conducted 30+ usability testing interviews translating user friction into revised checkout flows.\n• Designed interactive high-fidelity prototypes and collaborated with frontend engineers in React.',
    forbiddenStrings: ['Content Strategy', 'Social Media & Marketing Analytics']
  },
  {
    title: '7. Senior Project Manager',
    role: 'Senior Project Manager',
    company: 'Amazon',
    jd: 'Senior Project Manager to oversee cross-functional agile delivery, sprint planning, and risk mitigation in Jira. PMP certification preferred.',
    resume: 'Robert Taylor, PMP\nProject Manager with 6 years leading enterprise agile development and cross-functional programs.\n• Led agile sprint ceremonies and roadmapping in Jira across 4 engineering teams (32 engineers).\n• Delivered enterprise platform migration 3 weeks ahead of schedule and within $1.2M budget.\n• Established risk management matrix and weekly stakeholder governance reports.',
    forbiddenStrings: ['Content Strategy', 'Social Media & Marketing Analytics', 'digital marketing']
  }
];

console.log('=====================================================');
console.log('RUNNING MULTI-INDUSTRY PRE-LAUNCH HARDENING REGRESSION TEST');
console.log('=====================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, name: string) {
  totalTests++;
  if (condition) {
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${name}`);
    process.exitCode = 1;
  }
}

testCases.forEach((tc) => {
  console.log(`\n--- TESTING: ${tc.title} (${tc.role} at ${tc.company}) ---`);
  
  // 1. JD X-Ray
  const xray = parseJobDescription(tc.jd, tc.role, tc.company);
  assert(xray.industry.length > 3, `${tc.title}: Detected industry (${xray.industry})`);
  assert(xray.mustHaves.length >= 2, `${tc.title}: Extracted must-haves (${xray.mustHaves.length})`);
  
  // 2. Requirement Matrix & Evidence Match
  const reqs = matchRequirementsToEvidence(xray, tc.resume, []);
  assert(reqs.length >= 3, `${tc.title}: Matched requirements (${reqs.length})`);
  
  // 3. Readiness Score
  const readiness = calculateReadinessScore(reqs, tc.resume, tc.jd);
  assert(readiness.overallScore >= 35 && readiness.overallScore <= 100, `${tc.title}: Readiness score calculated (${readiness.overallScore}/100)`);
  
  // 4. Bullet Proposals
  const bullets = generateBulletProposals(tc.resume, reqs);
  assert(bullets.length > 0, `${tc.title}: Generated ${bullets.length} bullet proposals`);
  
  // 5. Claim Guard Audit
  const claimGuard = runClaimGuardAudit(bullets, tc.resume, []);
  assert(claimGuard.length > 0, `${tc.title}: Claim Guard audit completed (${claimGuard.length} items)`);
  
  // 6. Application Pack (Cover letters, LinkedIn, Interview)
  const appPack = generateApplicationPack(tc.role, tc.company, tc.resume, reqs, xray);
  assert(appPack.linkedinHeadline.length === 3, `${tc.title}: Generated 3 LinkedIn headlines`);
  assert(appPack.coverLetter.professional.length > 100, `${tc.title}: Generated professional cover letter`);
  
  // Check no duplicate Senior Senior
  appPack.linkedinHeadline.forEach((hl, i) => {
    assert(!hl.includes('Senior Senior'), `${tc.title}: Headline ${i+1} has no double prefix`);
  });
  
  // Check forbidden strings
  tc.forbiddenStrings.forEach(str => {
    const hlHas = appPack.linkedinHeadline.some(hl => hl.toLowerCase().includes(str.toLowerCase()));
    const clHas = appPack.coverLetter.professional.toLowerCase().includes(str.toLowerCase());
    const aboutHas = appPack.linkedinAbout.toLowerCase().includes(str.toLowerCase());
    assert(!hlHas && !clHas && !aboutHas, `${tc.title}: Clean from forbidden text "${str}"`);
  });
  
  // 7. Interview Questions
  const questions = generateInterviewQuestions(reqs, xray, tc.resume);
  assert(questions.length === 10, `${tc.title}: Generated 10 interview questions`);
  
  // 8. ATS Check
  const ats = runAtsSafetyCheck(tc.resume);
  assert(ats.length === 5, `${tc.title}: ATS safety check completed`);
  
  console.log(`  ✓ Headline 1: "${appPack.linkedinHeadline[0]}"`);
  console.log(`  ✓ Headline 2: "${appPack.linkedinHeadline[1]}"`);
  console.log(`  ✓ Headline 3: "${appPack.linkedinHeadline[2]}"`);
});

console.log('\n=====================================================');
console.log(`FINAL RESULT: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=====================================================');
