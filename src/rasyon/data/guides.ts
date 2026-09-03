import { ModuleKey } from '../types';

export interface GuideArticle {
  no: string;
  title: string;
  text: string;
}

export interface GuideData {
  title: string;
  intro: string;
  articles: GuideArticle[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export const GUIDES: Record<ModuleKey, GuideData> = {
  besi: {
    title: 'Besi sığırı rasyonu nasıl hazırlanır?',
    intro: 'Optimum çözüm yalnızca matematiksel bir başlangıçtır. Rasyonu sahneye taşırken aşağıdaki dört ilke, hesaplanan maliyeti gerçek performansa çevirir.',
    articles: [
      {
        no: '01',
        title: 'Kaba yemi asla sıfırlamayın',
        text: 'Rumen papillalarının gelişimi ve tükürük ile tamponlama için günlük kuru maddenin en az %10–15\'i kaba yem olmalıdır. Bu payın altına inildiğinde subakut asidoz ve karaciğer apsesi riski hızla artar; yem tüketimi dalgalanır, günlük artış hedefi tutmaz.',
      },
      {
        no: '02',
        title: 'Yeme 7–10 günde alıştırın',
        text: 'Besiye başlarken kesif yem payını kademeli artırın. Ani geçiş; yem tüketiminde düşüş, laktik asidoz ve loşozis daveti çıkarır. Alıştırma döneminde hesaplanan rasyonu %70–80 düzeyinde başlatıp her 2 günde bir artırarak hedef karışıma ulaşın.',
      },
      {
        no: '03',
        title: 'Proteini ucuza değil, doğruya göre seçin',
        text: 'Mısır silajı temelli rasyonlarda protein çoğu zaman sınırlayıcıdır; bu açığı pamuk tohumu küspesi ve soya küspesi ekonomik biçimde kapatır. Besi sonu rasyonlarında ham protein düzeyinin %12–14 bandında kalması hem maliyeti hem sindirilebilirliği dengeler.',
      },
      {
        no: '04',
        title: 'Mineral dengesini izleyin',
        text: 'Kalsiyum-fosfor oranını 1,5–2:1 civarında tutun. Mısır ağırlıklı rasyonlarda kalsiyum, kepek ağırlıklı rasyonlarda ise kalsiyum-fosfor dengesi kireç taşı ve mineral premix ile düzeltilir. Çözüm tablosundaki Ca ve P satırlarını her fiyat güncellemesinde yeniden kontrol edin.',
      },
    ],
  },
  sut: {
    title: 'Süt ineği rasyonu nasıl hazırlanır?',
    intro: 'Laktasyonun her haftası farklı bir ihtiyaç profili çizer. Optimum çözüm matematiksel bir başlangıçtır; aşağıdaki dört ilke, hesaplanan karışımı sürüde gerçek süt ve sağlam bir rumen haline getirir.',
    articles: [
      {
        no: '01',
        title: 'Kaba yem iskeletini koruyun',
        text: 'Günlük kuru maddenin %40–55\'i kaba yem olmalı; etkili NDF, tükürük ile tamponlamanın ve süt yağ oranının güvencesidir. Süt yağı %3,5\'in altına düşüyorsa ilk bakılacak yer rasyonun kaba yem yapısıdır. Mısır silajını iyi kalite kuru otla birlikte kullanmak hem dolgunluk hem parçalanabilirlik dengesi kurar.',
      },
      {
        no: '02',
        title: 'Tepe verim açığını erken planlayın',
        text: 'Doğum sonrası 4–8. haftada tepe süt; KM tüketimi ise geriden geldiği için açık vücut rezervinden kapanır. Rasyon yoğunluğunu 1,60–1,70 Mcal NEL/kg KM bandına taşırken enerjiyi tek seferde kesif yükleyerek değil, pamuk tohumu gibi yağlı kaynaklar (%10–12\'yi geçmeden) ve kaliteli kaba yemle yükseltin.',
      },
      {
        no: '03',
        title: 'Proteini verimle ölçekleyin',
        text: 'Tepe verimde ham protein %16–17, orta dönemde %14–15 yeterlidir. Pamuk tohumu küspesi ve soya küspesi, rumende parçalanmayan protein (RUP) açığını ekonomik kapatır. Aşırı protein ise hem maliyet hem üre yükü demektir; kontrol tablosunda HP satırı “tam karşılandı” görünüyorsa ek protein eklemeyin.',
      },
      {
        no: '04',
        title: 'Mineral, tampon ve kuru dönemi unutmayın',
        text: 'Ca:P oranını yaklaşık 1,5–2:1\'de tutun; kireç taşı ile kalsiyumu, premix ile mikro mineralleri tamamlayın. Yüksek kesifli rasyonlarda sodyum bikarbonat benzeri tamponlar rumen pH\'ını destekler. Bu modül laktasyon rasyonu hesaplar; kuru dönemdeki inekler düşük kalsiyumlu, ayrı bir stratejiyle beslenmelidir.',
      },
    ],
  },
  koyun: {
    title: 'Koyun & kuzu rasyonu nasıl hazırlanır?',
    intro: 'Küçükbaş beslemede iki şey işi belirler: kesife geçişin hızı ve mineral seçimi. Aşağıdaki dört ilke, optimum çözümü sürü sağlığına çevirir.',
    articles: [
      {
        no: '01',
        title: 'Kesife geçişi hızlandırmayın',
        text: 'Kuzu besisinde ani kesif artışı, en sık ölümcül sonuç veren hata olan enterotoksemi (Clostridium perfringens tip D) ve laktik asidozun baş tetikleyicisidir. Tahılı 10–14 günde kademeli yükseltin, alıştırma boyunca kaliteli kaba yemi önlerinde bulundurun ve enterotoksemi aşısı takvimini rasyon planıyla birlikte yürütün.',
      },
      {
        no: '02',
        title: 'Bakırda sığır kuralı geçerli değildir',
        text: 'Koyun, bakırı sığırdan yaklaşık on kat duyarlıdır. Sığır premix\'i veya sığır mineral karışımı koyuna verildiğinde bakır karaciğerde birikir; stres anında hemolitik kriz, sarılık ve ölümlerle ortaya çıkar. Koyun-kuzu modülünde mutlaka küçükbaş için etiketlenmiş premix kullanın; işletmede sığır ve koyun birlikte besleniyorsa mineral dağıtımını fiziksel olarak ayırın.',
      },
      {
        no: '03',
        title: 'Gebeliğin son 6 haftasını ayrı yönetin',
        text: 'Kuzunun büyümesinin büyük bölümü gebeliğin son altı haftasında gerçekleşir; buna karşılık rumen hacmi yavrudan sıkışarak yem tüketimi düşer. Bu “makas” için rasyon yoğunluğunu 1,6–1,8 Mcal NEL/kg KM bandına taşıyın (steaming up). İkizli anaçlarda iştahsızlık + enerji açığı, gebelik zehirlenmesinin (ketozis) klasik zeminidir; ilk klinik belirti isteksizlikte görünür.',
      },
      {
        no: '04',
        title: 'Erkenci kuzularda idrar taşına hazırlıklı olun',
        text: 'Yüksek kesifli kuzu besisinde ürolitiyazis (idrar taşı) en önemli ekonomik kayıplardan biridir. Ca:P oranını ~2:1\'de tutun, rasyona amonyum klorür benzeri taş önleyici ekleyin, tuz tüketimini destekleyerek su içimini artırın ve kuzuların 24 saat kesintisiz temiz suya erişimini hiçbir koşulda engellemeyin.',
      },
    ],
  },
  keci: {
    title: 'Keçi & oğlak rasyonu nasıl hazırlanır?',
    intro: 'Keçi, koyunun kuzeni ama besleme pratiğinde kendine özgüdür: seçicidir, bakır ihtiyacı farklıdır ve süt keçisi canlı ağırlığına oranınca en yoğun beslenen evcil memelidir. Dört ilke, çözümü sürüye taşır.',
    articles: [
      {
        no: '01',
        title: 'Seçiciliği (browser) rasyona yansıtın',
        text: 'Keçi, çalı, ağaç filizi ve otlak alt florasını seçerek tüketen bir tarayıcıdır. Bu davranış, meradaki keçide bakım ihtiyacına %10–25 aktivite eki eklenmesini gerektirir; modülün idame değerleri ağıl/içerde besleme içindir, otlayan sürüde kaba yem alt sınırını ve enerji hedefini buna göre yükseltin. Ağılda kaliteli kuru ot tabanı, keçide yem israfını da azaltır.',
      },
      {
        no: '02',
        title: 'Bakır: koyun ile sığırın arasında',
        text: 'Keçinin bakır ihtiyacı koyundan belirgin olarak yüksektir; uzun süre koyun premix\'i ile beslenen keçide kıl dökülmesi, anemi ve soluk mukoza tablosuyla bakır eksikliği görülür. Buna karşılık sığır premix\'i de keçi için yüksek kalabilir. İdeal olan keçi için formüle edilmiş premix\'tir; türler bir arada besleniyorsa mineral dağıtımını ayırın, molybden–sülfat düzeyi yüksek sularda bakır hedefini gözden geçirin.',
      },
      {
        no: '03',
        title: 'Süt keçisinde erken laktasyon kritiktir',
        text: 'Süt keçisi, canlı ağırlığına oranınca sığırdan daha yoğun besleme ister: erken laktasyonda canlı ağırlığının %4–5\'i kadar kuru madde tüketebilir. Rasyon yoğunluğunu 1,5–1,7 Mcal NEL/kg bandında tutun; yonca kuru otu kalsiyum ve protein omurgasını kurar. Tepe verimde enerji açığını pamuk tohumu gibi yağlı kaynaklarla (toplam rasyon yağı %5\'i geçmeden) kapatın; ani kesif artışı yerine kademeli yoğunlaştırma meme sağlığını korur.',
      },
      {
        no: '04',
        title: 'Oğlakta geçiş ve idrar taşı disiplini',
        text: 'Oğlakta ani kesif artışı laktik asidoz ve enterotoksemi riskini taşır; tahılı 10–14 günde kademeli yükseltin ve aşı takvimini rasyon geçişiyle eşleştirin. Erkek oğlaklarda — özellikle kastreli hayvanlarda — yüksek kesif rasyonda idrar taşı (ürolitiyazis) başlıca kayıptır: Ca:P oranını ~2:1\'de tutun, amonyum klorür eki düşünün ve temiz suya kesintisiz erişimi asla engellemeyin.',
      },
    ],
  },
  sutEko: {
    title: 'Süt ekonomisi nasıl yönetilir?',
    intro: 'Rasyon matematiği işletmenin yarısıdır; diğer yarısı, üretilen süt ile harcanan paranın kayda geçirilmesidir. Aşağıdaki dört ilke, hesapları sürünün gerçek nakit akışına dönüştürür.',
    articles: [
      {
        no: '01',
        title: 'IOFC\'yi her ay izleyin',
        text: 'IOFC (Income Over Feed Cost) = günlük süt geliri − günlük yem masrafı. Süt fiyatı dalgalanırken yem fiyatı da dalgalanır; IOFC ikisinin arasındaki gerçek nefes payını gösterir. Her ay sonunda inek başına IOFC\'yi hesaplayın; düşüş varsa nedeni fiyat mı, verim mi, yem maliyeti mi — bu üçlü ayrım, hangi vidayı çevireceğinizi söyler.',
      },
      {
        no: '02',
        title: 'Yem maliyeti en büyük kaldıraçtır',
        text: 'Toplam maliyetin %50–60\'ı yemdir; kâr marjı burada kazanılır ya da yakılır. Aynı besin madde hedeflerini karşılayan en düşük maliyetli karışımı Süt İneği modülünde hesaplayıp bu modüle aktarın; ₺/kg süt üzerindeki etkisini anında görün. Gereğinden yüksek ham protein de paradır: fazlası üre ve fatura demektir.',
      },
      {
        no: '03',
        title: 'Başabaş fiyatını izleyin, güvenlik marjı bırakın',
        text: 'Başabaş süt fiyatı, tüm masrafların (buzağı geliri düşülerek) yıllık süt miktarına bölünmesiyle bulunur. Satış fiyatınızla başabaş arasındaki fark — güvenlik marjı — işletmenin dalgalanmalara dayanma gücüdür. Marj %15\'in altına indiğinde fiyat krizlerinde ilk zarar eden siz olursunuz; verimi ya da maliyet yapısını yeniden müzakere edin.',
      },
      {
        no: '04',
        title: 'Görünmeyen maliyetler: sağlık ve döl verimi',
        text: 'Somatik hücre cezası, metritis, mastitis, uzayan açık günler; hiçbiri faturaya yazılmaz ama hepsi yıllık sütten düşer. Sağlık olaylarını ve servis periodunu kaydedin; bu modüldeki “diğer masraf” kalemini işletmenizin gerçek istatistiğiyle besleyin. Kayıt tutmayan işletme, zararını en son öğrenen işletmedir.',
      },
    ],
  },
  besiEko: {
    title: 'Besi ekonomisi nasıl yönetilir?',
    intro: 'Besinde kâr iki fiyat arasında değil, iki fiyat arasındaki sürede kazanılır: aldığınız kilo ile sattığınız kilo arasındaki her gün ya para üretir ya yakar. Dört ilke, makası sürdürülebilir kâra çevirir.',
    articles: [
      {
        no: '01',
        title: 'Makası değil, marjı ölçün',
        text: '“Al 160, sat 190, kg\'da 30 ₺ kâr” cümlesi en klasik yanılgıdır. O 30 ₺\'nin içinden kg artış başına yem, veteriner, altlık, ölüm payı ve komisyon çıkar; kâr, satış fiyatı ile tam kg artış maliyetinin farkıdır. Bu modüldeki başabaş satış fiyatı, makas pozitif görünürken zarar eden işletmelerin hatasını görünür kılar.',
      },
      {
        no: '02',
        title: 'Kg artışın birim maliyetini bilin',
        text: 'Günlük yem maliyetini günlük artışa bölün: 180 ₺/gün ÷ 1,2 kg = 150 ₺/kg artış. Bu sayı, işletmenin kalp atışıdır; satış fiyatından düşüldüğünde geriye makas ve diğer giderler için pay kalır. Yem dönüşümü kötüleştiğinde (asidoz, parazit, hastalık) bu sayı sessizce yükselir — her ay yeniden hesaplayın.',
      },
      {
        no: '03',
        title: 'Hedefe ulaştığında satın',
        text: 'Günlük masraf sabitken her ek gün, artış hızı düştükçe kg başına daha pahalıya mal olur; üstelik aşırı ağır hayvanın kilo fiyatı pazarlıkta geriler. “Biraz daha bekleyeyim, fiyat yükselsin” kararını duyarlılık matrisiyle test edin: bekleyişin maliyeti, beklenen fiyat artışından büyükse hayvan hazır demektir.',
      },
      {
        no: '04',
        title: 'Ölüm payı ve alış disiplini',
        text: '%1\'lik ölüm oranı görünmez görünür ama hayvan alışı + yem toplamının üzerinde kalıcı bir vergidir; aşı takvimi, karantina ve alış muayenesi bu vergiyi düşürür. Alışta ise başabaş alış fiyatını bilin: pazarlıkta “bu hayvana en fazla ne ödeyebilirim?” sorusunun cevabı oradadır — duygusal teklifin üstüne çıkan her lira, besi başlamadan zarara yazılmıştır.',
      },
    ],
  },
  gebTakvim: {
    title: 'Gebelik takvimi sürüye nasıl işler?',
    intro: 'Doğum tarihi bir tahmindir; takvim ise öngörüyü işe dönüştüren kontroldür. Aşağıdaki dört ilke, tek bir tohumlama tarihini sürünün dölverimi planına çevirir.',
    articles: [
      {
        no: '01',
        title: 'Taramayı kaçırmayın — boş gün pahalıdır',
        text: 'Sığırlarda 28–35. gün ultrasonu, boş ineklerin erken yakalanmasını sağlar; her kaçırılan östrus ~21 gün süt ve verim kaybı demektir. Küçükbaşta 45–70. gün ultrasonu yavru sayısını verir: ikizlileri erken ayırmak, steaming-up yönetiminin yarısıdır. Takvimdeki tarama tarihini oda duvarına asın.',
      },
      {
        no: '02',
        title: 'Kuru dönemi ve steaming-up\'i takvime bağlayın',
        text: 'İneklerde doğuma 60 gün kala sütten kesim, 21 gün kala close-up grubuna geçiş; koyun-keçide son 6 hafta yoğun rasyon ve enterotoksemi aşısı. Bu geçişler bir hafta kaydığında doğum felci, gebelik zehirlenmesi ve zayıf buzağı/kolostro istatistiği yükselir. Takvim, kaydırmayı görünür kılar.',
      },
      {
        no: '03',
        title: 'Doğum penceresi ±5 gündür, hazırlığı öne alın',
        text: 'Tahmini doğum tek bir gündür ama doğum beş gün her iki yöne kayabilir. Doğum bölmesi, temiz altlık, kolostrum yedeği ve doğum seti pencere başlamadan hazır olmalı; kısrakta değişkenlik ±10 güne çıkar, gece gözlemi 330. günden itibaren planlanır.',
      },
      {
        no: '04',
        title: 'Takvimi sürü defterine yazın, miras bırakın',
        text: 'Tohumlama, tarama, kuru dönem ve doğum tarihleri kağıtta değil, işletme defterinde ya da bu modülün çıktısı gibi yazılı planda olmalıdır. Personel değiştiğinde takvim devredilmeyen bilgi kaybına dönüşür; yazılı takvim, yeni bakıcının ilk gününden doğru grupta doğru rasyonu uygulamasını sağlar.',
      },
    ],
  },
  kizTakvim: {
    title: 'Kızgınlık takvimi sürüye nasıl işler?',
    intro: 'Kızgınlık, dölveriminin kapısıdır; kaçan her kızgınlık, sürüde 21 gün süt ya da bir sezon kuzulama demektir. Aşağıdaki dört ilke, takvimi yakalama oranına çevirir.',
    articles: [
      {
        no: '01',
        title: 'Gözlem penceresini kurumsallaştırın',
        text: 'İnekte kızgınlık 12–18 saat sürer ve bu sürenin dörtte biri geceye denk gelir; günde tek izleme kızgınlıkların yarısını kaçırır. Günde 2–3 kez, yemleme ve sağım dışı sakin saatlerde, en az 20–30 dakika, sabit yerden ve kayıt yaparak izleyin. Gözlem bir görevdir, boş dakika değil: takvime, vardiyaya ve personel tanımına yazılmalıdır.',
      },
      {
        no: '02',
        title: 'Zamanlamayı kurala bağlayın',
        text: 'İneklerde AM/PM kuralı: sabah görülen kızgınlığa öğleden sonra, öğleden sonra görülene ertesi sabah — yani başlangıçtan ~12 saat sonra tohumlama. Koyun-keçide 12–18 saat; domuzda refleks anında ilk, 12–24 saat sonra ikinci çiftleşme; kısrakta ovulasyon ultrasonla hedeflenir. Erken ya da geç tohumlamada gebelik oranı hızla çöker; kural istisna tanımaz.',
      },
      {
        no: '03',
        title: 'Teşhisi katmanlandırın',
        text: 'Göz tek başına yetmez: kuyruk boyası ve tutkal etiketi gece kızgınlıklarını, aktivite/pedometer sensörleri davranış değişimini, koç-teke kayışı (raddle) teması, domuzda belirti testi ve kısrakta teaser aygır teasingi tanıyı keskinleştirir. Katmanlar birbirini doğrular; ikincil belirtiler yalnızca tek başına kızgınlık kanıtı değildir.',
      },
      {
        no: '04',
        title: 'Kayıt, sürünün aynasıdır',
        text: 'Kızgınlık tarihlerini deftere geçmek, takvimden fazlasıdır: 17–24 gün aralığının dışında döngüler embriyonik kaybı, kisti ya da sessiz kızgınlığı; uzun aralıklar anestrusu rapor eder. Gözlenen kızgınlık oranını (%60–70 hedef) ve servis periodunu ayda bir hesaplayın; çiftleşme gerçekleştiğinde Gebelik Takvimi modülüyle doğum planını takvime bağlayın.',
      },
    ],
  },
  iofc: {
    title: 'IOFC sürüye nasıl işler?',
    intro: 'IOFC, işletmenin günlük nabzıdır: sabit gider gölgesi olmadan, besleme ve pazarlama kararlarının saf etkisini gösterir. Aşağıdaki dört ilke, tek bir sayıyı sürünün yönetim aracına çevirir.',
    articles: [
      {
        no: '01',
        title: 'IOFC\'yi günlük ölçün, aylık okuyun',
        text: 'Günlük IOFC mevsim, ısı stresi ve tekil inek oynamalarıyla dalgalanır; karar, gündeki değil trenddeki hareketten alınır. Bu modülün kayıt defterine her gün (ya da haftada en az üç gün) verim–fiyat–yem üçlüsünü girin; ay sonunda ortalama, en iyi ve en kötü günleri karşılaştırın. “Neyi değiştirdim, IOFC ne dedi?” sorusunun cevabı ancak kayıtta saklıdır.',
      },
      {
        no: '02',
        title: 'Üç vida — hangisi sizin elinizde?',
        text: 'IOFC üç değişkenin toplamıdır: verim, süt fiyatı, yem maliyeti. Yem maliyeti en hızlı kaldıraçtır (rasyon optimizasyonu, israf kontrolü, hammadde değişimi haftalar içinde etki eder); fiyat müzakere ve sözleşme meselesidir; verim ise sağlık, genetik ve geçiş rasyonlarının uzun vadeli işidir. Duyarlılık matrisi, hangi vidanın %10 oynamasının IOFC\'yi en çok hareket ettirdiğini gösterir.',
      },
      {
        no: '03',
        title: 'Yem payı %60\'ı aşarsa alarm',
        text: 'Süt gelirinin yeme giden payı için %45–60 sağlıklı banttır. Payın üzerine çıkmak, IOFC pozitif olsa bile kırılganlıktır: süt fiyatı %10 düşse ne olacağını matriste simüle edin; zarar bölgesine kayıyorsanız rasyon optimizasyonu ve israf kontrolü beklemeyi kaldırmaz. Pay çok düşükse ise verimin gerçekten rasyonla mı, yoksa aşırı kesifle mi satın alındığını kontrol edin.',
      },
      {
        no: '04',
        title: 'Başabaş üçgenini müzakere masasına götürün',
        text: 'Başabaş yem maliyeti, yem pazarlığında ödeyebileceğiniz tavandır; başabaş süt fiyatı, süt sözleşmesinde imzalayabileceğiniz tabandır; başabaş verim, sürü yönetiminin asgari hedefidir. Bu üç sayı IOFC=0 noktasından türetilir ve raporda hazır verilir: müzakerelerde rakamla konuşun, hisle değil.',
      },
    ],
  },
  damizlik: {
    title: 'Damızlık seçimi nasıl yapılır?',
    intro: 'Damızlık seçimi, sürünün geleceğini bugünden satın alma kararıdır. Skor, gözü kayda ve muayeneye bağlayan bir disiplindir. Aşağıdaki dört ilke, skoru sağlıklı seçime çevirir.',
    articles: [
      {
        no: '01',
        title: 'Skoru kayıtla doğrulayın',
        text: 'Gözle verilen puan, kayıtsız kalırsa duygusal seçimdir. Dölverimi kaydı, laktasyon sayısı, aşılama takvimi, aile performansı; bunlar olmadan “güzel duran” hayvan, sürünün geleceğini tahmin edemez. Kayıtsız hayvanı damızlığa almayın; skor formunu doldurmadan önce defteri isteyin.',
      },
      {
        no: '02',
        title: 'Kırmızı bayrak müzakere konusu değildir',
        text: 'Tekrarlayan mastitis, kronik topallık, konjenital kusur, test gerektiren bulaşıcı hastalık şüphesi; bunlar puanla telafi edilemez kategorilerdir. Bileşik skor ne kadar yüksek olursa olsun bayraklı hayvan ayrıştırılır: bayrak, dereceyi değil türü ölçer. Pazarlıkta “skoru yüksek, bayrağı affedelim” cümlesi sürüye kalıcı hastalık satın almaktır.',
      },
      {
        no: '03',
        title: 'Sınıfı sürü hedefiyle okuyun',
        text: 'A–D sınıflandırması sürü hedefinden bağımsız değildir: süt sürüsünde meme ve dölverimi ağırlığı büyüktür, besi sürüsünde yapı ve pelvik alan, küçükbaşta doğurganlık ve sağlık öne geçer. İşletmenizin zayıf tarafı dölverimiyse B sınıflı ama dölverimi güçlü hayvan, A sınıflı ama dölverimi zayıf hayvandan değerlidir. Skoru, hedefe göre yorumlayın.',
      },
      {
        no: '04',
        title: 'Skor bir fiyat dayanağıdır',
        text: 'A sınıfı damızlık pazarlıkta prim ister; bu prim, yazılı bir skor raporuyla savunulabilir. Satıcıysanız raporu gösterin; alıcıysanız zayıf kriterleri pazarlık masasına rakamla taşıyın. “Şartlı seçilir (B)” sınıfı hayvanlar, fiyatı düşürerek ya da geliştirme taahhüdüyle değerlenebilir; skor, iki tarafın da ortak dilidir.',
      },
    ],
  },
};

export const FAQS: Record<ModuleKey, FaqItem[]> = {
  besi: [
    {
      q: 'Hesaplamalar hangi standarta göre yapılıyor?',
      a: 'Bakım ve büyüme enerjisi ihtiyaçları NRC (2016) formüllerinden (NEm = 0,0774 × KA⁰·⁷⁵; NEg = 0,0635 × KA⁰·⁷⁵ × ACAB¹·⁰⁹⁷) türetilmiştir. Kuru madde tüketimi ve mineral ihtiyaçları için saha pratiğiyle uyumlu yaklaşık bağıntılar kullanılır. Klinik kararlar için değerleri veteriner hekiminizle birlikte değerlendirin.',
    },
    {
      q: 'Yem fiyatlarını nasıl güncellerim?',
      a: '02 numaralı adımdaki tabloda fiyat sütununu doğrudan düzenleyin; bir sonraki hesaplamada yeni fiyatlar geçerli olur. Fiyatlar canlı (as-fed) yem, ₺/kg bazındadır; program bunları otomatik olarak kuru madde maliyetine çevirir.',
    },
    {
      q: 'Rasyon çıktısını müşterime nasıl sunarım?',
      a: 'Sonuç bölümündeki “Yazdır / PDF” düğmesi rasyon çıktısını temiz bir sayfa olarak yazdırır; tarayıcınızın yazdırma penceresinden “PDF olarak kaydet” seçeneğiyle dosyalayabilirsiniz.',
    },
    {
      q: 'En düşük maliyet rasyonu her zaman en iyi rasyon mudur?',
      a: 'Hayır. Optimizasyon, girdiğiniz kısıtlar içinde en ucuz karışımı bulur; palatabilite, nişasta düzeyi, yem hijyeni ve işletmenizin yerel deneyimi mutlaka dikkate alınmalıdır. Kısıt sütunlarındaki minimum–maksimum oranlar bu esnekliği vermenize olanak tanır.',
    },
  ],
  sut: [
    {
      q: 'Süt ineği hesaplamaları hangi standarta göre yapılıyor?',
      a: 'NRC (2001) türevi bağıntılar kullanılır: 4% FCM = süt × (0,4 + 0,15 × yağ%); NEL ihtiyacı = 0,08 × KA⁰·⁷⁵ + FCM × 0,749; KM tüketimi = (0,372 × FCM + 0,0968 × KA⁰·⁷⁵) × laktasyon günü düzeltmesi. Ham protein, Ca ve P saha pratiğiyle uyumlu yaklaşık değerlerdir.',
    },
    {
      q: 'NDF kısıtı ne işe yarar?',
      a: 'Toplam rasyon NDF\'i rumen dolgunluğunun ve tükürük ile tamponlamanın güvencesidir; %28–32 KM bandı tipiktir. Süt yağı düşüyor ya da yem tüketimi dalgalıysa önce NDF ve kaba yem oranına bakın. “Uygun çözüm bulunamadı” uyarısı alırsanız NDF alt sınırını ya da kaba yemlerin maksimum oranlarını gözden geçirin.',
    },
    {
      q: 'Tepe verim döneminde ihtiyaç neden zor karşılanıyor?',
      a: 'Erken laktasyonda KM tüketimi geriden geldiği için gereken rasyon yoğunluğu çok yükselir. Çözümü iyileştirmek için mısır, arpa ve karma yem maksimumlarını artırın, pamuk tohumu gibi yağlı kaynakları seçime ekleyin ve kaba yem kalitesini yükseltin.',
    },
    {
      q: 'Fiyat güncellemesi tüm modülleri etkiler mi?',
      a: 'Evet, hammadde tablosu dört rasyon modülünün de ortaktır: bir modülde güncellediğiniz fiyat, diğer modüllerin sonraki hesaplarında da geçerlidir. Enerji birimleri modüle göre değişir (besi: NEm/NEg; süt ineği ile anaç koyun/keçi: NEL).',
    },
  ],
  koyun: [
    {
      q: 'Koyun ihtiyaçları hangi standarta göre hesaplanıyor?',
      a: 'NRC (2007) küçükbaş formüllerinin yaklaşık hâlleri kullanılır: bakım NEm = 0,0635 × KA⁰·⁷⁵; besi kuzusunda NEg = 0,138 × KA⁰·⁷⁵ × ACAB¹·⁰⁹⁷; anaç koyunda NEL = 0,096 × KA⁰·⁷⁵ + dönem ekleri (gebelik: tek yavru +0,45, ikiz +0,85 Mcal/gün; laktasyon: kg süt başına 1,1 Mcal).',
    },
    {
      q: 'Emziren anaca süt verimi olarak ne girmeliyim?',
      a: 'Anaç kuzularını emziriyorsa tek kuzu ≈ 1,5–2 kg/gün, ikiz kuzu ≈ 2,5–3,5 kg/gün süt üretimi kabul edebilirsiniz. Sağım yapan sürülerde günlük sağılan gerçek süt miktarını girin.',
    },
    {
      q: 'Kaba yem alt sınırı profillere göre neden değişiyor?',
      a: 'Besi kuzusunda kesif besi hedeflendiğinden %10 yeterlidir (alıştırmaya dikkat). İdamede rumen dolgunluğu için %50 önerilir. Gebelikte rumen hacmi yavruyla sıkıştığından anaç zaten az yer; enerji yoğunluğunu korumak için %30\'a inilir. Laktasyonda %35 tavsiye edilir.',
    },
    {
      q: 'Elimdeki sığır premix\'ini koyuna verebilir miyim?',
      a: 'Hayır. Koyun bakırı sığırdan çok daha duyarlı tolere eder; sığır premix\'leri tipik olarak koyun için toksik düzeyde bakır içerir. Küçükbaş için etiketlenmiş premix kullanın ve işletmede türler bir aradaysa mineral karışımlarını kesinlikle ayırın.',
    },
  ],
  keci: [
    {
      q: 'Keçi ihtiyaçları hangi standarta göre hesaplanıyor?',
      a: 'NRC (2007) keçi formüllerinin yaklaşık hâlleri kullanılır: anaç keçide bakım NEL = 0,075 × KA⁰·⁷⁵; besi oğlağında NEm = 0,068 × KA⁰·⁷⁵ ve NEg = 0,142 × KA⁰·⁷⁵ × ACAB¹·⁰⁹⁷; gebelik enerji eki tek yavru +0,4, ikiz +0,8, üçüz +1,1 Mcal NEL/gün; laktasyonda kg süt başına 0,72 Mcal NEL.',
    },
    {
      q: 'Süt keçisine günlük süt verimi olarak ne girmeliyim?',
      a: 'Saanen ve Alpin gibi süt ırklarında tepe verim 4–6 kg/gün, orta dönemde 2,5–4 kg/gün tipiktir; yerli ırk ve Kıl keçisinde 0,5–1,5 kg/gün aralığı gerçekçidir. Kuzusunu emziren anaç için kuzu sayısına göre 1–2,5 kg/gün girebilirsiniz.',
    },
    {
      q: 'Üçüz gebelik seçeneği neden var ve ne zaman kullanmalıyım?',
      a: 'Keçilerde üçüz gebelik koyuna göre daha sıktır ve enerji eki belirgin şekilde büyüktür (+1,1 Mcal NEL/gün). Ultrasonla yavru sayısı biliniyorsa doğru seçeneği işaretleyin. Çoğul gebelikte iştah azalması + enerji açığı gebelik zehirlenmesinin zemini olduğundan, son 6 haftada yoğun rasyona geçmek hayati önemdedir.',
    },
    {
      q: 'Koyun premix\'ini keçiye verebilir miyim?',
      a: 'Kısa vadede sorun çıkmaz; ama keçi bakırı koyundan daha fazla gerektirdiği için uzun sürede koyun premix\'i ile bakır eksikliği (kıl dökülmesi, anemi) gelişebilir. En doğru tercih keçiye özel formülasyondur.',
    },
  ],
  sutEko: [
    {
      q: 'IOFC tam olarak nedir?',
      a: 'Income Over Feed Cost: günlük süt geliri eksi günlük yem masrafı. Sabit giderleri içermediği için besleme ve pazarlama kararlarının etkisini sahte etkilerden arındırılmış biçimde gösterir.',
    },
    {
      q: 'Yem maliyetini nereden almalıyım?',
      a: 'İki yolu var: (1) Süt İneği modülünde optimum rasyon hesaplayıp “Son rasyondan aktar” düğmesiyle bu tabloya taşımak; (2) işletme faturalarından aylık yem giderini gün sayısına ve inek sayısına bölerek gerçek ortalamayı girmek.',
    },
    {
      q: 'Sabit giderlere neler girer?',
      a: 'Ahır ve ekipman amortizasyonu, bakım-onarım, sigorta, kira/faiz ve idari giderler gibi verimle doğrudan orantılı olmayan kalemler.',
    },
    {
      q: 'Duyarlılık tablosunu nasıl okumalıyım?',
      a: 'Satırlar süt veriminin, sütunlar süt fiyatının ±%20 bantlarını gösterir; her hücre o senaryodaki yıllık inek başına net kârı verir. Kızıl hücreler zarar bölgesidir.',
    },
  ],
  besiEko: [
    {
      q: 'Başabaş alış fiyatı ne anlama gelir?',
      a: '“Bu hayvana en fazla ne ödeyebilirim?” sorusunun matematiğidir: güncel satış fiyatı, yem ve diğer masraflar sabitken, besi sonunda kârın sıfırlandığı alış fiyatıdır.',
    },
    {
      q: 'Ölüm payı nasıl hesaplanıyor?',
      a: 'Hayvan alışı ile toplam yem masrafının toplamına, girdiğiniz ölüm oranı uygulanarak beklenen değer payı eklenir.',
    },
    {
      q: 'Yem maliyetini nereden almalıyım?',
      a: 'En doğru yol: Besi Sığırı modülünde canlı ağırlığa ve hedef ACAB\'a uygun optimum rasyonu hesaplayıp “Son rasyondan aktar” ile günlük yem maliyetini bu tabloya taşımaktır.',
    },
    {
      q: 'Alış–satış makası pozitifken kâr neden negatif olabilir?',
      a: 'Çünkü makas yalnızca fiyat farkıdır; kg artış başına yem, veteriner, altlık, ölüm payı ve komisyon bu farkın içinden ödenir. Kg artış maliyetiniz makası aşıyorsa her gün zarar büyür.',
    },
  ],
  gebTakvim: [
    {
      q: 'Gebelik süreleri neye göre belirlendi?',
      a: 'Tür ortalamaları literatürün yaygın kabul edilen değerleridir: inek ırka göre 279 (Holstein) – 288 (Esmer) gün, koyun ~147, keçi ~150, kısrak ~340, domuz ~114 gün. Tekil hayvanlarda ±5 gün (kısrakta ±10 gün) doğal sapma normaldir.',
    },
    {
      q: 'Tahmini doğum neden bir gün değil, pencere olarak veriliyor?',
      a: 'Gebelik süresi cinsiyet, yavru sayısı, mevsim ve anaç faktörleriyle oynar; sığırda ±5 gün sapma olağandır. Bu yüzden takvim doğumun etrafında bir hazırlık penceresi tanımlar.',
    },
    {
      q: 'Tohumlama tarihi tam bilinmiyorsa ne yapmalıyım?',
      a: 'Koç/teke katımı bir dönem halinde yapıldıysa dönemin orta gününü tarih olarak girin. Daha kesin plan için veteriner gebelik ultrasonuyla gebelik yaşı tahmini almak uygundur.',
    },
    {
      q: 'Takvimi işletmede nasıl kullanır ve paylaşırım?',
      a: 'Raporu “Yazdır / PDF” ile çıkıp doğum bölmesi kapısına ve sürü defterine asabilirsiniz; kilometre taşı tarihlerini telefon takviminize kaydedebilirsiniz.',
    },
  ],
  kizTakvim: [
    {
      q: 'Döngü uzunlukları nereden geliyor ve neden oynuyor?',
      a: 'Tür ortalamaları: inek 21 (17–24), koyun 17 (14–19), keçi 21 (18–22), kısrak 21 (19–22), domuz 21 (18–24) gün. Yaş, beslenme düzeyi, mevsim ve ırk bu süreyi etkiler.',
    },
    {
      q: 'Son kızgınlık tarihi tam bilinmiyorsa ne yapmalıyım?',
      a: 'Kızgınlığı ilk fark ettiğiniz günü girin; gözlem günü ile başlangıç arasında en fazla 12 saat oynama vardır ve takvim buna toleranslıdır.',
    },
    {
      q: 'Takvime göre kızgınlık bekledim ama görülmedi — neden?',
      a: 'İlk şüphe daima gebelik olmalıdır; gebelik dışı başlıca nedenler sessiz kızgınlık, beslenme kaynaklı anestrus, ovarian kistler ve mevsimsel anestrustur.',
    },
    {
      q: 'Suni tohumlama saatini tam olarak nasıl belirlerim?',
      a: 'Kural tür bazındadır: inekte başlangıçtan ~12 saat sonra (AM/PM), koyun-keçide 12–18 saat, domuzda refleks anında + 12–24 saat sonra ikinci çiftleşme, kısrakta ovulasyon günü.',
    },
  ],
  iofc: [
    {
      q: 'IOFC nedir ve neden ayrı bir gösterge olarak izlenir?',
      a: 'IOFC (Income Over Feed Cost) = günlük süt geliri − günlük yem maliyeti. Sabit giderleri bilinçli olarak dışarıda bırakır; böylece rasyon değişikliği veya fiyat pazarlığının saf etkisi net biçimde görünür.',
    },
    {
      q: 'IOFC ne kadar olmalı?',
      a: 'IOFC, işçilik + sabit giderler + kârın toplamını karşılayacak kadar büyük olmalıdır. Pratik kural: yem maliyeti süt gelirinin %45–60 aralığını aşmamalıdır.',
    },
    {
      q: 'Başabaş yem maliyeti pratikte ne işe yarar?',
      a: 'Yem pazarlığında tavanı gösterir: şu anki verim ve fiyatla bir ineğin günlük yemine ödeyebileceğiniz üst sınırdır.',
    },
    {
      q: 'Süt Ekonomisi modülüyle farkı ne, hangisini ne zaman kullanmalıyım?',
      a: 'IOFC günlük operasyonel nabzı ölçer: sabah sağımında bile anında hesaplanır. Süt Ekonomisi modülü ise yıllık tam kârı (kuru dönem, buzağı geliri, işçilik, amortizasyon dahil) hesaplar.',
    },
  ],
  damizlik: [
    {
      q: 'Puanlar ve ağırlıklar nereden geliyor?',
      a: 'Her kriter 1–5 aralığında puanlanır ve (puan − 1) ÷ 4 formülüyle yüzdeye çevrilir; tür ağırlıkları damızlık seçiminin belirleyici bulduğu bileşenleri öne alır (süt ineğinde meme %20, dölverimi %15 gibi).',
    },
    {
      q: 'Kırmızı bayrak neden skoru ezerek D sınıfına düşürür?',
      a: 'Çünkü bayrak, dereceyi değil türü ölçer: konjenital kusur, tekrarlayan mastitis veya bulaşıcı hastalık şüphesi kalıtsal ya da bulaşıcı olarak sürüye geçer. Puanla telafi edilemez.',
    },
    {
      q: 'Skoru hangi sıklıkla yenilemeliyim?',
      a: 'Alış/satış öncesi her aday için, katım öncesi kondisyon takibinde ve yıllık sürü taramasında yenilemek önerilir.',
    },
    {
      q: 'Bu raporu satın almada nasıl kullanırım?',
      a: 'Rapor pazarlığın ortak dilidir: A sınıfı hayvanın primini yazılı skorla savunabilir, zayıf kriterleri ise fiyat indiriminde gerekçe olarak masaya koyabilirsiniz.',
    },
  ],
};
