import React from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from './Sidebar';
import {
  Menu,
  Flame,
  Bell,
  Sparkles,
  ArrowRightLeft,
  Building,
  GraduationCap,
  Database,
} from 'lucide-react';

interface HeaderBarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenMobileSidebar: () => void;
  onOpenAuth: (mode: 'signin' | 'signup' | 'profile') => void;
  onOpenSupabaseModal?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  activeTab,
  setActiveTab,
  onOpenMobileSidebar,
  onOpenAuth,
  onOpenSupabaseModal,
}) => {
  const { currentUser, switchUserRole, notices, readinessScore } = useApp();

  const urgentNotices = notices.filter((n) => n.urgent).length;

  const tabTitles: Record<NavTab, { title: string; subtitle: string }> = {
    landing: {
      title: 'Welcome to Placement Prep Path',
      subtitle: 'Your 4-Year Campus Placement Journey Starts Here',
    },
    dashboard: {
      title: 'Student Learning Dashboard',
      subtitle: `Welcome back, ${currentUser.name} · ${currentUser.college}`,
    },
    paths: {
      title: 'Structured Learning Paths',
      subtitle: 'Aptitude, DSA, CS Fundamentals, and HR behavioral tracks',
    },
    practice: {
      title: 'Interactive Practice Center',
      subtitle: 'Coding challenges, multiple-choice aptitude tests, and CS reviews',
    },
    roadmap: {
      title: 'Placement Preparation Roadmap',
      subtitle: 'Milestones mapped across Beginner, Intermediate, and Advanced stages',
    },
    progress: {
      title: 'Learning Progress & Test Analytics',
      subtitle: 'Track your quiz scores, lesson completions, and readiness trajectory',
    },
    profile: {
      title: 'Student Academic Profile',
      subtitle: 'Update your academic details, branch, graduation year, and target tier',
    },
    companies: {
      title: 'Visiting Recruiters Directory',
      subtitle: 'Check eligibility cutoffs, CTC brackets, and register for campus drives',
    },
    tracker: {
      title: 'Placement Application Kanban',
      subtitle: 'Monitor rounds, interview schedules, and job offer confirmations',
    },
    admin: {
      title: 'Placement Coordinator Administration',
      subtitle: 'Publish recruitment drives, edit cutoffs, and post bulletins',
    },
  };

  const currentInfo = tabTitles[activeTab] || {
    title: 'Placement Prep Path',
    subtitle: 'Campus Placement Suite',
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate tracking-tight">
              {currentInfo.title}
            </h1>
            <p className="text-[11px] text-slate-500 truncate hidden sm:block">
              {currentInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick actions, streak, role switch, profile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Streak indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{currentUser.streakDays} Day Streak</span>
          </div>

          {/* Readiness quick badge */}
          <div
            onClick={() => setActiveTab('progress')}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold cursor-pointer hover:bg-blue-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{readinessScore}% Ready</span>
          </div>

          {/* Supabase status / config button */}
          {onOpenSupabaseModal && (
            <button
              onClick={onOpenSupabaseModal}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
              title="Supabase Database & RLS Settings"
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Supabase</span>
            </button>
          )}

          {/* Role toggle button */}
          <button
            onClick={() =>
              switchUserRole(currentUser.role === 'coordinator' ? 'student' : 'coordinator')
            }
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              currentUser.role === 'coordinator'
                ? 'bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ArrowRightLeft className="w-3 h-3" />
            <span className="hidden sm:inline">
              {currentUser.role === 'coordinator' ? 'Coordinator Admin' : 'Student Mode'}
            </span>
          </button>

          {/* Profile icon */}
          <button
            onClick={() => onOpenAuth('profile')}
            className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center transition-transform hover:scale-105"
            title="Profile & Settings"
          >
            {currentUser.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)}
          </button>
        </div>
      </div>
    </header>
  );
};
