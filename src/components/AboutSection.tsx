import React from 'react';
import { HeartHandshake, ShieldCheck, Waves, Sun, Sparkles, MapPin } from 'lucide-react';
import { FARM_CONTACT } from '../data/farmData';

export const AboutSection: React.FC = () => {
  const values = [
    {
      icon: Waves,
      title: 'Meriç Alüvyon Havzası',
      description: 'Edirne Meriç nehri kıyısındaki Adasarhanlı Köyü’nün mineralce zengin toprağında yetişen doğal yabani otlar, kekik ve taze yonca ile besleme sağlanır.'
    },
    {
      icon: HeartHandshake,
      title: 'Ödünsüz Hayvan Refahı',
      description: 'Stres faktörlerinin en aza indirildiği geniş havalandırmalı açık padoklar, bol gün ışığı ve serbest gezinme imkanıyla hayvanlarımız sağlıklı büyür.'
    },
    {
      icon: ShieldCheck,
      title: 'Sürekli Veteriner & Biyogüvenlik',
      description: 'Tüm sürümüz düzenli kan tahlilleri, parazit mücadeleleri, TÜRKVET resmi küpeleme ve eksiksiz aşı takvimi ile denetim altında tutulur.'
    },
    {
      icon: Sun,
      title: 'GDO ve Hormonsuz Doğallık',
      description: 'Hızlı kilo aldırma amaçlı suni büyüme hormonları veya sentetik premiksler kullanılmaz; geleneksel Trakya besiciliği modern teknolojiyle buluşturulur.'
    }
  ];

  return (
    <section id="ciftlik-hakkinda" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Tag & Title */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#123c28] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ada Çiftliği Hakkında</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Trakya’nın Kalbinde, Doğaya ve Hayvana Saygılı Üretim
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            2012 yılında Edirne’nin Meriç ilçesine bağlı Adasarhanlı Köyü’nde kurulan Ada Çiftliği;
            geleneksel mera hayvancılığı kültürünü, modern hijyen ve biyogüvenlik prensipleriyle
            harmanlayarak bölgenin öncü süt ve besi işletmelerinden biri haline gelmiştir.
          </p>
        </div>

        {/* Visual Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Photos Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=1200&auto=format&fit=crop"
                alt="Meriç Edirne Adasarhanlı Çiftlik Manzarası"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Adasarhanlı Köyü / Meriç / Edirne</span>
                </div>
                <div className="text-sm font-medium text-stone-100">
                  Meriç nehri sulama kanallarıyla çevrili 140+ dönüm organik otlak
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?q=80&w=600&auto=format&fit=crop"
                  alt="Hijyenik süt sağım ve soğutma tankı ünitesi"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=600&auto=format&fit=crop"
                  alt="Doğal mera besisi inek ve düveler"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val, idx) => {
              const IconComponent = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-stone-50 border border-stone-200/80 shadow-xs hover:border-stone-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200/90 flex items-center justify-center text-[#123c28] shadow-xs mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operational Credibility Banner */}
        <div className="bg-[#123c28]/5 border border-[#123c28]/15 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#123c28] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-stone-900">
                Resmi Kayıtlı & Denetlenen Çiftlik İşletmesi
              </h4>
              <p className="text-xs sm:text-sm text-stone-600">
                T.C. Tarım ve Orman Bakanlığı İlçe Müdürlüğü nezdinde onaylı küpeleme, aşılama ve sevk izinleri.
              </p>
            </div>
          </div>

          <a
            href={`tel:${FARM_CONTACT.phoneRaw}`}
            className="whitespace-nowrap px-6 py-3 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-[#123c28] text-sm font-semibold shadow-xs transition-colors"
          >
            Çiftlik Ziyareti İçin Randevu Al
          </a>
        </div>
      </div>
    </section>
  );
};
