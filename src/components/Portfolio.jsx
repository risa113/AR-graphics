import React, { useState } from 'react';
import { Eye, ExternalLink, Sparkles, X, Check, ArrowRight, Palette } from 'lucide-react';
import { portfolioCategories, portfolioItems } from '../data/portfolioData';
import ServiceMockup3D from './ServiceMockup3D';
import { soundManager } from '../utils/sound';

export default function Portfolio({ onRequestSimilar }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredItems = portfolioItems.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <section id="work" className="relative py-28 bg-[#0e0517] border-t border-[#D8C2F0]/10 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#5A2D91]/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e0d36] border border-[#D8C2F0]/20 text-[#D8C2F0] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
              <span>Curated Design Archive</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              FEATURED WORK &{' '}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D8C2F0] to-[#8E63CB]">
                PRODUCTION REPERTOIRE
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#D8C2F0]/70 max-w-md leading-relaxed">
            A showcase of recent graphic concepts, precision signage, and high-GSM print executions created for businesses and events across Tirunelveli district.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(cat);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] text-white shadow-[0_0_15px_rgba(142,99,203,0.4)] scale-105'
                  : 'bg-[#190a2c]/80 text-[#D8C2F0]/70 hover:text-white hover:bg-[#25103f] border border-[#D8C2F0]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric Masonry Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedProject(item);
              }}
              className={`group cursor-pointer rounded-2xl bg-[#140624] border border-[#D8C2F0]/15 hover:border-[#8E63CB]/50 p-5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(90,45,145,0.4)] ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Product Visual Mockup */}
              <div className="relative rounded-xl overflow-hidden mb-5">
                <ServiceMockup3D
                  type={item.previewType}
                  title={item.title}
                  isHovered={false}
                />
                
                {/* Hover overlay pill */}
                <div className="absolute inset-0 bg-[#0c0414]/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-[#5A2D91] text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Specifications</span>
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E63CB]">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    {item.clientType}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#D8C2F0] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#D8C2F0]/70 line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Footer specs pill */}
                <div className="flex items-center justify-between pt-3 border-t border-[#D8C2F0]/10 text-[11px] text-[#D8C2F0]/80">
                  <span className="font-mono">{item.dimensions}</span>
                  <span className="flex items-center gap-1 text-[#8E63CB] font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full-Screen Project Lightbox / Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#140624] border border-[#D8C2F0]/30 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#D8C2F0] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category & Title */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-[#5A2D91] text-white uppercase tracking-wider">
                {selectedProject.category}
              </span>
              <span className="text-xs text-[#D8C2F0]/70 font-mono">
                {selectedProject.clientType}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              {selectedProject.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#EEE7F5]/80 leading-relaxed mb-6">
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
            <div className="bg-[#1c0a32] rounded-xl p-4 border border-[#D8C2F0]/15 mb-6 space-y-2.5">
              <div className="flex justify-between text-xs py-1 border-b border-white/5">
                <span className="text-[#D8C2F0]/70 font-mono">Dimensions</span>
                <span className="text-white font-semibold">{selectedProject.dimensions}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-white/5">
                <span className="text-[#D8C2F0]/70 font-mono">Material & Finish</span>
                <span className="text-white font-semibold">{selectedProject.finish}</span>
              </div>
            </div>

            {/* Color Palette Swatches */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D8C2F0] mb-2.5">
                <Palette className="w-3.5 h-3.5 text-[#8E63CB]" />
                <span>Engineered Color Palette</span>
              </div>
              <div className="flex items-center gap-2">
                {selectedProject.colorPalette.map((col, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-[#1b0a2e] px-2.5 py-1 rounded-md border border-white/10">
                    <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: col }} />
                    <span className="text-[10px] font-mono text-gray-300 uppercase">{col}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <div className="text-xs font-bold uppercase tracking-wider text-[#D8C2F0] mb-2.5">
                Project Highlights
              </div>
              <ul className="space-y-1.5">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[#EEE7F5]">
                    <Check className="w-3.5 h-3.5 text-[#8E63CB]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button: Request Similar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const proj = selectedProject;
                  setSelectedProject(null);
                  if (onRequestSimilar) onRequestSimilar(proj);
                }}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] text-xs font-bold text-white shadow-[0_0_20px_rgba(142,99,203,0.4)] hover:scale-[1.02] active:scale-95 transition-all text-center"
              >
                Request Similar Design & Print
              </button>

              <a
                href={`https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20am%20referring%20to%20your%20project:%20${encodeURIComponent(selectedProject.title)}.%20Can%20we%20produce%20something%20similar?`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#24103D] hover:bg-[#341659] border border-[#D8C2F0]/30 text-xs font-semibold text-[#D8C2F0] hover:text-white transition-colors text-center"
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
