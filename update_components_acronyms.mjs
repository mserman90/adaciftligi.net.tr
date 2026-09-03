import fs from 'fs';
import path from 'path';

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.split(search).join(replace);
    }
    fs.writeFileSync(filePath, content, 'utf8');
}

const files = [
    'src/rasyon/components/IngredientsTable.tsx',
    'src/rasyon/components/modules/SutPanel.tsx',
    'src/rasyon/components/modules/BesiPanel.tsx',
    'src/rasyon/components/modules/IofcPanel.tsx',
    'src/rasyon/components/RationResultView.tsx',
    'src/rasyon/components/SutEkoResultView.tsx',
    'src/rasyon/components/BesiEkoResultView.tsx',
    'src/rasyon/RasyonApp.tsx',
    'src/rasyon/utils/nutrition.ts'
];

for (const file of files) {
    replaceInFile(file, [
        ['KM %', 'KM (DM) %'],
        ['% KM', '% KM (DM)'],
        ['1 kg KM maliyeti', '1 kg KM (DM) maliyeti'],
        ['KM payı', 'KM (DM) payı'],
        ['HP %', 'HP (CP) %'],
        ['NDF %', 'NDF (NDF) %'],
        ['NDF alt sınırı', 'NDF (NDF) alt sınırı'],
        ['NEL (Mcal/kg)', 'NEL (NEL) (Mcal/kg)'],
        ['NEm (Mcal/kg)', 'NEY (NEm) (Mcal/kg)'],
        ['NEg (Mcal/kg)', 'NEB (NEg) (Mcal/kg)'],
        ['KM Maliyeti', 'KM (DM) Maliyeti'],
        ['Maliyet (TL/kg KM)', 'Maliyet (TL/kg KM (DM))'],
        ['KM Tüketimi', 'KMT (DMI)'],
        ['4% yağlı eşdeğer, YGDS', '4% YGDS (FCM)'],
        ['SYGM (aylık)', 'SYGM (IOFC) (aylık)']
    ]);
}
