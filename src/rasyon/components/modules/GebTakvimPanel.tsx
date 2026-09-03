import React from 'react';
import { GebTakvimInputs, ReproTur, CowBreed } from '../../types';
import { GEB_IRKLAR, GEB_TUR } from '../../data/reproduction';
import { gebHesapla } from '../../utils/reproduction';
import { fmtTarih } from '../../utils/formatters';

interface GebTakvimPanelProps {
  inputs: GebTakvimInputs;
  onChange: (inputs: GebTakvimInputs) => void;
}

export const GebTakvimPanel: React.FC<GebTakvimPanelProps> = ({
  inputs,
  onChange,
}) => {
  const d = gebHesapla(inputs);

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
              Sığır ırkı (gebelik süresini etkiler)
            </label>
            <select
              value={inputs.irk}
              onChange={(e) => onChange({ ...inputs, irk: e.target.value as CowBreed })}
              className="w-full bg-white border border-[#DCD7C4] rounded-md px-3 py-2.5 font-sans text-sm focus:outline-none focus:border-[#2E5B39]"
            >
              <option value="holstein">Holstein — 279 gün</option>
              <option value="simental">Simental — 285 gün</option>
              <option value="esmer">Esmer (Brown Swiss) — 288 gün</option>
              <option value="yerli">Yerli ırk / melez — ~280 gün</option>
            </select>
          </div>
        )}

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Tohumlama / kuşatma tarihi
          </label>
          <input
            type="date"
            value={inputs.tarih}
            onChange={(e) => onChange({ ...inputs, tarih: e.target.value })}
            className="w-full bg-white border border-[#DCD7C4] rounded-md px-3 py-2.5 font-mono-code text-sm focus:outline-none focus:border-[#2E5B39]"
          />
        </div>

        <p className="text-xs text-[#6B7160] leading-relaxed mt-4">
          Tarih türü: sığır ve domuzda <em>tohumlama/çiftleştirme</em>, koyun-keçide <em>koç/teke katımı</em>, kısrakta <em>çiftleştirme veya embriyo transferi</em>.
        </p>
      </div>

      {/* Summary */}
      <div className="p-6 md:p-7">
        <table className="w-full text-[13.5px] border-collapse">
          <thead>
            <tr>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-left pb-2.5 border-b border-[#DCD7C4] font-medium">
                Gebelik özeti
              </th>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right pb-2.5 border-b border-[#DCD7C4] font-medium">
                Değer
              </th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Tohumlama / kuşatma</td>
              <td className="py-2.5 font-mono-code text-right">
                {d.ok && d.bred ? fmtTarih(d.bred) : '—'}
              </td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Tür · ırk</td>
              <td className="py-2.5 font-sans text-right">
                {GEB_TUR[inputs.tur].ad}
                {inputs.tur === 'inek' && ` · ${GEB_IRKLAR[inputs.irk].ad}`}
              </td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Gebelik süresi</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{d.L} gün</td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Gebelik günü (bugün)</td>
              <td className="py-2.5 font-mono-code font-semibold text-right">
                {d.ok && d.gestDay !== undefined && d.gestDay >= 0 ? `${d.gestDay}. gün` : '—'}
              </td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Tahmini doğum</td>
              <td className="py-2.5 font-mono-code font-bold text-[#2E5B39] text-right">
                {d.ok && d.due ? fmtTarih(d.due) : '—'}
              </td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Kalan gün</td>
              <td className={`py-2.5 font-mono-code font-semibold text-right ${d.kalan && d.kalan < 0 ? 'text-[#8A3B2E]' : ''}`}>
                {d.ok && d.kalan !== undefined ? `${d.kalan} gün` : '—'}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="py-2.5">Durum</td>
              <td className="py-2.5 font-sans font-medium text-right text-[#20261A]">
                {d.ok ? d.durum : 'Tarih girilmedi'}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-[#6B7160] leading-relaxed mt-4">
          Gebelik süreleri tür ve ırka göre değişir: inek 279–288, koyun 144–152, keçi 145–152, kısrak 330–345, domuz 112–116 gün.
        </p>
      </div>
    </div>
  );
};
