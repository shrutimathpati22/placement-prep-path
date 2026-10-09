import React from 'react';
import { Company } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Briefcase,
  HelpCircle,
  FileCheck,
  Bookmark,
  Share2,
} from 'lucide-react';

interface CompanyDetailModalProps {
  company: Company | null;
  onClose: () => void;
  onApplySuccess?: () => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  company,
  onClose,
  onApplySuccess,
}) => {
  const {
    currentUser,
    applications,
    applyToCompany,
    bookmarkedCompanies,
    toggleBookmarkCompany,
    addToast,
  } = useApp();

  if (!company) return null;

  const isApplied = applications.some((a) => a.companyId === company.id);
  const isBookmarked = bookmarkedCompanies.includes(company.id);

  // Eligibility check breakdown
  const meetsCgpa = currentUser.cgpa >= company.eligibility.minCgpa;
  const meetsBranch =
    company.eligibility.allowedBranches.length === 0 ||
    company.eligibility.allowedBranches.includes(currentUser.branch);
  const meetsBacklogs = currentUser.activeBacklogs <= company.eligibility.maxBacklogs;
  const isFullyEligible = meetsCgpa && meetsBranch && meetsBacklogs;

  const handleApply = () => {
    const ok = applyToCompany(company.id);
    if (ok && onApplySuccess) {
      onApplySuccess();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      type: 'info',
      title: 'Drive Link Copied',
      message: 'Share this campus drive with your batchmates.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-600/20 flex-shrink-0">
              {company.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900">{company.name}</h2>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-semibold text-slate-600">{company.tier}</span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-bold text-emerald-700 font-mono">
                  {company.ctc}
                </span>
              </div>
              <p className="text-sm text-slate-700 font-medium mt-0.5">{company.jobRole}</p>
              <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                <span>Location: {company.location}</span>
                {company.stipend && (
                  <>
                    <span>·</span>
                    <span>Stipend: {company.stipend}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmarkCompany(company.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'border-blue-300 bg-blue-50 text-blue-600'
                  : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Company'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Share Drive Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Eligibility Verification Card */}
          <div
            className={`p-4 rounded-xl border ${
              isFullyEligible
                ? 'bg-emerald-50/60 border-emerald-200'
                : 'bg-amber-50/60 border-amber-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                {isFullyEligible ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    You are eligible for this recruitment drive
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Eligibility Criteria Checklist
                  </>
                )}
              </span>
              <span className="text-xs font-mono font-semibold text-slate-700">
                Batch {company.eligibility.batch}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs pt-1">
              <div className="flex items-center gap-2">
                <span className={meetsCgpa ? 'text-emerald-700 font-medium' : 'text-rose-600 font-medium'}>
                  {meetsCgpa ? '✓' : '✗'} CGPA: {currentUser.cgpa} / Min {company.eligibility.minCgpa}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={meetsBranch ? 'text-emerald-700 font-medium' : 'text-rose-600 font-medium'}>
                  {meetsBranch ? '✓ Branch Permitted' : '✗ Branch Not Eligible'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={meetsBacklogs ? 'text-emerald-700 font-medium' : 'text-rose-600 font-medium'}>
                  {meetsBacklogs ? '✓ Backlogs within limit' : '✗ Active Backlogs exceed limit'}
                </span>
              </div>
            </div>
          </div>

          {/* Drive Timelines */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Application Deadline
              </span>
              <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                {company.applicationDeadline}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Campus Drive Date
              </span>
              <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                {company.driveDate}
              </div>
            </div>
          </div>

          {/* Job Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Role Description & Expectations
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">{company.description}</p>
          </div>

          {/* Required Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Key Competencies & Required Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {company.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Selection Workflow Rounds */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recruitment Process & Rounds
            </h3>
            <div className="space-y-2">
              {company.selectionRounds.map((round, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/40 text-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    {index + 1}
                  </div>
                  <span className="text-slate-800 font-medium">{round}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Past Interview Questions Reported by Alumni */}
          {company.pastInterviewQuestions && company.pastInterviewQuestions.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                Past Interview Questions Asked at {company.name}
              </h3>
              <div className="space-y-1.5">
                {company.pastInterviewQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 text-xs text-slate-700 font-mono"
                  >
                    • {q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bond & Service Details */}
          {company.bondDetails && (
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/30 text-xs">
              <span className="font-semibold text-slate-900">Service Bond / Agreement: </span>
              <span className="text-slate-600">{company.bondDetails}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Company Careers Page <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg transition-colors"
            >
              Close
            </button>

            {isApplied ? (
              <span className="px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Registered in Tracker
              </span>
            ) : (
              <button
                disabled={!isFullyEligible}
                onClick={handleApply}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  isFullyEligible
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isFullyEligible ? 'Register for Drive' : 'Ineligible for this Drive'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
