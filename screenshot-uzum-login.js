import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotsDir = path.join(__dirname, 'screenshots');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const wait = (ms) => new Promise(res => setTimeout(res, ms));

async function capture() {
  console.log('Capturing Uzum Market style login...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  await page.goto('http://localhost:5000', { waitUntil: 'networkidle2' });
  await wait(1000);

  // Click on "Kirish" button in navbar
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const loginBtn = buttons.find(b => b.textContent && b.textContent.includes('Kirish'));
    if (loginBtn) loginBtn.click();
  });
  await wait(1000);

  // Take screenshot of Step 1: Uzum phone login
  await page.screenshot({ path: path.join(screenshotsDir, '6-uzum-kirish-telefon.png') });

  // Now click "Kodni olish" to see Step 2: SMS OTP code
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const getCodeBtn = buttons.find(b => b.textContent && b.textContent.includes('Kodni olish'));
    if (getCodeBtn) getCodeBtn.click();
  });
  await wait(1000);

  // Take screenshot of Step 2: Uzum SMS OTP code
  await page.screenshot({ path: path.join(screenshotsDir, '7-uzum-sms-kod.png') });

  await browser.close();
  console.log('Uzum Market screenshots captured!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
