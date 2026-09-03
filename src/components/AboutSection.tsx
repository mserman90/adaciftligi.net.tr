import { t } from '../translations';
import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, Waves, Sun, Sparkles, MapPin, ZoomIn, X, Camera } from 'lucide-react';
import { FARM_CONTACT, FARM_GALLERY, FarmGalleryItem } from '../data/farmData';
import { useFarmImages } from '../context/ImageContext';

export const AboutSection: React.FC<{ lang?: 'tr' | 'en' }> = ({ lang = 'tr' }) => {
  const l = t[lang].about;
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<FarmGalleryItem | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('Tümü');
  const { getImage } = useFarmImages();

  const categories = ['Tümü', 'Mera & Otlak', 'Küçükbaş', 'Kuzu', 'Büyükbaş', 'Süt & Hijyen'];

  const filteredGallery = galleryFilter === 'Tümü'
    ? FARM_GALLERY
    : FARM_GALLERY.filter((item) => item.category === galleryFilter);

  const values = [
    {
      icon: Waves,
      title: lang === 'en' ? 'Meric Alluvial Basin' : 'Meriç Alüvyon Havzası',
      description: lang === 'en' ? 'Feeding is provided with natural weeds, thyme and fresh alfalfa grown in the mineral-rich soil of Adasarhanli Village on the banks of the Edirne Meric river.' : 'Edirne Meriç nehri kıyısındaki Adasarhanlı Köyü’nün mineralce zengin toprağında yetişen doğal yabani otlar, kekik ve taze yonca ile besleme sağlanır.'
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
    <section id="ciftlik-hakkinda" className="py-20 sm:py-28 bg-white overflow-hidden relative">
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
            {lang === 'en' ? 'Founded in 2012 in Adasarhanli Village, Meric district of Edirne, Ada Farm;' : '2012 yılında Edirne’nin Meriç ilçesine bağlı Adasarhanlı Köyü’nde kurulan Ada Çiftliği;'}
            geleneksel mera hayvancılığı kültürünü, modern hijyen ve biyogüvenlik prensipleriyle
            harmanlayarak bölgenin öncü süt ve besi işletmelerinden biri haline gelmiştir.
          </p>
        </div>

        {/* Visual Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Photos Showcase */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main {lang === 'en' ? 'Adasarhanli Village / Meric / Edirne' : 'Adasarhanlı Köyü / Meriç / Edirne'} Landscape Showcase Card */}
            {(() => {
              const villageImg = getImage('about_village', '/images/drive/23911dbc-b407-46d5-95fb-656107f0c494.jfif');

              return (
                <div
                  className="group relative rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 aspect-[16/10] bg-stone-100 transition-all duration-300"
                >
                  <img
                    src={villageImg}
                    alt="Meriç Edirne Adasarhanlı Çiftlik Manzarası"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/farm_landscape.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 mb-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Adasarhanlı Köyü / Meriç / Edirne</span>
                    </div>
                    <div className="text-sm sm:text-base font-medium text-stone-100">
                      {lang === 'en' ? '140+ acres of organic pasture surrounded by Meric river irrigation canals' : 'Meriç nehri sulama kanallarıyla çevrili 140+ dönüm organik otlak'}
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="grid grid-cols-2 gap-4">
              {/* Milk Tank Photo Card */}
              {(() => {
                const tankImg = getImage('about_tank', '/images/drive/Gemini_Generated_Image_ln24chln24chln24.jfif');

                return (
                  <div
                    className="group relative rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3] bg-stone-100 transition-all duration-300"
                  >
                    <img
                      src={tankImg}
                      alt="Hijyenik süt sağım ve soğutma tankı ünitesi - Ada Çiftliği Meriç"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/sut.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-stone-950/25 group-hover:bg-transparent transition-colors pointer-events-none" />

                    <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-semibold bg-stone-900/70 backdrop-blur-xs px-2 py-1 rounded-lg truncate pointer-events-none">
                      +4°C Hijyenik Süt Tankı
                    </div>
                  </div>
                );
              })()}

              {/* Mera Kıvırcık Sürüsü Card */}
              {(() => {
                const sheepImg = getImage('about_sheep', '/images/drive/Gemini_Generated_Image_p665hcp665hcp665.jfif');

                return (
                  <div
                    className="group relative rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3] bg-stone-100 transition-all duration-300"
                  >
                    <img
                      src={sheepImg}
                      alt="Kıvırcık koyun ve serbest mera sürüsü"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/kuzu.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-stone-950/25 group-hover:bg-transparent transition-colors pointer-events-none" />

                    <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-semibold bg-stone-900/70 backdrop-blur-xs px-2 py-1 rounded-lg truncate pointer-events-none">
                      Mera Kıvırcık Sürüsü
                    </div>
                  </div>
                );
              })()}
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

        {/* Çiftliğimizden Gerçek Kareler / Photo Gallery Section */}
        <div className="pt-12 border-t border-stone-200/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#123c28] mb-1.5">
                <Camera className="w-3.5 h-3.5" />
                <span>Fotoğraf Galerisi</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Ada Çiftliği Tesis ve Faaliyetlerimiz
              </h3>
              <p className="text-stone-600 text-sm mt-1">
                Adasarhanlı Köyü’ndeki açık padoklarımız, meralarımız ve soğuk zincir süt altyapımızdan anlık kareler.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    galleryFilter === cat
                      ? 'bg-[#123c28] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery 6-Grid with Topic Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => {
              const imgKey = `gallery_${item.id}`;
              const fallback = item.id === 'g1'
                ? getImage('about_village', item.image)
                : item.id === 'g5'
                ? getImage('about_tank', item.image)
                : item.image;
              const displayImage = getImage(imgKey, fallback);

              return (
                <div
                  key={item.id}
                  id={`gallery-item-${item.id}`}
                  onClick={() => setSelectedGalleryItem({ ...item, image: displayImage })}
                  className="group relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 aspect-[16/11] cursor-pointer shadow-xs card-hover-lift transition-all duration-300"
                >
                  <img
                    src={displayImage}
                    alt={`${item.title} - Ada Çiftliği`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero_cows.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none" />

                  {/* Category Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-stone-900 border border-stone-200/80 shadow-xs pointer-events-none">
                    {item.category}
                  </div>

                  {/* Zoom Icon on Top Right */}
                  <div className="absolute top-2.5 right-2.5 flex items-center z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="w-7 h-7 rounded-full bg-stone-900/60 backdrop-blur-xs text-white flex items-center justify-center">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                    <h4 className="font-bold text-sm leading-tight text-white mb-1 drop-shadow-xs">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-200 line-clamp-2 leading-relaxed opacity-90">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Image Zoom Lightbox Modal */}
        {selectedGalleryItem && (() => {
          const modalImgKey = `gallery_${selectedGalleryItem.id}`;
          const currentModalImg = getImage(modalImgKey, selectedGalleryItem.image);

          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
              onClick={() => setSelectedGalleryItem(null)}
            >
              <div
                className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[16/10] bg-stone-950">
                  <img
                    src={currentModalImg}
                    alt={selectedGalleryItem.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedGalleryItem(null)}
                      className="w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                      aria-label="Kapat"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      {selectedGalleryItem.category}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-0.5">
                      {selectedGalleryItem.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-400 mt-1">
                      {selectedGalleryItem.description}
                    </p>
                  </div>
                  <a
                    href={`tel:${FARM_CONTACT.phoneRaw}`}
                    className="px-5 py-2.5 rounded-full bg-[#123c28] hover:bg-[#1a5338] text-white text-xs font-semibold whitespace-nowrap text-center transition-colors"
                  >
                    Tesis Ziyareti Planla
                  </a>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
