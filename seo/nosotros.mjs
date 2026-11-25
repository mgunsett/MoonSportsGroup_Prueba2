// Genera src/assets/images/bg_jugadores.webp (1920×1080), la imagen de "Sobre nosotros",
// a partir de seo/nosotros.html.  Uso, desde la raíz:  node seo/nosotros.mjs
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const { chromium } = createRequire(import.meta.url)('playwright')
const src = path.resolve('seo/nosotros.html')
const png = path.resolve('seo/.nosotros.png')
const out = path.resolve(process.argv[2] || 'src/assets/images/bg_jugadores.webp')
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
await page.goto(pathToFileURL(src).href)
await page.waitForTimeout(500)
await page.screenshot({ path: png })
await browser.close()
// PNG → WebP (requiere ImageMagick: `convert`)
execFileSync('convert', [png, '-quality', '82', out])
execFileSync('rm', [png])
console.log('Imagen lista:', out)
