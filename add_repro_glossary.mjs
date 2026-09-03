import fs from 'fs';
const path = 'src/rasyon/data/glossary.ts';
let content = fs.readFileSync(path, 'utf8');

const newTerms = `  {
    id: 'palpasyon',
    matchTerms: ['palpasyon', 'rektal palpasyon', 'el palpasyonu', 'palpasyonu', 'ultrason', 'ultrasonla'],
    title: 'Rektal Palpasyon & Ultrason',
    category: 'Sağlık & Klinik',
    badge: 'Gebelik Kontrolü',
    shortMeaning: 'Bağırsak üzerinden elle veya ultrason probuyla rahim ve yumurtalıkların kontrol edilmesidir.',
    farmerExplanation: 'İneklerin kalın bağırsağından (rektum) kol sokularak hemen altındaki rahim (yavru yatağı) ve yumurtalıklar elle veya ultrason kamerasıyla kontrol edilir. Tohumlamadan sonraki 30-45. günlerde ineğin gebe kalıp kalmadığını anlamak veya kist olup olmadığını bulmak için en garantili yöntemdir.',
    practicalTip: 'Tohumlamadan sonraki 40. günden itibaren veteriner hekiminize mutlaka gebelik muayenesi yaptırarak boş (gebe kalmamış) inekleri erkenden tespit edin, aksi halde aylarca bedavaya beslemiş olursunuz.',
  },
  {
    id: 'dcad',
    matchTerms: ['DCAD', 'DCA', 'negatif DCAD', 'anyonik', 'anyon katyon dengesi'],
    title: 'Anyon-Katyon Dengesi (DCAD)',
    category: 'Rasyon & Besleme',
    badge: 'Doğum Felci Kalkanı',
    shortMeaning: 'Rasyondaki anyon (Klor, Sülfür) ve katyon (Sodyum, Potasyum) mineralleri arasındaki matematiksel farktır.',
    farmerExplanation: 'Doğuma yaklaşan (kuru dönemdeki) bir ineğe "negatif DCAD" yani anyon ağırlıklı özel bir rasyon yedirilir. Bu besleme ineğin kanını hafif asidik yaparak kemiklerindeki kalsiyumu hazır hale getirir. İnek doğum yapıp sütle kalsiyum kaybedince hemen kemikten çeker ve felç geçirmez (hipokalsemi olmaz).',
    practicalTip: 'Doğuma 21 gün kala potasyumu çok yüksek (örneğin yonca) kaba yemleri mutlaka kesin. Yerine saman ve mısır sılajı ağırlıklı "close-up (yakın doğum)" rasyonu uygulayın.',
  },
  {
    id: 'teaser',
    matchTerms: ['teaser', 'teaser koç', 'teaser teke', 'teaser aygır', 'arama erkek'],
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
    matchTerms: ['BPT', 'belirti testi', 'arka basınç', 'arka basınç testi', 'refleks'],
    title: 'BPT (Arka Basınç Testi)',
    category: 'Damızlık & Anatomi',
    badge: 'Domuzlarda Kızgınlık Testi',
    shortMeaning: 'Domuzların sırtına (beline) baskı uygulandığında kaskatı kesilerek çiftleşmeye hazır olduğunu gösteren testtir.',
    farmerExplanation: 'Domuz yetiştiriciliğinde dişi domuzun kızgınlıkta olduğunu anlamak için bakıcının domuzun beline iki eliyle bastırması veya üzerine oturmasıdır. Domuz kaçmaz, kulaklarını diker ve kaskatı donup kalırsa tohumlama zamanı gelmiş demektir.',
    practicalTip: 'BPT testini yaparken ortamda bir erkek domuzun (boar) kokusu veya sesi olması testin başarısını %90 artırır.',
  },
  {
    id: 'poliestrus',
    matchTerms: ['poliestrus', 'mevsimsel poliestrus', 'mevsimsellik', 'kısa gün', 'uzun gün'],
    title: 'Mevsimsel Poliestrus',
    category: 'Damızlık & Anatomi',
    badge: 'Takvime Bağlı Üreme',
    shortMeaning: 'Hayvanların sadece yılın belirli mevsimlerinde, gün ışığı uzunluğuna göre kızgınlık göstermesidir.',
    farmerExplanation: 'İnekler yılın her ayı kızgınlık gösterirken; koyun ve keçiler sadece günler kısalırken (sonbahar), atlar ise günler uzarken (ilkbahar) kızgınlık döngüsüne girerler. Mevsimi geçince yumurtalıklar uykuya yatar (anestrus).',
    practicalTip: 'Koyunlarda koç katımını güneşin etkisini yitirdiği serin sonbahar aylarına denk getirirseniz, ikiz doğum oranınız çok daha yüksek olur.',
  },
  {
    id: 'raddle',
    matchTerms: ['raddle', 'boyanlı göğüs kayışı', 'boyalı göğüs kayışı'],
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
    matchTerms: ['flashing', 'flushing', 'koç katımı', 'şok besleme'],
    title: 'Flushing (Şok Besleme)',
    category: 'Rasyon & Besleme',
    badge: 'İkizlik Artırıcı',
    shortMeaning: 'Çiftleşme döneminden (koç katımından) 2-3 hafta önce dişilere fazladan enerji ve protein verilerek yumurtlamanın artırılmasıdır.',
    farmerExplanation: 'Koyun ve keçilere "kocaya gitmeden önce" ziyafet çekilmesidir. Vücuduna aniden bol besin giren hayvanın beyni "Bu yıl kıtlık yok, yiyecek bol" mesajı alır ve bir yerine iki yumurta bırakır (ikizlilik artar).',
    practicalTip: 'Koç katımından 15 gün önce başlayıp katımdan 15 gün sonrasına kadar koyun başı ekstra 250-400 gram kaliteli tahıl kırması (arpa, mısır) verin.',
  }
];

content = content.replace('];\n\n/**', newTerms + '];\n\n/**');
fs.writeFileSync(path, content, 'utf8');
console.log('Done');
