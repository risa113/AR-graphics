import React, { useState } from 'react';
import { Eye, Sun, Moon, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function ServiceMockup3D({ type, title, isHovered }) {
  const [ledNightMode, setLedNightMode] = useState(true);
  const [stampPressed, setStampPressed] = useState(false);
  const [mugRotation, setMugRotation] = useState(0);

  // Render individual realistic interactive product mockups
  switch (type) {
    // 1. FLEX WORK: Printed flex banner unfolding with eyelets, ropes & woven texture
    case 'flex':
      return (
        <div className="relative w-full h-52 rounded-xl bg-gradient-to-br from-[#1b0a2d] to-[#0c0414] p-4 flex items-center justify-center overflow-hidden border border-[#8E63CB]/25 shadow-inner">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#8E63CB_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

          {/* 3D Flex Banner Sheet */}
          <div
            className={`relative w-[90%] h-36 rounded-md bg-gradient-to-r from-[#24103D] via-[#5A2D91] to-[#3a1563] border-2 border-[#D8C2F0]/40 p-3 shadow-2xl flex flex-col justify-between transition-all duration-700 ${
              isHovered ? 'rotate-[-1.5deg] scale-105 shadow-[0_15px_35px_rgba(142,99,203,0.4)]' : 'rotate-0'
            }`}
          >
            {/* Brass Grommet Eyelets at Corners */}
            <div className="absolute top-1.5 left-1.5 w-3 h-3 rounded-full border-2 border-amber-300 bg-[#0c0414] shadow-sm flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
            </div>
            <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full border-2 border-amber-300 bg-[#0c0414] shadow-sm flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
            </div>
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 rounded-full border-2 border-amber-300 bg-[#0c0414] shadow-sm flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
            </div>
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 rounded-full border-2 border-amber-300 bg-[#0c0414] shadow-sm flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
            </div>

            {/* Banner Header Design */}
            <div className="flex items-center justify-between border-b border-[#D8C2F0]/20 pb-1.5">
              <span className="text-[10px] font-black tracking-widest text-[#D8C2F0] uppercase">
                GRAPHIX OUTDOOR MEDIA
              </span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#8E63CB]/30 text-white border border-[#8E63CB]/40">
                STAR FLEX 440 GSM
              </span>
            </div>

            {/* Banner Graphic Center */}
            <div className="text-center my-auto">
              <div className="text-base font-black tracking-wider text-white drop-shadow-md">
                GRAND OPENING
              </div>
              <div className="text-[9px] text-[#D8C2F0]/90 tracking-wide font-medium">
                HIGH DENSITY SOLVENT UV PRINT • 1440 DPI
              </div>
            </div>

            {/* Banner Footer */}
            <div className="flex items-center justify-between text-[8px] text-[#EEE7F5]/70 pt-1 border-t border-[#D8C2F0]/15">
              <span>MELAPALAYAM • TIRUNELVELI</span>
              <span>DOUBLE HEMMED EDGES</span>
            </div>

            {/* Gloss reflection sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-md" />
          </div>
        </div>
      );

    // 2. VINYL STICKER WORK: Glossy reflective vinyl with peel layer
    case 'vinyl':
      return (
        <div className="relative w-full h-52 rounded-xl bg-[#140824] p-4 flex items-center justify-center overflow-hidden border border-[#8E63CB]/25 shadow-inner">
          {/* Glass/Car surface background mock */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0312] via-[#1a0c2e] to-[#25103d]" />

          {/* Vinyl Sheet with Peel Effect */}
          <div
            className={`relative w-48 h-32 rounded-lg bg-gradient-to-br from-[#8E63CB] via-[#5A2D91] to-[#24103D] p-3 shadow-2xl transition-all duration-500 ${
              isHovered ? 'scale-105 rotate-1 shadow-[0_0_30px_rgba(142,99,203,0.5)]' : ''
            }`}
          >
            {/* Top Right Peeling Corner */}
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-bl from-[#EEE7F5] to-[#D8C2F0] rounded-bl-xl shadow-lg border-b border-l border-white/50" />

            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono tracking-widest text-[#D8C2F0]">CAST VINYL FILM</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              <div className="text-center">
                <div className="text-sm font-black text-white tracking-widest">
                  GRAPHIX APPLIED
                </div>
                <div className="text-[8px] text-[#D8C2F0]/80">AIR RELEASE ADHESIVE</div>
              </div>

              <div className="flex items-center justify-between text-[8px] font-mono text-[#D8C2F0]/70">
                <span>WATERPROOF</span>
                <span>UV LAMINATED</span>
              </div>
            </div>

            {/* Specular high-gloss highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg pointer-events-none" />
          </div>
        </div>
      );

    // 3. STICKER CUTTING: CNC digital plotter with optical registration marks & cut path
    case 'cutter':
      return (
        <div className="relative w-full h-52 rounded-xl bg-[#120622] p-4 flex items-center justify-center overflow-hidden border border-[#8E63CB]/25">
          <div className="relative w-44 h-36 bg-[#1f0d38] rounded-xl border border-[#D8C2F0]/20 p-3 flex flex-col items-center justify-center">
            {/* Optical registration marks at 4 points */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-[#8E63CB]" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-[#8E63CB]" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-[#8E63CB]" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-[#8E63CB]" />

            {/* Die-Cut Sticker Shape with Dashed Blade Contour */}
            <div
              className={`relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#5A2D91] to-[#8E63CB] flex flex-col items-center justify-center border-2 border-dashed border-[#D8C2F0] transition-transform duration-500 ${
                isHovered ? 'scale-110 rotate-6 shadow-[0_0_25px_#8E63CB]' : ''
              }`}
            >
              <span className="text-[10px] font-black text-white tracking-wider">GRAPHIX</span>
              <span className="text-[7px] text-[#D8C2F0] font-mono">DIE-CUT</span>
            </div>

            {/* Simulated Plotter Laser Head Beam */}
            <div className={`absolute top-4 transition-all duration-700 ${isHovered ? 'left-28' : 'left-8'}`}>
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_red] animate-ping" />
              <div className="w-0.5 h-16 bg-red-500/60 shadow-[0_0_6px_red] mx-auto" />
            </div>

            <div className="absolute bottom-2 text-[8px] font-mono text-[#D8C2F0]/60">
              CONTOUR PRECISION: ±0.05 MM
            </div>
          </div>
        </div>
      );

    // 4. LED BOARD WORK: 3D Acrylic illuminated sign with Day/Night toggle
    case 'led':
      return (
        <div className={`relative w-full h-52 rounded-xl transition-colors duration-500 p-4 flex flex-col items-center justify-center overflow-hidden border border-[#8E63CB]/25 ${
          ledNightMode ? 'bg-[#090310]' : 'bg-[#220d3b]'
        }`}>
          {/* Day/Night Mini Switch */}
          <button
            onClick={() => setLedNightMode(!ledNightMode)}
            className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[9px] font-semibold text-[#D8C2F0] backdrop-blur-md transition-all"
            title="Toggle Signboard Night Glow"
          >
            {ledNightMode ? (
              <>
                <Moon className="w-3 h-3 text-amber-300" />
                <span>Night Glow</span>
              </>
            ) : (
              <>
                <Sun className="w-3 h-3 text-yellow-400" />
                <span>Day Mode</span>
              </>
            )}
          </button>

          {/* 3D Acrylic LED Sign Box */}
          <div
            className={`relative px-6 py-4 rounded-xl border transition-all duration-500 ${
              ledNightMode
                ? 'bg-[#180a2a] border-[#8E63CB] shadow-[0_0_40px_rgba(142,99,203,0.7)]'
                : 'bg-[#2d124d] border-[#D8C2F0]/30 shadow-lg'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-black tracking-widest transition-all duration-500 ${
                ledNightMode
                  ? 'text-white drop-shadow-[0_0_12px_#D8C2F0]'
                  : 'text-[#D8C2F0]'
              }`}>
                GRAPHIX
              </span>
              <span className={`w-3 h-3 rounded-full transition-all duration-500 ${
                ledNightMode
                  ? 'bg-[#8E63CB] shadow-[0_0_15px_#8E63CB]'
                  : 'bg-[#5A2D91]'
              }`} />
            </div>

            <div className={`text-center text-[9px] uppercase tracking-widest font-semibold mt-1 transition-colors ${
              ledNightMode ? 'text-[#D8C2F0]' : 'text-[#D8C2F0]/60'
            }`}>
              3D ACRYLIC • SAMSUNG IP67 LED
            </div>
          </div>

          <div className="text-[9px] text-[#D8C2F0]/60 mt-3 font-mono">
            {ledNightMode ? 'ILLUMINATED HALO GLOW' : 'ACP BACKDROP MOUNT'}
          </div>
        </div>
      );

    // 5. VISITING CARDS: 3D rotating stacked executive cards with foil stamp
    case 'cards':
      return (
        <div className="relative w-full h-52 rounded-xl bg-[#140824] p-4 flex items-center justify-center overflow-hidden border border-[#8E63CB]/25">
          <div className="relative w-44 h-28">
            {/* Card 3 (Bottom Layer) */}
            <div className={`absolute inset-0 rounded-lg bg-[#24103D] border border-[#8E63CB]/30 shadow-lg transition-transform duration-500 ${
              isHovered ? 'rotate-[-10deg] translate-y-2 -translate-x-3' : 'rotate-[-3deg]'
            }`} />

            {/* Card 2 (Middle Layer) */}
            <div className={`absolute inset-0 rounded-lg bg-[#38165c] border border-[#8E63CB]/40 shadow-xl transition-transform duration-500 ${
              isHovered ? 'rotate-[8deg] -translate-y-2 translate-x-3' : 'rotate-[2deg]'
            }`} />

            {/* Card 1 (Top Hero Card) */}
            <div
              className={`absolute inset-0 rounded-lg bg-gradient-to-br from-[#1d0b36] to-[#0d0417] border border-[#D8C2F0]/40 p-3 shadow-2xl flex flex-col justify-between transition-transform duration-500 ${
                isHovered ? 'scale-105 shadow-[0_10px_30px_rgba(142,99,203,0.5)]' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow-sm">
                  GRAPHIX
                </span>
                <span className="text-[7px] text-[#D8C2F0]/70 font-mono">450 GSM</span>
              </div>

              <div>
                <div className="text-xs font-bold text-white tracking-wide">Creative Studio</div>
                <div className="text-[8px] text-[#D8C2F0]/80">Velvet Matte & Spot UV</div>
              </div>

              <div className="text-[7px] text-[#D8C2F0]/60 font-mono flex justify-between">
                <span>MELAPALAYAM</span>
                <span>FOIL EMBOSSED</span>
              </div>
            </div>
          </div>
        </div>
      );

    // 6. PAMPHLETS: 3D Tri-fold brochure unfolding
    case 'pamphlet':
      return (
        <div className="relative w-full h-52 rounded-xl bg-[#140824] p-4 flex items-center justify-center overflow-hidden border border-[#8E63CB]/25">
          <div className="flex items-center shadow-2xl">
            {/* Panel 1 (Left Fold) */}
            <div
              className={`w-14 h-32 rounded-l-md bg-gradient-to-br from-[#24103D] to-[#170a27] border-y border-l border-[#D8C2F0]/25 p-1.5 flex flex-col justify-between transition-transform duration-500 origin-right ${
                isHovered ? 'rotate-y-[-25deg] shadow-lg' : ''
              }`}
            >
              <div className="w-full h-1 bg-[#8E63CB]/50 rounded" />
              <div className="space-y-1">
                <div className="w-full h-0.5 bg-white/30 rounded" />
                <div className="w-4/5 h-0.5 bg-white/20 rounded" />
                <div className="w-3/5 h-0.5 bg-white/20 rounded" />
              </div>
              <span className="text-[6px] text-[#D8C2F0]/60 font-mono">PANEL 1</span>
            </div>

            {/* Panel 2 (Center Base) */}
            <div className="w-16 h-32 bg-gradient-to-br from-[#3b1762] to-[#24103D] border-y border-[#D8C2F0]/40 p-2 flex flex-col justify-between z-10">
              <div className="text-[8px] font-black text-white text-center">GRAPHIX</div>
              <div className="text-[7px] text-[#D8C2F0] text-center font-medium">
                TRI-FOLD BROCHURE
              </div>
              <div className="w-full h-1 bg-[#8E63CB] rounded" />
            </div>

            {/* Panel 3 (Right Fold) */}
            <div
              className={`w-14 h-32 rounded-r-md bg-gradient-to-br from-[#24103D] to-[#170a27] border-y border-r border-[#D8C2F0]/25 p-1.5 flex flex-col justify-between transition-transform duration-500 origin-left ${
                isHovered ? 'rotate-y-[25deg] shadow-lg' : ''
              }`}
            >
              <div className="w-full h-1 bg-[#8E63CB]/50 rounded" />
              <div className="space-y-1">
                <div className="w-full h-0.5 bg-white/30 rounded" />
                <div className="w-3/4 h-0.5 bg-white/20 rounded" />
              </div>
              <span className="text-[6px] text-[#D8C2F0]/60 font-mono">PANEL 3</span>
            </div>
          </div>
        </div>
      );

    // 7. NOTICES: Clean typography sheet with seal & header
    case 'notices':
      return (
        <div className="relative w-full h-52 rounded-xl bg-[#140824] p-4 flex items-center justify-center overflow-hidden border border-[#8E63CB]/25">
          <div
            className={`w-36 h-40 bg-[#F8F6FA] text-[#24103D] rounded-md shadow-2xl p-2.5 flex flex-col justify-between border border-white transition-transform duration-500 ${
              isHovered ? 'scale-105 rotate-1' : ''
            }`}
          >
            {/* Notice Top Header */}
            <div className="border-b border-[#24103D]/20 pb-1 text-center">
              <div className="text-[8px] font-black tracking-widest uppercase text-[#5A2D91]">
                OFFICIAL NOTICE
              </div>
              <div className="text-[6px] text-gray-500 font-mono">REF: GRX/TNV/2026</div>
            </div>

            {/* Body Content Placeholder */}
            <div className="space-y-1 my-1">
              <div className="w-full h-1 bg-gray-300 rounded" />
              <div className="w-5/6 h-1 bg-gray-300 rounded" />
              <div className="w-full h-1 bg-gray-300 rounded" />
              <div className="w-4/6 h-1 bg-gray-300 rounded" />
              <div className="w-full h-1 bg-gray-300 rounded" />
            </div>

            {/* Official Stamp & Sign */}
            <div className="flex items-center justify-between pt-1 border-t border-gray-200">
              <div className="w-6 h-6 rounded-full border border-[#5A2D91] flex items-center justify-center text-[5px] text-[#5A2D91] font-bold">
                SEAL
              </div>
              <span className="text-[6px] font-bold text-gray-600">AUTHORIZED</span>
            </div>
          </div>
        </div>
      );

    // 8. WEDDING CARDS: Royal ornate invitation with laser filigree & gold foil
    case 'wedding':
      return (
        <div className="relative w-full h-52 rounded-xl bg-[#150726] p-4 flex items-center justify-center overflow-hidden border border-[#8E63CB]/25">
          {/* Laser-cut ornamental outer folder */}
          <div
            className={`relative w-44 h-36 rounded-xl bg-gradient-to-br from-[#3b1762] via-[#24103D] to-[#190a2c] border-2 border-amber-300/40 p-3 shadow-2xl flex flex-col items-center justify-between transition-all duration-500 ${
              isHovered ? 'scale-105 shadow-[0_0_30px_rgba(245,158,11,0.3)]' : ''
            }`}
          >
            {/* Top Ornamental Gold Filigree */}
            <div className="text-amber-300 text-[11px] font-serif tracking-widest flex items-center gap-1">
              <span>✦</span>
              <span className="font-bold">ROYAL INVITATION</span>
              <span>✦</span>
            </div>

            {/* Center Arabic / Traditional Calligraphy Motif */}
            <div className="text-center my-auto">
              <div className="text-sm font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                Wedding & Nikah
              </div>
              <div className="text-[7px] text-[#D8C2F0]/80 tracking-widest mt-0.5">
                SCENTED METALLIC BOARD • GOLD FOIL
              </div>
            </div>

            {/* Wax seal simulation */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 border border-amber-200 shadow-md flex items-center justify-center text-[7px] font-bold text-[#24103D]">
              G
            </div>
          </div>
        </div>
      );

    // 9. SUBLIMATION GIFTS: 3D rotating ceramic mug / tumbler with custom imprint
    case 'sublimation':
      return (
        <div className="relative w-full h-52 rounded-xl bg-[#140824] p-4 flex items-center justify-center overflow-hidden border border-[#8E63CB]/25">
          {/* 3D Ceramic Mug */}
          <div
            className={`relative w-28 h-32 rounded-b-2xl rounded-t-sm bg-gradient-to-r from-white via-[#EEE7F5] to-gray-200 shadow-2xl flex flex-col justify-between p-2 border border-gray-300 transition-transform duration-500 ${
              isHovered ? 'scale-105 rotate-3' : ''
            }`}
          >
            {/* Mug Handle */}
            <div className="absolute top-4 -right-4 w-5 h-20 rounded-r-xl border-4 border-gray-200 bg-transparent" />

            {/* Mug Top Rim Opening */}
            <div className="w-full h-3 rounded-full bg-gray-300 border border-gray-400 -mt-1 shadow-inner" />

            {/* Sublimated Imprint Area */}
            <div className="my-auto text-center px-1 py-2 bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] rounded-md shadow-sm">
              <span className="text-[9px] font-black text-white tracking-wider block">
                GRAPHIX
              </span>
              <span className="text-[6px] text-amber-200 font-mono block">
                PERMANENT 200°C INFUSION
              </span>
            </div>

            <div className="text-center text-[7px] font-mono text-gray-500 pb-1">
              DISHWASHER SAFE
            </div>
          </div>
        </div>
      );

    // 10. BILL BOOKS: Multi-copy carbonless NCR book with serial numerator
    case 'billbook':
      return (
        <div className="relative w-full h-52 rounded-xl bg-[#140824] p-4 flex items-center justify-center overflow-hidden border border-[#8E63CB]/25">
          {/* Bill Book */}
          <div
            className={`relative w-44 h-32 rounded-r-md bg-white text-[#24103D] shadow-2xl flex border border-gray-300 transition-transform duration-500 ${
              isHovered ? 'scale-105 -rotate-1' : ''
            }`}
          >
            {/* Left Bound Cloth Spine */}
            <div className="w-4 h-full bg-[#5A2D91] rounded-l-sm border-r border-[#3b1762] flex items-center justify-center">
              <span className="text-[6px] text-white rotate-90 whitespace-nowrap font-mono tracking-widest">
                BOUND
              </span>
            </div>

            {/* Perforated Page Area */}
            <div className="flex-1 p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                <span className="text-[8px] font-black text-[#5A2D91]">TAX INVOICE</span>
                <span className="text-[7px] font-mono font-bold text-red-600">No. 004821</span>
              </div>

              {/* Grid Lines */}
              <div className="space-y-1">
                <div className="w-full h-1 bg-gray-200 rounded" />
                <div className="w-full h-1 bg-gray-200 rounded" />
                <div className="w-4/5 h-1 bg-gray-200 rounded" />
              </div>

              <div className="flex justify-between items-center text-[6px] font-mono text-gray-500 pt-1 border-t border-gray-200">
                <span>1ST COPY: WHITE</span>
                <span className="text-pink-600 font-bold">2ND COPY: PINK</span>
              </div>
            </div>
          </div>
        </div>
      );

    // 11. RUBBER STAMPS: 3D self-inking stamp that stamps down and leaves impression
    case 'stamp':
      return (
        <div
          onClick={() => setStampPressed(true)}
          className="relative w-full h-52 rounded-xl bg-[#140824] p-4 flex flex-col items-center justify-center overflow-hidden border border-[#8E63CB]/25 cursor-pointer select-none"
        >
          {/* Mechanical Stamp Handle & Base */}
          <div
            className={`relative transition-all duration-300 ${
              stampPressed || isHovered ? 'translate-y-2' : 'translate-y-0'
            }`}
          >
            {/* Handle Grip */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#8E63CB] to-[#5A2D91] mx-auto border-2 border-white/20 shadow-md flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
            </div>

            {/* Stamp Cartridge Body */}
            <div className="w-20 h-10 rounded-md bg-[#24103D] border border-[#D8C2F0]/30 shadow-xl flex items-center justify-center -mt-1">
              <span className="text-[7px] font-mono text-[#D8C2F0] tracking-widest">
                FLASH STAMP
              </span>
            </div>
          </div>

          {/* Paper Impression Surface Below */}
          <div className="w-40 h-14 bg-white/95 rounded-md mt-2 shadow-inner p-1.5 flex flex-col items-center justify-center border border-gray-300">
            <div className={`transition-opacity duration-300 ${stampPressed || isHovered ? 'opacity-100' : 'opacity-85'}`}>
              <div className="text-[9px] font-black tracking-widest text-[#5A2D91] border border-[#5A2D91] px-2 py-0.5 rounded">
                ★ GRAPHIX MELAPALAYAM ★
              </div>
              <div className="text-[6px] font-mono text-purple-700 text-center mt-0.5">
                VERIFIED & APPROVED
              </div>
            </div>
          </div>

          <span className="text-[8px] font-mono text-[#D8C2F0]/60 mt-1.5">
            CLICK TO STAMP IMPRESSION
          </span>
        </div>
      );

    default:
      return null;
  }
}
