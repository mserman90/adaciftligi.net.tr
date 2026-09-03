import React, { useState, useRef } from 'react';
import { HeartHandshake, ShieldCheck, Waves, Sun, Sparkles, MapPin, Camera, ZoomIn, X, Upload, RotateCcw, Check } from 'lucide-react';
import { FARM_CONTACT, FARM_GALLERY, FarmGalleryItem } from '../data/farmData';
import { useFarmImages } from '../context/ImageContext';

export const AboutSection: React.FC = () => {
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<FarmGalleryItem | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('Tümü');
  const { getImage, setImage, resetImage, isCustomImage } = useFarmImages();

  const [dragOverTank, setDragOverTank] = useState(false);
  const [dragOverVillage, setDragOverVillage] = useState(false);
  const [dragOverSheep, setDragOverSheep] = useState(false);
  const [dragOverGalleryId, setDragOverGalleryId] = useState<string | null>(null);

  const tankFileInputRef = useRef<HTMLInputElement>(null);
  const villageFileInputRef = useRef<HTMLInputElement>(null);
  const sheepFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const activeGalleryTargetRef = useRef<string | null>(null);

  const handleApplyVillageFile = (file: File) => {
    if (!file.type.startsWith('image/') && !file.name.endsWith('.jfif')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImage('about_village', result, 'Adasarhanlı Köyü Manzarası');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyTankFile = (file: File) => {
    if (!file.type.startsWith('image/') && !file.name.endsWith('.jfif')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImage('about_tank', result, '+4°C Süt Soğutma Tankı');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplySheepFile = (file: File) => {
    if (!file.type.startsWith('image/') && !file.name.endsWith('.jfif')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImage('about_sheep', result, 'Mera Kıvırcık Sürüsü');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyGalleryFile = (galleryId: string, title: string, file: File) => {
    if (!file.type.startsWith('image/') && !file.name.endsWith('.jfif')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImage(`gallery_${galleryId}`, result, title);
        if (selectedGalleryItem && selectedGalleryItem.id === galleryId) {
          setSelectedGalleryItem({ ...selectedGalleryItem, image: result });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const categories = ['Tümü', 'Mera & Otlak', 'Küçükbaş', 'Kuzu', 'Büyükbaş', 'Süt & Hijyen'];

  const filteredGallery = galleryFilter === 'Tümü'
    ? FARM_GALLERY
    : FARM_GALLERY.filter((item) => item.category === galleryFilter);

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
            2012 yılında Edirne’nin Meriç ilçesine bağlı Adasarhanlı Köyü’nde kurulan Ada Çiftliği;
            geleneksel mera hayvancılığı kültürünü, modern hijyen ve biyogüvenlik prensipleriyle
            harmanlayarak bölgenin öncü süt ve besi işletmelerinden biri haline gelmiştir.
          </p>
        </div>

        {/* Visual Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Photos Showcase */}
          <div className="lg:col-span-6 space-y-4">
            {/* Hidden Village File Input */}
            <input
              type="file"
              ref={villageFileInputRef}
              accept="image/*,.jfif"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleApplyVillageFile(e.target.files[0]);
                  e.target.value = '';
                }
              }}
            />

            {/* Main Adasarhanlı Köyü / Meriç / Edirne Landscape Showcase Card */}
            {(() => {
              const villageImg = getImage('about_village', '/images/drive/23911dbc-b407-46d5-95fb-656107f0c494.jfif');
              const isCustomVillage = isCustomImage('about_village');

              return (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverVillage(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setDragOverVillage(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverVillage(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleApplyVillageFile(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`group relative rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 aspect-[16/10] bg-stone-100 transition-all duration-300 ${
                    dragOverVillage ? 'ring-4 ring-emerald-500 ring-inset' : ''
                  }`}
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

                  {/* Drag drop overlay */}
                  {dragOverVillage && (
                    <div className="absolute inset-0 bg-emerald-950/85 flex flex-col items-center justify-center text-white z-20 p-4 text-center">
                      <Upload className="w-8 h-8 text-emerald-300 mb-1 animate-bounce" />
                      <p className="font-bold text-sm">Adasarhanlı Köyü Fotoğrafını Buraya Bırakın</p>
                    </div>
                  )}

                  {/* Upload / Reset Controls Top Right */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => villageFileInputRef.current?.click()}
                      title="Adasarhanlı Köyü fotoğrafını değiştir (veya resmi buraya sürükleyin)"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-900/85 hover:bg-stone-900 text-white text-xs font-medium backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer hover:border-emerald-400"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Fotoğraf Değiştir</span>
                    </button>

                    {isCustomVillage && (
                      <button
                        type="button"
                        onClick={() => resetImage('about_village', 'Adasarhanlı Köyü Manzarası')}
                        title="Varsayılan fotoğrafa dön"
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-stone-900/85 hover:bg-stone-900 text-stone-200 text-xs font-medium backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3 text-stone-300" />
                        <span className="hidden sm:inline text-[11px]">Sıfırla</span>
                      </button>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 mb-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Adasarhanlı Köyü / Meriç / Edirne</span>
                    </div>
                    <div className="text-sm sm:text-base font-medium text-stone-100">
                      Meriç nehri sulama kanallarıyla çevrili 140+ dönüm organik otlak
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Hidden Inputs for Tank and Sheep */}
            <input
              type="file"
              ref={tankFileInputRef}
              accept="image/*,.jfif"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleApplyTankFile(e.target.files[0]);
                  e.target.value = '';
                }
              }}
            />

            <input
              type="file"
              ref={sheepFileInputRef}
              accept="image/*,.jfif"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleApplySheepFile(e.target.files[0]);
                  e.target.value = '';
                }
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Milk Tank Photo Card with Drag & Drop & Upload */}
              {(() => {
                const tankImg = getImage('about_tank', '/images/drive/Gemini_Generated_Image_ln24chln24chln24.jfif');
                const isCustomTank = isCustomImage('about_tank');

                return (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverTank(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setDragOverTank(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverTank(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleApplyTankFile(e.dataTransfer.files[0]);
                      }
                    }}
                    className={`group relative rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3] bg-stone-100 transition-all duration-300 ${
                      dragOverTank ? 'ring-4 ring-emerald-500 ring-inset' : ''
                    }`}
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

                    {/* Drag drop overlay */}
                    {dragOverTank && (
                      <div className="absolute inset-0 bg-emerald-950/85 flex flex-col items-center justify-center text-white z-20 p-2 text-center">
                        <Upload className="w-6 h-6 text-emerald-300 mb-1 animate-bounce" />
                        <p className="font-bold text-[10px]">Süt Tankı Fotoğrafını Bırakın</p>
                      </div>
                    )}

                    {/* Upload / Reset Controls */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => tankFileInputRef.current?.click()}
                        title="Süt tankı fotoğrafını değiştir"
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-stone-900/85 hover:bg-stone-900 text-white text-[11px] font-medium backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer hover:border-emerald-400"
                      >
                        <Camera className="w-3 h-3 text-emerald-400" />
                        <span className="hidden sm:inline">Değiştir</span>
                      </button>

                      {isCustomTank && (
                        <button
                          type="button"
                          onClick={() => resetImage('about_tank', '+4°C Süt Tankı')}
                          title="Varsayılan fotoğrafa dön"
                          className="p-1.5 rounded-full bg-stone-900/85 hover:bg-stone-900 text-stone-200 text-xs backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3 text-stone-300" />
                        </button>
                      )}
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-semibold bg-stone-900/70 backdrop-blur-xs px-2 py-1 rounded-lg truncate pointer-events-none">
                      +4°C Hijyenik Süt Tankı
                    </div>
                  </div>
                );
              })()}

              {/* Mera Kıvırcık Sürüsü Card with Drag & Drop & Upload */}
              {(() => {
                const sheepImg = getImage('about_sheep', '/images/drive/Gemini_Generated_Image_p665hcp665hcp665.jfif');
                const isCustomSheep = isCustomImage('about_sheep');

                return (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverSheep(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setDragOverSheep(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverSheep(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleApplySheepFile(e.dataTransfer.files[0]);
                      }
                    }}
                    className={`group relative rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3] bg-stone-100 transition-all duration-300 ${
                      dragOverSheep ? 'ring-4 ring-emerald-500 ring-inset' : ''
                    }`}
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

                    {/* Drag drop overlay */}
                    {dragOverSheep && (
                      <div className="absolute inset-0 bg-emerald-950/85 flex flex-col items-center justify-center text-white z-20 p-2 text-center">
                        <Upload className="w-6 h-6 text-emerald-300 mb-1 animate-bounce" />
                        <p className="font-bold text-[10px]">Sürü Fotoğrafını Bırakın</p>
                      </div>
                    )}

                    {/* Upload / Reset Controls */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => sheepFileInputRef.current?.click()}
                        title="Mera sürüsü fotoğrafını değiştir"
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-stone-900/85 hover:bg-stone-900 text-white text-[11px] font-medium backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer hover:border-emerald-400"
                      >
                        <Camera className="w-3 h-3 text-emerald-400" />
                        <span className="hidden sm:inline">Değiştir</span>
                      </button>

                      {isCustomSheep && (
                        <button
                          type="button"
                          onClick={() => resetImage('about_sheep', 'Mera Kıvırcık Sürüsü')}
                          title="Varsayılan fotoğrafa dön"
                          className="p-1.5 rounded-full bg-stone-900/85 hover:bg-stone-900 text-stone-200 text-xs backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3 text-stone-300" />
                        </button>
                      )}
                    </div>

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
          {/* Hidden Gallery File Input */}
          <input
            type="file"
            ref={galleryFileInputRef}
            accept="image/*,.jfif"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0] && activeGalleryTargetRef.current) {
                const item = FARM_GALLERY.find((g) => g.id === activeGalleryTargetRef.current);
                handleApplyGalleryFile(activeGalleryTargetRef.current, item?.title || 'Galeri Fotoğrafı', e.target.files[0]);
                e.target.value = '';
              }
            }}
          />

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
              const isCustom = isCustomImage(imgKey);
              const isDraggedOver = dragOverGalleryId === item.id;

              return (
                <div
                  key={item.id}
                  id={`gallery-item-${item.id}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverGalleryId(item.id);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setDragOverGalleryId(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOverGalleryId(null);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleApplyGalleryFile(item.id, item.title, e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => setSelectedGalleryItem({ ...item, image: displayImage })}
                  className={`group relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 aspect-[16/11] cursor-pointer shadow-xs card-hover-lift transition-all duration-300 ${
                    isDraggedOver ? 'ring-4 ring-emerald-500 ring-inset' : ''
                  }`}
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

                  {/* Drag drop overlay */}
                  {isDraggedOver && (
                    <div className="absolute inset-0 bg-emerald-950/85 flex flex-col items-center justify-center text-white z-20 p-2 text-center pointer-events-none">
                      <Upload className="w-7 h-7 text-emerald-300 mb-1 animate-bounce" />
                      <p className="font-bold text-xs">Fotoğrafı Buraya Bırakın</p>
                    </div>
                  )}

                  {/* Category Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-stone-900 border border-stone-200/80 shadow-xs pointer-events-none">
                    {item.category}
                  </div>

                  {/* Action Controls on Top Right: Değiştir + Reset + Zoom */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        activeGalleryTargetRef.current = item.id;
                        galleryFileInputRef.current?.click();
                      }}
                      title={`${item.title} fotoğrafını değiştir`}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900/85 hover:bg-stone-900 text-white text-[11px] font-medium backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer hover:border-emerald-400"
                    >
                      <Camera className="w-3 h-3 text-emerald-400" />
                      <span className="hidden sm:inline">Değiştir</span>
                    </button>

                    {isCustom && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          resetImage(imgKey, item.title);
                        }}
                        title="Varsayılan fotoğrafa dön"
                        className="p-1.5 rounded-full bg-stone-900/85 hover:bg-stone-900 text-stone-200 text-xs backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3 text-stone-300" />
                      </button>
                    )}

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
          const isCustomModalImg = isCustomImage(modalImgKey);

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
                      onClick={() => {
                        activeGalleryTargetRef.current = selectedGalleryItem.id;
                        galleryFileInputRef.current?.click();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-medium backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Fotoğrafı Değiştir</span>
                    </button>

                    {isCustomModalImg && (
                      <button
                        type="button"
                        onClick={() => resetImage(modalImgKey, selectedGalleryItem.title)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-stone-200 text-xs font-medium backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3 text-stone-300" />
                        <span>Sıfırla</span>
                      </button>
                    )}

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
