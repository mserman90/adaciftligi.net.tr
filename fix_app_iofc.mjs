import fs from 'fs';
let file = fs.readFileSync('src/rasyon/RasyonApp.tsx', 'utf8');

file = file.replace(/IOFC defteri temizlendi/g, 'SYGM defteri temizlendi');

fs.writeFileSync('src/rasyon/RasyonApp.tsx', file, 'utf8');
