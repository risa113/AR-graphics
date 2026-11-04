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
    <div className="relative py-10 bg-[#0e0517] overflow-hidden border-y border-[#D8C2F0]/10 w-full max-w-full">
      {/* Background Soft Purple Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#5A2D91]/15 via-transparent to-[#8E63CB]/15 pointer-events-none" />

      {/* Marquee Row: Continuous Leftward Scrolling */}
      <div className="w-full max-w-full overflow-hidden select-none whitespace-nowrap mb-4">
        <div className="inline-flex items-center gap-8 animate-[marquee_35s_linear_infinite] will-change-transform">
          {[...marqueeKeywords, ...marqueeKeywords].map((word, idx) => (
            <div key={`m1-${idx}`} className="flex items-center gap-6 shrink-0">
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white/90 via-[#D8C2F0] to-[#8E63CB]/70 hover:opacity-100 transition-opacity">
                {word}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#8E63CB] shadow-[0_0_10px_#8E63CB]" />
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Strip */}
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-2">
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#170a27]/70 border border-[#D8C2F0]/15 backdrop-blur-md">
          <div className="p-2.5 rounded-xl bg-[#5A2D91]/30 text-[#D8C2F0] border border-[#8E63CB]/20">
            <Zap className="w-5 h-5 text-[#8E63CB]" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Ultra HD Resolution</div>
            <div className="text-[11px] text-[#D8C2F0]/70">1440 DPI solvent & eco print</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#170a27]/70 border border-[#D8C2F0]/15 backdrop-blur-md">
          <div className="p-2.5 rounded-xl bg-[#5A2D91]/30 text-[#D8C2F0] border border-[#8E63CB]/20">
            <Layers className="w-5 h-5 text-[#8E63CB]" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">100% In-House Lab</div>
            <div className="text-[11px] text-[#D8C2F0]/70">Direct design-to-press craft</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#170a27]/70 border border-[#D8C2F0]/15 backdrop-blur-md">
          <div className="p-2.5 rounded-xl bg-[#5A2D91]/30 text-[#D8C2F0] border border-[#8E63CB]/20">
            <ShieldCheck className="w-5 h-5 text-[#8E63CB]" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Tested Media Quality</div>
            <div className="text-[11px] text-[#D8C2F0]/70">Fade, weather & water resistant</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#170a27]/70 border border-[#D8C2F0]/15 backdrop-blur-md">
          <div className="p-2.5 rounded-xl bg-[#5A2D91]/30 text-[#D8C2F0] border border-[#8E63CB]/20">
            <Sparkles className="w-5 h-5 text-[#8E63CB]" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Melapalayam Direct</div>
            <div className="text-[11px] text-[#D8C2F0]/70">Local rapid pickup & delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
}
