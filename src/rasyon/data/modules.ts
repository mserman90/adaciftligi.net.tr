import { ModuleKey } from '../types';

export interface ModuleConfig {
  key: ModuleKey;
  ad: string;
  kod: string;
  tur: 'rasyon' | 'ciftlik';
  btnLabel: string;
  baslik: string;
  aciklama: string;
  meta: string[];
  secim: string[] | null;
  adim01?: string;
}

export const MODULES: Record<ModuleKey, ModuleConfig> = {
  besi: {
    key: 'besi',
    ad: 'Besi Sığırı',
    kod: 'MR-02',
    tur: 'rasyon',
    btnLabel: 'Rasyonu Hesapla',
    baslik: 'Besi Sığırı Rasyonu',
    aciklama:
      'Canlı ağırlık ve hedeflenen günlük canlı ağırlık artışına göre besin madde ihtiyaçlarını hesaplar; seçtiğiniz yem hammaddeleri ve güncel fiyatlarıyla <strong>en düşük maliyetli rasyonu</strong> saniyeler içinde oluşturur.',
    meta: [
      'NRC (2016) büyüme standartları',
      'İki aşamalı simpleks optimizasyonu',
      'Fiyatlar ve kısıtlar düzenlenebilir',
      'Yazdırılabilir çıktı',
    ],
    secim: ['silaj', 'misir', 'arpa', 'kepek', 'soya', 'pamukK', 'kirec', 'premix'],
  },
  sut: {
    key: 'sut',
    ad: 'Süt İneği',
    kod: 'MR-03',
    tur: 'rasyon',
    btnLabel: 'Rasyonu Hesapla',
    baslik: 'Süt İneği Rasyonu',
    aciklama:
      'Canlı ağırlık, günlük süt verimi ve süt yağ oranına göre laktasyon ihtiyaçlarını hesaplar; seçtiğiniz hammaddeler ve güncel fiyatlarla 4% FCM bazlı <strong>en düşük maliyetli rasyonu</strong> oluşturur.',
    meta: [
      'NRC (2001) laktasyon standartları',
      '4% FCM bazlı enerji dengesi',
      'NDF ve kaba yem kısıtları',
      'Fiyatlar ve kısıtlar düzenlenebilir',
    ],
    secim: ['silaj', 'cayir', 'misir', 'kepek', 'soya', 'pamukK', 'posa', 'karma', 'kirec', 'premix'],
  },
  koyun: {
    key: 'koyun',
    ad: 'Koyun & Kuzu',
    kod: 'MR-04',
    tur: 'rasyon',
    btnLabel: 'Rasyonu Hesapla',
    baslik: 'Koyun & Kuzu Rasyonu',
    aciklama:
      'Besi kuzusundan anaç koyuna; idame, gebelik ve laktasyon dönemlerine göre ihtiyaçları hesaplar, seçtiğiniz hammaddeler ve güncel fiyatlarla <strong>en düşük maliyetli küçükbaş rasyonunu</strong> oluşturur.',
    meta: [
      'NRC (2007) küçükbaş standartları',
      'Dört profil: kuzu · idame · gebelik · laktasyon',
      'Küçükbaş mineral yaklaşımı',
      'Fiyatlar ve kısıtlar düzenlenebilir',
    ],
    secim: ['yonca', 'cayir', 'silaj', 'saman', 'arpa', 'yulaf', 'misir', 'kepek', 'pamukK', 'soya', 'koyunKarma', 'kirec', 'premix'],
  },
  keci: {
    key: 'keci',
    ad: 'Keçi & Oğlak',
    kod: 'MR-05',
    tur: 'rasyon',
    btnLabel: 'Rasyonu Hesapla',
    baslik: 'Keçi & Oğlak Rasyonu',
    aciklama:
      'Besi oğlağından süt keçisine; idame, gebelik ve laktasyon dönemlerine göre ihtiyaçları hesaplar, seçtiğiniz hammaddeler ve güncel fiyatlarla <strong>en düşük maliyetli keçi rasyonunu</strong> oluşturur.',
    meta: [
      'NRC (2007) keçi formülleri',
      'Dört profil: oğlak · idame · gebelik · laktasyon',
      'Üçüz gebelik ve süt keçisi desteği',
      'Fiyatlar ve kısıtlar düzenlenebilir',
    ],
    secim: ['yonca', 'cayir', 'silaj', 'saman', 'posa', 'arpa', 'yulaf', 'misir', 'kepek', 'pamukK', 'soya', 'keciKarma', 'kirec', 'premix'],
  },
  sutEko: {
    key: 'sutEko',
    ad: 'Süt Kârlılığı',
    kod: 'ÇF-01',
    tur: 'ciftlik',
    btnLabel: 'Kârlılığı Hesapla',
    baslik: 'Süt Kârlılığı',
    aciklama:
      'Süt geliri ile yem ve işletme masraflarını denkleştirir; inek başına yıllık kârı, IOFC’yi, başabaş süt fiyatını ve verimini hesaplar, <strong>fiyat × verim duyarlılık matrisiyle</strong> riski görünür kılar.',
    meta: [
      'IOFC ve başabaş analizi',
      'Fiyat × verim duyarlılık matrisi',
      'Rasyon modülüyle entegre',
      'Yazdırılabilir rapor',
    ],
    secim: null,
  },
  besiEko: {
    key: 'besiEko',
    ad: 'Besi Kârlılığı',
    kod: 'ÇF-02',
    tur: 'ciftlik',
    btnLabel: 'Kârlılığı Hesapla',
    baslik: 'Besi Kârlılığı',
    aciklama:
      'Hayvan alışı, besleme süresi ve satışı arasındaki nakit akışını denkleştirir; besi başına net kârı, kg artış maliyetini, başabaş alış/satış fiyatlarını ve <strong>alış–satış makasının duyarlılık matrisiyle</strong> riskini hesaplar.',
    meta: [
      'Besi başına tam kâr analizi',
      'Başabaş alış ve satış fiyatı',
      'Alış × satış duyarlılık matrisi',
      'Rasyon modülüyle entegre',
    ],
    secim: null,
  },
  gebTakvim: {
    key: 'gebTakvim',
    ad: 'Gebelik Takvimi',
    kod: 'ÇF-03',
    tur: 'ciftlik',
    btnLabel: 'Takvimi Oluştur',
    adim01: 'Tohumlama / Kuşatma Bilgileri',
    baslik: 'Gebelik Takvimi',
    aciklama:
      'Tohumlama veya kuşatma tarihinden hareketle <strong>tahmini doğum tarihini</strong>, güncel gebelik gününü ve kritik kilometre taşlarını hesaplar; tür ve ırka özgü gebelik süreleriyle doğuma kadar takvimi adım adım çıkarır.',
    meta: [
      'Beş tür: inek · koyun · keçi · kısrak · domuz',
      'Sığırda ırka göre gebelik süresi',
      'Kilometre taşları ve doğum penceresi',
      'Yazdırılabilir takvim',
    ],
    secim: null,
  },
  kizTakvim: {
    key: 'kizTakvim',
    ad: 'Kızgınlık Takvimi',
    kod: 'ÇF-04',
    tur: 'ciftlik',
    btnLabel: 'Takvimi Oluştur',
    adim01: 'Son Kızgınlık Bilgileri',
    baslik: 'Kızgınlık Takvimi',
    aciklama:
      'Son görülen kızgınlık tarihinden hareketle <strong>sonraki kızgınlık tahminlerini</strong>, güncel döngü gününü ve fazını hesaplar; tür kurallarına göre suni tohumlama penceresini ve çiftleşilirse doğum öngörüsünü çıkarır.',
    meta: [
      'Beş tür: inek · koyun · keçi · kısrak · domuz',
      'Döngü fazı ve AI zamanlaması (AM/PM kuralı)',
      'Çiftleşilirse doğum öngörüsü (Gebelik entegre)',
      'Yazdırılabilir takvim',
    ],
    secim: null,
  },
  iofc: {
    key: 'iofc',
    ad: 'IOFC',
    kod: 'ÇF-05',
    tur: 'ciftlik',
    btnLabel: 'IOFC Hesapla',
    adim01: 'Süt ve Yem Verileri',
    baslik: 'IOFC — Süt Yem Marjı',
    aciklama:
      'IOFC (Income Over Feed Cost), günlük süt gelirinden yem masrafını düşer; besleme ve pazarlama kararlarının sabit gider gölgesinden arınmış göstergesidir. Verim, fiyat ve yem maliyetini girin; <strong>IOFC’nizi, başabaş üçgenini ve fiyat × yem duyarlılık matrisini</strong> anında görün.',
    meta: [
      'IOFC = süt geliri − yem maliyeti',
      'Başabaş üçgeni: yem · fiyat · verim',
      'Fiyat × yem duyarlılık matrisi',
      'Günlük IOFC kayıt defteri',
    ],
    secim: null,
  },
  damizlik: {
    key: 'damizlik',
    ad: 'Damızlık Skor',
    kod: 'ÇF-06',
    tur: 'ciftlik',
    btnLabel: 'Skoru Değerlendir',
    adim01: 'Damızlık Adayı Değerlendirmesi',
    baslik: 'Damızlık Skor',
    aciklama:
      'Damızlık adayını tür bazlı, ağırlıklı kriterlerle (kondisyon, meme, bacak–tırnak, dölverimi, sağlık) <strong>1–5 üzerinden puanlar</strong>; ağırlıklı bileşik skorla A–D sınıflandırması üretir. Kırmızı bayraklar, skor ne kadar yüksek olursa olsun <strong>kesin ayıklama</strong> kararı verir.',
    meta: [
      'Dört tür: süt ineği · besi sığırı · koyun · keçi',
      'Ağırlıklı bileşik skor (0–100)',
      'A–D sınıflandırma + kırmızı bayrak ayıklaması',
      'Yazdırılabilir değerlendirme raporu',
    ],
    secim: null,
  },
};
