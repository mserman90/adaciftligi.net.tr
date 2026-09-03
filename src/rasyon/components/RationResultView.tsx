import React from 'react';
import { Copy, Download, Printer, CheckCircle2, HardDrive, Trash2, FileText } from 'lucide-react';
import { RationResult } from '../types';
import { fmt } from '../utils/formatters';
import { GlossaryText, FarmerTerm } from './GlossaryText';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
// Extend jsPDF interface to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface RationResultViewProps {
  result: RationResult;
  moduleName: string;
  lastSavedAt?: string | null;
  onClearSaved?: () => void;
  onToast: (msg: string) => void;
}

export const RationResultView: React.FC<RationResultViewProps> = ({
  result,
  moduleName,
  lastSavedAt,
  onClearSaved,
  onToast,
}) => {
  const handleCopyClipboard = () => {
    let text = `${moduleName} — Rasyon Özeti\n`;
    text += `Günlük Maliyet: ${fmt(result.gunlukMaliyet, 2)} ₺/baş/gün\n`;
    text += `1 kg KM (DM) Maliyeti: ${fmt(result.kmMaliyeti, 2)} ₺/kg KM\n`;
    text += `Toplam Yaş Yem: ${fmt(result.toplamYasYem, 2)} kg/gün\n`;
    text += `Kuru Madde: ${fmt(result.toplamDmi, 2)} kg/gün\n\n`;
    text += `Bileşenler:\n`;
    result.kalemler.forEach((k) => {
      text += `- ${k.ad}: ${fmt(k.yasKg, 2)} kg (${fmt(k.pay, 1)}% KM (DM)) — ${fmt(k.maliyet, 2)} ₺\n`;
    });
    navigator.clipboard.writeText(text);
    onToast('Rasyon tablosu panoya kopyalandı.');
  };

  const handleDownloadCsv = () => {
    let csv = `Hammadde,Kuru Madde (kg),Yas Yem (kg),KM Payi (%),Maliyet (TL),Maliyet Payi (%)\n`;
    result.kalemler.forEach((k) => {
      csv += `"${k.ad}",${fmt(k.dmKg, 3)},${fmt(k.yasKg, 3)},${fmt(k.pay, 2)},${fmt(k.maliyet, 2)},${fmt(k.maliyetPayi, 2)}\n`;
    });
    csv += `TOPLAM,${fmt(result.toplamDmi, 3)},${fmt(result.toplamYasYem, 3)},100.0,${fmt(result.gunlukMaliyet, 2)},100.0\n\n`;
    csv += `Besin Maddesi,Ihtiyac,Karsilanan,Birim,Oran (%)\n`;
    result.besinler.forEach((b) => {
      csv += `"${b.ad}",${fmt(b.ihtiyac, 2)},${fmt(b.saglanan, 2)},"${b.birim}",${fmt(b.oran, 1)}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `adaciftligi_rasyon_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('CSV dosyası indirildi.');
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`${moduleName} — Rasyon Özeti`, 14, 20);
    
    doc.setFontSize(10);
    doc.text(`Günlük Maliyet: ${fmt(result.gunlukMaliyet, 2)} TL/baş/gün`, 14, 30);
    doc.text(`1 kg KM (DM) Maliyeti: ${fmt(result.kmMaliyeti, 2)} TL/kg KM`, 14, 36);
    doc.text(`Toplam Yas Yem: ${fmt(result.toplamYasYem, 2)} kg/gün`, 14, 42);
    doc.text(`Kuru Madde (DMI): ${fmt(result.toplamDmi, 2)} kg/gün`, 14, 48);

    const rasyonData = result.kalemler.map(k => [
      k.ad,
      fmt(k.yasKg, 2),
      `%${fmt(k.pay, 1)}`,
      `${fmt(k.maliyet, 2)} TL`
    ]);
    
    rasyonData.push([
      'TOPLAM', 
      `${fmt(result.toplamYasYem, 2)} kg`,
      '%100.0',
      `${fmt(result.gunlukMaliyet, 2)} TL`
    ]);

    doc.autoTable({
      startY: 55,
      head: [['Hammadde', 'Yas Yem (kg)', 'KM Payi', 'Maliyet']],
      body: rasyonData,
      theme: 'grid',
      headStyles: { fillColor: [46, 91, 57] },
    });

    const besinData = result.besinler.map(b => [
      b.ad,
      `${fmt(b.ihtiyac, 1)} ${b.birim}`,
      `${fmt(b.saglanan, 1)} ${b.birim}`,
      `%${fmt(b.oran, 1)}`
    ]);

    doc.autoTable({
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Besin Maddesi', 'Ihtiyac', 'Saglanan', 'Karsilama Orani']],
      body: besinData,
      theme: 'grid',
      headStyles: { fillColor: [46, 91, 57] },
    });

    doc.save(`adaciftligi_rasyon_${Date.now()}.pdf`);
    onToast('PDF dosyası indirildi.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Storage status banner if saved */}
      {lastSavedAt && (
        <div className="bg-[#FAF8F0] border border-[#DCD7C4] rounded-xl px-4 py-2.5 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#2E5B39]">
            <HardDrive className="w-4 h-4 text-[#2E5B39] shrink-0" />
            <span className="font-medium">
              Tarayıcı yerel deposuna (localStorage) kaydedildi
            </span>
            <span className="text-[#6B7160]">·</span>
            <span className="font-mono-code text-[#6B7160]">Son güncelleme: {lastSavedAt}</span>
          </div>
          {onClearSaved && (
            <button
              type="button"
              onClick={onClearSaved}
              className="inline-flex items-center gap-1 text-[11px] text-[#8A3B2E] hover:text-[#682B21] transition-colors cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Kaydı Temizle</span>
            </button>
          )}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Günlük maliyet
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#2E5B39]">
            {fmt(result.gunlukMaliyet, 2)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">₺/baş</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">en düşük maliyet çözümü</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            <FarmerTerm termId="km">1 kg KM (DM) maliyeti</FarmerTerm>
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            {fmt(result.kmMaliyeti, 2)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">₺/kg KM</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">kuru madde birim fiyatı</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Toplam yaş yem
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            {fmt(result.toplamYasYem, 2)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">kg/gün</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">yemliğe dökülecek miktar</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            <FarmerTerm termId="dmi">Kuru madde (DMI)</FarmerTerm>
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            {fmt(result.toplamDmi, 2)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">kg/gün</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">toplam tüketim hedefi</span>
        </div>
      </div>

      {/* Composition & Nutrition Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ration Composition Table */}
        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 border-b border-[#DCD7C4] bg-[#FAF8F0] flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-[#20261A]">
              Rasyon Bileşimi
            </h3>
            <span className="font-mono-code text-xs text-[#2E5B39] font-medium">
              {result.kalemler.length} bileşen
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-[#DCD7C4]">
                  <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-left font-medium">
                    Hammadde
                  </th>
                  <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                    Yaş kg
                  </th>
                  <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                    <FarmerTerm termId="km">KM (DM) payı</FarmerTerm>
                  </th>
                  <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                    Maliyet
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.kalemler.map((k) => (
                  <tr key={k.id} className="border-b border-[#ECE8D8] hover:bg-[#F4F1E4] transition-colors">
                    <td className="px-4 py-2.5">
                      <span className="font-semibold text-[#20261A]">{k.ad}</span>
                      {k.kaba && (
                        <span className="ml-1.5 align-middle">
                          <FarmerTerm
                            termId="kaba_yem"
                            className="font-mono-code text-[9px] uppercase text-[#2E5B39] border border-[#B9C8B0] rounded px-1.5 py-0.2"
                          >
                            Kaba
                          </FarmerTerm>
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 font-mono-code text-right font-medium text-[#20261A]">
                      {fmt(k.yasKg, 2)}
                    </td>
                    <td className="px-3 py-2.5 font-mono-code text-right text-[#6B7160]">
                      %{fmt(k.pay, 1)}
                    </td>
                    <td className="px-4 py-2.5 font-mono-code text-right text-[#20261A]">
                      {fmt(k.maliyet, 2)} ₺
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#F6F4EC] font-semibold">
                  <td className="px-4 py-2.5">TOPLAM</td>
                  <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                    {fmt(result.toplamYasYem, 2)} kg
                  </td>
                  <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                    %100.0
                  </td>
                  <td className="px-4 py-2.5 font-mono-code text-right text-[#2E5B39]">
                    {fmt(result.gunlukMaliyet, 2)} ₺
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Nutrient Balance Table */}
        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 border-b border-[#DCD7C4] bg-[#FAF8F0] flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-[#20261A]">
              Besin Maddesi Dengesi
            </h3>
            <span className="inline-flex items-center gap-1 font-mono-code text-xs text-[#2E5B39]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Karşılandı
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-[#DCD7C4]">
                  <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-left font-medium">
                    Besin
                  </th>
                  <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                    İhtiyaç
                  </th>
                  <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                    Sağlanan
                  </th>
                  <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                    Oran %
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.besinler.map((b, idx) => {
                  const oran = b.oran;
                  const isOk = oran >= 99.5;
                  return (
                    <tr key={idx} className="border-b border-[#ECE8D8] hover:bg-[#F4F1E4] transition-colors">
                      <td className="px-4 py-2.5 font-medium text-[#20261A]">
                        <GlossaryText text={b.ad} />
                      </td>
                      <td className="px-3 py-2.5 font-mono-code text-right text-[#6B7160]">
                        {fmt(b.ihtiyac, 1)} {b.birim}
                      </td>
                      <td className="px-3 py-2.5 font-mono-code text-right font-semibold text-[#20261A]">
                        {fmt(b.saglanan, 1)} {b.birim}
                      </td>
                      <td className="px-4 py-2.5 font-mono-code text-right">
                        <span
                          className={`font-semibold ${
                            isOk ? 'text-[#2E5B39]' : 'text-[#8A3B2E]'
                          }`}
                        >
                          %{fmt(oran, 1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleCopyClipboard}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#DCD7C4] bg-white hover:bg-[#F2EFE2] rounded-lg text-xs font-semibold text-[#20261A] transition-colors cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" /> Panoya kopyala
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
          onClick={handleDownloadPdf}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#DCD7C4] bg-white hover:bg-[#F2EFE2] rounded-lg text-xs font-semibold text-[#20261A] transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" /> PDF İndir
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2E5B39] text-white hover:bg-[#254A2E] rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" /> Raporu Yazdır
        </button>
      </div>
    </div>
  );
};
