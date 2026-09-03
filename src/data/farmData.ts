import { FarmStat, FarmProduct, ProductionStep, Testimonial, FaqItem, ContactInfo } from '../types';

export const FARM_CONTACT: ContactInfo = {
  farmName: 'Ada Çiftliği',
  village: 'Adasarhanlı Köyü',
  district: 'Meriç',
  province: 'Edirne',
  fullAddress: 'Adasarhanlı Köyü Yolu, 22600 Meriç / Edirne',
  phone: '+90 (532) 412 22 88',
  phoneRaw: '+905324122288',
  whatsapp: '+90 (532) 412 22 88',
  whatsappUrl: 'https://wa.me/905324122288?text=Merhaba%20Ada%20%C3%87iftli%C4%9Fi,%20%C3%BCr%C3%BCnleriniz%20ve%20fiyatlar%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.',
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
    image: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?q=80&w=1000&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=1000&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=1000&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=1000&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1000&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1000&auto=format&fit=crop',
    description: 'Adasarhanlı Köyü Meriç Nehri havzasında taze kekik ve kır otları ile serbest beslenme.'
  },
  {
    id: 'g2',
    title: 'Kıvırcık Koyun ve Koç Damızlıkları',
    category: 'Küçükbaş',
    image: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?q=80&w=1000&auto=format&fit=crop',
    description: 'Trakya iklimine adapte, hastalıklara dirençli ve yüksek et randımanlı damızlık sürüler.'
  },
  {
    id: 'g3',
    title: 'Bahar Dönemi Süt Kuzusu Padokları',
    category: 'Kuzu',
    image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=1000&auto=format&fit=crop',
    description: 'Anne sütü ve taze yonca ile büyütülen yumuşak etli sağlıklı kuzularımız.'
  },
  {
    id: 'g4',
    title: 'Simental Süt İnekleri & Havadar Barınak',
    category: 'Büyükbaş',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=1000&auto=format&fit=crop',
    description: 'Günde 28-36 litre süt verimine sahip, düzenli tırnak ve meme bakımı yapılan damızlıklar.'
  },
  {
    id: 'g5',
    title: 'AISI 304 Krom Süt Soğutma Tankı (+3.8°C)',
    category: 'Süt & Hijyen',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?q=80&w=1000&auto=format&fit=crop',
    description: 'El değmeden vakumlu sağılan sütün anında soğutulduğu izole paslanmaz çelik depolama ünitesi.'
  },
  {
    id: 'g6',
    title: 'Besi Danaları & Açık Gezinti Padokları',
    category: 'Besi & Kurbanlık',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=1000&auto=format&fit=crop',
    description: 'Kendi yetiştirdiğimiz arpa ve yulafla dengeli beslenen, yüksek karkas verimli erkek danalar.'
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
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    badge: '5 Yıldır Düzenli Alıcı'
  },
  {
    id: 't2',
    name: 'Ayşe Hanım & Selim Güler',
    role: 'Doğal Mandıra & Peynir Atölyesi',
    location: 'Uzunköprü / Edirne',
    comment: 'Günlük aldığımız çiğ sütün kuru madde ve yağ oranı harika. Yaptığımız ezine tipi peynir ve yoğurtlarda tutarlılığı doğrudan hissediyoruz. Soğuk tank teslimatına gösterdikleri özen için teşekkür ederiz.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    badge: 'Günlük Taze Süt Tedariği'
  },
  {
    id: 't3',
    name: 'Bülent Öztürk',
    role: 'Besi & Hayvancılık İşletmecisi',
    location: 'Havsa / Edirne',
    comment: 'Geçen yıl aldığımız 45 baş Simental besi danası çok iyi randıman verdi. Hayvanlar Adasarhanlı köyünün merasında iyi altyapı görmüş, barınak koşulları son derece ferah ve temiz.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    badge: 'Büyükbaş Damızlık Müşterisi'
  },
  {
    id: 't4',
    name: 'Cemil Demirtaş',
    role: 'Kurbanlık Hisse Grubu Sorumlusu',
    location: 'İstanbul (Bakırköy Grubu)',
    comment: 'İstanbul’dan her bayram Meriç Adasarhanlı’ya geliyoruz. İki senedir hisse danalarımızı Ada Çiftliği’nden ayırtıyoruz. Çiftliği gezebilmek, hayvanın ne yediğini kendi gözünle görmek güven veriyor.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
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
