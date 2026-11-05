import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronDown, Sparkles, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import HeroThreeScene from './HeroThreeScene';
import { soundManager } from '../utils/sound';

export default function Hero({ onOpenEnquiry }) {
  const containerRef = useRef(null);
  const headlineSolidRef = useRef(null);
  const headlineGradientRef = useRef(null);
  const [tickerIndex, setTickerIndex] = useState(0);

  const specializations = [
    'Graphic Design in Tirunelveli',
    'Heavy Star Flex Printing',
    '3D Acrylic LED Signboards',
    'Wedding & Political Banners',
    'Luxury Visiting Cards',
    'Vinyl Plotter & Vehicle Graphics'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % specializations.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [specializations.length]);

  // GSAP Heavy Pop and Slide Entrance Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let splitSolid = null;

    const ctx = gsap.context(() => {
      // 1. Heavy Elastic Pop for Eyebrow Bar (scale: 0.6 -> 1.08 -> 1)
      gsap.fromTo(
        '.hero-eyebrow',
        { opacity: 0, scale: 0.6, y: -25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'back.out(2.2)', delay: 0.1 }
      );

      // 2. Solid Headline: SplitType Character kinetic bounce pop & slide up
      if (headlineSolidRef.current) {
        splitSolid = new SplitType(headlineSolidRef.current, {
          types: 'words,chars',
          tagName: 'span'
        });

        if (splitSolid.chars && splitSolid.chars.length > 0) {
          gsap.fromTo(
            splitSolid.chars,
            {
              opacity: 0,
              y: 55,
              scale: 0.7,
              filter: 'blur(8px)',
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.75,
              stagger: 0.02,
              ease: 'back.out(1.8)',
              delay: 0.25,
            }
          );
        }
      }

      // 3. Gradient Headline: Masked Heavy Slide Up with Spring
      if (headlineGradientRef.current) {
        gsap.fromTo(
          headlineGradientRef.current,
          { opacity: 0, y: '120%', scale: 0.92 },
          { opacity: 1, y: '0%', scale: 1, duration: 0.95, ease: 'back.out(1.5)', delay: 0.45 }
        );
      }

      // 4. Tagline & Description heavy spring pop
      gsap.fromTo(
        '.hero-tagline',
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(2)', delay: 0.65 }
      );

      gsap.fromTo(
        '.hero-description',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.8 }
      );

      // 5. Staggered Heavy Button Pop
      gsap.fromTo(
        '.hero-btn-item',
        { opacity: 0, y: 35, scale: 0.75 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(2.2)', delay: 0.95 }
      );

      // 6. Guarantees Items Heavy Slide & Pop
      gsap.fromTo(
        '.hero-guarantee-pill',
        { opacity: 0, x: -25, scale: 0.85 },
        { opacity: 1, x: 0, scale: 1, duration: 0.7, stagger: 0.09, ease: 'back.out(1.8)', delay: 1.15 }
      );
    }, containerRef);

    return () => {
      if (splitSolid) splitSolid.revert();
      ctx.revert();
    };
  }, []);

  const handleScrollToSection = (selector) => (e) => {
    e.preventDefault();
    soundManager.playClick();
    if (window.__lenis) {
      window.__lenis.scrollTo(selector);
    } else {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-24 overflow-hidden overflow-x-clip bg-[#FAF9FC] bg-grid-diagonal w-full max-w-[100vw]"
    >
      {/* 3D WebGL Three.js Canvas Scene (Bright Studio) */}
      <HeroThreeScene />

      {/* Subtle Natural Studio Sunlight Beam */}
      <div className="absolute top-0 right-0 w-[350px] sm:w-[600px] h-[500px] bg-gradient-to-b from-white/80 via-[#F3ECFA]/30 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">

          {/* Unified Luxury Eyebrow Capsule — AR Monogram + Studio Name + Dynamic Specialization Ticker */}
          <div className="hero-eyebrow inline-flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2 pr-4 sm:pr-5 rounded-2xl sm:rounded-full bg-white/95 border border-[#EAE3F1] shadow-[0_4px_20px_rgba(53,32,79,0.06)] backdrop-blur-md mb-6 max-w-full">
            
            {/* AR Monogram Box with Dark Purple Lavender Gradient */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl sm:rounded-full bg-gradient-to-r from-[#24103D] via-[#5A2D91] to-[#7B42BC] text-white shadow-xs shrink-0">
              <div className="w-4 h-4 shrink-0">
                <img src={`${import.meta.env.BASE_URL}logo-monogram-white.svg`} alt="AR" className="w-full h-full object-contain" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-black tracking-widest uppercase">GRAPHIX STUDIO</span>
            </div>

            {/* Location indicator */}
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#5A2D91] shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#8E63CB]" />
              Melapalayam • Tirunelveli
            </span>

            <span className="hidden sm:inline-block text-[#D8C2F0]">•</span>

            {/* Dynamic Rotating Specialization Ticker */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#625B69] overflow-hidden">
              <span className="text-[#8E63CB] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider shrink-0">Expertise:</span>
              <div className="h-5 overflow-hidden relative min-w-[170px] sm:min-w-[210px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={tickerIndex}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="font-bold text-[#35204F] inline-block text-xs truncate max-w-full"
                  >
                    {specializations[tickerIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Main Kinetic Headline */}
          <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#35204F] leading-[1.08] mb-4 sm:mb-5">
            <span ref={headlineSolidRef} className="block">
              WE TURN IDEAS INTO
            </span>
            <div className="overflow-hidden inline-block">
              <span
                ref={headlineGradientRef}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#35204F] via-[#5A2D91] to-[#8E63CB]"
              >
                VISUAL IMPACT.
              </span>
            </div>
          </h1>

          {/* Official Tagline with High-Impact Letter Spacing */}
          <div className="hero-tagline inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F3ECFA]/80 border border-[#D8C2F0]/60 text-xs sm:text-sm font-extrabold tracking-[0.22em] text-[#5A2D91] uppercase mb-4 shadow-2xs">
            <span>CREATE VISIBILITY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E63CB]" />
            <span>BUILD IDENTITY</span>
          </div>

          {/* Supporting Text — Optimized for Tirunelveli Local Authority */}
          <p className="hero-description text-sm sm:text-base text-[#4A3E59] max-w-xl leading-relaxed mb-8 font-medium">
            Creative Graphic Design, Banner Design & Professional Flex Printing in Tirunelveli. Operating from Melapalayam with same-day print turnaround and state-of-the-art Japanese wide-format machines.
          </p>

          {/* Action Buttons with Heavy Pop & Slide Interactions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 w-full max-w-md sm:max-w-none">
            {/* Primary CTA: Explore Our Work */}
            <a
              href="#portfolio"
              onClick={handleScrollToSection('#portfolio')}
              onMouseEnter={() => soundManager.playHover()}
              className="hero-btn-item group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-wide text-white bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] hover:from-[#6c36ac] hover:to-[#9c71da] shadow-[0_6px_22px_rgba(90,45,145,0.28)] hover:shadow-[0_10px_30px_rgba(90,45,145,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95 text-center cursor-pointer"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Secondary CTA: Get a Design Quote */}
            <a
              href="#estimator"
              onClick={handleScrollToSection('#estimator')}
              onMouseEnter={() => soundManager.playHover()}
              className="hero-btn-item inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-wide text-[#35204F] bg-white border border-[#EAE3F1] hover:border-[#8E63CB] hover:bg-[#FAF9FC] transition-all duration-300 shadow-sm hover:scale-[1.03] active:scale-95 text-center cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#5A2D91]" />
              <span>Get a Design Quote</span>
            </a>

            {/* Direct WhatsApp CTA */}
            <a
              href="https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20would%20like%20to%20enquire%20about%20creative%20graphic%20design%20and%20flex%20printing%20in%20Tirunelveli."
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="hero-btn-item inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-4 rounded-full text-xs font-semibold text-[#625B69] hover:text-[#35204F] transition-colors text-center"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Contact Us on WhatsApp</span>
            </a>
          </div>

          {/* Highlights & Guarantees with Heavy Pop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#EAE3F1] max-w-2xl w-full">
            <div className="hero-guarantee-pill flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-[#EAE3F1]/80 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0" />
              <span className="text-xs font-bold text-[#35204F]">11+ Specialized Services</span>
            </div>
            <div className="hero-guarantee-pill flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-[#EAE3F1]/80 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#8E63CB] shrink-0" />
              <span className="text-xs font-bold text-[#35204F]">100% In-House Production Lab</span>
            </div>
            <div className="hero-guarantee-pill flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-[#EAE3F1]/80 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0" />
              <span className="text-xs font-bold text-[#35204F]">Tirunelveli Express Dispatch</span>
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
