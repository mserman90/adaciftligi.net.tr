import React, { useState, useRef, useEffect, useMemo, createContext, useContext } from 'react';
import { Sparkles, Lightbulb, X, HelpCircle, ArrowUpRight } from 'lucide-react';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossary';

interface GlossaryContextType {
  activeTerm: GlossaryTerm | null;
  targetRect: DOMRect | null;
  openPopover: (term: GlossaryTerm, rect: DOMRect) => void;
  closePopover: () => void;
}

const GlossaryContext = createContext<GlossaryContextType | null>(null);

export const GlossaryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTerm, setActiveTerm] = useState<GlossaryTerm | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openPopover = (term: GlossaryTerm, rect: DOMRect) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveTerm(term);
    setTargetRect(rect);
  };

  const closePopover = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveTerm(null);
      setTargetRect(null);
    }, 200);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const forceClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveTerm(null);
    setTargetRect(null);
  };

  return (
    <GlossaryContext.Provider
      value={{
        activeTerm,
        targetRect,
        openPopover,
        closePopover,
      }}
    >
      {children}
      {activeTerm && targetRect && (
        <FloatingGlossaryPopover
          term={activeTerm}
          targetRect={targetRect}
          onMouseEnter={cancelClose}
          onMouseLeave={closePopover}
          onClose={forceClose}
        />
      )}
    </GlossaryContext.Provider>
  );
};

export function useGlossary() {
  const ctx = useContext(GlossaryContext);
  if (!ctx) {
    throw new Error('useGlossary must be used within a GlossaryProvider');
  }
  return ctx;
}

interface FloatingGlossaryPopoverProps {
  term: GlossaryTerm;
  targetRect: DOMRect;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

const FloatingGlossaryPopover: React.FC<FloatingGlossaryPopoverProps> = ({
  term,
  targetRect,
  onMouseEnter,
  onMouseLeave,
  onClose,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number; placeAbove: boolean }>({
    top: 0,
    left: 0,
    placeAbove: false,
  });

  useEffect(() => {
    const updatePosition = () => {
      const width = Math.min(360, window.innerWidth - 32);
      const height = 280; // approximate height estimate

      let left = targetRect.left + targetRect.width / 2 - width / 2;
      // boundary check left
      if (left < 16) left = 16;
      if (left + width > window.innerWidth - 16) {
        left = window.innerWidth - width - 16;
      }

      // Check if there is enough space below or should place above
      const spaceBelow = window.innerHeight - targetRect.bottom;
      const placeAbove = spaceBelow < height && targetRect.top > height;

      let top = placeAbove ? targetRect.top - 8 : targetRect.bottom + 8;

      setCoords({ top, left, placeAbove });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [targetRect]);

  // Category badge colors
  const categoryStyles: Record<string, string> = {
    'Rasyon & Besleme': 'bg-[#EAF2E8] text-[#2E5B39] border-[#B9C8B0]',
    'Sağlık & Klinik': 'bg-[#FDF2F0] text-[#8A3B2E] border-[#E8BFBA]',
    'Üreme & Doğum': 'bg-[#FBF4E6] text-[#8C6420] border-[#E5D4A8]',
    'Ekonomi & Maliyet': 'bg-[#EFF5F7] text-[#2D5866] border-[#BCD1D8]',
    'Damızlık & Anatomi': 'bg-[#F4EEF7] text-[#583266] border-[#D0BFD9]',
  };

  return (
    <div
      ref={popoverRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: coords.placeAbove ? 'auto' : `${coords.top}px`,
        bottom: coords.placeAbove ? `${window.innerHeight - coords.top}px` : 'auto',
        left: `${coords.left}px`,
        width: `${Math.min(360, window.innerWidth - 32)}px`,
        zIndex: 9999,
      }}
      data-glossary-popover="true"
      className="bg-[#FCFBF6] border-2 border-[#2E5B39] rounded-2xl shadow-2xl p-4 text-[#20261A] text-xs space-y-3 animate-in fade-in zoom-in-95 duration-150 floating-glossary-popover"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-[#DCD7C4] pb-2.5">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold border ${
                categoryStyles[term.category] || 'bg-[#FAF8F0] text-[#6B7160] border-[#DCD7C4]'
              }`}
            >
              {term.category}
            </span>
            <span className="text-[10.5px] font-medium text-[#2E5B39] bg-[#FAF8F0] px-1.5 py-0.5 rounded border border-[#E0DAC9]">
              {term.badge}
            </span>
          </div>
          <h4 className="font-heading font-bold text-sm text-[#20261A] flex items-center gap-1">
            {term.title}
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-[#6B7160] hover:text-[#20261A] hover:bg-[#FAF8F0] rounded-lg cursor-pointer transition-colors"
          title="Kapat"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Short punchy meaning */}
      <p className="font-semibold text-xs text-[#2E5B39] leading-snug">
        “{term.shortMeaning}”
      </p>

      {/* Farmer Explanation */}
      <div className="bg-[#FAF8F0] border border-[#ECE8D8] rounded-xl p-2.5 space-y-1">
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#4B5240]">
          <span className="text-sm">🌾</span>
          <span>Çiftçi Diliyle Açıklama</span>
        </div>
        <p className="text-[11.5px] text-[#4A5240] leading-relaxed">
          {term.farmerExplanation}
        </p>
      </div>

      {/* Practical tip */}
      <div className="bg-[#EAF2E8] border border-[#B9C8B0] rounded-xl p-2.5 space-y-1">
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#2E5B39]">
          <Lightbulb className="w-3.5 h-3.5 text-[#2E5B39]" />
          <span>Sahadan Altın Kural</span>
        </div>
        <p className="text-[11px] text-[#22442B] leading-relaxed">
          {term.practicalTip}
        </p>
      </div>

      <div className="text-right pt-0.5">
        <span className="text-[10px] text-[#858C79] italic font-mono-code">
          Tıklayarak veya dokunarak sabitleyebilirsiniz
        </span>
      </div>
    </div>
  );
};

// Builds a single regex covering all glossary terms sorted by phrase length
function buildGlossaryRegex(): { regex: RegExp; termMap: Map<string, GlossaryTerm> } {
  const termMap = new Map<string, GlossaryTerm>();
  const allPhrases: string[] = [];

  for (const term of GLOSSARY_TERMS) {
    for (const phrase of term.matchTerms) {
      allPhrases.push(phrase);
      termMap.set(phrase.toLowerCase(), term);
      termMap.set(phrase.toLocaleLowerCase('tr-TR'), term);
    }
  }

  // Sort longest first so "Nötral Deterjan Lif" matches before "Lif", "rumen sağlığı" matches before "rumen"
  allPhrases.sort((a, b) => b.length - a.length);

  // Escape regex special chars
  const escapedPhrases = allPhrases.map((p) =>
    p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );

  // Use Turkish-safe boundary lookaheads
  // Word start: must be preceded by start of line or non-alphanumeric
  // Word end: must be followed by end of line or non-alphanumeric
  const pattern = `(?<=^|[^a-zA-ZçÇğĞıİöÖşŞüÜ0-9])(${escapedPhrases.join('|')})(?=[^a-zA-ZçÇğĞıİöÖşŞüÜ0-9]|$)`;
  const regex = new RegExp(pattern, 'gi');

  return { regex, termMap };
}

interface GlossaryTextProps {
  text: string;
  className?: string;
}

export const GlossaryText: React.FC<GlossaryTextProps> = ({ text, className = '' }) => {
  const { openPopover, closePopover } = useGlossary();
  const { regex, termMap } = useMemo(() => buildGlossaryRegex(), []);

  const parts: React.ReactNode[] = [];
  let lastIdx = 0;

  // Split and match safely using exec loop
  const matches: { str: string; index: number }[] = [];
  const currentRegex = new RegExp(regex.source, regex.flags);
  let execResult: RegExpExecArray | null;
  while ((execResult = currentRegex.exec(text)) !== null) {
    matches.push({
      str: execResult[0],
      index: execResult.index,
    });
  }

  if (matches.length === 0) {
    return <span className={className}>{text}</span>;
  }

  matches.forEach((match, index) => {
    const matchStr = match.str;
    const matchStart = match.index;
    const matchEnd = matchStart + matchStr.length;

    // Push preceding text
    if (matchStart > lastIdx) {
      parts.push(text.slice(lastIdx, matchStart));
    }

    const term =
      termMap.get(matchStr.toLowerCase()) ||
      termMap.get(matchStr.toLocaleLowerCase('tr-TR'));

    if (term) {
      parts.push(
        <GlossaryTermTrigger
          key={`${term.id}-${matchStart}-${index}`}
          matchedText={matchStr}
          term={term}
          onOpen={(rect) => openPopover(term, rect)}
          onClose={closePopover}
        />
      );
    } else {
      parts.push(matchStr);
    }

    lastIdx = matchEnd;
  });

  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }

  return <span className={className}>{parts}</span>;
};

interface GlossaryTermTriggerProps {
  matchedText: string;
  term: GlossaryTerm;
  onOpen: (rect: DOMRect) => void;
  onClose: () => void;
}

const GlossaryTermTrigger: React.FC<GlossaryTermTriggerProps> = ({
  matchedText,
  term,
  onOpen,
  onClose,
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (spanRef.current) {
      onOpen(spanRef.current.getBoundingClientRect());
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (spanRef.current) {
      onOpen(spanRef.current.getBoundingClientRect());
    }
  };

  return (
    <span
      ref={spanRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onClose}
      onFocus={handleMouseEnter}
      onBlur={onClose}
      className="inline-flex items-baseline border-b border-dashed border-[#2E5B39] text-[#1D4026] hover:text-[#2E5B39] bg-[#EAF2E8]/50 hover:bg-[#EAF2E8] px-0.5 rounded transition-all cursor-help font-medium select-none"
      title={`${term.title}: Çiftçi dilinde açıklamayı görmek için fare ile üzerine gelin veya dokunun`}
    >
      {matchedText}
      <span className="text-[10px] text-[#2E5B39] ml-0.5 opacity-60 font-sans font-normal">ℹ️</span>
    </span>
  );
};

export interface FarmerTermProps {
  termId?: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

export const FarmerTerm: React.FC<FarmerTermProps> = ({
  termId,
  children,
  className = '',
  showIcon = true,
}) => {
  const { openPopover, closePopover } = useGlossary();
  const spanRef = useRef<HTMLSpanElement>(null);

  const term = useMemo(() => {
    if (termId) {
      return GLOSSARY_TERMS.find((t) => t.id === termId) || null;
    }
    return null;
  }, [termId]);

  if (!term) {
    return <span className={className}>{children}</span>;
  }

  const handleMouseEnter = () => {
    if (spanRef.current) {
      openPopover(term, spanRef.current.getBoundingClientRect());
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (spanRef.current) {
      openPopover(term, spanRef.current.getBoundingClientRect());
    }
  };

  return (
    <span
      ref={spanRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={closePopover}
      onFocus={handleMouseEnter}
      onBlur={closePopover}
      className={`inline-flex items-center gap-0.5 border-b border-dashed border-[#2E5B39] text-[#1F4327] hover:text-[#2E5B39] bg-[#EAF2E8]/40 hover:bg-[#EAF2E8] px-1 py-0.2 rounded transition-all cursor-help select-none ${className}`}
      title={`${term.title}: Çiftçi dilinde açıklamayı görmek için fare ile üzerine gelin`}
    >
      <span>{children || term.title}</span>
      {showIcon && (
        <span className="text-[9.5px] text-[#2E5B39] opacity-70 font-sans font-normal ml-0.5">ℹ️</span>
      )}
    </span>
  );
};
