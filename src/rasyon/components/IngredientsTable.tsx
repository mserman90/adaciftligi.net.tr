import React from 'react';
import { FeedIngredient, ModuleKey } from '../types';
import { fmt } from '../utils/formatters';
import { FarmerTerm } from './GlossaryText';

interface IngredientsTableProps {
  ingredients: FeedIngredient[];
  selectedIds: Set<string>;
  currentModule: ModuleKey;
  subType?: string;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onResetDefaults: () => void;
  onUpdateIngredient: (id: string, field: 'fiyat' | 'min' | 'max', val: number) => void;
}

export const IngredientsTable: React.FC<IngredientsTableProps> = ({
  ingredients,
  selectedIds,
  currentModule,
  subType,
  onToggleSelect,
  onSelectAll,
  onClearAll,
  onResetDefaults,
  onUpdateIngredient,
}) => {
  const isBesiCol =
    currentModule === 'besi' ||
    (currentModule === 'koyun' && subType === 'kuzu') ||
    (currentModule === 'keci' && subType === 'oglak');

  const isSutCol =
    currentModule === 'sut' ||
    (currentModule === 'koyun' && subType !== 'kuzu') ||
    (currentModule === 'keci' && subType !== 'oglak');

  return (
    <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-[#DCD7C4]">
              <th className="w-10 px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-center font-medium">
                Seç
              </th>
              <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-left font-medium">
                Hammadde
              </th>
              <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right font-medium">
                <FarmerTerm termId="km">KM %</FarmerTerm>
              </th>
              {isBesiCol && (
                <>
                  <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right font-medium">
                    <FarmerTerm termId="nem">NEm</FarmerTerm> <span className="opacity-60 text-[10px]">¹</span>
                  </th>
                  <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right font-medium">
                    <FarmerTerm termId="neg">NEg</FarmerTerm> <span className="opacity-60 text-[10px]">¹</span>
                  </th>
                </>
              )}
              {isSutCol && (
                <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right font-medium">
                  <FarmerTerm termId="nel">NEL</FarmerTerm> <span className="opacity-60 text-[10px]">¹</span>
                </th>
              )}
              <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right font-medium">
                <FarmerTerm termId="hp">HP %</FarmerTerm>
              </th>
              <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right font-medium">
                <FarmerTerm termId="ca">Ca %</FarmerTerm>
              </th>
              <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right font-medium">
                <FarmerTerm termId="p">P %</FarmerTerm>
              </th>
              {isSutCol && (
                <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right font-medium">
                  <FarmerTerm termId="ndf">NDF %</FarmerTerm>
                </th>
              )}
              <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-left font-medium">
                Fiyat ₺/kg
              </th>
              <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-left font-medium">
                Min %
              </th>
              <th className="px-3 py-3 font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-left font-medium">
                Maks %
              </th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((f) => {
              const isSelected = selectedIds.has(f.id);
              return (
                <tr
                  key={f.id}
                  className={`border-b border-[#ECE8D8] hover:bg-[#F4F1E4] transition-colors ${
                    !isSelected ? 'opacity-40' : ''
                  }`}
                >
                  <td className="px-3 py-2.5 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(f.id)}
                      className="w-4 h-4 accent-[#2E5B39] cursor-pointer"
                      aria-label={`${f.ad} seçimi`}
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <strong className="font-semibold text-[#20261A]">{f.ad}</strong>
                    {f.kaba && (
                      <span className="inline-block ml-2 align-middle">
                        <FarmerTerm
                          termId="kaba_yem"
                          className="font-mono-code text-[9.5px] tracking-wider uppercase text-[#2E5B39] border border-[#B9C8B0] rounded-full px-2 py-0.5"
                        >
                          Kaba yem
                        </FarmerTerm>
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                    {fmt(f.dm * 100, 0)}
                  </td>
                  {isBesiCol && (
                    <>
                      <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                        {fmt(f.nem, 2)}
                      </td>
                      <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                        {fmt(f.neg, 2)}
                      </td>
                    </>
                  )}
                  {isSutCol && (
                    <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                      {fmt(f.nel, 2)}
                    </td>
                  )}
                  <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                    {fmt(f.hp, 1)}
                  </td>
                  <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                    {fmt(f.ca, 1)}
                  </td>
                  <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                    {fmt(f.p, 2)}
                  </td>
                  {isSutCol && (
                    <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                      {fmt(f.ndf, 0)}
                    </td>
                  )}
                  <td className="px-3 py-2.5">
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={f.fiyat}
                      onChange={(e) =>
                        onUpdateIngredient(f.id, 'fiyat', Math.max(0, parseFloat(e.target.value) || 0))
                      }
                      className="w-20 bg-white border border-[#DCD7C4] rounded px-2 py-1 font-mono-code text-xs text-right focus:outline-none focus:border-[#2E5B39]"
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={f.min}
                      onChange={(e) =>
                        onUpdateIngredient(
                          f.id,
                          'min',
                          Math.min(100, Math.max(0, parseFloat(e.target.value) || 0))
                        )
                      }
                      className="w-16 bg-white border border-[#DCD7C4] rounded px-2 py-1 font-mono-code text-xs text-right focus:outline-none focus:border-[#2E5B39]"
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={f.max}
                      onChange={(e) =>
                        onUpdateIngredient(
                          f.id,
                          'max',
                          Math.min(100, Math.max(0, parseFloat(e.target.value) || 0))
                        )
                      }
                      className="w-16 bg-white border border-[#DCD7C4] rounded px-2 py-1 font-mono-code text-xs text-right focus:outline-none focus:border-[#2E5B39]"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Controls */}
      <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-t border-[#DCD7C4] bg-[#FAF8F0] flex-wrap">
        <span className="font-mono-code text-xs text-[#6B7160]">
          {selectedIds.size} / {ingredients.length} hammadde seçili
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSelectAll}
            className="px-3 py-1.5 border border-[#DCD7C4] bg-white rounded-md text-xs font-medium hover:bg-[#F2EFE2] cursor-pointer transition-colors"
          >
            Tümünü seç
          </button>
          <button
            type="button"
            onClick={onClearAll}
            className="px-3 py-1.5 border border-[#DCD7C4] bg-white rounded-md text-xs font-medium hover:bg-[#F2EFE2] cursor-pointer transition-colors"
          >
            Seçimi temizle
          </button>
          <button
            type="button"
            onClick={onResetDefaults}
            className="px-3 py-1.5 border border-[#DCD7C4] bg-white rounded-md text-xs font-medium hover:bg-[#F2EFE2] cursor-pointer transition-colors"
          >
            Varsayılanlara dön
          </button>
        </div>
      </div>
    </div>
  );
};
