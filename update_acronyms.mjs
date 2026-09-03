import fs from 'fs';

let glossary = fs.readFileSync('src/rasyon/data/glossary.ts', 'utf8');

glossary = glossary.replace(/title: 'Kuru Madde \(KM\)'/, "title: 'Kuru Madde - KM (DM)'");
glossary = glossary.replace(/title: 'Kuru Madde Tüketimi \(DMI\)'/, "title: 'Kuru Madde Tüketimi - KMT (DMI)'");
glossary = glossary.replace(/title: 'Ham Protein \(HP\)'/, "title: 'Ham Protein - HP (CP)'");
glossary = glossary.replace(/title: 'Nötral Deterjan Lif \(NDF\)'/, "title: 'Nötral Deterjan Lif - NDL (NDF)'");
glossary = glossary.replace(/title: 'Net Enerji Laktasyon \(NEL\)'/, "title: 'Net Enerji Laktasyon - NEL (NEL)'");
glossary = glossary.replace(/title: 'Net Enerji Yaşama \(NEm\)'/, "title: 'Net Enerji Yaşama - NEY (NEm)'");
glossary = glossary.replace(/title: 'Net Enerji Büyüme \(NEg\)'/, "title: 'Net Enerji Büyüme - NEB (NEg)'");
glossary = glossary.replace(/title: 'Rumende Parçalanmayan Protein \(RUP\)'/, "title: 'Rumende Parçalanmayan Protein - RPP (RUP)'");
glossary = glossary.replace(/title: '4% YGDS \(Yağa Göre Düzeltilmiş Süt\)'/, "title: 'Yağa Göre Düzeltilmiş Süt - YGDS (FCM)'");
glossary = glossary.replace(/title: 'SYGM \(Süt Yem Geliri Marjı\)'/, "title: 'Süt Yem Geliri Marjı - SYGM (IOFC)'");
glossary = glossary.replace(/title: 'Anyon-Katyon Dengesi \(AKD\)'/, "title: 'Anyon-Katyon Dengesi - AKD (DCAD)'");

fs.writeFileSync('src/rasyon/data/glossary.ts', glossary, 'utf8');
