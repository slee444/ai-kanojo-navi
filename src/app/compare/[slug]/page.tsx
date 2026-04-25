import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getArticleBySlug,
  getArticleSlugs,
  getRelatedArticles,
  type CompareFrontmatter,
} from "@/lib/articles";
import { buildMetadata } from "@/lib/metadata";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { articleJsonLd, faqJsonLd } from "@/lib/jsonld";
import AuthorCard from "@/components/author/AuthorCard";
import ArticleDisclaimer from "@/components/article/ArticleDisclaimer";
import ConversationExample from "@/components/article/ConversationExample";

const mdxComponents = { ConversationExample };

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getArticleSlugs("compare").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { meta } = getArticleBySlug("compare", slug);
  return buildMetadata({ title: meta.title, description: meta.description, path: `/compare/${slug}`, slug });
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const { meta: rawMeta, content } = getArticleBySlug("compare", slug);
  const meta = rawMeta as unknown as CompareFrontmatter & { slug: string };
  const related = getRelatedArticles({ type: "compare", slug, tags: meta.tags });

  return (
    <article className="max-w-2xl mx-auto">
      <JsonLd data={articleJsonLd({ title: meta.title, description: meta.description, date: meta.date, updatedAt: meta.updatedAt, path: `/compare/${slug}` })} />
      {meta.faq && meta.faq.length > 0 && <JsonLd data={faqJsonLd(meta.faq)} />}
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "比較記事一覧", href: "/compare" }, { label: meta.title }]} />
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex gap-2 mb-3">
          {meta.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
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

      {/* サービス概要カード */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {meta.services.map((service) => (
          <div key={service.name} className="border border-gray-200 rounded-xl p-4 text-center">
            <p className="font-bold text-base mb-1">{service.name}</p>
            <p className="text-2xl font-bold text-pink-600 mb-1">{service.rating}</p>
            <p className="text-xs text-gray-400 mb-3">/ 5.0</p>
            <dl className="text-xs text-left space-y-1 mb-4">
              <div className="flex justify-between">
                <dt className="text-gray-500">無料プラン</dt>
                <dd>{service.free ? "あり" : "なし"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">有料プラン</dt>
                <dd>{service.priceFrom}〜</dd>
              </div>
            </dl>
            {service.affiliateUrl ? (
              <a
                href={service.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs font-medium bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                {service.name} を試す →
              </a>
            ) : (
              <span className="block text-xs font-medium bg-gray-200 text-gray-400 py-2 rounded-lg cursor-not-allowed">
                試してみる →
              </span>
            )}
          </div>
        ))}
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

      {/* 導入文・本文 */}
      <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-a:text-pink-600 mb-8">
        <MDXRemote source={content} components={mdxComponents} options={{ blockJS: false }} />
      </div>

      <AuthorCard />
      <ArticleDisclaimer date={meta.updatedAt ?? meta.date} />

      {/* 比較表 */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4" id="table">比較表</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 font-medium text-gray-500 border border-gray-200 w-1/3">
                  項目
                </th>
                {meta.services.map((s) => (
                  <th
                    key={s.name}
                    className="text-center p-3 font-semibold border border-gray-200"
                  >
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {meta.compareTable.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 text-gray-600 border border-gray-200">{row.item}</td>
                  {row.values.map((val, j) => (
                    <td
                      key={j}
                      className="p-3 text-center border border-gray-200 font-medium"
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 向いている人 */}
      <div className="mb-10" id="best-for">
        <h2 className="text-lg font-semibold mb-4">向いている人</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {meta.bestFor.map((item) => (
            <div key={item.service} className="border border-gray-200 rounded-xl p-4">
              <p className="font-semibold text-sm text-pink-600 mb-1">{item.service}</p>
              <p className="text-sm text-gray-600">{item.who}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 結論 */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-10" id="verdict">
        <h2 className="text-base font-semibold mb-2">結論</h2>
        <p className="text-sm font-medium text-pink-600 mb-1">
          おすすめ: {meta.verdict.winner}
        </p>
        <p className="text-sm text-gray-600">{meta.verdict.reason}</p>
      </div>

      {/* 合わせて読みたい */}
      {related.filter((a) => a.type !== "compare").length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">合わせて読みたい</p>
          <ul className="space-y-2">
            {related.filter((a) => a.type !== "compare").slice(0, 2).map((a) => (
              <li key={`${a.type}-${a.slug}`}>
                <Link
                  href={`/${a.type}/${a.slug}`}
                  className="group flex items-center gap-2 text-sm text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded shrink-0">
                    {a.type === "reviews" ? "レビュー" : "記事"}
                  </span>
                  <span className="group-hover:underline">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="border border-pink-200 bg-pink-50 rounded-xl p-6 text-center mb-12">
        <p className="font-semibold mb-1">まずは無料で試してみませんか？</p>
        <p className="text-sm text-gray-500 mb-4">気になったサービスから始めてみましょう。</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {meta.services.map((service) =>
            service.affiliateUrl ? (
              <a
                key={service.name}
                href={service.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-pink-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-pink-700 transition-colors"
              >
                {service.name} を試す →
              </a>
            ) : (
              <span
                key={service.name}
                className="inline-block bg-gray-200 text-gray-400 text-sm font-medium px-5 py-2.5 rounded-lg cursor-not-allowed"
              >
                {service.name} を試す →
              </span>
            )
          )}
        </div>
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

      {/* 関連比較記事 */}
      {related.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">他の比較記事</h2>
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
