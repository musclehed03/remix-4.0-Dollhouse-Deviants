const fs = require('fs');
const https = require('https');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  const publicDir = path.join(process.cwd(), 'public');
  const galleryDir = path.join(publicDir, 'gallery');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
  if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir);
  
  await download('https://raw.githubusercontent.com/musclehed03/Remix-Dollhouse-Deviants-WebPage/main/public/dollhouse-sfw-logo.jpg', path.join(publicDir, 'dollhouse-sfw-logo.jpg'));
  console.log('Downloaded logo');
  
  await download('https://raw.githubusercontent.com/musclehed03/Remix-Dollhouse-Deviants-WebPage/main/public/gallery/sonja-portrait-noir.jpg', path.join(galleryDir, 'sonja-portrait-noir.jpg'));
  console.log('Downloaded sonja');
}

run();
