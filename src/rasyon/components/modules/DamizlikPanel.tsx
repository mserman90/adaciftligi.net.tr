import React from 'react';
import { DamizlikInputs, DamTur } from '../../types';
import { DAM_TUR, DAM_BAYRAK, DAM_NOT } from '../../data/breeding';
import { damHesapla } from '../../utils/economics';
import { fmt } from '../../utils/formatters';

import { GlossaryText } from '../GlossaryText';

interface DamizlikPanelProps {
  inputs: DamizlikInputs;
  onChange: (inputs: DamizlikInputs) => void;
}

export const DamizlikPanel: React.FC<DamizlikPanelProps> = ({
  inputs,
  onChange,
}) => {
  const d = damHesapla(inputs);
  const currentTurConfig = DAM_TUR[inputs.tur];

  const handleScoreChange = (kriterId: string, val: number) => {
    onChange({
      ...inputs,
      skorlar: {
        ...inputs.skorlar,
        [kriterId]: val,
      },
    });
  };

  const handleFlagToggle = (index: number) => {
    const updated = [...inputs.bayraklar];
    updated[index] = !updated[index];
    onChange({
      ...inputs,
      bayraklar: updated,
    });
  };

  return (
    <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      {/* Inputs Column */}
      <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#DCD7C4]">
        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Tür
          </label>
          <select
            value={inputs.tur}
            onChange={(e) => {
              const tur = e.target.value as DamTur;
              onChange({
                ...inputs,
                tur,
                skorlar: {},
              });
            }}
            className="w-full bg-white border border-[#DCD7C4] rounded-md px-3 py-2.5 font-sans text-sm focus:outline-none focus:border-[#2E5B39]"
          >
            <option value="inek">Süt İneği</option>
            <option value="besi">Besi Sığırı</option>
            <option value="koyun">Koyun</option>
            <option value="keci">Keçi</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Küpe / künye numarası (isteğe bağlı)
          </label>
          <input
            type="text"
            value={inputs.kupe}
            placeholder="örn. TR-34-1234"
            onChange={(e) => onChange({ ...inputs, kupe: e.target.value })}
            className="w-full bg-white border border-[#DCD7C4] rounded-md px-3 py-2 font-mono-code text-sm focus:outline-none focus:border-[#2E5B39]"
          />
        </div>

        {/* Criteria Sliders */}
        <div className="space-y-4 mb-6">
          {currentTurConfig.kriterler.map((k) => {
            const val = inputs.skorlar[k.id] !== undefined ? inputs.skorlar[k.id] : 3;
            return (
              <div key={k.id} className="pb-3 border-b border-[#ECE8D8] last:border-b-0">
                <div className="flex justify-between items-baseline gap-2 mb-1.5">
                  <span className="font-semibold text-[13.5px] text-[#20261A]">{k.ad}</span>
                  <span className="font-mono-code text-[10px] text-[#2E5B39] border border-[#B9C8B0] rounded-full px-2 py-0.5 whitespace-nowrap">
                    ağırlık %{k.ag}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={val}
                    onChange={(e) => handleScoreChange(k.id, Number(e.target.value))}
                    className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
                  />
                  <span className="font-mono-code text-xs font-semibold min-w-[54px] text-right">
                    {fmt(val, 1)}
                    <span className="text-[#6B7160] font-normal text-[11px]"> /5</span>
                  </span>
                </div>
                <p className="text-[11.5px] text-[#6B7160] mt-1.5">{k.ipucu}</p>
              </div>
            );
          })}
        </div>

        {/* Red flags */}
        <div className="border border-[#E5CFC5] rounded-xl bg-[#FBF7F2] p-4">
          <h4 className="font-heading text-sm font-bold text-[#8A3B2E] mb-2.5">
            Kırmızı bayraklar — kesin ayıklama
          </h4>
          <div className="space-y-2 mb-2">
            {DAM_BAYRAK.map((b, idx) => (
              <label key={idx} className="flex items-start gap-2.5 text-xs text-[#20261A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!inputs.bayraklar[idx]}
                  onChange={() => handleFlagToggle(idx)}
                  className="w-4 h-4 accent-[#8A3B2E] mt-0.5 shrink-0 cursor-pointer"
                />
                <span>{b.ad}</span>
              </label>
            ))}
          </div>
          <p className="text-[11px] text-[#6B7160]">
            Yukarıdakilerden herhangi biri işaretlenirse, bileşik skor ne kadar yüksek olursa olsun değerlendirme “Ayrıştırılır (D)” sınıfına düşer.
          </p>
        </div>
      </div>

      {/* Summary Column */}
      <div className="p-6 md:p-7">
        {/* Ring Gauge & Grade */}
        <div className="flex items-center gap-5 mb-6 flex-wrap">
          <div
            className="w-32 h-32 rounded-full relative shrink-0 flex items-center justify-center transition-all duration-300 shadow-xs"
            style={{
              background: `conic-gradient(${d.sinif.renk} ${(d.net * 3.6).toFixed(1)}deg, #E8E4D4 0deg)`,
            }}
          >
            <div className="absolute inset-2.5 rounded-full bg-[#FCFBF6] flex flex-col items-center justify-center">
              <span className="font-heading font-extrabold text-3xl leading-none text-[#20261A]">
                {fmt(d.net, 0)}
              </span>
              <span className="font-mono-code text-[10px] text-[#6B7160] mt-1">/ 100</span>
            </div>
          </div>
          <div className="flex-1 min-w-[140px]">
            <div className="font-heading font-extrabold text-2xl" style={{ color: d.sinif.renk }}>
              {d.sinif.kod} sınıfı
            </div>
            <div className="text-sm font-semibold text-[#3B4232] mt-0.5">{d.sinif.ad}</div>
            <div className="text-xs text-[#6B7160] mt-1.5 leading-relaxed">{d.sinif.aciklama}</div>
          </div>
        </div>

        <table className="w-full text-[13.5px] border-collapse">
          <thead>
            <tr>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-left pb-2.5 border-b border-[#DCD7C4] font-medium">
                Değerlendirme özeti
              </th>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right pb-2.5 border-b border-[#DCD7C4] font-medium">
                Değer
              </th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Tür</td>
              <td className="py-2.5 font-sans text-right">{d.T.ad}</td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Küpe / künye</td>
              <td className="py-2.5 font-mono-code text-right">{d.kupe || 'girilmedi'}</td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5 font-semibold">Bileşik skor</td>
              <td className="py-2.5 font-mono-code font-bold text-right text-lg" style={{ color: d.sinif.renk }}>
                {fmt(d.net, 0)} puan
              </td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">Sınıf</td>
              <td className="py-2.5 font-sans font-medium text-right">{d.sinif.kod} — {d.sinif.ad}</td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">En güçlü kriter</td>
              <td className="py-2.5 font-sans text-right text-[#2E5B39]">
                {d.guclu.ad} (%{fmt(d.guclu.pct, 0)})
              </td>
              <td></td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">En zayıf kriter</td>
              <td className="py-2.5 font-sans text-right text-[#8A3B2E]">
                {d.zayif.ad} (%{fmt(d.zayif.pct, 0)})
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="py-2.5">Kırmızı bayrak</td>
              <td className="py-2.5 font-sans font-semibold text-right text-[#8A3B2E]">
                {d.bayraklar.length ? `${d.bayraklar.length} işaretli` : 'Yok'}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="text-xs text-[#6B7160] leading-relaxed mt-4">
          <GlossaryText text={DAM_NOT[inputs.tur]} />
        </div>
      </div>
    </div>
  );
};
