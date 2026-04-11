import React from 'react';

export const Input = ({ label, type, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full bg-white dark:bg-[#111111] border border-gray-300 dark:border-white/10 rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
    />
  </div>
);
