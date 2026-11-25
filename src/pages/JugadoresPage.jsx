import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import gsap from 'gsap'
import { players } from '../utils/players'
import Footer from '../components/Footer/Footer'
import PlayerModal from '../components/PlayerModal/PlayerModal'
import { PlayerCard } from '../components/PlayerCard/PlayerCard'
import { Seo } from '../components/Seo/Seo'
import { breadcrumbSchema, playersListSchema } from '../utils/seo'

// ─── /jugadores · Mosaico ────────────────────────────────────────
// Modelo "Pestañas y mosaico" (Galería 1) del catálogo plantillas_skills:
// filtro Jugadores / DT, grilla de tarjetas con números al pasar el mouse
// y una tarjeta final "¿Querés ser parte?" que completa la última fila,
// así la grilla cierra sin huecos en cualquier ancho.

const TABS = [
  { key: 'player', label: 'Jugadores' },
  { key: 'coach', label: 'DT · Director Técnico' },
]

// Columnas de la grilla por breakpoint (base / md / lg)
const COLS = { base: 2, md: 3, lg: 4 }
const spanFor = (n, cols) => `span ${cols - (n % cols)}`

const CLUBS = new Set(players.map((p) => p.club)).size
const COUNTRIES = new Set(players.map((p) => p.clubCountry).filter(Boolean)).size

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function JugadoresPage() {
  const gridRef = useRef(null)
  const headerRef = useRef(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [activeTab, setActiveTab] = useState('player')

  const list = players.filter((p) => p.type === activeTab)
  const count = (key) => players.filter((p) => p.type === key).length

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Entrada del encabezado
  useLayoutEffect(() => {
    if (reduceMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.from('.jug-head > *', { opacity: 0, y: 24, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.1 })
    }, headerRef)
    return () => ctx.revert()
  }, [])

  // Las tarjetas entran escalonadas al cargar y al cambiar de pestaña
  useLayoutEffect(() => {
    if (reduceMotion() || !gridRef.current) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(gridRef.current.children, { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.04, ease: 'power3.out', clearProps: 'transform' })
    }, gridRef)
    return () => ctx.revert()
  }, [activeTab])

  return (
    <Box bg="brand.black" minH="100vh" pt={{ base: '96px', md: '120px' }}>
      <Seo
        title="Nuestros representados"
        description="Futbolistas y directores técnicos representados por Moon Sports Group: perfiles, clubes, estadísticas y trayectoria en las ligas de Sudamérica."
        path="/jugadores"
        jsonLd={[
          playersListSchema(players),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Representados', path: '/jugadores' },
          ]),
        ]}
      />

      <Box maxW="1280px" mx="auto" px={{ base: 4, md: 12 }} pb={{ base: '72px', md: '110px' }}>
        {/* ---- Encabezado ---- */}
        <Flex ref={headerRef} justify="space-between" align={{ base: 'flex-start', md: 'flex-end' }} direction={{ base: 'column', md: 'row' }} gap={7} mb={10}>
          <Flex className="jug-head" direction="column" gap={4} maxW="680px">
            <Text className="section-label">Moon Sports Group</Text>
            <Heading as="h1" fontFamily="display" fontWeight={400} textTransform="uppercase"
              fontSize={{ base: '64px', md: '96px', xl: '120px' }} lineHeight={0.88} letterSpacing="0.01em">
              Nuestros <Box as="span" color="brand.gold">representados</Box>
            </Heading>
            <Text fontSize="16px" fontWeight={300} lineHeight={1.7} color="brand.whiteMuted" maxW="34em">
              Futbolistas y técnicos que confían en Moon Sports Group para gestionar su carrera. Tocá cualquiera para ver su ficha.
            </Text>
          </Flex>
          <Flex className="jug-head" gap={7} w={{ base: '100%', md: 'auto' }} justify={{ base: 'space-between', md: 'flex-start' }}>
            {[[players.length, 'Representados'], [CLUBS, 'Clubes'], [COUNTRIES, 'Países']].map(([n, l]) => (
              <Box key={l}>
                <Text fontFamily="display" fontSize={{ base: '42px', md: '52px' }} lineHeight={0.85}>{n}</Text>
                <Text fontSize="10.5px" letterSpacing="0.16em" textTransform="uppercase" color="rgba(255,255,255,0.42)">{l}</Text>
              </Box>
            ))}
          </Flex>
        </Flex>

        {/* ---- Filtro Jugadores / DT ---- */}
        <Flex role="tablist" aria-label="Filtrar representados" gap={2} borderBottom="1px solid rgba(255,255,255,0.08)" mb={7} overflowX="auto"
          sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
          {TABS.map((t) => {
            const on = activeTab === t.key
            return (
              <Box
                key={t.key}
                as="button"
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActiveTab(t.key)}
                flexShrink={0}
                px="14px"
                py={3}
                mb="-1px"
                fontFamily="label"
                fontSize="19px"
                letterSpacing="0.1em"
                color={on ? 'brand.gold' : 'brand.whiteMuted'}
                borderBottom="2px solid"
                borderColor={on ? 'brand.gold' : 'transparent'}
                transition="color 200ms ease, border-color 200ms ease"
                sx={{ '@media (hover: hover) and (pointer: fine)': { _hover: { color: on ? 'brand.gold' : 'brand.white' } } }}
              >
                {t.label}
                <Text as="span" fontFamily="body" fontSize="11px" fontWeight={600} ml="6px" opacity={0.55}>{count(t.key)}</Text>
              </Box>
            )
          })}
        </Flex>

        {/* ---- Grilla ---- */}
        <Grid
          ref={gridRef}
          role="tabpanel"
          templateColumns={{ base: `repeat(${COLS.base}, 1fr)`, md: `repeat(${COLS.md}, 1fr)`, lg: `repeat(${COLS.lg}, 1fr)` }}
          gap={{ base: '10px', md: 4 }}
        >
          {list.map((player) => (
            <Box key={player.id}>
              <PlayerCard player={player} onClick={setSelectedPlayer} showStats />
            </Box>
          ))}

          {/* Completa la última fila: la grilla nunca queda con huecos */}
          <Flex
            as={RouterLink}
            to="/#contacto"
            gridColumn={{ base: spanFor(list.length, COLS.base), md: spanFor(list.length, COLS.md), lg: spanFor(list.length, COLS.lg) }}
            direction="column"
            justify="center"
            align="flex-start"
            gap={3}
            p={{ base: 5, md: 7 }}
            minH={{ base: '200px', md: '260px' }}
            borderRadius="xl"
            border="1px dashed rgba(201,168,76,0.35)"
            bg="radial-gradient(120% 90% at 50% 100%, rgba(201,168,76,0.08), transparent 65%), #0A0A0A"
            transition="border-color 300ms ease, transform 300ms cubic-bezier(.23,1,.32,1)"
            sx={{ '@media (hover: hover) and (pointer: fine)': { _hover: { borderColor: 'rgba(201,168,76,0.6)', transform: 'translateY(-4px)' } } }}
          >
            <Text fontFamily="display" fontSize={{ base: '32px', md: '40px' }} lineHeight={0.9} textTransform="uppercase">
              ¿Querés ser <Box as="span" color="brand.gold">parte</Box>?
            </Text>
            <Text fontSize="14px" color="brand.whiteMuted" maxW="26em">
              {activeTab === 'player'
                ? 'Si sos futbolista y buscás representación, hablemos.'
                : 'Si sos director técnico y buscás un nuevo proyecto, hablemos.'}
            </Text>
            <Box as="span" mt={1} px={5} py="12px" borderRadius="4px" bg="linear-gradient(135deg, #C9A84C, #9A7A35)" color="brand.black"
              fontSize="12px" fontWeight={600} letterSpacing="0.12em" textTransform="uppercase">
              Quiero que me representen
            </Box>
          </Flex>
        </Grid>
      </Box>

      <Footer />
      <PlayerModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} list={list} />
    </Box>
  )
}
