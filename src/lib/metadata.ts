import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-kanojo-navi.com";
const siteName = "AI彼女ナビ";
const defaultDescription = "AI彼女・恋愛AIアプリの比較・レビュー・おすすめ情報サイト";

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "",
  slug,
}: {
  title: string;
  description?: string;
  path?: string;
  slug?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const ogpImage = slug
    ? `${siteUrl}/images/ogp/${slug}.png`
    : `${siteUrl}/images/ogp/default.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "ja_JP",
      type: "article",
      images: [{ url: ogpImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogpImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
