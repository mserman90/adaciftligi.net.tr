import { FarmStat, FarmProduct, ProductionStep, Testimonial, FaqItem, ContactInfo } from '../types';

export const FARM_CONTACT: ContactInfo = {
  farmName: 'Ada Çiftliği',
  village: 'Adasarhanlı Köyü',
  district: 'Meriç',
  province: 'Edirne',
  fullAddress: 'Adasarhanlı Köyü Yolu, 22600 Meriç / Edirne',
  phone: '+90 (532) 342 82 00',
  phoneRaw: '+905323428200',
  whatsapp: '+90 (532) 342 82 00',
  whatsappUrl: 'https://wa.me/905323428200?text=Merhaba%20Ada%20%C3%87iftli%C4%9Fi,%20%C3%BCr%C3%BCnleriniz%20ve%20fiyatlar%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.',
  email: 'iletisim@adaciftligi.net.tr',
  workingHours: 'Haftanın 7 Günü: 07:00 – 19:30',
  coordinates: {
    lat: 41.1834,
    lng: 26.4215
  }
};

export const FARM_STATS: FarmStat[] = [
  {
    id: 'animals',
    value: '850+',
    numberValue: 850,
    suffix: '+',
    label: 'Baş Sağlıklı Hayvan',
    sublabel: 'Koyun, kuzu, inek ve dana varlığı'
  },
  {
    id: 'milk',
    value: '2.400+',
    numberValue: 2400,
    suffix: '+ Lt',
    label: 'Günlük Taze Süt',
    sublabel: 'Soğuk tankta +4°C muhafaza'
  },
  {
    id: 'pasture',
    value: '140+',
    numberValue: 140,
    suffix: ' Dönüm',
    label: 'Doğal Mera Alanı',
    sublabel: 'Meriç ovası sulak otlakları'
  },
  {
    id: 'established',
    value: '2012',
    numberValue: 2012,
    suffix: '',
    label: 'Kuruluş Yılı',
    sublabel: '14 yılı aşkın aile yetiştiriciliği'
  }
];

export const FARM_PRODUCTS: FarmProduct[] = [
  {
    id: 'koyun',
    title: 'Damızlık & Kesimlik Koyun',
    category: 'kucukbas',
    categoryLabel: 'Küçükbaş',
    image: '/images/koyun.webp',
    tag: 'Trakya Kıvırcık & Merinos',
    breed: 'Saf Kıvırcık & Anadolu Merinosu',
    feeding: 'Meriç doğal mera otlatması + yonca',
    deliveryType: 'Canlı baskül veya kesimhane teslim',
    description: 'Meriç nehri havzasının verimli kekik ve kır otlaklarında serbest otlayan, kemik ve kas yapısı dengeli, hastalıklara dirençli damızlık ve adaklık/kesimlik koyunlar.',
    highlights: [
      'Trakya bölgesine adapte güçlü ırk',
      'Aşı ve iç-dış parazit takvimi eksiksiz',
      'Yüksek et kalitesi ve ideal yağ dağılımı',
      'Damızlık dişi ve koç seçenekleri'
    ],
    pricingNote: 'Canlı kg baskül veya toptan sürü alımlarına göre'
  },
  {
    id: 'kuzu',
    title: 'Süt Kuzusu & Besi Kuzusu',
    category: 'kucukbas',
    categoryLabel: 'Küçükbaş',
    image: '/images/kuzu.webp',
    tag: 'Doğal Anne Sütü & Bahar Otu',
    breed: 'Kıvırcık Melezi Süt Kuzuları',
    feeding: 'Anne sütü + taze yonca ve arpa ezmesi',
    deliveryType: 'Toptan kasaplık / Canlı teslimat',
    description: 'Hormonsuz ve antibiyotiksiz yetiştirilen, yumuşak dokulu ve kokusuz etiyle bilinen meşhur Trakya kıvırcık süt ve besi kuzuları. Kasaplar ve restoranlar için ideal karkas randımanı.',
    highlights: [
      'Gevrek, yumuşak ve açık renkli et yapısı',
      'Canlı kantar tartımı garantisi',
      '35 - 55 kg arası homojen besi grupları',
      'Veteriner sağlık raporu ile sevk'
    ],
    pricingNote: 'Haftalık canlı kantar güncel borsa fiyatı'
  },
  {
    id: 'inek',
    title: 'Yüksek Verimli Süt İneği',
    category: 'buyukbas',
    categoryLabel: 'Büyükbaş',
    image: '/images/inek.webp',
    tag: 'Simental & Siyah Alaca (Holstein)',
    breed: 'Simental Kombine & Holstein Süt Irkı',
    feeding: 'Mısır silajı, fiğ, yonca ve doğal kaba yem',
    deliveryType: 'Çiftlikte yerinde inceleme & nakil',
    description: 'Yüksek genetik kapasiteye sahip, günlük süt verimi ve protein/yağ oranı yüksek, tırnak ve meme sağlığı periyodik olarak kontrol edilen damızlık gebe düveler ve sağılan inekler.',
    highlights: [
      'Günlük 28-36 litre süt verim potansiyeli',
      'Sun’i tohumlama kayıtları ve soy kütüğü belgeli',
      'Mavi sertifikalı, TÜRKVET kayıtlı hayvanlar',
      'Mastitis testleri düzenli yapılan sürüler'
    ],
    pricingNote: 'Laktasyon dönemi ve gebe durumuna göre'
  },
  {
    id: 'dana',
    title: 'Besi Danası & Canlı Kurbanlık',
    category: 'buyukbas',
    categoryLabel: 'Büyükbaş',
    image: '/images/dana.webp',
    tag: 'Etçi Irklar (Şarole / Angus / Simental)',
    breed: 'Simental & Şarole Melezi Erkek Besi Danaları',
    feeding: 'Çiftlik harmanlaması arpa kırması, kepek & kaba ot',
    deliveryType: 'Canlı baskül tartım & hisse/kurbanlık rezervasyonu',
    description: 'Geniş açık padoklarda serbest hareket imkanıyla stres yaşamadan beslenen, yüksek karkas et randımanına (%58-62) sahip sağlıklı erkek besi danaları.',
    highlights: [
      'Hızlı canlı ağırlık artışı ve yağsız kas dokusu',
      '400 kg ile 750 kg arası farklı kilo grupları',
      'Kurban dönemi için veteriner yaş ve diş kontrolü',
      'Çiftlik içi hassas dijital kantar tartımı'
    ],
    pricingNote: 'Canlı baskül kg birim fiyatı üzerinden şeffaf tartım'
  },
  {
    id: 'sut',
    title: 'Günlük Taze Çiğ Çiftlik Sütü',
    category: 'sut',
    categoryLabel: 'Süt Üretimi',
    image: '/images/sut.webp',
    tag: 'Yağ Oranı %3.9+ | Katkısız & Soğuk Zincir',
    breed: 'Çiftlik Süt İneklerinden Taze Sağım',
    feeding: 'Doğal kaba yem ve mera besisi aroması',
    deliveryType: 'Soğutmalı tanker (toptan) veya steril güğüm',
    description: 'El değmeden, otomatik kapalı devre vakumlu sağım ünitelerimizden doğrudan +4°C krom soğutma tanklarına aktarılan, yağı alınmamış ve su katılmamış hakiki çiftlik sütü.',
    highlights: [
      'Somatik hücre sayısı ve bakteri sayısı AB standartlarında',
      'Yoğurt, peynir ve kaymak yapımında mükemmel kıvam',
      'Günlük laboratuvar ve antibiyotik kalıntı testleri',
      'Mandıralar ve toplu alıcılar için düzenli günlük sevkiyat'
    ],
    pricingNote: 'Toptan tanker alımları ve perakende siparişe uygun'
  }
];

export const PRODUCTION_STEPS: ProductionStep[] = [
  {
    stepNumber: '01',
    title: 'Meriç Ovası Doğal Otlatma & Dengeli Besleme',
    subtitle: 'Doğal Habitat & Hayvan Refahı',
    description: 'Hayvanlarımız gün ışığında, Meriç nehrinin alüvyon zengin topraklarında yetişen kekik, yonca ve yabani meralarda serbestçe gezinir. Fabrika artıklarından uzak, kendi arazilerimizde ürettiğimiz kaba yemle beslenir.',
    iconName: 'Sprout',
    image: '/images/step_pasture.webp',
    imageAlt: 'Meriç Nehri havzasında serbest otlayan sürüler ve doğal meralar',
    details: [
      '140 dönüm doğal mera ve gölgelikli gezinme alanları',
      'GDO ve kimyasal büyüme hormonu kesinlikle kullanılmaz',
      'Temiz artezyen kuyu suyu ile 24 saat kesintisiz sulama'
    ]
  },
  {
    stepNumber: '02',
    title: 'Otomatik Kapalı Devre Sağım & Veteriner Takibi',
    subtitle: 'Kusursuz Hijyen & Biyogüvenlik',
    description: 'Süt sağımı el değmeden paslanmaz çelik hatlarla gerçekleştirilir. Sürümüz anlaşmalı veteriner hekimimiz tarafından haftalık aşı, kan analizi ve genel sağlık taramasından geçirilir.',
    iconName: 'ShieldCheck',
    image: '/images/step_vet.webp',
    imageAlt: 'Veteriner sağlık kontrolü, küpeleme ve modern padok bakımı',
    details: [
      'Hassas meme temizliği ve daldırma dezenfeksiyonu',
      'Paslanmaz gıda sınıfı AISI 304 krom boru hatları',
      'TÜRKVET küpeli ve dijital pedigri takipli hayvan kayıtları'
    ]
  },
  {
    stepNumber: '03',
    title: '+4°C Soğuk Tank Muhafaza & Güvenli Teslimat',
    subtitle: 'Hızlı Soğuk Zincir & Şeffaf Tartım',
    description: 'Sağılan süt 7 dakika içinde +3.8°C sıcaklığa düşürülerek bakteri üremesi engellenir. Canlı hayvan sevkiyatlarında dijital kalibreli kantar ve resmi ilçe tarım sevk raporları ile teslim yapılır.',
    iconName: 'Truck',
    image: '/images/step_transport.webp',
    imageAlt: 'Soğutmalı tanker ve canlı hayvan nakliyat aracı',
    details: [
      'Termoking soğutuculu paslanmaz çelik taşıma tankeri',
      'Yerinde canlı ağırlık tartımı ve şeffaf faturalandırma',
      'Edirne, Trakya ilçeleri ve çevre illere hızlı lojistik'
    ]
  }
];

export interface FarmGalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export const FARM_GALLERY: FarmGalleryItem[] = [
  {
    id: 'g1',
    title: 'Meriç Deltası Doğal Mera Yayılımı',
    category: 'Mera & Otlak',
    image: '/images/hero_cows.webp',
    description: 'Adasarhanlı Köyü Meriç Nehri havzasında taze kekik ve kır otları ile serbest beslenme.'
  },
  {
    id: 'g2',
    title: 'Kıvırcık Koyun ve Koç Damızlıkları',
    category: 'Küçükbaş',
    image: '/images/koyun.webp',
    description: 'Trakya iklimine adapte, hastalıklara dirençli ve yüksek et randımanlı damızlık sürüler.'
  },
  {
    id: 'g3',
    title: 'Bahar Dönemi Süt Kuzusu Padokları',
    category: 'Kuzu',
    image: '/images/kuzu.webp',
    description: 'Anne sütü ve taze yonca ile büyütülen yumuşak etli sağlıklı kuzularımız.'
  },
  {
    id: 'g4',
    title: 'Simental Süt İnekleri & Havadar Barınak',
    category: 'Büyükbaş',
    image: '/images/inek.webp',
    description: 'Günde 28-36 litre süt verimine sahip, düzenli tırnak ve meme bakımı yapılan damızlıklar.'
  },
  {
    id: 'g5',
    title: 'AISI 304 Krom Süt Soğutma Tankı (+3.8°C)',
    category: 'Süt & Hijyen',
    image: '/images/tank.webp',
    description: 'El değmeden vakumlu sağılan sütün anında soğutulduğu izole paslanmaz çelik depolama ünitesi.'
  },
  {
    id: 'g6',
    title: 'Besi Danaları & Açık Gezinti Padokları',
    category: 'Besi & Kurbanlık',
    image: '/images/dana.webp',
    description: 'Kendi yetiştirdiğimiz arpa ve yulafla dengeli beslenen, yüksek karkas verimli erkek danalar.'
  }
];

export const FARM_GALLERY_EN: FarmGalleryItem[] = [
  {
    id: 'g1',
    title: 'Meric Delta Natural Pasture Grazing',
    category: 'Pasture & Grazing',
    image: '/images/hero_cows.webp',
    description: 'Free grazing with fresh thyme and wild flora in the Adasarhanli Village Meric River basin.'
  },
  {
    id: 'g2',
    title: 'Thracian Curly Sheep & Ram Breeding',
    category: 'Sheep & Lamb',
    image: '/images/koyun.webp',
    description: 'Breeding flocks adapted to the Thracian climate, resistant to diseases, with high meat yield.'
  },
  {
    id: 'g3',
    title: 'Spring Season Milk Lamb Paddocks',
    category: 'Lamb',
    image: '/images/kuzu.webp',
    description: 'Healthy lambs with tender meat raised on mother milk and fresh alfalfa.'
  },
  {
    id: 'g4',
    title: 'Simmental Dairy Cows & Airy Barn',
    category: 'Cattle',
    image: '/images/inek.webp',
    description: 'Breeding cattle with daily milk yield of 28-36 liters, with regular hoof and udder care.'
  },
  {
    id: 'g5',
    title: 'AISI 304 Stainless Milk Cooling Tank (+3.8°C)',
    category: 'Milk & Hygiene',
    image: '/images/tank.webp',
    description: 'Insulated stainless steel storage unit where untouched vacuum milk is chilled instantly.'
  },
  {
    id: 'g6',
    title: 'Fattening Calves & Open Grazing Paddocks',
    category: 'Fattening & Cattle',
    image: '/images/dana.webp',
    description: 'Male calves with high carcass yield, fed a balanced diet of farm-grown barley and oats.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Mustafa Kılıç',
    role: 'Kılıçoğlu Et & Şarküteri Sahibi',
    location: 'Edirne Merkez',
    comment: 'Ada Çiftliği ile 5 yıldır aralıksız çalışıyoruz. Kıvırcık kuzularının et randımanı ve lezzeti Edirne esnafı olarak bizi hiç yanıltmadı. Hayvanların hepsi sağlıklı ve aşılı, kantar tartımları her zaman dürüst.',
    rating: 5,
    avatar: '/images/avatar_1.webp',
    badge: '5 Yıldır Düzenli Alıcı'
  },
  {
    id: 't2',
    name: 'Ayşe Hanım & Selim Güler',
    role: 'Doğal Mandıra & Peynir Atölyesi',
    location: 'Uzunköprü / Edirne',
    comment: 'Günlük aldığımız çiğ sütün kuru madde ve yağ oranı harika. Yaptığımız ezine tipi peynir ve yoğurtlarda tutarlılığı doğrudan hissediyoruz. Soğuk tank teslimatına gösterdikleri özen için teşekkür ederiz.',
    rating: 5,
    avatar: '/images/avatar_2.webp',
    badge: 'Günlük Taze Süt Tedariği'
  },
  {
    id: 't3',
    name: 'Bülent Öztürk',
    role: 'Besi & Hayvancılık İşletmecisi',
    location: 'Havsa / Edirne',
    comment: 'Geçen yıl aldığımız 45 baş Simental besi danası çok iyi randıman verdi. Hayvanlar Adasarhanlı köyünün merasında iyi altyapı görmüş, barınak koşulları son derece ferah ve temiz.',
    rating: 5,
    avatar: '/images/avatar_3.webp',
    badge: 'Büyükbaş Damızlık Müşterisi'
  },
  {
    id: 't4',
    name: 'Cemil Demirtaş',
    role: 'Kurbanlık Hisse Grubu Sorumlusu',
    location: 'İstanbul (Bakırköy Grubu)',
    comment: 'İstanbul’dan her bayram Meriç Adasarhanlı’ya geliyoruz. İki senedir hisse danalarımızı Ada Çiftliği’nden ayırtıyoruz. Çiftliği gezebilmek, hayvanın ne yediğini kendi gözünle görmek güven veriyor.',
    rating: 5,
    avatar: '/images/avatar_4.webp',
    badge: 'Bireysel & Aile Müşterisi'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'teslimat',
    question: 'Teslimat bölgeleriniz nereleri kapsıyor, çiftlikten bizzat alım yapılabilir mi?',
    answer: 'Ada Çiftliği, Edirne ili Meriç ilçesi Adasarhanlı Köyü’nde yer almaktadır. Çiftliğimizden haftanın 7 günü yerinde görerek doğrudan alım yapabilirsiniz. Toplu süt alımlarında Edirne merkez, Uzunköprü, Keşan ve Meriç havzasına soğutmalı araçlarımızla sevkiyat yapılmaktadır. Canlı hayvan alımlarında ise uygun nakliye aracı ve resmi veteriner sevk raporu ile tüm Trakya ve çevre illere sevkiyat organize edilmektedir.'
  },
  {
    id: 'faq-2',
    category: 'siparis',
    question: 'Günlük çiğ süt alımı için minimum sipariş miktarı nedir?',
    answer: 'Yerel toptan alıcılar (mandıra, şarküteri, tatlı ve dondurma imalatçıları) için günlük 100 litreden başlayan düzenli sözleşmeli tedarik sağlıyoruz. Bireysel müşterilerimiz ise çiftliğimize gelerek kendi steril kaplarına diledikleri miktarda günlük sağılmış taze süt alabilirler.'
  },
  {
    id: 'faq-3',
    category: 'saglik',
    question: 'Hayvanların aşı ve sağlık kontrolleri nasıl yapılıyor?',
    answer: 'Tüm hayvanlarımız İlçe Tarım ve Orman Müdürlüğü kayıtlı (TÜRKVET küpeli) olup, anlaşmalı veteriner hekimlerimiz tarafından periyodik olarak muayene edilir. Şap, brucella, çiçek, parazit aşıları eksiksiz uygulanır. Hayvan sevklerinde resmi veteriner sağlık raporu düzenlenir.'
  },
  {
    id: 'faq-4',
    category: 'ciftlik',
    question: 'Hayvanların beslenmesinde fabrika yemi veya hormon kullanılıyor mu?',
    answer: 'Kesinlikle kimyasal büyüme hormonu, hayvansal un veya zararlı katkı maddeleri kullanılmaz. Çiftliğimiz Meriç nehrinin getirdiği sulak bereketli topraklarda yer alır; hayvanlarımız mera otu, taze biçilmiş yonca, silajlık mısır, arpa kırması ve kepek gibi tamamen bitkisel ve doğal kaba yemlerle beslenir.'
  },
  {
    id: 'faq-5',
    category: 'siparis',
    question: 'Canlı kurbanlık ve hisse rezervasyonu nasıl yapılıyor?',
    answer: 'Kurban dönemi öncesinde çiftliğimizdeki büyükbaş (dana/düve) ve küçükbaş (koyun/kuzu) hayvanlar canlı baskülde tartılarak numaralandırılır. Beğendiğiniz hayvanı canlı kg fiyatı üzerinden veya sabit hisse bedeliyle rezerve edebilirsiniz. Bayram gününe kadar ücretsiz bakım ve besleme çiftliğimizce sağlanır.'
  },
  {
    id: 'faq-6',
    category: 'ciftlik',
    question: 'Çiftliği ziyaret etmek için randevu almamız gerekiyor mu?',
    answer: 'Çiftliğimiz haftanın 7 günü 07:00 – 19:30 saatleri arasında açıktır. Ancak sağım saatlerini izlemek, sürü yöneticimizle detaylı görüşmek veya hayvan seçimi yapmak istiyorsanız gelmeden önce telefon veya WhatsApp ile haber vermenizi rica ederiz.'
  }
];


export const FARM_PRODUCTS_EN: FarmProduct[] = [
  {
    id: 'koyun',
    title: 'Breeding & Slaughter Sheep',
    category: 'kucukbas',
    categoryLabel: 'Small Cattle',
    image: '/images/koyun.webp',
    tag: 'Thracian Curly & Merino',
    breed: 'Pure Curly & Anatolian Merino',
    feeding: 'Meric natural pasture grazing + alfalfa',
    deliveryType: 'Live scale weight or abattoir delivery',
    description: 'Breeding and sacrifice sheep freely grazing on fertile thyme and wild pastures in the Meric river basin, with balanced bone and muscle structure, highly resistant to diseases.',
    highlights: [
      'Strong breed adapted to Thrace climate',
      'Complete vaccination and parasite schedule',
      'High meat quality and ideal fat marbling',
      'Breeding female and ram options'
    ],
    pricingNote: 'Based on live weight scale or bulk flock purchase'
  },
  {
    id: 'kuzu',
    title: 'Milk Lamb & Feeder Lamb',
    category: 'kucukbas',
    categoryLabel: 'Small Cattle',
    image: '/images/kuzu.webp',
    tag: 'Natural Mother Milk & Spring Flora',
    breed: 'Curly Crossbreed Milk Lambs',
    feeding: 'Mother milk + fresh alfalfa & crushed barley',
    deliveryType: 'Wholesale butchery / Live delivery',
    description: 'Renowned Thracian curly milk and feeder lambs raised free of hormones and antibiotics, celebrated for tender, mild-flavored meat. Ideal carcass yield for butchers and restaurants.',
    highlights: [
      'Tender, soft and light-colored meat texture',
      'Guaranteed live scale weighing',
      'Homogeneous fattening groups between 35 - 55 kg',
      'Dispatched with official veterinary health report'
    ],
    pricingNote: 'Weekly live scale stock exchange current price'
  },
  {
    id: 'inek',
    title: 'High-Yield Dairy Cows',
    category: 'buyukbas',
    categoryLabel: 'Cattle',
    image: '/images/inek.webp',
    tag: 'Simmental & Holstein Friesian',
    breed: 'Simmental Dual-Purpose & Holstein Dairy Breed',
    feeding: 'Corn silage, vetch, alfalfa & natural roughage',
    deliveryType: 'On-farm inspection & transport',
    description: 'High genetic merit dairy cows and pregnant heifers with high daily milk yield and protein/fat content, with regular hoof and udder health monitoring.',
    highlights: [
      'Daily 28-36 liters milk yield potential',
      'Artificial insemination records & pedigree certified',
      'Blue certificate & TÜRKVET registered animals',
      'Flocks regularly tested for mastitis'
    ],
    pricingNote: 'According to lactation stage and pregnancy status'
  },
  {
    id: 'dana',
    title: 'Fattening Calves & Live Sacrifice Cattle',
    category: 'buyukbas',
    categoryLabel: 'Cattle',
    image: '/images/dana.webp',
    tag: 'Beef Breeds (Charolais / Angus / Simmental)',
    breed: 'Simmental & Charolais Crossbreed Male Calves',
    feeding: 'Farm-blend crushed barley, wheat bran & roughage',
    deliveryType: 'Live scale weighing & sacrifice share reservation',
    description: 'Healthy male fattening calves raised without stress in spacious open paddocks with free movement, boasting a high carcass meat yield (58-62%).',
    highlights: [
      'Rapid live weight gain and lean muscle tissue',
      'Diverse weight categories between 400 kg and 750 kg',
      'Veterinary age and tooth verification for sacrifice',
      'On-farm precision digital scale weighing'
    ],
    pricingNote: 'Transparent weighing based on live weight per kg price'
  },
  {
    id: 'sut',
    title: 'Daily Fresh Raw Farm Milk',
    category: 'sut',
    categoryLabel: 'Milk Production',
    image: '/images/sut.webp',
    tag: 'Fat Content 3.9%+ | Additive-Free Cold Chain',
    breed: 'Fresh Milking from Farm Dairy Cows',
    feeding: 'Natural roughage and pasture grazing aroma',
    deliveryType: 'Refrigerated tanker (wholesale) or sterile churns',
    description: 'Authentic raw farm milk with untouched vacuum milking transferred directly into +4°C stainless cooling tanks, never skimmed and with zero added water.',
    highlights: [
      'Somatic cell and bacterial count within EU standards',
      'Perfect consistency for yogurt, cheese, and clotted cream',
      'Daily laboratory and antibiotic residue testing',
      'Regular daily shipment for dairies and bulk buyers'
    ],
    pricingNote: 'Suitable for wholesale tanker purchases and retail orders'
  }
];

export const PRODUCTION_STEPS_EN: ProductionStep[] = [
  {
    stepNumber: '01',
    title: 'Natural Grazing & Feed Production',
    subtitle: 'Healthy Herd & Rich Flora',
    description: 'Our animals graze freely on the natural pastures of the Meric basin and are fed with natural roughage we produce ourselves.',
    iconName: 'Sprout',
    image: '/images/hero_cows.webp',
    imageAlt: 'Herds grazing on Meric river basin',
    details: [
      '140 acres of natural pasture',
      'No GMOs or chemical growth hormones',
      '24/7 clean artesian well water'
    ]
  },
  {
    stepNumber: '02',
    title: 'Closed-Circuit Milking & Vet Care',
    subtitle: 'Flawless Hygiene & Biosecurity',
    description: 'Milking is done untouched via stainless steel lines. Our herd is checked weekly by our vet.',
    iconName: 'ShieldCheck',
    image: '/images/step_vet.webp',
    imageAlt: 'Veterinary health control',
    details: [
      'Precise udder cleaning and disinfection',
      'Stainless food-grade AISI 304 pipes',
      'TÜRKVET ear tag and digital pedigree'
    ]
  },
  {
    stepNumber: '03',
    title: '+4°C Cold Tank Storage & Delivery',
    subtitle: 'Fast Cold Chain & Transparent Weighing',
    description: 'Milked milk is cooled to +3.8°C in 7 minutes. Live animal shipments are made with digital scales and vet reports.',
    iconName: 'Truck',
    image: '/images/step_transport.webp',
    imageAlt: 'Refrigerated tanker transport',
    details: [
      'Thermoking cooled stainless transport',
      'On-site live weight and transparent billing',
      'Fast logistics to Edirne and Thrace'
    ]
  }
];

export const TESTIMONIALS_EN: Testimonial[] = [
  {
    id: 't1',
    name: 'Mustafa Kilic',
    role: 'Kilicoglu Meat & Deli',
    location: 'Edirne Center',
    comment: 'We have been working with Ada Farm for 5 years. Their lamb meat yield and taste never disappoint. Honest weighing.',
    rating: 5,
    avatar: '/images/avatar_1.webp',
    badge: '5-Year Regular Buyer'
  },
  {
    id: 't2',
    name: 'Ayse & Selim Guler',
    role: 'Natural Dairy Workshop',
    location: 'Uzunkopru / Edirne',
    comment: 'The dry matter and fat ratio of the raw milk we buy daily is great. We feel the consistency in our cheese.',
    rating: 5,
    avatar: '/images/avatar_2.webp',
    badge: 'Daily Fresh Milk Buyer'
  },
  {
    id: 't3',
    name: 'Bulent Ozturk',
    role: 'Fattening & Livestock Business',
    location: 'Havsa / Edirne',
    comment: 'The 45 Simental calves we bought last year gave great yield. The animals saw good infrastructure in the pasture.',
    rating: 5,
    avatar: '/images/avatar_3.webp',
    badge: 'Cattle Breeding Customer'
  },
  {
    id: 't4',
    name: 'Cemil Demirtas',
    role: 'Sacrifice Group Coordinator',
    location: 'Istanbul',
    comment: 'We come from Istanbul every Eid. We reserve our animals from Ada Farm. Being able to tour the farm gives confidence.',
    rating: 5,
    avatar: '/images/avatar_4.jpg',
    badge: 'Family Customer'
  }
];

export const FAQ_ITEMS_EN: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'teslimat',
    question: 'Where do you deliver, can we buy directly from the farm?',
    answer: 'Ada Farm is in Adasarhanlı, Meric. You can buy directly 7 days a week. For bulk milk, we deliver to Edirne, Uzunkopru, Kesan. For live animals, we ship to all of Thrace.'
  },
  {
    id: 'faq-2',
    category: 'siparis',
    question: 'What is the minimum order for daily raw milk?',
    answer: 'For local wholesale buyers, we provide regular supply starting from 100 liters daily. Individual customers can come to the farm and buy as much as they want in their sterile containers.'
  },
  {
    id: 'faq-3',
    category: 'saglik',
    question: 'How are animal vaccinations and health checks done?',
    answer: 'All our animals are registered with TÜRKVET and periodically examined by our contracted vets. Vaccines are applied completely. Official health reports are issued for shipments.'
  },
  {
    id: 'faq-4',
    category: 'ciftlik',
    question: 'Are factory feeds or hormones used?',
    answer: 'Absolutely no chemical growth hormones or harmful additives are used. Our animals are fed with pasture grass, fresh alfalfa, corn silage, and barley.'
  },
  {
    id: 'faq-5',
    category: 'siparis',
    question: 'How to reserve a sacrifice animal?',
    answer: 'Animals are weighed and numbered before the sacrifice period. You can reserve by live kg price or fixed share price. Free care is provided until Eid.'
  },
  {
    id: 'faq-6',
    category: 'ciftlik',
    question: 'Do we need an appointment to visit?',
    answer: 'Our farm is open 7 days a week from 07:00 to 19:30. However, if you want to watch the milking or speak with the manager, please notify us beforehand.'
  }
];

export const FARM_CONTACT_EN: ContactInfo = {
  farmName: 'Ada Farm',
  village: 'Adasarhanlı Village',
  district: 'Meric',
  province: 'Edirne',
  fullAddress: 'Adasarhanlı Village Road, 22600 Meric / Edirne',
  phone: '+90 (532) 342 82 00',
  phoneRaw: '+905323428200',
  whatsapp: '+90 (532) 342 82 00',
  whatsappUrl: 'https://wa.me/905323428200?text=Hello%20Ada%20Farm,%20I%20would%20like%20to%20get%20information%20about%20your%20products%20and%20prices.',
  email: 'iletisim@adaciftligi.net.tr',
  workingHours: '7 Days a Week: 07:00 – 19:30',
  coordinates: {
    lat: 41.1834,
    lng: 26.4215
  }
};
