import React, { useState, useRef, useEffect } from 'react';

export const Counter = ({ val }) => {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated.current) {
        animated.current = true;
        const num = parseFloat(val.replace(/[^0-9.]/g, ''));
        const suffix = val.replace(/[0-9.,]/g, '');
        const start = Date.now();
        const duration = 1800;
        const tick = () => {
          const p = Math.min((Date.now() - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const cur = Math.round(num * eased * 10) / 10;
          setDisplay((cur % 1 === 0 ? cur.toLocaleString() : cur.toLocaleString()) + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [val]);

  return <span ref={ref}>{display}</span>;
};
