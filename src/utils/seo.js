// ============================================================
// Punto único de verdad para SEO.
// ⚠️ Cambiar SITE_URL al dominio definitivo antes de publicar:
//    afecta canonical, Open Graph, sitemap.xml y JSON-LD.
// ============================================================

export const SITE_URL = 'https://www.moonsportsgroup.com'
export const SITE_NAME = 'Moon Sports Group'
export const LOCALE = 'es_AR'

// Imagen para compartir en redes. Ideal: 1200x630px.
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export const CONTACT = {
  email: 'info@moonsportsgroup.com',
  phone: '+54 911 0000 0000',
  instagram: 'https://www.instagram.com/moonsportsgroup_/',
  linkedin: 'https://www.linkedin.com/company/moon-sports-group/',
  whatsapp: 'https://wa.me/5491100000000',
}

export const KEYWORDS = [
  'representación de futbolistas',
  'agencia de representación de jugadores',
  'representante de futbolistas',
  'agencia de fútbol profesional',
  'representación de directores técnicos',
  'gestión de carreras deportivas',
  'transferencias de futbolistas',
  'Moon Sports Group',
]

const url = (path = '/') => `${SITE_URL}${path}`

/** Schema principal de la agencia — aplica a todo el sitio. */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo_principal.png`,
  image: OG_IMAGE,
  sport: 'Football',
  description:
    'Agencia de representación de futbolistas y directores técnicos profesionales. Negociación de contratos, gestión de transferencias, asesoría legal y desarrollo de marca personal.',
  email: CONTACT.email,
  telephone: CONTACT.phone,
  sameAs: [CONTACT.instagram, CONTACT.linkedin],
  areaServed: {
    '@type': 'Place',
    name: 'Internacional',
  },
  knowsAbout: [
    'Representación de futbolistas',
    'Negociación de contratos deportivos',
    'Transferencias internacionales',
    'Gestión de imagen de deportistas',
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'es-AR',
  publisher: { '@id': `${SITE_URL}/#organization` },
}

/** Catálogo de servicios de la home. */
export const servicesSchema = (services) => ({
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Servicios de Moon Sports Group',
  itemListElement: services.map((s, i) => ({
    '@type': 'Offer',
    position: i + 1,
    itemOffered: {
      '@type': 'Service',
      name: s.title,
      description: s.desc,
      provider: { '@id': `${SITE_URL}/#organization` },
    },
  })),
})

/** Person schema por representado (deportista / DT). */
export const personSchema = (player) => {
  const isCoach = player.type === 'coach'

  return {
    '@type': 'Person',
    name: `${player.name} ${player.lastname}`,
    jobTitle: isCoach ? 'Director Técnico' : player.position,
    ...(player.nationality && { nationality: player.nationality }),
    ...(player.birthDate && { birthDate: player.birthDate }),
    ...(player.image && { image: `${SITE_URL}${player.image}` }),
    ...(player.bio && { description: player.bio }),
    ...(player.club && {
      affiliation: { '@type': 'SportsTeam', name: player.club },
    }),
    memberOf: { '@id': `${SITE_URL}/#organization` },
    ...(!isCoach && { knowsAbout: 'Fútbol profesional' }),
  }
}

/** Listado de representados para /jugadores. */
export const playersListSchema = (players) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Representados de Moon Sports Group',
  numberOfItems: players.length,
  itemListElement: players.map((player, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: personSchema(player),
  })),
})

export const breadcrumbSchema = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: url(c.path),
  })),
})
