import React, { useState } from 'react';
import { 
  TrendingUp, 
  Plus, 
  Search, 
  Download, 
  Calendar, 
  DollarSign, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  LayoutGrid, 
  List, 
  Filter,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { JobTrackerEntry } from '../../types';
import { exportTrackerToCSV } from '../../services/exportService';

interface JobTrackerProps {
  applications: JobTrackerEntry[];
  onAddApplication: (entry: Omit<JobTrackerEntry, 'id'>) => void;
  onUpdateApplication: (entry: JobTrackerEntry) => void;
  onDeleteApplication: (id: string) => void;
}

export const JobTracker: React.FC<JobTrackerProps> = ({
  applications,
  onAddApplication,
  onUpdateApplication,
  onDeleteApplication
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [status, setStatus] = useState<JobTrackerEntry['status']>('Preparing');
  const [salaryRange, setSalaryRange] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterContact, setRecruiterContact] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [resumeVersion, setResumeVersion] = useState('');
  const [notes, setNotes] = useState('');
  const [matchScore, setMatchScore] = useState<number>(80);

  const statuses: JobTrackerEntry['status'][] = [
    'Saved', 'Preparing', 'Applied', 'Recruiter Contact', 'Interview', 'Final Round', 'Offer', 'Rejected', 'Withdrawn'
  ];

  // Pipeline Metrics
  const totalApps = applications.length;
  const appliedCount = applications.filter(a => ['Applied', 'Recruiter Contact', 'Interview', 'Final Round', 'Offer'].includes(a.status)).length;
  const responsesCount = applications.filter(a => ['Recruiter Contact', 'Interview', 'Final Round', 'Offer'].includes(a.status)).length;
  const interviewsCount = applications.filter(a => ['Interview', 'Final Round', 'Offer'].includes(a.status)).length;
  const offersCount = applications.filter(a => a.status === 'Offer').length;

  const responseRate = appliedCount > 0 ? Math.round((responsesCount / appliedCount) * 100) : 0;

  const filteredApps = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = 
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setEditingId(null);
    setCompany('');
    setRole('');
    setJobUrl('');
    setStatus('Preparing');
    setSalaryRange('');
    setRecruiterName('');
    setRecruiterContact('');
    setFollowUpDate('');
    setInterviewDate('');
    setResumeVersion('v1.0 - Tailored');
    setNotes('');
    setMatchScore(82);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (app: JobTrackerEntry) => {
    setEditingId(app.id);
    setCompany(app.company);
    setRole(app.role);
    setJobUrl(app.jobUrl || '');
    setStatus(app.status);
    setSalaryRange(app.salaryRange || '');
    setRecruiterName(app.recruiterName || '');
    setRecruiterContact(app.recruiterContact || '');
    setFollowUpDate(app.followUpDate || '');
    setInterviewDate(app.interviewDate || '');
    setResumeVersion(app.resumeVersion);
    setNotes(app.notes);
    setMatchScore(app.matchScore);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    if (editingId) {
      const existing = applications.find(a => a.id === editingId);
      if (existing) {
        onUpdateApplication({
          ...existing,
          company,
          role,
          jobUrl,
          status,
          salaryRange,
          recruiterName,
          recruiterContact,
          followUpDate,
          interviewDate,
          resumeVersion,
          notes,
          matchScore
        });
      }
    } else {
      onAddApplication({
        company,
        role,
        jobUrl,
        dateSaved: new Date().toISOString().slice(0, 10),
        dateApplied: status === 'Applied' ? new Date().toISOString().slice(0, 10) : undefined,
        status,
        salaryRange,
        recruiterName,
        recruiterContact,
        followUpDate,
        interviewDate,
        resumeVersion,
        notes,
        matchScore
      });
    }

    setIsModalOpen(false);
  };

  const getStatusColor = (st: JobTrackerEntry['status']) => {
    switch (st) {
      case 'Saved': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Preparing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Applied': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Recruiter Contact': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Interview': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Final Round': return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Offer': return 'bg-emerald-50 text-emerald-800 border-emerald-200 font-extrabold';
      case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Withdrawn': return 'bg-slate-200 text-slate-600 border-slate-300';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Integrated Pipeline Management</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Job Application Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Track your target roles from initial blueprint drafting to offer negotiations with verifiable metrics.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => exportTrackerToCSV(applications)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Track New Job</span>
          </button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Tracked</span>
          <div className="text-2xl font-extrabold text-slate-900">{totalApps}</div>
          <span className="text-[10px] text-slate-400 block">{appliedCount} Submitted</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Recruiter Responses</span>
          <div className="text-2xl font-extrabold text-purple-700">{responsesCount}</div>
          <span className="text-[10px] text-slate-400 block">{responseRate}% Response Rate</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Interviews</span>
          <div className="text-2xl font-extrabold text-amber-600">{interviewsCount}</div>
          <span className="text-[10px] text-slate-400 block">Stage 1 & Final Rounds</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Offers Extended</span>
          <div className="text-2xl font-extrabold text-emerald-600">{offersCount}</div>
          <span className="text-[10px] text-slate-400 block">Compensation Stage</span>
        </div>
      </div>

      {/* Metric Disclaimer */}
      <p className="text-[11px] text-slate-400 px-1">
        * Note: These metrics measure past pipeline activity and response rates. They do not predict future hiring outcomes.
      </p>

      {/* Filters & View Switcher */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              filterStatus === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({applications.length})
          </button>
          {['Preparing', 'Applied', 'Interview', 'Offer'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                filterStatus === st ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st} ({applications.filter(a => a.status === st).length})
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative w-48 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, notes..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded transition ${viewMode === 'kanban' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
              title="Kanban Board"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition ${viewMode === 'table' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto pb-2">
          {['Preparing', 'Applied', 'Recruiter Contact', 'Interview', 'Final Round', 'Offer'].map(columnStatus => {
            const columnApps = filteredApps.filter(a => a.status === columnStatus);

            return (
              <div key={columnStatus} className="bg-slate-100/70 rounded-2xl p-3 space-y-3 min-w-[260px]">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {columnStatus}
                  </span>
                  <span className="text-[11px] font-extrabold bg-slate-200 text-slate-700 px-2 py-0.2 rounded-full">
                    {columnApps.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {columnApps.map(app => (
                    <div
                      key={app.id}
                      onClick={() => handleOpenEditModal(app)}
                      className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm hover:border-brand-400 hover:shadow-card cursor-pointer transition space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug">{app.role}</h4>
                          <span className="text-[11px] text-slate-500 font-medium block">{app.company}</span>
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 flex-shrink-0">
                          {app.matchScore}% Match
                        </span>
                      </div>

                      {app.salaryRange && (
                        <div className="flex items-center space-x-1 text-[11px] text-slate-600 font-semibold">
                          <DollarSign className="w-3 h-3 text-emerald-600" />
                          <span>{app.salaryRange}</span>
                        </div>
                      )}

                      {app.notes && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed bg-slate-50 p-1.5 rounded">
                          {app.notes}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                        <span>{app.dateApplied ? `Applied: ${app.dateApplied}` : `Saved: ${app.dateSaved}`}</span>
                        {app.followUpDate && (
                          <span className="text-amber-700 font-medium flex items-center space-x-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{app.followUpDate}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center text-[11px] text-slate-400">
                      No roles in {columnStatus}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Role & Company</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Alignment</th>
                  <th className="py-3 px-4">Salary Range</th>
                  <th className="py-3 px-4">Recruiter / Next Step</th>
                  <th className="py-3 px-4">Resume Version</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{app.role}</div>
                      <div className="text-slate-500 text-[11px] flex items-center space-x-1.5">
                        <span>{app.company}</span>
                        {app.jobUrl && (
                          <a href={app.jobUrl} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800">{app.matchScore}%</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {app.salaryRange || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{app.recruiterName || '—'}</div>
                      {app.followUpDate && (
                        <span className="text-[10px] text-amber-700 font-semibold block">
                          Follow-up: {app.followUpDate}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {app.resumeVersion}
                    </td>
                    <td className="py-3.5 px-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEditModal(app)}
                        className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-lg"
                        title="Edit Entry"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteApplication(app.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Application Record' : 'Track New Job Application'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Stripe"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role *</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Senior Product Marketing Manager"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as JobTrackerEntry['status'])}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {statuses.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    placeholder="e.g. $140k - $160k"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Alignment Score (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={matchScore}
                    onChange={(e) => setMatchScore(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Recruiter Name & Contact</label>
                  <input
                    type="text"
                    value={recruiterName}
                    onChange={(e) => setRecruiterName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins (sarah@company.com)"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Follow-Up Date</label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes & Strategic Focus</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Key discussion points, portfolio links, or questions for hiring manager..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                />
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
