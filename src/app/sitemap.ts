import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-kanojo-navi.com";

function latestLastMod(articles: { date: string; updatedAt?: string }[]): string | undefined {
  const dates = articles.map((a) => a.updatedAt ?? a.date);
  return dates.sort().at(-1);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles("articles");
  const reviews = getAllArticles("reviews");
  const compares = getAllArticles("compare");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1.0, lastModified: latestLastMod(articles) },
    { url: `${siteUrl}/articles`, changeFrequency: "weekly", priority: 0.8, lastModified: latestLastMod(articles) },
    { url: `${siteUrl}/reviews`, changeFrequency: "weekly", priority: 0.8, lastModified: latestLastMod(reviews) },
    { url: `${siteUrl}/compare`, changeFrequency: "weekly", priority: 0.8, lastModified: latestLastMod(compares) },
    { url: `${siteUrl}/tags`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const articlePages = articles.map((a) => ({
    url: `${siteUrl}/articles/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: a.updatedAt ?? a.date,
  }));

  const reviewPages = reviews.map((a) => ({
    url: `${siteUrl}/reviews/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: a.updatedAt ?? a.date,
  }));

  const comparePages = compares.map((a) => ({
    url: `${siteUrl}/compare/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: a.updatedAt ?? a.date,
  }));

  return [...staticPages, ...articlePages, ...reviewPages, ...comparePages];
}
