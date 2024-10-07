// minify.js
const fs = require('fs');
const path = require('path');
const Terser = require('terser');

async function minifyFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const minified = await Terser.minify(code);
  fs.writeFileSync(filePath, minified.code, 'utf8');
}

async function minifyDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await minifyDirectory(filePath); // Recursively minify directories
    } else if (file.endsWith('.js')) {
      await minifyFile(filePath); // Minify JavaScript files
    }
  }
}

// Minify the 'dist' directory
minifyDirectory(path.join(process.cwd(), 'dist'))
  .then(() => console.log('Minification complete'))
  .catch((err) => console.error('Error during minification:', err));
