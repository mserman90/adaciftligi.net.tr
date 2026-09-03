import React from 'react';
import { BesiInputs } from '../../types';
import { ihtiyacBesi } from '../../utils/nutrition';
import { fmt } from '../../utils/formatters';
import { GlossaryText, FarmerTerm } from '../GlossaryText';

interface BesiPanelProps {
  inputs: BesiInputs;
  onChange: (inputs: BesiInputs) => void;
}

export const BesiPanel: React.FC<BesiPanelProps> = ({ inputs, onChange }) => {
  const iht = ihtiyacBesi(inputs.ka, inputs.acab / 1000);

  const handleKa = (v: number) => {
    onChange({ ...inputs, ka: Math.min(700, Math.max(150, v)) });
  };

  const handleAcab = (v: number) => {
    onChange({ ...inputs, acab: Math.min(2000, Math.max(400, v)) });
  };

  const handleKabaMin = (v: number) => {
    onChange({ ...inputs, kabaMin: Math.min(60, Math.max(0, v)) });
  };

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
              min="150"
              max="700"
              step="5"
              value={inputs.ka}
              onChange={(e) => handleKa(Number(e.target.value))}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="150"
              max="700"
              step="5"
              value={inputs.ka}
              onChange={(e) => handleKa(Number(e.target.value))}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39] focus:ring-2 focus:ring-[#2E5B39]/20"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[36px]">kg</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            <FarmerTerm termId="acab">Hedef günlük canlı ağırlık artışı (ACAB)</FarmerTerm>
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="400"
              max="2000"
              step="50"
              value={inputs.acab}
              onChange={(e) => handleAcab(Number(e.target.value))}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="400"
              max="2000"
              step="50"
              value={inputs.acab}
              onChange={(e) => handleAcab(Number(e.target.value))}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39] focus:ring-2 focus:ring-[#2E5B39]/20"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[36px]">g/gün</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            <FarmerTerm termId="kaba_yem">Rasyonda kaba yem alt sınırı</FarmerTerm>
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="number"
              min="0"
              max="60"
              step="1"
              value={inputs.kabaMin}
              onChange={(e) => handleKabaMin(Number(e.target.value))}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39] focus:ring-2 focus:ring-[#2E5B39]/20"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[50px]">% KM</span>
          </div>
        </div>

        <p className="text-xs text-[#6B7160] leading-relaxed mt-4">
          <GlossaryText text="Kaba yem alt sınırı, rumen sağlığı için günlük kuru maddenin en az bu kadarının kaba yemden karşılanmasını garanti eder." />
        </p>
      </div>

      {/* Summary Table Column */}
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
                <GlossaryText text="Net bakım enerjisi (NEm)" />
              </td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(iht.nem, 2)}</td>
              <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">Mcal/gün</td>
            </tr>
            <tr className="border-b border-[#ECE8D8]">
              <td className="py-2.5">
                <GlossaryText text="Net büyüme enerjisi (NEg)" />
              </td>
              <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(iht.neg, 2)}</td>
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
          <GlossaryText text="KM tüketimi canlı ağırlığın yaklaşık %2,2–2,8'i; NEm, NEg ve mineral değerleri NRC (2016) büyüme formüllerinden türetilmiş yaklaşık değerlerdir." />
        </p>
      </div>
    </div>
  );
};
