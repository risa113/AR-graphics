import React from 'react';
import { Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function StoryMarquee() {
  const marqueeKeywords = [
    'CREATIVE GRAPHIC DESIGN',
    'HEAVY STAR FLEX WORK',
    'VINYL STICKER WORK',
    'PRECISION STICKER CUTTING',
    '3D ACRYLIC LED BOARDS',
    'LUXURY VISITING CARDS',
    'TRI-FOLD PAMPHLETS',
    'INSTITUTIONAL NOTICES',
    'ROYAL WEDDING INVITATIONS',
    'SUBLIMATION GIFTS',
    'CARBONLESS BILL BOOKS',
    'EXPRESS RUBBER STAMPS',
    'MELAPALAYAM • TIRUNELVELI'
  ];

  return (
    <div className="relative py-10 bg-white border-y border-[#EAE3F1] w-full overflow-hidden">
      {/* Background Soft Studio Wash */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9FC] via-white to-[#F3ECFA]/30 pointer-events-none" />

      {/* Marquee Row: Continuous Seamless Leftward Scrolling */}
      <div className="relative w-full overflow-hidden select-none flex mb-6">
        <div className="flex items-center gap-8 animate-marquee shrink-0 whitespace-nowrap pr-8">
          {marqueeKeywords.map((word, idx) => (
            <div key={`m1-${idx}`} className="flex items-center gap-6 shrink-0">
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-widest text-[#35204F] hover:text-[#5A2D91] transition-colors">
                {word}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#8E63CB]" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-8 animate-marquee shrink-0 whitespace-nowrap pr-8" aria-hidden="true">
          {marqueeKeywords.map((word, idx) => (
            <div key={`m2-${idx}`} className="flex items-center gap-6 shrink-0">
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-widest text-[#35204F] hover:text-[#5A2D91] transition-colors">
                {word}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#8E63CB]" />
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Strip on Crisp White Cards */}
      <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1] shadow-[0_2px_10px_rgba(53,32,79,0.03)] hover:border-[#D8C2F0] transition-colors">
          <div className="p-2.5 rounded-xl bg-white text-[#5A2D91] border border-[#EAE3F1] shadow-sm">
            <Zap className="w-5 h-5 text-[#5A2D91]" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#35204F]">Ultra HD Resolution</div>
            <div className="text-[11px] text-[#625B69]">1440 DPI solvent & eco print</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1] shadow-[0_2px_10px_rgba(53,32,79,0.03)] hover:border-[#D8C2F0] transition-colors">
          <div className="p-2.5 rounded-xl bg-white text-[#5A2D91] border border-[#EAE3F1] shadow-sm">
            <Layers className="w-5 h-5 text-[#5A2D91]" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#35204F]">100% In-House Lab</div>
            <div className="text-[11px] text-[#625B69]">Direct design-to-press craft</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1] shadow-[0_2px_10px_rgba(53,32,79,0.03)] hover:border-[#D8C2F0] transition-colors">
          <div className="p-2.5 rounded-xl bg-white text-[#5A2D91] border border-[#EAE3F1] shadow-sm">
            <ShieldCheck className="w-5 h-5 text-[#5A2D91]" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#35204F]">Tested Media Quality</div>
            <div className="text-[11px] text-[#625B69]">Fade, weather & water resistant</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1] shadow-[0_2px_10px_rgba(53,32,79,0.03)] hover:border-[#D8C2F0] transition-colors">
          <div className="p-2.5 rounded-xl bg-white text-[#5A2D91] border border-[#EAE3F1] shadow-sm">
            <Sparkles className="w-5 h-5 text-[#5A2D91]" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#35204F]">Melapalayam Direct</div>
            <div className="text-[11px] text-[#625B69]">Local rapid pickup & delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
}
