import puppeteer from 'puppeteer';

const url = process.argv[2];
const out = process.argv[3];
const scrollTo = parseInt(process.argv[4] || '0');
const captureHeight = parseInt(process.argv[5] || '1200');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: captureHeight, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  // trigger reveals
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let t = 0; const d = 400;
      const i = setInterval(() => {
        window.scrollBy(0, d); t += d;
        if (t >= document.body.scrollHeight) { clearInterval(i); window.scrollTo(0,0); resolve(); }
      }, 80);
    });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: out, fullPage: false });
  console.log('Saved:', out);
  await browser.close();
})();
