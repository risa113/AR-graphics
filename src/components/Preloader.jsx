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
        <div className="relative w-20 h-20 mb-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#EAE3F1"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#5A2D91"
              strokeWidth="2"
              strokeDasharray="280"
              strokeDashoffset={280 - (percent / 100) * 280}
              className="transition-all duration-150"
            />
            <path
              d="M 64 34 C 58 26 44 25 36 33 C 25 43 25 61 36 71 C 46 80 62 76 68 67 C 71 63 71 54 71 52 L 48 52 L 48 44 L 79 44 C 79 56 78 69 70 77 C 60 88 40 89 28 78 C 14 65 14 41 28 27 C 41 15 62 16 73 27 Z"
              fill="url(#preloaderBrightGrad)"
            />
            <circle cx="50" cy="50" r="4.5" fill="#5A2D91" />
            <defs>
              <linearGradient id="preloaderBrightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8E63CB" />
                <stop offset="100%" stopColor="#5A2D91" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Name */}
        <h1 className="text-xl font-black tracking-[0.22em] text-[#35204F] flex items-center gap-2 mb-1">
          GRAPHIX
          <span className="w-2 h-2 rounded-full bg-[#8E63CB]" />
        </h1>

        <p className="text-[10px] uppercase tracking-[0.28em] text-[#625B69] mb-5 font-semibold">
          Melapalayam • Tirunelveli
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
