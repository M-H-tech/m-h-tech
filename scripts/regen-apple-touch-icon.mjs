import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <defs>
    <linearGradient id="mh-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E4C694"/>
      <stop offset="100%" stop-color="#A88B54"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" rx="40" ry="40" fill="#07090F"/>
  <text x="90" y="123"
    font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
    font-size="84"
    font-weight="800"
    text-anchor="middle"
    fill="url(#mh-grad)"
    letter-spacing="-3">MH</text>
</svg>
`;

const html = `<!doctype html><html><body style="margin:0;padding:0;background:transparent">${svg}</body></html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
await page.setContent(html);
await page.screenshot({
  path: path.join(projectRoot, 'apple-touch-icon.png'),
  omitBackground: false,
  clip: { x: 0, y: 0, width: 180, height: 180 },
});
await browser.close();
console.log('Wrote apple-touch-icon.png (180×180)');
