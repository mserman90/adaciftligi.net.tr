import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, ArrowRight, AlertTriangle, Sun, Moon, Sparkles } from 'lucide-react';
import { FARM_CONTACT } from '../data/farmData';
import { FarmWeatherBanner } from './FarmWeatherBanner';
import { AdaOfficialHeaderLogo } from './AdaLogo';

interface NavbarProps {
  lang?: 'tr' | 'en';
  setLang?: (l: 'tr' | 'en') => void;
  onOpenInquiry: (productName?: string) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onOpenBrandModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  lang = 'tr',
  setLang,
  isDarkMode = false,
  onToggleDarkMode,
  onOpenBrandModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

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
        {/* Top Warning Announcement Ticker - Continuous Infinite Marquee */}
        <div
          id="top-test-ticker"
          className="bg-amber-400 text-amber-950 border-b border-amber-500/70 py-1.5 overflow-hidden select-none relative z-50 shadow-xs"
          role="status"
          aria-live="polite"
        >
          <style>{`
            @keyframes continuousTickerScroll {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-100%, 0, 0);
              }
            }
            .top-ticker-track {
              display: flex !important;
              flex-shrink: 0 !important;
              align-items: center !important;
              white-space: nowrap !important;
              animation: continuousTickerScroll 34s linear infinite !important;
              will-change: transform;
            }
          `}</style>

          <div className="flex items-center w-full">
            {/* Left pinned notice tag */}
            <div className="flex items-center gap-1.5 bg-amber-600 text-white text-[10.5px] font-black uppercase px-2.5 py-0.5 tracking-wider shrink-0 z-20 shadow-xs border-r border-amber-700/40 ml-2 rounded">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
              <span>{lang === 'en' ? 'TEST' : 'TEST UYARISI'}</span>
            </div>

            {/* Seamless Continuous Scrolling Dual Tracks */}
            <div className="overflow-hidden flex-1 relative flex select-none">
              {/* Track 1 */}
              <div className="top-ticker-track text-amber-950 text-[11.5px] sm:text-xs tracking-wide">
                <span className="inline-flex items-center gap-2 px-4 sm:px-6">
                  <AlertTriangle className="w-4 h-4 text-amber-950 shrink-0" />
                  <span className="uppercase font-black text-amber-950 tracking-wider">
                    {lang === 'en' ? 'TEST BROADCAST:' : 'TEST YAYINI:'}
                  </span>
                  <span className="font-extrabold text-amber-950 underline decoration-amber-700 underline-offset-2">
                    {lang === 'en'
                      ? 'Contents may not reflect actual conditions'
                      : 'İçerikler gerçek durumu yansıtmayabilir'}
                  </span>
                </span>

                <span className="text-amber-800/70 font-bold select-none">✦</span>

                <span className="inline-flex items-center gap-2 px-4 sm:px-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                  <span className="uppercase font-bold text-amber-900 tracking-tight">
                    {lang === 'en' ? 'DEVELOPMENT NOTICE:' : 'GELİŞTİRME AŞAMASI:'}
                  </span>
                  <span className="font-semibold text-amber-900">
                    {lang === 'en'
                      ? 'Ada Farm web portal is currently undergoing testing and verification'
                      : 'Ada Çiftliği web portalı ve yönetim modülleri test aşamasındadır'}
                  </span>
                </span>

                <span className="text-amber-800/70 font-bold select-none">✦</span>

                <span className="inline-flex items-center gap-2 px-4 sm:px-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                  <span className="uppercase font-bold text-amber-900 tracking-tight">
                    {lang === 'en' ? 'DEMO DATA:' : 'TEMSİLİ BİLGİ:'}
                  </span>
                  <span className="font-semibold text-amber-900">
                    {lang === 'en'
                      ? 'Orders, product pricing and live figures are for demonstration purposes only'
                      : 'Fiyatlar, sürü verileri ve canlı göstergeler demonstrasyon amaçlıdır'}
                  </span>
                </span>

                <span className="text-amber-800/70 font-bold select-none">✦</span>

                <span className="inline-flex items-center gap-2 px-4 sm:px-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                  <span className="font-semibold text-amber-900">
                    {lang === 'en'
                      ? 'Test broadcast records do not constitute a binding commercial commitment'
                      : 'Test yayını sürecindeki veriler bağlayıcı ticari teklif veya taahhüt içermez'}
                  </span>
                </span>

                <span className="text-amber-800/70 font-bold select-none">✦</span>
              </div>

              {/* Track 2 (Identical clone for seamless continuous infinite loop) */}
              <div className="top-ticker-track text-amber-950 text-[11.5px] sm:text-xs tracking-wide" aria-hidden="true">
                <span className="inline-flex items-center gap-2 px-4 sm:px-6">
                  <AlertTriangle className="w-4 h-4 text-amber-950 shrink-0" />
                  <span className="uppercase font-black text-amber-950 tracking-wider">
                    {lang === 'en' ? 'TEST BROADCAST:' : 'TEST YAYINI:'}
                  </span>
                  <span className="font-extrabold text-amber-950 underline decoration-amber-700 underline-offset-2">
                    {lang === 'en'
                      ? 'Contents may not reflect actual conditions'
                      : 'İçerikler gerçek durumu yansıtmayabilir'}
                  </span>
                </span>

                <span className="text-amber-800/70 font-bold select-none">✦</span>

                <span className="inline-flex items-center gap-2 px-4 sm:px-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                  <span className="uppercase font-bold text-amber-900 tracking-tight">
                    {lang === 'en' ? 'DEVELOPMENT NOTICE:' : 'GELİŞTİRME AŞAMASI:'}
                  </span>
                  <span className="font-semibold text-amber-900">
                    {lang === 'en'
                      ? 'Ada Farm web portal is currently undergoing testing and verification'
                      : 'Ada Çiftliği web portalı ve yönetim modülleri test aşamasındadır'}
                  </span>
                </span>

                <span className="text-amber-800/70 font-bold select-none">✦</span>

                <span className="inline-flex items-center gap-2 px-4 sm:px-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                  <span className="uppercase font-bold text-amber-900 tracking-tight">
                    {lang === 'en' ? 'DEMO DATA:' : 'TEMSİLİ BİLGİ:'}
                  </span>
                  <span className="font-semibold text-amber-900">
                    {lang === 'en'
                      ? 'Orders, product pricing and live figures are for demonstration purposes only'
                      : 'Fiyatlar, sürü verileri ve canlı göstergeler demonstrasyon amaçlıdır'}
                  </span>
                </span>

                <span className="text-amber-800/70 font-bold select-none">✦</span>

                <span className="inline-flex items-center gap-2 px-4 sm:px-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                  <span className="font-semibold text-amber-900">
                    {lang === 'en'
                      ? 'Test broadcast records do not constitute a binding commercial commitment'
                      : 'Test yayını sürecindeki veriler bağlayıcı ticari teklif veya taahhüt içermez'}
                  </span>
                </span>

                <span className="text-amber-800/70 font-bold select-none">✦</span>
              </div>
            </div>
          </div>
        </div>

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
            {/* Prominent Official Brand Logo & Lockup (Matching Official Medallion) */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <a
                href="#"
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-xl inline-flex items-center shrink-0 dark:bg-white/95 dark:px-2.5 dark:py-1 dark:shadow-2xs transition-all"
                aria-label={lang === 'en' ? 'Ada Farm Home' : 'Ada Çiftliği Ana Sayfa'}
              >
                {!logoError ? (
                  <img
                    src="/logo.png"
                    alt={lang === 'en' ? 'Ada Farm - Meric, Edirne' : 'Ada Çiftliği - Meriç, Edirne'}
                    width={680}
                    height={200}
                    className={`transition-all duration-300 select-none object-contain shrink-0 block ${
                      isScrolled
                        ? 'h-[42px] sm:h-[48px] lg:h-[54px]'
                        : 'h-[50px] sm:h-[58px] lg:h-[66px]'
                    } w-auto max-w-[240px] sm:max-w-[290px] lg:max-w-[340px]`}
                    referrerPolicy="no-referrer"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <AdaOfficialHeaderLogo
                    markSize={isScrolled ? 48 : 58}
                    isCompact={isScrolled}
                    lang={lang}
                    animated={true}
                  />
                )}
              </a>

              {/* Dikkati çeken Test Yayını Rozeti */}
              <div
                id="navbar-test-mode-notice"
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-200 shadow-2xs"
                title={
                  lang === 'en'
                    ? 'This website is in test broadcast; contents and data may not reflect actual conditions.'
                    : 'Bu web sitesi test yayınındadır; içerikler, veriler ve bilgiler gerçek durumu yansıtmayabilir.'
                }
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-900 dark:text-amber-200 tracking-tight">
                  {lang === 'en' ? 'TEST BROADCAST' : 'TEST YAYINI'}
                </span>
              </div>
            </div>

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

          
          {/* Theme & Language Toggles */}
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            {onToggleDarkMode && (
              <button
                type="button"
                id="navbar-theme-toggle"
                onClick={onToggleDarkMode}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-all cursor-pointer shadow-2xs"
                title={
                  isDarkMode
                    ? (lang === 'en' ? 'Switch to Light Mode [Alt+D]' : 'Aydınlık Moda Geç [Alt+D]')
                    : (lang === 'en' ? 'Switch to Dark Mode (Eye Comfort) [Alt+D]' : 'Koyu Moda Geç (Göz Dinlendirme) [Alt+D]')
                }
                aria-label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-stone-700" />
                )}
              </button>
            )}

            {onOpenBrandModal && (
              <button
                type="button"
                id="navbar-brand-btn"
                onClick={onOpenBrandModal}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 transition-all cursor-pointer shadow-2xs"
                title={lang === 'en' ? 'Ada Farm Logo & Visual Brand Architecture' : 'Ada Çiftliği Logo & Kurumsal Kimlik Mimarisi'}
                aria-label="Logo & Kurumsal Kimlik"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}

            {setLang && (
              <button
                onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-bold text-stone-600 dark:text-stone-200 transition-all cursor-pointer"
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
            {onToggleDarkMode && (
              <button
                type="button"
                id="mobile-navbar-theme-toggle"
                onClick={onToggleDarkMode}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-all cursor-pointer"
                title={isDarkMode ? (lang === 'en' ? 'Light Mode' : 'Aydınlık Mod') : (lang === 'en' ? 'Dark Mode' : 'Koyu Mod')}
                aria-label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-stone-700" />
                )}
              </button>
            )}

            {setLang && (
              <button
                onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-bold text-stone-700 dark:text-stone-200 transition-all cursor-pointer"
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
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center dark:bg-white/95 dark:px-2.5 dark:py-1 dark:rounded-xl dark:shadow-2xs shrink-0 transition-all">
                  {!logoError ? (
                    <img
                      src="/logo.png"
                      alt="Ada Çiftliği"
                      width={680}
                      height={200}
                      className="h-12 w-auto max-w-[240px] object-contain select-none shrink-0 block"
                      referrerPolicy="no-referrer"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <AdaOfficialHeaderLogo
                      markSize={46}
                      isCompact={true}
                      lang={lang}
                      animated={false}
                    />
                  )}
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-900 font-bold text-[10.5px]">
                  <AlertTriangle className="w-3 h-3 text-amber-700 shrink-0" />
                  <span>{lang === 'en' ? 'Test Mode Notice' : 'Test Yayını Bildirimi'}</span>
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

            {/* Mobile Drawer Brand Architecture Action */}
            {onOpenBrandModal && (
              <button
                type="button"
                id="drawer-brand-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBrandModal();
                }}
                className="w-full mb-3 py-2.5 px-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-xs font-bold text-emerald-900 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>{lang === 'en' ? 'Logo & Brand Identity System' : 'Logo & Kurumsal Kimlik Sistemi'}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </button>
            )}

            {/* Mobile Drawer Theme Mode Switch */}
            {onToggleDarkMode && (
              <div className="mb-4 py-2.5 px-4 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-200">
                  {isDarkMode ? <Moon className="w-4 h-4 text-emerald-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  <span>{lang === 'en' ? 'Appearance' : 'Görünüm Modu'}</span>
                </div>
                <button
                  type="button"
                  id="drawer-theme-toggle"
                  onClick={onToggleDarkMode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-800 dark:text-stone-200 shadow-2xs transition-all cursor-pointer"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>{lang === 'en' ? 'Dark Mode' : 'Koyu Mod'}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-stone-600" />
                      <span>{lang === 'en' ? 'Light Mode' : 'Aydınlık Mod'}</span>
                    </>
                  )}
                </button>
              </div>
            )}

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
