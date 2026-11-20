const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const port = process.env.PORT || 4000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  let filePath = path.join(distDir, reqPath);

  // If path is a directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Support clean URLs without .html
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (!fs.existsSync(filePath)) {
    const notFoundPage = path.join(distDir, '404.html');
    if (fs.existsSync(notFoundPage)) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(notFoundPage));
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1><p>Documentation page does not exist.</p>');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(content);
});

server.listen(port, () => {
  console.log(`[HENU Hub Docs] Documentation Portal is serving at http://localhost:${port}`);
});
