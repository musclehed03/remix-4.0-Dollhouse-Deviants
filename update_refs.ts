import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

const replacements: { [key: string]: string } = {
  '/avatars/Sonja-At-the-Boutique.jpg': '/Sonja-At-the-Boutique.jpg',
  '/branding/dd-sfw-logo.jpg?v=1': '/DD-SFW-Logo-No-Main.jpg',
  '/branding/dd-sfw-logo.jpg': '/DD-SFW-Logo-No-Main.jpg',
  '/gallery/neon-cats/neon-cat-1.jpg': '/neon-cat-1.jpg',
  '/branding/the-vault-logo-better.jpg': '/the-vault-logo-better.jpg',
  '/avatars/sonja-profile.jpg?v=1': '/Sonja-At-the-Boutique.jpg',
  '/avatars/sonja-profile.jpg': '/Sonja-At-the-Boutique.jpg',
  '/vault-entrance.jpg': '/the-vault-logo.jpg',
  '/gallery/misc/thank-you.png': '/Gemini_Generated_Image_urdwjvurdwjvurdw.png',
  '../public/branding/dd-sfw-logo.jpg?v=1': '/DD-SFW-Logo-No-Main.jpg'
};

function processFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  for (const [oldPath, newPath] of Object.entries(replacements)) {
    if (content.includes(oldPath)) {
      content = content.split(oldPath).join(newPath);
      changed = true;
    }
  }

  // Also replace any dynamic `url('/branding/dd-sfw-logo.jpg?v=1')` in css
  if (filePath.endsWith('index.css')) {
     if (content.includes('url(\'/branding/dd-sfw-logo.jpg?v=1\')')) {
        content = content.replace(/url\('\/branding\/dd-sfw-logo\.jpg\?v=1'\)/g, "url('/DD-SFW-Logo-No-Main.jpg')");
        changed = true;
     }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated paths in: ${filePath}`);
  }
}

function processDirectory(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      processFile(fullPath);
    }
  }
}

processDirectory(srcDir);
