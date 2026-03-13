import { useEffect, useRef, useState } from 'react'
import {
  Box, Flex, Heading, Text, Image, Link, IconButton,
  Modal, ModalOverlay, ModalContent, ModalBody,
  useBreakpointValue,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import gsap from 'gsap'

/* ──────── Mini soccer field ──────── */
function MiniField({ position }) {
  if (!position) return null
  return (
    <Box position="relative" w="100%" maxW="200px" mx="auto">
      <svg viewBox="0 0 100 140" width="100%" style={{ display: 'block' }}>
        <rect x="0" y="0" width="100" height="140" rx="4" fill="#1a3a1a" stroke="#2d5a2d" strokeWidth="1" />
        <line x1="0" y1="70" x2="100" y2="70" stroke="#2d5a2d" strokeWidth="0.8" />
        <circle cx="50" cy="70" r="14" fill="none" stroke="#2d5a2d" strokeWidth="0.8" />
        <circle cx="50" cy="70" r="1.5" fill="#2d5a2d" />
        <rect x="20" y="0" width="60" height="22" fill="none" stroke="#2d5a2d" strokeWidth="0.8" />
        <rect x="32" y="0" width="36" height="10" fill="none" stroke="#2d5a2d" strokeWidth="0.8" />
        <rect x="20" y="118" width="60" height="22" fill="none" stroke="#2d5a2d" strokeWidth="0.8" />
        <rect x="32" y="130" width="36" height="10" fill="none" stroke="#2d5a2d" strokeWidth="0.8" />
        <circle cx={position.x} cy={position.y * 1.4} r="5" fill="#C9A84C" opacity="0.9" />
        <circle cx={position.x} cy={position.y * 1.4} r="8" fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0.4" />
      </svg>
    </Box>
  )
}

/* ──────── Tactical clipboard for coaches ──────── */
function TacticalBoard() {
  return (
    <Box position="relative" w="100%" maxW="220px" mx="auto">
      <svg viewBox="0 0 120 160" width="100%" style={{ display: 'block' }}>
        {/* Clipboard body */}
        <rect x="4" y="12" width="112" height="144" rx="6" fill="#2a2218" stroke="#5a4a2a" strokeWidth="1" />
        {/* Clipboard clip */}
        <rect x="40" y="4" width="40" height="16" rx="4" fill="#9A7A35" />
        <rect x="46" y="8" width="28" height="8" rx="2" fill="#2a2218" />
        {/* Board surface */}
        <rect x="10" y="24" width="100" height="126" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />

        {/* Tactical drawings — formation lines */}
        {/* Back line */}
        <line x1="25" y1="115" x2="95" y2="115" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,2" />
        {/* Mid line */}
        <line x1="20" y1="80" x2="100" y2="80" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,2" />
        {/* Attack line */}
        <line x1="30" y1="50" x2="90" y2="50" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,2" />

        {/* Formation dots — 4-3-3 */}
        {/* GK */}
        <circle cx="60" cy="130" r="3.5" fill="none" stroke="#C9A84C" strokeWidth="1" />
        {/* Defenders */}
        <circle cx="25" cy="115" r="3" fill="#C9A84C" opacity="0.8" />
        <circle cx="45" cy="115" r="3" fill="#C9A84C" opacity="0.8" />
        <circle cx="75" cy="115" r="3" fill="#C9A84C" opacity="0.8" />
        <circle cx="95" cy="115" r="3" fill="#C9A84C" opacity="0.8" />
        {/* Midfielders */}
        <circle cx="30" cy="80" r="3" fill="#C9A84C" opacity="0.8" />
        <circle cx="60" cy="80" r="3" fill="#C9A84C" opacity="0.8" />
        <circle cx="90" cy="80" r="3" fill="#C9A84C" opacity="0.8" />
        {/* Forwards */}
        <circle cx="30" cy="50" r="3" fill="#C9A84C" opacity="0.8" />
        <circle cx="60" cy="50" r="3" fill="#C9A84C" opacity="0.8" />
        <circle cx="90" cy="50" r="3" fill="#C9A84C" opacity="0.8" />

        {/* Movement arrows */}
        <path d="M60 75 L60 58 L56 62" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
        <path d="M30 75 L40 65" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
        <path d="M90 75 L80 65" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />

        {/* Passing lines */}
        <line x1="45" y1="112" x2="55" y2="84" stroke="#fff" strokeWidth="0.5" opacity="0.15" strokeDasharray="2,2" />
        <line x1="75" y1="112" x2="65" y2="84" stroke="#fff" strokeWidth="0.5" opacity="0.15" strokeDasharray="2,2" />
      </svg>
    </Box>
  )
}

/* ──────── Stat bar (horizontal) ──────── */
function StatBar({ label, value, animate }) {
  const barRef = useRef(null)

  useEffect(() => {
    if (barRef.current && animate) {
      gsap.fromTo(barRef.current,
        { width: '0%' },
        { width: `${value}%`, duration: 0.8, ease: 'power2.out', delay: 0.3 }
      )
    }
  }, [value, animate])

  return (
    <Box mb={2}>
      <Flex justify="space-between" mb={1}>
        <Text fontSize="11px" color="brand.whiteMuted" letterSpacing="0.08em" textTransform="uppercase">
          {label.replace(/_/g, ' ')}
        </Text>
        <Text fontSize="11px" color="brand.gold" fontWeight={600}>{value}</Text>
      </Flex>
      <Box w="100%" h="4px" bg="rgba(255,255,255,0.08)" borderRadius="2px" overflow="hidden">
        <Box
          ref={barRef}
          h="100%"
          bg="brand.gold"
          borderRadius="2px"
          w={animate ? '0%' : `${value}%`}
        />
      </Box>
    </Box>
  )
}

/* ──────── Country flag emoji helper ──────── */
function countryFlag(nationality) {
  const map = {
    Argentina: '🇦🇷',
    Perú: '🇵🇪',
    Peru: '🇵🇪',
    Brasil: '🇧🇷',
    Ecuador: '🇪🇨',
    Colombia: '🇨🇴',
    Uruguay: '🇺🇾',
    Chile: '🇨🇱',
  }
  return map[nationality] || '🏳️'
}

/* ──────── Age from birthdate ──────── */
function getAge(dateStr) {
  const birth = new Date(dateStr)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

/* ──────── Main modal ──────── */
export default function PlayerModal({ player, isOpen, onClose }) {
  const contentRef = useRef(null)
  const isMobile = useBreakpointValue({ base: true, md: false })

  useEffect(() => {
    if (isOpen && contentRef.current && !isMobile) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.05 }
      )
    }
  }, [isOpen, isMobile])

  if (!player) return null

  const isCoach = player.type === 'coach'
  const { stats } = player

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered motionPreset="none">
      <ModalOverlay bg="rgba(0,0,0,0.85)" backdropFilter="blur(8px)" />
      <ModalContent
        ref={contentRef}
        bg="transparent"
        boxShadow="none"
        overflow="hidden"
        maxH="90vh"
        mx={4}
        borderRadius="12px"
      >
        {/* Outer glow border wrapper */}
        <Box
          position="relative"
          borderRadius="12px"
          overflow="hidden"
          bg="brand.grayDark"
          border="1px solid"
          borderColor="rgba(201,168,76,0.2)"
          boxShadow="0 0 40px rgba(201,168,76,0.06), 0 25px 60px rgba(0,0,0,0.6)"
        >
          {/* Top gold accent line */}
          <Box
            position="absolute"
            top={0}
            left="10%"
            right="10%"
            h="1px"
            background="linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)"
            zIndex={2}
          />

          {/* Close button */}
          <IconButton
            icon={<CloseIcon boxSize={3} />}
            onClick={onClose}
            position="absolute"
            top={3}
            right={3}
            zIndex={10}
            size="sm"
            variant="unstyled"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="32px"
            h="32px"
            borderRadius="50%"
            bg="rgba(0,0,0,0.5)"
            color="brand.whiteMuted"
            border="1px solid"
            borderColor="rgba(255,255,255,0.1)"
            _hover={{ color: 'brand.gold', borderColor: 'rgba(201,168,76,0.4)' }}
            aria-label="Cerrar"
            data-cursor-hover
          />

          <ModalBody p={0} overflowY="auto" maxH="90vh">
            <Flex direction={{ base: 'column', md: 'row' }} minH={{ md: '500px' }}>

              {/* ── Left: Image ── */}
              <Box
                w={{ base: '100%', md: '40%' }}
                minH={{ base: '280px', md: 'auto' }}
                position="relative"
                overflow="hidden"
              >
                <Image
                  src={player.image}
                  alt={player.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  objectPosition="top"
                  position="absolute"
                  inset={0}
                />
                <Box
                  position="absolute"
                  inset={0}
                  background="linear-gradient(to top, rgba(17,17,17,1) 0%, rgba(17,17,17,0.3) 50%, transparent 100%)"
                />

                {/* Name overlay on image */}
                <Box position="absolute" bottom={0} left={0} right={0} p={6}>
                  {player.number && (
                    <Text
                      fontFamily="'Bebas Neue', sans-serif"
                      fontSize="56px"
                      color="rgba(201,168,76,0.2)"
                      lineHeight={1}
                      mb="-6px"
                    >
                      {player.number}
                    </Text>
                  )}
                  <Heading
                    fontFamily="'Bebas Neue', sans-serif"
                    fontSize="36px"
                    color="brand.white"
                    lineHeight={1}
                    letterSpacing="0.03em"
                  >
                    {player.name}
                  </Heading>
                  <Flex align="center" gap={2} mt={2}>
                    <Text fontSize="20px">{countryFlag(player.nationality)}</Text>
                    <Text fontSize="12px" color="brand.gold" letterSpacing="0.12em" textTransform="uppercase" fontWeight={600}>
                      {player.position}
                    </Text>
                  </Flex>
                </Box>
              </Box>

              {/* ── Right: Info ── */}
              <Box w={{ base: '100%', md: '60%' }} p={{ base: 6, md: 10 }}>

                {/* Info cards grid */}
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gap={3}
                  mb={8}
                >
                  <InfoCard
                    icon={<Text fontSize="16px">{countryFlag(player.nationality)}</Text>}
                    label="País"
                    value={player.nationality}
                  />
                  <InfoCard
                    icon={<Text fontSize="14px">📅</Text>}
                    label="Nacimiento"
                    value={new Date(player.birthDate).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  />
                  <InfoCard
                    icon={<Text fontSize="14px">🎂</Text>}
                    label="Edad"
                    value={`${getAge(player.birthDate)} años`}
                  />
                  <InfoCard
                    icon={<Text fontSize="14px">🏟️</Text>}
                    label="Club"
                    value={player.club}
                  />
                </Box>

                {/* Key numbers */}
                <Flex gap={{ base: 4, md: 8 }} mb={8} flexWrap="wrap">
                  <KeyStat label={isCoach ? 'Dirigidos' : 'Partidos'} value={stats.matches} />
                  {isCoach ? (
                    <>
                      <KeyStat label="Victorias" value={stats.wins} />
                      <KeyStat label="Empates" value={stats.draws} />
                      <KeyStat label="Derrotas" value={stats.losses} />
                    </>
                  ) : (
                    <>
                      <KeyStat label="Goles" value={stats.goals} />
                      <KeyStat label="Asistencias" value={stats.assists} />
                      {stats.cleanSheets != null && <KeyStat label="Valla invicta" value={stats.cleanSheets} />}
                    </>
                  )}
                </Flex>

                {/* Ratings + Field / Tactical Board */}
                <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                  {/* Rating bars */}
                  <Box flex={1}>
                    <Text fontSize="11px" letterSpacing="0.3em" color="brand.gold" textTransform="uppercase" mb={4} fontWeight={600}>
                      {isCoach ? 'Habilidades' : 'Atributos'}
                    </Text>
                    {Object.entries(stats.ratings).map(([key, val]) => (
                      <StatBar key={key} label={key} value={val} animate={!isMobile} />
                    ))}
                  </Box>

                  {/* Mini field or Tactical board */}
                  <Box flex={1} display="flex" flexDirection="column" alignItems="center">
                    {isCoach ? (
                      <>
                        <Text fontSize="11px" letterSpacing="0.3em" color="brand.gold" textTransform="uppercase" mb={4} fontWeight={600}>
                          Pizarra táctica
                        </Text>
                        <TacticalBoard />
                      </>
                    ) : player.fieldPosition ? (
                      <>
                        <Text fontSize="11px" letterSpacing="0.3em" color="brand.gold" textTransform="uppercase" mb={4} fontWeight={600}>
                          Posición en campo
                        </Text>
                        <MiniField position={player.fieldPosition} />
                        <Text fontSize="12px" color="brand.whiteMuted" mt={3} textAlign="center">
                          {player.position}
                        </Text>
                      </>
                    ) : null}
                  </Box>
                </Flex>

                {/* Social links */}
                {player.socials && (
                  <Flex mt={8} gap={3}>
                    {player.socials.instagram && (
                      <SocialLink href={player.socials.instagram} label="Instagram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </SocialLink>
                    )}
                    {player.socials.twitter && (
                      <SocialLink href={player.socials.twitter} label="Twitter">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </SocialLink>
                    )}
                  </Flex>
                )}
              </Box>
            </Flex>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}

/* ──────── Sub-components ──────── */

function InfoCard({ icon, label, value }) {
  return (
    <Box
      bg="rgba(255,255,255,0.03)"
      border="1px solid"
      borderColor="rgba(255,255,255,0.06)"
      borderRadius="8px"
      px={4}
      py={3}
      display="flex"
      alignItems="center"
      gap={3}
    >
      <Box flexShrink={0}>{icon}</Box>
      <Box>
        <Text fontSize="10px" color="brand.whiteMuted" letterSpacing="0.12em" textTransform="uppercase" lineHeight={1} mb={1}>
          {label}
        </Text>
        <Text fontSize="14px" color="brand.white" fontWeight={500} lineHeight={1.2}>
          {value}
        </Text>
      </Box>
    </Box>
  )
}

function KeyStat({ label, value }) {
  return (
    <Box textAlign="center">
      <Text fontFamily="'Bebas Neue', sans-serif" fontSize="36px" color="brand.gold" lineHeight={1}>
        {value}
      </Text>
      <Text fontSize="10px" color="brand.whiteMuted" letterSpacing="0.12em" textTransform="uppercase" mt={1}>
        {label}
      </Text>
    </Box>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <Link
      href={href}
      isExternal
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="40px"
      h="40px"
      bg="brand.grayMid"
      border="1px solid"
      borderColor="brand.grayBorder"
      borderRadius="6px"
      color="brand.whiteMuted"
      transition="all 0.3s"
      _hover={{ borderColor: 'brand.gold', color: 'brand.gold' }}
      aria-label={label}
      data-cursor-hover
    >
      {children}
    </Link>
  )
}
