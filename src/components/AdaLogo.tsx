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
  theme = 'navy',
  className = '',
  animated = false,
  idSuffix = 'mark',
}) => {
  const isLight = theme === 'light'; // White/light on dark backgrounds
  const isDark = theme === 'dark';   // Dark navy on light
  const isGold = theme === 'gold';
  const isKraft = theme === 'kraft';
  const isMono = theme === 'monochrome';
  const isFullColor = !isLight && !isGold && !isKraft && !isMono;

  // Palette resolution
  const primaryNavy = isMono ? 'currentColor' : isLight ? '#FFFFFF' : isGold ? '#5C3C10' : isKraft ? '#162E40' : '#0C2340';
  const secondaryGold = isMono ? 'currentColor' : isLight ? '#DFC07F' : isGold ? '#C5A059' : '#B39268';
  const riverColor = isMono ? 'currentColor' : isLight ? '#72A7C4' : isKraft ? '#24455E' : '#7FBDE3';
  const animalWhite = isLight ? '#FFFFFF' : isKraft ? '#EFE2CE' : '#FFFFFF';
  const skyFill = isFullColor
    ? `url(#ada-sky-grad-${idSuffix})`
    : isLight
    ? 'rgba(255,255,255,0.06)'
    : isKraft
    ? 'transparent'
    : '#89C4F4';
  const bridgeFill = isFullColor ? '#A68C6A' : isMono ? 'currentColor' : isLight ? '#FFFFFF' : isKraft ? '#162E40' : '#A68C6A';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none shrink-0 ${animated ? 'group-hover:scale-105 transition-transform duration-300' : ''} ${className}`}
      aria-label="Ada Çiftliği Amblemi"
    >
      <defs>
        {/* Full 360-degree circle clip path matching official logo */}
        <clipPath id={`ada-circle-clip-${idSuffix}`}>
          <circle cx="100" cy="100" r="77.5" />
        </clipPath>

        <linearGradient id={`ada-sky-grad-${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#72ABDE" />
          <stop offset="55%" stopColor="#89C4F4" />
          <stop offset="100%" stopColor="#A8D5F8" />
        </linearGradient>

        <linearGradient id={`ada-river-grad-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#68A5D0" />
          <stop offset="60%" stopColor="#7FBDE3" />
          <stop offset="100%" stopColor="#9BD2F2" />
        </linearGradient>

        <linearGradient id={`ada-grass-grad-${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6DBA35" />
          <stop offset="35%" stopColor="#489F26" />
          <stop offset="100%" stopColor="#256B1E" />
        </linearGradient>
      </defs>

      {/* 1. Outer Warm Gold / Tan Ring */}
      <circle
        cx="100"
        cy="100"
        r="87"
        stroke={secondaryGold}
        strokeWidth="5"
        fill="none"
      />

      {/* 2. Pure White Separation Ring */}
      <circle
        cx="100"
        cy="100"
        r="83"
        stroke={isLight ? 'rgba(255,255,255,0.2)' : isKraft ? '#EFE2CE' : '#FFFFFF'}
        strokeWidth="3.5"
        fill="none"
      />

      {/* 3. Inner Dark Navy Ring */}
      <circle
        cx="100"
        cy="100"
        r="79.5"
        stroke={primaryNavy}
        strokeWidth="3.6"
        fill={isFullColor ? '#89C4F4' : 'none'}
      />

      {/* INNER SCENE (CLIPPED TO FULL CIRCLE) */}
      <g clipPath={`url(#ada-circle-clip-${idSuffix})`} transform="translate(-15, 0)">
        {/* Sky / Atmosphere Background */}
        <rect x="20" y="10" width="190" height="190" fill={skyFill} />

        {/* ------------------------------------------------------------- */}
        {/* HISTORIC MERİÇ STONE BRIDGE (EDİRNE)                           */}
        {/* ------------------------------------------------------------- */}
        <g id={`bridge-${idSuffix}`}>
          <path
            d="M 25 88 L 195 88 L 195 68 L 25 68 Z"
            fill={bridgeFill}
            stroke={primaryNavy}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M 25 68 L 195 68 L 195 64 L 25 64 Z"
            fill={isFullColor ? '#BCA482' : bridgeFill}
            stroke={primaryNavy}
            strokeWidth="1.8"
          />

          {/* Central Kitabe Köşkü (Pavilion) */}
          <path
            d="M 108 64 L 108 52 L 115 42 L 122 52 L 122 64 Z"
            fill={bridgeFill}
            stroke={primaryNavy}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M 105 52 L 115 42 L 125 52 Z"
            fill={isFullColor ? '#8C7150' : bridgeFill}
            stroke={primaryNavy}
            strokeWidth="2"
          />
          <path
            d="M 112 59 L 112 54 A 3 3 0 0 1 118 54 L 118 59 Z"
            fill={isFullColor ? '#89C4F4' : skyFill}
            stroke={primaryNavy}
            strokeWidth="1.4"
          />
          <circle cx="115" cy="40.5" r="1.8" fill={secondaryGold} stroke={primaryNavy} strokeWidth="1" />

          {/* 5 Classic Stone Arches */}
          <path d="M 35 88 A 7 7 0 0 1 49 88 Z" fill={isFullColor ? '#89C4F4' : skyFill} stroke={primaryNavy} strokeWidth="2" />
          <path d="M 58 88 A 9 9 0 0 1 76 88 Z" fill={isFullColor ? '#89C4F4' : skyFill} stroke={primaryNavy} strokeWidth="2" />
          <path d="M 86 88 A 11 11 0 0 1 108 88 Z" fill={isFullColor ? '#89C4F4' : skyFill} stroke={primaryNavy} strokeWidth="2" />
          <path d="M 118 88 A 9 9 0 0 1 136 88 Z" fill={isFullColor ? '#7FBDE3' : riverColor} stroke={primaryNavy} strokeWidth="2" />
          <path d="M 146 88 A 7 7 0 0 1 160 88 Z" fill={isFullColor ? '#7FBDE3' : riverColor} stroke={primaryNavy} strokeWidth="2" />

          <line x1="53.5" y1="88" x2="53.5" y2="76" stroke={primaryNavy} strokeWidth="1.8" />
          <line x1="81" y1="88" x2="81" y2="74" stroke={primaryNavy} strokeWidth="1.8" />
          <line x1="113" y1="88" x2="113" y2="74" stroke={primaryNavy} strokeWidth="1.8" />
          <line x1="141" y1="88" x2="141" y2="76" stroke={primaryNavy} strokeWidth="1.8" />
        </g>

        {/* Rolling Hills in Distance */}
        <path
          d="M 25 106 Q 75 92 120 102 L 120 170 L 25 170 Z"
          fill={isFullColor ? '#68B936' : isLight ? '#1C3A2A' : '#4C86A8'}
          stroke={primaryNavy}
          strokeWidth="1.5"
        />
        <path
          d="M 120 102 Q 155 94 195 100 L 195 170 L 120 170 Z"
          fill={isFullColor ? '#5BA82D' : isLight ? '#173022' : '#356784'}
          stroke={primaryNavy}
          strokeWidth="1.5"
        />

        {/* Meriç River Meander */}
        <g id={`river-${idSuffix}`}>
          <path
            d="M 124 88 
               C 134 96, 146 102, 142 114 
               C 136 126, 144 136, 186 150 
               L 128 170 
               C 126 155, 126 142, 134 132 
               C 140 120, 128 108, 114 88 Z"
            fill={isFullColor ? `url(#ada-river-grad-${idSuffix})` : riverColor}
            stroke={primaryNavy}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M 134 96 C 141 103, 144 109, 139 116 C 134 123, 142 131, 158 138"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M 132 118 C 137 124, 137 130, 142 136 C 146 142, 156 147, 174 150"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
        </g>

        {/* Foreground Lush Pasture */}
        <path
          d="M 25 120 
             C 55 114, 90 116, 115 124 
             C 120 126, 122 138, 118 152 
             C 114 162, 118 170, 120 172 
             L 25 172 Z"
          fill={isFullColor ? `url(#ada-grass-grad-${idSuffix})` : isLight ? '#2A523A' : '#1E4E2B'}
          stroke={primaryNavy}
          strokeWidth="2"
        />

        {/* Grass Blades */}
        <g stroke={isFullColor ? '#1A5E16' : primaryNavy} strokeWidth="1.4" strokeLinecap="round">
          <line x1="38" y1="168" x2="40" y2="156" />
          <line x1="45" y1="168" x2="48" y2="158" />
          <line x1="52" y1="170" x2="55" y2="160" />
          <line x1="60" y1="170" x2="62" y2="158" />
          <line x1="65" y1="168" x2="68" y2="157" />
          <line x1="72" y1="170" x2="74" y2="162" />
          <line x1="80" y1="170" x2="82" y2="158" />
          <line x1="86" y1="170" x2="88" y2="160" />
          <line x1="94" y1="170" x2="96" y2="159" />
          <line x1="102" y1="170" x2="105" y2="162" />
          <line x1="110" y1="170" x2="112" y2="163" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* ANIMALS: COW, SHEEP, DUCK                                     */}
        {/* ------------------------------------------------------------- */}

        {/* 1. Holstein Dairy Cow */}
        <g id={`cow-${idSuffix}`}>
          <path
            d="M 44 165 L 48 165 L 49 146 L 54 146 L 55 165 L 60 165 L 61 138 
               L 89 138 L 90 165 L 95 165 L 96 144 L 99 144 L 100 165 L 105 165 
               L 106 128 C 106 123, 102 117, 96 115 L 96 109 C 96 104, 91 102, 87 104 
               L 82 106 L 77 104 C 73 102, 69 104, 69 108 L 69 112 
               C 58 112, 48 114, 44 122 C 40 130, 40 144, 44 165 Z"
            fill={animalWhite}
            stroke={primaryNavy}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path d="M 52 142 C 54 147, 58 147, 60 142" fill={isFullColor ? '#F7D0D4' : animalWhite} stroke={primaryNavy} strokeWidth="1.5" />
          <path d="M 80 102 L 83 96 L 86 100" stroke={primaryNavy} strokeWidth="2.4" fill={secondaryGold} strokeLinejoin="round" />
          <path d="M 72 102 L 70 96 L 74 99" stroke={primaryNavy} strokeWidth="2.4" fill={secondaryGold} strokeLinejoin="round" />
          <ellipse cx="67" cy="107" rx="3.5" ry="2" fill={animalWhite} stroke={primaryNavy} strokeWidth="1.8" transform="rotate(-20 67 107)" />
          <ellipse cx="88" cy="107" rx="3.5" ry="2" fill={animalWhite} stroke={primaryNavy} strokeWidth="1.8" transform="rotate(20 88 107)" />
          <circle cx="83" cy="111" r="2.2" fill={primaryNavy} />
          <circle cx="83.8" cy="110.2" r="0.8" fill={animalWhite} />
          <path d="M 88 114 C 92 115, 93 118, 91 121 C 88 123, 84 122, 82 120" fill={isFullColor ? '#F7D0D4' : animalWhite} stroke={primaryNavy} strokeWidth="1.8" />
          <circle cx="87" cy="118" r="0.9" fill={primaryNavy} />
          <circle cx="90" cy="118.5" r="0.9" fill={primaryNavy} />
          <path d="M 84 120 C 86 122, 88 122, 90 120" stroke={primaryNavy} strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Black Holstein Patches */}
          <path d="M 72 110 C 76 108, 81 110, 81 114 C 80 119, 74 122, 69 119 C 67 116, 68 112, 72 110 Z" fill={primaryNavy} />
          <path d="M 54 119 C 64 117, 72 121, 68 128 C 64 133, 56 132, 51 126 C 49 122, 51 120, 54 119 Z" fill={primaryNavy} />
          <path d="M 43 125 C 47 123, 49 128, 48 133 C 45 136, 42 131, 43 125 Z" fill={primaryNavy} />
          <path d="M 41 129 C 39 135, 40 144, 42 149" stroke={primaryNavy} strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="42.5" cy="150.5" rx="2.5" ry="1.5" fill={primaryNavy} />
        </g>

        {/* 2. Kıvırcık Sheep */}
        <g id={`sheep-${idSuffix}`}>
          <path
            d="M 64 165 L 67 165 L 68 152 L 72 152 L 73 165 L 77 165 L 78 148 
               L 86 148 L 87 165 L 91 165 L 92 150 L 96 150 L 97 165 L 101 165 
               L 102 142 
               C 102 139, 100 137, 102 134 
               C 104 131, 102 126, 98 126 
               C 96 124, 94 124, 92 126 
               C 89 123, 85 123, 82 125 
               C 79 123, 75 124, 73 126 
               C 68 126, 66 130, 65 134 
               C 63 138, 63 146, 64 165 Z"
            fill={animalWhite}
            stroke={primaryNavy}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M 70 133 C 72 130, 76 131, 77 134" stroke={primaryNavy} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M 78 131 C 81 129, 85 130, 86 133" stroke={primaryNavy} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M 72 140 C 75 138, 79 139, 80 142" stroke={primaryNavy} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M 82 138 C 85 136, 89 137, 90 140" stroke={primaryNavy} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M 94 130 C 99 128, 104 131, 104 135 C 104 138, 99 140, 95 138 Z" fill={animalWhite} stroke={primaryNavy} strokeWidth="2.2" />
          <circle cx="100" cy="133" r="1.6" fill={primaryNavy} />
          <circle cx="100.5" cy="132.5" r="0.6" fill={animalWhite} />
          <path d="M 93 132 C 91 134, 91 137, 93 139" stroke={primaryNavy} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M 102 136 C 103 137, 104 136.5, 104 136" stroke={primaryNavy} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </g>

        {/* 3. Riverside Duck */}
        <g id={`duck-${idSuffix}`}>
          <path
            d="M 112 165 L 115 165 L 116 156 L 120 156 L 121 165 L 124 165 L 125 154 
               C 129 153, 134 149, 136 144 
               C 136 140, 131 139, 126 141 
               C 124 138, 122 134, 121 130 
               C 119 127, 116 127, 114 128 
               L 109 130 
               C 111 132, 113 135, 114 140 
               C 112 146, 110 152, 112 165 Z"
            fill={isFullColor ? '#A67C52' : secondaryGold}
            stroke={primaryNavy}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {isFullColor && (
            <path d="M 115 132 C 117 131, 120 131, 121 134 C 119 136, 116 136, 115 134 Z" fill="#2E7D32" />
          )}
          <path d="M 113 130 L 107 131 L 113 133 Z" fill={isFullColor ? '#F39C12' : secondaryGold} stroke={primaryNavy} strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="116" cy="130" r="1.3" fill={primaryNavy} />
          <circle cx="116.4" cy="129.6" r="0.5" fill={animalWhite} />
          <path d="M 118 144 C 124 142, 128 144, 131 149" stroke={primaryNavy} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M 134 143 C 136 141, 138 142, 137 145" stroke={primaryNavy} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </svg>
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
