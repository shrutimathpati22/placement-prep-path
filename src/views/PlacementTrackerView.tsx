import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Application, ApplicationStage } from '../types';
import {
  Kanban,
  List,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Trash2,
  Edit2,
  ArrowRight,
  Sparkles,
  Building2,
  X,
  FileText,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

const STAGES: ApplicationStage[] = [
  'Applied',
  'OA Round',
  'Technical Round',
  'HR Round',
  'Offer Received',
  'Not Selected',
];

export const PlacementTrackerView: React.FC = () => {
  const {
    applications,
    updateApplicationStage,
    updateApplication,
    deleteApplication,
    addManualApplication,
    addToast,
  } = useApp();

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);

  // New Application Form State
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('Software Engineer');
  const [newCtc, setNewCtc] = useState('₹18.0 LPA');
  const [newStage, setNewStage] = useState<ApplicationStage>('Applied');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newNextRoundDate, setNewNextRoundDate] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Funnel calculations
  const totalApps = applications.length;
  const appliedCount = applications.filter((a) => a.stage === 'Applied').length;
  const oasCount = applications.filter((a) => a.stage === 'OA Round').length;
  const techCount = applications.filter((a) => a.stage === 'Technical Round').length;
  const hrCount = applications.filter((a) => a.stage === 'HR Round').length;
  const offersCount = applications.filter((a) => a.stage === 'Offer Received').length;

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim()) return;

    addManualApplication({
      companyId: 'custom-' + Date.now(),
      companyName: newCompany.trim(),
      jobRole: newRole.trim(),
      appliedDate: newDate,
      stage: newStage,
      packageOffered: newCtc.trim(),
      nextRoundDate: newNextRoundDate || undefined,
      notes: newNotes.trim() || undefined,
    });

    setIsAddModalOpen(false);
    setNewCompany('');
    setNewNotes('');
  };

  const handleUpdateApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    updateApplication(editingApp.id, {
      companyName: editingApp.companyName,
      jobRole: editingApp.jobRole,
      stage: editingApp.stage,
      packageOffered: editingApp.packageOffered,
      nextRoundDate: editingApp.nextRoundDate,
      notes: editingApp.notes,
    });

    setEditingApp(null);
  };

  const getStageColor = (stage: ApplicationStage) => {
    switch (stage) {
      case 'Applied':
        return 'border-blue-200 bg-blue-50/40 text-blue-800';
      case 'OA Round':
        return 'border-purple-200 bg-purple-50/40 text-purple-800';
      case 'Technical Round':
        return 'border-indigo-200 bg-indigo-50/40 text-indigo-800';
      case 'HR Round':
        return 'border-amber-200 bg-amber-50/40 text-amber-800';
      case 'Offer Received':
        return 'border-emerald-200 bg-emerald-50/40 text-emerald-800';
      case 'Not Selected':
        return 'border-slate-200 bg-slate-50 text-slate-500';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Placement Application Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track your journey from registration to final selection across campus and off-campus drives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 px-3 rounded-md flex items-center gap-1.5 transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 px-3 rounded-md flex items-center gap-1.5 transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Application
          </button>
        </div>
      </div>

      {/* Conversion Funnel Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
        <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
            Total Applied
          </span>
          <span className="text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">
            {totalApps}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-purple-50/50 border border-purple-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
            OA Round
          </span>
          <span className="text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">
            {oasCount}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
            Tech Interview
          </span>
          <span className="text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">
            {techCount}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
            HR Round
          </span>
          <span className="text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">
            {hrCount}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
            Offers Confirmed
          </span>
          <span className="text-xl font-extrabold text-emerald-700 font-mono mt-0.5 block">
            {offersCount}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
            Offer Rate
          </span>
          <span className="text-xl font-extrabold text-slate-800 font-mono mt-0.5 block">
            {totalApps > 0 ? Math.round((offersCount / totalApps) * 100) : 0}%
          </span>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageApps = applications.filter((a) => a.stage === stage);

            return (
              <div
                key={stage}
                className="bg-slate-100/70 rounded-xl p-3 border border-slate-200/80 min-w-[240px] flex flex-col space-y-3"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-1 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">{stage}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-white text-slate-600 shadow-2xs">
                      {stageApps.length}
                    </span>
                  </div>
                </div>

                {/* Cards List */}
                <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[600px] pr-0.5">
                  {stageApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug">
                            {app.companyName}
                          </h4>
                          <p className="text-[11px] text-slate-600">{app.jobRole}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingApp(app)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                            title="Edit notes & stage"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteApplication(app.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {app.packageOffered && (
                        <div className="text-[11px] font-mono font-bold text-emerald-700">
                          {app.packageOffered}
                        </div>
                      )}

                      {app.nextRoundDate && (
                        <div className="flex items-center gap-1 text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-medium">
                          <Calendar className="w-2.5 h-2.5" />
                          Round Date: {app.nextRoundDate}
                        </div>
                      )}

                      {app.notes && (
                        <p className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 line-clamp-2">
                          {app.notes}
                        </p>
                      )}

                      {/* Advance Stage Control */}
                      <div className="pt-1 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[9px] text-slate-400">Move:</span>
                        <div className="flex items-center gap-1">
                          {stage !== 'Offer Received' && stage !== 'Not Selected' && (
                            <button
                              onClick={() => {
                                const currentIndex = STAGES.indexOf(stage);
                                if (currentIndex < STAGES.length - 2) {
                                  updateApplicationStage(app.id, STAGES[currentIndex + 1]);
                                }
                              }}
                              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                            >
                              Next <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          )}
                          {stage !== 'Offer Received' && (
                            <button
                              onClick={() => updateApplicationStage(app.id, 'Offer Received')}
                              className="text-[10px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded transition-colors"
                            >
                              Offer!
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageApps.length === 0 && (
                    <div className="p-4 text-center rounded-lg border border-dashed border-slate-200 text-[11px] text-slate-400">
                      No applications in this round
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="px-5 py-3">Company & Role</th>
                  <th className="px-5 py-3">Current Stage</th>
                  <th className="px-5 py-3">Package (CTC)</th>
                  <th className="px-5 py-3">Applied Date</th>
                  <th className="px-5 py-3">Next Schedule</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-slate-900 text-xs">{app.companyName}</div>
                      <div className="text-[11px] text-slate-500">{app.jobRole}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={app.stage}
                        onChange={(e) =>
                          updateApplicationStage(app.id, e.target.value as ApplicationStage)
                        }
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getStageColor(
                          app.stage
                        )} focus:outline-hidden`}
                      >
                        {STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 font-mono font-semibold text-emerald-700">
                      {app.packageOffered || '—'}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{app.appliedDate}</td>
                    <td className="px-5 py-3.5 text-indigo-700 font-medium">
                      {app.nextRoundDate || '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingApp(app)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: ADD CUSTOM APPLICATION */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Add Application to Tracker</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Adobe, Uber, Flipkart"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Role</label>
                  <input
                    type="text"
                    required
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Package (CTC)</label>
                  <input
                    type="text"
                    value={newCtc}
                    onChange={(e) => setNewCtc(e.target.value)}
                    placeholder="e.g. ₹20.0 LPA"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as ApplicationStage)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Next Round Date</label>
                  <input
                    type="date"
                    value={newNextRoundDate}
                    onChange={(e) => setNewNextRoundDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notes / Feedback</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Assessment completed on HackerRank; awaiting interview invite."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT APPLICATION */}
      {editingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">
                Edit Application: {editingApp.companyName}
              </h3>
              <button
                onClick={() => setEditingApp(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateApp} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Recruitment Stage</label>
                  <select
                    value={editingApp.stage}
                    onChange={(e) =>
                      setEditingApp({
                        ...editingApp,
                        stage: e.target.value as ApplicationStage,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600 font-bold"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Package Offered</label>
                  <input
                    type="text"
                    value={editingApp.packageOffered || ''}
                    onChange={(e) =>
                      setEditingApp({ ...editingApp, packageOffered: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Upcoming Round Date
                </label>
                <input
                  type="date"
                  value={editingApp.nextRoundDate || ''}
                  onChange={(e) =>
                    setEditingApp({ ...editingApp, nextRoundDate: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Interview Notes & Preparation Log
                </label>
                <textarea
                  rows={3}
                  value={editingApp.notes || ''}
                  onChange={(e) => setEditingApp({ ...editingApp, notes: e.target.value })}
                  placeholder="Record topics discussed in interview, questions asked, or HR remarks..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs"
                >
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
