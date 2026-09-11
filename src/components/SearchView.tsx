import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  FileText, 
  FolderDown, 
  CheckSquare, 
  Sparkles, 
  Star, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { Course, Article, Resource, Subject } from '../types/index.js';

interface SearchViewProps {
  initialQuery: string;
  courses: Course[];
  articles: Article[];
  resources: Resource[];
  subjects: Subject[];
  onSelectCourse: (c: Course) => void;
  onSelectArticle: (a: Article) => void;
  onSelectResource: (r: Resource) => void;
  onViewLesson: () => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  initialQuery,
  courses,
  articles,
  resources,
  subjects,
  onSelectCourse,
  onSelectArticle,
  onSelectResource,
  onViewLesson
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedContentType, setSelectedContentType] = useState<string>('all'); // all | course | article | resource
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>('all'); // all | free | premium

  // Multi-type search indexing
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1. Filter Courses
    const matchedCourses = courses
      .filter((c) => {
        const matchesQuery = !q || 
          c.title.toLowerCase().includes(q) || 
          c.description.toLowerCase().includes(q) || 
          c.topicName.toLowerCase().includes(q) ||
          c.teacherName.toLowerCase().includes(q);
        const matchesSubj = selectedSubject === 'all' || c.subjectSlug === selectedSubject;
        const matchesDiff = selectedDifficulty === 'all' || c.difficulty === selectedDifficulty;
        const matchesPrice = selectedPriceFilter === 'all' || (selectedPriceFilter === 'free' ? !c.isPremium : c.isPremium);
        const matchesType = selectedContentType === 'all' || selectedContentType === 'course';
        return matchesQuery && matchesSubj && matchesDiff && matchesPrice && matchesType;
      })
      .map(c => ({ ...c, itemType: 'course' as const }));

    // 2. Filter Articles
    const matchedArticles = articles
      .filter((a) => {
        const matchesQuery = !q || 
          a.title.toLowerCase().includes(q) || 
          a.shortDescription.toLowerCase().includes(q) ||
          a.authorName.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q));
        const matchesSubj = selectedSubject === 'all' || a.subjectSlug === selectedSubject;
        const matchesPrice = selectedPriceFilter === 'all' || (selectedPriceFilter === 'free' ? !a.isPremium : a.isPremium);
        const matchesType = selectedContentType === 'all' || selectedContentType === 'article';
        return matchesQuery && matchesSubj && matchesPrice && matchesType;
      })
      .map(a => ({ ...a, itemType: 'article' as const }));

    // 3. Filter Resources
    const matchedResources = resources
      .filter((r) => {
        const matchesQuery = !q || 
          r.title.toLowerCase().includes(q) || 
          r.resourceType.toLowerCase().includes(q);
        const matchesSubj = selectedSubject === 'all' || r.subjectSlug === selectedSubject;
        const matchesPrice = selectedPriceFilter === 'all' || (selectedPriceFilter === 'free' ? !r.isPremium : r.isPremium);
        const matchesType = selectedContentType === 'all' || selectedContentType === 'resource';
        return matchesQuery && matchesSubj && matchesPrice && matchesType;
      })
      .map(r => ({ ...r, itemType: 'resource' as const }));

    return {
      courses: matchedCourses,
      articles: matchedArticles,
      resources: matchedResources,
      totalCount: matchedCourses.length + matchedArticles.length + matchedResources.length
    };
  }, [query, selectedSubject, selectedContentType, selectedDifficulty, selectedPriceFilter, courses, articles, resources]);

  return (
    <div className="space-y-6">
      
      {/* Search Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Global Knowledge Discovery</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 mb-4">
            Search Lessons, Topics & Articles
          </h1>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Quadratic equations, Organic reactions, Newton's laws, Cell division..."
              className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 rounded-2xl pl-12 pr-4 py-3.5 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm font-medium outline-none transition"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Multi-facet Filter Pills */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
          
          <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[10px] mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Subject Filter */}
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-semibold rounded-xl px-3 py-1.5 border-none outline-none cursor-pointer"
          >
            <option value="all">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="chemistry">Chemistry</option>
            <option value="physics">Physics</option>
            <option value="biology">Biology</option>
          </select>

          {/* Content Type Filter */}
          <select 
            value={selectedContentType} 
            onChange={(e) => setSelectedContentType(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-semibold rounded-xl px-3 py-1.5 border-none outline-none cursor-pointer"
          >
            <option value="all">All Content Types</option>
            <option value="course">Lessons & Courses</option>
            <option value="article">Articles & Guides</option>
            <option value="resource">Downloadable Notes</option>
          </select>

          {/* Difficulty Filter */}
          <select 
            value={selectedDifficulty} 
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-semibold rounded-xl px-3 py-1.5 border-none outline-none cursor-pointer"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Free vs Premium */}
          <select 
            value={selectedPriceFilter} 
            onChange={(e) => setSelectedPriceFilter(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-semibold rounded-xl px-3 py-1.5 border-none outline-none cursor-pointer"
          >
            <option value="all">Free & Premium</option>
            <option value="free">Free Only</option>
            <option value="premium">Premium Only</option>
          </select>

          {/* Reset Filters */}
          {(selectedSubject !== 'all' || selectedContentType !== 'all' || selectedDifficulty !== 'all' || selectedPriceFilter !== 'all') && (
            <button 
              onClick={() => {
                setSelectedSubject('all');
                setSelectedContentType('all');
                setSelectedDifficulty('all');
                setSelectedPriceFilter('all');
              }}
              className="text-blue-600 font-bold hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}

        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Found <strong className="text-slate-800">{results.totalCount}</strong> results {query && `for "${query}"`}</span>
      </div>

      {/* Empty State */}
      {results.totalCount === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No matching results found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
            Try searching for broader keywords like "algebra", "chemical bonds", "newton", or "mitochondria".
          </p>
          <button 
            onClick={() => { setQuery(''); setSelectedSubject('all'); }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Result Cards Grid */}
      <div className="space-y-6">
        
        {/* Matched Courses */}
        {results.courses.length > 0 && (
          <div>
            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 px-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Lessons & Courses ({results.courses.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.courses.map((c) => (
                <div 
                  key={c.id} 
                  onClick={() => {
                    if (c.id === 1) onViewLesson();
                    else onSelectCourse(c);
                  }}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-blue-50 text-blue-700">
                        {c.subjectSlug}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900">
                        {c.priceKsh > 0 ? `KSh ${c.priceKsh}` : 'Free'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{c.teacherName}</span>
                    <span className="font-semibold text-blue-600 flex items-center gap-1">
                      Study Now <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matched Articles */}
        {results.articles.length > 0 && (
          <div>
            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 px-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>Articles & Blog ({results.articles.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.articles.map((a) => (
                <div 
                  key={a.id} 
                  onClick={() => onSelectArticle(a)}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-amber-50 text-amber-700">
                        {a.subjectSlug}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{a.readingTimeMinutes} min read</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-1">
                      {a.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {a.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>By {a.authorName}</span>
                    <span className="font-semibold text-amber-600 flex items-center gap-1">
                      Read Article <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matched Resources */}
        {results.resources.length > 0 && (
          <div>
            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 px-1 flex items-center gap-1.5">
              <FolderDown className="w-3.5 h-3.5 text-teal-600" />
              <span>Downloadable Resources ({results.resources.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.resources.map((r) => (
                <div 
                  key={r.id} 
                  onClick={() => onSelectResource(r)}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-teal-50 text-teal-700">
                        {r.resourceType.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{r.fileSize}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 mb-1">
                      {r.title}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{r.level}</span>
                    <span className="font-semibold text-teal-600 flex items-center gap-1">
                      Download PDF <FolderDown className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
