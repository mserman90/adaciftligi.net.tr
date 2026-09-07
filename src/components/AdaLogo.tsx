import React from 'react';

export type LogoVariant = 'mark' | 'horizontal' | 'stacked' | 'seal' | 'monogram' | 'official';
export type LogoTheme = 'navy' | 'gold' | 'light' | 'dark' | 'kraft' | 'monochrome' | 'auto';

export interface AdaLogoProps {
  variant?: LogoVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  theme?: LogoTheme;
  className?: string;
  lang?: 'tr' | 'en';
  showSubtitle?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

/**
 * ADA ÇİFTLİĞİ OFFICIAL COLOR PALETTE
 * Matched to presentation swatches:
 * - PANTONE EF12353 (Warm Antique Gold): #C5A059
 * - PANVAL 0000020 (Deep Navy Blue): #162E40
 * - PANTONE 004576 (Prussian Navy): #1A364E
 * - River Blue (Meriç River Waters): #4C86A8
 * - Pure Milk: #FFFFFF
 */
export const ADA_BRAND_COLORS = {
  navy: '#162E40',
  navyDark: '#102230',
  navyLight: '#24455E',
  gold: '#C5A059',
  goldLight: '#DFC07F',
  goldDark: '#9F7C38',
  riverBlue: '#4C86A8',
  riverBlueLight: '#72A7C4',
  riverBlueDark: '#356784',
  milkWhite: '#FFFFFF',
  cream: '#FAF8F3',
  kraftPaper: '#C8A97E',
  kraftPrint: '#162E40',
  woodEngrave: '#4A2F1A',
};

/**
 * 1. ADA ÇİFTLİĞİ MASTER EMBLEM (MARK)
 * Arched dome emblem featuring:
 * - The historic 5-arch Meriç Stone Bridge with central Kitabe Köşkü (Pavilion)
 * - The flowing S-curve Meriç River in vivid river blue with white wave currents
 * - The black & white Holstein dairy cow
 * - The fluffy Kıvırcık lamb/sheep
 * - The riverside duck/waterfowl
 * - Double-stroke navy circular arch enclosure
 */
export const AdaLogoMark: React.FC<{
  size?: number;
  theme?: LogoTheme;
  className?: string;
  animated?: boolean;
  idSuffix?: string;
}> = ({
  size = 48,
  className = '',
  animated = false,
}) => {
  return (
    <img
      src="/logo-mark.svg"
      alt="Ada Çiftliği Amblemi"
      width={size}
      height={size}
      className={`select-none shrink-0 object-contain ${animated ? 'group-hover:scale-105 transition-transform duration-300' : ''} ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      referrerPolicy="no-referrer"
    />
  );
};


/**
 * 2. ADA ÇİFTLİĞİ "AÇ" STYLIZED MONOGRAM
 * As seen in the "Favicon & Digital Elements" quadrant:
 * - Classical serif capital 'A'
 * - Intertwined capital 'Ç' with graceful curvature and cedilla
 * - Ideal for 16x16px, 32x32px favicons, watermarks, stamps & app icons
 */
export const AdaLogoMonogram: React.FC<{
  size?: number;
  theme?: LogoTheme;
  className?: string;
  withBackground?: boolean;
}> = ({
  size = 32,
  theme = 'navy',
  className = '',
  withBackground = false,
}) => {
  const isLight = theme === 'light';
  const isGold = theme === 'gold';
  const isKraft = theme === 'kraft';

  const bgColor = isGold ? '#C5A059' : isKraft ? '#C8A97E' : '#162E40';
  const strokeColor = withBackground
    ? isGold
      ? '#162E40'
      : '#FFFFFF'
    : isLight
    ? '#FFFFFF'
    : isGold
    ? '#C5A059'
    : '#162E40';

  const svgInner = (
    <g transform="translate(10, 8) scale(0.8)">
      {/* Capital 'A' */}
      {/* Left Stile */}
      <path
        d="M 46 22 L 20 84 L 32 84 L 43 56 L 57 56 L 68 84 L 80 84 L 54 22 Z"
        fill={strokeColor}
      />
      {/* Inner Triangle Counter */}
      <polygon points="50,38 45,51 55,51" fill={withBackground ? bgColor : '#FFFFFF'} />

      {/* Capital 'Ç' Intertwined */}
      <path
        d="M 76 46 
           C 82 50, 86 56, 85 64 
           C 84 72, 78 78, 68 82 
           C 58 86, 46 86, 38 82 
           L 41 76 
           C 48 79, 57 80, 64 77 
           C 71 74, 76 69, 76 63 
           C 76 58, 72 54, 66 52 Z"
        fill={strokeColor}
      />
      {/* Cedilla Tail of 'Ç' */}
      <path
        d="M 64 83 C 65 88, 62 93, 58 95 L 61 97 C 67 95, 71 89, 69 83 Z"
        fill={strokeColor}
      />

      {/* Serif Details */}
      {/* Apex finial */}
      <path d="M 44 22 L 56 22" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      {/* Foot serifs */}
      <line x1="16" y1="84" x2="34" y2="84" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="66" y1="84" x2="84" y2="84" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );

  if (withBackground) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none shrink-0 ${className}`}
        aria-label="Ada Çiftliği Monogram İkon"
      >
        <rect width="100" height="100" rx="22" fill={bgColor} />
        {svgInner}
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none shrink-0 ${className}`}
      aria-label="Ada Çiftliği AÇ Monogram"
    >
      {svgInner}
    </svg>
  );
};

/**
 * 3. BRANDED GOLD-FINISHED METAL CAP / CIRCULAR HERITAGE SEAL
 * As shown in the "Product & Packaging Touchpoints" quadrant:
 * - "Branded gold-finished metal cap for the logo from a tiny scale"
 * - Embossed circular ring with concentric bevels
 * - Master emblem centered on warm gold finish
 */
export const AdaLogoSeal: React.FC<{
  size?: number;
  theme?: LogoTheme;
  className?: string;
  lang?: 'tr' | 'en';
  animated?: boolean;
}> = ({
  size = 80,
  theme = 'gold',
  className = '',
  lang = 'tr',
  animated = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full select-none shadow-lg ${
        animated ? 'hover:rotate-6 hover:scale-105 transition-all duration-300' : ''
      } ${className}`}
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 35% 30%, #F5E2B3 0%, #C5A059 45%, #9B7836 85%, #6E511E 100%)',
        border: `${Math.max(2, Math.round(size * 0.035))}px solid #DFC07F`,
        boxShadow: '0 4px 14px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -3px 6px rgba(0,0,0,0.4)',
      }}
      title={lang === 'en' ? 'Branded gold-finished bottle cap & seal' : 'Ada Çiftliği Varak Baskı Metal Şişe Kapağı & Mührü'}
    >
      {/* Concentric inner debossed ring */}
      <div
        className="rounded-full flex items-center justify-center border border-[#DFC07F]/80 p-1 shadow-inner"
        style={{ width: size * 0.82, height: size * 0.82 }}
      >
        <AdaLogoMark size={Math.round(size * 0.65)} theme="navy" idSuffix="seal-cap" />
      </div>
    </div>
  );
};

/**
 * 4. COMPOSITE ADA ÇİFTLİĞİ LOGO (PRIMARY COMPONENT)
 * Supports:
 * - variant="mark": Just the arched emblem
 * - variant="horizontal": Arched emblem on left + "ADA ÇİFTLİĞİ" + "MERİÇ - EDİRNE"
 * - variant="stacked": Arched emblem on top + "ADA ÇİFTLİĞİ" + "MERİÇ - EDİRNE" + "Premium Farm Products · Since 1954"
 * - variant="monogram": The AÇ ligature
 * - variant="seal": The gold-finished metal cap / seal
 */
export const AdaLogo: React.FC<AdaLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'navy',
  className = '',
  lang = 'tr',
  showSubtitle = true,
  animated = false,
  onClick,
}) => {
  // Size resolution
  const numericSize =
    typeof size === 'number'
      ? size
      : {
          xs: 28,
          sm: 38,
          md: 48,
          lg: 64,
          xl: 84,
          '2xl': 110,
        }[size];

  const isLight = theme === 'light';
  const isGold = theme === 'gold';
  const isKraft = theme === 'kraft';

  const textColor = isLight
    ? 'text-white'
    : isGold
    ? 'text-[#C5A059]'
    : isKraft
    ? 'text-[#162E40]'
    : 'text-[#162E40] dark:text-white';

  const subColor = isLight
    ? 'text-stone-300'
    : isGold
    ? 'text-[#DFC07F]'
    : isKraft
    ? 'text-[#2C495E]'
    : 'text-[#4C86A8] dark:text-[#72A7C4]';

  const tagColor = isLight
    ? 'text-amber-300'
    : isGold
    ? 'text-[#9F7C38]'
    : isKraft
    ? 'text-[#4A2F1A]'
    : 'text-stone-500 dark:text-stone-400';

  // Standalone Mark
  if (variant === 'mark') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center justify-center p-0 border-0 bg-transparent ${onClick ? 'cursor-pointer' : ''} ${className}`}
        tabIndex={onClick ? 0 : -1}
      >
        <AdaLogoMark size={numericSize} theme={theme} animated={animated} />
      </button>
    );
  }

  // Monogram
  if (variant === 'monogram') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center justify-center p-0 border-0 bg-transparent ${onClick ? 'cursor-pointer' : ''} ${className}`}
        tabIndex={onClick ? 0 : -1}
      >
        <AdaLogoMonogram size={numericSize} theme={theme} withBackground />
      </button>
    );
  }

  // Heritage Seal
  if (variant === 'seal') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center justify-center p-0 border-0 bg-transparent ${onClick ? 'cursor-pointer' : ''} ${className}`}
        tabIndex={onClick ? 0 : -1}
      >
        <AdaLogoSeal size={numericSize} theme={theme} lang={lang} animated={animated} />
      </button>
    );
  }

  // Stacked Logo (Centered Composition)
  if (variant === 'stacked') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center text-center gap-2 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      >
        <AdaLogoMark size={Math.round(numericSize * 1.3)} theme={theme} animated={animated} />
        
        <div className="flex flex-col items-center">
          <span
            className={`font-serif font-black tracking-tight leading-none ${textColor}`}
            style={{ fontSize: `${Math.round(numericSize * 0.44)}px` }}
          >
            {lang === 'en' ? 'ADA FARM' : 'ADA ÇİFTLİĞİ'}
          </span>

          {showSubtitle && (
            <span
              className={`font-sans font-bold uppercase tracking-[0.28em] mt-1.5 ${subColor}`}
              style={{ fontSize: `${Math.max(9, Math.round(numericSize * 0.17))}px` }}
            >
              {lang === 'en' ? 'MERIC - EDIRNE' : 'MERİÇ - EDİRNE'}
            </span>
          )}

          <span
            className={`font-serif italic font-medium mt-1 tracking-wide ${tagColor}`}
            style={{ fontSize: `${Math.max(9, Math.round(numericSize * 0.16))}px` }}
          >
            {lang === 'en' ? 'Premium Farm Products · Since 1954' : 'Doğal Çiftlik Ürünleri · 1954\'ten Beri'}
          </span>
        </div>
      </div>
    );
  }

  // Official Full Lockup (Matching User Uploaded Graphic Precisely)
  if (variant === 'official') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center text-center select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      >
        <AdaLogoMark size={numericSize} theme={theme} animated={animated} idSuffix="official-lockup" />

        <div className="flex flex-col items-center mt-2.5">
          <span
            className={`font-serif font-black tracking-tight leading-tight ${textColor}`}
            style={{ fontSize: `${Math.round(numericSize * 0.38)}px` }}
          >
            {lang === 'en' ? 'ADA FARM' : 'ADA ÇİFTLİĞİ'}
          </span>

          <span
            className={`font-sans font-extrabold uppercase tracking-[0.26em] mt-1 ${subColor}`}
            style={{ fontSize: `${Math.max(9, Math.round(numericSize * 0.15))}px` }}
          >
            {lang === 'en' ? 'MERİÇ - EDİRNE' : 'MERİÇ - EDİRNE'}
          </span>

          <div
            className="w-16 h-[1.5px] my-1.5 rounded-full"
            style={{ backgroundColor: isLight ? '#DFC07F' : '#C5A059' }}
          />

          <span
            className={`font-serif italic font-medium tracking-wide ${tagColor}`}
            style={{ fontSize: `${Math.max(9, Math.round(numericSize * 0.14))}px` }}
          >
            {lang === 'en' ? 'Premium Farm Products · Since 1954' : 'Doğal Çiftlik Ürünleri · 1954\'ten Beri'}
          </span>
        </div>
      </div>
    );
  }

  // Horizontal Master Logo (Navbar & Header Standard)
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3.5 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      <AdaLogoMark size={numericSize} theme={theme} animated={animated} />

      <div className="flex flex-col justify-center">
        <span
          className={`font-serif font-black tracking-tight leading-none ${textColor}`}
          style={{ fontSize: `${Math.max(16, Math.round(numericSize * 0.44))}px` }}
        >
          {lang === 'en' ? 'ADA FARM' : 'ADA ÇİFTLİĞİ'}
        </span>

        {showSubtitle && (
          <span
            className={`font-sans font-extrabold uppercase tracking-[0.24em] mt-1 leading-none ${subColor}`}
            style={{ fontSize: `${Math.max(9, Math.round(numericSize * 0.19))}px` }}
          >
            {lang === 'en' ? 'MERİÇ - EDİRNE' : 'MERİÇ - EDİRNE'}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * 5. PROMINENT HEADER BRAND IDENTITY
 * Optimized specifically for header/navbar to ensure prominent, crisp visibility
 * matching the user's uploaded official brand identity graphic.
 */
export const AdaOfficialHeaderLogo: React.FC<{
  markSize?: number;
  isCompact?: boolean;
  theme?: LogoTheme;
  className?: string;
  lang?: 'tr' | 'en';
  onClick?: () => void;
  animated?: boolean;
}> = ({
  markSize = 62,
  isCompact = false,
  theme = 'navy',
  className = '',
  lang = 'tr',
  onClick,
  animated = true,
}) => {
  const isLight = theme === 'light';
  const effectiveSize = isCompact ? Math.max(44, Math.round(markSize * 0.8)) : markSize;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 sm:gap-3.5 select-none group ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Prominent circular emblem with gold outer ring & navy inner ring */}
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <AdaLogoMark
          size={effectiveSize}
          theme={theme}
          animated={animated}
          idSuffix="header-prominent"
          className="drop-shadow-xs"
        />
      </div>

      {/* Brand Wordmark & Official Pedigree */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif font-black tracking-tight leading-tight transition-colors ${
            isLight ? 'text-white' : 'text-[#162E40] dark:text-white group-hover:text-[#4C86A8]'
          }`}
          style={{ fontSize: isCompact ? '20px' : '24px' }}
        >
          {lang === 'en' ? 'ADA FARM' : 'ADA ÇİFTLİĞİ'}
        </span>

        <span
          className={`font-sans font-extrabold uppercase tracking-[0.24em] leading-tight mt-0.5 ${
            isLight ? 'text-[#DFC07F]' : 'text-[#4C86A8] dark:text-[#72A7C4]'
          }`}
          style={{ fontSize: isCompact ? '10px' : '11px' }}
        >
          {lang === 'en' ? 'MERİÇ - EDİRNE' : 'MERİÇ - EDİRNE'}
        </span>

        {!isCompact && (
          <span
            className={`hidden md:block font-serif italic font-medium leading-tight mt-0.5 ${
              isLight ? 'text-stone-300' : 'text-[#C5A059] dark:text-[#DFC07F]'
            }`}
            style={{ fontSize: '10px' }}
          >
            {lang === 'en' ? 'Premium Farm Products · Since 1954' : 'Doğal Çiftlik Ürünleri · 1954\'ten Beri'}
          </span>
        )}
      </div>
    </div>
  );
};
