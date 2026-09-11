import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Star, 
  Plus, 
  FileText, 
  CheckCircle2, 
  BarChart2, 
  Upload,
  Settings,
  HelpCircle,
  Video,
  Clock
} from 'lucide-react';
import { Course, TeacherProfile } from '../types/index.js';

interface TeacherDashboardProps {
  teacher: TeacherProfile;
  courses: Course[];
  onCreateCourse: (courseData: any) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacher,
  courses,
  onCreateCourse
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'create' | 'learners' | 'earnings'>('overview');
  
  // New Course Form state
  const [title, setTitle] = useState('');
  const [subjectSlug, setSubjectSlug] = useState('chemistry');
  const [topicName, setTopicName] = useState('Organic Chemistry');
  const [priceKsh, setPriceKsh] = useState(250);
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('Secondary');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitCourse = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateCourse({
      title,
      subjectSlug,
      topicName,
      priceKsh: Number(priceKsh),
      description,
      level,
      isPremium: priceKsh > 0,
      thumbnailUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=600'
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveTab('courses');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      
      {/* Teacher Profile Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-elevated border border-purple-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img 
            src={teacher.avatarUrl} 
            alt={teacher.title}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-purple-500/30 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/40 text-purple-200">
                Teacher Dashboard
              </span>
              <span className="text-xs text-purple-300 font-semibold">{teacher.experienceYears} Years Exp</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{teacher.title}</h1>
            <p className="text-xs sm:text-sm text-purple-200/90">{teacher.qualifications}</p>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('create')}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs shadow-lg shadow-purple-500/25 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-bold overflow-x-auto">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-1 border-b-2 whitespace-nowrap transition ${
            activeTab === 'overview' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Overview & Metrics
        </button>
        <button 
          onClick={() => setActiveTab('courses')}
          className={`pb-3 px-1 border-b-2 whitespace-nowrap transition ${
            activeTab === 'courses' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Courses ({courses.length})
        </button>
        <button 
          onClick={() => setActiveTab('create')}
          className={`pb-3 px-1 border-b-2 whitespace-nowrap transition ${
            activeTab === 'create' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Publish Course / Lesson
        </button>
        <button 
          onClick={() => setActiveTab('learners')}
          className={`pb-3 px-1 border-b-2 whitespace-nowrap transition ${
            activeTab === 'learners' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Learner Progress Monitor
        </button>
        <button 
          onClick={() => setActiveTab('earnings')}
          className={`pb-3 px-1 border-b-2 whitespace-nowrap transition ${
            activeTab === 'earnings' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Earnings & Royalties
        </button>
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Enrolled Students</span>
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">2,840</div>
              <span className="text-[11px] text-emerald-600 font-semibold">+14% this month</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Active Courses</span>
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{courses.length}</div>
              <span className="text-[11px] text-slate-400">Published live</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Total Royalties</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                KSh {teacher.earningsKsh.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold">Processed via M-Pesa</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Learner Rating</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-slate-900">{teacher.rating} / 5.0</div>
              <span className="text-[11px] text-slate-400">{teacher.reviewCount} reviews</span>
            </div>

          </div>

          {/* Teacher Bio & Subjects */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
            <h3 className="text-base font-bold text-slate-900 mb-2">Educator Profile Summary</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {teacher.biography}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Teaching:</span>
              {teacher.subjectsTaught.map((s, idx) => (
                <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Courses */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft p-4 flex flex-col justify-between">
              <div>
                <img src={c.thumbnailUrl} alt={c.title} className="w-full aspect-video object-cover rounded-xl mb-3" />
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-purple-700 uppercase text-[10px]">{c.subjectSlug}</span>
                  <span className="font-bold text-slate-900">KSh {c.priceKsh}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{c.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{c.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">{c.lessonsCount} lessons</span>
                <span className="text-emerald-600 font-bold">Published</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Create Course */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft max-w-2xl mx-auto">
          <h3 className="text-xl font-black text-slate-900 mb-1">Create New STEM Course</h3>
          <p className="text-xs text-slate-500 mb-6">Publish high-yield curriculum lessons and revision questions.</p>

          {isSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Course successfully published and enrolled into the LearnSci catalog!</span>
            </div>
          )}

          <form onSubmit={handleSubmitCourse} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Course Title:</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Organic Reaction Mechanisms & Stereochemistry"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Subject:</label>
                <select 
                  value={subjectSlug}
                  onChange={(e) => setSubjectSlug(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none"
                >
                  <option value="mathematics">Mathematics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="physics">Physics</option>
                  <option value="biology">Biology</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Topic Name:</label>
                <input 
                  type="text"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Tuition Price (KSh):</label>
                <input 
                  type="number"
                  value={priceKsh}
                  onChange={(e) => setPriceKsh(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Academic Level:</label>
                <select 
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none"
                >
                  <option value="Secondary">Secondary (Form 1–4)</option>
                  <option value="Advanced / College">Advanced / College</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Course Description:</label>
              <textarea 
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breakdown of learning objectives, key formulas, and exam targets..."
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition active:scale-95"
            >
              Publish Course to LearnSci
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: Learners */}
      {activeTab === 'learners' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
          <h3 className="text-base font-bold text-slate-900 mb-4">Enrolled Learners Transcript Tracking</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 font-bold">Learner Name</th>
                  <th className="py-2.5 font-bold">Course</th>
                  <th className="py-2.5 font-bold">Completed</th>
                  <th className="py-2.5 font-bold">Average Quiz</th>
                  <th className="py-2.5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr>
                  <td className="py-3 font-bold text-slate-900">David Mwangi</td>
                  <td className="py-3">Mastering Linear & Quadratic Equations</td>
                  <td className="py-3">65%</td>
                  <td className="py-3 text-emerald-600 font-bold">84%</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">Active</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-slate-900">Faith Njeri</td>
                  <td className="py-3">Chemical Bonding & VSEPR Geometry</td>
                  <td className="py-3">100%</td>
                  <td className="py-3 text-emerald-600 font-bold">92%</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">Certified</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-slate-900">Brian Kiprono</td>
                  <td className="py-3">Newtonian Mechanics & Laws of Motion</td>
                  <td className="py-3">40%</td>
                  <td className="py-3 text-amber-600 font-bold">75%</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Earnings */}
      {activeTab === 'earnings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">M-Pesa Royalty Disbursements</h3>
              <p className="text-xs text-slate-400">Monthly payout sent directly to your verified Safaricom line.</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Available Balance</span>
              <p className="text-2xl font-black text-slate-900">KSh 64,800</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between font-bold text-slate-800">
              <span>Next Automatic Payout:</span>
              <span className="text-purple-600">September 30, 2026</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Payout Method:</span>
              <span>Safaricom M-Pesa (0722•••412)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
