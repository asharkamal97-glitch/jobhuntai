export interface StarterKitModule {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  content: string;
  templates: { title: string; prompt: string }[];
}

export const STARTER_KIT_MODULES: StarterKitModule[] = [
  {
    id: 'mod-01',
    number: '01',
    title: 'Quick Start Guide',
    subtitle: 'The Evidence-First Application Method',
    category: 'Foundations',
    description: 'The foundational philosophy and operating system for applying to jobs without fabricating experience or stuffing keywords.',
    content: `# JOBHUNT AI — Quick Start Guide
## The Evidence-First Application Philosophy

### Core Premise
Generic AI tools hallucinate credentials, inflate metrics, and generate robotic buzzwords that hiring managers easily spot. 
**JOBHUNT AI operates on a single principle:**
> "AI doesn't know your career better than you do. Your job is to present the experience you actually have — specifically aligned to the job you are applying for."

### The 4-Step Application Loop
1. **Target Deconstruction**: Parse the job description into discrete, verifiable requirement atoms (Must-Haves, Nice-to-Haves, Stack, Soft Skills).
2. **Evidence Mapping**: Pair each requirement against verified points from your personal Career Evidence Bank.
3. **Controlled Optimization**: Tailor resume bullets and cover notes strictly within the boundary of verified facts.
4. **Claim Guard™ Audit**: Run a pre-export verification to ensure no fabricated percentages, tools, or dates crept into the final text.

### Classification Standard
- **SUPPORTED**: Clear, direct evidence exists in your work history.
- **PARTIALLY SUPPORTED**: Relevant foundational experience exists, but specific scope or tools need clarification.
- **NOT SUPPORTED**: You lack this requirement. Never invent it. Either address as a growth area or focus on your core strengths.
- **USER VERIFICATION REQUIRED**: Ambiguous claim that requires your confirmation before export.`,
    templates: [
      {
        title: 'Master Evidence-First System Prompt (Universal AI)',
        prompt: `You are an expert career strategist acting as an Evidence-First Job Application Assistant.
RULES:
1. NEVER invent employers, job titles, metrics, dates, tools, or achievements.
2. If information is missing from my background, state "Evidence not provided — please verify".
3. Classify every requirement match as SUPPORTED, PARTIALLY SUPPORTED, or NOT SUPPORTED.
4. Optimize clarity and keyword alignment using only my genuine work history.`
      }
    ]
  },
  {
    id: 'mod-02',
    number: '02',
    title: 'Job Description Analyzer',
    subtitle: 'Extracting Must-Haves, Signals & Interview Traps',
    category: 'Analysis',
    description: 'Systematic framework and prompts to dissect any job description into its core DNA.',
    content: `# Module 02: Job Description Analyzer (JD X-Ray)

## Why Most Applicants Read Job Postings Wrong
Job postings are written by committees. They mix hard non-negotiable requirements with aspirational wishlists.

## The 6-Layer Extraction Framework
1. **Core Non-Negotiables (Must-Haves)**: Hard prerequisites (years of experience, essential tool stack, core responsibility).
2. **Value Drivers (Nice-to-Haves)**: Preferred background that separates top 5% candidates.
3. **Seniority & Autonomy Signals**: Words like "Lead", "Own", "Define strategy" vs "Support", "Assist", "Execute".
4. **Vocabulary & Nomenclature**: The exact phrasing the engineering/product team uses internally.
5. **Ambiguity Flags**: Vague requirements (e.g. "Fast-paced cross-functional agility") requiring grounded clarification.
6. **Predictive Interview Topics**: The 3–5 core business challenges driving the hire.`,
    templates: [
      {
        title: 'Job Description Deconstruction Prompt',
        prompt: `Analyze the following job description. Break it down into:
1. MUST-HAVE REQUIREMENTS (Non-negotiables)
2. NICE-TO-HAVE REQUIREMENTS (Differentiators)
3. SENIORITY SIGNALS (Level of autonomy expected)
4. TOOLS & TECHNICAL STACK
5. TOP 5 REPEATED TERMS & NOMENCLATURE
6. 3 LIKELY INTERVIEW PROBES

Job Description:
[PASTE JOB DESCRIPTION HERE]`
      }
    ]
  },
  {
    id: 'mod-03',
    number: '03',
    title: 'Resume Tailoring Workflow',
    subtitle: 'Controlled Sentence-by-Sentence Rewriting',
    category: 'Optimization',
    description: 'Transform passive, vague resume bullets into impact-driven evidence anchors without falsifying results.',
    content: `# Module 03: Controlled Resume Tailoring Workflow

## The 4-Part Bullet Structure
Every effective bullet point follows this truthful formula:
\`[Strong Action Verb] + [Specific Responsibility or Feature] + [Method/Tool Used] + [Observed Result or Scale]\`

### The Review Gate Protocol
Never accept automated resume rewrites blindly. For every proposed change, verify:
- **CURRENT**: What you originally wrote.
- **PROPOSED**: The streamlined, JD-aligned version.
- **WHY**: The exact requirement being addressed.
- **EVIDENCE SOURCE**: The original factual anchor.

### Handling Missing Metrics
If you do not have an exact metric (e.g., "$300k revenue"), use truthful qualitative scale:
- *Instead of inventing*: "Increased efficiency by 45%"
- *Write truthfully*: "Streamlined weekly reporting cadence across 5 cross-functional leads, reducing meeting overhead and accelerating sprint sign-offs."`,
    templates: [
      {
        title: 'Bullet Point Optimization Prompt',
        prompt: `Rewrite the following resume bullet to better align with this specific target requirement.
Target Requirement: [INSERT REQUIREMENT]
My Original Bullet: [INSERT ORIGINAL BULLET]
Verified Context/Facts: [INSERT ADDITIONAL FACTUAL DETAIL]

RULES:
- Do not invent any numbers not provided above.
- Use strong active verbs.
- Show: Proposed Version, Rationale, and Evidence Anchor.`
      }
    ]
  },
  {
    id: 'mod-04',
    number: '04',
    title: 'Career Evidence Bank',
    subtitle: 'Your Personal Application Memory Store',
    category: 'Memory & Assets',
    description: 'Organize and curate your verified career proof points so you never have to scramble for details again.',
    content: `# Module 04: Career Evidence Bank Framework

## The 8 Evidence Asset Categories
1. **Projects**: Major initiatives with problem statement, your role, and delivery timeline.
2. **Metrics & Scale**: Verified numbers (users served, revenue influenced, hours saved, percentage lifts).
3. **Skills**: Concrete abilities with demonstrated practical application.
4. **Responsibilities**: Daily and weekly operational ownership areas.
5. **Certifications & Training**: Accredited credentials and specialized course completions.
6. **Tools & Stack**: Software, platforms, languages, and frameworks used professionally.
7. **Education & Academics**: Degrees, honors, leadership roles, and research projects.
8. **Volunteer & Side Projects**: Open-source contributions, community initiatives, and advisory work.

## Maintenance Rule
Whenever you complete a major project at work, record 3 bullet points immediately while the details are fresh.`,
    templates: [
      {
        title: 'Evidence Extraction Prompt',
        prompt: `Review my raw project description below and extract 3 structured Career Evidence items with Category, Description, Verified Metric (if present), and Search Tags.

Raw Project Notes:
[PASTE RAW NOTES]`
      }
    ]
  },
  {
    id: 'mod-05',
    number: '05',
    title: 'Claim Guard™ Checklist',
    subtitle: 'Pre-Submission Truth & Verification Audit',
    category: 'Verification & Safety',
    description: 'A bulletproof 7-point audit to eliminate accidental exaggerations, unsupported numbers, or misleading scope.',
    content: `# Module 05: Claim Guard™ Pre-Export Checklist

## The 7-Point Claim Audit
Before sending any application, inspect every line against these 7 questions:

1. **The Number Test**: Can you explain how every single percentage or dollar figure was calculated if asked in an interview?
2. **The Tool Test**: If asked to open software X and perform a task live, could you do it without panicking?
3. **The Ownership Test**: Did you personally *lead* the initiative, or did you *support* a larger team? (Use "Led" vs "Collaborated with" accurately).
4. **The Date Test**: Are your employment dates consistent across resume, LinkedIn, and application forms?
5. **The Title Test**: Does your title reflect your actual payroll designation or standard market equivalent without deceptive inflation?
6. **The Certification Test**: Is every credential listed active or properly designated as "In Progress / Candidate"?
7. **The Scope Test**: Does your bullet describe your individual contribution rather than taking credit for company-wide revenue?`,
    templates: [
      {
        title: 'Claim Guard Audit Prompt',
        prompt: `Audit the following resume draft against my verified experience notes.
Identify any:
1. Unverified numerical claims or statistics
2. Overstated leadership verbs ("Architected" vs "Assisted")
3. Tools mentioned without supporting context

Resume Draft:
[PASTE RESUME DRAFT]

My Verified Notes:
[PASTE FACTUAL NOTES]`
      }
    ]
  },
  {
    id: 'mod-06',
    number: '06',
    title: 'Interview Workbook',
    subtitle: 'Evidence-Anchored STAR Method & Question Prep',
    category: 'Interview Prep',
    description: 'Structure compelling, truthful STAR interview stories without making up fictional outcomes.',
    content: `# Module 06: Truthful STAR Interview Preparation

## The Honest STAR Framework
- **Situation**: Set the stage concisely (industry, company context, constraint). 15% of time.
- **Task**: The specific problem assigned to you or goal you initiated. 15% of time.
- **Action**: The specific steps *YOU* took, tools chosen, and stakeholder alignment. 50% of time.
- **Result**: The verifiable outcome. 20% of time.

### What if you don't have a quantified result?
State the qualitative organizational impact:
> "While we didn't track direct revenue attribution for that internal tool, it eliminated weekly manual spreadsheet reconciliations for 4 team leads and received unanimous positive feedback in our quarterly retros."`,
    templates: [
      {
        title: 'STAR Story Builder Prompt',
        prompt: `Help me structure a truthful STAR interview story based on this real experience.
Target Interview Question: [INSERT QUESTION]
My Raw Situation & Action: [INSERT WHAT HAPPENED]
Actual Outcome / Result: [INSERT REAL RESULT]

Create:
1. Situation (2 sentences)
2. Task (1 sentence)
3. Action (3 concise bullet points)
4. Result (Truthful outcome statement)
5. 2 Likely Follow-Up Questions to anticipate.`
      }
    ]
  },
  {
    id: 'mod-07',
    number: '07',
    title: 'LinkedIn Workbook',
    subtitle: 'Profile Optimization & Recruiter Outreach',
    category: 'Networking',
    description: 'Align your public profile and outreach messages with your target role while preserving authenticity.',
    content: `# Module 07: LinkedIn Profile & Outreach System

## The 3 High-Impact LinkedIn Surfaces
1. **Headline**: Target Role | Core Specialization | Value Proposition (Avoid "Aspiring" or "Looking for opportunities").
2. **About Section**: 3-paragraph structure:
   - Paragraph 1: Professional identity and core domain focus.
   - Paragraph 2: Key career achievements and evidence highlights.
   - Paragraph 3: What you are currently building or interested in.
3. **Featured Section**: Link directly to case studies, public portfolios, or articles.

## Recruiter Outreach Principles
- Keep under 75 words.
- Reference a specific company milestone or product initiative.
- Mention 2 concrete proof points from your background.
- Low-friction call to action (no "Can I pick your brain for 30 minutes?").`,
    templates: [
      {
        title: 'Recruiter Direct Outreach Message',
        prompt: `Write a concise 60-word LinkedIn message to a recruiter at [COMPANY] for the [ROLE] position.
My top 2 relevant achievements: [ACHIEVEMENT 1], [ACHIEVEMENT 2].
Tone: Professional, direct, respectful of their time.`
      }
    ]
  },
  {
    id: 'mod-08',
    number: '08',
    title: 'Follow-Up Templates',
    subtitle: 'Post-Application, Interview & Negotiation Scripts',
    category: 'Communication',
    description: 'Battle-tested communication templates across 4 professional tones (Professional, Warm, Direct, Confident).',
    content: `# Module 08: Follow-Up & Negotiation Protocol

## Follow-Up Timetable
- **Post-Application (No Response)**: 7–10 business days.
- **Post-Screen Thank You**: Within 24 hours.
- **Post-Final Round Follow-Up**: 5 business days if date not specified.
- **Offer Discussion**: Within 48 hours of initial offer letter.

## The 4 Tone Archetypes
- **Professional**: Balanced, standard corporate, respectful.
- **Warm**: Relational, enthusiastic, culture-conscious.
- **Direct**: High-velocity, bulleted, concise.
- **Confident**: Senior-level, strategic, peer-to-peer mindset.`,
    templates: [
      {
        title: 'Post-Interview Thank You Note Prompt',
        prompt: `Draft a post-interview thank you email.
Interviewer Name: [NAME]
Topic we discussed in depth: [SPECIFIC TOPIC DISCUSSED]
How my experience connects: [CONNECTING POINT]
Tone: Warm and professional.`
      }
    ]
  },
  {
    id: 'mod-09',
    number: '09',
    title: 'Job Application Tracker',
    subtitle: 'Pipeline Management & Metrics',
    category: 'Operations',
    description: 'Keep your search organized with a structured pipeline from Saved to Offer.',
    content: `# Module 09: Application Pipeline Management

## Pipeline Stages
1. **Saved**: Bookmarked for review.
2. **Preparing**: Evidence mapping and tailoring in progress.
3. **Applied**: Submitted with tailored resume and cover note.
4. **Recruiter Contact**: Phone screen scheduled or completed.
5. **Interview**: Department or hiring manager rounds.
6. **Final Round**: Executive, presentation, or panel round.
7. **Offer**: Negotiation and closing stage.
8. **Archive**: Rejected or Withdrawn with retrospective notes.

## Healthy Pipeline Metrics
- Response Rate Target: 15%–25% (with tailored evidence-first applications).
- Interview to Final Round Rate Target: 40%+.`,
    templates: [
      {
        title: 'Weekly Search Review Prompt',
        prompt: `Review my application pipeline data below. Identify:
1. Stage bottlenecks (e.g. high drop-off at initial screen)
2. Recommendations to improve targeting
3. Priority follow-ups for this week

Pipeline data:
[PASTE APPLICATIONS DATA]`
      }
    ]
  },
  {
    id: 'mod-10',
    number: '10',
    title: '30-Day Job Search Plan',
    subtitle: 'Structured 4-Week Strategic Execution Roadmap',
    category: 'Strategy',
    description: 'A realistic, quality-over-quantity 4-week roadmap for English-speaking job markets (US, UK, CA, AU, EU).',
    content: `# Module 10: 30-Day Job Search Masterplan
## Quality Over Volume: The Strategic Search Method

### Week 1: Foundation & Asset Architecture
- Day 1–2: Audit and populate your Career Evidence Bank with all past projects, metrics, and tools.
- Day 3–4: Calibrate your core resume base format with single-column ATS safety standards.
- Day 5–7: Identify 15 high-fit target companies matching your proven career level.

### Week 2: Targeted Application Sprint
- Focus on 3–5 tailored applications per week rather than 50 generic one-click applies.
- Run every JD through the Requirement-Evidence Engine.
- Verify every claim with Claim Guard™ before submitting.
- Connect with 2 peers or team members at each target company on LinkedIn.

### Week 3: Networking & Interview Preparation
- Rehearse your top 10 STAR interview responses using your Evidence Bank.
- Conduct mock practice sessions focusing on conciseness and evidence clarity.
- Send polite 7-day follow-ups for Week 2 applications.

### Week 4: Optimization, Pipeline Review & Closing
- Analyze response metrics: if response rate <10%, recalibrate JD alignment and keyword hierarchy.
- Prepare salary negotiation benchmarks using verified market data.
- Execute executive interview rounds with structured follow-ups.`,
    templates: [
      {
        title: 'Daily Search Checklist Prompt',
        prompt: `Generate a daily 2-hour action checklist for Day [X] of my job search focused on [GOAL FOR THE DAY].`
      }
    ]
  }
];
