import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  MessageSquare, 
  DollarSign, 
  HeartHandshake,
  Clock,
  ExternalLink
} from 'lucide-react';
import { ApplicationState } from '../../types';

interface FollowUpGeneratorProps {
  state: ApplicationState;
}

export const FollowUpGenerator: React.FC<FollowUpGeneratorProps> = ({ state }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('thank_you');
  const [selectedTone, setSelectedTone] = useState<'professional' | 'warm' | 'direct' | 'confident'>('professional');
  const [copied, setCopied] = useState(false);

  const { company, jobTitle } = state;

  const categories = [
    { id: 'thank_you', label: '1. Interview Thank-You', timing: 'Within 24 hours of conversation' },
    { id: 'post_app', label: '2. Application Follow-Up', timing: '7–10 days after submitting' },
    { id: 'recruiter', label: '3. Recruiter Check-In', timing: '5 business days after screen' },
    { id: 'post_final', label: '4. Post-Final Round Follow-Up', timing: '5–7 business days post-final' },
    { id: 'networking', label: '5. Informational / Referral', timing: 'When reaching out to peers' },
    { id: 'offer_response', label: '6. Offer Gratitude & Review', timing: 'Within 24–48 hours of offer' },
    { id: 'salary_negotiation', label: '7. Salary & Package Negotiation', timing: 'During formal compensation call' }
  ];

  const getTemplateContent = () => {
    switch (selectedCategory) {
      case 'thank_you':
        if (selectedTone === 'warm') {
          return `Subject: Thank you / ${jobTitle} conversation — [Your Name]

Hi [Interviewer Name],

Thank you so much for taking the time to chat today about the ${jobTitle} role at ${company}.

I really enjoyed our conversation, especially learning about how your team is approaching [Specific Topic or Initiative Discussed]. Hearing your vision for the product reaffirmed my excitement for how my background in cross-functional delivery and customer research can help support your roadmap.

Please let me know if you need any additional work samples or references. Looking forward to our next conversation!

Warm regards,
[Your Name]`;
        } else if (selectedTone === 'direct') {
          return `Subject: Thank you — ${jobTitle} interview / [Your Name]

Hi [Interviewer Name],

Thank you for your time today discussing the ${jobTitle} position at ${company}.

Key takeaways from our discussion:
• Alignment on upcoming priorities regarding [Core Priority Discussed].
• Direct relevance of my experience in [Key Strength Mentioned] to your immediate goals.

I've linked my project case study here [Link] for reference. Looking forward to next steps in the process.

Best,
[Your Name]`;
        } else if (selectedTone === 'confident') {
          return `Subject: ${jobTitle} discussion / Follow-up — [Your Name]

Dear [Interviewer Name],

Thank you for a great conversation today regarding ${company}'s strategic direction and the ${jobTitle} position.

Our discussion around [Strategic Challenge Discussed] highlighted strong alignment with the initiatives I've led in my recent role. I am confident that bringing an evidence-based approach to your team will accelerate execution on upcoming milestones.

I look forward to continuing our discussion in the next stage.

Sincerely,
[Your Name]`;
        }
        return `Subject: Thank you — ${jobTitle} interview / [Your Name]

Dear [Interviewer Name],

Thank you for taking the time to speak with me today regarding the ${jobTitle} position at ${company}.

I appreciated learning more about your team's goals and current focus on [Specific Project Discussed]. The conversation reinforced my interest in joining ${company} and contributing to your upcoming milestones.

Please feel free to reach out if you require any additional information from my side. I look forward to hearing about the next steps.

Sincerely,
[Your Name]`;

      case 'post_app':
        return `Subject: Following up on ${jobTitle} application — [Your Name]

Dear ${company} Hiring Team,

I hope this note finds you well.

I recently submitted my application for the ${jobTitle} opening at ${company}. Given my background leading cross-functional initiatives and verified track record in [Core Competency], I wanted to briefly reiterate my strong interest in the role.

I understand you are reviewing many candidates, and I appreciate your time and consideration.

Best regards,
[Your Name]
[LinkedIn Profile Link]`;

      case 'recruiter':
        return `Subject: Checking in: ${jobTitle} status / [Your Name]

Hi [Recruiter Name],

I hope you're having a productive week.

I'm following up on our conversation last week regarding the ${jobTitle} position. I remain very enthusiastic about the opportunity to join ${company} and wanted to check if there are any updates on timing for the next round.

Thank you again for your guidance and support throughout the process.

Best,
[Your Name]`;

      case 'post_final':
        return `Subject: ${company} — ${jobTitle} follow-up / [Your Name]

Dear [Hiring Manager Name / Recruiter Name],

I hope you are having a wonderful week.

Following our final round conversations last week, I wanted to reaffirm my strong enthusiasm for joining ${company} as ${jobTitle}. The discussions with the team gave me great conviction about the impact we can create together.

Please let me know if you need any further portfolio materials or references as you finalize your decision.

Warm regards,
[Your Name]`;

      case 'networking':
        return `Hi [Connection Name],

I hope you're doing well! I've been following ${company}'s recent announcements and noticed the team is hiring a ${jobTitle}.

Given your experience on the team, I would love to ask 2 quick questions about how your department approaches [Core Domain Challenge]. If you have a few minutes for a brief exchange, I'd be very grateful.

Best regards,
[Your Name]`;

      case 'offer_response':
        return `Subject: ${jobTitle} Offer — [Your Name]

Dear [Hiring Manager / Recruiter Name],

Thank you so much for extending the offer to join ${company} as ${jobTitle}! I am thrilled about the prospect of joining the team and contributing to your upcoming roadmap.

I am reviewing the details of the offer letter and benefits package. I will review everything thoroughly and look forward to speaking with you by [Proposed Date/Time] to discuss next steps.

Thank you again for this exciting opportunity.

Sincerely,
[Your Name]`;

      case 'salary_negotiation':
        return `Subject: ${company} Offer Discussion — ${jobTitle} / [Your Name]

Dear [Hiring Manager / Recruiter Name],

Thank you again for offering me the ${jobTitle} position at ${company}. I am genuinely excited about the work we will do together.

Based on my research into market benchmarks for senior roles in this domain, as well as the verified scope of ownership I will be bringing to [Core Initiative], I would like to discuss whether we can adjust the base compensation to [Target Number / Range, e.g. $155,000 - $165,000].

I am confident in my ability to deliver immediate value to ${company}, and achieving alignment on this figure would make accepting the offer an easy decision.

I would welcome a brief call today or tomorrow to finalize the details.

Sincerely,
[Your Name]`;

      default:
        return '';
    }
  };

  const activeContent = getTemplateContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            <Send className="w-4 h-4" />
            <span>Strategic Communication Sequences</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Follow-Up & Negotiation System
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Battle-tested communication scripts across all 7 interview pipeline milestones with 4 adjustable professional tone archetypes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Pipeline Stage Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
            Pipeline Milestone
          </span>

          <div className="space-y-1.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full p-3 rounded-xl border text-left transition text-xs space-y-0.5 ${
                    isSelected
                      ? 'bg-brand-50/70 border-brand-500 text-brand-900 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 font-medium'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{cat.label}</span>
                  </div>
                  <span className="block text-[10px] text-slate-400 font-normal">
                    {cat.timing}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Active Script Editor & Tone Controls (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {categories.find(c => c.id === selectedCategory)?.label}
              </h3>
              <p className="text-xs text-slate-500">
                Recommended timing: {categories.find(c => c.id === selectedCategory)?.timing}
              </p>
            </div>

            {/* Tone Selector */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
              {(['professional', 'warm', 'direct', 'confident'] as const).map(tone => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`px-2.5 py-1 text-[11px] font-bold capitalize rounded-lg transition ${
                    selectedTone === tone
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition flex items-center space-x-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Script'}</span>
            </button>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono leading-relaxed whitespace-pre-wrap text-slate-800">
            {activeContent}
          </div>

          <p className="text-[11px] text-slate-400">
            Tip: Replace bracketed text (e.g. \`[Interviewer Name]\`) with specific details before sending.
          </p>
        </div>

      </div>

    </div>
  );
};
