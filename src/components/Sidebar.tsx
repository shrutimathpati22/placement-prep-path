import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  LayoutDashboard,
  BookOpen,
  BrainCircuit,
  Route,
  BarChart3,
  User,
  Building2,
  Kanban,
  ShieldCheck,
  Flame,
  Cloud,
  HardDrive,
  LogOut,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

export type NavTab =
  | 'landing'
  | 'dashboard'
  | 'paths'
  | 'practice'
  | 'roadmap'
  | 'progress'
  | 'profile'
  | 'companies'
  | 'tracker'
  | 'admin';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenAuth: (mode: 'signin' | 'signup' | 'profile') => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onOpenSupabaseModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  mobileOpen,
  setMobileOpen,
  onOpenSupabaseModal,
}) => {
  const { currentUser, switchUserRole, isCloudConnected, applications } = useApp();

  const activeAppsCount = applications.filter((a) => a.stage !== 'Not Selected').length;

  const primaryNavItems: { id: NavTab; label: string; icon: React.ElementType; badge?: string | number }[] = [
    { id: 'landing', label: 'Welcome / Home', icon: Home },
    { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
    { id: 'paths', label: 'Learning Paths', icon: BookOpen },
    { id: 'practice', label: 'Practice Center', icon: BrainCircuit },
    { id: 'roadmap', label: 'Placement Roadmap', icon: Route },
    { id: 'progress', label: 'Progress & Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Student Profile', icon: User },
  ];

  const placementDrivesNav: { id: NavTab; label: string; icon: React.ElementType; badge?: string | number }[] = [
    { id: 'companies', label: 'Company Directory', icon: Building2 },
    { id: 'tracker', label: 'Placement Tracker', icon: Kanban, badge: activeAppsCount > 0 ? activeAppsCount : undefined },
    { id: 'admin', label: 'TPO Coordinator Admin', icon: ShieldCheck },
  ];

  const handleSelect = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={() => handleSelect('landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 tracking-tight block">
                Placement Prep
              </span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block -mt-0.5">
                Campus SaaS Suite
              </span>
            </div>
          </button>
        </div>

        {/* Middle: Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Student Learning Suite */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Student Preparation
            </span>
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Campus Recruitment Suite */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Campus Drives & TPO
            </span>
            {placementDrivesNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Streak & Storage Status Pill */}
          <div className="px-3 pt-2">
            <div
              onClick={onOpenSupabaseModal}
              className={`p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 ${
                onOpenSupabaseModal ? 'cursor-pointer hover:border-slate-300 hover:bg-slate-100/60 transition-colors' : ''
              }`}
              title="Click to check Supabase backend tables & RLS status"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Daily Streak</span>
                <span className="font-bold text-amber-600 flex items-center gap-1 font-mono">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {currentUser.streakDays} Days 🔥
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200">
                <span className="text-slate-500">Storage State</span>
                <span
                  className={`font-semibold flex items-center gap-1 ${
                    isCloudConnected ? 'text-emerald-700' : 'text-slate-600'
                  }`}
                >
                  {isCloudConnected ? (
                    <>
                      <Cloud className="w-3 h-3 text-emerald-600" /> Cloud Sync
                    </>
                  ) : (
                    <>
                      <HardDrive className="w-3 h-3 text-slate-400" /> Local Sync
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: User Card and Auth switch */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50">
          <div
            onClick={() => handleSelect('profile')}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 text-white ${
                  currentUser.role === 'coordinator' ? 'bg-indigo-600' : 'bg-blue-600'
                }`}
              >
                {currentUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {currentUser.role === 'coordinator' ? 'TPO Admin' : currentUser.yearOfStudy}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] px-1">
            <button
              onClick={() =>
                switchUserRole(currentUser.role === 'coordinator' ? 'student' : 'coordinator')
              }
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Switch to {currentUser.role === 'coordinator' ? 'Student' : 'Coordinator'}
            </button>
            <button
              onClick={() => onOpenAuth('signin')}
              className="text-slate-400 hover:text-slate-700 flex items-center gap-0.5"
            >
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
