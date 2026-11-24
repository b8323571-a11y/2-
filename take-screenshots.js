import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotsDir = path.join(__dirname, 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const wait = (ms) => new Promise(res => setTimeout(res, ms));

async function capture() {
  console.log('Starting screenshot capture using Edge:', edgePath);
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  // 1. Homepage
  console.log('Capturing 1: Homepage...');
  await page.goto('http://localhost:5000', { waitUntil: 'networkidle2' });
  await wait(1500);
  await page.screenshot({ path: path.join(screenshotsDir, '1-bosh-sahifa.png') });

  // 2. Catalog Section
  console.log('Capturing 2: Catalog...');
  await page.evaluate(() => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await wait(1200);
  await page.screenshot({ path: path.join(screenshotsDir, '2-katalog-va-filtr.png') });

  // 3. AI Shopping Assistant
  console.log('Capturing 3: AI Assistant...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const aiBtn = buttons.find(b => (b.textContent && b.textContent.includes('AI Maslahatchi')) || b.getAttribute('aria-label') === 'AI Yordamchi');
    if (aiBtn) aiBtn.click();
  });
  await wait(1000);

  // Click on the budget suggestion chip
  await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('button'));
    const chip = chips.find(c => c.textContent && c.textContent.includes('500 000'));
    if (chip) chip.click();
  });
  await wait(2500);
  await page.screenshot({ path: path.join(screenshotsDir, '3-ai-shopping-assistant.png') });

  // Close AI modal
  await page.keyboard.press('Escape');
  await wait(800);

  // 4. Product Details Modal
  console.log('Capturing 4: Product Details...');
  await page.evaluate(() => {
    const cards = document.querySelectorAll('.card-3d');
    if (cards && cards.length > 0) {
      cards[0].click();
    }
  });
  await wait(1200);
  await page.screenshot({ path: path.join(screenshotsDir, '4-mahsulot-tafsilotlari.png') });

  // Close product modal
  await page.keyboard.press('Escape');
  await wait(800);

  // 5. Admin Dashboard
  console.log('Capturing 5: Admin Dashboard...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const userBtn = buttons.find(b => b.getAttribute('title') && (b.getAttribute('title').includes('Kirish') || b.getAttribute('title').includes('Mijoz') || b.getAttribute('title').includes('Azizbek')));
    if (userBtn) userBtn.click();
  });
  await wait(800);

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const adminBtn = buttons.find(b => b.textContent && b.textContent.includes('Admin sifatida kirish'));
    if (adminBtn) adminBtn.click();
  });
  await wait(1000);

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const adminPanelBtn = buttons.find(b => b.textContent && (b.textContent.includes('Admin Panel') || b.textContent.includes('Admin Boshqaruv')));
    if (adminPanelBtn) adminPanelBtn.click();
  });
  await wait(1500);
  await page.screenshot({ path: path.join(screenshotsDir, '5-admin-dashboard.png') });

  await browser.close();
  console.log('SUCCESS: All 5 high-res screenshots saved in screenshots/ folder!');
}

capture().catch(err => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
