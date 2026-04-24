import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticlesByTag, getAllTags } from "@/lib/articles";
import { categories, getCategoryByTag } from "@/lib/categories";
import Breadcrumb from "@/components/layout/Breadcrumb";

type Props = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const definedTags = categories.map((c) => c.tag);
  const contentTags = getAllTags();
  const allTags = Array.from(new Set([...definedTags, ...contentTags]));
  return allTags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const category = getCategoryByTag(decoded);
  return {
    title: category?.label ?? decoded,
    description: category?.description,
  };
}

const typeLabel: Record<string, string> = {
  articles: "記事",
  reviews: "レビュー",
  compare: "比較",
};


export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const category = getCategoryByTag(decoded);
  const articles = getAllArticlesByTag(decoded);

  return (
    <div>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "カテゴリ一覧", href: "/tags" }, { label: category?.label ?? decoded }]} />
      {/* カテゴリ説明 */}
      <div className="mb-10">
        <p className="text-xs text-gray-400 mb-1">カテゴリ</p>
        <h1 className="text-2xl font-bold mb-3">{category?.label ?? decoded}</h1>
        {category && (
          <p className="text-gray-600 text-sm leading-relaxed">{category.lead}</p>
        )}
      </div>

      {/* 記事一覧 */}
      {articles.length > 0 ? (
        <ul className="space-y-4 mb-12">
          {articles.map((article) => (
            <li key={`${article.type}-${article.slug}`}>
              <Link
                href={`/${article.type === "articles" ? "articles" : article.type}/${article.slug}`}
                className="group flex justify-between items-start border border-gray-200 rounded-xl p-4 hover:border-pink-300 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                      {typeLabel[article.type] ?? article.type}
                    </span>
                  </div>
                  <p className="font-medium text-sm group-hover:text-pink-600 transition-colors mb-1">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-500">{article.description}</p>
                </div>
                <time className="text-xs text-gray-400 shrink-0 ml-4 mt-0.5">
                  {article.date}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm mb-12">このカテゴリの記事はまだありません。</p>
      )}

      {/* 関連カテゴリ */}
      {category?.related && category.related.length > 0 && (
        <div>
          <h2 className="text-base font-semibold mb-3">関連カテゴリ</h2>
          <div className="flex flex-wrap gap-2">
            {category.related.map((relTag) => {
              const rel = getCategoryByTag(relTag);
              return (
                <Link
                  key={relTag}
                  href={`/tags/${encodeURIComponent(relTag)}`}
                  className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:border-pink-300 hover:text-pink-600 transition-colors"
                >
                  {rel?.label ?? relTag}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
