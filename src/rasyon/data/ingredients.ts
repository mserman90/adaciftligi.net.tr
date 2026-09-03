import { FeedIngredient } from '../types';

export const INITIAL_INGREDIENTS: FeedIngredient[] = [
  { id: 'silaj',     ad: 'Mısır silajı',                dm: 0.35, nem: 1.60, neg: 1.00, nel: 1.62, hp: 8.2,  ca: 0.28, p: 0.22, ndf: 45, kaba: true,  fiyat: 3.20, min: 0, max: 60 },
  { id: 'cayir',     ad: 'Çayır otu (kuru)',            dm: 0.88, nem: 1.25, neg: 0.70, nel: 1.40, hp: 9.5,  ca: 0.55, p: 0.20, ndf: 60, kaba: true,  fiyat: 7.00, min: 0, max: 40 },
  { id: 'yonca',     ad: 'Yonca kuru otu',              dm: 0.88, nem: 1.30, neg: 0.75, nel: 1.45, hp: 17.5, ca: 1.40, p: 0.22, ndf: 45, kaba: true,  fiyat: 9.50, min: 0, max: 40 },
  { id: 'saman',     ad: 'Buğday samanı',               dm: 0.90, nem: 0.95, neg: 0.40, nel: 0.95, hp: 4.2,  ca: 0.20, p: 0.08, ndf: 75, kaba: true,  fiyat: 5.00, min: 0, max: 20 },
  { id: 'misir',     ad: 'Mısır (tane)',                dm: 0.88, nem: 2.20, neg: 1.55, nel: 1.90, hp: 9.4,  ca: 0.02, p: 0.28, ndf: 10, kaba: false, fiyat: 12.00, min: 0, max: 70 },
  { id: 'arpa',      ad: 'Arpa (tane)',                 dm: 0.89, nem: 1.94, neg: 1.32, nel: 1.82, hp: 12.4, ca: 0.06, p: 0.34, ndf: 18, kaba: false, fiyat: 11.50, min: 0, max: 50 },
  { id: 'yulaf',     ad: 'Yulaf (tane)',                dm: 0.89, nem: 1.90, neg: 1.28, nel: 1.76, hp: 12.5, ca: 0.07, p: 0.33, ndf: 28, kaba: false, fiyat: 10.50, min: 0, max: 60 },
  { id: 'kepek',     ad: 'Buğday kepeği',               dm: 0.89, nem: 1.70, neg: 1.10, nel: 1.72, hp: 17.5, ca: 0.13, p: 1.20, ndf: 40, kaba: false, fiyat: 9.00,  min: 0, max: 25 },
  { id: 'soya',      ad: 'Soya küspesi (%44)',          dm: 0.89, nem: 1.95, neg: 1.35, nel: 1.90, hp: 51.5, ca: 0.32, p: 0.65, ndf: 14, kaba: false, fiyat: 20.00, min: 0, max: 20 },
  { id: 'pamukK',    ad: 'Pamuk tohumu küspesi',        dm: 0.91, nem: 1.80, neg: 1.20, nel: 1.76, hp: 41.0, ca: 0.18, p: 1.12, ndf: 30, kaba: false, fiyat: 13.00, min: 0, max: 20 },
  { id: 'pamukT',    ad: 'Pamuk tohumu (kalın)',        dm: 0.91, nem: 2.00, neg: 1.35, nel: 1.90, hp: 23.0, ca: 0.15, p: 0.60, ndf: 45, kaba: false, fiyat: 11.00, min: 0, max: 12 },
  { id: 'aycicek',   ad: 'Ayçiçek küspesi',             dm: 0.89, nem: 1.35, neg: 0.85, nel: 1.40, hp: 32.0, ca: 0.36, p: 0.95, ndf: 40, kaba: false, fiyat: 14.00, min: 0, max: 15 },
  { id: 'posa',      ad: 'Şeker pancarı posası (kuru)', dm: 0.90, nem: 1.55, neg: 1.05, nel: 1.68, hp: 9.8,  ca: 0.65, p: 0.10, ndf: 46, kaba: false, fiyat: 10.50, min: 0, max: 20 },
  { id: 'karma',     ad: 'Süt ineği karma yemi (%18)',  dm: 0.89, nem: 2.00, neg: 1.40, nel: 1.75, hp: 18.5, ca: 1.10, p: 0.55, ndf: 18, kaba: false, fiyat: 13.50, min: 0, max: 60 },
  { id: 'koyunKarma',ad: 'Koyun-kuzu karma yemi (%16)', dm: 0.89, nem: 1.95, neg: 1.35, nel: 1.78, hp: 16.5, ca: 1.05, p: 0.55, ndf: 20, kaba: false, fiyat: 12.50, min: 0, max: 60 },
  { id: 'keciKarma', ad: 'Keçi karma yemi (%17)',       dm: 0.89, nem: 1.98, neg: 1.38, nel: 1.80, hp: 17.0, ca: 1.10, p: 0.55, ndf: 19, kaba: false, fiyat: 13.00, min: 0, max: 60 },
  { id: 'melas',     ad: 'Melas',                       dm: 0.75, nem: 1.50, neg: 1.00, nel: 1.55, hp: 8.0,  ca: 0.70, p: 0.10, ndf: 0,  kaba: false, fiyat: 8.00,  min: 0, max: 8 },
  { id: 'kirec',     ad: 'Kireç taşı (CaCO₃)',          dm: 0.98, nem: 0,    neg: 0,    nel: 0,    hp: 0,    ca: 38.0, p: 0,    ndf: 0,  kaba: false, fiyat: 6.00,  min: 0, max: 2.5 },
  { id: 'premix',    ad: 'Mineral premix',              dm: 0.95, nem: 0,    neg: 0,    nel: 0,    hp: 0,    ca: 18.0, p: 8.0,  ndf: 0,  kaba: false, fiyat: 45.00, min: 0, max: 3 },
];

export const DEFAULT_INGREDIENTS = INITIAL_INGREDIENTS;
