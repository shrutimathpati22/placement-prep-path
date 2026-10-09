import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../components/Sidebar';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  Calendar,
  Flag,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface PlacementRoadmapViewProps {
  setActiveTab: (tab: NavTab) => void;
}

export const PlacementRoadmapView: React.FC<PlacementRoadmapViewProps> = ({ setActiveTab }) => {
  const { roadmap, toggleMilestoneCompleted } = useApp();
  const [activeStage, setActiveStage] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  const displayedStages = roadmap.filter(
    (grp) => activeStage === 'All' || grp.stage === activeStage
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            4-Year Campus Placement Roadmap
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Structured career milestones organized by college year to remove guesswork and keep you on track.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('paths')}
          className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <span>Explore Learning Paths</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Stage Filters / Segmented Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((stg) => {
          const isSelected = activeStage === stg;
          return (
            <button
              key={stg}
              onClick={() => setActiveStage(stg)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div
                className={`text-xs font-bold ${
                  isSelected ? 'text-blue-900' : 'text-slate-800'
                }`}
              >
                {stg === 'All'
                  ? 'Full 4-Year Journey'
                  : stg === 'Beginner'
                  ? '1. Beginner (Sem 1-4)'
                  : stg === 'Intermediate'
                  ? '2. Intermediate (Sem 5-6)'
                  : '3. Advanced (Drive Sprint)'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {stg === 'All'
                  ? 'Complete overview'
                  : stg === 'Beginner'
                  ? 'Foundations & Habits'
                  : stg === 'Intermediate'
                  ? 'DSA & Core CS Mastery'
                  : 'Interviews & Test Series'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Stages and Milestones Cards */}
      <div className="space-y-8">
        {displayedStages.map((stageGroup) => {
          const total = stageGroup.milestones.length;
          const completedCount = stageGroup.milestones.filter((m) => m.completed).length;
          const stagePercent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

          return (
            <div
              key={stageGroup.stage}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6"
            >
              {/* Stage Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        stageGroup.stage === 'Beginner'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : stageGroup.stage === 'Intermediate'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}
                    >
                      {stageGroup.stage} Stage
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-semibold text-slate-600">
                      {stageGroup.targetAudience}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{stageGroup.stageTitle}</h2>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {stageGroup.description}
                  </p>
                </div>

                {/* Progress Dial */}
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900">
                      {completedCount} of {total} Done
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">Stage Progress</div>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-blue-600 flex items-center justify-center font-bold text-xs font-mono text-blue-700 bg-white">
                    {stagePercent}%
                  </div>
                </div>
              </div>

              {/* Milestones List */}
              <div className="space-y-3">
                {stageGroup.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    onClick={() =>
                      toggleMilestoneCompleted(stageGroup.stage, milestone.id)
                    }
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                      milestone.completed
                        ? 'bg-emerald-50/40 border-emerald-200 text-slate-700'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <button
                      className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-emerald-600 transition-colors"
                      aria-label="Toggle milestone completion"
                    >
                      {milestone.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4
                          className={`text-xs font-bold ${
                            milestone.completed
                              ? 'text-emerald-900 line-through'
                              : 'text-slate-900'
                          }`}
                        >
                          {milestone.title}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {milestone.category}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            milestone.priority === 'Essential'
                              ? 'bg-rose-50 text-rose-700'
                              : milestone.priority === 'High'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {milestone.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {milestone.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium pt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>Recommended: {milestone.recommendedTimeline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
