import { Helmet } from 'react-helmet-async'
import { LOCALE, OG_IMAGE, SITE_NAME, SITE_URL } from '../../utils/seo'

/**
 * Meta tags por ruta.
 *
 * OJO: esto se inyecta en el cliente. Google ejecuta JS y lo lee, pero los
 * scrapers de WhatsApp / Facebook / LinkedIn / X NO. El Open Graph que ven
 * al compartir un link es el de index.html. Para OG por ruta hace falta
 * prerender (ver reporte SEO).
 */
export function Seo({
  title,
  description,
  path = '/',
  image = OG_IMAGE,
  type = 'website',
  keywords,
  noindex = false,
  jsonLd,
}) {
  const canonical = `${SITE_URL}${path}`
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet prioritizeSeoTags>
      <html lang="es" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonical} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={LOCALE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
