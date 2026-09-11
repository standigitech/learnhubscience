import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { Sidebar } from './components/Sidebar.js';
import { HeroSection } from './components/HeroSection.js';
import { SubjectSection } from './components/SubjectSection.js';
import { PopularLessons } from './components/PopularLessons.js';
import { ContinueLearningPanel } from './components/ContinueLearningPanel.js';
import { LessonView } from './components/LessonView.js';
import { QuizEngine } from './components/QuizEngine.js';
import { SearchView } from './components/SearchView.js';
import { ArticlesView } from './components/ArticlesView.js';
import { ResourcesView } from './components/ResourcesView.js';
import { TeacherDashboard } from './components/TeacherDashboard.js';
import { AdminDashboard } from './components/AdminDashboard.js';
import { SubscriptionModal } from './components/SubscriptionModal.js';
import { PaymentModal } from './components/PaymentModal.js';

import { 
  INITIAL_SUBJECTS, 
  COURSES, 
  QUADRATIC_EQUATIONS_LESSON, 
  QUIZZES, 
  ARTICLES, 
  ALL_RESOURCES, 
  TEACHER_PROFILES, 
  DEFAULT_LEARNER_PROGRESS 
} from './data/seedData.js';
import { User, UserRole, Course, Article, Resource } from './types/index.js';

export const App: React.FC = () => {
  // Navigation View State
  const [currentView, setCurrentView] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active User Persona (Allows seamless demonstration of Learner, Teacher, Admin)
  const [currentUser, setCurrentUser] = useState<User>({
    id: 1,
    name: 'David Mwangi',
    email: 'student@learnsci.edu',
    role: 'learner',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'
  });

  // State entities
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [resources, setResources] = useState<Resource[]>(ALL_RESOURCES);
  const [progress, setProgress] = useState(DEFAULT_LEARNER_PROGRESS);
  const [cartCount, setCartCount] = useState<number>(0);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected detail entities
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null);

  // Modals state
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanAmount, setSelectedPlanAmount] = useState<number>(499);

  // Fetch initial data from Netlify API if available
  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setCourses(data); })
      .catch(() => {});
  }, []);

  // Handlers
  const handleSelectRole = (role: UserRole) => {
    if (role === 'learner') {
      setCurrentUser({
        id: 1,
        name: 'David Mwangi',
        email: 'student@learnsci.edu',
        role: 'learner',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'
      });
      setCurrentView('home');
    } else if (role === 'teacher') {
      setCurrentUser({
        id: 2,
        name: 'Dr. Kelvin M.',
        email: 'dr.kelvin@learnsci.edu',
        role: 'teacher',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
      });
      setCurrentView('teacher-dashboard');
    } else {
      setCurrentUser({
        id: 3,
        name: 'Admin Officer',
        email: 'admin@learnsci.edu',
        role: 'admin',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250'
      });
      setCurrentView('admin-dashboard');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('search');
    }
  };

  const handleOpenCart = () => {
    setIsSubscriptionModalOpen(true);
  };

  const handleSelectPlan = (plan: 'monthly' | 'annual', amountKsh: number) => {
    setSelectedPlanType(plan);
    setSelectedPlanAmount(amountKsh);
    setIsSubscriptionModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (ref: string) => {
    // update learner status
  };

  const handleLaunchQuiz = (quizId: number) => {
    setActiveQuizId(quizId);
    setCurrentView('quiz');
  };

  const handleCreateCourse = (courseData: any) => {
    const newCourse = {
      ...courseData,
      id: courses.length + 1,
      teacherId: 1,
      teacherName: currentUser.name,
      teacherAvatar: currentUser.avatarUrl || '',
      rating: 5.0,
      reviewCount: 1,
      lessonsCount: 1,
      totalDuration: '2 hrs',
      published: true
    };
    setCourses([newCourse, ...courses]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased">
      
      {/* Fixed Left Desktop Sidebar & Mobile Drawer */}
      <Sidebar 
        currentView={currentView}
        onNavigate={(view, payload) => {
          setCurrentView(view);
          if (payload?.slug) {
            setSearchQuery(payload.slug);
            setCurrentView('search');
          }
        }}
        userRole={currentUser.role}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Layout Shifted Right on Desktop for Fixed Sidebar */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        
        {/* Sticky Header with Global Search and Persona Switcher */}
        <Header 
          currentUser={currentUser}
          onSelectRole={handleSelectRole}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (q && currentView !== 'search') setCurrentView('search');
            if (!q && currentView === 'search') setCurrentView('home');
          }}
          onSearchSubmit={handleSearchSubmit}
          cartCount={cartCount}
          onOpenCart={handleOpenCart}
          onOpenSubscriptions={() => setIsSubscriptionModalOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onNavigate={(view) => setCurrentView(view)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          
          {/* VIEW: HOME DASHBOARD (Refined 4:3 reference layout with main stage & side widgets) */}
          {currentView === 'home' && (
            <div className="space-y-10">
              
              {/* Hero Section */}
              <HeroSection 
                onBrowseLessons={() => {
                  const el = document.getElementById('popular-lessons-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                onExploreArticles={() => setCurrentView('articles')}
                onExploreSubject={(slug) => {
                  setSearchQuery(slug);
                  setCurrentView('search');
                }}
              />

              {/* 4:3 Main Layout Composition: 8 cols Main Stage + 4 cols Continue Learning widget */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Main Content Stage (8 columns) */}
                <div className="lg:col-span-8 space-y-10">
                  {/* Subject Grid Cards */}
                  <SubjectSection 
                    subjects={INITIAL_SUBJECTS}
                    onSelectSubject={(slug) => {
                      setSearchQuery(slug);
                      setCurrentView('search');
                    }}
                    onSelectTopic={(subj, topic) => {
                      setSearchQuery(topic);
                      setCurrentView('search');
                    }}
                  />

                  {/* Popular Lessons Section */}
                  <div id="popular-lessons-section">
                    <PopularLessons 
                      courses={courses}
                      onSelectCourse={(c) => {
                        setSelectedCourse(c);
                        setCurrentView('lesson');
                      }}
                      onViewFlagshipLesson={() => setCurrentView('lesson')}
                      onAddToCart={(c) => setCartCount(prev => prev + 1)}
                    />
                  </div>
                </div>

                {/* Right Dashboard Widget Panel (4 columns: Continue Learning, Streaks, Recent) */}
                <div className="lg:col-span-4 sticky top-24">
                  <ContinueLearningPanel 
                    progress={progress}
                    onContinueCurrent={() => setCurrentView('lesson')}
                    onSelectRecentLesson={() => setCurrentView('lesson')}
                    onGoPremium={() => setIsSubscriptionModalOpen(true)}
                  />
                </div>

              </div>

            </div>
          )}

          {/* VIEW: LESSON PAGE (Dedicated 9-part curriculum & Interactive Solver) */}
          {currentView === 'lesson' && (
            <LessonView 
              lesson={QUADRATIC_EQUATIONS_LESSON}
              onBack={() => setCurrentView('home')}
              onLaunchQuiz={(quizId) => handleLaunchQuiz(quizId)}
              onDownloadResource={(res) => {
                alert(`Downloaded ${res.title}`);
              }}
            />
          )}

          {/* VIEW: QUIZ ENGINE (Interactive 5-question test with timer & explanations) */}
          {currentView === 'quiz' && (
            <QuizEngine 
              quiz={QUIZZES[0]}
              onBackToLesson={() => setCurrentView('lesson')}
              onRecordAttempt={(score) => {
                setProgress(prev => ({
                  ...prev,
                  averageQuizScore: Math.round((prev.averageQuizScore + score) / 2),
                  completedLessons: prev.completedLessons + 1
                }));
              }}
            />
          )}

          {/* VIEW: SEARCH SYSTEM (Global filter and multi-facet query index) */}
          {currentView === 'search' && (
            <SearchView 
              initialQuery={searchQuery}
              courses={courses}
              articles={articles}
              resources={resources}
              subjects={INITIAL_SUBJECTS}
              onSelectCourse={(c) => {
                setSelectedCourse(c);
                setCurrentView('lesson');
              }}
              onSelectArticle={(a) => {
                setSelectedArticle(a);
                setCurrentView('articles');
              }}
              onSelectResource={(r) => {
                alert(`Downloaded ${r.title}`);
              }}
              onViewLesson={() => setCurrentView('lesson')}
            />
          )}

          {/* VIEW: ARTICLES / BLOG */}
          {currentView === 'articles' && (
            <ArticlesView 
              articles={articles}
              onSelectArticle={(a) => setSelectedArticle(a)}
              selectedArticle={selectedArticle}
              onBackToList={() => setSelectedArticle(null)}
            />
          )}

          {/* VIEW: RESOURCES REPOSITORY */}
          {currentView === 'resources' && (
            <ResourcesView 
              resources={resources}
              onDownload={(res) => alert(`Downloading: ${res.title}`)}
              onGoPremium={() => setIsSubscriptionModalOpen(true)}
            />
          )}

          {/* VIEW: TEACHER DASHBOARD */}
          {(currentView === 'teacher-dashboard' || currentView === 'teacher-landing') && (
            <TeacherDashboard 
              teacher={TEACHER_PROFILES[0]}
              courses={courses}
              onCreateCourse={handleCreateCourse}
            />
          )}

          {/* VIEW: ADMIN DASHBOARD */}
          {currentView === 'admin-dashboard' && (
            <AdminDashboard />
          )}

          {/* VIEW: MY LEARNING */}
          {currentView === 'my-learning' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-black text-slate-900">My Learning Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContinueLearningPanel 
                  progress={progress}
                  onContinueCurrent={() => setCurrentView('lesson')}
                  onSelectRecentLesson={() => setCurrentView('lesson')}
                  onGoPremium={() => setIsSubscriptionModalOpen(true)}
                />
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
                  <h3 className="font-bold text-slate-900 mb-3">Enrolled STEM Courses</h3>
                  <div className="space-y-3">
                    {courses.slice(0, 3).map((c) => (
                      <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{c.title}</p>
                          <p className="text-slate-400 capitalize">{c.subjectSlug}</p>
                        </div>
                        <button 
                          onClick={() => setCurrentView('lesson')}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold"
                        >
                          Resume
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-200/80 bg-white py-8 px-4 sm:px-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                S
              </div>
              <span className="font-bold text-slate-900">LearnSci</span>
              <span>— Learn. Understand. Excel.</span>
            </div>

            <div className="flex items-center gap-6">
              <button onClick={() => setCurrentView('home')} className="hover:text-blue-600">Home</button>
              <button onClick={() => setCurrentView('articles')} className="hover:text-blue-600">Articles</button>
              <button onClick={() => setCurrentView('resources')} className="hover:text-blue-600">Resources</button>
              <button onClick={() => setIsSubscriptionModalOpen(true)} className="hover:text-blue-600">Pricing</button>
              <button onClick={() => handleSelectRole('teacher')} className="hover:text-purple-600">Teacher Portal</button>
            </div>

            <p>© 2026 LearnSci EdTech Platform. All rights reserved.</p>
          </div>
        </footer>

      </div>

      {/* Subscription Plans Modal */}
      <SubscriptionModal 
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSelectPlan={handleSelectPlan}
      />

      {/* Payment Processing Modal (M-Pesa & Card) */}
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        planType={selectedPlanType}
        amountKsh={selectedPlanAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />

    </div>
  );
};

export default App;
