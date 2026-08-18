import { getAllArticles, type ArticleMetaWithType } from "@/lib/articles";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-kanojo-navi.com";
const siteName = "AI彼女ナビ";

const TYPE_PATH: Record<string, string> = {
  articles: "articles",
  reviews: "reviews",
  compare: "compare",
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

export async function GET() {
  const items: ArticleMetaWithType[] = (["articles", "reviews", "compare"] as const)
    .flatMap((type) => getAllArticles(type).map((a) => ({ ...a, type })))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 30);

  const itemsXml = items
    .map((item) => {
      const url = `${siteUrl}/${TYPE_PATH[item.type]}/${item.slug}`;
      const pubDate = toRfc822(item.updatedAt ?? item.date);
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <link>${siteUrl}</link>
    <description>AI彼女・恋愛AIアプリの比較・レビュー・おすすめ情報サイト</description>
    <language>ja</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
