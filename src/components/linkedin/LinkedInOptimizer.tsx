import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Sparkles, 
  MessageSquare, 
  UserCheck, 
  FileText,
  Send,
  ExternalLink
} from 'lucide-react';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { ApplicationState } from '../../types';

interface LinkedInOptimizerProps {
  state: ApplicationState;
}

export const LinkedInOptimizer: React.FC<LinkedInOptimizerProps> = ({ state }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { jobTitle, company, applicationPack, jobXRay } = state;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const networkingNote = `Hi [Connection Name],

I noticed you're working on the ${jobXRay.industry} team at ${company}. I've recently been diving into ${company}'s work around ${jobXRay.toolsAndTech[0] || 'core platform features'} and really admire your team's approach to product velocity.

I've recently applied for the ${jobTitle} opening and would love to follow your work here on LinkedIn.

Best regards,
Candidate`;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1">
            <LinkedInIcon className="w-4 h-4" />
            <span>Profile & Networking Strategy</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            LinkedIn Profile Optimizer
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Align your public presence with {jobTitle} expectations without making exaggerated claims or stuffing unnatural keywords.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (7 cols): Headlines & About */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* HEADLINES */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Recommended Headline Options</h3>
              <p className="text-xs text-slate-500">Keyword-dense formulas based on your verified strengths</p>
            </div>

            <div className="space-y-3">
              {applicationPack.linkedinHeadline.map((hl, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-sky-700 uppercase">Headline Style {idx + 1}</span>
                    <p className="font-semibold text-slate-900 leading-snug">{hl}</p>
                  </div>
                  <button
                    onClick={() => copyText(hl, `hl-${idx}`)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition flex-shrink-0"
                  >
                    {copiedKey === `hl-${idx}` ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ABOUT SECTION */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">3-Part "About" Section Narrative</h3>
                <p className="text-xs text-slate-500">Concise overview of your verified scope and expertise</p>
              </div>
              <button
                onClick={() => copyText(applicationPack.linkedinAbout, 'about')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{copiedKey === 'about' ? 'Copied!' : 'Copy Narrative'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
              {applicationPack.linkedinAbout}
            </div>
          </div>

        </div>

        {/* Right Col (5 cols): Outreach & Skills */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* RECRUITER OUTREACH NOTE */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Direct Recruiter InMail</h3>
                <p className="text-xs text-slate-500">Short, evidence-based, low-friction</p>
              </div>
              <button
                onClick={() => copyText(applicationPack.recruiterMessage, 'recruiter')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{copiedKey === 'recruiter' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
              {applicationPack.recruiterMessage}
            </div>
          </div>

          {/* NETWORKING / PEER OUTREACH NOTE */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Peer / Team Networking Note</h3>
                <p className="text-xs text-slate-500">Connect with prospective colleagues</p>
              </div>
              <button
                onClick={() => copyText(networkingNote, 'networking')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{copiedKey === 'networking' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
              {networkingNote}
            </div>
          </div>

          {/* SUGGESTED LINKEDIN SKILLS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Top Verified Skills to Feature</h3>
            <div className="flex flex-wrap gap-1.5">
              {[...jobXRay.toolsAndTech, ...jobXRay.softSkills.slice(0, 3)].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-50 text-sky-800 border border-sky-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
