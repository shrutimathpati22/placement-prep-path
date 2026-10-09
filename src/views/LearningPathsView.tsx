import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LearningPath } from '../types';
import { NavTab } from '../components/Sidebar';
import {
  BrainCircuit,
  Binary,
  Code,
  Server,
  UserCheck,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  X,
  Play,
  RotateCcw,
  ChevronRight,
  Award,
} from 'lucide-react';

interface LearningPathsViewProps {
  setActiveTab: (tab: NavTab) => void;
}

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({ setActiveTab }) => {
  const { learningPaths, toggleLessonCompleted } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePathModal, setActivePathModal] = useState<LearningPath | null>(null);

  const categories = [
    'All',
    'Aptitude Preparation',
    'Data Structures and Algorithms',
    'Programming Fundamentals',
    'Technical Interview Preparation',
    'HR Interview Preparation',
    'Communication Skills',
  ];

  const getPathIcon = (name: string) => {
    switch (name) {
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5" />;
      case 'Binary':
        return <Binary className="w-5 h-5" />;
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const filteredPaths = learningPaths.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Curated Learning Paths
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Structured curriculums engineered for college placements from day one to final interview offer.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('practice')}
          className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <BrainCircuit className="w-4 h-4" /> Go to Practice Center
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-semibold">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path) => {
          const percent = Math.round((path.completedLessons / path.totalLessons) * 100);

          return (
            <div
              key={path.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
                    {getPathIcon(path.iconName)}
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      path.difficulty === 'Beginner'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : path.difficulty === 'Intermediate'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}
                  >
                    {path.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                    {path.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {path.estimatedDuration}
                  </span>
                  <span>·</span>
                  <span>{path.totalLessons} Total Lessons</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Course Progress</span>
                    <span className="font-bold text-slate-900 font-mono">{percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {path.completedLessons} of {path.totalLessons} finished
                </span>
                <button
                  onClick={() => setActivePathModal(path)}
                  className="px-3.5 py-1.5 text-xs font-bold text-blue-700 hover:text-white hover:bg-blue-600 border border-blue-200 rounded-lg transition-all flex items-center gap-1"
                >
                  <span>View Lessons</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Curriculum & Lessons Modal */}
      {activePathModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-blue-700 font-bold uppercase tracking-wider">
                  <span>{activePathModal.category}</span>
                  <span>·</span>
                  <span>{activePathModal.difficulty}</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 mt-0.5">
                  {activePathModal.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1">{activePathModal.description}</p>
              </div>

              <button
                onClick={() => setActivePathModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activePathModal.modules.map((mod, modIdx) => (
                <div key={mod.id} className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 text-[10px] flex items-center justify-center font-bold">
                      {modIdx + 1}
                    </span>
                    <span>{mod.title}</span>
                  </h4>

                  <div className="space-y-2">
                    {mod.lessons.map((les) => (
                      <div
                        key={les.id}
                        className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                          les.completed
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold ${
                                les.completed ? 'text-emerald-900 line-through' : 'text-slate-900'
                              }`}
                            >
                              {les.title}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {les.durationMinutes} mins
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{les.summary}</p>
                        </div>

                        <button
                          onClick={() =>
                            toggleLessonCompleted(activePathModal.id, mod.id, les.id)
                          }
                          className={`p-1.5 rounded-lg border transition-all flex-shrink-0 ${
                            les.completed
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-emerald-600 hover:border-emerald-300'
                          }`}
                          title={les.completed ? 'Mark uncompleted' : 'Mark completed'}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Click the checkmark to record lesson completion.
              </span>
              <button
                onClick={() => {
                  setActivePathModal(null);
                  setActiveTab('practice');
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
              >
                Launch Associated Practice Drills
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
