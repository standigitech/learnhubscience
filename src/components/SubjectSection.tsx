import React from 'react';
import { 
  Calculator, 
  FlaskConical, 
  Atom, 
  Dna, 
  ArrowRight,
  BookOpen,
  Users
} from 'lucide-react';
import { Subject } from '../types/index.js';

interface SubjectSectionProps {
  subjects: Subject[];
  onSelectSubject: (slug: string) => void;
  onSelectTopic: (subjectSlug: string, topicSlug: string) => void;
}

export const SubjectSection: React.FC<SubjectSectionProps> = ({
  subjects,
  onSelectSubject,
  onSelectTopic
}) => {
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-6 h-6" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6" />;
      case 'Atom':
        return <Atom className="w-6 h-6" />;
      case 'Dna':
        return <Dna className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  const getStyleForSubject = (slug: string) => {
    switch (slug) {
      case 'mathematics':
        return {
          cardBorder: 'hover:border-sky-300',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          iconBg: 'bg-sky-600 text-white shadow-sky-500/20',
          tagHover: 'hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300',
          buttonClass: 'bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white',
        };
      case 'chemistry':
        return {
          cardBorder: 'hover:border-purple-300',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          iconBg: 'bg-purple-600 text-white shadow-purple-500/20',
          tagHover: 'hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300',
          buttonClass: 'bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white',
        };
      case 'physics':
        return {
          cardBorder: 'hover:border-orange-300',
          badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
          iconBg: 'bg-orange-500 text-white shadow-orange-500/20',
          tagHover: 'hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300',
          buttonClass: 'bg-orange-50 text-orange-700 hover:bg-orange-500 hover:text-white',
        };
      case 'biology':
        return {
          cardBorder: 'hover:border-emerald-300',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          iconBg: 'bg-emerald-600 text-white shadow-emerald-500/20',
          tagHover: 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300',
          buttonClass: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white',
        };
      default:
        return {
          cardBorder: 'hover:border-blue-300',
          badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
          iconBg: 'bg-blue-600 text-white shadow-blue-500/20',
          tagHover: 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300',
          buttonClass: 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white',
        };
    }
  };

  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Core Disciplines</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Subjects
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md">
          Secondary school syllabus (Form 1–4, KCSE, IGCSE) and college foundational STEM coursework.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {subjects.map((subj) => {
          const style = getStyleForSubject(subj.slug);
          return (
            <div 
              key={subj.id}
              className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group ${style.cardBorder}`}
            >
              <div>
                {/* Subject Icon + Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${style.iconBg} transition-transform group-hover:scale-105`}>
                    {getSubjectIcon(subj.iconName)}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${style.badgeBg}`}>
                    {subj.coursesCount} Courses
                  </span>
                </div>

                {/* Subject Name & Tagline */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {subj.name}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mb-2">
                  {subj.tagline}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {subj.description}
                </p>

                {/* Topics Tag Cloud */}
                <div className="mb-6">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Key Topics:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {subj.topics.slice(0, 5).map((t) => (
                      <button
                        key={t.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTopic(subj.slug, t.slug);
                        }}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/70 transition ${style.tagHover}`}
                      >
                        {t.name}
                      </button>
                    ))}
                    {subj.topics.length > 5 && (
                      <span className="text-[11px] font-medium px-2 py-1 text-slate-400">
                        +{subj.topics.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Explore Button */}
              <button 
                onClick={() => onSelectSubject(subj.slug)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${style.buttonClass}`}
              >
                <span>Explore {subj.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          );
        })}
      </div>

    </section>
  );
};
