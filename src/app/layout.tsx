import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-kanojo-navi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI彼女ナビ",
    template: "%s | AI彼女ナビ",
  },
  description: "AI彼女・恋愛AIアプリの比較・レビュー・おすすめ情報サイト",
  openGraph: {
    siteName: "AI彼女ナビ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "BGX4gnX880zWAi9-VHIecg_SCwvtxOfkAecGpGnuQiw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="alternate" type="application/rss+xml" title="AI彼女ナビ RSSフィード" href="/feed.xml" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5W7WDSBY4B" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5W7WDSBY4B');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col text-gray-900 bg-white">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
