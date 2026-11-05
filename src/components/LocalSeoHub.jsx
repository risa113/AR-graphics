import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Printer,
  Palette,
  Phone,
  Clock,
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { seoServicesData } from '../data/seoServicesData';
import { soundManager } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function LocalSeoHub() {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.seo-hub-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
          },
        }
      );

      // Grid cards staggered reveal
      gsap.fromTo(
        '.seo-card-item',
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.seo-cards-grid',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const localLocalities = [
    'Melapalayam',
    'Palayamkottai',
    'Tirunelveli Town',
    'Vannarpettai',
    'Pettai',
    'Maharaja Nagar',
    'KTC Nagar',
    'Rahmath Nagar',
    'Samathanapuram',
    'Perumalpuram',
    'High Ground'
  ];

  return (
    <section
      ref={containerRef}
      id="local-seo-hub"
      className="py-20 sm:py-28 bg-[#FAF9FC] relative overflow-hidden border-t border-b border-[#EAE3F1]"
    >
      {/* Background radial accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F3ECFA]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D8C2F0]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with High-Impact Typography */}
        <div className="seo-hub-header text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EAE3F1] shadow-xs text-xs font-bold text-[#5A2D91] uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#8E63CB]" />
            <span>Tirunelveli & Melapalayam Authority Hub</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#35204F] tracking-tight leading-tight mb-5">
            Specialized Graphic Design & Heavy Flex Printing Services
          </h2>

          <p className="text-sm sm:text-base text-[#625B69] leading-relaxed">
            Operating directly from <strong className="text-[#35204F]">Hameem Puram 7th Street, Melapalayam</strong>, GRAPHIX delivers industry-grade graphic design, billboard flex printing, acrylic signboards, and event banners across the entire Tirunelveli district.
          </p>
        </div>

        {/* 8 Specialized SEO Service Hub Cards Grid */}
        <div className="seo-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {seoServicesData.map((svc) => (
            <Link
              key={svc.slug}
              to={`/${svc.slug}`}
              onMouseEnter={() => soundManager.playHover()}
              className="seo-card-item group relative bg-white p-6 rounded-3xl border border-[#EAE3F1] hover:border-[#8E63CB] shadow-[0_4px_20px_rgba(53,32,79,0.03)] hover:shadow-[0_12px_32px_rgba(90,45,145,0.12)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#F3ECFA] text-[#5A2D91]">
                    {svc.badge}
                  </span>
                  <span className="text-xs font-bold text-[#8A7E99]">
                    From {svc.pricingStarting}
                  </span>
                </div>

                <h3 className="text-base font-black text-[#35204F] group-hover:text-[#5A2D91] transition-colors leading-snug mb-2">
                  {svc.title}
                </h3>

                <p className="text-xs text-[#625B69] line-clamp-3 leading-relaxed mb-4">
                  {svc.metaDescription}
                </p>

                <div className="space-y-1.5 mb-4">
                  {svc.features.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 text-[11px] font-semibold text-[#35204F] truncate">
                      <CheckCircle2 className="w-3 h-3 text-[#8E63CB] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#EAE3F1] flex items-center justify-between text-xs font-bold text-[#5A2D91] group-hover:text-[#8E63CB]">
                <span>View Full Specifications</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Local District Coverage & Verified Physical Presence */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE3F1] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: Regional Coverage Chips */}
            <div className="lg:col-span-7">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#5A2D91] block mb-2">
                Rapid On-Site Delivery & Setup Across
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#35204F] mb-4">
                Serving All Key Commercial Hubs in Tirunelveli
              </h3>
              <p className="text-xs sm:text-sm text-[#625B69] mb-6 leading-relaxed">
                Whether you need urgent flex banners printed for a shop opening in Vannarpettai, corporate visiting cards delivered to Palayamkottai, or grand wedding banners installed in Melapalayam, our production team provides reliable same-day dispatch.
              </p>

              <div className="flex flex-wrap gap-2">
                {localLocalities.map((loc, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF9FC] text-xs font-bold text-[#35204F] border border-[#EAE3F1]"
                  >
                    <MapPin className="w-3 h-3 text-[#8E63CB]" />
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 5 cols: Physical Studio Verified Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#35204F] to-[#5A2D91] text-white p-6 sm:p-7 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 text-[#D8C2F0]">
                    Official Studio Address
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#D8C2F0]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Open Today</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-black text-white mb-1">
                    GRAPHIX Creative Studio
                  </h4>
                  <p className="text-xs text-[#D8C2F0] leading-relaxed">
                    Hameem Puram 7th Street, Annai Hajira College Road, Melapalayam, Tirunelveli, Tamil Nadu 627005
                  </p>
                </div>

                <div className="pt-2 border-t border-white/15 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="tel:+917530073785"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white text-[#35204F] text-xs font-bold hover:bg-[#FAF9FC] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#5A2D91]" />
                    <span>Call 75300 73785</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=8.697471,77.712613"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

