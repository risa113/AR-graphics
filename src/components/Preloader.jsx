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

          {/* Polished AR Monogram in Center */}
          <div className="w-14 h-14 p-1.5 flex items-center justify-center">
            <img
              src={`${import.meta.env.BASE_URL}logo-monogram.svg`}
              alt="GRAPHIX Monogram"
              className="w-full h-full object-contain filter drop-shadow-sm scale-95"
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl font-black tracking-[0.22em] text-[#35204F] flex items-center gap-2 mb-1.5">
          GRAPHIX
          <span className="w-2 h-2 rounded-full bg-[#8E63CB]" />
        </h1>

        {/* Tagline */}
        <span className="text-[10px] uppercase font-mono tracking-[0.28em] text-[#5A2D91] font-bold mb-6">
          CREATE VISIBILITY • BUILD IDENTITY
        </span>

        {/* Loading Bar Track */}
        <div className="w-48 h-1 bg-[#EAE3F1] rounded-full overflow-hidden relative mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#5A2D91] via-[#8E63CB] to-[#D8C2F0] transition-all duration-75 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Status Text & Numerical Percentage */}
        <div className="flex items-center justify-between w-48 text-[9px] font-mono text-[#8A7E99] uppercase tracking-wider">
          <span>Calibrating Studio</span>
          <span className="text-[#5A2D91] font-bold">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
