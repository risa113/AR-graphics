import React, { useEffect, useRef } from 'react';
import { Sparkles, Printer, Sliders, Crosshair, Clock, Layers, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { whyChooseData } from '../data/whyChooseData';
import { soundManager } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const headingSolidRef = useRef(null);
  const headingGradientRef = useRef(null);
  const badgeRef = useRef(null);
  const descRef = useRef(null);
  const cardsGridRef = useRef(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#5A2D91]" />;
      case 'Printer':
        return <Printer className="w-5 h-5 text-[#5A2D91]" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-[#5A2D91]" />;
      case 'Crosshair':
        return <Crosshair className="w-5 h-5 text-[#5A2D91]" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-[#5A2D91]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#5A2D91]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#5A2D91]" />;
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let splitHeading = null;

    const ctx = gsap.context(() => {
      // 1. Badge pop-in
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.88, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: badgeRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 2. Solid SplitType Heading Reveal
      if (headingSolidRef.current) {
        splitHeading = new SplitType(headingSolidRef.current, { types: 'lines,words' });
        if (splitHeading.words && splitHeading.words.length > 0) {
          gsap.fromTo(
            splitHeading.words,
            { opacity: 0, y: 35, filter: 'blur(4px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              stagger: 0.03,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headingSolidRef.current,
                start: 'top 88%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }

      // 2b. Gradient Masked Slide Up
      if (headingGradientRef.current) {
        gsap.fromTo(
          headingGradientRef.current,
          { opacity: 0, y: '100%' },
          {
            opacity: 1,
            y: '0%',
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headingSolidRef.current || headingGradientRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 3. Description fade up
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: descRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 4. Staggered Wave Reveal of the 6 Feature Pillars
      if (cardsGridRef.current) {
        const pillarCards = cardsGridRef.current.querySelectorAll('.pillar-card-item');
        if (pillarCards.length > 0) {
          gsap.fromTo(
            pillarCards,
            { opacity: 0, y: 65, scale: 0.84 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              stagger: 0.09,
              ease: 'back.out(1.8)',
              scrollTrigger: {
                trigger: cardsGridRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }
    }, sectionRef);

    return () => {
      if (splitHeading) splitHeading.revert();
      ctx.revert();
    };
  }, []);

  const handleCardMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = '';
  };

  return (
    <section ref={sectionRef} id="why-us" className="relative py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9FC] border border-[#EAE3F1] text-[#5A2D91] text-xs uppercase tracking-[0.2em] font-bold mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
            <span>The Graphix Advantage</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#35204F] tracking-tight mb-5">
            <span ref={headingSolidRef} className="block">
              ENGINEERED FOR MEMORABILITY.
            </span>
            <div className="overflow-hidden">
              <span
                ref={headingGradientRef}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#35204F] via-[#5A2D91] to-[#8E63CB]"
              >
                BUILT FOR ENDURANCE.
              </span>
            </div>
          </h2>

          <p ref={descRef} className="text-sm sm:text-base text-[#625B69] leading-relaxed">
            Six foundational commitments that define every banner, sign board, sticker cut, and corporate card we produce in Melapalayam.
          </p>
        </div>

        {/* 6 Feature Pillars Grid */}
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseData.map((item, idx) => (
            <div
              key={item.id}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onMouseEnter={() => soundManager.playHover()}
              className="pillar-card-item group relative rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1] hover:border-[#D8C2F0] hover:bg-white p-7 flex flex-col justify-between transition-all duration-300 shadow-[0_2px_12px_rgba(53,32,79,0.03)] hover:shadow-[0_16px_36px_rgba(90,45,145,0.1)] will-change-transform"
            >
              <div>
                {/* Icon & Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white border border-[#EAE3F1] group-hover:border-[#D8C2F0] group-hover:scale-110 transition-all duration-300 shadow-sm">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#8A7E99]">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title & Headline */}
                <h3 className="text-xl font-bold text-[#35204F] mb-1.5 group-hover:text-[#5A2D91] transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-bold text-[#8E63CB] mb-3">
                  {item.headline}
                </div>

                <p className="text-xs text-[#625B69] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Sub-points */}
                <ul className="space-y-2 mb-6 border-t border-[#EAE3F1] pt-4">
                  {item.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#625B69]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5A2D91] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Stat Block */}
              <div className="pt-4 border-t border-[#EAE3F1]">
                <div className="text-sm font-bold text-[#35204F] font-mono">
                  {item.stats}
                </div>
                <div className="text-[10px] text-[#8A7E99]">
                  {item.statDetail}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
