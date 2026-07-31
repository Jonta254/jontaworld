/**
 * Link-checker for the evidence base.
 *
 * The site's entire trust model is "every claim is one click from proof"
 * (docs/creative-brief.md §10a). That only holds if every external link is
 * live. This scans the content layer for external URLs and fails on any that
 * does not resolve to a 2xx/3xx — so a product going dark breaks the build,
 * not the visitor's trust.
 *
 * No dependencies: Node's global fetch (Node 18+). Run: `node scripts/check-links.mjs`.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const CONTENT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "content");
const URL_RE = /https?:\/\/[^\s"'`)]+/g;
const TIMEOUT_MS = 20000;

// Collect unique URLs from every content file.
const urls = new Set();
for (const file of readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".ts"))) {
  const text = readFileSync(join(CONTENT_DIR, file), "utf8");
  for (const m of text.matchAll(URL_RE)) {
    // Trim trailing punctuation that regex may capture.
    urls.add(m[0].replace(/[.,;]+$/, ""));
  }
}

async function check(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    // Some hosts reject HEAD; fall back to a ranged GET.
    let res = await fetch(url, { method: "HEAD", redirect: "follow", signal: ctrl.signal });
    if (res.status === 405 || res.status === 403 || res.status === 501) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: ctrl.signal,
        headers: { range: "bytes=0-0", "user-agent": "raw-signal-linkcheck" },
      });
    }
    return { url, status: res.status, ok: res.ok || res.status === 206 };
  } catch (err) {
    return { url, status: 0, ok: false, error: err.name === "AbortError" ? "timeout" : err.message };
  } finally {
    clearTimeout(t);
  }
}

const results = await Promise.all([...urls].sort().map(check));
let failed = 0;
for (const r of results) {
  const tag = r.ok ? "ok " : "DEAD";
  if (!r.ok) failed++;
  console.log(`${tag} ${String(r.status).padStart(3)}  ${r.url}${r.error ? `  (${r.error})` : ""}`);
}

console.log(`\n${results.length} links checked, ${failed} dead.`);
if (failed > 0) {
  console.error("Link check failed: the evidence base has a dead link.");
  process.exit(1);
}
