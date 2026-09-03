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
  ArrowLeft,
  LogOut,
  ShieldCheck,
  User,
} from 'lucide-react';
import { Language, ModuleKey } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  currentModule: ModuleKey;
  onSelectModule: (m: ModuleKey) => void;
  onOpenLoginModal?: () => void;
  onBackToWebsite?: () => void;
  onLogout?: () => void;
  adminUsername?: string;
  lastSavedInfo?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  currentModule,
  onSelectModule,
  onOpenLoginModal,
  onBackToWebsite,
  onLogout,
  adminUsername = 'admin',
  lastSavedInfo,
}) => {
  return (
    <header className="bg-[#22452B] text-[#F3F1E4] sticky top-0 z-50 border-b-2 border-[#B98A2B] no-print shadow-sm">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Brand & Return button */}
        <div className="flex items-center gap-3">
          {onBackToWebsite && (
            <button
              type="button"
              onClick={onBackToWebsite}
              title="Çiftlik web sitesine dön"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(243,241,228,0.12)] hover:bg-[rgba(243,241,228,0.22)] text-white text-xs font-semibold border border-[rgba(243,241,228,0.25)] transition-all cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-[#E9D9A8]" />
              <span className="hidden sm:inline">Çiftlik Sitesi</span>
            </button>
          )}

          <div className="flex items-center gap-2 text-inherit">
            <svg
              viewBox="0 0 34 34"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7 text-[#E9D9A8] shrink-0"
            >
              <path d="M3 7c1.2 4.8 4.8 7.8 9.2 8.4" />
              <path d="M31 7c-1.2 4.8-4.8 7.8-9.2 8.4" />
              <path d="M12.2 15.4C13.6 13.7 15.2 12.9 17 12.9s3.4.8 4.8 2.5" />
              <path d="M12.2 15.4C10.7 17.5 9.8 20 9.8 22.3c0 5.4 3.2 8.7 7.2 8.7s7.2-3.3 7.2-8.7c0-2.3-.9-4.8-2.4-6.9" />
              <circle cx="14.4" cy="23.6" r="1.1" fill="currentColor" stroke="none" />
              <circle cx="19.6" cy="23.6" r="1.1" fill="currentColor" stroke="none" />
            </svg>
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight whitespace-nowrap">
              Ada <b className="font-normal opacity-90">Rasyon</b>
            </span>
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick top module switcher for wide screens */}
          <div className="hidden lg:inline-flex bg-[rgba(243,241,228,0.08)] border border-[rgba(243,241,228,0.22)] rounded-lg p-1 gap-1">
            <button
              onClick={() => onSelectModule('besi')}
              className={`inline-flex items-center gap-1.5 px-2 py-1 font-mono-code text-[10.5px] font-semibold tracking-wider uppercase rounded ${
                currentModule === 'besi'
                  ? 'bg-[#F3F1E4] text-[#22452B]'
                  : 'text-[rgba(243,241,228,0.7)] hover:text-[#F3F1E4]'
              }`}
            >
              <Beef className="w-3 h-3" /> Besi
            </button>
            <button
              onClick={() => onSelectModule('sut')}
              className={`inline-flex items-center gap-1.5 px-2 py-1 font-mono-code text-[10.5px] font-semibold tracking-wider uppercase rounded ${
                currentModule === 'sut'
                  ? 'bg-[#F3F1E4] text-[#22452B]'
                  : 'text-[rgba(243,241,228,0.7)] hover:text-[#F3F1E4]'
              }`}
            >
              <Milk className="w-3 h-3" /> Süt
            </button>
            <button
              onClick={() => onSelectModule('koyun')}
              className={`inline-flex items-center gap-1.5 px-2 py-1 font-mono-code text-[10.5px] font-semibold tracking-wider uppercase rounded ${
                currentModule === 'koyun'
                  ? 'bg-[#F3F1E4] text-[#22452B]'
                  : 'text-[rgba(243,241,228,0.7)] hover:text-[#F3F1E4]'
              }`}
            >
              Koyun
            </button>
            <button
              onClick={() => onSelectModule('keci')}
              className={`inline-flex items-center gap-1.5 px-2 py-1 font-mono-code text-[10.5px] font-semibold tracking-wider uppercase rounded ${
                currentModule === 'keci'
                  ? 'bg-[#F3F1E4] text-[#22452B]'
                  : 'text-[rgba(243,241,228,0.7)] hover:text-[#F3F1E4]'
              }`}
            >
              Keçi
            </button>
            <button
              onClick={() => onSelectModule('sutEko')}
              className={`inline-flex items-center gap-1.5 px-2 py-1 font-mono-code text-[10.5px] font-semibold tracking-wider uppercase rounded ${
                currentModule === 'sutEko'
                  ? 'bg-[#F3F1E4] text-[#22452B]'
                  : 'text-[rgba(243,241,228,0.7)] hover:text-[#F3F1E4]'
              }`}
            >
              <Coins className="w-3 h-3" /> Süt Eko
            </button>
            <button
              onClick={() => onSelectModule('besiEko')}
              className={`inline-flex items-center gap-1.5 px-2 py-1 font-mono-code text-[10.5px] font-semibold tracking-wider uppercase rounded ${
                currentModule === 'besiEko'
                  ? 'bg-[#F3F1E4] text-[#22452B]'
                  : 'text-[rgba(243,241,228,0.7)] hover:text-[#F3F1E4]'
              }`}
            >
              <Banknote className="w-3 h-3" /> Besi Eko
            </button>
            <button
              onClick={() => onSelectModule('gebTakvim')}
              className={`inline-flex items-center gap-1.5 px-2 py-1 font-mono-code text-[10.5px] font-semibold tracking-wider uppercase rounded ${
                currentModule === 'gebTakvim'
                  ? 'bg-[#F3F1E4] text-[#22452B]'
                  : 'text-[rgba(243,241,228,0.7)] hover:text-[#F3F1E4]'
              }`}
            >
              <CalendarDays className="w-3 h-3" /> Gebelik
            </button>
            <button
              onClick={() => onSelectModule('kizTakvim')}
              className={`inline-flex items-center gap-1.5 px-2 py-1 font-mono-code text-[10.5px] font-semibold tracking-wider uppercase rounded ${
                currentModule === 'kizTakvim'
                  ? 'bg-[#F3F1E4] text-[#22452B]'
                  : 'text-[rgba(243,241,228,0.7)] hover:text-[#F3F1E4]'
              }`}
            >
              <HeartPulse className="w-3 h-3" /> Kızgınlık
            </button>
            <button
              onClick={() => onSelectModule('iofc')}
              className={`inline-flex items-center gap-1.5 px-2 py-1 font-mono-code text-[10.5px] font-semibold tracking-wider uppercase rounded ${
                currentModule === 'iofc'
                  ? 'bg-[#F3F1E4] text-[#22452B]'
                  : 'text-[rgba(243,241,228,0.7)] hover:text-[#F3F1E4]'
              }`}
            >
              <TrendingUp className="w-3 h-3" /> SYGM
            </button>
            <button
              onClick={() => onSelectModule('damizlik')}
              className={`inline-flex items-center gap-1.5 px-2 py-1 font-mono-code text-[10.5px] font-semibold tracking-wider uppercase rounded ${
                currentModule === 'damizlik'
                  ? 'bg-[#F3F1E4] text-[#22452B]'
                  : 'text-[rgba(243,241,228,0.7)] hover:text-[#F3F1E4]'
              }`}
            >
              <ClipboardCheck className="w-3 h-3" /> Damızlık
            </button>
          </div>

          {/* Last Saved Badge */}
          
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-[rgba(243,241,228,0.3)] hover:bg-[rgba(243,241,228,0.1)] text-xs font-bold text-[#F3F1E4] transition-all cursor-pointer"
            title="Dili Değiştir / Change Language"
          >
            {lang === 'tr' ? 'TR' : 'EN'}
          </button>

          {lastSavedInfo && (
            <div
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#E9D9A8]/10 border border-[#E9D9A8]/30 text-xs text-[#E9D9A8] transition-all tick-flash"
              title="Son Rasyon Kaydı"
            >
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-emerald-300"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              </div>
              <span className="font-mono-code font-medium opacity-90">{lastSavedInfo}</span>
            </div>
          )}

          {/* Admin badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F3F1E4]/10 border border-[#F3F1E4]/20 text-xs text-[#E9D9A8]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium hidden sm:inline">{adminUsername}</span>
          </div>

          {/* Logout button */}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              title="Yönetici oturumunu kapat"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[rgba(243,241,228,0.3)] hover:border-red-300 hover:bg-red-950/40 text-xs font-semibold text-[#F3F1E4] transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-300" />
              <span className="hidden sm:inline">Çıkış</span>
            </button>
          )}

          {!onLogout && onOpenLoginModal && (
            <button
              onClick={onOpenLoginModal}
              className="font-mono-code text-xs tracking-wider uppercase border border-[rgba(243,241,228,0.4)] px-4 py-2 rounded-md hover:bg-[rgba(243,241,228,0.12)] hover:border-[rgba(243,241,228,0.7)] transition-all cursor-pointer whitespace-nowrap"
            >
              Üye Girişi
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
