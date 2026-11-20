const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

console.log('[Docs Link & Integrity Checker] Validating Markdown links and file references...');

const mdFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.md'));
let errors = 0;

for (const file of mdFiles) {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  // Match markdown links [text](target)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const linkText = match[1];
    const linkTarget = match[2];

    // Check relative file links
    if (!linkTarget.startsWith('http://') && !linkTarget.startsWith('https://') && !linkTarget.startsWith('mailto:') && !linkTarget.startsWith('tel:') && !linkTarget.startsWith('#')) {
      // Remove anchor if any
      const cleanTarget = linkTarget.split('#')[0];
      if (cleanTarget) {
        // Resolve relative path
        const resolvedPath = path.resolve(rootDir, cleanTarget);
        if (!fs.existsSync(resolvedPath)) {
          console.error(`  [BROKEN LINK] in ${file}: [${linkText}](${linkTarget}) -> File not found`);
          errors++;
        }
      }
    }
  }
}

if (errors > 0) {
  console.error(`\nDocs integrity check FAILED: ${errors} broken relative links found.`);
  process.exit(1);
}

console.log(`[Docs Link & Integrity Checker] Checked ${mdFiles.length} Markdown files. All relative links are valid!`);
