import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.BASE_URL || 'http://localhost:3087';
assert.equal(new URL(base).hostname, 'localhost', 'Rendering checks must use the local preview');
const out = process.env.AUDIT_OUT || '.audit/rendering';
await mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, protocolTimeout: 60000 });
// Chromium's documented alternative to starting a native screen reader.
const accessibleBrowser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--force-renderer-accessibility'], protocolTimeout: 60000 });
const results = [];
const normalize = text => text.replace(/\s+/g, ' ').trim();
try {
  for (const width of (process.env.VIEWPORT_WIDTHS || '320,375,390,768,1024,1440').split(',').map(Number)) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.evaluateOnNewDocument(() => {
      window.renderingCls = 0;
      window.renderingShifts = [];
      window.renderingPhase = 'startup';
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) {
          window.renderingCls += entry.value;
          window.renderingShifts.push({ phase: window.renderingPhase, value: entry.value, sources: entry.sources.map(source => ({ tag: source.node?.tagName, className: source.node?.className, previous: source.previousRect.toJSON(), current: source.currentRect.toJSON() })) });
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(base, { waitUntil: 'networkidle0' });
    const accessiblePage = await accessibleBrowser.newPage();
    await accessiblePage.setViewport({ width, height: 900 });
    await accessiblePage.goto(base, { waitUntil: 'networkidle0' });
    const cdp = await accessiblePage.createCDPSession();
    const tree = await cdp.send('Accessibility.getFullAXTree');
    const accessibleHeadings = tree.nodes.filter(node => node.role?.value === 'heading').map(node => normalize(node.name?.value || ''));
    const expectedHeadings = await page.$$eval('main h1, main h2, main h3', nodes => nodes.map(node => node.textContent.replace(/\s+/g, ' ').trim()));
    for (const heading of expectedHeadings) assert.ok(accessibleHeadings.includes(heading), `Missing accessible heading at ${width}: ${heading}`);
    await accessiblePage.close();
    const startupCls = await page.evaluate(() => { window.renderingPhase = 'find'; return window.renderingCls; });
    assert.ok(startupCls <= 0.01, `Unexpected startup layout shift at ${width}: ${startupCls}`);
    await page.evaluate(() => { window.renderingPhase = 'project focus'; });
    const projectLinks = await page.$$('article[data-project] h3 a');
    await projectLinks.at(-1).focus();
    assert.ok(await page.evaluate(() => {
      const rect = document.activeElement.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= 900;
    }), 'Deferred project link must be visible when focused');
    await page.evaluate(() => { window.renderingPhase = 'find'; });
    const servicesHeading = await page.$eval('main > section:last-child h3', node => node.textContent);
    assert.equal(await page.evaluate(text => window.find(text), servicesHeading), true, 'Find-in-page must reach deferred service content');
    await page.evaluate(() => window.getSelection()?.removeAllRanges());
    await page.evaluate(() => { window.renderingPhase = 'focus'; });
    await page.focus('main > section:last-child a');
    const focus = await page.evaluate(() => {
      const rect = document.activeElement.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom };
    });
    assert.ok(focus.top >= 0 && focus.bottom <= 900, `Deferred link focus is offscreen at ${width}`);
    const sections = [];
    await page.evaluate(() => { window.renderingPhase = 'scroll'; });
    for (let index = 0; index < 6; index++) {
      await page.$$eval('article[data-project]', (nodes, i) => nodes[i].scrollIntoView({ block: 'start', behavior: 'instant' }), index);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      assert.ok(await page.$$eval('article[data-project]', (nodes, i) => nodes[i].offsetHeight > 100, index));
    }
    for (let index = 0; index < 5; index++) {
      await page.$$eval('main > section', (nodes, i) => nodes[i].scrollIntoView({ block: 'start', behavior: 'instant' }), index);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      sections.push(await page.$$eval('main > section', (nodes, i) => ({ title: nodes[i].querySelector('h1,h2')?.textContent, height: nodes[i].offsetHeight, overflow: document.documentElement.scrollWidth > innerWidth }), index));
      assert.equal(sections.at(-1).overflow, false);
      if ([390, 1440].includes(width) && [0, 4].includes(index)) await page.screenshot({ path: `${out}/home-${width}-${index === 0 ? 'hero' : 'services'}.png` });
    }
    const { cls, shifts } = await page.evaluate(() => ({ cls: window.renderingCls, shifts: window.renderingShifts }));
    await page.emulateMediaType('print');
    const printVisibility = await page.$$eval('main > section, article[data-project]', nodes => nodes.map(node => getComputedStyle(node).contentVisibility));
    assert.ok(printVisibility.every(value => value === 'visible'), 'Print must render every section');
    await page.emulateMediaType('screen');
    results.push({ width, accessibleHeadings: expectedHeadings.length, findInPage: true, focusedLinkVisible: true, projectLinkVisible: true, printVisible: true, startupCls, scriptedFlowCls: cls, shifts, sections });
    assert.ok(cls <= 0.1, `Unexpected layout shift at ${width}: ${cls}`);
    await page.close();
    console.log(`PASS home rendering at ${width}px`);
  }
} finally {
  await browser.close();
  await accessibleBrowser.close();
  await writeFile(`${out}/results.json`, JSON.stringify(results, null, 2));
}
