import puppeteer from 'puppeteer';
import path from 'path';

const url = process.argv[2] || 'http://localhost:3000';
const out = process.argv[3] || '/tmp/mobile.png';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let t = 0; const d = 400;
      const i = setInterval(() => {
        window.scrollBy(0, d); t += d;
        if (t >= document.body.scrollHeight) { clearInterval(i); window.scrollTo(0,0); resolve(); }
      }, 100);
    });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: out, fullPage: true });
  console.log('Saved:', out);
  await browser.close();
})();
