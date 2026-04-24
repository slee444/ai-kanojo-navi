import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "AI彼女ナビのプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "プライバシーポリシー" }]} />
      <h1 className="text-2xl font-bold mb-8">プライバシーポリシー</h1>

      <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-a:text-pink-600">
        <p>AI彼女ナビ（以下、「当サイト」）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。</p>

        <h2>個人情報の収集について</h2>
        <p>当サイトでは、お問い合わせ等の際にお名前・メールアドレス等の個人情報をご提供いただく場合があります。取得した個人情報は、お問い合わせへの回答のみを目的として利用し、第三者への提供は行いません。</p>

        <h2>アクセス解析ツールについて</h2>
        <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用する場合があります。このツールはトラフィックデータの収集のためにCookieを使用しています。データは匿名で収集されており、個人を特定するものではありません。</p>

        <h2>広告・アフィリエイトについて</h2>
        <p>当サイトは、第三者配信の広告サービスおよびアフィリエイトプログラムを利用する場合があります。広告配信にCookieを使用することがあります。広告に関するCookieを無効にする場合は、ご使用のブラウザの設定をご確認ください。</p>

        <h2>Cookieについて</h2>
        <p>Cookieとは、ウェブサイトがブラウザに保存する小さなテキストファイルです。当サイトではアクセス解析・広告配信の目的でCookieを使用する場合があります。ブラウザの設定によりCookieを無効にすることができますが、一部機能が利用できなくなる場合があります。</p>

        <h2>免責事項</h2>
        <p>当サイトに掲載している情報は、可能な限り正確な情報を掲載するよう努めておりますが、正確性・安全性を保証するものではありません。掲載情報によって生じた損害について、当サイトは責任を負いかねます。</p>

        <h2>プライバシーポリシーの変更</h2>
        <p>当サイトは、必要に応じて本ポリシーの内容を変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。</p>

        <h2>お問い合わせ</h2>
        <p>本ポリシーに関するお問い合わせは、以下のメールアドレスまでご連絡ください。</p>
        <p>メール：matsuken.studio.work@gmail.com</p>

        <p className="text-gray-400 text-xs mt-8">制定日：2026年4月</p>
      </div>
    </div>
  );
}
