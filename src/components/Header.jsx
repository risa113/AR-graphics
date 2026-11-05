import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUpRight, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function Header({ onOpenEnquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['home', 'services', 'estimator', 'about', 'work', 'why-us', 'contact'];
      const scrollPos = window.scrollY + 180;

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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Estimator', href: '#estimator', id: 'estimator' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Our Work', href: '#work', id: 'work' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e, id) => {
    if (e) e.preventDefault();
    soundManager.playClick();
    setActiveSection(id);
    setMobileMenuOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(`#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-[#EAE3F1] shadow-[0_10px_30px_-10px_rgba(53,32,79,0.08)]'
          : 'py-5 sm:py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between w-full">
          
          {/* Logo with Polished AR Monogram */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            onMouseEnter={() => soundManager.playHover()}
            className="group flex items-center gap-2.5 sm:gap-3.5 focus:outline-none shrink-0"
          >
            {/* Logo Monogram Box */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#EAE3F1] shadow-[0_4px_16px_rgba(90,45,145,0.12)] p-1.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_6px_20px_rgba(90,45,145,0.22)] group-hover:border-[#D8C2F0] flex items-center justify-center overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}logo-monogram.svg`}
                alt="GRAPHIX Logo"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-xl tracking-[0.12em] sm:tracking-[0.14em] text-[#35204F] flex items-center gap-1">
                GRAPHIX
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E63CB]" />
              </span>
              <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.22em] text-[#5A2D91] font-bold -mt-0.5">
                Create Visibility • Build Identity
              </span>
            </div>
          </a>

          {/* Center Navigation - Minimalist, Airy & Editorial */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#EAE3F1] shadow-[0_2px_12px_rgba(53,32,79,0.04)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative px-4 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#625B69] hover:text-[#35204F] hover:bg-[#F3ECFA]/60'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute inset-0 bg-[#5A2D91] rounded-full -z-10 shadow-[0_2px_10px_rgba(90,45,145,0.35)] transition-all" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Area - Inspired by Reference */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Phone Call Pill */}
            <a
              href="tel:+917530073785"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-[#35204F] bg-white hover:bg-[#FAF9FC] border border-[#EAE3F1] transition-all shadow-sm hover:border-[#D8C2F0]"
            >
              <Phone className="w-3.5 h-3.5 text-[#5A2D91]" />
              <span>75300 73785</span>
            </a>

            {/* Signature CTA Pill - Clean White Surface with Purple Border or Gradient Hover */}
            <button
              onClick={() => {
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide text-white bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] hover:from-[#6b36ac] hover:to-[#9c71da] transition-all duration-300 shadow-[0_4px_14px_rgba(90,45,145,0.25)] hover:shadow-[0_6px_20px_rgba(90,45,145,0.35)] hover:scale-[1.02] active:scale-95"
            >
              <span>Let's Create Together</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Actions Button */}
          <div className="flex items-center gap-2 md:hidden shrink-0">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2.5 rounded-xl bg-white border border-[#EAE3F1] text-[#35204F] shadow-sm focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#5A2D91]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu - Clean White Surface */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-2xl bg-white/98 backdrop-blur-2xl border border-[#EAE3F1] shadow-[0_20px_40px_rgba(53,32,79,0.12)] animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === link.id
                    ? 'bg-[#5A2D91] text-white shadow-sm'
                    : 'text-[#625B69] hover:text-[#35204F] hover:bg-[#F3ECFA]/60'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-[#EAE3F1] flex flex-col gap-2.5">
            <a
              href="tel:+917530073785"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1] text-xs font-semibold text-[#35204F]"
            >
              <Phone className="w-4 h-4 text-[#5A2D91]" />
              <span>Call: 75300 73785</span>
            </a>

            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(false);
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] text-xs font-bold text-white shadow-md"
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
