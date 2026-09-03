import fs from 'fs';
let file = fs.readFileSync('src/rasyon/data/guides.ts', 'utf8');

file = file.replace(/IOFC'yi/g, "SYGM'yi");
file = file.replace(/IOFC'nin/g, "SYGM'nin");
file = file.replace(/IOFC'nizi/g, "SYGM'nizi");
file = file.replace(/IOFC'niz/g, "SYGM'niz");
file = file.replace(/IOFC \(Income Over Feed Cost\)/g, "SYGM (Süt Yem Geliri Marjı)");
file = file.replace(/IOFC/g, "SYGM");

file = file.replace(/4% FCM =/g, "4% YGDS =");
file = file.replace(/FCM × 0,749/g, "YGDS × 0,749");
file = file.replace(/0,372 × FCM/g, "0,372 × YGDS");

fs.writeFileSync('src/rasyon/data/guides.ts', file, 'utf8');
