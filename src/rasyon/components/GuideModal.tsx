import React, { useState, useMemo } from 'react';
import { X, BookOpen, HelpCircle, ChevronDown, ChevronUp, Search, Info, Lightbulb, Sparkles } from 'lucide-react';
import { GUIDES, FAQS } from '../data/guides';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossary';
import { GlossaryText } from './GlossaryText';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'guides' | 'faq' | 'glossary'>('guides');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allFaqs = Object.values(FAQS).flat();

  const filteredGlossary = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const q = glossarySearch.toLowerCase().trim();
      if (!q) return matchCat;
      const matchText =
        item.title.toLowerCase().includes(q) ||
        item.shortMeaning.toLowerCase().includes(q) ||
        item.farmerExplanation.toLowerCase().includes(q) ||
        item.practicalTip.toLowerCase().includes(q) ||
        item.matchTerms.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchText;
    });
  }, [glossarySearch, selectedCategory]);

  const categories = ['all', 'Rasyon & Besleme', 'Sağlık & Klinik', 'Üreme & Doğum', 'Ekonomi & Maliyet', 'Damızlık & Anatomi'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
          {/* Modal Header */}
          <div className="px-6 py-4.5 border-b border-[#DCD7C4] bg-[#FAF8F0] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EAF2E8] border border-[#B9C8B0] flex items-center justify-center text-[#2E5B39]">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-base text-[#20261A]">
                  Veterinerlik & Zootekni Rehberi ve SSS
                </h2>
                <p className="text-xs text-[#6B7160]">
                  NRC / INRA normları, rasyon hesaplama metodolojisi, saha kuralları ve çiftçi sözlüğü
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-[#DCD7C4] flex items-center justify-center text-[#6B7160] hover:text-[#20261A] hover:bg-[#F2EFE2] transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sub-navigation Tabs */}
          <div className="px-6 border-b border-[#DCD7C4] bg-[#F6F4EC] flex gap-2 pt-2 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('guides')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'guides'
                  ? 'border-[#2E5B39] text-[#2E5B39]'
                  : 'border-transparent text-[#6B7160] hover:text-[#20261A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Metodolojik Kılavuz
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('faq')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'faq'
                  ? 'border-[#2E5B39] text-[#2E5B39]'
                  : 'border-transparent text-[#6B7160] hover:text-[#20261A]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> Sıkça Sorulan Sorular ({allFaqs.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('glossary')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'glossary'
                  ? 'border-[#2E5B39] text-[#2E5B39]'
                  : 'border-transparent text-[#6B7160] hover:text-[#20261A]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2E5B39]" /> Çiftçi Terimler Sözlüğü ({GLOSSARY_TERMS.length})
            </button>
          </div>

          {/* Top helper banner for Guides & FAQ */}
          {(activeTab === 'guides' || activeTab === 'faq') && (
            <div className="px-6 py-2 bg-[#EAF2E8]/60 border-b border-[#D4E0D1] flex items-center gap-2 text-xs text-[#22442B]">
              <Info className="w-3.5 h-3.5 shrink-0 text-[#2E5B39]" />
              <span className="leading-snug">
                <strong>İpucu:</strong> Metinlerdeki{' '}
                <span className="border-b border-dashed border-[#2E5B39] bg-[#EAF2E8] px-1 py-0.5 rounded font-medium text-[#1D4026]">
                  yeşil noktalı teknik terimlerin
                </span>{' '}
                üzerine gelerek (veya dokunarak) çiftçi dilindeki pratik açıklamaları ve sahadan altın kuralları görebilirsiniz.
              </span>
            </div>
          )}

          {/* Content Area */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#3B4232] leading-relaxed">
            {activeTab === 'guides' && (
              <div className="space-y-6">
                {Object.entries(GUIDES).map(([modKey, gData]) => (
                  <div
                    key={modKey}
                    className="bg-white border border-[#DCD7C4] rounded-xl p-5 shadow-2xs space-y-3"
                  >
                    <div>
                      <h3 className="font-heading font-bold text-base text-[#20261A]">
                        {gData.title}
                      </h3>
                      <p className="text-xs text-[#6B7160] mt-1">
                        <GlossaryText text={gData.intro} />
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {gData.articles.map((art) => (
                        <div
                          key={art.no}
                          className="bg-[#FCFBF6] border border-[#ECE8D8] rounded-lg p-3 text-xs space-y-1"
                        >
                          <div className="font-semibold text-[#20261A] flex items-center gap-1.5">
                            <span className="text-[#2E5B39] font-mono-code font-bold">
                              {art.no}.
                            </span>
                            <span>
                              <GlossaryText text={art.title} />
                            </span>
                          </div>
                          <p className="text-[#555C4A] leading-relaxed">
                            <GlossaryText text={art.text} />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-3">
                {allFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-[#DCD7C4] rounded-xl overflow-hidden bg-white shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-[#FAF8F0] transition-colors cursor-pointer"
                      >
                        <span className="font-semibold text-[13.5px] text-[#20261A]">
                          <GlossaryText text={faq.q} />
                        </span>
                        <span className="text-[#6B7160] shrink-0">
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs text-[#555C4A] border-t border-[#ECE8D8] bg-[#FCFBF6] leading-relaxed">
                          <GlossaryText text={faq.a} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'glossary' && (
              <div className="space-y-4">
                {/* Search and Filters */}
                <div className="space-y-3 bg-white p-4 rounded-xl border border-[#DCD7C4]">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7160]" />
                    <input
                      type="text"
                      value={glossarySearch}
                      onChange={(e) => setGlossarySearch(e.target.value)}
                      placeholder="Terim ara (örn: KM, NDF, Asidoz, NEL, SYGM, Mastitis, Kolostrum)..."
                      className="w-full pl-9 pr-3 py-2 bg-[#FCFBF6] border border-[#DCD7C4] rounded-lg text-xs focus:outline-hidden focus:border-[#2E5B39]"
                    />
                  </div>

                  {/* Category Pills */}
                  <div className="flex gap-1.5 flex-wrap">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-[#2E5B39] text-white font-medium'
                            : 'bg-[#FAF8F0] border border-[#DCD7C4] text-[#6B7160] hover:text-[#20261A]'
                        }`}
                      >
                        {cat === 'all' ? 'Tüm Terimler' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Glossary Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredGlossary.map((term) => (
                    <div
                      key={term.id}
                      className="bg-white border border-[#DCD7C4] hover:border-[#2E5B39] rounded-xl p-4 shadow-2xs space-y-2.5 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 border-b border-[#ECE8D8] pb-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EAF2E8] text-[#2E5B39] border border-[#B9C8B0]">
                              {term.category}
                            </span>
                            <span className="text-[10px] text-[#6B7160] font-mono-code">
                              {term.badge}
                            </span>
                          </div>
                          <h4 className="font-heading font-bold text-sm text-[#20261A] mt-1">
                            {term.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs font-semibold text-[#2E5B39] leading-snug">
                        “{term.shortMeaning}”
                      </p>

                      <div className="bg-[#FAF8F0] border border-[#ECE8D8] rounded-lg p-2.5 space-y-1">
                        <div className="text-[11px] font-bold text-[#4B5240] flex items-center gap-1">
                          <span>🌾</span>
                          <span>Çiftçi Diliyle:</span>
                        </div>
                        <p className="text-[11.5px] text-[#4A5240] leading-relaxed">
                          {term.farmerExplanation}
                        </p>
                      </div>

                      <div className="bg-[#EAF2E8] border border-[#B9C8B0] rounded-lg p-2.5 space-y-1">
                        <div className="text-[11px] font-bold text-[#2E5B39] flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5 text-[#2E5B39]" />
                          <span>Sahadan Altın Kural:</span>
                        </div>
                        <p className="text-[11px] text-[#22442B] leading-relaxed">
                          {term.practicalTip}
                        </p>
                      </div>
                    </div>
                  ))}

                  {filteredGlossary.length === 0 && (
                    <div className="col-span-2 text-center py-10 text-xs text-[#6B7160]">
                      Aradığınız terim bulunamadı. Lütfen farklı bir anahtar kelime deneyin.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3.5 border-t border-[#DCD7C4] bg-[#FAF8F0] flex items-center justify-between shrink-0">
            <span className="font-mono-code text-[11px] text-[#6B7160]">
              Ada Çiftliği v1.0 · Veterinary Scientific Decision Platform
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-[#20261A] text-white hover:bg-black rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
  );
};

