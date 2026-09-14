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
import { EvidenceBankEntry } from './types';

console.log('================================================================');
console.log('JOBHUNT AI — 3-CANDIDATE DYNAMIC EXECUTION TEST');
console.log('================================================================\n');

// -------------------------------------------------------------
// CANDIDATE A: SOFTWARE ENGINEER
// -------------------------------------------------------------
const candidateA_Resume = `DAVID CHEN
San Jose, CA • david.chen@example.com • (555) 441-9021 • github.com/dchen-dev

SENIOR FULL STACK SOFTWARE ENGINEER
Full stack engineer with 6 years of experience building distributed microservices, React web applications, and scalable PostgreSQL databases in cloud environments.

PROFESSIONAL EXPERIENCE
Vortex Systems | San Jose, CA
Senior Software Engineer | 2022 – Present
• Architected and deployed 14 microservices using TypeScript, Node.js, and Docker on AWS ECS, serving 1.2M daily active users.
• Optimized PostgreSQL query performance and indexing, reducing p99 database response times by 42%.
• Built high-performance React frontends with Redux Toolkit and Tailwind CSS for real-time telemetry dashboards.
• Mentored 4 junior engineers on clean architecture, unit testing with Jest, and CI/CD pipelines in GitHub Actions.

EDUCATION & SKILLS
B.S. in Computer Science | San Jose State University, 2018
Languages & Tools: TypeScript, Python, Node.js, React, Docker, AWS, PostgreSQL, Redis, GraphQL, Git.`;

const jobA_JD = `Stripe & FinTech Core (San Francisco, CA / Remote)
Role: Senior Distributed Systems Engineer

Responsibilities:
• Design, build, and maintain highly available payment processing microservices in Python, Go, and TypeScript.
• Lead database scalability initiatives across high-throughput distributed PostgreSQL and Redis clusters.
• Collaborate with security and infrastructure teams to ensure zero-downtime deployments on AWS and Docker.
• Conduct code reviews and establish architectural standards across engineering squads.

Requirements:
• 5+ years software engineering experience in distributed systems or backend infrastructure.
• Deep proficiency in TypeScript, Python, or Go with relational database optimization experience.
• Hands-on production experience with Docker, Kubernetes, and AWS cloud architectures.
• Bachelor's degree in Computer Science or equivalent practical experience.`;

// -------------------------------------------------------------
// CANDIDATE B: REGISTERED NURSE
// -------------------------------------------------------------
const candidateB_Resume = `SARAH JENKINS, BSN, RN
Chicago, IL • s.jenkins.rn@example.com • (555) 882-1928 • IL RN License #041-992811

REGISTERED NURSE — EMERGENCY & CRITICAL CARE
Compassionate and clinical Registered Nurse with 4 years of acute care experience in Level 1 Trauma Center emergency departments and critical care units.

PROFESSIONAL EXPERIENCE
Northwestern Memorial Hospital | Chicago, IL
Emergency Department Staff RN | 2022 – Present
• Delivered direct emergency nursing care to 25+ high-acuity trauma and cardiac patients per 12-hour shift.
• Administered IV medications, blood products, and advanced cardiac life support protocols under rapid pressure.
• Trained and precepted 6 newly graduated nursing residents on triage protocols and Epic EMR documentation.
• Maintained 100% compliance with Joint Commission clinical safety standards and medication administration guidelines.

EDUCATION & CERTIFICATIONS
Bachelor of Science in Nursing (BSN) | Loyola University Chicago, 2020
Certifications: BLS, ACLS, PALS, TNCC (Trauma Nursing Core Course), Epic EMR Certified.`;

const jobB_JD = `Rush University Medical Center (Chicago, IL)
Role: Clinical Nurse Specialist — Intensive Care Unit (ICU)

Key Responsibilities:
• Provide evidence-based clinical nursing care to critically ill patients requiring continuous hemodynamic monitoring.
• Collaborate with multidisciplinary teams including intensivists, pharmacists, and respiratory therapists.
• Manage mechanical ventilation, vasoactive infusions, and continuous renal replacement therapy (CRRT).
• Document comprehensive patient assessments, medication administration, and care plans in Epic EMR.

Qualifications:
• 3+ years acute care or critical care (ICU/ED) nursing experience.
• Current active Registered Nurse (RN) license in State of Illinois.
• Bachelor of Science in Nursing (BSN) required.
• Current BLS and ACLS certifications.`;

// -------------------------------------------------------------
// CANDIDATE C: DIGITAL MARKETING SPECIALIST
// -------------------------------------------------------------
const candidateC_Resume = `ELENA ROSTOVA
Austin, TX • elena.rostova@example.com • (555) 773-0192 • linkedin.com/in/elena-marketing

DIGITAL MARKETING & SEO SPECIALIST
Growth marketing professional with 3.5 years of experience managing paid search campaigns, technical SEO, and conversion rate optimization (CRO) for eCommerce brands.

PROFESSIONAL EXPERIENCE
Volta Brands | Austin, TX
Digital Marketing Specialist | 2023 – Present
• Managed $45,000 monthly Google Ads and Meta Ads budget, generating $280,000 in attributed revenue (6.2x ROAS).
• Executed technical SEO audit and content refresh, increasing organic organic search sessions from 12,000 to 34,000 monthly.
• Conducted 15 A/B landing page tests in Webflow and Google Optimize, lifting checkout conversion rate by 2.1%.
• Tracked marketing funnel attribution and cohort retention in Google Analytics 4 and HubSpot.

EDUCATION & SKILLS
Bachelor of Arts in Advertising & Marketing | University of Texas at Austin, 2021
Skills: Google Ads, Meta Ads, SEO, Google Analytics 4, HubSpot, Webflow, SEMrush, A/B Testing.`;

const jobC_JD = `ShopSphere Commerce (Austin, TX)
Role: Growth Marketing & Acquisition Manager

Responsibilities:
• Own paid acquisition strategy across Google Search, Shopping, Meta, and TikTok advertising channels.
• Lead technical SEO roadmap and organic keyword strategy to drive non-paid inbound customer acquisition.
• Conduct rigorous A/B testing on landing pages to optimize conversion rate (CRO) and average order value.
• Analyze multi-touch attribution, CAC, and LTV metrics using Google Analytics 4 and BI dashboards.

Requirements:
• 3+ years growth marketing or digital advertising experience in eCommerce or D2C.
• Proven track record managing $30k+ monthly paid ad spend with profitable ROAS.
• Hands-on expertise in Google Analytics 4, Google Ads, and technical SEO tools (SEMrush, Ahrefs).
• Bachelor's degree in Marketing, Business, or related discipline.`;

function testCandidate(candName: string, resume: string, role: string, company: string, jd: string, bank: EvidenceBankEntry[]) {
  console.log(`================================================================`);
  console.log(`TEST EXECUTION: ${candName} -> ${role} at ${company}`);
  console.log(`================================================================`);

  // 1. JD X-Ray
  const xray = parseJobDescription(jd, role, company);
  console.log('1. JD X-Ray:');
  console.log('   Must-Haves Extracted:', xray.mustHaves);
  console.log('   Tools & Tech:', xray.toolsAndTech);
  console.log('   Repeated Terms:', xray.repeatedTerminology.map(t => `${t.term}(${t.count})`));

  // 2. Requirement Matrix
  const reqs = matchRequirementsToEvidence(xray, resume, bank);
  console.log('\n2. Requirement Matrix & Confidence Breakdown:');
  reqs.forEach((r, idx) => {
    console.log(`   [Req ${idx+1}] (${r.confidence}) ${r.requirementText.slice(0, 50)}... -> Match: "${r.matchedEvidence.slice(0, 45)}..."`);
  });

  // 3. Application Blueprint Score
  const score = calculateReadinessScore(reqs, resume, jd);
  console.log(`\n3. Application Readiness Score: ${score.overallScore}/100`);
  console.log(`   Exp: ${score.experienceAlignment} | Skill: ${score.skillAlignment} | Ev: ${score.evidenceStrength} | KW: ${score.keywordAlignment} | Cov: ${score.requirementCoverage}%`);
  console.log(`   Biggest Opportunity: "${score.biggestOpportunity.title}"`);

  // 4. Resume Tailoring Bullets
  const bullets = generateBulletProposals(resume, reqs);
  console.log('\n4. Tailored Bullet Proposals:');
  bullets.forEach((b, idx) => {
    console.log(`   [Bullet ${idx+1}] Proposed: "${b.proposed.slice(0, 75)}..."`);
  });

  // 5. Claim Guard
  const claimGuard = runClaimGuardAudit(bullets, resume, bank);
  console.log('\n5. Claim Guard Scan:', claimGuard.map(c => `[${c.status}] ${c.text.slice(0, 60)}...`));

  // 6. Interview Questions
  const interviewQs = generateInterviewQuestions(reqs, xray, resume);
  console.log('\n6. Top Interview Questions Generated (10 Total):');
  interviewQs.slice(0, 3).forEach((q, idx) => {
    console.log(`   [Q${idx+1} - ${q.category}] "${q.question}"`);
  });

  // 7. Application Pack Cover Letter & LinkedIn
  const pack = generateApplicationPack(role, company, resume, reqs, xray);
  console.log('\n7. Dynamic Cover Letter Extract:');
  console.log(`   "${pack.coverLetter.professional.slice(0, 180)}..."`);
  console.log('   LinkedIn Headlines Generated:', pack.linkedinHeadline);
  console.log('\n');
}

testCandidate('David Chen (Software Engineer)', candidateA_Resume, 'Senior Distributed Systems Engineer', 'Stripe & FinTech Core', jobA_JD, []);
testCandidate('Sarah Jenkins (Registered Nurse)', candidateB_Resume, 'Clinical Nurse Specialist — ICU', 'Rush University Medical Center', jobB_JD, []);
testCandidate('Elena Rostova (Digital Marketing)', candidateC_Resume, 'Growth Marketing & Acquisition Manager', 'ShopSphere Commerce', jobC_JD, []);
