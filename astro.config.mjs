import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://healthtech-ai-pulse.web.app';
const url = new URL(site);
if (
  !['http:', 'https:'].includes(url.protocol) ||
  url.username ||
  url.password ||
  url.pathname !== '/' ||
  url.search ||
  url.hash
) {
  throw new Error(
    'SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment.',
  );
}

export default defineConfig({ site: url.origin, base: '/', integrations: [mdx(), sitemap()] });
