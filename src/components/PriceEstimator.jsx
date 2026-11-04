import React, { useState, useEffect, useRef } from 'react';
import { Calculator, MessageSquare, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundManager } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function PriceEstimator({ onEnquireWithEstimate }) {
  const [selectedService, setSelectedService] = useState('flex');
  
  // Flex state
  const [flexWidth, setFlexWidth] = useState(10);
  const [flexHeight, setFlexHeight] = useState(4);
  const [flexQuality, setFlexQuality] = useState('star'); // normal, star, blackout

  // Visiting cards state
  const [cardQuantity, setCardQuantity] = useState(1000);
  const [cardFinish, setCardFinish] = useState('spot-uv'); // matte, spot-uv, foil

  // Vinyl state
  const [vinylArea, setVinylArea] = useState(25);
  const [vinylType, setVinylType] = useState('gloss'); // gloss, matte, frosted

  // LED Board state
  const [ledLength, setLedLength] = useState(8);
  const [ledStyle, setLedStyle] = useState('acrylic-3d'); // acrylic-3d, halo, neon

  const sectionRef = useRef(null);
  const calcCardRef = useRef(null);
  const headerRef = useRef(null);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const prevPriceObj = useRef({ min: 1000, max: 2000 });

  const calculateEstimate = () => {
    switch (selectedService) {
      case 'flex': {
        const sqft = flexWidth * flexHeight;
        let ratePerSqFt = 18;
        if (flexQuality === 'star') ratePerSqFt = 28;
        if (flexQuality === 'blackout') ratePerSqFt = 38;
        const total = sqft * ratePerSqFt;
        return {
          title: 'Flex Banner Estimate',
          details: `${flexWidth}ft × ${flexHeight}ft (${sqft} Sq.Ft) • ${flexQuality.toUpperCase()} MEDIA`,
          min: Math.round(total * 0.95),
          max: Math.round(total * 1.15),
          unit: 'Total Estimated Range'
        };
      }
      case 'cards': {
        let base = 750;
        if (cardQuantity === 500) base = 550;
        if (cardQuantity === 2000) base = 1350;

        let multiplier = 1.0;
        if (cardFinish === 'spot-uv') multiplier = 1.5;
        if (cardFinish === 'foil') multiplier = 2.1;

        const total = base * multiplier;
        return {
          title: 'Executive Visiting Cards Estimate',
          details: `${cardQuantity} Cards • ${cardFinish.toUpperCase()} FINISH`,
          min: Math.round(total * 0.95),
          max: Math.round(total * 1.1),
          unit: 'Total Estimated Range'
        };
      }
      case 'vinyl': {
        let rate = 45;
        if (vinylType === 'frosted') rate = 65;
        const total = vinylArea * rate;
        return {
          title: 'Vinyl Sticker Work Estimate',
          details: `${vinylArea} Sq.Ft • ${vinylType.toUpperCase()} LAMINATION`,
          min: Math.round(total * 0.9),
          max: Math.round(total * 1.15),
          unit: 'Total Estimated Range'
        };
      }
      case 'led': {
        let ratePerFoot = 950;
        if (ledStyle === 'halo') ratePerFoot = 1300;
        if (ledStyle === 'neon') ratePerFoot = 850;
        const total = ledLength * ratePerFoot;
        return {
          title: '3D LED Board Signage Estimate',
          details: `${ledLength} Running Feet • ${ledStyle.toUpperCase()} STYLE`,
          min: Math.round(total * 0.9),
          max: Math.round(total * 1.2),
          unit: 'Total Estimated Range'
        };
      }
      default:
        return { title: 'Custom Quote', details: 'Bespoke specifications', min: 500, max: 2000, unit: 'Estimate' };
    }
  };

  const estimate = calculateEstimate();

  // Scroll entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Zoom-In reveal on the calculator container card
      if (calcCardRef.current) {
        gsap.fromTo(
          calcCardRef.current,
          { opacity: 0, scale: 0.93, y: 35 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: calcCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Kinetic Animated Price Counter
  useEffect(() => {
    const currentPrices = { min: prevPriceObj.current.min, max: prevPriceObj.current.max };
    
    gsap.to(currentPrices, {
      min: estimate.min,
      max: estimate.max,
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: () => {
        if (minPriceRef.current) {
          minPriceRef.current.textContent = `₹${Math.round(currentPrices.min).toLocaleString('en-IN')}`;
        }
        if (maxPriceRef.current) {
          maxPriceRef.current.textContent = `₹${Math.round(currentPrices.max).toLocaleString('en-IN')}`;
        }
      }
    });

    prevPriceObj.current = { min: estimate.min, max: estimate.max };
  }, [estimate.min, estimate.max]);

  const handleSendToWhatsApp = () => {
    soundManager.playClick();
    const message = `Hello GRAPHIX, I generated a quote on your website for *${estimate.title}*:%0A- Specifications: ${estimate.details}%0A- Estimated Range: ₹${estimate.min} - ₹${estimate.max}%0APlease confirm availability and final timeline.`;
    window.open(`https://wa.me/917530073785?text=${message}`, '_blank');
  };

  return (
    <section ref={sectionRef} id="estimator" className="relative py-24 bg-[#FAF9FC] border-y border-[#EAE3F1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE3F1] text-[#5A2D91] text-xs uppercase tracking-widest font-bold mb-3 shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-[#8E63CB]" />
            <span>Instant Print Quote Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#35204F] tracking-tight mb-3">
            ESTIMATE YOUR PROJECT IN REAL-TIME
          </h2>
          <p className="text-xs sm:text-sm text-[#625B69]">
            Transparent pricing models calibrated for high quality materials and Melapalayam / Tirunelveli delivery.
          </p>
        </div>

        {/* Calculator Card - Bright Luxury White with Scale Up Reveal */}
        <div
          ref={calcCardRef}
          className="rounded-3xl bg-white border border-[#EAE3F1] p-6 sm:p-10 shadow-[0_8px_30px_rgba(53,32,79,0.06)] will-change-transform"
        >
          {/* Service Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
            {[
              { id: 'flex', name: 'Flex Printing' },
              { id: 'cards', name: 'Visiting Cards' },
              { id: 'vinyl', name: 'Vinyl Stickers' },
              { id: 'led', name: 'LED Signboard' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedService(tab.id);
                }}
                className={`py-3 px-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  selectedService === tab.id
                    ? 'bg-[#5A2D91] text-white shadow-sm'
                    : 'bg-[#FAF9FC] text-[#625B69] hover:text-[#35204F] hover:bg-[#F3ECFA] border border-[#EAE3F1]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Dynamic Configuration Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
            
            {/* Left Controls Column */}
            <div className="space-y-6">
              
              {/* Controls for Flex */}
              {selectedService === 'flex' && (
                <>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#35204F] mb-2">
                      <span>Width: {flexWidth} Feet</span>
                      <span>Height: {flexHeight} Feet</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] text-[#8A7E99] font-medium block mb-1">Banner Width</span>
                        <input
                          type="range"
                          min="3"
                          max="40"
                          value={flexWidth}
                          onChange={(e) => setFlexWidth(Number(e.target.value))}
                          className="w-full accent-[#5A2D91]"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8A7E99] font-medium block mb-1">Banner Height</span>
                        <input
                          type="range"
                          min="2"
                          max="20"
                          value={flexHeight}
                          onChange={(e) => setFlexHeight(Number(e.target.value))}
                          className="w-full accent-[#5A2D91]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#35204F] block mb-2">
                      Flex Media Quality
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'normal', name: 'Normal 260g' },
                        { id: 'star', name: 'Star Flex 340g' },
                        { id: 'blackout', name: 'Blackout 440g' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setFlexQuality(item.id)}
                          className={`py-2 px-2 rounded-lg text-[11px] font-semibold border ${
                            flexQuality === item.id
                              ? 'bg-[#5A2D91] border-[#5A2D91] text-white shadow-sm'
                              : 'bg-[#FAF9FC] border-[#EAE3F1] text-[#625B69]'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Controls for Cards */}
              {selectedService === 'cards' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-[#35204F] block mb-2">
                      Card Quantity
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[500, 1000, 2000].map((qty) => (
                        <button
                          key={qty}
                          onClick={() => setCardQuantity(qty)}
                          className={`py-2 px-2 rounded-lg text-xs font-bold border ${
                            cardQuantity === qty
                              ? 'bg-[#5A2D91] border-[#5A2D91] text-white shadow-sm'
                              : 'bg-[#FAF9FC] border-[#EAE3F1] text-[#625B69]'
                          }`}
                        >
                          {qty} Cards
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#35204F] block mb-2">
                      Premium Finish
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'matte', name: 'Velvet Matte' },
                        { id: 'spot-uv', name: 'Raised Spot UV' },
                        { id: 'foil', name: 'Gold Foil Stamp' }
                      ].map((finish) => (
                        <button
                          key={finish.id}
                          onClick={() => setCardFinish(finish.id)}
                          className={`py-2 px-2 rounded-lg text-[11px] font-semibold border ${
                            cardFinish === finish.id
                              ? 'bg-[#5A2D91] border-[#5A2D91] text-white shadow-sm'
                              : 'bg-[#FAF9FC] border-[#EAE3F1] text-[#625B69]'
                          }`}
                        >
                          {finish.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Controls for Vinyl */}
              {selectedService === 'vinyl' && (
                <>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#35204F] mb-2">
                      <span>Total Area: {vinylArea} Sq.Ft</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="150"
                      value={vinylArea}
                      onChange={(e) => setVinylArea(Number(e.target.value))}
                      className="w-full accent-[#5A2D91]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#35204F] block mb-2">
                      Vinyl Finish Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'gloss', name: 'Gloss UV Laminate' },
                        { id: 'matte', name: 'Satin Matte Film' },
                        { id: 'frosted', name: 'Frosted Crystal' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setVinylType(t.id)}
                          className={`py-2 px-2 rounded-lg text-[11px] font-semibold border ${
                            vinylType === t.id
                              ? 'bg-[#5A2D91] border-[#5A2D91] text-white shadow-sm'
                              : 'bg-[#FAF9FC] border-[#EAE3F1] text-[#625B69]'
                          }`}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Controls for LED */}
              {selectedService === 'led' && (
                <>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#35204F] mb-2">
                      <span>Running Length: {ledLength} Feet</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="30"
                      value={ledLength}
                      onChange={(e) => setLedLength(Number(e.target.value))}
                      className="w-full accent-[#5A2D91]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#35204F] block mb-2">
                      Signage Style
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'acrylic-3d', name: '3D Frontlit Acrylic' },
                        { id: 'halo', name: 'Backlit Halo Neon' },
                        { id: 'neon', name: 'Silicone Flex Neon' }
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setLedStyle(s.id)}
                          className={`py-2 px-2 rounded-lg text-[11px] font-semibold border ${
                            ledStyle === s.id
                              ? 'bg-[#5A2D91] border-[#5A2D91] text-white shadow-sm'
                              : 'bg-[#FAF9FC] border-[#EAE3F1] text-[#625B69]'
                          }`}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Right Result Estimation Box - Light Lavender Architectural Card */}
            <div className="rounded-2xl bg-[#F3ECFA]/60 border border-[#D8C2F0] p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8E63CB]/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#5A2D91] uppercase">
                    CALCULATED ESTIMATION
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
                </div>

                <h3 className="text-xl font-black text-[#35204F] mb-1.5">
                  {estimate.title}
                </h3>
                <p className="text-xs text-[#625B69] font-mono mb-6">
                  {estimate.details}
                </p>

                {/* Animated Rolling Price Display */}
                <div className="mb-2">
                  <div className="text-3xl sm:text-4xl font-black text-[#5A2D91] flex items-center gap-1.5 font-mono tracking-tight">
                    <span ref={minPriceRef}>₹{estimate.min.toLocaleString('en-IN')}</span>
                    <span className="text-[#8E63CB] font-sans font-light">–</span>
                    <span ref={maxPriceRef}>₹{estimate.max.toLocaleString('en-IN')}</span>
                    <span className="text-base text-[#8E63CB] font-normal">*</span>
                  </div>
                  <span className="text-[10px] text-[#8A7E99] block mt-1.5">
                    *Taxes & custom installation evaluated per project specifics.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-[#EAE3F1] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSendToWhatsApp}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-95 text-xs font-bold text-white flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Estimate To WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    if (onEnquireWithEstimate) onEnquireWithEstimate(estimate);
                  }}
                  className="py-3 px-4 rounded-xl bg-[#5A2D91] hover:bg-[#6c35ad] text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Book Consultation</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
