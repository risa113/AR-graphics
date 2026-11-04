import React, { useEffect, useRef } from 'react';
import { Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StoryMarquee() {
  const containerRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const cardsRef = useRef([]);

  const marqueeKeywords = [
    'CREATIVE GRAPHIC DESIGN',
    'HEAVY STAR FLEX WORK',
    'VINYL STICKER WORK',
    'PRECISION STICKER CUTTING',
    '3D ACRYLIC LED BOARDS',
    'LUXURY VISITING CARDS',
    'TRI-FOLD PAMPHLETS',
    'INSTITUTIONAL NOTICES',
    'ROYAL WEDDING INVITATIONS',
    'SUBLIMATION GIFTS',
    'CARBONLESS BILL BOOKS',
    'EXPRESS RUBBER STAMPS',
    'MELAPALAYAM • TIRUNELVELI'
  ];

  const highlights = [
    {
      icon: Zap,
      title: 'Ultra HD Resolution',
      desc: '1440 DPI solvent & eco print'
    },
    {
      icon: Layers,
      title: '100% In-House Lab',
      desc: 'Direct design-to-press craft'
    },
    {
      icon: ShieldCheck,
      title: 'Tested Media Quality',
      desc: 'Fade, weather & water resistant'
    },
    {
      icon: Sparkles,
      title: 'Melapalayam Direct',
      desc: 'Local rapid pickup & delivery'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Clip-Path reveal for the marquee banner row
      if (marqueeTrackRef.current) {
        gsap.fromTo(
          marqueeTrackRef.current,
          { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0.5 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: marqueeTrackRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 2. Staggered spring pop-up for the 4 highlight cards
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          {
            opacity: 0,
            y: 35,
            scale: 0.94
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative py-10 bg-white border-y border-[#EAE3F1] w-full overflow-hidden">
      {/* Background Soft Studio Wash */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9FC] via-white to-[#F3ECFA]/30 pointer-events-none" />

      {/* Marquee Row: Continuous Seamless Leftward Scrolling with Clip-Path entrance */}
      <div
        ref={marqueeTrackRef}
        className="relative w-full overflow-hidden select-none flex mb-6 will-change-[clip-path,opacity]"
      >
        <div className="flex items-center gap-8 animate-marquee shrink-0 whitespace-nowrap pr-8">
          {marqueeKeywords.map((word, idx) => (
            <div key={`m1-${idx}`} className="flex items-center gap-6 shrink-0">
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-widest text-[#35204F] hover:text-[#5A2D91] transition-colors">
                {word}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#8E63CB]" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-8 animate-marquee shrink-0 whitespace-nowrap pr-8" aria-hidden="true">
          {marqueeKeywords.map((word, idx) => (
            <div key={`m2-${idx}`} className="flex items-center gap-6 shrink-0">
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-widest text-[#35204F] hover:text-[#5A2D91] transition-colors">
                {word}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#8E63CB]" />
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Strip on Crisp White Cards with Staggered GSAP Reveal */}
      <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {highlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <div
              key={h.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1] shadow-[0_2px_10px_rgba(53,32,79,0.03)] hover:border-[#D8C2F0] hover:bg-white hover:shadow-md transition-all duration-300 group cursor-default"
            >
              <div className="p-2.5 rounded-xl bg-white text-[#5A2D91] border border-[#EAE3F1] group-hover:border-[#D8C2F0] group-hover:scale-105 transition-all shadow-sm">
                <Icon className="w-5 h-5 text-[#5A2D91]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#35204F] group-hover:text-[#5A2D91] transition-colors">
                  {h.title}
                </div>
                <div className="text-[11px] text-[#625B69]">{h.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
