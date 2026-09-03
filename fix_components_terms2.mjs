import fs from 'fs';

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
    'src/rasyon/components/modules/BesiPanel.tsx'
];

for (const file of files) {
    replaceInFile(file, [
        ['termId="nem">NEm</FarmerTerm>', 'termId="nem">NEY (NEm)</FarmerTerm>'],
        ['termId="neg">NEg</FarmerTerm>', 'termId="neg">NEB (NEg)</FarmerTerm>'],
        ['termId="nel">NEL</FarmerTerm>', 'termId="nel">NEL (NEL)</FarmerTerm>'],
    ]);
}
