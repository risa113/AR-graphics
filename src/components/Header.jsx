import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUpRight, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function Header({ onOpenEnquiry, onOpenCalculator }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'services', 'estimator', 'about', 'work', 'why-us', 'contact'];
      const scrollPos = window.scrollY + 200;

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

  const handleSoundToggle = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  };

  const handleLinkClick = (id) => {
    soundManager.playClick();
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#0c0414]/85 backdrop-blur-xl border-b border-[#D8C2F0]/10 shadow-[0_10px_30px_rgba(36,16,61,0.5)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with Custom Geometric Print Monogram */}
          <a
            href="#home"
            onClick={() => handleLinkClick('home')}
            onMouseEnter={() => soundManager.playHover()}
            className="group flex items-center gap-2.5 sm:gap-3.5 focus:outline-none shrink-0"
          >
            {/* Logo Icon */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#8E63CB] via-[#5A2D91] to-[#24103D] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(142,99,203,0.35)]">
              <div className="w-full h-full bg-[#120624] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <svg
                  className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <path
                    d="M 64 34 C 58 26 44 25 36 33 C 25 43 25 61 36 71 C 46 80 62 76 68 67 C 71 63 71 54 71 52 L 48 52 L 48 44 L 79 44 C 79 56 78 69 70 77 C 60 88 40 89 28 78 C 14 65 14 41 28 27 C 41 15 62 16 73 27 Z"
                    fill="url(#headerLogoGrad)"
                  />
                  <circle cx="50" cy="50" r="5" fill="#D8C2F0" />
                  <defs>
                    <linearGradient id="headerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D8C2F0" />
                      <stop offset="50%" stopColor="#8E63CB" />
                      <stop offset="100%" stopColor="#5A2D91" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Micro registration crosshairs */}
                <span className="absolute top-1 left-1 w-1 h-1 bg-[#8E63CB]/50 rounded-full" />
                <span className="absolute bottom-1 right-1 w-1 h-1 bg-[#8E63CB]/50 rounded-full" />
              </div>
            </div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-xl tracking-[0.12em] sm:tracking-[0.16em] text-white flex items-center gap-1">
                GRAPHIX
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E63CB] animate-pulse" />
              </span>
              <span className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#D8C2F0]/70 font-medium -mt-0.5">
                Design & Print Lab
              </span>
            </div>
          </a>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#1a0c2e]/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D8C2F0]/15 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative px-4 py-1.5 text-xs uppercase tracking-wider font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#EEE7F5]/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] rounded-full -z-10 shadow-[0_0_15px_rgba(142,99,203,0.5)] transition-all" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Subtle Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              className="p-2.5 rounded-full bg-[#1e0d36]/70 hover:bg-[#2b134d] border border-[#D8C2F0]/15 text-[#D8C2F0] transition-colors"
              title={soundEnabled ? 'Mute UI Sounds' : 'Enable UI Micro-Sounds'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#D8C2F0]" /> : <VolumeX className="w-4 h-4 text-[#EEE7F5]/40" />}
            </button>

            {/* Quick Call Pill */}
            <a
              href="tel:+917530073785"
              onMouseEnter={() => soundManager.playHover()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium text-[#EEE7F5] bg-[#1d0b38]/60 hover:bg-[#2a114f] border border-[#D8C2F0]/15 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#8E63CB]" />
              <span>75300 73785</span>
            </a>

            {/* Signature CTA: Let's Create Together */}
            <button
              onClick={() => {
                soundManager.playClick();
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide text-white overflow-hidden transition-all duration-300 shadow-[0_0_25px_rgba(90,45,145,0.4)] hover:shadow-[0_0_35px_rgba(142,99,203,0.65)] hover:scale-105 active:scale-95"
            >
              {/* Gradient border & background */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#5A2D91] via-[#8E63CB] to-[#5A2D91] bg-[length:200%_auto] transition-all duration-500 group-hover:bg-right" />
              <span className="relative z-10 flex items-center gap-2">
                <span>Let's Create Together</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden shrink-0">
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded-full bg-[#1e0d36]/70 border border-[#D8C2F0]/15 text-[#D8C2F0]"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-[#EEE7F5]/40" />}
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2.5 rounded-xl bg-[#1e0d36]/90 border border-[#D8C2F0]/20 text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#D8C2F0]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-2xl bg-[#120624]/95 backdrop-blur-2xl border border-[#D8C2F0]/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all ${
                  activeSection === link.id
                    ? 'bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] text-white shadow-md'
                    : 'text-[#EEE7F5]/80 hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-5 pt-4 border-t border-[#D8C2F0]/15 flex flex-col gap-3">
            <a
              href="tel:+917530073785"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1d0b38] border border-[#D8C2F0]/20 text-sm font-medium text-white"
            >
              <Phone className="w-4 h-4 text-[#8E63CB]" />
              <span>Call: 75300 73785</span>
            </a>

            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(false);
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] text-sm font-semibold text-white shadow-[0_0_20px_rgba(142,99,203,0.5)]"
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
