import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  FlaskConical, 
  Atom, 
  Dna,
  CheckCircle,
  GraduationCap
} from 'lucide-react';

interface HeroSectionProps {
  onBrowseLessons: () => void;
  onExploreArticles: () => void;
  onExploreSubject: (slug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBrowseLessons,
  onExploreArticles,
  onExploreSubject
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-10 lg:p-12 shadow-elevated border border-blue-500/20">
      
      {/* Background Decorative Science Orbs & Subtle Grids */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-purple-500/25 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold text-blue-100 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Accredited Secondary & College STEM Education</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5">
          Explore. Learn. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent">
            Master Science.
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-2xl mb-8">
          Structured lessons, simplified concepts, better understanding. Connect with expert educators, high-yield revision papers, and interactive problem sets across secondary and college curricula.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={onBrowseLessons}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-blue-800 font-bold text-sm shadow-lg shadow-black/15 hover:bg-blue-50 hover:shadow-xl transition-all active:scale-95 group"
          >
            <span>Browse Lessons</span>
            <ArrowRight className="w-4 h-4 text-blue-700 group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={onExploreArticles}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-purple-200" />
            <span>Explore Articles</span>
          </button>
        </div>

        {/* Educational STEM Floating Pills */}
        <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          <div 
            onClick={() => onExploreSubject('mathematics')}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm cursor-pointer transition"
          >
            <div className="p-1.5 rounded-lg bg-blue-500/40 text-blue-200">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Mathematics</div>
              <div className="text-[10px] text-blue-200/80">ax² + bx + c = 0</div>
            </div>
          </div>

          <div 
            onClick={() => onExploreSubject('chemistry')}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm cursor-pointer transition"
          >
            <div className="p-1.5 rounded-lg bg-purple-500/40 text-purple-200">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Chemistry</div>
              <div className="text-[10px] text-purple-200/80">C₆H₁₂O₆ + 6O₂</div>
            </div>
          </div>

          <div 
            onClick={() => onExploreSubject('physics')}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm cursor-pointer transition"
          >
            <div className="p-1.5 rounded-lg bg-orange-500/40 text-orange-200">
              <Atom className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Physics</div>
              <div className="text-[10px] text-orange-200/80">F = ma & E = mc²</div>
            </div>
          </div>

          <div 
            onClick={() => onExploreSubject('biology')}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm cursor-pointer transition"
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/40 text-emerald-200">
              <Dna className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Biology</div>
              <div className="text-[10px] text-emerald-200/80">Double Helix DNA</div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
