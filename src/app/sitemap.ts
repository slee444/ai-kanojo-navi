import type { MetadataRoute } from "next";
import { getArticleSlugs } from "@/lib/articles";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-kanojo-navi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articleSlugs = getArticleSlugs("articles");
  const reviewSlugs = getArticleSlugs("reviews");
  const compareSlugs = getArticleSlugs("compare");

  const staticPages = ["/", "/articles", "/reviews", "/compare", "/tags"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1.0 : 0.8,
    })
  );

  const articlePages = articleSlugs.map((slug) => ({
    url: `${siteUrl}/articles/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const reviewPages = reviewSlugs.map((slug) => ({
    url: `${siteUrl}/reviews/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparePages = compareSlugs.map((slug) => ({
    url: `${siteUrl}/compare/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...reviewPages, ...comparePages];
}
