import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Filter, 
  Edit3, 
  Plus, 
  Save, 
  X, 
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';
import { JobRequirement, EvidenceConfidence } from '../../types';

interface RequirementEvidenceEngineProps {
  requirements: JobRequirement[];
  onUpdateRequirement: (req: JobRequirement) => void;
  onNavigateTab: (tab: string) => void;
}

export const RequirementEvidenceEngine: React.FC<RequirementEvidenceEngineProps> = ({
  requirements,
  onUpdateRequirement,
  onNavigateTab
}) => {
  const [filterConfidence, setFilterConfidence] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingReqId, setEditingReqId] = useState<string | null>(null);
  const [editedEvidence, setEditedEvidence] = useState('');
  const [editedConfidence, setEditedConfidence] = useState<EvidenceConfidence>('SUPPORTED');
  const [editedNote, setEditedNote] = useState('');

  const filtered = requirements.filter(req => {
    const matchesFilter = filterConfidence === 'all' || req.confidence === filterConfidence;
    const matchesSearch = 
      req.requirementText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.matchedEvidence.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.recommendation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getConfidenceBadge = (confidence: EvidenceConfidence) => {
    switch (confidence) {
      case 'SUPPORTED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            SUPPORTED
          </span>
        );
      case 'PARTIALLY_SUPPORTED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            PARTIALLY SUPPORTED
          </span>
        );
      case 'NOT_SUPPORTED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <XCircle className="w-3.5 h-3.5 mr-1 text-slate-400" />
            NOT SUPPORTED
          </span>
        );
      case 'USER_VERIFICATION_REQUIRED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <HelpCircle className="w-3.5 h-3.5 mr-1" />
            VERIFICATION REQUIRED
          </span>
        );
    }
  };

  const handleStartEdit = (req: JobRequirement) => {
    setEditingReqId(req.id);
    setEditedEvidence(req.matchedEvidence);
    setEditedConfidence(req.confidence);
    setEditedNote(req.userNotes || '');
  };

  const handleSaveEdit = (req: JobRequirement) => {
    onUpdateRequirement({
      ...req,
      matchedEvidence: editedEvidence,
      confidence: editedConfidence,
      userNotes: editedNote,
      isCustomized: true
    });
    setEditingReqId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Core Differentiator</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Requirement → Evidence Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Every job requirement is systematically paired with verified candidate evidence. We optimize truth and clarity — we never fabricate unearned credentials.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigateTab('evidencebank')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center space-x-1.5"
          >
            <span>Open Evidence Bank</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Control Filters & Stats */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: `All (${requirements.length})` },
            { id: 'SUPPORTED', label: `Supported (${requirements.filter(r => r.confidence === 'SUPPORTED').length})` },
            { id: 'PARTIALLY_SUPPORTED', label: `Partial (${requirements.filter(r => r.confidence === 'PARTIALLY_SUPPORTED').length})` },
            { id: 'NOT_SUPPORTED', label: `Unsupported Gaps (${requirements.filter(r => r.confidence === 'NOT_SUPPORTED').length})` },
            { id: 'USER_VERIFICATION_REQUIRED', label: `Verification (${requirements.filter(r => r.confidence === 'USER_VERIFICATION_REQUIRED').length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterConfidence(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                filterConfidence === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search requirements or evidence..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>
      </div>

      {/* Interactive Requirement -> Evidence Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4 w-1/4">Job Requirement</th>
                <th className="py-3.5 px-4 w-1/3">User Evidence (Verified)</th>
                <th className="py-3.5 px-4 w-1/6">Confidence</th>
                <th className="py-3.5 px-4 w-1/4">Recommendation & Action</th>
                <th className="py-3.5 px-3 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((req) => {
                const isEditing = editingReqId === req.id;

                if (isEditing) {
                  return (
                    <tr key={req.id} className="bg-brand-50/40">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 align-top">
                        {req.requirementText}
                      </td>
                      <td className="py-3.5 px-4 align-top">
                        <textarea
                          rows={3}
                          value={editedEvidence}
                          onChange={(e) => setEditedEvidence(e.target.value)}
                          className="w-full p-2 text-xs border border-brand-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                          placeholder="Provide specific factual proof from your background..."
                        />
                      </td>
                      <td className="py-3.5 px-4 align-top">
                        <select
                          value={editedConfidence}
                          onChange={(e) => setEditedConfidence(e.target.value as EvidenceConfidence)}
                          className="w-full p-1.5 text-xs font-semibold border border-slate-300 rounded-lg bg-white outline-none"
                        >
                          <option value="SUPPORTED">SUPPORTED</option>
                          <option value="PARTIALLY_SUPPORTED">PARTIALLY SUPPORTED</option>
                          <option value="NOT_SUPPORTED">NOT SUPPORTED</option>
                          <option value="USER_VERIFICATION_REQUIRED">USER VERIFICATION REQUIRED</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 align-top">
                        <input
                          type="text"
                          value={editedNote}
                          onChange={(e) => setEditedNote(e.target.value)}
                          placeholder="Add custom notes..."
                          className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white outline-none"
                        />
                      </td>
                      <td className="py-3.5 px-3 align-top text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => handleSaveEdit(req)}
                          className="p-1.5 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                          title="Save Changes"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingReqId(null)}
                          className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-lg"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition group">
                    {/* Job Requirement */}
                    <td className="py-4 px-4 font-semibold text-slate-900 align-top">
                      <div className="space-y-1">
                        <span>{req.requirementText}</span>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                            {req.category.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Matched Evidence */}
                    <td className="py-4 px-4 align-top text-slate-700 font-normal leading-relaxed">
                      {req.confidence === 'NOT_SUPPORTED' ? (
                        <span className="text-slate-400 italic">No matching evidence found in current materials.</span>
                      ) : (
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-800">
                          {req.matchedEvidence}
                        </div>
                      )}
                    </td>

                    {/* Confidence Tag */}
                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      {getConfidenceBadge(req.confidence)}
                    </td>

                    {/* Action / Recommendation */}
                    <td className="py-4 px-4 align-top text-slate-600 leading-relaxed">
                      <div className="space-y-1">
                        <p>{req.recommendation}</p>
                        {req.userNotes && (
                          <p className="text-[11px] text-brand-700 bg-brand-50 p-1.5 rounded border border-brand-100">
                            <strong>Your note:</strong> {req.userNotes}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Edit Trigger */}
                    <td className="py-4 px-3 align-top text-right">
                      <button
                        onClick={() => handleStartEdit(req)}
                        className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition"
                        title="Edit Evidence or Classification"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety Notice Footer */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start space-x-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800">The Anti-Hallucination Guarantee:</strong>
          <p className="mt-0.5 text-slate-500">
            If a requirement is marked <strong>NOT SUPPORTED</strong>, do not add it to your resume unless you have genuine experience. During interviews, addressing a gap with transparent fundamentals builds far more executive credibility than reciting fabricated qualifications.
          </p>
        </div>
      </div>

    </div>
  );
};
