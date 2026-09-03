import { FeedIngredient, KoyunTip, KoyunYavru, KeciTip, KeciYavru } from '../types';
import { Constraint, ikiAsamaliSimplex, SimplexResult } from './simplex';

export function ihtiyacBesi(ka: number, acabKg: number) {
  const u = Math.pow(ka, 0.75);
  return {
    dmi: 0.115 * u,
    nem: 0.0774 * u,
    neg: 0.0635 * u * Math.pow(acabKg, 1.097),
    hp: 0.115 * u * (104 + 28 * acabKg),
    ca: 0.0154 * ka + 0.0185 * acabKg * 1000,
    p: 0.014 * ka + 0.014 * acabKg * 1000,
  };
}

export function ihtiyacSut(ka: number, sut: number, yag: number, dim: number) {
  const u = Math.pow(ka, 0.75);
  const fcm = sut * (0.4 + 0.15 * yag);
  const dmiF = 0.82 + 0.18 * Math.min(1, dim / 105);
  // NRC (2001) Crude Protein requirement: maintenance (5.75 * BW^0.75) + milk CP (85 g / kg milk at 3.2% protein)
  const hp = 5.75 * u + 85 * sut;
  return {
    dmi: (0.372 * fcm + 0.0968 * u) * dmiF,
    fcm,
    nel: 0.08 * u + 0.749 * fcm,
    hp,
    ca: 0.06 * ka + 1.9 * sut,
    p: 0.035 * ka + 1.3 * sut,
  };
}

export function ihtiyacKoyun(
  tip: KoyunTip,
  ka: number,
  acabKg: number,
  sut: number,
  yavru: KoyunYavru
) {
  const u = Math.pow(ka, 0.75);
  if (tip === 'kuzu') {
    const dmi = 0.035 * ka;
    return {
      dmi,
      nem: 0.0635 * u,
      neg: 0.138 * u * Math.pow(acabKg, 1.097),
      hp: dmi * (100 + 80 * acabKg),
      ca: dmi * 4.0,
      p: dmi * 2.5,
      tip,
      nel: 0,
      ek: 0,
      sutE: 0,
    };
  }
  let dmi = 0;
  let nel = 0;
  let hp = 0;
  let ca = 0;
  let p = 0;
  let ek = 0;
  let sutE = 0;

  if (tip === 'idame') {
    dmi = 0.025 * ka;
    nel = 0.096 * u;
    hp = dmi * 95;
    ca = dmi * 3.0;
    p = dmi * 2.0;
  } else if (tip === 'geblik') {
    dmi = 0.026 * ka;
    ek = yavru === 'ikiz' ? 0.85 : 0.45;
    nel = 0.096 * u + ek;
    hp = dmi * 110;
    ca = dmi * 3.5;
    p = dmi * 2.0;
  } else {
    dmi = 0.025 * ka + 0.55 * sut;
    sutE = 1.1 * sut;
    nel = 0.096 * u + sutE;
    hp = 2.5 * ka + 100 * sut;
    ca = 0.05 * ka + 2.2 * sut;
    p = 0.028 * ka + 1.4 * sut;
  }
  return { dmi, nel, hp, ca, p, ek, sutE, tip, nem: 0, neg: 0 };
}

export function ihtiyacKeci(
  tip: KeciTip,
  ka: number,
  acabKg: number,
  sut: number,
  yavru: KeciYavru
) {
  const u = Math.pow(ka, 0.75);
  if (tip === 'oglak') {
    const dmi = 0.035 * ka;
    return {
      dmi,
      nem: 0.068 * u,
      neg: 0.142 * u * Math.pow(acabKg, 1.097),
      hp: dmi * (100 + 85 * acabKg),
      ca: dmi * 4.0,
      p: dmi * 2.5,
      tip,
      nel: 0,
      ek: 0,
      sutE: 0,
    };
  }
  let dmi = 0;
  let nel = 0;
  let hp = 0;
  let ca = 0;
  let p = 0;
  let ek = 0;
  let sutE = 0;

  if (tip === 'idame') {
    dmi = 0.028 * ka;
    nel = 0.075 * u;
    hp = dmi * 95;
    ca = dmi * 3.0;
    p = dmi * 2.0;
  } else if (tip === 'geblik') {
    dmi = 0.027 * ka;
    ek = yavru === 'ucuz' ? 1.1 : yavru === 'ikiz' ? 0.8 : 0.4;
    nel = 0.075 * u + ek;
    hp = dmi * 110;
    ca = dmi * 3.5;
    p = dmi * 2.0;
  } else {
    dmi = 0.025 * ka + 0.5 * sut;
    sutE = 0.72 * sut;
    nel = 0.075 * u + sutE;
    hp = 2.5 * ka + 80 * sut;
    ca = 0.05 * ka + 2.0 * sut;
    p = 0.028 * ka + 1.3 * sut;
  }
  return { dmi, nel, hp, ca, p, ek, sutE, tip, nem: 0, neg: 0 };
}

export function rasyonCoz(
  secili: FeedIngredient[],
  iht: any,
  g: any
): SimplexResult {
  const n = secili.length;
  const dmi = iht.dmi;
  const kisit: Constraint[] = [];
  const E = () => new Array(n).fill(0);
  const ekle = (a: number[], s: '<=' | '>=' | '=', b: number) =>
    kisit.push({ a, sense: s, b });

  // 1. Kuru madde eşitliği
  ekle(
    E().map(() => 1),
    '=',
    dmi
  );

  let a: number[];
  const gencBesi =
    (g.modul === 'koyun' && g.tip === 'kuzu') ||
    (g.modul === 'keci' && g.tip === 'oglak');

  if (g.modul === 'besi' || gencBesi) {
    a = E();
    secili.forEach((f, j) => (a[j] = f.nem));
    ekle(a, '>=', iht.nem);

    a = E();
    secili.forEach((f, j) => (a[j] = f.neg));
    ekle(a, '>=', iht.neg);
  } else if (g.modul === 'sut') {
    a = E();
    secili.forEach((f, j) => (a[j] = f.nel));
    ekle(a, '>=', iht.nel);

    a = E();
    secili.forEach((f, j) => (a[j] = f.ndf / 100));
    ekle(a, '>=', (g.ndfMin / 100) * dmi);
  } else {
    a = E();
    secili.forEach((f, j) => (a[j] = f.nel));
    ekle(a, '>=', iht.nel);
  }

  // Ham protein (g/gün -> kg/gün / 10 -> %)
  a = E();
  secili.forEach((f, j) => (a[j] = f.hp));
  ekle(a, '>=', iht.hp / 10);

  // Kalsiyum
  a = E();
  secili.forEach((f, j) => (a[j] = f.ca));
  ekle(a, '>=', iht.ca / 10);

  // Fosfor
  a = E();
  secili.forEach((f, j) => (a[j] = f.p));
  ekle(a, '>=', iht.p / 10);

  // Kaba yem alt sınırı
  a = E();
  secili.forEach((f, j) => {
    if (f.kaba) a[j] = 1;
  });
  ekle(a, '>=', (g.kabaMin / 100) * dmi);

  // Hammadde min ve max kısıtları
  secili.forEach((f, j) => {
    const mx = (f.max / 100) * dmi;
    if (mx < dmi - 1e-9) {
      const r = E();
      r[j] = 1;
      ekle(r, '<=', Math.max(0, mx));
    }
    const mn = (f.min / 100) * dmi;
    if (mn > 1e-9) {
      const r = E();
      r[j] = 1;
      ekle(r, '>=', mn);
    }
  });

  // Hedef fonksiyon: Min maliyet (KM bazında ₺/kg KM = canlı fiyat / dm)
  const mly = secili.map((f) => f.fiyat / f.dm);
  return ikiAsamaliSimplex(n, kisit, mly);
}

import {
  BesiInputs,
  SutInputs,
  KoyunInputs,
  KeciInputs,
  RationResultData,
  RationIngredientResult,
  RationIngredientKalem,
  RationResultNutrient,
} from '../types';

function buildRationResult(
  sol: SimplexResult,
  secili: FeedIngredient[],
  iht: any,
  g: any
): RationResultData {
  if (!sol.ok) {
    return {
      ok: false,
      basarili: false,
      hataMesaji:
        'Matematiksel kısıtlar altında uygun rasyon çözümü bulunamadı. Kaba yem alt sınırını esnetmeyi veya hammadde çeşitliliğini artırmayı deneyin.',
      satirlar: [],
      kalemler: [],
      besinler: [],
      dmi: iht?.dmi || 0,
      toplamDmi: iht?.dmi || 0,
      toplamYasYem: 0,
      kmMaliyeti: 0,
      kabaOran: 0,
      toplamTl: 0,
      gunlukMaliyet: 0,
      toplamCanli: 0,
      verilen: {
        km: 0,
        nem: 0,
        neg: 0,
        nel: 0,
        ndf: 0,
        hp: 0,
        ca: 0,
        p: 0,
      },
      iht,
      g,
      ozetSatiri: 'Çözüm bulunamadı',
      tarih: new Date().toISOString().slice(0, 10),
    };
  }

  const dmi = iht.dmi;
  const satirlar: RationIngredientResult[] = [];

  secili.forEach((f, j) => {
    const km = Math.max(0, sol.x[j] || 0);
    if (km > 1e-4) {
      const af = km / f.dm;
      const pct = dmi > 0 ? (km / dmi) * 100 : 0;
      const tl = af * f.fiyat;
      satirlar.push({ f, km, af, pct, tl });
    }
  });

  satirlar.sort((a, b) => b.km - a.km);

  const toplamCanli = satirlar.reduce((s, r) => s + r.af, 0);
  const toplamTl = satirlar.reduce((s, r) => s + r.tl, 0);
  const kabaKm = satirlar
    .filter((r) => r.f.kaba)
    .reduce((s, r) => s + r.km, 0);
  const kabaOran = dmi > 0 ? (kabaKm / dmi) * 100 : 0;

  const verilen = {
    km: dmi,
    nem: satirlar.reduce((s, r) => s + r.km * r.f.nem, 0),
    neg: satirlar.reduce((s, r) => s + r.km * r.f.neg, 0),
    nel: satirlar.reduce((s, r) => s + r.km * r.f.nel, 0),
    ndf:
      dmi > 0
        ? satirlar.reduce((s, r) => s + r.km * r.f.ndf, 0) / dmi
        : 0,
    hp: satirlar.reduce((s, r) => s + r.km * r.f.hp * 10, 0), // g/gün
    ca: satirlar.reduce((s, r) => s + r.km * r.f.ca * 10, 0), // g/gün
    p: satirlar.reduce((s, r) => s + r.km * r.f.p * 10, 0),   // g/gün
  };

  const kmMaliyeti = dmi > 0 ? toplamTl / dmi : 0;
  const toplamDmi = dmi;
  const toplamYasYem = toplamCanli;
  const gunlukMaliyet = toplamTl;

  const kalemler: RationIngredientKalem[] = satirlar.map((s) => ({
    id: s.f.id,
    ad: s.f.ad,
    kaba: s.f.kaba,
    yasKg: s.af,
    dmKg: s.km,
    pay: s.pct,
    maliyet: s.tl,
    maliyetPayi: toplamTl > 0 ? (s.tl / toplamTl) * 100 : 0,
  }));

  const besinler: RationResultNutrient[] = [];

  // 1. Kuru Madde
  besinler.push({
    ad: 'Kuru Madde (KM)',
    ihtiyac: iht.dmi,
    saglanan: verilen.km,
    birim: 'kg/gün',
    oran: iht.dmi > 0 ? (verilen.km / iht.dmi) * 100 : 100,
  });

  // 2. Enerji normları (NRC/INRA)
  if (
    g.modul === 'besi' ||
    (g.modul === 'koyun' && iht.tip === 'kuzu') ||
    (g.modul === 'keci' && iht.tip === 'oglak')
  ) {
    besinler.push({
      ad: 'Net Bakım Enerjisi (NEm)',
      ihtiyac: iht.nem,
      saglanan: verilen.nem,
      birim: 'Mcal/gün',
      oran: iht.nem > 0 ? (verilen.nem / iht.nem) * 100 : 100,
    });
    besinler.push({
      ad: 'Net Büyüme Enerjisi (NEg)',
      ihtiyac: iht.neg,
      saglanan: verilen.neg,
      birim: 'Mcal/gün',
      oran: iht.neg > 0 ? (verilen.neg / iht.neg) * 100 : 100,
    });
  } else {
    besinler.push({
      ad: 'Net Laktasyon Enerjisi (NEL)',
      ihtiyac: iht.nel,
      saglanan: verilen.nel,
      birim: 'Mcal/gün',
      oran: iht.nel > 0 ? (verilen.nel / iht.nel) * 100 : 100,
    });
  }

  // 3. Ham Protein
  besinler.push({
    ad: 'Ham Protein (HP)',
    ihtiyac: iht.hp,
    saglanan: verilen.hp,
    birim: 'g/gün',
    oran: iht.hp > 0 ? (verilen.hp / iht.hp) * 100 : 100,
  });

  // 4. Kalsiyum
  besinler.push({
    ad: 'Kalsiyum (Ca)',
    ihtiyac: iht.ca,
    saglanan: verilen.ca,
    birim: 'g/gün',
    oran: iht.ca > 0 ? (verilen.ca / iht.ca) * 100 : 100,
  });

  // 5. Fosfor
  besinler.push({
    ad: 'Fosfor (P)',
    ihtiyac: iht.p,
    saglanan: verilen.p,
    birim: 'g/gün',
    oran: iht.p > 0 ? (verilen.p / iht.p) * 100 : 100,
  });

  // 6. NDF (Süt inekleri için rumen sağlığı normu)
  if (g.modul === 'sut') {
    const ndfHedef = g.ndfMin || 28;
    besinler.push({
      ad: 'Nötral Deterjan Lif (NDF)',
      ihtiyac: ndfHedef,
      saglanan: verilen.ndf,
      birim: '% KM',
      oran: ndfHedef > 0 ? (verilen.ndf / ndfHedef) * 100 : 100,
    });
  }

  // 7. Kaba Yem Oranı
  if (g.kabaMin !== undefined && g.kabaMin > 0) {
    besinler.push({
      ad: 'Kaba Yem Oranı',
      ihtiyac: g.kabaMin,
      saglanan: kabaOran,
      birim: '% KM',
      oran: (kabaOran / g.kabaMin) * 100,
    });
  }

  const ozetSatiri = `${dmi.toFixed(2)} kg KM · %${kabaOran.toFixed(
    0
  )} Kaba Yem · ${toplamTl.toFixed(2)} ₺/gün`;

  return {
    ok: true,
    basarili: true,
    satirlar,
    kalemler,
    besinler,
    dmi,
    toplamDmi,
    toplamYasYem,
    kmMaliyeti,
    kabaOran,
    toplamTl,
    gunlukMaliyet,
    toplamCanli,
    verilen,
    iht,
    g,
    ozetSatiri,
    tarih: new Date().toISOString().slice(0, 10),
  };
}

export function hesaplaRasyonBesi(
  inputs: BesiInputs,
  secili: FeedIngredient[]
): RationResultData {
  const iht = ihtiyacBesi(inputs.ka, inputs.acab / 1000);
  const g = { modul: 'besi', kabaMin: inputs.kabaMin };
  const sol = rasyonCoz(secili, iht, g);
  return buildRationResult(sol, secili, iht, g);
}

export function hesaplaRasyonSut(
  inputs: SutInputs,
  secili: FeedIngredient[]
): RationResultData {
  const iht = ihtiyacSut(inputs.ka, inputs.sut, inputs.yag, inputs.dim);
  const g = {
    modul: 'sut',
    kabaMin: inputs.kabaMin,
    ndfMin: inputs.ndfMin,
  };
  const sol = rasyonCoz(secili, iht, g);
  return buildRationResult(sol, secili, iht, g);
}

export function hesaplaRasyonKoyun(
  inputs: KoyunInputs,
  secili: FeedIngredient[]
): RationResultData {
  const iht = ihtiyacKoyun(
    inputs.tip,
    inputs.ka,
    inputs.acab / 1000,
    inputs.sut,
    inputs.yavru
  );
  const g = {
    modul: 'koyun',
    tip: inputs.tip,
    kabaMin: inputs.kabaMin,
  };
  const sol = rasyonCoz(secili, iht, g);
  return buildRationResult(sol, secili, iht, g);
}

export function hesaplaRasyonKeci(
  inputs: KeciInputs,
  secili: FeedIngredient[]
): RationResultData {
  const iht = ihtiyacKeci(
    inputs.tip,
    inputs.ka,
    inputs.acab / 1000,
    inputs.sut,
    inputs.yavru
  );
  const g = {
    modul: 'keci',
    tip: inputs.tip,
    kabaMin: inputs.kabaMin,
  };
  const sol = rasyonCoz(secili, iht, g);
  return buildRationResult(sol, secili, iht, g);
}

