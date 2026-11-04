import React, { useState, useRef } from 'react';
import { Eye, Sparkles, X, Check, ArrowRight, Palette, ChevronLeft, ChevronRight, SlidersHorizontal, LayoutGrid } from 'lucide-react';
import { portfolioCategories, portfolioItems } from '../data/portfolioData';
import ServiceMockup3D from './ServiceMockup3D';
import { soundManager } from '../utils/sound';

export default function Portfolio({ onRequestSimilar }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'grid'
  const sliderRef = useRef(null);

  const filteredItems = portfolioItems.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  const slideLeft = () => {
    soundManager.playClick();
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth > 768 ? 420 : 320;
      sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    soundManager.playClick();
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth > 768 ? 420 : 320;
      sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="relative py-28 bg-[#FAF9FC] border-t border-[#EAE3F1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE3F1] text-[#5A2D91] text-xs uppercase tracking-[0.2em] font-bold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
              <span>Curated Design Archive</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#35204F] tracking-tight">
              FEATURED WORK &{' '}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35204F] via-[#5A2D91] to-[#8E63CB]">
                PRODUCTION REPERTOIRE
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#625B69] max-w-md leading-relaxed">
            A showcase of recent graphic concepts, precision signage, and high-GSM print executions created for businesses and events across Tirunelveli district.
          </p>
        </div>

        {/* Toolbar: Categories + View Switcher & Slide Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Categories Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(cat);
                  if (sliderRef.current) sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#5A2D91] text-white shadow-sm scale-105'
                    : 'bg-white text-[#625B69] hover:text-[#35204F] hover:bg-[#F3ECFA] border border-[#EAE3F1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Controls: Mode & Slide Arrows */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex items-center p-1 rounded-full bg-white border border-[#EAE3F1] shadow-sm">
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

        {/* 1. CARDS SLIDES VIEW */}
        {viewMode === 'slider' && (
          <div
            ref={sliderRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedProject(item);
                }}
                className="w-[85vw] sm:w-[380px] lg:w-[410px] shrink-0 snap-center group cursor-pointer rounded-2xl bg-white border border-[#EAE3F1] hover:border-[#D8C2F0] p-5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 shadow-[0_4px_20px_rgba(53,32,79,0.04)] hover:shadow-[0_20px_40px_rgba(90,45,145,0.14)]"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden mb-5">
                    <ServiceMockup3D
                      type={item.previewType}
                      title={item.title}
                      isHovered={false}
                    />
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="px-4 py-2 rounded-full bg-[#5A2D91] text-white text-xs font-bold flex items-center gap-2 shadow-md">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Specifications</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#5A2D91]">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#8A7E99]">
                      {item.clientType}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#35204F] mb-1.5 group-hover:text-[#5A2D91] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#625B69] line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#EAE3F1] text-[11px] text-[#625B69]">
                  <span className="font-mono">{item.dimensions}</span>
                  <span className="flex items-center gap-1 text-[#5A2D91] font-bold group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. MASONRY GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedProject(item);
                }}
                className={`group cursor-pointer rounded-2xl bg-white border border-[#EAE3F1] hover:border-[#D8C2F0] p-5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(53,32,79,0.04)] hover:shadow-[0_16px_36px_rgba(90,45,145,0.12)] ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="relative rounded-xl overflow-hidden mb-5">
                  <ServiceMockup3D
                    type={item.previewType}
                    title={item.title}
                    isHovered={false}
                  />
                  
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="px-4 py-2 rounded-full bg-[#5A2D91] text-white text-xs font-bold flex items-center gap-2 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Specifications</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#5A2D91]">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#8A7E99]">
                      {item.clientType}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#35204F] mb-1.5 group-hover:text-[#5A2D91] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#625B69] line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#EAE3F1] text-[11px] text-[#625B69]">
                    <span className="font-mono">{item.dimensions}</span>
                    <span className="flex items-center gap-1 text-[#5A2D91] font-bold group-hover:translate-x-1 transition-transform">
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Full-Screen Project Lightbox - Clean White Surface */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-[#EAE3F1] p-6 sm:p-8 shadow-[0_25px_70px_rgba(53,32,79,0.18)] max-h-[92vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9FC] hover:bg-[#F3ECFA] text-[#35204F] border border-[#EAE3F1] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category & Title */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-[#5A2D91] text-white uppercase tracking-wider">
                {selectedProject.category}
              </span>
              <span className="text-xs text-[#625B69] font-mono">
                {selectedProject.clientType}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#35204F] mb-2">
              {selectedProject.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#625B69] leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Visual Mockup */}
            <div className="mb-6">
              <ServiceMockup3D
                type={selectedProject.previewType}
                title={selectedProject.title}
                isHovered={true}
              />
            </div>

            {/* Detailed Specs Block */}
            <div className="bg-[#FAF9FC] rounded-xl p-4 border border-[#EAE3F1] mb-6 space-y-2.5">
              <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                <span className="text-[#625B69] font-mono">Dimensions</span>
                <span className="text-[#35204F] font-bold">{selectedProject.dimensions}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                <span className="text-[#625B69] font-mono">Material & Finish</span>
                <span className="text-[#35204F] font-bold">{selectedProject.finish}</span>
              </div>
            </div>

            {/* Color Palette Swatches */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#35204F] mb-2.5">
                <Palette className="w-3.5 h-3.5 text-[#5A2D91]" />
                <span>Engineered Color Palette</span>
              </div>
              <div className="flex items-center gap-2">
                {selectedProject.colorPalette.map((col, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-[#FAF9FC] px-2.5 py-1 rounded-md border border-[#EAE3F1]">
                    <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: col }} />
                    <span className="text-[10px] font-mono text-[#35204F] font-semibold uppercase">{col}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <div className="text-xs font-bold uppercase tracking-wider text-[#35204F] mb-2.5">
                Project Highlights
              </div>
              <ul className="space-y-1.5">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[#625B69]">
                    <Check className="w-3.5 h-3.5 text-[#5A2D91]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const proj = selectedProject;
                  setSelectedProject(null);
                  if (onRequestSimilar) onRequestSimilar(proj);
                }}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] text-xs font-bold text-white shadow-md hover:scale-[1.02] active:scale-95 transition-all text-center"
              >
                Request Similar Design & Print
              </button>

              <a
                href={`https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20am%20referring%20to%20your%20project:%20${encodeURIComponent(selectedProject.title)}.%20Can%20we%20produce%20something%20similar?`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#FAF9FC] hover:bg-[#F3ECFA] border border-[#EAE3F1] text-xs font-bold text-[#35204F] transition-colors text-center"
              >
                Inquire on WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
