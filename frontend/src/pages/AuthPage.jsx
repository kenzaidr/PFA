import React, { useState } from 'react';
import { useThemeLang } from '../contexts/ThemeLangContext.jsx';
import { CheckCircle2, ChevronLeft, ArrowRight, Zap, Target, Video } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../components/ui/Input.jsx';
import { authI18n as i18n } from '../utils/i18n.js';

export default function AuthPage() {
  const { lang } = useThemeLang();
  const t = i18n[lang];
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Students go through onboarding first, recruiters go home
    navigate(role === 'student' ? '/onboarding' : '/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] flex items-center justify-center p-4 sm:p-8 font-sans transition-colors">
      
      {/* Back button (Absolute) */}
      <Link to="/" className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
        <ChevronLeft className="w-4 h-4" />
        {t.backHome}
      </Link>

      <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-[24px] overflow-hidden shadow-xl sm:shadow-2xl">
        
        {/* CÔTÉ GAUCHE : VISUEL & INFO */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gray-50 dark:bg-[#0A0A0A] border-r border-gray-200 dark:border-white/5 relative overflow-hidden">
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8 leading-tight tracking-tight text-gray-900 dark:text-white">
              {role === 'student' ? t.studentTitle : t.recruiterTitle}
            </h2>
            <ul className="space-y-5 text-gray-600 dark:text-gray-400">
              {role === 'student' ? (
                <>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                    <span className="font-medium text-sm">{t.studentBenefit1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                    <span className="font-medium text-sm">{t.studentBenefit2}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                    <span className="font-medium text-sm">{t.studentBenefit3}</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="font-medium text-sm">{t.recruiterBenefit1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="font-medium text-sm">{t.recruiterBenefit2}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Video className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="font-medium text-sm">{t.recruiterBenefit3}</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Minimal visual decoration at bottom */}
          <div className="relative z-10 mt-12 bg-white dark:bg-[#1A1A1A] rounded-[16px] p-4 border border-gray-200 dark:border-white/5 flex items-center gap-4 shadow-sm">
             <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">SM</span>
             </div>
             <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">SKILLMAP 2.0</p>
                <p className="text-[11px] text-gray-500">Intelligent Matching Engine</p>
             </div>
          </div>
          
          {/* Subtle background motif */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* CÔTÉ DROIT : FORMULAIRE */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {isLogin ? t.welcomeBack : t.createAccount}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t.chooseProfile}</p>
          </div>

          {/* SWITCH DE RÔLE */}
          <div className="flex bg-gray-100 dark:bg-[#1A1A1A] p-1 rounded-[12px] mb-8 border border-gray-200 dark:border-white/5">
            <button 
              onClick={() => setRole('student')}
              className={`flex-1 py-2.5 rounded-[8px] text-sm font-semibold transition-all ${role === 'student' ? 'bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              {t.student}
            </button>
            <button 
              onClick={() => setRole('recruiter')}
              className={`flex-1 py-2.5 rounded-[8px] text-sm font-semibold transition-all ${role === 'recruiter' ? 'bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              {t.recruiter}
            </button>
          </div>

          {/* FORMULAIRE */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <Input label={t.firstName} type="text" placeholder="Kenza" />
                <Input label={t.lastName} type="text" placeholder="Idrissi" />
              </div>
            )}
            
            <Input label={t.email} type="email" placeholder="nom@example.com" />
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t.password}</label>
                {isLogin && <a href="#" className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">{t.forgotPassword}</a>}
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-white dark:bg-[#111111] border border-gray-300 dark:border-white/10 rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
              />
            </div>

            {!isLogin && role === 'recruiter' && (
              <Input label={t.companyName} type="text" placeholder="Tech Startup SA" />
            )}

            <button className={`w-full py-3.5 rounded-[10px] font-semibold text-sm transition-all mt-6 flex items-center justify-center gap-2 ${role === 'student' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}>
              {isLogin ? t.signIn : t.signUp}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5 text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {isLogin ? t.noAccount : t.alreadyMember} 
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-gray-900 dark:text-white font-semibold hover:underline"
              >
                {isLogin ? t.registerFree : t.signIn}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

