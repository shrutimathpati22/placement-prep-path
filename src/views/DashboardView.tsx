import React from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../components/Sidebar';
import {
  Sparkles,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  FileCode2,
  BrainCircuit,
  Award,
  ChevronRight,
  ShieldAlert,
  Briefcase,
  Flame,
  BookOpen,
  ArrowRight,
  Target,
  ListTodo,
} from 'lucide-react';

interface DashboardViewProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenCompanyDetail: (companyId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveTab,
  onOpenCompanyDetail,
}) => {
  const {
    currentUser,
    companies,
    notices,
    applications,
    readinessScore,
    solvedAptitude,
    solvedCoding,
    overallProgressPercent,
    quizAttempts,
    activities,
    applyToCompany,
  } = useApp();

  const urgentNotices = notices.filter((n) => n.urgent);
  const activeApps = applications.filter((a) => a.stage !== 'Not Selected');
  const offersReceived = applications.filter((a) => a.stage === 'Offer Received');

  const eligibleCompanies = companies.filter(
    (c) =>
      currentUser.cgpa >= c.eligibility.minCgpa &&
      (c.eligibility.allowedBranches.length === 0 ||
        c.eligibility.allowedBranches.includes(currentUser.branch))
  );

  const upcomingDrives = [...companies].sort(
    (a, b) => new Date(a.driveDate).getTime() - new Date(b.driveDate).getTime()
  );

  const avgQuizScore =
    quizAttempts.length > 0
      ? Math.round(
          quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / quizAttempts.length
        )
      : 80;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* SaaS Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 tracking-wide uppercase">
              <span>{currentUser.college}</span>
              <span aria-hidden="true">·</span>
              <span>{currentUser.yearOfStudy}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {currentUser.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your campus placement preparation is on track. Complete today's recommended lessons,
              keep your <strong className="text-amber-400">{currentUser.streakDays}-day streak</strong> alive,
              and review upcoming recruiter deadlines.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <span className="bg-white/10 px-2.5 py-1 rounded-md">
                CGPA: <strong className="text-white font-mono">{currentUser.cgpa}</strong>
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md">
                Completed Lessons: <strong className="text-white">{currentUser.completedLessonsCount}</strong>
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md">
                Curriculum Progress: <strong className="text-white font-mono">{overallProgressPercent}%</strong>
              </span>
            </div>
          </div>

          {/* Readiness Dial Card */}
          <div className="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 min-w-[260px] flex items-center gap-4">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400 transition-all duration-1000 ease-out"
                  strokeDasharray={`${readinessScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-white font-mono">{readinessScore}%</span>
                <span className="text-[9px] uppercase tracking-wider text-blue-200 font-bold">
                  Ready
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Placement Readiness
              </div>
              <p className="text-[11px] text-blue-200 mt-0.5 leading-snug">
                {readinessScore >= 80
                  ? 'Strong interview & test readiness!'
                  : 'Complete today\'s drills to reach 90%.'}
              </p>
              <button
                onClick={() => setActiveTab('progress')}
                className="mt-2 text-xs font-bold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 transition-colors cursor-pointer"
              >
                View Analytics <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clearly Labeled Statistics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Learning Progress</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {overallProgressPercent}%
          </div>
          <div className="mt-1 text-xs text-slate-500 flex items-center justify-between">
            <span>{currentUser.completedLessonsCount} lessons done</span>
            <button
              onClick={() => setActiveTab('paths')}
              className="text-blue-600 font-bold hover:underline"
            >
              Resume →
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Average Test Score</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">{avgQuizScore}%</div>
          <div className="mt-1 text-xs text-slate-500 flex items-center justify-between">
            <span>Across {quizAttempts.length} mock quizzes</span>
            <button
              onClick={() => setActiveTab('practice')}
              className="text-emerald-700 font-bold hover:underline"
            >
              Practice →
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Current Streak</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono">
            {currentUser.streakDays} Days 🔥
          </div>
          <div className="mt-1 text-xs text-slate-500">Active study consistency</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Applications</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{activeApps.length}</div>
          <div className="mt-1 text-xs text-slate-500 flex items-center justify-between">
            <span>{offersReceived.length} Offers received</span>
            <button
              onClick={() => setActiveTab('tracker')}
              className="text-purple-600 font-bold hover:underline"
            >
              Kanban →
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Activities & Upcoming Tasks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Activities */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Recommended Next Steps</h2>
                <p className="text-[11px] text-slate-500">Personalized to boost your placement score</p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {activities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white transition-all flex items-center justify-between gap-3 group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {act.title}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        act.priority === 'High'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {act.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{act.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {act.durationMinutes} mins
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (act.type === 'quiz' || act.type === 'coding') setActiveTab('practice');
                    else if (act.type === 'roadmap') setActiveTab('roadmap');
                    else setActiveTab('paths');
                  }}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-xs rounded-lg transition-colors flex-shrink-0 cursor-pointer"
                >
                  Start →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Placement Preparation Tasks */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <ListTodo className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Upcoming Placement Tasks</h2>
                <p className="text-[11px] text-slate-500">Deadlines and interview schedules</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('tracker')}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Tracker View →
            </button>
          </div>

          <div className="space-y-2.5">
            {applications.slice(0, 3).map((app) => (
              <div
                key={app.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{app.companyName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {app.stage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{app.jobRole}</p>
                  {app.nextRoundDate && (
                    <div className="text-[11px] text-indigo-700 font-medium flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" /> Scheduled: {app.nextRoundDate}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setActiveTab('tracker')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 p-1"
                >
                  Details →
                </button>
              </div>
            ))}

            <button
              onClick={() => setActiveTab('roadmap')}
              className="w-full py-2 px-3 text-xs font-bold rounded-xl border border-dashed border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all text-center"
            >
              + Review 4-Year Milestones in Roadmap
            </button>
          </div>
        </div>
      </div>

      {/* Urgent Placement Bulletins Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Placement Cell Announcements
              </h2>
              <p className="text-[11px] text-slate-500">Official directives and schedule alerts</p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium">Updated today</span>
        </div>

        <div className="divide-y divide-slate-100">
          {urgentNotices.slice(0, 2).map((notice) => (
            <div key={notice.id} className="p-5 bg-amber-50/40 flex items-start gap-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 flex-shrink-0">
                <ShieldAlert className="w-3 h-3 text-amber-700" />
                Urgent
              </span>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">{notice.title}</h3>
                  <span className="text-xs text-slate-500">{notice.date}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{notice.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Campus Recruitment Drives Grid (FOCUSED ELEMENT TARGET) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Campus Recruitment Drives on Horizon
            </h2>
            <p className="text-xs text-slate-500">Companies visiting campus this month</p>
          </div>
          <button
            onClick={() => setActiveTab('companies')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            View All ({companies.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingDrives.slice(0, 4).map((comp) => {
            const isEligible =
              currentUser.cgpa >= comp.eligibility.minCgpa &&
              (comp.eligibility.allowedBranches.length === 0 ||
                comp.eligibility.allowedBranches.includes(currentUser.branch));
            const isApplied = applications.some((a) => a.companyId === comp.id);

            return (
              <div
                key={comp.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-black text-base flex-shrink-0">
                      {comp.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{comp.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <span>{comp.tier}</span>
                        <span>·</span>
                        <span className="font-bold text-emerald-700 font-mono">{comp.ctc}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isEligible
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {isEligible ? `Eligible (Min ${comp.eligibility.minCgpa})` : `Min ${comp.eligibility.minCgpa} CGPA`}
                  </span>
                </div>

                <div className="text-xs text-slate-600 line-clamp-1 font-medium">
                  {comp.jobRole}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Drive: {comp.driveDate}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenCompanyDetail(comp.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Details
                    </button>

                    {isApplied ? (
                      <button
                        onClick={() => setActiveTab('tracker')}
                        className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        Applied
                      </button>
                    ) : (
                      <button
                        disabled={!isEligible}
                        onClick={() => applyToCompany(comp.id)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          isEligible
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
