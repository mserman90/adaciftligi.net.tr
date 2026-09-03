export interface GlossaryTerm {
  id: string;
  matchTerms: string[];
  title: string;
  category: 'Rasyon & Besleme' | 'Sağlık & Klinik' | 'Üreme & Doğum' | 'Ekonomi & Maliyet' | 'Damızlık & Anatomi';
  badge: string;
  shortMeaning: string;
  farmerExplanation: string;
  practicalTip: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'km',
    matchTerms: ['kuru madde', 'kuru maddenin', 'kuru maddesinin', 'kuru maddesi', 'kuru maddede', 'KM'],
    title: 'Kuru Madde (KM)',
    category: 'Rasyon & Besleme',
    badge: 'Besleme Temeli',
    shortMeaning: 'Yemin suyunu sıktığınızda geriye kalan asıl besleyici unsuzdur.',
    farmerExplanation:
      'Tarladan biçtiğiniz mısır silajı ya da yaş pancar posası kovada ağır çeker ama aslında %70\'i sudur. İneği doyuran ve süt yaptıran yemin suyu değil, içindeki kuru maddedir. Bütün rasyon hesapları bu yüzden yaş kilo değil, kuru madde (KM) üzerinden yapılır.',
    practicalTip:
      'Örneğin %30 KM içeren mısır silajından 10 kg verdiğinizde, hayvan aslında 3 kg kuru yem yemiş olur. Silajın suyunu ölçmeden rasyon tutturulamaz.',
  },
  {
    id: 'dmi',
    matchTerms: ['KM tüketimi', 'KM tüketimini', 'DMI'],
    title: 'KM Tüketimi / DMI (Kuru Madde İştahı)',
    category: 'Rasyon & Besleme',
    badge: 'İştah Kapasitesi',
    shortMeaning: 'Bir hayvanın 24 saatte midesine sığdırabileceği net kuru yem sınırı.',
    farmerExplanation:
      'İneğin işkembesi lastik balon değildir; canlı ağırlığına ve süt verimine göre günde yiyebileceği azami bir kuru madde kapasitesi vardır (genelde canlı ağırlığının %3 ila %4\'ü). Hayvana ihtiyacı olan enerjiyi bu sınırın içine sığdırmak zorundasınız.',
    practicalTip:
      'Yeni doğum yapmış inek süt verir ama iştahı (KM tüketimi) 3-4 hafta geriden gelir. Yiyemediği için zayıflar; bu dönemde rasyonun enerjisini yükseltmek gerekir.',
  },
  {
    id: 'kaba_yem',
    matchTerms: ['kaba yem', 'kaba yemi', 'kaba yemin', 'kaba yemler', 'kaba yemlerin'],
    title: 'Kaba Yem (Yonca, Silaj, Saman, Kuru Ot)',
    category: 'Rasyon & Besleme',
    badge: 'İşkembe Sigortası',
    shortMeaning: 'Hayvanın geviş getirmesini ve işkembesinin çalışmasını sağlayan lifli yemler.',
    farmerExplanation:
      'Kaba yem işkembenin süpürgesi ve motorudur. İnek geviş getirdikçe bolca tükürük üretir; bu tükürük işkembedeki asidi söndürür (tamponlar). Kaba yemi kısıp sadece un-kesif yem verirseniz işkembe asitleşir, inek yemden kesilir ve tırnakları bozulur.',
    practicalTip:
      'Süt ineğinde rasyonun en az %40-50\'si, beside ise işkembe sağlığı için en az %10-15\'i mutlaka kaliteli kaba yemden oluşmalıdır.',
  },
  {
    id: 'kesif_yem',
    matchTerms: ['kesif yem', 'kesif yemi', 'kesif yemin', 'kesif', 'kesife', 'kesifin'],
    title: 'Kesif Yem (Konsantre / Fabrika Yemi / Tahıl)',
    category: 'Rasyon & Besleme',
    badge: 'Enerji & Protein Deposu',
    shortMeaning: 'Arpa, mısır, küspe ve fabrika yemi gibi unlu, yoğun besin kaynakları.',
    farmerExplanation:
      'Lif oranı düşük, nişasta ve protein oranı çok yüksek, hızlı sindirilen yemlerdir. Hayvanın yüksek süt vermesi veya hızlı kilo alması için yakıttır; ancak aşırı verildiğinde işkembeyi yakabilir.',
    practicalTip:
      'Kesif yemi günde tek öğünde değil, en az 2-3 öğüne bölerek vermek veya kaba yemle karıştırıp (TMR / mikser vagon) vermek asidozu önler.',
  },
  {
    id: 'rumen',
    matchTerms: [
      'rumen',
      'rumende',
      'rumenin',
      'rumene',
      'rumeni',
      'rumen sağlığı',
      'rumen sağlığı için',
      'rumen dolgunluğu',
      'rumen dolgunluğunu',
      'işkembe',
      'işkembede',
      'işkembeyi',
      'işkembenin',
      'işkembesi',
    ],
    title: 'Rumen (İşkembe / 1. Mide)',
    category: 'Rasyon & Besleme',
    badge: 'Doğal Fermantasyon Fabrikası',
    shortMeaning: 'Geviş getiren hayvanın samanı, otu ve lifleri süte-ete çeviren 150-200 litrelik dev sindirim kazanı.',
    farmerExplanation:
      'Geviş getiren hayvan aslında ot veya yemi doğrudan kendi midesiyle sindirmez; işkembesinde yaşayan trilyonlarca yararlı bakteri ve mayayı besler. Bu mikroskobik canlılar yediği lifleri ve nişastayı fermente edip süte ve ete dönüşen uçucu yağ asitlerine çevirir. Bir yetiştirici ineği değil, ineğin işkembesindeki mikropları beslediğini bilmelidir.',
    practicalTip:
      'İşkembenin sağlıklı çalışması için ideal asitlik derecesi (pH) 6,2 – 6,8 olmalıdır. Hayvana aniden fazla un/arpa verirseniz işkembe asitleşir (asidoz), mikroplar ölür, geviş getirme durur ve hayvan yemden kesilir.',
  },
  {
    id: 'ndf',
    matchTerms: [
      'NDF',
      'ndf',
      'Nötral Deterjan Lif',
      'nötral deterjan lif',
      'etkili NDF',
      'NDF alt sınırı',
      "NDF'si",
      "NDF'i",
      'NDF %',
      'toplam NDF',
    ],
    title: 'NDF (Nötral Deterjan Lif / İşkembe Lifi)',
    category: 'Rasyon & Besleme',
    badge: 'Rumen Sağlığı Ölçüsü',
    shortMeaning: 'Yemin hayvanı geviş getirmeye zorlayan selüloz ve lif iskeleti; işkembenin süpürgesi.',
    farmerExplanation:
      'Yem tahlilinde NDF, kaba yemin sertlik, dolgunluk ve geviş getirtme gücüdür. NDF çok düşük olursa inek geviş getirmez, tükürük salgılayamaz, süt yağı çöker ve asidoz olur. NDF çok yüksek olursa da hayvanın midesini saman gibi doldurur, başka yem yiyemez ve zayıflar.',
    practicalTip:
      'Süt ineklerinde toplam rasyon NDF\'si %28-32 aralığında olmalıdır. Süt yağınız %3,5 altına iniyorsa rasyondaki NDF yetersiz demektir.',
  },
  {
    id: 'nel',
    matchTerms: ['NEL', 'Net Laktasyon Enerjisi', 'Mcal NEL'],
    title: 'NEL (Net Enerji Laktasyon - Süt Enerjisi)',
    category: 'Rasyon & Besleme',
    badge: 'Süt Verim Yakıtı',
    shortMeaning: 'İneğin hem ayakta kalmak hem de süt yapabilmek için süte çevirebildiği saf enerji.',
    farmerExplanation:
      'Yemi ineğe verdiğinizde bir kısmı dışkıyla, gazla ve ısıyla uçar gider. Geriye kalıp doğrudan süt kabına ve ineğin canına geçen saf enerjiye NEL denir. Mcal (Megakalori) cinsinden ölçülür.',
    practicalTip:
      '1 litre süt üretimi için ineğin yaklaşık 0,749 Mcal NEL enerjisine ihtiyacı vardır. 30 litre süt veren bir inek günde yaklaşık 32-35 Mcal NEL tüketmelidir.',
  },
  {
    id: 'nem',
    matchTerms: ['NEm', 'Net Bakım Enerjisi', 'idame'],
    title: 'NEm (Yaşama Payı / Net Bakım Enerjisi)',
    category: 'Rasyon & Besleme',
    badge: 'Hayatta Kalma Masrafı',
    shortMeaning: 'Hayvanın ne kilo alıp ne vermeden sadece kalbini, nefesini ve vücut ısısını sürdürme enerjisi.',
    farmerExplanation:
      'Traktörün rölantide çalışırken yaktığı mazot gibidir. Hayvan ahırda hiç süt vermese veya hiç kilo almasa bile ayakta durmak, nefes almak ve sindirim yapmak için bu enerjiyi harcamak zorundadır.',
    practicalTip:
      'Canlı ağırlık arttıkça yaşama payı masrafı büyür. 600 kg bir tosun, 300 kg bir danadan sırf ayakta kalmak için çok daha fazla yem tüketir.',
  },
  {
    id: 'neg',
    matchTerms: ['NEg', 'Net Büyüme Enerjisi'],
    title: 'NEg (Büyüme & Kilo Alma Enerjisi)',
    category: 'Rasyon & Besleme',
    badge: 'Besi Kilo Yakıtı',
    shortMeaning: 'Yaşama payı karşılandıktan sonra dananın gövdesine et ve yağ olarak eklenen enerji.',
    farmerExplanation:
      'Besi danasının sırtına ve butlarına et bağlatan net enerjidir. Danaya önce yaşama payını (NEm) yedirirsiniz; ondan artakalan enerji NEg olarak tartıda günlük kilo artışına dönüşür.',
    practicalTip:
      'Beside günlük 1,3 - 1,5 kg canlı ağırlık artışı hedefliyorsanız rasyonun NEg değerini yüksek tutmak (arpa, mısır, kaliteli yem) şarttır.',
  },
  {
    id: 'hp',
    matchTerms: ['ham protein', 'Ham Protein', 'HP'],
    title: 'Ham Protein (HP)',
    category: 'Rasyon & Besleme',
    badge: 'Kas & Süt Yapıtaşı',
    shortMeaning: 'Yemdeki azot ve protein maddelerinin toplamı; kasın ve sütün ana harcı.',
    farmerExplanation:
      'Dananın kas yapması, ineğin süt salgılaması ve tüylerin parlaklığı proteine bağlıdır. Ancak proteini gereğinden fazla vermek fayda değil zarardır; fazlası karaciğeri ve böbreği yorar, idrarla atılır ve cüzdanı boşaltır.',
    practicalTip:
      'Besi sonu danalarda %12-13 HP yeterliyken, günde 30-35 kg süt veren taze laktasyon ineğinde %16-17 HP gerekir.',
  },
  {
    id: 'rup',
    matchTerms: ['RUP', 'by-pass protein', 'by-pass proteini', 'rumende parçalanmayan protein'],
    title: 'RUP (By-pass Protein / Korumalı Protein)',
    category: 'Rasyon & Besleme',
    badge: 'Kaliteli Protein',
    shortMeaning: 'İşkembede erimeden doğrudan bağırsağa geçen ve süt yapan kaliteli protein.',
    farmerExplanation:
      'Normal proteinin çoğu işkembedeki mikroplar tarafından kırılır. By-pass (RUP) protein ise işkembe fırtınasını hasarsız atlatıp doğrudan bağırsağa ulaşır ve ineğe yüksek süt ile et verimi sağlar. Soya küspesi ve mısır glüteni RUP açısından zengindir.',
    practicalTip:
      'Günde 30 litrenin üzerinde süt veren yüksek verimli ineklerin protein ihtiyacı sadece ayçiçeği küspesiyle karşılanamaz; soya veya korumalı protein şarttır.',
  },
  {
    id: 'fcm',
    matchTerms: ['FCM', '4% FCM', 'yağa göre düzeltilmiş süt'],
    title: '4% FCM (Yağa Göre Düzeltilmiş Süt)',
    category: 'Rasyon & Besleme',
    badge: 'Adil Verim Ölçüsü',
    shortMeaning: 'Farklı yağ oranına sahip sütleri standart %4 yağ kabul ederek eşitleyen formül.',
    farmerExplanation:
      'Jersey ineği 22 litre süt verir ama yağı %5\'tir. Holstein 30 litre verir ama yağı %3,4\'tür. Hangisi daha çok besin üretti? FCM formülü ikisini de eşit teraziye koyar. Süt yağı yükseldikçe ineğin ürettiği gerçek enerji artar.',
    practicalTip:
      'Formül: FCM = Süt × (0,4 + 0,15 × Yağ%). Yem ihtiyacı litreye göre değil, yağlı süte göre belirlenir.',
  },
  {
    id: 'acab',
    matchTerms: ['ACAB', 'günlük canlı ağırlık artışı', 'günlük artış', 'canlı ağırlık artışı'],
    title: 'ACAB (Günlük Canlı Ağırlık Artışı / Günlük Kilo)',
    category: 'Rasyon & Besleme',
    badge: 'Besi Performansı',
    shortMeaning: 'Besi hayvanının 24 saatte canlı olarak kazandığı kilo (gram/gün).',
    farmerExplanation:
      'Besicinin karnesidir. Tosunun ay başında 400 kg, ay sonunda 436 kg geldiyse 30 günde 36 kg almış, yani ACAB = 1.200 gram/gün olmuştur. Yediği yemle aldığı kilo arasındaki oran kârınızı belirler.',
    practicalTip:
      'Simental ve Şarole kırmalarında iyi bir rasyonla 1.300 - 1.600 g/gün hedeflenir. 1.000 gramın altına düşüyorsa ya rasyonda ya da parazit/asidozda sorun vardır.',
  },
  {
    id: 'asidoz',
    matchTerms: ['asidoz', 'asidoza', 'laktik asidoz', 'subakut asidoz', 'SARA'],
    title: 'İşkembe Asidozu (İşkembe Ekşimesi / Yanması)',
    category: 'Sağlık & Klinik',
    badge: 'Sinsi Tehlike',
    shortMeaning: 'Fazla arpa, buğday veya ezme verilmesiyle işkembede asidin tavan yapması.',
    farmerExplanation:
      'İnsandaki aşırı mide yanması gibidir ama sığırlarda ölümcül olabilir. Hayvan ani çok nişasta (arpa/mısır) yiyince işkembedeki yararlı bakteriler ölür, laktik asit fırlar. Hayvanın gevişi durur, sulu ve köpüklü ishal başlar, ayakları iltihaplanır (laminitis).',
    practicalTip:
      'Kaba yem oranını asla sıfırlamayın. Yem geçişlerini en az 10-14 güne yayın ve rasyona günde 100-150 gram sodyum bikarbonat (karbonat) ekleyin.',
  },
  {
    id: 'enterotoksemi',
    matchTerms: ['enterotoksemi', 'enterotokseminin', 'enterotoksemi aşısı', 'Clostridium perfringens'],
    title: 'Enterotoksemi (Çelerme / Yumuşak Böbrek)',
    category: 'Sağlık & Klinik',
    badge: 'Koyun-Kuzu Katili',
    shortMeaning: 'Yem değişikliğiyle bağırsakta patlayan bakterinin hayvanı saatler içinde zehirlemesi.',
    farmerExplanation:
      'Özellikle besiye çekilen gürbüz kuzularda görülür. Ani tane yem artışında bağırsaktaki Clostridium bakterisi kontrolsüz ürer ve çok güçlü bir toksin salgılar. Akşam sağlam bırakılan en semiz kuzu sabah ahırda ölü bulunur.',
    practicalTip:
      'Besiye başlamadan en az 2 hafta önce mutlaka 2 doz karma enterotoksemi aşısı yapın ve taneli yemlere çok yavaş alıştırın.',
  },
  {
    id: 'ketozis',
    matchTerms: ['ketozis', 'gebelik zehirlenmesi', 'gebelik zehirlenmesinin'],
    title: 'Ketozis & Gebelik Zehirlenmesi',
    category: 'Sağlık & Klinik',
    badge: 'Enerji Çöküşü',
    shortMeaning: 'Aç kalan veya aşırı süt veren hayvanın kendi yağını eritirken karaciğerini zehirlemesi.',
    farmerExplanation:
      'Doğumdan hemen sonra inek çok süt verir ama iştahı azdır; ya da ikiz gebe koyun son haftalarda midesi sıkıştığı için yem yiyemez. Vücut enerji için kendi yağ dokusunu hızla yıkar. Açığa çıkan keton cisimleri kanı ve nefesi aseton gibi kokutur, hayvan sersemler ve yere yatar.',
    practicalTip:
      'Koyunlarda doğuma son 6 hafta kala enerji yoğun rasyon (steaming-up) verin. İneklerde kuru dönemde hayvanı aşırı yağlandırmayın (BCS 3.5 üzeri olmasın).',
  },
  {
    id: 'urolitiyazis',
    matchTerms: ['ürolitiyazis', 'idrar taşı', 'idrar taşının', 'sidik zoru'],
    title: 'Ürolitiyazis (İdrar Yolu Taşı / Sidik Zoru)',
    category: 'Sağlık & Klinik',
    badge: 'Besi Kuzusu Riski',
    shortMeaning: 'Kalsiyum-fosfor dengesizliği yüzünden erkek kuzuların idrar yolunun taşla tıkanması.',
    farmerExplanation:
      'Özellikle kepek, tahıl ve küspeyle yoğun beslenen erkek toklu ve oğlaklarda fosfor birikir ve kum/taş yapar. Taş idrar kanalının ucundaki ince uzantıya (apandis) takılır; kuzu işeyemez, karnı şişer, kıvranır ve mesanesi patlayarak ölür.',
    practicalTip:
      'Rasyonda Ca:P oranını en az 2:1 tutun (kireç taşı ekleyin). Rasyona amonyum klorür katın ve kuzuların önünden 24 saat temiz, ılık suyu asla eksik etmeyin.',
  },
  {
    id: 'iofc',
    matchTerms: ['IOFC', 'Income Over Feed Cost', 'yemden kalan gelir'],
    title: 'IOFC (Süt Yem Geliri Marjı)',
    category: 'Ekonomi & Maliyet',
    badge: 'Günlük Çiftlik Kârı',
    shortMeaning: 'Günlük süt parasından günlük yem faturasını çıkardıktan sonra cepte kalan net para.',
    farmerExplanation:
      'Çiftliğin anlık tansiyonudur. İneğiniz günde 300 ₺\'lik süt verip 180 ₺\'lik yem yiyorsa IOFC\'niz 120 ₺/inek/gün\'dür. Mazot, elektrik, işçilik ve kendi maaşınız bu 120 ₺\'nin içinden ödenecektir.',
    practicalTip:
      'Süt fiyatı düşse bile rasyonu ucuzlatıp verimi koruyarak IOFC\'yi yüksek tutabilirsiniz. Süt parasının %55-60\'ından fazlası yeme gidiyorsa alarm zilleri çalıyor demektir.',
  },
  {
    id: 'basabas',
    matchTerms: ['başabaş', 'başabaş süt fiyatı', 'başabaş satış fiyatı', 'başabaş yem maliyeti', 'başabaş alış fiyatı'],
    title: 'Başabaş Noktası (Kâr-Zarar Sıfır Eşiği)',
    category: 'Ekonomi & Maliyet',
    badge: 'Kritik Eşik',
    shortMeaning: 'İşletmenin ne kâr ne de zarar ettiği, masrafların kuruşu kuruşuna karşılandığı sınır.',
    farmerExplanation:
      'Örneğin sütün litresi size 12,50 ₺\'ye mal oluyorsa, başabaş fiyatınız 12,50 ₺\'dir. Sütü 13 ₺\'ye satarsanız 50 kuruş kârdasınız; 12 ₺\'ye satarsanız cebinizden her litrede 50 kuruş eriyor demektir.',
    practicalTip:
      'Besi danasını alırken "Başabaş alış fiyatını" mutlaka hesaplayın: Bu fiyatın üstünde aldığınız her dana daha ahıra girmeden hanenize zarar yazdırmış demektir.',
  },
  {
    id: 'steaming_up',
    matchTerms: ['steaming up', 'steaming-up', 'buharlama beslemesi'],
    title: 'Steaming-up (Doğum Öncesi Buharlama / Yükleme)',
    category: 'Rasyon & Besleme',
    badge: 'Doğum Hazırlığı',
    shortMeaning: 'Doğuma 3-4 hafta kala yavrunun son atağı ve ağız sütü için kesif yemin kademeli artırılması.',
    farmerExplanation:
      'Kuzunun veya buzağının ağırlığının %70\'i son ayda oluşur. Anne karnındaki yavru mideye baskı yaptığı için anaç daha az yer. Az yiyip çok enerji alabilsin diye kaliteli protein ve enerji içeren yemler bu dönemde yavaş yavaş artırılır.',
    practicalTip:
      'Koyunlarda ikiz-üçüz gebelik varsa steaming-up yapılmazsa gebelik zehirlenmesi (ketozis) kaçınılmaz olur ve anaç da kuzular da kaybedilebilir.',
  },
  {
    id: 'close_up',
    matchTerms: ['close-up', 'close up', 'geçiş dönemi', 'geçiş rasyonlarının'],
    title: 'Close-Up / Geçiş Dönemi (Doğuma Son 21 Gün)',
    category: 'Rasyon & Besleme',
    badge: 'En Kritik 3 Hafta',
    shortMeaning: 'Doğuma 3 hafta kala ineğin doğuma ve laktasyon rasyonuna hazırlandığı dönem.',
    farmerExplanation:
      'Süt sığırcılığının kaderinin yazıldığı 21 gündür. İşkembe mikropları sağım rasyonuna alıştırılır, bağışıklık güçlendirilir ve kalsiyum mekanizması çalıştırılarak doğum felci (hipokalsemi) riski önlenir.',
    practicalTip:
      'Close-up döneminde ineklere tuz ve yüksek kalsiyumlu yonca fazla verilmez; aksi takdirde doğum anında kemikten kalsiyum çekemez ve hayvan felç olup yatar.',
  },
  {
    id: 'kuru_donem',
    matchTerms: ['kuru dönem', 'kuru dönemi', 'kuru dönemdeki', 'sütten kesim'],
    title: 'Kuru Dönem (Sütten Kesme Molası)',
    category: 'Üreme & Doğum',
    badge: 'Meme Tamiratı',
    shortMeaning: 'Doğuma 60 gün kala ineğin sağımının durdurulup memenin dinlendirildiği süre.',
    farmerExplanation:
      'İnek 365 gün aralıksız sağılmaz. Memedeki süt salgılayan dokuların kendini yenilemesi, ineğin karaciğerini dinlendirmesi ve buzağının büyümesi için doğuma 60 gün kala inek kuruya çıkarılır.',
    practicalTip:
      'Kuru döneme çıkarırken memelere uzun etkili kuru dönem tüpleri sıkılmalı ve inek kesinlikle yağlandırılmamalıdır.',
  },
  {
    id: 'am_pm',
    matchTerms: ['AM/PM', 'AM/PM kuralı', 'AM / PM'],
    title: 'AM / PM Kuralı (Tohumlama Zamanı Altın Kuralı)',
    category: 'Üreme & Doğum',
    badge: 'Tohumlama Zamanı',
    shortMeaning: 'Sabah kızgınlık gösterene akşam, akşam kızgınlık gösterene ertesi sabah tohumlama kuralı.',
    farmerExplanation:
      'İnekte yumurta kızgınlık bittikten yaklaşık 10-12 saat sonra çatlar. Spermlerin de döl yatağında canlı kalma süresi sınırlıdır. Erken veya geç tohumlarsanız yumurta ile sperm buluşamaz ve tohum boşa gider.',
    practicalTip:
      'Sabah sağımında atlayan veya çara akıtan ineği akşamüstü; akşam kızgınlık gösteren ineği ise ertesi sabah tohumlatın.',
  },
  {
    id: 'ostrus',
    matchTerms: ['östrus', 'kızgınlık', 'kızgınlığın', 'kızgınlığı', 'kızgınlıklar', 'kızgınlıkların'],
    title: 'Östrus (Kızgınlık / Boğasaklık)',
    category: 'Üreme & Doğum',
    badge: 'Döllenme Penceresi',
    shortMeaning: 'Dişi hayvanın yumurtladığı ve çiftleşmeyi kabul ettiği 12-18 saatlik bereketli süre.',
    farmerExplanation:
      'İneklerde ortalama 21 günde bir, koyunlarda 17 günde bir tekrarlar. En kesin belirti "duruş refleksi"dir; yani başka inek üstüne atladığında kaçmayıp sabit durmasıdır. Çara (şeffaf akıntı) akıtması ve bağırması ikincil belirtilerdir.',
    practicalTip:
      'Kızgınlıkların %70\'i akşam 18:00 ile sabah 06:00 arasında başlar. Gece ahır kontrolü yapmayan işletmeler kızgınlıkların yarısını kaçırır.',
  },
  {
    id: 'anestrus',
    matchTerms: ['anestrus', 'anestrusu', 'sessiz kızgınlık'],
    title: 'Anestrus (Durgunluk / Kızgınlık Göstermeme)',
    category: 'Üreme & Doğum',
    badge: 'Dölverimi Sorunu',
    shortMeaning: 'Hayvanın zamanı geldiği halde kızgınlığa gelmemesi, yumurtalığın uyuması.',
    farmerExplanation:
      'Doğumdan sonra 60 gün geçtiği halde inek hiç kızgınlık göstermiyorsa ya zayıflıktan yumurtalıkları durmuştur, ya kist vardır ya da çiftçi fark etmeden sessizce kızgınlık geçirmiştir. Her boş geçen 21 gün doğrudan zarar demektir.',
    practicalTip:
      'Aşırı zayıf inekler kızgınlık göstermez. Ultrason taramasıyla yumurtalıkta kist olup olmadığı veteriner hekime kontrol ettirilmelidir.',
  },
  {
    id: 'mastitis',
    matchTerms: ['mastitis', 'mastitise'],
    title: 'Mastitis (Meme Yangısı / Meme İltihabı)',
    category: 'Sağlık & Klinik',
    badge: 'Meme Düşmanı',
    shortMeaning: 'Meme lobunun bakteri kapması; sütün pıhtılaşması, memenin şişip kızarması.',
    farmerExplanation:
      'Süt sığırcılığının en büyük baş belasıdır. Kirli altlık, arızalı sağım makinesi veya sağımdan sonra memenin açık kalan deliğinden mikroplar girer. Süt kesilir, çökelek gibi pıhtılar gelir ve meme körleşebilir.',
    practicalTip:
      'Sağımdan sonra meme başlarını mutlaka dezenfektan daldırma kabına batırın ve ineklerin en az 30 dakika yatmasını engelleyecek şekilde önlerine taze yem dökün.',
  },
  {
    id: 'somatik_hucre',
    matchTerms: ['somatik hücre', 'somatik hücre cezası', 'SHS'],
    title: 'Somatik Hücre (SHS / Sütteki Savunma Hücresi)',
    category: 'Sağlık & Klinik',
    badge: 'Gizli Mastitis Göstergesi',
    shortMeaning: 'Sütteki akyuvar sayısı; yüksek olması memede mikrop ve gizli iltihap olduğunu belgeler.',
    farmerExplanation:
      'Sütte gözle pıhtı görmeseniz bile somatik hücre sayısı 200.000\'in üzerine çıkmışsa o memede gizli mastitis savaşı başlamıştır. Süt fabrikaları yüksek somatik hücreli süte ceza keser veya almaz.',
    practicalTip:
      'Her ay California Mastitis Testi (CMT) tabağı ile ineklerin dört memesini tek tek kontrol edin; somatik hücresi yüksek ineği erken yakalayın.',
  },
  {
    id: 'kolostrum',
    matchTerms: ['kolostrum', 'kolostro', 'ağız sütü'],
    title: 'Kolostrum (İlk Ağız Sütü / Yaşam İksiri)',
    category: 'Sağlık & Klinik',
    badge: 'Buzağının Can Sigortası',
    shortMeaning: 'Doğumdan sonraki ilk saatlerde sağılan, yavruyu hastalıklardan koruyan antikor deposu koyu süt.',
    farmerExplanation:
      'Buzağı ve kuzu dünyada sıfır bağışıklıkla doğar. Annenin plasentasından yavruya antikor geçmez. Yavrunun tek kalkanı ilk ağız sütüdür. Bu sütteki antikorlar yavrunun bağırsağından ancak ilk 4-6 saatte emilebilir; sonra kapılar kapanır.',
    practicalTip:
      'Altın kural: Doğumdan sonraki ilk 2 saat içinde buzağının canlı ağırlığının %10\'u kadar (yaklaşık 3-4 litre) kaliteli ağız sütünü mutlaka içirin.',
  },
  {
    id: 'premix',
    matchTerms: ['premix', 'premix\'i', 'premix\'tir', 'premiks'],
    title: 'Premix (Premiks / Vitamin & Mineral Katkısı)',
    category: 'Rasyon & Besleme',
    badge: 'Mikro Besin',
    shortMeaning: 'Yeme binde birkaç oranında katılan kalsiyum, fosfor, çinko, bakır, selenyum ve vitamin tozu.',
    farmerExplanation:
      'Yemeğin tuzu baharatı gibidir. Miktar olarak azdır ama eksik olursa inek gebe kalmaz, döl tutmaz, ayakları çatlar ve bağışıklığı çöker.',
    practicalTip:
      'ÇOK ÖNEMLİ: Sığır premiksini asla koyunlara vermeyin! Sığır premiksindeki bakır koyunları zehirler ve öldürür. Koyuna sadece küçükbaş premiksi verin.',
  },
  {
    id: 'tampon',
    matchTerms: ['tampon', 'tamponlar', 'sodyum bikarbonat', 'karbonat'],
    title: 'Rumen Tamponlayıcı (Sodyum Bikarbonat / Soda)',
    category: 'Rasyon & Besleme',
    badge: 'İşkembe Yangın Söndürücüsü',
    shortMeaning: 'İşkembedeki fazla asidi nötürleyip pH\'ı 6,2 üzerinde tutan maden tuzu.',
    farmerExplanation:
      'Aşırı kesif yem ve mısır silajı işkembeyi asit gölüne çevirir. Sodyum bikarbonat tıpkı insanın mide yanmasında içtiği karbonat gibi işkembedeki asidi dengeler, geviş getirmeyi rahatlatır ve süt yağının düşmesini önler.',
    practicalTip:
      'Özellikle sıcak yaz aylarında ve yüksek kesifli rasyonlarda inek başına günde 100-180 gram sodyum bikarbonat eklenmesi önerilir.',
  },
  {
    id: 'bcs',
    matchTerms: ['kondisyon', 'vücut kondisyon skoru', 'BCS'],
    title: 'BCS (Vücut Kondisyon Skoru / Yağlılık Puanı)',
    category: 'Damızlık & Anatomi',
    badge: 'Et-Yağ Dengesi',
    shortMeaning: 'Hayvanın kaburga, bel ve kuyruk sokumuna bakılarak 1 (aşırı zayıf) ile 5 (aşırı yağlı) arası puanlanması.',
    farmerExplanation:
      'Hayvanın zayıflık veya şişmanlık cetvelidir. 1 kemik torbası demektir, 5 ise kurbanlık gibi yağ bağlamış inektir. Süt ineği için ideal doğum kondisyonu 3.25 - 3.50 arasıdır.',
    practicalTip:
      'Doğuma 4 ve üzeri şişman giren inek doğumdan sonra kesin ketozis olur ve döl tutmaz. Doğuma 2.75 altı zayıf giren inek ise süt veremez.',
  },
  {
    id: 'nrc',
    matchTerms: ['NRC', 'NRC (2001)', 'NRC (2016)', 'NRC (2007)'],
    title: 'NRC (Amerikan Ulusal Araştırma Konseyi Normları)',
    category: 'Rasyon & Besleme',
    badge: 'Dünya Standardı',
    shortMeaning: 'Dünyadaki tüm ziraat ve veteriner fakültelerinin referans aldığı bilimsel besleme normları.',
    farmerExplanation:
      'Farklı ırk ve kilodaki hayvanların kaç gram proteine, kaç kalori enerjiye ihtiyacı olduğunu binlerce deneyle ispatlamış uluslararası bilimsel kitaptır. Programımızın arkasındaki matematik formülleri bu standartlara dayanır.',
    practicalTip:
      'NRC formülleri sayesinde "tahmini" değil, hayvanınızın gramı gramına gerçek ihtiyacına göre en ucuz rasyon hesaplanır.',
  },
  {
    id: 'palatabilite',
    matchTerms: ['palatabilite', 'yenebilirlik', 'lezzet'],
    title: 'Palatabilite (Yemin Lezzeti & İştah Açarlığı)',
    category: 'Rasyon & Besleme',
    badge: 'İştah & Tüketim',
    shortMeaning: 'Yemin kokusu, tazeliği ve tadıyla hayvan tarafından sevilerek tüketilme derecesi.',
    farmerExplanation:
      'Matematiksel olarak dünyanın en iyi rasyonunu hazırlasanız bile yem küflüyse, kızışmışsa veya lezzetsizse hayvan önünden çekilir. Rasyon kağıtta değil, hayvanın işkembesinde çalışır.',
    practicalTip:
      'Yemliğe dökülen taze karışımın kokusu ekşi veya küflü olmamalıdır. Melas veya taze kaliteli kuru ot lezzeti artırmak için en iyi dosttur.',
  },
  {
    id: 'ca',
    matchTerms: ['Kalsiyum', 'kalsiyum', 'Ca', 'Ca %', 'Kireç taşı', 'CaCO3', 'kalsiyumu', 'kalsiyum ihtiyacı'],
    title: 'Kalsiyum (Ca / Kemik & Süt Minerali)',
    category: 'Rasyon & Besleme',
    badge: 'İskelet & Süt Güvencesi',
    shortMeaning: 'Sütün ve iskeletin ana çimentosu; eksikliğinde inek ayağa kalkamaz (doğum felci).',
    farmerExplanation:
      'Süt kalsiyum deposudur; ineğin her gün litresinde yaklaşık 1,2 gram saf kalsiyum süte akar. Yetersiz kalırsa vücut kemiklerden çeker. Doğum anında kalsiyum mekanizması yetersiz kalan inek felç olur, yere yatar ve kalkamaz (hipokalsemi).',
    practicalTip:
      'Kalsiyumun en ekonomik kaynağı ince kireç taşı (CaCO₃) ve yoncadır. Ancak doğuma son 21 gün kala (close-up) yüksek kalsiyumlu yonca kesilmeli, kalsiyum metabolizması uyarılmalıdır.',
  },
  {
    id: 'p',
    matchTerms: ['Fosfor', 'fosfor', 'P', 'P %', 'fosforu', 'fosfor ihtiyacı'],
    title: 'Fosfor (P / Döl Verimi & Enerji Minerali)',
    category: 'Rasyon & Besleme',
    badge: 'Döl Tutma Anahtarı',
    shortMeaning: 'Döl tutmanın, kızgınlığa gelmenin ve yemlerin enerjiye çevrilmesinin temel anahtarı.',
    farmerExplanation:
      'Fosfor eksikliği olan dişi hayvan kızgınlık göstermez, döl tutmaz; kemik, taş ve toprak yalamaya başlar (pika). Ancak özellikle erkek besi kuzularında aşırı fosfor idrar yolu taşı (ürolitiyazis) yaparak ölümü tetikler.',
    practicalTip:
      'Rasyonda Kalsiyum : Fosfor (Ca:P) dengesi mutlaka 1,6:1 ile 2:1 arasında tutulmalıdır. Kepek ve tahıllar fosforca zengin, kalsiyumca zayıftır.',
  },
  {
    id: 'km',
    matchTerms: ['Kuru Madde', 'KM', 'KM %', 'KM Maliyeti', 'Kuru maddesi', '1 kg KM maliyeti', 'KM payı'],
    title: 'Kuru Madde (KM)',
    category: 'Rasyon & Besleme',
    badge: 'Gerçek Yem',
    shortMeaning: 'Yemin içindeki su tamamen uçurulduktan sonra geriye kalan, asıl besinleri barındıran katı kısmıdır.',
    farmerExplanation:
      'İnekler veya koyunlar suyla değil, yemin içindeki kuru kısımla doyar ve beslenirler. Örneğin 100 kilo yonca otunun 12 kilosu sudur, 88 kilosu kuru maddedir. Hayvanın midesi doluluğu hissettiğinde yemeyi bırakır, bu yüzden rasyon hesabı her zaman içindeki su çıkarılarak "Kuru Madde" üzerinden yapılır.',
    practicalTip:
      'Özellikle mısır sılajı gibi çok sulu (örneğin %70 su) yemlerde fiyata aldanmayın. Siz aslında su satın alıyor olabilirsiniz. Önemli olan 1 kg kuru maddenin maliyetidir.',
  },
  {
    id: 'hp',
    matchTerms: ['Ham Protein', 'HP', 'HP %', 'Protein'],
    title: 'Ham Protein (HP)',
    category: 'Rasyon & Besleme',
    badge: 'Büyüme & Süt Taşı',
    shortMeaning: 'Yemin içinde bulunan ve et ile süt üretiminin temel yapı taşı olan azotlu bileşiklerdir.',
    farmerExplanation:
      'Protein, hayvanın kas yapması (et bağlaması) ve süt üretmesi için gereken tuğladır. Eğer rasyonda protein eksikse inek sütü kısar, besi hayvanı ise kas yerine sadece yağ yapar. Ancak ihtiyaçtan fazla protein vermek de hem pahalıdır hem de hayvanın böbreklerini ve karaciğerini yorarak döl tutma sorunlarına (üre yüksekliği) yol açar.',
    practicalTip:
      'Süt ineklerinde rasyondaki protein genelde %15-%17 civarında tutulurken, besi son döneminde bu ihtiyaç %12\'lere kadar düşer. Pahalı olan proteini gereksiz yere fazla yedirmeyin.',
  },
  {
    id: 'nem',
    matchTerms: ['NEm', 'Net Enerji Yaşama', 'Yaşama Enerjisi'],
    title: 'Net Enerji Yaşama (NEm)',
    category: 'Rasyon & Besleme',
    badge: 'Hayatta Kalma Yakıtı',
    shortMeaning: 'Hayvanın hiç et veya süt üretmese bile, sadece nefes alıp hayatta kalabilmesi için harcadığı enerjidir.',
    farmerExplanation:
      'Bir arabayı rölantide çalıştırdığınızda bile mazot yakar. Hayvanın da kalbinin atması, yürümesi ve vücut ısısını koruması için enerjiye ihtiyacı vardır. Yediği yemin enerjisi önce bu "yaşama payı"na (NEm) gider, artan kısım et veya süte dönüşür.',
    practicalTip:
      'Soğuk kış aylarında veya hayvanları çok uzak meralarda yürüttüğünüzde hayvanın "yaşama enerjisi" ihtiyacı artar; bu yüzden yemin daha büyük bir kısmı boşa gider, verim düşer.',
  },
  {
    id: 'neg',
    matchTerms: ['NEg', 'Net Enerji Büyüme', 'Büyüme Enerjisi'],
    title: 'Net Enerji Büyüme (NEg)',
    category: 'Rasyon & Besleme',
    badge: 'Et ve Kilo Yakıtı',
    shortMeaning: 'Hayvanın yaşama payından artıp doğrudan et yapmaya ve kilo almaya harcadığı enerjidir.',
    farmerExplanation:
      'Özellikle besi danaları ve kuzularda en önemli değerdir. Hayvan günlük yaşama enerjisini (NEm) karşıladıktan sonra midesinde kalan fazlalık enerjiyi et ve yağa çevirir. Yemdeki NEg değeri ne kadar yüksekse, hayvan o kadar hızlı kilo alır.',
    practicalTip:
      'Besi hayvanlarına yedirdiğiniz rasyondaki enerji (NEg) çok düşükse, hayvan sadece doyar ama tartıya çıktığında gram almamış olur. Arpa ve mısır gibi tahıllar NEg açısından zengindir.',
  },
  {
    id: 'nel',
    matchTerms: ['NEL', 'Net Enerji Laktasyon', 'Süt Enerjisi'],
    title: 'Net Enerji Laktasyon (NEL)',
    category: 'Rasyon & Besleme',
    badge: 'Süt Üretim Yakıtı',
    shortMeaning: 'Sağmal hayvanın doğrudan süt üretimi için kullanabildiği net enerjidir.',
    farmerExplanation:
      'İneğin süt yapabilmesi için proteine olduğu kadar güçlü bir enerjiye de ihtiyacı vardır. Eğer yemin NEL (Laktasyon enerjisi) değeri düşükse inek kendi sırtından, etinden eritmeye başlar ve zayıflar (ketozis). Süt sığırcılığında en çok bakılan enerji türüdür.',
    practicalTip:
      'Taze sağılan ve yüksek süt veren ineklerde yem tüketimi kısıtlıdır. Bu yüzden az miktar yemde çok enerji (yüksek NEL) içeren yonca, mısır sılajı ve ezme tahıllar vermek zorundasınız.',
  },
  {
    id: 'ndf',
    matchTerms: ['NDF', 'NDF %', 'Nötral Deterjan Lif', 'Lif', 'NDF alt sınırı'],
    title: 'Nötral Deterjan Lif (NDF)',
    category: 'Rasyon & Besleme',
    badge: 'Doygunluk & Geviş',
    shortMeaning: 'Yemin hayvanın işkembesinde yer kaplayan ve onu doyuran lif (posa) kısmıdır.',
    farmerExplanation:
      'Hayvanın midesi bir depo gibidir. Eğer yem çok lifliyse (NDF yüksekse, örneğin saman) depo çabuk şişer, hayvan hemen doydum sanıp yemeyi bırakır ama aslında gerekli besini alamamıştır. Aynı zamanda NDF geviş getirmeyi sağlar, işkembeyi çalıştırır.',
    practicalTip:
      'Samanın NDF\'si çok yüksektir, bu yüzden hayvanı tıka basa doldurur ama süt vermez. İdeal bir süt rasyonunda hayvanı hem geviş getirtecek hem de tıkayıp iştahını kesmeyecek bir NDF dengesi (%28-33 arası) olmalıdır.',
  },
  {
    id: 'kaba_yem',
    matchTerms: ['Kaba yem', 'kaba_yem', 'Kaba Yem Oranı', 'Kaba yem alt sınırı', 'Rasyonda kaba yem alt sınırı'],
    title: 'Kaba Yem',
    category: 'Rasyon & Besleme',
    badge: 'İşkembe Dostu',
    shortMeaning: 'Lif (selüloz) oranı yüksek, hacimli ve geviş getirmeyi uyaran yemlerdir (Ot, saman, silaj).',
    farmerExplanation:
      'İnek ve koyunların sağlıklı kalabilmesi için midelerinin (işkembe) bir mikser gibi sürekli çalışması ve hayvanın bol bol geviş getirmesi gerekir. Kaba yemler bu mikseri çalıştıran süpürge gibidir. Kaba yem olmadan sadece arpa buğday verirseniz işkembe asitlenir, hayvan zehirlenir.',
    practicalTip:
      'Rasyonun Kuru Maddesinin (KM) en az %40-45\'i kaliteli kaba yemlerden gelmelidir. En kaliteli kaba yem zamanında biçilmiş yonca ve iyi fermente olmuş mısır sılajıdır.',
  },
  {
    id: 'kesif_yem',
    matchTerms: ['Kesif yem', 'Fabrika Yemi', 'Konsantre Yem', 'kesif_yem'],
    title: 'Kesif (Konsantre) Yem',
    category: 'Rasyon & Besleme',
    badge: 'Enerji & Protein Bombası',
    shortMeaning: 'Lif oranı düşük, hacimce küçük ama enerji ve protein açısından çok yoğun yemlerdir (Tahıllar, küspeler, fabrika yemleri).',
    farmerExplanation:
      'Hayvanın et ve süt üretimini şaha kaldıran yakıttır. Midede az yer kaplar ama çok fazla besin içerir. Ancak tıpkı insanın sürekli tatlı ve çikolata yemesi gibi, kaba yem (salata/sebze) olmadan sürekli kesif yem verilirse hayvanın midesi bozulur, ayaklarında tırnak hastalıkları (laminitis) başlar.',
    practicalTip:
      'Verim ne kadar artarsa kesif yem miktarı da o kadar artar. Ancak hayvanları yavaş yavaş, haftalara bölerek alıştırmazsanız işkembeyi bozup ishale ve ayak iltihabına sebep olursunuz.',
  },
  {
    id: 'acab',
    matchTerms: ['ACAB', 'Günlük Canlı Ağırlık Artışı', 'ADG', 'Canlı Ağırlık Artışı', 'Hedef günlük canlı ağırlık artışı (ACAB)'],
    title: 'Günlük Canlı Ağırlık Artışı (ACAB)',
    category: 'Performans & Verim',
    badge: 'Büyüme Hızı',
    shortMeaning: 'Bir besi hayvanının 24 saat içinde net olarak aldığı kilo miktarıdır.',
    farmerExplanation:
      'Besi çiftliklerinin karnesidir. Dananın her gün tartıya ne kadar ağırlık koyduğunu gösterir. Ortalama bir besi danası günde 1.2 kg ile 1.6 kg arası canlı ağırlık kazanmalıdır. Eğer 1 kg\'ın altındaysa besleme maliyetiniz boşa gidiyor demektir.',
    practicalTip:
      'Canlı ağırlık artışını düzenli takip etmek için çiftliğinizde mutlaka bir kantar bulundurun veya mezurayla göğüs çevresi ölçümü yaparak aylık gidişatı not alın.',
  },
  {
    id: 'dmi',
    matchTerms: ['Kuru Madde Tüketimi', 'DMI', 'Yem Tüketimi', 'KMT', 'Kuru madde (DMI)'],
    title: 'Kuru Madde Tüketimi (DMI)',
    category: 'Performans & Verim',
    badge: 'Yeme Kapasitesi',
    shortMeaning: 'Hayvanın 24 saatte önündeki yemin içindeki suyu düştükten sonra yiyebildiği net katı yem (Kuru Madde) miktarıdır.',
    farmerExplanation:
      'İnekler mucizevi makinelerdir. Süt verdikçe daha çok yemek isterler. Ancak midelerinin bir doluluk sınırı vardır. Bir inek ortalama kendi canlı ağırlığının %3\'ü ile %4\'ü kadar kuru madde yiyebilir. Bizim görevimiz o kısıtlı midenin içine girecek yemi en yüksek enerji ve proteinle doldurmaktır.',
    practicalTip:
      'Hayvanların önündeki yemliği asla tamamen boş bırakmayın. Eğer yemlik pırıl pırıl sıyrılmışsa, hayvan aç kalmış demektir; bir sonraki öğünde yem miktarını (DMI) artırmanız gerekir.',
  },
  {
    id: 'iofc',
    matchTerms: ['IOFC', 'Yem Maliyeti Düşülmüş Gelir', 'Gelir Eksi Yem Maliyeti'],
    title: 'Yem Maliyeti Düşülmüş Gelir (IOFC)',
    category: 'Ekonomi',
    badge: 'Cepte Kalan Para',
    shortMeaning: 'Süt veya et satışından kazandığınız toplam paradan, hayvanın yediği rasyonun maliyetini çıkardığınızda cebinizde kalan net rakamdır.',
    farmerExplanation:
      'Çiftçinin en çok bakması gereken yerdir. Bir inek günde 40 litre süt verip dünyaları yiyorsa, size 25 litre süt verip az yiyen inekten daha az para kazandırıyor olabilir. Bizim programımız sadece süt artışına değil, "cebinize kalan en yüksek paraya" (IOFC) göre hesap yapar.',
    practicalTip:
      'En ucuz rasyon her zaman en kârlı rasyon değildir. Önemli olan o ucuz yemin size kaç litre süt olarak döneceğidir. Hesabınızı her zaman IOFC yani cebinizde kalan günlük net kâra göre yapın.',
  },
  {
    id: 'palpasyon',
    matchTerms: ['palpasyon', 'rektal palpasyon', 'el palpasyonu', 'palpasyonu', 'ultrason', 'ultrasonla', 'ultrasonu', 'ultrasonuyla'],
    title: 'Rektal Palpasyon & Ultrason',
    category: 'Sağlık & Klinik',
    badge: 'Gebelik Kontrolü',
    shortMeaning: 'Bağırsak üzerinden elle veya ultrason probuyla rahim ve yumurtalıkların kontrol edilmesidir.',
    farmerExplanation: 'İneklerin kalın bağırsağından (rektum) kol sokularak hemen altındaki rahim (yavru yatağı) ve yumurtalıklar elle veya ultrason kamerasıyla kontrol edilir. Tohumlamadan sonraki 30-45. günlerde ineğin gebe kalıp kalmadığını anlamak veya kist olup olmadığını bulmak için en garantili yöntemdir.',
    practicalTip: 'Tohumlamadan sonraki 40. günden itibaren veteriner hekiminize mutlaka gebelik muayenesi yaptırarak boş (gebe kalmamış) inekleri erkenden tespit edin, aksi halde aylarca bedavaya beslemiş olursunuz.',
  },
  {
    id: 'dcad',
    matchTerms: ['DCAD', 'DCA', 'negatif DCAD', 'anyonik', 'anyon katyon dengesi', 'katyon'],
    title: 'Anyon-Katyon Dengesi (DCAD)',
    category: 'Rasyon & Besleme',
    badge: 'Doğum Felci Kalkanı',
    shortMeaning: 'Rasyondaki anyon (Klor, Sülfür) ve katyon (Sodyum, Potasyum) mineralleri arasındaki matematiksel farktır.',
    farmerExplanation: 'Doğuma yaklaşan (kuru dönemdeki) bir ineğe "negatif DCAD" yani anyon ağırlıklı özel bir rasyon yedirilir. Bu besleme ineğin kanını hafif asidik yaparak kemiklerindeki kalsiyumu hazır hale getirir. İnek doğum yapıp sütle kalsiyum kaybedince hemen kemikten çeker ve felç geçirmez (hipokalsemi olmaz).',
    practicalTip: 'Doğuma 21 gün kala potasyumu çok yüksek (örneğin yonca) kaba yemleri mutlaka kesin. Yerine saman ve mısır sılajı ağırlıklı "close-up (yakın doğum)" rasyonu uygulayın.',
  },
  {
    id: 'teaser',
    matchTerms: ['teaser', 'teaser koç', 'teaser teke', 'teaser aygır', 'arama erkeği', 'arama erkek'],
    title: 'Teaser (Arama Erkeği)',
    category: 'Damızlık & Anatomi',
    badge: 'Kızgınlık Dedektörü',
    shortMeaning: 'Kısırlaştırılmış veya çiftleşmesi engellenmiş, dişilerdeki kızgınlığı (aşımı) bulmak için kullanılan erkek hayvandır.',
    farmerExplanation: 'Sürünün içine bırakılan ama dişiyle tam çiftleşemeyen erkek hayvandır. Burnundaki koku alma duyusu sayesinde hangi dişinin kızgınlığa (boğaya/koça) geldiğini anında tespit edip ona atlar. Biz de o dişiyi alıp suni tohumlama yaparız.',
    practicalTip: 'Gözle kaçırdığınız "sessiz kızgınlıkları" (gece olan kızgınlıklar) yakalamak için teaser koç veya teke kullanmak, döl tutma oranını devasa ölçüde artırır.',
  },
  {
    id: 'foal_heat',
    matchTerms: ['foal heat', 'tay kızgınlığı', 'tay kızgınlığında'],
    title: 'Foal Heat (Tay Kızgınlığı)',
    category: 'Damızlık & Anatomi',
    badge: 'İlk Fırsat',
    shortMeaning: 'Kısrakların doğum yaptıktan sadece 7-12 gün sonra gösterdikleri ilk kızgınlıktır.',
    farmerExplanation: 'Atlar inanılmaz hızlı toparlanır. Kısrak doğurduktan bir hafta - on gün sonra tekrar çiftleşmeye hazır hale gelir. Ancak bu dönemde rahim tamamen temizlenmemiş olabileceği için döl tutma şansı normalden biraz daha düşüktür.',
    practicalTip: 'Foal heat sırasında veteriner ultrasonla rahme bakmalıdır. Rahim içi sıvı birikimi (iltihap) yoksa ve tay sağlıklıysa tohumlama yapılabilir.',
  },
  {
    id: 'bpt',
    matchTerms: ['BPT', 'belirti testi', 'arka basınç', 'arka basınç testi', 'refleks', 'refleksi'],
    title: 'BPT (Arka Basınç Testi)',
    category: 'Damızlık & Anatomi',
    badge: 'Domuzlarda Kızgınlık Testi',
    shortMeaning: 'Domuzların sırtına (beline) baskı uygulandığında kaskatı kesilerek çiftleşmeye hazır olduğunu gösteren testtir.',
    farmerExplanation: 'Domuz yetiştiriciliğinde dişi domuzun kızgınlıkta olduğunu anlamak için bakıcının domuzun beline iki eliyle bastırması veya üzerine oturmasıdır. Domuz kaçmaz, kulaklarını diker ve kaskatı donup kalırsa tohumlama zamanı gelmiş demektir.',
    practicalTip: 'BPT testini yaparken ortamda bir erkek domuzun (boar) kokusu veya sesi olması testin başarısını %90 artırır.',
  },
  {
    id: 'poliestrus',
    matchTerms: ['poliestrus', 'mevsimsel poliestrustür', 'mevsimsel poliestrus', 'mevsimsellik', 'kısa gün', 'uzun gün'],
    title: 'Mevsimsel Poliestrus',
    category: 'Damızlık & Anatomi',
    badge: 'Takvime Bağlı Üreme',
    shortMeaning: 'Hayvanların sadece yılın belirli mevsimlerinde, gün ışığı uzunluğuna göre kızgınlık göstermesidir.',
    farmerExplanation: 'İnekler yılın her ayı kızgınlık gösterirken; koyun ve keçiler sadece günler kısalırken (sonbahar), atlar ise günler uzarken (ilkbahar) kızgınlık döngüsüne girerler. Mevsimi geçince yumurtalıklar uykuya yatar (anestrus).',
    practicalTip: 'Koyunlarda koç katımını güneşin etkisini yitirdiği serin sonbahar aylarına denk getirirseniz, ikiz doğum oranınız çok daha yüksek olur.',
  },
  {
    id: 'raddle',
    matchTerms: ['raddle', 'boyanlı göğüs kayışı', 'boyalı göğüs kayışı', 'boyanlı göğüs kayışı (raddle)'],
    title: 'Raddle (Boyalı Göğüs Kayışı)',
    category: 'Damızlık & Anatomi',
    badge: 'Koç Katımı Takibi',
    shortMeaning: 'Erkek hayvanın göğsüne takılan ve aşım yaptığı dişinin sırtını boyayarak işaretleyen kayıştır.',
    farmerExplanation: 'Koçun göğsüne takılan tebeşirli/boyalı bir yelek gibidir. Koç sürüdeki kızgın koyunun üstüne atladığında, koyunun sırtında boya izi kalır. Çoban sabah sürüye baktığında hangi koyunun çiftleştiğini o boya izinden şıp diye anlar.',
    practicalTip: 'Boyanın rengini her 14-17 günde bir değiştirin (Örn: Önce açık yeşil, sonra kırmızı). Eğer kırmızı renge rağmen sırtı tekrar boyanıyorsa o koyun gebe kalmamış demektir.',
  },
  {
    id: 'boar',
    matchTerms: ['boar', 'boar sunumu', 'erkek domuz'],
    title: 'Boar (Erkek Domuz)',
    category: 'Damızlık & Anatomi',
    badge: 'Feromon Kaynağı',
    shortMeaning: 'Damızlık erkek domuzdur; yaydığı güçlü koku (feromon) dişilerin kızgınlığını tetikler.',
    farmerExplanation: 'Erkek domuzun tükürüğünde dişileri çıldırtan özel bir koku vardır. Dişi domuzlara suni tohumlama yapmadan önce ortamda bir erkek domuz gezinirse, dişiler çok daha güçlü kızgınlık belirtisi gösterir ve tohumu daha iyi kabul eder.',
    practicalTip: 'Tohumlama yaparken boar spreyi (erkek domuz kokusu) kullanmak veya ortamda bir arama erkeği bulundurmak döl tutma oranını katlar.',
  },
  {
    id: 'flushing',
    matchTerms: ['flashing', 'flushing', 'koç katımı', 'koç katımında', 'şok besleme'],
    title: 'Flushing (Şok Besleme)',
    category: 'Rasyon & Besleme',
    badge: 'İkizlik Artırıcı',
    shortMeaning: 'Çiftleşme döneminden (koç katımından) 2-3 hafta önce dişilere fazladan enerji ve protein verilerek yumurtlamanın artırılmasıdır.',
    farmerExplanation: 'Koyun ve keçilere "kocaya gitmeden önce" ziyafet çekilmesidir. Vücuduna aniden bol besin giren hayvanın beyni "Bu yıl kıtlık yok, yiyecek bol" mesajı alır ve bir yerine iki yumurta bırakır (ikizlilik artar).',
    practicalTip: 'Koç katımından 15 gün önce başlayıp katımdan 15 gün sonrasına kadar koyun başı ekstra 250-400 gram kaliteli tahıl kırması (arpa, mısır) verin.',
  }
];

/**
 * Finds a matching glossary term for a word or phrase, or null.
 */
export function findGlossaryTerm(word: string): GlossaryTerm | null {
  const lower = word.trim().toLowerCase();
  for (const term of GLOSSARY_TERMS) {
    for (const match of term.matchTerms) {
      if (match.toLowerCase() === lower) {
        return term;
      }
    }
  }
  return null;
}
