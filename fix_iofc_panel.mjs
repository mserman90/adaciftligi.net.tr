import fs from 'fs';
let file = fs.readFileSync('src/rasyon/components/modules/IofcPanel.tsx', 'utf8');

file = file.replace(/IOFC kaydı eklendi:/g, 'SYGM kaydı eklendi:');
file = file.replace(/Günlük IOFC kaydı ekle/g, 'Günlük SYGM kaydı ekle');
file = file.replace(/text="IOFC"/g, 'text="SYGM"');
file = file.replace(/IOFC özeti/g, 'SYGM özeti');
file = file.replace(/IOFC \(aylık\)/g, 'SYGM (aylık)');
file = file.replace(/IOFC'den karşılanmalıdır/g, "SYGM'den karşılanmalıdır");

fs.writeFileSync('src/rasyon/components/modules/IofcPanel.tsx', file, 'utf8');
