import React from 'react';
import { Download } from 'lucide-react';
import { BesiEkoInputs } from '../../types';
import { besiEkoHesapla } from '../../utils/economics';
import { fmt } from '../../utils/formatters';

interface BesiEkoPanelProps {
  inputs: BesiEkoInputs;
  onChange: (inputs: BesiEkoInputs) => void;
  sonRasyonMaliyetiBesi: number | null;
  onToast: (msg: string) => void;
}

export const BesiEkoPanel: React.FC<BesiEkoPanelProps> = ({
  inputs,
  onChange,
  sonRasyonMaliyetiBesi,
  onToast,
}) => {
  const d = besiEkoHesapla(inputs);

  const handleImportRasyon = () => {
    if (sonRasyonMaliyetiBesi === null) {
      onToast('Önce Besi Sığırı modülünde bir rasyon hesaplayın; günlük yem maliyeti buraya aktarılır.');
      return;
    }
    const val = Math.round(sonRasyonMaliyetiBesi);
    onChange({ ...inputs, yem: val });
    onToast(`Günlük yem maliyeti son rasyondan alındı: ${fmt(sonRasyonMaliyetiBesi)} ₺/gün.`);
  };

  return (
    <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      {/* Inputs Column 1 */}
      <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#DCD7C4]">
        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Başlangıç canlı ağırlık (alım)
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="150"
              max="700"
              step="5"
              value={inputs.ka0}
              onChange={(e) => onChange({ ...inputs, ka0: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="100"
              max="800"
              step="5"
              value={inputs.ka0}
              onChange={(e) => onChange({ ...inputs, ka0: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[36px]">kg</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Hedef satış ağırlığı
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="250"
              max="800"
              step="5"
              value={inputs.ka1}
              onChange={(e) => onChange({ ...inputs, ka1: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="200"
              max="900"
              step="5"
              value={inputs.ka1}
              onChange={(e) => onChange({ ...inputs, ka1: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[36px]">kg</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Hedef günlük canlı ağırlık artışı (ACAB)
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="400"
              max="2500"
              step="25"
              value={inputs.acab}
              onChange={(e) => onChange({ ...inputs, acab: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="200"
              max="3000"
              step="25"
              value={inputs.acab}
              onChange={(e) => onChange({ ...inputs, acab: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[44px]">g/gün</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Alış fiyatı (canlı)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="500"
                step="2.5"
                value={inputs.alis}
                onChange={(e) => onChange({ ...inputs, alis: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">₺/kg</span>
            </div>
          </div>
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Satış fiyatı (canlı)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="500"
                step="2.5"
                value={inputs.satis}
                onChange={(e) => onChange({ ...inputs, satis: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">₺/kg</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6B7160] leading-relaxed mt-2">
          Besi süresi, hedef satış ağırlığı ile alım ağırlığı arasındaki farkın günlük artışa bölünmesiyle hesaplanır.
        </p>
      </div>

      {/* Inputs Column 2 & Summary */}
      <div className="p-6 md:p-7">
        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Günlük yem maliyeti
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="40"
              max="400"
              step="5"
              value={inputs.yem}
              onChange={(e) => onChange({ ...inputs, yem: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="600"
              step="5"
              value={inputs.yem}
              onChange={(e) => onChange({ ...inputs, yem: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[50px]">₺/gün</span>
          </div>
          <button
            type="button"
            onClick={handleImportRasyon}
            className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 border border-dashed border-[#BFB99F] rounded-md font-sans text-xs text-[#2E5B39] hover:bg-white hover:border-solid hover:border-[#2E5B39] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Son rasyondan aktar
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Ölüm payı
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={inputs.olum}
                onChange={(e) => onChange({ ...inputs, olum: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">%</span>
            </div>
          </div>
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Diğer değişken giderler
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={inputs.diger}
                onChange={(e) => onChange({ ...inputs, diger: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">₺/gün</span>
            </div>
          </div>
        </div>

        <table className="w-full text-[13.5px] border-collapse">
          <thead>
            <tr>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-left pb-2.5 border-b border-[#DCD7C4] font-medium">
                Besi özeti
              </th>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right pb-2.5 border-b border-[#DCD7C4] font-medium">
                Hayvan başına
              </th>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right pb-2.5 border-b border-[#DCD7C4] font-medium w-16"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2">Besi süresi</td>
              <td className="py-2 font-mono-code font-semibold text-right">{fmt(d.sure, 0)}</td>
              <td className="py-2 font-mono-code text-xs text-[#6B7160] text-right">gün</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2">Canlı ağırlık artışı</td>
              <td className="py-2 font-mono-code font-semibold text-right">{fmt(d.artis, 0)}</td>
              <td className="py-2 font-mono-code text-xs text-[#6B7160] text-right">kg</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2">Hayvan alışı</td>
              <td className="py-2 font-mono-code font-semibold text-right">{fmt(d.hayvan, 0)}</td>
              <td className="py-2 font-mono-code text-xs text-[#6B7160] text-right">₺</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2">Yem masrafı</td>
              <td className="py-2 font-mono-code font-semibold text-right">{fmt(d.yemMasraf, 0)}</td>
              <td className="py-2 font-mono-code text-xs text-[#6B7160] text-right">₺</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2">Toplam masraf</td>
              <td className="py-2 font-mono-code font-semibold text-right">{fmt(d.masraf, 0)}</td>
              <td className="py-2 font-mono-code text-xs text-[#6B7160] text-right">₺</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2">Satış geliri</td>
              <td className="py-2 font-mono-code font-semibold text-right">{fmt(d.gelir, 0)}</td>
              <td className="py-2 font-mono-code text-xs text-[#6B7160] text-right">₺</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2 font-bold text-[#2E5B39]">Net kâr (besi başına)</td>
              <td className={`py-2 font-mono-code font-bold text-right ${d.net < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'}`}>
                {fmt(d.net, 0)}
              </td>
              <td className="py-2 font-mono-code text-xs text-[#6B7160] text-right">₺</td>
            </tr>
            <tr>
              <td className="py-2">Net kâr (günlük)</td>
              <td className={`py-2 font-mono-code font-semibold text-right ${d.netGun < 0 ? 'text-[#8A3B2E]' : ''}`}>
                {fmt(d.netGun, 1)}
              </td>
              <td className="py-2 font-mono-code text-xs text-[#6B7160] text-right">₺/gün</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
