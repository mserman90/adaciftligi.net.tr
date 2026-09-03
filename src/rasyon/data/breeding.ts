import { DamTur, DamKriter } from '../types';

export const DAM_BAYRAK = [
  { ad: 'Tekrarlayan mastitis / meme başı hasarı', aciklama: 'Kronik mastitis verimi kalıcı düşürür ve sürüde enfeksiyon kaynağıdır; hasarlı meme başı sağım sistemine uyum sağlamaz.' },
  { ad: 'Kronik topallık veya tırnak deformitesi', aciklama: 'Topallık besleme, dölverimi ve servis performansını düşürür; tekrarlayan vakalar genetik yatkınlık göstergesidir.' },
  { ad: 'Doğuştan kusur (kısmad yürüyüş, çene, omurga)', aciklama: 'Konjenital anomali kalıtsal olabilir; damızlıkta kullanımı kusuru gelecek nesillere yayar.' },
  { ad: 'Tekrarlayan dölverimi başarısızlığı (3+ başarısız)', aciklama: 'Besleme ve yönetim sorunları dışlandıktan sonra kalan tekrarlayan infertilite, damızlıkta elenecek yapısal/kalıtsal risktir.' },
  { ad: 'Bulaşıcı hastalık şüphesi (bruselloz, CAE, OPP, johnes)', aciklama: 'Test sonuçlanmadan damızlık kullanımı sürünün tamamını riske atar; öncelik test ve karantinadır, skor değil.' },
  { ad: 'Devir/ürün sınırı aşılmış ileri yaş', aciklama: 'Yaş, doğurganlık ve verim eğrisini düşürür; damızlık değeri yeniden üretim potansiyeliyle sınırlıdır.' },
];

export const DAM_TUR: Record<DamTur, { ad: string; kriterler: DamKriter[] }> = {
  inek: {
    ad: 'Süt İneği',
    kriterler: [
      { id: 'bcs', ad: 'Vücut kondisyonu (BCS)', ag: 15, ipucu: 'İdeal 2,5–3,5 / 5. 3,75 üzeri gebelik zehirlenmesi ve doğum felci, 2 altı sessiz kızgınlık riski taşır.', gel: 'BCS’i rasyon enerji yoğunluğuyla kademeli banda getirin; close-up rasyonunu gözden geçirin.' },
      { id: 'meme', ad: 'Meme yapısı', ag: 20, ipucu: 'Kuvvetli orta bağ, dengeli ve diş meme uçları, yüksek arka meme; gevşek yapı erken sarkar ve mastitise davet çıkarır.', gel: 'Sağım hijyeni ve dip-dalamayı denetleyin; seleksiyonda meme bileşenlerini öne alın.' },
      { id: 'bacak', ad: 'Bacak–tırnak', ag: 15, ipucu: 'Düz arka bacaklar, sağlam tırnak ve eklem; topallık besleme ve dölverimini bozar.', gel: 'Tırnak kesim programını kurun; yatış zemini ve altlık kalitesini iyileştirin.' },
      { id: 'yapi', ad: 'Yapısal doğruluk', ag: 12, ipucu: 'Geniş ve eğimli leğen, sağlam sırt çizgisi, derin gövde; doğum kolaylığının yapısal göstergesidir.', gel: 'Pelvik ölçümü kayda alın; yapısal eksikleri kalıtsal olarak sürüden süzün.' },
      { id: 'gelisim', ad: 'Büyüme ve gelişim', ag: 10, ipucu: 'Yaşa uygun canlı ağırlık; düvede ilk tohumlama için yetişkin ağırlığının %55–60’ına ulaşmış olmak hedefdir.', gel: 'Düve besleme programını yaşa göre hedef ağırlık eğrisine bağlayın.' },
      { id: 'dol', ad: 'Dölverimi kaydı', ag: 15, ipucu: 'Buzağılama aralığı 12–13 ay; tohumlamada gebelik 1–2. Uzayan açık günler sessiz kayıptır.', gel: 'Kızgınlık gözlemi ve tohumlama zamanlamasını kurumsallaştırın; mineral dengesini kontrol edin.' },
      { id: 'saglik', ad: 'Sağlık geçmişi', ag: 13, ipucu: 'Tekrarlayan mastitis/topallık yok; aşı ve parazit takvimi tam, test kayıtları güncel.', gel: 'Sağlık kayıtlarını sürü defterine bağlayın; sorunlu vakaları ayırt edici olarak işaretleyin.' },
    ],
  },
  besi: {
    ad: 'Besi Sığırı',
    kriterler: [
      { id: 'bcs', ad: 'Vücut kondisyonu (BCS)', ag: 15, ipucu: 'Damızlıkta 2,5–3,5 / 5 ideal; aşırı şişman erkekte libido ve ayak sağlığı, dişide dölverimi bozulur.', gel: 'Damızlık rasyonunu besi rasyonundan ayırın; kondisyonu mevsimsel hedefe bağlayın.' },
      { id: 'yapi', ad: 'Yapısal doğruluk (iskelet)', ag: 18, ipucu: 'Derin gövde, geniş ve düz sırt, güçlü kemik yapısı; büyüme potansiyelinin yapısal göstergesidir.', gel: 'Yaş ve ırk standartlarına göre yapısal eksikleri not edin; kalıtsal zayıflıkları sürüden süzün.' },
      { id: 'bacak', ad: 'Bacak–tırnak', ag: 15, ipucu: 'Damızlık boğada kritik: servis süresini ve aşım başarısını doğrudan belirler; topal boğa sürüyü dölsüz bırakır.', gel: 'Alımdan önce yürüyüş değerlendirmesi yapın; tırnak bakımını rutine bağlayın.' },
      { id: 'pelvis', ad: 'Pelvik alan / doğum kolaylığı', ag: 14, ipucu: 'Geniş leğen ve pelvik alan dystocia riskini düşürür; düve doğumlarında özellikle belirleyicidir.', gel: 'Pelvimetriyi kayda alın; doğum zorluğu geçiren dişileri kayıtlı işaretleyin.' },
      { id: 'buyume', ad: 'Büyüme ve kalıtım', ag: 15, ipucu: 'Irka uygun ACAB; ana/baba ve kardeşlerin performans kaydı kalıtsal kapasitenin en iyi tahminidir.', gel: 'Kayıt defterinden aile performansını doğrulayın; kayıtsız hayvanı damızlığa almayın.' },
      { id: 'cinsel', ad: 'Cinsel gelişim ve dölverimi', ag: 13, ipucu: 'Erkekte libido, seyirci ve aşım davranışı; dişide ilk östrus yaşı ve düzenli döngü.', gel: 'Servis öncesi libidoyu test edin; dişide ilk östrus kaydını deftere geçin.' },
      { id: 'saglik', ad: 'Sağlık geçmişi', ag: 10, ipucu: 'Aşı takvimi tam, tekrarlayan hastalık öyküsü yok; karantina ve alış muayenesi yapılmış.', gel: 'Alım sonrası 21–30 gün karantina uygulayın; aşı ve test kayıtlarını doğrulayın.' },
    ],
  },
  koyun: {
    ad: 'Koyun',
    kriterler: [
      { id: 'bcs', ad: 'Vücut kondisyonu (BCS)', ag: 18, ipucu: 'Koç katımına girerken 3–3,5 / 5 hedef; 2 altı sessiz kızgınlık ve düşük doğurganlık riski.', gel: 'Katım öncesi 6 haftada “flushing” ile kondisyonu banda getirin.' },
      { id: 'yapi', ad: 'Yapısal doğruluk', ag: 12, ipucu: 'Derin gövde, geniş leğen, düz ve güçlü bacaklar; kuzulama kolaylığının yapısal göstergesi.', gel: 'Leğen darlığı olan dişileri kayıtlı ayırın; yapıyı seleksiyon kriterine bağlayın.' },
      { id: 'bacak', ad: 'Bacak–tırnak', ag: 10, ipucu: 'Ayak çürüğü ve tırnak sorunları sürüde hızla yayılır; düzenli tırnak bakımı şarttır.', gel: 'Ayak çürüğü aşısı ve ayak banyosu programını takvime bağlayın.' },
      { id: 'meme', ad: 'Meme yapısı', ag: 14, ipucu: 'İki simetrik ve fonksiyonel meme başı; tek memede kuzulama kaybı belirgin artar.', gel: 'Meme muayenesini her doğum öncesi rutine ekleyin; sorunlu memeleri ayıklayın.' },
      { id: 'dol', ad: 'Dölverimi (doğurganlık)', ag: 20, ipucu: 'Yıllık kuzulama ve yavru sayısı; ikizlik oranı sürü veriminin en büyük kaldıracıdır.', gel: 'Doğurganlık kaydını yıllık tutun; sürekli tek kuzulayan dişileri ayırın.' },
      { id: 'yun', ad: 'Yün / kıl kalitesi', ag: 8, ipucu: 'Yün ırklarında dışlama ve incelik, kıl ırklarında dayanıklılık; ırk standardına uygunluk.', gel: 'Yün örneğini yıllık değerlendirin; ırk standardı dışını kayıtlı işaretleyin.' },
      { id: 'saglik', ad: 'Sağlık geçmişi', ag: 18, ipucu: 'Enterotoksemi/mastitis öyküsü yok; parazit yönetimi, bakır toleransı ve aşı takvimi tam.', gel: 'Parazit yükünü FAMACHA ile izleyin; aşı takvimini kuzulama planına bağlayın.' },
    ],
  },
  keci: {
    ad: 'Keçi',
    kriterler: [
      { id: 'bcs', ad: 'Vücut kondisyonu (BCS)', ag: 18, ipucu: 'Katımda 2,5–3,5 / 5; süt keçisinde laktasyon sonunda 2 üzeri hedef.', gel: 'Laktasyon sonu BCS’i rasyonla banda getirin; mevsimsel flushing uygulayın.' },
      { id: 'yapi', ad: 'Yapısal doğruluk', ag: 12, ipucu: 'Derin gövde, düz sırt, geniş leğen; oğlaklama kolaylığı ve süt kapasitesinin çerçevesidir.', gel: 'Yapısal zayıflıkları seleksiyon defterine işleyin; teke seçiminde yapıya ağırlık verin.' },
      { id: 'bacak', ad: 'Bacak–tırnak', ag: 10, ipucu: 'Keçide tırnak büyümesi hızlıdır; düzenli kesim yapılmayan sürüde topallık toplu görülür.', gel: 'Tırnak kesimini 6–8 haftalık rutine bağlayın; zemin drenajını düzeltin.' },
      { id: 'meme', ad: 'Meme yapısı', ag: 18, ipucu: 'Kuvvetli orta bağ, simetrik ve teat boyu sağım sistemine uygun meme; süt keçisinin ana sermayesidir.', gel: 'Sağım sonrası dip-dalama ve meme hijyenini rutine bağlayın; tek memeli dişileri ayıklayın.' },
      { id: 'dol', ad: 'Dölverimi', ag: 20, ipucu: 'Yıllık oğlaklama ve çoğul gebelik oranı; üçüz kapasitesi sürü verimini belirler.', gel: 'Oğlaklama kaydını yıllık tutun; sürekli tek oğlaklayan dişileri kayıtlı ayırın.' },
      { id: 'verim', ad: 'Verim kalitesi (süt/yapağı)', ag: 10, ipucu: 'Süt keçisinde 305 günlük laktasyon kaydı; ırk ortalamasının altında kalıcı düşüş ayırt edici işarettir.', gel: 'Laktasyon kaydını tutun; verim düşüşünde önce meme sağlığını kontrol edin.' },
      { id: 'saglik', ad: 'Sağlık geçmişi', ag: 12, ipucu: 'CAE/bruselloz test durumu güncel; keçi öksürüğü (parazit) ve mastitis öyküsü yok.', gel: 'Yıllık CAE/bruselloz testini takvime bağlayın; yeni hayvanı karantinada test edin.' },
    ],
  },
};

export const DAM_NOT: Record<DamTur, string> = {
  inek: 'Ağırlıklar süt damızlığında üreme ve meme bileşenlerini öne alır (meme %20, dölverimi %15). Skor, kayıt defteri ve veteriner muayenesinin yerine geçmez; üçünü birlikte kullanın.',
  besi: 'Ağırlıklar besi damızlığında iskelet ve servis performansına yüklenir (yapı %18, bacak–tırnak %15). Boğa seçiminde yürüyüş değerlendirmesini asla atlamayın.',
  koyun: 'Ağırlıklar doğurganlığı ve sağlık geçmişini öne alır (dölverimi %20, sağlık %18). Küçükbaşta bakır toleransı ve ayak sağlığı ayırt edicidir.',
  keci: 'Ağırlıklar süt kapasitesi ve doğurganlığı öne alır (dölverimi %20, meme %18). Yerli ırklarda mevsimsellik, skor zamanlamasını katım öncesine bağlar.',
};
