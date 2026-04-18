import React from 'react';
import { ChevronRight } from 'lucide-react';

export const JobCard = ({ title, company, match, location, salary, tags, t }) => (
  <div className="group p-4 rounded-2xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.05] hover:border-indigo-500/25 transition-all duration-300 cursor-pointer">
    <div className="flex items-start justify-between mb-3">
      <div>
        <h4 className="text-white font-semibold text-sm mb-0.5">{title}</h4>
        <p className="text-gray-500 text-xs">{company} · {location}</p>
      </div>
      <span className="shrink-0 ml-2 px-2.5 py-1 rounded-lg text-xs font-bold" style={{
        background: match >= 90 ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.15)',
        color: match >= 90 ? '#34d399' : '#a5b4fc',
        border: `1px solid ${match >= 90 ? 'rgba(16,185,129,0.25)' : 'rgba(99,102,241,0.25)'}`,
      }}>{match}% match</span>
    </div>
    <p className="text-emerald-400 text-xs font-semibold mb-3">{salary}</p>
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-medium text-gray-400 bg-white/5 border border-white/5">{tag}</span>
        ))}
      </div>
      <button className="shrink-0 ml-2 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
        {t.apply} <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  </div>
);
