// Genera public/og-image.jpg (1200×630) a partir de seo/og.html.
// Uso, desde la raíz del proyecto:  node seo/og.mjs
// Requiere Playwright con Chromium (npx playwright install chromium si no lo tenés).
import { chromium } from 'playwright'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const src = path.resolve('seo/og.html')
const out = path.resolve('public/og-image.jpg')
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto(pathToFileURL(src).href)
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(500)
await page.screenshot({ path: out, type: 'jpeg', quality: 86 })
await browser.close()
console.log('og-image lista:', out)
