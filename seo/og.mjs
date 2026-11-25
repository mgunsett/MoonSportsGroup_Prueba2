// Genera public/og-image.jpg (1200×630) a partir de seo/og.html.
// Uso, desde la raíz del proyecto:  node seo/og.mjs
// Requiere Playwright con Chromium, instalado en el proyecto o global
// (npm i -D playwright && npx playwright install chromium).
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const { chromium } = createRequire(import.meta.url)('playwright')
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
