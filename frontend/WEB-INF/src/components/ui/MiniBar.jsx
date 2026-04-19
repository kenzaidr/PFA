import React from 'react';

export const MiniBar = ({ pct, color }) => (
  <div className="h-1.5 w-full rounded-full bg-white/5">
    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: color }} />
  </div>
);
