import React, { useState } from 'react';
import { 
  Database, 
  Plus, 
  Search, 
  Tag, 
  CheckCircle2, 
  Edit3, 
  Trash2, 
  Filter, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';
import { EvidenceBankEntry } from '../../types';

interface EvidenceBankProps {
  entries: EvidenceBankEntry[];
  onAddEntry: (entry: Omit<EvidenceBankEntry, 'id' | 'dateAdded' | 'usedCount' | 'usedInCurrentApplication'>) => void;
  onUpdateEntry: (entry: EvidenceBankEntry) => void;
  onDeleteEntry: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const EvidenceBank: React.FC<EvidenceBankProps> = ({
  entries,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  onNavigateTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EvidenceBankEntry['category']>('Project');
  const [description, setDescription] = useState('');
  const [metric, setMetric] = useState('');
  const [sourceContext, setSourceContext] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const categories = [
    'all', 'Experience', 'Project', 'Metric', 'Skill', 'Responsibility', 'Certification', 'Tool', 'Education', 'Volunteer'
  ];

  const filteredEntries = entries.filter(entry => {
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    const matchesSearch = 
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Project');
    setDescription('');
    setMetric('');
    setSourceContext('');
    setTagsInput('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (entry: EvidenceBankEntry) => {
    setEditingId(entry.id);
    setTitle(entry.title);
    setCategory(entry.category);
    setDescription(entry.description);
    setMetric(entry.metric || '');
    setSourceContext(entry.sourceContext);
    setTagsInput(entry.tags.join(', '));
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    if (editingId) {
      const existing = entries.find(e => e.id === editingId);
      if (existing) {
        onUpdateEntry({
          ...existing,
          title,
          category,
          description,
          metric: metric.trim() || undefined,
          sourceContext,
          tags
        });
      }
    } else {
      onAddEntry({
        title,
        category,
        description,
        metric: metric.trim() || undefined,
        sourceContext,
        verified: true,
        tags
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            <span>Application Memory Store</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Career Evidence Bank
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Your structured repository of verified accomplishments, metrics, tools, and projects. JOBHUNT AI draws directly from this bank to ground all generated applications in genuine facts.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigateTab('achievement')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Achievement Builder</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Evidence Item</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? `All Items (${entries.length})` : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64 flex-shrink-0">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search evidence, metrics, tags..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>
      </div>

      {/* Evidence Cards Grid */}
      {entries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntries.map(entry => (
            <div
              key={entry.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-brand-300 hover:shadow-card transition flex flex-col justify-between space-y-4 text-xs group"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                    {entry.category}
                  </span>

                  {entry.usedInCurrentApplication ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Used in Current Job ({entry.usedCount}x)
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">
                      Bank Asset
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition">
                  {entry.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {entry.description}
                </p>

                {entry.metric && (
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-[11px] font-semibold text-emerald-900">
                    <strong>Verified Scale:</strong> {entry.metric}
                  </div>
                )}

                <div className="text-[11px] text-slate-400">
                  <span>Context: {entry.sourceContext}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {entry.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-1 opacity-80 group-hover:opacity-100">
                  <button
                    onClick={() => handleOpenEditModal(entry)}
                    className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition"
                    title="Edit Evidence"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete Evidence"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FILTER SEARCH EMPTY STATE (When entries exist but search has no matches) */}
      {entries.length > 0 && filteredEntries.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <Database className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No Evidence Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No evidence matches your current category filter or search term.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-xl"
          >
            Add New Evidence
          </button>
        </div>
      )}

      {/* EMPTY STATE (When user has 0 entries in their evidence bank) */}
      {entries.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 animate-in fade-in duration-200">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 border border-emerald-200">
              <Database className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Build your Career Evidence Bank
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Store real achievements, projects, responsibilities, metrics, tools, and credentials here so JOBHUNT AI can use evidence-backed information when tailoring applications.
            </p>
          </div>

          {/* Exactly 3 Quick-Start Helper Template Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            
            {/* Card 1: Add a Project */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-400 hover:shadow-subtle transition flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                  <span>1. Major Project</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">Add a Project</h3>
                <div className="space-y-1 text-[11px] text-slate-500 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="font-semibold text-slate-700 block mb-1">Key Fields:</span>
                  <p>• Project name & company role</p>
                  <p>• What you personally delivered</p>
                  <p>• Tools & technologies used</p>
                  <p>• Verified project outcome</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setCategory('Project');
                  setDescription('');
                  setMetric('');
                  setSourceContext('');
                  setTagsInput('');
                  setIsModalOpen(true);
                }}
                className="w-full py-2 px-3 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl border border-brand-200 transition flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add a Project</span>
              </button>
            </div>

            {/* Card 2: Add an Achievement */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-400 hover:shadow-subtle transition flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>2. STAR Achievement</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">Add an Achievement</h3>
                <div className="space-y-1 text-[11px] text-slate-500 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="font-semibold text-slate-700 block mb-1">Key Fields:</span>
                  <p>• Situation & initial obstacle</p>
                  <p>• Action steps you executed</p>
                  <p>• Verified result (metric or scale)</p>
                  <p>• Competencies demonstrated</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setCategory('Achievement');
                  setDescription('');
                  setMetric('');
                  setSourceContext('');
                  setTagsInput('');
                  setIsModalOpen(true);
                }}
                className="w-full py-2 px-3 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 transition flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add an Achievement</span>
              </button>
            </div>

            {/* Card 3: Add a Certification */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-400 hover:shadow-subtle transition flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>3. Verified Credential</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">Add a Certification</h3>
                <div className="space-y-1 text-[11px] text-slate-500 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="font-semibold text-slate-700 block mb-1">Key Fields:</span>
                  <p>• Certification / License title</p>
                  <p>• Issuing body or institution</p>
                  <p>• Date earned or expiry</p>
                  <p>• Credential ID / Verification URL</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setCategory('Certification');
                  setDescription('');
                  setMetric('');
                  setSourceContext('');
                  setTagsInput('');
                  setIsModalOpen(true);
                }}
                className="w-full py-2 px-3 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add a Certification</span>
              </button>
            </div>

          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Note: All entries are stored privately on your device. We never insert fictional data into your bank.
          </p>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Evidence Bank Entry' : `Add ${category} to Career Evidence Bank`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {category === 'Certification' ? 'Certification / License Name *' : 'Evidence Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    category === 'Certification' 
                      ? 'e.g. Registered Nurse (RN) License / PMP / AWS Certified Solutions Architect' 
                      : category === 'Project' 
                      ? 'e.g. Led payment microservice refactoring in Go' 
                      : 'e.g. Reduced monthly closing cycle from 10 to 6 days'
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as EvidenceBankEntry['category'])}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {categories.filter(c => c !== 'all').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {category === 'Certification' ? 'License Number / Date' : 'Verified Metric / Scale (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                    placeholder={category === 'Certification' ? 'e.g. Active through 2027' : 'e.g. 45% query latency reduction'}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    category === 'Certification'
                      ? 'Enter issuing organization, verification details, and active credential scope...'
                      : 'Describe the context, your specific contribution, tools used, and verified outcome...'
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {category === 'Certification' ? 'Issuing Organization' : 'Source / Company Context'}
                  </label>
                  <input
                    type="text"
                    value={sourceContext}
                    onChange={(e) => setSourceContext(e.target.value)}
                    placeholder={category === 'Certification' ? 'e.g. Project Management Institute (PMI)' : 'e.g. Stripe (2022 – 2024)'}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g. Architecture, Backend, Go"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm"
                >
                  Save to Evidence Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
