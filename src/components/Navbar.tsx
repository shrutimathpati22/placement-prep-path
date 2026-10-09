import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Building2,
  BookOpen,
  Kanban,
  Shield,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Sparkles,
  ArrowRightLeft,
  Bell,
} from 'lucide-react';

export type NavTab = 'dashboard' | 'companies' | 'prephub' | 'tracker' | 'admin';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenAuth: (mode: 'signin' | 'signup' | 'profile') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
}) => {
  const { currentUser, switchUserRole, notices, applications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const urgentNoticesCount = notices.filter((n) => n.urgent).length;
  const activeAppsCount = applications.filter((a) => a.stage !== 'Not Selected').length;

  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: Compass },
    { id: 'companies' as NavTab, label: 'Company Drives', icon: Building2 },
    { id: 'prephub' as NavTab, label: 'Preparation Hub', icon: BookOpen },
    {
      id: 'tracker' as NavTab,
      label: 'Placement Tracker',
      icon: Kanban,
      badge: activeAppsCount > 0 ? activeAppsCount : undefined,
    },
    {
      id: 'admin' as NavTab,
      label: 'Coordinator Admin',
      icon: Shield,
      isCoordinator: true,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro-bar for institutional branding & quick role toggle */}
      <div className="bg-slate-900 text-slate-300 text-[11px] px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white tracking-wide">
            Apex Institute of Technology
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 hidden sm:inline">
            Training & Placement Cell · Class of 2027 Portal
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 hidden md:inline">Mode:</span>
          <button
            onClick={() =>
              switchUserRole(currentUser.role === 'coordinator' ? 'student' : 'coordinator')
            }
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold transition-colors ${
              currentUser.role === 'coordinator'
                ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
            }`}
          >
            <ArrowRightLeft className="w-2.5 h-2.5" />
            Switch to {currentUser.role === 'coordinator' ? 'Student View' : 'TPO Admin View'}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/15 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Placement Prep Path
                </span>
                <span className="text-[10px] text-blue-600 block -mt-1 font-semibold uppercase tracking-wider">
                  Campus Placement Suite
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? 'text-blue-600'
                        : item.isCoordinator
                        ? 'text-indigo-500'
                        : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-0.5 text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-bold">
                      {item.badge}
                    </span>
                  )}
                  {item.isCoordinator && currentUser.role === 'coordinator' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-indigo-100 text-indigo-700 uppercase font-bold tracking-tight">
                      Admin
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile / Quick Actions */}
          <div className="flex items-center gap-3">
            {/* Quick notices indicator */}
            <button
              onClick={() => setActiveTab('dashboard')}
              title={`${urgentNoticesCount} notices active`}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell className="w-4 h-4" />
              {urgentNoticesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {/* Profile Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all text-left"
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    currentUser.role === 'coordinator'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {currentUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)}
                </div>
                <div className="hidden lg:block">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-none">
                    {currentUser.role === 'coordinator' ? 'Coordinator' : `CGPA ${currentUser.cgpa}`}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-slate-600">
                        <span className="font-semibold">{currentUser.branch}</span>
                        <span>·</span>
                        <span className="text-blue-700 font-mono font-bold">
                          CGPA: {currentUser.cgpa}
                        </span>
                      </div>
                    </div>

                    <div className="p-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenAuth('profile');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg text-left transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        Edit Student Profile
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          switchUserRole(
                            currentUser.role === 'coordinator' ? 'student' : 'coordinator'
                          );
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg text-left transition-colors"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
                        Switch to {currentUser.role === 'coordinator' ? 'Student View' : 'TPO Admin View'}
                      </button>

                      <div className="my-1 border-t border-slate-100" />

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenAuth('signin');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg text-left transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out / Switch User
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 mt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('profile');
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:text-slate-900"
            >
              <User className="w-4 h-4" />
              <span>Signed in as {currentUser.name}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
