import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-kanojo-navi.com";

function section(title: string, type: "articles" | "reviews" | "compare") {
  const items = getAllArticles(type);
  const lines = items.map((a) => `- [${a.title}](${siteUrl}/${type}/${a.slug}): ${a.description}`);
  return `## ${title}\n\n${lines.join("\n")}`;
}

export async function GET() {
  const body = `# AI彼女ナビ

> AI彼女・恋愛AIアプリの比較・レビュー・おすすめ情報サイト。国内外のAIチャット/AIコンパニオンサービスについて、機能・料金・日本語対応の実態を一次情報に基づいて解説しています。

このサイトは日本語で書かれており、主な対象読者は「AI彼女・AI彼氏・AI会話アプリ」を検討している日本のユーザーです。各サービスの料金・仕様は公式サイトやApp Store/Google Playの公式リスティングを一次情報として記載しており、変更される可能性があるため最新情報は各サービスの公式ページでの確認を推奨します。

${section("おすすめ・解説記事", "articles")}

${section("個別サービスレビュー", "reviews")}

${section("サービス比較", "compare")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
