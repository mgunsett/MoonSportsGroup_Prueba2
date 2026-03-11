import Hero          from '../components/Hero/Hero'
import Services      from '../components/Services/Services'
import Nosotros      from '../components/Nosotros/Nosotros'
import PlayersSlider from '../components/PlayersSlider/PlayersSlider'
import Contact       from '../components/Contact/Contact'
import Footer        from '../components/Footer/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Nosotros />
      <PlayersSlider />
      <Contact />
      <Footer />
    </>
  )
}
