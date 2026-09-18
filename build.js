import fs from 'fs';
import path from 'path';

const dist = path.resolve('dist');
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist, { recursive: true });
}

const filesToCopy = ['index.html', 'style.css', 'app.js', 'favicon.ico', 'favicon.png', 'robots.txt', 'sitemap.xml'];
for (const file of filesToCopy) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(dist, file));
  }
}

if (fs.existsSync('images')) {
  fs.cpSync('images', path.join(dist, 'images'), { recursive: true });
}

console.log('Build completed successfully: all static files ready in dist/ and root.');
