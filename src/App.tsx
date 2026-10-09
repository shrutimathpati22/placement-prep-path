import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar, NavTab } from './components/Sidebar';
import { HeaderBar } from './components/HeaderBar';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';
import { CompanyDetailModal } from './components/CompanyDetailModal';
import { SupabaseModal } from './components/SupabaseModal';
import { LandingPageView } from './views/LandingPageView';
import { DashboardView } from './views/DashboardView';
import { LearningPathsView } from './views/LearningPathsView';
import { PracticeCenterView } from './views/PracticeCenterView';
import { PlacementRoadmapView } from './views/PlacementRoadmapView';
import { ProgressPageView } from './views/ProgressPageView';
import { StudentProfileView } from './views/StudentProfileView';
import { CompanyDirectoryView } from './views/CompanyDirectoryView';
import { PlacementTrackerView } from './views/PlacementTrackerView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { MapPin, Mail, GraduationCap } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { companies, refreshCloudData } = useApp();
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'profile'>('signin');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId) || null;

  const handleOpenAuth = (mode: 'signin' | 'signup' | 'profile') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenCompanyDetail = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* SaaS Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={handleOpenAuth}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenAuth={handleOpenAuth}
          onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {activeTab === 'landing' && (
            <LandingPageView
              onGetStarted={() => setActiveTab('dashboard')}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardView
              setActiveTab={setActiveTab}
              onOpenCompanyDetail={handleOpenCompanyDetail}
            />
          )}

          {activeTab === 'paths' && <LearningPathsView setActiveTab={setActiveTab} />}

          {activeTab === 'practice' && <PracticeCenterView />}

          {activeTab === 'roadmap' && <PlacementRoadmapView setActiveTab={setActiveTab} />}

          {activeTab === 'progress' && <ProgressPageView setActiveTab={setActiveTab} />}

          {activeTab === 'profile' && <StudentProfileView />}

          {activeTab === 'companies' && (
            <CompanyDirectoryView onOpenCompanyDetail={handleOpenCompanyDetail} />
          )}

          {activeTab === 'tracker' && <PlacementTrackerView />}

          {activeTab === 'admin' && <AdminDashboardView />}
        </main>

        {/* Clean Footer */}
        <footer className="bg-white border-t border-slate-200 mt-12 text-slate-500 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-slate-900 text-xs">
                  Placement Prep Path
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-[11px] text-slate-500">
                  Campus Placement Acceleration SaaS
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className="hover:text-blue-600 transition-colors"
                >
                  4-Year Roadmap
                </button>
                <button
                  onClick={() => setActiveTab('paths')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Learning Paths
                </button>
                <button
                  onClick={() => setActiveTab('practice')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Mock Quizzes
                </button>
                <button
                  onClick={() => setActiveTab('tracker')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Application Tracker
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400">
              <div>
                © 2026-2027 Training & Placement Cell · Class of 2027 Placement Suite
              </div>
              <div className="flex items-center gap-2">
                <span>Enterprise Student Platform</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Modals & Notifications */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
      />

      <SupabaseModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
        onRefreshCompleted={refreshCloudData}
      />

      <CompanyDetailModal
        company={selectedCompany}
        onClose={() => setSelectedCompanyId(null)}
        onApplySuccess={() => {
          setSelectedCompanyId(null);
          setActiveTab('tracker');
        }}
      />

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
