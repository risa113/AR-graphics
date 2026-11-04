import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { servicesData } from '../data/servicesData';
import { soundManager } from '../utils/sound';

export default function EnquiryModal({ isOpen, onClose, initialService, initialMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'flex-work',
    quantity: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        service: initialService.id || prev.service,
        message: prev.message || `I am looking for a quote regarding ${initialService.title}.`
      }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({
        ...prev,
        message: initialMessage
      }));
    }
  }, [initialMessage]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name.';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Valid 10-digit mobile number required.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 6) {
      errs.message = 'Please specify brief details.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();

    if (!validate()) return;

    setSubmitting(true);
    const newTicket = `GRX-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(newTicket);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#5A2D91', '#8E63CB', '#D8C2F0', '#FFFFFF']
      });
    }, 600);
  };

  const handleWhatsAppForward = () => {
    soundManager.playClick();
    const serviceObj = servicesData.find((s) => s.id === formData.service);
    const sName = serviceObj ? serviceObj.title : formData.service;
    const text = `*GRAPHIX CONSULTATION REQUEST*%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${sName}%0A*Specs:* ${formData.quantity || 'N/A'}%0A*Details:* ${formData.message}%0A*Ticket:* ${ticketId}`;
    window.open(`https://wa.me/917530073785?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#140625] border border-[#D8C2F0]/30 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#D8C2F0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#5A2D91] text-white flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_#8E63CB]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">
              Enquiry Submitted!
            </h3>
            <p className="text-xs text-[#D8C2F0]/80 mb-4">
              Ticket <strong className="text-white font-mono">{ticketId}</strong> generated for GRAPHIX Studio Melapalayam.
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleWhatsAppForward}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-xs font-bold text-white flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Forward to WhatsApp (+91 75300 73785)</span>
              </button>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="py-2.5 text-xs text-[#D8C2F0]/70 hover:text-white"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded bg-[#5A2D91] text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#D8C2F0]" />
              </span>
              <span className="text-[11px] uppercase tracking-widest font-mono text-[#D8C2F0]">
                Direct Project Consultation
              </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-1">
              Let's Create Together
            </h3>
            <p className="text-xs text-[#D8C2F0]/70 mb-5">
              Melapalayam, Tirunelveli • Design, Print & Branding
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#D8C2F0] block mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0a31] border border-[#D8C2F0]/20 text-xs text-white focus:outline-none focus:border-[#8E63CB]"
                />
                {errors.name && <span className="text-[10px] text-red-400 mt-0.5 block">{errors.name}</span>}
              </div>

              <div>
                <label className="text-xs font-semibold text-[#D8C2F0] block mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0a31] border border-[#D8C2F0]/20 text-xs text-white focus:outline-none focus:border-[#8E63CB]"
                />
                {errors.phone && <span className="text-[10px] text-red-400 mt-0.5 block">{errors.phone}</span>}
              </div>

              <div>
                <label className="text-xs font-semibold text-[#D8C2F0] block mb-1">
                  Service *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0a31] border border-[#D8C2F0]/20 text-xs text-white focus:outline-none focus:border-[#8E63CB]"
                >
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.id} className="bg-[#1b0a31]">
                      {s.number}. {s.title}
                    </option>
                  ))}
                  <option value="custom" className="bg-[#1b0a31]">Custom Complete Package</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#D8C2F0] block mb-1">
                  Estimated Quantity / Dimensions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10x4 ft banner, 1000 cards"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0a31] border border-[#D8C2F0]/20 text-xs text-white focus:outline-none focus:border-[#8E63CB]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#D8C2F0] block mb-1">
                  Project Details *
                </label>
                <textarea
                  rows="3"
                  placeholder="Share details of your required printing or graphic design..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0a31] border border-[#D8C2F0]/20 text-xs text-white focus:outline-none focus:border-[#8E63CB] resize-none"
                />
                {errors.message && <span className="text-[10px] text-red-400 mt-0.5 block">{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5A2D91] to-[#8E63CB] text-xs font-bold text-white shadow-lg flex items-center justify-center gap-2 hover:opacity-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting...' : 'Send Consultation Request'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
