import { useEffect, useRef, useState } from 'react'
import {
  Box, Flex, Heading, Text, Image, Link, IconButton,
  Modal, ModalOverlay, ModalContent, ModalBody,
  useBreakpointValue,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import gsap from 'gsap'
import pizarraDt from '../../assets/images/Pizarra_dt.png'
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";


/* ──────── Mini soccer field ──────── */
function MiniField({ position }) {
  if (!position) return null
  return (
    <Box position="relative" w="100%" maxW={{ base: '140px', md: '170px' }} mx="auto">
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
        maxH={{ base: 'auto', md: '85vh' }}
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
          {/* Top gold linea */}
          <Box
            position="absolute"
            top={0}
            left="10%"
            right="10%"
            h="1px"
            background="linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)"
            zIndex={2}
          />
          {/* Bottom gold linea */}
          <Box
            position="absolute"
            top="auto"
            bottom={0}
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
            _hover={{ color: 'rgba(212, 69, 44, 0.8)', borderColor: 'rgba(201, 95, 76, 0.75)' }}
            aria-label="Cerrar"
            data-cursor-hover
          />

          <ModalBody p={0} overflow="hidden">
            <Flex direction={{ base: 'column', md: 'row' }}>

              {/* ── Left: Image ── */}
              <Box
                w={{ base: '100%', md: '40%' }}
                minH={{ base: '220px', md: 'auto' }}
                maxH={{ base: '220px', md: 'none' }}
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
                      color="rgba(201, 168, 76, 0.48)"
                      lineHeight={1}
                      mb="-6px"
                    >
                      {player.number}
                    </Text>
                  )}
                  <Heading
                    fontFamily="'Bebas Neue', sans-serif"
                    fontSize={{ base: '24px', md: '46px' }}
                    color="brand.white"
                    lineHeight={1}
                    letterSpacing="0.03em"
                  >
                    {player.name}{' '}
                    <Box as="span" color="brand.gold">
                      {player.lastname}
                    </Box>
                  </Heading>
                  <Flex align="center" gap={2} mt={2}>
                    <Text fontSize="12px" color="brand.gold" letterSpacing="0.12em" textTransform="uppercase" fontWeight={600}>
                      {player.position}
                    </Text>
                  </Flex>
                </Box>
              </Box>

              {/* ── Right: Info ── */}
              <Box w={{ base: '100%', md: '60%' }} p={{ base: 4, md: 6 }}>

                {/* Info cards grid */}
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gap={2}
                  mb={2}
                >
                  <InfoCard
                    icon={<Text fontSize="20px">{countryFlag(player.nationality)}</Text>}
                    label="País"
                    value={player.nationality}
                  />
                  <InfoCard
                    icon={<Text fontSize="18px" mr={2}>📅</Text>}
                    label="Nacimiento"
                    value={new Date(player.birthDate).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  />
                  <InfoCard
                    icon={<Text fontSize="15px">🎂</Text>}
                    label="Edad"
                    value={`${getAge(player.birthDate)} años`}
                  />
                  <InfoCard
                    icon={<Image src={player.escudo} alt={player.club} h={player.sizes?.h} w={player.sizes?.w} />}
                    label="Club"
                    value={player.club}
                  />
                </Box>

                {/* Key numbers */}
                <Flex
                  bg="rgba(255,255,255,0.03)"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.06)"
                  borderRadius="8px"
                  px={4}
                  py={2}
                  alignItems="center"
                  justify="center"
                  mb={4}
                >
                <Flex gap={{ base: 3, md: 12 }} flexWrap="wrap">
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
                      {stats.assists != null && <KeyStat label="Asistencias" value={stats.assists} />}
                      {stats.cleanSheets != null && <KeyStat label="Valla invicta" value={stats.cleanSheets} />}
                    </>
                  )}
                </Flex>
                </Flex>

                {/* Ratings + Field / Tactical Board */}
                <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                  {/* Rating bars */}
                  <Box flex={1}>
                    <Text fontSize="11px" letterSpacing="0.3em" color="brand.gold" textTransform="uppercase" mb={4} fontWeight={600}>
                      {isCoach ? ' ' : 'Habilidades'}
                    </Text>
                    {Object.entries(stats.ratings).map(([key, val]) => (
                      <StatBar key={key} label={key} value={val} animate={!isMobile} />
                    ))}
                    {/* Social links */}
                
                  <Text fontSize="11px" letterSpacing="0.3em" color="brand.gold" textTransform="uppercase" mt={6} mb={2} fontWeight={600}>
                    Redes Sociales
                  </Text>
                  {player.socials && (
                  <Flex mt={4} gap={3}>
                    {player.socials.instagram && (
                      <SocialLink href={player.socials.instagram} label="Instagram">
                        <FaInstagram size={16} />
                      </SocialLink>
                    )}
                    {player.socials.twitter && (
                      <SocialLink href={player.socials.twitter} label="Twitter">
                        <FaXTwitter size={16} />
                      </SocialLink>
                    )}
                    {player.socials.threads && (
                      <SocialLink href={player.socials.threads} label="Threads">
                        <FaThreads size={16} />
                      </SocialLink>
                    )}
                    {player.socials.tiktok && (
                      <SocialLink href={player.socials.tiktok} label="TikTok">
                        <FaTiktok size={16} />
                      </SocialLink>
                    )} 
                  </Flex>
                )}
                  </Box>

                  {/* Mini field or Tactical board */}
                  <Box flex={1} display="flex" flexDirection="column" alignItems="center">
                    {isCoach ? (
                      <>
                        <Image
                          src={pizarraDt}
                          alt="Pizarra táctica"
                          w="100%"
                          maxW={{ base: '180px', md: '150px' }}
                          mx="auto"
                          objectFit="contain"
                        />
                      </>
                    ) : player.fieldPosition ? (
                      <>
                        <Text fontSize="11px" letterSpacing="0.3em" color="brand.gold" textTransform="uppercase" mb={4} fontWeight={600}>
                          Posición en campo
                        </Text>
                        <MiniField position={player.fieldPosition} />
                        <Text fontSize="12px" color="brand.whiteMuted" letterSpacing="0.3em" mt={3} textAlign="center">
                          {player.position}
                        </Text>
                      </>
                    ) : null}
                  </Box>
                </Flex>

                {/* Social links
                
                  <Text fontSize="11px" letterSpacing="0.3em" color="brand.gold" textTransform="uppercase" mt={6} mb={2} fontWeight={600}>
                    Redes Sociales
                  </Text>
                  {player.socials && (
                  <Flex mt={4} gap={3}>
                    {player.socials.instagram && (
                      <SocialLink href={player.socials.instagram} label="Instagram">
                        <FaInstagram size={16} />
                      </SocialLink>
                    )}
                    {player.socials.twitter && (
                      <SocialLink href={player.socials.twitter} label="Twitter">
                        <FaXTwitter size={16} />
                      </SocialLink>
                    )}
                    {player.socials.threads && (
                      <SocialLink href={player.socials.threads} label="Threads">
                        <FaThreads size={16} />
                      </SocialLink>
                    )}  
                  </Flex>
                )} */}
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
      gap={5}
    >
      <Box flexShrink={0}>{icon}</Box>
      <Box>
        <Text fontSize="10px" color="brand.whiteMuted" letterSpacing="0.12em" textTransform="uppercase" lineHeight={1} mb={'2px'} fontWeight={800}>
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
      <Text fontFamily="'Bebas Neue', sans-serif" fontSize={{ base: '28px', md: '40px' }} color="brand.gold" lineHeight={1}>
        {value}
      </Text>
      <Text fontSize="10px" color="brand.whiteMuted" letterSpacing="0.12em" textTransform="uppercase" >
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
      w="30px"
      h="30px"
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
