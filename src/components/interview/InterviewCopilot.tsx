import React, { useState } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  Send, 
  ChevronDown, 
  ChevronUp,
  Star,
  Award,
  AlertCircle
} from 'lucide-react';
import { InterviewQuestionItem, InterviewPracticeReview } from '../../types';
import { evaluateInterviewPracticeAnswer } from '../../services/aiEngine';

interface InterviewCopilotProps {
  questions: InterviewQuestionItem[];
  company: string;
  role: string;
}

export const InterviewCopilot: React.FC<InterviewCopilotProps> = ({
  questions,
  company,
  role
}) => {
  const [activeTab, setActiveTab] = useState<'question_bank' | 'practice_simulator'>('question_bank');
  const [expandedQId, setExpandedQId] = useState<string | null>(questions[0]?.id || null);

  // Practice Simulator states
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState<number>(0);
  const [userAnswerInput, setUserAnswerInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<InterviewPracticeReview | null>(null);

  const activeQuestion = questions[currentPracticeIndex] || questions[0];

  const handleStartPractice = (idx: number) => {
    setCurrentPracticeIndex(idx);
    setUserAnswerInput('');
    setEvaluationResult(null);
    setActiveTab('practice_simulator');
  };

  const handleEvaluateAnswer = () => {
    if (!userAnswerInput.trim() || userAnswerInput.trim().length < 15) return;
    setIsEvaluating(true);
    setTimeout(() => {
      const review = evaluateInterviewPracticeAnswer(activeQuestion.question, userAnswerInput);
      setEvaluationResult(review);
      setIsEvaluating(false);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Targeted Interview Rehearsal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Interview Copilot & Practice Mode
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Prepare for {company}'s specific interview loop. Questions are mapped to your evidence anchors with honest STAR outlines and live answer evaluation.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('question_bank')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeTab === 'question_bank' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Question Bank ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('practice_simulator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center space-x-1 ${
              activeTab === 'practice_simulator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-purple-600" />
            <span>Live Practice Simulator</span>
          </button>
        </div>
      </div>

      {/* TAB 1: QUESTION BANK */}
      {activeTab === 'question_bank' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1 text-xs text-slate-500">
            <span>Tailored based on JD requirements, seniority signals, and verified evidence</span>
            <button
              onClick={() => handleStartPractice(0)}
              className="text-purple-600 hover:text-purple-700 font-bold flex items-center space-x-1"
            >
              <span>Practice All Questions Live</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {questions.map((q, idx) => {
              const isExpanded = expandedQId === q.id;

              return (
                <div 
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition"
                >
                  {/* Question Header */}
                  <div 
                    onClick={() => setExpandedQId(isExpanded ? null : q.id)}
                    className="p-5 cursor-pointer hover:bg-slate-50/80 transition flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                            {q.category}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{q.question}</h3>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartPractice(idx);
                        }}
                        className="px-2.5 py-1 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition hidden sm:flex items-center space-x-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>Practice</span>
                      </button>
                      <div className="p-1 text-slate-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Breakdown */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 text-xs bg-slate-50/40">
                      
                      {/* WHY THEY MAY ASK */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                        <strong className="text-slate-900 text-xs block">Why the hiring team may ask this:</strong>
                        <p className="text-slate-600 leading-relaxed">{q.whyTheyMayAsk}</p>
                      </div>

                      {/* WHAT YOUR EXPERIENCE SUPPORTS */}
                      <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 text-emerald-950 space-y-1">
                        <strong className="text-emerald-900 text-xs block">What your verified experience supports:</strong>
                        <p className="text-emerald-800 leading-relaxed">{q.whatYourExperienceSupports}</p>
                      </div>

                      {/* TRUTHFUL STAR BUILDER */}
                      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <strong className="text-slate-900 text-xs uppercase tracking-wider font-extrabold">
                            Evidence-Anchored STAR Structure
                          </strong>
                          {!q.starBuilder.resultProvided && (
                            <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                              Result Pending Verification
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                            <span className="font-extrabold text-slate-500 block mb-0.5">SITUATION (Context):</span>
                            <span className="text-slate-700">{q.starBuilder.situation}</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                            <span className="font-extrabold text-slate-500 block mb-0.5">TASK (Goal):</span>
                            <span className="text-slate-700">{q.starBuilder.task}</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                            <span className="font-extrabold text-slate-500 block mb-0.5">ACTION (Your steps):</span>
                            <span className="text-slate-700">{q.starBuilder.action}</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                            <span className="font-extrabold text-slate-500 block mb-0.5">RESULT (Verifiable):</span>
                            <span className={q.starBuilder.resultProvided ? 'text-slate-700 font-semibold' : 'text-amber-800 italic'}>
                              {q.starBuilder.result}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* PRACTICE ANSWER SAMPLE */}
                      <div className="p-3.5 rounded-xl bg-purple-50/40 border border-purple-200 space-y-1">
                        <strong className="text-purple-950 text-xs block">Sample Truthful Delivery:</strong>
                        <p className="text-slate-700 leading-relaxed italic">"{q.practiceAnswerSample}"</p>
                      </div>

                      {/* FOLLOW-UP QUESTIONS */}
                      {q.followUpQuestions.length > 0 && (
                        <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                          <strong className="text-slate-900 text-xs block">Anticipate these follow-up probes:</strong>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                            {q.followUpQuestions.map((fu, fIdx) => (
                              <li key={fIdx}>{fu}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleStartPractice(idx)}
                          className="px-4 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm transition flex items-center space-x-1.5"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Launch Practice Simulator on this Question</span>
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE PRACTICE SIMULATOR (Feature #11) */}
      {activeTab === 'practice_simulator' && (
        <div className="space-y-6">
          
          {/* Active Question Simulator Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-extrabold text-[10px] uppercase">
                  Simulated Interview
                </span>
                <span className="text-xs text-slate-400">Question {currentPracticeIndex + 1} of {questions.length}</span>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center space-x-2">
                <button
                  disabled={currentPracticeIndex === 0}
                  onClick={() => {
                    setCurrentPracticeIndex(prev => prev - 1);
                    setUserAnswerInput('');
                    setEvaluationResult(null);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  disabled={currentPracticeIndex === questions.length - 1}
                  onClick={() => {
                    setCurrentPracticeIndex(prev => prev + 1);
                    setUserAnswerInput('');
                    setEvaluationResult(null);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>

            {/* The Interviewer Question Prompt */}
            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700">
                Interviewer Question:
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                "{activeQuestion.question}"
              </h3>
              <p className="text-xs text-purple-900">
                <strong>Focus:</strong> {activeQuestion.whatYourExperienceSupports}
              </p>
            </div>

            {/* Candidate Response Textarea */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-700">Type or dictate your honest response:</label>
                <span className="text-slate-400">
                  {userAnswerInput.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                rows={5}
                value={userAnswerInput}
                onChange={(e) => setUserAnswerInput(e.target.value)}
                placeholder="Structure your answer using STAR: Situation -> Task -> Action -> Verifiable Result..."
                className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setUserAnswerInput(activeQuestion.practiceAnswerSample)}
                className="text-xs text-purple-600 hover:text-purple-700 font-semibold flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Load Sample Outline for Reference</span>
              </button>

              <button
                onClick={handleEvaluateAnswer}
                disabled={!userAnswerInput.trim() || isEvaluating}
                className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl shadow-sm transition flex items-center space-x-1.5"
              >
                <Award className="w-4 h-4" />
                <span>{isEvaluating ? 'Evaluating Response...' : 'Evaluate My Answer (6 Criteria)'}</span>
              </button>
            </div>
          </div>

          {/* EVALUATION RESULTS CARD */}
          {evaluationResult && (
            <div className="bg-white rounded-2xl border border-purple-200 p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">AI Response Evaluation</h3>
                  <p className="text-xs text-slate-500">Evaluated on 6 objective communication criteria</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-slate-500">Overall Delivery Score:</span>
                  <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-900 font-extrabold text-sm">
                    {evaluationResult.overallScore} / 10
                  </span>
                </div>
              </div>

              {/* 6 Criteria Breakdown (1-10 scores) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Clarity', score: evaluationResult.clarity },
                  { label: 'Specificity', score: evaluationResult.specificity },
                  { label: 'Evidence', score: evaluationResult.evidence },
                  { label: 'Structure', score: evaluationResult.structure },
                  { label: 'Relevance', score: evaluationResult.relevance },
                  { label: 'Conciseness', score: evaluationResult.conciseness }
                ].map((crit, cIdx) => (
                  <div key={cIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-1">
                    <span className="block text-[11px] font-bold text-slate-600">{crit.label}</span>
                    <span className="text-lg font-extrabold text-slate-900">{crit.score}</span>
                    <span className="text-[10px] text-slate-400 block">/ 10</span>
                  </div>
                ))}
              </div>

              {/* Constructive Feedback Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* ONE THING DONE WELL */}
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1 text-emerald-950">
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-bold uppercase tracking-wider text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>One Thing Done Well</span>
                  </div>
                  <p className="leading-relaxed">{evaluationResult.oneThingDoneWell}</p>
                </div>

                {/* ONE THING TO IMPROVE */}
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1 text-amber-950">
                  <div className="flex items-center space-x-1.5 text-amber-800 font-bold uppercase tracking-wider text-[10px]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>One Thing to Improve</span>
                  </div>
                  <p className="leading-relaxed">{evaluationResult.oneThingToImprove}</p>
                </div>

              </div>

              {/* BETTER STRUCTURE GUIDE */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <strong className="text-slate-800 block text-[11px] uppercase tracking-wider">
                  Recommended Delivery Structure:
                </strong>
                <p className="text-slate-600 leading-relaxed">{evaluationResult.betterStructureGuide}</p>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
