import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Info, ChevronRight, Layers, SlidersHorizontal } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import ServiceMockup3D from './ServiceMockup3D';
import { soundManager } from '../utils/sound';

export default function Services({ onSelectService }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedDetailService, setSelectedDetailService] = useState(null);

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

  return (
    <section id="services" className="relative py-24 bg-[#0c0414] overflow-hidden">
      {/* Background Decorative Radial Lighting */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[#5A2D91]/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#24103D]/25 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e0d36]/80 border border-[#D8C2F0]/20 text-[#D8C2F0] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
              <span>Full-Spectrum Production Lab</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              PRECISION CRAFT.{' '}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D8C2F0] to-[#8E63CB]">
                11 SPECIALIZED SERVICES.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#D8C2F0]/70 max-w-md leading-relaxed">
            Every service is backed by dedicated pre-press verification, calibrated solvent & UV presses, and master craft finishing located directly in Melapalayam.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setActiveFilter(cat);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] text-white shadow-[0_0_20px_rgba(142,99,203,0.4)] scale-105'
                  : 'bg-[#180a29]/80 text-[#EEE7F5]/70 hover:text-white hover:bg-[#25103f] border border-[#D8C2F0]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid (All 11 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => {
                  setHoveredCard(service.id);
                  soundManager.playHover();
                }}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl bg-gradient-to-b from-[#180a2b] via-[#120520] to-[#0c0414] border border-[#D8C2F0]/15 hover:border-[#8E63CB]/50 p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_45px_rgba(90,45,145,0.35)]"
              >
                {/* Top Bar with Number & Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#8E63CB]">
                      {service.number} // 11
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#24103D] text-[#D8C2F0] border border-[#D8C2F0]/20">
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
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-[#D8C2F0] transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#8E63CB] mb-3">
                    {service.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-[#EEE7F5]/70 leading-relaxed mb-5 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Key Highlights Bullet points */}
                  <ul className="space-y-1.5 mb-6 border-t border-[#D8C2F0]/10 pt-4">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-[#D8C2F0]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8E63CB] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action CTAs */}
                <div className="pt-4 border-t border-[#D8C2F0]/10 flex items-center justify-between gap-3">
                  {/* View Specs Trigger */}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedDetailService(service);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D8C2F0] hover:text-white transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Specs</span>
                  </button>

                  {/* Enquire CTA */}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      if (onSelectService) onSelectService(service);
                    }}
                    className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] hover:from-[#6b35ad] hover:to-[#a175df] shadow-[0_0_15px_rgba(90,45,145,0.4)] transition-all"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Details Modal / Drawer */}
      {selectedDetailService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#140625] border border-[#D8C2F0]/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedDetailService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#D8C2F0] transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#5A2D91] text-white">
                {selectedDetailService.number}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#D8C2F0] font-semibold">
                Technical Specifications
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {selectedDetailService.title}
            </h3>
            <p className="text-sm text-[#8E63CB] font-medium mb-6">
              {selectedDetailService.tagline}
            </p>

            {/* Mockup Inside Modal */}
            <div className="mb-6">
              <ServiceMockup3D
                type={selectedDetailService.mockupType}
                title={selectedDetailService.title}
                isHovered={true}
              />
            </div>

            {/* Specs Table */}
            <div className="bg-[#1b0a31] rounded-xl p-4 border border-[#D8C2F0]/15 mb-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D8C2F0] mb-2">
                Production Specifications
              </h4>
              {Object.entries(selectedDetailService.specs).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:justify-between text-xs py-1.5 border-b border-white/5 last:border-none">
                  <span className="text-[#D8C2F0]/70 uppercase tracking-wider font-mono capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-white font-semibold sm:text-right mt-0.5 sm:mt-0">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* All Features */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D8C2F0] mb-3">
                Key Production Capabilities
              </h4>
              <ul className="space-y-2">
                {selectedDetailService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#EEE7F5]">
                    <CheckCircle2 className="w-4 h-4 text-[#8E63CB] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  const service = selectedDetailService;
                  setSelectedDetailService(null);
                  if (onSelectService) onSelectService(service);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] text-sm font-bold text-white shadow-[0_0_25px_rgba(142,99,203,0.5)] hover:scale-[1.02] active:scale-95 transition-all text-center"
              >
                Request Quote for {selectedDetailService.title}
              </button>

              <a
                href={`https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20am%20interested%20in%20${encodeURIComponent(selectedDetailService.title)}%20specifications.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#24103D] hover:bg-[#321655] border border-[#D8C2F0]/30 text-sm font-semibold text-[#D8C2F0] hover:text-white transition-colors text-center"
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
