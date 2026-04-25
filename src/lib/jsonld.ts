import type { FaqItem } from "./articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-kanojo-navi.com";
const siteName = "AI彼女ナビ";

export function articleJsonLd({
  title,
  description,
  date,
  updatedAt,
  path,
}: {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: updatedAt ?? date,
    url: `${siteUrl}${path}`,
    author: {
      "@type": "Person",
      name: "マツケン",
      url: siteUrl,
      image: `${siteUrl}/images/author/matsuken.png`,
    },
    publisher: { "@type": "Organization", name: siteName },
  };
}

export function faqJsonLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
