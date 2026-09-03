import React from 'react';
import { Download, Printer, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { DamizlikInputs } from '../types';
import { damHesapla } from '../utils/economics';
import { fmt } from '../utils/formatters';

interface DamizlikResultViewProps {
  inputs: DamizlikInputs;
  onToast: (msg: string) => void;
}

export const DamizlikResultView: React.FC<DamizlikResultViewProps> = ({
  inputs,
  onToast,
}) => {
  const d = damHesapla(inputs);

  const handleDownloadCsv = () => {
    const ortSkor =
      d.skorlar.reduce((sum, k) => sum + k.skor, 0) / (d.skorlar.length || 1);
    let csv = `Kriter,Agirlik (%),Puan (1-5),Maksimum,Agirlikli Puan\n`;
    d.skorlar.forEach((s) => {
      csv += `"${s.ad}",${s.ag},${fmt(s.skor, 1)},5,${fmt(
        (s.pct * s.ag) / 100,
        2
      )}\n`;
    });
    csv += `\nGENEL SKOR,100,${fmt(ortSkor, 2)},5,${fmt(d.net, 1)}\n`;
    csv += `SINIF,${d.sinif.kod} - ${d.sinif.ad}\n`;
    csv += `KUPE NO,${d.kupe || 'Girilmedi'}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `adaciftligi_damizlik_rapor_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('Damızlık değerlendirme raporu CSV olarak indirildi.');
  };

  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Bileşik damızlık skoru
          </span>
          <div className="font-mono-code text-2xl font-bold" style={{ color: d.sinif.renk }}>
            {fmt(d.net, 0)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">/ 100</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">ağırlıklı toplam puan</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Seçim sınıfı
          </span>
          <div className="font-heading text-xl font-bold text-[#20261A] truncate mt-0.5">
            {d.sinif.kod} — {d.sinif.ad}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">damızlık uygunluk durumu</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            En güçlü özellik
          </span>
          <div className="font-sans text-sm font-bold text-[#2E5B39] truncate mt-1">
            {d.guclu.ad}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">başarı: %{fmt(d.guclu.pct, 0)}</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Kırmızı bayraklar
          </span>
          <div
            className={`font-mono-code text-2xl font-bold ${
              d.bayraklar.length > 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'
            }`}
          >
            {d.bayraklar.length > 0 ? `${d.bayraklar.length} kusur` : 'Kusursuz'}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">kesin ayıklama kriterleri</span>
        </div>
      </div>

      {/* Red Flags Warning if active */}
      {d.bayraklar.length > 0 && (
        <div className="bg-[#FBF0EE] border border-[#E5CFC5] rounded-xl p-4.5 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#8A3B2E] text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-[#8A3B2E]">
              Kırmızı Bayrak Uyarısı — Kesin Ayıklama
            </h4>
            <p className="text-xs text-[#523A36] mt-1 leading-relaxed">
              İşaretlenen majör anatomik kusurlar nedeniyle bu hayvan, puanı ne olursa olsun damızlık kadrosuna dahil edilmemeli ve <strong>Ayrıştırılır (D)</strong> sınıfında değerlendirilmelidir.
            </p>
          </div>
        </div>
      )}

      {/* Criteria Breakdown Table */}
      <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-[#DCD7C4] bg-[#FAF8F0] flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-[#20261A]">
            Kriter Bazında Morfolojik ve Fonksiyonel Puanlama Detayı
          </h3>
          <span className="font-mono-code text-xs text-[#6B7160]">
            Küpe: {d.kupe || '—'}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#DCD7C4]">
                <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-left font-medium">
                  Değerlendirme Kriteri
                </th>
                <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-center font-medium">
                  Ağırlık
                </th>
                <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                  Verilen Puan (1–5)
                </th>
                <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-left font-medium">
                  Başarı Düzeyi
                </th>
                <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                  Net Katkı
                </th>
              </tr>
            </thead>
            <tbody>
              {d.skorlar.map((s) => {
                const agPuan = (s.pct * s.ag) / 100;
                return (
                  <tr key={s.id} className="border-b border-[#ECE8D8] hover:bg-[#F4F1E4] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#20261A]">
                      {s.ad}
                    </td>
                    <td className="px-3 py-3 font-mono-code text-center text-[#6B7160]">
                      %{s.ag}
                    </td>
                    <td className="px-3 py-3 font-mono-code text-right font-bold text-[#20261A]">
                      {fmt(s.skor, 1)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#E8E4D4] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#2E5B39] h-full rounded-full transition-all"
                            style={{ width: `${s.pct}%` }}
                          />
                        </div>
                        <span className="font-mono-code text-[11px] text-[#6B7160] w-9 text-right">
                          %{fmt(s.pct, 0)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono-code text-right font-semibold text-[#2E5B39]">
                      +{fmt(agPuan, 1)} p
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
