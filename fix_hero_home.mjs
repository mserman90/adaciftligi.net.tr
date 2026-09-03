import fs from 'fs';
let file = fs.readFileSync('src/rasyon/components/Hero.tsx', 'utf8');

file = file.replace(/home: '\{lang === 'en' \? t\.home : 'Anasayfa'\}',/, "home: 'Home',");
file = file.replace(/rasyon: 'Rasyon & Çiftlik Modülleri',/, "rasyon: 'Ration & Farm Modules',");
file = file.replace(/ciftlik_mod: 'Çiftlik Modülü',/, "ciftlik_mod: 'Farm Module',");
file = file.replace(/rasyon_mod: 'Rasyon Modülü',/, "rasyon_mod: 'Ration Module',");
file = file.replace(/btn_besi: 'Besi Sığırı',/, "btn_besi: 'Beef Cattle',");
file = file.replace(/btn_sut: 'Süt İneği',/, "btn_sut: 'Dairy Cow',");
file = file.replace(/btn_koyun: 'Koyun & Kuzu',/, "btn_koyun: 'Sheep & Lamb',");
file = file.replace(/btn_keci: 'Keçi & Oğlak',/, "btn_keci: 'Goat & Kid',");
file = file.replace(/btn_sutEko: 'Süt Kârlılığı',/, "btn_sutEko: 'Dairy Profitability',");
file = file.replace(/btn_besiEko: 'Besi Kârlılığı',/, "btn_besiEko: 'Beef Profitability',");
file = file.replace(/btn_geb: 'Gebelik Takvimi',/, "btn_geb: 'Gestation Calendar',");
file = file.replace(/btn_kiz: 'Kızgınlık Takvimi',/, "btn_kiz: 'Estrus Calendar',");
file = file.replace(/btn_iofc: 'SYGM \(IOFC\)',/, "btn_iofc: 'IOFC',");
file = file.replace(/btn_damizlik: 'Damızlık Skor',/, "btn_damizlik: 'Breeding Score',");

fs.writeFileSync('src/rasyon/components/Hero.tsx', file, 'utf8');
