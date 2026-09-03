import React, { useState } from 'react';
import { t } from '../translations';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQ_ITEMS, FAQ_ITEMS_EN } from '../data/farmData';

export const FaqAccordion = ({ lang = 'tr' }: { lang?: 'tr' | 'en' }) => {
  const l = t[lang].faq;
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'teslimat': return lang === 'en' ? 'Delivery & Logistics' : 'Teslimat & Lojistik';
      case 'siparis': return lang === 'en' ? 'Orders & Pricing' : 'Sipariş & Fiyatlandırma';
      case 'saglik': return lang === 'en' ? 'Health & Vet' : 'Aşı & Veteriner';
      case 'ciftlik': return lang === 'en' ? 'Farm & Visit' : 'Beslenme & Ziyaret';
      default: return lang === 'en' ? 'General' : 'Genel';
    }
  };

  return (
    <section id="sss" className="py-20 sm:py-28 bg-white border-t border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#123c28] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{l.pill}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            {l.title}
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            {l.desc}
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {(lang === 'en' ? FAQ_ITEMS_EN : FAQ_ITEMS).map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#123c28]/30 bg-stone-50/80 shadow-[0_4px_20px_-4px_rgba(18,60,40,0.06)]'
                    : 'border-stone-200/90 bg-white hover:border-stone-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-200/70 text-stone-700 w-fit">
                      {getCategoryBadge(item.category)}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#123c28] text-white rotate-180' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-stone-600 text-sm sm:text-base leading-relaxed border-t border-stone-200/60 pt-4 animate-in fade-in-50 duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Help Callout */}
        <div className="mt-10 p-6 rounded-3xl bg-stone-100/70 border border-stone-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-stone-800 text-sm font-medium">
            <HelpCircle className="w-5 h-5 text-[#123c28] shrink-0" />
            <span>{l.helpTitle}</span>
          </div>
          <a
            href="#iletisim"
            className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 text-xs sm:text-sm font-semibold shadow-xs transition-colors whitespace-nowrap"
          >{l.helpBtn}</a>
        </div>
      </div>
    </section>
  );
};
