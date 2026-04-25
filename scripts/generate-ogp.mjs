import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const contentRoot = path.join(process.cwd(), "content");
const outputRoot = path.join(process.cwd(), "public", "images", "ogp");

// Noto Sans JP フォントをダウンロード（初回のみ）
const fontPath = path.join(process.cwd(), "scripts", "NotoSansJP-Bold.ttf");
async function getFont() {
  if (!fs.existsSync(fontPath)) {
    console.log("Downloading NotoSansJP font...");
    const res = await fetch(
      "https://github.com/google/fonts/raw/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf"
    );
    const buf = await res.arrayBuffer();
    fs.writeFileSync(fontPath, Buffer.from(buf));
  }
  return fs.readFileSync(fontPath);
}

async function generateOgp({ title, type, slug }) {
  const font = await getFont();

  const typeLabel = { articles: "記事", reviews: "レビュー", compare: "比較" };
  const label = typeLabel[type] ?? type;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #fff0f3 0%, #ffe4e6 100%)",
          fontFamily: "NotoSansJP",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                fontSize: 24,
                color: "#e11d48",
                background: "#ffe4e6",
                padding: "6px 16px",
                borderRadius: 999,
                marginBottom: 32,
                fontWeight: 700,
              },
              children: label,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: title.length > 30 ? 44 : 54,
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.4,
                marginBottom: 48,
                maxWidth: 1000,
              },
              children: title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: 28,
                color: "#9ca3af",
                fontWeight: 700,
                marginTop: "auto",
              },
              children: "AI彼女ナビ",
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "NotoSansJP", data: font, weight: 700 }],
    }
  );

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  fs.mkdirSync(outputRoot, { recursive: true });
  const outputPath = path.join(outputRoot, `${slug}.png`);
  fs.writeFileSync(outputPath, png);
  console.log(`✓ ${outputPath}`);
}

async function main() {
  const types = ["articles", "reviews", "compare"];
  for (const type of types) {
    const dir = path.join(contentRoot, type);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      // すでに生成済みならスキップ
      if (fs.existsSync(path.join(outputRoot, `${slug}.png`))) continue;
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      await generateOgp({ title: data.title, type, slug });
    }
  }
}

main().catch(console.error);
