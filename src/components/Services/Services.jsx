import { useEffect, useLayoutEffect, useRef } from 'react'
import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapReveal } from '../../hooks/useGsapReveal'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    icon: '⚽',
    title: 'Representación de Futbolistas',
    desc: 'Negociación de contratos, gestión de transferencias y asesoramiento estratégico para maximizar el potencial de cada jugador a nivel nacional e internacional.',
  },
  {
    num: '02',
    icon: '📝',
    title: 'Representación de Técnicos',  
    desc: 'Acompañamiento profesional a directores técnicos en la búsqueda y negociación de proyectos deportivos acordes a sus objetivos y filosofía de juego.',
  },
  {
    num: '03',
    icon: '📊',
    title: 'Gestión de Imagen',
    desc: 'Desarrollo de marca personal, gestión de redes sociales, acuerdos de patrocinio y construcción de una imagen pública sólida y coherente con los valores del representado.',
  },
  {
    num: '04',
    icon: '⚖️',
    title: 'Negociación de Contratos y Asesoría Legal',
    desc: 'Expertos en el proceso de negociación de contratos; entendemos exactamente cuánto valor aportan nuestros clientes a sus equipos y sabemos cómo proteger sus intereses. Asesoría legal incluida.',
  },
  {
    num: '05',
    icon: '🌍',
    title: 'Red Internacional',
    desc: 'Acceso a una red global de clubes, scouts y representantes que abre puertas en los mercados más competitivos del fútbol mundial.',
  },
  {
    num: '06',
    icon: '🎯',
    title: 'Desarrollo profesional',
    desc: `Preparación física y nutricional. \n Asesoramiento y manejo de medios y preparación para entrevistas. Concierge para asesorar con viajes y logística.`,
  },
]

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const borderLine = el.querySelector('.card-border-line')
    const iconBox    = el.querySelector('.card-icon')
    const numBg      = el.querySelector('.service-num')

    const onEnter = () => {
      gsap.to(el, {
        y: -3,
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        duration: 0.6,
        ease: 'power2.out',
      })
      gsap.to(borderLine, {
        scaleX: 1,
        duration: 0.7,
        ease: 'power2.out',
      })
      gsap.to(iconBox, {
        borderColor: '#C9A84C',
        background: 'rgba(201,168,76,0.1)',
        duration: 0.5,
        ease: 'power2.out',
      })
      gsap.to(numBg, {
        color: 'rgba(201,168,76,0.1)',
        duration: 0.5,
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        y: 0,
        boxShadow: 'none',
        duration: 0.6,
        ease: 'power2.inOut',
      })
      gsap.to(borderLine, {
        scaleX: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      })
      gsap.to(iconBox, {
        borderColor: '#9A7A35',
        background: 'rgba(201,168,76,0.05)',
        duration: 0.5,
        ease: 'power2.inOut',
      })
      gsap.to(numBg, {
        color: 'rgba(201,168,76,0.06)',
        duration: 0.5,
      })
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <Box
      ref={cardRef}
      className="service-card gsap-reveal"
      position="relative"
      bg="brand.grayMid"
      p={{ base: '32px', md: '48px 40px' }}
      overflow="hidden"
      data-cursor-hover
    >
      {/* Large number background */}
      <Box className="service-num">{service.num}</Box>

      {/* Bottom gold border line */}
      <Box
        className="card-border-line"
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        h="2px"
        background="linear-gradient(90deg, transparent, #C9A84C, transparent)"
        transform="scaleX(0)"
        transformOrigin="center"
      />

      {/* Icon */}
      <Box
        className="card-icon"
        w="56px"
        h="56px"
        border="1px solid"
        borderColor="brand.goldDark"
        borderRadius="8px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={7}
        fontSize="24px"
        bg="rgba(201,168,76,0.05)"
      >
        {service.icon}
      </Box>

      <Heading
        as="h3"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="28px"
        letterSpacing="0.05em"
        color="brand.white"
        mb={4}
      >
        {service.title}
      </Heading>
      <Text fontSize="14px" lineHeight={1.7} color="brand.whiteMuted" fontWeight={300}>
        {service.desc}
      </Text>
    </Box>
  )
}

export default function Services() {
  const sectionRef = useGsapReveal('up', 0.08)
  const gridRef    = useRef(null)

  // Cards staggered entrance
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      id="services"
      py={{ base: '80px', md: '120px' }}
      bg="brand.grayDark"
    >
      <Box maxW="1280px" mx="auto" px={{ base: 6, md: 12 }} ref={sectionRef}>
        <Text className="section-label gsap-reveal">Nuestros Servicios</Text>

        <Heading
          className="gsap-reveal"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '40px', md: '72px' }}
          lineHeight={1}
          mb={6}
        >
          LO QUE <Box as="span" color="brand.gold">HACEMOS</Box>
        </Heading>

        <Text
          className="gsap-reveal"
          color="brand.whiteMuted"
          fontSize="16px"
          maxW="500px"
          lineHeight={1.7}
          fontWeight={300}
          mb={16}
        >
          Brindamos un servicio integral a nuestros representados, cubriendo cada
          aspecto de su carrera profesional.
        </Text>

        <Grid
          ref={gridRef}
          templateColumns={{ base: '1fr', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }}
          gap="2px"
          className="services-grid"
        >
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
