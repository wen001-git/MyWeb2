// Post-build 脚本：把 Astro 产出的 dist/index.html 改造成单文件 self-contained 版本。
//
// 背景：Astro 静态构建默认会拆出 dist/index.html + dist/_astro/*.{css,js} + dist/images/*.
// 本项目要求「dist/index.html 可直接 file:// 双击打开 / 单文件分发」，因此构建完成后再走
// 这一步把外部子资源全部就地内联，最后删除已无人引用的子目录，最终 dist/ 只剩一个
// dist/index.html（约 1.3 MB）。
//
// 假设：当前只有 dist/index.html 一个页面。若后续新增 /zh-hant/、/en/ 等子路径页面，
// 需要把本脚本改造成遍历 dist 下所有 *.html 并逐个内联；同时 Astro 多页 + base: "./"
// 在子路径下的兼容性也要重新评估。见 AGENTS.md「关键实现备忘」。

import { readFile, writeFile, rm, readdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const DIST = resolve(PROJECT_ROOT, "dist");

/** 把图片转成 data URI。 */
function imageToDataUri(filename, buf) {
  const lower = filename.toLowerCase();
  const mime = lower.endsWith(".jpg") || lower.endsWith(".jpeg")
    ? "image/jpeg"
    : lower.endsWith(".png")
      ? "image/png"
      : lower.endsWith(".webp")
        ? "image/webp"
        : lower.endsWith(".svg")
          ? "image/svg+xml"
          : "application/octet-stream";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

/** 从 src/href 中抽出位于 dist/_astro/<name> 的文件名（处理 /、./、/./ 三种前缀）。 */
function parseAstroRef(url, dir) {
  // 接受 /xxx, ./xxx, /./xxx（前者由 public/ 直链得到，后两者由 base: "./" 重写得到）
  const re = new RegExp(`(?:^|/|^\\./|/\\.\\/)${dir}/([^"\\s?#]+)`);
  const m = url.match(re);
  return m ? decodeURIComponent(m[1]) : null;
}

async function main() {
  let html = await readFile(resolve(DIST, "index.html"), "utf8");

  // 1) CSS：<link rel="stylesheet" href="..._astro/X.css"> → <style>{css}</style>
  const cssMatches = [...html.matchAll(
    /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*\/?>/g
  )];
  for (const m of cssMatches) {
    const file = parseAstroRef(m[1], "_astro");
    if (!file) continue;
    const css = await readFile(resolve(DIST, "_astro", file), "utf8");
    html = html.replace(m[0], `<style>${css}</style>`);
  }

  // 2) JS：<script ... src="..._astro/X.js"></script> → <script type="module">{js}</script>
  const jsMatches = [...html.matchAll(
    /<script\b([^>]*)\bsrc="([^"]+)"([^>]*)><\/script>/g
  )];
  for (const m of jsMatches) {
    const file = parseAstroRef(m[2], "_astro");
    if (!file) continue;
    const js = await readFile(resolve(DIST, "_astro", file), "utf8");
    html = html.replace(m[0], `<script type="module">${js}</script>`);
  }

  // 3) 图片：<img ... src="...images/X.jpg" ...> → <img ... src="data:..." ...>
  const imgMatches = [...html.matchAll(/<img\b([^>]*?)\/?>/g)];
  for (const m of imgMatches) {
    const full = m[0];
    const attrs = m[1];
    const srcMatch = attrs.match(/\bsrc="([^"]+)"/);
    if (!srcMatch) continue;
    const file = parseAstroRef(srcMatch[1], "images");
    if (!file) continue;
    // 保留原 src 里可能带的后缀（?v=1 等），以保持缓存欺骗效果
    const suffixMatch = srcMatch[1].match(/[?&].*$/);
    const suffix = suffixMatch ? suffixMatch[0] : "";
    const buf = await readFile(resolve(DIST, "images", file));
    const dataUri = imageToDataUri(file, buf) + suffix;
    const newImg = full.replace(/\bsrc="[^"]+"/, `src="${dataUri}"`);
    html = html.replace(full, newImg);
  }

  await writeFile(resolve(DIST, "index.html"), html);

  // 4) 清理已无人引用的子目录
  await rm(resolve(DIST, "_astro"), { recursive: true, force: true });
  await rm(resolve(DIST, "images"), { recursive: true, force: true });

  // 报告
  const remaining = await readdir(DIST);
  const size = (await readFile(resolve(DIST, "index.html"))).length;
  console.log(
    `inline.mjs: dist/index.html is self-contained (${(size / 1024 / 1024).toFixed(2)} MB). ` +
      `dist/ contains: ${remaining.join(", ") || "(empty)"}`
  );
}

main().catch((err) => {
  console.error("inline.mjs failed:", err);
  process.exit(1);
});
