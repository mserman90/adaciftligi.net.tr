import React from 'react';
import { SutInputs } from '../../types';
import { ihtiyacSut } from '../../utils/nutrition';
import { fmt } from '../../utils/formatters';
import { GlossaryText, FarmerTerm } from '../GlossaryText';

interface SutPanelProps {
  inputs: SutInputs;
  onChange: (inputs: SutInputs) => void;
}

export const SutPanel: React.FC<SutPanelProps> = ({ inputs, onChange }) => {
  const iht = ihtiyacSut(inputs.ka, inputs.sut, inputs.yag, inputs.dim);

  return (
    <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      {/* Inputs Column */}
      <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#DCD7C4]">
        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Canlı ağırlık
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="350"
              max="800"
              step="5"
              value={inputs.ka}
              onChange={(e) => onChange({ ...inputs, ka: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="350"
              max="800"
              step="5"
              value={inputs.ka}
              onChange={(e) => onChange({ ...inputs, ka: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[36px]">kg</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Günlük süt verimi
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="5"
              max="60"
              step="0.5"
              value={inputs.sut}
              onChange={(e) => onChange({ ...inputs, sut: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="5"
              max="60"
              step="0.5"
              value={inputs.sut}
              onChange={(e) => onChange({ ...inputs, sut: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[36px]">kg/gün</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Süt yağ oranı
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="2.5"
                max="6"
                step="0.1"
                value={inputs.yag}
                onChange={(e) => onChange({ ...inputs, yag: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">%</span>
            </div>
          </div>
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Laktasyon günü
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="10"
                max="400"
                step="5"
                value={inputs.dim}
                onChange={(e) => onChange({ ...inputs, dim: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">gün</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              <FarmerTerm termId="kaba_yem">Kaba yem alt sınırı</FarmerTerm>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="80"
                step="1"
                value={inputs.kabaMin}
                onChange={(e) => onChange({ ...inputs, kabaMin: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">% KM</span>
            </div>
          </div>
          <div>
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              <FarmerTerm termId="ndf">NDF alt sınırı</FarmerTerm>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                value={inputs.ndfMin}
                onChange={(e) => onChange({ ...inputs, ndfMin: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160]">% KM</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6B7160] leading-relaxed mt-2">
          <GlossaryText text="Kaba yem ve NDF alt sınırları rumen dolgunluğunu ve süt yağ oranını korur; yüksek verimli ineklerde toplam NDF genellikle %25–32 KM bandında hedeflenir." />
        </p>
      </div>

      {/* Summary Column */}
      <div className="p-6 md:p-7">
        <table className="w-full text-[13.5px] border-collapse">
          <thead>
            <tr>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-left pb-2.5 border-b border-[#DCD7C4] font-medium">
                Besin maddesi
              </th>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right pb-2.5 border-b border-[#DCD7C4] font-medium">
                Günlük ihtiyaç
              </th>
              <th className="font-mono-code text-[10.5px] tracking-wider uppercase text-[#6B7160] text-right pb-2.5 border-b border-[#DCD7C4] font-medium w-20"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">
                <GlossaryText text="Kuru madde tüketimi" />
              </td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(iht.dmi, 2)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">kg/gün</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">
                <GlossaryText text="Süt (4% yağlı eşdeğer, FCM)" />
              </td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(iht.fcm, 1)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">kg/gün</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">
                <GlossaryText text="Net laktasyon enerjisi (NEL)" />
              </td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(iht.nel, 2)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">Mcal/gün</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">
                <GlossaryText text="Ham protein" />
              </td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(iht.hp, 0)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">g/gün</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">
                <GlossaryText text="Kalsiyum" />
              </td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(iht.ca, 1)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">g/gün</td>
            </tr>
            <tr>
              <td className="py-2.5">
                <GlossaryText text="Fosfor" />
              </td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(iht.p, 1)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">g/gün</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-[#6B7160] leading-relaxed mt-4">
          <GlossaryText text="KM tüketimi NRC (2001) eşitliğiyle laktasyon gününe göre düzeltilir. NEL ihtiyacı = bakım (0,08 × KA⁰·⁷⁵) + süt enerjisi (0,749 Mcal / kg 4% FCM). Ham protein = bakım (5,75 × KA⁰·⁷⁵) + süt üretimi (85 g / kg süt)." />
        </p>
      </div>
    </div>
  );
};
