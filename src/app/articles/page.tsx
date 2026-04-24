import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "AI彼女・恋愛AIに関する記事の一覧です。",
};

export default function ArticlesPage() {
  const articles = getAllArticles("articles");
  return (
    <div>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "記事一覧" }]} />
      <h1 className="text-2xl font-bold mb-6">記事一覧</h1>
      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.slug} className="border-b pb-6">
            <Link href={`/articles/${article.slug}`} className="group block mb-2">
              <p className="font-medium text-lg group-hover:text-pink-600 transition-colors">
                {article.title}
              </p>
              <p className="text-sm text-gray-500 mt-1">{article.description}</p>
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-gray-400">{article.date}</span>
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
      </ul>
    </div>
  );
}
