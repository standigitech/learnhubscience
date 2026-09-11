import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  FolderDown, 
  CheckSquare, 
  ArrowLeft, 
  ArrowRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  RotateCcw,
  Calculator
} from 'lucide-react';
import { Lesson, Resource } from '../types/index.js';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onLaunchQuiz: (quizId: number) => void;
  onDownloadResource: (resource: Resource) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onBack,
  onLaunchQuiz,
  onDownloadResource
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'video' | 'resources' | 'practice'>('content');

  // Interactive Quadratic Equation Solver Widget state
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(-5);
  const [coeffC, setCoeffC] = useState<number>(6);

  // Compute roots and discriminant
  const discriminant = (coeffB * coeffB) - (4 * coeffA * coeffC);
  let rootsResult = '';
  if (coeffA === 0) {
    rootsResult = 'Coefficient "a" cannot be 0 in a quadratic equation!';
  } else if (discriminant > 0) {
    const r1 = ((-coeffB + Math.sqrt(discriminant)) / (2 * coeffA)).toFixed(2);
    const r2 = ((-coeffB - Math.sqrt(discriminant)) / (2 * coeffA)).toFixed(2);
    rootsResult = `Two real distinct roots: x₁ = ${r1},  x₂ = ${r2}`;
  } else if (discriminant === 0) {
    const r = (-coeffB / (2 * coeffA)).toFixed(2);
    rootsResult = `One repeated real root: x = ${r}`;
  } else {
    const realPart = (-coeffB / (2 * coeffA)).toFixed(2);
    const imagPart = (Math.sqrt(-discriminant) / (2 * coeffA)).toFixed(2);
    rootsResult = `Two complex roots: x = ${realPart} ± ${imagPart}i`;
  }

  // Interactive Practice Questions quick check
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, boolean>>({});
  const togglePracticeReveal = (idx: number) => {
    setPracticeAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Top Breadcrumb & Action bar */}
      <div className="flex items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curriculum</span>
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${
              isBookmarked 
                ? 'bg-amber-50 text-amber-700 border-amber-300' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button 
            onClick={() => alert("Link copied to clipboard!")}
            className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-50 text-xs"
            title="Share Lesson"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lesson Banner Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-sky-100 text-sky-800">
            {lesson.subjectName}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
            {lesson.topicName}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
            Lesson {lesson.orderIndex} of 8
          </span>
          <span className="text-xs font-semibold text-slate-400 ml-auto">
            ⏱ {lesson.durationMinutes} mins study time
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          {lesson.title}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-6">
          {lesson.introduction}
        </p>

        {/* Teacher Attribution Row */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <img 
              src={lesson.teacherAvatar} 
              alt={lesson.teacherName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">{lesson.teacherName}</p>
              <p className="text-xs text-slate-400">{lesson.teacherTitle}</p>
            </div>
          </div>

          <button 
            onClick={() => onLaunchQuiz(lesson.quizId || 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Take Graded Quiz</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-bold">
        <button 
          onClick={() => setActiveTab('content')}
          className={`pb-3 px-1 border-b-2 transition ${
            activeTab === 'content' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Lesson Text & Concepts (9 Sections)
        </button>
        <button 
          onClick={() => setActiveTab('video')}
          className={`pb-3 px-1 border-b-2 transition ${
            activeTab === 'video' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Video Classroom ({lesson.videoDuration})
        </button>
        <button 
          onClick={() => setActiveTab('practice')}
          className={`pb-3 px-1 border-b-2 transition ${
            activeTab === 'practice' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Interactive Equation Solver
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`pb-3 px-1 border-b-2 transition ${
            activeTab === 'resources' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Downloads ({lesson.resources.length})
        </button>
      </div>

      {/* TAB 1: Structured Content (9 Sections) */}
      {activeTab === 'content' && (
        <div className="space-y-8">
          
          {/* Objectives Card */}
          <div className="bg-blue-50/70 rounded-2xl p-6 border border-blue-200/60">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Core Learning Objectives</span>
            </h3>
            <ul className="space-y-2.5">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Render 9 Content Sections */}
          <div className="space-y-6">
            {lesson.sections.map((section) => (
              <div 
                key={section.id} 
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {section.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {section.content}
                </p>

                {/* Mathematical Formula Callout */}
                {section.formula && (
                  <div className="my-4 p-5 rounded-2xl bg-slate-900 text-white font-mono text-center shadow-inner">
                    <div className="text-lg sm:text-2xl font-bold text-sky-400">
                      {section.formula}
                    </div>
                    {section.formulaExplanation && (
                      <p className="text-xs text-slate-400 mt-2 font-sans">
                        {section.formulaExplanation}
                      </p>
                    )}
                  </div>
                )}

                {/* Callout box (Tip, Warning, Key Concept) */}
                {section.callout && (
                  <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                    section.callout.type === 'warning' 
                      ? 'bg-amber-50 border-amber-200 text-amber-900' 
                      : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                  }`}>
                    {section.callout.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Lightbulb className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs leading-relaxed whitespace-pre-line font-medium">
                      {section.callout.text}
                    </div>
                  </div>
                )}

                {/* Worked Example */}
                {section.workedExample && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      Step-by-Step Worked Demonstration:
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      {section.workedExample.problem}
                    </div>
                    <div className="space-y-1.5 pl-2 border-l-2 border-purple-300">
                      {section.workedExample.steps.map((st, i) => (
                        <div key={i} className="text-xs text-slate-600">
                          <strong className="text-slate-800">Step {i + 1}:</strong> {st}
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-purple-100/70 text-purple-900 rounded-xl text-xs font-bold">
                      Final Result: {section.workedExample.answer}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Bottom Action Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated">
            <div>
              <h4 className="text-lg font-bold">Ready to benchmark your knowledge?</h4>
              <p className="text-xs text-blue-100">Take the 5-question mastery quiz to update your student transcript.</p>
            </div>
            <button 
              onClick={() => onLaunchQuiz(lesson.quizId || 1)}
              className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition shadow-md whitespace-nowrap"
            >
              Start Lesson Quiz
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: Video Classroom */}
      {activeTab === 'video' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-elevated">
            <iframe 
              src={lesson.videoUrl} 
              title={lesson.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Video Timestamps & Key Moments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-semibold text-slate-700">00:00 — Introduction & Definition</span>
                <span className="font-bold text-blue-600">00:00</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-semibold text-slate-700">03:45 — Factoring Quadratics</span>
                <span className="font-bold text-blue-600">03:45</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-semibold text-slate-700">08:12 — Completing the Square</span>
                <span className="font-bold text-blue-600">08:12</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-semibold text-slate-700">13:30 — The Quadratic Formula & Discriminant</span>
                <span className="font-bold text-blue-600">13:30</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Interactive Equation Solver */}
      {activeTab === 'practice' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-2xl bg-blue-100 text-blue-600">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Interactive Quadratic Root Solver & Discriminant Visualizer
              </h3>
              <p className="text-xs text-slate-500">
                Adjust polynomial coefficients a, b, and c to compute roots and observe discriminant behavior in real time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Coefficient a (ax²):</label>
              <input 
                type="number"
                value={coeffA}
                onChange={(e) => setCoeffA(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Coefficient b (bx):</label>
              <input 
                type="number"
                value={coeffB}
                onChange={(e) => setCoeffB(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Constant c:</label>
              <input 
                type="number"
                value={coeffC}
                onChange={(e) => setCoeffC(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Equation Display */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-3">
            <div className="text-xs uppercase font-bold text-slate-400">Resulting Equation:</div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-400">
              {coeffA}x² {coeffB >= 0 ? `+ ${coeffB}x` : `- ${Math.abs(coeffB)}x`} {coeffC >= 0 ? `+ ${coeffC}` : `- ${Math.abs(coeffC)}`} = 0
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <div>
                Discriminant Δ = b² - 4ac = <strong className="text-amber-400">{discriminant}</strong>
              </div>
              <div>
                Parabola orientation: <strong className="text-emerald-400">{coeffA > 0 ? 'Opens Upwards (Min)' : 'Opens Downwards (Max)'}</strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 text-sm font-bold text-white mt-2">
              {rootsResult}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs font-bold text-slate-500">Test Preset Problems:</span>
            <button 
              onClick={() => { setCoeffA(1); setCoeffB(-5); setCoeffC(6); }}
              className="text-xs font-medium px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              x² - 5x + 6 = 0 (Roots 2, 3)
            </button>
            <button 
              onClick={() => { setCoeffA(1); setCoeffB(-4); setCoeffC(4); }}
              className="text-xs font-medium px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              x² - 4x + 4 = 0 (Double Root 2)
            </button>
            <button 
              onClick={() => { setCoeffA(1); setCoeffB(0); setCoeffC(9); }}
              className="text-xs font-medium px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              x² + 9 = 0 (Complex ±3i)
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: Downloadable Resources */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Lesson Files & Study Guides</h3>
          <div className="space-y-3">
            {lesson.resources.map((r) => (
              <div 
                key={r.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{r.title}</h4>
                    <p className="text-xs text-slate-400">
                      {r.fileSize} · {r.downloadsCount} downloads · {r.level}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => onDownloadResource(r)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-bold text-xs shadow-xs transition"
                >
                  <FolderDown className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prev / Next Lesson Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Linear Equations</span>
        </button>

        <button 
          onClick={() => onLaunchQuiz(lesson.quizId || 1)}
          className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
        >
          <span>Next: Complete Quiz & Advance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
