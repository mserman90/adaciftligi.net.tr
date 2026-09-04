import { t } from '../translations';
import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, CheckCircle2, Shield, PhoneCall, Sparkles } from 'lucide-react';
import { FARM_STATS, FARM_CONTACT } from '../data/farmData';
import { useFarmImages } from '../context/ImageContext';
import { OptimizedImage } from './OptimizedImage';
import { gsap } from 'gsap';

interface HeroProps {
  lang?: 'tr' | 'en';
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry, lang = 'tr' }) => {
  const l = t[lang].hero;
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const statsBarRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

  const { getImage } = useFarmImages();
  const heroImage = getImage('hero', '/images/drive/Gemini_Generated_Image_byt5yibyt5yibyt5.webp');

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(headlineRef.current, {
        y: 28,
        opacity: 0,
        duration: 0.85,
      })
      .from(sublineRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.65,
      }, '-=0.4')
      .from(ctaGroupRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.55,
      }, '-=0.3')
      .from(imageCardRef.current, {
        scale: 0.96,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      .from(statsBarRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
      }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative pt-36 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 overflow-hidden bg-white"
    >
      {/* Subtle organic background mesh */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-emerald-50/70 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-0 -z-10 w-80 h-80 bg-stone-100/80 rounded-full blur-2xl -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Pill Location & Live Mera Indicator */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200/80 text-stone-800 text-xs sm:text-sm font-medium shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#123c28] animate-pulse" />
                <span>{l.location}</span>
                <span className="text-stone-300">|</span>
                <span className="text-stone-600">Doğal Hayvancılık & Süt</span>
              </div>
              <a
                href="#farm-weather-banner"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold hover:bg-emerald-100/80 transition-colors shadow-2xs group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{l.liveStatus}</span>
              </a>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              id="hero-headline"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12] mb-6"
            >
              {l.title1}{' '}
              <span className="text-[#123c28] underline decoration-[#123c28]/20 decoration-wavy decoration-2 underline-offset-8">{l.titleHighlight}</span>{' '}
              {l.title2}
            </h1>

            {/* 2-line clean, high-impact description */}
            <p
              ref={sublineRef}
              id="hero-subline"
              className="text-base sm:text-lg lg:text-xl text-stone-600 leading-relaxed max-w-2xl mb-8"
            >
              {l.description}
            </p>

            {/* CTAs */}
            <div
              ref={ctaGroupRef}
              id="hero-cta-group"
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <button
                type="button"
                id="hero-primary-cta"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2.5 bg-[#123c28] hover:bg-[#0c291c] text-white text-base font-semibold px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-98"
              >
                <span>{l.btnPrimary}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#urunler"
                id="hero-secondary-cta"
                className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-800 text-base font-medium px-6 py-3.5 rounded-full border border-stone-300 hover:border-stone-400 transition-colors shadow-xs"
              >
                <span>{l.btnSecondary}</span>
                <ChevronDown className="w-4 h-4 text-stone-500" />
              </a>

              <a
                href={`tel:${FARM_CONTACT.phoneRaw}`}
                className="inline-flex items-center gap-1.5 text-stone-600 hover:text-[#123c28] text-sm font-medium px-3 py-2 transition-colors ml-1"
              >
                <PhoneCall className="w-4 h-4 text-[#123c28]" />
                <span>{l.btnCall}</span>
              </a>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-200/70 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#123c28] shrink-0" />
                <span>{l.check1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#123c28] shrink-0" />
                <span>{l.check2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#123c28] shrink-0" />
                <span>{l.check3}</span>
              </div>
            </div>
          </div>

          {/* Hero Media Visual Column */}
          <div className="lg:col-span-5 relative" ref={imageCardRef}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Card */}
              <div
                id="hero-photo-container"
                className="overflow-hidden rounded-3xl border border-stone-200 shadow-[0_16px_40px_-12px_rgba(18,60,40,0.14)] bg-stone-100 relative group aspect-[4/3] lg:aspect-[5/4] transition-all duration-300"
              >
                <OptimizedImage
                  src={heroImage}
                  alt="Doğal taşkın ovası merasında otlayan sağlıklı sığır sürüsü - Ada Çiftliği"
                  priority={true}
                  fallbackSrc="/images/hero_cows.webp"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />

                {/* Subtle Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Floating On-Image Info Caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Edirne / Meric Basin' : 'Edirne / Meriç Havzası'}</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-stone-100 leading-snug drop-shadow-sm">
                    {lang === 'en' ? 'Our healthy herds fed on the rich flora of the natural river floodplain.' : 'Doğal nehir taşkın ovasının zengin florasında beslenen sağlıklı sürülerimiz.'}
                  </p>
                </div>
              </div>

              {/* Floating Badge on top right */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl py-2 px-3.5 shadow-md border border-stone-200/80 flex items-center gap-2 z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-stone-800">{l.badge}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row Bar */}
        <div
          ref={statsBarRef}
          id="hero-stats-row"
          className="mt-14 sm:mt-18 pt-8 pb-8 px-6 sm:px-10 rounded-3xl bg-stone-50 border border-stone-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            
            {FARM_STATS.map((stat, idx) => (
              <div
                key={stat.id}
                className={`flex flex-col ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-8' : ''}`}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#123c28] tracking-tight mb-1">
                  {l.stats[idx]?.val || stat.value}
                </div>
                <div className="text-sm font-bold text-stone-900 leading-tight">
                  {l.stats[idx]?.label || stat.label}
                </div>
                <div className="text-xs text-stone-500 mt-0.5 leading-snug">
                  {l.stats[idx]?.sub || stat.sublabel}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};
