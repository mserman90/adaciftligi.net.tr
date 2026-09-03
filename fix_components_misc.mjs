import fs from 'fs';

// GuideModal
let guideModal = fs.readFileSync('src/rasyon/components/GuideModal.tsx', 'utf8');
guideModal = guideModal.replace(/IOFC/g, 'SYGM');
fs.writeFileSync('src/rasyon/components/GuideModal.tsx', guideModal, 'utf8');

// Header
let header = fs.readFileSync('src/rasyon/components/Header.tsx', 'utf8');
header = header.replace(/> IOFC/g, '> SYGM');
fs.writeFileSync('src/rasyon/components/Header.tsx', header, 'utf8');

// Hero
let hero = fs.readFileSync('src/rasyon/components/Hero.tsx', 'utf8');
hero = hero.replace(/> IOFC/g, '> SYGM');
fs.writeFileSync('src/rasyon/components/Hero.tsx', hero, 'utf8');

