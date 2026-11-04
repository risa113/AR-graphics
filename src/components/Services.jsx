import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Info, X, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { servicesData } from '../data/servicesData';
import ServiceMockup3D from './ServiceMockup3D';
import { soundManager } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function Services({ onSelectService }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedDetailService, setSelectedDetailService] = useState(null);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'grid'
  const [currentSlide, setCurrentSlide] = useState(0);

  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const headingSolidRef = useRef(null);
  const headingGradientRef = useRef(null);
  const badgeRef = useRef(null);
  const descRef = useRef(null);
  const toolbarRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const categories = [
    'All',
    'Outdoor & Signage',
    'Commercial Print',
    'Specialty & Gifts'
  ];

  const filterService = (service) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Outdoor & Signage') {
      return ['flex-work', 'vinyl-sticker-work', 'sticker-cutting', 'led-board-work'].includes(service.id);
    }
    if (activeFilter === 'Commercial Print') {
      return ['visiting-cards', 'pamphlets', 'notices', 'bill-books'].includes(service.id);
    }
    if (activeFilter === 'Specialty & Gifts') {
      return ['wedding-cards', 'sublimation-gifts', 'rubber-stamps'].includes(service.id);
    }
    return true;
  };

  const filteredServices = servicesData.filter(filterService);

  // GSAP ScrollTrigger & SplitType Setup
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

      // 2. Typography SplitType Line/Word Reveal on Solid Title
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
              stagger: 0.035,
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

      // 2b. Gradient Sub-headline Slide up from mask
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

      // 3. Section Description fade up
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

      // 4. Toolbar fade up
      if (toolbarRef.current) {
        gsap.fromTo(
          toolbarRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: toolbarRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 5. Staggered Service Cards entrance
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.service-card-item');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 45, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }
    }, containerRef);

    return () => {
      if (splitHeading) splitHeading.revert();
      ctx.revert();
    };
  }, [viewMode, activeFilter]);

  const slideLeft = () => {
    soundManager.playClick();
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth > 768 ? 420 : 320;
      sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const slideRight = () => {
    soundManager.playClick();
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth > 768 ? 420 : 320;
      sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
    setCurrentSlide((prev) => Math.min(filteredServices.length - 1, prev + 1));
  };

  const scrollToSlide = (idx) => {
    soundManager.playClick();
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth > 768 ? 420 : 320;
      sliderRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    }
    setCurrentSlide(idx);
  };

  // Subtle 3D Card Tilt Handler
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
    <section ref={containerRef} id="services" className="relative py-24 bg-white overflow-hidden">
      {/* Background Soft Studio Gradient */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#F3ECFA]/40 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9FC] border border-[#EAE3F1] text-[#5A2D91] text-xs uppercase tracking-[0.2em] font-bold mb-4 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
              <span>Full-Spectrum Production Lab</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#35204F] tracking-tight leading-tight">
              <span ref={headingSolidRef} className="block">
                PRECISION CRAFT.
              </span>
              <div className="overflow-hidden">
                <span
                  ref={headingGradientRef}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#35204F] via-[#5A2D91] to-[#8E63CB]"
                >
                  11 SPECIALIZED SERVICES.
                </span>
              </div>
            </h2>
          </div>

          <p ref={descRef} className="text-sm sm:text-base text-[#625B69] max-w-md leading-relaxed">
            Every service is backed by dedicated pre-press verification, calibrated solvent & UV presses, and master craft finishing located directly in Melapalayam.
          </p>
        </div>

        {/* Toolbar: Category Filter Tabs + Cards Slide / Grid View Switcher + Slider Arrows */}
        <div ref={toolbarRef} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setActiveFilter(cat);
                  setCurrentSlide(0);
                  if (sliderRef.current) sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-[#5A2D91] text-white shadow-[0_4px_14px_rgba(90,45,145,0.25)] scale-105'
                    : 'bg-[#FAF9FC] text-[#625B69] hover:text-[#35204F] hover:bg-[#F3ECFA] border border-[#EAE3F1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode & Slider Navigation Arrows */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-full bg-[#FAF9FC] border border-[#EAE3F1]">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setViewMode('slider');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'slider'
                    ? 'bg-[#5A2D91] text-white shadow-sm'
                    : 'text-[#625B69] hover:text-[#35204F]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Card Slides</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setViewMode('grid');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#5A2D91] text-white shadow-sm'
                    : 'text-[#625B69] hover:text-[#35204F]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>

            {/* Slider Navigation Buttons (Only in slider mode) */}
            {viewMode === 'slider' && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={slideLeft}
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-2 rounded-full bg-white hover:bg-[#FAF9FC] border border-[#EAE3F1] hover:border-[#D8C2F0] text-[#35204F] shadow-sm transition-all active:scale-95"
                  title="Slide Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={slideRight}
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-2 rounded-full bg-white hover:bg-[#FAF9FC] border border-[#EAE3F1] hover:border-[#D8C2F0] text-[#35204F] shadow-sm transition-all active:scale-95"
                  title="Slide Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 1. CARDS SLIDES CAROUSEL VIEW */}
        {viewMode === 'slider' && (
          <div ref={cardsContainerRef} className="relative">
            {/* Scrollable / Swipeable Sliding Cards Track */}
            <div
              ref={sliderRef}
              className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredServices.map((service) => {
                const isHovered = hoveredCard === service.id;

                return (
                  <div
                    key={service.id}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    onMouseEnter={() => {
                      setHoveredCard(service.id);
                      soundManager.playHover();
                    }}
                    className="service-card-item w-[85vw] sm:w-[380px] lg:w-[410px] shrink-0 snap-center rounded-2xl bg-white border border-[#EAE3F1] hover:border-[#D8C2F0] p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_-2px_rgba(53,32,79,0.04)] hover:shadow-[0_20px_40px_-8px_rgba(90,45,145,0.14)] will-change-transform"
                  >
                    {/* Top Bar with Number & Badge */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#5A2D91]">
                          {service.number} // 11
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#FAF9FC] text-[#5A2D91] border border-[#EAE3F1]">
                          {service.badge}
                        </span>
                      </div>

                      {/* 3D Realistic Product Mockup Component */}
                      <div className="mb-6">
                        <ServiceMockup3D
                          type={service.mockupType}
                          title={service.title}
                          isHovered={isHovered}
                        />
                      </div>

                      {/* Titles & Description */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#35204F] mb-1 group-hover:text-[#5A2D91] transition-colors">
                        {service.title}
                      </h3>
                      <div className="text-xs font-bold text-[#8E63CB] mb-3">
                        {service.subtitle}
                      </div>
                      <p className="text-xs sm:text-sm text-[#625B69] leading-relaxed mb-5 line-clamp-3">
                        {service.description}
                      </p>

                      {/* Key Highlights Bullet points */}
                      <ul className="space-y-1.5 mb-6 border-t border-[#EAE3F1] pt-4">
                        {service.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 text-[11px] text-[#625B69]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#5A2D91] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Action CTAs */}
                    <div className="pt-4 border-t border-[#EAE3F1] flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedDetailService(service);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A2D91] hover:text-[#8E63CB] transition-colors"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Specs & Details</span>
                      </button>

                      <button
                        onClick={() => {
                          soundManager.playClick();
                          if (onSelectService) onSelectService(service);
                        }}
                        className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] hover:from-[#6c36ac] hover:to-[#9c71da] shadow-sm transition-all"
                      >
                        <span>Enquire</span>
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slide Navigation Pagination Indicator Track */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {filteredServices.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === i ? 'w-8 bg-[#5A2D91]' : 'w-2 bg-[#EAE3F1] hover:bg-[#D8C2F0]'
                  }`}
                  aria-label={`Slide to service ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* 2. FULL GRID VIEW */}
        {viewMode === 'grid' && (
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => {
              const isHovered = hoveredCard === service.id;

              return (
                <div
                  key={service.id}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onMouseEnter={() => {
                    setHoveredCard(service.id);
                    soundManager.playHover();
                  }}
                  className="service-card-item group relative rounded-2xl bg-white border border-[#EAE3F1] hover:border-[#D8C2F0] p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_-2px_rgba(53,32,79,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(90,45,145,0.12)] will-change-transform"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold tracking-widest text-[#5A2D91]">
                        {service.number} // 11
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#FAF9FC] text-[#5A2D91] border border-[#EAE3F1]">
                        {service.badge}
                      </span>
                    </div>

                    <div className="mb-6">
                      <ServiceMockup3D
                        type={service.mockupType}
                        title={service.title}
                        isHovered={isHovered}
                      />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#35204F] mb-1 group-hover:text-[#5A2D91] transition-colors">
                      {service.title}
                    </h3>
                    <div className="text-xs font-bold text-[#8E63CB] mb-3">
                      {service.subtitle}
                    </div>
                    <p className="text-xs sm:text-sm text-[#625B69] leading-relaxed mb-5 line-clamp-3">
                      {service.description}
                    </p>

                    <ul className="space-y-1.5 mb-6 border-t border-[#EAE3F1] pt-4">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] text-[#625B69]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5A2D91] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#EAE3F1] flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedDetailService(service);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A2D91] hover:text-[#8E63CB] transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Specs</span>
                    </button>

                    <button
                      onClick={() => {
                        soundManager.playClick();
                        if (onSelectService) onSelectService(service);
                      }}
                      className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] hover:from-[#6c36ac] hover:to-[#9c71da] shadow-sm transition-all"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Service Details Modal */}
      {selectedDetailService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl rounded-2xl bg-white border border-[#EAE3F1] p-6 sm:p-8 shadow-[0_25px_60px_rgba(53,32,79,0.18)] max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedDetailService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9FC] hover:bg-[#F3ECFA] text-[#35204F] border border-[#EAE3F1] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#5A2D91] text-white">
                {selectedDetailService.number}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#5A2D91] font-bold">
                Technical Specifications
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#35204F] mb-1">
              {selectedDetailService.title}
            </h3>
            <p className="text-xs font-bold text-[#8E63CB] mb-5">
              {selectedDetailService.tagline}
            </p>

            <div className="mb-6">
              <ServiceMockup3D
                type={selectedDetailService.mockupType}
                title={selectedDetailService.title}
                isHovered={true}
              />
            </div>

            <div className="bg-[#FAF9FC] rounded-xl p-4 border border-[#EAE3F1] mb-6 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#35204F] mb-2">
                Production Specifications
              </h4>
              {Object.entries(selectedDetailService.specs).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:justify-between text-xs py-1.5 border-b border-gray-100 last:border-none">
                  <span className="text-[#625B69] uppercase tracking-wider font-mono capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-[#35204F] font-bold sm:text-right mt-0.5 sm:mt-0">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#35204F] mb-3">
                Key Production Capabilities
              </h4>
              <ul className="space-y-2">
                {selectedDetailService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#625B69]">
                    <CheckCircle2 className="w-4 h-4 text-[#5A2D91] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  const service = selectedDetailService;
                  setSelectedDetailService(null);
                  if (onSelectService) onSelectService(service);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] text-xs font-bold text-white shadow-[0_4px_14px_rgba(90,45,145,0.25)] hover:scale-[1.02] active:scale-95 transition-all text-center"
              >
                Request Quote for {selectedDetailService.title}
              </button>

              <a
                href={`https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20am%20interested%20in%20${encodeURIComponent(selectedDetailService.title)}%20specifications.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#FAF9FC] hover:bg-[#F3ECFA] border border-[#EAE3F1] text-xs font-bold text-[#35204F] transition-colors text-center"
              >
                WhatsApp Inquiry
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
