import { useState } from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

// Piezas compartidas por la placa y el modal de la agenda.

const blink = keyframes`50% { opacity: .25 }`

const initials = (name) => {
  const words = String(name || '').split(/\s+/).filter((w) => w && !/^(de|del|la|fc|fbc|cf|ac|club)$/i.test(w))
  return (words.length > 1 ? words.slice(0, 2).map((w) => w[0]).join('') : String(name || '').slice(0, 2)).toUpperCase()
}

// Escudo del equipo (URL de API-Football o de Storage). Sin escudo, o si
// no carga, iniciales. (El `fallback` de Chakra se ignora con loading="lazy",
// por eso el error se maneja a mano.)
export function Shield({ team, size = '28px' }) {
  const [failed, setFailed] = useState(false)
  const fallback = (
    <Flex
      w={size} h={size} flexShrink={0} borderRadius="full" align="center" justify="center"
      bg="brand.coal3" border="1px solid" borderColor="brand.line2"
      fontFamily="label" fontSize="12px" letterSpacing="0.04em" color="brand.creamMuted"
      aria-hidden="true"
    >
      {initials(team.name)}
    </Flex>
  )
  if (!team.shield || failed) return fallback
  return (
    <Image
      src={team.shield} alt="" w={size} h={size} flexShrink={0} objectFit="contain"
      loading="lazy" onError={() => setFailed(true)}
    />
  )
}

// Fotos superpuestas de los representados que juegan el partido.
export function Avatars({ players, max = 3, size = '34px', ring = 'brand.coal2' }) {
  const shown = players.slice(0, max)
  const extra = players.length - shown.length
  return (
    <Flex align="center" flexShrink={0} aria-hidden="true">
      {shown.map((p, i) => (
        <Box
          key={p.id} w={size} h={size} ml={i ? '-10px' : 0} borderRadius="full" overflow="hidden"
          border="2px solid" borderColor={ring} bg="radial-gradient(circle at 50% 25%, #4a3f2a, #2a241c)"
        >
          <Image src={p.image} alt="" w="100%" h="200%" objectFit="cover" objectPosition="50% 0" loading="lazy" />
        </Box>
      ))}
      {extra > 0 && (
        <Flex
          w={size} h={size} ml="-10px" borderRadius="full" align="center" justify="center"
          bg="brand.coal3" border="2px solid" borderColor={ring} fontSize="11px" fontWeight="600"
        >
          +{extra}
        </Flex>
      )}
    </Flex>
  )
}

const PILL = {
  live: { color: '#fff', bg: 'rgba(229,72,77,0.16)', borderColor: 'rgba(229,72,77,0.55)' },
  next: { color: 'brand.gold', bg: 'transparent', borderColor: 'rgba(201,168,76,0.45)' },
  ft:   { color: 'brand.creamMuted', bg: 'transparent', borderColor: 'brand.line2' },
}

export function StatusPill({ match }) {
  const { status, when } = match
  const label =
    status === 'live' ? 'En juego'
    : status === 'ft' ? 'Finalizado'
    : `${when.isToday ? 'Hoy' : when.dayShort} · ${when.hasTime ? when.time : 'a confirmar'}`
  return (
    <Flex
      as="span" align="center" gap="6px" whiteSpace="nowrap" px="9px" py="5px" borderRadius="full" border="1px solid"
      fontSize="10.5px" fontWeight="600" letterSpacing="0.14em" textTransform="uppercase"
      {...PILL[status]}
    >
      {status === 'live' && (
        <Box
          as="span" w="6px" h="6px" borderRadius="full" bg="brand.live"
          animation={`${blink} 1.4s ease-in-out infinite`}
          sx={{ '@media (prefers-reduced-motion: reduce)': { animation: 'none' } }}
        />
      )}
      {label}
    </Flex>
  )
}

// "17:00 ARG" y, si cambia, "15:00 PER" debajo.
export function Kickoff({ when, size = '24px' }) {
  if (!when.hasTime) {
    return <Text fontFamily="label" fontSize={size} lineHeight={1} color="brand.creamMuted">A conf.</Text>
  }
  return (
    <Flex direction="column" gap="2px">
      <Text fontFamily="label" fontSize={size} lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
        {when.time}
        <Text as="span" fontFamily="body" fontSize="10px" letterSpacing="0.12em" color="brand.creamFaint" ml="5px">ARG</Text>
      </Text>
      {when.showLocal && (
        <Text fontSize="11px" color="brand.creamMuted" sx={{ fontVariantNumeric: 'tabular-nums' }}>
          {when.localTime} {when.localAbbr}
        </Text>
      )}
    </Flex>
  )
}

export const hasScore = (team) => team.score !== null && team.score !== undefined
