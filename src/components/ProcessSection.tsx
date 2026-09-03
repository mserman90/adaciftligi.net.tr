import React from 'react';
import { Sprout, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';
import { PRODUCTION_STEPS } from '../data/farmData';

export const ProcessSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sprout':
        return Sprout;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Truck':
        return Truck;
      default:
        return Sprout;
    }
  };

  return (
    <section id="uretim-sureci" className="py-20 sm:py-28 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#123c28] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nasıl Çalışıyoruz?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Tarladan Sofraya 3 Aşamalı Üretim Disiplini
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Doğallıktan ve hijyen kurallarından taviz vermeden; her aşaması kayıtlı,
            izlenebilir ve şeffaf bir hayvancılık modeli uyguluyoruz.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {PRODUCTION_STEPS.map((step, index) => {
            const IconComponent = getIcon(step.iconName);
            return (
              <div
                key={step.stepNumber}
                id={`process-step-${index + 1}`}
                className="group relative bg-stone-50 rounded-3xl overflow-hidden border border-stone-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between card-hover-lift"
              >
                {/* Step Image with Overlay & Badge */}
                {step.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                    <img
                      src={step.image}
                      alt={step.imageAlt || step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/hero_cows.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />

                    {/* Step number on top left */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-[#123c28] shadow-xs border border-stone-200/60">
                      Adım {step.stepNumber}
                    </div>

                    {/* Floating Icon on bottom right of image */}
                    <div className="absolute bottom-3.5 right-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-sm border border-stone-200 shadow-md flex items-center justify-center text-[#123c28]">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Subtitle tag on bottom left */}
                    <div className="absolute bottom-3.5 left-4 text-xs font-semibold text-emerald-300 drop-shadow-xs max-w-[200px] truncate">
                      {step.subtitle}
                    </div>
                  </div>
                )}

                {/* Card Content Body */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {!step.image && (
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 shadow-xs flex items-center justify-center text-[#123c28]">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black text-stone-300">
                          {step.stepNumber}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-stone-900 mb-3 leading-snug group-hover:text-[#123c28] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-sm text-stone-600 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Details list */}
                  <div className="pt-4 border-t border-stone-200/70 space-y-2.5">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#123c28] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
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
