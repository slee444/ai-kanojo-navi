import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import type { ReviewFrontmatter } from "@/lib/articles";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "レビュー一覧",
  description: "AI彼女・恋愛AIアプリの実体験レビュー一覧。評価・メリット・デメリットを正直に紹介します。",
};

export default function ReviewsPage() {
  const reviews = getAllArticles("reviews") as (ReviewFrontmatter & { slug: string })[];

  return (
    <div>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "レビュー一覧" }]} />
      <h1 className="text-2xl font-bold mb-2">レビュー一覧</h1>
      <p className="text-gray-500 text-sm mb-8">実際に使った正直なレビューをまとめています。</p>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.slug} className="border border-gray-200 rounded-xl p-4 hover:border-pink-300 transition-colors">
            <div className="flex gap-4">
              <div className="flex-1">
                <Link href={`/reviews/${review.slug}`} className="group block mb-2">
                  <p className="font-medium group-hover:text-pink-600 transition-colors mb-1">
                    {review.title}
                  </p>
                  <p className="text-sm text-gray-500">{review.description}</p>
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{review.date}</span>
                  {review.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              {"rating" in review && (
                <div className="shrink-0 text-center">
                  <p className="text-2xl font-bold text-pink-600">{review.rating.overall}</p>
                  <p className="text-xs text-gray-400">/ 5.0</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
