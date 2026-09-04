/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ImageProvider } from './context/ImageContext';
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
import { AdminLoginModal } from './components/AdminLoginModal';
import { RasyonApp } from './rasyon/RasyonApp';
import { getAdminSession, clearAdminSession } from './utils/adminAuth';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentView, setCurrentView] = useState<'website' | 'rasyon'>('website');
  const [mainLang, setMainLang] = useState<'tr' | 'en'>('tr');
  const [adminAuth, setAdminAuth] = useState(() => getAdminSession());
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();

  // Dark mode state: default is explicitly LIGHT ("açık") mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ada_theme');
      if (saved !== null) {
        return saved === 'dark';
      }
      // Varsayılan tema açık moddur
      return false;
    } catch {
      return false;
    }
  });

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('ada_theme', 'dark');
        localStorage.setItem('ada_rasyon_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('ada_theme', 'light');
        localStorage.setItem('ada_rasyon_theme', 'light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [isDarkMode]);

  // Global Alt+D shortcut listener for theme toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        handleToggleDarkMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenInquiry = (productName?: string) => {
    setSelectedProduct(productName || 'Günlük Taze Çiğ Süt');
    setModalOpen(true);
  };

  const handleOpenAdmin = () => {
    const session = getAdminSession();
    if (session.isAuthenticated) {
      setAdminAuth(session);
      setCurrentView('rasyon');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setAdminLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = (username: string) => {
    setAdminAuth({ isAuthenticated: true, username });
    setCurrentView('rasyon');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    clearAdminSession();
    setAdminAuth({ isAuthenticated: false, username: '' });
    setCurrentView('website');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to hash changes e.g. #rasyon or #yonetim
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#rasyon' || hash === '#yonetim' || hash === '#yonetici') {
        const session = getAdminSession();
        if (session.isAuthenticated) {
          setAdminAuth(session);
          setCurrentView('rasyon');
        } else {
          setAdminLoginModalOpen(true);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    if (currentView !== 'website') return;

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
  }, [currentView]);

  // If in Rasyon Management Platform view
  if (currentView === 'rasyon') {
    return (
      <ImageProvider>
        <div className={`min-h-screen ${isDarkMode ? 'bg-[#0E130F]' : 'bg-[#F6F4EC]'}`}>
          <RasyonApp
            onBackToWebsite={() => {
              setCurrentView('website');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLogout={handleLogout}
            adminUsername={adminAuth.username || 'admin'}
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
        </div>
      </ImageProvider>
    );
  }

  // Public Farm Website view
  return (
    <ImageProvider>
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#0c140e] text-[#e2ece5]' : 'bg-white text-stone-900'} flex flex-col font-sans selection:bg-[#123c28] selection:text-white transition-colors duration-200`}>
        {/* Sticky Navigation */}
        <Navbar
          onOpenInquiry={handleOpenInquiry}
          lang={mainLang}
          setLang={setMainLang}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero onOpenInquiry={() => handleOpenInquiry()} lang={mainLang} />

          {/* 2. Products / Services Grid */}
          <ProductGrid onSelectProduct={handleOpenInquiry} lang={mainLang} />

          {/* 3. About Farm & Meriç Edirne Section */}
          <AboutSection lang={mainLang} />

          {/* 4. Full-width Dark Green Conversion Banner */}
          <ConversionBanner onOpenInquiry={() => handleOpenInquiry()} lang={mainLang} />

          {/* 5. Production Process 3 Steps */}
          <ProcessSection lang={mainLang} />

          {/* 6. Customer & Partner Reviews */}
          <Testimonials lang={mainLang} />

          {/* 7. FAQ Accordion */}
          <FaqAccordion lang={mainLang} />

          {/* 8. Contact & Map Location Section */}
          <ContactSection lang={mainLang} />
        </main>

        {/* 9. Multi-column Footer with Legal Row */}
        <Footer
          onOpenAdmin={handleOpenAdmin}
          lang={mainLang}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />

        {/* Direct WhatsApp / Phone Inquiry Modal */}
        <InquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialProduct={selectedProduct}
          lang={mainLang}
        />

        {/* Admin Login Modal */}
        <AdminLoginModal
          isOpen={adminLoginModalOpen}
          onClose={() => setAdminLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          lang={mainLang}
        />

        {/* Quick Floating WhatsApp & Call Buttons */}
        <QuickCallFloat lang={mainLang} />
      </div>
    </ImageProvider>
  );
}
