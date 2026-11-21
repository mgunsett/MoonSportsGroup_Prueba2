import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Button, Flex, Grid, Heading, Text, useDisclosure } from '@chakra-ui/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWeekAgenda } from '../../hooks/useWeekAgenda'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { namesLine } from '../../utils/agenda'
import { Avatars, Shield, hasScore } from './parts'
import AgendaModal from './AgendaModal'

// ─── PARTIDOS DE LA SEMANA ───────────────────────────────────────
// Va entre los jugadores y "Qué hacemos". Los datos salen de
// panel_resultados (API-Football → Firestore). Si esta semana no hay
// partidos (receso, pretemporada) o Firebase no está configurado, la
// sección no se muestra y el resto de la home queda igual.

const BOARD_ROWS = 5

export default function MatchAgenda() {
  const { isLoading, matches, week } = useWeekAgenda()
  if (isLoading || matches.length === 0) return null
  return <AgendaContent matches={matches} week={week} />
}

function AgendaContent({ matches, week }) {
  const ref = useGsapReveal('up', 0.08)
  const modal = useDisclosure()
  const location = useLocation()

  // La sección aparece después de cargar los datos y empuja lo que
  // está debajo: las animaciones de scroll de las otras secciones
  // tienen que recalcular dónde empiezan.
  useEffect(() => {
    ScrollTrigger.refresh()
    if (location.hash === '#agenda') {
      document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { live, upcoming, finished, people, countries } = useMemo(() => ({
    live: matches.filter((m) => m.status === 'live').length,
    upcoming: matches.filter((m) => m.status === 'next').length,
    finished: matches.filter((m) => m.status === 'ft').length,
    people: new Set(matches.flatMap((m) => m.players.map((p) => p.id))).size,
    countries: new Set(matches.map((m) => m.country)).size,
  }), [matches])

  // La placa muestra lo que viene (en juego + próximos). Si la semana
  // ya se jugó entera, muestra los resultados, del más reciente al más viejo.
  const pending = matches.filter((m) => m.status !== 'ft')
  const showingResults = pending.length === 0
  const rows = (showingResults ? [...matches].reverse() : pending).slice(0, BOARD_ROWS)
  const first = rows[0].when.dayMid
  const last = rows[rows.length - 1].when.dayMid
  const range = showingResults ? week : first === last ? first : `${first} – ${last}`

  return (
    <Box
      as="section"
      id="agenda"
      aria-labelledby="agenda-title"
      py={{ base: '72px', md: '110px' }}
      bg="brand.coal"
      color="brand.cream"
      position="relative"
      overflow="hidden"
    >
      {/* Trazos finos, como en las placas de Instagram */}
      <Box
        as="svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
        position="absolute" inset={0} w="100%" h="100%" pointerEvents="none"
        sx={{ '*': { fill: 'none', stroke: 'rgba(242,230,207,0.05)', strokeWidth: 1 } }}
      >
        <circle cx="1240" cy="60" r="380" />
        <circle cx="1240" cy="60" r="520" />
        <line x1="0" y1="640" x2="700" y2="800" />
      </Box>

      <Grid
        ref={ref}
        maxW="1280px" mx="auto" px={{ base: 6, md: 12 }} position="relative"
        templateColumns={{ base: '1fr', lg: 'minmax(0,1fr) 560px' }}
        gap={{ base: 10, lg: 16 }}
        alignItems="center"
      >
        {/* ---- Texto ---- */}
        <Flex direction="column" gap={5} minW={0}>
          <Text className="section-label gsap-reveal">Agenda · {week}</Text>
          <Heading
            id="agenda-title"
            className="gsap-reveal"
            as="h2"
            fontFamily="display"
            fontWeight={400}
            textTransform="uppercase"
            fontSize={{ base: '58px', md: '84px', xl: '96px' }}
            lineHeight={0.88}
            letterSpacing="0.01em"
          >
            Partidos de{' '}
            <Box as="span" color="brand.gold">la semana</Box>
          </Heading>
          <Text className="gsap-reveal" fontSize="16px" fontWeight={300} lineHeight={1.7} color="brand.creamMuted" maxW="34em">
            Dónde y cuándo juegan nuestros representados. Esta semana tenemos{' '}
            <Text as="strong" color="brand.cream" fontWeight={500}>
              {people} {people === 1 ? 'profesional' : 'profesionales'} en cancha
            </Text>
            , en {matches.length} {matches.length === 1 ? 'partido' : 'partidos'}
            {countries > 1 ? ` de ${countries} países` : ''}.
          </Text>

          <Flex className="gsap-reveal" borderTop="1px solid" borderColor="brand.line" pt={5} mt={1}>
            <Tally value={live} label="En juego" live={live > 0} />
            <Tally value={upcoming} label="Por jugar" />
            <Tally value={finished} label="Finalizados" />
          </Flex>
        </Flex>

        {/* ---- Placa ---- */}
        <Box
          className="gsap-reveal"
          bg="linear-gradient(180deg, #26221e, #221e1a)"
          border="1px solid" borderColor="brand.line" borderRadius="8px" overflow="hidden"
          boxShadow="0 40px 80px rgba(0,0,0,0.4)"
        >
          <Flex justify="space-between" align="flex-end" gap={3} px={{ base: 4, md: 6 }} pt={{ base: 5, md: 6 }} pb={4} borderBottom="1px solid" borderColor="brand.line">
            <Heading as="h3" fontFamily="display" fontWeight={400} textTransform="uppercase" fontSize={{ base: '30px', md: '40px' }} lineHeight={0.9} whiteSpace="nowrap">
              {showingResults ? 'Resultados' : 'Próximos partidos'}
            </Heading>
            <Text fontFamily="label" fontSize="15px" letterSpacing="0.12em" color="brand.gold" textAlign="right" textTransform="uppercase">
              {range}
            </Text>
          </Flex>

          <Box as="ul" listStyleType="none">
            {rows.map((m) => <BoardRow key={m.key} match={m} />)}
          </Box>

          <Flex px={{ base: 4, md: 6 }} py={4} justify="space-between" align="center" gap={3} direction={{ base: 'column', sm: 'row' }}>
            <Text fontSize="12px" color="brand.creamFaint">Horario de Argentina</Text>
            <Button
              onClick={modal.onOpen}
              variant="gold"
              w={{ base: '100%', sm: 'auto' }}
              px={6} py={6}
              color="brand.coal"
            >
              Ver agenda completa
              <Text as="span" fontFamily="label" fontSize="15px" letterSpacing="0.06em" opacity={0.75} ml={2}>· {matches.length}</Text>
            </Button>
          </Flex>
        </Box>
      </Grid>

      <AgendaModal isOpen={modal.isOpen} onClose={modal.onClose} matches={matches} week={week} />
    </Box>
  )
}

function Tally({ value, label, live = false }) {
  return (
    <Flex
      direction="column" gap="2px" flex={1}
      _notFirst={{ pl: { base: 3, md: 5 }, borderLeft: '1px solid', borderColor: 'brand.line' }}
    >
      <Text fontFamily="display" fontSize={{ base: '36px', md: '44px' }} lineHeight={0.9} color={live ? 'brand.live' : 'brand.cream'} sx={{ fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </Text>
      <Text fontSize={{ base: '9.5px', md: '11px' }} letterSpacing={{ base: '0.12em', md: '0.18em' }} textTransform="uppercase" color="brand.creamMuted">
        {label}
      </Text>
    </Flex>
  )
}

function BoardRow({ match: m }) {
  const isLive = m.status === 'live'
  const played = hasScore(m.home)
  return (
    <Grid
      as="li"
      templateColumns={{ base: '58px minmax(0,1fr)', md: '66px minmax(0,1fr) auto' }}
      gap={{ base: 3, md: 4 }}
      alignItems="center"
      px={{ base: 4, md: 6 }} py="14px"
      borderBottom="1px solid" borderColor="brand.line"
      bg={isLive ? 'linear-gradient(90deg, rgba(229,72,77,0.08), transparent 60%)' : 'transparent'}
      transition="background-color 200ms ease"
      sx={{ '@media (hover: hover) and (pointer: fine)': { _hover: { bg: isLive ? undefined : 'rgba(242,230,207,0.035)' } } }}
    >
      {/* Cuándo */}
      <Flex direction="column" gap="3px">
        {isLive ? (
          <Text fontFamily="label" fontSize="18px" lineHeight={1} color="brand.live" letterSpacing="0.04em">En juego</Text>
        ) : m.status === 'ft' ? (
          <Text fontFamily="label" fontSize="18px" lineHeight={1} color="brand.creamMuted" letterSpacing="0.04em">Final</Text>
        ) : (
          <Text fontFamily="label" fontSize="24px" lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {m.when.hasTime ? m.when.time : '—'}
          </Text>
        )}
        <Text fontSize="10px" letterSpacing="0.16em" textTransform="uppercase" color="brand.creamMuted">
          {m.when.isToday ? 'Hoy' : m.when.dayShort}
        </Text>
        {m.status === 'next' && m.when.showLocal && (
          <Text fontSize="10.5px" color="brand.creamFaint" sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {m.when.localTime} {m.when.localAbbr}
          </Text>
        )}
      </Flex>

      {/* Partido */}
      <Flex direction="column" gap="5px" minW={0}>
        <Flex align="flex-start" gap={2} minW={0}>
          <Shield team={m.home} size="22px" />
          {/* En mobile el partido puede ocupar dos líneas en vez de cortar los nombres */}
          <Text fontSize="15px" fontWeight={600} lineHeight={1.35} noOfLines={{ base: 2, md: 1 }} minW={0}>
            {m.home.name}{' '}
            {played ? (
              <Text as="span" fontFamily="label" fontSize="19px" fontWeight={400} mx={1}>{m.home.score}–{m.away.score}</Text>
            ) : (
              <Text as="span" fontFamily="label" fontSize="14px" fontWeight={400} letterSpacing="0.1em" color="brand.creamFaint" mx={1}>vs</Text>
            )}{' '}
            {m.away.name}
          </Text>
        </Flex>
        <Text fontSize="12.5px" color="brand.creamMuted" noOfLines={1}>
          {m.players.length > 1 ? 'Juegan' : 'Juega'}:{' '}
          <Text as="strong" color="brand.cream" fontWeight={500}>{namesLine(m.players)}</Text>
          {m.competition ? ` · ${m.competition}` : ''}
        </Text>
      </Flex>

      <Box display={{ base: 'none', md: 'block' }}>
        <Avatars players={m.players} max={3} />
      </Box>
    </Grid>
  )
}
