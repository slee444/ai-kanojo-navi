export default function AuthorCard() {
  return (
    <div className="border border-gray-200 rounded-xl p-5 flex gap-4 items-start mb-10">
      <img
        src="/images/author/matsuken.png"
        alt="マツケン"
        width={64}
        height={64}
        className="rounded-full shrink-0 object-cover"
      />
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase mb-1">この記事を書いた人</p>
        <p className="font-bold text-sm mb-1">マツケン</p>
        <p className="text-xs text-pink-600 mb-2">AI彼女ナビ 編集長</p>
        <p className="text-xs text-gray-500 leading-relaxed">
          複数のAI恋愛・会話サービスを実際に使い比べ、日本語ユーザー目線でわかりやすくレビューしています。初心者でも迷わず選べる情報をお届けすることを目標にしています。
        </p>
      </div>
    </div>
  );
}
