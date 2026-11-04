import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import StoryMarquee from './components/StoryMarquee';
import Services from './components/Services';
import PriceEstimator from './components/PriceEstimator';
import About from './components/About';
import Portfolio from './components/Portfolio';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import { MessageSquare } from 'lucide-react';
import { soundManager } from './utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEnquiryService, setActiveEnquiryService] = useState(null);
  const [prefilledMessage, setPrefilledMessage] = useState('');

  useEffect(() => {
    window.__dismissPreloader = () => setLoading(false);
  }, []);

  // Lenis Smooth Scrolling + GSAP ScrollTrigger Global Sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.8,
    });

    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Global Top Reading Progress Bar
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.15,
        },
      });
    }

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.__lenis = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleSelectService = (service) => {
    soundManager.playClick();
    setActiveEnquiryService(service);
    setModalOpen(true);
  };

  const handleEnquireWithEstimate = (estimate) => {
    soundManager.playClick();
    setPrefilledMessage(`Requesting formal quote for ${estimate.title} (${estimate.details}). Estimated range: ₹${estimate.min} - ₹${estimate.max}.`);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRequestSimilar = (project) => {
    soundManager.playClick();
    setPrefilledMessage(`Interested in commissioning a project similar to: "${project.title}" (${project.category} - ${project.dimensions}).`);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#35204F] selection:bg-[#D8C2F0] selection:text-[#35204F] relative w-full max-w-[100vw] overflow-x-hidden overflow-x-clip">
      
      {/* 0. Top Reading Progress Indicator (Lenis + GSAP) */}
      <div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5A2D91] via-[#8E63CB] to-[#D8C2F0] z-[70] origin-left scale-x-0 will-change-transform pointer-events-none"
      />
      
      {/* 1. Animated Preloader (Bright Studio Theme) */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Interactive Custom Cursor */}
      <CustomCursor />

      {/* 3. Navigation Header (Rebuilt: Floating, Minimalist, Animated) */}
      <Header
        onOpenEnquiry={() => {
          setActiveEnquiryService(null);
          setModalOpen(true);
        }}
      />

      {/* 4. Signature 3D Hero Experience (Bright Studio Lighting & Soft Shadows) */}
      <Hero
        onOpenEnquiry={() => {
          setActiveEnquiryService(null);
          setModalOpen(true);
        }}
      />

      {/* 5. Continuous Kinetic Marquee & Production Metrics */}
      <StoryMarquee />

      {/* 6. Services — Creative 3D Presentation (All 11 Services) */}
      <Services onSelectService={handleSelectService} />

      {/* 7. Live Print Cost Estimator Calculator */}
      <PriceEstimator onEnquireWithEstimate={handleEnquireWithEstimate} />

      {/* 8. About GRAPHIX — Studio Narrative & 4-Step Process */}
      <About
        onOpenEnquiry={() => {
          setActiveEnquiryService(null);
          setModalOpen(true);
        }}
      />

      {/* 9. Curated Portfolio & Production Archive */}
      <Portfolio onRequestSimilar={handleRequestSimilar} />

      {/* 10. Why Choose GRAPHIX (6 Core Pillars) */}
      <WhyChooseUs />

      {/* 11. Contact & Real Enquiry Form */}
      <Contact
        prefilledService={activeEnquiryService}
        prefilledMessage={prefilledMessage}
      />

      {/* 12. Studio Footer (Bright Editorial Finish) */}
      <Footer onSelectService={handleSelectService} />

      {/* 13. Consultation / Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={activeEnquiryService}
        initialMessage={prefilledMessage}
      />

      {/* 14. Floating WhatsApp Quick Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20would%20like%20to%20consult%20about%20a%20design%20and%20printing%20job%20in%20Melapalayam."
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => soundManager.playHover()}
          className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
          title="Chat with GRAPHIX on WhatsApp (+91 75300 73785)"
        >
          <MessageSquare className="w-6 h-6" />
          
          {/* Tooltip */}
          <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-white border border-[#EAE3F1] text-[11px] font-bold text-[#35204F] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            WhatsApp Studio: 75300 73785
          </span>
        </a>
      </div>

    </div>
  );
}
