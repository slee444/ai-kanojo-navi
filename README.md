# AI彼女ナビ

AI彼女・恋愛AIアプリの比較・レビュー・おすすめ情報サイト。

## 技術スタック

- **Next.js 15** (App Router, Static Export)
- **TypeScript**
- **Tailwind CSS v4**
- **MDX** (gray-matter + next-mdx-remote)
- **Netlify** (ホスティング)

## ローカル起動

```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

## コンテンツ管理

記事は `content/` 以下の MDX ファイルで管理します。

```
content/
├── articles/   # 解説・おすすめ記事
├── reviews/    # サービスレビュー
└── compare/    # サービス比較記事
```

新しい記事を追加する場合は、既存の MDX ファイルのフロントマターを参考にしてください。

## ディレクトリ構成

```
src/
├── app/        # Next.js App Router ページ
├── components/ # 共通コンポーネント
└── lib/        # データ取得・ユーティリティ
```
