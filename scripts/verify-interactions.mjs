import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
const base = process.env.BASE_URL || 'http://localhost:3087';
assert.equal(new URL(base).hostname, 'localhost', 'Interactions must run on the local preview');
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, protocolTimeout: 30000 });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const startupRequests = [];
  const recordStartup = request => startupRequests.push(request.url());
  page.on('request', recordStartup);
  await page.goto(`${base}/`, { waitUntil: 'networkidle0' });
  page.off('request', recordStartup);
  assert.equal(startupRequests.some(url => new URL(url).pathname === '/lab'), false);
  assert.equal(startupRequests.some(url => new URL(url).pathname === '/about'), false);
  await page.hover('nav[aria-label=Primary] a[href="/about"]');
  await page.waitForFunction(() => performance.getEntriesByType('resource').some(resource => new URL(resource.name).pathname === '/about'));
  await page.focus('nav[aria-label=Primary] a[href="/lab"]');
  await page.waitForFunction(() => performance.getEntriesByType('resource').some(resource => new URL(resource.name).pathname === '/lab'));
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => location.pathname === '/lab' && !!document.querySelector('#product-logic'));
  console.log('PASS menu avoids startup About/Lab fetches, prefetches on hover/focus, and navigates with Enter');
  let fixture = { status: 200, body: '{"success":"false"}' };
  let posts = 0;
  let pending;
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.url().startsWith('https://formsubmit.co/')) {
      if (request.method() === 'OPTIONS') return request.respond({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'POST' } });
      posts++;
      if (fixture.pending) { pending = request; return; }
      if (fixture.abort) return request.abort();
      return request.respond({ status: fixture.status, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: fixture.body });
    }
    request.continue();
  });
  const message = 'A project enquiry used only in a local mocked test.';
  async function fill() {
    await page.goto(`${base}/contact`, { waitUntil: 'networkidle0' });
    await page.type('[name=name]', 'Test Person');
    await page.type('[name=email]', 'test@example.com');
    await page.type('[name=message]', message);
  }
  for (const value of [
    { status: 200, body: '{"success":"false"}' },
    { status: 500, body: '{"success":true}' },
    { status: 200, body: 'null' },
    { status: 200, body: 'invalid json' },
    { abort: true },
  ]) {
    fixture = value;
    await fill();
    await page.click('button[type=submit]');
    await page.waitForSelector('[data-state=error]');
    assert.equal(await page.$eval('[name=message]', e => e.value), message);
    console.log('PASS failed submission retains message:', JSON.stringify(value));
  }
  fixture = { pending: true };
  await fill();
  const before = posts;
  await page.click('button[type=submit]');
  await page.waitForSelector('button[type=submit]:disabled');
  await page.$eval('form', e => { e.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); });
  assert.equal(posts, before + 1);
  await pending.respond({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: '{"success":"true"}' });
  await page.waitForSelector('[data-state=sent]');
  assert.equal(await page.$eval('[name=message]', e => e.value), '');
  console.log('PASS pending duplicate prevention and accepted response reset');
  await fill();
  await page.$eval('[name=website]', e => { e.value = 'bot.example'; });
  const honeyBefore = posts;
  await page.click('button[type=submit]');
  await page.waitForSelector('[data-state=error]');
  assert.equal(posts, honeyBefore);
  assert.equal(await page.$eval('[name=message]', e => e.value), message);
  console.log('PASS honeypot makes no request and never claims delivery');
  await page.goto(`${base}/lab`, { waitUntil: 'networkidle0' });
  const buttons = await page.$$('button');
  await buttons[0].focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('#product-logic')?.textContent.includes('Statussubmitted'));
  assert.match(await page.$eval('#product-logic', e => e.textContent), /Version 5/);
  assert.match(await page.$eval('#product-logic', e => e.textContent), /History events4/);
  await buttons[1].focus();
  await page.keyboard.press('Enter');
  assert.match(await page.$eval('#product-logic', e => e.textContent), /Version 4/);
  console.log('PASS Lab keyboard edit and reset');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const contentTop = await page.$eval('main', element => element.offsetTop);
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
  await page.waitForSelector('nav[aria-label=Primary] ul[aria-hidden=true]');
  await page.waitForFunction(() => document.querySelector('nav[aria-label=Primary] ul').getBoundingClientRect().height === 0);
  assert.equal(await page.$eval('main', element => element.offsetTop), contentTop);
  assert.ok(await page.evaluate(() => {
    const header = document.querySelector('nav[aria-label=Primary]').closest('header');
    const target = document.elementFromPoint(innerWidth / 2, header.getBoundingClientRect().bottom + 10);
    return target && !header.parentElement.contains(target);
  }), 'Transparent reserved header space must not block page interactions');
  await page.focus('nav[aria-label=Primary] a');
  await page.waitForSelector('nav[aria-label=Primary] ul:not([aria-hidden])');
  console.log('PASS compact header preserves content position and focusing it restores navigation');
} finally { await browser.close(); }
