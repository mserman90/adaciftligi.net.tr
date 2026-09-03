/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { AboutSection } from './components/AboutSection';
import { ConversionBanner } from './components/ConversionBanner';
import { ProcessSection } from './components/ProcessSection';
import { Testimonials } from './components/Testimonials';
import { FaqAccordion } from './components/FaqAccordion';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { QuickCallFloat } from './components/QuickCallFloat';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();

  const handleOpenInquiry = (productName?: string) => {
    setSelectedProduct(productName || 'Günlük Taze Çiğ Süt');
    setModalOpen(true);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // ScrollTrigger reveal for sections
    const sections = ['#urunler', '#ciftlik-hakkinda', '#talep-bandi', '#uretim-sureci', '#yorumlar', '#sss', '#iletisim'];
    
    sections.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0.88, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-[#123c28] selection:text-white">
      {/* Sticky Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenInquiry={() => handleOpenInquiry()} />

        {/* 2. Products / Services Grid */}
        <ProductGrid onSelectProduct={handleOpenInquiry} />

        {/* 3. About Farm & Meriç Edirne Section */}
        <AboutSection />

        {/* 4. Full-width Dark Green Conversion Banner */}
        <ConversionBanner onOpenInquiry={() => handleOpenInquiry()} />

        {/* 5. Production Process 3 Steps */}
        <ProcessSection />

        {/* 6. Customer & Partner Reviews */}
        <Testimonials />

        {/* 7. FAQ Accordion */}
        <FaqAccordion />

        {/* 8. Contact & Map Location Section */}
        <ContactSection />
      </main>

      {/* 9. Multi-column Footer with Legal Row */}
      <Footer />

      {/* Direct WhatsApp / Phone Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialProduct={selectedProduct}
      />

      {/* Quick Floating WhatsApp & Call Buttons */}
      <QuickCallFloat />
    </div>
  );
}
