import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { FARM_CONTACT } from '../data/farmData';

export const QuickCallFloat: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-10 h-10 rounded-full bg-white/95 text-stone-700 shadow-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-all hover:scale-105"
          aria-label="En başa dön"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating WhatsApp Action Pill */}
      <a
        href={FARM_CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Canlı Destek"
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1faa4f] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-103"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs sm:text-sm font-bold tracking-tight">
          Hızlı WhatsApp
        </span>
      </a>
    </div>
  );
};
