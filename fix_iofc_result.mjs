import fs from 'fs';
let file = fs.readFileSync('src/rasyon/components/IofcResultView.tsx', 'utf8');

file = file.replace(/IOFC \(TL\/gun\)/g, 'SYGM (TL/gun)');
file = file.replace(/adaciftligi_iofc_/g, 'adaciftligi_sygm_');
file = file.replace(/IOFC verileri CSV/g, 'SYGM verileri CSV');
file = file.replace(/termId="iofc">IOFC/g, 'termId="iofc">SYGM');
file = file.replace(/Günlük IOFC Takip/g, 'Günlük SYGM Takip');
file = file.replace(/IOFC \(₺\/gün\)/g, 'SYGM (₺/gün)');

fs.writeFileSync('src/rasyon/components/IofcResultView.tsx', file, 'utf8');
