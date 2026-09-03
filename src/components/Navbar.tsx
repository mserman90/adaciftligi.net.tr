import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { FARM_CONTACT } from '../data/farmData';
import { FarmWeatherBanner } from './FarmWeatherBanner';

interface NavbarProps {
  onOpenInquiry: (productName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ürünlerimiz', href: '#urunler' },
    { label: 'Çiftliğimiz', href: '#ciftlik-hakkinda' },
    { label: 'Üretim Süreci', href: '#uretim-sureci' },
    { label: 'Yorumlar', href: '#yorumlar' },
    { label: 'SSS', href: '#sss' },
    { label: 'İletişim', href: '#iletisim' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      >
        {/* Automated Live Weather & Pasture Status Banner */}
        <FarmWeatherBanner onOpenInquiry={onOpenInquiry} compact={isScrolled} />

        {/* Main Navbar Bar */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border-b border-stone-200/80 py-2.5 sm:py-3'
              : 'bg-white/95 backdrop-blur-sm border-b border-stone-100 py-3 sm:py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Ada Çiftliği Ana Sayfa"
          >
            <div className="w-10 h-10 rounded-full bg-[#123c28] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform duration-200">
              <span className="tracking-tight">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-stone-900 group-hover:text-[#123c28] transition-colors leading-none">
                Ada Çiftliği
              </span>
              <span className="text-[11px] font-medium text-stone-500 uppercase tracking-widest mt-0.5">
                Meriç · Edirne
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-stone-600 hover:text-[#123c28] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#123c28] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${FARM_CONTACT.phoneRaw}`}
              id="navbar-call-btn"
              className="inline-flex items-center gap-2 text-stone-700 hover:text-[#123c28] text-sm font-medium px-3.5 py-2 rounded-full hover:bg-stone-100 transition-colors"
              title="Doğrudan Çiftliği Arayın"
            >
              <Phone className="w-4 h-4 text-[#123c28]" />
              <span className="hidden xl:inline">{FARM_CONTACT.phone}</span>
              <span className="xl:hidden">Ara</span>
            </a>

            <button
              type="button"
              id="navbar-inquiry-btn"
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-2 bg-[#123c28] hover:bg-[#0c291c] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-98"
            >
              <span>Sipariş & Bilgi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={FARM_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp'tan Yazın"
              className="w-10 h-10 rounded-full bg-emerald-50 text-[#123c28] flex items-center justify-center border border-emerald-200"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              type="button"
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm sm:hidden flex flex-col justify-end"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white rounded-t-3xl p-6 shadow-2xl border-t border-stone-200 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#123c28] flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <span className="font-bold text-stone-900 text-lg">Ada Çiftliği</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-stone-800 font-medium text-base hover:bg-stone-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full bg-[#123c28] text-white py-3 rounded-full font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Fiyat & Sipariş Talebi</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${FARM_CONTACT.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full border border-stone-200 text-stone-800 font-medium text-sm"
                >
                  <Phone className="w-4 h-4 text-[#123c28]" />
                  <span>Telefon</span>
                </a>
                <a
                  href={FARM_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-emerald-50 border border-emerald-200 text-[#123c28] font-medium text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
