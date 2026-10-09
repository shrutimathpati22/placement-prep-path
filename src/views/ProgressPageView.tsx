import React from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../components/Sidebar';
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Flame,
  Sparkles,
  BookOpen,
  BrainCircuit,
  Trophy,
  ArrowRight,
} from 'lucide-react';

interface ProgressPageViewProps {
  setActiveTab: (tab: NavTab) => void;
}

export const ProgressPageView: React.FC<ProgressPageViewProps> = ({ setActiveTab }) => {
  const {
    currentUser,
    learningPaths,
    quizAttempts,
    overallProgressPercent,
    readinessScore,
    solvedAptitude,
    solvedCoding,
  } = useApp();

  // Weekly study activity dots mock
  const weekDays = [
    { day: 'Mon', active: true, minutes: 45 },
    { day: 'Tue', active: true, minutes: 60 },
    { day: 'Wed', active: true, minutes: 30 },
    { day: 'Thu', active: true, minutes: 90 },
    { day: 'Fri', active: true, minutes: 50 },
    { day: 'Sat', active: true, minutes: 80 },
    { day: 'Sun', active: true, minutes: 40 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Learning Progress & Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time analytics across your course completions, test attempts, and campus readiness.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('practice')}
          className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <BrainCircuit className="w-4 h-4" /> Take New Assessment
        </button>
      </div>

      {/* Top 4 Metric Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Overall Curriculum
          </span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1">
            {overallProgressPercent}%
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {currentUser.completedLessonsCount} lessons finished
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Placement Readiness
          </span>
          <div className="text-2xl font-black text-blue-600 font-mono mt-1">
            {readinessScore}%
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
            Ready for Super Dream tests
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Study Streak
          </span>
          <div className="text-2xl font-black text-amber-600 font-mono mt-1 flex items-center gap-1.5">
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
            {currentUser.streakDays} Days
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Consistency multiplier: 1.2x</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Problems Solved
          </span>
          <div className="text-2xl font-black text-indigo-600 font-mono mt-1">
            {solvedCoding.length + solvedAptitude.length}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {solvedCoding.length} Coding · {solvedAptitude.length} Aptitude
          </span>
        </div>
      </div>

      {/* Grid: Domain Breakdown Progress Bars & Weekly Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 Cols): Domain Progress Bars */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Curriculum Progression by Domain
              </h2>
              <p className="text-xs text-slate-500">Track balance across all 6 learning paths</p>
            </div>
            <button
              onClick={() => setActiveTab('paths')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Manage Paths →
            </button>
          </div>

          <div className="space-y-4">
            {learningPaths.map((path) => {
              const pct = Math.round((path.completedLessons / path.totalLessons) * 100);

              return (
                <div key={path.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{path.title}</span>
                    <span className="font-mono text-slate-600">
                      {path.completedLessons}/{path.totalLessons} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Study Activity Heatmap & Insights */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Weekly Consistency</h2>
            <p className="text-xs text-slate-500">Study activity logged this week</p>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center pt-2">
            {weekDays.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div
                  className="w-full h-16 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center p-1"
                  title={`${item.minutes} minutes studied`}
                >
                  <span className="text-xs font-mono font-bold text-blue-700">
                    {item.minutes}m
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-900 block">💡 Learning Recommendation:</span>
            <p className="text-[11px] leading-relaxed">
              You are maintaining a strong streak! To increase your overall Readiness Score past 90%, take 2 more practice quizzes in <strong>Data Structures</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Attempt History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Mock Assessment & Quiz Scorecard History
            </h2>
            <p className="text-xs text-slate-500">
              Validated scores and response percentages from the Practice Center
            </p>
          </div>

          <span className="text-xs text-slate-500">
            {quizAttempts.length} Assessments Taken
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-5 py-3">Assessment Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Score & Accuracy</th>
                <th className="px-5 py-3">Date Completed</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quizAttempts.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-900">{attempt.title}</td>
                  <td className="px-5 py-3.5 text-slate-600">{attempt.category}</td>
                  <td className="px-5 py-3.5 font-mono">
                    <span className="font-bold text-slate-900">
                      {attempt.score}/{attempt.totalQuestions}
                    </span>{' '}
                    <span className="text-blue-700 font-semibold">({attempt.percentage}%)</span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{attempt.date}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        attempt.passed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {attempt.passed ? 'PASSED' : 'NEEDS PRACTICE'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
