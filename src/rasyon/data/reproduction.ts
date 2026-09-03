import { ReproTur, CowBreed } from '../types';

export const GEB_IRKLAR: Record<CowBreed, { ad: string; gun: number }> = {
  holstein: { ad: 'Holstein', gun: 279 },
  simental: { ad: 'Simental', gun: 285 },
  esmer: { ad: 'Esmer (Brown Swiss)', gun: 288 },
  yerli: { ad: 'Yerli ırk / melez', gun: 280 },
};

export const GEB_TUR: Record<
  ReproTur,
  { ad: string; irkli: boolean; gun: number | null; ipucu: string }
> = {
  inek: {
    ad: 'İnek',
    irkli: true,
    gun: null,
    ipucu:
      'Kuru döneme giren ineği laktasyon listesinden çıkarıp ayrı takip edin; doğum penceresi ±5 gündür. Kolay doğum geçmişi olan ineklerde bile close-up (negatif DCAD) rasyonu atlanmamalıdır.',
  },
  koyun: {
    ad: 'Koyun',
    irkli: false,
    gun: 147,
    ipucu:
      'Koç katımına göre gruplandırın; ultrasonda ikiz görülen koyunları ayrı gruba alıp steaming-up rasyonuna erken geçirin — gebelik zehirlenmesi genelde ilk kuzulamada tecrübe bedeliyle öğrenilir.',
  },
  keci: {
    ad: 'Keçi',
    irkli: false,
    gun: 150,
    ipucu:
      'Süt keçilerinde laktasyon ile gebelik üst üste biner; 45–50 günlük kuru dönem hedefleyin ve takvimi ona göre öne çekin. Üçüz beklenen anaçları doğum bölmesine bir hafta erken alın.',
  },
  kisrak: {
    ad: 'Kısrak',
    irkli: false,
    gun: 340,
    ipucu:
      'Kısrak gebeliği en değişken türdür (±10 gün). 330. günden itibaren gece gözlemi planlayın; udder gelişimi ve kolostrum damlası doğuma günler kaldığını söyler.',
  },
  domuz: {
    ad: 'Domuz',
    irkli: false,
    gun: 114,
    ipucu:
      'Farrowing odası temizliği ve hazırlığı 107. günden önce tamamlanmalı; “3 ay – 3 hafta – 3 gün” kuralı pratikte 114 ± 2 güne karşılık gelir.',
  },
};

export function gebSure(tur: ReproTur, irk: CowBreed): number {
  return tur === 'inek' ? GEB_IRKLAR[irk].gun : (GEB_TUR[tur].gun || 280);
}

export interface GebMilestone {
  day: number;
  ad: string;
  aciklama: string;
}

export function gebKilometre(tur: ReproTur, L: number): GebMilestone[] {
  if (tur === 'inek') {
    return [
      { day: 30, ad: 'İlk gebelik taraması (ultrason)', aciklama: '28–35. gün ultrasonu en erken ve en kesin doğrulamadır; boş ineğin tekrar tohumlanması için kritik pencere.' },
      { day: 45, ad: 'El palpasyonu ile doğrulama', aciklama: '40–50. gün rektal palpasyon; ilk taramayı doğrular, erken embriyonik kayıpları yakalar.' },
      { day: 100, ad: 'İkinci gebelik kontrolü', aciklama: '90–120. gün kontrolü, geç dönem fetal kayıpları süzer; kayıp varsa sürü ve tohumlama planı revize edilir.' },
      { day: L - 60, ad: 'Kuru döneme geçiş', aciklama: 'Sütten kesim; 50–60 günlük kuru dönem, meme involusyonu ve sonraki laktasyon için zorunludur.' },
      { day: L - 21, ad: 'Yakın doğum (close-up) grubu', aciklama: '21 gün kala enerji yoğun, anionik (negatif DCAD) rasyona geçiş; doğum felci ve ketozis riskini düşürür.' },
      { day: L, ad: 'Tahmini doğum', aciklama: 'Doğum bölmesi temiz ve yumuşak zeminli olsun; kolostrum yedeği ve doğum seti hazırda beklesin.' },
    ];
  }
  if (tur === 'koyun') {
    return [
      { day: 30, ad: 'Gebelik taraması', aciklama: '30–45. gün ultrason; boş koyunları erken ayırıp yeniden koç katımına hazırlayın.' },
      { day: 60, ad: 'Yavru sayısı taraması', aciklama: '45–70. gün ultrasonla tek/ikiz ayrımı; ikizlileri yüksek enerjili gruba alın.' },
      { day: L - 42, ad: 'Steaming-up rasyonuna geçiş', aciklama: 'Son 6 hafta: enerji yoğun rasyon + enterotoksemi aşısı (iki doz, arayla).' },
      { day: L - 7, ad: 'Doğum hazırlığı', aciklama: 'Doğum bölmelerini hazırlayın, kolostrum yedeği ve doğum setini planlayın.' },
      { day: L, ad: 'Tahmini doğum (kuzulama)', aciklama: 'Doğum penceresi ±5 gün; ilk kuzulamada gece gözlemi önerilir.' },
    ];
  }
  if (tur === 'keci') {
    return [
      { day: 35, ad: 'Gebelik taraması', aciklama: '30–40. gün ultrason; boş keçileri erken ayırın.' },
      { day: 70, ad: 'Yavru sayısı taraması', aciklama: '45–75. gün ultrasonla yavru sayısı; çoğul gebelikler ayrı gruba alınır.' },
      { day: L - 42, ad: 'Steaming-up rasyonuna geçiş', aciklama: 'Son 6 hafta: enerji yoğun rasyon + enterotoksemi aşısı; üçüz beklenenlerde yoğunluğu 1,6–1,8 Mcal/kg\'a taşıyın.' },
      { day: L - 7, ad: 'Doğum hazırlığı', aciklama: 'Meme gelişimini kontrol edin; doğum bölmesi, sıcak ve kuru altlık hazırlayın.' },
      { day: L, ad: 'Tahmini doğum', aciklama: 'Keçilerde doğum genelde gün içinde ve hızlı ilerler; müdahale eşiğini bilin.' },
    ];
  }
  if (tur === 'kisrak') {
    return [
      { day: 15, ad: 'Embriyo taraması', aciklama: '14–16. gün ultrason; ikizlilik görülürse veterinerle erken karar verin.' },
      { day: 30, ad: 'Gebelik kontrolü', aciklama: '25–30. gün kalp atışı kontrolü; embriyonik kayıp riski en yüksek dönemdir.' },
      { day: 60, ad: 'İkinci gebelik kontrolü', aciklama: '60. gün kontrolü kayıpları süzer; doğrulanan gebelik doğuma kadar izlenir.' },
      { day: 150, ad: 'Aşı programı (5. ay)', aciklama: '5., 7. ve 9. aylarda (150., 210., 270. günler) tetanoz güçlendirici dozları.' },
      { day: 300, ad: 'Doğum hazırlığı', aciklama: 'Doğum bölmesini hazırlayın; meme gelişimini izleyin, gece gözlemi planlayın.' },
      { day: L, ad: 'Tahmini doğum', aciklama: 'Kısrakta sapma ±10 gün olabilir; hazırlığı 330. günden itibaren tam tutun.' },
    ];
  }
  return [
    { day: 24, ad: 'Gebelik taraması (ultrason)', aciklama: '21–28. gün ultrason; boş dişileri erken ayırıp yeniden çiftleştirin.' },
    { day: 35, ad: 'İkinci kontrol', aciklama: '35. gün tekrar ultrason; erken kayıpları yakalar.' },
    { day: 100, ad: 'Doğum öncesi aşıları', aciklama: 'E. coli ve klostridya güçlendiricileriyle yavruya kolostrogen bağışıklık sağlanır.' },
    { day: 107, ad: 'Doğum odasına alma', aciklama: '7 gün önce farrowing odasına alın; memebezine alışma ve sakin geçiş için.' },
    { day: L, ad: 'Tahmini doğum', aciklama: '“3 ay – 3 hafta – 3 gün” kuralı; gerçek doğum 114 ± 2 gündür.' },
  ];
}

export interface KizTurConfig {
  ad: string;
  dongu: number;
  aralik: string;
  kizgunlikGun: number;
  kizgunlikSaat: string;
  ovulasyon: string;
  aiZaman: string;
  sezon: string | null;
  ipucu: string;
  protokol: string[];
}

export const KIZ_TUR: Record<ReproTur, KizTurConfig> = {
  inek: {
    ad: 'İnek',
    dongu: 21,
    aralik: '17–24',
    kizgunlikGun: 1,
    kizgunlikSaat: '12–18 saat',
    ovulasyon: 'başlangıçtan ~24–32 saat sonra',
    aiZaman:
      'Sabah görülen kızgınlıkta aynı gün öğleden sonra, öğleden sonra görülen kızgınlıkta ertesi sabah — yani başlangıçtan ~12 saat sonra (AM/PM kuralı).',
    sezon: null,
    ipucu:
      'Doğum sonrası ilk kızgınlıklar 35–45. günde sessiz (silik) geçebilir; gönüllü bekleme süresi 50–60 gündür. Günde 2–3 kez, yemleme ve sağım dışı sakin saatlerde izleyin; monteye çıkma kabulü olmadan kızgınlık ilan etmeyin.',
    protokol: [
      'Günde 2–3 kez, yemleme ve sağım dışı sakin saatlerde 20–30 dakika, sabit yerden izleme yapın.',
      'Altın standart monteye çıkma (standing heat) kabulüdür; monteye çıkmayan inek kızgın sayılmaz.',
      'İkincil belirtiler: huzursuzluk, kafa uzatma-çiğneme, berrak mukus, vulva ödemi, çamurlu kalça ve kuyruk kökü.',
      'Kuyruk boyası/tutkal etiketi, pedometer ve aktivite sensörleri gece kızgınlıklarını yakalar; gözlem + teknoloji birlikte çalışır.',
    ],
  },
  koyun: {
    ad: 'Koyun',
    dongu: 17,
    aralik: '14–19',
    kizgunlikGun: 1.5,
    kizgunlikSaat: '24–36 saat',
    ovulasyon: 'kızgınlığın ortasına doğru',
    aiZaman: 'Başlangıçtan 12–18 saat sonra tek tohumlama; doğal koç katımında zamanlama hayvana bırakılır.',
    sezon: 'Koyun mevsimsel poliestrustür (kısa gün): anestrus döneminde (ilkbahar–yaz) döngü durur ve takvim geçersizleşir.',
    ipucu:
      'Koç katımı döneminde boyanlı göğüs kayışı (raddle) kullanın; kayış izi koçla temasın kanıtıdır. Koç sunumu (flashing) sonrası 5–6 gün içinde kızgınlık patlaması beklenir.',
    protokol: [
      'Koç katımı öncesi 2 hafta boyanlı göğüs kayışı (raddle) takın; kayış izli koyunları kaydedin.',
      'Teaser (kısırlaştırılmış) koç sunumu, kızgınlıkların toplu ve öngörülebilir çıkmasını sağlar.',
      'Kızgın koyun koça yaklaşır ve kuyruğunu sallar; monteye çıkma koyunda belirgin değildir.',
      'Kızgınlık sonrası 30–45. günde gebelik ultrasonu; takvimle boş koyunları erken ayırın.',
    ],
  },
  keci: {
    ad: 'Keçi',
    dongu: 21,
    aralik: '18–22',
    kizgunlikGun: 1.5,
    kizgunlikSaat: '24–48 saat',
    ovulasyon: 'başlangıçtan 24–36 saat sonra',
    aiZaman: 'Başlangıçtan 12–18 saat sonra tek tohumlama; sabah/akşam çift gözlem zamanlamayı keskinleştirir.',
    sezon: 'Yerli ırklarda mevsimsellik belirgindir (sonbahar); süt ırklarında döngü yıl boyu sürer.',
    ipucu:
      'Kuyruk sallama, inleme, huzursuzluk ve vulva ödemi en görünür belirtilerdir; teaser teke sunumu tanıyı güçlendirir. Süt keçilerinde mevsimsellik zayıf olduğu için takvim yıl boyu çalışır.',
    protokol: [
      'Kuyruk sallama, inleme, huzursuzluk ve vulva ödemi günlük izleme listesinin başındadır.',
      'Kızgın keçi diğer keçilere atlar ve atlanmayı kabul eder; iki yönlü davranışı izleyin.',
      'Teaser teke ya da teke sunumu tanıyı keskinleştirir; kokudaki değişim keçilerde güçlüdür.',
      'Süt keçilerinde laktasyon-gebelik üst üste biner; kızgınlık takvimini kuru dönem planına bağlayın.',
    ],
  },
  kisrak: {
    ad: 'Kısrak',
    dongu: 21,
    aralik: '19–22',
    kizgunlikGun: 6,
    kizgunlikSaat: '5–7 gün',
    ovulasyon: 'kızgınlığın son 24–48 saatinde',
    aiZaman:
      'Kızgınlık süresince 48 saatte bir tohumlama ya da ultrasonla folikül takibiyle ovulasyon günü hedefli tohumlama.',
    sezon: 'Kısrak uzun gün mevsimselidir: kışın (anestrus) döngü durur; takvim ışıklandırma yoksa mevsimle sınırlıdır.',
    ipucu:
      'Teaser aygırla günlük teasing şarttır; kızgınlık kabulü (kulak germe, çatırdayan idrar pozı, kuyruk kaldırma) folikül ultrasonuyla birlikte değerlendirilir. Doğum sonrası foal heat 7–12. gündedir.',
    protokol: [
      'Teaser aygırla günlük teasing yapın; kabul davranışlarını kaydedin.',
      'Kızgınlık 5–7 gün sürer; folikül gelişimi ultrasonla izlenerek ovulasyon öngörülür.',
      'Ovulasyon kızgınlığın son 24–48 saatinde olduğundan tohumlama 48 saat arayla tekrarlanır.',
      'Foal heat (7–12. gün) genç kısraklarda değişkendir; ilk ovulasyon kalitesi veterinerle değerlendirilir.',
    ],
  },
  domuz: {
    ad: 'Domuz',
    dongu: 21,
    aralik: '18–24',
    kizgunlikGun: 2.5,
    kizgunlikSaat: '48–72 saat',
    ovulasyon: 'başlangıçtan ~38–42 saat sonra',
    aiZaman: 'Belirti testi refleksi anında ilk çiftleşme/tohumlama, 12–24 saat sonra ikinci (çift çiftleşme).',
    sezon: 'Laktasyon kızgınlığı baskılar; sütten kesim 4–7 gün sonra ilk kızgınlık beklenir ve gerçek döngü oradan başlar.',
    ipucu:
      'Sütten kesim sonrası 4–7. gün beklenen kızgınlıkta günde iki kez belirti testi (arka basınç) yapın; boar sunumu — koku, ses, temas — tanıyı keskinleştirir. Kızgınlıkta dik kulak (Landrace tipi) tipiktir.',
    protokol: [
      'Sütten kesimden itibaren 4–7. gün arasında günde iki kez belirti testi (arka basınç) uygulayın.',
      'Boar sunumu — koku, ses ve temas — tanıyı belirginleştirir; boar yokken BPT güvenilmezdir.',
      'Kızgınlık 48–72 saat sürer; refleks anında ilk, 12–24 saat sonra ikinci çiftleşme önerilir.',
      'Kızgınlıkta dik kulak (Landrace tipi), huzursuzluk ve yem tüketiminde azalma tipik eşlikçilerdir.',
    ],
  },
};

export const KIZ_NOT: Record<ReproTur, string> = {
  inek: 'İnek döngüsü ortalama 21 gündür (17–24 aralığı). Kızgınlık 12–18 saat sürer; ovulasyon başlangıçtan ~24–32 saat sonra olur.',
  koyun: 'Koyun döngüsü ortalama 17 gündür (14–19). Kızgınlık 24–36 saat; mevsimsel poliestrus — anestrus’ta döngü durur.',
  keci: 'Keçi döngüsü ortalama 21 gündür (18–22). Kızgınlık 24–48 saat; yerli ırklarda mevsimsellik belirgindir.',
  kisrak: 'Kısrak döngüsü ortalama 21 gündür (19–22). Kızgınlık 5–7 gün sürer; ovulasyon son 24–48 saatte gerçekleşir.',
  domuz: 'Domuz döngüsü ortalama 21 gündür (18–24). Kızgınlık 48–72 saat; laktasyonda baskılanır, sütten kesim 4–7 gün sonra kızgınlık beklenir.',
};

export const KOYUN_TIP = {
  kuzu: { ad: 'besi kuzusu', kaba: 10 },
  idame: { ad: 'idamedeki anaç koyun', kaba: 50 },
  geblik: { ad: 'gebelikteki anaç koyun', kaba: 30 },
  lakt: { ad: 'laktasyondaki anaç koyun', kaba: 35 },
};

export const KOYUN_NOT = {
  kuzu: 'Kuzu besisi ihtiyaçları NRC (2007) küçükbaş formüllerinden türetilmiştir; KM tüketimi canlı ağırlığın yaklaşık %3,5\'i kabul edilir. Kesife geçişte tahılı 10–14 günde kademeli artırın.',
  idame: 'İdamedeki anaç için KM tüketimi canlı ağırlığın ~%2,5\'i; bakım enerjisi NEL = 0,096 × KA⁰·⁷⁵ ile hesaplanır. Merada/içerde yem kıtlığında bu taban değerin altına düşmeyin.',
  geblik: 'Gebeliğin son 6 haftasında yavru büyümesi hızlanırken rumen hacmi sıkışır: enerji eki tek yavru +0,45, ikiz +0,85 Mcal NEL/gün. İkizli anaçlarda gebelik zehirlenmesine karşı rasyon yoğunluğu 1,6–1,8 Mcal/kg olmalıdır.',
  lakt: 'Emziren anaçta KM tüketimi = 0,025 × KA + 0,55 × süt; süt enerjisi kg başına 1,1 Mcal NEL kabul edilir. Tek kuzu emziren anaç için 1,5–2 kg/gün, ikiz için 2,5–3,5 kg/gün süt girebilirsiniz.',
};

export const KECI_TIP = {
  oglak: { ad: 'besi oğlağı', kaba: 10 },
  idame: { ad: 'idamedeki anaç keçi', kaba: 55 },
  geblik: { ad: 'gebelikteki anaç keçi', kaba: 30 },
  lakt: { ad: 'laktasyondaki anaç keçi', kaba: 30 },
};

export const KECI_NOT = {
  oglak: 'Oğlak besisi ihtiyaçları NRC (2007) keçi formüllerinden türetilmiştir; KM tüketimi canlı ağırlığın ~%3,5\'i kabul edilir. Kesife geçişte tahılı 10–14 günde kademeli artırın, enterotoksemi aşısını ihmal etmeyin.',
  idame: 'İdamedeki anaç keçi için KM tüketimi canlı ağırlığın ~%2,8\'i; bakım enerjisi NEL = 0,075 × KA⁰·⁷⁵ ile hesaplanır. Merada otlayan keçilerde gezinme ve seçicilik nedeniyle %10–25 aktivite eki düşünün.',
  geblik: 'Gebeliğin son 6 haftasında yavru büyümesi hızlanırken rumen hacmi sıkışır: enerji eki tek yavru +0,4, ikiz +0,8, üçüz +1,1 Mcal NEL/gün. Çoğul gebelikte gebelik zehirlenmesine karşı rasyon yoğunluğu 1,6–1,8 Mcal/kg olmalıdır.',
  lakt: 'Süt keçisinde KM tüketimi = 0,025 × KA + 0,5 × süt; süt enerjisi kg başına 0,72 Mcal NEL kabul edilir. Saanen ırkında tepe verim 4–6 kg/gün olabilir; erken laktasyonda rasyon yoğunluğu 1,5–1,7 Mcal/kg hedeflenir.',
};
