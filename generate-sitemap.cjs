const fs = require('fs');
const path = require('path');

const domain = 'https://dashboard.aidacorp.in/'; // Replace with your actual domain

// Only one "page" since it's a single-page app
const pages = ['']; // root path

// Ensure public folder exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${domain}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`
  )
  .join('')}
</urlset>
`;

// Write sitemap.xml
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('Sitemap generated ✅');
