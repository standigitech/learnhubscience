import React from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  ShieldAlert, 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  Settings,
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-elevated border border-emerald-900/40">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            System Administration
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Platform Oversight & Analytics</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Real-time metrics across 12,480 registered STEM learners and certified educators.
        </p>
      </div>

      {/* Top Analytics Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Total Users</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">12,480</div>
          <span className="text-[11px] text-emerald-600 font-semibold">+18% growth this term</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Registered Teachers</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">142</div>
          <span className="text-[11px] text-slate-400">Accredited STEM faculties</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Gross Platform Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">KSh 4,890,000</div>
          <span className="text-[11px] text-emerald-600 font-semibold">M-Pesa & Card Settlements</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Active Subscriptions</span>
            <CreditCard className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">2,840</div>
          <span className="text-[11px] text-purple-600 font-semibold">Recurring Monthly & Annual</span>
        </div>

      </div>

      {/* Two Column Layout: Subject Distribution & Top Viewed Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Popular Subjects */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Subject Enrollment Distribution</span>
          </h3>

          <div className="space-y-4 text-xs font-medium">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-800">Mathematics (Pure & Applied)</span>
                <span className="text-slate-500">4,120 learners (33%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '33%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-800">Chemistry (Organic, Physical, Inorganic)</span>
                <span className="text-slate-500">3,410 learners (27%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '27%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-800">Physics (Mechanics, Electricity, Waves)</span>
                <span className="text-slate-500">2,980 learners (24%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '24%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-800">Biology (Cellular, Genetics, Anatomy)</span>
                <span className="text-slate-500">2,840 learners (22%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '22%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Most Viewed Lessons */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Highest Traffic Curricula</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Quadratic Equations & Roots (Mathematics)</p>
                <p className="text-[11px] text-slate-400">18,450 views · Rating 4.7 ⭐</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                High Yield
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Chemical Bonding & VSEPR (Chemistry)</p>
                <p className="text-[11px] text-slate-400">14,210 views · Rating 4.8 ⭐</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                Premium
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Newton’s Laws of Motion (Physics)</p>
                <p className="text-[11px] text-slate-400">12,890 views · Rating 4.6 ⭐</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold">
                Featured
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Cell Structure & Organelles (Biology)</p>
                <p className="text-[11px] text-slate-400">11,950 views · Rating 4.7 ⭐</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Free Core
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
