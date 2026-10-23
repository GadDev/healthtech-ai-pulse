// robots.txt endpoint — generates allow/disallow based on SITE_URL presence.
// When SITE_URL is unset (local dev), returns Disallow: / to signal noindex.
// When SITE_URL is set (production), returns Allow: / with sitemap reference.
// Per DAILY_ISSUE.md and EDITORIAL.md: local dev omits canonical tags and signals noindex.
import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) =>
  new Response(
    import.meta.env.SITE_URL
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`
      : 'User-agent: *\nDisallow: /\n',
  );
