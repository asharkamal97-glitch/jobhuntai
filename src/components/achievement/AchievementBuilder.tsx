import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Check, 
  Copy, 
  ArrowRight, 
  RotateCcw, 
  Database,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { EvidenceBankEntry } from '../../types';

interface AchievementBuilderProps {
  onSaveToEvidenceBank: (entry: Omit<EvidenceBankEntry, 'id' | 'dateAdded' | 'usedCount' | 'usedInCurrentApplication'>) => void;
  onNavigateTab: (tab: string) => void;
}

export const AchievementBuilder: React.FC<AchievementBuilderProps> = ({
  onSaveToEvidenceBank,
  onNavigateTab
}) => {
  const [step, setStep] = useState<number>(1);

  // 5 Step Questions
  const [whatDidYouDo, setWhatDidYouDo] = useState('');
  const [whoDidItAffect, setWhoDidItAffect] = useState('');
  const [howDidYouDoIt, setHowDidYouDoIt] = useState('');
  const [whatChanged, setWhatChanged] = useState('');
  const [metricNumber, setMetricNumber] = useState('');
  const [skippedMetric, setSkippedMetric] = useState(false);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const metricSuggestions = [
    'time saved (e.g. 5 hours/week)',
    'number of users / customers served (e.g. 2,400 accounts)',
    'projects or releases delivered (e.g. 4 tier-1 launches)',
    'response or latency reduction (e.g. reduced turnaround from 24h to 4h)',
    'error or defect reduction (e.g. dropped support tickets by 35%)',
    'revenue or pipeline influenced (e.g. $400k in closed deals)',
    'cross-functional team size coordinated (e.g. 8 stakeholders across 3 teams)'
  ];

  // Construct truthful structured achievement
  const generateAchievement = () => {
    const actionVerb = whatDidYouDo.trim() || 'Led key operational delivery';
    const target = whoDidItAffect.trim() ? `for ${whoDidItAffect.trim()}` : '';
    const method = howDidYouDoIt.trim() ? `by ${howDidYouDoIt.trim().replace(/^by\s+/i, '')}` : '';
    
    let outcome = '';
    if (!skippedMetric && metricNumber.trim()) {
      outcome = `, resulting in ${metricNumber.trim()}${whatChanged.trim() ? ' (' + whatChanged.trim() + ')' : ''}`;
    } else if (whatChanged.trim()) {
      outcome = `, effectively ${whatChanged.trim().replace(/^effectively\s+/i, '')}`;
    }

    return `${actionVerb} ${target} ${method}${outcome}.`.replace(/\s+/g, ' ').replace(/\.\./g, '.');
  };

  const generatedBullet = generateAchievement();

  const handleSaveToBank = () => {
    onSaveToEvidenceBank({
      title: whatDidYouDo.slice(0, 50) || 'Custom Achievement',
      category: 'Achievement',
      description: generatedBullet,
      metric: !skippedMetric && metricNumber ? metricNumber : undefined,
      sourceContext: `Built via Achievement Builder (${whoDidItAffect || 'Professional project'})`,
      verified: true,
      tags: ['Achievement', 'STAR', 'Verified']
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedBullet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setWhatDidYouDo('');
    setWhoDidItAffect('');
    setHowDidYouDoIt('');
    setWhatChanged('');
    setMetricNumber('');
    setSkippedMetric(false);
    setStep(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>5-Question Framework</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Achievement Builder
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Transform vague responsibilities into high-impact, truthful achievement bullets. If you don't have an exact number, we create an honest qualitative statement.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center space-x-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Builder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: 5 Questions Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          
          {/* Question 1 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-900">
              1. WHAT DID YOU DO? <span className="text-brand-600 font-normal">(Start with an action)</span>
            </label>
            <input
              type="text"
              value={whatDidYouDo}
              onChange={(e) => setWhatDidYouDo(e.target.value)}
              placeholder="e.g. Redesigned user onboarding emails and feature release notes"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          {/* Question 2 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-900">
              2. WHO / WHAT DID IT AFFECT? <span className="text-brand-600 font-normal">(Audience or department)</span>
            </label>
            <input
              type="text"
              value={whoDidItAffect}
              onChange={(e) => setWhoDidItAffect(e.target.value)}
              placeholder="e.g. 45,000 monthly active users and the customer success team"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          {/* Question 3 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-900">
              3. HOW DID YOU DO IT? <span className="text-brand-600 font-normal">(Tools, methods, collaboration)</span>
            </label>
            <input
              type="text"
              value={howDidYouDoIt}
              onChange={(e) => setHowDidYouDoIt(e.target.value)}
              placeholder="e.g. analyzing Mixpanel drop-offs and partnering with engineering in weekly sprints"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          {/* Question 4 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-900">
              4. WHAT CHANGED OR IMPROVED? <span className="text-brand-600 font-normal">(The qualitative change)</span>
            </label>
            <input
              type="text"
              value={whatChanged}
              onChange={(e) => setWhatChanged(e.target.value)}
              placeholder="e.g. streamlining user product discovery and reducing early churn"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          {/* Question 5: Metric or Skip */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-slate-900">
                5. CAN YOU PROVIDE A NUMBER OR SCALE?
              </label>
              <button
                type="button"
                onClick={() => setSkippedMetric(!skippedMetric)}
                className={`text-xs font-semibold px-2 py-0.5 rounded transition ${
                  skippedMetric 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {skippedMetric ? '✓ Metric Skipped (Qualitative Mode)' : 'Skip Metric'}
              </button>
            </div>

            {!skippedMetric ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={metricNumber}
                  onChange={(e) => setMetricNumber(e.target.value)}
                  placeholder="e.g. lifting activation from 18% to 27% (+50% relative gain)"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                />

                {/* Metric Suggestions */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold text-slate-700">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>Real Metric Suggestions (Choose if applicable):</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {metricSuggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMetricNumber(sug.split('(')[0].trim())}
                        className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-700 transition"
                      >
                        + {sug}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                Metric skipped. We will generate a truthful, high-impact qualitative achievement statement focusing on methodology and organizational outcome.
              </p>
            )}
          </div>

        </div>

        {/* Right Col: Live Generated Output & Actions (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Generated Achievement Statement
              </span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 rounded bg-brand-50 text-brand-700 border border-brand-200">
                Live Preview
              </span>
            </div>

            {/* Generated Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 leading-relaxed font-medium min-h-[140px] flex items-center">
              {whatDidYouDo ? (
                <span>• {generatedBullet}</span>
              ) : (
                <span className="text-slate-400 italic">
                  Fill in the questions on the left to see your structured achievement bullet take shape...
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-400">
              Formula: [Action Verb] + [Target/Scale] + [Method/Tools] + [Verifiable Outcome].
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <button
              onClick={handleSaveToBank}
              disabled={!whatDidYouDo}
              className="w-full py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-sm transition flex items-center justify-center space-x-1.5"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{savedSuccess ? 'Saved to Career Evidence Bank!' : 'Save to Career Evidence Bank'}</span>
            </button>

            <button
              onClick={handleCopy}
              disabled={!whatDidYouDo}
              className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-xl transition flex items-center justify-center space-x-1.5"
            >
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Achievement Bullet'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
