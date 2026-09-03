import React from 'react';
import {
  Beef,
  Milk,
  Coins,
  Banknote,
  CalendarDays,
  HeartPulse,
  TrendingUp,
  ClipboardCheck,
} from 'lucide-react';
import { ModuleKey } from '../types';
import { MODULES } from '../data/modules';

interface HeroProps {
  currentModule: ModuleKey;
  onSelectModule: (m: ModuleKey) => void;
  onOpenGuide?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentModule,
  onSelectModule,
  onOpenGuide,
}) => {
  const config = MODULES[currentModule];

  return (
    <section className="pt-8 pb-4">
      {/* Breadcrumb */}
      <div className="font-mono-code text-xs text-[#6B7160] mb-6">
        <a href="#top" className="hover:text-[#2E5B39] transition-colors">
          Anasayfa
        </a>{' '}
        &nbsp;/&nbsp; Rasyon &amp; Çiftlik Modülleri &nbsp;/&nbsp;{' '}
        <span className="text-[#20261A] font-semibold">{config.ad}</span>
      </div>

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2.5 font-mono-code text-[11px] tracking-widest text-[#2E5B39] uppercase">
        <span className="w-6 h-[1px] bg-[#B98A2B] inline-block"></span>
        <span>
          {config.tur === 'ciftlik' ? 'Çiftlik Modülü' : 'Rasyon Modülü'} · {config.kod}
        </span>
      </div>

      {/* Hero Heading */}
      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.08] text-[#20261A] my-3 max-w-3xl">
        {config.baslik}
      </h1>

      {/* Hero Description */}
      <p
        className="max-w-2xl text-[16px] text-[#3B4232] leading-relaxed mb-6"
        dangerouslySetInnerHTML={{ __html: config.aciklama }}
      />

      {/* Module Selector Bar */}
      <div className="inline-flex flex-wrap bg-[#EAE6D6] border border-[#DCD7C4] rounded-xl p-1 gap-1.5 mb-6 shadow-xs">
        <button
          onClick={() => onSelectModule('besi')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentModule === 'besi'
              ? 'bg-[#2E5B39] text-[#F7F5EC] shadow-sm'
              : 'text-[#6B7160] hover:text-[#20261A] hover:bg-[#F2EFE2]'
          }`}
        >
          <Beef className="w-4 h-4" /> Besi Sığırı
        </button>

        <button
          onClick={() => onSelectModule('sut')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentModule === 'sut'
              ? 'bg-[#2E5B39] text-[#F7F5EC] shadow-sm'
              : 'text-[#6B7160] hover:text-[#20261A] hover:bg-[#F2EFE2]'
          }`}
        >
          <Milk className="w-4 h-4" /> Süt İneği
        </button>

        <button
          onClick={() => onSelectModule('koyun')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentModule === 'koyun'
              ? 'bg-[#2E5B39] text-[#F7F5EC] shadow-sm'
              : 'text-[#6B7160] hover:text-[#20261A] hover:bg-[#F2EFE2]'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M8.6 6.2a3.4 3.4 0 0 1 6.8 0" />
            <path d="M8.6 6.2C7.1 6.4 5.9 5.7 5.4 4.2" />
            <path d="M15.4 6.2c1.5.2 2.7-.5 3.2-2" />
            <path d="M8.6 6.2c-.3 4.9 1.3 9.8 3.4 9.8s3.7-4.9 3.4-9.8" />
            <circle cx="10.5" cy="10.4" r=".75" fill="currentColor" stroke="none" />
            <circle cx="13.5" cy="10.4" r=".75" fill="currentColor" stroke="none" />
          </svg>
          Koyun &amp; Kuzu
        </button>

        <button
          onClick={() => onSelectModule('keci')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentModule === 'keci'
              ? 'bg-[#2E5B39] text-[#F7F5EC] shadow-sm'
              : 'text-[#6B7160] hover:text-[#20261A] hover:bg-[#F2EFE2]'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M8.6 6.2a3.4 3.4 0 0 1 6.8 0" />
            <path d="M8.6 6.2C7 5.6 6 4.3 5.8 2.4" />
            <path d="M15.4 6.2c1.6-.6 2.6-1.9 2.8-3.8" />
            <path d="M8.6 6.2c-.3 4.9 1.3 9.8 3.4 9.8s3.7-4.9 3.4-9.8" />
            <path d="M10.6 16.2c.2 1.4.7 2.5 1.4 3.2.7-.7 1.2-1.8 1.4-3.2" />
            <circle cx="10.5" cy="10.4" r=".75" fill="currentColor" stroke="none" />
            <circle cx="13.5" cy="10.4" r=".75" fill="currentColor" stroke="none" />
          </svg>
          Keçi &amp; Oğlak
        </button>

        <button
          onClick={() => onSelectModule('sutEko')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentModule === 'sutEko'
              ? 'bg-[#2E5B39] text-[#F7F5EC] shadow-sm'
              : 'text-[#6B7160] hover:text-[#20261A] hover:bg-[#F2EFE2]'
          }`}
        >
          <Coins className="w-4 h-4" /> Süt Ekonomisi
        </button>

        <button
          onClick={() => onSelectModule('besiEko')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentModule === 'besiEko'
              ? 'bg-[#2E5B39] text-[#F7F5EC] shadow-sm'
              : 'text-[#6B7160] hover:text-[#20261A] hover:bg-[#F2EFE2]'
          }`}
        >
          <Banknote className="w-4 h-4" /> Besi Ekonomisi
        </button>

        <button
          onClick={() => onSelectModule('gebTakvim')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentModule === 'gebTakvim'
              ? 'bg-[#2E5B39] text-[#F7F5EC] shadow-sm'
              : 'text-[#6B7160] hover:text-[#20261A] hover:bg-[#F2EFE2]'
          }`}
        >
          <CalendarDays className="w-4 h-4" /> Gebelik Takvimi
        </button>

        <button
          onClick={() => onSelectModule('kizTakvim')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentModule === 'kizTakvim'
              ? 'bg-[#2E5B39] text-[#F7F5EC] shadow-sm'
              : 'text-[#6B7160] hover:text-[#20261A] hover:bg-[#F2EFE2]'
          }`}
        >
          <HeartPulse className="w-4 h-4" /> Kızgınlık Takvimi
        </button>

        <button
          onClick={() => onSelectModule('iofc')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentModule === 'iofc'
              ? 'bg-[#2E5B39] text-[#F7F5EC] shadow-sm'
              : 'text-[#6B7160] hover:text-[#20261A] hover:bg-[#F2EFE2]'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> IOFC
        </button>

        <button
          onClick={() => onSelectModule('damizlik')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentModule === 'damizlik'
              ? 'bg-[#2E5B39] text-[#F7F5EC] shadow-sm'
              : 'text-[#6B7160] hover:text-[#20261A] hover:bg-[#F2EFE2]'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" /> Damızlık Skor
        </button>
      </div>

      {/* Meta Features Strip */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 py-3 border-y border-[#DCD7C4] font-mono-code text-[11.5px] text-[#6B7160]">
        {config.meta.map((item, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B98A2B]"></span>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};
