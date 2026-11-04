import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, Sparkles, MapPin, CheckCircle2, ChevronDown, Layers, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroThreeScene from './HeroThreeScene';
import { soundManager } from '../utils/sound';

export default function Hero({ onOpenEnquiry }) {
  const [tickerIndex, setTickerIndex] = useState(0);

  const specializations = [
    'Heavy Star Flex Printing',
    '3D Acrylic LED Signboards',
    'Precision Vinyl Sticker Cutting',
    'Luxury Matte Visiting Cards',
    'Direct Design-to-Press Lab'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % specializations.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [specializations.length]);

  const handleScrollToServices = (e) => {
    e.preventDefault();
    soundManager.playClick();
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[740px] max-h-[980px] h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden overflow-x-clip bg-[#FAF9FC] bg-grid-diagonal w-full max-w-[100vw]"
    >
      {/* 3D WebGL Three.js Canvas Scene (Bright Studio) */}
      <HeroThreeScene />

      {/* Subtle Natural Studio Sunlight Beam (Reference: AICM Lighting) */}
      <div className="absolute top-0 right-0 w-[350px] sm:w-[600px] h-[500px] bg-gradient-to-b from-white/80 via-[#F3ECFA]/30 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="max-w-3xl">

          {/* Location & Studio Badge with Official Monogram */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 border border-[#EAE3F1] shadow-[0_4px_16px_rgba(53,32,79,0.06)] backdrop-blur-md mb-5 max-w-full">
            <div className="w-5 h-5 rounded-full bg-white border border-[#EAE3F1] p-0.5 flex items-center justify-center shrink-0">
              <img src="/logo-monogram.svg" alt="Icon" className="w-full h-full object-contain" />
            </div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-bold text-[#5A2D91] truncate">
              Graphix Studio • Melapalayam
            </span>
            <span className="hidden sm:inline-block text-[#8A7E99]">•</span>
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-[#625B69] font-medium shrink-0">
              <MapPin className="w-3 h-3 text-[#8E63CB]" />
              Tirunelveli
            </span>
          </div>

          {/* Kinetic Word Rotating Ticker (More Animation in Text) */}
          <div className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-semibold text-[#625B69]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F3ECFA] text-[#5A2D91] text-[11px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3" /> Specializing In
            </span>
            <div className="h-6 overflow-hidden relative inline-block min-w-[200px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={tickerIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="font-bold text-[#35204F] inline-block"
                >
                  {specializations[tickerIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Main Headline - Bold Deep Purple Display Typography with Kinetic Reveal */}
          <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#35204F] leading-[1.08] mb-4 sm:mb-5">
            YOUR IDEAS.{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35204F] via-[#5A2D91] to-[#8E63CB]">
              OUR DESIGN.
            </span>
          </h1>

          {/* Official Tagline with High-Impact Letter Spacing */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-base font-extrabold tracking-[0.22em] text-[#5A2D91] uppercase mb-3">
            <span>CREATE VISIBILITY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E63CB]" />
            <span>BUILD IDENTITY</span>
          </div>

          {/* Supporting Text */}
          <p className="text-xs sm:text-base text-[#625B69] max-w-xl leading-relaxed mb-8">
            Melapalayam's flagship creative design and high-precision print production lab. From heavy-duty star flex banners and 3D acrylic LED signage to luxury visiting cards and custom corporate gifts.
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
