import { POSTS } from "@/content/blog";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
  })[character] ?? character);
}

export function GET() {
  const items = POSTS.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(`${post.published}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${SITE.name} ${SITE.brand} Writing</title>
    <link>${SITE.url}/blog</link>
    <description>Notes on software, systems, design, and the electrical trade.</description>
    <language>en</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
