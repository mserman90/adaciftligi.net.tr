import React, { useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import { IofcInputs, IofcRecord } from '../../types';
import { iofcHesapla } from '../../utils/economics';
import { fmt, toInput, bugun0 } from '../../utils/formatters';
import { GlossaryText } from '../GlossaryText';

interface IofcPanelProps {
  inputs: IofcInputs;
  onChange: (inputs: IofcInputs) => void;
  sonRasyonMaliyetiSut: number | null;
  iofcRecords: IofcRecord[];
  onAddRecord: (rec: Omit<IofcRecord, 'id'>) => void;
  onClearRecords: () => void;
  onToast: (msg: string) => void;
}

export const IofcPanel: React.FC<IofcPanelProps> = ({
  inputs,
  onChange,
  sonRasyonMaliyetiSut,
  onAddRecord,
  onClearRecords,
  onToast,
}) => {
  const d = iofcHesapla(inputs);

  const [kayTarih, setKayTarih] = useState(toInput(bugun0()));
  const [kayVerim, setKayVerim] = useState(inputs.verim);
  const [kayFiyat, setKayFiyat] = useState(inputs.fiyat);
  const [kayYem, setKayYem] = useState(inputs.yem);

  const handleImportRasyon = () => {
    if (sonRasyonMaliyetiSut === null) {
      onToast('Önce Süt İneği modülünde bir rasyon hesaplayın; günlük yem maliyeti buraya aktarılır.');
      return;
    }
    const val = Math.round(sonRasyonMaliyetiSut);
    onChange({ ...inputs, yem: val });
    setKayYem(val);
    onToast(`Günlük yem maliyeti son rasyondan alındı: ${fmt(sonRasyonMaliyetiSut)} ₺/gün.`);
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (kayVerim <= 0 || kayFiyat <= 0) {
      onToast('Kayıt için süt verimi ve süt fiyatı sıfırdan büyük olmalıdır.');
      return;
    }
    const gelir = kayVerim * kayFiyat;
    const iofc = gelir - kayYem;
    const yemPayi = gelir > 0 ? (kayYem / gelir) * 100 : 0;
    onAddRecord({
      tarih: kayTarih,
      verim: kayVerim,
      fiyat: kayFiyat,
      yem: kayYem,
      iofc,
      yemPayi,
    });
    onToast(`SYGM kaydı eklendi: ${fmt(iofc, 1)} ₺/gün.`);
  };

  return (
    <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      {/* Inputs Column */}
      <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#DCD7C4]">
        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Günlük süt verimi
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="1"
              max="80"
              step="0.5"
              value={inputs.verim}
              onChange={(e) => {
                const val = Number(e.target.value);
                onChange({ ...inputs, verim: val });
                setKayVerim(val);
              }}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={inputs.verim}
              onChange={(e) => {
                const val = Number(e.target.value);
                onChange({ ...inputs, verim: val });
                setKayVerim(val);
              }}
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
              min="1"
              max="100"
              step="0.25"
              value={inputs.fiyat}
              onChange={(e) => {
                const val = Number(e.target.value);
                onChange({ ...inputs, fiyat: val });
                setKayFiyat(val);
              }}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="200"
              step="0.25"
              value={inputs.fiyat}
              onChange={(e) => {
                const val = Number(e.target.value);
                onChange({ ...inputs, fiyat: val });
                setKayFiyat(val);
              }}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[50px]">₺/kg</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Günlük yem maliyeti
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="0"
              max="800"
              step="5"
              value={inputs.yem}
              onChange={(e) => {
                const val = Number(e.target.value);
                onChange({ ...inputs, yem: val });
                setKayYem(val);
              }}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="1000"
              step="5"
              value={inputs.yem}
              onChange={(e) => {
                const val = Number(e.target.value);
                onChange({ ...inputs, yem: val });
                setKayYem(val);
              }}
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

        <div className="mb-6">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Sürüdeki inek sayısı
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="1"
              max="500"
              step="1"
              value={inputs.suru}
              onChange={(e) => onChange({ ...inputs, suru: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="1"
              max="1000"
              step="1"
              value={inputs.suru}
              onChange={(e) => onChange({ ...inputs, suru: Number(e.target.value) })}
              className="w-20 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160]">inek</span>
          </div>
        </div>

        {/* Mini Form: Add Record */}
        <div className="border border-[#DCD7C4] rounded-lg bg-white p-4 mb-4 shadow-2xs">
          <h4 className="font-heading text-sm font-bold text-[#20261A] mb-3">
            Günlük SYGM kaydı ekle
          </h4>
          <div className="mb-3">
            <label className="block font-mono-code text-[10px] uppercase text-[#6B7160] mb-1">
              Tarih
            </label>
            <input
              type="date"
              value={kayTarih}
              onChange={(e) => setKayTarih(e.target.value)}
              className="w-full border border-[#DCD7C4] rounded px-2.5 py-1.5 font-mono-code text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block font-mono-code text-[10px] uppercase text-[#6B7160] mb-1">
                Verim (kg)
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={kayVerim}
                onChange={(e) => setKayVerim(Number(e.target.value))}
                className="w-full border border-[#DCD7C4] rounded px-2.5 py-1.5 font-mono-code text-xs text-right"
              />
            </div>
            <div>
              <label className="block font-mono-code text-[10px] uppercase text-[#6B7160] mb-1">
                Fiyat (₺/kg)
              </label>
              <input
                type="number"
                min="0"
                step="0.25"
                value={kayFiyat}
                onChange={(e) => setKayFiyat(Number(e.target.value))}
                className="w-full border border-[#DCD7C4] rounded px-2.5 py-1.5 font-mono-code text-xs text-right"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-mono-code text-[10px] uppercase text-[#6B7160] mb-1">
              Yem maliyeti (₺/gün)
            </label>
            <input
              type="number"
              min="0"
              step="5"
              value={kayYem}
              onChange={(e) => setKayYem(Number(e.target.value))}
              className="w-full border border-[#DCD7C4] rounded px-2.5 py-1.5 font-mono-code text-xs text-right"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddLog}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-[#2E5B39] text-[#2E5B39] hover:bg-[#E6EBDD] rounded text-xs font-semibold cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Kayıt ekle
            </button>
            <button
              type="button"
              onClick={onClearRecords}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#DCD7C4] hover:bg-[#F2EFE2] rounded text-xs text-[#6B7160] cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Defteri temizle
            </button>
          </div>
        </div>

        <p className="text-xs text-[#6B7160] leading-relaxed">
          <GlossaryText text="SYGM" /> = (verim × fiyat) − yem maliyeti. Yem maliyetini Süt İneği modülündeki optimum rasyondan <strong>“Son rasyondan aktar”</strong> ile alabilirsiniz.
        </p>
      </div>

      {/* Summary */}
      <div className="p-6 md:p-7">
        <table className="w-full text-[13.5px] border-collapse">
          <thead>
            <tr>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-left pb-2.5 border-b border-[#DCD7C4] font-medium">
                SYGM özeti
              </th>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right pb-2.5 border-b border-[#DCD7C4] font-medium">
                Değer
              </th>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right pb-2.5 border-b border-[#DCD7C4] font-medium w-16"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Günlük süt geliri</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.gelir, 1)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/gün</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Günlük yem maliyeti</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.yem, 1)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/gün</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5 font-bold text-[#2E5B39]"><GlossaryText text="SYGM" /></td>
              <td className={`py-2.5 font-mono-code font-bold text-right ${d.iofc < 0 ? 'text-[#8A3B2E]' : 'text-[#2E5B39]'}`}>
                {fmt(d.iofc, 1)}
              </td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/gün</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5"><GlossaryText text="SYGM" /> / kg süt</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.iofcKg, 2)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/kg</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Yem payı</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">%{fmt(d.yemPayi, 1)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right"></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">SYGM (IOFC) (aylık)</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(d.iofcAy, 0)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/ay</td>
            </tr>
            <tr>
              <td className="py-2.5">Sürü <GlossaryText text="SYGM" /> (günlük)</td>
              <td className="py-2.5 font-mono-code font-bold text-[#2E5B39] text-right">{fmt(d.suruGun, 0)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">₺/gün</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-[#6B7160] leading-relaxed mt-4">
          <GlossaryText text="SYGM" /> sabit giderleri içermez; işçilik, amortizasyon ve diğer giderler SYGM'den karşılanmalıdır. Tam kâr analizi için Süt Kârlılığı modülüne bakın.
        </p>
      </div>
    </div>
  );
};
