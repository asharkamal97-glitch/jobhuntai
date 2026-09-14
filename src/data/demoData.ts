import { 
  ApplicationState, 
  EvidenceBankEntry, 
  JobTrackerEntry 
} from '../types';

export const DEMO_RESUME_TEXT = `ALEX MORGAN
San Francisco, CA • alex.morgan.demo@example.com • (555) 382-9104 • linkedin.com/in/alexmorgan-demo

PRODUCT MARKETING SPECIALIST & GROWTH STRATEGIST
Data-informed marketing specialist with 3.5 years of experience leading product launches, customer lifecycle campaigns, and cross-functional go-to-market initiatives for B2B SaaS platforms.

PROFESSIONAL EXPERIENCE

Veloce Cloud Solutions | Austin, TX (Remote)
Product Marketing Specialist | 2022 – Present
• Planned and executed go-to-market strategies for 4 major product releases, coordinating messaging across product, sales engineering, and demand gen teams.
• Conducted 24 in-depth customer interviews and synthesized user insights into buyer personas, competitive battlecards, and sales enablement collateral.
• Collaborated with engineering and design to revamp email onboarding workflows, improving new user activation rates from 18% to 27%.
• Authored 12 product announcement blogs, feature briefs, and interactive release notes viewed by over 45,000 monthly active users.
• Tracked launch metrics using Mixpanel and HubSpot, reporting weekly adoption KPIs to VP of Marketing.

Nexus Interactive | Austin, TX
Marketing Associate & Content Coordinator | 2020 – 2022
• Managed editorial calendar and produced weekly newsletter for 32,000 enterprise subscribers with average 38% open rate.
• Partnered with senior account executives to produce 8 enterprise case studies that supported closing $420,000 in pipeline ARR.
• Audited website content for SEO best practices and refreshed bottom-of-funnel landing pages using Webflow and Google Analytics.
• Organized quarterly customer webinar series featuring product managers, generating 450+ qualified inbound leads per quarter.

EDUCATION & SKILLS
Bachelor of Arts in Communications & Media Studies | University of Texas at Austin, 2020
Tools & Platforms: HubSpot, Mixpanel, Salesforce, Webflow, Figma (basic), Google Analytics 4, Notion, Asana, Jira.
Core Competencies: Product Positioning, Go-To-Market (GTM), Customer Interviews, Email Lifecycle, Sales Enablement, Cross-Functional Project Management.`;

export const DEMO_JOB_DESCRIPTION = `LinearFlow Technologies (San Francisco, CA / Remote)
Role: Senior Product Marketing Manager (B2B SaaS)

About the Role:
LinearFlow is the modern developer productivity and sprint collaboration platform trusted by over 1,500 high-growth software teams. We are looking for a high-trajectory Senior Product Marketing Manager to lead our core workflow positioning, drive multi-channel launch campaigns, and partner closely with our Product, Sales, and Developer Relations teams.

Key Responsibilities:
• Own the end-to-end go-to-market strategy for tier-1 product releases, developer integrations, and enterprise tier capabilities.
• Conduct rigorous qualitative customer research and win/loss analysis to uncover buyer friction points and translate them into differentiated messaging.
• Develop high-impact sales enablement materials including battlecards, interactive demo scripts, objection handling guides, and technical one-pagers.
• Lead cross-functional alignment across Product Management, Sales Engineering, Demand Generation, and Customer Success.
• Design customer lifecycle messaging and onboarding sequences to accelerate product adoption and product-qualified lead (PQL) velocity.
• Establish and monitor key launch KPIs (pipeline generated, feature adoption, trial conversion, expansion revenue).

Qualifications & Requirements:
• 4+ years of dedicated product marketing or growth marketing experience in B2B SaaS or developer tools.
• Demonstrated track record of leading cross-functional GTM launches from concept to post-launch optimization.
• Strong analytical aptitude with experience in product analytics tools (e.g. Mixpanel, Amplitude, PostHog, or GA4).
• Proven ability to translate complex technical capabilities into crisp, compelling value propositions for both technical practitioners and executive buyers.
• Experience managing enterprise sales enablement programs and collaborating with AE/SE teams.
• Familiarity with developer ecosystems, API-first software, or modern agile workflows is a major plus.
• Exceptional written and verbal communication skills with an evidence-backed portfolio of launches.`;

export const EMPTY_APPLICATION_STATE: ApplicationState = {
  jobTitle: '',
  company: '',
  jobDescription: '',
  jobUrl: '',
  targetGoal: 'complete_pack',
  rawResumeText: '',
  fileName: '',
  fileType: '',
  linkedinProfileText: '',
  additionalNotes: '',
  isAnalyzed: false,
  readinessScore: {
    overallScore: 0,
    experienceAlignment: 0,
    skillAlignment: 0,
    evidenceStrength: 0,
    keywordAlignment: 0,
    resumeClarity: 0,
    requirementCoverage: 0,
    biggestOpportunity: {
      title: 'Analyze a Job Description to Begin',
      highlight: 'Add your resume and target job to generate your alignment strategy.',
      description: 'Your readiness score and evidence breakdown will appear here once you run a job analysis.',
      recommendedAction: 'Click "New Job Analysis" to get started.'
    }
  },
  jobXRay: {
    jobTitle: '',
    company: '',
    industry: 'Technology & Services',
    seniorityLevel: 'Mid / Senior',
    location: 'Remote / Hybrid',
    mustHaves: [],
    niceToHaves: [],
    keyResponsibilities: [],
    toolsAndTech: [],
    softSkills: [],
    senioritySignals: [],
    industryTerms: [],
    possibleInterviewTopics: [],
    repeatedTerminology: [],
    ambiguousRequirements: [],
    verificationNeeded: []
  },
  requirements: [],
  bulletChanges: [],
  claimGuardItems: [],
  atsChecks: [],
  interviewQuestions: [],
  applicationPack: {
    tailoredResume: '',
    coverLetter: {
      professional: '',
      warm: '',
      direct: '',
      confident: ''
    },
    linkedinHeadline: [],
    linkedinAbout: '',
    recruiterMessage: '',
    interviewPrepBrief: '',
    followUpMessage: '',
    jobSpecificChecklist: []
  }
};

export const DEMO_APPLICATION_STATE: ApplicationState = {
  jobTitle: 'Senior Product Marketing Manager',
  company: 'LinearFlow Technologies',
  jobDescription: DEMO_JOB_DESCRIPTION,
  jobUrl: 'https://linearflow.tech/careers/sr-product-marketing-manager',
  targetGoal: 'complete_pack',
  rawResumeText: DEMO_RESUME_TEXT,
  fileName: 'Alex_Morgan_Resume_2026.pdf',
  fileType: 'application/pdf',
  linkedinProfileText: 'linkedin.com/in/alexmorgan-demo | Product Marketing Specialist | B2B SaaS | Go-To-Market & Growth',
  additionalNotes: 'Have participated in developer tooling discussions and completed basic SQL for analytics training.',
  isAnalyzed: true,
  
  readinessScore: {
    overallScore: 81,
    experienceAlignment: 84,
    skillAlignment: 86,
    evidenceStrength: 76,
    keywordAlignment: 82,
    resumeClarity: 90,
    requirementCoverage: 79,
    biggestOpportunity: {
      title: 'Highlight Developer & Technical Practitioner Positioning',
      highlight: 'Evidence exists in your content and analytics work, but technical messaging is currently implicit.',
      description: 'Your resume shows strong B2B GTM and customer research, but LinearFlow strongly emphasizes translating technical capabilities for developer audiences. We found evidence of collaboration with engineering and API release notes in your raw background that can be elevated with verified phrasing.',
      recommendedAction: 'Approve the tailored bullet points in the Tailoring Engine that emphasize technical feature translation.'
    }
  },

  jobXRay: {
    jobTitle: 'Senior Product Marketing Manager',
    company: 'LinearFlow Technologies',
    industry: 'Developer Tools & B2B SaaS',
    seniorityLevel: 'Senior (4+ Years)',
    location: 'San Francisco, CA / Remote',
    salaryRange: '$140,000 – $175,000 + Equity (Estimated US Market)',
    mustHaves: [
      '4+ years B2B SaaS product marketing or growth marketing experience',
      'End-to-end Go-To-Market (GTM) launch execution track record',
      'Product analytics proficiency (Mixpanel, Amplitude, GA4)',
      'Sales enablement collateral creation (battlecards, pitch decks, demo scripts)',
      'Customer research & win/loss analysis experience'
    ],
    niceToHaves: [
      'Experience in developer tools, agile workflows, or API-first software ecosystems',
      'Track record influencing Product-Qualified Lead (PQL) velocity and trial-to-paid conversion',
      'Familiarity with PostHog or Amplitude event tracking schema'
    ],
    keyResponsibilities: [
      'Lead tier-1 launch campaigns across multi-channel distribution',
      'Craft core value propositions and messaging hierarchy',
      'Equip Sales AEs and Sales Engineers with battlecards and objection handling guides',
      'Align cross-functional teams (Product, Sales, DevRel, Demand Gen)',
      'Track and report on adoption, conversion, and pipeline influence metrics'
    ],
    toolsAndTech: [
      'Mixpanel', 'HubSpot', 'Salesforce', 'Amplitude', 'PostHog', 'Webflow', 'Figma', 'Jira'
    ],
    softSkills: [
      'Cross-functional leadership', 'Analytical rigor', 'Crisp narrative storytelling', 'Stakeholder alignment', 'Empathy for technical users'
    ],
    senioritySignals: [
      'Own end-to-end GTM strategy (High autonomy)',
      'Drive executive alignment across VP-level stakeholders',
      'Translate technical features into business revenue impact'
    ],
    industryTerms: [
      'Go-To-Market (GTM)', 'B2B SaaS', 'Product-Qualified Lead (PQL)', 'Win/Loss Analysis', 'Sales Enablement', 'Battlecards', 'Developer Relations (DevRel)'
    ],
    possibleInterviewTopics: [
      'Walk through your most complex multi-stakeholder product launch from inception to review.',
      'How do you balance messaging for a developer vs an engineering VP or CFO buyer?',
      'How do you structure win/loss customer interviews to get unfiltered feedback?',
      'Describe a time a product launch missed its adoption target and how you pivoted messaging.'
    ],
    repeatedTerminology: [
      { term: 'Go-To-Market (GTM)', count: 5, importance: 'high' },
      { term: 'Cross-functional alignment', count: 4, importance: 'high' },
      { term: 'Sales enablement / Battlecards', count: 3, importance: 'high' },
      { term: 'Developer / Technical audience', count: 3, importance: 'medium' },
      { term: 'Adoption & Conversion metrics', count: 3, importance: 'high' }
    ],
    ambiguousRequirements: [
      {
        text: 'Developer ecosystems experience (API-first software)',
        note: 'Likely preferred background, but often flexible if candidate has strong software literacy.',
        suggestedClarification: 'Anchor your technical release notes and engineering collaboration rather than claiming software development experience.'
      }
    ],
    verificationNeeded: [
      'Exact years of total experience: Resume indicates ~3.5 years dedicated B2B marketing; JD requests 4+ years. Position your pre-grad projects and high velocity to bridge the delta.'
    ]
  },

  requirements: [
    {
      id: 'req-1',
      requirementText: 'Own end-to-end go-to-market strategy for major product releases across cross-functional teams',
      category: 'must_have',
      matchedEvidence: 'Planned and executed GTM strategies for 4 major product releases at Veloce Cloud Solutions, coordinating messaging across product, sales engineering, and demand gen teams.',
      confidence: 'SUPPORTED',
      recommendation: 'Direct evidence match. Ensure launch scale and stakeholder coordination are prominently placed in top bullet.'
    },
    {
      id: 'req-2',
      requirementText: 'Conduct qualitative customer research and win/loss analysis to develop buyer personas and messaging',
      category: 'must_have',
      matchedEvidence: 'Conducted 24 customer interviews and synthesized user insights into buyer personas, competitive battlecards, and sales enablement collateral.',
      confidence: 'SUPPORTED',
      recommendation: 'Direct evidence match. Highlight how customer quotes directly shaped positioning.'
    },
    {
      id: 'req-3',
      requirementText: 'Develop high-impact sales enablement materials (battlecards, pitch decks, demo scripts, one-pagers)',
      category: 'must_have',
      matchedEvidence: 'Created competitive battlecards, feature briefs, and collaborated with AEs on 8 case studies supporting $420k in pipeline ARR.',
      confidence: 'SUPPORTED',
      recommendation: 'Strong alignment. Clarify the specific formats (battlecards, objection guides) in tailored bullet.'
    },
    {
      id: 'req-4',
      requirementText: '4+ years dedicated B2B SaaS product marketing or growth marketing experience',
      category: 'must_have',
      matchedEvidence: 'Resume reflects 3.5 years full-time B2B experience (2022–Present at Veloce, 2020–2022 at Nexus Interactive) plus collegiate media leadership.',
      confidence: 'PARTIALLY_SUPPORTED',
      recommendation: 'Slight experience gap (3.5 vs 4 years). Emphasize velocity, scope of ownership, and tier-1 releases rather than exaggerating graduation dates.'
    },
    {
      id: 'req-5',
      requirementText: 'Design customer lifecycle messaging and onboarding sequences to accelerate adoption & PQL velocity',
      category: 'responsibility',
      matchedEvidence: 'Revamped email onboarding workflows with engineering/design, improving new user activation rates from 18% to 27%.',
      confidence: 'SUPPORTED',
      recommendation: 'Direct quantitative match. Keep the verified 18% -> 27% activation metric intact.'
    },
    {
      id: 'req-6',
      requirementText: 'Familiarity with developer ecosystems, API-first software, or modern agile workflows',
      category: 'nice_to_have',
      matchedEvidence: 'Authored technical release notes and feature briefs for cloud platform; works with Jira/Asana; completed basic SQL and developer tooling workshops.',
      confidence: 'PARTIALLY_SUPPORTED',
      recommendation: 'Clarify your experience communicating technical software features without falsely claiming developer background.'
    },
    {
      id: 'req-7',
      requirementText: 'Experience with PostHog or Amplitude event tracking schema',
      category: 'technology',
      matchedEvidence: 'Strong proficiency in Mixpanel, Google Analytics 4, and HubSpot. No direct mention of PostHog/Amplitude.',
      confidence: 'USER_VERIFICATION_REQUIRED',
      recommendation: 'If you have used Amplitude or PostHog in self-study or side projects, add to Evidence Bank. Otherwise, highlight transferable Mixpanel event-tracking depth.'
    }
  ],

  bulletChanges: [
    {
      id: 'bc-1',
      section: 'Veloce Cloud Solutions — Bullet 1',
      original: 'Planned and executed go-to-market strategies for 4 major product releases, coordinating messaging across product, sales engineering, and demand gen teams.',
      proposed: 'Led end-to-end go-to-market strategies for 4 core B2B SaaS releases, establishing positioning, value propositions, and cross-functional launch alignment across Product, Sales Engineering, and Growth teams.',
      why: 'Explicitly matches the JD terminology ("end-to-end go-to-market", "positioning", "cross-functional launch alignment") while keeping exact factual ownership intact.',
      evidenceSource: 'Original resume bullet 1 & Veloce role scope.',
      status: 'approved',
      targetRequirement: 'req-1'
    },
    {
      id: 'bc-2',
      section: 'Veloce Cloud Solutions — Bullet 2',
      original: 'Conducted 24 in-depth customer interviews and synthesized user insights into buyer personas, competitive battlecards, and sales enablement collateral.',
      proposed: 'Executed 24 qualitative customer research interviews to uncover buyer friction points; translated findings into differentiated buyer personas, competitive battlecards, and sales enablement kits for account executives.',
      why: 'Directly mirrors the JD phrasing "uncover buyer friction points" and "sales enablement kits" using verified customer research activity.',
      evidenceSource: 'Original resume bullet 2 (24 customer interviews verified).',
      status: 'approved',
      targetRequirement: 'req-2'
    },
    {
      id: 'bc-3',
      section: 'Veloce Cloud Solutions — Bullet 3',
      original: 'Collaborated with engineering and design to revamp email onboarding workflows, improving new user activation rates from 18% to 27%.',
      proposed: 'Partnered with Product and Engineering to optimize user onboarding and lifecycle messaging sequences, lifting new user product activation from 18% to 27%.',
      why: 'Connects onboarding work with "lifecycle messaging sequences" and "product activation", matching LinearFlow\'s focus on PQL and adoption velocity.',
      evidenceSource: 'Original resume bullet 3 (18% to 27% metric verified).',
      status: 'approved',
      targetRequirement: 'req-5'
    },
    {
      id: 'bc-4',
      section: 'Nexus Interactive — Bullet 2',
      original: 'Partnered with senior account executives to produce 8 enterprise case studies that supported closing $420,000 in pipeline ARR.',
      proposed: 'Co-produced 8 enterprise customer case studies and pitch materials in tandem with Senior AEs, supporting $420K in closed pipeline ARR across B2B accounts.',
      why: 'Clarifies the enterprise sales collaboration aspect, reinforcing sales enablement capability.',
      evidenceSource: 'Original resume Nexus bullet 2 ($420,000 ARR verified).',
      status: 'approved',
      targetRequirement: 'req-3'
    }
  ],

  claimGuardItems: [
    {
      id: 'cg-1',
      text: '4 product launches, 24 customer interviews, 18% to 27% activation rate lift',
      location: 'Experience > Veloce Cloud Solutions',
      claimType: 'unsupported_metric',
      flagReason: 'All numerical metrics match your uploaded resume (4 releases, 24 interviews, 18%->27%).',
      status: 'SUPPORTED'
    },
    {
      id: 'cg-2',
      text: '8 case studies supporting $420,000 in pipeline ARR',
      location: 'Experience > Nexus Interactive',
      claimType: 'unsupported_metric',
      flagReason: 'Matches uploaded resume numbers ($420k ARR, 8 case studies).',
      status: 'SUPPORTED'
    },
    {
      id: 'cg-3',
      text: 'Seniority requirement: 4+ years vs candidate record of 3.5 years',
      location: 'Summary & Overview',
      claimType: 'inflated_scope',
      flagReason: 'We maintained "3.5+ years" in your tailored materials to prevent unverified tenure inflation. You can highlight high release velocity in interview discussions.',
      status: 'SUPPORTED',
      userResolution: 'keep_original',
      resolutionNote: 'Kept truthful 3.5 years timeline.'
    }
  ],

  atsChecks: [
    {
      id: 'ats-1',
      category: 'Structure & Layout',
      checkTitle: 'Single-Column Clean Hierarchy',
      status: 'PASS',
      explanation: 'No multi-column tables, text frames, or nested floating objects detected. Clean linear hierarchy.',
      fixRecommendation: 'Maintain standard margins and sequential section headers.'
    },
    {
      id: 'ats-2',
      category: 'Contact Information',
      checkTitle: 'Standard Contact Header',
      status: 'PASS',
      explanation: 'Full name, email address, telephone number, location, and LinkedIn URL are clearly identified at the top.',
      fixRecommendation: 'No action needed.'
    },
    {
      id: 'ats-3',
      category: 'Section Headings',
      checkTitle: 'Standardized Section Headers',
      status: 'PASS',
      explanation: 'Using standard headers ("Professional Experience", "Education & Skills") easily parsed by ATS parsers (Workday, Greenhouse, Lever).',
      fixRecommendation: 'Avoid creative headers like "Where I\'ve Made Waves".'
    },
    {
      id: 'ats-4',
      category: 'Date Consistency',
      checkTitle: 'Chronological Date Formatting',
      status: 'PASS',
      explanation: 'Consistent Year format (2022 – Present, 2020 – 2022) with sequential reverse chronology.',
      fixRecommendation: 'Ensure months (e.g., Aug 2022 – Present) are included if exact tenure is requested in application forms.'
    },
    {
      id: 'ats-5',
      category: 'Keyword Distribution',
      checkTitle: 'Natural Contextual Keyword Usage',
      status: 'PASS',
      explanation: 'High alignment with "Go-To-Market", "Sales Enablement", "Buyer Personas", "Mixpanel", "Product Marketing" woven into genuine action statements without keyword stuffing.',
      fixRecommendation: 'Keep keywords embedded in verb-driven bullets.'
    },
    {
      id: 'ats-6',
      category: 'Technical Stack Formatting',
      checkTitle: 'Tools & Analytics Visibility',
      status: 'REVIEW',
      explanation: 'Mixpanel and HubSpot are clearly listed, but Amplitude/PostHog are not present in your raw text.',
      fixRecommendation: 'Do not add tools you haven\'t used. Highlight Mixpanel depth or add Amplitude if you have completed training.'
    }
  ],

  interviewQuestions: [
    {
      id: 'iq-1',
      question: 'Walk me through a product launch you led from initial research through to post-launch optimization.',
      category: 'Behavioral',
      whyTheyMayAsk: 'LinearFlow launches fast iterations. They want to verify you manage the entire lifecycle with cross-functional discipline rather than just writing announcement copy.',
      whatYourExperienceSupports: 'Your 4 major releases at Veloce, customer interview synthesis (24 interviews), and coordination across Product, Sales Engineering, and Growth.',
      answerStructure: '1. Launch context & customer problem -> 2. Research & positioning framework -> 3. Cross-functional execution -> 4. Concrete quantitative adoption results.',
      starBuilder: {
        situation: 'At Veloce Cloud Solutions, our core cloud analytics suite was experiencing low discovery among mid-market accounts.',
        task: 'I was tasked with owning the GTM strategy and positioning for our 2.0 release across Product, Sales Engineering, and Demand Gen.',
        action: 'Conducted 24 customer interviews to identify key friction points, crafted competitive battlecards for AEs, and revamped onboarding sequences.',
        result: 'Achieved 45k+ monthly views, lifted user activation from 18% to 27%, and empowered AEs to close $420k in assisted pipeline.',
        resultProvided: true
      },
      practiceAnswerSample: 'At Veloce Cloud Solutions, I led the go-to-market strategy for 4 major product releases. For our major cloud workflow release, I began by conducting 24 customer interviews to uncover buyer friction points. From those insights, I developed our core positioning and created sales enablement materials—including competitive battlecards and demo guides—to align our Sales Engineering and Growth teams. Post-launch, we improved new user activation from 18% to 27% and tracked adoption KPIs in Mixpanel to ensure sustained engagement.',
      followUpQuestions: [
        'How did you get Sales Engineers to actually adopt and use your battlecards?',
        'What was the biggest disagreement between Product and Marketing during that launch, and how did you resolve it?'
      ]
    },
    {
      id: 'iq-2',
      question: 'How do you approach positioning a complex technical capability to both developer practitioners and executive buyers?',
      category: 'Technical',
      whyTheyMayAsk: 'LinearFlow targets both agile developers (who care about speed & DX) and Engineering Directors/VPs (who care about predictability & ROI).',
      whatYourExperienceSupports: 'Your experience drafting technical release notes, customer persona synthesis, and working alongside engineering teams.',
      answerStructure: '1. Establish two-tier messaging hierarchy -> 2. Technical practitioner layer (clarity, workflow, speed) -> 3. Executive layer (outcomes, risk reduction, team velocity).',
      starBuilder: {
        situation: 'At Veloce, we rolled out an advanced cloud orchestration feature with high technical complexity.',
        task: 'We needed messaging that excited technical users without alienating non-technical IT decision makers.',
        action: 'Created a dual-track messaging framework: technical release notes & docs for practitioners, and business outcome 1-pagers with ROI metrics for leadership.',
        result: 'Result not provided — add your real outcome from technical messaging tests.',
        resultProvided: false
      },
      practiceAnswerSample: 'I use a two-tier messaging hierarchy. For technical practitioners, the messaging must be concise, authentic, and focused on workflow speed—avoiding marketing fluff and demonstrating real code or UI workflows. For executive buyers, the focus shifts to team predictability, developer velocity, and platform ROI. I validate both tiers through direct customer interviews before finalizing launch materials.',
      followUpQuestions: [
        'What signals tell you that technical messaging is falling flat with developers?'
      ]
    },
    {
      id: 'iq-3',
      question: 'Tell me about a time when a product launch didn’t hit its adoption targets. What did the data show and what did you adjust?',
      category: 'Situational',
      whyTheyMayAsk: 'They want to test analytical resilience and whether you blame external factors or systematically debug positioning using data.',
      whatYourExperienceSupports: 'Your hands-on Mixpanel analytics tracking and email onboarding optimization.',
      answerStructure: '1. Target vs initial reality -> 2. Diagnostic deep-dive in Mixpanel/customer calls -> 3. Actionable iteration -> 4. Recovered metric.',
      starBuilder: {
        situation: 'During an early feature release at Veloce, initial Day-7 activation lagged below our 20% benchmark.',
        task: 'I needed to pinpoint where users dropped off in the first-run experience and realign messaging.',
        action: 'Analyzed Mixpanel funnel drop-offs and ran 5 quick 15-minute user walkthroughs, identifying confusing permission terminology in step 3.',
        result: 'Simplified onboarding microcopy and email triggers, raising activation from 18% to 27%.',
        resultProvided: true
      },
      practiceAnswerSample: 'When our early onboarding funnel showed activation at 18%, I partnered with our analytics and engineering team in Mixpanel to inspect the exact drop-off step. We discovered that users hesitated at a technical permission step. By revising the microcopy to clearly explain the benefit and adding a targeted lifecycle tip, we lifted overall activation to 27%.',
      followUpQuestions: [
        'How do you separate a product usability problem from a product messaging problem?'
      ]
    },
    {
      id: 'iq-4',
      question: 'How do you build trust and alignment with Product Managers and Engineering leads when planning GTM dates?',
      category: 'Leadership',
      whyTheyMayAsk: 'LinearFlow moves fast. PMs dislike heavy bureaucratic marketing processes. They want to know you collaborate flexibly without blocking releases.',
      whatYourExperienceSupports: 'Cross-functional alignment across 4 major releases at Veloce and sprint collaboration in Jira.',
      answerStructure: '1. Establish early shared goals -> 2. Embed directly in agile rituals -> 3. Decouple marketing tiers from code freezes.',
      starBuilder: {
        situation: 'At Veloce, product sprints operated on bi-weekly sprints while marketing planned quarterly campaigns.',
        task: 'Bridge the cadence mismatch so launches weren’t delayed by late marketing collateral.',
        action: 'Introduced a 3-tier launch classification system with clear definition-of-done checklists in Jira, attending sprint planning weekly.',
        result: 'Reduced launch prep cycle by 35% and achieved 100% on-time delivery across 4 major platform updates.',
        resultProvided: true
      },
      practiceAnswerSample: 'I align with engineering by speaking their language and embedding directly into their sprint rhythm rather than imposing separate bureaucratic roadmaps. At Veloce, I introduced a tiered launch framework where minor features released continuously with automated changelogs, while tier-1 launches had shared milestone gates.',
      followUpQuestions: ['What do you do if engineering announces a 2-week delay 3 days before a scheduled press launch?']
    },
    {
      id: 'iq-5',
      question: 'How do you conduct win/loss customer interviews to get unbiased, unfiltered feedback?',
      category: 'Technical',
      whyTheyMayAsk: 'Win/loss research is a listed core requirement in the job description.',
      whatYourExperienceSupports: '24 in-depth customer interviews conducted at Veloce synthesized into personas and battlecards.',
      answerStructure: '1. Neutral outreach protocol -> 2. Open-ended diagnostic questioning -> 3. Actionable persona synthesis.',
      starBuilder: {
        situation: 'Veloce was losing mid-market deals against legacy incumbents on perceived enterprise readiness.',
        task: 'Conduct independent win/loss research to uncover the underlying buying objections.',
        action: 'Conducted 24 one-on-one interviews with both closed-won and closed-lost prospects, recording exact buyer language.',
        result: 'Identified 3 core objections around migration complexity, leading to new sales battlecards supporting $420k in pipeline ARR.',
        resultProvided: true
      },
      practiceAnswerSample: 'I keep win/loss calls conversational and neutral, never defensive. I ask open-ended questions like "Take me back to when you first realized you needed a solution" and "What nearly prevented you from choosing us?" At Veloce, these 24 interviews revealed that buyers loved our UI but feared migration downtime, allowing us to build targeted migration battlecards.',
      followUpQuestions: ['How do you ensure sales reps don’t skew the feedback to blame pricing?']
    },
    {
      id: 'iq-6',
      question: 'How do you equip sales teams (AEs and SEs) with enablement tools they actually use?',
      category: 'Behavioral',
      whyTheyMayAsk: 'Most sales battlecards sit untouched in Google Drive. LinearFlow wants enablement that drives closed deals.',
      whatYourExperienceSupports: '8 enterprise case studies, competitive battlecards, and $420k closed pipeline ARR support.',
      answerStructure: '1. Co-design with top reps -> 2. Bite-sized actionable formats (objection matrices) -> 3. Slack/CRM integration.',
      starBuilder: {
        situation: 'At Nexus Interactive, account executives struggled with competitor FUD during late-stage enterprise demos.',
        task: 'Create concise, field-tested enablement materials.',
        action: 'Partnered with top AEs to write 8 customer case studies and quick 1-page battlecards focused strictly on "Landmine Questions" to ask prospects.',
        result: 'Directly supported closing $420k in assisted pipeline ARR across 8 enterprise accounts.',
        resultProvided: true
      },
      practiceAnswerSample: 'The secret to sales enablement is co-creation. Instead of handing sales a 20-page slide deck, I sit on their demo calls, identify the top 3 objections, and deliver 1-page battlecards containing "Trap-Setting Questions" and proof points. At Nexus, this approach directly assisted in closing $420k in pipeline ARR.',
      followUpQuestions: ['How do you measure whether sales enablement materials are actually influencing revenue?']
    },
    {
      id: 'iq-7',
      question: 'Our JD asks for 4+ years of dedicated experience, while your resume shows 3.5 years in B2B SaaS. How has your velocity prepared you for this senior scope?',
      category: 'Evidence Gap',
      whyTheyMayAsk: 'Tests candidate self-awareness, transparency, and confidence regarding tenure requirements.',
      whatYourExperienceSupports: '3.5 years of high-velocity execution leading 4 tier-1 releases, full lifecycle ownership, and measurable activation lifts.',
      answerStructure: '1. Acknowledge timeline transparently -> 2. Highlight density of ownership and launch volume -> 3. Demonstrate maturity of fundamentals.',
      starBuilder: {
        situation: 'Resume reflects 3.5 dedicated years across Veloce and Nexus.',
        task: 'Demonstrate that depth of ownership exceeds typical tenure benchmarks.',
        action: 'Led 4 major launches end-to-end, owned Mixpanel analytics, and conducted 24 customer research interviews independently.',
        result: 'Achieved outcomes typically expected of 5-year marketers, including 18%->27% activation gains and $420k ARR influence.',
        resultProvided: true
      },
      practiceAnswerSample: 'I appreciate the question. While my full-time B2B tenure is 3.5 years, the density of my experience is high. At Veloce, I wasn’t just assisting on campaigns—I owned end-to-end GTM for 4 core releases, conducted 24 customer interviews, and managed analytics in Mixpanel. My focus is on demonstrated business impact and rapid cross-functional leadership.',
      followUpQuestions: ['What area of product marketing do you feel you are currently developing fastest?']
    },
    {
      id: 'iq-8',
      question: 'How do you decide which distribution channels to prioritize for a new developer tool feature when resources are constrained?',
      category: 'Situational',
      whyTheyMayAsk: 'Assesses strategic prioritization and channel efficiency in developer marketing.',
      whatYourExperienceSupports: 'Managing 32k subscriber newsletter, product blogs viewed by 45k monthly users, and quarterly webinars.',
      answerStructure: '1. Evaluate audience intent -> 2. Tier channels by organic discovery vs outbound push -> 3. Prioritize high-retention channels (in-app, changelog, community).',
      starBuilder: {
        situation: 'At Veloce, we had limited budget for paid acquisition during our mid-year feature release.',
        task: 'Drive feature awareness and discovery using existing owned channels.',
        action: 'Prioritized in-app release notes, interactive changelog, technical blog, and targeted email onboarding sequences.',
        result: 'Reached over 45,000 monthly active users and boosted activation to 27% with zero incremental ad spend.',
        resultProvided: true
      },
      practiceAnswerSample: 'For developer tools, high-intent owned channels always outperform broad outbound advertising. I prioritize the public changelog, in-app first-run tours, documentation updates, and technical deep-dive blogs. At Veloce, focusing on owned channels generated 45,000+ monthly feature views at zero paid acquisition cost.',
      followUpQuestions: ['How do you leverage developer communities like Reddit or Hacker News without appearing spammy?']
    },
    {
      id: 'iq-9',
      question: 'What is your understanding of Product-Led Growth (PLG) and how product marketing accelerates the self-serve funnel?',
      category: 'Technical',
      whyTheyMayAsk: 'LinearFlow operates a hybrid PLG + Sales-Assist model. They want to ensure you understand user activation metrics.',
      whatYourExperienceSupports: 'Optimizing email onboarding, improving activation from 18% to 27%, and tracking Mixpanel funnels.',
      answerStructure: '1. Define PLG role of marketing -> 2. Focus on Time-to-Value (TTV) -> 3. Nudge Product-Qualified Leads (PQLs) to sales.',
      starBuilder: {
        situation: 'Veloce users signed up for free trials but stalled before reaching core workflow features.',
        task: 'Shorten Time-to-Value and increase product activation.',
        action: 'Mapped the critical "Aha! moment" in Mixpanel and triggered contextual lifecycle tips at key milestone moments.',
        result: 'Lifted activation from 18% to 27%, creating a higher volume of qualified accounts for sales outreach.',
        resultProvided: true
      },
      practiceAnswerSample: 'In a PLG motion, product marketing’s job is to accelerate Time-to-Value. It’s about ensuring the user experiences the core "Aha! moment" as quickly as possible. At Veloce, we analyzed user drop-offs in Mixpanel and redesigned our onboarding sequences, lifting activation from 18% to 27% and generating more Product-Qualified Leads.',
      followUpQuestions: ['How do you define a Product-Qualified Lead (PQL) in a collaboration platform?']
    },
    {
      id: 'iq-10',
      question: 'Where do you see yourself contributing most to LinearFlow in your first 90 days?',
      category: 'Leadership',
      whyTheyMayAsk: 'Tests 30-60-90 day orientation and whether candidate focuses on listening and research before prescribing changes.',
      whatYourExperienceSupports: 'Fast ramp-up in B2B SaaS, customer interview synthesis, and sales enablement kits.',
      answerStructure: '1. Days 1-30: Deep customer & internal stakeholder listening -> 2. Days 31-60: High-impact sales enablement delivery -> 3. Days 61-90: Lead first major tier-1 launch.',
      starBuilder: {
        situation: 'Starting a senior PMM role at high-growth software company.',
        task: 'Deliver immediate momentum without making uninformed assumptions.',
        action: 'Listen to 15 customer calls, shadow 5 AE demos, audit current battlecards, and align with PM leads.',
        result: 'Deliver an updated competitive battlecard in month 2 and own next quarter GTM roadmap.',
        resultProvided: true
      },
      practiceAnswerSample: 'In my first 30 days, my priority is listening: shadowing 10 AE demos, listening to 15 customer calls, and immersing myself in the product. In days 31–60, I’ll deliver immediate value by auditing and refreshing core sales enablement battlecards. By day 90, I’ll be leading end-to-end GTM for our next tier-1 release.',
      followUpQuestions: ['How will you measure your own success at the end of the 90-day mark?']
    }
  ],

  applicationPack: {
    tailoredResume: DEMO_RESUME_TEXT,
    coverLetter: {
      professional: `Dear LinearFlow Hiring Team,

I am writing to express my strong enthusiasm for the Senior Product Marketing Manager position at LinearFlow Technologies. Having followed LinearFlow's rapid emergence as the developer collaboration platform of choice for high-growth teams, I have admired your relentless focus on clean product design and developer velocity.

In my recent role as Product Marketing Specialist at Veloce Cloud Solutions, I owned the end-to-end go-to-market strategy for 4 major product releases. To ground our positioning in real user needs, I conducted 24 in-depth customer interviews, translating direct insights into buyer personas, competitive battlecards, and sales enablement kits for account executives. Collaborating closely with Product and Engineering, I also overhauled our user onboarding sequences—raising product activation from 18% to 27%.

LinearFlow's mission to bridge the gap between technical engineering workflows and cross-functional visibility requires a product marketer who speaks both languages fluently. My background combining qualitative win/loss research with rigorous product analytics (Mixpanel, GA4) directly prepares me to drive adoption for your core collaboration suite.

Thank you for your time and consideration. I would welcome the opportunity to discuss how my go-to-market experience can support LinearFlow's upcoming launch roadmap.

Sincerely,
Alex Morgan`,
      warm: `Hi LinearFlow Team,

As an avid follower of LinearFlow's thoughtful approach to software craftsmanship, I was thrilled to see your opening for a Senior Product Marketing Manager.

Throughout my career in B2B SaaS, my favorite moments have been sitting down with engineers and product leaders to translate complex, powerful software features into crisp, honest stories that resonate with both developers and leadership. At Veloce Cloud Solutions, I led the GTM launches for 4 significant platform updates, working directly with sales engineering and product teams to create battlecards, launch briefs, and onboarding sequences that improved activation from 18% to 27%.

I would love the opportunity to bring this evidence-driven, customer-first approach to LinearFlow and help accelerate your next chapter of developer adoption.

Warm regards,
Alex Morgan`,
      direct: `LinearFlow Hiring Team,

I am applying for the Senior Product Marketing Manager role at LinearFlow.

Here is what I bring to your GTM team:
• 4 Tier-1 Product Launches: Led end-to-end positioning, cross-functional alignment, and messaging for B2B cloud releases at Veloce.
• Customer-Backed Sales Enablement: Conducted 24 in-depth user interviews to build competitive battlecards and collateral that supported closing $420k in pipeline ARR.
• Proven Adoption Impact: Redesigned onboarding workflows in partnership with engineering, lifting new user activation from 18% to 27%.

I look forward to discussing how I can deliver immediate impact on your upcoming launch milestones.

Best,
Alex Morgan`,
      confident: `Dear LinearFlow Leadership,

High-growth developer platforms win when product excellence meets razor-sharp, truthful product marketing. That alignment is what excites me about the Senior Product Marketing Manager role at LinearFlow.

Over the past 3.5 years across Veloce Cloud Solutions and Nexus Interactive, I have specialized in turning technical capability into commercial momentum. By conducting rigorous win/loss research across 24 customer interviews and tracking product funnels in Mixpanel, I have consistently built GTM programs that deliver measurable adoption—including a 9-point jump in activation and $420k in assisted pipeline ARR.

I am ready to bring that exact operational rigor and narrative clarity to LinearFlow's product releases.

Sincerely,
Alex Morgan`
    },
    linkedinHeadline: [
      'Product Marketing Specialist | B2B SaaS • GTM Strategy • Customer Research • Lifecycle Growth',
      'Senior Product Marketer | Translating Technical Capabilities into Differentiated GTM & Revenue',
      'Product Marketing & Growth | 4+ Tier-1 Launches • Sales Enablement • Mixpanel & Analytics'
    ],
    linkedinAbout: `Product Marketing Specialist with 3.5+ years of experience leading go-to-market strategy, customer research, and lifecycle messaging for high-growth B2B SaaS platforms.

Specialties:
• Go-To-Market (GTM) Strategy & Execution
• Qualitative Customer Research & Win/Loss Analysis
• Sales Enablement (Battlecards, Objection Handling, Pitch Kits)
• User Lifecycle & Onboarding Optimization (18% → 27% activation lift)
• Cross-Functional Leadership (Product, Engineering, Sales, DevRel)
• Product Analytics (Mixpanel, Google Analytics 4, HubSpot)

Passionate about developer productivity tools, intuitive software craftsmanship, and evidence-based product positioning.`,
    recruiterMessage: `Hi [Recruiter Name],

I noticed LinearFlow is looking for a Senior Product Marketing Manager to lead upcoming GTM launches. 

Having spent the past 3.5 years driving B2B SaaS launches at Veloce Cloud Solutions (leading 4 major releases, conducting 24 customer research interviews, and lifting activation from 18% to 27%), I have developed deep appreciation for LinearFlow's clean developer experience.

I've submitted my application through your portal and would welcome the chance to connect briefly if you feel my background aligns with what your team needs.

Best regards,
Alex Morgan`,
    interviewPrepBrief: `LINEARFLOW TECHNOLOGIES — INTERVIEW PREP BRIEF
Target Role: Senior Product Marketing Manager
Company Profile: Developer collaboration & agile planning SaaS ($1,500+ team customers).

Core Interview Themes:
1. Cross-Functional Launch Leadership: Expect deep questions on how you align Product Managers, Sales Engineers, and Growth teams.
2. Developer vs Executive Messaging: Prepare concrete examples of adapting value props for engineers vs VPs of Engineering.
3. Metric Evidence: Be ready to walk through your Mixpanel tracking, 18%->27% activation lift, and 24 customer interview synthesis.
4. Product Familiarity: Review LinearFlow's public changelog and sprint planning features before the call.`,
    followUpMessage: `Hi [Interviewer Name],

Thank you for taking the time to speak with me today about the Senior Product Marketing Manager role at LinearFlow.

I particularly enjoyed our discussion around how LinearFlow plans to expand its enterprise workspace tier while maintaining its beloved developer-first simplicity. Our conversation reinforced my excitement for how my experience in qualitative win/loss research and cross-functional GTM alignment can help scale your upcoming launch roadmap.

Please let me know if you need any additional portfolio samples or references. Looking forward to the next steps.

Best regards,
Alex Morgan`,
    jobSpecificChecklist: [
      { id: 'chk-1', task: 'Review LinearFlow public release notes and product demo video', completed: true, stage: 'pre_apply' },
      { id: 'chk-2', task: 'Verify all 4 launch metrics against your Evidence Bank', completed: true, stage: 'pre_apply' },
      { id: 'chk-3', task: 'Submit tailored resume and customized direct cover letter', completed: true, stage: 'apply' },
      { id: 'chk-4', task: 'Send customized recruiter note on LinkedIn to LinearFlow talent lead', completed: false, stage: 'post_apply' },
      { id: 'chk-5', task: 'Prepare STAR stories for top 3 developer messaging questions', completed: false, stage: 'interview' },
      { id: 'chk-6', task: 'Draft 3 strategic questions regarding LinearFlow enterprise roadmap', completed: false, stage: 'interview' }
    ]
  }
};

export const INITIAL_EVIDENCE_BANK: EvidenceBankEntry[] = [
  {
    id: 'ev-1',
    title: '4 Major B2B SaaS Product Launches (Veloce)',
    category: 'Experience',
    description: 'Owned the full go-to-market lifecycle for 4 major cloud feature updates, managing launch schedules, messaging decks, and cross-team alignment with Product, SEs, and Demand Gen.',
    metric: '4 tier-1 releases',
    sourceContext: 'Veloce Cloud Solutions (2022–Present)',
    verified: true,
    dateAdded: '2026-08-10',
    usedInCurrentApplication: true,
    usedCount: 3,
    tags: ['GTM', 'Launch', 'Cross-Functional', 'B2B SaaS']
  },
  {
    id: 'ev-2',
    title: '24 Qualitative Customer Win/Loss Interviews',
    category: 'Project',
    description: 'Conducted 24 one-on-one 30-minute user interviews with IT decision-makers and cloud architects to identify buying triggers and product friction points.',
    metric: '24 interviews',
    sourceContext: 'Veloce Cloud Solutions (2023)',
    verified: true,
    dateAdded: '2026-08-10',
    usedInCurrentApplication: true,
    usedCount: 2,
    tags: ['Customer Research', 'Personas', 'Win/Loss', 'Interviews']
  },
  {
    id: 'ev-3',
    title: 'Onboarding Funnel Activation Lift (18% to 27%)',
    category: 'Metric',
    description: 'Analyzed first-run drop-off in Mixpanel, rewritten lifecycle email sequences, and guided engineering on friction removal to boost user activation rate by 9 percentage points.',
    metric: '18% to 27% (+50% relative lift)',
    sourceContext: 'Veloce Cloud Solutions (2023)',
    verified: true,
    dateAdded: '2026-08-12',
    usedInCurrentApplication: true,
    usedCount: 4,
    tags: ['Activation', 'Mixpanel', 'Onboarding', 'Lifecycle']
  },
  {
    id: 'ev-4',
    title: 'Enterprise Case Studies & Sales Enablement ($420k ARR)',
    category: 'Responsibility',
    description: 'Partnered with Account Executives to interview 8 enterprise accounts and authored comprehensive ROI case studies used in active pitch cycles.',
    metric: '$420,000 assisted pipeline ARR',
    sourceContext: 'Nexus Interactive (2021–2022)',
    verified: true,
    dateAdded: '2026-08-15',
    usedInCurrentApplication: true,
    usedCount: 2,
    tags: ['Sales Enablement', 'Case Studies', 'Revenue', 'Enterprise']
  },
  {
    id: 'ev-5',
    title: 'Weekly Newsletter & Content Channel (32k Subscribers)',
    category: 'Project',
    description: 'Managed editorial calendar and created technical weekly digest for 32,000 SaaS professionals maintaining 38% consistent open rate.',
    metric: '32k subscribers, 38% open rate',
    sourceContext: 'Nexus Interactive (2020–2022)',
    verified: true,
    dateAdded: '2026-08-18',
    usedInCurrentApplication: false,
    usedCount: 1,
    tags: ['Content', 'Email Marketing', 'Audience Building']
  },
  {
    id: 'ev-6',
    title: 'Product Analytics Proficiency (Mixpanel, GA4, HubSpot)',
    category: 'Tool',
    description: 'Hands-on proficiency creating funnels, cohort retention analyses, and custom dashboards in Mixpanel and Google Analytics 4.',
    metric: '3+ years active daily tool use',
    sourceContext: 'Veloce & Nexus',
    verified: true,
    dateAdded: '2026-08-20',
    usedInCurrentApplication: true,
    usedCount: 3,
    tags: ['Mixpanel', 'Analytics', 'GA4', 'HubSpot']
  }
];

export const INITIAL_TRACKED_APPLICATIONS: JobTrackerEntry[] = [
  {
    id: 'track-1',
    company: 'LinearFlow Technologies',
    role: 'Senior Product Marketing Manager',
    jobUrl: 'https://linearflow.tech/careers/sr-product-marketing-manager',
    dateSaved: '2026-09-08',
    dateApplied: '2026-09-10',
    status: 'Applied',
    recruiterName: 'Sarah Jenkins (Head of Talent)',
    recruiterContact: 'sarah.j@linearflow.tech',
    followUpDate: '2026-09-17',
    salaryRange: '$140,000 - $170,000',
    resumeVersion: 'v2.1 - LinearFlow Tailored (Verified)',
    notes: 'Applied with direct cover letter emphasizing GTM releases and 18%->27% activation lift.',
    matchScore: 81
  },
  {
    id: 'track-2',
    company: 'CloudPulse Analytics',
    role: 'Product Marketing Lead',
    jobUrl: 'https://cloudpulse.io/jobs/pmm-lead',
    dateSaved: '2026-09-02',
    dateApplied: '2026-09-04',
    status: 'Interview',
    recruiterName: 'Marcus Vance',
    recruiterContact: 'm.vance@cloudpulse.io',
    followUpDate: '2026-09-14',
    interviewDate: '2026-09-15 14:00 PST',
    salaryRange: '$145,000 - $165,000',
    resumeVersion: 'v1.8 - B2B Cloud Tailored',
    notes: 'Stage 2 Interview scheduled with VP of Marketing and Lead Product Architect.',
    matchScore: 88
  },
  {
    id: 'track-3',
    company: 'DevRelate Labs',
    role: 'Growth & Product Marketing Manager',
    jobUrl: 'https://devrelate.com/careers',
    dateSaved: '2026-08-28',
    dateApplied: '2026-08-30',
    status: 'Recruiter Contact',
    recruiterName: 'Elena Rostova',
    recruiterContact: 'elena@devrelate.com',
    followUpDate: '2026-09-13',
    salaryRange: '$135,000 - $155,000',
    resumeVersion: 'v1.5 - DevTools Specialized',
    notes: 'Recruiter phone screen completed; positive feedback on technical release notes portfolio.',
    matchScore: 79
  },
  {
    id: 'track-4',
    company: 'SprintScale.io',
    role: 'Senior PMM (Enterprise Workflows)',
    jobUrl: 'https://sprintscale.io/apply',
    dateSaved: '2026-09-11',
    status: 'Preparing',
    salaryRange: '$150,000 - $180,000',
    resumeVersion: 'Drafting with Evidence Bank',
    notes: 'Need to review their recent SOC2 compliance announcement before drafting cover letter.',
    matchScore: 84
  }
];
