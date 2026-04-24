import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import type { ArticleMeta } from "@/lib/articles";

const categories = [
  {
    label: "おすすめ",
    description: "初心者向けのおすすめAI彼女アプリ",
    href: "/articles",
    emoji: "⭐",
  },
  {
    label: "比較",
    description: "サービスを横断して比較・検討",
    href: "/compare",
    emoji: "📊",
  },
  {
    label: "レビュー",
    description: "実際に使った正直なレビュー",
    href: "/reviews",
    emoji: "📝",
  },
  {
    label: "性格別",
    description: "タイプ別・ニーズ別で探す",
    href: "/tags",
    emoji: "💬",
  },
];

export default function Home() {
  const articles = getAllArticles("articles");
  const recent = articles.slice(0, 5);
  const compareArticles = getAllArticles("compare").slice(0, 2) as ArticleMeta[];

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="py-10 text-center">
        <h1 className="text-3xl font-bold mb-3">
          あなたに合うAI彼女が見つかる
        </h1>
        <p className="text-gray-500 mb-6">
          AI彼女・恋愛AIアプリの比較・レビュー・おすすめ情報サイト
        </p>
        <Link
          href="/articles"
          className="inline-block bg-pink-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
        >
          おすすめ記事を見る
        </Link>
      </section>

      {/* カテゴリ導線 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">カテゴリから探す</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="border border-gray-200 rounded-lg p-4 hover:border-pink-300 hover:bg-pink-50 transition-colors"
            >
              <div className="text-2xl mb-1">{cat.emoji}</div>
              <div className="font-medium text-sm">{cat.label}</div>
              <div className="text-xs text-gray-500 mt-1">{cat.description}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 比較記事ピックアップ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">比較記事</h2>
          <Link href="/compare" className="text-sm text-pink-600 hover:underline">
            もっと見る →
          </Link>
        </div>
        <ul className="space-y-3">
          {compareArticles.map((article) => (
            <li key={article.slug} className="border border-gray-200 rounded-lg p-4">
              <Link href={`/compare/${article.slug}`} className="group block">
                <p className="font-medium group-hover:text-pink-600 transition-colors">
                  {article.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">{article.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 新着記事 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">新着記事</h2>
          <Link href="/articles" className="text-sm text-pink-600 hover:underline">
            もっと見る →
          </Link>
        </div>
        <ul className="divide-y divide-gray-100">
          {recent.map((article) => (
            <li key={article.slug} className="py-4">
              <Link href={`/articles/${article.slug}`} className="group flex justify-between items-start gap-4">
                <div>
                  <p className="font-medium text-sm group-hover:text-pink-600 transition-colors">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{article.description}</p>
                </div>
                <time className="text-xs text-gray-400 shrink-0">{article.date}</time>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="border border-gray-200 rounded-lg p-6 text-center">
        <p className="font-medium mb-2">まだ迷っていますか？</p>
        <p className="text-sm text-gray-500 mb-4">
          初心者には比較記事から読むのがおすすめです。
        </p>
        <Link
          href="/compare"
          className="inline-block border border-pink-600 text-pink-600 text-sm font-medium px-5 py-2 rounded-lg hover:bg-pink-50 transition-colors"
        >
          比較記事を読む
        </Link>
      </section>
    </div>
  );
}
