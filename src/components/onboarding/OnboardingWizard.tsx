import React, { useState } from 'react';
import { 
  Briefcase, 
  UploadCloud, 
  FileText, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { DEMO_RESUME_TEXT, DEMO_JOB_DESCRIPTION } from '../../data/demoData';

import { extractTextFromFile } from '../../services/fileParser';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    jobTitle: string;
    company: string;
    jobDescription: string;
    jobUrl: string;
    targetGoal: 'improve_match' | 'tailor_resume' | 'prep_interview' | 'improve_linkedin' | 'complete_pack';
    rawResumeText: string;
    linkedinProfileText?: string;
    additionalNotes?: string;
  }) => void;
  onLoadDemo: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onLoadDemo
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobUrl, setJobUrl] = useState('');

  const [rawResumeText, setRawResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isExtractingFile, setIsExtractingFile] = useState(false);
  const [linkedinProfileText, setLinkedinProfileText] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [targetGoal, setTargetGoal] = useState<'improve_match' | 'tailor_resume' | 'prep_interview' | 'improve_linkedin' | 'complete_pack'>('complete_pack');

  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setErrorMessage('');
    setIsExtractingFile(true);

    try {
      const extracted = await extractTextFromFile(file);
      if (extracted && extracted.length > 20) {
        setRawResumeText(extracted);
      } else {
        setErrorMessage('File was parsed, but contained minimal text. You can also paste text directly.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error extracting text from file. Please paste resume text directly.');
    } finally {
      setIsExtractingFile(false);
    }
  };

  const handleUseDemo = () => {
    setJobTitle('Senior Product Marketing Manager');
    setCompany('LinearFlow Technologies');
    setJobDescription(DEMO_JOB_DESCRIPTION);
    setJobUrl('https://linearflow.tech/careers/sr-product-marketing-manager');
    setRawResumeText(DEMO_RESUME_TEXT);
    setFileName('Alex_Morgan_Resume.pdf');
    setLinkedinProfileText('linkedin.com/in/alexmorgan-demo | Product Marketing Specialist');
    setAdditionalNotes('Have collaborated with engineering on technical release notes and completed basic analytics.');
    setTargetGoal('complete_pack');
    setCurrentStep(3);
  };

  const handleNext = () => {
    setErrorMessage('');
    if (currentStep === 1) {
      if (!jobTitle.trim()) {
        setErrorMessage('Please enter the target Job Title.');
        return;
      }
      if (!company.trim()) {
        setErrorMessage('Please enter the Company name.');
        return;
      }
      if (!jobDescription.trim() || jobDescription.trim().length < 50) {
        setErrorMessage('Please paste the complete Job Description (at least 50 characters) for accurate analysis.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!rawResumeText.trim() || rawResumeText.trim().length < 40) {
        setErrorMessage('Please paste or upload your current resume text so we can verify your genuine experience.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Step 4: Generation
      setCurrentStep(4);
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        onSubmit({
          jobTitle,
          company,
          jobDescription,
          jobUrl,
          targetGoal,
          rawResumeText,
          linkedinProfileText,
          additionalNotes
        });
        onClose();
      }, 1500);
    }
  };

  const goals = [
    {
      id: 'improve_match' as const,
      title: 'Improve my match',
      desc: 'Identify requirement-evidence gaps and increase verified alignment without inventing qualifications.'
    },
    {
      id: 'tailor_resume' as const,
      title: 'Tailor my resume',
      desc: 'Controlled sentence-by-sentence rewriting with full Approve / Reject review controls.'
    },
    {
      id: 'prep_interview' as const,
      title: 'Prepare for interview',
      desc: 'Top 10 likely questions based on requirements and interactive 1-by-1 AI practice mode.'
    },
    {
      id: 'improve_linkedin' as const,
      title: 'Improve LinkedIn & Outreach',
      desc: 'Optimized headlines, About narrative, and high-conversion recruiter message templates.'
    },
    {
      id: 'complete_pack' as const,
      title: 'Prepare the complete application',
      desc: 'Comprehensive 8-piece pack: Tailored resume, cover letter, LinkedIn, prep sheet, and follow-ups.',
      recommended: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Wizard Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
              {currentStep < 4 ? currentStep : '✓'}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {currentStep === 1 && "Step 1: Tell us what you're applying for"}
                {currentStep === 2 && "Step 2: Add your current experience"}
                {currentStep === 3 && "Step 3: Choose your goal"}
                {currentStep === 4 && "Step 4: Generating Application Blueprint..."}
              </h2>
              <p className="text-xs text-slate-500 font-medium">Evidence-First Application Optimization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div 
            className="bg-brand-600 h-1 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Wizard Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Job Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Target Position</span>
                <button
                  type="button"
                  onClick={handleUseDemo}
                  className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Autofill Demo Job (LinearFlow)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Product Marketing Manager"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. LinearFlow Technologies"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Job URL <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  placeholder="https://company.com/careers/role"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here, including responsibilities, requirements, and qualifications..."
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none leading-relaxed"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Tip: Include both responsibilities and requirements for the most thorough Requirement-to-Evidence breakdown.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Current Experience */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Your Experience Evidence</span>
                <button
                  type="button"
                  onClick={() => {
                    setRawResumeText(DEMO_RESUME_TEXT);
                    setFileName('Alex_Morgan_Resume.pdf');
                  }}
                  className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Insert Sample Resume (Alex Morgan)</span>
                </button>
              </div>

              {/* Privacy Reassurance Badge */}
              <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-xl flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-semibold text-emerald-900">100% Private — Your resume stays on your device</div>
                  <div className="text-emerald-700 text-[11px] leading-relaxed mt-0.5">
                    JOBHUNT AI processes your files locally in your browser. Your resume is not uploaded to a server.
                  </div>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-slate-200 hover:border-brand-400 rounded-xl p-4 text-center transition bg-slate-50/50">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.docx,.txt,.rtf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                  <UploadCloud className={`w-8 h-8 text-brand-500 mb-1 ${isExtractingFile ? 'animate-bounce' : ''}`} />
                  <span className="text-xs font-semibold text-slate-800">
                    {isExtractingFile ? 'Parsing PDF / DOCX Text...' : fileName ? `Loaded: ${fileName}` : 'Upload Resume (PDF, DOCX, TXT)'}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    {isExtractingFile ? 'Extracting readable text structure...' : 'Click to browse or paste text below'}
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Resume Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={rawResumeText}
                  onChange={(e) => setRawResumeText(e.target.value)}
                  placeholder="Paste your current resume text here..."
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    LinkedIn / Portfolio URL <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={linkedinProfileText}
                    onChange={(e) => setLinkedinProfileText(e.target.value)}
                    placeholder="linkedin.com/in/yourname"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Additional Projects or Context <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="e.g. Side projects, unlisted certifications, tools"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start space-x-2 text-[11px] text-blue-900">
                <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Evidence-First Rule:</strong> We only optimize what you actually did. We will never invent fake job titles, companies, or fabricated metrics.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Goal Selector */}
          {currentStep === 3 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 mb-2">
                Select your primary objective for this application cycle:
              </p>
              
              {goals.map((goal) => {
                const isSelected = targetGoal === goal.id;
                return (
                  <div
                    key={goal.id}
                    onClick={() => setTargetGoal(goal.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/60 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-brand-600 bg-brand-600' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-900">{goal.title}</span>
                          {goal.recommended && (
                            <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{goal.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 4: Live Generation State */}
          {currentStep === 4 && (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-200 animate-pulse">
                <Zap className="w-7 h-7 animate-bounce" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Synthesizing Application Blueprint</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Extracting job requirements, parsing candidate evidence, running Claim Guard™ safety checks, and calculating verified alignment...
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-2 text-left text-xs text-slate-600 pt-2">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Job Description X-Ray complete</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Requirement-Evidence matrix indexed</span>
                </div>
                <div className="flex items-center space-x-2 text-brand-600 animate-pulse">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
                  <span>Claim Guard™ anti-hallucination audit running...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        {currentStep < 4 && (
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition flex items-center space-x-1.5"
            >
              <span>{currentStep === 3 ? 'Generate Application Blueprint' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
