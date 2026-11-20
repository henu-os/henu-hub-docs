const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distAssetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}
if (!fs.existsSync(distAssetsDir)) {
  fs.mkdirSync(distAssetsDir, { recursive: true });
}

// Copy logo
const logoSource = path.join(rootDir, 'public', 'henu-logo.png');
if (fs.existsSync(logoSource)) {
  fs.copyFileSync(logoSource, path.join(distAssetsDir, 'henu-logo.png'));
}

// Navigation structure matching GitHub Docs hierarchy
const navCategories = [
  {
    name: 'Getting Started & Overview',
    icon: `<svg class="w-4 h-4 text-[#6D4AFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    items: [
      { id: 'README', title: 'Platform Overview', file: 'README.md', summary: 'High-level introduction to the HENU OS ecosystem and architecture.' },
      { id: 'CORPORATE_SUPPORT', title: 'Corporate Governance & Support', file: 'CORPORATE_SUPPORT.md', summary: 'Official company details, CIN, GSTIN, headquarters and support desks.' },
    ],
  },
  {
    name: 'Architecture & Specifications',
    icon: `<svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
    items: [
      { id: 'SYSTEM_ARCHITECTURE', title: 'System Architecture', file: 'SYSTEM_ARCHITECTURE.md', summary: 'Master data flow, Prisma schema, SSE, and Ed25519 signatures.' },
      { id: 'REPOSITORIES_REFERENCE', title: 'Repositories Reference', file: 'REPOSITORIES_REFERENCE.md', summary: 'Boundaries and contracts across all 6 HENU platform repositories.' },
      { id: 'PLATFORM_CAPABILITIES', title: 'Platform Matrix & Capabilities', file: 'PLATFORM_CAPABILITIES.md', summary: 'OS support matrix for Windows, macOS, and Linux desktop clients.' },
    ],
  },
  {
    name: 'Setup & Configuration',
    icon: `<svg class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
    items: [
      { id: 'ADDING_A_NEW_HENU_APPLICATION', title: 'Adding a New Application', file: 'ADDING_A_NEW_HENU_APPLICATION.md', summary: 'Step-by-step onboarding walkthrough for developers and admins.' },
      { id: 'API_SETUP', title: 'Platform API Setup', file: 'API_SETUP.md', summary: 'Backend NestJS setup, database migrations, and cryptographic keys.' },
      { id: 'ADMIN_SETUP', title: 'Admin Console Setup', file: 'ADMIN_SETUP.md', summary: 'Next.js admin portal, role-based access control, and dashboards.' },
      { id: 'HUB_SETUP', title: 'HENU HUB Desktop Setup', file: 'HUB_SETUP.md', summary: 'Tauri & React desktop launcher installation and configuration.' },
      { id: 'GITHUB_APP_SETUP', title: 'GitHub App & Webhooks', file: 'GITHUB_APP_SETUP.md', summary: 'Automated CI/CD webhook dispatching and repository links.' },
    ],
  },
  {
    name: 'Release, Packaging & Catalogue',
    icon: `<svg class="w-4 h-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
    items: [
      { id: 'RELEASE_GUIDE', title: 'Release Lifecycle & Packaging', file: 'RELEASE_GUIDE.md', summary: 'Package formats (EXE, MSI, ZIP, DMG, AppImage, DEB) and SHA-256 checks.' },
      { id: 'CATALOGUE_GUIDE', title: 'Catalogue & Rollback', file: 'CATALOGUE_GUIDE.md', summary: 'Ed25519 signed revisions, ETag caching, and instant rollback.' },
      { id: 'CHANNELS_AND_VERSIONING', title: 'Channels & Versioning', file: 'CHANNELS_AND_VERSIONING.md', summary: 'Stable, Beta, and Nightly release distribution rules.' },
    ],
  },
  {
    name: 'Security & Operations',
    icon: `<svg class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    items: [
      { id: 'SECURITY_GUIDE', title: 'Security & Secrets Policy', file: 'SECURITY_GUIDE.md', summary: 'Credential management, zero plaintext secrets, and audit logging.' },
      { id: 'DEPLOYMENT_GUIDE', title: 'Production Deployment', file: 'DEPLOYMENT_GUIDE.md', summary: 'Hardened Docker, SSL/TLS reverse proxy, and container configs.' },
      { id: 'TROUBLESHOOTING', title: 'Troubleshooting Runbooks', file: 'TROUBLESHOOTING.md', summary: 'Diagnostic procedures, common error resolutions, and logs inspection.' },
      { id: 'BACKUP_AND_RECOVERY', title: 'Backup & Disaster Recovery', file: 'BACKUP_AND_RECOVERY.md', summary: 'PostgreSQL snapshots, revision restoration, and failover steps.' },
    ],
  },
];

// Flat list for Prev/Next navigation
const flatArticles = [];
for (const cat of navCategories) {
  for (const item of cat.items) {
    flatArticles.push({ ...item, categoryName: cat.name });
  }
}

// Slugify header text for anchor links
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Convert Markdown to High-Quality GitHub Docs HTML with TOC extraction
function parseMarkdown(md) {
  let html = md.replace(/\r\n/g, '\n');
  const toc = [];

  // 1. Convert Code Blocks (with Mermaid support)
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = (lang || 'text').toLowerCase();
    if (language === 'mermaid') {
      return `<div class="mermaid my-6 p-4 rounded-xl border border-slate-200 dark:border-[#30363d] bg-slate-50 dark:bg-[#161b22] text-center overflow-x-auto">${code.trim()}</div>`;
    }

    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return `<div class="code-block my-5 rounded-xl border border-slate-200 dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#161b22] overflow-hidden shadow-xs">
      <div class="code-header flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-[#30363d] bg-slate-100/70 dark:bg-[#21262d] text-xs font-mono text-slate-600 dark:text-[#8b949e]">
        <span class="font-semibold uppercase tracking-wider">${language}</span>
        <button class="copy-btn inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-sans text-slate-600 dark:text-[#c9d1d9] hover:bg-slate-200 dark:hover:bg-[#30363d] transition-all" onclick="copyCode(this)">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span>Copy</span>
        </button>
      </div>
      <pre class="p-4 text-xs font-mono text-slate-900 dark:text-[#e6edf3] overflow-x-auto leading-relaxed"><code>${escapedCode}</code></pre>
    </div>`;
  });

  // 2. Alert Callouts (exact GitHub Docs spec)
  html = html.replace(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*?)(?=\n\n|\n(?!>)|$)/gms, (match, type, content) => {
    const cleanContent = content.replace(/^>\s?/gm, '').trim();
    let borderClass = 'border-blue-500 bg-blue-50/70 text-blue-900 dark:bg-blue-950/30 dark:border-blue-500 dark:text-blue-200';
    let label = 'Note';
    let icon = `<svg class="w-4 h-4 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

    if (type === 'TIP') {
      borderClass = 'border-emerald-500 bg-emerald-50/70 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-500 dark:text-emerald-200';
      label = 'Tip';
      icon = `<svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>`;
    } else if (type === 'IMPORTANT') {
      borderClass = 'border-[#6D4AFF] bg-[#F0EEFF]/60 text-[#171329] dark:bg-[#6D4AFF]/10 dark:border-[#6D4AFF] dark:text-[#DCD5FF]';
      label = 'Important';
      icon = `<svg class="w-4 h-4 text-[#6D4AFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    } else if (type === 'WARNING') {
      borderClass = 'border-amber-500 bg-amber-50/70 text-amber-900 dark:bg-amber-950/30 dark:border-amber-500 dark:text-amber-200';
      label = 'Warning';
      icon = `<svg class="w-4 h-4 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    } else if (type === 'CAUTION') {
      borderClass = 'border-rose-500 bg-rose-50/70 text-rose-900 dark:bg-rose-950/30 dark:border-rose-500 dark:text-rose-200';
      label = 'Caution';
      icon = `<svg class="w-4 h-4 text-rose-600 dark:text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    }

    return `<div class="gh-alert my-5 p-4 rounded-xl border-l-4 ${borderClass} shadow-2xs">
      <div class="flex items-center gap-2 font-semibold text-xs mb-1">
        ${icon}
        <span>${label}</span>
      </div>
      <div class="text-xs leading-relaxed ml-6">${cleanContent}</div>
    </div>`;
  });

  // 3. Headings with auto-generated anchor links & TOC tracking
  html = html.replace(/^# (.*?)$/gm, (match, title) => {
    return `<h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#f0f6fc] mt-2 mb-4 pb-3 border-b border-slate-200 dark:border-[#30363d]">${title}</h1>`;
  });

  html = html.replace(/^## (.*?)$/gm, (match, title) => {
    const slug = slugify(title);
    toc.push({ id: slug, text: title, level: 2 });
    return `<h2 id="${slug}" class="scroll-mt-24 text-xl font-bold tracking-tight text-slate-900 dark:text-[#f0f6fc] mt-10 mb-4 flex items-center justify-between group">
      <span>${title}</span>
      <a href="#${slug}" class="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-[#6D4AFF] text-sm ml-2 transition-opacity">#</a>
    </h2>`;
  });

  html = html.replace(/^### (.*?)$/gm, (match, title) => {
    const slug = slugify(title);
    toc.push({ id: slug, text: title, level: 3 });
    return `<h3 id="${slug}" class="scroll-mt-24 text-base font-semibold tracking-tight text-slate-800 dark:text-[#c9d1d9] mt-6 mb-3 flex items-center justify-between group">
      <span>${title}</span>
      <a href="#${slug}" class="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-[#6D4AFF] text-xs ml-2 transition-opacity">#</a>
    </h3>`;
  });

  html = html.replace(/^#### (.*?)$/gm, (match, title) => {
    return `<h4 class="text-sm font-semibold tracking-tight text-slate-700 dark:text-[#8b949e] mt-4 mb-2">${title}</h4>`;
  });

  // 4. Tables with GitHub-style borders
  html = html.replace(/((?:\|[^\n]+\|\n?)+)/g, (match) => {
    const rows = match.trim().split('\n');
    if (rows.length < 2) return match;

    let tableHtml = '<div class="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-[#30363d] shadow-2xs"><table class="w-full text-left text-xs border-collapse">';
    
    // Header
    const headerCols = rows[0].split('|').filter((c, i, a) => i > 0 && i < a.length - 1);
    tableHtml += '<thead class="bg-slate-50 dark:bg-[#161b22] border-b border-slate-200 dark:border-[#30363d] text-slate-700 dark:text-[#c9d1d9] font-semibold"><tr>';
    headerCols.forEach((col) => {
      tableHtml += `<th class="px-4 py-3">${col.trim()}</th>`;
    });
    tableHtml += '</tr></thead><tbody class="divide-y divide-slate-100 dark:divide-[#21262d] bg-white dark:bg-[#0d1117]">';

    // Body
    for (let r = 2; r < rows.length; r++) {
      const cols = rows[r].split('|').filter((c, i, a) => i > 0 && i < a.length - 1);
      tableHtml += '<tr class="hover:bg-slate-50/80 dark:hover:bg-[#161b22]/50 transition-colors">';
      cols.forEach((col) => {
        tableHtml += `<td class="px-4 py-3 text-slate-600 dark:text-[#8b949e]">${col.trim()}</td>`;
      });
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table></div>';
    return tableHtml;
  });

  // 5. Blockquotes
  html = html.replace(/^>\s?(.*?)$/gm, '<blockquote class="border-l-4 border-slate-300 dark:border-[#30363d] pl-4 py-1.5 my-3 text-xs text-slate-600 dark:text-[#8b949e] italic">$1</blockquote>');

  // 6. Lists
  html = html.replace(/^\s*-\s+(.*?)$/gm, '<li class="ml-4 list-disc text-xs text-slate-700 dark:text-[#c9d1d9] my-1 leading-relaxed">$1</li>');
  html = html.replace(/^\s*(\d+)\.\s+(.*?)$/gm, '<li class="ml-4 list-decimal text-xs text-slate-700 dark:text-[#c9d1d9] my-1 leading-relaxed">$2</li>');

  html = html.replace(/((?:<li class="[^"]*list-disc[^"]*">.*?<\/li>\s*)+)/g, '<ul class="my-3 space-y-1 pl-2">$1</ul>');
  html = html.replace(/((?:<li class="[^"]*list-decimal[^"]*">.*?<\/li>\s*)+)/g, '<ol class="my-3 space-y-1 pl-2">$1</ol>');

  // 7. Inline styling
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-[#f0f6fc]">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#21262d] text-[#6D4AFF] dark:text-[#a58dfa] font-mono text-[11px] border border-slate-200/60 dark:border-[#30363d]">$1</code>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) => {
    let targetUrl = url;
    if (url.endsWith('.md')) {
      targetUrl = url.replace(/\.md$/, '.html');
    }
    const isExternal = url.startsWith('http://') || url.startsWith('https://');
    const extAttrs = isExternal ? 'target="_blank" rel="noreferrer"' : '';
    return `<a href="${targetUrl}" ${extAttrs} class="text-[#6D4AFF] dark:text-[#58a6ff] hover:underline font-medium decoration-1 underline-offset-2 transition-colors">${text}</a>`;
  });

  // 8. Paragraphs
  const blocks = html.split(/\n{2,}/);
  html = blocks
    .map((b) => {
      const trimmed = b.trim();
      if (!trimmed) return '';
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<div') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<table') ||
        trimmed.startsWith('<blockquote')
      ) {
        return trimmed;
      }
      return `<p class="my-3 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-[#c9d1d9]">${trimmed}</p>`;
    })
    .join('\n\n');

  return { html, toc };
}

// Full page HTML Template mimicking GitHub Docs (docs.github.com)
function renderPage(docId, title, summary, contentHtml, toc, currentIndex) {
  // Left Sidebar Accordion
  let navHtml = '';
  for (const cat of navCategories) {
    const isCatActive = cat.items.some((i) => i.id === docId);
    navHtml += `
      <div class="nav-category mb-4">
        <button class="nav-category-btn w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-[#c9d1d9] hover:bg-slate-100 dark:hover:bg-[#21262d] rounded-lg transition-colors group" onclick="toggleNavCategory(this)">
          <span class="flex items-center gap-2">
            ${cat.icon}
            <span>${cat.name}</span>
          </span>
          <svg class="chevron-icon w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white transition-transform ${isCatActive ? 'rotate-90' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <div class="nav-items-container pl-6 pr-1 mt-1 space-y-0.5 ${isCatActive ? '' : 'hidden'}">`;
    for (const item of cat.items) {
      const active = item.id === docId;
      const fileUrl = item.id === 'README' ? 'index.html' : `${item.id}.html`;
      const activeClasses = active
        ? 'bg-[#F0EEFF] dark:bg-[#1f1a3a] text-[#6D4AFF] dark:text-[#a78bfa] font-semibold border-l-2 border-[#6D4AFF]'
        : 'text-slate-600 dark:text-[#8b949e] hover:text-slate-900 dark:hover:text-[#f0f6fc] hover:bg-slate-100/80 dark:hover:bg-[#161b22] font-normal';
      navHtml += `
          <a href="${fileUrl}" class="flex items-center px-2.5 py-1.5 rounded-r-lg text-xs transition-colors ${activeClasses}">
            <span class="truncate">${item.title}</span>
          </a>`;
    }
    navHtml += `
        </div>
      </div>`;
  }

  // Right Table of Contents ("In this article")
  let tocHtml = '';
  if (toc.length > 0) {
    tocHtml = `
      <div class="toc-container sticky top-20 text-xs">
        <div class="font-semibold text-slate-900 dark:text-[#f0f6fc] uppercase tracking-wider text-[11px] mb-3 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          <span>In this article</span>
        </div>
        <ul class="space-y-1.5 border-l border-slate-200 dark:border-[#30363d] pl-3 text-slate-600 dark:text-[#8b949e]">`;
    for (const heading of toc) {
      const pl = heading.level === 3 ? 'pl-3 text-[11px]' : '';
      tocHtml += `
          <li>
            <a href="#${heading.id}" class="toc-link block truncate hover:text-[#6D4AFF] dark:hover:text-[#58a6ff] transition-colors ${pl}">${heading.text}</a>
          </li>`;
    }
    tocHtml += `
        </ul>
        <div class="mt-8 pt-6 border-t border-slate-200 dark:border-[#30363d] space-y-2 text-[11px] text-slate-500 dark:text-[#8b949e]">
          <a href="https://github.com/henu-os/henu-hub-docs" target="_blank" rel="noreferrer" class="flex items-center gap-1.5 hover:text-[#6D4AFF] dark:hover:text-[#58a6ff] transition-colors">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            <span>Edit this page on GitHub</span>
          </a>
          <a href="CORPORATE_SUPPORT.html" class="flex items-center gap-1.5 hover:text-[#6D4AFF] dark:hover:text-[#58a6ff] transition-colors">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span>Contact HENU Support</span>
          </a>
        </div>
      </div>`;
  }

  // Prev / Next article cards
  const prevArticle = currentIndex > 0 ? flatArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < flatArticles.length - 1 ? flatArticles[currentIndex + 1] : null;

  let paginationHtml = '<div class="mt-12 pt-6 border-t border-slate-200 dark:border-[#30363d] grid grid-cols-1 sm:grid-cols-2 gap-4">';
  if (prevArticle) {
    const prevUrl = prevArticle.id === 'README' ? 'index.html' : `${prevArticle.id}.html`;
    paginationHtml += `
      <a href="${prevUrl}" class="group p-4 rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-[#6D4AFF] dark:hover:border-[#6D4AFF] bg-slate-50/50 dark:bg-[#161b22]/50 hover:bg-white dark:hover:bg-[#161b22] transition-all flex flex-col">
        <span class="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <svg class="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Previous
        </span>
        <span class="text-xs font-semibold text-slate-900 dark:text-[#f0f6fc] mt-1 group-hover:text-[#6D4AFF] dark:group-hover:text-[#a78bfa] transition-colors">${prevArticle.title}</span>
      </a>`;
  } else {
    paginationHtml += `<div></div>`;
  }

  if (nextArticle) {
    const nextUrl = nextArticle.id === 'README' ? 'index.html' : `${nextArticle.id}.html`;
    paginationHtml += `
      <a href="${nextUrl}" class="group p-4 rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-[#6D4AFF] dark:hover:border-[#6D4AFF] bg-slate-50/50 dark:bg-[#161b22]/50 hover:bg-white dark:hover:bg-[#161b22] transition-all flex flex-col text-right">
        <span class="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-end gap-1">
          Next
          <svg class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </span>
        <span class="text-xs font-semibold text-slate-900 dark:text-[#f0f6fc] mt-1 group-hover:text-[#6D4AFF] dark:group-hover:text-[#a78bfa] transition-colors">${nextArticle.title}</span>
      </a>`;
  }
  paginationHtml += '</div>';

  return `<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | HENU OS Documentation</title>
  <meta name="description" content="${summary || 'Official documentation for HENU OS PRIVATE LIMITED software distribution and management platform.'}">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="assets/henu-logo.png">
  
  <!-- Tailwind CSS & GitHub Primer Typography -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              purple: '#6D4AFF',
              dark: '#5B37EB',
              lavender: '#DCD5FF',
              surface: '#F7F7FB',
              ink: '#171329',
            }
          }
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>

  <style>
    :root {
      --color-canvas-default: #ffffff;
      --color-canvas-subtle: #f6f8fa;
      --color-border-default: #d0d7de;
      --color-fg-default: #1f2328;
      --color-fg-muted: #656d76;
    }
    .dark {
      --color-canvas-default: #0d1117;
      --color-canvas-subtle: #161b22;
      --color-border-default: #30363d;
      --color-fg-default: #e6edf3;
      --color-fg-muted: #8b949e;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    code, pre {
      font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }
    /* Scrollbar styling */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background: #c1c7d0;
      border-radius: 4px;
    }
    .dark ::-webkit-scrollbar-thumb {
      background: #30363d;
    }
    /* Active TOC highlight */
    .toc-active {
      color: #6D4AFF !important;
      font-weight: 600;
      border-left: 2px solid #6D4AFF;
      padding-left: 0.5rem;
      margin-left: -0.75rem;
    }
    .dark .toc-active {
      color: #a78bfa !important;
      border-left-color: #a78bfa;
    }
  </style>

  <script>
    // Theme initialization (prevent flicker)
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  </script>
</head>
<body class="bg-white dark:bg-[#0d1117] text-slate-800 dark:text-[#e6edf3] antialiased min-h-screen flex flex-col transition-colors duration-200">

  <!-- TOP NAVIGATION HEADER (GitHub Docs style) -->
  <header class="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#30363d]">
    <div class="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      
      <!-- Logo & Product Brand -->
      <div class="flex items-center gap-4 min-w-0">
        <!-- Mobile hamburger -->
        <button onclick="toggleMobileMenu()" class="lg:hidden p-2 rounded-lg text-slate-600 dark:text-[#8b949e] hover:bg-slate-100 dark:hover:bg-[#161b22]">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="21"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        <a href="index.html" class="flex items-center gap-3 group">
          <div class="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-slate-200 dark:border-[#30363d] shadow-2xs group-hover:border-[#6D4AFF] transition-colors">
            <img src="assets/henu-logo.png" alt="HENU OS" class="w-full h-full object-contain" onerror="this.src='https://placehold.co/32x32/6D4AFF/white?text=H'">
          </div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-sm tracking-tight text-slate-900 dark:text-[#f0f6fc]">HENU OS</span>
            <span class="text-slate-300 dark:text-[#30363d]">/</span>
            <span class="text-xs font-semibold text-slate-600 dark:text-[#8b949e]">Docs</span>
          </div>
        </a>

        <!-- Version Selector -->
        <div class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-[#161b22] text-[#6D4AFF] dark:text-[#a78bfa] border border-slate-200 dark:border-[#30363d]">
          <span>v1.2.0</span>
          <span class="text-[9px] px-1 py-0.2 rounded bg-[#6D4AFF] text-white">PROD</span>
        </div>
      </div>

      <!-- Center Spotlight Search Trigger -->
      <div class="flex-1 max-w-lg mx-2 hidden md:block">
        <button onclick="openSearchModal()" class="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 dark:text-[#8b949e] bg-slate-50 dark:bg-[#161b22] hover:bg-slate-100 dark:hover:bg-[#21262d] border border-slate-200 dark:border-[#30363d] rounded-lg transition-all shadow-2xs group">
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <span>Search documentation...</span>
          </span>
          <kbd class="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-[#8b949e] bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-[#30363d] rounded shadow-2xs">Ctrl K</kbd>
        </button>
      </div>

      <!-- Right Navigation Actions -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Search icon for mobile -->
        <button onclick="openSearchModal()" class="md:hidden p-2 text-slate-600 dark:text-[#8b949e] hover:bg-slate-100 dark:hover:bg-[#161b22] rounded-lg">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>

        <a href="https://github.com/henu-os" target="_blank" rel="noreferrer" class="p-2 text-slate-500 hover:text-slate-900 dark:text-[#8b949e] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#161b22] rounded-lg transition-colors" title="GitHub Repositories">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>

        <!-- Dark/Light Theme Toggle -->
        <button id="themeToggleBtn" onclick="toggleTheme()" class="p-2 text-slate-500 hover:text-slate-900 dark:text-[#8b949e] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#161b22] rounded-lg transition-colors" title="Toggle color theme">
          <svg id="sunIcon" class="w-5 h-5 hidden dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <svg id="moonIcon" class="w-5 h-5 block dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>

        <a href="CORPORATE_SUPPORT.html" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#6D4AFF] text-white hover:bg-[#5B37EB] transition-colors shadow-2xs">
          <span>Support Desk</span>
        </a>
      </div>
    </div>
  </header>

  <!-- MOBILE SIDEBAR OVERLAY -->
  <div id="mobileDrawer" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs hidden lg:hidden" onclick="toggleMobileMenu()">
    <div class="w-80 max-w-[85%] h-full bg-white dark:bg-[#0d1117] p-6 overflow-y-auto border-r border-slate-200 dark:border-[#30363d]" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-[#30363d]">
        <div class="flex items-center gap-2">
          <img src="assets/henu-logo.png" alt="HENU OS" class="w-6 h-6 object-contain">
          <span class="font-bold text-sm text-slate-900 dark:text-[#f0f6fc]">HENU Docs</span>
        </div>
        <button onclick="toggleMobileMenu()" class="p-1 text-slate-400 hover:text-slate-600">✕</button>
      </div>
      <nav>${navHtml}</nav>
    </div>
  </div>

  <!-- MAIN 3-COLUMN CONTENT WRAPPER -->
  <div class="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex py-6 gap-8">
    
    <!-- LEFT SIDEBAR NAVIGATION (Desktop) -->
    <aside class="w-64 flex-shrink-0 hidden lg:block sticky top-22 self-start max-h-[calc(100vh-6.5rem)] overflow-y-auto pr-3">
      <nav id="desktopNav" class="text-xs">
        ${navHtml}
      </nav>
    </aside>

    <!-- CENTER ARTICLE CONTENT -->
    <main class="flex-1 min-w-0 max-w-4xl">
      
      <!-- Breadcrumb Bar -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 dark:text-[#8b949e] mb-4 font-medium">
        <a href="index.html" class="hover:text-[#6D4AFF] dark:hover:text-[#58a6ff] transition-colors">Docs</a>
        <span>/</span>
        <span class="text-slate-600 dark:text-[#c9d1d9] truncate">${title}</span>
      </nav>

      <!-- Article Header & Meta -->
      <div class="mb-8">
        <p class="text-sm text-slate-500 dark:text-[#8b949e] mt-1 leading-relaxed">${summary || ''}</p>
        <div class="flex items-center gap-4 text-xs text-slate-400 dark:text-[#8b949e] mt-3 pt-3 border-t border-slate-100 dark:border-[#21262d]">
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>Verified Production Spec</span>
          </span>
          <span>•</span>
          <span>HENU OS PRIVATE LIMITED</span>
        </div>
      </div>

      <!-- Rendered Article -->
      <article class="prose max-w-none text-slate-800 dark:text-[#c9d1d9] leading-relaxed">
        ${contentHtml}
      </article>

      <!-- Previous / Next Navigation Cards -->
      ${paginationHtml}

      <!-- Footer Info Bar -->
      <footer class="mt-14 pt-8 border-t border-slate-200 dark:border-[#30363d] text-xs text-slate-400 dark:text-[#8b949e] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          Official documentation for <strong class="text-slate-700 dark:text-[#c9d1d9]">HENU OS PRIVATE LIMITED</strong> (CIN: <code class="text-[11px]">U62099RJ2025PTC109150</code>)
        </div>
        <div class="flex items-center gap-4">
          <a href="CORPORATE_SUPPORT.html" class="hover:text-[#6D4AFF] dark:hover:text-[#58a6ff] transition-colors">Governance & Legal</a>
          <span>•</span>
          <a href="https://www.henuos.in/" target="_blank" rel="noreferrer" class="hover:text-[#6D4AFF] dark:hover:text-[#58a6ff] transition-colors">henuos.in</a>
        </div>
      </footer>
    </main>

    <!-- RIGHT SIDEBAR ("In this article") (Desktop) -->
    <aside class="w-56 flex-shrink-0 hidden xl:block self-start">
      ${tocHtml}
    </aside>
  </div>

  <!-- SPOTLIGHT SEARCH MODAL (Ctrl+K) -->
  <div id="searchModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden flex items-start justify-center pt-20 px-4" onclick="closeSearchModal(event)">
    <div class="w-full max-w-xl bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-2xl shadow-2xl overflow-hidden" onclick="event.stopPropagation()">
      <div class="flex items-center px-4 border-b border-slate-200 dark:border-[#30363d]">
        <svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="spotlightInput" placeholder="Search documentation, guides, and architectures..." oninput="runSpotlightSearch()" class="w-full bg-transparent px-3 py-3.5 text-sm text-slate-900 dark:text-[#f0f6fc] placeholder-slate-400 focus:outline-none">
        <kbd class="text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-[#30363d] px-1.5 py-0.5 rounded">ESC</kbd>
      </div>
      <div id="searchResults" class="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-[#21262d]">
        <div class="p-4 text-center text-xs text-slate-400">Type a keyword to search all HENU platform documentation...</div>
      </div>
    </div>
  </div>

  <!-- CLIENT-SIDE INTERACTIVITY SCRIPT -->
  <script>
    // Initialize Mermaid
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({
        startOnLoad: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
        securityLevel: 'loose',
      });
    }

    // Theme toggle
    function toggleTheme() {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Copy Code button
    function copyCode(btn) {
      const code = btn.closest('.code-block').querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        const span = btn.querySelector('span');
        const origText = span.innerText;
        span.innerText = 'Copied!';
        btn.classList.add('text-emerald-500');
        setTimeout(() => {
          span.innerText = origText;
          btn.classList.remove('text-emerald-500');
        }, 2000);
      });
    }

    // Mobile Navigation Menu Toggle
    function toggleMobileMenu() {
      const drawer = document.getElementById('mobileDrawer');
      drawer.classList.toggle('hidden');
    }

    // Accordion Category Toggle
    function toggleNavCategory(btn) {
      const container = btn.nextElementSibling;
      const chevron = btn.querySelector('.chevron-icon');
      container.classList.toggle('hidden');
      chevron.classList.toggle('rotate-90');
    }

    // Scroll Spy for Table of Contents
    window.addEventListener('DOMContentLoaded', () => {
      const headings = document.querySelectorAll('main h2[id], main h3[id]');
      const tocLinks = document.querySelectorAll('.toc-link');

      if (headings.length > 0 && tocLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              tocLinks.forEach(link => {
                if (link.getAttribute('href') === '#' + id) {
                  link.classList.add('toc-active');
                } else {
                  link.classList.remove('toc-active');
                }
              });
            }
          });
        }, { rootMargin: '0px 0px -70% 0px' });

        headings.forEach(h => observer.observe(h));
      }
    });

    // Spotlight Search System (Ctrl+K)
    const searchDocs = ${JSON.stringify(flatArticles)};

    function openSearchModal() {
      const modal = document.getElementById('searchModal');
      modal.classList.remove('hidden');
      const input = document.getElementById('spotlightInput');
      input.value = '';
      input.focus();
      runSpotlightSearch();
    }

    function closeSearchModal(e) {
      document.getElementById('searchModal').classList.add('hidden');
    }

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      if (e.key === 'Escape') {
        closeSearchModal();
      }
    });

    function runSpotlightSearch() {
      const query = document.getElementById('spotlightInput').value.trim().toLowerCase();
      const resultsContainer = document.getElementById('searchResults');
      
      if (!query) {
        resultsContainer.innerHTML = '<div class="p-4 text-center text-xs text-slate-400">Type a keyword to search all HENU platform documentation...</div>';
        return;
      }

      const matches = searchDocs.filter(d => 
        d.title.toLowerCase().includes(query) || 
        d.summary.toLowerCase().includes(query) ||
        d.categoryName.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = '<div class="p-4 text-center text-xs text-slate-400">No matching articles found for "' + query + '"</div>';
        return;
      }

      let html = '';
      matches.forEach(item => {
        const url = item.id === 'README' ? 'index.html' : item.id + '.html';
        html += '<a href="' + url + '" class="block p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#21262d] transition-colors">' +
          '<div class="flex items-center justify-between">' +
            '<span class="text-xs font-semibold text-slate-900 dark:text-[#f0f6fc]">' + item.title + '</span>' +
            '<span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#30363d] text-slate-500 dark:text-[#8b949e]">' + item.categoryName + '</span>' +
          '</div>' +
          '<p class="text-[11px] text-slate-500 dark:text-[#8b949e] mt-1 line-clamp-1">' + item.summary + '</p>' +
        '</a>';
      });
      resultsContainer.innerHTML = html;
    }
  </script>
</body>
</html>`;
}

// Generate Custom 404 page for Netlify
function render404Page() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found | HENU OS Documentation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-[#F7F7FB] text-[#171329] antialiased min-h-screen flex flex-col items-center justify-center p-6">
  <div class="max-w-md w-full bg-white rounded-2xl border border-slate-200/80 shadow-lg p-8 text-center">
    <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#F0EEFF] text-[#6D4AFF] flex items-center justify-center font-bold text-xl">404</div>
    <h1 class="text-xl font-bold text-slate-900 mb-2">Page Not Found</h1>
    <p class="text-xs text-slate-500 mb-6 leading-relaxed">The documentation article or resource you requested could not be found or may have been moved.</p>
    <div class="space-y-2">
      <a href="/index.html" class="block w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#6D4AFF] text-white hover:bg-[#5B37EB] transition-colors">Go to Documentation Home</a>
      <a href="/CORPORATE_SUPPORT.html" class="block w-full py-2.5 px-4 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">Corporate Support Desk</a>
    </div>
  </div>
</body>
</html>`;
}

// Build Execution
console.log('[Docs Portal Builder] Starting GitHub Docs UI compilation...');

let pagesGenerated = 0;
for (let i = 0; i < flatArticles.length; i++) {
  const item = flatArticles[i];
  const mdPath = path.join(rootDir, item.file);

  if (!fs.existsSync(mdPath)) {
    console.warn(`  [WARN] Source file missing: ${item.file}`);
    continue;
  }

  const mdContent = fs.readFileSync(mdPath, 'utf8');
  const { html, toc } = parseMarkdown(mdContent);
  const pageHtml = renderPage(item.id, item.title, item.summary, html, toc, i);

  const outFileName = item.id === 'README' ? 'index.html' : `${item.id}.html`;
  const outPath = path.join(distDir, outFileName);

  fs.writeFileSync(outPath, pageHtml, 'utf8');
  console.log(`  [GENERATED] ${outFileName} (${pageHtml.length} bytes) [TOC: ${toc.length} sections]`);
  pagesGenerated++;
}

// Generate 404.html
fs.writeFileSync(path.join(distDir, '404.html'), render404Page(), 'utf8');
console.log('  [GENERATED] 404.html');

// Generate Netlify _redirects file
const redirectsContent = `
# Netlify Redirects for HENU Hub Docs
/docs/*  /:splat  301
/docs    /index.html  301
/*       /404.html  404
`;
fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent.trim() + '\n', 'utf8');
console.log('  [GENERATED] _redirects for Netlify deployment');

console.log(`\n[Docs Portal Builder] Successfully compiled ${pagesGenerated} GitHub Docs style pages into ${distDir}`);
