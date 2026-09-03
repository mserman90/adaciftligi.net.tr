import React from 'react';
import { t } from '../translations';
import { Star, Sparkles, Quote } from 'lucide-react';
import { TESTIMONIALS, TESTIMONIALS_EN } from '../data/farmData';
import { useFarmImages } from '../context/ImageContext';

export const Testimonials = ({ lang = 'tr' }: { lang?: 'tr' | 'en' }) => {
  const l = t[lang].testimonials;
  const { getImage } = useFarmImages();

  return (
    <section id="yorumlar" className="py-20 sm:py-28 bg-stone-50/70 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Testimonials 4-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(lang === 'en' ? TESTIMONIALS_EN : TESTIMONIALS).map((t) => {
            const key = `testimonial_${t.id}`;
            const avatarSrc = getImage(key, t.avatar);

            return (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between card-hover-lift"
              >
                <div>
                  {/* Rating and Quote icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-stone-300" />
                  </div>

                  {/* Comment text */}
                  <p className="text-stone-700 text-sm leading-relaxed mb-6 italic">
                    "{t.comment}"
                  </p>
                </div>

                {/* Author Row with Circular Avatar */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-stone-100 shrink-0">
                      <img
                        src={avatarSrc}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/avatar_2.jpg';
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-bold text-stone-900 truncate">
                        {t.name}
                      </div>
                      <div className="text-xs text-stone-500 truncate">
                        {t.role}
                      </div>
                      <div className="text-[11px] font-medium text-[#123c28]">
                        {t.location}
                      </div>
                    </div>
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
