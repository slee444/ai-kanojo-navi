import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "免責事項",
  description: "AI彼女ナビの免責事項です。",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "免責事項" }]} />
      <h1 className="text-2xl font-bold mb-8">免責事項</h1>

      <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-a:text-pink-600">
        <h2>情報の正確性について</h2>
        <p>AI彼女ナビ（以下、「当サイト」）に掲載している情報は、可能な限り正確な情報を掲載するよう努めておりますが、その内容の正確性・完全性・有用性を保証するものではありません。掲載情報は予告なく変更・削除される場合があります。</p>

        <h2>損害について</h2>
        <p>当サイトの情報をご利用いただいたことにより生じた損害・トラブルについて、当サイトは一切の責任を負いかねます。ご利用はご自身の判断と責任のもとでお願いいたします。</p>

        <h2>外部リンクについて</h2>
        <p>当サイトからリンクしている外部サイトの内容については、当サイトは責任を負いません。リンク先のサービスの利用は、各サービスの利用規約・プライバシーポリシーをご確認のうえご利用ください。</p>

        <h2>アフィリエイトについて</h2>
        <p>当サイトは、各種アフィリエイトプログラムに参加しており、記事内に広告リンクを含む場合があります。リンク経由でサービスをご利用いただいた場合、当サイトに紹介料が発生することがありますが、掲載内容の公平性は保たれています。</p>

        <h2>著作権について</h2>
        <p>当サイトに掲載されているコンテンツ（文章・画像等）の著作権は当サイトに帰属します。無断転載・複製はお断りします。</p>

        <h2>免責事項の変更</h2>
        <p>当サイトは、必要に応じて本免責事項を変更することがあります。変更後の免責事項は、本ページに掲載した時点から効力を生じるものとします。</p>

        <p className="text-gray-400 text-xs mt-8">制定日：2026年4月</p>
      </div>
    </div>
  );
}
