import {
  SutEkoInputs,
  SutEkoResultData,
  BesiEkoInputs,
  BesiEkoResultData,
  IofcInputs,
  DamizlikInputs,
} from '../types';
import { DAM_TUR, DAM_BAYRAK } from '../data/breeding';

export function sutEkoHesapla(
  inputs: SutEkoInputs,
  override?: Partial<SutEkoInputs>
): SutEkoResultData {
  const p = { ...inputs, ...(override || {}) };
  const yillikSut = p.verim * p.lakt;
  const sutGeliri = yillikSut * p.fiyat;
  const yemYil = p.yemL * p.lakt + p.yemK * p.kuru;
  const degiskenYil = (p.isc + p.vet + p.ureme + p.diger) * 365;
  const toplamMasraf = yemYil + degiskenYil + p.sabit;
  const toplamGelir = sutGeliri + p.buzagi;
  const netYil = toplamGelir - toplamMasraf;

  return {
    ...p,
    yillikSut,
    sutGeliri,
    yemYil,
    degiskenYil,
    toplamMasraf,
    toplamGelir,
    netYil,
    netGun: netYil / 365,
    iofc: p.verim * p.fiyat - p.yemL,
    maliyetKg: yillikSut > 0 ? toplamMasraf / yillikSut : 0,
    basabasFiyat: yillikSut > 0 ? (toplamMasraf - p.buzagi) / yillikSut : 0,
    basabasVerim:
      p.fiyat * p.lakt > 0 ? (toplamMasraf - p.buzagi) / (p.fiyat * p.lakt) : 0,
    yemPayi: sutGeliri > 0 ? (yemYil / sutGeliri) * 100 : 0,
  };
}

export function besiEkoHesapla(
  inputs: BesiEkoInputs,
  override?: Partial<BesiEkoInputs>
): BesiEkoResultData {
  const p = { ...inputs, ...(override || {}) };
  const artis = p.ka1 - p.ka0;
  const sure = artis > 0 && p.acab > 0 ? artis / (p.acab / 1000) : 0;
  const hayvan = p.ka0 * p.alis;
  const yemMasraf = p.yem * sure;
  const digerMasraf = p.diger * sure;
  const olumMasraf = (hayvan + yemMasraf) * (p.olum / 100);
  const gelir = p.ka1 * p.satis;
  const sGider = gelir * (p.satisGider / 100);
  const masraf = hayvan + yemMasraf + digerMasraf + olumMasraf + sGider;
  const net = gelir - masraf;

  const basSatis =
    p.ka1 > 0
      ? (hayvan + yemMasraf + digerMasraf + olumMasraf) /
        (p.ka1 * (1 - p.satisGider / 100))
      : 0;

  const basAlis =
    p.ka0 > 0
      ? (gelir -
          yemMasraf * (1 + p.olum / 100) -
          digerMasraf -
          sGider) /
        (p.ka0 * (1 + p.olum / 100))
      : 0;

  const paydaA = gelir - hayvan * (1 + p.olum / 100) - sGider;
  const basAcab =
    paydaA > 0 && artis > 0
      ? (artis * (p.yem * (1 + p.olum / 100) + p.diger) / paydaA) * 1000
      : 0;

  return {
    ...p,
    artis,
    sure,
    hayvan,
    yemMasraf,
    digerMasraf,
    olumMasraf,
    gelir,
    sGider,
    masraf,
    net,
    netGun: sure > 0 ? net / sure : 0,
    netKgArtis: artis > 0 ? net / artis : 0,
    tamMaliyetKg: p.ka1 > 0 ? masraf / p.ka1 : 0,
    yemMaliyetKgArtis: p.acab > 0 ? p.yem / (p.acab / 1000) : 0,
    basSatis,
    basAlis,
    basAcab,
    yemPayi: masraf > 0 ? (yemMasraf / masraf) * 100 : 0,
    makas: p.satis - p.alis,
  };
}

export function iofcHesapla(inputs: IofcInputs, override?: Partial<IofcInputs>) {
  const p = { ...inputs, ...(override || {}) };
  const gelir = p.verim * p.fiyat;
  const iofc = gelir - p.yem;
  return {
    ...p,
    gelir,
    iofc,
    iofcKg: p.verim > 0 ? iofc / p.verim : 0,
    yemPayi: gelir > 0 ? (p.yem / gelir) * 100 : 0,
    basYem: gelir,
    basFiyat: p.verim > 0 ? p.yem / p.verim : 0,
    basVerim: p.fiyat > 0 ? p.yem / p.fiyat : 0,
    iofcAy: iofc * 30.4,
    iofcYil: iofc * 365,
    suruGun: iofc * p.suru,
    suruAy: iofc * p.suru * 30.4,
  };
}

export function damHesapla(inputs: DamizlikInputs) {
  const { tur, kupe, skorlar, bayraklar: rawFlags } = inputs;
  const T = DAM_TUR[tur];
  const evaluatedScores = T.kriterler.map((k) => {
    const skor = skorlar[k.id] !== undefined ? skorlar[k.id] : 3;
    return {
      ...k,
      skor,
      pct: ((skor - 1) / 4) * 100,
    };
  });

  const net = evaluatedScores.reduce((s, k) => s + (k.pct * k.ag) / 100, 0);
  const activeFlags = DAM_BAYRAK.filter((_, i) => rawFlags[i]).map((b) => ({
    ad: b.ad,
    aciklama: b.aciklama,
  }));

  let sinif: { kod: string; ad: string; renk: string; aciklama: string };
  if (activeFlags.length) {
    sinif = {
      kod: 'D',
      ad: 'Ayrıştırılır — kesin ayıklama',
      renk: 'var(--kirilgan)',
      aciklama:
        'Kırmızı bayrak(lar) işaretli: skor sınıfından bağımsız olarak damızlık kullanımı önerilmez.',
    };
  } else if (net >= 80) {
    sinif = {
      kod: 'A',
      ad: 'Damızlık olarak seçilir',
      renk: 'var(--yesil)',
      aciklama:
        'Bileşik skor hedef bandın üzerinde; kayıtlarla doğrulandığında güçlü damızlık adayıdır.',
    };
  } else if (net >= 65) {
    sinif = {
      kod: 'B',
      ad: 'Şartlı seçilir',
      renk: 'var(--okeer)',
      aciklama:
        'Genel yapısı uygun; zayıf kriterler geliştirilirse ya da fiyat buna göre pazarlanırsa seçilebilir.',
    };
  } else if (net >= 50) {
    sinif = {
      kod: 'C',
      ad: 'Gözlem altında',
      renk: '#9C5A1B',
      aciklama:
        'Sınırdadır: zayıf kriterler düzelmeden damızlık kullanımı önerilmez; belirli bir dönemde yeniden skorlayın.',
    };
  } else {
    sinif = {
      kod: 'D',
      ad: 'Ayrıştırılır',
      renk: 'var(--kirilgan)',
      aciklama: 'Bileşik skor damızlık eşiğinin altındadır.',
    };
  }

  const sirali = [...evaluatedScores].sort((a, b) => b.pct - a.pct);
  return {
    ok: true,
    tur,
    T,
    kupe,
    skorlar: evaluatedScores,
    net,
    sinif,
    bayraklar: activeFlags,
    guclu: sirali[0],
    zayif: sirali[sirali.length - 1],
    sirali,
  };
}
