import fs from 'fs';
let file = fs.readFileSync('src/rasyon/components/modules/IofcPanel.tsx', 'utf8');

file = file.replace(
  /IOFC = \(verim × fiyat\) − yem maliyeti/g,
  '<GlossaryText text="IOFC" /> = (verim × fiyat) − yem maliyeti'
);

file = file.replace(
  /<td className="py-2.5 font-bold text-\[#2E5B39\]">IOFC<\/td>/g,
  '<td className="py-2.5 font-bold text-[#2E5B39]"><GlossaryText text="IOFC" /></td>'
);

file = file.replace(
  /<td className="py-2.5">IOFC \/ kg süt<\/td>/g,
  '<td className="py-2.5"><GlossaryText text="IOFC" /> / kg süt</td>'
);

file = file.replace(
  /Sürü IOFC \(günlük\)/g,
  'Sürü <GlossaryText text="IOFC" /> (günlük)'
);

file = file.replace(
  /IOFC sabit giderleri içermez/g,
  '<GlossaryText text="IOFC" /> sabit giderleri içermez'
);

fs.writeFileSync('src/rasyon/components/modules/IofcPanel.tsx', file, 'utf8');
