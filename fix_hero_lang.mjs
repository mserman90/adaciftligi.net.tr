import fs from 'fs';
let file = fs.readFileSync('src/rasyon/components/Hero.tsx', 'utf8');

file = file.replace(/import \{ ModuleKey \} from '\.\.\/types';/, "import { ModuleKey, Language } from '../types';");
file = file.replace(/interface HeroProps \{/, "interface HeroProps {\n  lang: Language;");
file = file.replace(/export const Hero: React\.FC<HeroProps> = \(\{/, "export const Hero: React.FC<HeroProps> = ({\n  lang,");

// Add some English overrides for the Hero component
const overrides = `
  const config = MODULES[currentModule];
  
  const translations = {
    tr: {
      home: 'Anasayfa',
      rasyon: 'Rasyon & Çiftlik Modülleri',
      ciftlik_mod: 'Çiftlik Modülü',
      rasyon_mod: 'Rasyon Modülü',
      btn_besi: 'Besi Sığırı',
      btn_sut: 'Süt İneği',
      btn_koyun: 'Koyun & Kuzu',
      btn_keci: 'Keçi & Oğlak',
      btn_sutEko: 'Süt Kârlılığı',
      btn_besiEko: 'Besi Kârlılığı',
      btn_geb: 'Gebelik Takvimi',
      btn_kiz: 'Kızgınlık Takvimi',
      btn_iofc: 'SYGM (IOFC)',
      btn_damizlik: 'Damızlık Skor',
      modules: {
        sut: { ad: 'Dairy Cow', baslik: 'Dairy Cow Ration', aciklama: 'Calculates nutrient requirements based on body weight, daily milk yield, and milk fat percentage. Formulates the <strong>lowest cost ration</strong> based on 4% FCM.', meta: ['4% FCM-based energy balance', 'NDF and forage constraints', 'Ca:P macro mineral balance'] },
        besi: { ad: 'Beef Cattle', baslik: 'Beef Cattle Ration', aciklama: 'Calculates nutrient requirements based on body weight and target daily gain. Formulates the <strong>lowest cost ration</strong> using your selected ingredients.', meta: ['NRC (2000) growth models', 'NEm and NEg energy balance', 'Rumen degradable protein limits'] },
        koyun: { ad: 'Sheep & Lamb', baslik: 'Sheep & Lamb Ration', aciklama: 'Calculates nutrient requirements for maintenance, gestation, lactation, or lamb fattening. Formulates the optimal ration.', meta: ['Gestation and lactation periods', 'Urinary calculi risk prevention', 'Lamb fattening energy limits'] },
        keci: { ad: 'Goat & Kid', baslik: 'Goat & Kid Ration', aciklama: 'Calculates nutrient requirements for maintenance, gestation, lactation, or kid fattening.', meta: ['Saanen lactation curve', 'Dry matter intake regulation', 'Maintenance energy balance'] },
        sutEko: { ad: 'Dairy Profitability', baslik: 'Dairy Profitability', aciklama: 'Calculates annual profit per cow, breakeven milk price and yield, and visualizes risk with a <strong>price × yield sensitivity matrix</strong>.', meta: ['Breakeven analysis', 'Fixed and variable costs', 'Price sensitivity matrix'] },
        besiEko: { ad: 'Beef Profitability', baslik: 'Beef Profitability', aciklama: 'Calculates profit per head based on purchase, feed, and fixed costs. Displays <strong>breakeven selling price</strong> and margin.', meta: ['Live weight gain cost', 'Breakeven selling price', 'Operating cost distribution'] },
        gebTakvim: { ad: 'Gestation Calendar', baslik: 'Gestation Calendar', aciklama: 'Calculates key dates for dry-off, close-up, and calving based on insemination date.', meta: ['Dry-off alarm', 'Close-up (negative DCAD) diet switch', 'Calving window'] },
        kizTakvim: { ad: 'Estrus Calendar', baslik: 'Estrus Calendar', aciklama: 'Calculates the next expected estrus cycle and return-to-heat dates.', meta: ['21-day cycle tracking', 'Return-to-heat alerts', 'Breeding window'] },
        iofc: { ad: 'IOFC', baslik: 'IOFC — Income Over Feed Cost', aciklama: 'Calculates daily milk income minus feed cost. Provides instant visibility into your <strong>IOFC, breakeven triangle, and sensitivity matrix</strong>.', meta: ['Daily IOFC tracker', 'Breakeven milk price', 'Feed cost per kg milk'] },
        damizlik: { ad: 'Breeding Score', baslik: 'Breeding Score', aciklama: 'Evaluates breeding potential and anatomical health of animals using Body Condition Score (BCS) and other metrics.', meta: ['Body Condition Score (BCS)', 'Anatomical tracking', 'Breeding evaluation'] }
      }
    }
  };

  const t = lang === 'en' ? translations.tr : null;
  const dispAd = lang === 'en' ? t.modules[currentModule].ad : config.ad;
  const dispBaslik = lang === 'en' ? t.modules[currentModule].baslik : config.baslik;
  const dispAciklama = lang === 'en' ? t.modules[currentModule].aciklama : config.aciklama;
  const dispMeta = lang === 'en' ? t.modules[currentModule].meta : config.meta;
`;

file = file.replace(/const config = MODULES\[currentModule\];/, overrides);
file = file.replace(/\{config\.ad\}/, "{dispAd}");
file = file.replace(/\{config\.tur === 'ciftlik' \? 'Çiftlik Modülü' : 'Rasyon Modülü'\}/, "{lang === 'en' ? (config.tur === 'ciftlik' ? t.ciftlik_mod : t.rasyon_mod) : (config.tur === 'ciftlik' ? 'Çiftlik Modülü' : 'Rasyon Modülü')}");
file = file.replace(/\{config\.baslik\}/, "{dispBaslik}");
file = file.replace(/config\.aciklama/, "dispAciklama");
file = file.replace(/config\.meta\.map/, "dispMeta.map");
file = file.replace(/Anasayfa/, "{lang === 'en' ? t.home : 'Anasayfa'}");
file = file.replace(/Rasyon &amp; Çiftlik Modülleri/, "{lang === 'en' ? t.rasyon : 'Rasyon & Çiftlik Modülleri'}");

file = file.replace(/> Besi Sığırı/g, "> {lang === 'en' ? t.btn_besi : 'Besi Sığırı'}");
file = file.replace(/> Süt İneği/g, "> {lang === 'en' ? t.btn_sut : 'Süt İneği'}");
file = file.replace(/Koyun &amp; Kuzu/g, "{lang === 'en' ? t.btn_koyun : 'Koyun & Kuzu'}");
file = file.replace(/Keçi &amp; Oğlak/g, "{lang === 'en' ? t.btn_keci : 'Keçi & Oğlak'}");
file = file.replace(/> Süt Kârlılığı/g, "> {lang === 'en' ? t.btn_sutEko : 'Süt Kârlılığı'}");
file = file.replace(/> Besi Kârlılığı/g, "> {lang === 'en' ? t.btn_besiEko : 'Besi Kârlılığı'}");
file = file.replace(/> Gebelik Takvimi/g, "> {lang === 'en' ? t.btn_geb : 'Gebelik Takvimi'}");
file = file.replace(/> Kızgınlık Takvimi/g, "> {lang === 'en' ? t.btn_kiz : 'Kızgınlık Takvimi'}");
file = file.replace(/> SYGM/g, "> {lang === 'en' ? t.btn_iofc : 'SYGM'}");
file = file.replace(/> Damızlık Skor/g, "> {lang === 'en' ? t.btn_damizlik : 'Damızlık Skor'}");

fs.writeFileSync('src/rasyon/components/Hero.tsx', file, 'utf8');
