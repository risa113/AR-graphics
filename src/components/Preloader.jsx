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
        const step = Math.floor(Math.random() * 16) + 10;
        return Math.min(prev + step, 100);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0414] transition-all duration-700 ${
        exiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#5A2D91]/25 blur-[120px] pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated 3D/SVG Monogram Logo */}
        <div className="relative w-24 h-24 mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#8E63CB"
              strokeWidth="1.5"
              strokeDasharray="280"
              strokeDashoffset={280 - (percent / 100) * 280}
              className="transition-all duration-150"
            />
            <path
              d="M 64 34 C 58 26 44 25 36 33 C 25 43 25 61 36 71 C 46 80 62 76 68 67 C 71 63 71 54 71 52 L 48 52 L 48 44 L 79 44 C 79 56 78 69 70 77 C 60 88 40 89 28 78 C 14 65 14 41 28 27 C 41 15 62 16 73 27 Z"
              fill="url(#preloaderGrad)"
              className="animate-pulse"
            />
            <circle cx="50" cy="50" r="4.5" fill="#D8C2F0" />
            <defs>
              <linearGradient id="preloaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D8C2F0" />
                <stop offset="50%" stopColor="#8E63CB" />
                <stop offset="100%" stopColor="#5A2D91" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl font-black tracking-[0.25em] text-white flex items-center gap-2 mb-1">
          GRAPHIX
          <span className="w-2 h-2 rounded-full bg-[#8E63CB]" />
        </h1>

        <p className="text-xs uppercase tracking-[0.3em] text-[#D8C2F0]/80 mb-6 font-medium">
          Melapalayam • Tirunelveli
        </p>

        {/* Progress Bar & Percentage */}
        <div className="w-56 h-[3px] bg-[#24103D] rounded-full overflow-hidden relative mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#5A2D91] via-[#8E63CB] to-[#D8C2F0] rounded-full transition-all duration-100 shadow-[0_0_12px_#8E63CB]"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-56 text-[11px] font-mono text-[#D8C2F0]/70">
          <span>CALIBRATING PRINT ENGINE</span>
          <span className="font-bold text-white">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
