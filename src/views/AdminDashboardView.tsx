import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Company, Notice, TierType, NoticeCategory } from '../types';
import {
  ShieldCheck,
  Building2,
  Plus,
  Trash2,
  Edit,
  AlertCircle,
  Megaphone,
  Calendar,
  Users,
  Award,
  DollarSign,
  X,
  FileCheck,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    currentUser,
    companies,
    addCompany,
    updateCompany,
    deleteCompany,
    notices,
    addNotice,
    deleteNotice,
    switchUserRole,
  } = useApp();

  // Modals state
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);

  // New Company Form state
  const [compName, setCompName] = useState('');
  const [compRole, setCompRole] = useState('Graduate Engineer Trainee');
  const [compTier, setCompTier] = useState<TierType>('Dream');
  const [compCtc, setCompCtc] = useState('₹15.0 LPA');
  const [compStipend, setCompStipend] = useState('₹45,000 / month');
  const [compLocation, setCompLocation] = useState('Bengaluru / Pune');
  const [compMinCgpa, setCompMinCgpa] = useState('7.0');
  const [compMaxBacklogs, setCompMaxBacklogs] = useState('0');
  const [compDeadline, setCompDeadline] = useState('2026-11-15');
  const [compDriveDate, setCompDriveDate] = useState('2026-11-25');
  const [compSkills, setCompSkills] = useState('Python, SQL, Data Structures, Problem Solving');
  const [compRounds, setCompRounds] = useState('Online Assessment, Technical Interview, HR Round');
  const [compDescription, setCompDescription] = useState(
    'Leading engineering corporation seeking ambitious software developers.'
  );
  const [compBond, setCompBond] = useState('No Bond');

  // New Notice Form state
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<NoticeCategory>('Drive Alert');
  const [noticeUrgent, setNoticeUrgent] = useState(false);
  const [noticeContent, setNoticeContent] = useState('');

  const handleAddCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName.trim()) return;

    const skillsArray = compSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const roundsArray = compRounds
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);

    addCompany({
      name: compName.trim(),
      tier: compTier,
      jobRole: compRole.trim(),
      ctc: compCtc.trim(),
      stipend: compStipend.trim() || undefined,
      location: compLocation.trim(),
      eligibility: {
        minCgpa: parseFloat(compMinCgpa) || 7.0,
        allowedBranches: [
          'Computer Science & Engineering',
          'Information Technology',
          'Electronics & Communication',
        ],
        maxBacklogs: parseInt(compMaxBacklogs, 10) || 0,
        batch: '2027',
      },
      requiredSkills: skillsArray,
      applicationDeadline: compDeadline,
      driveDate: compDriveDate,
      selectionRounds: roundsArray,
      description: compDescription.trim(),
      bondDetails: compBond.trim() || 'No Bond',
    });

    setIsAddCompanyOpen(false);
    // Reset form
    setCompName('');
  };

  const handleEditCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany) return;

    updateCompany(editingCompany.id, {
      name: editingCompany.name,
      jobRole: editingCompany.jobRole,
      tier: editingCompany.tier,
      ctc: editingCompany.ctc,
      stipend: editingCompany.stipend,
      location: editingCompany.location,
      applicationDeadline: editingCompany.applicationDeadline,
      driveDate: editingCompany.driveDate,
      description: editingCompany.description,
      bondDetails: editingCompany.bondDetails,
    });

    setEditingCompany(null);
  };

  const handleAddNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) return;

    addNotice({
      title: noticeTitle.trim(),
      category: noticeCategory,
      urgent: noticeUrgent,
      content: noticeContent.trim(),
      date: new Date().toISOString().split('T')[0],
      author: currentUser.role === 'coordinator' ? currentUser.name : 'Placement Cell Coordinator',
    });

    setIsAddNoticeOpen(false);
    setNoticeTitle('');
    setNoticeContent('');
    setNoticeUrgent(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Admin Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>T&P Officer Control Panel</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Placement Cell Administration
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
            Publish campus recruitment drives, update eligibility cutoffs, broadcast official announcements,
            and monitor batch preparation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => switchUserRole('student')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Switch to Student View
          </button>
          <button
            onClick={() => setIsAddCompanyOpen(true)}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" /> New Company Drive
          </button>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Visiting Recruiters</span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1">
            {companies.length}
          </div>
          <span className="text-[11px] text-slate-500">Active campus drives</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Top Offered Package</span>
          <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
            ₹38.5 LPA
          </div>
          <span className="text-[11px] text-slate-500">Google SWE (Campus)</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Active Bulletins</span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1">
            {notices.length}
          </div>
          <span className="text-[11px] text-slate-500">
            {notices.filter((n) => n.urgent).length} marked urgent
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase">Batch Registered</span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1">
            420
          </div>
          <span className="text-[11px] text-slate-500">Class of 2027 eligible</span>
        </div>
      </div>

      {/* SECTION 1: MANAGE COMPANY DRIVES */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Manage Recruitment Drives
            </h2>
            <p className="text-xs text-slate-500">
              Add new company visits, update packages, or delist expired drives
            </p>
          </div>

          <button
            onClick={() => setIsAddCompanyOpen(true)}
            className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Drive
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-5 py-3">Company Name</th>
                <th className="px-5 py-3">Job Role</th>
                <th className="px-5 py-3">Tier</th>
                <th className="px-5 py-3">Package (CTC)</th>
                <th className="px-5 py-3">Min CGPA</th>
                <th className="px-5 py-3">Drive Date</th>
                <th className="px-5 py-3">Deadline</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {companies.map((comp) => (
                <tr key={comp.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-900">{comp.name}</td>
                  <td className="px-5 py-3.5 text-slate-700">{comp.jobRole}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-blue-700">{comp.tier}</span>
                  </td>
                  <td className="px-5 py-3.5 font-mono font-bold text-emerald-700">{comp.ctc}</td>
                  <td className="px-5 py-3.5 font-mono text-slate-800">
                    {comp.eligibility.minCgpa}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{comp.driveDate}</td>
                  <td className="px-5 py-3.5 text-slate-600">{comp.applicationDeadline}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingCompany(comp)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                        title="Edit Drive"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteCompany(comp.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="Delist Drive"
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

      {/* SECTION 2: PLACEMENT NOTICES & BULLETINS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-600" />
              Notice Board Announcements
            </h2>
            <p className="text-xs text-slate-500">
              Broadcast critical placement schedules, guidelines, and shortlists
            </p>
          </div>

          <button
            onClick={() => setIsAddNoticeOpen(true)}
            className="px-3 py-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Post Announcement
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {notices.map((n) => (
            <div
              key={n.id}
              className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {n.urgent && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
                      URGENT
                    </span>
                  )}
                  <span className="text-xs font-semibold text-slate-600">{n.category}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500">{n.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">{n.content}</p>
                <div className="text-[11px] text-slate-500">Posted by: {n.author}</div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start">
                <button
                  onClick={() => deleteNotice(n.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Remove Notice"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ADD NEW COMPANY DRIVE */}
      {isAddCompanyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Publish New Recruitment Drive</h3>
              <button
                onClick={() => setIsAddCompanyOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCompanySubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={compName}
                    onChange={(e) => setCompName(e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Role *</label>
                  <input
                    type="text"
                    required
                    value={compRole}
                    onChange={(e) => setCompRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Package Tier</label>
                  <select
                    value={compTier}
                    onChange={(e) => setCompTier(e.target.value as TierType)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600"
                  >
                    <option value="Super Dream">Super Dream (&gt;18 LPA)</option>
                    <option value="Dream">Dream (10-18 LPA)</option>
                    <option value="Core">Core (6-10 LPA)</option>
                    <option value="Mass">Mass (&lt;6 LPA)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total CTC *</label>
                  <input
                    type="text"
                    required
                    value={compCtc}
                    onChange={(e) => setCompCtc(e.target.value)}
                    placeholder="e.g. ₹22.0 LPA"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Internship Stipend</label>
                  <input
                    type="text"
                    value={compStipend}
                    onChange={(e) => setCompStipend(e.target.value)}
                    placeholder="e.g. ₹60,000 / month"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Min CGPA Required</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    required
                    value={compMinCgpa}
                    onChange={(e) => setCompMinCgpa(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Max Backlogs Allowed</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    required
                    value={compMaxBacklogs}
                    onChange={(e) => setCompMaxBacklogs(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={compDeadline}
                    onChange={(e) => setCompDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Campus Drive Date
                  </label>
                  <input
                    type="date"
                    required
                    value={compDriveDate}
                    onChange={(e) => setCompDriveDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Required Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={compSkills}
                  onChange={(e) => setCompSkills(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Selection Rounds (Comma separated)
                </label>
                <input
                  type="text"
                  value={compRounds}
                  onChange={(e) => setCompRounds(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={compDescription}
                  onChange={(e) => setCompDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddCompanyOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs"
                >
                  Publish Campus Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT COMPANY */}
      {editingCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">
                Edit Drive: {editingCompany.name}
              </h3>
              <button
                onClick={() => setEditingCompany(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditCompanySubmit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Role</label>
                <input
                  type="text"
                  value={editingCompany.jobRole}
                  onChange={(e) =>
                    setEditingCompany({ ...editingCompany, jobRole: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Package (CTC)</label>
                  <input
                    type="text"
                    value={editingCompany.ctc}
                    onChange={(e) =>
                      setEditingCompany({ ...editingCompany, ctc: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tier</label>
                  <select
                    value={editingCompany.tier}
                    onChange={(e) =>
                      setEditingCompany({
                        ...editingCompany,
                        tier: e.target.value as TierType,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600"
                  >
                    <option value="Super Dream">Super Dream</option>
                    <option value="Dream">Dream</option>
                    <option value="Core">Core</option>
                    <option value="Mass">Mass</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deadline</label>
                  <input
                    type="date"
                    value={editingCompany.applicationDeadline}
                    onChange={(e) =>
                      setEditingCompany({
                        ...editingCompany,
                        applicationDeadline: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Drive Date</label>
                  <input
                    type="date"
                    value={editingCompany.driveDate}
                    onChange={(e) =>
                      setEditingCompany({ ...editingCompany, driveDate: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCompany.description}
                  onChange={(e) =>
                    setEditingCompany({ ...editingCompany, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: POST NOTICE */}
      {isAddNoticeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Post Placement Announcement</h3>
              <button
                onClick={() => setIsAddNoticeOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNoticeSubmit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Announcement Title *
                </label>
                <input
                  type="text"
                  required
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="e.g. Google OA Shortlist & Interview Timelines"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={noticeCategory}
                    onChange={(e) => setNoticeCategory(e.target.value as NoticeCategory)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:border-amber-600"
                  >
                    <option value="Drive Alert">Drive Alert</option>
                    <option value="Policy">Policy Update</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Schedule Change">Schedule Change</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={noticeUrgent}
                      onChange={(e) => setNoticeUrgent(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 border-slate-300 focus:ring-amber-500"
                    />
                    <span className="font-bold text-slate-800">Mark Urgent Alert</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Bulletin Content *
                </label>
                <textarea
                  rows={4}
                  required
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  placeholder="Enter details, instructions, room allocations, or instructions for students..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddNoticeOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-xs"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
