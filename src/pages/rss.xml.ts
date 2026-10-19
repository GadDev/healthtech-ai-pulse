import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
const escape = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!,
  );
export const GET: APIRoute = async ({ site }) => {
  const stories = (await getCollection('stories', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const items = stories
    .map((story) => {
      const link = new URL(`/stories/${story.id}/`, site).href;
      return `<item><title>${escape(story.data.title)}</title><description>${escape(story.data.description)}</description><link>${escape(link)}</link><guid>${escape(link)}</guid><pubDate>${story.data.date.toUTCString()}</pubDate></item>`;
    })
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel><title>HealthTech AI Pulse</title><link>${escape(site!.href)}</link><description>Evidence-led healthcare AI intelligence.</description><language>en</language>${items}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
};
