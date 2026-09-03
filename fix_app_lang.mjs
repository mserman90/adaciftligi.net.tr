import fs from 'fs';
let file = fs.readFileSync('src/rasyon/RasyonApp.tsx', 'utf8');

file = file.replace(/import \{ ModuleKey/g, "import { Language, ModuleKey");
file = file.replace(/const \[currentModule, setCurrentModule\] = useState<ModuleKey \| null>\(null\);/g, "const [currentModule, setCurrentModule] = useState<ModuleKey | null>(null);\n  const [lang, setLang] = useState<Language>('tr');");
file = file.replace(/<Header/g, "<Header\n        lang={lang}\n        setLang={setLang}");
file = file.replace(/<Hero/g, "<Hero\n            lang={lang}");

fs.writeFileSync('src/rasyon/RasyonApp.tsx', file, 'utf8');
