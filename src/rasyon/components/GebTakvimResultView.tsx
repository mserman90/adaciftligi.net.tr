import React from 'react';
import { GlossaryText } from './GlossaryText';
import { Download, Calendar, Printer } from 'lucide-react';
import { GebTakvimInputs } from '../types';
import { gebHesapla } from '../utils/reproduction';
import { fmtTarih, toIcsDate } from '../utils/formatters';

interface GebTakvimResultViewProps {
  inputs: GebTakvimInputs;
  onToast: (msg: string) => void;
}

export const GebTakvimResultView: React.FC<GebTakvimResultViewProps> = ({
  inputs,
  onToast,
}) => {
  const d = gebHesapla(inputs);

  const handleDownloadCsv = () => {
    if (!d.ok) {
      onToast('Lütfen geçerli bir tohumlama tarihi girin.');
      return;
    }
    let csv = `Asama / Olay,Gun,Tarih,Aciklama\n`;
    (d.kilometre || []).forEach((a) => {
      csv += `"${a.ad}",${a.day},"${fmtTarih(a.tarih)}","${a.aciklama}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `adaciftligi_gebelik_takvimi_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('Gebelik takvimi CSV olarak indirildi.');
  };

  const handleDownloadIcs = () => {
    if (!d.ok || !d.due) {
      onToast('Lütfen geçerli bir tohumlama tarihi girin.');
      return;
    }

    let ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//AdaCiftligi//TR\nCALSCALE:GREGORIAN\n`;
    (d.kilometre || []).forEach((a) => {
      const dt = toIcsDate(a.tarih);
      ics += `BEGIN:VEVENT\nSUMMARY:${a.ad}\nDESCRIPTION:${a.aciklama}\nDTSTART;VALUE=DATE:${dt}\nDTEND;VALUE=DATE:${dt}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    ics += `END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `adaciftligi_gebelik_takvimi_${Date.now()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('Takvim etkinlikleri (.ics) olarak indirildi; telefonunuza veya takviminize aktarabilirsiniz.');
  };

  if (!d.ok) {
    return (
      <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-8 text-center text-[#6B7160]">
        Lütfen geçerli bir tohumlama tarihi girin.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Tahmini doğum
          </span>
          <div className="font-mono-code text-xl font-bold text-[#2E5B39]">
            {d.due ? fmtTarih(d.due) : '—'}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">beklenen yavrulama</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Gebelik süresi
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            {d.L} <span className="text-xs font-normal text-[#6B7160]">gün</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">ırk ve türe özgü</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Gebelik günü (bugün)
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            {d.gestDay !== undefined && d.gestDay >= 0 ? `${d.gestDay}. gün` : '—'}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">tohumlamadan bu yana</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Kalan gün
          </span>
          <div
            className={`font-mono-code text-2xl font-bold ${
              d.kalan !== undefined && d.kalan < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'
            }`}
          >
            {d.kalan !== undefined ? `${d.kalan} gün` : '—'}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">doğuma kalan süre</span>
        </div>
      </div>

      {/* Milestones Timeline Table */}
      <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-[#DCD7C4] bg-[#FAF8F0] flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-heading font-bold text-sm text-[#20261A]">
            Kritik Veteriner Muayene ve Yönetim Aşamaları
          </h3>
          <span className="font-mono-code text-xs text-[#6B7160]">
            {(d.kilometre || []).length} kontrol noktası
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#DCD7C4]">
                <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-left font-medium">
                  Aşama / İşlem
                </th>
                <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-center font-medium">
                  Gebelik Günü
                </th>
                <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-left font-medium">
                  Tarih
                </th>
                <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-left font-medium">
                  Klinik / Zooteknik Açıklama
                </th>
              </tr>
            </thead>
            <tbody>
              {(d.kilometre || []).map((a, idx) => {
                const isPassed = d.gestDay !== undefined && d.gestDay > a.day;
                const isCurrent = d.gestDay !== undefined && Math.abs(d.gestDay - a.day) <= 3;
                return (
                  <tr
                    key={idx}
                    className={`border-b border-[#ECE8D8] transition-colors ${
                      isCurrent
                        ? 'bg-[#EAF2E8] font-semibold'
                        : isPassed
                        ? 'opacity-60 bg-[#F9F7F0]'
                        : 'hover:bg-[#F4F1E4]'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#20261A] flex items-center gap-2">
                        <span>{a.ad}</span>
                        {isCurrent && (
                          <span className="font-mono-code text-[9.5px] uppercase bg-[#2E5B39] text-white px-2 py-0.5 rounded-full">
                            Şu anda
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3 font-mono-code text-center text-[#20261A]">
                      {a.day}. gün
                    </td>
                    <td className="px-4 py-3 font-mono-code text-[#2E5B39] font-medium">
                      {fmtTarih(a.tarih)}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#6B7160] leading-relaxed">
                      <GlossaryText text={a.aciklama} />
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
          onClick={handleDownloadIcs}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#2E5B39] bg-[#EAF2E8] text-[#2E5B39] hover:bg-[#DCE7DA] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" /> Takvime Ekle (.ics)
        </button>
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
