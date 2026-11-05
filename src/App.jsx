import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import StoryMarquee from './components/StoryMarquee';
import Services from './components/Services';
import LocalSeoHub from './components/LocalSeoHub';
import PriceEstimator from './components/PriceEstimator';
import About from './components/About';
import Portfolio from './components/Portfolio';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import ServiceDetailPage from './pages/ServiceDetailPage';
import { MessageSquare } from 'lucide-react';
import { soundManager } from './utils/sound';

gsap.registerPlugin(ScrollTrigger);

// Helper component to reset scroll on route transition
function ScrollToTopWatcher() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}

// HomePage Component containing the high-impact landing page sections
function HomePage({
  onSelectService,
  onEnquireWithEstimate,
  onRequestSimilar,
  onOpenEnquiry,
  activeEnquiryService,
  prefilledMessage
}) {
  return (
    <>
      {/* 1. Signature 3D Hero Experience (Bright Studio Lighting & Soft Shadows) */}
      <Hero onOpenEnquiry={onOpenEnquiry} />

      {/* 2. Continuous Kinetic Marquee & Production Metrics */}
      <StoryMarquee />

      {/* 3. Services — Creative 3D Presentation (All 11 Services) */}
      <Services onSelectService={onSelectService} />

      {/* 4. Local SEO Authority Hub (8 Targeted High-Intent Hubs + Map + Coverage) */}
      <LocalSeoHub />

      {/* 5. Live Print Cost Estimator Calculator */}
      <PriceEstimator onEnquireWithEstimate={onEnquireWithEstimate} />

      {/* 6. About GRAPHIX — Studio Narrative & 4-Step Process */}
      <About onOpenEnquiry={onOpenEnquiry} />

      {/* 7. Curated Portfolio & Production Archive */}
      <Portfolio onRequestSimilar={onRequestSimilar} />

      {/* 8. Why Choose GRAPHIX (6 Core Pillars) */}
      <WhyChooseUs />

      {/* 9. Contact & Real Enquiry Form */}
      <Contact
        prefilledService={activeEnquiryService}
        prefilledMessage={prefilledMessage}
      />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEnquiryService, setActiveEnquiryService] = useState(null);
  const [prefilledMessage, setPrefilledMessage] = useState('');

  useEffect(() => {
    window.__dismissPreloader = () => setLoading(false);
  }, []);

  // Ultra-Smooth High-FPS Lenis Scrolling + GSAP ScrollTrigger Sync
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const lenis = new Lenis({
      duration: isTouch ? 0.6 : 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.0,
      wheelMultiplier: 1.0,
    });

    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    // Ultra-lightweight Top Reading Progress Indicator (Direct GPU scaleX, no ScrollTrigger scrub overhead)
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
      lenis.on('scroll', ({ progress }) => {
        progressBar.style.transform = `scaleX(${progress})`;
      });
    }

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // Standard lag smoothing to maintain fluid 60-120fps without hitching
    gsap.ticker.lagSmoothing(500, 33);

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
    setPrefilledMessage(
      `Requesting formal quote for ${estimate.title} (${estimate.details}). Estimated range: ₹${estimate.min} - ₹${estimate.max}.`
    );
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRequestSimilar = (project) => {
    soundManager.playClick();
    setPrefilledMessage(
      `Interested in commissioning a project similar to: "${project.title}" (${project.category} - ${project.dimensions}).`
    );
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BrowserRouter basename="/AR-graphics">
      <ScrollToTopWatcher />
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

        {/* 3. Navigation Header (Router-Aware, Floating, Minimalist) */}
        <Header
          onOpenEnquiry={() => {
            setActiveEnquiryService(null);
            setModalOpen(true);
          }}
        />

        {/* 4. Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSelectService={handleSelectService}
                onEnquireWithEstimate={handleEnquireWithEstimate}
                onRequestSimilar={handleRequestSimilar}
                onOpenEnquiry={() => {
                  setActiveEnquiryService(null);
                  setModalOpen(true);
                }}
                activeEnquiryService={activeEnquiryService}
                prefilledMessage={prefilledMessage}
              />
            }
          />
          <Route
            path="/:slug"
            element={
              <ServiceDetailPage
                onOpenEnquiry={() => {
                  setActiveEnquiryService(null);
                  setModalOpen(true);
                }}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* 5. Studio Footer (Bright Editorial Finish + SEO Directory) */}
        <Footer onSelectService={handleSelectService} />

        {/* 6. Consultation / Enquiry Modal */}
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialService={activeEnquiryService}
          initialMessage={prefilledMessage}
        />

        {/* 7. Floating WhatsApp Quick Action Button */}
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
    </BrowserRouter>
  );
}
