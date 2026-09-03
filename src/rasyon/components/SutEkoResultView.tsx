import React from 'react';
import { Download, Printer } from 'lucide-react';
import { SutEkoInputs } from '../types';
import { sutEkoHesapla } from '../utils/economics';
import { fmt } from '../utils/formatters';

interface SutEkoResultViewProps {
  inputs: SutEkoInputs;
  onToast: (msg: string) => void;
}

export const SutEkoResultView: React.FC<SutEkoResultViewProps> = ({
  inputs,
  onToast,
}) => {
  const d = sutEkoHesapla(inputs);
  const kgKar = inputs.fiyat - d.maliyetKg;

  const handleDownloadCsv = () => {
    let csv = `Metrik,Deger,Birim\n`;
    csv += `Yillik Sut Uretimi,${fmt(d.yillikSut, 0)},kg\n`;
    csv += `Sut Geliri,${fmt(d.sutGeliri, 0)},TL/yil\n`;
    csv += `Buzagi Geliri,${fmt(d.buzagi, 0)},TL/yil\n`;
    csv += `Toplam Gelir,${fmt(d.toplamGelir, 0)},TL/yil\n`;
    csv += `Yem Masrafi (Yillik),${fmt(d.yemYil, 0)},TL/yil\n`;
    csv += `Diger Degisken Masraflar,${fmt(d.degiskenYil, 0)},TL/yil\n`;
    csv += `Sabit Giderler,${fmt(d.sabit, 0)},TL/yil\n`;
    csv += `Toplam Masraf,${fmt(d.toplamMasraf, 0)},TL/yil\n`;
    csv += `Net Kar (Yillik),${fmt(d.netYil, 0)},TL/yil\n`;
    csv += `Net Kar (Gunluk),${fmt(d.netGun, 2)},TL/gun\n`;
    csv += `1 kg Sut Maliyeti,${fmt(d.maliyetKg, 2)},TL/kg\n`;
    csv += `1 kg Sut Kar Payi,${fmt(kgKar, 2)},TL/kg\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `adaciftligi_sut_ekonomisi_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('Süt kârlılığı analizi CSV olarak indirildi.');
  };

  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Yıllık net kâr
          </span>
          <div
            className={`font-mono-code text-2xl font-bold ${
              d.netYil < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'
            }`}
          >
            {fmt(d.netYil, 0)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">₺/yıl</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">inek başına net bakiye</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            1 kg süt maliyeti
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            {fmt(d.maliyetKg, 2)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">₺/kg</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">başabaş maliyet eşiği</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            1 kg süt kârı
          </span>
          <div
            className={`font-mono-code text-2xl font-bold ${
              kgKar < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'
            }`}
          >
            {fmt(kgKar, 2)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">₺/kg</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">fiyat − maliyet farkı</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Yem gideri payı
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            %{fmt(d.toplamMasraf > 0 ? (d.yemYil / d.toplamMasraf) * 100 : 0, 1)}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">toplam gider içindeki payı</span>
        </div>
      </div>

      {/* Sensitivity Table */}
      <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-[#DCD7C4] bg-[#FAF8F0]">
          <h3 className="font-heading font-bold text-sm text-[#20261A]">
            Duyarlılık Analizi — Süt Satış Fiyatına Göre Yıllık Net Kâr (₺/inek/yıl)
          </h3>
          <p className="text-xs text-[#6B7160] mt-0.5">
            Mevcut yem maliyeti ve üretim düzeyinde farklı süt satış fiyatlarında kârlılık seyri
          </p>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-xs border-collapse font-mono-code">
            <thead>
              <tr className="border-b border-[#DCD7C4]">
                <th className="py-2 text-left text-[#6B7160]">Süt Fiyatı</th>
                <th className="py-2 text-right text-[#6B7160]">Yıllık Gelir</th>
                <th className="py-2 text-right text-[#6B7160]">Yıllık Masraf</th>
                <th className="py-2 text-right text-[#6B7160]">Yıllık Net Kâr</th>
                <th className="py-2 text-right text-[#6B7160]">kg Başına Kâr</th>
              </tr>
            </thead>
            <tbody>
              {[-3, -1.5, 0, 1.5, 3].map((delta) => {
                const simFiyat = Math.max(1, inputs.fiyat + delta);
                const sim = sutEkoHesapla({ ...inputs, fiyat: simFiyat });
                const simKgKar = simFiyat - sim.maliyetKg;
                const isCurrent = delta === 0;
                return (
                  <tr
                    key={delta}
                    className={`border-b border-[#ECE8D8] ${
                      isCurrent ? 'bg-[#EAF2E8] font-bold text-[#20261A]' : 'hover:bg-[#F4F1E4]'
                    }`}
                  >
                    <td className="py-2 text-left">
                      {fmt(simFiyat, 2)} ₺/kg {isCurrent && '(Geçerli)'}
                    </td>
                    <td className="py-2 text-right">{fmt(sim.toplamGelir, 0)} ₺</td>
                    <td className="py-2 text-right">{fmt(sim.toplamMasraf, 0)} ₺</td>
                    <td
                      className={`py-2 text-right ${
                        sim.netYil < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'
                      }`}
                    >
                      {fmt(sim.netYil, 0)} ₺
                    </td>
                    <td
                      className={`py-2 text-right ${
                        simKgKar < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'
                      }`}
                    >
                      {fmt(simKgKar, 2)} ₺
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
