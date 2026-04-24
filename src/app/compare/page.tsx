import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "比較記事一覧",
  description: "AI彼女・恋愛AIアプリの比較記事まとめ。サービス間の違いを分かりやすく解説します。",
};

export default function ComparePage() {
  const articles = getAllArticles("compare");

  return (
    <div>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "比較記事一覧" }]} />
      <h1 className="text-2xl font-bold mb-2">比較記事一覧</h1>
      <p className="text-gray-500 text-sm mb-8">
        AI彼女アプリをサービス別・目的別に比較しています。
      </p>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug} className="border border-gray-200 rounded-xl p-5 hover:border-pink-300 transition-colors">
            <Link href={`/compare/${article.slug}`} className="group block mb-2">
              <p className="font-medium group-hover:text-pink-600 transition-colors mb-1">
                {article.title}
              </p>
              <p className="text-sm text-gray-500">{article.description}</p>
            </Link>
            <div className="flex items-center gap-3">
              <time className="text-xs text-gray-400">{article.date}</time>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded hover:bg-pink-50 hover:text-pink-600 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </li>
        ))}
        {articles.length === 0 && (
          <p className="text-gray-500 text-sm">比較記事はまだありません。</p>
        )}
      </ul>
    </div>
  );
}
