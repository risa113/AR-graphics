import React from 'react';
import { Sparkles, Printer, Sliders, Crosshair, Clock, Layers, CheckCircle2 } from 'lucide-react';
import { whyChooseData } from '../data/whyChooseData';
import { soundManager } from '../utils/sound';

export default function WhyChooseUs() {
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

  return (
    <section id="why-us" className="relative py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9FC] border border-[#EAE3F1] text-[#5A2D91] text-xs uppercase tracking-[0.2em] font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
            <span>The Graphix Advantage</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#35204F] tracking-tight mb-5">
            ENGINEERED FOR MEMORABILITY.{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35204F] via-[#5A2D91] to-[#8E63CB]">
              BUILT FOR ENDURANCE.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#625B69] leading-relaxed">
            Six foundational commitments that define every banner, sign board, sticker cut, and corporate card we produce in Melapalayam.
          </p>
        </div>

        {/* 6 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseData.map((item, idx) => (
            <div
              key={item.id}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1] hover:border-[#D8C2F0] hover:bg-white p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 shadow-[0_2px_12px_rgba(53,32,79,0.03)] hover:shadow-[0_16px_36px_rgba(90,45,145,0.1)]"
            >
              <div>
                {/* Icon & Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white border border-[#EAE3F1] group-hover:border-[#D8C2F0] transition-colors shadow-sm">
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
