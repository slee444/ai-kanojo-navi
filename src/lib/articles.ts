import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export type TocItem = { id: string; label: string };
export type FaqItem = { q: string; a: string };

export type Frontmatter = {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  tags: string[];
  toc?: TocItem[];
  faq?: FaqItem[];
};

export type ReviewRating = {
  overall: number;
  ease: number;
  japanese: number;
  features: number;
  price: number;
};

export type ReviewFrontmatter = Frontmatter & {
  service: {
    name: string;
    url: string;
    free: boolean;
    platform: string[];
    priceFrom: string;
  };
  rating: ReviewRating;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
};

export type CompareService = {
  name: string;
  affiliateUrl: string;
  free: boolean;
  priceFrom: string;
  rating: number;
};

export type CompareTableRow = {
  item: string;
  values: string[];
};

export type BestFor = {
  service: string;
  who: string;
};

export type CompareFrontmatter = Frontmatter & {
  services: CompareService[];
  compareTable: CompareTableRow[];
  verdict: { winner: string; reason: string };
  bestFor: BestFor[];
};

export type ArticleMeta = Frontmatter & { slug: string };
export type ArticleMetaWithType = ArticleMeta & { type: string };

const CONTENT_TYPES = ["articles", "reviews", "compare"] as const;

export function getArticleSlugs(type: string): string[] {
  const dir = path.join(contentRoot, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(
  type: string,
  slug: string
): { meta: ArticleMeta; content: string } {
  const filePath = path.join(contentRoot, type, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: { ...(data as Frontmatter), slug },
    content,
  };
}

export function getAllArticles(type: string): ArticleMeta[] {
  return getArticleSlugs(type)
    .map((slug) => getArticleBySlug(type, slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllArticlesByTag(tag: string): ArticleMetaWithType[] {
  return CONTENT_TYPES.flatMap((type) =>
    getAllArticles(type)
      .filter((a) => a.tags.includes(tag))
      .map((a) => ({ ...a, type }))
  ).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  CONTENT_TYPES.forEach((type) =>
    getAllArticles(type).forEach((a) => a.tags.forEach((t) => tagSet.add(t)))
  );
  return Array.from(tagSet).sort();
}

// スコアリング: 同カテゴリ=3点、タグ一致=1点/件、新着=タイブレーカー
export function getRelatedArticles(
  current: { type: string; slug: string; tags: string[] },
  limit = 3
): ArticleMetaWithType[] {
  return CONTENT_TYPES.flatMap((type) =>
    getAllArticles(type).map((a) => ({ ...a, type }))
  )
    .filter((a) => !(a.type === current.type && a.slug === current.slug))
    .map((a) => {
      const sameCategory = a.type === current.type ? 3 : 0;
      const tagMatch = a.tags.filter((t) => current.tags.includes(t)).length;
      return { article: a, score: sameCategory + tagMatch };
    })
    .sort((a, b) =>
      b.score !== a.score
        ? b.score - a.score
        : a.article.date < b.article.date
        ? 1
        : -1
    )
    .slice(0, limit)
    .map(({ article }) => article);
}
