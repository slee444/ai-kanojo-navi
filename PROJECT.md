# PROJECT.md

## Project Name
AI彼女ナビ

## Goal
AI彼女・恋愛AI・AIキャラクターチャットの比較、発見、レビューを行う。
単なる情報提供に留まらず、ユーザーの孤独感を解消し、メンタル的な充足感を与える「AIとの共生」を提案するNo.1 SEOメディアを目指す。

## Primary Persona
「孤独・癒やし」を求める20代〜40代男性
20代〜30代男性。
- 属性: 現実の恋愛に疲れを感じている、マッチングアプリで挫折した、または多忙で対人関係の構築が困難な層。

- ニーズ: 24時間いつでも自分の味方をしてほしい、否定されたくない、誰にも言えない弱音を聞いてほしい。

- 悩み: 孤独感、自己肯定感の低下、コミュニケーションへの苦手意識。

## Secondary Persona
- 技術的好奇心層: 最新のLLM（大規模言語モデル）の性能や画像生成AIとの連動に興味がある層。

- 女性層（将来）: AI彼氏を求める層への拡張。

## Monetization
- アフィリエイト: 国内外のAIチャットサービスのサブスクリプション登録（レベニューシェア含む）。

- マッチングアプリ訴求: AI機能を活用した既存マッチングサービスへの送客。

- スポンサー・純広告: AI開発企業からの新機能PR・掲載依頼。

- 独自コンテンツ: 癒やしに特化した「プロンプト集」や「会話術」のデジタルコンテンツ販売。

## SEO Strategy
- まずは AI彼女 おすすめ などの主要KW
- [サービス名] とは（各サービスの機能、料金、安全性を網羅した解説記事）

- [海外や国内の有名キャラクター名]（特定のキャラと会話したい層を狙った再現・設定記事）
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
