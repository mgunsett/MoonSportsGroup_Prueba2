import { useLayoutEffect, useRef } from 'react'
import { Box, Flex, Grid, Heading, Text, Image } from '@chakra-ui/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { BentoCard } from './BentoCard'
import recurso2 from '../../assets/images/recursos/recurso_2.webp'
import {
  BallIcon,
  BoardIcon,
  CameraIcon,
  ScaleIcon,
  GlobeIcon,
  TargetIcon,
} from './ServiceIcons'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    icon: <BallIcon />,
    title: 'Representación de Futbolistas',
    desc: 'Negociación de contratos, gestión de transferencias y asesoramiento estratégico para maximizar el potencial de cada jugador a nivel nacional e internacional.',
  },
  {
    num: '02',
    icon: <BoardIcon />,
    title: 'Representación de Técnicos',
    desc: 'Acompañamiento profesional a directores técnicos en la búsqueda y negociación de proyectos deportivos acordes a sus objetivos y filosofía de juego.',
  },
  {
    num: '03',
    icon: <CameraIcon />,
    title: 'Gestión de Imagen',
    desc: 'Desarrollo de marca personal, gestión de redes sociales, acuerdos de patrocinio y construcción de una imagen pública sólida y coherente con los valores del representado.',
  },
  {
    num: '05',
    icon: <GlobeIcon />,
    title: 'Red Internacional',
    desc: 'Acceso a una red global de clubes, scouts y representantes que abre puertas en los mercados más competitivos del fútbol mundial.',
  },
  {
    num: '04',
    icon: <ScaleIcon />,
    title: 'Negociación de Contratos y Asesoría Legal',
    desc: 'Expertos en el proceso de negociación de contratos; entendemos exactamente cuánto valor aportan nuestros clientes a sus equipos y sabemos cómo proteger sus intereses. Asesoría legal incluida.',
  },
  {
    num: '06',
    icon: <TargetIcon />,
    title: 'Desarrollo Profesional',
    desc: 'Preparación física y nutricional.\nAsesoramiento y manejo de medios y preparación para entrevistas. Concierge para asesorar con viajes y logística.',
  },
]

// Distribución del bento grid (índice = servicio)
const layout = [
  {},
  {},
  { col: { md: 'span 2', lg: 'span 2' } },
  {},
  { col: { lg: 'span 2' } },
  {},
]

export default function Services() {
  const sectionRef = useGsapReveal('up', 0.08)
  const gridRef = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(gridRef)

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        '.bento-card',
        { opacity: 0, y: 48, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <Box
      as="section"
      id="services"
      py={{ base: '80px', md: '120px' }}
      bg="brand.grayDark"
      position="relative"
      overflow="hidden"
    >
      {/* Recurso decorativo — esquina superior derecha */}
      <Image
        src={recurso2}
        alt=""
        loading="lazy"
        aria-hidden="true"
        position="absolute"
        top={-2}
        right={0}
        w={{ base: '220px', md: '600px' }}
        h="auto"
        opacity={0.12}
        zIndex={0}
        pointerEvents="none"
        userSelect="none"
        transform="rotate(-90deg)"
        transformOrigin="center"
      />

      <Box
        maxW="1280px"
        mx="auto"
        px={{ base: 6, md: 12 }}
        position="relative"
        zIndex={1}
        ref={sectionRef}
      >
        <Text className="section-label gsap-reveal">Nuestros Servicios</Text>

        <Flex
          className="gsap-reveal"
          justify="space-between"
          align="flex-end"
          mb={{ base: 2, md: 6 }}
        >
          <Heading
            fontFamily="heading"
            fontSize={{ base: '80px', md: '92px' }}
            lineHeight={1}
            letterSpacing="0.02em"
          >
          QUE <Box as="span" color="brand.gold">HACEMOS</Box>
          </Heading>

          
        </Flex>

        <Text
          className="gsap-reveal"
          color="brand.whiteMuted"
          fontSize="md"
          maxW="500px"
          lineHeight={1.7}
          fontWeight={300}
          mb={{ base: 8, md: 12 }}
        >
          Brindamos un servicio integral a nuestros representados, cubriendo cada
          aspecto de su carrera profesional.
        </Text> 

        <Grid
          ref={gridRef}
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={{ base: 3, md: 4 }}
        >
          {services.map((service, i) => (
            <BentoCard
              key={service.num}
              service={service}
              gridColumn={layout[i].col}
              gridRow={layout[i].row}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
