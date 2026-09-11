import React from 'react';
import { 
  Play, 
  Flame, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  BookMarked,
  Sparkles
} from 'lucide-react';
import { LearnerProgress } from '../types/index.js';

interface ContinueLearningPanelProps {
  progress: LearnerProgress;
  onContinueCurrent: () => void;
  onSelectRecentLesson: (lessonId: number) => void;
  onGoPremium: () => void;
}

export const ContinueLearningPanel: React.FC<ContinueLearningPanelProps> = ({
  progress,
  onContinueCurrent,
  onSelectRecentLesson,
  onGoPremium
}) => {
  const current = progress.currentCourse;

  return (
    <div className="space-y-6">
      
      {/* 1. Continue Learning Main Card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-5 text-white shadow-elevated border border-blue-900/40 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-bold text-blue-300 uppercase tracking-wider text-[10px]">
              Continue Learning
            </span>
            <span className="bg-blue-600/60 text-blue-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
              Lesson {current.lessonNumber}
            </span>
          </div>

          <h4 className="text-base font-bold text-white mb-1 leading-snug">
            {current.courseTitle}
          </h4>
          <p className="text-xs text-blue-200/80 mb-4 font-medium">
            {current.topicName} · {current.lessonTitle}
          </p>

          {/* Progress Bar */}
          <div className="space-y-1.5 mb-5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Progress</span>
              <span className="text-white font-bold">{current.progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-500"
                style={{ width: `${current.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={onContinueCurrent}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Resume Lesson</span>
          </button>
        </div>
      </div>

      {/* 2. Key Learner Metric Pills */}
      <div className="grid grid-cols-2 gap-3">
        
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span className="text-[11px] font-bold uppercase text-slate-400">Streak</span>
          </div>
          <div className="text-xl font-black text-slate-900">
            {progress.streakDays} Days
          </div>
          <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Top 5% learner</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Award className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase text-slate-400">Avg Quiz</span>
          </div>
          <div className="text-xl font-black text-slate-900">
            {progress.averageQuizScore}%
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">Across 8 quizzes</p>
        </div>

      </div>

      {/* 3. Recent Lessons List */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Recently Viewed
          </h4>
          <span className="text-[10px] font-semibold text-slate-400">3 history</span>
        </div>

        <div className="space-y-2.5">
          {progress.recentLessons.map((l) => (
            <div 
              key={l.lessonId}
              onClick={() => onSelectRecentLesson(l.lessonId)}
              className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition cursor-pointer flex items-center justify-between"
            >
              <div className="text-left pr-2">
                <p className="text-xs font-bold text-slate-800 line-clamp-1">
                  {l.lessonTitle}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span className="font-semibold text-blue-600 capitalize">{l.subjectName}</span>
                  <span>•</span>
                  <span>{l.lastAccessed}</span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-[11px] font-extrabold text-slate-700">
                  {l.progressPercent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Upgrade Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200/60 text-left">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-bold text-purple-900">Unlock Full Access</span>
        </div>
        <p className="text-xs text-slate-600 mb-3 leading-snug">
          Access all 2,000+ past exam papers, teacher Q&A, and advanced college modules.
        </p>
        <button 
          onClick={onGoPremium}
          className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition"
        >
          View Plans (from KSh 499)
        </button>
      </div>

    </div>
  );
};
