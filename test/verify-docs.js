const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const requiredFiles = [
  'README.md',
  'ADDING_A_NEW_HENU_APPLICATION.md',
  'SYSTEM_ARCHITECTURE.md',
  'API_SETUP.md',
  'ADMIN_SETUP.md',
  'HUB_SETUP.md',
  'GITHUB_APP_SETUP.md',
  'RELEASE_GUIDE.md',
  'CATALOGUE_GUIDE.md',
  'SECURITY_GUIDE.md',
  'DEPLOYMENT_GUIDE.md',
  'TROUBLESHOOTING.md',
  'REPOSITORIES_REFERENCE.md',
  'BACKUP_AND_RECOVERY.md',
  'CHANNELS_AND_VERSIONING.md',
  'PLATFORM_CAPABILITIES.md',
  'CORPORATE_SUPPORT.md',
];

console.log('[Docs Verification] Checking required documentation files...');
let missing = 0;

for (const file of requiredFiles) {
  const fullPath = path.join(rootDir, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`  [MISSING] ${file}`);
    missing++;
  } else {
    const stat = fs.statSync(fullPath);
    console.log(`  [OK] ${file} (${stat.size} bytes)`);
  }
}

if (missing > 0) {
  console.error(`\nDocs verification FAILED: ${missing} files missing.`);
  process.exit(1);
}

// Verify README references all 22 required sections
const readmeContent = fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8');
const requiredSections = [
  'System Architecture',
  'Repository Responsibilities',
  'Local Development Setup',
  'Environment Configuration',
  'Database Setup and Migrations',
  'Admin Authentication',
  'GitHub App Creation',
  'GitHub Repository Connection',
  'Webhook Configuration',
  'Adding a New Application',
  'Preparing a Product Release',
  'Release Asset Naming Rules',
  'Package Verification',
  'Stable, Beta and Nightly Channels',
  'Catalogue Publication',
  'Catalogue Rollback',
  'HENU HUB Installation & Updates',
  'Platform-Specific Capabilities',
  'Security and Secrets',
  'Production Deployment',
  'Troubleshooting',
  'Backup and Recovery',
  'Corporate Governance and Support',
];

console.log('\n[Docs Verification] Verifying coverage of all 22 required sections in README.md...');
let missingSections = 0;
for (const section of requiredSections) {
  if (!readmeContent.toLowerCase().includes(section.toLowerCase())) {
    console.error(`  [MISSING SECTION] ${section}`);
    missingSections++;
  } else {
    console.log(`  [OK] Section covered: ${section}`);
  }
}

if (missingSections > 0) {
  console.error(`\nDocs verification FAILED: ${missingSections} sections not indexed in README.`);
  process.exit(1);
}

console.log('\n[Docs Verification] ALL 22 SECTIONS AND 16 GUIDES VERIFIED SUCCESSFULLY!');
