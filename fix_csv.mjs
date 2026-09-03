import fs from 'fs';
let file = fs.readFileSync('src/rasyon/components/GebTakvimResultView.tsx', 'utf8');

file = file.replace('"$<GlossaryText text={a.aciklama} />"', '\"${a.aciklama}\"');
file = file.replace(
  '<td className="px-4 py-3 text-xs text-[#6B7160] leading-relaxed">\n                      {a.aciklama}\n                    </td>',
  '<td className="px-4 py-3 text-xs text-[#6B7160] leading-relaxed">\n                      <GlossaryText text={a.aciklama} />\n                    </td>'
);

fs.writeFileSync('src/rasyon/components/GebTakvimResultView.tsx', file, 'utf8');
