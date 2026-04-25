# PROJECT.md

## Project Name
AI彼女ナビ

## Goal
AI彼女・恋愛AI・AIキャラクターチャットの比較、発見、レビューを行うSEOメディアを作る。

## Primary Persona
20代〜30代男性。
AI彼女を探している初心者、比較検討層、性格別に探したい層。

## Secondary Persona
将来的にAI彼氏を探す女性層も扱う可能性あり。ただし初期は男性向けに集中する。

## Monetization
- 将来的にアフィリエイト
- 将来的に広告
- 将来的に独自のキャラDBや比較DB
- 将来的にスポンサー掲載

## SEO Strategy
- まずは AI彼女 おすすめ などの主要KW
- 次にサービス比較系
- 最後に性格別・ニーズ別ロングテール
- 実体験、会話例、比較表、FAQを重視する

## Content Types（実装済み）
- おすすめ記事（articles/）
- 比較記事（compare/）
- レビュー記事（reviews/）
- タグ・カテゴリページ（tags/）
- プライバシーポリシー・免責事項（静的ページ）

## Site Structure（実装済み）
```
/                        トップページ
/articles                記事一覧
/articles/[slug]         記事詳細
/reviews                 レビュー一覧
/reviews/[slug]          レビュー詳細
/compare                 比較記事一覧
/compare/[slug]          比較記事詳細
/tags                    カテゴリ一覧
/tags/[tag]              カテゴリ別記事一覧
/privacy                 プライバシーポリシー
/disclaimer              免責事項
```

## コンテンツ（実装済み）
```
content/
├── articles/
│   ├── ai-kanojo-compare.mdx
│   ├── ai-kanojo-osusume-2025.mdx
│   └── replika-review.mdx
├── reviews/
│   ├── character-ai-review.mdx
│   ├── crushon-ai-review.mdx
│   └── replika-review.mdx
└── compare/
    ├── character-ai-vs-replika.mdx
    └── free-ai-kanojo-compare.mdx
```

## Tech Stack
- Next.js 15（App Router, SSG）
- TypeScript
- Tailwind CSS v4
- MDX（gray-matter + next-mdx-remote v6）
- Vercel（本番ホスティング、無料Hobbyプラン）
- GitHub public repo: https://github.com/slee444/ai-kanojo-navi
- 本番URL: https://ai-kanojo-navi.com

## SEO実装済み
- sitemap.xml / robots.txt（自動生成）
- JSON-LD（Article, FAQPage, BreadcrumbList）
- OGP / Twitter Card
- パンくずナビ
- 関連記事クロスリンク

## Design Principles
- シンプル
- 読みやすい
- SEO重視
- mobile first
- 量産しやすい
- 保守しやすい
- 過剰に凝らない

## Constraints
- MVP優先
- 過剰な抽象化を避ける
- 必要最小限のファイル変更
- 説明は簡潔
- 変更ファイルを先に示す
- 実装対象以外は触らない

## Current Scope
MVP完成・本番公開済み（2026-04）。次フェーズの候補:
- 画像対応（next/image + アイキャッチ）
- アフィリエイトリンク解禁
- 記事本数の拡充
- Google Search Console 設置

## 設置済みツール
- Google Analytics 4（G-5W7WDSBY4B）✅
- ファビコン（ピンク背景 ♡ 自動生成）✅
