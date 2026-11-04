import React from 'react';
import { Phone, MessageSquare, MapPin, ArrowUp } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { soundManager } from '../utils/sound';

export default function Footer({ onSelectService }) {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#FAF9FC] text-[#35204F] pt-20 pb-12 overflow-hidden border-t border-[#EAE3F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#EAE3F1]">
          
          {/* Brand Info (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8E63CB] to-[#5A2D91] p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none">
                    <path
                      d="M 64 34 C 58 26 44 25 36 33 C 25 43 25 61 36 71 C 46 80 62 76 68 67 C 71 63 71 54 71 52 L 48 52 L 48 44 L 79 44 C 79 56 78 69 70 77 C 60 88 40 89 28 78 C 14 65 14 41 28 27 C 41 15 62 16 73 27 Z"
                      fill="url(#footerBrightLogoGrad)"
                    />
                    <circle cx="50" cy="50" r="5" fill="#5A2D91" />
                    <defs>
                      <linearGradient id="footerBrightLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8E63CB" />
                        <stop offset="100%" stopColor="#5A2D91" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div>
                <span className="font-extrabold text-xl tracking-[0.14em] text-[#35204F] block">
                  GRAPHIX
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#625B69] font-medium block">
                  Creative Design & Print Lab
                </span>
              </div>
            </div>

            {/* Creative Brand Statement */}
            <p className="text-xs sm:text-sm text-[#625B69] leading-relaxed">
              "Create Visibility. Build Identity."
              <br />
              Melapalayam’s dedicated studio for high-aesthetic graphic design, weather-resistant flex, precision vinyl, 3D acrylic LED signage, and luxury print stationery.
            </p>

            {/* Contact Quick Pills */}
            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href="tel:+917530073785"
                className="flex items-center gap-2.5 text-xs text-[#35204F] font-semibold hover:text-[#5A2D91] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#5A2D91]" />
                <span>+91 75300 73785</span>
              </a>

              <a
                href="https://wa.me/917530073785"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-[#35204F] font-semibold hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp: +91 75300 73785</span>
              </a>

              <div className="flex items-start gap-2.5 text-xs text-[#625B69]">
                <MapPin className="w-3.5 h-3.5 text-[#5A2D91] shrink-0 mt-0.5" />
                <span>Hameem Puram 7th Street, Annai Hajira College Road, Melapalayam, Tirunelveli</span>
              </div>
            </div>

          </div>

          {/* Quick Nav Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-[#35204F]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#625B69]">
              <li>
                <a href="#home" className="hover:text-[#5A2D91] transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#5A2D91] transition-colors">All 11 Services</a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-[#5A2D91] transition-colors">Cost Estimator</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#5A2D91] transition-colors">About GRAPHIX</a>
              </li>
              <li>
                <a href="#work" className="hover:text-[#5A2D91] transition-colors">Design Repertoire</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#5A2D91] transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#5A2D91] transition-colors">Contact Studio</a>
              </li>
            </ul>
          </div>

          {/* Services Directory (Col 7-10) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-[#35204F]">
              Printing & Design Services
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#625B69]">
              {servicesData.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    if (onSelectService) onSelectService(s);
                  }}
                  className="text-left hover:text-[#5A2D91] transition-colors truncate"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Direct CTA (Col 11-12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-[#35204F]">
              Fast Order
            </h4>
            <p className="text-[11px] text-[#625B69]">
              Need urgent flex printing or visiting cards in Tirunelveli today?
            </p>
            <a
              href="https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20have%20an%20urgent%20print%20job%20in%20Melapalayam."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-xs font-bold text-white shadow-sm hover:opacity-95 transition-opacity"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Instant Chat</span>
            </a>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7E99]">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} GRAPHIX. All Rights Reserved.</span>
            <span>•</span>
            <span className="text-[#5A2D91] font-semibold">Melapalayam, Tirunelveli, Tamil Nadu</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF9FC] border border-[#EAE3F1] text-[#35204F] transition-colors shadow-sm"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#5A2D91]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
