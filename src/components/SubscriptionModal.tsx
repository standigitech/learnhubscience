import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  CreditCard,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'monthly' | 'annual', amountKsh: number) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-elevated border border-slate-100 relative overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>LearnSci Membership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Accelerate Your STEM Mastery
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Unlock complete access to past KCSE & college papers, step-by-step video libraries, teacher Q&A sessions, and certificate exams.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Monthly Plan */}
          <div className="rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-500 transition-all flex flex-col justify-between bg-white relative">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-extrabold text-slate-900 text-lg">Monthly Plan</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Cancel anytime
                </span>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-black text-slate-900">KSh 499</span>
                <span className="text-xs text-slate-400 font-semibold"> / month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>All secondary & college lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Downloadable PDF revision notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Full quiz engine & certificates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Student dashboard progress tracking</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onSelectPlan('monthly', 499)}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold text-xs transition active:scale-95"
            >
              Select Monthly Plan
            </button>
          </div>

          {/* Annual Plan (Featured) */}
          <div className="rounded-2xl p-6 border-2 border-purple-500 bg-gradient-to-b from-purple-50/50 to-white transition-all flex flex-col justify-between relative shadow-lg shadow-purple-500/10">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
              Save 20% + 2 Months Free
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-extrabold text-purple-900 text-lg">Annual Pass</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                  Most Popular
                </span>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-black text-slate-900">KSh 4,999</span>
                <span className="text-xs text-slate-400 font-semibold"> / year</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0 font-bold" />
                  <span className="font-semibold text-slate-900">Everything in Monthly, plus:</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>Exclusive Teacher Q&A Priority Hotline</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>10 Years of KCSE Past Papers + Marking Schemes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>Offline PDF & Formula Sheet Bundles</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onSelectPlan('annual', 4999)}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/25 transition active:scale-95"
            >
              Get Annual Pass (KSh 4,999)
            </button>
          </div>

        </div>

        {/* Payment Methods Assurance */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure 256-bit encrypted checkout</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-600 flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" /> M-Pesa Kenya
            </span>
            <span className="font-semibold text-slate-600 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" /> Visa / Mastercard / USD
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
