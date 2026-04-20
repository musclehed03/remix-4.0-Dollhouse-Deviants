import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

function sanitizeFiles(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      sanitizeFiles(filePath);
    } else {
      if (file.includes(' ')) {
        const newFile = file.replace(/ /g, '-');
        const newFilePath = path.join(dir, newFile);
        fs.renameSync(filePath, newFilePath);
        console.log(`Renamed: ${file} -> ${newFile}`);
      }
    }
  }
}

sanitizeFiles(publicDir);
