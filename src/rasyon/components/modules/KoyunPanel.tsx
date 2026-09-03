import React from 'react';
import { KoyunInputs, KoyunTip, KoyunYavru } from '../../types';
import { ihtiyacKoyun } from '../../utils/nutrition';
import { KOYUN_TIP, KOYUN_NOT } from '../../data/reproduction';
import { fmt } from '../../utils/formatters';
import { GlossaryText, FarmerTerm } from '../GlossaryText';

interface KoyunPanelProps {
  inputs: KoyunInputs;
  onChange: (inputs: KoyunInputs) => void;
  onToast: (msg: string) => void;
}

export const KoyunPanel: React.FC<KoyunPanelProps> = ({
  inputs,
  onChange,
  onToast,
}) => {
  const iht = ihtiyacKoyun(
    inputs.tip,
    inputs.ka,
    inputs.acab / 1000,
    inputs.sut,
    inputs.yavru
  );

  const handleTipChange = (tip: KoyunTip) => {
    const kaba = KOYUN_TIP[tip].kaba;
    onChange({ ...inputs, tip, kabaMin: kaba });
    onToast(`${KOYUN_TIP[tip].ad} profili uygulandı — kaba yem alt sınırı güncellendi.`);
  };

  return (
    <div className="bg-[#FCFBF6] border border-[#DCD7C4] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      {/* Inputs */}
      <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#DCD7C4]">
        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Hayvan tipi / fizyolojik dönem
          </label>
          <select
            value={inputs.tip}
            onChange={(e) => handleTipChange(e.target.value as KoyunTip)}
            className="w-full bg-white border border-[#DCD7C4] rounded-md px-3 py-2.5 font-sans text-sm focus:outline-none focus:border-[#2E5B39]"
          >
            <option value="kuzu">Besi kuzusu</option>
            <option value="idame">Anaç koyun — idame</option>
            <option value="geblik">Anaç koyun — gebelik (son 6 hafta)</option>
            <option value="lakt">Anaç koyun — laktasyon</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            Canlı ağırlık
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="range"
              min="20"
              max="90"
              step="1"
              value={inputs.ka}
              onChange={(e) => onChange({ ...inputs, ka: Number(e.target.value) })}
              className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
            />
            <input
              type="number"
              min="20"
              max="90"
              step="1"
              value={inputs.ka}
              onChange={(e) => onChange({ ...inputs, ka: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[36px]">kg</span>
          </div>
        </div>

        {inputs.tip === 'kuzu' && (
          <div className="mb-5">
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Hedef günlük canlı ağırlık artışı
            </label>
            <div className="flex items-center gap-3.5">
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={inputs.acab}
                onChange={(e) => onChange({ ...inputs, acab: Number(e.target.value) })}
                className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
              />
              <input
                type="number"
                min="100"
                max="500"
                step="10"
                value={inputs.acab}
                onChange={(e) => onChange({ ...inputs, acab: Number(e.target.value) })}
                className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160] min-w-[36px]">g/gün</span>
            </div>
          </div>
        )}

        {inputs.tip === 'lakt' && (
          <div className="mb-5">
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Günlük süt verimi
            </label>
            <div className="flex items-center gap-3.5">
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.25"
                value={inputs.sut}
                onChange={(e) => onChange({ ...inputs, sut: Number(e.target.value) })}
                className="flex-1 accent-[#2E5B39] h-5 cursor-pointer"
              />
              <input
                type="number"
                min="0.5"
                max="5"
                step="0.25"
                value={inputs.sut}
                onChange={(e) => onChange({ ...inputs, sut: Number(e.target.value) })}
                className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
              />
              <span className="font-mono-code text-xs text-[#6B7160] min-w-[36px]">kg/gün</span>
            </div>
          </div>
        )}

        {inputs.tip === 'geblik' && (
          <div className="mb-5">
            <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
              Rahimdeki yavru sayısı
            </label>
            <select
              value={inputs.yavru}
              onChange={(e) => onChange({ ...inputs, yavru: e.target.value as KoyunYavru })}
              className="w-full bg-white border border-[#DCD7C4] rounded-md px-3 py-2.5 font-sans text-sm focus:outline-none focus:border-[#2E5B39]"
            >
              <option value="tek">Tek</option>
              <option value="ikiz">İkiz</option>
            </select>
          </div>
        )}

        <div className="mb-5">
          <label className="block font-mono-code text-[11px] tracking-wider uppercase text-[#6B7160] mb-2 font-medium">
            <FarmerTerm termId="kaba_yem">Rasyonda kaba yem alt sınırı</FarmerTerm>
          </label>
          <div className="flex items-center gap-3.5">
            <input
              type="number"
              min="0"
              max="80"
              step="1"
              value={inputs.kabaMin}
              onChange={(e) => onChange({ ...inputs, kabaMin: Number(e.target.value) })}
              className="w-24 bg-white border border-[#DCD7C4] rounded-md px-2.5 py-2 font-mono-code text-sm text-right focus:outline-none focus:border-[#2E5B39]"
            />
            <span className="font-mono-code text-xs text-[#6B7160] min-w-[50px]">% KM</span>
          </div>
        </div>

        <p className="text-xs text-[#6B7160] leading-relaxed mt-2">
          <GlossaryText text="Profil değiştirdiğinizde kaba yem alt sınırı o dönemin tipik değerine çekilir; dilediğiniz gibi düzenleyebilirsiniz." />
        </p>
      </div>

      {/* Summary Table */}
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
            {inputs.tip === 'kuzu' ? (
              <>
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
              </>
            ) : (
              <>
                <tr className="border-b border-[#ECE8D8]">
                  <td className="py-2.5">
                    <GlossaryText text="Net enerji (NEL)" />
                  </td>
                  <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(iht.nel, 2)}</td>
                  <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">Mcal/gün</td>
                </tr>
                {inputs.tip === 'geblik' && (
                  <tr className="border-b border-[#ECE8D8]">
                    <td className="py-2.5">
                      <GlossaryText text="Gebelik enerji eki" />
                    </td>
                    <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(iht.ek, 2)}</td>
                    <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">Mcal/gün</td>
                  </tr>
                )}
                {inputs.tip === 'lakt' && (
                  <tr className="border-b border-[#ECE8D8]">
                    <td className="py-2.5">
                      <GlossaryText text="Süt için enerji" />
                    </td>
                    <td className="py-2.5 font-mono-code font-semibold text-right">{fmt(iht.sutE, 2)}</td>
                    <td className="py-2.5 font-mono-code text-xs text-[#6B7160] text-right">Mcal/gün</td>
                  </tr>
                )}
              </>
            )}
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
          <GlossaryText text={KOYUN_NOT[inputs.tip]} />
        </p>
      </div>
    </div>
  );
};
