import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Check, Sparkles, Camera, Upload, RotateCcw } from 'lucide-react';
import { FARM_PRODUCTS } from '../data/farmData';

interface ProductGridProps {
  onSelectProduct: (productName: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'kucukbas' | 'buyukbas' | 'sut'>('all');
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('adaciftligi_product_images');
        return saved ? JSON.parse(saved) : {};
      } catch (e) {
        return {};
      }
    }
    return {};
  });
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeProductTargetRef = useRef<string | null>(null);

  // Check if user placed the specific generated images in public/images
  useEffect(() => {
    if (!customImages['koyun']) {
      const testImg = new Image();
      testImg.src = '/images/Gemini_Generated_Image_p665hcp665hcp665.jfif';
      testImg.onload = () => {
        setCustomImages((prev) => ({
          ...prev,
          koyun: '/images/Gemini_Generated_Image_p665hcp665hcp665.jfif',
        }));
      };
    }
    if (!customImages['sut']) {
      const testTankImg = new Image();
      testTankImg.src = '/images/Gemini_Generated_Image_ln24chln24chln24.jfif';
      testTankImg.onload = () => {
        setCustomImages((prev) => ({
          ...prev,
          sut: '/images/Gemini_Generated_Image_ln24chln24chln24.jfif',
        }));
      };
    }
  }, [customImages]);

  const handleApplyImage = (productId: string, dataUrlOrPath: string) => {
    setCustomImages((prev) => {
      const updated = { ...prev, [productId]: dataUrlOrPath };
      try {
        localStorage.setItem('adaciftligi_product_images', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage limit reached', err);
      }
      return updated;
    });
    setToastMessage(`"${productId === 'koyun' ? 'Damızlık & Kesimlik Koyun' : productId}" fotoğrafı güncellendi!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleResetImage = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomImages((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      try {
        localStorage.setItem('adaciftligi_product_images', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage error', err);
      }
      return updated;
    });
  };

  const handleFileChange = (productId: string, file: File) => {
    if (!file.type.startsWith('image/') && !file.name.endsWith('.jfif')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        handleApplyImage(productId, result);
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredProducts = activeTab === 'all'
    ? FARM_PRODUCTS
    : FARM_PRODUCTS.filter((p) => p.category === activeTab);

  const tabs = [
    { id: 'all', label: 'Tüm Ürünlerimiz' },
    { id: 'kucukbas', label: 'Koyun & Kuzu' },
    { id: 'buyukbas', label: 'İnek & Dana' },
    { id: 'sut', label: 'Günlük Taze Süt' },
  ];

  return (
    <section id="urunler" className="py-20 sm:py-28 bg-stone-50/60 border-t border-stone-200/80 relative">
      {/* Hidden Global Product Image File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,.jfif"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0] && activeProductTargetRef.current) {
            handleFileChange(activeProductTargetRef.current, e.target.files[0]);
          }
        }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#123c28] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center gap-2.5 text-sm font-medium animate-fade-in">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#123c28] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ürün ve Hizmetlerimiz</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Sağlıklı Yetiştiricilik, Katkısız ve Doğal Üretim
            </h2>
            <p className="mt-3 text-stone-600 text-base sm:text-lg leading-relaxed">
              Koyun, kuzu, inek ve dana varlığımızla hem toptan hem perakende ihtiyaçlarınıza
              doğrudan çiftlikten çözüm sunuyoruz.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-stone-200/60 p-1.5 rounded-full border border-stone-300/60">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#123c28] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const currentImg = customImages[product.id] || product.image;
            const isCustom = Boolean(customImages[product.id]);
            const isDraggedOver = draggedCardId === product.id;

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group bg-white rounded-3xl border border-stone-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col card-hover-lift"
              >
                {/* Image Container with Drag & Drop */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDraggedCardId(product.id);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setDraggedCardId(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDraggedCardId(null);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileChange(product.id, e.dataTransfer.files[0]);
                    }
                  }}
                  className={`relative aspect-[16/10] overflow-hidden bg-stone-100 transition-all duration-300 ${
                    isDraggedOver ? 'ring-4 ring-emerald-500 ring-inset' : ''
                  }`}
                >
                  <img
                    src={currentImg}
                    alt={`${product.title} - Ada Çiftliği Meriç`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero_cows.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent opacity-70 pointer-events-none" />

                  {/* Drag drop overlay */}
                  {isDraggedOver && (
                    <div className="absolute inset-0 bg-emerald-950/85 flex flex-col items-center justify-center text-white z-20 p-4 text-center">
                      <Upload className="w-8 h-8 text-emerald-300 mb-1 animate-bounce" />
                      <p className="font-bold text-xs">Fotoğrafı Buraya Bırakın</p>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-900 border border-stone-200/80 shadow-xs z-10">
                    {product.categoryLabel}
                  </div>

                  {/* Photo Change Controls on Top Right */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => {
                        activeProductTargetRef.current = product.id;
                        fileInputRef.current?.click();
                      }}
                      title={`${product.title} fotoğrafını değiştir (veya resmi üzerine sürükleyip bırakın)`}
                      className="p-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-medium backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-300" />
                    </button>

                    {isCustom && (
                      <button
                        type="button"
                        onClick={(e) => handleResetImage(product.id, e)}
                        title="Varsayılan fotoğrafa dön"
                        className="p-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-stone-200 text-xs font-medium backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-stone-300" />
                      </button>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium bg-stone-900/75 backdrop-blur-md px-3 py-1.5 rounded-xl truncate pointer-events-none">
                    {product.tag}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-[#123c28] transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-stone-600 text-sm leading-relaxed mb-5">
                      {product.description}
                    </p>

                    {/* Metadata Row */}
                    <div className="bg-stone-50 rounded-2xl p-3.5 mb-5 border border-stone-200/70 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500 font-medium">Irk / Köken:</span>
                        <span className="text-stone-900 font-semibold text-right">{product.breed}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500 font-medium">Beslenme:</span>
                        <span className="text-stone-900 font-semibold text-right">{product.feeding}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500 font-medium">Teslimat:</span>
                        <span className="text-stone-900 font-semibold text-right">{product.deliveryType}</span>
                      </div>
                    </div>

                    {/* Highlights Bullet List */}
                    <div className="space-y-1.5 mb-6">
                      {product.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                          <Check className="w-4 h-4 text-[#123c28] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action of Card */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div className="text-[11px] font-medium text-stone-500 leading-tight">
                      {product.pricingNote}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct(product.title)}
                      className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-[#123c28] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full transition-colors shrink-0 active:scale-95 cursor-pointer"
                    >
                      <span>Bilgi / Teklif</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

