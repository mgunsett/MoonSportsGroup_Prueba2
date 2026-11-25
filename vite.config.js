import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://moonsports-group.com'

// Meta tags por ruta, en HTML estático.
// Los scrapers de WhatsApp / Facebook / LinkedIn / X no ejecutan JS: sin
// esto, /jugadores se compartiría con el título y la imagen de la home.
// Al compilar se copia dist/index.html a dist/<ruta>/index.html con sus
// propias etiquetas (Netlify sirve ese archivo en /jugadores).
const ROUTES = [
  {
    path: '/jugadores',
    title: 'Nuestros representados | Moon Sports Group',
    description:
      'Futbolistas y directores técnicos representados por Moon Sports Group: perfiles, clubes, estadísticas y trayectoria en las ligas de Sudamérica.',
    noscript:
      '<h1>Nuestros representados</h1><p>Futbolistas y directores técnicos representados por Moon Sports Group, con sus clubes y estadísticas.</p><p><a href="/" style="color:#C9A84C">Volver al inicio</a></p>',
  },
]

function routeMeta() {
  return {
    name: 'moon-route-meta',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve('dist')
      const base = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
      for (const r of ROUTES) {
        const url = `${SITE_URL}${r.path}`
        // Reemplaza el valor de una etiqueta aunque tenga otros atributos (ej. data-rh)
        const set = (html, attr, key, valueAttr, value) =>
          html.replace(new RegExp(`(<(?:meta|link)[^>]*\\b${attr}="${key}"[^>]*\\b${valueAttr}=")[^"]*(")`), `$1${value}$2`)
        let html = base
        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${r.title}</title>`)
        html = set(html, 'name', 'description', 'content', r.description)
        html = set(html, 'property', 'og:description', 'content', r.description)
        html = set(html, 'name', 'twitter:description', 'content', r.description)
        html = set(html, 'property', 'og:title', 'content', r.title)
        html = set(html, 'name', 'twitter:title', 'content', r.title)
        html = set(html, 'property', 'og:url', 'content', url)
        html = set(html, 'rel', 'canonical', 'href', url)
        html = html.replace(/(<link rel="alternate" hreflang="[^"]+" href=")[^"]*(")/g, `$1${url}$2`)
        html = html.replace(/<main style="([^"]*)">[\s\S]*?<\/main>/, `<main style="$1">${r.noscript}</main>`)
        const out = path.join(dist, r.path.slice(1), 'index.html')
        fs.mkdirSync(path.dirname(out), { recursive: true })
        fs.writeFileSync(out, html)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), routeMeta()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
