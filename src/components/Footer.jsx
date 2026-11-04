import React from 'react';
import { Phone, MessageSquare, MapPin, ArrowUp, Sparkles, Heart } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { soundManager } from '../utils/sound';

export default function Footer({ onSelectService }) {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#08020e] text-[#F8F6FA] pt-20 pb-12 overflow-hidden border-t border-[#D8C2F0]/15">
      {/* Background Deep Purple Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#24103D]/60 via-[#160628]/30 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D8C2F0]/10">
          
          {/* Brand Info (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8E63CB] to-[#5A2D91] p-[1.5px] shadow-[0_0_20px_rgba(142,99,203,0.4)]">
                <div className="w-full h-full bg-[#120624] rounded-[10px] flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none">
                    <path
                      d="M 64 34 C 58 26 44 25 36 33 C 25 43 25 61 36 71 C 46 80 62 76 68 67 C 71 63 71 54 71 52 L 48 52 L 48 44 L 79 44 C 79 56 78 69 70 77 C 60 88 40 89 28 78 C 14 65 14 41 28 27 C 41 15 62 16 73 27 Z"
                      fill="url(#footerLogoGrad)"
                    />
                    <circle cx="50" cy="50" r="5" fill="#D8C2F0" />
                    <defs>
                      <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#8E63CB" />
                        <stop offset="100%" stopColor="#5A2D91" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div>
                <span className="font-extrabold text-xl tracking-[0.16em] text-white block">
                  GRAPHIX
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#D8C2F0]/70 font-medium block">
                  Creative Design & Print Lab
                </span>
              </div>
            </div>

            {/* Creative Brand Statement */}
            <p className="text-xs sm:text-sm text-[#D8C2F0]/70 leading-relaxed">
              "Create Visibility. Build Identity."
              <br />
              Melapalayam’s dedicated studio for high-aesthetic graphic design, weather-resistant flex, precision vinyl, 3D acrylic LED signage, and luxury print stationery.
            </p>

            {/* Contact Quick Pills */}
            <div className="flex flex-col gap-2.5 pt-2">
              <a
                href="tel:+917530073785"
                className="flex items-center gap-2.5 text-xs text-[#EEE7F5]/80 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#8E63CB]" />
                <span>+91 75300 73785</span>
              </a>

              <a
                href="https://wa.me/917530073785"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-[#EEE7F5]/80 hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp: +91 75300 73785</span>
              </a>

              <div className="flex items-start gap-2.5 text-xs text-[#EEE7F5]/80">
                <MapPin className="w-3.5 h-3.5 text-[#8E63CB] shrink-0 mt-0.5" />
                <span>Hameem Puram 7th Street, Annai Hajira College Road, Melapalayam, Tirunelveli</span>
              </div>
            </div>

          </div>

          {/* Quick Nav Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C2F0]/70">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">All 11 Services</a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-white transition-colors">Cost Estimator</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About GRAPHIX</a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">Design Repertoire</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact Studio</a>
              </li>
            </ul>
          </div>

          {/* Services Directory (Col 7-10) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
              Printing & Design Services
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#D8C2F0]/70">
              {servicesData.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    if (onSelectService) onSelectService(s);
                  }}
                  className="text-left hover:text-white transition-colors truncate"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Direct CTA (Col 11-12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
              Fast Order
            </h4>
            <p className="text-[11px] text-[#D8C2F0]/60">
              Need urgent flex printing or visiting cards in Tirunelveli today?
            </p>
            <a
              href="https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20have%20an%20urgent%20print%20job%20in%20Melapalayam."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-xs font-bold text-white shadow-md hover:opacity-90 transition-opacity"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Instant Chat</span>
            </a>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8C2F0]/60">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} GRAPHIX. All Rights Reserved.</span>
            <span>•</span>
            <span className="text-[#8E63CB]">Melapalayam, Tirunelveli, Tamil Nadu</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b0c30] hover:bg-[#2c134f] border border-[#D8C2F0]/15 text-[#D8C2F0] hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
