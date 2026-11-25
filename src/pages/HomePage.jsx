import Hero          from '../components/Hero/Hero'
import Services      from '../components/Services/Services'
import Nosotros      from '../components/Nosotros/Nosotros'
import PlayersPanels from '../components/PlayersPanels/PlayersPanels'
import MatchAgenda   from '../components/MatchAgenda/MatchAgenda'
import Contact       from '../components/Contact/Contact'
import Footer        from '../components/Footer/Footer'
import { Seo }       from '../components/Seo/Seo'
import { KEYWORDS } from '../utils/seo'

export default function HomePage() {
  return (
    <>
      <Seo
        title="Moon Sports Group | Agencia de representación de futbolistas"
        description="Agencia de representación de futbolistas y técnicos en Sudamérica: contratos, transferencias, asesoría legal e imagen. Conocé a nuestros representados."
        path="/"
        keywords={KEYWORDS.join(', ')}
      />
      {/* Orden: quiénes son → a quién representan → dónde juegan esta
          semana → cómo trabajan → por qué confiar → contacto */}
      <Hero />
      <PlayersPanels />
      <MatchAgenda />
      <Services />
      <Nosotros />
      <Contact />
      <Footer />
    </>
  )
}
