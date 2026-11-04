import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setExiting(true), 150);
          setTimeout(() => onComplete && onComplete(), 550);
          return 100;
        }
        const step = Math.floor(Math.random() * 16) + 12;
        return Math.min(prev + step, 100);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF9FC] transition-all duration-700 ${
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
              className="transition-all duration-150"
            />
          </svg>

          {/* Polished AR Monogram in Center */}
          <div className="w-14 h-14 p-1.5 flex items-center justify-center">
            <img
              src="/logo-monogram.svg"
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

        <p className="text-[10px] uppercase tracking-[0.28em] text-[#5A2D91] mb-5 font-bold">
          Create Visibility • Build Identity
        </p>

        {/* Progress Bar & Percentage */}
        <div className="w-52 h-[3px] bg-[#EAE3F1] rounded-full overflow-hidden relative mb-2.5">
          <div
            className="h-full bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] rounded-full transition-all duration-100"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-52 text-[10px] font-mono text-[#8A7E99]">
          <span>CALIBRATING STUDIO</span>
          <span className="font-bold text-[#35204F]">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
