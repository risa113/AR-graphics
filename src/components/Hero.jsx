import React from 'react';
import { ArrowRight, MessageSquare, Sparkles, MapPin, CheckCircle2, ChevronDown } from 'lucide-react';
import HeroThreeScene from './HeroThreeScene';
import { soundManager } from '../utils/sound';

export default function Hero({ onOpenEnquiry }) {
  const handleScrollToServices = (e) => {
    e.preventDefault();
    soundManager.playClick();
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[720px] max-h-[960px] h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden overflow-x-clip bg-[#FAF9FC] bg-grid-diagonal w-full max-w-[100vw]"
    >
      {/* 3D WebGL Three.js Canvas Scene (Bright Studio) */}
      <HeroThreeScene />

      {/* Subtle Natural Studio Sunlight Beam (Reference: AICM Lighting) */}
      <div className="absolute top-0 right-0 w-[350px] sm:w-[600px] h-[500px] bg-gradient-to-b from-white/80 via-[#F3ECFA]/30 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6">
        <div className="max-w-3xl">

          {/* Location & Studio Badge - Clean Bright Luxury */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 border border-[#EAE3F1] shadow-[0_2px_12px_rgba(53,32,79,0.06)] backdrop-blur-md mb-6 max-w-full">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8E63CB] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5A2D91]" />
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.2em] font-semibold text-[#5A2D91] truncate">
              Graphix Studio • Melapalayam
            </span>
            <span className="hidden sm:inline-block text-[#8A7E99]">•</span>
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-[#625B69] font-medium shrink-0">
              <MapPin className="w-3 h-3 text-[#8E63CB]" />
              Tirunelveli
            </span>
          </div>

          {/* Main Headline - Bold Deep Purple Display Typography */}
          <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#35204F] leading-[1.08] mb-5 sm:mb-6">
            YOUR IDEAS.{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35204F] via-[#5A2D91] to-[#8E63CB]">
              OUR DESIGN.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-xl md:text-2xl font-semibold text-[#35204F] mb-3 sm:mb-4 tracking-wide max-w-2xl">
            Creative Design. Professional Printing. Powerful Brand Identity.
          </p>

          <p className="text-xs sm:text-base text-[#625B69] max-w-xl leading-relaxed mb-8">
            Melapalayam's flagship creative studio combining high-aesthetic graphic design with state-of-the-art flex, vinyl, 3D LED signage, visiting cards, and promotional print engineering.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 w-full max-w-md sm:max-w-none">
            {/* Primary CTA */}
            <a
              href="#services"
              onClick={handleScrollToServices}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-wide text-white bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] hover:from-[#6c36ac] hover:to-[#9c71da] shadow-[0_6px_20px_rgba(90,45,145,0.25)] hover:shadow-[0_8px_25px_rgba(90,45,145,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-95 text-center"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Secondary CTA */}
            <button
              onClick={() => {
                soundManager.playClick();
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-[#35204F] bg-white hover:bg-[#FAF9FC] border border-[#EAE3F1] hover:border-[#D8C2F0] shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 text-center"
            >
              <MessageSquare className="w-4 h-4 text-[#5A2D91]" />
              <span>Let's Create Together</span>
            </button>

            {/* Direct WhatsApp Quick Pill */}
            <a
              href="https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20would%20like%20to%20enquire%20about%20creative%20design%20and%20printing%20services."
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-4 rounded-full text-xs font-semibold text-[#625B69] hover:text-[#35204F] transition-colors text-center"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>WhatsApp: +91 75300 73785</span>
            </a>
          </div>

          {/* Highlights & Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#EAE3F1] max-w-2xl w-full">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0" />
              <span className="text-xs font-medium text-[#35204F]">11+ Specialized Services</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#8E63CB] shrink-0" />
              <span className="text-xs font-medium text-[#35204F]">100% Design-to-Print Lab</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0" />
              <span className="text-xs font-medium text-[#35204F]">Tirunelveli Fast Dispatch</span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs font-semibold text-[#8A7E99] pointer-events-none">
        <span className="tracking-widest uppercase text-[9.5px]">Scroll To Explore</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#5A2D91] animate-bounce" />
      </div>
    </section>
  );
}
