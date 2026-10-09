import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TierType } from '../types';
import {
  Search,
  Building2,
  Calendar,
  Clock,
  Filter,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  ChevronRight,
  Bookmark,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';

interface CompanyDirectoryViewProps {
  onOpenCompanyDetail: (companyId: string) => void;
}

export const CompanyDirectoryView: React.FC<CompanyDirectoryViewProps> = ({
  onOpenCompanyDetail,
}) => {
  const {
    companies,
    currentUser,
    applications,
    applyToCompany,
    bookmarkedCompanies,
    toggleBookmarkCompany,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [eligibleOnly, setEligibleOnly] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'ctc' | 'name'>('deadline');

  const filteredCompanies = useMemo(() => {
    return companies
      .filter((comp) => {
        // Search filter
        const matchesQuery =
          comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comp.jobRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comp.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
          comp.location.toLowerCase().includes(searchQuery.toLowerCase());

        // Tier filter
        const matchesTier = selectedTier === 'all' || comp.tier === selectedTier;

        // Branch filter
        const matchesBranch =
          selectedBranch === 'all' ||
          comp.eligibility.allowedBranches.length === 0 ||
          comp.eligibility.allowedBranches.includes(selectedBranch);

        // Eligible only filter
        const isEligible =
          currentUser.cgpa >= comp.eligibility.minCgpa &&
          (comp.eligibility.allowedBranches.length === 0 ||
            comp.eligibility.allowedBranches.includes(currentUser.branch)) &&
          currentUser.activeBacklogs <= comp.eligibility.maxBacklogs;

        if (eligibleOnly && !isEligible) return false;

        return matchesQuery && matchesTier && matchesBranch;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') {
          return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'ctc') {
          // Extract numeric value from e.g. "₹38.5 LPA"
          const getVal = (ctcStr: string) => {
            const match = ctcStr.match(/\d+(\.\d+)?/);
            return match ? parseFloat(match[0]) : 0;
          };
          return getVal(b.ctc) - getVal(a.ctc);
        }
        return 0;
      });
  }, [companies, searchQuery, selectedTier, selectedBranch, eligibleOnly, currentUser, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTier('all');
    setEligibleOnly(false);
    setSelectedBranch('all');
    setSortBy('deadline');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Company Recruitment Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse verified campus recruiters, review package brackets, check cutoff eligibility, and register.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEligibleOnly(!eligibleOnly)}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
              eligibleOnly
                ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${eligibleOnly ? 'text-white' : 'text-blue-600'}`} />
            Eligible for My Profile (CGPA {currentUser.cgpa})
          </button>
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company, job role (e.g. SDE, Cloud), skills..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
            />
          </div>

          {/* Tier Segmented Filter */}
          <div className="md:col-span-4 flex items-center p-1 bg-slate-100 rounded-lg text-xs font-semibold overflow-x-auto">
            {['all', 'Super Dream', 'Dream', 'Core'].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`flex-1 py-1.5 px-2 rounded-md whitespace-nowrap transition-all ${
                  selectedTier === tier
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tier === 'all' ? 'All Tiers' : tier}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="md:col-span-3 flex items-center gap-2">
            <div className="w-full relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-hidden focus:border-blue-600"
              >
                <option value="deadline">Sort: Application Deadline</option>
                <option value="ctc">Sort: Highest Package (CTC)</option>
                <option value="name">Sort: Company Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Second row: Active filters count and reset */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <div>
            Showing <strong className="text-slate-900">{filteredCompanies.length}</strong> of{' '}
            {companies.length} campus recruitment drives
          </div>

          {(searchQuery || selectedTier !== 'all' || eligibleOnly || selectedBranch !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No recruitment drives found</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            No active companies matched your search keywords or eligibility filter. Try clearing filters to see all available drives.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCompanies.map((comp) => {
            const isEligible =
              currentUser.cgpa >= comp.eligibility.minCgpa &&
              (comp.eligibility.allowedBranches.length === 0 ||
                comp.eligibility.allowedBranches.includes(currentUser.branch)) &&
              currentUser.activeBacklogs <= comp.eligibility.maxBacklogs;

            const isApplied = applications.some((a) => a.companyId === comp.id);
            const isBookmarked = bookmarkedCompanies.includes(comp.id);

            return (
              <div
                key={comp.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top */}
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-black text-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                        {comp.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm leading-snug">
                          {comp.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                          <span>{comp.tier}</span>
                          <span>·</span>
                          <span>{comp.location}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBookmarkCompany(comp.id)}
                      className="p-1.5 text-slate-300 hover:text-blue-600 rounded-md transition-colors"
                      title="Bookmark"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`}
                      />
                    </button>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {comp.jobRole}
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-emerald-700 font-mono">
                        {comp.ctc}
                      </span>
                      {comp.stipend && (
                        <span className="text-[11px] text-slate-500 font-medium">
                          ({comp.stipend})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Criteria Checklist */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Min CGPA Required:</span>
                      <span
                        className={`font-semibold font-mono ${
                          currentUser.cgpa >= comp.eligibility.minCgpa
                            ? 'text-emerald-700'
                            : 'text-rose-600'
                        }`}
                      >
                        {comp.eligibility.minCgpa} (Yours: {currentUser.cgpa})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Allowed Backlogs:</span>
                      <span className="font-semibold text-slate-700">
                        Max {comp.eligibility.maxBacklogs}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Status:</span>
                      {isEligible ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Eligible
                        </span>
                      ) : (
                        <span className="text-rose-600 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-500" /> Ineligible
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1">
                    {comp.requiredSkills.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {comp.requiredSkills.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{comp.requiredSkills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Bottom / Actions */}
                <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500">
                    <span className="block font-medium">Drive Date:</span>
                    <span className="text-slate-700 font-semibold">{comp.driveDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenCompanyDetail(comp.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                    >
                      Details
                    </button>

                    {isApplied ? (
                      <span className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg">
                        Applied
                      </span>
                    ) : (
                      <button
                        disabled={!isEligible}
                        onClick={() => applyToCompany(comp.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          isEligible
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
