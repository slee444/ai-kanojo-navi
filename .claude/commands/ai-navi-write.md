# AI彼女ナビ 記事作成

$ARGUMENTS

上記のキーワード・テーマで記事を作成してください。引数がない場合は直前の `/ai-navi-keyword` の推薦内容を使ってください。

## 手順

1. `PROJECT.md` を読んでサイトの方針を確認する
2. `content/` 以下の既存記事を確認し、内部リンクに使えるものを把握する
3. 記事タイプを判断する（articles / reviews / compare）
4. slug を決める（英数字とハイフンのみ、例: `character-ai-review`）

## 記事の要件

- **文字数**: 4,000文字以上8,000文字未満（日本語）
- **フロントマター**: title, description, date（今日の日付）, tags（3〜5個）, toc, faq（3問）を必ず含める
- **記事タイプ別の追加フロントマター**:
  - reviews: service, rating（overall/ease/japanese/features/price）, pros（3〜5個）, cons（3〜5個）, affiliateUrl（空文字でOK）
  - compare: services, compareTable, verdict, bestFor
- **構成**: h2見出し5〜7本、各セクション500〜800文字
- **内部リンク**: 既存記事へのリンクを本文中に2〜3箇所自然に含める
- **会話例**: articles/reviews では `<ConversationExample>` コンポーネントを1〜2箇所使う
- **FAQ**: 読者が実際に検索しそうな質問3問
- **SEO**: キーワードをタイトル・description・本文冒頭・h2に自然に含める
- **アフィリエイト**: 不要（affiliateUrlは空文字、CTAボタンはdisabled状態のまま）

## 見出しアンカーの書き方

`{#id}` は使わず必ず以下の形式を使う：
```
<h2 id="section-id">見出しテキスト</h2>
```

## 作成後の処理

1. `content/{type}/{slug}.mdx` に保存する
2. `node scripts/generate-ogp.mjs` を実行して OGP 画像を生成する
3. `/ai-navi-images {type}/{slug}` の手順に従って記事内画像を追加する
4. ビルドを確認する: `npm run build`
5. エラーがなければ以下をユーザーに提示してレビューを求める：
   - 記事タイトル・slug・文字数
   - 構成（見出し一覧）
   - 追加した画像一覧
6. ユーザーから承認（「OK」「公開して」等）を得てから git add・commit・push する
7. 完了後にプレビューURL（https://ai-kanojo-navi.com/{type}/{slug}）を表示する
