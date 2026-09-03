import fs from 'fs';
let file = fs.readFileSync('src/rasyon/data/glossary.ts', 'utf8');

// FCM -> YGDS
file = file.replace(/matchTerms: \['FCM', '4% FCM'/g, "matchTerms: ['YGDS', '4% YGDS'");
file = file.replace(/title: '4% FCM \(Yağa Göre Düzeltilmiş Süt\)'/g, "title: '4% YGDS (Yağa Göre Düzeltilmiş Süt)'");
file = file.replace(/FCM formülü ikisini de/g, 'YGDS formülü ikisini de');
file = file.replace(/Formül: FCM = Süt/g, 'Formül: YGDS = Süt');

// IOFC -> SYGM
file = file.replace(/matchTerms: \['IOFC'/g, "matchTerms: ['SYGM'");
file = file.replace(/title: 'IOFC \(Süt Yem Geliri Marjı\)'/g, "title: 'SYGM (Süt Yem Geliri Marjı)'");
file = file.replace(/IOFC'niz 120/g, "SYGM'niz 120");
file = file.replace(/IOFC'yi yüksek/g, "SYGM'yi yüksek");

// DCAD -> AKD
file = file.replace(/matchTerms: \['DCAD', 'DCA', 'negatif DCAD'/g, "matchTerms: ['AKD', 'negatif AKD'");
file = file.replace(/title: 'Anyon-Katyon Dengesi \(DCAD\)'/g, "title: 'Anyon-Katyon Dengesi (AKD)'");
file = file.replace(/negatif DCAD/g, "negatif AKD");

fs.writeFileSync('src/rasyon/data/glossary.ts', file, 'utf8');
