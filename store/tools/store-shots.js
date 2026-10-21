// Store screenshots at the exact sizes Google Play and the App Store ask for.
// Play phone 1080x2400, Play 7" 1200x1920, Play 10" 2048x1536, iPhone 6.9" 1320x2868, iPhone 6.5" 1284x2778, iPad 13" 2064x2752.
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const net = require('net');
const BASE = 'http://localhost:4321';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = '/Users/amorre/Dev/gillou-ionic/playstore/2026-10';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const waitPort = () => new Promise((res) => { const t = () => { const s = net.connect(4321, '127.0.0.1'); s.on('connect', () => { s.end(); res(); }); s.on('error', () => setTimeout(t, 300)); }; t(); });
const todayAt = (dayOffset, h, m) => { const d = new Date(); d.setDate(d.getDate() - dayOffset); d.setHours(h, m, 0, 0); return d.toISOString(); };
const titles = { 'air-classique': ['Air Classique', 1], 'lion-de-belgique': ['Lion de Belgique', 2], 'postillon-de-longjumeau': ['Le postillon de Longjumeau', 3], 'sans-souci': ['Sans souci', 4], 'doudou': ['El doudou', 19], 'classe': ['La classe', 12], 'marins': ['Les marins', 23] };
const plan = [['air-classique', 6], ['sans-souci', 4], ['lion-de-belgique', 2], ['postillon-de-longjumeau', 3], ['doudou', 5], ['classe', 1], ['marins', 3]];
const history = []; let i = 0;
for (const [id, n] of plan) for (let k = 0; k < n; k++) history.push({ historyId: 'h' + i++, scoreId: id, scoreTitle: titles[id][0], scoreNumber: titles[id][1], date: todayAt(k % 2, 9 + (i % 9), (i * 7) % 60) });
const carnivals = [
  { id: 'c1', name: 'Carnaval de Binche 2026', location: 'Binche', description: 'Mardi gras sous le soleil. Les Gilles ont demandé Le Doudou trois fois de suite.', savedAt: '2026-02-18T09:00:00.000Z',
    entries: history.map((e, k) => ({ ...e, historyId: 'b' + k, date: new Date(Date.UTC(2026, 1, 15 + (k % 3), 9 + (k % 7), 30 + k)).toISOString() })) },
  { id: 'c2', name: 'Carnaval de La Louvière', location: 'La Louvière', description: '', savedAt: '2026-03-22T09:00:00.000Z', entries: history.slice(0, 5).map((e, k) => ({ ...e, historyId: 'l' + k, date: '2026-03-21T15:' + String(10 + k).padStart(2, '0') + ':00.000Z' })) },
];
async function shot(browser, { file, url, scheme, width, height, dsf, tone = 'sib', before }) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: dsf });
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }]);
  await page.evaluateOnNewDocument((h, t, c) => { localStorage.clear(); localStorage.setItem('scoreHistory', JSON.stringify(h)); localStorage.setItem('scoreTone', t); localStorage.setItem('savedCarnivals', JSON.stringify(c)); }, history, tone, carnivals);
  await page.goto(BASE + url, { waitUntil: 'networkidle0' }); await sleep(1500);
  if (before) await before(page); await sleep(500);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await page.screenshot({ path: file }); console.log('wrote', path.relative(OUT, file), width * dsf + 'x' + height * dsf); await page.close();
}
const stats = async (p) => { await p.click('ion-toolbar ion-buttons[slot=end] ion-button:first-of-type'); await sleep(2500); };
const pages = (dir, size, full) => {
  const list = [
    ['01-annonces', '/score-list', 'light'], ['02-mib', '/score-list', 'light', 'mib'], ['03-nuit', '/score-list', 'dark'],
    ['04-historique', '/score-history', 'light'], ['05-carnaval', '/carnivals/c1', 'light'], ['06-chiffres', '/carnivals/c1', 'light', 'sib', stats],
  ];
  if (full) list.push(['07-ordre', '/score-order', 'light'], ['08-options', '/settings', 'light']);
  return list.map(([name, url, scheme, tone, before]) => ({ file: `${OUT}/${dir}/${name}.png`, url, scheme, tone, before, ...size }));
};
(async () => {
  await waitPort();
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars'] });
  const jobs = [
    ...pages('play/phone-1080x2400', { width: 432, height: 960, dsf: 2.5 }, true),
    ...pages('play/tablet7-1200x1920', { width: 600, height: 960, dsf: 2 }, false),
    ...pages('play/tablet10-2048x1536', { width: 1024, height: 768, dsf: 2 }, false),
    ...pages('app-store/iphone-6.9-1320x2868', { width: 440, height: 956, dsf: 3 }, true),
    ...pages('app-store/iphone-6.5-1284x2778', { width: 428, height: 926, dsf: 3 }, true),
    ...pages('app-store/ipad-13-2064x2752', { width: 1032, height: 1376, dsf: 2 }, false),
  ];
  for (const job of jobs) { try { await shot(browser, job); } catch (e) { console.error(path.basename(job.file), 'failed:', e.message); } }
  await browser.close();
})();
