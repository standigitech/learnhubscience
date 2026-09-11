import React from 'react';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Course } from '../types/index.js';

interface PopularLessonsProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onViewFlagshipLesson: () => void;
  onAddToCart: (course: Course) => void;
}

export const PopularLessons: React.FC<PopularLessonsProps> = ({
  courses,
  onSelectCourse,
  onViewFlagshipLesson,
  onAddToCart
}) => {
  const getSubjectBadge = (subjectSlug: string) => {
    switch (subjectSlug) {
      case 'mathematics':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'chemistry':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'physics':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'biology':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Featured Curriculum</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Lessons & Courses
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Highly rated by over 12,000 secondary and college STEM learners.
        </p>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {courses.slice(0, 4).map((c) => (
          <div 
            key={c.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group"
          >
            {/* Thumbnail Header */}
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img 
                  src={c.thumbnailUrl} 
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subject Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border shadow-xs ${getSubjectBadge(c.subjectSlug)}`}>
                    {c.subjectSlug}
                  </span>
                </div>

                {/* Free vs Premium Tag */}
                <div className="absolute top-3 right-3">
                  {c.isPremium ? (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-amber-300 backdrop-blur-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Premium
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
                      Free Access
                    </span>
                  )}
                </div>

                {/* Play hover overlay */}
                <div 
                  onClick={() => {
                    if (c.id === 1) onViewFlagshipLesson();
                    else onSelectCourse(c);
                  }}
                  className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-[2px]"
                >
                  <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <PlayCircle className="w-6 h-6 fill-blue-600 text-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
                  <span className="text-slate-600 font-semibold">{c.topicName}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{c.rating}</span>
                    <span className="text-slate-400 text-[11px]">({c.reviewCount})</span>
                  </div>
                </div>

                <h3 
                  onClick={() => {
                    if (c.id === 1) onViewFlagshipLesson();
                    else onSelectCourse(c);
                  }}
                  className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
                >
                  {c.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {c.description}
                </p>

                {/* Teacher Details */}
                <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100 mb-4">
                  <img 
                    src={c.teacherAvatar} 
                    alt={c.teacherName}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-700 leading-none">{c.teacherName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{c.level}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Price and View Button */}
            <div className="px-5 pb-5 pt-0">
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Tuition Price</div>
                  <div className="text-base font-extrabold text-slate-900">
                    {c.priceKsh > 0 ? `KSh ${c.priceKsh}` : 'Free'}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (c.id === 1) onViewFlagshipLesson();
                    else onSelectCourse(c);
                  }}
                  className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition"
                >
                  <span>View Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
