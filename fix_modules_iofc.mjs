import fs from 'fs';
let file = fs.readFileSync('src/rasyon/data/modules.ts', 'utf8');

file = file.replace(/Süt Yem Marjı \(IOFC\)/g, 'Süt Yem Geliri Marjı (SYGM)');
file = file.replace(/Günlük Süt Yem Geliri Marjı \(IOFC\)/g, 'Günlük Süt Yem Geliri Marjı (SYGM)');
file = file.replace(/IOFC = süt geliri − yem maliyeti/g, 'SYGM = süt geliri − yem maliyeti');
file = file.replace(/Günlük IOFC kayıt defteri/g, 'Günlük SYGM kayıt defteri');
file = file.replace(/4% FCM bazlı <strong>/g, '4% YGDS bazlı <strong>');
file = file.replace(/4% FCM bazlı enerji/g, '4% YGDS bazlı enerji');
file = file.replace(/<strong>IOFC’nizi/g, '<strong>SYGM’nizi');

fs.writeFileSync('src/rasyon/data/modules.ts', file, 'utf8');
