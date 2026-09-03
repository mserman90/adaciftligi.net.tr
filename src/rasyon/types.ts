export type Language = 'tr' | 'en';
export type ModuleKey =
  | 'besi'
  | 'sut'
  | 'koyun'
  | 'keci'
  | 'sutEko'
  | 'besiEko'
  | 'gebTakvim'
  | 'kizTakvim'
  | 'iofc'
  | 'damizlik';

export interface FeedIngredient {
  id: string;
  ad: string;
  dm: number;     // Kuru madde oranı (0-1)
  nem: number;    // NEm (Mcal/kg KM)
  neg: number;    // NEg (Mcal/kg KM)
  nel: number;    // NEL (Mcal/kg KM)
  hp: number;     // Ham protein %
  ca: number;     // Ca %
  p: number;      // P %
  ndf: number;    // NDF %
  kaba: boolean;  // Kaba yem mi
  fiyat: number;  // ₺/kg yaş yem
  min: number;    // Min % KM
  max: number;    // Max % KM
}

export interface BesiInputs {
  ka: number;
  acab: number;
  kabaMin: number;
}

export interface SutInputs {
  ka: number;
  sut: number;
  yag: number;
  dim: number;
  kabaMin: number;
  ndfMin: number;
}

export type KoyunTip = 'kuzu' | 'idame' | 'geblik' | 'lakt';
export type KoyunYavru = 'tek' | 'ikiz';

export interface KoyunInputs {
  tip: KoyunTip;
  ka: number;
  acab: number;
  sut: number;
  yavru: KoyunYavru;
  kabaMin: number;
}

export type KeciTip = 'oglak' | 'idame' | 'geblik' | 'lakt';
export type KeciYavru = 'tek' | 'ikiz' | 'ucuz';

export interface KeciInputs {
  tip: KeciTip;
  ka: number;
  acab: number;
  sut: number;
  yavru: KeciYavru;
  kabaMin: number;
}

export interface SutEkoInputs {
  verim: number;
  fiyat: number;
  lakt: number;
  kuru: number;
  yemL: number;
  yemK: number;
  isc: number;
  vet: number;
  ureme: number;
  diger: number;
  sabit: number;
  buzagi: number;
}

export interface BesiEkoInputs {
  ka0: number;
  ka1: number;
  acab: number;
  alis: number;
  satis: number;
  yem: number;
  olum: number;
  diger: number;
  satisGider: number;
}

export type ReproTur = 'inek' | 'koyun' | 'keci' | 'kisrak' | 'domuz';
export type CowBreed = 'holstein' | 'simental' | 'esmer' | 'yerli';

export interface GebTakvimInputs {
  tur: ReproTur;
  irk: CowBreed;
  tarih: string;
}

export interface KizTakvimInputs {
  tur: ReproTur;
  irk: CowBreed;
  tarih: string;
  adet: number;
}

export interface IofcInputs {
  verim: number;
  fiyat: number;
  yem: number;
  suru: number;
}

export interface IofcRecord {
  id: string;
  tarih: string;
  verim: number;
  fiyat: number;
  yem: number;
  iofc: number;
  yemPayi: number;
}

export type DamTur = 'inek' | 'besi' | 'koyun' | 'keci';

export interface DamKriter {
  id: string;
  ad: string;
  ag: number;
  ipucu: string;
  gel: string;
}

export interface DamizlikInputs {
  tur: DamTur;
  kupe: string;
  skorlar: Record<string, number>;
  bayraklar: boolean[];
}

export interface RationIngredientResult {
  f: FeedIngredient;
  km: number;
  af: number;
  pct: number;
  tl: number;
}

export interface RationIngredientKalem {
  id: string;
  ad: string;
  kaba: boolean;
  yasKg: number;
  dmKg: number;
  pay: number;
  maliyet: number;
  maliyetPayi: number;
}

export interface RationResultNutrient {
  ad: string;
  ihtiyac: number;
  saglanan: number;
  birim: string;
  oran: number;
}

export interface RationResultData {
  ok: boolean;
  basarili?: boolean;
  hataMesaji?: string;
  satirlar: RationIngredientResult[];
  kalemler: RationIngredientKalem[];
  besinler: RationResultNutrient[];
  dmi: number;
  toplamDmi: number;
  toplamYasYem: number;
  kmMaliyeti: number;
  kabaOran: number;
  toplamTl: number;
  gunlukMaliyet: number;
  toplamCanli: number;
  verilen: {
    km: number;
    nem: number;
    neg: number;
    nel: number;
    ndf: number;
    hp: number;
    ca: number;
    p: number;
  };
  iht: any;
  g: any;
  ozetSatiri: string;
  tarih: string;
}

export type RationResult = RationResultData;

export interface SutEkoResultData extends SutEkoInputs {
  yillikSut: number;
  sutGeliri: number;
  yemYil: number;
  degiskenYil: number;
  toplamMasraf: number;
  toplamGelir: number;
  netYil: number;
  netGun: number;
  iofc: number;
  maliyetKg: number;
  basabasFiyat: number;
  basabasVerim: number;
  yemPayi: number;
}

export interface BesiEkoResultData extends BesiEkoInputs {
  artis: number;
  sure: number;
  hayvan: number;
  yemMasraf: number;
  digerMasraf: number;
  olumMasraf: number;
  gelir: number;
  sGider: number;
  masraf: number;
  net: number;
  netGun: number;
  netKgArtis: number;
  tamMaliyetKg: number;
  yemMaliyetKgArtis: number;
  basSatis: number;
  basAlis: number;
  basAcab: number;
  yemPayi: number;
  makas: number;
}
