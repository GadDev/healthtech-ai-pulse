import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) =>
  new Response(
    import.meta.env.SITE_URL
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`
      : 'User-agent: *\nDisallow: /\n',
  );
