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
      className="relative min-h-[720px] max-h-[960px] h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0c0414]"
    >
      {/* 3D WebGL Three.js Canvas Scene */}
      <HeroThreeScene />

      {/* Ambient Radial Gradient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#5A2D91]/20 via-[#8E63CB]/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#24103D]/30 blur-[120px] pointer-events-none" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
        <div className="max-w-3xl">

          {/* Location & Studio Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1b0c2e]/70 border border-[#D8C2F0]/20 backdrop-blur-xl mb-6 shadow-[0_4px_25px_rgba(90,45,145,0.25)] animate-fade-in max-w-full">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8E63CB] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D8C2F0]" />
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-semibold text-[#D8C2F0] truncate">
              Graphix Studio • Melapalayam, Tirunelveli
            </span>
            <span className="hidden sm:inline-block text-[#D8C2F0]/30">•</span>
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-[#EEE7F5]/80 font-medium shrink-0">
              <MapPin className="w-3 h-3 text-[#8E63CB]" />
              Tamil Nadu
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08] mb-5 sm:mb-6">
            YOUR IDEAS.{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D8C2F0] to-[#8E63CB] drop-shadow-[0_10px_25px_rgba(142,99,203,0.3)]">
              OUR DESIGN.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl md:text-2xl font-medium text-[#EEE7F5]/90 mb-3 sm:mb-4 tracking-wide max-w-2xl">
            Creative Design. Professional Printing. Powerful Brand Identity.
          </p>

          <p className="text-xs sm:text-base text-[#D8C2F0]/70 max-w-xl leading-relaxed mb-8">
            Melapalayam's flagship creative studio combining high-aesthetic graphic design with state-of-the-art flex, vinyl, 3D LED signage, visiting cards, and promotional print engineering.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 w-full">
            {/* Primary CTA */}
            <a
              href="#services"
              onClick={handleScrollToServices}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white overflow-hidden shadow-[0_0_35px_rgba(90,45,145,0.45)] hover:shadow-[0_0_50px_rgba(142,99,203,0.7)] transition-all duration-300 hover:scale-[1.02] active:scale-95 bg-gradient-to-r from-[#5A2D91] via-[#8E63CB] to-[#5A2D91] bg-[length:200%_auto] hover:bg-right text-center"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>

            {/* Secondary CTA */}
            <button
              onClick={() => {
                soundManager.playClick();
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#190a2c]/80 hover:bg-[#25103f] border border-[#D8C2F0]/25 backdrop-blur-md transition-all duration-300 hover:border-[#D8C2F0]/50 hover:scale-[1.02] active:scale-95 text-center"
            >
              <MessageSquare className="w-4 h-4 text-[#8E63CB]" />
              <span>Let's Talk</span>
            </button>

            {/* Direct WhatsApp Quick Pill */}
            <a
              href="https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20would%20like%20to%20enquire%20about%20creative%20design%20and%20printing%20services."
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-4 rounded-full text-xs font-semibold text-[#D8C2F0] hover:text-white transition-colors text-center"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>WhatsApp: +91 75300 73785</span>
            </a>
          </div>

          {/* Highlights & Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#D8C2F0]/10 max-w-2xl w-full">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#8E63CB] shrink-0" />
              <span className="text-xs font-medium text-[#EEE7F5]/80">11+ Specialized Services</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#8E63CB] shrink-0" />
              <span className="text-xs font-medium text-[#EEE7F5]/80">100% Design-to-Print Lab</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#8E63CB] shrink-0" />
              <span className="text-xs font-medium text-[#EEE7F5]/80">Tirunelveli Fast Dispatch</span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-medium text-[#D8C2F0]/60 pointer-events-none">
        <span className="tracking-widest uppercase text-[10px]">Scroll To Explore</span>
        <ChevronDown className="w-4 h-4 text-[#8E63CB] animate-bounce" />
      </div>
    </section>
  );
}
