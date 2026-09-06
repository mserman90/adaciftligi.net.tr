import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  ZoomIn,
  Shield,
  Palette,
  Package,
  Award,
  ExternalLink,
  ChevronRight,
  Milk,
  Beef,
  Compass,
  Store,
} from 'lucide-react';
import {
  AdaLogo,
  AdaLogoMark,
  AdaLogoMonogram,
  AdaLogoSeal,
  ADA_BRAND_COLORS,
  LogoTheme,
  LogoVariant,
} from './AdaLogo';

interface BrandSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'tr' | 'en';
}

export const BrandSystemModal: React.FC<BrandSystemModalProps> = ({
  isOpen,
  onClose,
  lang = 'tr',
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schematic' | 'touchpoints' | 'favicons' | 'colors' | 'export'>('overview');
  const [selectedTheme, setSelectedTheme] = useState<LogoTheme>('navy');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopySvg = (key: string, svgUrl: string) => {
    fetch(svgUrl)
      .then((res) => res.text())
      .then((text) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      })
      .catch(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      });
  };

  const handleDownloadFile = (fileName: string, fileUrl: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Color Swatches strictly matching the uploaded presentation
  const officialColorSwatches = [
    {
      code: 'PANTONE EF12353',
      name: lang === 'en' ? 'Warm Antique Gold' : 'Trakya Hasat Altını',
      hex: '#C5A059',
      cmyk: 'C:15 M:32 Y:75 K:10',
      rgb: 'RGB(197, 160, 89)',
      textColor: 'text-stone-900',
      desc: lang === 'en' ? 'Master brand headers, bottle caps, and gold finish accents' : 'Ana marka başlıkları, şişe kapakları ve varak detaylar',
    },
    {
      code: 'PANVAL 0000020',
      name: lang === 'en' ? 'Deep Navy Blue' : 'Meriç Gece Laciverti',
      hex: '#162E40',
      cmyk: 'C:85 M:65 Y:45 K:45',
      rgb: 'RGB(22, 46, 64)',
      textColor: 'text-white',
      desc: lang === 'en' ? 'Primary emblem silhouette, uniform canvas, and typography' : 'Ana amblem silüeti, personel önlükleri ve tipografi',
    },
    {
      code: 'PANTONE 004576',
      name: lang === 'en' ? 'Rich Prussian Navy' : 'Prusya Mavisi',
      hex: '#1A364E',
      cmyk: 'C:82 M:60 Y:40 K:35',
      rgb: 'RGB(26, 54, 78)',
      textColor: 'text-white',
      desc: lang === 'en' ? 'Sub-brand modules and structural UI backgrounds' : 'Alt birim kartları ve kurumsal arka planlar',
    },
    {
      code: 'PAVYOL 003737',
      name: lang === 'en' ? 'Dark Slate Blue' : 'Mera Koyu Arduvaz',
      hex: '#142738',
      cmyk: 'C:88 M:68 Y:48 K:52',
      rgb: 'RGB(20, 39, 56)',
      textColor: 'text-white',
      desc: lang === 'en' ? 'High-contrast typography and digital dark mode baseline' : 'Yüksek kontrastlı başlıklar ve dijital zemin rengi',
    },
    {
      code: 'RIVER BLUE',
      name: lang === 'en' ? 'Meric River Waters' : 'Meriç Akarsu Mavisi',
      hex: '#4C86A8',
      cmyk: 'C:62 M:28 Y:15 K:2',
      rgb: 'RGB(76, 134, 168)',
      textColor: 'text-white',
      desc: lang === 'en' ? 'Flowing river current in the emblem and water accents' : 'Amblemdeki kıvrımlı nehir akıntısı ve su dalgaları',
    },
    {
      code: 'PURE CREAM',
      name: lang === 'en' ? 'Farm Dairy Milk' : 'Saf Çiftlik Sütü',
      hex: '#FFFFFF',
      cmyk: 'C:0 M:0 Y:0 K:0',
      rgb: 'RGB(255, 255, 255)',
      textColor: 'text-stone-900',
      desc: lang === 'en' ? 'Cold-chain dairy purity, animal body base, and negative space' : 'Soğuk zincir süt saflığı, hayvan gövde tabanı ve negatif alan',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#0C140E] text-[#E2ECE5] border border-stone-700/70 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-stone-800 bg-[#121E15]/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#162E40] border border-[#C5A059]/40 flex items-center justify-center shrink-0 shadow-md">
              <AdaLogoMark size={32} theme="gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
                  {lang === 'en' ? 'Official Brand Architecture' : 'Resmi Kurumsal Kimlik Sunumu'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C5A059]/20 text-[#DFC07F] border border-[#C5A059]/40">
                  Presentation v2.0
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-black text-white tracking-tight">
                {lang === 'en' ? 'Ada Farm: Comprehensive Brand Identity Presentation' : 'Ada Çiftliği: Kapsamlı Kurumsal Kimlik & Logo Mimarisi'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title={lang === 'en' ? 'Close' : 'Kapat'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 border-b border-stone-800 bg-stone-950/60 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'overview', label: lang === 'en' ? 'Master Identity' : 'Ana Logo Mimarisi', icon: Award },
            { id: 'schematic', label: lang === 'en' ? 'Brand Schematic' : 'Marka Hiyerarşisi', icon: Layers },
            { id: 'touchpoints', label: lang === 'en' ? 'Touchpoints & Merch' : 'Ürün & Ambalaj', icon: Package },
            { id: 'favicons', label: lang === 'en' ? 'Favicon & Digital' : 'Favicon & Dijital', icon: ZoomIn },
            { id: 'colors', label: lang === 'en' ? 'Color Swatches' : 'Pantone Renkleri', icon: Palette },
            { id: 'export', label: lang === 'en' ? 'Vector SVG Assets' : 'Vektörel SVG İndir', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#162E40] text-[#DFC07F] border border-[#C5A059]/50 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* TAB 1: MASTER IDENTITY OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Presentation Hero Card */}
              <div className="bg-[#FAF8F3] text-[#162E40] rounded-3xl p-6 sm:p-10 border border-[#D5C6AC] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162E40]/10 text-[#162E40] text-xs font-bold font-mono uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    {lang === 'en' ? 'Master Brand Identity' : 'Tescilli Çiftlik Kimliği'}
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-serif font-black tracking-tight leading-tight">
                    ADA ÇİFTLİĞİ
                    <span className="block text-base sm:text-lg font-sans font-bold tracking-[0.22em] text-[#4C86A8] mt-1">
                      MERİÇ - EDİRNE
                    </span>
                  </h3>

                  <p className="text-sm sm:text-base font-serif italic text-[#C5A059] font-medium">
                    Premium Farm Products · Since 1954
                  </p>

                  <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
                    {lang === 'en'
                      ? 'The unified vector identity pairs the historic 5-arch Meriç Stone Bridge and flowing river meander with pastoral Holstein dairy cattle, Kıvırcık sheep, and riverside waterfowl. Engineered for ultra-high legibility from 16px micro-favicons to large-format architectural signage.'
                      : 'Meriç tarihi taş köprüsü, kıvrımlı nehir yatağı, safkan Holstein süt ineği, Trakya Kıvırcık koyunu ve su kuşu figürlerinin bir araya geldiği tescilli logo sistemi. 16px mikro faviconlardan dev tabela baskılarına kadar optik netlik sunar.'}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <button
                      type="button"
                      onClick={() => handleDownloadFile('ada-ciftligi-logo.png', '/logo.png')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 shadow-md transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-emerald-200" />
                      {lang === 'en' ? 'Download High-Res PNG' : 'Yüksek Çözünürlüklü PNG İndir'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadFile('ada-ciftligi-logo.svg', '/logo.svg')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#162E40] text-white text-xs font-bold hover:bg-[#102230] shadow-md transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#C5A059]" />
                      {lang === 'en' ? 'Download Vector SVG' : 'Vektörel SVG İndir'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopySvg('hero-svg', '/logo.svg')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#D5C6AC] text-[#162E40] text-xs font-bold hover:bg-stone-100 shadow-sm transition-all cursor-pointer"
                    >
                      {copiedKey === 'hero-svg' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      {copiedKey === 'hero-svg' ? (lang === 'en' ? 'Copied!' : 'Kopyalandı!') : (lang === 'en' ? 'Copy SVG Code' : 'SVG Kodunu Kopyala')}
                    </button>
                  </div>
                </div>

                {/* Master Badge Display */}
                <div className="shrink-0 p-5 bg-white rounded-2xl border border-stone-200 shadow-lg flex flex-col items-center justify-center gap-2">
                  <img
                    src="/adalogo.svg"
                    alt="Ada Çiftliği Resmi Logosu"
                    className="h-28 sm:h-32 w-auto max-w-[320px] object-contain select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-[11px] font-sans font-bold text-stone-500 uppercase tracking-widest">
                    {lang === 'en' ? 'Official Master Logo' : 'Resmi Ana Logo'}
                  </div>
                </div>
              </div>

              {/* Anatomy Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#121E15] border border-stone-800 space-y-2">
                  <div className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">
                    {lang === 'en' ? '1. Historic Meriç Bridge' : '1. Tarihi Meriç Köprüsü'}
                  </div>
                  <div className="text-sm font-bold text-white">5 Taş Kemer &amp; Kitabe Köşkü</div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {lang === 'en'
                      ? 'Edirne historic stone bridge across the horizon, representing heritage, permanence, and geographical roots in Meric.'
                      : 'Ufuk çizgisini süsleyen 5 kemerli Edirne Meriç Taş Köprüsü ve tepe kitabe köşkü, köklü tarihi ve coğrafi güveni simgeler.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#121E15] border border-stone-800 space-y-2">
                  <div className="text-xs font-mono font-bold text-[#4C86A8] uppercase tracking-wider">
                    {lang === 'en' ? '2. The Flowing River Meander' : '2. Meriç Nehri Akıntısı'}
                  </div>
                  <div className="text-sm font-bold text-white">Hayat Kaynağı Akarsu</div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {lang === 'en'
                      ? 'Flowing S-curve river ripples that nurture the fertile alluvial floodplains and natural pasturelands.'
                      : 'Amblemin sağından kıvrılarak akan Meriç suyu, taşkın ovasının zengin yonca ve mera bitkilerini besleyen hayat damarıdır.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#121E15] border border-stone-800 space-y-2">
                  <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    {lang === 'en' ? '3. Pastoral Fauna Harmony' : '3. Pastoral Çiftlik Faünası'}
                  </div>
                  <div className="text-sm font-bold text-white">İnek, Kıvırcık Koyun &amp; Su Kuşu</div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {lang === 'en'
                      ? 'Holstein dairy cow, Thracian Kivircik sheep, and river duck coexisting in natural open-range welfare.'
                      : 'Yüksek verimli süt ineği, tescilli Trakya Kıvırcık koyunu ve nehir kenarı su kuşu; biyogüvenlikli doğal yaşam döngüsünü anlatır.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BRAND ARCHITECTURE SCHEMATIC */}
          {activeTab === 'schematic' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#121E15] border border-stone-800 space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest">
                    Brand Architecture Schematic
                  </span>
                  <h3 className="text-2xl font-serif font-black text-white">
                    {lang === 'en' ? 'Ada Farm Master Brand Hierarchy' : 'Ada Çiftliği Marka Mimarisi Şeması'}
                  </h3>
                  <p className="text-xs text-stone-400">
                    {lang === 'en'
                      ? 'A monolithic master brand architecture anchoring specialized commercial branches under one unified standard.'
                      : 'Sunum tablosunda yer alan Master Marka ve 4 ana operasyonel alt birimin hiyerarşik yapılandırması.'}
                  </p>
                </div>

                {/* The Tree Diagram */}
                <div className="flex flex-col items-center">
                  {/* Master Brand Node */}
                  <div className="px-8 py-4 rounded-2xl bg-[#C5A059] text-stone-950 font-serif font-black text-lg sm:text-xl shadow-xl border-2 border-[#DFC07F] text-center flex items-center gap-3">
                    <AdaLogoMark size={28} theme="navy" idSuffix="tree-master" />
                    <div>
                      <div>ADA ÇİFTLİĞİ</div>
                      <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-900 opacity-90">
                        (Master Brand)
                      </div>
                    </div>
                  </div>

                  {/* Connecting Stem */}
                  <div className="w-0.5 h-8 bg-[#C5A059]/60 my-1" />
                  <div className="w-full max-w-2xl h-0.5 bg-[#C5A059]/40 relative">
                    <div className="absolute top-0 left-[12%] w-0.5 h-6 bg-[#C5A059]/60" />
                    <div className="absolute top-0 left-[37%] w-0.5 h-6 bg-[#C5A059]/60" />
                    <div className="absolute top-0 left-[62%] w-0.5 h-6 bg-[#C5A059]/60" />
                    <div className="absolute top-0 left-[87%] w-0.5 h-6 bg-[#C5A059]/60" />
                  </div>

                  {/* 4 Child Divisions */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mt-6">
                    {[
                      {
                        title: 'DAIRY PRODUCTS',
                        tr: 'Süt & Süt Ürünleri',
                        icon: Milk,
                        desc: lang === 'en' ? 'Cold-chain raw milk, aged cheese & butter' : 'Soğuk zincir çiğ süt, olgunlaştırılmış peynir ve tereyağı',
                      },
                      {
                        title: 'MEAT & POULTRY',
                        tr: 'Et & Canlı Hayvancılık',
                        icon: Beef,
                        desc: lang === 'en' ? 'Traceable pedigree cattle, Kivircik lambs' : 'Kayıtlı damızlık besi sığırı ve Kıvırcık kuzular',
                      },
                      {
                        title: 'AGRICULTURAL TOURS',
                        tr: 'Çiftlik Turları & Ziyaret',
                        icon: Compass,
                        desc: lang === 'en' ? 'Pasture walk, zootechnical education' : 'Mera turları, zootekni ve aile çiftlik gezileri',
                      },
                      {
                        title: 'FARM-TO-TABLE SHOP',
                        tr: 'Doğal Çiftlik Dükkanı',
                        icon: Store,
                        desc: lang === 'en' ? 'Local Thracian honey, butter & produce' : 'Trakya balı, yöresel ürünler ve doğrudan satış',
                      },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-[#162E40] border border-[#4C86A8]/30 flex flex-col items-center text-center space-y-2 shadow-md hover:border-[#C5A059] transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-xs font-bold text-white tracking-wide">{item.title}</div>
                          <div className="text-[11px] font-medium text-[#DFC07F]">{item.tr}</div>
                          <p className="text-[10px] text-stone-300 leading-tight">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCT & PACKAGING TOUCHPOINTS */}
          {activeTab === 'touchpoints' && (
            <div className="space-y-6">
              <div className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">
                Product &amp; Packaging Touchpoints (Sunum Örnekleri)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Touchpoint 1: Glass Milk Bottle & Gold Cap */}
                <div className="p-6 rounded-3xl bg-[#FAF8F3] text-[#162E40] border border-[#D5C6AC] shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
                      PREMIUM DAIRY
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#162E40]/10 text-[#162E40]">
                      Cam Şişe &amp; Altın Kapak
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-black">
                    {lang === 'en' ? 'Glass Milk Bottle & Branded Gold Cap' : 'Geleneksel Cam Süt Şişesi & Varak Kapak'}
                  </h4>

                  {/* Bottle Visual Mockup */}
                  <div className="h-56 rounded-2xl bg-gradient-to-b from-stone-200 to-stone-100 flex items-center justify-center relative overflow-hidden border border-stone-300 p-4">
                    {/* Bottle Silhouette */}
                    <div className="relative w-28 h-48 bg-white rounded-t-3xl rounded-b-xl border-2 border-stone-300 shadow-xl flex flex-col items-center pt-3 overflow-hidden">
                      {/* Gold Cap */}
                      <div className="w-14 h-4 rounded-t-md bg-gradient-to-r from-[#DFC07F] via-[#C5A059] to-[#9F7C38] border border-[#DFC07F] shadow-sm flex items-center justify-center -mt-3">
                        <div className="w-8 h-1 rounded-full bg-white/40" />
                      </div>
                      <div className="w-8 h-8 bg-stone-100/50 rounded-full my-1" />

                      {/* Milk fill effect */}
                      <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-b from-stone-50 to-white flex items-center justify-center">
                        {/* Front Label */}
                        <div className="px-2 py-3 rounded-lg bg-white border border-[#D5C6AC] shadow-sm flex flex-col items-center scale-90">
                          <AdaLogoMark size={42} theme="navy" idSuffix="bottle-mockup" />
                          <div className="text-[7px] font-serif font-black mt-1">ADA ÇİFTLİĞİ</div>
                          <div className="text-[5px] font-sans font-bold text-[#4C86A8]">GÜNLÜK ÇİĞ SÜT</div>
                        </div>
                      </div>
                    </div>

                    {/* Macro Floating Gold Cap */}
                    <div className="absolute top-4 right-4 flex flex-col items-center bg-white/95 backdrop-blur-sm p-3 rounded-2xl border border-[#C5A059]/40 shadow-lg">
                      <AdaLogoSeal size={64} theme="gold" />
                      <span className="text-[9px] font-bold text-stone-700 mt-1.5 text-center leading-tight">
                        Branded gold-finished<br />metal cap
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {lang === 'en'
                      ? 'Branded gold-finished metal cap for the logo from a tiny scale. Preserves vacuum freshness while reinforcing luxury farm quality.'
                      : 'Altın varak kaplama metal kapak, mikro ölçekte amblem işlemesi ile cam şişede vakumlu tazeliği ve premium çiftlik algısını korur.'}
                  </p>
                </div>

                {/* Touchpoint 2: Staff Uniform Canvas Apron */}
                <div className="p-6 rounded-3xl bg-[#121E15] text-white border border-stone-800 shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
                      STAFF IDENTITY
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#DFC07F]">
                      Nakışlı Kanvas Önlük
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-black">
                    {lang === 'en' ? 'Durable Canvas Apron & Brass Rivets' : 'Dayanıklı Lacivert Kanvas Personel Önlüğü'}
                  </h4>

                  {/* Apron Visual Mockup */}
                  <div className="h-56 rounded-2xl bg-[#0F202D] flex items-center justify-center relative overflow-hidden border border-[#162E40] p-4">
                    {/* Apron Silhouette */}
                    <div className="w-36 h-48 bg-[#162E40] rounded-t-2xl rounded-b-xl border border-[#24455E] shadow-2xl flex flex-col items-center pt-6 relative">
                      {/* Neck Strap */}
                      <div className="absolute -top-3 w-16 h-6 border-2 border-[#C5A059]/60 rounded-t-full" />
                      
                      {/* Embroidered Center Logo */}
                      <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#102230]/80 border border-white/10 shadow-inner">
                        <AdaLogoMark size={40} theme="light" idSuffix="apron-mockup" />
                        <div className="text-[7.5px] font-serif font-black text-white mt-1">ADA ÇİFTLİĞİ</div>
                        <div className="text-[5.5px] font-sans font-bold text-[#DFC07F] tracking-widest">MERİÇ - EDİRNE</div>
                      </div>

                      {/* Pocket & Custom Brass Rivet */}
                      <div className="w-28 h-14 bg-[#102230] rounded-t-lg border-t border-[#24455E] mt-auto flex items-center justify-between px-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#DFC07F] to-[#9F7C38] border border-[#FFF3D4] shadow-sm" title="Custom Branded Brass Rivet" />
                        <div className="text-[7px] font-mono text-stone-400">POCKET</div>
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#DFC07F] to-[#9F7C38] border border-[#FFF3D4] shadow-sm" title="Custom Branded Brass Rivet" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {lang === 'en'
                      ? 'High-quality staff uniform with embroidered emblem on durable deep navy canvas, accented with branded gold brass rivets.'
                      : 'Dayanıklı lacivert kanvas kumaş üzerine yüksek yoğunluklu beyaz ve altın iplik nakışı, özel damgalı pirinç perçin düğmeler.'}
                  </p>
                </div>

                {/* Touchpoint 3: Laser Engraved Wooden Cheese Box */}
                <div className="p-6 rounded-3xl bg-[#2A1D13] text-amber-100 border border-[#5C3C22] shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#DFC07F]">
                      PREMIUM GOODS
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DFC07F]/20 text-[#DFC07F]">
                      Lazer Ahşap Kutu
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-black text-white">
                    {lang === 'en' ? 'Laser Engraved Rustic Cheese Box' : 'Lazer Yakma Ahşap Peynir Sandığı'}
                  </h4>

                  {/* Wood Box Visual Mockup */}
                  <div className="h-56 rounded-2xl bg-gradient-to-br from-[#8C6541] to-[#5C3C22] flex items-center justify-center relative overflow-hidden border border-[#4A2F1A] p-4 shadow-inner">
                    {/* Wooden Sliding Box */}
                    <div className="w-56 h-36 bg-[#785332] rounded-xl border-2 border-[#4A2F1A] shadow-2xl p-4 flex flex-col items-center justify-center text-center relative">
                      <div className="absolute inset-1 border border-dashed border-[#4A2F1A]/70 rounded-lg pointer-events-none" />
                      
                      {/* Laser burned effect logo */}
                      <div className="flex flex-col items-center text-[#3D2310] drop-shadow-sm">
                        <AdaLogoMark size={50} theme="kraft" idSuffix="wood-mockup" />
                        <div className="font-serif font-black text-xs tracking-wider mt-1 text-[#3D2310]">ADA ÇİFTLİĞİ</div>
                        <div className="text-[7.5px] font-sans font-bold uppercase tracking-[0.25em] text-[#3D2310]">MERİÇ - EDİRNE</div>
                        <div className="text-[6.5px] font-serif italic mt-0.5 text-[#3D2310]">Rustic Engraved Heritage Box</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    {lang === 'en'
                      ? 'Rustic engraved cheese box with precision laser burned timber grain for holiday gifting, aged Kashar, and reserve cheeses.'
                      : 'Doğal çam ve meşe ahşap sandık üzerine mikron hassasiyetli lazer yakma logo baskısı; eski kaşar ve özel hediye paketleri.'}
                  </p>
                </div>

                {/* Touchpoint 4: Kraft Retail Packaging Bag */}
                <div className="p-6 rounded-3xl bg-[#C8A97E] text-[#162E40] border border-[#A6885F] shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#162E40]">
                      RETAIL PACKAGING
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#162E40]/15 text-[#162E40]">
                      Doğal Kraft Çanta
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-black">
                    {lang === 'en' ? 'Eco-Friendly Kraft Packaging' : 'Çevre Dostu Kraft Alışveriş Çantası'}
                  </h4>

                  {/* Kraft Bag Visual Mockup */}
                  <div className="h-56 rounded-2xl bg-[#B8966A] flex items-center justify-center relative overflow-hidden border border-[#9A774D] p-4">
                    {/* Paper bag structure */}
                    <div className="w-40 h-44 bg-[#C8A97E] rounded-t-lg rounded-b-sm border border-[#A6885F] shadow-2xl p-4 flex flex-col items-center justify-center text-center relative">
                      {/* Bag fold line */}
                      <div className="absolute top-0 inset-x-0 h-4 bg-[#B8966A] border-b border-[#A6885F]" />
                      
                      {/* Marine printed branding */}
                      <div className="flex flex-col items-center mt-3">
                        <AdaLogoMark size={48} theme="kraft" idSuffix="kraft-mockup" />
                        <div className="font-serif font-black text-xs tracking-tight mt-1 text-[#162E40]">ADA ÇİFTLİĞİ</div>
                        <div className="text-[7.5px] font-sans font-bold uppercase tracking-widest text-[#24455E]">MERİÇ - EDİRNE</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-800 leading-relaxed">
                    {lang === 'en'
                      ? 'Kraft packaging for retail bags with deep marine navy screen-printed branding for organic farm-to-table shopping.'
                      : 'Geri dönüştürülebilir ham kraft kese kağıdı ve poşetler üzerinde tek renk koyu lacivert serigrafi çiftlik baskısı.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAVICON & DIGITAL ELEMENTS */}
          {activeTab === 'favicons' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#121E15] border border-stone-800 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">
                    Favicon &amp; Digital Elements (Kılavuz Boyutları)
                  </span>
                  <h3 className="text-xl font-serif font-black text-white mt-1">
                    {lang === 'en' ? 'Micro-Scale Fidelity & AÇ Monogram' : 'Mikro Ölçekli Faviconlar & AÇ Monogramı'}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    {lang === 'en'
                      ? 'Optimized down to 16x16px and 32x32px so the brand retains unmistakable contrast in browser tabs, mobile homescreens, and push notifications.'
                      : '16x16px ve 32x32px boyutlarında tarayıcı sekmeleri ve mobil bildirimlerde yüksek tanınabilirlik sağlayan simgeler.'}
                  </p>
                </div>

                {/* The 3 Favicon Blocks from the presentation */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Favicon 1: 16x16px Navy AÇ Monogram */}
                  <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-xl bg-[#162E40] border border-white/20 flex items-center justify-center shadow-lg">
                      <AdaLogoMonogram size={38} theme="light" />
                    </div>
                    <div className="font-mono text-xs font-bold text-[#DFC07F]">16x16px</div>
                    <div className="text-xs font-semibold text-white">Navy AÇ Monogram</div>
                    <p className="text-[11px] text-stone-400 leading-tight">
                      {lang === 'en' ? 'Browser tab favicon and small bookmarks' : 'Tarayıcı sekmesi ve yer imi simgesi'}
                    </p>
                  </div>

                  {/* Favicon 2: 32x32px Navy Bridge + Animals */}
                  <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-xl bg-[#162E40] border border-white/20 flex items-center justify-center shadow-lg p-1">
                      <AdaLogoMark size={44} theme="light" idSuffix="fav-32-navy" />
                    </div>
                    <div className="font-mono text-xs font-bold text-[#DFC07F]">32x32px</div>
                    <div className="text-xs font-semibold text-white">Navy Arched Bridge</div>
                    <p className="text-[11px] text-stone-400 leading-tight">
                      {lang === 'en' ? 'Desktop bookmarks, Chrome tab icon' : 'Masaüstü yüksek çözünürlüklü sekme ikonu'}
                    </p>
                  </div>

                  {/* Favicon 3: 32x32px Gold Bridge + River */}
                  <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-xl bg-[#C5A059] border border-[#DFC07F] flex items-center justify-center shadow-lg p-1">
                      <AdaLogoMark size={44} theme="navy" idSuffix="fav-32-gold" />
                    </div>
                    <div className="font-mono text-xs font-bold text-[#C5A059]">32x32px</div>
                    <div className="text-xs font-semibold text-white">Gold Accent Bridge</div>
                    <p className="text-[11px] text-stone-400 leading-tight">
                      {lang === 'en' ? 'PWA icon, iOS home screen badge' : 'PWA ve iOS ana ekran lüks uygulama rozeti'}
                    </p>
                  </div>
                </div>

                {/* Large Stylized AÇ Monogram Display */}
                <div className="p-6 rounded-2xl bg-[#FAF8F3] text-[#162E40] border border-[#D5C6AC] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
                      Stylized Monogram Architecture
                    </div>
                    <h4 className="text-2xl font-serif font-black">
                      {lang === 'en' ? 'Intertwined "AÇ" Heritage Ligature' : 'Geometrik "AÇ" Kurumsal Ligatürü'}
                    </h4>
                    <p className="text-xs text-stone-600 max-w-md">
                      {lang === 'en'
                        ? 'The classical serif "A" merges directly with the sweeping curvature of "Ç", creating a distinctive hallmark for seals, wax stamps, and watermarks.'
                        : 'Serif "A" harfi ile altından geçen "Ç" yayının birleşimiyle üretilen tescilli ligatür; balmumu mühürler ve filigranlar için mükemmeldir.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#162E40] border border-[#C5A059]/40 shadow-xl shrink-0">
                    <AdaLogoMonogram size={90} theme="light" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COLOR SWATCHES */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">
                  Official Color Swatches (Pantone &amp; Panval)
                </span>
                <h3 className="text-xl font-serif font-black text-white mt-1">
                  {lang === 'en' ? 'Brand Color Palette & Print Codes' : 'Kurumsal Renk Kodları & Baskı Standartları'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {officialColorSwatches.map((color, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-stone-800 bg-[#121E15] overflow-hidden shadow-md flex flex-col"
                  >
                    {/* Swatch Preview Block */}
                    <div
                      className="h-28 flex items-end p-3 border-b border-black/10"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className={`text-xs font-mono font-extrabold px-2 py-1 rounded bg-black/40 text-white backdrop-blur-xs`}>
                        {color.hex}
                      </span>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mono font-bold text-[#C5A059]">{color.code}</div>
                        <div className="text-sm font-bold text-white">{color.name}</div>
                        <p className="text-xs text-stone-400 mt-1 leading-relaxed">{color.desc}</p>
                      </div>

                      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
                        <span>{color.cmyk}</span>
                        <span>{color.rgb}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: VECTOR SVG ASSETS EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">
                  Vector SVG Downloads &amp; Integration
                </span>
                <h3 className="text-xl font-serif font-black text-white mt-1">
                  {lang === 'en' ? 'Production Vector File Library' : 'Baskı ve Dijital Vektör Dosya Kütüphanesi'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Ada Çiftliği Master Logo (Yüksek Çözünürlüklü PNG)',
                    file: 'ada-ciftligi-logo.png',
                    url: '/logo.png',
                    desc: '2833x833 piksel şeffaf arka planlı, 300 DPI baskı ve dijital sunumlar için şeffaf PNG.',
                  },
                  {
                    title: 'Ada Çiftliği Master Logo (Yatay Vektörel)',
                    file: 'ada-ciftligi-logo.svg',
                    url: '/logo.svg',
                    desc: 'Web sitesi başlığı, faturalar ve resmi belgeler için yatay amblem + tipografi düzeni.',
                  },
                  {
                    title: 'Meriç Amblemi (Tekil Rozet)',
                    file: 'ada-ciftligi-mark.svg',
                    url: '/logo-mark.svg',
                    desc: 'Tarihi taş köprü, nehir ve hayvanlar kompozisyonunu içeren kemerli bağımsız amblem.',
                  },
                  {
                    title: 'AÇ Monogram Favicon (SVG)',
                    file: 'favicon.svg',
                    url: '/favicon.svg',
                    desc: '16px / 32px uyumlu tescilli AÇ ligatürü tarayıcı faviconu ve uygulama ikonu.',
                  },
                  {
                    title: 'Altın Varak Şişe Kapağı & Mühür (SVG)',
                    file: 'ada-ciftligi-seal.svg',
                    url: '/logo-seal.svg',
                    desc: 'Cam şişe kapağı, peynir ambalajı ve damgalar için dairesel metalik mühür.',
                  },
                ].map((asset, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#121E15] border border-stone-800 flex flex-col justify-between space-y-4 hover:border-stone-700 transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="text-xs font-mono font-bold text-[#C5A059]">{asset.file}</div>
                      <div className="text-sm font-bold text-white">{asset.title}</div>
                      <p className="text-xs text-stone-400 leading-relaxed">{asset.desc}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleDownloadFile(asset.file, asset.url)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#162E40] text-white text-xs font-bold hover:bg-[#102230] transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                        {lang === 'en' ? 'Download' : 'İndir'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopySvg(asset.file, asset.url)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
                      >
                        {copiedKey === asset.file ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedKey === asset.file ? (lang === 'en' ? 'Copied' : 'Kopyalandı') : (lang === 'en' ? 'Copy SVG' : 'Kopyala')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-800 bg-[#121E15]/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Meriç / Edirne · Tescilli Vektör Kimlik Mimarisi · 1954'ten Beri</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold cursor-pointer transition-colors"
            >
              {lang === 'en' ? 'Close Presentation' : 'Sunumu Kapat'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
