import Hero          from '../components/Hero/Hero'
import Services      from '../components/Services/Services'
import Nosotros      from '../components/Nosotros/Nosotros'
import PlayersSlider from '../components/PlayersSlider/PlayersSlider'
import MatchAgenda   from '../components/MatchAgenda/MatchAgenda'
import Contact       from '../components/Contact/Contact'
import Footer        from '../components/Footer/Footer'
import { Seo }       from '../components/Seo/Seo'
import { KEYWORDS, organizationSchema, websiteSchema } from '../utils/seo'

export default function HomePage() {
  return (
    <>
      <Seo
        title="Moon Sports Group | Representación de Futbolistas y Técnicos Profesionales"
        description="Agencia de representación de futbolistas y directores técnicos. Negociamos contratos, gestionamos transferencias internacionales y potenciamos tu marca personal. Hablemos hoy."
        path="/"
        keywords={KEYWORDS.join(', ')}
        jsonLd={[organizationSchema, websiteSchema]}
      />
      {/* Orden: quiénes son → a quién representan → dónde juegan esta
          semana → cómo trabajan → por qué confiar → contacto */}
      <Hero />
      <PlayersSlider />
      <MatchAgenda />
      <Services />
      <Nosotros />
      <Contact />
      <Footer />
    </>
  )
}
