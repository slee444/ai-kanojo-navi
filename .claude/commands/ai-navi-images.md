# 記事内画像の追加

$ARGUMENTS に指定された記事（type/slug）に画像を追加してください。

## 手順

1. 対象の MDX ファイルを読み込む
2. 画像を挿入すべき箇所を3〜5か所特定する（セクションの冒頭が基本）
3. 各箇所に適した画像を Unsplash から取得する：
   - WebFetch で `https://unsplash.com/s/photos/{英語キーワード}` を検索
   - または直接 URL `https://images.unsplash.com/photo-{id}?w=800` を使用
   - AI・スマートフォン・チャット・恋愛・アプリ系のキーワードで検索
4. 取得した画像を `public/images/{type}/{slug}/` に保存する（Bash の curl を使用）
5. MDX に以下の形式で挿入する：

```mdx
<figure>
  <img src="/images/{type}/{slug}/{filename}.jpg" alt="{日本語の説明}" width="800" height="500" />
  <figcaption>出典：<a href="{元URL}" target="_blank" rel="noopener noreferrer">Unsplash</a></figcaption>
</figure>
```

6. ビルド確認: `npm run build`
7. エラーがなければ git add・commit・push する

## 画像選定の基準

- AIチャット・スマートフォン・会話・感情などをテーマにした写真
- 人物が写る場合は表情が明るいもの
- 解像度が高く横長（16:9 または 4:3）のもの
- ライセンス：Unsplash は商用利用・帰属不要だが figcaption で出典を記載する
