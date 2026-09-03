import React from 'react';
import { Download } from 'lucide-react';
import { SutEkoInputs } from '../../types';
import { sutEkoHesapla } from '../../utils/economics';
import { fmt } from '../../utils/formatters';

interface SutEkoPanelProps {
  inputs: SutEkoInputs;
  onChange: (inputs: SutEkoInputs) => void;
  sonRasyonMaliyetiSut: number | null;
  onToast: (msg: string) => void;
}

export const SutEkoPanel: React.FC<SutEkoPanelProps> = ({
  inputs,
  onChange,
  sonRasyonMaliyetiSut,
  onToast,
}) => {
  const d = sutEkoHesapla(inputs);

  const handleImportRasyon = () => {
    if (sonRasyonMaliyetiSut === null) {
      onToast('Önce Süt İneği modülünde bir rasyon hesaplayın; günlük yem maliyeti buraya aktarılır.');
      return;
    }
    const val = Math.round(sonRasyonMaliyetiSut);
    onChange({ ...inputs, yemL: val });
    onToast(`Laktasyon yem maliyeti son rasyondan alındı: ${fmt(sonRasyonMaliyetiSut)} ₺/gün.`);
  };

  return (
    <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      {/* Inputs */}
      <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#DCD7C4]">
        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Günlük süt verimi (laktasyonda)
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="5"
              max="60"
              step="0.5"
              value={inputs.verim}
              onChange={(e) => onChange({ ...inputs, verim: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="1"
              max="80"
              step="0.5"
              value={inputs.verim}
              onChange={(e) => onChange({ ...inputs, verim: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[50px]">kg/gün</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Süt satış fiyatı
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="5"
              max="50"
              step="0.25"
              value={inputs.fiyat}
              onChange={(e) => onChange({ ...inputs, fiyat: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="1"
              max="100"
              step="0.25"
              value={inputs.fiyat}
              onChange={(e) => onChange({ ...inputs, fiyat: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[50px]">₺/kg</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Laktasyon süresi
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="100"
                max="500"
                step="5"
                value={inputs.lakt}
                onChange={(e) => onChange({ ...inputs, lakt: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">gün</span>
            </div>
          </div>
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Kuru dönem
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="180"
                step="5"
                value={inputs.kuru}
                onChange={(e) => onChange({ ...inputs, kuru: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">gün</span>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Laktasyon yem maliyeti
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="40"
              max="500"
              step="5"
              value={inputs.yemL}
              onChange={(e) => onChange({ ...inputs, yemL: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="800"
              step="5"
              value={inputs.yemL}
              onChange={(e) => onChange({ ...inputs, yemL: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[50px]">₺/gün</span>
          </div>
          <button
            type="button"
            onClick={handleImportRasyon}
            className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1.5 border border-dashed border-[#BFB99F] rounded-md font-sans text-xs text-[#2E5B39] hover:bg-white hover:border-solid hover:border-[#2E5B39] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Son rasyondan aktar
          </button>
        </div>

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Kuru dönem yem maliyeti
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="number"
              min="0"
              max="400"
              step="5"
              value={inputs.yemK}
              onChange={(e) => onChange({ ...inputs, yemK: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160]">₺/gün</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              İşçilik
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="300"
                step="5"
                value={inputs.isc}
                onChange={(e) => onChange({ ...inputs, isc: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">₺/gün</span>
            </div>
          </div>
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Veteriner + ilaç
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="200"
                step="1"
                value={inputs.vet}
                onChange={(e) => onChange({ ...inputs, vet: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">₺/gün</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Tohumlama + üreme
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={inputs.ureme}
                onChange={(e) => onChange({ ...inputs, ureme: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">₺/gün</span>
            </div>
          </div>
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Enerji + diğer değişken
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="200"
                step="1"
                value={inputs.diger}
                onChange={(e) => onChange({ ...inputs, diger: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">₺/gün</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Sabit giderler (yıllık)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100000"
                step="500"
                value={inputs.sabit}
                onChange={(e) => onChange({ ...inputs, sabit: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">₺/yıl</span>
            </div>
          </div>
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Buzağı geliri (yıllık)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="60000"
                step="500"
                value={inputs.buzagi}
                onChange={(e) => onChange({ ...inputs, buzagi: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">₺/yıl</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="p-6 md:p-7">
        <table className="w-full text-[13.5px] border-collapse">
          <thead>
            <tr>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-left pb-2.5 border-b border-[#DCD7C4] font-medium">
                Yıllık özet
              </th>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right pb-2.5 border-b border-[#DCD7C4] font-medium">
                İnek başına
              </th>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right pb-2.5 border-b border-[#DCD7C4] font-medium w-16"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Yıllık süt üretimi</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.yillikSut, 0)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">kg</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Süt geliri</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.sutGeliri, 0)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/yıl</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Buzağı geliri</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.buzagi, 0)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/yıl</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5 font-semibold text-[#20261A]">Toplam gelir</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.toplamGelir, 0)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/yıl</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Yem masrafı</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.yemYil, 0)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/yıl</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Diğer değişken masraflar</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.degiskenYil, 0)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/yıl</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Sabit giderler</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.sabit, 0)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/yıl</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5 font-semibold text-[#20261A]">Toplam masraf</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.toplamMasraf, 0)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/yıl</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5 font-bold text-[#2E5B39]">Net kâr (yıllık)</td>
              <td className={`py-2.5 font-mono-code font-bold text-right ${d.netYil < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'}`}>
                {fmt(d.netYil, 0)}
              </td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/yıl</td>
            </tr>
            <tr>
              <td className="py-2.5">Net kâr (günlük)</td>
              <td className={`py-2.5 font-mono-code font-semibold text-right ${d.netGun < 0 ? 'text-[#8A3B2E]' : ''}`}>
                {fmt(d.netGun, 1)}
              </td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/gün</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-[#6B7160] leading-relaxed mt-4">
          Yem maliyeti en büyük kaldıraçtır: Süt İneği modülünde hesapladığınız optimum rasyonun günlük maliyetini <strong>“Son rasyondan aktar”</strong> ile bu tabloya taşıyabilirsiniz.
        </p>
      </div>
    </div>
  );
};
