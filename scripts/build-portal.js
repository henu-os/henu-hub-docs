const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy assets
const distAssetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(distAssetsDir)) {
  fs.mkdirSync(distAssetsDir, { recursive: true });
}

const logoSource = path.join(rootDir, 'public', 'henu-logo.png');
if (fs.existsSync(logoSource)) {
  fs.copyFileSync(logoSource, path.join(distAssetsDir, 'henu-logo.png'));
}

// Navigation structure
const navCategories = [
  {
    name: 'Corporate & Governance',
    items: [
      { id: 'README', title: 'Platform Overview', file: 'README.md' },
      { id: 'CORPORATE_SUPPORT', title: 'Corporate Governance & Support', file: 'CORPORATE_SUPPORT.md' },
    ],
  },
  {
    name: 'Architecture & Repositories',
    items: [
      { id: 'SYSTEM_ARCHITECTURE', title: 'System Architecture', file: 'SYSTEM_ARCHITECTURE.md' },
      { id: 'REPOSITORIES_REFERENCE', title: 'Repositories Reference', file: 'REPOSITORIES_REFERENCE.md' },
      { id: 'PLATFORM_CAPABILITIES', title: 'Platform Capabilities', file: 'PLATFORM_CAPABILITIES.md' },
    ],
  },
  {
    name: 'Development & Setup',
    items: [
      { id: 'ADDING_A_NEW_HENU_APPLICATION', title: 'Adding an Application', file: 'ADDING_A_NEW_HENU_APPLICATION.md' },
      { id: 'API_SETUP', title: 'API Setup (Backend)', file: 'API_SETUP.md' },
      { id: 'ADMIN_SETUP', title: 'Admin Setup (Console)', file: 'ADMIN_SETUP.md' },
      { id: 'HUB_SETUP', title: 'HUB Setup (Desktop)', file: 'HUB_SETUP.md' },
      { id: 'GITHUB_APP_SETUP', title: 'GitHub App & Webhooks', file: 'GITHUB_APP_SETUP.md' },
    ],
  },
  {
    name: 'Release & Distribution',
    items: [
      { id: 'RELEASE_GUIDE', title: 'Release Lifecycle & Packaging', file: 'RELEASE_GUIDE.md' },
      { id: 'CATALOGUE_GUIDE', title: 'Catalogue & Rollback', file: 'CATALOGUE_GUIDE.md' },
      { id: 'CHANNELS_AND_VERSIONING', title: 'Channels & Versioning', file: 'CHANNELS_AND_VERSIONING.md' },
    ],
  },
  {
    name: 'Operations & Reliability',
    items: [
      { id: 'SECURITY_GUIDE', title: 'Security & Secrets', file: 'SECURITY_GUIDE.md' },
      { id: 'DEPLOYMENT_GUIDE', title: 'Production Deployment', file: 'DEPLOYMENT_GUIDE.md' },
      { id: 'TROUBLESHOOTING', title: 'Troubleshooting Runbooks', file: 'TROUBLESHOOTING.md' },
      { id: 'BACKUP_AND_RECOVERY', title: 'Backup & Recovery', file: 'BACKUP_AND_RECOVERY.md' },
    ],
  },
];

// Helper: Convert Markdown to HTML
function markdownToHtml(md) {
  let html = md;

  // Escape raw HTML entities in text except pre-formatted
  // Replace Windows CRLF
  html = html.replace(/\r\n/g, '\n');

  // Convert Code Blocks with language
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<div class="code-block-wrapper my-5 rounded-xl overflow-hidden border border-slate-700/60 bg-[#171329] shadow-md">
      <div class="flex items-center justify-between px-4 py-2 bg-[#211C38] border-b border-slate-700/50 text-xs font-mono text-[#DCD5FF]">
        <span class="font-semibold uppercase tracking-wider">${lang || 'TEXT'}</span>
        <button class="copy-btn hover:text-white transition-colors" onclick="copyCode(this)">Copy</button>
      </div>
      <pre class="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed"><code>${escapedCode}</code></pre>
    </div>`;
  });

  // Callouts (> [!NOTE], etc.)
  html = html.replace(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*?)(?=\n\n|\n(?!>)|$)/gms, (match, type, content) => {
    const cleanContent = content.replace(/^>\s?/gm, '').trim();
    let bg = 'bg-blue-50 border-blue-200 text-blue-900';
    let icon = 'ℹ️';
    let label = 'NOTE';
    if (type === 'TIP') { bg = 'bg-emerald-50 border-emerald-200 text-emerald-900'; icon = '💡'; label = 'TIP'; }
    if (type === 'IMPORTANT') { bg = 'bg-indigo-50 border-[#DCD5FF] text-[#171329]'; icon = '📌'; label = 'IMPORTANT'; }
    if (type === 'WARNING') { bg = 'bg-amber-50 border-amber-200 text-amber-900'; icon = '⚠️'; label = 'WARNING'; }
    if (type === 'CAUTION') { bg = 'bg-rose-50 border-rose-200 text-rose-900'; icon = '🛑'; label = 'CAUTION'; }

    return `<div class="callout my-4 p-4 rounded-xl border ${bg} text-xs leading-relaxed shadow-2xs">
      <div class="font-bold mb-1 flex items-center gap-2"><span>${icon}</span> <span>${label}</span></div>
      <div>${cleanContent}</div>
    </div>`;
  });

  // Headings
  html = html.replace(/^# (.*?)$/gm, '<h1 class="text-3xl font-extrabold text-[#171329] tracking-tight mt-2 mb-6 pb-3 border-b border-slate-200">$1</h1>');
  html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold text-[#171329] tracking-tight mt-8 mb-4 flex items-center gap-2">$1</h2>');
  html = html.replace(/^### (.*?)$/gm, '<h3 class="text-base font-bold text-slate-800 tracking-tight mt-6 mb-3">$1</h3>');
  html = html.replace(/^#### (.*?)$/gm, '<h4 class="text-sm font-bold text-slate-700 mt-4 mb-2">$1</h4>');

  // Tables
  html = html.replace(/((?:\|[^\n]+\|\n?)+)/g, (match) => {
    const rows = match.trim().split('\n');
    if (rows.length < 2) return match;

    let tableHtml = '<div class="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs"><table class="w-full text-left text-xs">';
    
    // Header
    const headerCols = rows[0].split('|').filter((c, i, a) => i > 0 && i < a.length - 1);
    tableHtml += '<thead class="bg-[#F7F7FB] border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider"><tr>';
    headerCols.forEach(col => {
      tableHtml += `<th class="px-4 py-3">${col.trim()}</th>`;
    });
    tableHtml += '</tr></thead><tbody class="divide-y divide-slate-100 bg-white">';

    // Body (skip row 1 which is separator)
    for (let r = 2; r < rows.length; r++) {
      const cols = rows[r].split('|').filter((c, i, a) => i > 0 && i < a.length - 1);
      tableHtml += '<tr class="hover:bg-slate-50/80 transition-colors">';
      cols.forEach(col => {
        tableHtml += `<td class="px-4 py-3 text-slate-600">${col.trim()}</td>`;
      });
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table></div>';
    return tableHtml;
  });

  // Blockquotes (standard)
  html = html.replace(/^>\s?(.*?)$/gm, '<blockquote class="border-l-4 border-[#6D4AFF] pl-4 py-1 my-3 text-xs text-slate-600 italic bg-[#F7F7FB] rounded-r-lg">$1</blockquote>');

  // Unordered Lists
  html = html.replace(/^\s*-\s+(.*?)$/gm, '<li class="ml-4 list-disc text-xs text-slate-600 my-1 leading-relaxed">$1</li>');

  // Ordered Lists
  html = html.replace(/^\s*(\d+)\.\s+(.*?)$/gm, '<li class="ml-4 list-decimal text-xs text-slate-600 my-1 leading-relaxed">$2</li>');

  // Wrap contiguous <li> with <ul> / <ol>
  html = html.replace(/((?:<li class="[^"]*list-disc[^"]*">.*?<\/li>\s*)+)/g, '<ul class="my-3 space-y-1 pl-2">$1</ul>');
  html = html.replace(/((?:<li class="[^"]*list-decimal[^"]*">.*?<\/li>\s*)+)/g, '<ol class="my-3 space-y-1 pl-2">$1</ol>');

  // Inline styling: Bold, Italic, Strikethrough, Code, Links
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-[#5B37EB] font-mono text-[11px] border border-slate-200/60">$1</code>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) => {
    // Map .md links to html links
    let targetUrl = url;
    if (url.endsWith('.md')) {
      targetUrl = url.replace(/\.md$/, '.html');
    }
    return `<a href="${targetUrl}" class="text-[#6D4AFF] hover:text-[#5B37EB] font-medium underline decoration-1 underline-offset-2 transition-colors">${text}</a>`;
  });

  // Paragraphs
  const blocks = html.split(/\n{2,}/);
  html = blocks.map(b => {
    const trimmed = b.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<div') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<table') || trimmed.startsWith('<blockquote')) {
      return trimmed;
    }
    return `<p class="my-3 text-xs leading-relaxed text-slate-600">${trimmed}</p>`;
  }).join('\n\n');

  return html;
}

// Full page HTML Template
function renderPage(docId, title, contentHtml) {
  let navHtml = '';
  for (const cat of navCategories) {
    navHtml += `<div class="mb-5">
      <div class="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">${cat.name}</div>
      <div class="space-y-0.5">`;
    for (const item of cat.items) {
      const active = item.id === docId;
      const activeClass = active
        ? 'bg-[#F0EEFF] text-[#6D4AFF] font-semibold border-l-2 border-[#6D4AFF]'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-normal';
      const fileUrl = item.id === 'README' ? 'index.html' : `${item.id}.html`;
      navHtml += `<a href="${fileUrl}" class="flex items-center gap-2 px-3 py-1.5 rounded-r-lg text-xs transition-colors ${activeClass}">
        <span>${item.title}</span>
      </a>`;
    }
    navHtml += `</div></div>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | HENU OS Documentation & Support Portal</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
    code, pre { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-[#F7F7FB] text-[#171329] antialiased min-h-screen flex flex-col">

  <!-- Top Navigation Header -->
  <header class="sticky top-0 z-40 w-full bg-white border-b border-slate-200/80 shadow-2xs backdrop-blur-md bg-white/95">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <a href="index.html" class="flex items-center gap-3">
          <img src="assets/henu-logo.png" alt="HENU OS" class="w-9 h-9 object-contain rounded-lg shadow-xs" onerror="this.src='https://placehold.co/36x36/6D4AFF/white?text=H'">
          <div class="flex flex-col">
            <span class="font-bold text-sm tracking-tight text-slate-900 leading-tight">HENU OS</span>
            <span class="text-[10px] text-slate-500 font-medium">Enterprise Documentation</span>
          </div>
        </a>
        <span class="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F0EEFF] text-[#6D4AFF] border border-[#DCD5FF]">
          v1.2.0-prod
        </span>
      </div>

      <div class="flex items-center gap-3">
        <!-- Quick Search -->
        <div class="relative w-48 sm:w-64">
          <input type="text" id="searchInput" placeholder="Search documentation..." onkeyup="filterDocs()" class="w-full text-xs rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#6D4AFF] focus:outline-none focus:ring-1 focus:ring-[#6D4AFF]">
          <span class="absolute left-2.5 top-2 text-slate-400 text-xs">🔍</span>
        </div>

        <a href="CORPORATE_SUPPORT.html" class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#6D4AFF] text-white hover:bg-[#5B37EB] transition-colors shadow-2xs">
          Support Desk
        </a>
        <a href="https://github.com/henu-os" target="_blank" rel="noreferrer" class="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex py-6 gap-8">
    
    <!-- Left Navigation Sidebar -->
    <aside id="sidebar" class="w-64 flex-shrink-0 hidden lg:block sticky top-22 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
      <nav id="navTree" class="text-slate-700">
        ${navHtml}
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 min-w-0 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-10">
      
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-[11px] text-slate-400 mb-6 font-medium">
        <a href="index.html" class="hover:text-slate-700">Docs</a>
        <span>/</span>
        <span class="text-slate-600">${title}</span>
      </div>

      <!-- Rendered Article -->
      <article class="prose max-w-none">
        ${contentHtml}
      </article>

      <!-- Footer Info -->
      <div class="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          Official documentation for <strong class="text-slate-700">HENU OS PRIVATE LIMITED</strong> (CIN: <code class="text-[10px]">U62099RJ2025PTC109150</code>)
        </div>
        <div class="flex items-center gap-3">
          <a href="CORPORATE_SUPPORT.html" class="hover:text-[#6D4AFF] transition-colors">Governance & Support</a>
          <span>•</span>
          <a href="https://www.henuos.in/" target="_blank" rel="noreferrer" class="hover:text-[#6D4AFF] transition-colors">henuos.in</a>
        </div>
      </div>
    </main>
  </div>

  <script>
    function copyCode(btn) {
      const code = btn.closest('.code-block-wrapper').querySelector('code').innerText;
      navigator.clipboard.writeText(code);
      btn.innerText = 'Copied!';
      setTimeout(() => { btn.innerText = 'Copy'; }, 2000);
    }

    function filterDocs() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const links = document.querySelectorAll('#navTree a');
      links.forEach(link => {
        const text = link.innerText.toLowerCase();
        if (text.includes(query)) {
          link.style.display = 'flex';
        } else {
          link.style.display = 'none';
        }
      });
    }
  </script>
</body>
</html>`;
}

// Build Process
console.log('[Docs Portal Builder] Starting static documentation site compilation...');

let pagesGenerated = 0;
for (const cat of navCategories) {
  for (const item of cat.items) {
    const mdPath = path.join(rootDir, item.file);
    if (!fs.existsSync(mdPath)) {
      console.warn(`  [WARN] Source file missing: ${item.file}`);
      continue;
    }

    const mdContent = fs.readFileSync(mdPath, 'utf8');
    const contentHtml = markdownToHtml(mdContent);
    const pageHtml = renderPage(item.id, item.title, contentHtml);

    const outFileName = item.id === 'README' ? 'index.html' : `${item.id}.html`;
    const outPath = path.join(distDir, outFileName);

    fs.writeFileSync(outPath, pageHtml, 'utf8');
    console.log(`  [GENERATED] ${outFileName} (${pageHtml.length} bytes)`);
    pagesGenerated++;
  }
}

console.log(`\n[Docs Portal Builder] Successfully built ${pagesGenerated} static HTML documentation pages into ${distDir}`);
