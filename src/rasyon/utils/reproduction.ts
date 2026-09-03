import {
  GebTakvimInputs,
  KizTakvimInputs,
  ReproTur,
  CowBreed,
} from '../types';
import {
  gebSure,
  gebKilometre,
  KIZ_TUR,
  GebMilestone,
} from '../data/reproduction';
import { bugun0, parseTarih, tarihEkle } from './formatters';

export interface GebResultData {
  ok: boolean;
  tur: ReproTur;
  irk: CowBreed;
  L: number;
  bred?: Date;
  gestDay?: number;
  due?: Date;
  pct?: number;
  kalan?: number;
  durum?: string;
  kilometre?: Array<GebMilestone & { tarih: Date }>;
  sonrakiIdx?: number;
}

export function gebHesapla(inputs: GebTakvimInputs): GebResultData {
  const { tur, irk, tarih: str } = inputs;
  const L = gebSure(tur, irk);
  if (!str) return { ok: false, tur, irk, L };

  const bred = parseTarih(str);
  const gestDay = Math.round((bugun0().getTime() - bred.getTime()) / 86400000);
  const due = tarihEkle(bred, L);
  const pct = Math.min(100, Math.max(0, (gestDay / L) * 100));
  const kalan = L - gestDay;

  let durum: string;
  if (gestDay < 0) durum = 'Tohumlama tarihi gelecekte';
  else if (gestDay === 0) durum = 'Bugün tohumlama';
  else if (gestDay > L + 5) durum = 'Tahmini doğum geçti';
  else if (gestDay >= L - 5) durum = 'Doğum penceresi';
  else durum = 'Gebelik sürüyor';

  const kilometre = gebKilometre(tur, L).map((m) => ({
    ...m,
    tarih: tarihEkle(bred, m.day),
  }));

  const sonrakiIdx =
    gestDay > L ? -1 : kilometre.findIndex((m) => m.day > gestDay);

  return {
    ok: true,
    tur,
    irk,
    L,
    bred,
    gestDay,
    due,
    pct,
    kalan,
    durum,
    kilometre,
    sonrakiIdx,
  };
}

export interface KizTahmin {
  n: number;
  t: Date;
  dogum: Date;
}

export interface KizResultData {
  ok: boolean;
  tur: ReproTur;
  irk: CowBreed;
  L: number;
  T: any;
  ileri?: boolean;
  onset?: Date;
  gecen?: number;
  donguGun?: number;
  faz?: string;
  kalan?: number;
  sonraki?: Date;
  tahminler?: KizTahmin[];
  bugunKiz?: boolean;
}

export function kizHesapla(inputs: KizTakvimInputs): KizResultData {
  const { tur, irk, tarih: str, adet } = inputs;
  const T = KIZ_TUR[tur];
  const L = T.dongu;
  if (!str) return { ok: false, tur, irk, L, T };

  const onset = parseTarih(str);
  const gecen = Math.round((bugun0().getTime() - onset.getTime()) / 86400000);
  if (gecen < 0) return { ok: false, tur, irk, L, T, ileri: true };

  const donguGun = gecen % L;
  const kalan = L - donguGun;
  const sonraki = tarihEkle(onset, (Math.floor(gecen / L) + 1) * L);

  let faz: string;
  if (donguGun < T.kizgunlikGun) faz = 'Kızgınlık (östrus)';
  else if (donguGun < T.kizgunlikGun + 2) faz = 'Metöstrus';
  else if (donguGun < L - 3) faz = 'Diöstrus (luteal)';
  else faz = 'Proöstrus (foliküler)';

  const tahminler: KizTahmin[] = [];
  for (let n = 1; n <= adet; n++) {
    const t = tarihEkle(sonraki, (n - 1) * L);
    const dogum = tarihEkle(t, gebSure(tur, irk));
    tahminler.push({ n, t, dogum });
  }

  return {
    ok: true,
    tur,
    irk,
    L,
    T,
    onset,
    gecen,
    donguGun,
    faz,
    kalan,
    sonraki,
    tahminler,
    bugunKiz: donguGun < T.kizgunlikGun,
  };
}
