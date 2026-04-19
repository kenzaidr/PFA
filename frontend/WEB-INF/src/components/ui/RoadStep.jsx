import React from 'react';
import { CheckCircle, Lock, Zap } from 'lucide-react';

export const RoadStep = ({ icon: Icon, title, sub, done, inProgress, locked }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${done ? 'opacity-60' : inProgress ? 'bg-indigo-500/8 border border-indigo-500/20' : locked ? 'opacity-30' : ''}`}>
    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${done ? 'bg-emerald-500/20' : inProgress ? 'bg-indigo-500/25' : 'bg-white/5'}`}>
      {done ? <CheckCircle className="w-4 h-4 text-emerald-400" /> :
       locked ? <Lock className="w-3.5 h-3.5 text-gray-600" /> :
       <Icon className={`w-4 h-4 ${inProgress ? 'text-indigo-400' : 'text-gray-500'}`} />}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-semibold truncate ${inProgress ? 'text-white' : done ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
      <p className="text-gray-600 text-xs">{sub}</p>
    </div>
    {inProgress && <Zap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
  </div>
);
