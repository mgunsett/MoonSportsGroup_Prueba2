import { useLayoutEffect, useRef } from 'react'
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { players } from '../../utils/players'
import bgJugadores from '../../assets/images/bg_jugadores.webp'

gsap.registerPlugin(ScrollTrigger)

// ─── SOBRE NOSOTROS · Dossier ────────────────────────────────────
// Modelo "Dossier" (Estadísticas N4) del catálogo plantillas_skills.
// La foto de los representados queda a la derecha, despejada: todo el
// contenido va en la columna izquierda y un degradado lateral lo hace
// legible sin tapar la foto. En mobile la foto va arriba.

// Contadores de la agencia (a confirmar con Moon)
const STATS = [
  { value: 25, label: 'Transferencias' },
  { value: 15, label: 'Representados' },
  { value: 8, label: 'Países' },
]

const VALUES = [
  { title: 'Confianza', text: 'Relaciones a largo plazo, no operaciones de una temporada.' },
  { title: 'Transparencia', text: 'Cada decisión de la carrera se toma con el representado, con información clara.' },
  { title: 'Compromiso', text: 'Los objetivos del jugador y del técnico son los nuestros.' },
]

// Datos de hoy, calculados desde players.js
const ACTIVE = players.length
const CLUBS = new Set(players.map((p) => p.club)).size
const COUNTRIES = new Set(players.map((p) => p.clubCountry).filter(Boolean)).size

// Cuenta de 0 al valor al entrar en pantalla. Sin animación si se pidió menos movimiento.
function useCounter(target) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onStart: () => { el.textContent = '0' },
        onUpdate: () => { el.textContent = String(Math.round(obj.val)) },
      })
    }, ref)
    return () => ctx.revert()
  }, [target])
  return ref
}

function Stat({ value, label, first }) {
  const ref = useCounter(value)
  return (
    <Box py={4} pl={first ? 0 : { base: 3, md: 5 }} borderLeft={first ? 'none' : '1px solid rgba(255,255,255,0.09)'}>
      <Text fontFamily="display" fontSize={{ base: '44px', md: '56px' }} lineHeight={0.85} sx={{ fontVariantNumeric: 'tabular-nums' }}>
        <span ref={ref}>{value}</span>
        <Box as="span" color="brand.gold">+</Box>
      </Text>
      <Text mt={2} fontSize={{ base: '9.5px', md: '10.5px' }} letterSpacing="0.16em" textTransform="uppercase" color="rgba(255,255,255,0.5)">
        {label}
      </Text>
    </Box>
  )
}

export default function Nosotros() {
  const sectionRef = useGsapReveal('up', 0.1)

  return (
    <Box as="section" id="nosotros" aria-labelledby="nosotros-title" position="relative" bg="brand.black" overflow="clip">
      {/* ---- Foto · mobile y tablet: arriba, fundida con el contenido ---- */}
      <Box
        aria-hidden="true"
        display={{ base: 'block', lg: 'none' }}
        position="relative"
        h={{ base: '340px', sm: '420px' }}
        bgImage={`url(${bgJugadores})`}
        bgSize={{ base: 'auto 165%', md: 'auto 150%' }}
        bgPosition={{ base: '86% 38%', md: '80% 40%' }}
        bgRepeat="no-repeat"
        pointerEvents="none"
        _after={{
          content: '""', position: 'absolute', inset: 0,
          bg: 'linear-gradient(180deg, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0) 45%, #080808 100%)',
        }}
      />

      {/* ---- Foto · desktop: anclada abajo a la derecha, con el alto limitado
           para que los jugadores queden a la derecha del texto. El lado
           izquierdo de la foto es casi negro y se funde con el fondo. ---- */}
      <Box
        aria-hidden="true"
        display={{ base: 'none', lg: 'block' }}
        position="absolute"
        inset={0}
        pointerEvents="none"
        _after={{
          content: '""', position: 'absolute', inset: 0,
          bg: 'linear-gradient(90deg, #080808 0%, rgba(8,8,8,0.85) 40%, rgba(8,8,8,0.3) 58%, rgba(8,8,8,0) 72%), linear-gradient(0deg, #080808 0%, rgba(8,8,8,0) 18%)',
        }}
      >
        <Box
          as="img"
          src={bgJugadores}
          alt=""
          loading="lazy"
          position="absolute"
          right={0}
          bottom={0}
          h={{ lg: 'min(76%, 600px)', xl: 'min(94%, 780px)' }}
          w="auto"
          maxW="none"
          // difumina el borde superior de la foto (donde arranca su fondo con textura)
          sx={{ WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 28%)', maskImage: 'linear-gradient(180deg, transparent 0%, #000 28%)' }}
        />
      </Box>

      {/* ---- Contenido ---- */}
      <Box ref={sectionRef} position="relative" zIndex={1} maxW="1280px" mx="auto" px={{ base: 4, md: 12 }} pt={{ base: 2, lg: '120px' }} pb={{ base: '72px', lg: '120px' }}>
        <Box maxW={{ base: '100%', lg: '58%' }}>
          <Flex direction="column" gap={4} mb={{ base: 7, md: 9 }}>
            <Text className="section-label gsap-reveal">Quiénes somos</Text>
            <Heading id="nosotros-title" className="gsap-reveal" as="h2" fontFamily="display" fontWeight={400} textTransform="uppercase"
              fontSize={{ base: '58px', md: '84px', xl: '96px' }} lineHeight={0.88} letterSpacing="0.01em">
              Sobre <Box as="span" color="brand.gold">nosotros</Box>
            </Heading>
          </Flex>

          {/* Texto editorial con palabras clave */}
          <Text className="gsap-reveal" fontSize={{ base: '21px', md: 'clamp(22px, 2.1vw, 30px)' }} fontWeight={300} lineHeight={1.45} color="brand.whiteMuted" sx={{ textWrap: 'pretty' }}>
            <Box as="strong" color="brand.white" fontWeight={600}>Moon Sports Group</Box> es una agencia de representación especializada en{' '}
            <Box as="span" color="brand.gold" fontWeight={600}>fútbol profesional</Box>. Combinamos experiencia en el ámbito deportivo con una{' '}
            <Box as="strong" color="brand.white" fontWeight={600}>visión estratégica</Box> para posicionar a cada representado en las mejores ligas.
          </Text>
          <Text className="gsap-reveal" mt={5} fontSize={{ base: '16px', md: '18px' }} fontWeight={300} lineHeight={1.7} color="brand.whiteMuted" maxW="36em">
            Creemos en relaciones a <Box as="span" color="brand.gold" fontWeight={600}>largo plazo</Box>, basadas en la confianza, la transparencia y el
            compromiso con los objetivos de cada jugador y técnico que forma parte de nuestra familia.
          </Text>

          {/* Números + cómo trabajamos */}
          <Grid className="gsap-reveal" mt={{ base: 9, md: 11 }} templateColumns={{ base: '1fr', md: 'minmax(0,1fr) minmax(0,1.15fr)' }} gap={{ base: 8, md: 10 }} alignItems="start">
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" borderTop="1px solid rgba(255,255,255,0.18)" borderBottom="1px solid rgba(255,255,255,0.09)">
                {STATS.map((s, i) => <Stat key={s.label} {...s} first={i === 0} />)}
              </Grid>
              <Flex mt={4} align="center" gap={3} px={4} py={3} borderRadius="10px" bg="rgba(22,22,22,0.8)" backdropFilter="blur(6px)" border="1px solid rgba(255,255,255,0.09)">
                <Text fontFamily="display" fontSize="34px" lineHeight={0.8} color="brand.gold">{ACTIVE}</Text>
                <Text fontSize="13.5px" color="brand.whiteMuted" lineHeight={1.4}>
                  representados en actividad hoy, en {CLUBS} clubes de {COUNTRIES} países.
                </Text>
              </Flex>
            </Box>

            <Box>
              <Text fontSize="11px" fontWeight={600} letterSpacing="0.24em" textTransform="uppercase" color="brand.gold" mb={1}>
                Cómo trabajamos
              </Text>
              {VALUES.map((v, i) => (
                <Grid key={v.title} templateColumns="28px 1fr" gap={3} py="14px" borderBottom="1px solid rgba(255,255,255,0.09)">
                  <Text fontFamily="label" fontSize="16px" color="rgba(255,255,255,0.42)">0{i + 1}</Text>
                  <Box>
                    <Text fontWeight={600} fontSize="16px" mb="3px">{v.title}</Text>
                    <Text fontSize="13.5px" lineHeight={1.55} color="rgba(255,255,255,0.55)">{v.text}</Text>
                  </Box>
                </Grid>
              ))}
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
