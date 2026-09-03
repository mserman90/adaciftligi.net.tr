import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';
import { FARM_CONTACT } from '../data/farmData';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
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
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Ada Çiftliği
                </span>
                <span className="text-[11px] font-medium text-stone-400 uppercase tracking-widest">
                  Meriç · Edirne
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Meriç nehrinin verimli alüvyon havzası Adasarhanlı Köyü’nde; doğal meralarda
              sağlıklı koyun, kuzu, inek, dana yetiştiriciliği ve günlük soğuk zincir taze çiftlik sütü üretimi.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800/80 border border-stone-700 text-xs text-stone-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>T.C. Tarım ve Orman Bakanlığı Kayıtlı İşletme</span>
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Ürün & Hizmetlerimiz
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a href="#urunler" className="hover:text-white transition-colors">
                  Damızlık & Kesimlik Koyun
                </a>
              </li>
              <li>
                <a href="#urunler" className="hover:text-white transition-colors">
                  Trakya Süt & Besi Kuzusu
                </a>
              </li>
              <li>
                <a href="#urunler" className="hover:text-white transition-colors">
                  Yüksek Verimli Süt İnekleri
                </a>
              </li>
              <li>
                <a href="#urunler" className="hover:text-white transition-colors">
                  Besi Danası & Kurbanlık Tartım
                </a>
              </li>
              <li>
                <a href="#urunler" className="hover:text-white transition-colors">
                  Günlük Soğuk Zincir Çiğ Süt
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Fast links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a href="#ciftlik-hakkinda" className="hover:text-white transition-colors">
                  Çiftlik Hakkında
                </a>
              </li>
              <li>
                <a href="#uretim-sureci" className="hover:text-white transition-colors">
                  3 Aşamalı Süreç
                </a>
              </li>
              <li>
                <a href="#yorumlar" className="hover:text-white transition-colors">
                  Müşteri Yorumları
                </a>
              </li>
              <li>
                <a href="#sss" className="hover:text-white transition-colors">
                  Sıkça Sorulanlar
                </a>
              </li>
              <li>
                <a href="#iletisim" className="hover:text-white transition-colors">
                  Konum ve İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Çiftlik İletişim
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Adasarhanlı Köyü, Meriç / Edirne</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${FARM_CONTACT.phoneRaw}`} className="hover:text-white">
                  {FARM_CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={FARM_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp: {FARM_CONTACT.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${FARM_CONTACT.email}`} className="hover:text-white">
                  {FARM_CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Ada Çiftliği (adaciftligi.net.tr) — Tüm Hakları Saklıdır. Meriç / Edirne.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-stone-400">
              5996 Sayılı Veteriner Hizmetleri, Bitki Sağlığı, Gıda ve Yem Kanununa Uygun Üretim
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Yukarı çık"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sitenin En Dibi: Yönetici Girişi & Rasyon Portalı */}
        {onOpenAdmin && (
          <div className="mt-8 pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70"></span>
              <span>Ada Çiftliği Veterinerlik ve Zootekni Karar Destek Platformu</span>
            </div>
            <button
              type="button"
              id="footer-bottom-admin-btn"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-emerald-400 border border-stone-800 hover:border-emerald-800/60 transition-all cursor-pointer font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Yönetici Girişi</span>
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};
