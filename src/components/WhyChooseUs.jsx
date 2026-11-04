import React from 'react';
import { Sparkles, Printer, Sliders, Crosshair, Clock, Layers, CheckCircle2 } from 'lucide-react';
import { whyChooseData } from '../data/whyChooseData';
import { soundManager } from '../utils/sound';

export default function WhyChooseUs() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#8E63CB]" />;
      case 'Printer':
        return <Printer className="w-6 h-6 text-[#8E63CB]" />;
      case 'Sliders':
        return <Sliders className="w-6 h-6 text-[#8E63CB]" />;
      case 'Crosshair':
        return <Crosshair className="w-6 h-6 text-[#8E63CB]" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-[#8E63CB]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#8E63CB]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#8E63CB]" />;
    }
  };

  return (
    <section id="why-us" className="relative py-28 bg-[#0c0414] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#5A2D91]/15 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b0a2e] border border-[#D8C2F0]/20 text-[#D8C2F0] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
            <span>The Graphix Advantage</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            ENGINEERED FOR MEMORABILITY.{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D8C2F0] to-[#8E63CB]">
              BUILT FOR ENDURANCE.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#D8C2F0]/70 leading-relaxed">
            Six foundational commitments that define every banner, sign board, sticker cut, and corporate card we produce in Melapalayam.
          </p>
        </div>

        {/* 6 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseData.map((item, idx) => (
            <div
              key={item.id}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative rounded-2xl bg-gradient-to-b from-[#170929] via-[#11041d] to-[#0c0414] border border-[#D8C2F0]/15 hover:border-[#8E63CB]/50 p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(90,45,145,0.35)]"
            >
              <div>
                {/* Icon & Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-[#24103D] border border-[#8E63CB]/30 group-hover:bg-[#341655] transition-colors">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#8E63CB]/60">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title & Headline */}
                <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-[#D8C2F0] transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-semibold text-[#8E63CB] mb-3">
                  {item.headline}
                </div>

                <p className="text-xs text-[#EEE7F5]/70 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Sub-points */}
                <ul className="space-y-2 mb-6 border-t border-[#D8C2F0]/10 pt-4">
                  {item.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#D8C2F0]/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8E63CB] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Stat Block */}
              <div className="pt-4 border-t border-[#D8C2F0]/10">
                <div className="text-sm font-bold text-white font-mono">
                  {item.stats}
                </div>
                <div className="text-[10px] text-[#D8C2F0]/60">
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
