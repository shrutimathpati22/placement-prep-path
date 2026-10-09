import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserProfile, TierType } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  X,
  UserCheck,
  ShieldCheck,
  LogIn,
  UserPlus,
  GraduationCap,
  Cloud,
  Lock,
  Mail,
  Loader2,
  AlertCircle,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { initialStudentUser, initialCoordinatorUser } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup' | 'profile';
  onOpenSupabaseModal?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onOpenSupabaseModal,
}) => {
  const { currentUser, setCurrentUser, switchUserRole, updateProfile, addToast, isCloudConnected } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup' | 'profile'>(initialMode);

  // Signin credentials
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Signup credentials & fields
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState('');

  // Profile fields
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [college, setCollege] = useState(currentUser.college || 'Apex Institute of Technology');
  const [rollNumber, setRollNumber] = useState(currentUser.rollNumber);
  const [branch, setBranch] = useState(currentUser.branch);
  const [cgpa, setCgpa] = useState(currentUser.cgpa.toString());
  const [graduationYear, setGraduationYear] = useState(currentUser.graduationYear.toString());
  const [targetTier, setTargetTier] = useState<TierType>(currentUser.targetCompanyTier);
  const [role, setRole] = useState<'student' | 'coordinator'>(currentUser.role);
  const [phone, setPhone] = useState(currentUser.phone || '');

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Supabase Real Sign In
  const handleSupabaseSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!isSupabaseConfigured || !supabase) {
      handleQuickLogin('student');
      return;
    }

    if (!signInEmail || !signInPassword) {
      setAuthError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInEmail.trim(),
        password: signInPassword,
      });

      if (error) {
        setAuthError(error.message);
        addToast({
          type: 'error',
          title: 'Sign In Failed',
          message: error.message,
        });
        return;
      }

      if (data?.user) {
        addToast({
          type: 'success',
          title: 'Welcome Back!',
          message: `Signed in to Supabase as ${data.user.email}`,
        });
        onClose();
      }
    } catch (err: any) {
      setAuthError(err.message || 'An unexpected error occurred during sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Supabase Real Sign Up
  const handleSupabaseSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const parsedCgpa = parseFloat(cgpa);
    if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
      setAuthError('Please provide a valid CGPA between 0.00 and 10.00.');
      return;
    }

    if (signUpPassword !== signUpPasswordConfirm) {
      setAuthError('Passwords do not match.');
      return;
    }

    if (signUpPassword.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: signUpPassword,
          options: {
            data: {
              name: name.trim(),
              rollNumber: rollNumber.trim(),
              college: college.trim(),
              branch,
              cgpa: parsedCgpa,
              graduationYear: parseInt(graduationYear, 10) || 2027,
              targetCompanyTier: targetTier,
              role: 'student',
              phone: phone.trim(),
            },
          },
        });

        if (error) {
          setAuthError(error.message);
          addToast({
            type: 'error',
            title: 'Registration Error',
            message: error.message,
          });
          return;
        }

        if (data?.user) {
          // Check if session was granted immediately or confirmation needed
          if (data.session) {
            addToast({
              type: 'success',
              title: 'Account Registered! 🎉',
              message: `Welcome to Placement Prep Path, ${name}!`,
            });
          } else {
            addToast({
              type: 'info',
              title: 'Account Created',
              message: 'Check your email for confirmation link if required by your Supabase project settings.',
            });
          }
          onClose();
        }
      } catch (err: any) {
        setAuthError(err.message || 'Registration failed.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Local fallback
      const newUser: UserProfile = {
        id: 'usr-' + Date.now(),
        name: name.trim(),
        email: email.trim(),
        rollNumber: rollNumber.trim(),
        college: college.trim(),
        branch,
        yearOfStudy: '3rd Year',
        cgpa: parsedCgpa,
        graduationYear: parseInt(graduationYear, 10) || 2027,
        role: 'student',
        targetCompanyTier: targetTier,
        phone: phone.trim(),
        activeBacklogs: 0,
        streakDays: 1,
        completedLessonsCount: 0,
        totalStudyHours: 0,
      };
      setCurrentUser(newUser);
      setIsSubmitting(false);
      onClose();
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedCgpa = parseFloat(cgpa);
    if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
      addToast({
        type: 'error',
        title: 'Invalid CGPA',
        message: 'Please provide a valid CGPA between 0.00 and 10.00.',
      });
      return;
    }

    setIsSubmitting(true);
    await updateProfile({
      name: name.trim(),
      email: email.trim(),
      college: college.trim(),
      rollNumber: rollNumber.trim(),
      branch,
      cgpa: Math.round(parsedCgpa * 100) / 100,
      graduationYear: parseInt(graduationYear, 10) || 2027,
      targetCompanyTier: targetTier,
      role,
      phone: phone.trim(),
    });
    setIsSubmitting(false);
    onClose();
  };

  const handleQuickLogin = (demoRole: 'student' | 'coordinator') => {
    switchUserRole(demoRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
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
                  : 'Placement Portal Login'}
              </h3>
              <p className="text-xs text-slate-500">
                {isCloudConnected ? 'Connected to Supabase PostgreSQL' : 'Local Storage Mode'}
              </p>
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
          <div className="grid grid-cols-2 p-1.5 bg-slate-100 mx-6 mt-4 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                setMode('signin');
                setAuthError(null);
              }}
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
              onClick={() => {
                setMode('signup');
                setAuthError(null);
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'signup'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Register Account
            </button>
          </div>
        )}

        {/* Error Alert Banner */}
        {authError && (
          <div className="mx-6 mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Main Form Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {mode === 'signin' && (
            <div className="space-y-4">
              {/* Real Supabase Credentials Form */}
              <form onSubmit={handleSupabaseSignIn} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College / Registered Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="e.g. aryan.sharma@apex.edu"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                    />
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-3.5 h-3.5" />
                      Sign In with Supabase
                    </>
                  )}
                </button>
              </form>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-slate-400">or explore with demo profiles</span>
                </div>
              </div>

              {/* Quick Demo Pre-configured Buttons */}
              <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
                <p className="text-[11px] text-blue-900 font-medium">
                  Instant preview without creating an account:
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuickLogin('student')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg border border-blue-200 bg-white hover:border-blue-500 hover:shadow-xs transition-all text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        AS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          Aryan Sharma
                          <span className="text-[10px] text-blue-700 font-normal">Student</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          B.Tech CSE · CGPA 8.65 · Roll: 21BCSE042
                        </div>
                      </div>
                    </div>
                    <UserCheck className="w-4 h-4 text-blue-600" />
                  </button>

                  <button
                    onClick={() => handleQuickLogin('coordinator')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-indigo-500 hover:shadow-xs transition-all text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                        KV
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          Prof. K. Verma
                          <span className="text-[10px] text-indigo-700 font-normal">TPO Head</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Placement Coordinator · Admin Management
                        </div>
                      </div>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSupabaseSignUp} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">College Email *</label>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Create Password *</label>
                  <input
                    type="password"
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                    placeholder="Min. 6 characters"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password *</label>
                  <input
                    type="password"
                    required
                    value={signUpPasswordConfirm}
                    onChange={(e) => setSignUpPasswordConfirm(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                    placeholder="Repeat password"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Roll / PRN Number *</label>
                  <input
                    type="text"
                    required
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors font-mono"
                    placeholder="21BCSE042"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current CGPA (0-10) *</label>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Registering with Supabase...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    Create Student Account
                  </>
                )}
              </button>
            </form>
          )}

          {mode === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors font-mono"
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
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

              <div className="pt-2 flex items-center justify-between">
                {onOpenSupabaseModal && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenSupabaseModal();
                    }}
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    <Database className="w-3 h-3" />
                    Supabase Schema Status
                  </button>
                )}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer info banner */}
        <div className="px-6 py-2.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Cloud className="w-3 h-3 text-emerald-600" />
            PostgreSQL Auth & RLS Guarded
          </span>
          {onOpenSupabaseModal && (
            <button
              onClick={() => {
                onClose();
                onOpenSupabaseModal();
              }}
              className="text-blue-600 hover:underline font-semibold"
            >
              View SQL Schema
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
