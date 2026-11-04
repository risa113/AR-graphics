import React, { useEffect, useRef } from 'react';
import { Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { soundManager } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function About({ onOpenEnquiry }) {
  const sectionRef = useRef(null);
  const headlineSolidRef = useRef(null);
  const headlineGradientRef = useRef(null);
  const leftVisualRef = useRef(null);
  const rightContentRef = useRef(null);
  const workflowRef = useRef(null);
  const stepCardsRef = useRef([]);

  const steps = [
    {
      num: '01',
      title: 'Concept & Creative Direction',
      desc: 'We start by understanding your brand goal, target audience, and installation context. We develop unique typography and color combinations tailored to stand out.',
      tag: 'Discovery'
    },
    {
      num: '02',
      title: 'Vector Precision & Pre-Flight',
      desc: 'Every artwork is created in mathematically crisp vectors with exact bleed margins, CMYK color profiles, and optical contour paths for razor-sharp reproduction.',
      tag: 'Engineering'
    },
    {
      num: '03',
      title: 'High-Definition Print Production',
      desc: 'Our presses utilize solvent, eco-solvent, UV, and high-heat vacuum dye systems calibrated specifically for the selected substrate (Star Flex, Cast Vinyl, Artboard, Ceramic).',
      tag: 'Production'
    },
    {
      num: '04',
      title: 'Finishing & Rapid Local Delivery',
      desc: 'From double-fold hemmed borders with brass eyelets to velvet lamination, spot UV, and laser cuts, finished items undergo strict quality inspection in Melapalayam.',
      tag: 'Delivery'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let splitTitle = null;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const xDistance = isMobile ? 25 : 55;

      // 1. Headline Solid SplitType Reveal
      if (headlineSolidRef.current) {
        splitTitle = new SplitType(headlineSolidRef.current, { types: 'lines,words' });
        if (splitTitle.words && splitTitle.words.length > 0) {
          gsap.fromTo(
            splitTitle.words,
            { opacity: 0, y: 35, filter: 'blur(4px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              stagger: 0.03,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headlineSolidRef.current,
                start: 'top 88%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }

      // 1b. Headline Gradient Slide up from mask
      if (headlineGradientRef.current) {
        gsap.fromTo(
          headlineGradientRef.current,
          { opacity: 0, y: '100%' },
          {
            opacity: 1,
            y: '0%',
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headlineSolidRef.current || headlineGradientRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 2. Left Brand Visual Card: Slide from Left
      if (leftVisualRef.current) {
        gsap.fromTo(
          leftVisualRef.current,
          { opacity: 0, x: -xDistance },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftVisualRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 3. Right Brand Content: Slide from Right
      if (rightContentRef.current) {
        gsap.fromTo(
          rightContentRef.current,
          { opacity: 0, x: xDistance },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightContentRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 4. Staggered 4-Step Process Workflow Cards
      const validStepCards = stepCardsRef.current.filter(Boolean);
      if (validStepCards.length > 0) {
        gsap.fromTo(
          validStepCards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: workflowRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => {
      if (splitTitle) splitTitle.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 bg-white overflow-hidden">
      {/* Background Studio Light Wash */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#F3ECFA]/40 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9FC] border border-[#EAE3F1] text-[#5A2D91] text-xs uppercase tracking-[0.2em] font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
          <span>About GRAPHIX</span>
        </div>

        {/* Big Signature Headline with SplitType */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#35204F] tracking-tight leading-[1.08] mb-6">
            <span ref={headlineSolidRef} className="block">
              WE TURN IDEAS INTO
            </span>
            <div className="overflow-hidden">
              <span
                ref={headlineGradientRef}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#35204F] via-[#5A2D91] to-[#8E63CB]"
              >
                VISUAL EXPERIENCES.
              </span>
            </div>
          </h2>

          <p className="text-base sm:text-xl text-[#625B69] leading-relaxed font-normal">
            GRAPHIX is a premier creative graphic design and printing studio based in Melapalayam, Tirunelveli. We bridge the gap between imaginative visual artistry and rigorous physical print craftsmanship.
          </p>
        </div>

        {/* Two Column Brand Story Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Visual Brand Graphic Composition - Slide From Left */}
          <div ref={leftVisualRef} className="lg:col-span-5 relative will-change-transform">
            <div className="relative rounded-3xl bg-[#FAF9FC] border border-[#EAE3F1] p-8 shadow-sm overflow-hidden group">
              
              {/* Subtle Decorative Gradient */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D8C2F0]/30 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              {/* Official Sharp AR Monogram Tile with Subtle Float */}
              <div className="relative w-40 h-40 mx-auto my-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-3xl bg-[#5A2D91]/10 blur-xl group-hover:bg-[#5A2D91]/20 transition-colors" />
                <div className="relative z-10 w-32 h-32 rounded-3xl bg-white p-5 border border-[#EAE3F1] shadow-[0_8px_25px_rgba(90,45,145,0.08)] flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500">
                  <img
                    src="/logo-monogram.svg"
                    alt="Graphix Monogram"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Tagline Pill */}
              <div className="text-center mb-4">
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#5A2D91] uppercase">
                  CREATE VISIBILITY • BUILD IDENTITY
                </span>
              </div>

              {/* Verified Location Card */}
              <div className="rounded-2xl bg-white border border-[#EAE3F1] p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#5A2D91] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#5A2D91]" />
                  <span>Verified Studio Location</span>
                </div>
                <div className="text-xs text-[#35204F] font-semibold">
                  Hameem Puram 7th Street, Annai Hajira College Road
                </div>
                <div className="text-[11px] text-[#625B69] mt-0.5">
                  Melapalayam, Tirunelveli, Tamil Nadu
                </div>
              </div>

            </div>
          </div>

          {/* Right Brand Pillars Content - Slide From Right */}
          <div ref={rightContentRef} className="lg:col-span-7 space-y-6 will-change-transform">
            <h3 className="text-2xl sm:text-3xl font-black text-[#35204F]">
              Why Having Design & Print Under One Roof Matters
            </h3>

            <p className="text-sm sm:text-base text-[#625B69] leading-relaxed">
              When graphic designers don't understand the physical chemistry of UV inks, substrate absorption, or optical cutting knives, the final printed banner or business card looks dull and misaligned.
            </p>

            <p className="text-sm sm:text-base text-[#625B69] leading-relaxed">
              At GRAPHIX, our designers sit directly beside the production presses. Every gradient is calibrated for solvent reproduction. Every die-cut line is mathematically simulated. We ensure that what you approve on screen is exactly what arrives at your storefront.
            </p>

            {/* Quick Badges on White Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1] hover:border-[#D8C2F0] hover:bg-white transition-all">
                <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0" />
                <span className="text-xs font-bold text-[#35204F]">No Color Surprises</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1] hover:border-[#D8C2F0] hover:bg-white transition-all">
                <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0" />
                <span className="text-xs font-bold text-[#35204F]">Zero Third-Party Vendor Delays</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1] hover:border-[#D8C2F0] hover:bg-white transition-all">
                <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0" />
                <span className="text-xs font-bold text-[#35204F]">Authentic High-GSM Papers</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1] hover:border-[#D8C2F0] hover:bg-white transition-all">
                <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0" />
                <span className="text-xs font-bold text-[#35204F]">Express Local Turnaround</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  soundManager.playClick();
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] shadow-sm hover:shadow-[0_4px_16px_rgba(90,45,145,0.25)] hover:scale-105 active:scale-95 transition-all"
              >
                <span>Discuss Your Project With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* 4-Step Production Journey */}
        <div ref={workflowRef} className="pt-12 border-t border-[#EAE3F1]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-[#5A2D91] uppercase block mb-2">
              METHODICAL EXECUTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#35204F]">
              The Design-to-Print Workflow
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <div
                key={st.num}
                ref={(el) => (stepCardsRef.current[idx] = el)}
                className="rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1] p-6 flex flex-col justify-between hover:border-[#D8C2F0] hover:bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 will-change-transform group cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[#5A2D91] group-hover:scale-110 transition-transform inline-block">
                      {st.num}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white text-[#5A2D91] border border-[#EAE3F1] group-hover:border-[#D8C2F0]">
                      {st.tag}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#35204F] mb-2 group-hover:text-[#5A2D91] transition-colors">
                    {st.title}
                  </h4>
                  <p className="text-xs text-[#625B69] leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
