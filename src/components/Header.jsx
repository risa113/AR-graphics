import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ArrowUpRight, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function Header({ onOpenEnquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname === '/') {
        const sections = ['home', 'services', 'local-seo-hub', 'estimator', 'about', 'work', 'why-us', 'contact'];
        const scrollPos = window.scrollY + 160;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Tirunelveli Hub', id: 'local-seo-hub' },
    { name: 'Estimator', id: 'estimator' },
    { name: 'About', id: 'about' },
    { name: 'Our Work', id: 'work' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (e, id) => {
    if (e) e.preventDefault();
    soundManager.playClick();
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(`#${id}`);
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
    } else {
      if (window.__lenis) {
        window.__lenis.scrollTo(`#${id}`);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e) => {
    if (e) e.preventDefault();
    soundManager.playClick();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      if (window.__lenis) {
        window.__lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-[#EAE3F1] ${
        scrolled
          ? 'py-2.5 shadow-[0_8px_30px_rgba(53,32,79,0.08)]'
          : 'py-3.5 sm:py-4 shadow-[0_2px_16px_rgba(53,32,79,0.04)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between w-full gap-4">
          
          {/* Logo with Polished AR Monogram on Dark Purple Lavender Background */}
          <button
            onClick={handleLogoClick}
            onMouseEnter={() => soundManager.playHover()}
            className="group flex items-center gap-2.5 sm:gap-3.5 focus:outline-none shrink-0 text-left cursor-pointer"
          >
            {/* Logo Monogram Box — Dark Purple Lavender Gradient with 3D White Monogram */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#24103D] via-[#5A2D91] to-[#7B42BC] border border-[#D8C2F0]/40 shadow-[0_4px_16px_rgba(90,45,145,0.35)] p-1.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_6px_22px_rgba(90,45,145,0.5)] flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}logo-monogram-white.svg`}
                alt="GRAPHIX Logo"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
              />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg tracking-[0.12em] text-[#35204F] flex items-center gap-1 leading-tight">
                GRAPHIX
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E63CB]" />
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.2em] text-[#5A2D91] font-bold">
                Create Visibility • Build Identity
              </span>
            </div>
          </button>

          {/* Center Navigation - Minimalist, Airy & Non-overlapping */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#FAF9FC] px-3 py-1.5 rounded-full border border-[#EAE3F1] shadow-xs">
            {navLinks.map((link) => {
              const isActive = location.pathname === '/' && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative px-3.5 py-1 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-[#625B69] hover:text-[#35204F] hover:bg-[#F3ECFA]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute inset-0 bg-[#5A2D91] rounded-full -z-10 shadow-[0_2px_8px_rgba(90,45,145,0.3)] transition-all" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Quick Phone Call Pill */}
            <a
              href="tel:+917530073785"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold text-[#35204F] bg-white hover:bg-[#FAF9FC] border border-[#EAE3F1] transition-all shadow-xs hover:border-[#D8C2F0]"
            >
              <Phone className="w-3.5 h-3.5 text-[#5A2D91]" />
              <span>75300 73785</span>
            </a>

            {/* Signature CTA Pill */}
            <button
              onClick={() => {
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              className="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold tracking-wide text-white bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] hover:from-[#6b36ac] hover:to-[#9c71da] transition-all duration-300 shadow-[0_4px_14px_rgba(90,45,145,0.25)] hover:shadow-[0_6px_20px_rgba(90,45,145,0.35)] hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Let's Create Together</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Actions Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#EAE3F1] text-[#35204F] shadow-xs focus:outline-none cursor-pointer xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#5A2D91]" /> : <Menu className="w-5 h-5 text-[#35204F]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-3 mx-4 p-5 rounded-2xl bg-white/98 backdrop-blur-2xl border border-[#EAE3F1] shadow-[0_20px_40px_rgba(53,32,79,0.12)] animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                  location.pathname === '/' && activeSection === link.id
                    ? 'bg-[#5A2D91] text-white shadow-sm'
                    : 'text-[#625B69] hover:text-[#35204F] hover:bg-[#F3ECFA]'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-[#EAE3F1] flex flex-col gap-2.5">
            <a
              href="tel:+917530073785"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1] text-xs font-semibold text-[#35204F]"
            >
              <Phone className="w-4 h-4 text-[#5A2D91]" />
              <span>Call: +91 75300 73785</span>
            </a>

            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(false);
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] text-xs font-bold text-white shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Let's Create Together</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
