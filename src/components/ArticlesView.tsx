import React, { useState } from 'react';
import { 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Calendar, 
  User, 
  Tag, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Article } from '../types/index.js';

interface ArticlesViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  selectedArticle: Article | null;
  onBackToList: () => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({
  articles,
  onSelectArticle,
  selectedArticle,
  onBackToList
}) => {
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<string>('all');

  const filteredArticles = activeSubjectFilter === 'all'
    ? articles
    : articles.filter(a => a.subjectSlug === activeSubjectFilter);

  // Single Article Reader View
  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-16">
        
        {/* Navigation & Controls */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onBackToList}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert("Article bookmarked to your account profile!")}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-amber-500 transition"
              title="Bookmark Article"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert("Article share link copied to clipboard!")}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 transition"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Cover Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft">
          <div className="relative aspect-[21/9] bg-slate-900">
            <img 
              src={selectedArticle.featuredImage} 
              alt={selectedArticle.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm">
                {selectedArticle.subjectName}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {selectedArticle.title}
            </h1>

            {/* Author Attribution Meta */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedArticle.authorAvatar} 
                  alt={selectedArticle.authorName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">{selectedArticle.authorName}</p>
                  <p className="text-xs text-slate-400">{selectedArticle.authorTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {selectedArticle.readingTimeMinutes} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  August 2026
                </span>
              </div>
            </div>

            {/* Content Body formatted markdown simulation */}
            <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-serif">
              {selectedArticle.contentMarkdown}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase mr-1">Tags:</span>
              {selectedArticle.tags.map((t, idx) => (
                <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 text-slate-600">
                  #{t}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* Related Articles Strip */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Related STEM Publications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.filter(a => a.id !== selectedArticle.id).slice(0, 2).map((a) => (
              <div 
                key={a.id} 
                onClick={() => onSelectArticle(a)}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-elevated transition cursor-pointer flex gap-4 items-center"
              >
                <img 
                  src={a.featuredImage} 
                  alt={a.title} 
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase text-blue-600">{a.subjectName}</span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5">{a.title}</h4>
                  <span className="text-[10px] text-slate-400 mt-1 block">{a.readingTimeMinutes} min read</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // Articles Hub Listing View
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Editorial & Insights</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Latest STEM Articles & Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Deep-dive conceptual breakdowns authored by certified educators and university fellows.
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {['all', 'mathematics', 'chemistry', 'physics', 'biology'].map((s) => (
            <button
              key={s}
              onClick={() => setActiveSubjectFilter(s)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider text-[11px] transition ${
                activeSubjectFilter === s
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div 
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img 
                  src={article.featuredImage} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full uppercase bg-slate-900/80 text-white backdrop-blur-md shadow-xs">
                    {article.subjectName}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTimeMinutes} min read
                  </span>
                  <span>•</span>
                  <span>{article.viewsCount} reads</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                  {article.shortDescription}
                </p>

                <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100">
                  <img 
                    src={article.authorAvatar} 
                    alt={article.authorName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-slate-800 leading-none">{article.authorName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{article.authorTitle}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <div className="flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Read Full Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
