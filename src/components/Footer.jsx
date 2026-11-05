import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, ArrowUp, Sparkles, Navigation } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { seoServicesData } from '../data/seoServicesData';
import { soundManager } from '../utils/sound';

export default function Footer({ onSelectService }) {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    soundManager.playClick();
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavAnchor = (e, targetId) => {
    if (e) e.preventDefault();
    soundManager.playClick();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          if (window.__lenis) window.__lenis.scrollTo(`#${targetId}`);
          else el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        if (window.__lenis) window.__lenis.scrollTo(`#${targetId}`);
        else el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-[#FAF9FC] text-[#35204F] pt-20 pb-12 overflow-hidden border-t border-[#EAE3F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#EAE3F1]">
          
          {/* Brand Info (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Logo */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#EAE3F1] shadow-sm p-1.5 flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}logo-monogram.svg`}
                  alt="GRAPHIX Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <span className="font-black text-xl tracking-[0.14em] text-[#35204F] block">
                  GRAPHIX
                </span>
                <span className="text-[9px] uppercase tracking-[0.24em] text-[#5A2D91] font-bold block">
                  Create Visibility • Build Identity
                </span>
              </div>
            </div>

            {/* Creative Brand Statement */}
            <p className="text-xs sm:text-sm text-[#625B69] leading-relaxed">
              "Create Visibility. Build Identity."
              <br />
              Melapalayam’s dedicated studio for high-aesthetic graphic design, weather-resistant star flex, precision vinyl, 3D acrylic LED signage, and luxury print stationery across Tirunelveli district.
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
                <span>Hameem Puram 7th Street, Annai Hajira College Road, Melapalayam, Tirunelveli 627005</span>
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
                <button onClick={(e) => handleNavAnchor(e, 'home')} className="hover:text-[#5A2D91] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNavAnchor(e, 'services')} className="hover:text-[#5A2D91] transition-colors cursor-pointer">
                  All 11 Services
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNavAnchor(e, 'local-seo-hub')} className="hover:text-[#5A2D91] transition-colors cursor-pointer">
                  Tirunelveli Hub
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNavAnchor(e, 'estimator')} className="hover:text-[#5A2D91] transition-colors cursor-pointer">
                  Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNavAnchor(e, 'about')} className="hover:text-[#5A2D91] transition-colors cursor-pointer">
                  About GRAPHIX
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNavAnchor(e, 'work')} className="hover:text-[#5A2D91] transition-colors cursor-pointer">
                  Design Repertoire
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNavAnchor(e, 'contact')} className="hover:text-[#5A2D91] transition-colors cursor-pointer">
                  Contact Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Tirunelveli Local SEO Hub Pages (Col 7-9) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-[#35204F] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#5A2D91]" />
              <span>Tirunelveli Authority</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#625B69]">
              {seoServicesData.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    to={`/${svc.slug}`}
                    className="hover:text-[#5A2D91] transition-colors truncate block"
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Production Capabilities & Urgent Orders (Col 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-[#35204F]">
              Direct Inquiries
            </h4>
            <p className="text-xs text-[#625B69] leading-relaxed">
              Same-day flex printing, banner designing, or luxury business cards in Melapalayam & Tirunelveli?
            </p>
            
            <a
              href="https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20have%20an%20urgent%20design%20and%20printing%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-xs font-bold text-white shadow-sm hover:opacity-95 transition-opacity"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Studio (+91 75300 73785)</span>
            </a>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=8.697471,77.712613"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#5A2D91] font-bold hover:underline"
              >
                <Navigation className="w-3 h-3" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7E99]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span>© {new Date().getFullYear()} GRAPHIX. All Rights Reserved.</span>
            <span>•</span>
            <span className="text-[#5A2D91] font-semibold">Melapalayam, Tirunelveli, Tamil Nadu</span>
            <span>•</span>
            <span>CIN / Reg: Tirunelveli Local Authority</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF9FC] border border-[#EAE3F1] text-[#35204F] transition-colors shadow-sm cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#5A2D91]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
