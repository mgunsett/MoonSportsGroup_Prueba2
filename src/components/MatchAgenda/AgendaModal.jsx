import { useEffect, useMemo, useState } from 'react'
import {
  Box, Flex, Grid, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
  ModalHeader, ModalOverlay, Text, useBreakpointValue,
} from '@chakra-ui/react'
import { Kickoff, Shield, StatusPill, hasScore } from './parts'


export default function AgendaModal({ isOpen, onClose, matches, week }) {
  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: false })
  const [country, setCountry] = useState('Todos')

  useEffect(() => { if (isOpen) setCountry('Todos') }, [isOpen])

  const countries = useMemo(() => {
    const counts = new Map()
    matches.forEach((m) => counts.set(m.country, (counts.get(m.country) || 0) + 1))
    return [['Todos', matches.length], ...[...counts].sort((a, b) => b[1] - a[1])]
  }, [matches])

  const list = country === 'Todos' ? matches : matches.filter((m) => m.country === country)
  const days = [...new Set(list.map((m) => m.when.dayKey))]
  const people = new Set(matches.flatMap((m) => m.players.map((p) => p.id))).size

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isMobile ? 'full' : '3xl'}
      isCentered={!isMobile}
      scrollBehavior="inside"
      motionPreset={isMobile ? 'slideInBottom' : 'scale'}
    >
      <ModalOverlay bg="rgba(5,4,3,0.72)" backdropFilter="blur(4px)" />
      <ModalContent
        bg="brand.coal2"
        color="brand.cream"
        border="1px solid"
        borderColor="brand.line"
        borderRadius={isMobile ? '16px 16px 0 0' : '10px'}
        mt={isMobile ? 'auto' : undefined}
        mb={isMobile ? 0 : undefined}
        h={isMobile ? '92dvh' : undefined}
        maxH={isMobile ? '92dvh' : 'min(780px, calc(100dvh - 48px))'}
        overflow="hidden"
        boxShadow="0 40px 100px rgba(0,0,0,0.6)"
      >
        {isMobile && <Box w="40px" h="4px" borderRadius="2px" bg="brand.line2" mx="auto" mt="10px" aria-hidden="true" />}

        <ModalHeader px={{ base: 5, md: 7 }} pt={{ base: 3, md: 6 }} pb={4} borderBottom="1px solid" borderColor="brand.line">
          <Heading as="h2" fontFamily="display" fontWeight={400} textTransform="uppercase" fontSize={{ base: '36px', md: '44px' }} lineHeight={0.9} pr={12}>
            Agenda de la semana
          </Heading>
         

          {countries.length > 2 && (
            <Flex
              role="group" aria-label="Filtrar por país" gap={2} mt={4}
              overflowX="auto" mx={{ base: -5, md: 0 }} px={{ base: 5, md: 0 }} pb={1}
              sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
            >
              {countries.map(([c, n]) => {
                const on = c === country
                return (
                  <Box
                    as="button" type="button" key={c} onClick={() => setCountry(c)} aria-pressed={on}
                    flexShrink={0} px="14px" py="7px" borderRadius="full" border="1px solid"
                    borderColor={on ? 'brand.cream' : 'brand.line2'} bg={on ? 'brand.cream' : 'transparent'}
                    color={on ? 'brand.coal' : 'brand.creamMuted'} fontFamily="body" fontSize="13px" fontWeight={500}
                    transition="background-color 200ms ease, color 200ms ease, border-color 200ms ease, transform 160ms cubic-bezier(.23,1,.32,1)"
                    _active={{ transform: 'scale(0.96)' }}
                    _focusVisible={{ outline: '2px solid', outlineColor: 'brand.gold', outlineOffset: '2px' }}
                  >
                    {c}
                    <Text as="span" ml={1} fontWeight={600} opacity={0.6}>{n}</Text>
                  </Box>
                )
              })}
            </Flex>
          )}
        </ModalHeader>
        <ModalCloseButton
          top={{ base: 5, md: 6 }} right={{ base: 4, md: 6 }} w="40px" h="40px" borderRadius="full"
          border="1px solid" borderColor="brand.line2" color="brand.cream" aria-label="Cerrar agenda"
          _hover={{ bg: 'rgba(242,230,207,0.08)' }}
        />

        <ModalBody px={{ base: 5, md: 7 }} pt={2} pb={7} sx={{ overscrollBehavior: 'contain' }}>
          {days.map((d) => {
            const dayMatches = list.filter((m) => m.when.dayKey === d)
            const today = dayMatches[0].when.isToday
            return (
              <Box as="section" key={d} mt={6} aria-label={dayMatches[0].when.dayLong}>
                <Flex align="center" gap={3} mb={3}>
                  <Text fontFamily="label" fontSize="20px" letterSpacing="0.1em" color={today ? 'brand.gold' : 'brand.creamMuted'} whiteSpace="nowrap">
                    {today ? 'Hoy · ' : ''}{dayMatches[0].when.dayLong}
                  </Text>
                  <Box flex={1} h="1px" bg="brand.line" />
                </Flex>
                <Flex direction="column" gap={3}>
                  {dayMatches.map((m) => <MatchCard key={m.key} match={m} />)}
                </Flex>
              </Box>
            )
          })}
        </ModalBody>

        <ModalFooter
          px={{ base: 5, md: 7 }} py={3} borderTop="1px solid" borderColor="brand.line"
          justifyContent="space-between" gap={3} flexWrap="wrap" fontSize="12px" color="brand.creamFaint"
        >
          <Text> </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function MatchCard({ match: m }) {
  const played = hasScore(m.home)
  return (
    <Flex
      as="article" direction="column" gap={3} p={{ base: 4, md: '16px 18px' }} borderRadius="8px" bg="brand.coal"
      border="1px solid" borderColor={m.status === 'live' ? 'rgba(229,72,77,0.45)' : 'brand.line'}
    >
      <Flex justify="space-between" align="flex-start" gap={3}>
        <Flex gap={3} align="flex-start" minW={0}>
          <Kickoff when={m.when} size="20px" />
          <Text fontSize="12px" color="brand.creamMuted" lineHeight={1.4} pt="2px" noOfLines={2}>
            {[m.competition, m.country, m.stadium].filter(Boolean).join(' · ')}
          </Text>
        </Flex>
        <StatusPill match={m} />
      </Flex>

      {/* Desktop: Local  1 – 0  Visitante · Mobile: marcador apilado */}
      <Grid templateColumns={{ base: '1fr', md: 'minmax(0,1fr) auto minmax(0,1fr)' }} alignItems="center" gap={{ base: 2, md: 4 }}>
        <TeamLine team={m.home} played={played} />
        <Box display={{ base: 'none', md: 'block' }} textAlign="center">
          {played ? (
            <Text fontFamily="label" fontSize="30px" lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>{m.home.score} – {m.away.score}</Text>
          ) : (
            <Text fontFamily="label" fontSize="15px" letterSpacing="0.1em" color="brand.creamFaint">vs</Text>
          )}
        </Box>
        <TeamLine team={m.away} played={played} away />
      </Grid>

      <Flex wrap="wrap" gap={2}>
        {m.players.map((p) => (
          <Flex key={p.id} align="center" gap={2} pl="3px" pr="12px" py="3px" borderRadius="full" bg="brand.coal2" border="1px solid" borderColor="brand.line" fontSize="13px">
            <Box w="28px" h="28px" borderRadius="full" overflow="hidden" bg="radial-gradient(circle at 50% 25%, #4a3f2a, #2a241c)">
              <Image src={p.image} alt="" w="100%" h="200%" objectFit="cover" objectPosition="50% 0" loading="lazy" />
            </Box>
            {p.name}
            <Text as="span" fontSize="11px" color="brand.creamFaint">{p.tag}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

function TeamLine({ team, played, away = false }) {
  return (
    <Flex
      align="center" gap={3} minW={0}
      direction={{ base: 'row', md: away ? 'row-reverse' : 'row' }}
      textAlign={{ base: 'left', md: away ? 'right' : 'left' }}
    >
      <Shield team={team} size="32px" />
      <Text fontWeight={600} fontSize="16px" noOfLines={1} flex={{ base: 1, md: 'initial' }}>
        {team.name}
      </Text>
      {played && (
        <Text display={{ base: 'block', md: 'none' }} fontFamily="label" fontSize="26px" lineHeight={1}>
          {team.score}
        </Text>
      )}
    </Flex>
  )
}
