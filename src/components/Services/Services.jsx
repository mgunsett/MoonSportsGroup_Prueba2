import { useState } from 'react'
import { Box, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import recurso2 from '../../assets/images/recursos/recurso_2.webp'
import { BallIcon, BoardIcon, CameraIcon, GlobeIcon, ScaleIcon, TargetIcon } from './ServiceIcons'

// ─── QUÉ HACEMOS · Titulares ─────────────────────────────────────
// Modelo "Titulares" (Prensa N1) del catálogo plantillas_skills: cada
// servicio es un titular; al tocarlo se despliega su descripción con
// tres puntos clave. Uno abierto a la vez. Cierra con un llamado a la
// acción para quien busca representación.

const services = [
  {
    id: 'futbolistas',
    icon: BallIcon,
    title: 'Representación de futbolistas',
    short: 'Contratos, transferencias y estrategia de carrera.',
    desc: 'Negociación de contratos, gestión de transferencias y asesoramiento estratégico para llevar cada carrera a su mejor nivel, en el país y en el exterior.',
    points: ['Negociación de contratos', 'Transferencias y préstamos', 'Plan de carrera'],
  },
  {
    id: 'tecnicos',
    icon: BoardIcon,
    title: 'Representación de técnicos',
    short: 'Proyectos deportivos a la medida de cada entrenador.',
    desc: 'Acompañamos a directores técnicos en la búsqueda y negociación de proyectos deportivos acordes a sus objetivos y a su idea de juego.',
    points: ['Búsqueda de proyectos', 'Negociación con clubes', 'Armado de cuerpo técnico'],
  },
  {
    id: 'legal',
    icon: ScaleIcon,
    title: 'Contratos y asesoría legal',
    short: 'Sabemos cuánto valés y cómo protegerte.',
    desc: 'Negociamos cada contrato sabiendo cuánto valor aporta el representado a su equipo, y protegemos sus intereses con asesoría legal incluida.',
    points: ['Revisión de cláusulas', 'Derechos de imagen', 'Asesoría legal incluida'],
  },
  {
    id: 'imagen',
    icon: CameraIcon,
    title: 'Gestión de imagen',
    short: 'Marca personal, redes y sponsors.',
    desc: 'Construimos una imagen pública sólida y coherente: marca personal, redes sociales y acuerdos de patrocinio alineados con los valores del representado.',
    points: ['Marca personal', 'Redes sociales', 'Acuerdos con marcas'],
  },
  {
    id: 'red',
    icon: GlobeIcon,
    title: 'Red internacional',
    short: 'Clubes, scouts y agentes en los mercados más competitivos.',
    desc: 'Acceso a una red de clubes, scouts y representantes que abre puertas en los mercados más competitivos del fútbol.',
    points: ['Clubes y scouts', 'Alianzas con agencias', 'Sudamérica y el exterior'],
  },
  {
    id: 'desarrollo',
    icon: TargetIcon,
    title: 'Desarrollo profesional',
    short: 'Preparación, medios y logística.',
    desc: 'Preparación física y nutricional, entrenamiento para entrevistas y manejo de medios, y un servicio de concierge para viajes y logística.',
    points: ['Preparación física y nutricional', 'Medios y entrevistas', 'Viajes y logística'],
  },
]

const EASE = 'cubic-bezier(.23,1,.32,1)'
const num = (i) => String(i + 1).padStart(2, '0')

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export default function Services() {
  const sectionRef = useGsapReveal('up', 0.07)
  const [open, setOpen] = useState(services[0].id)

  const goContact = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('contacto')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <Box as="section" id="services" aria-labelledby="services-title" py={{ base: '72px', md: '110px' }} bg="brand.grayDark" position="relative" overflow="clip">
      {/* Recurso decorativo — esquina superior derecha */}
      <Image
        src={recurso2} alt="" aria-hidden="true" loading="lazy"
        position="absolute" top={-2} right={0} w={{ base: '220px', md: '560px' }} h="auto"
        opacity={0.1} zIndex={0} pointerEvents="none" userSelect="none" transform="rotate(-90deg)"
      />

      <Box ref={sectionRef} maxW="1280px" mx="auto" px={{ base: 4, md: 12 }} position="relative" zIndex={1}>
        <Flex direction="column" gap={4} mb={{ base: 8, md: 12 }}>
          <Text className="section-label gsap-reveal">Nuestros servicios</Text>
          <Heading id="services-title" className="gsap-reveal" as="h2" fontFamily="display" fontWeight={400} textTransform="uppercase"
            fontSize={{ base: '58px', md: '84px', xl: '96px' }} lineHeight={0.88} letterSpacing="0.01em">
            Qué <Box as="span" color="brand.gold">hacemos</Box>
          </Heading>
          <Text className="gsap-reveal" fontSize="16px" fontWeight={300} lineHeight={1.7} color="brand.whiteMuted" maxW="34em">
            Un servicio integral para cada representado: cubrimos todo lo que hace a su carrera, dentro y fuera de la cancha.
          </Text>
        </Flex>

        <Box borderTop="1px solid rgba(255,255,255,0.18)">
          {services.map((s, i) => {
            const isOpen = open === s.id
            const Icon = s.icon
            return (
              <Box key={s.id} className="gsap-reveal" borderBottom="1px solid rgba(255,255,255,0.18)">
                <Grid
                  as="button"
                  type="button"
                  id={`srv-btn-${s.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`srv-panel-${s.id}`}
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  w="100%"
                  textAlign="left"
                  templateColumns={{ base: '34px 28px minmax(0,1fr) 36px', lg: '56px 40px minmax(0,1fr) minmax(0,.9fr) 44px' }}
                  alignItems="center"
                  gap={{ base: 3, lg: '18px' }}
                  py={{ base: '18px', lg: '22px' }}
                  px={{ base: 0, lg: '6px' }}
                  transition="background-color 200ms ease"
                  sx={{ '@media (hover: hover) and (pointer: fine)': { _hover: { bg: 'rgba(255,255,255,0.025)', '.srv-go': { borderColor: 'brand.gold' } } } }}
                >
                  <Text as="span" fontFamily="label" fontSize="18px" letterSpacing="0.1em" color={isOpen ? 'brand.gold' : 'rgba(255,255,255,0.42)'}>
                    {num(i)}
                  </Text>
                  <Box as="span" color="brand.gold" fontSize="24px" display="flex"><Icon /></Box>
                  <Text as="span" fontFamily="label" fontSize={{ base: '25px', md: '30px', lg: 'clamp(26px, 2.6vw, 36px)' }} lineHeight={1} letterSpacing="0.03em">
                    {s.title}
                  </Text>
                  <Text as="span" display={{ base: 'none', lg: 'block' }} fontSize="14px" lineHeight={1.5} color="rgba(255,255,255,0.42)">
                    {s.short}
                  </Text>
                  <Flex
                    as="span" className="srv-go" aria-hidden="true" w={{ base: '36px', lg: '44px' }} h={{ base: '36px', lg: '44px' }} borderRadius="full"
                    align="center" justify="center" border="1px solid" borderColor={isOpen ? 'brand.gold' : 'rgba(255,255,255,0.18)'}
                    bg={isOpen ? 'brand.gold' : 'transparent'} color={isOpen ? 'brand.black' : 'brand.gold'}
                    transform={isOpen ? 'rotate(90deg)' : 'none'}
                    transition={`transform 300ms ${EASE}, background-color 200ms ease, border-color 200ms ease`}
                  >
                    <Arrow />
                  </Flex>
                </Grid>

                {/* Panel: grid-template-rows 0fr → 1fr anima la altura sin medirla */}
                <Box
                  id={`srv-panel-${s.id}`} role="region" aria-labelledby={`srv-btn-${s.id}`}
                  display="grid" gridTemplateRows={isOpen ? '1fr' : '0fr'}
                  transition={`grid-template-rows 400ms ${EASE}`}
                  sx={{ '@media (prefers-reduced-motion: reduce)': { transition: 'none' } }}
                >
                  <Box overflow="hidden">
                    <Grid
                      templateColumns={{ base: '1fr', lg: '114px minmax(0,1fr) minmax(0,.9fr)' }}
                      gap={{ base: 4, lg: '18px' }}
                      pb={{ base: 6, lg: 7 }}
                      px={{ base: 0, lg: '6px' }}
                      opacity={isOpen ? 1 : 0}
                      transform={isOpen ? 'none' : 'translateY(-6px)'}
                      transition={`opacity 250ms ease ${isOpen ? '120ms' : '0ms'}, transform 300ms ${EASE}`}
                      aria-hidden={!isOpen}
                    >
                      <Text gridColumn={{ lg: 2 }} fontSize="16px" fontWeight={300} lineHeight={1.7} color="brand.whiteMuted" maxW="36em">
                        {s.desc}
                      </Text>
                      <Flex as="ul" gridColumn={{ lg: 3 }} listStyleType="none" wrap="wrap" gap={2} alignContent="flex-start">
                        {s.points.map((p) => (
                          <Box as="li" key={p} fontSize="12.5px" px={3} py="7px" borderRadius="full" border="1px solid rgba(201,168,76,0.35)" color="brand.cream">
                            {p}
                          </Box>
                        ))}
                      </Flex>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>

        {/* Cierre */}
        <Flex className="gsap-reveal" justify="space-between" align="center" gap={5} wrap="wrap" mt={10}>
          <Text fontFamily="label" fontSize={{ base: '24px', md: '26px' }} letterSpacing="0.04em">
            ¿Querés que <Box as="span" color="brand.gold">te representemos</Box>?
          </Text>
          <Box
            as="button" type="button" onClick={goContact} w={{ base: '100%', sm: 'auto' }}
            px="26px" py="15px" borderRadius="4px" bg="linear-gradient(135deg, #C9A84C, #9A7A35)" color="brand.black"
            fontSize="12.5px" fontWeight={600} letterSpacing="0.12em" textTransform="uppercase"
            transition={`transform 160ms ${EASE}, box-shadow 200ms ease`}
            _active={{ transform: 'scale(0.97)' }}
            sx={{ '@media (hover: hover) and (pointer: fine)': { _hover: { boxShadow: '0 10px 28px rgba(201,168,76,0.3)' } } }}
          >
            Hablemos
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
