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

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/icon`,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "ja",
  };
}

export function reviewJsonLd({
  serviceName,
  serviceUrl,
  ratingOverall,
  title,
  path,
}: {
  serviceName: string;
  serviceUrl: string;
  ratingOverall: number;
  title: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: serviceName,
      url: serviceUrl,
      applicationCategory: "LifestyleApplication",
    },
    name: title,
    url: `${siteUrl}${path}`,
    author: { "@type": "Person", name: "マツケン" },
    publisher: { "@type": "Organization", name: siteName },
    reviewRating: {
      "@type": "Rating",
      ratingValue: ratingOverall,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
