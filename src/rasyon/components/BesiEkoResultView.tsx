import React from 'react';
import { Download, Printer } from 'lucide-react';
import { BesiEkoInputs } from '../types';
import { besiEkoHesapla } from '../utils/economics';
import { fmt } from '../utils/formatters';

interface BesiEkoResultViewProps {
  inputs: BesiEkoInputs;
  onToast: (msg: string) => void;
}

export const BesiEkoResultView: React.FC<BesiEkoResultViewProps> = ({
  inputs,
  onToast,
}) => {
  const d = besiEkoHesapla(inputs);

  const handleDownloadCsv = () => {
    let csv = `Metrik,Deger,Birim\n`;
    csv += `Besi Suresi,${fmt(d.sure, 0)},gun\n`;
    csv += `Canli Agirlik Artisi,${fmt(d.artis, 0)},kg\n`;
    csv += `Hayvan Alis Masrafi,${fmt(d.hayvan, 0)},TL\n`;
    csv += `Yem Masrafi,${fmt(d.yemMasraf, 0)},TL\n`;
    csv += `Diger Masraflar,${fmt(d.digerMasraf, 0)},TL\n`;
    csv += `Toplam Masraf,${fmt(d.masraf, 0)},TL\n`;
    csv += `Satis Geliri,${fmt(d.gelir, 0)},TL\n`;
    csv += `Net Kar (Besi Basina),${fmt(d.net, 0)},TL\n`;
    csv += `Net Kar (Gunluk),${fmt(d.netGun, 2)},TL/gun\n`;
    csv += `1 kg Canli Agirlik Maliyeti,${fmt(d.tamMaliyetKg, 2)},TL/kg\n`;
    csv += `1 kg Canli Agirlik Artisi Maliyeti,${fmt(d.yemMaliyetKgArtis, 2)},TL/kg\n`;
    csv += `Basabas Satis Fiyati,${fmt(d.basSatis, 2)},TL/kg\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `adaciftligi_besi_ekonomisi_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('Besi ekonomisi analizi CSV olarak indirildi.');
  };

  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Besi net kârı
          </span>
          <div
            className={`font-mono-code text-2xl font-bold ${
              d.net < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'
            }`}
          >
            {fmt(d.net, 0)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">₺/baş</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">dönem sonu net kazanç</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Başabaş satış fiyatı
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            {fmt(d.basSatis, 2)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">₺/kg canlı</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">zarar etmemek için asgari</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            1 kg artış maliyeti
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            {fmt(d.yemMaliyetKgArtis, 2)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">₺/kg</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">besi boyunca eklenen kg</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Yem payı
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            %{fmt(d.masraf > 0 ? (d.yemMasraf / d.masraf) * 100 : 0, 1)}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">toplam gider içindeki payı</span>
        </div>
      </div>

      {/* Sensitivity Table */}
      <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-[#DCD7C4] bg-[#FAF8F0]">
          <h3 className="font-heading font-bold text-sm text-[#20261A]">
            Duyarlılık Analizi — Canlı Satış Fiyatına Göre Net Kâr (₺/baş)
          </h3>
          <p className="text-xs text-[#6B7160] mt-0.5">
            Farklı canlı kilogram satış fiyatlarında baş başına kalan kâr ve günlük kâr
          </p>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-xs border-collapse font-mono-code">
            <thead>
              <tr className="border-b border-[#DCD7C4]">
                <th className="py-2 text-left text-[#6B7160]">Canlı Satış Fiyatı</th>
                <th className="py-2 text-right text-[#6B7160]">Satış Geliri</th>
                <th className="py-2 text-right text-[#6B7160]">Toplam Masraf</th>
                <th className="py-2 text-right text-[#6B7160]">Net Kâr (Baş)</th>
                <th className="py-2 text-right text-[#6B7160]">Günlük Kâr</th>
              </tr>
            </thead>
            <tbody>
              {[-20, -10, 0, 10, 20].map((delta) => {
                const simSatis = Math.max(10, inputs.satis + delta);
                const sim = besiEkoHesapla({ ...inputs, satis: simSatis });
                const isCurrent = delta === 0;
                return (
                  <tr
                    key={delta}
                    className={`border-b border-[#ECE8D8] ${
                      isCurrent ? 'bg-[#EAF2E8] font-bold text-[#20261A]' : 'hover:bg-[#F4F1E4]'
                    }`}
                  >
                    <td className="py-2 text-left">
                      {fmt(simSatis, 2)} ₺/kg {isCurrent && '(Geçerli)'}
                    </td>
                    <td className="py-2 text-right">{fmt(sim.gelir, 0)} ₺</td>
                    <td className="py-2 text-right">{fmt(sim.masraf, 0)} ₺</td>
                    <td
                      className={`py-2 text-right ${
                        sim.net < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'
                      }`}
                    >
                      {fmt(sim.net, 0)} ₺
                    </td>
                    <td
                      className={`py-2 text-right ${
                        sim.netGun < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'
                      }`}
                    >
                      {fmt(sim.netGun, 2)} ₺/gün
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleDownloadCsv}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#DCD7C4] bg-white hover:bg-[#F2EFE2] rounded-lg text-xs font-semibold text-[#20261A] transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" /> CSV İndir
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2E5B39] text-white hover:bg-[#254A2E] rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" /> Raporu Yazdır
        </button>
      </div>
    </div>
  );
};
