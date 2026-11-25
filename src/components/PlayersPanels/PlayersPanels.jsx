import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import PlayerModal from '../PlayerModal/PlayerModal'
import PlayersSpotlight from './PlayersSpotlight'
import { players } from '../../utils/players'


const LINES = [
  (p) => p.position === 'Delantero',
  (p) => p.position.startsWith('Extremo'),
  (p) => /Volante|Mediocampista/.test(p.position),
  (p) => p.position.startsWith('Defensor'),
  (p) => p.type === 'coach',
]

// Tres números según el puesto
function statsOf(p) {
  const s = p.stats
  if (p.type === 'coach') return [[s.matches, 'Dirigidos'], [s.wins, 'Victorias'], [s.draws, 'Empates']]
  if (s.cleanSheets != null) return [[s.matches, 'Partidos'], [s.goals, 'Goles'], [s.cleanSheets, 'Vallas inv.']]
  return [[s.matches, 'Partidos'], [s.goals, 'Goles'], [s.assists, 'Asist.']]
}

const dorsal = (p) => (p.type === 'coach' ? 'DT' : String(p.number).trim())
const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const EASE = 'cubic-bezier(.23,1,.32,1)'

const panelStyles = {
  '.pn': {
    position: 'relative', flex: '1 1 0', minW: 0, overflow: 'hidden', borderRadius: '10px', textAlign: 'left', p: 0,
    bg: 'radial-gradient(120% 70% at 50% 100%, rgba(201,168,76,.16), transparent 70%), linear-gradient(180deg, #171512, #0b0b0b)',
    border: '1px solid rgba(255,255,255,.08)', cursor: 'pointer',
    transition: `flex-grow 700ms ${EASE}, border-color 300ms ease`,
  },
  '.pn.on': { flexGrow: 7.5, borderColor: 'rgba(201,168,76,.45)' },
  '.pn > img': {
    position: 'absolute', left: '50%', bottom: 0, h: '92%', w: 'auto', maxW: 'none', transform: 'translateX(-50%)',
    filter: 'grayscale(1) brightness(.5)', transition: `filter 500ms ease, left 700ms ${EASE}`,
  },
  '.pn.on > img': { filter: 'none', left: '68%' },
  '.pn::after': { content: '""', position: 'absolute', inset: 0, bg: 'linear-gradient(180deg, transparent 40%, rgba(8,8,8,.95))' },
  '.num': {
    position: 'absolute', top: '14px', left: '50%', transform: 'translateX(-50%)', zIndex: 2,
    fontFamily: 'label', fontSize: '22px', lineHeight: 1, color: 'brand.gold',
    transition: `left 500ms ${EASE}, transform 500ms ${EASE}, font-size 400ms ease`,
  },
  '.pn.on .num': { left: '26px', top: '22px', transform: 'none', fontSize: '120px', lineHeight: 0.8, color: 'rgba(201,168,76,.22)' },
  '.vt': {
    position: 'absolute', left: '50%', bottom: '22px', zIndex: 2, transform: 'translateX(-50%) rotate(180deg)',
    writingMode: 'vertical-rl', whiteSpace: 'nowrap', fontFamily: 'label', fontSize: '21px', letterSpacing: '.08em',
    color: 'brand.white', transition: 'opacity 250ms ease',
  },
  '.pn.on .vt': { opacity: 0 },
  '.det': {
    position: 'absolute', left: '28px', right: '28px', bottom: '26px', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '12px',
    maxW: '340px', opacity: 0, transform: 'translateY(14px)', pointerEvents: 'none',
    transition: `opacity 250ms ease, transform 300ms ${EASE}`,
  },
  '.pn.on .det': { opacity: 1, transform: 'none', transition: `opacity 400ms ease 250ms, transform 500ms ${EASE} 250ms` },
  '.pn:focus-visible': { outline: '2px solid', outlineColor: 'brand.gold', outlineOffset: '3px' },

  '@media (prefers-reduced-motion: reduce)': {
    '.pn, .pn > img, .det, .num': { transition: 'none !important' },
  },
}

export default function PlayersPanels() {
  const headerRef = useGsapReveal('up', 0.12)
  const panelsRef = useGsapReveal('up', 0.04)
  const [modalPlayer, setModalPlayer] = useState(null)

  const ordered = useMemo(() => LINES.flatMap((match) => players.filter(match)), [])
  // Arranca abierto en el goleador del plantel
  const [active, setActive] = useState(() => {
    const top = ordered.reduce((best, p, i) => ((p.stats.goals ?? -1) > (ordered[best].stats.goals ?? -1) ? i : best), 0)
    return top
  })

  const handleClick = (i) => {
    if (active === i) setModalPlayer(ordered[i])
    else setActive(i)
  }

  return (
    <Box as="section" id="jugadores-home" aria-labelledby="jugadores-title" py={{ base: '72px', md: '110px' }} bg="brand.black" position="relative" overflow="clip">
      <Box maxW="1280px" mx="auto" px={{ base: 4, md: 12 }}>
        {/* ---- Encabezado ---- */}
        <Flex ref={headerRef} justify="space-between" align={{ base: 'flex-start', md: 'flex-end' }} direction={{ base: 'column', md: 'row' }} gap={6} mb={{ base: 8, md: 9 }}>
          <Flex direction="column" gap={4} maxW="640px">
            <Text className="section-label gsap-reveal">Representados</Text>
            <Heading id="jugadores-title" className="gsap-reveal" as="h2" fontFamily="display" fontWeight={400} textTransform="uppercase"
              fontSize={{ base: '58px', md: '84px', xl: '96px' }} lineHeight={0.88} letterSpacing="0.01em">
              Nuestros <Box as="span" color="brand.gold">jugadores</Box>
            </Heading>
            
          </Flex>
          <Flex
            as={RouterLink} to="/jugadores" className="gsap-reveal" align="center" gap={2} flexShrink={0}
            fontSize="12px" fontWeight={600} letterSpacing="0.16em" textTransform="uppercase" color="brand.whiteMuted"
            transition="color 200ms ease"
            sx={{ '@media (hover: hover) and (pointer: fine)': { _hover: { color: 'brand.gold' } } }}
          >
            Ver todos <ArrowRight />
          </Flex>
        </Flex>

        {/* ---- Mobile y tablet: plantel en foco ---- */}
        <Box display={{ base: 'block', lg: 'none' }}>
          <PlayersSpotlight list={ordered} statsOf={statsOf} dorsal={dorsal} onOpen={setModalPlayer} modalOpen={!!modalPlayer} />
        </Box>

        {/* ---- Desktop: paneles ---- */}
        <Box sx={panelStyles} display={{ base: 'none', lg: 'block' }}>
          <Flex ref={panelsRef} className="panels" gap="6px" h="min(600px, 72vh)">
            {ordered.map((p, i) => {
              const on = i === active
              return (
                <Box
                  as="button"
                  type="button"
                  key={p.id}
                  className={`pn gsap-reveal${on ? ' on' : ''}`}
                  aria-expanded={on}
                  aria-label={`${p.name} ${p.lastname}, ${p.position}. ${on ? 'Abrir ficha' : 'Ver'}`}
                  onClick={() => handleClick(i)}
                  onMouseEnter={() => { if (canHover()) setActive(i) }}
                >
                  <img src={p.image} alt="" loading="lazy" />
                  <span className="num" aria-hidden="true">{dorsal(p)}</span>
                  <span className="vt" aria-hidden="true">{p.lastname}</span>

                  <span className="det" aria-hidden={!on}>
                    <Text as="span" fontSize="11px" fontWeight={600} letterSpacing="0.22em" textTransform="uppercase" color="brand.gold">
                      {p.position}
                    </Text>
                    <Text as="span" fontFamily="display" fontSize={{ base: '44px', md: 'clamp(46px, 4.4vw, 68px)' }} lineHeight={0.88} textTransform="uppercase" color="brand.white">
                      {p.name}
                      <Box as="span" display="block" color="brand.gold">{p.lastname}</Box>
                    </Text>
                    <Flex as="span" align="center" gap={2} fontSize="13px" color="brand.whiteMuted">
                      {p.escudo && <Image src={p.escudo} alt="" w="18px" h="18px" objectFit="contain" />}
                      {p.club}
                    </Flex>
                    <Flex as="span" gap="22px" borderTop="1px solid rgba(255,255,255,0.16)" pt={3}>
                      {statsOf(p).map(([n, label]) => (
                        <Box as="span" key={label}>
                          <Text as="span" display="block" fontFamily="label" fontSize="30px" lineHeight={1} color="brand.gold">{n}</Text>
                          <Text as="span" fontSize="9.5px" letterSpacing="0.16em" textTransform="uppercase" color="rgba(255,255,255,0.45)">{label}</Text>
                        </Box>
                      ))}
                    </Flex>
                    <Flex as="span" alignSelf="flex-start" align="center" gap={2} px={5} py={3} borderRadius="full" bg="brand.gold" color="brand.black"
                      fontSize="11.5px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase">
                      Ver ficha <ArrowRight />
                    </Flex>
                  </span>
                </Box>
              )
            })}
          </Flex>
        </Box>
      </Box>

      <PlayerModal player={modalPlayer} isOpen={!!modalPlayer} onClose={() => setModalPlayer(null)} list={ordered} />
    </Box>
  )
}
