import React from 'react';
import { 
  Home, 
  Compass, 
  Calculator, 
  FlaskConical, 
  Atom, 
  Dna, 
  FileText, 
  FolderDown, 
  CheckSquare, 
  GraduationCap, 
  UserCheck, 
  LayoutDashboard, 
  User, 
  CreditCard, 
  Bookmark, 
  History, 
  Settings, 
  HelpCircle,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { UserRole } from '../types/index.js';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string, payload?: any) => void;
  userRole: UserRole;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  userRole,
  mobileMenuOpen,
  onCloseMobileMenu
}) => {
  const handleNav = (view: string, payload?: any) => {
    onNavigate(view, payload);
    onCloseMobileMenu();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={onCloseMobileMenu}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Drawer / Fixed Desktop container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/25 group-hover:scale-105 transition">
              S
            </div>
            <div>
              <div className="font-extrabold text-2xl tracking-tight text-slate-900 leading-none">
                Learn<span className="text-blue-600">Sci</span>
              </div>
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-1">
                Learn. Understand. Excel.
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          
          {/* SECTION: LEARN */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Learn
            </div>
            <nav className="space-y-0.5 text-sm">
              <button 
                onClick={() => handleNav('home')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'home' 
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Home className="w-4 h-4 text-blue-600" />
                <span>Home</span>
              </button>

              <button 
                onClick={() => handleNav('browse')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'browse' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Compass className="w-4 h-4 text-indigo-500" />
                <span>Browse Topics</span>
              </button>

              {/* Subject Direct Shortcuts */}
              <div className="pl-3 py-1 space-y-0.5 border-l-2 border-slate-100 ml-4 my-1">
                <button 
                  onClick={() => handleNav('subject', { slug: 'mathematics' })}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                    <span>Mathematics</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </button>

                <button 
                  onClick={() => handleNav('subject', { slug: 'chemistry' })}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50/50 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9333EA]" />
                    <span>Chemistry</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </button>

                <button 
                  onClick={() => handleNav('subject', { slug: 'physics' })}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50/50 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                    <span>Physics</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </button>

                <button 
                  onClick={() => handleNav('subject', { slug: 'biology' })}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span>Biology</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </button>
              </div>

              <button 
                onClick={() => handleNav('articles')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'articles' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Articles & Blog</span>
              </button>

              <button 
                onClick={() => handleNav('resources')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'resources' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FolderDown className="w-4 h-4 text-teal-500" />
                <span>Resources & Notes</span>
              </button>

              <button 
                onClick={() => handleNav('quizzes')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'quizzes' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <CheckSquare className="w-4 h-4 text-emerald-500" />
                <span>Practice & Quizzes</span>
              </button>

              <button 
                onClick={() => handleNav('my-learning')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'my-learning' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>My Learning</span>
              </button>
            </nav>
          </div>

          {/* SECTION: TEACH */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Teach
            </div>
            <nav className="space-y-0.5 text-sm">
              <button 
                onClick={() => handleNav('teacher-landing')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'teacher-landing' 
                    ? 'bg-purple-50 text-purple-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4 text-purple-600" />
                <span>Become a Teacher</span>
              </button>

              <button 
                onClick={() => handleNav('teacher-dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'teacher-dashboard' 
                    ? 'bg-purple-50 text-purple-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-purple-600" />
                <span>Teacher Dashboard</span>
              </button>

              {userRole === 'admin' && (
                <button 
                  onClick={() => handleNav('admin-dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                    currentView === 'admin-dashboard' 
                      ? 'bg-emerald-50 text-emerald-700 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Settings className="w-4 h-4 text-emerald-600" />
                  <span>Admin Dashboard</span>
                </button>
              )}
            </nav>
          </div>

          {/* SECTION: ACCOUNT */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Account
            </div>
            <nav className="space-y-0.5 text-sm">
              <button 
                onClick={() => handleNav('profile')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'profile' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>My Profile</span>
              </button>

              <button 
                onClick={() => handleNav('subscriptions')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'subscriptions' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4 text-slate-500" />
                <span>My Subscriptions</span>
              </button>

              <button 
                onClick={() => handleNav('bookmarks')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'bookmarks' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Bookmark className="w-4 h-4 text-slate-500" />
                <span>Bookmarks</span>
              </button>

              <button 
                onClick={() => handleNav('history')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'history' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <History className="w-4 h-4 text-slate-500" />
                <span>Purchase History</span>
              </button>

              <button 
                onClick={() => handleNav('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'settings' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

        </div>

        {/* Bottom Support Banner */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <button 
            onClick={() => handleNav('support')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-blue-400 text-xs font-semibold text-slate-700 shadow-xs transition"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Help & Support</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        </div>

      </aside>
    </>
  );
};
