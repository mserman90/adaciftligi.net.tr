import fs from 'fs';
let file = fs.readFileSync('src/rasyon/types.ts', 'utf8');

file = "export type Language = 'tr' | 'en';\n" + file;

fs.writeFileSync('src/rasyon/types.ts', file, 'utf8');
