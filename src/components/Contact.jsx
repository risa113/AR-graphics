import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin, Send, Clock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { servicesData } from '../data/servicesData';
import { soundManager } from '../utils/sound';

export default function Contact({ prefilledService, prefilledMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'flex-work',
    quantity: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({
        ...prev,
        service: prefilledService.id || prev.service,
        message: prev.message || `I am looking for a quote regarding ${prefilledService.title}.`
      }));
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledMessage) {
      setFormData((prev) => ({
        ...prev,
        message: prefilledMessage
      }));
    }
  }, [prefilledMessage]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your full name (minimum 2 letters).';
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.message.trim() || formData.message.trim().length < 8) {
      errs.message = 'Please provide brief details about your design or print requirements.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    const ticketId = `GRX-${Math.floor(100000 + Math.random() * 900000)}`;
    const submissionData = {
      ticketId,
      ...formData,
      timestamp: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('graphix_enquiries') || '[]');
      existing.unshift(submissionData);
      localStorage.setItem('graphix_enquiries', JSON.stringify(existing));
    } catch {
      // Local storage fallback
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmittedTicket(submissionData);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5A2D91', '#8E63CB', '#D8C2F0', '#E8BA40']
      });
    }, 700);
  };

  const handleSendToWhatsAppDirect = () => {
    soundManager.playClick();
    const serviceObj = servicesData.find((s) => s.id === formData.service);
    const serviceName = serviceObj ? serviceObj.title : formData.service;

    const text = `*NEW ENQUIRY — GRAPHIX*%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${serviceName}%0A*Quantity/Specs:* ${formData.quantity || 'Not specified'}%0A*Details:* ${formData.message}%0A*Ticket ID:* ${submittedTicket ? submittedTicket.ticketId : 'Pending'}`;

    window.open(`https://wa.me/917530073785?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-28 bg-[#FAF9FC] border-t border-[#EAE3F1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE3F1] text-[#5A2D91] text-xs uppercase tracking-[0.2em] font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
            <span>Connect Directly With Our Studio</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#35204F] tracking-tight mb-4">
            START YOUR PROJECT.{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35204F] via-[#5A2D91] to-[#8E63CB]">
              TALK TO GRAPHIX.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#625B69]">
            Have a question, urgent event deadline, or custom design idea? Send us an inquiry or reach us immediately via phone and WhatsApp.
          </p>
        </div>

        {/* Contact Layout: Form (Left) & Verified Business Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Real Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-[#EAE3F1] p-6 sm:p-10 shadow-[0_8px_30px_rgba(53,32,79,0.06)]">
              
              {submittedTicket ? (
                /* Success State Card */
                <div className="py-8 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#FAF9FC] border-2 border-[#5A2D91] text-[#5A2D91] flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle2 className="w-8 h-8 text-[#5A2D91]" />
                  </div>

                  <span className="text-xs font-mono font-bold tracking-widest text-[#5A2D91] block mb-1">
                    ENQUIRY REGISTERED
                  </span>

                  <h3 className="text-2xl font-black text-[#35204F] mb-2">
                    Thank You, {submittedTicket.name}!
                  </h3>

                  <p className="text-xs sm:text-sm text-[#625B69] max-w-md mx-auto mb-6 leading-relaxed">
                    Your project inquiry for{' '}
                    <strong className="text-[#35204F]">
                      {servicesData.find((s) => s.id === submittedTicket.service)?.title || submittedTicket.service}
                    </strong>{' '}
                    has been submitted to GRAPHIX studio in Melapalayam.
                  </p>

                  <div className="inline-block bg-[#FAF9FC] border border-[#EAE3F1] rounded-xl px-5 py-3 mb-6">
                    <span className="text-[10px] font-mono text-[#8A7E99] block uppercase">
                      Reference Ticket ID
                    </span>
                    <span className="text-lg font-mono font-black text-[#35204F] tracking-widest">
                      {submittedTicket.ticketId}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleSendToWhatsAppDirect}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md hover:opacity-95"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Forward Ticket To WhatsApp (+91 75300 73785)</span>
                    </button>

                    <button
                      onClick={() => setSubmittedTicket(null)}
                      className="py-3 px-5 rounded-xl bg-[#FAF9FC] hover:bg-[#F3ECFA] text-xs font-bold text-[#35204F] border border-[#EAE3F1]"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Actual Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Name */}
                    <div>
                      <label className="text-xs font-bold text-[#35204F] block mb-1.5">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mohamed Ashik"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#FAF9FC] border text-sm text-[#35204F] placeholder-gray-400 focus:outline-none focus:border-[#5A2D91] focus:bg-white transition-colors ${
                          errors.name ? 'border-red-500' : 'border-[#EAE3F1]'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.name}</span>
                        </span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="text-xs font-bold text-[#35204F] block mb-1.5">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 75300 73785"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#FAF9FC] border text-sm text-[#35204F] placeholder-gray-400 focus:outline-none focus:border-[#5A2D91] focus:bg-white transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-[#EAE3F1]'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.phone}</span>
                        </span>
                      )}
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Service Selection Dropdown */}
                    <div>
                      <label className="text-xs font-bold text-[#35204F] block mb-1.5">
                        Required Service <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1] text-sm text-[#35204F] focus:outline-none focus:border-[#5A2D91] focus:bg-white transition-colors"
                      >
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.id} className="bg-white text-[#35204F]">
                            {s.number}. {s.title}
                          </option>
                        ))}
                        <option value="custom-package" className="bg-white text-[#35204F]">
                          Custom Branding / Complete Package
                        </option>
                      </select>
                    </div>

                    {/* Quantity or Dimensions */}
                    <div>
                      <label className="text-xs font-bold text-[#35204F] block mb-1.5">
                        Estimated Size or Quantity (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 10x4 ft banner / 1000 cards"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1] text-sm text-[#35204F] placeholder-gray-400 focus:outline-none focus:border-[#5A2D91] focus:bg-white transition-colors"
                      />
                    </div>

                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-bold text-[#35204F] block mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-[#FAF9FC] border text-sm text-[#35204F] placeholder-gray-400 focus:outline-none focus:border-[#5A2D91] focus:bg-white transition-colors ${
                        errors.email ? 'border-red-500' : 'border-[#EAE3F1]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="text-xs font-bold text-[#35204F] block mb-1.5">
                      Project Requirements & Instructions <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Describe your design vision, required deadline, or specific finishing options..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-[#FAF9FC] border text-sm text-[#35204F] placeholder-gray-400 focus:outline-none focus:border-[#5A2D91] focus:bg-white transition-colors resize-none ${
                        errors.message ? 'border-red-500' : 'border-[#EAE3F1]'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.message}</span>
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] hover:from-[#6c36ac] hover:to-[#9c71da] transition-all duration-300 shadow-[0_4px_16px_rgba(90,45,145,0.25)] hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Processing Ticket...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Design & Print Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Verified Business Information & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-3xl bg-white border border-[#EAE3F1] p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgba(53,32,79,0.06)]">
              
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5A2D91] block mb-1">
                  OFFICIAL CONTACT INFO
                </span>
                <h3 className="text-xl font-black text-[#35204F]">
                  GRAPHIX Studio
                </h3>
              </div>

              {/* Click-to-Call */}
              <a
                href="tel:+917530073785"
                onMouseEnter={() => soundManager.playHover()}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1] hover:border-[#D8C2F0] hover:bg-white transition-all group"
              >
                <div className="p-3 rounded-xl bg-white border border-[#EAE3F1] text-[#5A2D91] shadow-sm group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-[#5A2D91]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#8A7E99] block font-semibold">
                    Direct Phone Line
                  </span>
                  <span className="text-base font-bold text-[#35204F] group-hover:text-[#5A2D91]">
                    75300 73785
                  </span>
                </div>
              </a>

              {/* WhatsApp Enquiry */}
              <a
                href="https://wa.me/917530073785?text=Hello%20GRAPHIX,%20I%20would%20like%20to%20enquire%20about%20your%20printing%20services."
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1] hover:border-[#25D366]/40 hover:bg-white transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#25D366]/10 text-[#25D366] shadow-sm group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#8A7E99] block font-semibold">
                    WhatsApp Consultation
                  </span>
                  <span className="text-base font-bold text-[#35204F] group-hover:text-[#25D366]">
                    +91 75300 73785
                  </span>
                </div>
              </a>

              {/* Verified Location */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF9FC] border border-[#EAE3F1]">
                <div className="p-3 rounded-xl bg-white border border-[#EAE3F1] text-[#5A2D91] shrink-0 mt-0.5 shadow-sm">
                  <MapPin className="w-5 h-5 text-[#5A2D91]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#8A7E99] block font-semibold">
                    Verified Studio Address
                  </span>
                  <p className="text-xs sm:text-sm text-[#35204F] font-semibold leading-relaxed">
                    Hameem Puram 7th Street, Annai Hajira College Road, Melapalayam, Tirunelveli, Tamil Nadu 627005
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-3 text-xs text-[#625B69] pt-2 border-t border-[#EAE3F1]">
                <Clock className="w-4 h-4 text-[#5A2D91]" />
                <span>Mon – Sat: 9:30 AM – 9:30 PM | Express deadlines accepted</span>
              </div>

            </div>

            {/* Google Maps Location */}
            <div className="rounded-3xl bg-white border border-[#EAE3F1] p-4 shadow-[0_8px_30px_rgba(53,32,79,0.06)] overflow-hidden">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-bold text-[#35204F] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#5A2D91]" />
                  <span>Melapalayam Studio Map</span>
                </span>
                <a
                  href="https://maps.google.com/?q=Melapalayam+Tirunelveli+Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#5A2D91] hover:text-[#8E63CB] font-bold underline"
                >
                  Get Directions
                </a>
              </div>

              <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-[#EAE3F1]">
                <iframe
                  title="Graphix Melapalayam Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.56784347715!2d77.7126131!3d8.697471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0411bcfdc92487%3A0xea21d283625345d1!2sMelapalayam%2C%20Tirunelveli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
