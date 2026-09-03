import React from 'react';
import { KizTakvimInputs, ReproTur, CowBreed } from '../../types';
import { KIZ_TUR, KIZ_NOT } from '../../data/reproduction';
import { kizHesapla } from '../../utils/reproduction';
import { fmtTarih } from '../../utils/formatters';

interface KizTakvimPanelProps {
  inputs: KizTakvimInputs;
  onChange: (inputs: KizTakvimInputs) => void;
}

export const KizTakvimPanel: React.FC<KizTakvimPanelProps> = ({
  inputs,
  onChange,
}) => {
  const d = kizHesapla(inputs);

  return (
    <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      {/* Inputs */}
      <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#DCD7C4]">
        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Tür
          </label>
          <select
            value={inputs.tur}
            onChange={(e) => onChange({ ...inputs, tur: e.target.value as ReproTur })}
            className="w-full bg-white border border-[#DCD7C4] rounded-md px-3 py-2.5 font-sans text-sm focus:outline-none focus:border-[#2E5B39]"
          >
            <option value="inek">İnek (Sığır)</option>
            <option value="koyun">Koyun</option>
            <option value="keci">Keçi</option>
            <option value="kisrak">Kısrak (At)</option>
            <option value="domuz">Domuz</option>
          </select>
        </div>

        {inputs.tur === 'inek' && (
          <div className="mb-5">
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Sığır ırkı (çiftleşilirse doğum öngörüsü için)
            </label>
            <select
              value={inputs.irk}
              onChange={(e) => onChange({ ...inputs, irk: e.target.value as CowBreed })}
              className="w-full bg-white border border-[#DCD7C4] rounded-md px-3 py-2.5 font-sans text-sm focus:outline-none focus:border-[#2E5B39]"
            >
              <option value="holstein">Holstein — 279 gün gebelik</option>
              <option value="simental">Simental — 285 gün gebelik</option>
              <option value="esmer">Esmer (Brown Swiss) — 288 gün gebelik</option>
              <option value="yerli">Yerli ırk / melez — ~280 gün gebelik</option>
            </select>
          </div>
        )}

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Son görülen kızgınlık tarihi
          </label>
          <input
            type="date"
            value={inputs.tarih}
            onChange={(e) => onChange({ ...inputs, tarih: e.target.value })}
            className="w-full bg-white border border-[#DCD7C4] rounded-md px-3 py-2.5 font-mono-code text-sm focus:outline-none focus:border-[#2E5B39]"
          />
        </div>

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Tahmin edilecek döngü sayısı
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={inputs.adet}
              onChange={(e) => onChange({ ...inputs, adet: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="1"
              max="6"
              step="1"
              value={inputs.adet}
              onChange={(e) => onChange({ ...inputs, adet: Number(e.target.value) })}
              className="w-20 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160]">döngü</span>
          </div>
        </div>

        <p className="text-xs text-[#6B7160] leading-relaxed mt-4">
          Girdiğiniz tarih, kızgınlığın <em>başlangıç (ilk belirti/gözlem) günü</em> olmalıdır.
        </p>
      </div>

      {/* Summary */}
      <div className="p-6 md:p-7">
        <table className="w-full text-[13.5px] border-collapse">
          <thead>
            <tr>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-left pb-2.5 border-b border-[#DCD7C4] font-medium">
                Döngü özeti
              </th>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right pb-2.5 border-b border-[#DCD7C4] font-medium">
                Değer
              </th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Son kızgınlık tarihi</td>
              <td className="py-2.5 font-mono-code text-right">
                {d.ok && d.onset ? fmtTarih(d.onset) : '—'}
              </td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Döngü uzunluğu</td>
              <td className="py-2.5 font-mono-code text-right">
                {KIZ_TUR[inputs.tur].dongu} gün ({KIZ_TUR[inputs.tur].aralik})
              </td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Döngü günü (bugün)</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">
                {d.ok && d.donguGun !== undefined ? `${d.donguGun}. gün` : '—'}
              </td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Döngü fazı</td>
              <td className="py-2.5 font-sans font-medium text-right text-[#20261A]">
                {d.ok ? d.faz : '—'}
              </td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Sonraki kızgınlık</td>
              <td className="py-2.5 font-mono-code font-bold text-[#2E5B39] text-right">
                {d.ok && d.sonraki ? fmtTarih(d.sonraki) : '—'}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="py-2.5">Kalan gün</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">
                {d.ok && d.kalan !== undefined ? `${d.kalan} gün` : '—'}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-[#6B7160] leading-relaxed mt-4">
          {KIZ_NOT[inputs.tur]}
        </p>
      </div>
    </div>
  );
};
