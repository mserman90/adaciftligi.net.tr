import fs from 'fs';
let file = fs.readFileSync('src/rasyon/components/Header.tsx', 'utf8');

file = file.replace(/import \{ ModuleKey/g, "import { Language, ModuleKey");
file = file.replace(/interface HeaderProps \{/, "interface HeaderProps {\n  lang: Language;\n  setLang: (l: Language) => void;");
file = file.replace(/export const Header: React\.FC<HeaderProps> = \(\{/, "export const Header: React.FC<HeaderProps> = ({\n  lang,\n  setLang,");

const toggleBtn = `
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-[rgba(243,241,228,0.3)] hover:bg-[rgba(243,241,228,0.1)] text-xs font-bold text-[#F3F1E4] transition-all cursor-pointer"
            title="Dili Değiştir / Change Language"
          >
            {lang === 'tr' ? 'TR' : 'EN'}
          </button>
`;

file = file.replace(/\{lastSavedInfo && \(/, toggleBtn + "\n          {lastSavedInfo && (");

fs.writeFileSync('src/rasyon/components/Header.tsx', file, 'utf8');
