import fs from 'fs';
let file = fs.readFileSync('src/rasyon/data/glossary.ts', 'utf8');

const regex = /\s*\{\s*id:\s*'iofc'[\s\S]*?\},/g;
let matches = [...file.matchAll(regex)];

if (matches.length > 1) {
  // Remove the second occurrence
  const secondOccurrence = matches[1][0];
  file = file.replace(secondOccurrence, '');
  fs.writeFileSync('src/rasyon/data/glossary.ts', file, 'utf8');
}
