import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserProfile, TierType } from '../types';
import { X, UserCheck, ShieldCheck, LogIn, UserPlus, GraduationCap } from 'lucide-react';
import { initialStudentUser, initialCoordinatorUser } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup' | 'profile';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const { currentUser, setCurrentUser, switchUserRole, addToast } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup' | 'profile'>(initialMode);

  // Form states
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [rollNumber, setRollNumber] = useState(currentUser.rollNumber);
  const [branch, setBranch] = useState(currentUser.branch);
  const [cgpa, setCgpa] = useState(currentUser.cgpa.toString());
  const [graduationYear, setGraduationYear] = useState(currentUser.graduationYear.toString());
  const [targetTier, setTargetTier] = useState<TierType>(currentUser.targetCompanyTier);
  const [role, setRole] = useState<'student' | 'coordinator'>(currentUser.role);

  if (!isOpen) return null;

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedCgpa = parseFloat(cgpa);
    if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
      addToast({
        type: 'error',
        title: 'Invalid CGPA',
        message: 'Please provide a valid CGPA scale between 0.00 and 10.00.',
      });
      return;
    }

    const updated: UserProfile = {
      ...currentUser,
      name,
      email,
      rollNumber,
      branch,
      cgpa: Math.round(parsedCgpa * 100) / 100,
      graduationYear: parseInt(graduationYear, 10) || 2027,
      targetCompanyTier: targetTier,
      role,
    };

    setCurrentUser(updated);
    onClose();
  };

  const handleQuickLogin = (demoRole: 'student' | 'coordinator') => {
    switchUserRole(demoRole);
    onClose();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedCgpa = parseFloat(cgpa) || 8.0;
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name,
      email,
      rollNumber,
      college: currentUser.college || 'Apex Institute of Technology',
      branch,
      yearOfStudy: '3rd Year',
      cgpa: parsedCgpa,
      graduationYear: parseInt(graduationYear, 10) || 2027,
      role: 'student',
      targetCompanyTier: targetTier,
      activeBacklogs: 0,
      streakDays: 1,
      completedLessonsCount: 0,
      totalStudyHours: 0,
    };
    setCurrentUser(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {mode === 'profile'
                  ? 'Student Profile Settings'
                  : mode === 'signup'
                  ? 'Create Student Account'
                  : 'Student & Coordinator Login'}
              </h3>
              <p className="text-xs text-slate-500">Apex Institute of Technology Placement Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs (if not profile editing) */}
        {mode !== 'profile' && (
          <div className="grid grid-cols-2 p-1.5 bg-slate-100 mx-6 mt-5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setMode('signin')}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'signin'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'signup'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Register (Student)
            </button>
          </div>
        )}

        <div className="p-6">
          {mode === 'signin' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50">
                <p className="text-xs text-blue-900 font-medium mb-3">
                  Select a pre-configured role to test the full recruitment workflows:
                </p>
                <div className="space-y-2.5">
                  <button
                    onClick={() => handleQuickLogin('student')}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-white hover:border-blue-500 hover:shadow-xs transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        AS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          Aryan Sharma
                          <span className="text-[10px] text-blue-700 font-normal">Student</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          B.Tech CSE · CGPA 8.65 · Roll: 21BCSE042
                        </div>
                      </div>
                    </div>
                    <UserCheck className="w-4 h-4 text-blue-600" />
                  </button>

                  <button
                    onClick={() => handleQuickLogin('coordinator')}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:border-indigo-500 hover:shadow-xs transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                        KV
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          Prof. K. Verma
                          <span className="text-[10px] text-indigo-700 font-normal">TPO Head</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Training & Placement Cell Coordinator · Full Admin Access
                        </div>
                      </div>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  </button>
                </div>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-slate-400">or sign in with credentials</span>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleQuickLogin('student');
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">College Email / PRN</label>
                  <input
                    type="email"
                    required
                    defaultValue="aryan.sharma@apex.edu"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    defaultValue="••••••••"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-xs"
                >
                  Sign In to Dashboard
                </button>
              </form>
            </div>
          )}

          {(mode === 'signup' || mode === 'profile') && (
            <form onSubmit={mode === 'profile' ? handleProfileSave : handleSignupSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                    placeholder="e.g. Aryan Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">College Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                    placeholder="roll@apex.edu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Roll / PRN Number</label>
                  <input
                    type="text"
                    required
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                    placeholder="21BCSE042"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    required
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors font-mono"
                    placeholder="8.65"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Engineering Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Batch</label>
                  <select
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                  >
                    <option value="2026">Class of 2026</option>
                    <option value="2027">Class of 2027 (Current)</option>
                    <option value="2028">Class of 2028</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Package Tier</label>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {(['Super Dream', 'Dream', 'Core', 'Mass'] as TierType[]).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setTargetTier(tier)}
                      className={`py-1.5 px-2 rounded-lg border transition-all text-xs font-medium ${
                        targetTier === tier
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {mode === 'profile' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Active Portal Role</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        role === 'student'
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Student Account
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('coordinator')}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        role === 'coordinator'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      TPO Placement Admin
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-xs"
                >
                  {mode === 'profile' ? 'Save Changes' : 'Complete Registration'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
