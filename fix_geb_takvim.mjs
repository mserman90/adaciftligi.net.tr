import fs from 'fs';
let file = fs.readFileSync('src/rasyon/components/GebTakvimResultView.tsx', 'utf8');

file = file.replace("import React from 'react';", "import React from 'react';\nimport { GlossaryText } from './GlossaryText';");
file = file.replace("{a.aciklama}", "<GlossaryText text={a.aciklama} />");

fs.writeFileSync('src/rasyon/components/GebTakvimResultView.tsx', file, 'utf8');
