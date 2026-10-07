import puppeteer from 'puppeteer-core';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.BASE_URL || 'https://jontaworld.com';
const out = process.env.AUDIT_OUT || '.audit/before';
await mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, protocolTimeout: 30000 });
const results = [];
try {
  const sitemap = await fetch(`${base}/sitemap.xml`).then(r => r.text());
  const routes = [...new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname))];
  routes.push('/audit-missing-page');
  for (const route of routes) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluateOnNewDocument(() => {
      window.auditMetrics = { cls: 0, lcp: 0 };
      new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.auditMetrics.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver(list => { for (const e of list.getEntries()) window.auditMetrics.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
    for (const width of [320, 375, 390, 768, 1024, 1440]) {
      await page.setViewport({ width, height: 900 });
      let response;
      try {
        response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 15000 });
      } catch (error) {
        results.push({ route, width, navigationError: error.message });
        continue;
      }
      await new Promise(resolve => setTimeout(resolve, 1500));
      const data = await page.evaluate(() => ({
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        h1: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth > innerWidth,
        brokenImages: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src),
        missingAlt: [...document.images].filter(i => !i.hasAttribute('alt')).length,
        overflowElements: [...document.querySelectorAll('main *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).slice(0, 10).map(e => ({ tag: e.tagName, class: e.className, text: e.textContent?.slice(0, 60) })),
        metrics: window.auditMetrics,
        links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
      }));
      results.push({ route, width, status: response.status(), ...data, errors: [...errors] });
      await writeFile(`${out}/results.json`, JSON.stringify(results, null, 2));
      if ([320, 1440].includes(width) && ['/', '/now', '/contact', '/lab', '/portfolio'].includes(route)) await page.screenshot({ path: `${out}/${route.replaceAll('/', '') || 'home'}-${width}.png` });
    }
    await page.close();
    console.log(route);
  }
} finally {
  await browser.close();
  await writeFile(`${out}/results.json`, JSON.stringify(results, null, 2));
}
