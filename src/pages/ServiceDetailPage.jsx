import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Layers,
  Printer,
  Palette,
  ChevronDown,
  ExternalLink,
  Tag
} from 'lucide-react';
import { seoServicesData } from '../data/seoServicesData';
import { soundManager } from '../utils/sound';

export default function ServiceDetailPage({ onOpenEnquiry }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Find corresponding service
  const service = seoServicesData.find((s) => s.slug === slug);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, [slug]);

  // Update document title and meta tags dynamically for SEO
  useEffect(() => {
    if (service) {
      document.title = service.metaTitle;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', service.metaDescription);

      // Canonical link update
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://risa113.github.io/AR-graphics/${service.slug}`);
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#FAF9FC] flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#F3ECFA] flex items-center justify-center text-[#5A2D91] mb-4">
          <Palette className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-[#35204F] mb-3">Service Page Not Found</h1>
        <p className="text-[#625B69] max-w-md mb-8">
          The requested graphic design or printing service page does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5A2D91] text-white font-bold text-sm hover:bg-[#6c36ac] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to GRAPHIX Home</span>
        </Link>
      </div>
    );
  }

  // Related services
  const relatedServices = seoServicesData
    .filter((s) => s.slug !== service.slug)
    .slice(0, 4);

  // Build JSON-LD structured data for this service + FAQPage + Breadcrumbs
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': service.breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': b.name,
          'item': b.url.startsWith('/') ? `https://risa113.github.io/AR-graphics${b.url}` : b.url
        }))
      },
      {
        '@type': 'Service',
        'name': service.title,
        'description': service.metaDescription,
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'GRAPHIX',
          'telephone': '+917530073785',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Hameem Puram 7th Street, Annai Hajira College Road',
            'addressLocality': 'Melapalayam, Tirunelveli',
            'addressRegion': 'Tamil Nadu',
            'postalCode': '627005',
            'addressCountry': 'IN'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 8.697471,
            'longitude': 77.712613
          }
        },
        'areaServed': service.localAreas.map(area => ({
          '@type': 'AdministrativeArea',
          'name': `${area}, Tirunelveli, Tamil Nadu`
        })),
        'offers': {
          '@type': 'Offer',
          'price': service.pricingStarting.replace(/[^0-9]/g, ''),
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/InStock'
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': service.faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.a
          }
        }))
      }
    ]
  };

  const whatsappMessage = encodeURIComponent(
    `Hello GRAPHIX! I am enquiring about ${service.title} in Tirunelveli (Hameem Puram studio). Can you provide details and quotation?`
  );

  return (
    <article className="min-h-screen bg-[#FAF9FC] text-[#35204F] pt-24 pb-20 selection:bg-[#D8C2F0] selection:text-[#35204F]">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Top Banner Navigation / Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-[#EAE3F1]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#8A7E99]">
            <Link to="/" className="hover:text-[#5A2D91] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>GRAPHIX Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#5A2D91]">{service.title}</span>
          </nav>

          <div className="flex items-center gap-2 text-xs font-bold text-[#5A2D91] bg-white px-3 py-1 rounded-full border border-[#EAE3F1] shadow-xs">
            <MapPin className="w-3 h-3 text-[#8E63CB]" />
            <span>Serving Melapalayam & Tirunelveli</span>
          </div>
        </div>
      </div>

      {/* Service Header / Hero Block */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#EAE3F1] shadow-[0_10px_30px_rgba(53,32,79,0.04)] relative overflow-hidden">
          {/* Ambient Purple Soft Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F3ECFA] to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            {/* Service Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECFA] border border-[#D8C2F0]/50 text-[#5A2D91] text-xs font-extrabold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#8E63CB]" />
              <span>{service.badge}</span>
            </div>

            {/* Oversized Dynamic SEO H1 */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#35204F] leading-[1.12] tracking-tight mb-6">
              {service.h1}
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-xl font-bold text-[#5A2D91] mb-6 leading-relaxed">
              {service.tagline}
            </p>

            {/* Hero Introduction */}
            <p className="text-sm sm:text-base text-[#625B69] leading-relaxed max-w-3xl mb-8">
              {service.heroIntro}
            </p>

            {/* Quick Specs / Turnaround / Price Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#EAE3F1] mb-8">
              <div className="p-3 bg-[#FAF9FC] rounded-xl border border-[#EAE3F1]/80">
                <span className="text-[10px] uppercase font-bold text-[#8A7E99] block mb-1">Starting From</span>
                <span className="text-lg font-black text-[#5A2D91]">{service.pricingStarting}</span>
              </div>
              <div className="p-3 bg-[#FAF9FC] rounded-xl border border-[#EAE3F1]/80">
                <span className="text-[10px] uppercase font-bold text-[#8A7E99] block mb-1">Turnaround</span>
                <span className="text-sm font-black text-[#35204F] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8E63CB]" />
                  {service.turnaround}
                </span>
              </div>
              <div className="p-3 bg-[#FAF9FC] rounded-xl border border-[#EAE3F1]/80">
                <span className="text-[10px] uppercase font-bold text-[#8A7E99] block mb-1">Studio Location</span>
                <span className="text-xs font-bold text-[#35204F] truncate block">Melapalayam 7th St</span>
              </div>
              <div className="p-3 bg-[#FAF9FC] rounded-xl border border-[#EAE3F1]/80">
                <span className="text-[10px] uppercase font-bold text-[#8A7E99] block mb-1">Delivery</span>
                <span className="text-xs font-bold text-[#35204F]">Same-Day & Express</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/917530073785?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Quote on WhatsApp (+91 75300 73785)</span>
              </a>

              <a
                href="tel:+917530073785"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#EAE3F1] text-[#35204F] font-bold text-xs sm:text-sm hover:border-[#D8C2F0] hover:bg-[#FAF9FC] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#5A2D91]" />
                <span>Call Studio</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        
        {/* Left 8 Cols: Deep Editorial Breakdown & Local Craftsmanship */}
        <section className="lg:col-span-8 space-y-10">
          
          {/* Detailed Editorial Sections */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE3F1] shadow-[0_4px_20px_rgba(53,32,79,0.03)] space-y-8">
            {service.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#35204F] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#8E63CB]" />
                  {sec.heading}
                </h2>
                <p className="text-sm sm:text-base text-[#625B69] leading-relaxed">
                  {sec.content}
                </p>
              </section>
            ))}
          </div>

          {/* Substrate & Technical Specs */}
          {service.specs && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE3F1] shadow-[0_4px_20px_rgba(53,32,79,0.03)]">
              <h3 className="text-lg sm:text-xl font-black text-[#35204F] mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#5A2D91]" />
                <span>Material & Technical Specifications</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(service.specs).map(([key, value]) => (
                  <div key={key} className="p-3.5 rounded-xl bg-[#FAF9FC] border border-[#EAE3F1]/80">
                    <span className="text-[11px] font-bold text-[#8A7E99] uppercase tracking-wider block mb-1">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-sm font-black text-[#35204F]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Advantages / Features */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE3F1] shadow-[0_4px_20px_rgba(53,32,79,0.03)]">
            <h3 className="text-lg sm:text-xl font-black text-[#35204F] mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#5A2D91]" />
              <span>GRAPHIX Quality Guarantees</span>
            </h3>
            <ul className="grid grid-cols-1 gap-3.5">
              {service.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#35204F] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#8E63CB] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Frequently Asked Questions (Structured for Google FAQ Rich Snippets) */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE3F1] shadow-[0_4px_20px_rgba(53,32,79,0.03)]">
            <div className="mb-6">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#5A2D91] block mb-1">
                Frequently Asked Questions
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#35204F]">
                Everything You Need to Know About {service.title}
              </h2>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen ? 'border-[#8E63CB]/50 bg-[#FAF9FC]' : 'border-[#EAE3F1] bg-white'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#35204F] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#5A2D91] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#625B69] leading-relaxed border-t border-[#EAE3F1]/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </section>

        {/* Right 4 Cols: Sticky Studio NAP, Local Service Map & Deliverables */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Deliverables Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#EAE3F1] shadow-[0_4px_20px_rgba(53,32,79,0.03)]">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#35204F] mb-4 flex items-center gap-2">
              <Printer className="w-4 h-4 text-[#5A2D91]" />
              <span>Included Deliverables</span>
            </h4>
            <div className="space-y-2.5">
              {service.deliverables.map((del, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-[#625B69] p-2 rounded-lg bg-[#FAF9FC]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5A2D91]" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Local Service Area Coverage Badge Cloud */}
          <div className="bg-white rounded-3xl p-6 border border-[#EAE3F1] shadow-[0_4px_20px_rgba(53,32,79,0.03)]">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#35204F] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8E63CB]" />
              <span>Direct Pickup & Delivery Areas</span>
            </h4>
            <p className="text-xs text-[#8A7E99] mb-4">
              Daily delivery and on-site fitting available across:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {service.localAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#F3ECFA] text-[#5A2D91] text-[11px] font-bold border border-[#D8C2F0]/40"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Local Studio Verified NAP Card */}
          <div className="bg-gradient-to-br from-[#35204F] to-[#5A2D91] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                <span>Verified Local Business</span>
              </div>
              <h4 className="text-lg font-black leading-snug">
                GRAPHIX Design & Print Studio
              </h4>
              <p className="text-xs text-[#D8C2F0] leading-relaxed">
                Hameem Puram 7th Street, Annai Hajira College Road, Melapalayam, Tirunelveli, Tamil Nadu 627005.
              </p>
              
              <div className="pt-2 border-t border-white/15 space-y-2">
                <a
                  href="tel:+917530073785"
                  className="flex items-center gap-2.5 text-xs font-bold text-white hover:text-[#D8C2F0] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D8C2F0]" />
                  <span>+91 75300 73785</span>
                </a>
                <div className="flex items-center gap-2.5 text-xs text-white/80">
                  <Clock className="w-3.5 h-3.5 text-[#D8C2F0]" />
                  <span>Mon – Sat: 9:30 AM – 9:30 PM</span>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=8.697471,77.712613"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-[#35204F] font-bold text-xs hover:bg-[#FAF9FC] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#5A2D91]" />
                <span>Open Google Maps Directions</span>
              </a>
            </div>
          </div>

          {/* Targeted Keyword Cloud (Local SEO boost) */}
          <div className="bg-white rounded-3xl p-6 border border-[#EAE3F1] shadow-[0_4px_20px_rgba(53,32,79,0.03)]">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#8A7E99] mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#5A2D91]" />
              <span>Search Relevance</span>
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-[#625B69]">
              {service.targetKeywords.map((kw, idx) => (
                <span key={idx} className="bg-[#FAF9FC] px-2 py-0.5 rounded border border-[#EAE3F1]">
                  {kw}
                </span>
              ))}
            </div>
          </div>

        </aside>

      </main>

      {/* Related Services Internal Linking Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#EAE3F1] pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#5A2D91] block mb-1">
              Explore More Print & Design Solutions
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#35204F]">
              Specialized Services in Tirunelveli
            </h3>
          </div>
          <Link
            to="/#services"
            className="text-xs font-bold text-[#5A2D91] hover:text-[#8E63CB] transition-colors flex items-center gap-1"
          >
            <span>View All 11 Capabilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedServices.map((rel) => (
            <Link
              key={rel.slug}
              to={`/${rel.slug}`}
              className="group p-5 rounded-2xl bg-white border border-[#EAE3F1] hover:border-[#8E63CB] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8E63CB] block mb-2">
                  {rel.badge}
                </span>
                <h4 className="font-bold text-sm text-[#35204F] group-hover:text-[#5A2D91] transition-colors mb-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#625B69] line-clamp-2 leading-relaxed">
                  {rel.metaDescription}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#EAE3F1]/70 flex items-center justify-between text-xs font-bold text-[#5A2D91]">
                <span>Explore Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </article>
  );
}
