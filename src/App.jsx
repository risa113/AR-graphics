import React, { useState, useEffect } from 'react';
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
import { MessageSquare, Phone } from 'lucide-react';
import { soundManager } from './utils/sound';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEnquiryService, setActiveEnquiryService] = useState(null);
  const [prefilledMessage, setPrefilledMessage] = useState('');

  // Handle service selection from any component
  const handleSelectService = (service) => {
    soundManager.playClick();
    setActiveEnquiryService(service);
    setModalOpen(true);
  };

  // Handle estimation transfer from Calculator
  const handleEnquireWithEstimate = (estimate) => {
    soundManager.playClick();
    setPrefilledMessage(`Requesting formal quote for ${estimate.title} (${estimate.details}). Estimated range: ₹${estimate.min} - ₹${estimate.max}.`);
    // Scroll directly to contact section
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle request similar from portfolio
  const handleRequestSimilar = (project) => {
    soundManager.playClick();
    setPrefilledMessage(`Interested in commissioning a project similar to: "${project.title}" (${project.category} - ${project.dimensions}).`);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0414] text-[#F8F6FA] selection:bg-[#8E63CB] selection:text-white relative w-full max-w-[100vw] overflow-x-hidden">
      
      {/* 1. Animated Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Interactive Custom Cursor */}
      <CustomCursor />

      {/* 3. Navigation Header */}
      <Header
        onOpenEnquiry={() => {
          setActiveEnquiryService(null);
          setModalOpen(true);
        }}
      />

      {/* 4. Signature 3D Hero Experience */}
      <Hero
        onOpenEnquiry={() => {
          setActiveEnquiryService(null);
          setModalOpen(true);
        }}
      />

      {/* 5. Continuous Kinetic Marquee & Production Metrics */}
      <StoryMarquee />

      {/* 6. Services — Interactive 3D Showcase (All 11 Services) */}
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

      {/* 12. Deep-Purple Studio Footer */}
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
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
          title="Chat with GRAPHIX on WhatsApp (+91 75300 73785)"
        >
          <MessageSquare className="w-6 h-6" />
          
          {/* Tooltip */}
          <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-[#150725] border border-[#D8C2F0]/20 text-[11px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            WhatsApp Studio: 75300 73785
          </span>
        </a>
      </div>

    </div>
  );
}
