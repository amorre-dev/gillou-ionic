// Renders the Play feature graphic (1024x500) from an HTML template.
const puppeteer = require('puppeteer-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [,, html, out] = process.argv;
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 500, deviceScaleFactor: 1 });
  await page.goto('file://' + html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: out, omitBackground: false });
  await browser.close(); console.log('wrote', out);
})();
