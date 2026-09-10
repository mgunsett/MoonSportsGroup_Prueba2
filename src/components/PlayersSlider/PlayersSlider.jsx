import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { PlayerCard } from '../PlayerCard/PlayerCard'
import { players } from '../../utils/players'

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M14.5 5.5L8 12l6.5 6.5" />
  </svg>
)

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M9.5 5.5L16 12l-6.5 6.5" />
  </svg>
)

gsap.registerPlugin(ScrollTrigger)

const arrowStyles = {
  w: { base: '40px', md: '46px' },
  h: { base: '40px', md: '46px' },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'full',
  border: '1px solid',
  bg: 'rgba(255,255,255,0.02)',
  flexShrink: 0,
  transition: 'color 0.35s ease, border-color 0.35s ease, background 0.35s ease, opacity 0.35s ease',
}

export default function PlayersSlider() {
  const headerRef = useGsapReveal('up', 0.15)
  const trackRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [progress, setProgress] = useState(0)
  const [thumbWidth, setThumbWidth] = useState(100)

  // Estado de las flechas + barra de progreso, derivado del scroll real del track
  const syncState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    // Safari puede devolver scrollLeft negativo en overscroll
    const x = Math.max(0, Math.min(el.scrollLeft, max))
    setCanPrev(x > 1)
    setCanNext(x < max - 1)
    setProgress(max > 1 ? x / max : 0)
    setThumbWidth(el.scrollWidth > 0 ? (el.clientWidth / el.scrollWidth) * 100 : 100)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    syncState()
    el.addEventListener('scroll', syncState, { passive: true })

    // Recalcula al cambiar el ancho del track o al cargar las imágenes
    const ro = new ResizeObserver(syncState)
    ro.observe(el)
    Array.from(el.children).forEach((child) => ro.observe(child))

    return () => {
      el.removeEventListener('scroll', syncState)
      ro.disconnect()
    }
  }, [syncState])

  // Reveal escalonado de las cards al entrar en viewport (solo opacity/y:
  // no toca el eje X para no pelearse con el scroll-snap del track)
  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return

    const mm = gsap.matchMedia(el)

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        Array.from(el.children),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      )
    })

    return () => mm.revert()
  }, [])

  // Avanza exactamente una card (ancho + gap), así siempre cae en un punto de snap
  const scrollByCard = (direction) => {
    const el = trackRef.current
    if (!el) return

    const slide = el.firstElementChild
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = slide ? slide.getBoundingClientRect().width + gap : el.clientWidth * 0.8

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: direction * step, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <Box
      as="section"
      id="jugadores-home"
      py={{ base: '80px', md: '120px' }}
      bg="brand.black"
      position="relative"
      overflow="hidden"
    >
      {/* Glow ambiental */}
      <Box
        position="absolute"
        top="10%"
        left="-10%"
        w={{ base: '420px', md: '720px' }}
        h={{ base: '420px', md: '720px' }}
        borderRadius="full"
        background="radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 68%)"
        filter="blur(60px)"
        pointerEvents="none"
        zIndex={0}
      />

      <Box maxW="1280px" mx="auto" px={{ base: 6, md: 12 }} position="relative" zIndex={1}>
        {/* ---- Header ---- */}
        <Flex
          ref={headerRef}
          justify="space-between"
          align={{ base: 'flex-start', md: 'flex-end' }}
          gap={6}
          mb={{ base: 8, md: 12 }}
        >
          <Box>
            <Text className="section-label gsap-reveal">Nuestros Representados</Text>
            <Heading
              className="gsap-reveal"
              fontFamily="heading"
              fontSize={{ base: '80px', md: '92px' }}
              lineHeight={1}
              letterSpacing="0.02em"
            >
              LOS <Box as="span" color="brand.gold">JUGADORES</Box>
            </Heading>
          </Box>

          <Box
            as={RouterLink}
            to="/jugadores"
            className="gsap-reveal"
            display={{ base: 'none', md: 'inline-flex' }}
            alignItems="center"
            gap={2}
            pb={2}
            flexShrink={0}
            fontSize="12px"
            letterSpacing="0.18em"
            textTransform="uppercase"
            fontWeight={600}
            color="brand.whiteMuted"
            transition="color 0.35s ease, gap 0.35s ease"
            _hover={{ color: 'brand.gold', gap: 3 }}
          >
            Ver todos <ChevronRight />
          </Box>
        </Flex>

        {/* ---- Track ---- */}
        <Flex
          ref={trackRef}
          gap={{ base: 3, md: 4 }}
          overflowX="auto"
          overflowY="hidden"
          py={3}
          // Deja respirar el translateY del hover sin recortarlo
          mt={-3}
          scrollSnapType="x mandatory"
          overscrollBehaviorX="contain"
          sx={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {players.map((player) => (
            <Box
              key={player.id}
              as={RouterLink}
              to="/jugadores"
              scrollSnapAlign="start"
              flex={{
                base: '0 0 calc((100% - 0.75rem) / 2)',
                md: '0 0 calc((100% - 2rem) / 3)',
                lg: '0 0 calc((100% - 3rem) / 4)',
              }}
              _hover={{ textDecoration: 'none' }}
            >
              <PlayerCard player={player} />
            </Box>
          ))}
        </Flex>

        {/* ---- Controles ---- */}
        <Flex align="center" gap={{ base: 4, md: 8 }} mt={{ base: 6, md: 8 }}>
          {/* Barra de progreso */}
          {/* <Box flex="1" h="2px" bg="rgba(255,255,255,0.08)" borderRadius="full" overflow="hidden">
            <Box
              h="100%"
              w={`${thumbWidth}%`}
              bg="linear-gradient(90deg, #9A7A35, #E8C96A)"
              borderRadius="full"
              // translateX es relativo al propio ancho del thumb, no al del track
              transform={`translateX(${(progress * (100 - thumbWidth) * 100) / Math.max(thumbWidth, 1)}%)`}
              transition="transform 0.15s linear"
            />
          </Box> */}

          <Flex gap={3}>
            <Box
              as="button"
              type="button"
              aria-label="Anterior"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              {...arrowStyles}
              borderColor={canPrev ? 'rgba(201,168,76,0.35)' : 'brand.grayBorder'}
              color={canPrev ? 'brand.gold' : 'rgba(255,255,255,0.25)'}
              opacity={canPrev ? 1 : 0.45}
              cursor={canPrev ? 'pointer' : 'not-allowed'}
              _hover={canPrev ? { bg: 'rgba(201,168,76,0.12)', borderColor: 'brand.gold' } : {}}
            >
              <ChevronLeft />
            </Box>
            <Box
              as="button"
              type="button"
              aria-label="Siguiente"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              {...arrowStyles}
              borderColor={canNext ? 'rgba(201,168,76,0.35)' : 'brand.grayBorder'}
              color={canNext ? 'brand.gold' : 'rgba(255,255,255,0.25)'}
              opacity={canNext ? 1 : 0.45}
              cursor={canNext ? 'pointer' : 'not-allowed'}
              _hover={canNext ? { bg: 'rgba(201,168,76,0.12)', borderColor: 'brand.gold' } : {}}
            >
              <ChevronRight />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
