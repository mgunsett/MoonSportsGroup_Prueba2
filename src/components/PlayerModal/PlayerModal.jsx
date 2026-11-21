import { useEffect, useMemo, useState } from 'react'
import { Box, Flex, Grid, Image, Modal, ModalContent, ModalOverlay, Text, useBreakpointValue } from '@chakra-ui/react'
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaThreads, FaXTwitter } from 'react-icons/fa6'
import { FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi'
import { players as allPlayers } from '../../utils/players'
import { useSeasonStats } from '../../hooks/useSeasonStats'

// ─── FICHA DEL REPRESENTADO · Radar ──────────────────────────────
// Modelo "Radar" (Estadísticas N3) del catálogo plantillas_skills:
// apellido gigante de fondo, recorte al centro, datos a la izquierda y
// radar de atributos + números a la derecha. Anterior / Siguiente (y las
// flechas del teclado) recorren la lista sin cerrar. En mobile ocupa
// toda la pantalla: foto arriba, datos y radar abajo.
//
// Props: player (el que se abre), isOpen, onClose y, opcional, `list`
// (el orden en que se navega; por defecto, todos los representados).

const EASE = 'cubic-bezier(.23,1,.32,1)'
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

const RATING_LABEL = {
  pase: 'Pase', vision: 'Visión', regate: 'Regate', tecnica: 'Técnica', efectividad: 'Efectividad', recuperacion: 'Recuperación',
  aereo: 'Juego aéreo', desbordes: 'Desborde', creatividad: 'Creatividad', disparo: 'Disparo', tactica: 'Táctica',
  motivacion: 'Motivación', formacion: 'Formación', estrategia: 'Estrategia', velocidad: 'Velocidad', definicion: 'Definición',
  marca: 'Marca', anticipacion: 'Anticipación', distribucion: 'Distribución', oportunidades: 'Oportunidades',
  liderazgo: 'Liderazgo', resistencia: 'Resistencia',
}
const label = (k) => RATING_LABEL[k] || k.charAt(0).toUpperCase() + k.slice(1)

const SOCIALS = {
  instagram: { icon: FaInstagram, name: 'Instagram' },
  twitter: { icon: FaXTwitter, name: 'X' },
  threads: { icon: FaThreads, name: 'Threads' },
  tiktok: { icon: FaTiktok, name: 'TikTok' },
}

function fmtDate(s) {
  if (!s) return '—'
  const [y, m, d] = s.split('-')
  return `${+d} de ${MONTHS[+m - 1]} de ${y}`
}

function getAge(s) {
  if (!s) return null
  const b = new Date(s)
  const t = new Date()
  let a = t.getFullYear() - b.getFullYear()
  if (t < new Date(t.getFullYear(), b.getMonth(), b.getDate())) a -= 1
  return a
}

function statsOf(p) {
  const s = p.stats || {}
  if (p.type === 'coach') return [[s.matches, 'Dirigidos'], [s.wins, 'Victorias'], [s.draws, 'Empates']]
  if (s.cleanSheets != null) return [[s.matches, 'Partidos'], [s.goals, 'Goles'], [s.cleanSheets, 'Vallas inv.']]
  return [[s.matches, 'Partidos'], [s.goals, 'Goles'], [s.assists, 'Asist.']]
}

/* ──────── Radar de atributos (SVG) ──────── */
function Radar({ ratings }) {
  const entries = Object.entries(ratings || {})
  if (entries.length < 3) return null
  const R = 100
  const cx = 150
  const cy = 130
  const n = entries.length
  const pt = (i, r) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }
  const poly = (r) => entries.map((_, i) => pt(i, r).join(',')).join(' ')
  const area = entries.map(([, v], i) => pt(i, (R * v) / 100).join(',')).join(' ')

  return (
    <Box
      as="svg"
      viewBox="-62 0 424 260"
      w="100%"
      maxW="340px"
      mx="auto"
      display="block"
      role="img"
      aria-label={`Atributos: ${entries.map(([k, v]) => `${label(k)} ${v}`).join(', ')}`}
      sx={{
        '.grid *': { fill: 'none', stroke: 'rgba(255,255,255,0.1)' },
        '.area': { fill: 'rgba(201,168,76,0.28)', stroke: '#C9A84C', strokeWidth: 1.5 },
        text: { fill: 'rgba(255,255,255,0.62)', fontFamily: 'Outfit, sans-serif', fontSize: '9.5px', letterSpacing: '0.06em', textTransform: 'uppercase' },
        'text.v': { fill: '#C9A84C', fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px' },
      }}
    >
      <g className="grid">
        {[0.25, 0.5, 0.75, 1].map((f) => <polygon key={f} points={poly(R * f)} />)}
        {entries.map(([k], i) => {
          const [x, y] = pt(i, R)
          return <line key={k} x1={cx} y1={cy} x2={x} y2={y} />
        })}
      </g>
      <polygon className="area" points={area} />
      {entries.map(([k, v], i) => {
        const [x, y] = pt(i, R + 20)
        const anchor = x < cx - 5 ? 'end' : x > cx + 5 ? 'start' : 'middle'
        return (
          <g key={k}>
            <text x={x} y={y} textAnchor={anchor}>{label(k)}</text>
            <text className="v" x={x} y={y + 13} textAnchor={anchor}>{v}</text>
          </g>
        )
      })}
    </Box>
  )
}

/* ──────── Temporada en curso (desde panel_resultados) ──────── */
function SeasonStats({ slug }) {
  const season = useSeasonStats(slug)
  if (!season) return null // cargando, sin datos o DT sin estadísticas
  const items = [
    [season.partidos, 'Partidos'],
    [season.goles, 'Goles'],
    [season.asistencias, 'Asist.'],
    [season.minutos != null ? `${Number(season.minutos).toLocaleString('es-AR')}'` : null, 'Minutos'],
    [season.rating != null ? Number(season.rating).toFixed(1) : null, 'Rating'],
  ].filter(([v]) => v != null)

  return (
    <Box border="1px solid rgba(201,168,76,0.3)" borderRadius="10px" bg="rgba(201,168,76,0.06)" px={4} py={3}
      sx={{ animation: `seasonIn 300ms ${EASE}`, '@keyframes seasonIn': { from: { opacity: 0, transform: 'translateY(6px)' } }, '@media (prefers-reduced-motion: reduce)': { animation: 'none' } }}>
      <Flex justify="space-between" align="baseline" mb={2}>
        <Text fontSize="10.5px" fontWeight={600} letterSpacing="0.2em" textTransform="uppercase" color="brand.gold">
          Temporada {season.temporada}
        </Text>
        <Text fontSize="10px" color="rgba(255,255,255,0.4)">API-Football</Text>
      </Flex>
      <Grid templateColumns={`repeat(${items.length}, minmax(0,1fr))`} gap={2}>
        {items.map(([v, l]) => (
          <Box key={l} minW={0}>
            <Text fontFamily="label" fontSize={{ base: '22px', md: '26px' }} lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>{v}</Text>
            <Text fontSize="9px" letterSpacing="0.12em" textTransform="uppercase" color="rgba(255,255,255,0.42)" noOfLines={1}>{l}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

const roundBtn = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'full',
  border: '1px solid rgba(255,255,255,0.18)', color: 'brand.whiteMuted',
  transition: `color 200ms ease, border-color 200ms ease, transform 160ms ${EASE}`,
  _active: { transform: 'scale(0.95)' },
  sx: { '@media (hover: hover) and (pointer: fine)': { _hover: { color: 'brand.gold', borderColor: 'brand.gold' } } },
}

export default function PlayerModal({ player, isOpen, onClose, list }) {
  const isMobile = useBreakpointValue({ base: true, lg: false }, { ssr: false })
  const order = useMemo(() => (list && list.length ? list : allPlayers), [list])
  const [current, setCurrent] = useState(player)

  // Al abrir (o cambiar el jugador desde afuera) se muestra ese
  useEffect(() => { if (player) setCurrent(player) }, [player])

  const go = (dir) => {
    const i = order.findIndex((p) => p.id === current?.id)
    setCurrent(order[(i + dir + order.length) % order.length])
  }

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }) // se re-suscribe en cada render para usar el `current` actual

  const p = current
  if (!p) return null
  const isCoach = p.type === 'coach'
  const dorsal = isCoach ? 'DT' : String(p.number).trim()
  const age = getAge(p.birthDate)
  const socials = Object.entries(p.socials || {}).filter(([k, url]) => url && SOCIALS[k])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? 'full' : '6xl'} isCentered={!isMobile} motionPreset={isMobile ? 'slideInBottom' : 'scale'} scrollBehavior="inside">
      <ModalOverlay bg="rgba(0,0,0,0.78)" backdropFilter="blur(6px)" />
      <ModalContent
        aria-label={`Ficha de ${p.name} ${p.lastname}`}
        bg="transparent"
        boxShadow="none"
        m={isMobile ? 0 : 'auto'}
        maxW={isMobile ? '100vw' : 'min(1180px, calc(100vw - 48px))'}
        maxH={isMobile ? '100dvh' : 'calc(100dvh - 48px)'}
        h={isMobile ? '100dvh' : 'auto'}
        borderRadius={isMobile ? 0 : '14px'}
        overflow="hidden"
      >
        <Grid
          key={p.id}
          position="relative"
          templateColumns={{ base: '1fr', lg: 'minmax(0,1fr) minmax(0,1.05fr) minmax(0,1fr)' }}
          minH={{ base: '100dvh', lg: '600px' }}
          maxH={{ base: '100dvh', lg: 'calc(100dvh - 48px)' }}
          overflowY={{ base: 'auto', lg: 'hidden' }}
          bg="radial-gradient(70% 70% at 45% 70%, rgba(201,168,76,0.16), transparent 70%), #0C0C0C"
          border={{ base: 'none', lg: '1px solid rgba(201,168,76,0.3)' }}
          borderRadius={{ base: 0, lg: '14px' }}
          color="brand.white"
          sx={{
            animation: `fichaIn 320ms ${EASE}`,
            '@keyframes fichaIn': { from: { opacity: 0, transform: 'translateY(8px)' } },
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        >
          {/* Cerrar */}
          <Box as="button" type="button" onClick={onClose} aria-label="Cerrar ficha" position="absolute" top={{ base: 3, lg: 4 }} right={{ base: 3, lg: 4 }}
            zIndex={5} w="40px" h="40px" bg="rgba(0,0,0,0.5)" {...roundBtn}>
            <FiX size={18} />
          </Box>

          {/* Apellido gigante de fondo */}
          <Text aria-hidden="true" position="absolute" left="50%" top={{ base: '180px', lg: '46%' }} transform="translate(-50%, -50%)"
            fontFamily="display" fontSize={{ base: '150px', lg: 'clamp(180px, 22vw, 300px)' }} lineHeight={0.8} whiteSpace="nowrap"
            textTransform="uppercase" color="transparent" pointerEvents="none" sx={{ WebkitTextStroke: '1.5px rgba(201,168,76,0.18)' }}>
            {p.lastname}
          </Text>

          {/* Recorte (arriba en mobile, al centro en desktop) */}
          <Box position="relative" zIndex={1} order={{ base: -1, lg: 0 }} gridColumn={{ lg: 2 }} gridRow={{ lg: 1 }} h={{ base: '340px', lg: 'auto' }}
            _after={{ content: '""', display: { base: 'block', lg: 'none' }, position: 'absolute', insetX: 0, bottom: 0, h: '35%', bg: 'linear-gradient(transparent, #0C0C0C)' }}>
            <Image src={p.image} alt={`${p.name} ${p.lastname}, ${p.position} de ${p.club}`} position="absolute" inset={0} w="100%" h="100%" objectFit="contain" objectPosition="bottom center"
              filter="drop-shadow(0 20px 40px rgba(0,0,0,0.7))" />
          </Box>

          {/* Datos */}
          <Flex position="relative" zIndex={1} gridColumn={{ lg: 1 }} gridRow={{ lg: 1 }} direction="column" justify="space-between" gap={6}
            px={{ base: 4, lg: 0 }} pl={{ lg: 8 }} pt={{ base: 0, lg: 8 }} pb={{ base: 2, lg: 7 }} mt={{ base: '-50px', lg: 0 }}>
            <Box>
              <Text aria-hidden="true" display={{ base: 'none', lg: 'block' }} fontFamily="label" fontSize="110px" lineHeight={0.8} color="brand.gold">{dorsal}</Text>
              <Text as="h2" fontFamily="display" fontSize={{ base: '44px', lg: '54px' }} lineHeight={0.86} textTransform="uppercase">
                {p.name}
                <Box as="span" display="block" color="brand.gold">{p.lastname}</Box>
              </Text>
              <Text mt={2} fontSize="11px" fontWeight={600} letterSpacing="0.22em" textTransform="uppercase" color="brand.whiteMuted">{p.position}</Text>
            </Box>

            <Grid as="dl" templateColumns="auto 1fr" columnGap={4} rowGap={2} fontSize="13.5px">
              {[
                ['Club', <Flex as="span" align="center" gap="6px" key="c">{p.escudo && <Image src={p.escudo} alt="" w="18px" h="18px" objectFit="contain" />}{p.club}</Flex>],
                ['País', p.nationality],
                ['Edad', age != null ? `${age} años` : '—'],
                ['Nacimiento', fmtDate(p.birthDate)],
              ].map(([k, v]) => (
                <Box key={k} display="contents">
                  <Text as="dt" alignSelf="center" fontSize="10.5px" letterSpacing="0.16em" textTransform="uppercase" color="rgba(255,255,255,0.42)">{k}</Text>
                  <Box as="dd">{v}</Box>
                </Box>
              ))}
            </Grid>

            {socials.length > 0 && (
              <Flex gap={2}>
                {socials.map(([k, url]) => {
                  const { icon: Icon, name } = SOCIALS[k]
                  return (
                    <Box key={k} as="a" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} de ${p.name} ${p.lastname}`} w="38px" h="38px" {...roundBtn}>
                      <Icon size={15} />
                    </Box>
                  )
                })}
              </Flex>
            )}
          </Flex>

          {/* Radar + números + navegación */}
          <Flex position="relative" zIndex={1} gridColumn={{ lg: 3 }} gridRow={{ lg: 1 }} direction="column" gap={5}
            px={{ base: 4, lg: 0 }} pr={{ lg: 8 }} pt={{ base: 4, lg: 8 }} pb={{ base: 8, lg: 7 }}>
            <Text fontSize="11px" fontWeight={600} letterSpacing="0.24em" textTransform="uppercase" color="brand.gold">
              {isCoach ? 'Perfil técnico' : 'Atributos'}
            </Text>
            <Radar ratings={p.stats?.ratings} />

            <Box borderTop="1px solid rgba(255,255,255,0.18)" pt="14px">
            <Text fontSize="10.5px" fontWeight={600} letterSpacing="0.2em" textTransform="uppercase" color="rgba(255,255,255,0.42)" mb={2}>
              En su carrera
            </Text>
            <Grid templateColumns="repeat(3, 1fr)">
              {statsOf(p).map(([n, l]) => (
                <Box key={l}>
                  <Text fontFamily="display" fontSize="46px" lineHeight={0.85} sx={{ fontVariantNumeric: 'tabular-nums' }}>{n ?? '—'}</Text>
                  <Text fontSize="10px" letterSpacing="0.16em" textTransform="uppercase" color="rgba(255,255,255,0.42)">{l}</Text>
                </Box>
              ))}
            </Grid>
            </Box>

            {!isCoach && <SeasonStats slug={p.slug} />}

            {p.bio && <Text fontSize="13.5px" lineHeight={1.6} color="rgba(255,255,255,0.6)">{p.bio}</Text>}

            {order.length > 1 && (
              <Flex gap={2} mt="auto">
                {[[-1, 'Anterior', FiArrowLeft], [1, 'Siguiente', FiArrowRight]].map(([dir, txt, Icon]) => (
                  <Box key={txt} as="button" type="button" onClick={() => go(dir)} aria-label={`Representado ${txt.toLowerCase()}`}
                    gap={2} px="14px" py="9px" fontSize="12px" {...roundBtn} flexDirection={dir > 0 ? 'row-reverse' : 'row'}>
                    <Icon size={14} />{txt}
                  </Box>
                ))}
              </Flex>
            )}
          </Flex>
        </Grid>
      </ModalContent>
    </Modal>
  )
}
