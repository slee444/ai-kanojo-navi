import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getArticleBySlug,
  getArticleSlugs,
  getRelatedArticles,
  type ReviewFrontmatter,
} from "@/lib/articles";
import { buildMetadata } from "@/lib/metadata";
import ConversationExample from "@/components/article/ConversationExample";
import CtaBox from "@/components/article/CtaBox";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { articleJsonLd, faqJsonLd } from "@/lib/jsonld";
import AuthorCard from "@/components/author/AuthorCard";

const mdxComponents = { ConversationExample };

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getArticleSlugs("reviews").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { meta } = getArticleBySlug("reviews", slug);
  return buildMetadata({ title: meta.title, description: meta.description, path: `/reviews/${slug}`, slug });
}

function RatingBar({ label, value }: { label: string; value: number }) {
  const pct = (value / 5) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-20 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div
          className="bg-pink-400 h-2 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium w-6 text-right">{value}</span>
    </div>
  );
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const { meta: rawMeta, content } = getArticleBySlug("reviews", slug);
  const meta = rawMeta as unknown as ReviewFrontmatter & { slug: string };
  const related = getRelatedArticles({ type: "reviews", slug, tags: meta.tags });

  return (
    <article className="max-w-2xl mx-auto">
      <JsonLd data={articleJsonLd({ title: meta.title, description: meta.description, date: meta.date, updatedAt: meta.updatedAt, path: `/reviews/${slug}` })} />
      {meta.faq && meta.faq.length > 0 && <JsonLd data={faqJsonLd(meta.faq)} />}
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "レビュー一覧", href: "/reviews" }, { label: meta.title }]} />
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex gap-2 mb-3">
          {meta.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="text-xs bg-pink-50 text-pink-600 px-2 py-0.5 rounded"
            >
              {tag}
            </Link>
          ))}
        </div>
        <h1 className="text-2xl font-bold leading-snug mb-3">{meta.title}</h1>
        <p className="text-gray-500 text-sm mb-3">{meta.description}</p>
        <div className="flex gap-4 text-xs text-gray-400">
          <span>公開: {meta.date}</span>
          {meta.updatedAt && <span>更新: {meta.updatedAt}</span>}
        </div>
      </div>

      {/* アイキャッチ */}
      <div aria-hidden="true" className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl h-48 flex items-center justify-center mb-8 text-gray-400 text-sm">
        アイキャッチ画像
      </div>

      {/* サービス情報 + 評価 */}
      <div className="border border-gray-200 rounded-xl p-5 mb-8 space-y-5">
        {/* サービス基本情報 */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">サービス情報</p>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <dt className="text-gray-500">無料プラン</dt>
            <dd>{meta.service.free ? "あり" : "なし"}</dd>
            <dt className="text-gray-500">有料プラン</dt>
            <dd>{meta.service.priceFrom}〜</dd>
            <dt className="text-gray-500">対応プラットフォーム</dt>
            <dd>{meta.service.platform.join(" / ")}</dd>
          </dl>
        </div>

        {/* 総合評価 */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">評価</p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl font-bold text-pink-600">{meta.rating.overall}</span>
            <span className="text-gray-400 text-sm">/ 5.0</span>
          </div>
          <div className="space-y-2">
            <RatingBar label="始めやすさ" value={meta.rating.ease} />
            <RatingBar label="日本語対応" value={meta.rating.japanese} />
            <RatingBar label="機能充実度" value={meta.rating.features} />
            <RatingBar label="コスパ" value={meta.rating.price} />
          </div>
        </div>

        {/* メリット・デメリット */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-green-600 mb-2">メリット</p>
            <ul className="space-y-1">
              {meta.pros.map((p, i) => (
                <li key={i} className="text-xs text-gray-700 flex gap-1">
                  <span className="text-green-500 shrink-0">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-500 mb-2">デメリット</p>
            <ul className="space-y-1">
              {meta.cons.map((c, i) => (
                <li key={i} className="text-xs text-gray-700 flex gap-1">
                  <span className="text-red-400 shrink-0">✗</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* アフィリエイトCTA */}
        <span className="block w-full text-center bg-gray-200 text-gray-400 text-sm font-medium py-3 rounded-lg cursor-not-allowed">
          {meta.service.name} を無料で試す →
        </span>
      </div>

      {/* 目次 */}
      {meta.toc && meta.toc.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-5 mb-8">
          <p className="font-semibold text-sm mb-3">目次</p>
          <ol className="space-y-1.5">
            {meta.toc.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-sm text-pink-600 hover:underline">
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* 本文 */}
      <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-a:text-pink-600 prose-table:text-sm mb-8">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      <AuthorCard />

      {/* 合わせて読みたい */}
      {related.filter((a) => a.type !== "reviews").length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">合わせて読みたい</p>
          <ul className="space-y-2">
            {related.filter((a) => a.type !== "reviews").slice(0, 2).map((a) => (
              <li key={`${a.type}-${a.slug}`}>
                <Link
                  href={`/${a.type}/${a.slug}`}
                  className="group flex items-center gap-2 text-sm text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded shrink-0">
                    {a.type === "compare" ? "比較" : "記事"}
                  </span>
                  <span className="group-hover:underline">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-12">
        <CtaBox
          title={`${meta.service.name} を試してみませんか？`}
          description="無料プランから始められます。"
          buttonLabel={`${meta.service.name} を無料で始める →`}
          note="※ アフィリエイトリンクを含む場合があります"
        />
      </div>

      {/* FAQ */}
      {meta.faq && meta.faq.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4">よくある質問</h2>
          <div className="space-y-4">
            {meta.faq.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-sm mb-2">Q. {item.q}</p>
                <p className="text-sm text-gray-600">A. {item.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 関連レビュー */}
      {related.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">他のレビューを見る</h2>
          <ul className="space-y-3">
            {related.map((article) => (
              <li key={`${article.type}-${article.slug}`}>
                <Link
                  href={`/${article.type}/${article.slug}`}
                  className="group flex justify-between items-center border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors"
                >
                  <p className="text-sm font-medium group-hover:text-pink-600 transition-colors">
                    {article.title}
                  </p>
                  <span className="text-gray-400 text-sm shrink-0 ml-3">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
