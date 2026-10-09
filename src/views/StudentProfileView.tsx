import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TierType } from '../types';
import {
  User,
  GraduationCap,
  Building,
  CheckCircle2,
  Mail,
  Phone,
  Save,
  RotateCcw,
  Sparkles,
  Cloud,
  HardDrive,
  Award,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export const StudentProfileView: React.FC = () => {
  const {
    currentUser,
    updateProfile,
    companies,
    isCloudConnected,
    addToast,
    supabaseUser,
    signOutSupabase,
  } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [college, setCollege] = useState(currentUser.college);
  const [branch, setBranch] = useState(currentUser.branch);
  const [yearOfStudy, setYearOfStudy] = useState(currentUser.yearOfStudy);
  const [rollNumber, setRollNumber] = useState(currentUser.rollNumber);
  const [cgpa, setCgpa] = useState(currentUser.cgpa.toString());
  const [graduationYear, setGraduationYear] = useState(currentUser.graduationYear.toString());
  const [targetTier, setTargetTier] = useState<TierType>(currentUser.targetCompanyTier);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [activeBacklogs, setActiveBacklogs] = useState(currentUser.activeBacklogs.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedCgpa = parseFloat(cgpa);
    if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
      addToast({
        type: 'error',
        title: 'Invalid CGPA',
        message: 'CGPA must be a valid number between 0.00 and 10.00.',
      });
      return;
    }

    setIsSubmitting(true);
    await updateProfile({
      name: name.trim(),
      email: email.trim(),
      college: college.trim(),
      branch,
      yearOfStudy,
      rollNumber: rollNumber.trim(),
      cgpa: Math.round(parsedCgpa * 100) / 100,
      graduationYear: parseInt(graduationYear, 10) || 2027,
      targetCompanyTier: targetTier,
      phone: phone.trim(),
      activeBacklogs: parseInt(activeBacklogs, 10) || 0,
    });
    setIsSubmitting(false);
  };

  // Companies current student is eligible for
  const eligibleCount = companies.filter(
    (c) =>
      currentUser.cgpa >= c.eligibility.minCgpa &&
      (c.eligibility.allowedBranches.length === 0 ||
        c.eligibility.allowedBranches.includes(currentUser.branch))
  ).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Student Academic Profile
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Your profile determines automated recruitment eligibility checks and personalized learning recommendations.
        </p>
      </div>

      {/* Top Profile Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-600/20 flex-shrink-0">
            {currentUser.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-black text-slate-900">{currentUser.name}</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                {currentUser.yearOfStudy}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {currentUser.branch} · {currentUser.college}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
              <span>Roll: {currentUser.rollNumber}</span>
              <span>·</span>
              <span>
                CGPA: <strong className="text-slate-900 font-mono">{currentUser.cgpa}</strong>
              </span>
            </div>
            {supabaseUser && (
              <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Supabase Account: {supabaseUser.email}</span>
                <button
                  type="button"
                  onClick={signOutSupabase}
                  className="text-slate-400 hover:text-slate-700 underline text-[10px] ml-1"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
          <span className="text-[11px] text-slate-500 font-medium">Drive Cutoff Match</span>
          <span className="text-sm font-black text-emerald-700">
            {eligibleCount} of {companies.length} Drives Eligible
          </span>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Edit Academic Information</h3>
            <p className="text-xs text-slate-500">
              Changes sync immediately to local and cloud persistence.
            </p>
          </div>

          <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            {isCloudConnected ? (
              <span className="text-emerald-700 flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5" /> Supabase Synced
              </span>
            ) : (
              <span className="text-slate-500 flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5" /> Local Storage Active
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Student Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">College / University Name *</label>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Academic Department / Branch *</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Year of Study *</label>
              <select
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600 font-semibold"
              >
                <option value="1st Year">1st Year (Freshman)</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="4th Year">4th Year (Senior / Final Year)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Roll / PRN Number *</label>
              <input
                type="text"
                required
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Cumulative CGPA *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                required
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Active Backlogs *</label>
              <input
                type="number"
                min="0"
                max="10"
                required
                value={activeBacklogs}
                onChange={(e) => setActiveBacklogs(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">College Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Package Tier</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(['Super Dream', 'Dream', 'Core', 'Mass'] as TierType[]).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setTargetTier(tier)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    targetTier === tier
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
