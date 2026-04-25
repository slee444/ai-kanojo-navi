# OGP画像生成

$ARGUMENTS に指定された slug の OGP 画像を生成してください。slug が省略された場合は全記事分生成します。

## 手順

1. `node scripts/generate-ogp.mjs` を実行する
2. `public/images/ogp/` に PNG が生成されたことを確認する
3. git add・commit・push する

## 注意

- フォントは初回のみ自動ダウンロードされます（NotoSansJP）
- 既存の画像はスキップされます（上書きなし）
- 再生成したい場合は対象の PNG を削除してから実行してください
