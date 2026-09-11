import React, { useState } from 'react';
import { 
  FolderDown, 
  FileText, 
  BookOpen, 
  Sparkles, 
  Filter, 
  Lock,
  Download,
  CheckCircle2,
  Search
} from 'lucide-react';
import { Resource } from '../types/index.js';

interface ResourcesViewProps {
  resources: Resource[];
  onDownload: (resource: Resource) => void;
  onGoPremium: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources,
  onDownload,
  onGoPremium
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = resources.filter(r => {
    const matchesSubj = selectedSubject === 'all' || r.subjectSlug === selectedSubject;
    const matchesType = selectedType === 'all' || r.resourceType === selectedType;
    const matchesSearch = !searchTerm || r.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubj && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Revision Library</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Downloadable Notes & Exam Past Papers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Curated KCSE revision packets, university STEM problem sets, and formula cheat sheets.
          </p>
        </div>

        <button 
          onClick={onGoPremium}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold text-xs shadow-md shadow-teal-500/20 active:scale-95 transition"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Unlock All Premium Packs</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          <div className="flex items-center gap-1 text-slate-400 font-bold uppercase text-[10px]">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-slate-100 font-semibold text-slate-700 px-3 py-1.5 rounded-xl outline-none border-none cursor-pointer"
          >
            <option value="all">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="chemistry">Chemistry</option>
            <option value="physics">Physics</option>
            <option value="biology">Biology</option>
          </select>

          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-100 font-semibold text-slate-700 px-3 py-1.5 rounded-xl outline-none border-none cursor-pointer"
          >
            <option value="all">All Document Types</option>
            <option value="pdf">PDF Revision Notes</option>
            <option value="worksheet">Practice Worksheets</option>
            <option value="past_paper">KCSE / College Past Papers</option>
            <option value="study_guide">Comprehensive Study Guides</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter files..."
            className="w-full bg-slate-50 text-xs text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Resources Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((resource) => (
          <div 
            key={resource.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase bg-slate-100 text-slate-700">
                  {resource.resourceType.replace('_', ' ')}
                </span>
                
                {resource.isPremium ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Premium
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Free
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug mb-2">
                {resource.title}
              </h4>

              <div className="text-xs text-slate-400 space-y-1 mb-4">
                <p>Level: <strong className="text-slate-700">{resource.level}</strong></p>
                <p>Curriculum Year: <strong className="text-slate-700">{resource.year}</strong></p>
                <p>File Size: <strong className="text-slate-700">{resource.fileSize}</strong></p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                {resource.downloadsCount.toLocaleString()} downloads
              </span>

              <button 
                onClick={() => onDownload(resource)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
