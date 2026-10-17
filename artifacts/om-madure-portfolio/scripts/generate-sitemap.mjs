import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const projectFile = await readFile(resolve(root, 'src/data/projects.ts'), 'utf8');
const slugs = [...projectFile.matchAll(/slug:\s*'([^']+)'/g)].map(match => match[1]);
const site = (process.env.SITE_URL || 'https://YOUR_PORTFOLIO_DOMAIN').replace(/\/$/, '');
const routes = ['/', ...slugs.map(slug => `/projects/${slug}`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${site}${route === '/' ? '/' : route}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(resolve(root, 'public/sitemap.xml'), sitemap);
