import React, { useState } from 'react';
import { ArrowUpRight, Check, Sparkles, Filter } from 'lucide-react';
import { FARM_PRODUCTS } from '../data/farmData';
import { FarmProduct } from '../types';

interface ProductGridProps {
  onSelectProduct: (productName: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'kucukbas' | 'buyukbas' | 'sut'>('all');

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
    <section id="urunler" className="py-20 sm:py-28 bg-stone-50/60 border-t border-stone-200/80">
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
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="group bg-white rounded-3xl border border-stone-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col card-hover-lift"
            >
              {/* Image Container with Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={`${product.title} - Ada Çiftliği Meriç`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/hero_cows.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-60" />

                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-900 border border-stone-200/80 shadow-xs">
                  {product.categoryLabel}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium bg-stone-900/70 backdrop-blur-md px-3 py-1.5 rounded-xl truncate">
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
                    className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-[#123c28] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full transition-colors shrink-0 active:scale-95"
                  >
                    <span>Bilgi / Teklif</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
