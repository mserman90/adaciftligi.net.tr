import fs from 'fs';
let file = fs.readFileSync('src/rasyon/components/modules/SutPanel.tsx', 'utf8');

file = file.replace(/4% yağlı eşdeğer, FCM/g, '4% yağlı eşdeğer, YGDS');
file = file.replace(/4% FCM\)/g, '4% YGDS)');
fs.writeFileSync('src/rasyon/components/modules/SutPanel.tsx', file, 'utf8');
