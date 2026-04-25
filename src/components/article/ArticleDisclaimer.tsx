export default function ArticleDisclaimer({ date }: { date: string }) {
  return (
    <div className="border-t border-gray-100 pt-6 mt-2 mb-10 text-xs text-gray-400 space-y-1">
      <p>※ 本記事の情報は {date} 時点のものです。料金・機能・仕様は予告なく変更される場合があります。</p>
      <p>※ 掲載内容は個人による体験・調査に基づく感想であり、各サービスの品質を保証するものではありません。</p>
      <p>※ 各サービスの商標・ロゴはそれぞれの権利者に帰属します。</p>
    </div>
  );
}
