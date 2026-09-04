import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, ArrowUp, AlertTriangle, Sun, Moon } from 'lucide-react';
import { FARM_CONTACT, FARM_CONTACT_EN } from '../data/farmData';

interface FooterProps {
  onOpenAdmin?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Footer: React.FC<FooterProps & { lang?: 'tr' | 'en' }> = ({
  onOpenAdmin,
  lang = 'tr',
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const contactData = lang === 'en' ? FARM_CONTACT_EN : FARM_CONTACT;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-stone-800">
          {/* Col 1: Brand Wordmark & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#123c28] border border-emerald-600/60 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl text-white tracking-tight">
                    {lang === 'en' ? 'Ada Farm' : 'Ada Çiftliği'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[10px] uppercase">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    {lang === 'en' ? 'Test Mode' : 'Test Yayını'}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-stone-400 uppercase tracking-widest">
                  {lang === 'en' ? 'Meric · Edirne' : 'Meriç · Edirne'}
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {lang === 'en'
                ? 'In Adasarhanli Village, the fertile alluvial basin of the Meric river; raising healthy sheep, lambs, cows, and beef cattle in natural pastures, with daily cold-chain fresh farm milk production.'
                : 'Meriç nehrinin verimli alüvyon havzası Adasarhanlı Köyü’nde; doğal meralarda sağlıklı koyun, kuzu, inek, dana yetiştiriciliği ve günlük soğuk zincir taze çiftlik sütü üretimi.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800/80 border border-stone-700 text-xs text-stone-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                {lang === 'en'
                  ? 'Ministry of Agriculture & Forestry Registered Enterprise'
                  : 'T.C. Tarım ve Orman Bakanlığı Kayıtlı İşletme'}
              </span>
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Products & Services' : 'Ürün & Hizmetlerimiz'}
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a href="#urunler" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Breeding & Slaughter Sheep' : 'Damızlık & Kesimlik Koyun'}
                </a>
              </li>
              <li>
                <a href="#urunler" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Thrace Milk & Feeder Lamb' : 'Trakya Süt & Besi Kuzusu'}
                </a>
              </li>
              <li>
                <a href="#urunler" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'High-Yield Dairy Cows' : 'Yüksek Verimli Süt İnekleri'}
                </a>
              </li>
              <li>
                <a href="#urunler" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Beef Cattle & Sacrifice Weighing' : 'Besi Danası & Kurbanlık Tartım'}
                </a>
              </li>
              <li>
                <a href="#urunler" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Daily Cold-Chain Raw Milk' : 'Günlük Soğuk Zincir Çiğ Süt'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Fast links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Quick Navigation' : 'Hızlı Erişim'}
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a href="#ciftlik-hakkinda" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'About Farm' : 'Çiftlik Hakkında'}
                </a>
              </li>
              <li>
                <a href="#uretim-sureci" className="hover:text-white transition-colors">
                  {lang === 'en' ? '3-Stage Process' : '3 Aşamalı Süreç'}
                </a>
              </li>
              <li>
                <a href="#yorumlar" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Customer Reviews' : 'Müşteri Yorumları'}
                </a>
              </li>
              <li>
                <a href="#sss" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Frequently Asked' : 'Sıkça Sorulanlar'}
                </a>
              </li>
              <li>
                <a href="#iletisim" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Location & Contact' : 'Konum ve İletişim'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Farm Contact' : 'Çiftlik İletişim'}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{contactData.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${contactData.phoneRaw}`} className="hover:text-white">
                  {contactData.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={contactData.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp: {contactData.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${contactData.email}`} className="hover:text-white">
                  {contactData.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} {lang === 'en' ? 'Ada Farm — All Rights Reserved. Meric / Edirne.' : 'Ada Çiftliği — Tüm Hakları Saklıdır. Meriç / Edirne.'}
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-stone-400 hidden lg:inline">
              {lang === 'en'
                ? 'Compliant with Veterinary Services, Plant Health, Food and Feed Law No. 5996'
                : '5996 Sayılı Veteriner Hizmetleri, Bitki Sağlığı, Gıda ve Yem Kanununa Uygun Üretim'}
            </span>

            {/* Quick theme toggle in footer */}
            {onToggleDarkMode && (
              <button
                type="button"
                id="footer-theme-toggle"
                onClick={onToggleDarkMode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer text-xs font-medium border border-stone-700"
                title={
                  isDarkMode
                    ? (lang === 'en' ? 'Switch to Light Mode [Alt+D]' : 'Aydınlık Moda Geç [Alt+D]')
                    : (lang === 'en' ? 'Switch to Dark Mode (Eye Comfort) [Alt+D]' : 'Koyu Moda Geç (Göz Dinlendirme) [Alt+D]')
                }
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-stone-300" />}
                <span>{isDarkMode ? (lang === 'en' ? 'Light Mode' : 'Aydınlık Mod') : (lang === 'en' ? 'Dark Mode' : 'Koyu Mod')}</span>
              </button>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label={lang === 'en' ? 'Scroll to top' : 'Yukarı çık'}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sitenin En Dibi: Yönetici Girişi & Rasyon Portalı */}
        {onOpenAdmin && (
          <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 pb-24 md:pb-4 pr-0 md:pr-32">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <button
                type="button"
                id="footer-bottom-admin-btn"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-emerald-400 border border-stone-700 hover:border-emerald-700/60 transition-all cursor-pointer font-medium shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'en' ? 'Admin Portal' : 'Yönetici Girişi'}</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70"></span>
                <span className="text-center md:text-left">
                  {lang === 'en' ? 'Ada Farm Zootechnical Decision Support Platform' : 'Ada Çiftliği Zooteknik Karar Destek Platformu'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
