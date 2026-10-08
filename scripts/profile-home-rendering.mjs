import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.BASE_URL || 'http://localhost:3087';
assert.equal(new URL(base).hostname, 'localhost', 'Profiling must use the local preview');
const out = process.env.AUDIT_OUT || '.audit/render-profile';
await mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, protocolTimeout: 60000 });
const runs = [];
try {
  for (let round = 0; round < 3; round++) {
    // Alternate order so the candidate does not always benefit from a warmer host.
    for (const variant of round % 2 ? ['current', 'baseline'] : ['baseline', 'current']) {
      const page = await browser.newPage();
      await page.setViewport({ width: 390, height: 844 });
      await page.setCacheEnabled(false);
      const cdp = await page.createCDPSession();
      await cdp.send('Performance.enable');
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await page.setRequestInterception(true);
      page.on('request', async request => {
        if (new URL(request.url()).pathname.endsWith('.css')) {
          try {
            const response = await fetch(request.url());
            let body = await response.text();
            if (variant === 'baseline') body += '\nmain > section {content-visibility:visible!important;contain-intrinsic-block-size:none!important}';
            await request.respond({ status: response.status, contentType: 'text/css', body });
          } catch { await request.abort(); }
        } else await request.continue();
      });
      await page.goto(base, { waitUntil: 'networkidle0', timeout: 60000 });
      const metrics = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(metric => [metric.name, metric.value]));
      runs.push({ round, variant, layoutMs: metrics.LayoutDuration * 1000, styleMs: metrics.RecalcStyleDuration * 1000, scriptMs: metrics.ScriptDuration * 1000, taskMs: metrics.TaskDuration * 1000, layoutCount: metrics.LayoutCount });
      console.log(JSON.stringify(runs.at(-1)));
      await page.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(`${out}/results.json`, JSON.stringify({ environment: 'Local production homepage; Chrome; 390×844; cold page cache; 4× CPU throttling; CSS intercepted identically in both variants; shared host. Baseline disables only homepage section containment. CDP task durations are lab diagnostics, not field INP.', runs }, null, 2));
}
