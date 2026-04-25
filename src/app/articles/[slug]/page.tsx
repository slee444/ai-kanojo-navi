import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getArticleSlugs, getRelatedArticles } from "@/lib/articles";
import { buildMetadata } from "@/lib/metadata";
import CtaBox from "@/components/article/CtaBox";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { articleJsonLd, faqJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getArticleSlugs("articles").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { meta } = getArticleBySlug("articles", slug);
  return buildMetadata({ title: meta.title, description: meta.description, path: `/articles/${slug}`, slug });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const { meta, content } = getArticleBySlug("articles", slug);
  const related = getRelatedArticles({ type: "articles", slug, tags: meta.tags });

  return (
    <article className="max-w-2xl mx-auto">
      <JsonLd data={articleJsonLd({ title: meta.title, description: meta.description, date: meta.date, updatedAt: meta.updatedAt, path: `/articles/${slug}` })} />
      {meta.faq && meta.faq.length > 0 && <JsonLd data={faqJsonLd(meta.faq)} />}
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "記事一覧", href: "/articles" }, { label: meta.title }]} />
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

      {/* アイキャッチ領域 */}
      <div aria-hidden="true" className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl h-48 flex items-center justify-center mb-8 text-gray-400 text-sm">
        アイキャッチ画像
      </div>

      {/* 目次 */}
      {meta.toc && meta.toc.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-5 mb-8">
          <p className="font-semibold text-sm mb-3">目次</p>
          <ol className="space-y-1.5">
            {meta.toc.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-pink-600 hover:underline"
                >
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* 本文 */}
      <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-a:text-pink-600 prose-table:text-sm mb-12">
        <MDXRemote source={content} />
      </div>

      {/* 合わせて読みたい */}
      {related.filter((a) => a.type !== "articles").length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">合わせて読みたい</p>
          <ul className="space-y-2">
            {related.filter((a) => a.type !== "articles").slice(0, 2).map((a) => (
              <li key={`${a.type}-${a.slug}`}>
                <Link
                  href={`/${a.type}/${a.slug}`}
                  className="group flex items-center gap-2 text-sm text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded shrink-0">
                    {a.type === "reviews" ? "レビュー" : "比較"}
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
          title="他のAI彼女アプリも比較してみませんか？"
          description="人気サービスを一覧で比較できます。"
          buttonLabel="比較記事を読む"
          href="/compare"
          note="※ 外部サービスへのリンクです"
        />
      </div>

      {/* FAQセクション */}
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

      {/* 関連記事 */}
      {related.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">関連記事</h2>
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
