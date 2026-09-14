import React, { useState } from 'react';
import { 
  Send, 
  FileText, 
  MessageSquare, 
  CheckSquare, 
  Download, 
  Copy, 
  Check, 
  Edit3, 
  Save, 
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { ApplicationPackData } from '../../types';
import { 
  exportResumeAsPDF, 
  exportResumeAsDocx, 
  exportTextFile, 
  exportApplicationPackBundle 
} from '../../services/exportService';

interface ApplicationPackProps {
  appPack: ApplicationPackData;
  company: string;
  role: string;
  candidateName?: string;
  onUpdateAppPack: (updated: ApplicationPackData) => void;
  onNavigateTab: (tab: string) => void;
  isFullAccess?: boolean;
  onOpenPricing?: (feature?: string) => void;
}

export const ApplicationPack: React.FC<ApplicationPackProps> = ({
  appPack,
  company,
  role,
  candidateName = 'Alex Morgan',
  onUpdateAppPack,
  onNavigateTab,
  isFullAccess = false,
  onOpenPricing
}) => {
  const [activeDoc, setActiveDoc] = useState<string>('cover_letter');
  const [coverLetterTone, setCoverLetterTone] = useState<'professional' | 'warm' | 'direct' | 'confident'>('professional');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Editing state for active document
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState('');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleExportBundle = () => {
    if (!isFullAccess && onOpenPricing) {
      onOpenPricing('Application Pack Exports');
      return;
    }
    exportApplicationPackBundle(appPack, company, role);
  };

  const handleExportPDF = () => {
    if (!isFullAccess && onOpenPricing) {
      onOpenPricing('PDF Resume Export');
      return;
    }
    exportResumeAsPDF(appPack.tailoredResume, candidateName, role);
  };

  const handleExportDocx = () => {
    if (!isFullAccess && onOpenPricing) {
      onOpenPricing('DOCX Resume Export');
      return;
    }
    exportResumeAsDocx(appPack.tailoredResume, candidateName, role);
  };

  const handleToggleChecklist = (id: string) => {
    const updatedChecklist = appPack.jobSpecificChecklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onUpdateAppPack({
      ...appPack,
      jobSpecificChecklist: updatedChecklist
    });
  };

  const docs = [
    { id: 'resume', label: '1. Tailored Resume', icon: FileText, count: 'Ready' },
    { id: 'cover_letter', label: '2. Cover Letter (4 Tones)', icon: Send, count: '4 Tones' },
    { id: 'linkedin_headline', label: '3. LinkedIn Headlines', icon: LinkedInIcon, count: '3 Options' },
    { id: 'linkedin_about', label: '4. LinkedIn About', icon: LinkedInIcon, count: '1 Script' },
    { id: 'recruiter_msg', label: '5. Recruiter Message', icon: MessageSquare, count: '1 Outreach' },
    { id: 'interview_brief', label: '6. Interview Prep Brief', icon: Sparkles, count: '1 Brief' },
    { id: 'followup_msg', label: '7. Follow-Up Message', icon: MessageSquare, count: '1 Script' },
    { id: 'prep_checklist', label: '8. Application Checklist', icon: CheckSquare, count: `${appPack.jobSpecificChecklist.filter(c => c.completed).length}/${appPack.jobSpecificChecklist.length}` }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Free Preview Banner */}
      {!isFullAccess && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Free Preview Mode:</strong> Viewing all 8 application pack assets. PDF/DOCX downloads and full bundle export are unlocked in Full Access.
            </span>
          </div>
          {onOpenPricing && (
            <button
              onClick={() => onOpenPricing('Application Pack Exports')}
              className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition text-xs border border-amber-500 flex-shrink-0 ml-2"
            >
              Unlock ($14.99)
            </button>
          )}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            <Send className="w-4 h-4" />
            <span>Complete Application Suite</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Application Pack Generator
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            8 synchronized, editable application documents tailored specifically for {role} at {company} — verified against your genuine experience.
          </p>
        </div>

        {/* Global Export Bundle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportBundle}
            className="px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-black rounded-xl shadow-sm transition flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Download Complete Pack (.md)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Document Selector (Left) + Document Viewer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: 8 Document Tabs (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
            Application Assets
          </span>

          <div className="space-y-1.5">
            {docs.map(doc => {
              const Icon = doc.icon;
              const isActive = activeDoc === doc.id;

              return (
                <button
                  key={doc.id}
                  onClick={() => {
                    setActiveDoc(doc.id);
                    setIsEditing(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between text-xs ${
                    isActive
                      ? 'bg-brand-50/70 border-brand-500 text-brand-900 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{doc.label}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    isActive ? 'bg-brand-200/60 text-brand-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {doc.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Active Document Content & Controls (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          
          {/* 1. TAILORED RESUME */}
          {activeDoc === 'resume' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Tailored Resume</h3>
                  <p className="text-[11px] text-slate-500">Single-column ATS-friendly layout</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleExportPDF}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </button>
                  <button
                    onClick={handleExportDocx}
                    className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>DOCX</span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(appPack.tailoredResume, 'resume')}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition"
                  >
                    {copiedKey === 'resume' ? 'Copied!' : 'Copy Text'}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto text-slate-800">
                {appPack.tailoredResume}
              </div>
            </div>
          )}

          {/* 2. COVER LETTER (4 TONES) */}
          {activeDoc === 'cover_letter' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Tailored Cover Letter</h3>
                  <p className="text-[11px] text-slate-500">Aligned with {company} positioning</p>
                </div>
                
                {/* Tone Selectors */}
                <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
                  {(['professional', 'warm', 'direct', 'confident'] as const).map(tone => (
                    <button
                      key={tone}
                      onClick={() => setCoverLetterTone(tone)}
                      className={`px-2.5 py-1 text-[11px] font-bold capitalize rounded-lg transition ${
                        coverLetterTone === tone
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => copyToClipboard(appPack.coverLetter[coverLetterTone], 'cover')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{copiedKey === 'cover' ? 'Copied!' : 'Copy Cover Letter'}</span>
                </button>
                <button
                  onClick={() => exportTextFile(appPack.coverLetter[coverLetterTone], `${candidateName.replace(/\s+/g, '_')}_Cover_Letter_${company}.txt`)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export TXT</span>
                </button>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans leading-relaxed whitespace-pre-wrap text-slate-800">
                {appPack.coverLetter[coverLetterTone]}
              </div>
            </div>
          )}

          {/* 3. LINKEDIN HEADLINE */}
          {activeDoc === 'linkedin_headline' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">LinkedIn Headline Variations</h3>
                <p className="text-[11px] text-slate-500">Optimized for recruiter keyword search in your domain</p>
              </div>

              <div className="space-y-3">
                {appPack.linkedinHeadline.map((headline, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-brand-600">Option {idx + 1}</span>
                      <p className="text-xs font-semibold text-slate-900">{headline}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(headline, `hl-${idx}`)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition flex-shrink-0"
                    >
                      {copiedKey === `hl-${idx}` ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. LINKEDIN ABOUT */}
          {activeDoc === 'linkedin_about' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">LinkedIn About Section Narrative</h3>
                  <p className="text-[11px] text-slate-500">3-part structure: identity, evidence highlights, and focus</p>
                </div>
                <button
                  onClick={() => copyToClipboard(appPack.linkedinAbout, 'about')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{copiedKey === 'about' ? 'Copied!' : 'Copy About Text'}</span>
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed whitespace-pre-wrap text-slate-800">
                {appPack.linkedinAbout}
              </div>
            </div>
          )}

          {/* 5. RECRUITER MESSAGE */}
          {activeDoc === 'recruiter_msg' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Direct Recruiter Outreach Note</h3>
                  <p className="text-[11px] text-slate-500">Under 80 words • High conversion • Low friction</p>
                </div>
                <button
                  onClick={() => copyToClipboard(appPack.recruiterMessage, 'recruiter')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{copiedKey === 'recruiter' ? 'Copied!' : 'Copy Note'}</span>
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed whitespace-pre-wrap text-slate-800">
                {appPack.recruiterMessage}
              </div>
            </div>
          )}

          {/* 6. INTERVIEW PREP BRIEF */}
          {activeDoc === 'interview_brief' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Interview Preparation Brief</h3>
                  <p className="text-[11px] text-slate-500">Quick-reference cheat sheet for pre-call rehearsal</p>
                </div>
                <button
                  onClick={() => copyToClipboard(appPack.interviewPrepBrief, 'brief')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{copiedKey === 'brief' ? 'Copied!' : 'Copy Brief'}</span>
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono leading-relaxed whitespace-pre-wrap text-slate-800">
                {appPack.interviewPrepBrief}
              </div>
            </div>
          )}

          {/* 7. FOLLOW-UP MESSAGE */}
          {activeDoc === 'followup_msg' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Post-Interview Follow-Up Script</h3>
                  <p className="text-[11px] text-slate-500">Send within 24 hours of speaking with hiring manager</p>
                </div>
                <button
                  onClick={() => copyToClipboard(appPack.followUpMessage, 'followup')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{copiedKey === 'followup' ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed whitespace-pre-wrap text-slate-800">
                {appPack.followUpMessage}
              </div>
            </div>
          )}

          {/* 8. JOB-SPECIFIC CHECKLIST */}
          {activeDoc === 'prep_checklist' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Job-Specific Action Checklist</h3>
                <p className="text-[11px] text-slate-500">Track key milestones from research to final interview</p>
              </div>

              <div className="space-y-2">
                {appPack.jobSpecificChecklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleChecklist(item.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between text-xs ${
                      item.completed 
                        ? 'bg-emerald-50/50 border-emerald-200 text-slate-500 line-through' 
                        : 'bg-white border-slate-200 text-slate-800 hover:border-brand-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        item.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={item.completed ? 'text-slate-400' : 'font-medium'}>{item.task}</span>
                    </div>

                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.stage.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
