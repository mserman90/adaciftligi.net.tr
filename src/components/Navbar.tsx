import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, ArrowRight, AlertTriangle } from 'lucide-react';
import { FARM_CONTACT } from '../data/farmData';
import { FarmWeatherBanner } from './FarmWeatherBanner';

interface NavbarProps {
  lang?: 'tr' | 'en';
  setLang?: (l: 'tr' | 'en') => void;
  onOpenInquiry: (productName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, lang = 'tr', setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const navLinks = lang === 'en' ? [
    { label: 'Products', href: '#urunler' },
    { label: 'Our Farm', href: '#ciftlik-hakkinda' },
    { label: 'Process', href: '#uretim-sureci' },
    { label: 'Reviews', href: '#yorumlar' },
    { label: 'FAQ', href: '#sss' },
    { label: 'Contact', href: '#iletisim' },
  ] : [
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
        <FarmWeatherBanner onOpenInquiry={onOpenInquiry} compact={isScrolled} lang={lang} />

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
            aria-label={lang === 'en' ? 'Ada Farm Home' : 'Ada Çiftliği Ana Sayfa'}
          >
            <div className="w-10 h-10 rounded-full bg-[#123c28] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
              <span className="tracking-tight">A</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-stone-900 group-hover:text-[#123c28] transition-colors leading-none">
                  {lang === 'en' ? 'Ada Farm' : 'Ada Çiftliği'}
                </span>

                {/* Dikkati çeken ve uygun büyüklükte Test Yayını Uyarısı */}
                <div
                  id="navbar-test-mode-notice"
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-md bg-amber-100/90 border border-amber-300 text-amber-950 shadow-xs"
                  title={
                    lang === 'en'
                      ? 'This website is in test broadcast; contents and data may not reflect actual conditions.'
                      : 'Bu web sitesi test yayınındadır; içerikler, veriler ve bilgiler gerçek durumu yansıtmayabilir.'
                  }
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold text-amber-900 tracking-tight">
                    {lang === 'en' ? 'TEST BROADCAST:' : 'TEST YAYINI:'}
                  </span>
                  <span className="hidden sm:inline text-[11px] sm:text-xs text-amber-850 font-semibold">
                    {lang === 'en'
                      ? 'Contents may not reflect actual conditions'
                      : 'İçerikler gerçek durumu yansıtmayabilir'}
                  </span>
                  <span className="sm:hidden text-[10px] text-amber-850 font-semibold">
                    {lang === 'en' ? 'Demo' : 'Gerçeği yansıtmayabilir'}
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-medium text-stone-500 uppercase tracking-widest mt-1">
                {lang === 'en' ? 'Meric · Edirne' : 'Meriç · Edirne'}
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

          
          {/* Language Toggle */}
          <div className="hidden sm:flex items-center">
          {setLang && (
            <button
              onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-stone-200 hover:bg-stone-100 text-xs font-bold text-stone-600 transition-all cursor-pointer mr-2"
              title={lang === 'en' ? 'Türkçe versiyona geç' : 'Switch to English version'}
            >
              {lang === 'tr' ? 'TR' : 'EN'}
            </button>
          )}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${FARM_CONTACT.phoneRaw}`}
              id="navbar-call-btn"
              className="inline-flex items-center gap-2 text-stone-700 hover:text-[#123c28] text-sm font-medium px-3.5 py-2 rounded-full hover:bg-stone-100 transition-colors"
              title={lang === 'en' ? 'Call Farm Directly' : 'Doğrudan Çiftliği Arayın'}
            >
              <Phone className="w-4 h-4 text-[#123c28]" />
              <span className="hidden xl:inline">{FARM_CONTACT.phone}</span>
              <span className="xl:hidden">{lang === 'en' ? 'Call' : 'Ara'}</span>
            </a>

            <button
              type="button"
              id="navbar-inquiry-btn"
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-2 bg-[#123c28] hover:bg-[#0c291c] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <span>{lang === 'en' ? 'Order & Info' : 'Sipariş & Bilgi'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex sm:hidden items-center gap-2">
            {setLang && (
              <button
                onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-stone-200 hover:bg-stone-100 text-xs font-bold text-stone-700 transition-all cursor-pointer"
                title={lang === 'en' ? 'Türkçe' : 'English'}
              >
                {lang === 'tr' ? 'TR' : 'EN'}
              </button>
            )}
            <a
              href={FARM_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={lang === 'en' ? 'Chat on WhatsApp' : "WhatsApp'tan Yazın"}
              className="w-9 h-9 rounded-full bg-emerald-50 text-[#123c28] flex items-center justify-center border border-emerald-200"
            >
              <MessageCircle className="w-4.5 h-4.5" />
            </a>
            <button
              type="button"
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-stone-700 hover:bg-stone-100 focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? (lang === 'en' ? 'Close menu' : 'Menüyü kapat') : (lang === 'en' ? 'Open menu' : 'Menüyü aç')}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#123c28] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    A
                  </div>
                  <span className="font-bold text-stone-900 text-lg">
                    {lang === 'en' ? 'Ada Farm' : 'Ada Çiftliği'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 font-bold text-[10px] uppercase">
                    <AlertTriangle className="w-3 h-3 text-amber-700" />
                    {lang === 'en' ? 'Test Mode' : 'Test Yayını'}
                  </span>
                </div>
                <div className="text-[11px] text-amber-900 bg-amber-50/80 px-2 py-1 rounded border border-amber-200 mt-1">
                  ⚠️ {lang === 'en' ? 'Contents and data may not reflect actual conditions.' : 'İçerikler ve veriler gerçek durumu yansıtmayabilir.'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 cursor-pointer shrink-0 ml-2"
                aria-label={lang === 'en' ? 'Close' : 'Kapat'}
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
                className="w-full bg-[#123c28] text-white py-3 rounded-full font-semibold text-center flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>{lang === 'en' ? 'Price & Order Inquiry' : 'Fiyat & Sipariş Talebi'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${FARM_CONTACT.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full border border-stone-200 text-stone-800 font-medium text-sm"
                >
                  <Phone className="w-4 h-4 text-[#123c28]" />
                  <span>{lang === 'en' ? 'Phone' : 'Telefon'}</span>
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
