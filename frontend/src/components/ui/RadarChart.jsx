import React from 'react';

export const RadarChart = ({ data, size = 200 }) => {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const n = data.length;
  const angleStep = (2 * Math.PI) / n;
  const getPoint = (i, pct, radius = r) => {
    const angle = i * angleStep - Math.PI / 2;
    return { x: cx + radius * Math.cos(angle) * pct, y: cy + radius * Math.sin(angle) * pct };
  };
  const levels = [0.25, 0.5, 0.75, 1];
  const polyPoints = data.map((d, i) => getPoint(i, d.value / 100));
  const polyStr = polyPoints.map(p => `${p.x},${p.y}`).join(' ');
  const axisPoints = data.map((_, i) => getPoint(i, 1));

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid rings */}
      {levels.map(l => (
        <polygon key={l}
          points={data.map((_, i) => { const p = getPoint(i, l); return `${p.x},${p.y}`; }).join(' ')}
          fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="1"
        />
      ))}
      {/* Axes */}
      {axisPoints.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
      ))}
      {/* Fill */}
      <polygon points={polyStr} fill="rgba(99,102,241,0.2)" stroke="rgba(129,140,248,0.8)" strokeWidth="2" />
      {/* Dots */}
      {polyPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#818cf8" stroke="#1e1b4b" strokeWidth="2">
          <animate attributeName="r" values="4;6;4" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Labels */}
      {data.map((d, i) => {
        const lp = getPoint(i, 1.22);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="9" fill="rgba(156,163,175,1)" fontWeight="600" fontFamily="Inter,sans-serif">
            {d.label}
          </text>
        );
      })}
    </svg>
  );
};
