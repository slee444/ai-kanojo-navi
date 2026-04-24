import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "カテゴリ一覧",
  description: "AI彼女・恋愛AIのカテゴリ別記事一覧。おすすめ・比較・レビュー・性格別など目的に合わせて探せます。",
};

export default function TagsPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "カテゴリ一覧" }]} />
      <h1 className="text-2xl font-bold mb-2">カテゴリ一覧</h1>
      <p className="text-gray-500 text-sm mb-8">目的に合わせてカテゴリから記事を探せます。</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {categories.map((cat) => (
          <Link
            key={cat.tag}
            href={`/tags/${encodeURIComponent(cat.tag)}`}
            className="group border border-gray-200 rounded-xl p-5 hover:border-pink-300 transition-colors"
          >
            <p className="font-semibold group-hover:text-pink-600 transition-colors mb-1">
              {cat.label}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">{cat.lead}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
