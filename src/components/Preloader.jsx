import React, { useState, useEffect, useRef } from 'react';

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 8;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);
        setTimeout(() => setExiting(true), 100);
        setTimeout(() => {
          if (onCompleteRef.current) onCompleteRef.current();
        }, 300);
      } else {
        setPercent(current);
      }
    }, 25);

    // Guaranteed fallback after 1.4s
    const fallback = setTimeout(() => {
      clearInterval(interval);
      setPercent(100);
      setExiting(true);
      setTimeout(() => {
        if (onCompleteRef.current) onCompleteRef.current();
      }, 200);
    }, 1400);

    return () => {
      clearInterval(interval);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF9FC] transition-all duration-500 ${
        exiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Soft Ambient Light */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#D8C2F0]/30 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Monogram Logo */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="#EAE3F1"
              strokeWidth="2.5"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="#5A2D91"
              strokeWidth="3"
              strokeDasharray="290"
              strokeDashoffset={290 - (percent / 100) * 290}
              strokeLinecap="round"
              className="transition-all duration-75"
            />
          </svg>

          {/* Polished AR Monogram on Dark Purple Lavender Background */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#24103D] via-[#5A2D91] to-[#7B42BC] border border-[#D8C2F0]/40 shadow-lg p-2.5 flex items-center justify-center">
            <img
              src={`${import.meta.env.BASE_URL}logo-monogram-white.svg`}
              alt="GRAPHIX Monogram"
              className="w-full h-full object-contain filter drop-shadow-md scale-95"
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl font-black tracking-[0.22em] text-[#35204F] flex items-center gap-2 mb-1.5">
          GRAPHIX
          <span className="w-2 h-2 rounded-full bg-[#8E63CB]" />
        </h1>

        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8E63CB] font-bold mb-4">
          CREATE VISIBILITY • BUILD IDENTITY
        </p>

        {/* Real Progress Metrics */}
        <div className="flex items-center gap-3">
          <div className="w-32 h-[3px] bg-[#EAE3F1] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] transition-all duration-75"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-[#5A2D91] w-8 text-right">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
