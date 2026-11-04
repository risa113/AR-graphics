import React from 'react';
import { Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function About({ onOpenEnquiry }) {
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

  return (
    <section id="about" className="relative py-28 bg-white overflow-hidden">
      {/* Background Studio Light Wash */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#F3ECFA]/40 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9FC] border border-[#EAE3F1] text-[#5A2D91] text-xs uppercase tracking-[0.2em] font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
          <span>About GRAPHIX</span>
        </div>

        {/* Big Signature Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#35204F] tracking-tight leading-[1.08] mb-6">
            WE TURN IDEAS INTO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35204F] via-[#5A2D91] to-[#8E63CB]">
              VISUAL EXPERIENCES.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#625B69] leading-relaxed font-normal">
            GRAPHIX is a premier creative graphic design and printing studio based in Melapalayam, Tirunelveli. We bridge the gap between imaginative visual artistry and rigorous physical print craftsmanship.
          </p>
        </div>

        {/* Two Column Brand Story Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Visual Brand Graphic Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-[#FAF9FC] border border-[#EAE3F1] p-8 shadow-sm overflow-hidden">
              
              {/* Subtle Decorative Gradient */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D8C2F0]/30 rounded-full blur-3xl pointer-events-none" />

              {/* Animated Brand Monogram */}
              <div className="relative w-36 h-36 mx-auto my-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-3xl bg-[#5A2D91]/10 blur-xl" />
                <svg className="w-full h-full relative z-10" viewBox="0 0 100 100" fill="none">
                  <rect x="6" y="6" width="88" height="88" rx="26" fill="white" stroke="#5A2D91" strokeWidth="2.5" />
                  <path
                    d="M 64 34 C 58 26 44 25 36 33 C 25 43 25 61 36 71 C 46 80 62 76 68 67 C 71 63 71 54 71 52 L 48 52 L 48 44 L 79 44 C 79 56 78 69 70 77 C 60 88 40 89 28 78 C 14 65 14 41 28 27 C 41 15 62 16 73 27 Z"
                    fill="url(#aboutBrightLogoGrad)"
                  />
                  <circle cx="50" cy="50" r="5" fill="#5A2D91" />
                  <defs>
                    <linearGradient id="aboutBrightLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8E63CB" />
                      <stop offset="100%" stopColor="#5A2D91" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Verified Location Card */}
              <div className="rounded-2xl bg-white border border-[#EAE3F1] p-4 text-center mt-6 shadow-sm">
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

          {/* Right Brand Pillars Content */}
          <div className="lg:col-span-7 space-y-6">
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
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1]">
                <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0" />
                <span className="text-xs font-bold text-[#35204F]">No Color Surprises</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1]">
                <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0" />
                <span className="text-xs font-bold text-[#35204F]">Zero Third-Party Vendor Delays</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1]">
                <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0" />
                <span className="text-xs font-bold text-[#35204F]">Authentic High-GSM Papers</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1]">
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
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] shadow-sm hover:shadow-[0_4px_16px_rgba(90,45,145,0.25)] transition-all"
              >
                <span>Discuss Your Project With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* 4-Step Production Journey */}
        <div className="pt-12 border-t border-[#EAE3F1]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-[#5A2D91] uppercase block mb-2">
              METHODICAL EXECUTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#35204F]">
              The Design-to-Print Workflow
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div
                key={st.num}
                className="rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1] p-6 flex flex-col justify-between hover:border-[#D8C2F0] hover:bg-white hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[#5A2D91]">
                      {st.num}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white text-[#5A2D91] border border-[#EAE3F1]">
                      {st.tag}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#35204F] mb-2">{st.title}</h4>
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
