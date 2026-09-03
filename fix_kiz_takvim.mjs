import fs from 'fs';
let file = fs.readFileSync('src/rasyon/components/KizTakvimResultView.tsx', 'utf8');

file = file.replace(
  "<div className=\"text-xs text-[#4A5141] mt-1 leading-relaxed\"><GlossaryText text={\n            Kızgınlık sabah saatlerinde görüldüyse (atlama, böğürme, şeffaf akıntı) <strong>aynı günün akşamı (12 saat sonra)</strong>; akşam saatlerinde görüldüyse <strong>ertesi sabah erkenden</strong> tohumlama yapılmalıdır. Ovülasyon, kızgınlığın bitiminden yaklaşık 10–12 saat sonra gerçekleşir.\"} />\n          </div>",
  "<p className=\"text-xs text-[#4A5141] mt-1 leading-relaxed\">\n            <GlossaryText text=\"Kızgınlık sabah saatlerinde görüldüyse (atlama, böğürme, şeffaf akıntı) aynı günün akşamı (12 saat sonra); akşam saatlerinde görüldüyse ertesi sabah erkenden tohumlama yapılmalıdır. Ovülasyon, kızgınlığın bitiminden yaklaşık 10-12 saat sonra gerçekleşir.\" />\n          </p>"
);

fs.writeFileSync('src/rasyon/components/KizTakvimResultView.tsx', file, 'utf8');
