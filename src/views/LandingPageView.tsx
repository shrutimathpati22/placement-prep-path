import React from 'react';
import { NavTab } from '../components/Sidebar';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Binary,
  Kanban,
  Award,
  Users,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  BookOpen,
  Building2,
  GraduationCap,
} from 'lucide-react';

interface LandingPageViewProps {
  onGetStarted: () => void;
  setActiveTab: (tab: NavTab) => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onGetStarted,
  setActiveTab,
}) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white p-8 sm:p-14 lg:p-16 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 -mb-20 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Placement Acceleration Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Your Campus Placement <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
              Journey Starts Here.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Whether you are a 1st-year exploring coding or a final-year sprint candidate, Placement Prep Path
            organizes your entire placement preparation into structured learning paths, aptitude drills,
            coding arenas, and real-time campus recruitment drives.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onGetStarted}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 group cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-xl border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore 4-Year Roadmap</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <div className="text-2xl font-black text-white font-mono">94%</div>
              <div className="text-xs text-slate-400">Campus Selection Rate</div>
            </div>
            <div>
              <div className="text-2xl font-black text-blue-400 font-mono">₹38.5 LPA</div>
              <div className="text-xs text-slate-400">Highest Package Offered</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400 font-mono">6 Paths</div>
              <div className="text-xs text-slate-400">Structured Curriculums</div>
            </div>
            <div>
              <div className="text-2xl font-black text-indigo-400 font-mono">150+</div>
              <div className="text-xs text-slate-400">Visiting Campus Recruiters</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Why Students Struggle
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The Problem vs. The Placement Prep Path Solution
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Campus placements are high-stakes, but the traditional preparation process is fragmented and stressful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem Card */}
          <div className="bg-rose-50/50 rounded-2xl border border-rose-200 p-6 sm:p-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-rose-800 font-bold text-sm uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              The Campus Placement Challenge
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span>
                  <strong>Fragmented preparation:</strong> Students jump aimlessly between YouTube videos, random PDF sheets, and uncurated question banks.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span>
                  <strong>Unprepared for screening tests:</strong> 65% of students fail online aptitude rounds despite being decent coders.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span>
                  <strong>Missed deadlines & cutoffs:</strong> Confusing T&P WhatsApp groups lead to missed registrations and eligibility confusion.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span>
                  <strong>Zero round visibility:</strong> No centralized place to track assessment links, tech interviews, and HR feedback.
                </span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="bg-blue-50/50 rounded-2xl border border-blue-200 p-6 sm:p-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-blue-800 font-bold text-sm uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              Our Unified Solution
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Curated 6 Learning Paths:</strong> Step-by-step tracks for Aptitude, DSA, Core CS, and HR behavioral preparation.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Interactive Practice Arena:</strong> Timed aptitude tests with detailed solution steps and verified LeetCode-style code runner.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Direct Recruiter Integration:</strong> 1-click eligibility checker matching CGPA & branch against company requirements.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Kanban Application Tracker:</strong> Visually follow every drive from OA to technical interview to confirmed offer.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Get Hired
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A comprehensive suite engineered for college students and training & placement cells.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">6 Guided Learning Paths</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bite-sized structured modules covering Aptitude, Data Structures, Programming Fundamentals, CS Core, HR, and Communication.
            </p>
            <button
              onClick={() => setActiveTab('paths')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 pt-1"
            >
              Browse Paths →
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Practice Center & Quizzes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Solve quantitative and logical aptitude tests with instant score reports, timer constraints, and step-by-step mathematical solutions.
            </p>
            <button
              onClick={() => setActiveTab('practice')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 pt-1"
            >
              Start Practice →
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3-Stage Placement Roadmap</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track progression across Beginner (Sem 1-4), Intermediate (Sem 5-6), and Advanced (Pre-Placement) milestones.
            </p>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 pt-1"
            >
              View Roadmap →
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Verified Recruiter Directory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore companies visiting campus (Google, Microsoft, Goldman Sachs, Cisco), check package tiers, cutoffs, and selection rounds.
            </p>
            <button
              onClick={() => setActiveTab('companies')}
              className="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1 pt-1"
            >
              View Companies →
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-400 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Kanban className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Placement Kanban Tracker</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manage all applications in one board: Applied → OA Round → Technical Interview → HR Round → Offer Received.
            </p>
            <button
              onClick={() => setActiveTab('tracker')}
              className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 pt-1"
            >
              Open Tracker →
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-cyan-400 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">STAR Method Interview Prep</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Crack HR and managerial rounds using battle-tested behavioral frameworks and alumni-reported interview questions.
            </p>
            <button
              onClick={() => setActiveTab('practice')}
              className="text-xs font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-1 pt-1"
            >
              Review HR Guides →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Success Stories from the Class of 2026
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Read how seniors used Placement Prep Path to land Super Dream offers.
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg self-start sm:self-auto">
            100% Verified Placements
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "The Aptitude Drills and LeetCode problem curation saved me weeks of aimless searching. Cracking Google's OA on HackerEarth felt natural because the test patterns were identical."
            </p>
            <div className="pt-2 border-t border-slate-700/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-xs">
                RT
              </div>
              <div>
                <div className="text-xs font-bold text-white">Rohan Tiwari</div>
                <div className="text-[11px] text-emerald-400 font-medium">Placed at Google (₹38.5 LPA)</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "As an ECE student, I was nervous about Core CS topics like DBMS ACID and OS Deadlocks. The technical interview cheat sheets gave me exact crisp answers that interviewers loved."
            </p>
            <div className="pt-2 border-t border-slate-700/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-xs">
                SK
              </div>
              <div>
                <div className="text-xs font-bold text-white">Sneha Kulkarni</div>
                <div className="text-[11px] text-blue-400 font-medium">Placed at Microsoft (₹28.0 LPA)</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "The Kanban tracker prevented me from missing any online test deadlines. Being able to log interview notes and review feedback between rounds was a game changer."
            </p>
            <div className="pt-2 border-t border-slate-700/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center text-xs">
                AM
              </div>
              <div>
                <div className="text-xs font-bold text-white">Ananya Mishra</div>
                <div className="text-[11px] text-indigo-400 font-medium">Placed at Goldman Sachs (₹24.0 LPA)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-5">
        <h2 className="text-2xl sm:text-3xl font-black">
          Ready to Start Your Campus Placement Journey?
        </h2>
        <p className="text-sm text-blue-100 max-w-xl mx-auto">
          Sign in to your student dashboard, assess your current readiness score, and begin your personalized preparation path today.
        </p>
        <button
          onClick={onGetStarted}
          className="px-8 py-3.5 bg-white text-blue-700 font-black text-sm rounded-xl hover:bg-blue-50 transition-colors shadow-lg cursor-pointer"
        >
          Launch Student Dashboard Now
        </button>
      </section>
    </div>
  );
};
