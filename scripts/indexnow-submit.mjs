import fs from "fs";
import path from "path";
import matter from "gray-matter";

const siteUrl = "https://ai-kanojo-navi.com";
const key = "ef71b7ddd6d5ba55fe4133051c9317bc";
const keyLocation = `${siteUrl}/${key}.txt`;
const contentRoot = path.join(process.cwd(), "content");
const CONTENT_TYPES = ["articles", "reviews", "compare"];

function collectUrls() {
  const urls = [`${siteUrl}/`];
  for (const type of CONTENT_TYPES) {
    const dir = path.join(contentRoot, type);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const slug = file.replace(/\.md$/, "");
      urls.push(`${siteUrl}/${type}/${slug}`);
    }
  }
  return urls;
}

async function main() {
  const urlList = collectUrls();
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(siteUrl).host, key, keyLocation, urlList }),
  });
  console.log(`IndexNow submit: ${res.status} ${res.statusText} (${urlList.length} URLs)`);
  if (!res.ok) {
    console.log(await res.text());
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
