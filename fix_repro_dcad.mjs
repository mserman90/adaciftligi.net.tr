import fs from 'fs';
let file = fs.readFileSync('src/rasyon/data/reproduction.ts', 'utf8');

file = file.replace(/negatif DCAD/g, 'negatif AKD');
fs.writeFileSync('src/rasyon/data/reproduction.ts', file, 'utf8');
