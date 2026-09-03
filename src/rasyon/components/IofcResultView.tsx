import { FarmerTerm } from './GlossaryText';
import React from 'react';
import { Download, Printer, Trash2 } from 'lucide-react';
import { IofcInputs, IofcRecord } from '../types';
import { iofcHesapla } from '../utils/economics';
import { fmt } from '../utils/formatters';

interface IofcResultViewProps {
  inputs: IofcInputs;
  records: IofcRecord[];
  onDeleteRecord?: (id: string) => void;
  onToast: (msg: string) => void;
}

export const IofcResultView: React.FC<IofcResultViewProps> = ({
  inputs,
  records,
  onDeleteRecord,
  onToast,
}) => {
  const d = iofcHesapla(inputs);

  const handleDownloadCsv = () => {
    let csv = `Tarih,Verim (kg),Sut Fiyati (TL),Yem Maliyeti (TL),SYGM (TL/gun),Yem Payi (%)\n`;
    if (records.length > 0) {
      records.forEach((r) => {
        csv += `"${r.tarih}",${fmt(r.verim, 1)},${fmt(r.fiyat, 2)},${fmt(r.yem, 2)},${fmt(r.iofc, 2)},${fmt(r.yemPayi, 1)}\n`;
      });
    } else {
      csv += `"Bugun",${fmt(inputs.verim, 1)},${fmt(inputs.fiyat, 2)},${fmt(inputs.yem, 2)},${fmt(d.iofc, 2)},${fmt(d.yemPayi, 1)}\n`;
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `adaciftligi_sygm_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('SYGM verileri CSV olarak indirildi.');
  };

  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            <FarmerTerm termId="iofc">SYGM</FarmerTerm> (inek / gün)
          </span>
          <div
            className={`font-mono-code text-2xl font-bold ${
              d.iofc < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'
            }`}
          >
            {fmt(d.iofc, 1)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">₺/gün</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">süt geliri − yem maliyeti</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            <FarmerTerm termId="iofc">SYGM</FarmerTerm> / kg süt
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            {fmt(d.iofcKg, 2)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">₺/kg</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">kg başına marjinal pay</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Yem payı oranı
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#20261A]">
            %{fmt(d.yemPayi, 1)}
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">süt gelirinin yem payı</span>
        </div>

        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl p-4.5 shadow-2xs">
          <span className="block font-mono-code text-[10.5px] uppercase tracking-wider text-[#6B7160] mb-1">
            Sürü <FarmerTerm termId="iofc">SYGM</FarmerTerm> (aylık)
          </span>
          <div className="font-mono-code text-2xl font-bold text-[#2E5B39]">
            {fmt(d.suruGun * 30, 0)}{' '}
            <span className="text-xs font-normal text-[#6B7160]">₺/ay</span>
          </div>
          <span className="text-[11px] text-[#6B7160] mt-1 block">{inputs.suru} baş sürü için</span>
        </div>
      </div>

      {/* History Logbook Table */}
      {records.length > 0 && (
        <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 border-b border-[#DCD7C4] bg-[#FAF8F0] flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-[#20261A]">
              Kayıtlı Günlük SYGM Takip Defteri
            </h3>
            <span className="font-mono-code text-xs text-[#6B7160]">
              {records.length} kayıt
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-[#DCD7C4]">
                  <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-left font-medium">
                    Tarih
                  </th>
                  <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                    Verim (kg)
                  </th>
                  <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                    Fiyat (₺/kg)
                  </th>
                  <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                    Yem (₺/gün)
                  </th>
                  <th className="px-4 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                    SYGM (₺/gün)
                  </th>
                  <th className="px-3 py-2.5 font-mono-code text-[10.5px] uppercase text-[#6B7160] text-right font-medium">
                    Yem Payı
                  </th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-b border-[#ECE8D8] hover:bg-[#F4F1E4] transition-colors">
                    <td className="px-4 py-2.5 font-mono-code text-[#20261A] font-medium">
                      {r.tarih}
                    </td>
                    <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                      {fmt(r.verim, 1)}
                    </td>
                    <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                      {fmt(r.fiyat, 2)}
                    </td>
                    <td className="px-3 py-2.5 font-mono-code text-right text-[#20261A]">
                      {fmt(r.yem, 0)}
                    </td>
                    <td className="px-4 py-2.5 font-mono-code font-bold text-right text-[#2E5B39]">
                      {fmt(r.iofc, 1)} ₺
                    </td>
                    <td className="px-3 py-2.5 font-mono-code text-right text-[#6B7160]">
                      %{fmt(r.yemPayi, 1)}
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      {onDeleteRecord && (
                        <button
                          type="button"
                          onClick={() => onDeleteRecord(r.id)}
                          className="text-[#6B7160] hover:text-[#8A3B2E] p-1 cursor-pointer transition-colors"
                          title="Kaydı sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
