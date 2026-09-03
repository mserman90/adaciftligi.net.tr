import React from 'react';
import { Download, Calendar, Printer, Clock } from 'lucide-react';
import { KizTakvimInputs } from '../types';
import { kizHesapla } from '../utils/reproduction';
import { fmtTarih, toIcsDate, bugun0 } from '../utils/formatters';

interface KizTakvimResultViewProps {
  inputs: KizTakvimInputs;
  onToast: (msg: string) => void;
}

export const KizTakvimResultView: React.FC<KizTakvimResultViewProps> = ({
  inputs,
  onToast,
}) => {
  const d = kizHesapla(inputs);

  const handleDownloadCsv = () => {
    if (!d.ok) {
      onToast('Lütfen geçerli bir kızgınlık tarihi girin.');
      return;
    }
    let csv = `Dongu No,Tarih,Kalan Gun,Ciftlesilirse Dogum\n`;
    (d.tahminler || []).forEach((c) => {
      const kalanGun = Math.max(0, Math.round((c.t.getTime() - bugun0().getTime()) / 86400000));
      csv += `${c.n},"${fmtTarih(c.t)}",${kalanGun},"${c.dogum ? fmtTarih(c.dogum) : '-'}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `adaciftligi_kizginlik_takvimi_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('Kızgınlık takvimi CSV olarak indirildi.');
  };

  const handleDownloadIcs = () => {
    if (!d.ok) {
      onToast('Lütfen geçerli bir kızgınlık tarihi girin.');
      return;
    }

    let ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//AdaCiftligi//TR\nCALSCALE:GREGORIAN\n`;
    (d.tahminler || []).forEach((c) => {
      const dt = toIcsDate(c.t);
      ics += `BEGIN:VEVENT\nSUMMARY:Beklenen Kızgınlık (Döngü ${c.n})\nDESCRIPTION:Tahmini kızgınlık başlangıcı ve tohumlama kontrolü. Çiftleşilirse doğum: ${c.dogum ? fmtTarih(c.dogum) : '-'}\nDTSTART;VALUE=DATE:${dt}\nDTEND;VALUE=DATE:${dt}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    ics += `END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `adaciftligi_kizginlik_takvimi_${Date.now()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('Kızgınlık döngüleri takvime (.ics) aktarıldı.');
  };

  if (!d.ok) {
    return (
      <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-8 text-center text-[#6B7160]">
        Lütfen geçerli bir kızgınlık başlangıç tarihi girin.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Sonraki kızgınlık
          </span>
          <div className="font-mono-code text-xl font-bold text-[#2E5B39]">
            {d.sonraki ? fmtTarih(d.sonraki) : '—'}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">1. döngü tahmini</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Kalan gün
          </span>
          <div
            className={`font-mono-code text-2xl font-bold ${
              d.kalan !== undefined && d.kalan <= 2 ? 'text-[#8A3B2E]' : 'text-[#20261A]'
            }`}
          >
            {d.kalan !== undefined ? `${d.kalan} gün` : '—'}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">sonraki östrus için</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Mevcut döngü günü
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            {d.donguGun !== undefined ? `${d.donguGun}. gün` : '—'}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">son kızgınlıktan bu yana</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Fizyolojik faz
          </span>
          <div className="font-sans text-sm font-bold text-[#20261A] truncate mt-1">
            {d.faz || '—'}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">ovaryum hormonu dengesi</span>
        </div>
      </div>

      {/* AM-PM Rule Banner */}
      <div className="bg-[#F0F5EE] border border-[#B9C8B0] rounded-xl p-4.5 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-lg bg-[#2E5B39] text-white flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm text-[#20261A]">
            Klinik Tohumlama Zamanlaması (AM-PM Kuralı)
          </h4>
          <p className="text-xs text-[#4A5141] mt-1 leading-relaxed">
            Kızgınlık sabah saatlerinde görüldüyse (atlama, böğürme, şeffaf akıntı) <strong>aynı günün akşamı (12 saat sonra)</strong>; akşam saatlerinde görüldüyse <strong>ertesi sabah erkenden</strong> tohumlama yapılmalıdır. Ovülasyon, kızgınlığın bitiminden yaklaşık 10–12 saat sonra gerçekleşir.
          </p>
        </div>
      </div>

      {/* Upcoming Cycles Table */}
      <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-[#DCD7C4] bg-[#FAF8F0] flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-heading font-bold text-sm text-[#20261A]">
            Gelecek Kızgınlık Döngüleri ve Olası Doğum Tarihleri
          </h3>
          <span className="font-mono-code text-xs text-[#6B7160]">
            {(d.tahminler || []).length} döngü projeksiyonu
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#DCD7C4]">
                <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-left font-medium">
                  Döngü Sırası
                </th>
                <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-left font-medium">
                  Tahmini Kızgınlık Tarihi
                </th>
                <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                  Kalan Süre
                </th>
                <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-left font-medium">
                  Tohumlanırsa Beklenen Doğum
                </th>
              </tr>
            </thead>
            <tbody>
              {(d.tahminler || []).map((c) => {
                const kalan = Math.max(0, Math.round((c.t.getTime() - bugun0().getTime()) / 86400000));
                return (
                  <tr key={c.n} className="border-b border-[#ECE8D8] hover:bg-[#F4F1E4] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#20261A]">
                      {c.n}. Sonraki Döngü
                    </td>
                    <td className="px-4 py-3 font-mono-code text-[#2E5B39] font-semibold">
                      {fmtTarih(c.t)}
                    </td>
                    <td className="px-3 py-3 font-mono-code text-right text-[#20261A]">
                      {kalan} gün sonra
                    </td>
                    <td className="px-4 py-3 font-mono-code text-[#6B7160]">
                      {c.dogum ? fmtTarih(c.dogum) : '—'}
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
