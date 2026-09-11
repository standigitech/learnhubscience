import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Bell, 
  Menu, 
  X, 
  Sparkles, 
  UserCheck, 
  BookOpen, 
  GraduationCap, 
  ShieldAlert,
  ChevronDown,
  CheckCircle2,
  Trash2,
  CreditCard
} from 'lucide-react';
import { User, UserRole } from '../types/index.js';

interface HeaderProps {
  currentUser: User;
  onSelectRole: (role: UserRole) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSubscriptions: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSelectRole,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  cartCount,
  onOpenCart,
  onOpenSubscriptions,
  mobileMenuOpen,
  onToggleMobileMenu,
  onNavigate
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const notifications = [
    { id: 1, title: 'Quiz Score Recorded', time: '10m ago', text: 'You scored 80% on Quadratic Equations Diagnostic Quiz!' },
    { id: 2, title: 'New Lesson Uploaded', time: '2h ago', text: 'Dr. Kelvin added "VSEPR Geometry & Hybridization" in Chemistry.' },
    { id: 3, title: 'Exam Countdown', time: '1d ago', text: 'KCSE & College STEM Prep mock tests have been published.' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger & Brand (Mobile only, sidebar has desktop brand) */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2.5 cursor-pointer lg:hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
              S
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Learn<span className="text-blue-600">Sci</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <form onSubmit={onSearchSubmit} className="flex-1 max-w-xl mx-2">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search lessons, topics, articles..."
              className="w-full bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-full pl-10 pr-4 py-2 border border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Right Action Icons & User Control */}
        <div className="flex items-center gap-2 lg:gap-3.5">
          
          {/* Role Switcher Pill (Great for evaluators to switch perspectives) */}
          <div className="relative hidden sm:block">
            <button 
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition"
              title="Switch demo persona"
            >
              {currentUser.role === 'learner' && <BookOpen className="w-3.5 h-3.5 text-blue-600" />}
              {currentUser.role === 'teacher' && <GraduationCap className="w-3.5 h-3.5 text-purple-600" />}
              {currentUser.role === 'admin' && <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />}
              <span className="capitalize">{currentUser.role} View</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleSelector && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-elevated border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Persona
                </div>
                <button 
                  onClick={() => { onSelectRole('learner'); setShowRoleSelector(false); }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Learner (David Mwangi)
                </button>
                <button 
                  onClick={() => { onSelectRole('teacher'); setShowRoleSelector(false); }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-purple-50 text-slate-700 hover:text-purple-700 font-medium"
                >
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  Teacher (Dr. Kelvin M.)
                </button>
                <button 
                  onClick={() => { onSelectRole('admin'); setShowRoleSelector(false); }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-medium"
                >
                  <ShieldAlert className="w-4 h-4 text-emerald-600" />
                  Administrator (Admin)
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button 
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notifications Icon with Popup */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-elevated border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Notifications</h4>
                  <span className="text-[11px] font-medium text-blue-600 cursor-pointer hover:underline">Mark read</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors text-left cursor-pointer">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-800">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Subscribe CTA Pill */}
          <button 
            onClick={onOpenSubscriptions}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:opacity-95 transition active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Go Premium</span>
          </button>

          {/* User Profile Avatar with Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition"
            >
              <img 
                src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250"}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
              />
              <span className="hidden xl:inline text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-slate-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full capitalize">
                    {currentUser.role}
                  </span>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { onNavigate('profile'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => { onOpenSubscriptions(); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium flex items-center justify-between"
                  >
                    <span>My Subscriptions</span>
                    <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-1.5 py-0.5 rounded">Active</span>
                  </button>
                  <button 
                    onClick={() => { onNavigate('history'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Purchase History
                  </button>
                  <button 
                    onClick={() => { onNavigate('settings'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Account Settings
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
